# LithoBreak: Outpost connected-test policy review

Status: local owner-review draft, 2026-10-26. No merge, push, public preview, production deployment, provider configuration or Play Console change is authorized by this outcome. The previous offline policy draft is already live; its claims are superseded by the connected implementation and must be reconciled before use for the next test.

## Scope and owner decisions

- Writable target: `C:\Dev\Tau Ceti Labs\Tau Ceti Labs Website`, canonical repository `Tau-Ceti-Labs/TauCetiLabsWebsite`.
- Read-only product source: `C:\Dev\Tau Ceti Labs\Projects\LithoBreak Outpost`.
- Local branch: `agent/outpost-connected-policy-review`, based on `origin/main` at `945c563`. Existing uncommitted `AGENTS.md` and `THREAD_START.md` edits are unrelated and excluded from this outcome.
- No asset transfer. No source files, private identifiers, credentials, tokens, signing files, raw saves or service exports are copied into the website.
- Chris confirmed `team@taucetilabs.com` for Outpost support and account/data-deletion requests on 2026-10-26. The existing shared site contact setting is used.
- Chris said retention might be at least a year, but explicitly chose to leave it **undecided**. This is a tentative preference, not an approved minimum, maximum or deletion deadline. No one-year period appears in the page drafts.
- Accounts, explicit cloud campaign backup/recovery and connected Survey Works are intended for all approved internal testers. The currently implemented service still uses manual development enrollment. A **separate five-day event** is approved in principle; activation dates and final service implementation remain undecided. The old event calendar must not be reused as the new calendar.

## Draft routes

| Route | Purpose | Status |
| --- | --- | --- |
| `/lithobreak-outpost/privacy/` | Replace obsolete offline/no-account claims with the verified connected data flows | Draft; retention, release audit and final approval outstanding |
| `/lithobreak-outpost/delete-account/` | Prominent email request pathway for the Outpost app account and associated data; separate Unity provider pathway | Draft; mailbox confirmed, handling and complete service deletion still pending |
| `/lithobreak-outpost/terms/` | Proposed product-specific internal-test Terms destination | Draft; no effective date or acceptance mechanism; not configured in Unity |

All three pages visibly say they are drafts and use `noindex`. They link to each other, remain outside company navigation and the sitemap, and use the existing site layout and separate website-analytics notice. `noindex` is not access control: any later publicly hosted preview would be accessible by URL and needs Chris's approval. The company `/privacy/` and `/terms/` remain website-specific.

## Source and implementation evidence

The paths below are relative to the read-only Outpost source root unless marked as website paths. Inspection date: 2026-10-26.

| Evidence | What it establishes |
| --- | --- |
| `Documents/CONNECTED_ALPHA_WEBSITE_HANDOFF.md` | Canonical website ownership; required account/support/deletion/retention review; current development privacy URL; no Terms provider URL configured |
| `Documents/CONNECTED_SURVEY_WORKS_ALPHA_MILESTONE.md`, `Documents/Evidence/ConnectedSurveyWorks/README.md` | Manually enrolled development cohort; native sign-in/recovery, explicit backup/restore and real verified event progression; reward and local campaign separation |
| `Documents/CONNECTED_TEN_TIER_MILESTONE.md`, `Documents/Evidence/ConnectedTenTier/README.md` | Hosted ten-tier certification and native read-only fixtures; no population-load or new five-day participant pacing claim |
| `Game/Assets/Outpost/Presentation/AlphaClient.cs` | Explicit Connect initializes Unity Services and anonymous Authentication; linking/recovery uses Player Accounts; installation ID and local pending-request journal; event requests and leaderboard reads; explicit whole-campaign file upload; download size/hash checks |
| `Game/Assets/Outpost/Resources/UnityPlayerAccountSettings.asset`, source handoff | Scope mask 5, corresponding to `openid` and `offline_access`, with no email scope. Do not publish the client configuration or account identifiers |
| `Game/Assets/Outpost/Online/AlphaTypes.cs` | Account owner, installation/lease, checkpoint, attempt time, best/projected score, receipts, current/previous backup metadata; Engineer alias generated deterministically from player identity. Alias is pseudonymous, not anonymous |
| `Game/Assets/Outpost/Online/AlphaProtocol.cs` | Server validation, retry receipts, one writer, checkpoint progression and grant; backup metadata rotates current/previous references. No automatic age-based purge or complete account deletion |
| `Game/ConnectedSurveyWorksCCM/SurveyWorksAlpha/Project/AlphaModule.cs` | Linked account checks; operator enrollment and registry; protected Cloud Save; service-owned score projection and scheduler settlement. Fixture/operator identifiers are intentionally excluded from website docs and pages |
| `Game/Assets/Outpost/Presentation/GameConnectedSurveyWorks.cs` | Connect/link/recover/enrollment UI; explicit backup/restore confirmation; retained local branch; inventories never merged; current development event dates are hard-coded, not a new test schedule |
| `Game/Assets/Outpost/Presentation/SaveStore.cs`, `FrameTelemetry.cs` | Local campaign/save/report storage; performance reports include game/Unity/device/OS/GPU/screen/timing. No automatic performance-report upload found in reviewed code |
| `Game/Packages/manifest.json`, `Game/ProjectSettings/UnityConnectSettings.asset` | Authentication/Core/Cloud Code/Cloud Save/Leaderboards packages present; Player Accounts used by authored code. Analytics/Ads/cloud diagnostics disabled in project configuration; this does not prove zero SDK or infrastructure processing |
| Campaign elapsed-progression milestones in source guidance and current campaign implementation | Local campaign progresses for time away. Historical foreground-only/no-catch-up language must not be carried into current pages |
| Website `src/layouts/BaseLayout.astro`, `src/pages/privacy.astro` | Consent-aware website GA4 is independent of in-game Unity SDKs and connected service processing |

The task brief pins gameplay 0.50.0 / code 81. During inspection, `Game/ProjectSettings/ProjectSettings.asset` already showed 0.50.0 / code 82, consistent with a source project under active work. The public drafts avoid build-specific claims. Re-audit the actual internal-test artifact and service configuration before approval; older milestone build codes and `PLAY_STORE_SETUP.md`'s offline 0.34.1 statements are historical.

Important storage limitation: every `AlphaClient.Backup` upload gets a new immutable file name. `AlphaProtocol.Backup` retains current/previous **metadata references**, but neither the inspected client nor module deletes older uploaded files. Two references do not mean only two files exist. Failed or conflicting uploads may leave additional files. Retention/deletion must enumerate all account-owned files, including unreferenced versions.

## Live baseline inspected

Read-only HTTPS checks on 2026-10-26:

- `/lithobreak-outpost/privacy/`: serves the 2026-10-13 owner-review draft, including the now-obsolete statement that the prototype has no player accounts and sends no saved progress to a server.
- `/privacy/`: company website privacy/optional GA4/signup notice.
- `/terms/`: website terms only; it is not sufficient product-specific internal-test terms.
- `/lithobreak-outpost/delete-account/`: returns the site's Not Found content even though the observed HTTP status is 200. It is not an existing deletion resource.
- No change was made to any live route. The fetched baseline is observations of public pages, not copied private service data.

## Decisions Chris still needs to make

| Decision | Required detail | Current status |
| --- | --- | --- |
| Account and event retention | Trigger and maximum duration for linked and temporary identities, enrollment records, event attempts/checkpoints/history, aliases/scores, device-control records and reward receipts; distinguish event close, inactivity and deletion requests | Undecided; one-year idea is tentative only |
| Backup retention | Current/previous and orphaned/older uploads; replacement, inactive-account and account-deletion behavior; provider backup residuals | Undecided; no automatic cleanup implemented |
| Logs and support retention | Operational/security logs, support email/attachments and deletion-request audit records; legal/security exceptions, purpose and duration if any | Undecided; provider defaults and capabilities still need verification |
| Request ownership and verification | Named handler/backup handler with mailbox access; safe way to verify account ownership; recovery path for lost sign-in; alias alone must not authorize deletion | Mailbox confirmed; handler and verification method undecided |
| Handling commitments | Acknowledgment, completion or status-update timing; how completion/failure/necessary retained records are communicated; ability to meet commitments | Undecided; no SLA or automated fulfillment promised |
| Scope and consequences | Whole Outpost account/data deletion versus backups-only or support-only requests; local copies, grant receipts, re-enrollment and re-upload effects; any justified retention exceptions | Needs owner decision plus service implementation |
| Terms and audience | Approve proposed internal-test rules; confirm participant eligibility/age and applicable Unity account requirements; test-data reset/preservation rules and test instructions | Proposed only; no agreement accepted or provider Terms URL changed |
| New event | Separate event identity/calendar, approved-tester enrollment, final service configuration and verified rules | Separate game/service outcome; no dates announced |
| Publication | Final text, effective date, removal of unresolved notices, allowed discoverability, preview/public deployment and store/provider URLs | Explicit approval required; none granted here |

The pages intentionally expose unresolved retention/deletion limits during owner review. They must not be represented as a finished privacy policy, working deletion service or store-policy certification.

## External references checked

- [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en): disclose collection/use/sharing/security/retention/deletion and provide in-app and external account-deletion initiation where account creation is available. Removing/freezing access alone is insufficient.
- [Google Play account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en): a service email can be an external request method, but the complete request-handling process and associated data deletion still need to work, and expectations/retention must be disclosed. A draft mailbox link is not proof of fulfillment or store approval.
- [Unity Player Accounts integration guidance](https://docs.unity.com/en-us/authentication/unity-player-accounts): provide application and provider data/deletion pathways, including `https://player-account.unity.com/delete-account` and `unity-player-login-privacy@unity3d.com`.
- [Unity Player Accounts privacy overview](https://docs.unity.com/en-us/authentication/privacy-and-consent/data-privacy-unity-player-accounts): Unity account deletion is separate from deleting data collected by integrated apps/services. Unity requires provider-account requests to come from the player. Unity's own retention text is not adopted as Outpost's retention policy.
- [Unity Game Player and App User Privacy Policy](https://unity.com/legal/game-player-and-app-user-privacy-policy): provider practices are linked separately from Outpost and website disclosures.

These are implementation references, not a legal approval or a claim that the internal-test release is compliant. Chris must approve the actual practices and text.

## Validation and release gates

Local validation on 2026-10-26:

- `npm.cmd run build`: passed, including Astro check (16 files; zero errors/warnings and one pre-existing CommonJS conversion hint in `api/subscribe/index.js`) and all nine static routes. The first restricted run passed type checking but failed creating an output directory with Windows `EPERM`; rerunning with normal Windows file access succeeded. No dependencies or security settings were changed.
- `npm.cmd run verify:static`: passed; includes all three draft routes, review notices, `noindex`, reciprocal links, connected disclosures and public-navigation/sitemap exclusion.
- `npm.cmd run test:api`: existing subscribe API tests passed. No support/deletion email was sent and no form was submitted.
- `git diff --check`: passed. Existing `AGENTS.md` and `THREAD_START.md` edits are excluded from the policy commit.
- Generated HTML inspection passed for canonical URLs, draft notices, `noindex`, every internal link target, reciprocal policy links and the `team@taucetilabs.com` request URL/encoded subject. Page hashes and results: [route-checks.json](evidence/outpost-connected-policy/route-checks.json).
- Local preview HTTP checks returned 200 for privacy (19,719 bytes), deletion (14,249 bytes) and Terms (13,306 bytes). The preview required normal Windows local process access; the restricted process could not be reached from Chrome.
- Browser desktop review: privacy, deletion and Terms rendered with the existing layout. Full privacy and deletion text and their email/provider links were inspected through DOM/accessibility snapshots. Saved [privacy desktop capture](evidence/outpost-connected-policy/privacy-desktop.jpg), [deletion desktop capture](evidence/outpost-connected-policy/deletion-desktop.jpg) and [Terms desktop capture](evidence/outpost-connected-policy/terms-desktop.png). The deletion capture was confirmed from disk after an intermediate tool timeout.
- Responsive review: Terms rendered cleanly at 390 × 844; the DOM measured viewport width 390, document width 375 and main content width about 338.7 pixels. Saved [native Terms phone-width capture](evidence/outpost-connected-policy/terms-mobile-390.png), showing the narrow viewport within the desktop browser. **Privacy/deletion mobile review and a 320-pixel pass remain incomplete**: the browser repeatedly timed out or stalled during subsequent navigation. Do not treat a requested viewport change or unfinished navigation as completed page validation. The incomplete deletion capture was discarded.
- Azure/PR preview and production validation were not performed. No branch push, PR, merge or publication was made.

Before publication:

1. Resolve the owner decisions above and reconcile page text with actual handling capabilities. Approve final text/effective date.
2. Complete the [game/service handoff](lithobreak-outpost-connected-game-handoff.md), including deletion and request verification, exact test artifact/SDK/network and Android backup checks. Update disclosures to match evidence.
3. Obtain Chris's approval before a push/PR that creates a publicly accessible preview. Follow the normal focused branch, PR checks and Azure preview workflow; review the three pages and company-page boundaries there.
4. Merge/deploy production only after explicit approval. Verify all three live pages by content as well as HTTP status, canonical metadata, request email, provider links and mobile layout. Then allow the game owner to update provider and Play URLs and the in-app links.

## Historical context

Chris approved a clearly marked direct-access offline policy draft on 2026-10-13. It was delivered through the previous `agent/outpost-privacy-public-draft` branch and is now on `main` via PR #4. Its final-bundle/Android-backup/support-retention audit was never a connected-service audit. The current task replaces that obsolete offline wording locally; the earlier publication permission does not authorize this task's connected-policy publication.
