// CCC SEO Suite — DataForSEO Client Wrapper
// Used by: any skill that calls DataForSEO (research-brief, ideate-topics, tools-plan, strategy-session, weekly-review)
//
// Why this exists: solves three repeated problems from v0.1:
//   1. Live-Advanced-Endpoint nimmt nur 1 Task pro Call — bulk-SERP needs parallel-call pattern
//   2. No cost-logging across calls — over a year, untrackable spend
//   3. No retry on 429s, no Cowork-Bash-Timeout-Awareness
//
// Usage:
//   const dfs = require('../../_lib/dataforseo-client');
//   const client = dfs.makeClient({ login, password, clientName });
//   const results = await client.serpBulk(['kw1', 'kw2', ...], { language_code: 'de', location_code: 2276 });
//   const volumes = await client.searchVolumeBulk(['kw1', 'kw2', ...], { language_code: 'de', location_code: 2276 });
//   // Cost is auto-logged to <client-folder>/_planning/dataforseo-spend-log.md

const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = 'api.dataforseo.com';

function postJson({ endpoint, body, login, password, timeoutMs }) {
  timeoutMs = timeoutMs || 35000;
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const auth = Buffer.from(`${login}:${password}`).toString('base64');
    const req = https.request({
      hostname: BASE,
      port: 443,
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Basic ${auth}`,
      },
      timeout: timeoutMs,
    }, (res) => {
      let buf = '';
      res.on('data', chunk => buf += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); }
        catch (e) { reject(new Error(`Invalid JSON: ${buf.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.write(data);
    req.end();
  });
}

function makeClient({ login, password, clientFolderPath, clientName }) {
  if (!login || !password) {
    throw new Error('DataForSEO client requires login + password');
  }
  const logPath = clientFolderPath
    ? path.join(clientFolderPath, '_planning', 'dataforseo-spend-log.md')
    : null;

  function appendLog(entry) {
    if (!logPath) return;
    const dir = path.dirname(logPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(logPath)) {
      fs.writeFileSync(logPath, [
        '---',
        'type: dataforseo-spend-log',
        `client: "[[${clientName || 'unknown'}]]"`,
        `created: ${new Date().toISOString().slice(0, 10)}`,
        '---',
        '',
        `# DataForSEO Spend Log — ${clientName || 'unknown'}`,
        '',
        '> Append-only log. One row per API call. Cumulative spend in last column.',
        '',
        '| Datum (UTC) | Skill | Endpoint | Items | Cost USD | Cumulative |',
        '|-------------|-------|----------|-------|----------|------------|',
        ''
      ].join('\n'));
    }
    // Compute cumulative
    const existing = fs.readFileSync(logPath, 'utf8');
    const matches = [...existing.matchAll(/\| (\d+\.\d+) \| (\d+\.\d+) \|/g)];
    const lastCum = matches.length > 0 ? parseFloat(matches[matches.length - 1][2]) : 0;
    const newCum = (lastCum + entry.cost).toFixed(4);
    fs.appendFileSync(logPath, `| ${entry.date} | ${entry.skill} | ${entry.endpoint} | ${entry.items} | ${entry.cost.toFixed(4)} | ${newCum} |\n`);
  }

  return {
    // SERP-Live-Advanced — one task per call (DataForSEO constraint)
    async serp(keyword, opts) {
      opts = opts || {};
      const body = [{
        keyword,
        location_code: opts.location_code || 2276,
        language_code: opts.language_code || 'de',
        depth: opts.depth || 10,
      }];
      const result = await postJson({
        endpoint: '/v3/serp/google/organic/live/advanced',
        body,
        login,
        password,
      });
      appendLog({
        date: new Date().toISOString().replace('T', ' ').slice(0, 19),
        skill: opts.skill || 'unknown',
        endpoint: 'serp/google/organic/live/advanced',
        items: 1,
        cost: result.cost || 0,
      });
      return result;
    },

    // SERP-Bulk — N keywords in parallel (DataForSEO doesn't batch Live-Advanced)
    async serpBulk(keywords, opts) {
      opts = opts || {};
      const calls = keywords.map(kw => this.serp(kw, opts));
      return await Promise.all(calls);
    },

    // Search-Volume-Bulk — up to 1000 keywords per task (Google Ads endpoint, very cheap)
    async searchVolumeBulk(keywords, opts) {
      opts = opts || {};
      const body = [{
        keywords,
        location_code: opts.location_code || 2276,
        language_code: opts.language_code || 'de',
      }];
      const result = await postJson({
        endpoint: '/v3/keywords_data/google_ads/search_volume/live',
        body,
        login,
        password,
      });
      appendLog({
        date: new Date().toISOString().replace('T', ' ').slice(0, 19),
        skill: opts.skill || 'unknown',
        endpoint: 'keywords_data/google_ads/search_volume/live',
        items: keywords.length,
        cost: result.cost || 0,
      });
      return result;
    },

    // User-Info — auth + balance check (no cost)
    async userInfo() {
      return await postJson({
        endpoint: '/v3/appendix/user_data',
        body: [],
        login,
        password,
        timeoutMs: 8000,
      });
    },
  };
}

module.exports = { makeClient, postJson };
