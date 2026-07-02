#!/usr/bin/env python3
"""
Fetch publications from ORCID and update the publications section of data.js.

Usage:
    python3 fetch_publications.py

Requirements:
    pip install requests

What it does:
  1. Calls the free ORCID public API (no account or key needed).
  2. Fetches all works for the configured ORCID ID.
  3. Rewrites the `publications: [ ... ]` block inside data.js in place.
     Everything else in data.js is left untouched.
"""

import json
import re
import sys

try:
    import requests
except ImportError:
    sys.exit("Please install requests first:  pip install requests")

# ── Configuration ─────────────────────────────────────────────────────────────

ORCID_ID   = "0000-0001-5344-0032"
DATA_JS    = "assets/js/data.js"

# Map ORCID work-type strings → tag labels shown on the website.
TYPE_TAGS = {
    "journal-article":    "Journal",
    "conference-paper":   "Conference",
    "conference-poster":  "Poster",
    "book-chapter":       "Book Chapter",
    "book":               "Book",
    "dissertation":       "Thesis",
    "preprint":           "Preprint",
    "working-paper":      "Working Paper",
    "report":             "Report",
    "other":              "Other",
}

# ── ORCID helpers ─────────────────────────────────────────────────────────────

HEADERS = {"Accept": "application/json"}
BASE    = "https://pub.orcid.org/v3.0"


def fetch_summary(orcid_id):
    """Return the works summary list for an ORCID ID."""
    url = f"{BASE}/{orcid_id}/works"
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    data = r.json()
    return data.get("group", [])


def fetch_work_detail(orcid_id, put_code):
    """Return the full detail record for a single work."""
    url = f"{BASE}/{orcid_id}/work/{put_code}"
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    return r.json()


def extract_doi_raw(external_ids):
    """Extract raw DOI string from an external-ids block, or return ''."""
    if not external_ids:
        return ""
    for eid in external_ids.get("external-id", []):
        if eid.get("external-id-type", "").lower() == "doi":
            val = (eid.get("external-id-value") or "").strip()
            if val:
                return val
    return ""


def extract_doi(external_ids):
    doi = extract_doi_raw(external_ids)
    return f"https://doi.org/{doi}" if doi else ""


def crossref_year(message):
    for key in ("published-print", "published-online", "created", "issued"):
        parts = (message.get(key) or {}).get("date-parts") or []
        if parts and parts[0] and parts[0][0]:
            return str(parts[0][0])
    return ""


def crossref_venue(message):
    """Best-effort venue name from Crossref metadata."""
    work_type = message.get("type") or ""
    containers = message.get("container-title") or []

    event = message.get("event") or {}
    acronym = safe_str(event.get("acronym"))
    event_name = safe_str(event.get("name"))
    if acronym:
        return acronym
    if event_name:
        return event_name

    if work_type == "book-chapter" and len(containers) >= 2:
        return containers[-1]
    if containers:
        return containers[0]

    publisher = safe_str(message.get("publisher"))
    return publisher


def fetch_crossref_metadata(doi):
    """Look up publication metadata from Crossref using a DOI."""
    if not doi:
        return None
    try:
        r = requests.get(
            f"https://api.crossref.org/works/{doi}",
            headers={"Accept": "application/json"},
            timeout=15,
        )
        if r.status_code != 200:
            return None
        return r.json().get("message")
    except requests.RequestException:
        return None


def build_venue(journal, year, doi):
    """Build a venue string from ORCID fields, falling back to Crossref."""
    journal = safe_str(journal)
    year = safe_str(year)

    if journal:
        return f"{journal}, {year}".strip(", ") if year else journal

    crossref = fetch_crossref_metadata(doi)
    if not crossref:
        return year

    venue_name = crossref_venue(crossref)
    crossref_year_val = crossref_year(crossref) or year
    if venue_name and crossref_year_val:
        return f"{venue_name}, {crossref_year_val}"
    return venue_name or crossref_year_val or year


def safe_str(val):
    """Return a stripped string from a value that may be None, str, or dict."""
    if val is None:
        return ""
    if isinstance(val, dict):
        val = val.get("value") or ""
    return str(val).strip()


def parse_work(detail):
    """Turn a raw ORCID work detail dict into a website publication dict."""
    title_block = detail.get("title") or {}
    title = safe_str(title_block.get("title")) or "Untitled"

    # Contributors / authors
    contributors_block = detail.get("contributors") or {}
    contributors = contributors_block.get("contributor") or []
    author_names = []
    for c in contributors:
        name = safe_str(c.get("credit-name"))
        if name:
            author_names.append(name)
    authors = ", ".join(author_names) if author_names else "—"

    # Venue: ORCID journal title, then Crossref via DOI, then year only
    journal = detail.get("journal-title")
    year = ""
    pub_date = detail.get("publication-date") or {}
    year_block = pub_date.get("year") or {}
    year = safe_str(year_block) or ""
    doi_raw = extract_doi_raw(detail.get("external-ids"))
    venue = build_venue(journal, year, doi_raw)

    # Type tag
    work_type = detail.get("type") or "other"
    tag = TYPE_TAGS.get(work_type, work_type.replace("-", " ").title())

    # Links
    doi = extract_doi(detail.get("external-ids"))
    url = safe_str(detail.get("url"))

    links = {}
    if doi:
        links["DOI"] = doi
    if url and url != doi:
        links["Link"] = url

    return {
        "title":   title,
        "authors": authors,
        "venue":   venue,
        "tag":     tag,
        "links":   links,
    }


# ── data.js writer ────────────────────────────────────────────────────────────

def pub_to_js(pub, indent="    "):
    """Render one publication dict as a JS object literal string."""
    links_str = ", ".join(
        f'"{k}": "{v}"' for k, v in pub["links"].items()
    )
    return (
        f'{indent}{{\n'
        f'{indent}  title:   "{pub["title"]}",\n'
        f'{indent}  authors: "{pub["authors"]}",\n'
        f'{indent}  venue:   "{pub["venue"]}",\n'
        f'{indent}  tag:     "{pub["tag"]}",\n'
        f'{indent}  links:   {{ {links_str} }},\n'
        f'{indent}}}'
    )


def normalize_title(title):
    """Normalize titles so manual/ORCID entries match reliably."""
    return re.sub(r"\s+", " ", title or "").strip().lower()


def parse_existing_publications(content):
    """Extract publication objects already in data.js."""
    match = re.search(r"publications:\s*\[(.*?)\],", content, re.DOTALL)
    if not match:
        return []

    block = match.group(1)
    pubs = []
    for obj in re.finditer(
        r"\{\s*title:\s*\"((?:\\.|[^\"\\])*)\".*?links:\s*\{.*?\},\s*\}",
        block,
        re.DOTALL,
    ):
        raw = obj.group(0)
        title = obj.group(1).replace('\\"', '"')
        pubs.append({"title": title, "raw": raw})
    return pubs


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print(f"Fetching works for ORCID {ORCID_ID} …")
    groups = fetch_summary(ORCID_ID)
    print(f"  Found {len(groups)} work group(s).")

    pubs = []
    for g in groups:
        summaries = g.get("work-summary", [])
        if not summaries:
            continue
        # Use the first summary's put-code to fetch the full detail
        put_code = summaries[0].get("put-code")
        if not put_code:
            continue
        try:
            detail = fetch_work_detail(ORCID_ID, put_code)
            pubs.append(parse_work(detail))
        except Exception as e:
            title = summaries[0].get("title", {}).get("title", {}).get("value", "?")
            print(f"  WARNING: skipped '{title}': {e}")

    # Sort newest first by year embedded in venue string
    def year_key(p):
        m = re.search(r"\b(19|20)\d{2}\b", p["venue"])
        return int(m.group()) if m else 0

    pubs.sort(key=year_key, reverse=True)

    with open(DATA_JS, "r", encoding="utf-8") as f:
        content = f.read()

    existing = parse_existing_publications(content)
    fetched_titles = {normalize_title(p["title"]) for p in pubs}
    manual_raws = [
        p["raw"] for p in existing
        if normalize_title(p["title"]) not in fetched_titles
    ]
    if manual_raws:
        print(f"  Keeping {len(manual_raws)} manually added publication(s).")

    rendered = manual_raws + [pub_to_js(p) for p in pubs]
    pubs_js = ",\n".join(rendered)
    new_block = f"  publications: [\n{pubs_js},\n  ],"
    pattern = r"publications:\s*\[.*?\],"
    updated, n = re.subn(pattern, new_block, content, count=1, flags=re.DOTALL)
    if n == 0:
        sys.exit("ERROR: Could not find publications block in data.js")

    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"✓ Wrote {len(rendered)} publications to {DATA_JS}")


if __name__ == "__main__":
    main()
