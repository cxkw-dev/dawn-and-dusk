/* Dusk: dark-mode designs applied over any palette. #01 keeps each palette's own dusk.
   Every option fixes the same three problems differently: muddy brown-blacks, cream-slab glare, flat layering. */
(() => {
  const STATUS = { ok: '#8fbf8f', warn: '#d6ad5a', bad: '#df8a73', info: '#92b0cc' };
  const dusk = (name, note, [bg, surface, surface2, border, text, muted, accent, onAccent], tones) => ({
    name, note, round: 3,
    p: { bg, surface, surface2, border, text, muted, accent, onAccent, status: STATUS, tones },
  });

  DD.category({
    id: 'dusk', group: 'Foundations', kind: 'dusk', title: 'Dusk (dark mode)',
    blurb: 'How dark mode looks, independent of the palette’s light side. Cards always render in dusk. #01 keeps each palette’s own dusk — the rest replace it everywhere.',
    options: [
      { name: 'Palette’s own dusk', note: 'Whatever the applied palette defines — what you’ve seen so far', round: 3 },
      dusk('Lifted charcoal', 'Your ink & cream dusk one step lighter: softened cream text, clear card layers, dimmed cream accent',
        ['#221f1e', '#2c2827', '#363231', '#46413f', '#ece6dc', '#a9a19a', '#e6dfd3', '#221f1e']),
      dusk('Logo ink as page', 'The logo’s own ink #332d2c is the background — dusk is the logo reversed',
        ['#332d2c', '#3d3634', '#48403e', '#584f4c', '#fcf9f2', '#bdb3ad', '#f4efe6', '#332d2c']),
      dusk('Dim', 'Mid-dark, low glare — evening reading, not a cave',
        ['#2a2725', '#34302e', '#3e3a37', '#4e4845', '#e6e0d6', '#aca39b', '#e2dbcf', '#2a2725']),
      dusk('Neutral graphite', 'No brown at all — clean charcoal greys, chalk type',
        ['#1b1b1c', '#252526', '#2f2f31', '#3d3d40', '#ebe9e4', '#a1a09c', '#e4e2dc', '#1b1b1c']),
      dusk('Twilight indigo', 'Literal dusk sky: blue-black ground, cream type',
        ['#161925', '#1f2332', '#282d3e', '#363c50', '#ece7de', '#a4a7b5', '#efe5d0', '#161925'], ['#c9a96e', '#5e6a8f', '#3a3352']),
      dusk('Blue-hour slate', 'Cool slate greys with a warm sand accent',
        ['#1c2127', '#242a31', '#2d343c', '#3c444d', '#e8e6e1', '#a0a8b0', '#d9cfbd', '#1c2127']),
      dusk('Forest night', 'cxkw.dev after dark — deep forest, lime accent',
        ['#0f1c16', '#16261e', '#1e3128', '#2b4135', '#ece7d8', '#a3b3a3', '#c7d67a', '#0f1c16'], ['#c7d67a', '#a8bca4', '#2c5a44']),
      dusk('Espresso', 'Rich coffee browns, caramel accent — warm but not muddy',
        ['#1d1613', '#281f1b', '#322723', '#43352f', '#f0e4d4', '#b5a291', '#d9b48a', '#1d1613']),
      dusk('Lights out', 'True black for OLED; maximum contrast, crisp',
        ['#0b0a0a', '#161414', '#201d1c', '#2e2a29', '#f2ede4', '#9d968f', '#f2ede4', '#0b0a0a']),
      dusk('Low-contrast evening', 'Deliberately soft — nothing shouts',
        ['#2f2b28', '#38332f', '#423c38', '#524b46', '#d8d0c4', '#a59b90', '#d8d0c4', '#2f2b28']),
      dusk('Sepia night', 'Warm reader mode, paper-toned type',
        ['#221b14', '#2c231b', '#362c22', '#473b2f', '#ead9be', '#b5a084', '#ead9be', '#221b14']),
      dusk('Plum dusk', 'A last trace of violet in the sky, rose-cream type',
        ['#1c1720', '#251f2a', '#2f2834', '#3e3545', '#efe7e9', '#b1a4b1', '#e9d8cf', '#1c1720']),
      dusk('Olive night', 'Greenish-black, khaki accent',
        ['#171912', '#20231a', '#2a2e22', '#393e2f', '#eceadc', '#a9ab96', '#cdc99d', '#171912']),
      dusk('Greige night', 'Interior greys after sunset, greige accent',
        ['#24221f', '#2d2a27', '#37332f', '#47423d', '#ebe5db', '#aaa196', '#d4cbbf', '#24221f']),
      dusk('Ink & brass night', 'Near-black with antique brass buttons',
        ['#1a1917', '#23211f', '#2c2a27', '#3b3835', '#efe9df', '#a69f95', '#c9a96e', '#1a1917'], ['#c9a96e', '#d4cbbf', '#6b5640']),
      // Round 4: siblings of Greige Gallery's own dusk (the user's current dark side).
      ...[
        ['lifted', 'One step lighter, clearer card layers', ['#22201e', '#2c2927', '#36322f', '#46413c', '#ece7df', '#aaa196', '#d4cbbf', '#22201e']],
        ['dim', 'Mid-dark and low-glare', ['#2b2826', '#35312e', '#3f3a37', '#4e4845', '#e7e1d8', '#ada49a', '#d4cbbf', '#2b2826']],
        ['deep', 'Darker ground, crisper type', ['#121110', '#1b1a18', '#252321', '#33302c', '#efe9e0', '#a39b90', '#e2dacd', '#121110']],
        ['warm', 'Browner greige, parchment type', ['#1f1b17', '#29241f', '#332d27', '#443c34', '#efe6da', '#b0a493', '#d9c7ad', '#1f1b17']],
        ['cool', 'Neutral charcoal greige', ['#1b1b1b', '#242424', '#2e2e2d', '#3c3c3a', '#ecebe7', '#a3a29d', '#d4cfc6', '#1b1b1b']],
        ['tonal cards', 'Cards clearly lighter than the page', ['#191816', '#2a2724', '#34302c', '#433e39', '#ece7df', '#a59e94', '#d4cbbf', '#191816']],
        ['stone buttons', 'Softer stone accent instead of bright greige', ['#191816', '#211f1d', '#2a2825', '#3a3733', '#ece7df', '#a59e94', '#a39b8f', '#191816']],
      ].map(([n, note, c]) => ({ ...dusk(`Greige dusk · ${n}`, note, c, ['#d4cbbf', '#8a8277', '#5c554d']), round: 4, basedOn: '#01 Palette’s own dusk (Greige Gallery)' })),
      // Recessed: the page is lighter and cards sit darker, like wells. `force` beats depth's surface overrides in dusk.
      ...[
        ['recessed cards', 'Lighter page, darker cards — the look film grain gave by accident, on purpose',
          ['#2b2826', '#1c1a18', '#232120', '#3c3835', '#ece7df', '#aaa196', '#d4cbbf', '#1c1a18']],
        ['recessed, soft', 'Same idea with a gentler step and a dimmer page',
          ['#34302d', '#26231f', '#2d2a27', '#45403c', '#e9e3d9', '#aea59b', '#d4cbbf', '#26231f']],
        ['recessed, deep', 'Charcoal page with near-black wells for cards',
          ['#24211f', '#121110', '#1a1817', '#36322f', '#efe9e0', '#a59d93', '#e2dacd', '#121110']],
      ].map(([n, note, c]) => {
        const o = { ...dusk(`Greige dusk · ${n}`, note, c, ['#d4cbbf', '#8a8277', '#5c554d']), round: 4, basedOn: '#01 Palette’s own dusk (Greige Gallery)' };
        o.force = { '--surface': c[1], '--surface-2': c[2] };
        return o;
      }),
    ],
    preview: () => `<div class="pv-dk">
      <div class="pv-dk-top"><b class="dd-h">cxkw</b><span>Work</span><span>Writing</span><span class="pv-dk-on">Lab</span></div>
      <div class="pv-dk-card">
        <span class="pv-dk-eye mono">Case study</span>
        <b class="dd-h pv-dk-t">A calmer <em>inbox</em></b>
        <p class="pv-dk-p">Triage rebuilt around two moods. <span class="muted">6 min read</span></p>
        <div class="pv-dk-row"><span class="pv-dk-btn">Read more</span><span class="pv-dk-ghost">Save</span></div>
      </div>
      <div class="pv-dk-row"><span class="pv-dk-in">hello@cxkw.dev</span>
        <span class="pv-dk-badge" style="--s: var(--ok)">Live</span><span class="pv-dk-badge" style="--s: var(--warn)">Beta</span><span class="pv-dk-badge" style="--s: var(--bad)">Down</span></div>
    </div>`,
    css: `
      .pv-dk { display: flex; flex-direction: column; gap: 12px; font-size: 13px; }
      .pv-dk-top { display: flex; align-items: baseline; gap: 12px; color: var(--muted); }
      .pv-dk-top b { color: var(--text); font-size: 16px; margin-right: auto; }
      .pv-dk-on { color: var(--text); }
      .pv-dk-card { display: flex; flex-direction: column; gap: 6px; padding: 14px; background: var(--surface);
        border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); box-shadow: var(--shadow); }
      .pv-dk-eye { font-size: 10.5px; color: var(--muted); }
      .pv-dk-t { font-size: 19px; }
      .pv-dk-p { margin: 0; }
      .pv-dk-row { display: flex; align-items: center; gap: 8px; }
      .pv-dk-btn { background: var(--accent); color: var(--on-accent); padding: 5px 12px; border-radius: var(--r-ctl); font-weight: 600; font-size: 12px; }
      .pv-dk-ghost { background: var(--surface-2); padding: 5px 12px; border-radius: var(--r-ctl); font-size: 12px; }
      .pv-dk-in { flex: 1; background: var(--surface-2); color: var(--text); padding: 6px 10px; border-radius: var(--r-ctl); font-size: 12px; }
      .pv-dk-badge { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 6px; border-radius: 4px;
        color: var(--s); background: color-mix(in oklab, var(--s) 16%, transparent); }`,
  });
})();
