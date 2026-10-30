/* Status colors: ok / warn / bad / info tuned to the system's tone. Used by labels, alerts, table status,
   form errors. Option #01 keeps the palette's own; dusk versions lift automatically for dark grounds. */
(() => {
  const st = (name, note, [ok, warn, bad, info], extra = {}) => ({ name, note, round: 4, s: { ok, warn, bad, info }, ...extra });
  // Harmonize with the Color set: pull each status a quarter of the way toward set slot 1.
  const toward = (c) => `color-mix(in oklab, ${c} 74%, var(--sp-1))`;

  DD.category({
    id: 'status', group: 'Foundations', kind: 'status', title: 'Status colors',
    blurb: 'Success / warning / error / info, tuned to the tone of the system. Drives labels, alerts, table status and form errors. #01 keeps the palette’s own.',
    options: [
      { name: 'Palette’s own', note: 'Whatever the palette defines (Greige Gallery: muted sage / ochre / clay / slate)', round: 4 },
      st('Golden hour', 'Warm-shifted: olive sage, honey, terracotta, dusk slate — matches the Golden hour set',
        ['#6e8a4a', '#c8962c', '#b5523a', '#5f7d97']),
      st('Harmonized with Color set', 'Classic meanings, each pulled a quarter-way toward your Color set’s first colour',
        [toward('#4f8a5b'), toward('#b7862b'), toward('#b4473c'), toward('#4a6fa0')]),
      st('Earth & clay', 'Moss, ochre, brick, stone blue — grounded and quiet',
        ['#5d7a4a', '#b07f2a', '#9c4a3a', '#566f86']),
      st('Soft interior', 'Paler and gentler: sage, sand gold, clay rose, mist',
        ['#7f9b78', '#c3a05a', '#b87262', '#7d95aa']),
      st('Sunrise', 'Brighter morning tones: dew green, sunrise amber, ember, morning blue',
        ['#6f9a6a', '#e0a23c', '#d0614a', '#7a8fc0']),
      st('Desert', 'Olive, sand, rust, mauve',
        ['#8a9a5b', '#c9a14a', '#a8553d', '#8a7fa0']),
      st('Dusk jewel', 'Deeper evening jewels: emerald, topaz, garnet, sapphire',
        ['#3f8a6e', '#c4922f', '#9e3d4f', '#4a64a3']),
      st('Muted classic', 'Standard green / amber / red / blue, just desaturated',
        ['#4f8a5b', '#b7862b', '#b4473c', '#4a6fa0']),
      st('Ink & ochre', 'Nearly monochrome — ink green, ochre, oxblood, graphite; meaning leans on icons',
        ['#4d5a4a', '#a37a2a', '#7d3b33', '#5a5f66']),
    ],
    preview: (o) => {
      const pal = DD.currentPalette();
      const KEYS = [['ok', 'Live'], ['warn', 'Beta'], ['bad', 'Failed'], ['info', 'Info']];
      return `<div class="pv-st">${['dawn', 'dusk'].map((m) => `
        <div class="pv-st-p" style="${DD.style({ ...DD.paletteVars(DD.duskOrDawn(pal, m), m), ...DD.spectrumOf(m), ...DD.statusVars(o, m) })}">
          <div class="pv-st-top mono">${m === 'dawn' ? '☀ dawn' : '☾ dusk'}</div>
          <div class="pv-st-row">${KEYS.map(([k, l]) => `<span class="pv-st-b is-solid" style="--s: var(--${k})">${l}</span>`).join('')}</div>
          <div class="pv-st-row">${KEYS.map(([k, l]) => `<span class="pv-st-b" style="--s: var(--${k})">${l}</span>`).join('')}</div>
          <div class="pv-st-al"><i style="background: var(--ok)"></i>Deployed to cxkw.dev</div>
          <div class="pv-st-al is-bad"><i style="background: var(--bad)"></i>Couldn’t load fonts</div>
        </div>`).join('')}</div>`;
    },
    css: `
      .pv-st { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .pv-st-p { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 10px; background: var(--bg); color: var(--text);
        border: 1px solid var(--border); min-width: 0; font-family: var(--font-body); font-size: 12px; }
      .pv-st-top { font-size: 10.5px; color: var(--muted); }
      .pv-st-row { display: flex; flex-wrap: wrap; gap: 4px; }
      .pv-st-b { display: inline-flex; align-items: center; line-height: 1; padding: 4px 6px; border-radius: 3px; font-size: 9.5px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.07em; background: color-mix(in oklab, var(--s) 18%, transparent); color: color-mix(in oklab, var(--s) 70%, var(--text)); }
      .pv-st-b.is-solid { background: var(--s); color: oklch(from var(--s) clamp(0.22, (0.66 - l) * 99, 0.97) 0.012 h); }
      .pv-st-al { display: flex; align-items: center; gap: 6px; padding: 6px 8px; border-radius: 6px; background: var(--ok-soft); }
      .pv-st-al.is-bad { background: var(--bad-soft); }
      .pv-st-al i { width: 7px; height: 7px; border-radius: 50%; flex: none; }`,
  });
})();
