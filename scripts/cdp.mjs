// Een headless Chrome voor de zelftoetsen, over het DevTools-protocol, zonder extra pakket
// (Node heeft WebSocket ingebouwd). Welke browser: CHROME=<pad>, anders de Playwright-cache,
// anders een geïnstalleerde Chrome of Chromium. Elke start krijgt een eigen, verse profielmap die
// bij sluiten weg is; de vlaggen houden de sleutelhanger van macOS erbuiten.
//
//   const b = await start();
//   const p = await b.pagina({ breed: 390, hoog: 844, mobiel: true });
//   await p.open('http://localhost:3000/');  await p.meet('document.title');  await p.foto('x.jpg');
//   await b.sluit();
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';

const VLAGGEN = ['--headless', '--use-mock-keychain', '--password-store=basic', '--no-first-run', '--no-default-browser-check',
  '--disable-background-networking', '--disable-component-update', '--disable-sync', '--disable-extensions', '--hide-scrollbars'];

export function browserPad() {
  if (process.env.CHROME) return process.env.CHROME;
  const kandidaten = [];
  for (const basis of [path.join(homedir(), 'Library/Caches/ms-playwright'), path.join(homedir(), '.cache/ms-playwright')]) {
    if (!existsSync(basis)) continue;
    for (const map of readdirSync(basis).sort().reverse()) {
      if (!map.startsWith('chromium_headless_shell-')) continue;
      for (const sub of readdirSync(path.join(basis, map))) kandidaten.push(path.join(basis, map, sub, 'chrome-headless-shell'), path.join(basis, map, sub, 'headless_shell'));
    }
  }
  kandidaten.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome');
  const pad = kandidaten.find((k) => existsSync(k));
  if (!pad) throw new Error('Geen Chrome gevonden; zet CHROME=<pad naar de browser>.');
  return pad;
}

export async function start() {
  const profiel = mkdtempSync(path.join(process.env.PROFIEL_MAP || tmpdir(), 'flexschilder-toets-'));
  const kind = spawn(browserPad(), [...VLAGGEN, `--user-data-dir=${profiel}`, '--remote-debugging-port=0', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const adres = await new Promise((ok, fout) => {
    let tekst = '';
    const klok = setTimeout(() => fout(new Error('Chrome startte niet')), 20000);
    kind.stderr.on('data', (d) => { tekst += d; const m = tekst.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(klok); ok(m[1]); } });
    kind.once('exit', (c) => { clearTimeout(klok); fout(new Error('Chrome stopte: ' + c)); });
  });
  const ws = new WebSocket(adres);
  await new Promise((ok, fout) => { ws.onopen = ok; ws.onerror = fout; });
  let id = 0;
  const wacht = new Map(), luister = [];
  ws.onmessage = (e) => {
    const b = JSON.parse(e.data);
    if (b.id && wacht.has(b.id)) { const [ok, fout] = wacht.get(b.id); wacht.delete(b.id); b.error ? fout(new Error(b.error.message)) : ok(b.result); }
    else for (const l of luister) l(b);
  };
  const stuur = (method, params = {}, sessionId) => new Promise((ok, fout) => { const n = ++id; wacht.set(n, [ok, fout]); ws.send(JSON.stringify({ id: n, method, params, sessionId })); });

  async function pagina({ breed = 1280, hoog = 800, mobiel = false } = {}) {
    const { targetId } = await stuur('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await stuur('Target.attachToTarget', { targetId, flatten: true });
    const s = (m, p) => stuur(m, p, sessionId);
    await s('Page.enable');
    await s('Emulation.setDeviceMetricsOverride', { width: breed, height: hoog, deviceScaleFactor: mobiel ? 2 : 1, mobile: mobiel });
    if (mobiel) await s('Emulation.setTouchEmulationEnabled', { enabled: true });
    await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    const geladen = () => new Promise((ok) => {
      const l = (b) => { if (b.sessionId === sessionId && b.method === 'Page.loadEventFired') { luister.splice(luister.indexOf(l), 1); ok(); } };
      luister.push(l);
    });
    const meet = async (expr) => {
      const r = await s('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    };
    const rust = () => meet('new Promise((ok) => setTimeout(ok, 400))');
    return {
      breed, hoog, meet,
      async open(url) { const g = geladen(); await s('Page.navigate', { url }); await g; await rust(); },
      // Tik op een element (CSS-selector, of een functie-uitdrukking die het element geeft) en wacht
      // op de nieuwe pagina.
      async tik(doel) {
        const xy = await meet(`(() => { const e = ${doel.startsWith('(') ? doel : `document.querySelector(${JSON.stringify(doel)})`};
          if (!e) return null; e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
        if (!xy) throw new Error('niet gevonden: ' + doel);
        await rust();
        const xy2 = await meet(`(() => { const e = ${doel.startsWith('(') ? doel : `document.querySelector(${JSON.stringify(doel)})`}; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
        const g = geladen();
        for (const type of ['mousePressed', 'mouseReleased']) await s('Input.dispatchMouseEvent', { type, x: xy2.x, y: xy2.y, button: 'left', clickCount: 1 });
        await Promise.race([g, rust().then(rust).then(rust)]);
        await rust();
      },
      async foto(bestand, { heel = false } = {}) {
        let clip;
        if (heel) {
          const h = await meet('Math.ceil(document.documentElement.scrollHeight)');
          clip = { x: 0, y: 0, width: breed, height: h, scale: 1 };
        }
        const { data } = await s('Page.captureScreenshot', { format: 'jpeg', quality: 78, captureBeyondViewport: heel, ...(clip ? { clip } : {}) });
        writeFileSync(bestand, Buffer.from(data, 'base64'));
      },
    };
  }

  async function sluit() {
    try { await stuur('Browser.close'); } catch { /* al weg */ }
    ws.close();
    await new Promise((ok) => (kind.exitCode !== null ? ok() : kind.once('exit', ok)));
    rmSync(profiel, { recursive: true, force: true });
  }
  return { pagina, sluit };
}
