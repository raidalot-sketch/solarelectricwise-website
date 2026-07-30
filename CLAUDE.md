# Solar Electric Wise — website rebuild

## What this is

A hand-coded HTML/CSS/JS replacement for the WordPress site at solarelectricwise.co.za
(a solar PV installer based in Noordhoek, Cape Town, South Africa). No build step, no
framework — every page is a plain `.html` file that opens and works as-is.

Business facts: 1 Heldray Rd, Noordhoek, 7979 · +27 83 571 9191 / +27 83 454 3577 ·
info@solarelectricwise.co.za / christine@solarelectricwise.co.za · Mon–Fri 08:00–17:00 ·
installing since 2015, ~30 years combined electrical experience, EPC company.

## Current status: NOT LIVE YET

This is still in review. **Do not push toward, suggest, or take any step to go live on
the real domain (solarelectricwise.co.za) until the user explicitly says the company has
proofed the site and is ready.** The user was explicit about this after a fix landed —
they want to keep iterating and reviewing before any production cutover. Keep building
and fixing whatever's asked, just don't propose "let's go live" unprompted.

## Structure

- `index.html`, `about.html`, `services.html` (hub), `residential-solar.html`,
  `commercial-solar.html`, `off-grid-solar.html`, `gallery.html`, `contact.html`,
  `404.html` — all pages share an identical header/nav/footer block (no templating,
  copy-pasted across files — remember to update all of them when changing header/footer)
- `assets/css/style.css` — all styling. Brand colors: navy `#0b2545` / orange `#f5a623`.
  Header is white (not navy) so the real company logo — dark green/blue text — stays
  legible; see `assets/img/logo.png`.
- `assets/js/main.js` — mobile nav toggle, Services dropdown (hover on desktop, tap
  accordion on mobile), gallery lightbox, Formspree AJAX contact form submit
- `assets/img/` — real photos pulled from the WordPress media library (the public
  front-end serves a **watermarked** version via a copy-protection plugin for anonymous
  visitors — the logged-in/authenticated version is clean; that's how the current
  originals were sourced) plus one AI-generated hero photo (`hero-solar-home-table-mountain.jpg`,
  made locally via ComfyUI Krea2 Turbo)
- `robots.txt`, `sitemap.xml`, `llms.txt` — technical/AI-search SEO files

## Nav structure

Residential/Commercial/Off-Grid are separate pages (better per-keyword SEO) but grouped
under one "Services" dropdown in the header to keep the top-level nav to 5 items — 7 was
overflowing/wrapping. `.hero` (full-height, used on the homepage) and `.hero.small`
(compact banner, used on inner pages) are different variants — don't merge them.

## Deployment / hosting

- **GitHub repo:** https://github.com/raidalot-sketch/solarelectricwise-website (`main` branch)
- **Proof link (GitHub Pages):** https://raidalot-sketch.github.io/solarelectricwise-website/
  — this is where the user reviews changes, NOT the real domain
- Pushing to `main` auto-deploys to the Pages proof link — safe to do freely as part of
  normal iteration (the user has approved this pattern repeatedly)
- **Contact form:** already wired to a live Formspree endpoint in `contact.html` —
  don't touch unless asked
- Real go-live means uploading these same files to the user's existing cPanel/FTP hosting
  to replace the current WordPress install (after they back it up) — has not happened yet

## Working conventions established so far

- Always verify visual changes in a browser (desktop **and** mobile) before calling
  something done — several real bugs this project (broken hero images, misaligned nav,
  a dropdown stuck open) were only caught by actually looking, not just reading the code
- Commit with a descriptive message and push after each discrete change; don't batch
  unrelated fixes into one commit
- The user is new to VS Code/Git/GitHub — explain *what* a step does in plain terms, not
  just the command
