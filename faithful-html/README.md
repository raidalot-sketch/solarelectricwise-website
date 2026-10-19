# SolarElectricWise production HTML site

This folder contains the standalone HTML/CSS/JavaScript site and its optional PHP contact handler. It preserves the original seven public page URLs and media, with corrected SEO metadata, accessible main headings, a sitemap, canonical URLs, business markup and responsive spacing.

Serve this folder as the domain document root on an Apache-compatible PHP host. The included .htaccess configures HTTPS/www redirects, legacy media redirects, a real 404 response, cache-control and contact-handler activation. WordPress and a database are not required.

The contact form uses the host mail transport to send enquiries to info@solarelectricwise.co.za. It validates input, includes a honeypot and rate limiting, and does not cache submissions. DNS/CDN configuration and operational backups are managed separately.

The earlier redesigned site in the repository root is retained unchanged.
