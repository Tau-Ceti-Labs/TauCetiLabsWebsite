import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = [
  "src/pages/index.astro",
  "src/pages/about.astro",
  "src/pages/press.astro",
  "src/pages/privacy.astro",
  "src/pages/lithobreak-outpost/privacy.astro",
  "src/pages/lithobreak-outpost/delete-account.astro",
  "src/pages/lithobreak-outpost/terms.astro",
  "src/pages/terms.astro",
  "src/pages/404.astro",
  "src/components/SiteHeader.astro",
  "src/layouts/BaseLayout.astro",
  "src/styles/global.css",
  "src/content/site.json",
  "staticwebapp.config.json",
  ".github/workflows/azure-static-web-apps.yml",
  "api/host.json",
  "api/package.json",
  "api/subscribe/function.json",
  "api/subscribe/index.js",
  "public/assets/tau-ceti-labs-logo.png",
  "public/assets/tau-ceti-labs-logo-icononly.png",
  "public/assets/tcl-lab-desk-decals-sprite-sheet.png",
  "public/assets/tcl-hazard-hex-decal.png",
  "public/assets/tcl-danger-decal.png",
  "public/assets/tcl-coffee-clean-01-speckles-left.png",
  "public/assets/tcl-coffee-clean-02-spill-large.png",
  "public/assets/tcl-coffee-clean-06-small-splat-left.png",
  "public/assets/tcl-coffee-clean-10-ring-splashed.png",
  "public/assets/tcl-coffee-clean-13-ring-full.png",
  "public/assets/tcl-ingot-glow.png",
  "public/assets/lithobreak-return-console-card.png",
  "public/assets/lithobreak-icon.png",
  "public/assets/racecards-tabletop-layout.jpg",
  "public/assets/racecards-icon.png",
  "public/favicon.svg",
  "public/robots.txt",
  "public/sitemap.xml",
  "docs/site-strategy.md",
  "docs/deployment.md",
  "docs/rollout.md"
];

const requiredEvents = [
  "view_projects",
  "open_discord",
  "open_lithobreak",
  "open_racecards",
  "submit_subscribe"
];

const fail = (message) => {
  console.error(`verify-static failed: ${message}`);
  process.exit(1);
};

for (const file of requiredFiles) {
  try {
    await access(file, constants.R_OK);
  } catch {
    fail(`missing required file ${file}`);
  }
}

const site = JSON.parse(await readFile("src/content/site.json", "utf8"));
const home = await readFile("src/pages/index.astro", "utf8");
const about = await readFile("src/pages/about.astro", "utf8");
const press = await readFile("src/pages/press.astro", "utf8");
const privacy = await readFile("src/pages/privacy.astro", "utf8");
const outpostPrivacy = await readFile("src/pages/lithobreak-outpost/privacy.astro", "utf8");
const outpostDeletion = await readFile("src/pages/lithobreak-outpost/delete-account.astro", "utf8");
const outpostTerms = await readFile("src/pages/lithobreak-outpost/terms.astro", "utf8");
const terms = await readFile("src/pages/terms.astro", "utf8");
const header = await readFile("src/components/SiteHeader.astro", "utf8");
const layout = await readFile("src/layouts/BaseLayout.astro", "utf8");
const subscribeApi = await readFile("api/subscribe/index.js", "utf8");
const workflow = await readFile(".github/workflows/azure-static-web-apps.yml", "utf8");
const sitemap = await readFile("public/sitemap.xml", "utf8");
const robots = await readFile("public/robots.txt", "utf8");
const config = JSON.parse(await readFile("staticwebapp.config.json", "utf8"));
const docs = `${await readFile("docs/site-strategy.md", "utf8")}\n${await readFile("docs/deployment.md", "utf8")}`;

if (site.brand.name !== "Tau Ceti Labs") {
  fail("brand name must be Tau Ceti Labs");
}
if (site.brand.contactEmail !== "team@taucetilabs.com") {
  fail("privacy contact must be team@taucetilabs.com");
}
if (site.links.canonical !== "https://www.taucetilabs.com/") {
  fail("canonical URL must be https://www.taucetilabs.com/");
}
if (site.links.lithobreak !== "https://www.lithobreak.com/" || site.links.raceCards !== "https://www.race.cards/") {
  fail("project links must point to standalone product sites");
}
if (site.links.discord !== "https://discord.gg/ckftPfH") {
  fail("Discord link must point to the verified Tau Ceti Labs invite");
}
if (!site.analytics.enabled || site.analytics.provider !== "google" || site.analytics.measurementId !== "G-YNN4P3GZR5") {
  fail("Google Analytics must be enabled with the Tau Ceti Labs measurement ID");
}
for (const marker of ["analytics_storage", "data-analytics-consent", "googletagmanager.com/gtag/js", 'window.gtag("event"']) {
  if (!layout.includes(marker)) {
    fail(`analytics implementation missing ${marker}`);
  }
}

for (const eventName of requiredEvents) {
  if (!home.includes(eventName) && !layout.includes(eventName) && !press.includes(eventName)) {
    fail(`missing analytics event marker ${eventName}`);
  }
}

const allText = `${JSON.stringify(site)}\n${home}\n${about}\n${press}\n${privacy}\n${terms}\n${docs}`;
for (const phrase of [
  "Play with Science",
  "Games from the far workbench",
  "Two active specimens on the bench",
  "taucetilabs_general_updates",
  "Phase 2",
  "company hub"
]) {
  if (!allText.includes(phrase)) {
    fail(`missing required phrase ${phrase}`);
  }
}

for (const forbidden of [
  "Build expansive factories that span multiple moons",
  "seamless material transport via haulers, conveyors, trains",
  "real-time orbital mechanics",
  "Builder rovers automatically construction",
  "Explore and exploit moons within a storied verse"
]) {
  if (allText.includes(forbidden)) {
    fail(`forbidden legacy overclaim found: ${forbidden}`);
  }
}

if (!home.includes("data-subscribe-form") || !layout.includes('fetch("/api/subscribe"')) {
  fail("homepage must expose subscribe form and submit to /api/subscribe");
}
if (!privacy.includes("not consent for LithoBreak development updates or RaceCards premium launch updates")) {
  fail("privacy page must preserve separate consent boundaries");
}
if (!privacy.includes("Google Analytics 4") || !privacy.includes("data-analytics-reset")) {
  fail("privacy page must explain Google Analytics and expose consent controls");
}
if ([privacy, terms, home, header, sitemap].some((source) => source.includes('/lithobreak-outpost/'))) {
  fail("Outpost review draft must stay out of public site navigation");
}
for (const marker of ["LithoBreak: Outpost", "TauCetiLabs", "site.brand.contactEmail", "performance reports", "Android backup", 'robots="noindex"', "Draft for owner review"]) {
  if (!outpostPrivacy.includes(marker)) {
    fail(`Outpost privacy draft missing ${marker}`);
  }
}
for (const [page, source] of [["privacy", outpostPrivacy], ["delete-account", outpostDeletion], ["terms", outpostTerms]]) {
  if (!source.includes('robots="noindex"') || !source.includes("Draft for owner review")) {
    fail(`Outpost ${page} must retain its review notice and noindex`);
  }
  for (const peer of ["privacy", "delete-account", "terms"].filter((name) => name !== page)) {
    if (!source.includes(`/lithobreak-outpost/${peer}/`)) fail(`Outpost ${page} must link to ${peer}`);
  }
}
for (const obsoleteClaim of ["has no player accounts", "does not send saved progress", "backgrounding freezes every factory"]) {
  if (outpostPrivacy.toLowerCase().includes(obsoleteClaim)) fail(`obsolete Outpost privacy claim: ${obsoleteClaim}`);
}
for (const marker of ["Unity Authentication", "Unity Player Account", "offline_access", "without the email scope", "Engineer alias", "cloud campaign backups", 'id="retention"', "Current implementation limit", "not automatically upload your campaign"]) {
  if (!outpostPrivacy.includes(marker)) fail(`Outpost privacy missing connected disclosure: ${marker}`);
}
for (const marker of ["site.brand.contactEmail", "without having the app installed", "alias alone is not proof", "does not automatically delete data", "https://player-account.unity.com/delete-account", "unity-player-login-privacy@unity3d.com"]) {
  if (!outpostDeletion.includes(marker)) fail(`Outpost deletion draft missing: ${marker}`);
}
if (!outpostTerms.includes("five-day event") || !outpostTerms.includes("no effective date")) {
  fail("Outpost terms must preserve the unapproved event and terms boundary");
}
if (!subscribeApi.includes("TauCetiSubscriberContacts") || !subscribeApi.includes("taucetilabs_general_updates") || !subscribeApi.includes("SENDGRID_TAUCETILABS_LIST_ID")) {
  fail("subscribe API must use shared contacts, company consent scope, and SendGrid list setting");
}

const routes = config.routes ?? [];
const requiredRedirects = new Map([
  ["/racecards", "https://www.race.cards/"],
  ["/lithobreak", "https://www.lithobreak.com/"],
  ["/presskit-lithobreak", "https://www.lithobreak.com/press-kit/"],
  ["/media-lithobreak", "https://www.lithobreak.com/press-kit/"],
  ["/termsofservice", "/terms/"],
  ["/allverse", "/"]
]);
for (const [route, redirect] of requiredRedirects) {
  if (!routes.some((item) => item.route === route && item.redirect === redirect && item.statusCode === 301)) {
    fail(`missing redirect ${route} -> ${redirect}`);
  }
}

for (const url of [
  "https://www.taucetilabs.com/",
  "https://www.taucetilabs.com/about/",
  "https://www.taucetilabs.com/press/",
  "https://www.taucetilabs.com/privacy/",
  "https://www.taucetilabs.com/terms/"
]) {
  if (!sitemap.includes(url)) {
    fail(`sitemap missing ${url}`);
  }
}
if (sitemap.includes("https://www.taucetilabs.com/lithobreak-outpost/")) {
  fail("Outpost review draft must stay out of the sitemap");
}
if (!robots.includes("Sitemap: https://www.taucetilabs.com/sitemap.xml")) {
  fail("robots must point to the www sitemap");
}
if (!workflow.includes('app_location: "dist"') || !workflow.includes('api_location: "api"')) {
  fail("GitHub workflow must deploy dist and api");
}
if (!header.includes("tau-ceti-labs-logo-icononly.png") || !home.includes("tau-ceti-labs-logo-icononly.png") || !layout.includes('rel="icon" href="/assets/tau-ceti-labs-logo-icononly.png"')) {
  fail("header, footer, and favicon must use the Tau Ceti Labs icon-only asset");
}

const headers = config.globalHeaders ?? {};
for (const headerName of ["Content-Security-Policy", "Referrer-Policy", "X-Content-Type-Options"]) {
  if (!headers[headerName]) {
    fail(`missing global header ${headerName}`);
  }
}
for (const analyticsOrigin of ["*.googletagmanager.com", "*.google-analytics.com", "*.analytics.google.com"]) {
  if (!headers["Content-Security-Policy"].includes(analyticsOrigin)) {
    fail(`content security policy missing ${analyticsOrigin}`);
  }
}

console.log("verify-static passed");
