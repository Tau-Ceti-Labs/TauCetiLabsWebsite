# LithoBreak: Outpost connected-test policy review

Status: owner-review draft, updated 2026-10-26 after Chris approved the retention schedule/manual deletion process and then authorized completing mobile validation and opening a draft PR for review. Branch push and the normal Azure PR preview are now authorized. Final policy activation, merge, production deployment, provider configuration and Play Console changes remain outside this authorization. The previous offline policy draft is already live; its claims are superseded by the connected implementation and must be reconciled before use for the next test.

## Scope and owner decisions

- Writable target: `C:\Dev\Tau Ceti Labs\Tau Ceti Labs Website`, canonical repository `Tau-Ceti-Labs/TauCetiLabsWebsite`.
- Read-only product source: `C:\Dev\Tau Ceti Labs\Projects\LithoBreak Outpost`.
- Local branch: `agent/outpost-connected-policy-review`, based on `origin/main` at `945c563`. Existing uncommitted `AGENTS.md` and `THREAD_START.md` edits are unrelated and excluded from this outcome.
- No asset transfer. No source files, private identifiers, credentials, tokens, signing files, raw saves or service exports are copied into the website.
- Chris confirmed `team@taucetilabs.com` for Outpost support and account/data-deletion requests on 2026-10-26. The existing shared site contact setting is used.
- Chris subsequently approved the recommended schedule: account recovery for up to 12 months of player inactivity; event details for 90 days after closure; latest and previous cloud backups with older/orphaned files removed within 30 days; developer-controlled logs for 30 days; support emails for 12 months after closure and attachments for 90 days; minimal completion records for 12 months. Full-service retirement starts a 30-day removal window unless the tester chooses migration; the earlier account expiry controls. Valid earlier deletion requests override ordinary retention. The former tentative one-year minimum is superseded: the 12-month account window is a maximum ordinary inactivity period, not a minimum hold.
- Chris approved manual handling through the confirmed mailbox, with himself as initial handler, acknowledgment within three business days and a 30-calendar-day completion target measured from original receipt, including ownership checks. Verification uses the established tester-enrollment contact mapped to the exact account; no assumed provider-email match. A lost-access route must not require reinstallation. A trusted backup handler for absences remains to be designated.
- The approved operational procedure, complete schedule, exception boundaries and acceptance checks are recorded in the [game/service handoff](lithobreak-outpost-connected-game-handoff.md). This approval does not establish that deletion, cleanup, mailbox routines, expiry tracking or enrollment-contact mapping are implemented, or approve publication.
- Chris subsequently authorized the remaining mobile checks and a draft PR for review, including its normal branch push and Azure review preview. That review authorization does not activate the policy or approve merge/production deployment.
- Accounts, explicit cloud campaign backup/recovery and connected Survey Works are intended for all approved internal testers. The currently implemented service still uses manual development enrollment. A **separate five-day event** is approved in principle; activation dates and final service implementation remain undecided. The old event calendar must not be reused as the new calendar.

## Draft routes

| Route | Purpose | Status |
| --- | --- | --- |
| `/lithobreak-outpost/privacy/` | Replace obsolete offline/no-account claims with verified connected data flows and the approved retention schedule | Draft; implementation, release audit and final effective wording/publication outstanding |
| `/lithobreak-outpost/delete-account/` | Prominent email request pathway, approved manual process and separate Unity provider pathway | Draft; handler/process approved, complete service deletion and validation still pending |
| `/lithobreak-outpost/terms/` | Proposed product-specific internal-test Terms destination | Draft; no effective date or acceptance mechanism; not configured in Unity |

All three pages visibly say they are drafts and use `noindex`. They link to each other, remain outside company navigation and the sitemap, and use the existing site layout and separate website-analytics notice. `noindex` is not access control: a publicly hosted preview is accessible by URL. Chris has now authorized the draft-PR review preview. The company `/privacy/` and `/terms/` remain website-specific.

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

## Decision status and remaining release gates

| Decision | Required detail | Current status |
| --- | --- | --- |
| Account and event retention | Up to 12 months after last player-initiated connected activity; full-service retirement removal within 30 days unless chosen migration; detailed event data 90 days after event close; minimum reward receipt follows account window | Approved; activity/expiry tracking and actual cleanup still need implementation |
| Backup retention | Latest successful plus immediately previous; remove older/orphaned uploads within 30 days; remove all versions on account expiry/deletion | Approved; complete file enumeration/cleanup and provider residual handling need validation |
| Logs and support retention | Own logs/exports 30 days; relevant unresolved-issue extract follows support schedule; email 12 months after closure, attachments 90 days; minimal completion record 12 months | Approved; verify provider-controlled retention and mailbox deletion capabilities; no blanket exception established |
| Request ownership and verification | Chris is initial handler at team@taucetilabs.com; verify established enrollment contact bound to exact account; alias alone is insufficient; lost-access route without reinstallation | Approved; establish safe mapping and accessible verification procedure; designate trusted backup for absences |
| Handling commitments | Acknowledge within three business days; aim to complete within 30 calendar days from original receipt including verification; status before deadline if unresolved; shorter applicable legal deadline controls | Approved; daily mailbox checks, private case register, due-date review and operational proof pending |
| Scope and consequences | Whole Outpost account and associated connected data/support correspondence, backups-only or support-only; local saves remain; fresh approval before deleted tester re-enrolls; case-only completion record | Approved; implement write/settlement coordination and verify cached sessions cannot recreate data; any specific justified exception needs purpose/expiry and requester explanation |
| Terms and audience | Approve proposed internal-test rules; confirm participant eligibility/age and applicable Unity account requirements; test-data reset/preservation rules and test instructions | Proposed only; no agreement accepted or provider Terms URL changed |
| New event | Separate event identity/calendar, approved-tester enrollment, final service configuration and verified rules | Separate game/service outcome; no dates announced |
| Publication | Draft PR and Azure review preview; final effective wording/date, notice removal, discoverability and store/provider URLs | Draft PR/preview authorized; policy activation, merge and production deployment still require explicit approval |

The pages distinguish approved policy decisions from unimplemented or unvalidated service behavior. They must not be represented as a finished effective privacy policy, working deletion service or store-policy certification. Do not revert the approved decisions to "undecided" merely because implementation remains open.

## External references checked

- [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en): disclose collection/use/sharing/security/retention/deletion and provide in-app and external account-deletion initiation where account creation is available. Removing/freezing access alone is insufficient.
- [Google Play account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en): a service email can be an external request method, but the complete request-handling process and associated data deletion still need to work, and expectations/retention must be disclosed. A draft mailbox link is not proof of fulfillment or store approval.
- [Unity Player Accounts integration guidance](https://docs.unity.com/en-us/authentication/unity-player-accounts): provide application and provider data/deletion pathways, including `https://player-account.unity.com/delete-account` and `unity-player-login-privacy@unity3d.com`.
- [Unity Player Accounts privacy overview](https://docs.unity.com/en-us/authentication/privacy-and-consent/data-privacy-unity-player-accounts): Unity account deletion is separate from deleting data collected by integrated apps/services. Unity requires provider-account requests to come from the player. Unity's own retention text is not adopted as Outpost's retention policy.
- [Unity Game Player and App User Privacy Policy](https://unity.com/legal/game-player-and-app-user-privacy-policy): provider practices are linked separately from Outpost and website disclosures.
- [Unity Authentication privacy overview](https://docs.unity.com/en-us/authentication/privacy-and-consent/overview), [Cloud Save privacy overview](https://docs.unity.com/en-us/cloud-save/privacy-and-consent/overview) and [Leaderboards privacy overview](https://docs.unity.com/en-us/leaderboards/privacy-and-consent/overview): deletion is service-specific; do not assume deleting the Authentication identity cascades to files, protected data or board records. Provider defaults do not implement the approved Outpost retention schedule.
- [Unity Cloud Code logging](https://docs.unity.com/en-us/cloud-code/logging/overview): documents seven days of logging retention. This is not a retention claim for all Unity infrastructure records. The actual service/provider audit remains open.

These are implementation references, not a legal approval or a claim that the internal-test release is compliant. Chris has approved the schedule/process choices; final effective wording, actual implementation evidence and publication still need review.

## Validation and release gates

Initial-draft validation on 2026-10-26, committed as `8028f4f` before the retention/process approval. These captures and hashes are historical evidence of that first draft; they do not show the revised approved-policy wording:

- `npm.cmd run build`: passed, including Astro check (16 files; zero errors/warnings and one pre-existing CommonJS conversion hint in `api/subscribe/index.js`) and all nine static routes. The first restricted run passed type checking but failed creating an output directory with Windows `EPERM`; rerunning with normal Windows file access succeeded. No dependencies or security settings were changed.
- `npm.cmd run verify:static`: passed; includes all three draft routes, review notices, `noindex`, reciprocal links, connected disclosures and public-navigation/sitemap exclusion.
- `npm.cmd run test:api`: existing subscribe API tests passed. No support/deletion email was sent and no form was submitted.
- `git diff --check`: passed. Existing `AGENTS.md` and `THREAD_START.md` edits are excluded from the policy commit.
- Generated HTML inspection passed for canonical URLs, draft notices, `noindex`, every internal link target, reciprocal policy links and the `team@taucetilabs.com` request URL/encoded subject. Page hashes and results: [route-checks.json](evidence/outpost-connected-policy/route-checks.json).
- Local preview HTTP checks returned 200 for privacy (19,719 bytes), deletion (14,249 bytes) and Terms (13,306 bytes). The preview required normal Windows local process access; the restricted process could not be reached from Chrome.
- Browser desktop review: privacy, deletion and Terms rendered with the existing layout. Full privacy and deletion text and their email/provider links were inspected through DOM/accessibility snapshots. Saved [privacy desktop capture](evidence/outpost-connected-policy/privacy-desktop.jpg), [deletion desktop capture](evidence/outpost-connected-policy/deletion-desktop.jpg) and [Terms desktop capture](evidence/outpost-connected-policy/terms-desktop.png). The deletion capture was confirmed from disk after an intermediate tool timeout.
- Responsive review: Terms rendered cleanly at 390 × 844; the DOM measured viewport width 390, document width 375 and main content width about 338.7 pixels. Saved [native Terms phone-width capture](evidence/outpost-connected-policy/terms-mobile-390.png), showing the narrow viewport within the desktop browser. **Privacy/deletion mobile review and a 320-pixel pass remain incomplete**: the browser repeatedly timed out or stalled during subsequent navigation. Do not treat a requested viewport change or unfinished navigation as completed page validation. The incomplete deletion capture was discarded.
- Azure/PR preview and production validation were not performed. No branch push, PR, merge or publication was made.

### Approved-schedule revision validation, 2026-10-26

- Updated all three page drafts and this review/handoff after Chris's explicit approval. The policy decision status is approved; implementation, final effective wording/date and publication remain pending. The unrelated guidance-file edits remain excluded.
- `npm.cmd run build`: final build passed, including Astro check (zero errors/warnings and the same pre-existing API CommonJS hint) and all nine routes. A browser review found the retention anchor could sit under the sticky header; a scoped scroll margin was added, and the final source was rebuilt successfully.
- `npm.cmd run verify:static`, the existing `npm.cmd run test:api` suite and `git diff --check` passed. The verifier now requires a retention anchor and implementation-limit disclosure instead of requiring the superseded "undecided" wording. No new API behavior or destructive service action was introduced.
- Final built HTML verification passed for all three policy pages, canonical metadata, draft/noindex notices, internal targets, the retention anchor, reciprocal links, the deletion email URL and public navigation/sitemap boundaries. Current byte counts and SHA-256 values are in [approved-route-checks.json](evidence/outpost-connected-policy/approved-route-checks.json). The earlier report above remains initial-draft evidence.
- Current desktop browser review inspected the full privacy and deletion text and rendered sections from the final build. Saved the [approved retention section](evidence/outpost-connected-policy/approved-retention-desktop.png), [updated deletion-page notice](evidence/outpost-connected-policy/approved-deletion-desktop.png), and [manual process](evidence/outpost-connected-policy/approved-deletion-process-desktop.png). The native browser view was used for this content review; no email was sent and no provider or account action was taken.
- No new phone-width validation was performed in this revision. The initial Terms 390-pixel pass remains historical; privacy/deletion mobile and 320-pixel coverage still need completion before publication. Terms was checked in the build/generated HTML for the updated approved-policy wording and links.
- Local preview only; no public preview, push, PR, merge, production deployment, game-project edit, provider configuration or Play Console change. The preview process and task-created browser tab were closed after review.

### Completed mobile review and draft-PR authorization, 2026-10-26

This pass supersedes the earlier incomplete-mobile notes. The final `a1c7859` page sources were reviewed in Chrome's actual responsive browser mode at **390 × 844** and **320 × 844** CSS pixels. This is browser emulation, not an Android hardware playtest. The visible device toolbar records dimensions; its display zoom was Fit to window. No layout or content repair was needed.

| Page | 390-pixel review | 320-pixel review |
| --- | --- | --- |
| Privacy | Title/draft notice, navigation, package identifier, retention anchor below sticky header, account/event/backup/log/support windows and lower contact/local-data wording | Same principal layout areas; long identifier and links remained within the readable column, retention heading cleared the sticky header |
| Account/data deletion | Title/draft notice, request email, process, acknowledgment/verification/completion targets, provider-account distinction and full Unity privacy-support address | Same principal layout areas; long provider email wrapped within the column and local-save/provider-backup wording remained readable |
| Internal-test Terms | Current title, review notice, navigation and introductory test wording | Current title/navigation plus lower support commitments, policy links and review/approval boundary |

- Saved the captures and their hashes in [mobile-review.json](evidence/outpost-connected-policy/mobile-review.json). Representative captures: [privacy retention at 320](evidence/outpost-connected-policy/privacy-mobile-320-retention.jpg), [privacy retention at 390](evidence/outpost-connected-policy/privacy-mobile-390-retention.jpg), [deletion timing at 320](evidence/outpost-connected-policy/deletion-mobile-320-timing.jpg), [provider email at 320](evidence/outpost-connected-policy/deletion-mobile-320-provider.jpg), and [current Terms at 320](evidence/outpost-connected-policy/terms-mobile-320-top.jpg). Earlier screenshot files remain explicitly historical.
- No horizontal clipping or overlapping text was observed in the inspected areas. The privacy-to-deletion navigation was observed in the mobile browser; the retention anchor was reached at both widths. Mailto/provider destinations were inspected without sending email, signing in or requesting deletion. Markup target/anchor checks remain in the approved route report.
- The local preview HTML matched all three approved build hashes before inspection. The final `npm.cmd run build` passed again (nine pages; zero type errors/warnings, same existing API hint); static verification, existing API tests and whitespace checks passed. The mobile report checks final built HTML against the approved hashes and records evidence integrity. Only documentation and review evidence changed in this pass.
- Chris has authorized pushing the branch, opening a **draft PR**, and the normal Azure review preview. PR URL, CI and preview results are tracked in the PR description and closeout. Keep the PR draft; policy activation, merge, production deployment and game/provider/Play actions remain separate approvals/outcomes.

Before final policy activation and production publication:

1. Preserve the approved schedule/process, resolve the remaining audience/test/backup-handler decisions and reconcile page text with actual handling capabilities. Approve final effective wording/date.
2. Complete the [game/service handoff](lithobreak-outpost-connected-game-handoff.md), including deletion and request verification, exact test artifact/SDK/network and Android backup checks. Update disclosures to match evidence.
3. Use Chris's draft-PR/preview authorization to follow the focused branch, PR checks and Azure review-preview workflow. Review the three pages and company-page boundaries there; the PR description records its current URL, checks and preview status. This does not authorize policy activation or merge.
4. Merge/deploy production only after explicit approval. Verify all three live pages by content as well as HTTP status, canonical metadata, request email, provider links and mobile layout. Then allow the game owner to update provider and Play URLs and the in-app links.

## Historical context

Chris approved a clearly marked direct-access offline policy draft on 2026-10-13. It was delivered through the previous `agent/outpost-privacy-public-draft` branch and is now on `main` via PR #4. Its final-bundle/Android-backup/support-retention audit was never a connected-service audit. The connected replacement is now authorized for draft-PR/preview review under a separate instruction; neither the earlier permission nor the review authorization approves final policy activation or production publication.
