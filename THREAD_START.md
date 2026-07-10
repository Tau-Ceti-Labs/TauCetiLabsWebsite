# Tau Ceti Labs Website Thread Start

Use this file when starting a Tau Ceti Labs Website coordinator, implementation, or spike thread from `C:\Dev\Tau Ceti Labs\Tau Ceti Labs Website`.

This is the canonical local clone of `Tau-Ceti-Labs/TauCetiLabsWebsite`. Use a focused branch for publish-bound implementation and treat `main` as the production deployment branch.

## Required Startup

Read:

- `AGENTS.md`
- `THREAD_START.md`
- `README.md`
- `docs/site-strategy.md` for positioning, routing, and content structure
- `docs/deployment.md` or `docs/rollout.md` only for hosting, deploy, or release tasks

For implementation, inspect the specific `src/` files before editing.

## Thread Types

- Coordinator: review company-site docs, evaluate whether site/content/deploy tasks are complete, maintain follow-up docs, and generate starting prompts for implementation or spike threads.
- Implementation: deliver a bounded site/content/deploy outcome. Larger tasks are acceptable when scope, checkpoints, validation, and closeout remain clear.
- Spike: investigate unclear positioning, claim, deploy, or UI questions, then recommend an implementation task, coordinator decision, or docs update.

Coordinator threads may update docs and task prompts. They should not make broad site changes unless they explicitly switch into an implementation task.

## Do Not Load As Startup Context

- `dist/`
- `node_modules/`
- generated build output
- product-specific project docs unless the task explicitly touches that product's live claim

## Startup Receipt

Before edits, report:

```text
Docs read:
- ...

Docs intentionally skipped:
- ...

Current task understanding:
- ...

Authorized actions / write scope:
- ...

Assumptions / risks:
- ...

Expected validation:
- ...
```

## Validation Notes

Use the narrowest meaningful command, usually `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run verify:static`, or `npm.cmd run test:api`. For UI/content changes, say whether browser or visual verification was performed.
