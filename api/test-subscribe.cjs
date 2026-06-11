"use strict";

const assert = require("assert");
const EventEmitter = require("events");
const Module = require("module");

const originalLoad = Module._load;
const originalEnv = { ...process.env };

const calls = {
  tables: [],
  requests: []
};

let marketingStatus = 202;

class MockTableClient {
  constructor(_endpoint, tableName) {
    this.tableName = tableName;
  }

  static fromConnectionString(_connectionString, tableName) {
    return new MockTableClient("mock", tableName);
  }

  async createTable() {
    calls.tables.push({ op: "createTable", table: this.tableName });
  }

  async upsertEntity(entity, mode) {
    calls.tables.push({ op: "upsertEntity", table: this.tableName, mode, entity });
  }
}

const mockHttps = {
  request(options, callback) {
    let body = "";
    const request = new EventEmitter();
    request.write = (chunk) => {
      body += chunk;
    };
    request.end = () => {
      const response = new EventEmitter();
      response.statusCode = marketingStatus;
      response.setEncoding = () => {};
      calls.requests.push({ options, body: body ? JSON.parse(body) : null, statusCode: response.statusCode });

      callback(response);
      process.nextTick(() => {
        if (response.statusCode >= 400) response.emit("data", "{\"error\":\"mock failure\"}");
        response.emit("end");
      });
    };
    return request;
  }
};

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === "@azure/data-tables") {
    return { TableClient: MockTableClient };
  }

  if (request === "https") {
    return mockHttps;
  }

  return originalLoad.call(this, request, parent, isMain);
};

const subscribe = require("./subscribe");

async function run() {
  await testInvalidEmail();
  await testMissingConsent();
  await testHoneypot();
  await testValidSignupMarketingSuccess();
  await testValidSignupMarketingFailureStillAccepted();
  console.log("subscribe API tests passed");
}

async function testInvalidEmail() {
  reset();
  const result = await invoke({ email: "nope", consentTauCetiUpdates: true });
  assert.equal(result.status, 400);
  assert.equal(calls.tables.length, 0);
}

async function testMissingConsent() {
  reset();
  const result = await invoke({ email: "reader@example.com", consentTauCetiUpdates: false });
  assert.equal(result.status, 400);
  assert.equal(calls.tables.length, 0);
}

async function testHoneypot() {
  reset();
  const result = await invoke({ email: "reader@example.com", consentTauCetiUpdates: true, website: "bot" });
  assert.equal(result.status, 202);
  assert.equal(calls.tables.length, 0);
  assert.equal(calls.requests.length, 0);
}

async function testValidSignupMarketingSuccess() {
  reset();
  const result = await invoke({
    email: "reader@example.com",
    name: "Reader One",
    interest: "studio",
    consentTauCetiUpdates: true
  });

  assert.equal(result.status, 202);
  assert.equal(calls.tables.filter((call) => call.table === "TauCetiSubscriberContacts" && call.op === "upsertEntity").length, 2);
  assert.equal(calls.requests.length, 1);
  assert.equal(calls.requests[0].body.list_ids[0], "taucetilabs-list-id");
  assert.equal(calls.tables.some((call) => call.entity?.consentScopes === "taucetilabs_general_updates"), true);
  assert.equal(calls.tables.some((call) => call.entity?.tauCetiLabsGeneralUpdates === true), true);
}

async function testValidSignupMarketingFailureStillAccepted() {
  reset();
  marketingStatus = 403;
  const result = await invoke({
    email: "reader@example.com",
    name: "Reader One",
    interest: "racecards",
    consentTauCetiUpdates: true
  });

  assert.equal(result.status, 202);
  assert.equal(calls.requests.length, 1);
  assert.equal(calls.tables.some((call) => call.entity?.tauCetiSendGridMarketingStatus === "failed"), true);
}

async function invoke(body) {
  const context = {
    log: Object.assign(() => {}, {
      error: () => {}
    }),
    res: null
  };

  await subscribe(context, {
    method: "POST",
    body,
    headers: {
      "user-agent": "test-agent",
      referer: "https://taucetilabs.com/"
    }
  });

  return context.res;
}

function reset() {
  calls.tables.length = 0;
  calls.requests.length = 0;
  marketingStatus = 202;
  process.env = {
    ...originalEnv,
    SUBSCRIBER_STORAGE_CONNECTION_STRING: "UseDevelopmentStorage=true",
    SUBSCRIBER_CONTACTS_TABLE: "TauCetiSubscriberContacts",
    SENDGRID_MARKETING_API_KEY: "sendgrid-marketing-key",
    SENDGRID_TAUCETILABS_LIST_ID: "taucetilabs-list-id"
  };
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    Module._load = originalLoad;
    process.env = originalEnv;
  });
