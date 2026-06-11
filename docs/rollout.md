# Rollout Checklist

## Prelaunch

- Build the site locally.
- Run static verification and API tests.
- Deploy to Azure Static Web Apps default hostname.
- Verify default-host pages and redirects.
- Configure subscribe API app settings.
- Submit one subscribe test.

## DNS Cutover

- Preserve Microsoft 365 records before DNS changes.
- Preserve SendGrid authentication records for `taucetilabs.com`.
- Bind apex and `www` in Azure Static Web Apps.
- Keep apex canonical.
- Confirm `www` redirects to `https://taucetilabs.com/`.

## Postlaunch

- Submit sitemap to Search Console.
- Verify old URL redirects.
- Monitor feedback from Discord and email.
- Keep Squarespace hosting active for one to two weeks.
- Cancel Squarespace hosting only after DNS and redirects are stable.

## Deferred

- Phase 2 game room under `/play/` or `/lab/`.
- Legacy Allverse archive, only if there is a product/brand reason to republish it.
