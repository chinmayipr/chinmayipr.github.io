# Academic Personal Website

A clean, responsive, static personal website for academics. No build tools,
no frameworks: just HTML, CSS, and a little JavaScript, so it's easy to edit
and free to host on GitHub Pages.

## Pages

| File                 | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `index.html`         | Home (welcome + recent news)              |
| `about.html`         | About / biography                         |
| `publications.html`  | Publications list                         |
| `talks.html`         | Talks list                                |
| `teaching.html`      | Teaching / courses                        |
| `news.html`          | Full news archive                         |
| `cv.html`            | CV (positions, education, PDF download)   |

## How to add your information

**You only need to edit one file for most things:** `assets/js/data.js`.

It holds your name, title, photo, contact links, news, publications, talks,
group members, and CV entries. The sidebar and all lists are generated from it,
so your details stay consistent across every page.

For longer prose (your biography), edit `about.html` directly — the editable
section is clearly marked with comments.

### Add your photo and CV

- Put your headshot at `assets/img/profile.jpg`
- Put group member photos in `assets/img/` (and reference them in `data.js`)
- Put your CV at `assets/cv.pdf`

Missing images fall back to a gray circle automatically, so nothing breaks if
you haven't added them yet.

### Change the colors

Open `assets/css/style.css` and edit the variables at the top (`:root { ... }`)
— e.g. `--color-accent` controls the highlight color.

## Preview locally

Because the site loads `data.js`, just open `index.html` in your browser, or
run a tiny local server for the cleanest experience:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish on GitHub Pages (free)

1. Create a repository on GitHub and push these files to it:

```bash
git init
git add .
git commit -m "Initial academic website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**, then **Save**.
5. Wait ~1 minute. Your site will be live at:
   `https://<your-username>.github.io/<your-repo>/`

> Tip: To use the address `https://<your-username>.github.io/`, name the repo
> exactly `<your-username>.github.io`.

## License

Use freely for your own academic website.
