# Tau Ceti Labs Website Strategy

## Current Squarespace Behavior

Verified on 2026-06-11:

- `https://taucetilabs.com/` returns the Squarespace-hosted homepage.
- `https://www.taucetilabs.com/` redirects to `https://taucetilabs.com/`.
- `https://taucetilabs.com/racecards` redirects to `https://www.race.cards/`.
- `https://taucetilabs.com/lithobreak` returns `404`.
- `https://taucetilabs.com/presskit-lithobreak` still serves a legacy LithoBreak press kit.
- Authoritative DNS is Microsoft Online DNS, not Squarespace.

The current homepage says Tau Ceti Labs is an indie game studio, uses "Play With Science", links to LithoBreak, RaceCards, Discord, and includes a general subscribe form.

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
