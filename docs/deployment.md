# Tau Ceti Labs Website Deployment

Canonical public destination: `https://taucetilabs.com/`. The `www` hostname should redirect to the apex.

## Azure Target

- Host: Azure Static Web Apps
- Resource group: `rg-taucetilabs-web`
- Static Web App: `swa-taucetilabs-web`
- Default hostname: `https://victorious-rock-0bf71380f.7.azurestaticapps.net/`
- Primary domain: `taucetilabs.com`
- Secondary domain: `www.taucetilabs.com` redirecting to apex
- API: Azure Functions from the `api/` folder

## GitHub Setup

1. GitHub repo: `https://github.com/cmoeTCL/TauCetiLabsWebsite`.
2. Default branch: `main`.
3. Add Azure deployment token as `AZURE_STATIC_WEB_APPS_API_TOKEN`.
4. Confirm `.github/workflows/azure-static-web-apps.yml` deploys `dist/` and `api/`.

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

- Authoritative nameservers are Microsoft Online DNS.
- Apex currently uses Squarespace A records.
- `www` currently CNAMEs to `ext-sq.squarespace.com`.

Preferred rollout:

1. Deploy and verify on the Azure default hostname.
2. Inventory and preserve Microsoft 365 mail records, SendGrid records, Search Console records, SPF, DKIM, DMARC, TXT, MX, CNAME, and A records.
3. If Microsoft Online DNS cannot support the apex binding required by Azure Static Web Apps, migrate authoritative DNS to Azure DNS.
4. Bind `taucetilabs.com` to Azure Static Web Apps.
5. Bind `www.taucetilabs.com` and configure it to redirect to apex.
6. Verify HTTPS, redirects, sitemap, robots, and old URL redirects.
7. Keep Squarespace hosting active for one to two weeks before cancellation.

## Launch Verification

```powershell
curl.exe -I https://taucetilabs.com/
curl.exe -I https://www.taucetilabs.com/
curl.exe -I https://taucetilabs.com/racecards
curl.exe -I https://taucetilabs.com/lithobreak
curl.exe -I https://taucetilabs.com/presskit-lithobreak
curl.exe -I https://taucetilabs.com/privacy/
curl.exe -I https://taucetilabs.com/terms/
```

Submit one company signup test after app settings are configured and confirm the subscriber row has `taucetilabs_general_updates` and `tauCetiSendGridMarketingStatus` is `synced`.

## Search Console

After launch:

1. Verify `https://taucetilabs.com/`.
2. Submit `https://taucetilabs.com/sitemap.xml`.
3. Request indexing for homepage, about, press, privacy, and terms.
4. Check that old product URLs redirect to standalone product sites.
