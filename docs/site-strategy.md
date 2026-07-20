# Tau Ceti Labs Website Strategy

## Historical Pre-Migration Squarespace Behavior

Recorded on 2026-06-11 as the replacement baseline:

- `https://taucetilabs.com/` returns the Squarespace-hosted homepage.
- `https://www.taucetilabs.com/` redirects to `https://taucetilabs.com/`.
- `https://taucetilabs.com/racecards` redirects to `https://www.race.cards/`.
- `https://taucetilabs.com/lithobreak` returns `404`.
- `https://taucetilabs.com/presskit-lithobreak` still serves a legacy LithoBreak press kit.
- Authoritative DNS is Microsoft Online DNS, not Squarespace.

The current homepage says Tau Ceti Labs is an indie game studio, uses "Play With Science", links to LithoBreak, RaceCards, Discord, and includes a general subscribe form.

## Current Public And Measurement State

Audited on 2026-07-19:

- `https://www.taucetilabs.com/` serves the replacement company hub and uses it as the canonical hostname.
- Search results have discovered the replacement homepage, but they also still expose legacy non-`www` pages and claims. Redirect and canonical cleanup remains an active discovery task.
- Google Analytics contains property `Tau Ceti Labs - GA4` (`375518847`), stream `5194520268`, and measurement ID `G-YNN4P3GZR5`; the stream URL was corrected to `https://www.taucetilabs.com` on 2026-07-19.
- The `taucetilabs.com` Search Console domain property is verified through Azure DNS, linked to the matching GA4 stream, and its sitemap is successful with five discovered pages.
- Consent-aware Google Analytics source is implemented locally; production data remains pending reviewed deployment.
- The coordinated implementation and scorecard requirements are in the workspace [Analytics and Discovery Rollout](../../docs/analytics-and-discovery-rollout.md).

## Replacement Purpose

The new site is a company hub, not a product site and not a full content archive.

It should:

- explain Tau Ceti Labs in one clear pass;
- route visitors to LithoBreak and RaceCards standalone sites;
- keep press, contact, privacy, and terms stable;
- preserve old URL value through redirects;
- keep product claims current-state-first and product-site-owned.

It should not:

- re-publish old LithoBreak claims about orbital gameplay, broad logistics, or finished construction systems;
- duplicate RaceCards or LithoBreak product-site content;
- launch the future game room before the migration is stable.

## Legacy URL Classification

- Product redirects:
  - `/racecards` and `/racecards/*` -> `https://www.race.cards/`
  - `/lithobreak` and `/lithobreak/*` -> `https://www.lithobreak.com/`
  - `/presskit-lithobreak` and `/media-lithobreak` -> `https://www.lithobreak.com/press-kit/`
- RaceCards legacy pages:
  - component and instructions pages -> RaceCards quick-start/downloads destinations.
- Company pages:
  - `/home` and `/home-heights` -> `/`
  - `/about-old` -> `/about/`
  - `/termsofservice` -> `/terms/`
- Allverse/old lore:
  - `/allverse` and `/allverse/*` -> `/` for v1.
  - Revisit only if there is a deliberate content-archive project later.

## Phase 2 Options

The game room should be evaluated after launch as a `/play/` or `/lab/` section. Good candidates:

- small browser toys based on science or materials;
- RaceCards dice roller promotion or lightweight embed;
- tiny simulations that teach a mechanic without implying a product feature is ready.

Phase 2 should have its own acceptance criteria and should not block the Squarespace hosting migration.
