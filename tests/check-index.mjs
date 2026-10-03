import fs from 'node:fs';import assert from 'node:assert/strict';import vm from 'node:vm';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
assert.match(html,/<!doctype html>/i);assert.match(html,/webapp-launcher-v3/);assert.match(html,/manifest\.json/);assert.match(html,/Content-Security-Policy/);assert.match(html,/__legacyLocalStorage/);
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];assert.ok(scripts.length);new vm.Script(scripts.at(-1)[1]);console.log('index checks: OK');
