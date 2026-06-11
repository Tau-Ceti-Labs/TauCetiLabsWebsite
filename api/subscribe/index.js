"use strict";

const crypto = require("crypto");
const https = require("https");
const { TableClient } = require("@azure/data-tables");

const sourceSite = "taucetilabs.com";
const consentScope = "taucetilabs_general_updates";

const maxLengths = {
  email: 254,
  name: 80,
  interest: 40
};

const interestLabels = {
  studio: "Tau Ceti Labs",
  lithobreak: "LithoBreak",
  racecards: "RaceCards",
  press: "Press / Creator"
};

module.exports = async function subscribe(context, req) {
  if (req.method !== "POST") {
    context.res = json(405, { ok: false, message: "Use POST." });
    return;
  }

  const body = normalizeBody(req.body);
  const validation = validateSubmission(body);
  if (!validation.ok) {
    context.res = json(400, { ok: false, message: validation.message });
    return;
  }

  if (body.website) {
    context.log("Tau Ceti Labs subscribe honeypot ignored.");
    context.res = json(202, { ok: true, message: "Thanks. Your signup was received." });
    return;
  }

  const config = getConfig();
  if (!config.ok) {
    context.log.error(config.message);
    context.res = json(503, { ok: false, message: "Signup is temporarily unavailable." });
    return;
  }

  const subscriber = buildSubscriber(body, req);
  const status = {
    contact: "pending",
    marketing: config.marketingConfigured ? "pending" : "not_configured"
  };

  try {
    await upsertSubscriberContact(config, subscriber, status);
    status.contact = "stored";
  } catch (error) {
    status.contact = "failed";
    context.log.error("Tau Ceti Labs subscriber storage failed.", error);
    context.res = json(502, { ok: false, message: "Signup could not be saved right now." });
    return;
  }

  if (config.marketingConfigured) {
    try {
      await syncSendGridMarketingContact(config, subscriber);
      status.marketing = "synced";
    } catch (error) {
      status.marketing = "failed";
      context.log.error("Tau Ceti Labs SendGrid marketing sync failed.", error);
    }
  }

  await updateSubscriberMarketingStatus(config, subscriber, status, context);
  context.log(`Tau Ceti Labs subscriber accepted for ${subscriber.interest || "unspecified"}.`);
  context.res = json(202, { ok: true, message: "Thanks. Your signup was received." });
};

function normalizeBody(body) {
  const value = typeof body === "string" ? safeJsonParse(body) : body || {};

  return {
    email: clean(value.email),
    name: clean(value.name),
    interest: clean(value.interest),
    consentTauCetiUpdates:
      value.consentTauCetiUpdates === true ||
      value.consentTauCetiUpdates === "true" ||
      value.consentTauCetiUpdates === "on",
    website: clean(value.website)
  };
}

function validateSubmission(body) {
  if (!body.email || body.email.length > maxLengths.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (body.name.length > maxLengths.name) {
    return { ok: false, message: "Name is too long." };
  }

  if (body.interest.length > maxLengths.interest || (body.interest && !Object.prototype.hasOwnProperty.call(interestLabels, body.interest))) {
    return { ok: false, message: "Please choose a valid interest." };
  }

  if (!body.consentTauCetiUpdates) {
    return { ok: false, message: "Please confirm Tau Ceti Labs update consent." };
  }

  return { ok: true };
}

function buildSubscriber(body, req) {
  const submittedAt = new Date().toISOString();
  const normalizedEmail = body.email.trim().toLowerCase();

  return {
    submittedAt,
    email: body.email.trim(),
    normalizedEmail,
    emailHash: hashEmail(normalizedEmail),
    name: body.name.trim(),
    interest: body.interest,
    interestLabel: body.interest ? interestLabels[body.interest] : "",
    sourceSite,
    consentScope,
    userAgent: clean(req.headers?.["user-agent"] || req.headers?.["User-Agent"]),
    referer: clean(req.headers?.referer || req.headers?.Referer),
    ipHash: hashIp(clean(req.headers?.["x-forwarded-for"] || req.headers?.["X-Forwarded-For"]))
  };
}

function getConfig() {
  const storageConnectionString =
    process.env.SUBSCRIBER_STORAGE_CONNECTION_STRING ||
    process.env.FEEDBACK_STORAGE_CONNECTION_STRING;
  const contactsTable = process.env.SUBSCRIBER_CONTACTS_TABLE || "TauCetiSubscriberContacts";
  const marketingApiKey = process.env.SENDGRID_MARKETING_API_KEY;
  const tauCetiListId = process.env.SENDGRID_TAUCETILABS_LIST_ID;

  if (!storageConnectionString) {
    return { ok: false, message: "SUBSCRIBER_STORAGE_CONNECTION_STRING is not configured." };
  }

  return {
    ok: true,
    storageConnectionString,
    contactsTable,
    marketingApiKey,
    tauCetiListId,
    marketingConfigured: Boolean(marketingApiKey && tauCetiListId)
  };
}

async function upsertSubscriberContact(config, subscriber) {
  const client = TableClient.fromConnectionString(config.storageConnectionString, config.contactsTable);
  await ensureTable(client);
  await client.upsertEntity(
    {
      partitionKey: "email",
      rowKey: subscriber.emailHash,
      email: subscriber.email,
      normalizedEmail: subscriber.normalizedEmail,
      name: subscriber.name,
      sourceSite: subscriber.sourceSite,
      consentScopes: subscriber.consentScope,
      tauCetiLabsGeneralUpdates: true,
      latestTauCetiSignupAt: subscriber.submittedAt,
      latestTauCetiSignupInterest: subscriber.interest,
      latestTauCetiSignupInterestLabel: subscriber.interestLabel,
      latestTauCetiSignupUserAgent: subscriber.userAgent,
      latestTauCetiSignupReferer: subscriber.referer,
      latestTauCetiSignupIpHash: subscriber.ipHash,
      updatedAt: new Date().toISOString()
    },
    "Merge"
  );
}

async function updateSubscriberMarketingStatus(config, subscriber, status, context) {
  try {
    const client = TableClient.fromConnectionString(config.storageConnectionString, config.contactsTable);
    await client.upsertEntity(
      {
        partitionKey: "email",
        rowKey: subscriber.emailHash,
        tauCetiSendGridMarketingStatus: status.marketing,
        tauCetiSendGridMarketingSyncedAt: new Date().toISOString()
      },
      "Merge"
    );
  } catch (error) {
    context.log.error("Tau Ceti Labs subscriber status update failed.", error);
  }
}

async function syncSendGridMarketingContact(config, subscriber) {
  if (!config.marketingConfigured) {
    throw new Error("SENDGRID_MARKETING_API_KEY or SENDGRID_TAUCETILABS_LIST_ID is not configured.");
  }

  const contact = {
    email: subscriber.email,
    first_name: firstName(subscriber.name),
    last_name: lastName(subscriber.name)
  };

  const payload = JSON.stringify({
    list_ids: [config.tauCetiListId],
    contacts: [contact]
  });

  const response = await sendJsonRequest({
    hostname: "api.sendgrid.com",
    path: "/v3/marketing/contacts",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.marketingApiKey}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload)
    }
  }, payload);

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`SendGrid marketing contacts returned ${response.statusCode}: ${response.body}`);
  }
}

function sendJsonRequest(options, payload) {
  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        resolve({ statusCode: response.statusCode || 0, body });
      });
    });
    request.on("error", reject);
    request.write(payload);
    request.end();
  });
}

async function ensureTable(client) {
  try {
    await client.createTable();
  } catch (error) {
    if (error.statusCode !== 409) {
      throw error;
    }
  }
}

function json(status, body) {
  return {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body
  };
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function firstName(name) {
  return name ? name.trim().split(/\s+/).slice(0, -1).join(" ") || name.trim() : "";
}

function lastName(name) {
  const parts = name ? name.trim().split(/\s+/) : [];
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

function hashEmail(email) {
  return crypto.createHash("sha256").update(email).digest("hex");
}

function hashIp(ip) {
  return ip ? crypto.createHash("sha256").update(ip).digest("hex") : "";
}
