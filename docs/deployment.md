# Tau Ceti Labs Website Deployment

Canonical public destination: `https://www.taucetilabs.com/`. The apex hostname is bound and served by the same Azure Static Web App.

## Azure Target

- Host: Azure Static Web Apps
- Resource group: `rg-taucetilabs-web`
- Static Web App: `swa-taucetilabs-web`
- Default hostname: `https://victorious-rock-0bf71380f.7.azurestaticapps.net/`
- Primary domain: `www.taucetilabs.com`
- Secondary domain: `taucetilabs.com`
- API: Azure Functions from the `api/` folder

## GitHub Setup

1. GitHub repo: `https://github.com/Tau-Ceti-Labs/TauCetiLabsWebsite`.
2. Default branch: `main`.
3. Add Azure deployment token as `AZURE_STATIC_WEB_APPS_API_TOKEN`.
4. Confirm `.github/workflows/azure-static-web-apps.yml` deploys `dist/` and `api/`.

## Content Update Workflow

For ordinary company-site copy, asset, or routing updates:

1. Create a focused branch.
2. Treat product/game folders as read-only unless the task explicitly authorizes changes there.
3. Record copied or derived asset provenance.
4. Run `npm.cmd run build`, `npm.cmd run verify:static`, and `npm.cmd run test:api`.
5. Push the branch and review the Azure pull-request preview.
6. Merge only after required checks pass; `main` deploys production.

Use `workflow_dispatch` for recovery and direct Azure CLI deployment only for an explicitly approved emergency. Reconcile any emergency deployment back into Git immediately.

## Subscribe API Settings

The company signup form posts to `/api/subscribe`.

Configure these Static Web App application settings before enabling the public form in production:

- `SUBSCRIBER_STORAGE_CONNECTION_STRING`: private Azure Table Storage connection string.
- `SUBSCRIBER_CONTACTS_TABLE`: optional; defaults to `TauCetiSubscriberContacts`.
- `SENDGRID_MARKETING_API_KEY`: optional Twilio SendGrid Marketing Contacts API key.
- `SENDGRID_TAUCETILABS_LIST_ID`: SendGrid list id for Tau Ceti Labs general updates. Current list name: `Tau Ceti Labs Updates`.

Consent scope is `taucetilabs_general_updates`. Do not treat this as consent for LithoBreak or RaceCards product lists.

## DNS And Domains

Current verified DNS:

- Authoritative nameservers are Azure DNS.
- `www` CNAMEs to `victorious-rock-0bf71380f.7.azurestaticapps.net`.
- Apex uses the Static Web Apps stable inbound IP.

Preferred rollout:

1. Deploy and verify on the Azure default hostname.
2. Inventory and preserve Microsoft 365 mail records, SendGrid records, Search Console records, SPF, DKIM, DMARC, TXT, MX, CNAME, and A records.
3. Migrate authoritative DNS to Azure DNS.
4. Bind `www.taucetilabs.com` and `taucetilabs.com` to Azure Static Web Apps.
5. Verify HTTPS, sitemap, robots, subscribe API, and old URL redirects.
6. Use canonical metadata and sitemap entries for `www`. Add Azure Front Door later only if strict host-level apex-to-www redirects become necessary.
7. Keep Squarespace hosting active for one to two weeks before cancellation.

## Launch Verification

```powershell
curl.exe -I https://www.taucetilabs.com/
curl.exe -I https://taucetilabs.com/
curl.exe -I https://www.taucetilabs.com/racecards
curl.exe -I https://www.taucetilabs.com/lithobreak
curl.exe -I https://www.taucetilabs.com/presskit-lithobreak
curl.exe -I https://www.taucetilabs.com/privacy/
curl.exe -I https://www.taucetilabs.com/terms/
```

Submit one company signup test after app settings are configured and confirm the subscriber row has `taucetilabs_general_updates` and `tauCetiSendGridMarketingStatus` is `synced`.

## Search Console

State on 2026-07-19:

- The `taucetilabs.com` domain property is verified through an apex TXT value in Azure DNS. The existing Microsoft, Azure-validation, and SPF values were preserved.
- `https://www.taucetilabs.com/sitemap.xml` is successful with five discovered pages and was submitted/read on 2026-07-19.
- The domain property is linked to GA4 property `375518847` and web stream `5194520268`.

Next actions:

1. Inspect the canonical pages as coverage data appears.
2. Request indexing for homepage, about, press, privacy, and terms only after live canonical and redirect checks pass.
3. Check that old product URLs redirect to standalone product sites.

## Google Analytics

Audit state on 2026-07-19:

- Account: `TauCetiLabs` (`93388616`).
- Property: `Tau Ceti Labs - GA4` (`375518847`).
- Web stream: `Tau Ceti Labs - GA4` (`5194520268`).
- Measurement ID: `G-YNN4P3GZR5`.
- Stream URL: `https://www.taucetilabs.com` (corrected 2026-07-19).
- Reporting timezone/currency: America/Los_Angeles and USD.
- The property reported no received data at the initial audit.
- Site source now contains an opt-in Google tag, Consent Mode v2 defaults, privacy controls, event sanitization, and GA4 CSP endpoints. Advertising consent types stay denied.

Implementation actions:

1. Run all local checks and inspect the consent banner in a browser preview.
2. Publish a focused pull request and review the Azure preview.
3. Validate one consented `page_view` plus the intended custom events in GA4 DebugView/realtime; confirm subscription fields are absent from Analytics requests.
4. Merge and verify production collection.
5. Completed 2026-07-19: linked the verified `taucetilabs.com` Search Console property to this web stream.

The shared event vocabulary, privacy requirements, and multi-site rollout order are in `C:\Dev\Tau Ceti Labs\docs\analytics-and-discovery-rollout.md`.
