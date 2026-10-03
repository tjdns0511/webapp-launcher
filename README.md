# WebApp Launcher v3

A mobile-first launcher and sandbox for local HTML/ZIP web apps. **All implementation work in this repository is AI-generated.**

## Features
- Install a single `.html` file or a multi-file `.zip` package.
- ZIP packages use `manifest.json` and keep assets in IndexedDB as a virtual file system.
- App IDs, versions, update/downgrade handling, entry points and declared permissions.
- Sandboxed iframe runtime without `allow-same-origin`.
- CSP-based network restriction unless the app declares `network`.
- Per-app launcher storage API (`launcher.save/load`) and a compatibility `localStorage` shim.
- Export individual apps; backup/restore installed apps plus launcher-managed save data.
- Import legacy v2 single-HTML apps without deleting the old database.
- Mobile-first UI and fullscreen support.

## ZIP package format
```text
my-app.zip
├─ manifest.json
├─ index.html
├─ css/style.css
├─ js/app.js
└─ assets/icon.png
```

Example `manifest.json`:
```json
{
  "id": "example.my-app",
  "name": "My App",
  "version": "1.0.0",
  "dataVersion": 1,
  "entry": "index.html",
  "permissions": ["storage", "fullscreen"]
}
```

Supported permissions: `storage`, `fullscreen`, `network`. Unknown permission names are preserved for forward compatibility but do not grant extra browser capabilities.

## Launcher API
```js
await launcher.save("savegame", { level: 3 });
const save = await launcher.load("savegame");
launcher.appInfo();
launcher.fullscreen();
```

## Security model
Apps run in a sandboxed iframe without same-origin privileges. A CSP is injected into the runtime document. Network access is denied by default and enabled only for packages declaring `network`. This is a practical personal-app sandbox, not a security boundary for hostile code equivalent to an OS process/container.

## Known runtime limits
Static HTML/CSS/JS asset references are rewritten to Blob URLs. Common relative CSS URLs and static ES module imports are supported. Highly dynamic path construction, runtime `fetch('./file')`, circular module rewriting, service workers, and code that requires a stable HTTP origin can require adaptation. ZIP import supports STORE and DEFLATE when the browser exposes `DecompressionStream('deflate-raw')`; exports use STORE for broad compatibility.

## Test
```bash
npm test
```

The tests cover path normalization, manifest validation, version comparison, CRC32, and ZIP store round-trips. `index.html` is also syntax-checked in CI.
