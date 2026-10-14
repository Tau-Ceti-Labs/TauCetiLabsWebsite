# LithoBreak: Outpost privacy policy review

Status: public review draft authorized by Chris on 2026-10-13; not approved for Google Play. Review URL: `https://www.taucetilabs.com/lithobreak-outpost/privacy/`.

Publication branch: `agent/outpost-privacy-public-draft`, based on website `origin/main` at `3c414b4`, which includes the company-site analytics changes. Existing uncommitted changes to `AGENTS.md` and `THREAD_START.md` were present at task start and were not edited for this policy.

## Scope and provenance

- Writable target: this Tau Ceti Labs Website repository. Read-only source: `C:\Dev\Tau Ceti Labs\Projects\LithoBreak Outpost`.
- Source handoff: `Documents/PLAY_STORE_PRIVACY_HANDOFF.md` and linked `Documents/PLAY_STORE_SETUP.md` in the Outpost project, read on 2026-10-13.
- No asset was copied, transformed, or moved.
- The dedicated page is distinct from `/privacy/`, which continues to describe company website analytics and update signup. During the public-review phase, the draft has a visible notice and `noindex` tag and is omitted from the homepage, company privacy page and sitemap. Anyone with the direct link can still access it.

## Source observations used in the draft

- `Game/ProjectSettings/ProjectSettings.asset`: package `com.taucetilabs.lithobreakoutpost`, version 0.30.0 / Android code 41, Android target API 36.
- `Game/Assets/Outpost/Presentation/SaveStore.cs` and `OutpostGame.cs`: save files in `Application.persistentDataPath` and a last-mode preference in `PlayerPrefs`.
- `Game/Assets/Outpost/Presentation/FrameTelemetry.cs`: performance reports written to local app storage include build/Unity versions, device model, OS, GPU, screen dimensions and timing. `GameNetwork.cs` can also write a local workload report.
- `Game/Packages/manifest.json` and `Game/ProjectSettings/UnityConnectSettings.asset`: no explicit Unity Services Analytics, Ads or IAP package; Unity service, Analytics, Ads, purchasing, cloud diagnostics and performance reporting settings disabled. A built-in Unity Analytics module is listed in the manifest, so disabled configuration alone is not a final traffic audit.
- Search of authored Outpost C# found no runtime upload/API call for saves or telemetry. The game's multi-outpost shipping is local simulation, not online multiplayer.
- `Documents/PLAY_STORE_SETUP.md`: no release bundle uploaded; current Play audience selection is 13+; the Data safety form is incomplete. Future purchases are not implemented.
- Chris confirmed on 2026-10-13 that the full registered legal name is **Tau Ceti Labs**, with no suffix. The draft page now uses that exact name.

## Owner decisions and release audit before Google Play use

1. Inspect the exact signed, non-development Android App Bundle planned for Play: merged manifest, permissions, packaged SDKs, native engine traffic and any Google/Unity diagnostics. Use device network evidence to reconcile the policy and Play Data safety answers. Do not infer zero collection or sharing from disabled project settings.
2. Verify the final bundle's `allowBackup` and data-extraction rules, and whether saves, preferences and performance reports are eligible for cloud backup or device-to-device transfer. The page currently describes that possibility conditionally.
3. Confirm support-email access controls, provider handling, and retention/deletion practice. Replace the draft's general retention language with the owner's approved policy.
4. Review the complete policy text for factual and legal accuracy, remove the visible draft notice and unresolved language, and set an effective date. Confirm consistency with the Play Data safety form. Then remove `noindex` and add appropriate site references. The Play listing must link to the approved public HTML URL and the game must contain a policy link or text; the game-side change is a separate Outpost task.

Google Play requires an app privacy policy in Play Console and in the app, disclosing data access, collection, use, sharing, security, retention and deletion, with an active public non-geofenced non-PDF URL: [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en). Android's [Auto Backup documentation](https://developer.android.com/identity/data/autobackup) describes default backup behavior and the manifest/rules that can change it.

## Validation and publication sequence

Run the website check, build, static verification and API tests. Review the page at `/lithobreak-outpost/privacy/` on desktop and mobile widths. Chris has authorized publishing a clearly marked direct-access draft for review; use the focused pull-request/Azure preview workflow, then merge and verify the live URL. Do not use the draft in Play Console. The app-side link requires a separately scoped Outpost change.

Local validation on 2026-10-13:

- `npm.cmd run check`: passed, with one existing CommonJS conversion hint in the subscribe API.
- `npm.cmd run verify:static`: passed.
- `npm.cmd run build`: passed and generated `/lithobreak-outpost/privacy/index.html`. The first two sandboxed attempts failed on Windows `EPERM` while Astro resolved its installed files; running the same build outside that sandbox completed.
- Built HTML contains the expected canonical URL, contact link, heading, and reciprocal company-privacy link. The existing company page still contains its Google Analytics disclosure.
- Local Chrome preview: readable at desktop, 390 px and 320 px widths. The company `/privacy/` link and homepage footer link both reached the game policy. No production or Azure preview was opened.
- After Chris confirmed the registered name, `npm.cmd run verify:static`, `npm.cmd run build`, and `git diff --check` passed again; the generated page identifies Tau Ceti Labs without a suffix.
