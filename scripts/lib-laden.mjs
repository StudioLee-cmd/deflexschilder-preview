// Laat de zelftoetsen in scripts/ de echte modules uit lib/ importeren, zonder build en zonder
// extra pakket: de site importeert './geo' en '@/lib/geo' zonder extensie (Next lost dat op),
// Node niet. Deze hook vult '.js' aan, vertaalt '@/' naar de map van de repo en leest lib/ als
// ES-module. Gebruik: `import { laad, html, Teller } from './lib-laden.mjs'`.
import { registerHooks } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

export const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

registerHooks({
  resolve(spec, ctx, next) {
    let s = spec.startsWith('@/') ? pathToFileURL(path.join(REPO, spec.slice(2))).href : spec;
    if ((s.startsWith('.') || s.startsWith('file:')) && !path.extname(s)) {
      const base = s.startsWith('file:') ? fileURLToPath(s) : path.resolve(path.dirname(fileURLToPath(ctx.parentURL)), s);
      if (existsSync(base + '.js')) s = pathToFileURL(base + '.js').href;
    }
    return next(s, ctx);
  },
  load(url, ctx, next) {
    const eigen = url.startsWith(pathToFileURL(path.join(REPO, 'lib')).href);
    return eigen ? next(url, { ...ctx, format: 'module' }) : next(url, ctx);
  },
});

export const laad = (naam) => import(pathToFileURL(path.join(REPO, 'lib', naam)).href);

// De tekst van een pagina zoals een bezoeker hem leest: React-markers en tags eruit, entiteiten
// terug naar tekens. `html` houdt de tags (voor links), met dezelfde entiteiten opgelost.
export function ontleed(bron) {
  const ent = (t) =>
    t.replace(/<!-- -->/g, '')
      .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  const html = ent(bron.replace(/<script[\s\S]*?<\/script>/g, ''));
  const tekst = html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  return { html, tekst };
}

export async function haal(basis, pad) {
  const r = await fetch(new URL(pad, basis), { redirect: 'follow' });
  if (!r.ok) throw new Error(`${pad}: HTTP ${r.status}`);
  return ontleed(await r.text());
}

// Telt groen en rood; print elke rode regel met wat er stond en sluit af met de stand.
export class Teller {
  constructor(naam) { this.naam = naam; this.ok = 0; this.rood = []; }
  toets(goed, regel) { if (goed) this.ok++; else this.rood.push(regel); }
  eind() {
    for (const r of this.rood) console.log('ROOD  ' + r);
    if (this.rood.length === 0) console.log(`${this.naam}: alles groen, ${this.ok} ok`);
    else console.log(`${this.naam}: ${this.rood.length} rood, ${this.ok} ok`);
    process.exit(this.rood.length === 0 ? 0 : 1);
  }
}
