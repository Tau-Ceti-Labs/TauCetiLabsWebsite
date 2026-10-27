# Outpost connected-test game and service handoff

Prepared 2026-10-26 by the website policy task. This document requests follow-up in `C:\Dev\Tau Ceti Labs\Projects\LithoBreak Outpost`; the website task has not edited that project, configured Unity services, or changed Play Console.

## Proposed website destinations

- Privacy: `https://www.taucetilabs.com/lithobreak-outpost/privacy/` — currently serves the old offline review draft; connected replacement is local only.
- App account/data deletion: `https://www.taucetilabs.com/lithobreak-outpost/delete-account/` — local draft only; not a working published resource yet.
- Internal test Terms: `https://www.taucetilabs.com/lithobreak-outpost/terms/` — local draft only; no effective date or accepted agreement.
- Support/request mailbox: **team@taucetilabs.com**, confirmed by Chris. Ownership verification, request handler and timing are not yet decided.

Do not configure the proposed URLs in the provider or Play listing until the owner accepts the content and the website task confirms the corresponding live pages. Do not reuse the prior development event dates for the separate new five-day event.

## Game/service work required

1. Add discoverable in-app privacy, support, app-account/data-deletion initiation and approved Terms destinations. Preserve the distinction between Outpost's game-service identity and the wider Unity Player Account. An alias is a lookup aid, not authorization to delete another account.
2. Agree a safe account-ownership verification and lost-sign-in support path with Chris. Make the request path usable without requiring the player to reinstall or successfully sign into the game. Do not ask for account passwords, sign-in codes or tokens by email.
3. Implement and validate complete deletion handling across Authentication identity, enrollment/settlement registry, protected profile/checkpoints/history/receipts/device controls, leaderboard entry/metadata, **all** account-owned Cloud Save files and manifests, and approved operational/support/audit records. Enumerate old, orphaned and failed-upload files, not only current/previous metadata references. Coordinate writes/settlement so deletion cannot recreate records. Define what happens on later sign-in, re-enrollment and uploading/restoring retained local saves, including reward receipts. This is required design/validation work, not a claim that all categories can be erased through an existing endpoint.
4. Implement Chris's eventual retention decisions and any justified exceptions; communicate completion/status and retained records accurately. There is no approved one-year retention rule, deletion SLA, exemption or automated purge today.
5. Keep local campaign/practice, explicit cloud backup/restore, and server-verified event state separate. Preserve campaign elapsed progression and the retained local restore branch. Do not represent backup recovery as continuous sync or authoritative campaign validation.
6. Verify the exact Google Play internal-test artifact: packaged SDKs, merged manifest/permissions, sign-in scopes/deep links, native/platform network and diagnostics behavior, and Android backup/data-extraction rules. Reconcile website disclosures and Data safety with this evidence. Project settings alone are insufficient.
7. Prepare the separate approved five-day event, with owner-confirmed activation dates, service configuration, approved-tester enrollment and participant instructions. The present manually enrolled development cohort does not prove that every approved Play tester can use the new event.

Use the website [review record](lithobreak-outpost-privacy-review.md) for the current evidence and decision table. Bring any changed collection, retention or deletion behavior back to the website owner for reconciliation before publication.

## Validation expected from the game/service owner

Exercise the ordinary player's in-app request initiation and external request path; account recovery and verification; deletion with a pending request/settlement and multiple devices; removal of all backup versions and leaderboard/profile/enrollment data; re-sign-in/re-upload behavior; and a completion record that contains no credentials. Record which provider-controlled records require separate player action and which justified records remain, for how long and why. Final internal-test enrollment/event checks must use the accepted build and service setup.

No game-side changes are claimed complete by this handoff. Final retention wording and website publication still require Chris's approval.
