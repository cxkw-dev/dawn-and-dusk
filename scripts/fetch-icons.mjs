// Regenerates ds/icons/icons.svg — an SVG sprite of Solar icons (the system's icon set) from the Iconify API.
// Main glyphs use Solar "Bold Duotone"; tiny UI glyphs (chevrons, check, close, plus/minus) use Solar "Linear" so they stay crisp;
// a few glyphs are drawn here (plain x / plus / minus / check, and the AI family) in the same style.
// Usage: node scripts/fetch-icons.mjs (needs network), then node scripts/build-ds.mjs to ship the sprite.
// Reference an icon with <svg class="dd-icon"><use href="#dd-i-NAME"/></svg>.
import { writeFile } from 'node:fs/promises';

const DUO = {
  home: 'home-2', search: 'magnifer', settings: 'settings', user: 'user', users: 'users-group-rounded', bell: 'bell', heart: 'heart',
  sun: 'sun-2', moon: 'moon', star: 'star', info: 'info-circle', alert: 'danger-triangle', danger: 'danger-circle', success: 'check-circle',
  error: 'close-circle', question: 'question-circle', calendar: 'calendar', clock: 'clock-circle', folder: 'folder', file: 'document-text',
  copy: 'copy', trash: 'trash-bin-trash', edit: 'pen', mail: 'letter', link: 'link', external: 'square-arrow-right-up', download: 'download-minimalistic',
  upload: 'upload-minimalistic', refresh: 'refresh', filter: 'filter', sort: 'sort-vertical', menu: 'hamburger-menu', more: 'menu-dots',
  grid: 'widget', list: 'list', eye: 'eye', 'eye-off': 'eye-closed', lock: 'lock-keyhole', unlock: 'lock-keyhole-unlocked', logout: 'logout-2',
  sparkle: 'stars', bolt: 'bolt', chart: 'chart-2', graph: 'graph-up', database: 'database', server: 'server', cloud: 'cloud', code: 'code',
  terminal: 'programming', tag: 'tag', bookmark: 'bookmark', flag: 'flag', globe: 'global', shield: 'shield-check', play: 'play', pause: 'pause',
  box: 'box', layers: 'layers', inbox: 'inbox', chat: 'chat-round-dots', send: 'plain', pin: 'pin', archive: 'archive', key: 'key',
  'arrow-right': 'arrow-right', 'arrow-left': 'arrow-left', 'arrow-up': 'arrow-up', 'arrow-down': 'arrow-down', 'sidebar': 'sidebar-minimalistic',
};
const LINE = {
  'chevron-down': 'alt-arrow-down', 'chevron-up': 'alt-arrow-up', 'chevron-left': 'alt-arrow-left', 'chevron-right': 'alt-arrow-right',
  check: 'check-read', x: 'close-square', plus: 'add-square', minus: 'minus-square',
};

const fetchSet = async (map, suffix) => {
  const names = Object.values(map).map((n) => `${n}-${suffix}`);
  const res = await fetch(`https://api.iconify.design/solar.json?icons=${names.join(',')}`);
  if (!res.ok) throw new Error(`Iconify API: HTTP ${res.status} for the Solar ${suffix} set (needs network)`);
  const json = await res.json();
  if (json.not_found?.length) throw new Error(`Solar icons not found: ${json.not_found.join(', ')}`);
  // Some names are aliases of another icon; follow them to the real body.
  const resolve = (name) => json.icons[name] ?? (json.aliases?.[name] && resolve(json.aliases[name].parent));
  return Object.fromEntries(Object.entries(map).map(([id, n]) => {
    const icon = resolve(`${n}-${suffix}`);
    if (!icon) throw new Error(`Solar icon missing: ${n}-${suffix}`);
    return [id, { body: icon.body, w: icon.width ?? json.width ?? 24, h: icon.height ?? json.height ?? 24 }];
  }));
};

const all = { ...(await fetchSet(DUO, 'bold-duotone')), ...(await fetchSet(LINE, 'linear')) };
// Linear plus/minus/x/check come inside a square; swap to plain glyph paths for tiny UI use.
all.x = { w: 24, h: 24, body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" d="m6 6l12 12M18 6L6 18"/>' };
all.plus = { w: 24, h: 24, body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" d="M12 5v14M5 12h14"/>' };
all.minus = { w: 24, h: 24, body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" d="M5 12h14"/>' };
all.check = { w: 24, h: 24, body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m5 12.5l4.5 4.5L19 7"/>' };

// Custom: the AI mark — the heavy lowercase "ai" in Outfit 800 (the headings' face) with a spark for the dot of the i.
all.ai = { w: 24, h: 24, body: '<g fill="currentColor"><g transform="translate(0.622 21.3) scale(0.0275 -0.0275)"><path d="M255 -10Q187 -10 134.0 23.0Q81 56 51.0 113.5Q21 171 21 244Q21 318 51.0 376.0Q81 434 134.0 466.5Q187 499 255 499Q301 499 339.0 482.5Q377 466 401.5 436.0Q426 406 431 368V122Q426 83 401.5 53.5Q377 24 339.0 7.0Q301 -10 255 -10ZM292 145Q335 145 361.5 173.0Q388 201 388 245Q388 274 376.0 296.0Q364 318 342.5 331.0Q321 344 293 344Q265 344 243.5 331.0Q222 318 209.5 295.5Q197 273 197 245Q197 216 209.0 193.5Q221 171 243.0 158.0Q265 145 292 145ZM381 0V131L406 251L381 369V489H552V0Z"/><path transform="translate(541 0)" d="M51 0V489H225V0Z"/></g><path d="M20.7 0.5Q21.4 3.4 24.3 4.1Q21.4 4.8 20.7 7.7Q20 4.8 17.1 4.1Q20 3.4 20.7 0.5Z"/></g>' };

// Custom AI family (same two-tone construction): agent, chat / prompt, wand, model, doc / skill.
all['ai-agent'] = { w: 24, h: 24, body: '<g fill="currentColor"><path fill-rule="evenodd" d="M12 5c-5.2 0-8.7 3.5-8.7 8.2 0 1.4.3 2.6.8 3.7-.9.6-1.4 1.4-1.4 2.3 0 1.8 1.7 2.6 3.7 2.6h11.2c2 0 3.7-.8 3.7-2.6 0-.9-.5-1.7-1.4-2.3.5-1.1.8-2.3.8-3.7 0-4.7-3.5-8.2-8.7-8.2ZM6.7 17.6a5.3 3.5 0 1 0 10.6 0a5.3 3.5 0 1 0 -10.6 0ZM7.3 10.6Q8.7 12.1 10.1 10.6Q8.7 11.1 7.3 10.6ZM13.9 10.6Q15.3 12.1 16.7 10.6Q15.3 11.1 13.9 10.6ZM10.9 12.55Q12 13.6 13.1 12.55Q12 12.85 10.9 12.55Z"/><path d="M5.2 8.7 5.8 3.9l3 2.6Z"/><path d="M18.8 8.7l-.6-4.8-3 2.6Z"/><path opacity=".45" d="M6.7 17.6a5.3 3.5 0 1 0 10.6 0a5.3 3.5 0 1 0 -10.6 0Z"/><path opacity=".55" d="M20.8 1.5Q21.28 3.52 23.3 4Q21.28 4.48 20.8 6.5Q20.32 4.48 18.3 4Q20.32 3.52 20.8 1.5Z"/></g>' }; // a sleepy, chubby agent: little ears, closed eyes, smile, soft belly, a spark like a 'z'
all['ai-chat'] = { w: 24, h: 24, body: '<g fill="currentColor"><path opacity=".5" d="M3.5 7a3.5 3.5 0 0 1 3.5-3.5h10A3.5 3.5 0 0 1 20.5 7v7a3.5 3.5 0 0 1-3.5 3.5h-5.2l-4.3 3.4c-.5.4-1.2 0-1.2-.6v-2.8H7A3.5 3.5 0 0 1 3.5 14Z"/><path d="M12 5.9Q12.85 9.65 16.6 10.5Q12.85 11.35 12 15.1Q11.15 11.35 7.4 10.5Q11.15 9.65 12 5.9Z"/></g>' };
all['ai-wand'] = { w: 24, h: 24, body: '<g fill="currentColor"><rect opacity=".5" x="9.6" y="2.2" width="3.2" height="21" rx="1.6" transform="rotate(45 11.2 12.7)"/><path d="M17.2 2.4Q18 6 21.6 6.8Q18 7.6 17.2 11.2Q16.4 7.6 12.8 6.8Q16.4 6 17.2 2.4Z"/><path opacity=".5" d="M6.2 2Q6.65 3.95 8.6 4.4Q6.65 4.85 6.2 6.8Q5.75 4.85 3.8 4.4Q5.75 3.95 6.2 2Z"/><path opacity=".5" d="M19.6 14.5Q19.98 16.02 21.5 16.4Q19.98 16.78 19.6 18.3Q19.22 16.78 17.7 16.4Q19.22 16.02 19.6 14.5Z"/></g>' };
all['ai-model'] = { w: 24, h: 24, body: '<g fill="currentColor"><rect opacity=".5" x="3.3" y="5.5" width="19.2" height="11.6" rx="2.2"/><rect x="1.2" y="3.6" width="1.6" height="16" rx=".8"/><rect opacity=".5" x="2.6" y="15.2" width="1.2" height="2.6" rx=".5"/><rect x="6.6" y="17.9" width="1.15" height="2.3" rx=".35"/><rect x="8.35" y="17.9" width="1.15" height="2.3" rx=".35"/><rect x="10.1" y="17.9" width="1.15" height="2.3" rx=".35"/><rect x="11.85" y="17.9" width="1.15" height="2.3" rx=".35"/><rect x="13.6" y="17.9" width="1.15" height="2.3" rx=".35"/><rect x="15.35" y="17.9" width="1.15" height="2.3" rx=".35"/><rect x="17.1" y="17.9" width="1.15" height="2.3" rx=".35"/><path fill-rule="evenodd" d="M4.85 11.2a3.75 3.75 0 1 0 7.5 0a3.75 3.75 0 1 0 -7.5 0ZM8.6 8.65Q9.08 10.72 11.15 11.2Q9.08 11.68 8.6 13.75Q8.12 11.68 6.05 11.2Q8.12 10.72 8.6 8.65Z"/><path fill-rule="evenodd" d="M13.35 11.2a3.75 3.75 0 1 0 7.5 0a3.75 3.75 0 1 0 -7.5 0ZM17.1 8.65Q17.58 10.72 19.65 11.2Q17.58 11.68 17.1 13.75Q16.62 11.68 14.55 11.2Q16.62 10.72 17.1 8.65Z"/></g>' }; // a GPU: bracket, gold fingers, two fans with spark hubs
all['ai-doc'] = { w: 24, h: 24, body: '<g fill="currentColor"><path opacity=".5" d="M6 2.5h7.6l5.9 5.9V19A2.5 2.5 0 0 1 17 21.5H6A2.5 2.5 0 0 1 3.5 19V5A2.5 2.5 0 0 1 6 2.5Z"/><path d="M13.4 2.6v3.6a2.2 2.2 0 0 0 2.2 2.2h3.8Z"/><path d="M10.2 10Q11.05 13.75 14.8 14.6Q11.05 15.45 10.2 19.2Q9.35 15.45 5.6 14.6Q9.35 13.75 10.2 10Z"/></g>' };

const symbols = Object.entries(all).sort(([a], [b]) => a.localeCompare(b))
  .map(([id, i]) => `  <symbol id="dd-i-${id}" viewBox="0 0 ${i.w} ${i.h}">${i.body}</symbol>`).join('\n');
await writeFile(new URL('../ds/icons/icons.svg', import.meta.url),
  `<!-- dawn & dusk icons — Solar by 480 Design (CC BY 4.0), via Iconify. Generated by scripts/fetch-icons.mjs. -->\n` +
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols}\n</svg>\n`);
console.log(`${Object.keys(all).length} icons → ds/icons/icons.svg`);
