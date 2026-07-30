# Solar Electric Wise — website rebuild

A hand-coded HTML/CSS/JS replacement for the WordPress site at solarelectricwise.co.za.
No build step, no framework — open a page and it just works.

## Files

- `index.html`, `about.html`, `residential-solar.html`, `commercial-solar.html`,
  `off-grid-solar.html`, `gallery.html`, `contact.html`, `404.html` — the pages
- `assets/css/style.css` — all styling
- `assets/js/main.js` — mobile nav toggle, gallery lightbox, contact form submit
- `assets/img/` — photos reused from the current live site
- `robots.txt`, `sitemap.xml` — technical SEO

## 1. Install VS Code (one-time setup)

1. Download from https://code.visualstudio.com (Windows, System Installer) and run it.
2. Open this folder in VS Code: `File > Open Folder... > E:\Websites\solarelectricwise`.
3. Install the **Live Server** extension (Extensions icon in the left sidebar, search
   "Live Server" by Ritwick Dey, click Install). It lets you preview pages with auto-refresh.
4. To preview: right-click `index.html` in the file list → **Open with Live Server**.

## 2. Finish the contact form (Formspree)

The form in `contact.html` posts to Formspree so messages actually get emailed to you —
a static site has no server of its own to send mail.

1. Create a free account at https://formspree.io using `info@solarelectricwise.co.za`.
2. Create a new form, point it at that same inbox.
3. Formspree gives you a form ID. In `contact.html`, replace
   `https://formspree.io/f/YOUR_FORM_ID` with your real endpoint.
4. Submit a real test message once deployed (Formspree requires the form to be live at
   its real domain/GitHub Pages URL, not just opened as a local file, to verify submissions).

## 3. Put it on GitHub and proof it

1. Create a free GitHub account at https://github.com if you don't have one.
2. Create a new repository (e.g. `solarelectricwise-website`), empty, no README.
3. In VS Code's Source Control tab (left sidebar), or from a terminal in this folder:
   ```
   git init
   git add .
   git commit -m "Initial site build"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/solarelectricwise-website.git
   git push -u origin main
   ```
4. On GitHub: repo → **Settings** → **Pages** → Source: `main` branch, `/ (root)` → Save.
5. GitHub gives you a URL like `https://YOUR_USERNAME.github.io/solarelectricwise-website/`
   — that's your proof link. Share it, click through every page on desktop and mobile,
   and confirm the contact form actually sends before going further.

## 4. Go live on the real domain

Once you've proofed it and are happy:

1. Back up the current WordPress site and database from your hosting control panel first.
2. Upload every file in this folder (via cPanel File Manager or FTP) to replace the
   current WordPress files at the site's document root.
3. DNS/domain and SSL stay exactly as they are — you're only replacing the files the
   web server serves, not the hosting or domain itself.

## SEO notes

- Every page has a unique `<title>` and meta description, a canonical tag, Open Graph
  tags, and JSON-LD structured data (`LocalBusiness` sitewide, `Service` on each service page).
- Residential/Commercial/Off-Grid each get a dedicated page so they can rank for their
  own search terms, rather than competing with each other on one combined page.
- Update `sitemap.xml` if you ever add or remove pages.
- After going live, submit the site in [Google Search Console](https://search.google.com/search-console)
  and submit `sitemap.xml` there — that's what gets new pages indexed quickly.
