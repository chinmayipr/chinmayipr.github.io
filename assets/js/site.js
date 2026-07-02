/* ==========================================================================
   Site rendering. You normally do NOT need to edit this file.
   It reads everything from data.js and builds the shared sidebar + sections.
   ========================================================================== */

(function () {
  const S = window.SITE || {};

  /* ----- Helpers -------------------------------------------------------- */
  function el(id) {
    return document.getElementById(id);
  }

  function linkList(obj) {
    return Object.entries(obj || {})
      .filter(([, url]) => url && url.trim() !== "")
      .map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
      .join("");
  }

  /* ----- Sidebar (shared on every page) --------------------------------- */
  const SOCIAL_ICONS = {
    scholar:
      '<img src="assets/img/googlescholar.svg" alt="" width="18" height="18">',
    orcid:
      '<img src="assets/img/orcid_16x16.png" alt="" width="18" height="18">',
    dblp:
      '<img src="assets/img/dblp-icon.png" alt="" width="18" height="18">',
    github:
      '<img src="assets/img/github.svg" alt="" width="18" height="18">',
    linkedin:
      '<img src="assets/img/linkedin.svg" alt="" width="18" height="18">',
  };

  function buildSidebar() {
    const p = S.profile || {};
    const navItems = [
      ["index.html", "Home"],
      //["about.html", "About"],
      ["publications.html", "Publications"],
      ["talks.html", "Talks"],
      ["teaching.html", "Teaching"],
      ["news.html", "News"],
      ["cv.html", "CV"],
    ];

    const current = location.pathname.split("/").pop() || "index.html";

    const contacts = [];
    if (p.location) contacts.push(`<li><span class="icon">📍</span>${p.location}</li>`);
    if (p.emailWork)
      contacts.push(
        `<li><span class="icon">✉️</span><a href="mailto:${p.emailWork}">${p.emailWork}</a></li>`
      );
    if (p.emailPersonal)
      contacts.push(
        `<li><span class="icon">✉️</span><a href="mailto:${p.emailPersonal}">${p.emailPersonal}</a></li>`
      );

    const socialIcons = (p.social || [])
      .filter((item) => item.url && item.url.trim() !== "")
      .map(
        (item) =>
          `<li><a href="${item.url}" target="_blank" rel="noopener" aria-label="${item.label}">${SOCIAL_ICONS[item.id] || item.label}</a></li>`
      )
      .join("");

    const socialHtml = socialIcons
      ? `<ul class="profile-social">${socialIcons}</ul>`
      : "";

    const nav = navItems
      .map(
        ([href, label]) =>
          `<li><a href="${href}" class="${href === current ? "active" : ""}">${label}</a></li>`
      )
      .join("");

    const html = `
      <img class="profile-photo" src="${p.photo || ""}" alt="${p.name || ""}"
           onerror="this.style.background='#dde1e7';this.removeAttribute('src');">
      <h1>${p.name || ""}</h1>
      <p class="title">${p.title || ""}</p>
      <ul class="contact-list">
        ${contacts.join("")}
      </ul>
      ${socialHtml}
      <nav class="site-nav">
        <ul>${nav}</ul>
      </nav>`;

    const sidebar = el("sidebar");
    if (sidebar) sidebar.innerHTML = html;
  }

  /* ----- Mobile nav toggle ---------------------------------------------- */
  function setupNavToggle() {
    const btn = el("navToggle");
    const sidebar = el("sidebar");
    if (btn && sidebar) {
      btn.addEventListener("click", () => sidebar.classList.toggle("open"));
    }
  }

  /* ----- Renderers ------------------------------------------------------ */
  function renderIntro() {
    const c = el("intro");
    if (!c || !S.intro) return;
    c.innerHTML =
      `<h2>${S.intro.heading || "Welcome"}</h2>` +
      (S.intro.paragraphs || []).map((p) => `<p class="lead">${p}</p>`).join("");
  }

  function renderNews(limit) {
    const c = el("news");
    if (!c) return;
    const items = (S.news || []).slice(0, limit || undefined);
    c.innerHTML =
      `<ul class="news-list">` +
      items
        .map(
          (n) =>
            `<li class="news-item"><span class="date">${n.date}</span><span>${n.text}</span></li>`
        )
        .join("") +
      `</ul>`;
  }

  function renderPublications() {
    const c = el("publications");
    if (!c) return;
    c.innerHTML =
      `<ul class="pub-list">` +
      (S.publications || [])
        .map((p) => {
          const links = linkList(p.links);
          return `<li class="pub-item">
            <div class="pub-title">${p.title}${p.tag ? `<span class="tag">${p.tag}</span>` : ""}</div>
            <div class="pub-authors">${p.authors || ""}</div>
            <div class="pub-venue">${p.venue || ""}</div>
            ${links ? `<div class="pub-links">${links}</div>` : ""}
          </li>`;
        })
        .join("") +
      `</ul>`;
  }

  function renderTalks() {
    const c = el("talks");
    if (!c) return;
    c.innerHTML =
      `<ul class="pub-list">` +
      (S.talks || [])
        .map((t) => {
          const links = linkList(t.links);
          return `<li class="pub-item">
            <div class="pub-title">${t.title}</div>
            <div class="pub-venue">${t.venue || ""}</div>
            <div class="pub-authors">${t.date || ""}</div>
            ${links ? `<div class="pub-links">${links}</div>` : ""}
          </li>`;
        })
        .join("") +
      `</ul>`;
  }

  function renderTeaching() {
    const c = el("teaching");
    if (!c || !S.teaching) return;
    let html = S.teaching.intro ? `<p class="lead">${S.teaching.intro}</p>` : "";
    html += `<ul class="news-list">`;
    html += (S.teaching.courses || [])
      .map((course) => {
        const links = linkList(course.links);
        const details = [course.role, course.institution].filter(Boolean).join(", ");
        return `<li class="news-item">
          <span class="date">${course.period || ""}</span>
          <span>
            <strong>${course.title || ""}</strong>
            ${details ? `<br>${details}` : ""}
            ${course.description ? `<br>${course.description}` : ""}
            ${links ? `<div class="pub-links">${links}</div>` : ""}
          </span>
        </li>`;
      })
      .join("");
    html += `</ul>`;
    c.innerHTML = html;
  }

  function renderCV() {
    const c = el("cv");
    if (!c || !S.cv) return;
    const block = (title, rows) =>
      `<h3>${title}</h3><ul class="news-list">` +
      (rows || [])
        .map(
          (r) =>
            `<li class="news-item"><span class="date">${r.period}</span><span>${r.text}</span></li>`
        )
        .join("") +
      `</ul>`;
    c.innerHTML =
      (S.cv.pdf ? `<a class="btn" href="${S.cv.pdf}" target="_blank" rel="noopener">Download CV (PDF)</a>` : "") +
      block("Positions", S.cv.positions) +
      block("Education", S.cv.education);
  }

  function renderFooter() {
    document.querySelectorAll(".js-footer").forEach((f) => {
      const year = new Date().getFullYear();
      f.innerHTML = `© ${year} ${S.footerName || ""}. Built as a static site, hosted on GitHub Pages.`;
    });
  }

  /* ----- Init ----------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildSidebar();
    setupNavToggle();
    renderIntro();
    renderNews(el("news") && el("news").dataset.limit ? parseInt(el("news").dataset.limit) : 0);
    renderPublications();
    renderTalks();
    renderTeaching();
    renderCV();
    renderFooter();
  });
})();
