/* Color set + chips: an 8-color categorical set for small things (chips, tags, avatars, button fills),
   all drawn from the sky between dawn and dusk. Dusk versions are lifted and softened automatically. */
(() => {
  const set = (name, note, names, colors) => ({ name, note, names, colors, round: 4 });

  DD.category({
    id: 'spectrum', group: 'Foundations', kind: 'spectrum', title: 'Color set',
    blurb: 'Eight extra colors for chips, tags, avatars, categories and button fills — each set is a slice of the sky between dawn and dusk. Dusk versions lift and soften automatically.',
    options: [
      set('Sky hours', 'The whole day in eight steps — first light to dusk',
        ['first light', 'sunrise', 'golden hour', 'morning dew', 'clear noon', 'blue hour', 'twilight', 'dusk'],
        ['#e8a5a0', '#ee9a6b', '#e3b45c', '#9fbf96', '#8fb4d6', '#6f86b8', '#a191c9', '#b07aa6']),
      set('Dawn → dusk ramp', 'One continuous gradient from dawn peach to dusk indigo',
        ['peach', 'blush', 'rose', 'orchid', 'lilac', 'iris', 'periwinkle', 'indigo'],
        ['#f3b49c', '#ec9f9c', '#d98ea6', '#bf86b0', '#a081b8', '#8379b4', '#6a72a8', '#55679a']),
      set('First light', 'Pale pastel morning — barely-there colour',
        ['blush', 'peach', 'butter', 'mint', 'mist', 'lilac', 'shell', 'glow'],
        ['#f2b8b5', '#f6c3a1', '#f2dc9b', '#b9dcc4', '#b8d0e6', '#cbbde8', '#ead1d6', '#efe2c4']),
      set('Golden hour', 'Warm low sun — honey, amber, terracotta, wine',
        ['honey', 'amber', 'apricot', 'terracotta', 'rose', 'wine', 'ochre', 'sand'],
        ['#e0b04f', '#d9913c', '#e48f63', '#c8694a', '#cf7f86', '#9c4f5f', '#b98a35', '#d6bf94']),
      set('Blue hour', 'The cool minutes after sunset',
        ['ice', 'mist', 'slate', 'denim', 'indigo', 'violet', 'steel', 'frost'],
        ['#a9cde0', '#9db5c9', '#6f8aa3', '#5372a0', '#4b5a9a', '#7d6db8', '#8794a3', '#c3d3e0']),
      set('Afterglow', 'Vivid sunset — the loud one',
        ['tangerine', 'coral', 'magenta', 'orchid', 'violet', 'gold', 'flame', 'rosé'],
        ['#f08a3c', '#f07062', '#d1537f', '#b25fb0', '#7d62c9', '#f0b43c', '#e5553b', '#f29fb0']),
      set('Alpenglow', 'Pink light on snow and stone',
        ['rose quartz', 'salmon', 'apricot', 'lilac', 'glacier', 'pine', 'granite', 'snow pink'],
        ['#eab1b7', '#f0a08a', '#f3bb86', '#c4a7d6', '#a9cfe0', '#6f9178', '#9b9a9f', '#f3d2d2']),
      set('Desert dusk', 'Sand, clay and mauve as the heat fades',
        ['sand', 'clay', 'rust', 'sage', 'dusty rose', 'mauve', 'adobe', 'smoke'],
        ['#d8bf95', '#c27a5a', '#a65a3b', '#9aae8e', '#c48e8e', '#9d7f9c', '#d39a72', '#9a8f86']),
      set('Coastal dawn', 'Sea glass, coral and driftwood',
        ['sea glass', 'aqua mist', 'sand', 'coral', 'shell', 'driftwood', 'tide', 'kelp'],
        ['#9ccbbd', '#a3d1d9', '#e2cfa9', '#ec9a86', '#efc0bc', '#b8a690', '#6fa3a9', '#8a9a6b']),
      set('Interior tones', 'Matches the greige palettes — sage, brass, clay, slate',
        ['sage', 'brass', 'clay', 'slate', 'mushroom', 'oxblood', 'moss', 'walnut'],
        ['#a8bca4', '#c9a96e', '#c98668', '#8a9aa8', '#bfb3a3', '#9b5a55', '#8d9c78', '#9c7a5b']),
      set('Moonlit', 'Silver and cool grey-blues of a clear night',
        ['pewter', 'moonstone', 'frost', 'lavender grey', 'silver sage', 'night blue', 'pearl', 'graphite'],
        ['#9aa0a6', '#c2c9d6', '#c9dbe6', '#b3adc7', '#b7c2b4', '#6c7b9a', '#ddd8cf', '#7b7d82']),
      set('Harvest dusk', 'Late-autumn evening — olive, mustard, fig',
        ['olive', 'mustard', 'rust', 'plum', 'moss', 'wheat', 'brick', 'fig'],
        ['#8f9a52', '#d2a93e', '#b8643c', '#84506f', '#6f8a55', '#dcc58a', '#a5513f', '#6e4f6b']),
      set('Nocturne', 'Muted jewel tones for deep night',
        ['sapphire', 'emerald', 'amethyst', 'garnet', 'topaz', 'teal', 'ruby', 'onyx'],
        ['#4f6fb0', '#4f9a7d', '#8c6bb5', '#a8495b', '#d1a24a', '#4e8f9a', '#b8546a', '#5b5d66']),
      set('Lavender fields', 'Evening in Provence — lavender, heather, wheat',
        ['lavender', 'heather', 'sage', 'cream', 'dusk purple', 'wheat', 'rose', 'slate'],
        ['#b4a3d8', '#c49bc0', '#a9bfa1', '#ead9b4', '#7f6aa8', '#d6c08b', '#d7a1b1', '#8b93a8']),
      set('Citrus morning', 'Bright breakfast colours',
        ['lemon', 'lime', 'orange', 'grapefruit', 'mint', 'sky', 'peach', 'leaf'],
        ['#ecd56b', '#b9d36b', '#f2a14a', '#f08877', '#9bd3b4', '#8cc3e8', '#f5b98e', '#78ad6a']),
      set('Ink wash', 'No hue — eight steps from greige to ink, for a monochrome system',
        ['bone', 'linen', 'putty', 'stone', 'taupe', 'umber', 'smoke', 'ink'],
        ['#e2ddd4', '#cfc8bc', '#b6aea1', '#9b9386', '#81796d', '#675f55', '#4d473f', '#34302b']),
    ],
    preview: (o) => {
      const pal = DD.currentPalette();
      return `<div class="pv-sp">${['dawn', 'dusk'].map((m) => `
        <div class="pv-sp-p" style="${DD.style({ ...DD.paletteVars(DD.duskOrDawn(pal, m), m), ...DD.spectrumVars(o, m) })}">
          <div class="pv-sp-top mono"><span>${m === 'dawn' ? '☀ dawn' : '☾ dusk'}</span></div>
          <div class="pv-sp-sw">${o.colors.map((_, i) => `<i style="background:var(--sp-${i + 1})" title="${o.names[i]}"></i>`).join('')}</div>
          <div class="pv-sp-chips">${o.names.slice(0, 6).map((n, i) => `<span style="--c:var(--sp-${i + 1})">${n}</span>`).join('')}</div>
          <div class="pv-sp-btns">${[1, 3, 6].map((n) => `<span style="--c:var(--sp-${n})">Button</span>`).join('')}</div>
        </div>`).join('')}</div>`;
    },
    css: `
      .pv-sp { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .pv-sp-p { display: flex; flex-direction: column; gap: 10px; padding: 12px; border-radius: 10px; background: var(--bg); color: var(--text);
        border: 1px solid var(--border); min-width: 0; font-family: var(--font-body); }
      .pv-sp-top { font-size: 10.5px; color: var(--muted); }
      .pv-sp-sw { display: grid; grid-template-columns: repeat(8, 1fr); gap: 3px; }
      .pv-sp-sw i { aspect-ratio: 1; border-radius: 50%; }
      .pv-sp-chips { display: flex; flex-wrap: wrap; gap: 4px; }
      .pv-sp-chips span { display: inline-flex; align-items: center; line-height: 1; padding: 4px 7px; border-radius: 99px; font-size: 10.5px;
        background: color-mix(in oklab, var(--c) 22%, transparent); color: color-mix(in oklab, var(--c) 62%, var(--text)); }
      .pv-sp-btns { display: flex; gap: 4px; flex-wrap: wrap; }
      .pv-sp-btns span { display: inline-flex; align-items: center; line-height: 1; padding: 5px 9px; border-radius: 6px; font-size: 11px; font-weight: 600;
        background: var(--c); color: oklch(from var(--c) clamp(0.22, (0.66 - l) * 99, 0.97) 0.012 h); }`,
  });

  // ---------- chips & tags in the color set ----------
  const TOPICS = ['Design systems', 'Swift', 'Tooling', 'Homelab', 'Writing', 'AI', 'Typography', 'Motion'];
  const chip = (t, i) => `<span class="chp-i" style="--c: var(--sp-${i + 1})"><i class="chp-d"></i><span class="chp-l">${t}</span></span>`;
  const autoText = 'oklch(from var(--c) clamp(0.22, (0.66 - l) * 99, 0.97) 0.012 h)';
  const deep = 'color-mix(in oklab, var(--c) 62%, var(--text))';
  const cs = (name, note, css) => ({ name, note, css, round: 4 });

  DD.category({
    id: 'chips', group: 'Components', title: 'Chips & tags (color set)',
    blurb: 'Categorical chips in the eight Color set colours — topics, filters, people. Pick how they render; the colours come from the Color set above.',
    html: `<div class="chp">
      <div class="chp-row">${TOPICS.map(chip).join('')}</div>
      <div class="chp-row chp-people">${['AN', 'MK', 'JS', 'RL', 'TC', 'EV'].map((p, i) => `<span class="chp-av" style="--c: var(--sp-${i + 1})">${p}</span>`).join('')}
        <span class="chp-i is-sel" style="--c: var(--sp-2)"><i class="chp-d"></i><span class="chp-l">Selected filter</span><span class="chp-x">{{icon:x}}</span></span></div>
    </div>`,
    css: `
      .chp { display: flex; flex-direction: column; gap: calc(var(--u) * 3); }
      .chp-row { display: flex; flex-wrap: wrap; gap: calc(var(--u) * 1.5); align-items: center; }
      .chp-i { display: inline-flex; align-items: center; gap: 0.45em; line-height: 1; padding: calc(var(--u) * 1.5) calc(var(--u) * 2.5);
        border-radius: var(--r-ctl); font-size: var(--fs-xs); font-weight: 500; white-space: nowrap; cursor: pointer;
        transition: background var(--dur) var(--ease), color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
      .chp-d { display: none; width: 7px; height: 7px; border-radius: 50%; background: var(--c); flex: none; }
      .chp-x { display: inline-flex; margin-right: -2px; opacity: 0.7; }
      .chp-x .ic { width: 0.95em; height: 0.95em; }
      .chp-av { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; font-size: 10.5px; font-weight: 700;
        letter-spacing: 0.02em; background: color-mix(in oklab, var(--c) 30%, var(--bg)); color: ${deep}; }
      .chp-people .chp-av + .chp-av { margin-left: calc(var(--u) * -2); box-shadow: 0 0 0 2px var(--bg); }
      .chp-people .chp-i { margin-left: calc(var(--u) * 2); }`,
    options: [
      cs('Soft wash', 'Tinted fill, deep text in the same hue', `.chp-i { background: color-mix(in oklab, var(--c) 22%, transparent); color: ${deep}; }
        .chp-i:hover, .chp-i.is-sel { background: color-mix(in oklab, var(--c) 34%, transparent); }`),
      cs('Solid', 'Full colour fill, text flips light/dark automatically', `.chp-i { background: var(--c); color: ${autoText}; }
        .chp-av { background: var(--c); color: ${autoText}; } .chp-i:hover { filter: brightness(0.96); }`),
      cs('Outline', 'Coloured hairline, transparent inside', `.chp-i { box-shadow: inset 0 0 0 1px var(--c); color: ${deep}; }
        .chp-i.is-sel, .chp-i:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }`),
      cs('Dot + neutral', 'Neutral chip with a colour dot — the calmest', `.chp-i { background: var(--surface-2); color: var(--text); } .chp-d { display: block; }
        .chp-i.is-sel { box-shadow: inset 0 0 0 1px var(--c); }`),
      cs('Pill wash', 'Soft wash, fully rounded', `.chp-i { border-radius: 999px; background: color-mix(in oklab, var(--c) 22%, transparent); color: ${deep}; }`),
      cs('Micro caps', 'Tiny tracked caps — matches your Micro caps labels', `.chp-i { text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; font-weight: 600;
        padding: calc(var(--u) * 1.25) calc(var(--u) * 2); border-radius: 3px; background: color-mix(in oklab, var(--c) 24%, transparent); color: ${deep}; }`),
      cs('Left bar', 'Neutral tag with a colour edge', `.chp-i { border-radius: 3px; background: color-mix(in oklab, var(--c) 10%, var(--surface)); color: var(--text);
        box-shadow: inset 3px 0 0 var(--c); padding-left: calc(var(--u) * 3); }`),
      cs('Ghost', 'Just coloured text; a wash appears on hover/selected', `.chp-i { color: ${deep}; padding-left: calc(var(--u) * 1.5); padding-right: calc(var(--u) * 1.5); }
        .chp-i:hover, .chp-i.is-sel { background: color-mix(in oklab, var(--c) 18%, transparent); }`),
      cs('Two-tone', 'Soft fill with a deeper ring of the same hue', `.chp-i { background: color-mix(in oklab, var(--c) 18%, transparent); color: ${deep};
        box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--c) 55%, transparent); }`),
      cs('Hashtag', '#topic — colour only on the hash', `.chp-i { padding-left: calc(var(--u) * 1); padding-right: calc(var(--u) * 1); color: var(--text); }
        .chp-l::before { content: "#"; margin-right: 0.08em; color: var(--c); font-weight: 700; } .chp-i.is-sel { background: var(--surface-2); }`),
      cs('Glow', 'Soft wash with a faint coloured halo — dusk-friendly', `.chp-i { background: color-mix(in oklab, var(--c) 20%, transparent); color: ${deep};
        box-shadow: 0 0 0 1px color-mix(in oklab, var(--c) 30%, transparent), 0 4px 14px -6px var(--c); }`),
      cs('Square tile', 'Square corners, solid soft fill, bold label', `.chp-i { border-radius: 0; font-weight: 700; background: color-mix(in oklab, var(--c) 30%, var(--bg)); color: ${deep}; }
        .chp-av { border-radius: 4px; }`),
    ],
  });

  // ---------- button fills from the color set ----------
  const auto = (c) => `oklch(from ${c} clamp(0.22, (0.66 - l) * 99, 0.97) 0.012 h)`;
  DD.byId['button-color']?.options.push(...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    name: `Color set · ${n}`, slot: n, note: `Slot ${n} of your applied Color set — the name after the dot follows the set`,
    round: 4, vars: { '--btn-accent': `var(--sp-${n})`, '--btn-on': auto(`var(--sp-${n})`) },
  })));

  // ---------- label colors: let badges/labels draw from the Color set ----------
  const lc = (name, note, m, extra = {}) => ({ name, note, round: 4, ...extra,
    vars: { '--lbl-accent': m.accent, '--lbl-ok': m.ok, '--lbl-warn': m.warn, '--lbl-bad': m.bad, '--lbl-info': m.info } });
  const mix = (a, pct, b) => `color-mix(in oklab, ${a} ${pct}%, ${b})`;
  DD.category({
    id: 'label-color', group: 'Components', kind: 'tokens', title: 'Label color',
    blurb: 'Where labels (badges) get their colours: the semantic status colours, or your Color set. Applies to every label style above and on the live page.',
    options: [
      lc('Status colors', 'Green / amber / red / blue keep their meaning — the default',
        { accent: 'var(--accent)', ok: 'var(--ok)', warn: 'var(--warn)', bad: 'var(--bad)', info: 'var(--info)' }),
      lc('Set accent only', 'The accent label takes Color set slot 1; status labels unchanged',
        { accent: 'var(--sp-1)', ok: 'var(--ok)', warn: 'var(--warn)', bad: 'var(--bad)', info: 'var(--info)' }),
      lc('Set-tinted status', 'Status colours pulled toward your set — still readable as good/bad, but on-theme',
        { accent: 'var(--sp-1)', ok: mix('var(--ok)', 55, 'var(--sp-3)'), warn: mix('var(--warn)', 45, 'var(--sp-2)'),
          bad: mix('var(--bad)', 55, 'var(--sp-6)'), info: mix('var(--info)', 55, 'var(--sp-5)') }, { tinted: true }),
      lc('Color set, mapped', 'Every label straight from the set: accent 1 · ok 4 · warn 2 · bad 6 · info 5', 
        { accent: 'var(--sp-1)', ok: 'var(--sp-4)', warn: 'var(--sp-2)', bad: 'var(--sp-6)', info: 'var(--sp-5)' }, { mapped: true }),
      lc('Color set, alt mapping', 'A different slice of the set: accent 2 · ok 3 · warn 1 · bad 4 · info 8',
        { accent: 'var(--sp-2)', ok: 'var(--sp-3)', warn: 'var(--sp-1)', bad: 'var(--sp-4)', info: 'var(--sp-8)' }),
      lc('Set lead + neutrals', 'Only one hue: every coloured label uses slot 1 at different strengths',
        { accent: 'var(--sp-1)', ok: mix('var(--sp-1)', 70, 'var(--text)'), warn: 'var(--sp-1)', bad: mix('var(--sp-1)', 55, 'var(--text)'), info: mix('var(--sp-1)', 60, 'var(--muted)') }),
    ],
    preview: () => `<div class="pv-lc">${['solid', 'soft'].map((v) => `<div class="pv-lc-row">${[['a', 'New'], ['ok', 'Live'], ['warn', 'Beta'], ['bad', 'Failed'], ['info', 'Info']]
      .map(([k, l]) => `<span class="pv-lc-b is-${v}" style="--s: var(--lbl-${k === 'a' ? 'accent' : k})">${l}</span>`).join('')}</div>`).join('')}</div>`,
    css: `
      .pv-lc { display: flex; flex-direction: column; gap: 10px; }
      .pv-lc-row { display: flex; flex-wrap: wrap; gap: 6px; }
      .pv-lc-b { display: inline-flex; align-items: center; line-height: 1; padding: 4px 7px; border-radius: 3px; font-size: 10px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.08em; }
      .pv-lc-b.is-solid { background: var(--s); color: oklch(from var(--s) clamp(0.22, (0.66 - l) * 99, 0.97) 0.012 h); }
      .pv-lc-b.is-soft { background: color-mix(in oklab, var(--s) 20%, transparent); color: color-mix(in oklab, var(--s) 65%, var(--text)); }`,
  });
})();
