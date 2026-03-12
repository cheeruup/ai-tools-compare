# ToolCompare Atlas

Static comparison site template for AdSense + affiliate monetization.

## What is included
- Home page, 5 category pages, 15 article pages
- About / Contact / Privacy Policy / Terms / Affiliate Disclosure / Editorial Policy
- `assets/config.js` for:
  - Google Analytics GA4 ID
  - Google Search Console verification token
  - AdSense publisher ID
- Reserved ad spaces in the layout
- Placeholder affiliate links with click tracking hooks
- `robots.txt`, `sitemap.xml`, `ads.txt`, `render.yaml`

## Before deployment
1. Edit `assets/config.js`
   - `googleAnalyticsId`
   - `googleSiteVerification`
   - `googleAdsenseAccount`
   - site URL and contact email
2. Replace `https://ai-tools-compare.onrender.com/out/...` links with real affiliate URLs.
3. Change `https://ai-tools-compare.onrender.com` in canonical tags and sitemap to your real domain.
4. Update policy pages with your legal business details.
5. Review every article for current features, pricing, and claims.
6. After AdSense approval, update `ads.txt` with your real publisher ID.

## Render deploy
- Push this folder to GitHub.
- Create a new Static Site on Render.
- Publish path: `.`
- Or use `render.yaml`.

## Search Console
- Use URL-prefix property if you plan to verify with the HTML meta tag.
- Paste your verification token into `assets/config.js`, then redeploy.

## Analytics
- The site loads GA4 using the standard Google tag when `googleAnalyticsId` is provided.
- Affiliate buttons send a basic `select_item` event.

## AdSense
- The site injects the publisher meta and AdSense script when `googleAdsenseAccount` is set.
- Reserved ad boxes are only placeholders. Replace them with real ad units after approval if desired.