# Tau Ceti Labs Website Agent Guide

Standalone Astro/Azure Static Web Apps company hub for Tau Ceti Labs.

## Repository Status

- Canonical repository: `https://github.com/Tau-Ceti-Labs/TauCetiLabsWebsite`
- Default branch: `main`
- Normal delivery: focused branch, pull-request validation and Azure preview, then production deployment after merge to `main`
- Direct pushes to `main` and manual Azure CLI deployment are emergency paths, not the routine update flow

## Commands

Use the PowerShell command shim when `npm.ps1` is blocked.

```powershell
npm.cmd install
npm.cmd run check
npm.cmd run build
npm.cmd run verify:static
npm.cmd run test:api
```

## Source Of Truth

- `THREAD_START.md` covers startup context and the required startup receipt.
- `README.md` covers the site purpose and commands.
- `docs/site-strategy.md` owns positioning and routing strategy.
- `docs/deployment.md` and `docs/rollout.md` own hosting and release steps.

## Content Rules

- Read `THREAD_START.md` and post its startup receipt before editing files.
- This site is the company hub. Product details belong on the standalone product sites.
- Do not pull detailed product claims into the hub unless the linked product site already supports them.
- Treat the future game room as Phase 2 unless explicitly re-scoped.

## Closeout

For UI/content work, include commands run and whether browser or visual verification was performed.
