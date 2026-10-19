# SolarElectricWise production HTML site

This folder contains the standalone HTML/CSS/JavaScript site and its optional PHP contact handler. It preserves the original seven public page URLs and media, with corrected SEO metadata, accessible main headings, a sitemap, canonical URLs, business markup and responsive spacing.

Serve this folder as the domain document root on an Apache-compatible PHP host. The included .htaccess configures HTTPS/www redirects, legacy media redirects, a real 404 response, cache-control and contact-handler activation. WordPress and a database are not required.

The contact form uses the host mail transport to send enquiries to info@solarelectricwise.co.za. It validates input, includes a honeypot and rate limiting, and does not cache submissions. DNS/CDN configuration and operational backups are managed separately.

The earlier redesigned site in the repository root is retained unchanged.

Performance release: responsive WebP media, subset fonts, page-specific CSS, native slider/menu/gallery controls, and all original gallery photos. Static service cards render immediately without a scroll-animation script. Full-height slide images are enforced at every viewport width. Live visible-content checks passed all seven pages at 1440, 768 and 390 px on 19 October 2026. Cloudflare HTML and asset caching is enabled, with contact submissions excluded.
