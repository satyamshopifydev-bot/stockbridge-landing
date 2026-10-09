# StockBridge marketing website

The public website at https://stockbridgeapp.com. This repository is a static site, separate from the Shopify app and its inventory, billing, and authentication services.

## Redesign preview and validation

[Desktop preview](docs/desktop-preview.png) · [Mobile preview](docs/mobile-preview.png)

Browser validation covered all seven public pages at 320, 390, 768, and 1440 pixels, with no page overflow or automated WCAG A/AA violations. Menu, native FAQ, sample interaction, contact fields, thank-you state, local links, and the no-JavaScript fallback passed. See [validation details](docs/validation.json). Existing privacy and terms policy text is preserved.

Local mobile Lighthouse checks of the homepage and SKU-matching guide scored 100 for Performance, Accessibility, Best Practices, and SEO. These are lab results on a local static server, not live-domain performance or a search ranking prediction. Contact-provider delivery and production HTTP redirects still need verification after publication.

## Local preview

No package installation or build step is needed. From this directory:

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Guide URLs use directory `index.html` files. The production host already serves `/privacy` and `/terms` from their HTML files; a plain Python server requires `/privacy.html` and `/terms.html` for local inspection.

## Files

- `index.html`: homepage, pricing, FAQ, contact form, and SoftwareApplication/Organization/WebSite metadata.
- `assets/site.css` and `assets/site.js`: shared responsive design and progressive enhancement. The interactive inventory example uses sample values in the browser and does not call the Shopify API.
- `guides/`: an index and three static, crawlable inventory guides with individual titles, descriptions, canonical URLs, article metadata, and breadcrumbs.
- `privacy.html` and `terms.html`: existing policy text with the shared layout.
- `404.html`: custom not-found page. Confirm that the host returns HTTP 404 for unknown URLs; the page has `noindex`.
- `robots.txt` and `sitemap.xml`: public crawl instructions and seven canonical pages.
- `assets/fonts/`: self-hosted Manrope variable font and its SIL Open Font License.

## Content that must stay accurate

StockBridge currently syncs **Available** inventory. It does not offer an On hand sync selector or a combined cross-store order/warehouse ledger. Do not describe it as syncing every inventory state or guaranteeing that stock can never oversell.

Current monthly plans are Free ($0), Starter ($9.99), Growth ($34.99), and Business ($79.99). SKU limits are per connection. Free uses a 15-minute interval; real-time webhooks and bidirectional sync start on Starter. Growth has 20 sync rules; Business has 50. Business includes multi-location mapping. Destination connections do not need a separate paid subscription. Update visible pricing, FAQs, and JSON-LD together when product behavior changes.

The sample dashboard and sale/restock interaction are illustrations, not live merchant data. No invented ratings, testimonials, speed benchmarks, or customer counts are included.

## Contact form

The existing FormSubmit endpoint is preserved. The form has associated labels, browser validation, a honeypot, and a thank-you return URL. The provider performs delivery outside this static site. Verify mailbox activation and one authorized end-to-end submission before publishing; preview checks intercept the request and do not send email.

## Publish and SEO verification

Cloudflare Workers uses `wrangler.jsonc` to serve this repository as a static-assets-only site. No Worker script or build command is required. `.assetsignore` publishes only the website files, excluding Git metadata, deployment configuration, README, and review screenshots. When adding a new root-level public file, also allow it in `.assetsignore`.

The observed Cloudflare branch-preview settings are an empty build command, root directory `/`, and `npx wrangler versions upload`. Keep that preview command; a version upload creates a version without switching production traffic. The production command should be `npx wrangler deploy` after the design is approved and merged. The configured automatic HTML handling serves `/privacy` and `/terms` without extensions and the directory-based guide URLs with trailing slashes. Unknown URLs return the custom 404 page with HTTP 404.

The reported `Missing entry-point to Worker script or to assets directory` error came from running Wrangler without a script or an explicit static-asset directory. The checked-in configuration supplies that directory. Verify that the connected Cloudflare check succeeds before merging.

Wrangler 4.149.0's deployment dry-run passed. All 29 local Cloudflare HTTP checks passed, covering the seven canonical pages, HTML redirects, public assets, the custom HTTP 404, and excluded repository files. See [Cloudflare routing validation](docs/cloudflare-validation.json); these local checks do not establish live-domain deployment status.

1. Review the branch preview on desktop and mobile, then merge through a pull request. Publish only this landing repository through its existing static host.
2. Confirm HTTP 200 and canonical URLs for all seven sitemap pages. Check the custom HTTP 404 response, `robots.txt`, `sitemap.xml`, share image, font, and install links on the real domain. If the host supports both `www` and apex URLs, use one canonical host and redirect the alternate.
3. In the site's verified Google Search Console property, submit `https://stockbridgeapp.com/sitemap.xml` and use URL Inspection on the homepage and the three new guides. Indexing and ranking are Google decisions; a sitemap or structured data is not a ranking guarantee.
4. Validate JSON-LD with Schema.org's validator. SoftwareApplication has honest offer data without an invented review or aggregateRating. Do not assume eligibility for Google's software-app rich result, which has additional required review/rating properties. FAQ content is accessible HTML; no FAQ rich-result claim is made.
5. Monitor real search queries, indexing, click-through rates, and field Core Web Vitals after publication. Local Lighthouse scores do not establish live performance or search ranking. Improve guides using actual merchant questions rather than generating keyword-only pages.

Useful references: [Google's SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [software-app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app), and [Shopify inventory states](https://help.shopify.com/en/manual/inventory-and-locations/fundamentals/inventory-states).
