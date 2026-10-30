/* Round 3 + 4 foundations: tuning siblings around the user's picks. Appended so earlier picks keep their index. */
(() => {
  const push = (id, basedOn, opts, round = 3) => {
    const c = DD.byId[id];
    if (c) c.options.push(...opts.map((o) => ({ ...o, round, basedOn })));
  };

  // ---------- fonts ----------
  const FAMILIES = [
    'League+Spartan:wght@400;700;800;900', 'Gabarito:wght@400;700;800;900', 'Poppins:wght@400;600;700;800',
    'Kumbh+Sans:wght@400;700;800;900', 'Montserrat:wght@400;700;800;900',
    'Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,700;1,400', 'Golos+Text:wght@400;500;700',
    'Rethink+Sans:ital,wght@0,400;0,500;0,700;1,400', 'Funnel+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400',
    'Gantari:ital,wght@0,300;0,400;0,500;0,700;1,400', 'Commissioner:wght@300;400;500;700',
    'Reddit+Mono:wght@400;600', 'Chivo+Mono:ital,wght@0,400;0,600;1,400', 'Sometype+Mono:ital,wght@0,400;0,600;1,400',
    'Ubuntu+Sans+Mono:ital,wght@0,400;0,600;1,400', 'Overpass+Mono:wght@400;600', 'Noto+Sans+Mono:wght@400;600',
    'Red+Hat+Text:ital,wght@0,300;0,400;0,500;0,700;1,400', 'Wix+Madefor+Text:ital,wght@0,400;0,500;0,700;1,400',
    'Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400', 'Mulish:ital,wght@0,300;0,400;0,500;0,700;1,400',
  ];
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${FAMILIES.map((f) => `family=${f}`).join('&')}&display=swap`;
    document.head.append(link);
  }

  const font = (prop, fallback) => (family, note, meta) => ({ name: family, note, meta, vars: { [prop]: `'${family}', ${fallback}` } });
  const disp = font('--font-display', 'sans-serif');
  const body = font('--font-body', 'sans-serif');
  const mono = font('--font-mono', 'monospace');

  push('font-display', '#01 Outfit', [
    disp('League Spartan', 'Tighter, more architectural geometry', 'geometric sans · 100–900'),
    disp('Gabarito', 'Rounder joins, friendly at black weight', 'geometric sans · 400–900'),
    disp('Poppins', 'Wider, very even circles', 'geometric sans · 100–900'),
    disp('Plus Jakarta Sans', 'Slightly condensed, softer terminals', 'geometric sans · 200–800'),
    disp('Kumbh Sans', 'Narrow apertures, crisp', 'geometric sans · 100–900'),
    disp('Montserrat', 'Wide, signage-like', 'geometric sans · 100–900'),
    disp('Figtree', 'Warmer, a little more humanist', 'geometric sans · 300–900'),
  ]);

  push('font-body', '#01 DM Sans', [
    body('Be Vietnam Pro', 'Slightly wider, very calm', 'sans · 100–900 + italic'),
    body('Golos Text', 'UI-tuned, compact', 'sans · 400–900'),
    body('Rethink Sans', 'Rounder, a touch more personality', 'sans · 400–800 + italic'),
    body('Funnel Sans', 'Open, airy, modern', 'sans · 300–800 + italic'),
    body('Gantari', 'Geometric, lighter colour on the page', 'sans · 100–900 + italic'),
    body('Commissioner', 'Low-contrast, slightly technical', 'sans · 100–900'),
  ]);

  push('font-mono', '#05 DM Mono', [
    mono('Reddit Mono', 'Rounded, friendly, tall', 'mono · 200–900'),
    mono('Chivo Mono', 'Grotesk-flavoured, compact', 'mono · 100–900 + italic'),
    mono('Sometype Mono', 'Soft, typewriter-ish', 'mono · 400–700 + italic'),
    mono('Ubuntu Sans Mono', 'Humanist, very legible', 'mono · 400–700 + italic'),
    mono('Overpass Mono', 'Highway-sign geometry', 'mono · 300–700'),
    mono('Noto Sans Mono', 'Neutral, wide coverage', 'mono · 100–900'),
  ]);

  // ---------- headings (Logo lockup = 800, -0.05em, lowercase, 0.92, upright em) ----------
  const LOCKUP = {
    '--h-weight': '800', '--h-tracking': '-0.05em', '--h-case': 'lowercase', '--h-style': 'normal', '--h-leading': '0.92',
    '--h-variant': 'normal', '--h-stroke': '0px transparent', '--h-color': 'inherit', '--h-em-style': 'normal',
    '--h-em-color': 'inherit', '--h-em-bg': 'none', '--h-em-deco': 'none', '--h-em-pad': '0', '--h-em-font': 'inherit',
  };
  const head = (name, note, v) => ({ name: `Logo lockup · ${name}`, note, vars: { ...LOCKUP, ...v } });
  push('headings', '#01 Logo lockup', [
    head('700', 'One step lighter — bold instead of extra-bold', { '--h-weight': '700' }),
    head('900 tighter', 'Black weight, tighter tracking and leading', { '--h-weight': '900', '--h-tracking': '-0.06em', '--h-leading': '0.88' }),
    head('sentence case', 'Same weight and tracking, normal capitals', { '--h-case': 'none' }),
    head('looser', 'Opened up: -0.03em tracking, 1.0 leading', { '--h-tracking': '-0.03em', '--h-leading': '1' }),
    head('muted em', 'Emphasised words fade to the muted ink', { '--h-em-color': 'var(--muted)' }),
    head('underlined em', 'Emphasis gets a thick ink underline', { '--h-em-deco': 'underline 0.08em currentColor' }),
    head('ink marker em', 'A faint ink highlighter behind the emphasis', {
      '--h-em-bg': 'linear-gradient(transparent 60%, color-mix(in oklab, var(--text) 14%, transparent) 60%)', '--h-em-pad': '0 0.05em',
    }),
  ]);

  // ---------- type scale (Major third 1.25 / 16px / 1.5) ----------
  const scale = (name, ratio, base, lh, note) => ({ name: `Major third · ${name}`, ratio, base, lh, note: `${ratio} × ${base}px, line-height ${lh} — ${note}` });
  push('type-scale', '#04 Major third · 1.25', [
    scale('15px base', 1.25, 15, 1.5, 'same steps, a notch smaller overall'),
    scale('17px base', 1.25, 17, 1.55, 'same steps, a notch larger overall'),
    scale('airy leading', 1.25, 16, 1.6, 'more space between lines'),
    scale('tight leading', 1.25, 16, 1.45, 'denser paragraphs'),
    scale('softer 1.2', 1.2, 16, 1.5, 'less jump between heading levels'),
    scale('bolder 1.28', 1.28, 16, 1.5, 'slightly bigger headings'),
    scale('bolder 1.3', 1.3, 16, 1.5, 'noticeably bigger headings'),
  ]);

  // ---------- radius (Subtle = 5 / 8 / 10) ----------
  const rad = (name, ctl, box, lg, note) => ({ name: `Subtle · ${name}`, note, vars: { '--r-ctl': ctl, '--r-box': box, '--r-lg': lg } });
  push('radius', '#04 Subtle', [
    rad('crisper', '4px', '6px', '8px', 'Every corner a step sharper'),
    rad('softer', '6px', '10px', '12px', 'Every corner a step rounder'),
    rad('soft boxes', '5px', '12px', '16px', 'Controls stay crisp, cards and dialogs soften'),
    rad('crisp controls', '3px', '8px', '10px', 'Buttons and inputs sharper, boxes unchanged'),
    rad('pill controls', '999px', '8px', '10px', 'Capsule buttons and inputs on subtle boxes'),
    rad('uniform 6', '6px', '6px', '6px', 'One radius everywhere'),
  ]);

  // ---------- depth (Borderless = no lines, no shadow) ----------
  const black = (a) => `rgb(0 0 0 / ${a})`;
  const dep = (name, note, v) => ({ name: `Borderless · ${name}`, note, vars: { '--bw': '0px', '--bstyle': 'solid', '--shadow-sm': 'none', '--shadow': 'none', '--shadow-lg': 'none', ...v } });
  const ring = 'color-mix(in oklab, var(--text) 8%, transparent)';
  push('depth', '#02 Borderless', [
    dep('whisper shadow', 'Still no lines; surfaces get the faintest lift', {
      '--shadow-sm': `0 1px 2px ${black(0.05)}`, '--shadow': `0 1px 3px ${black(0.06)}`, '--shadow-lg': `0 10px 28px -10px ${black(0.16)}`,
    }),
    dep('faint ring', 'A 1px tonal ring instead of a border', {
      '--shadow-sm': `0 0 0 1px ${ring}`, '--shadow': `0 0 0 1px ${ring}`, '--shadow-lg': `0 0 0 1px ${ring}, 0 16px 36px -16px ${black(0.22)}`,
    }),
    dep('top highlight', 'Inset light edge on top, like a lit shelf', {
      '--shadow-sm': `inset 0 1px 0 rgb(255 255 255 / 0.28), 0 1px 2px ${black(0.06)}`,
      '--shadow': `inset 0 1px 0 rgb(255 255 255 / 0.28), 0 1px 3px ${black(0.06)}`,
      '--shadow-lg': `inset 0 1px 0 rgb(255 255 255 / 0.22), 0 14px 32px -14px ${black(0.2)}`,
    }),
    dep('deeper tone', 'Tone only, but surfaces sit a clear step off the page', {
      '--surface': 'color-mix(in oklab, var(--text) 5%, var(--bg))', '--surface-2': 'color-mix(in oklab, var(--text) 9%, var(--bg))',
    }),
    dep('floating overlays', 'Flat in the page; only menus and dialogs cast a shadow', {
      '--shadow-lg': `0 18px 44px -18px ${black(0.3)}`,
    }),
    dep('whisper seams', 'Inner separators (table rules, dividers) fade further back', {
      '--border': 'color-mix(in oklab, var(--text) 7%, var(--bg))',
    }),
  ]);

  // ---------- texture (Plain) ----------
  const noise = (freq, oct, alpha, type = 'fractalNoise') => `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='${type}' baseFrequency='${freq}' numOctaves='${oct}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 ${alpha} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
  const tex = (name, note, t, size) => ({ name: `Plain · ${name}`, note, vars: { '--tex': t, '--tex-size': size } });
  push('texture', '#01 Plain', [
    tex('whisper grain', 'Barely-there noise — felt more than seen', noise('.9', 4, '.09'), '160px 160px'),
    tex('site grain', 'The fractal grain cxkw.dev already uses, matched in strength', noise('.9', 4, '.13'), '160px 160px'),
    tex('paper fibre', 'Long soft fibres, like uncoated stock', noise('.01 .4', 2, '.07'), '320px 320px'),
    tex('grain + vignette', 'Whisper grain with gently darkened edges',
      `${noise('.9', 4, '.09')}, radial-gradient(130% 100% at 50% 40%, transparent 60%, color-mix(in oklab, var(--text) 7%, transparent))`,
      '160px 160px, 100% 100%'),
  ]);

  // ---------- motion (Gentle = 320ms cubic-bezier(.45,0,.55,1)) ----------
  const mo = (name, dur, ease, note) => ({ name: `Gentle · ${name}`, note, vars: { '--dur': dur, '--ease': ease } });
  push('motion', '#05 Gentle', [
    mo('quicker', '240ms', 'cubic-bezier(.45,0,.55,1)', 'Same curve, a quarter faster'),
    mo('slower', '420ms', 'cubic-bezier(.45,0,.55,1)', 'Same curve, more unhurried'),
    mo('ease-out', '320ms', 'cubic-bezier(.2,.7,.3,1)', 'Starts quicker, settles softly'),
    mo('soft spring', '360ms', 'cubic-bezier(.34,1.25,.64,1)', 'A hint of overshoot at the end'),
    mo('sine', '320ms', 'cubic-bezier(.37,0,.63,1)', 'Smoother, rounder in-and-out'),
  ]);
  // ================= round 4: siblings around the round-3 picks =================
  push('type-scale', '#13 Major third · 17px base', [
    { name: 'Major third · 17px · airy leading', ratio: 1.25, base: 17, lh: 1.65, note: '1.25 × 17px, line-height 1.65 — more air between lines' },
    { name: 'Major third · 17px · tight leading', ratio: 1.25, base: 17, lh: 1.45, note: '1.25 × 17px, line-height 1.45 — denser paragraphs' },
    { name: 'Major third · 17px · softer 1.2', ratio: 1.2, base: 17, lh: 1.55, note: '1.2 × 17px — same body, calmer headings' },
    { name: 'Major third · 17px · bolder 1.28', ratio: 1.28, base: 17, lh: 1.55, note: '1.28 × 17px — same body, bigger headings' },
    { name: 'Major third · 18px base', ratio: 1.25, base: 18, lh: 1.6, note: '1.25 × 18px, line-height 1.6 — one notch larger again' },
  ], 4);

  push('density', '#06 Comfortable', [
    { name: 'Comfortable · 4.6px', note: '8% tighter than Comfortable — a bit more per screen', vars: { '--u': '4.6px' } },
    { name: 'Comfortable · 4.8px', note: 'A hair tighter', vars: { '--u': '4.8px' } },
    { name: 'Comfortable · 5.2px', note: 'A hair roomier', vars: { '--u': '5.2px' } },
    { name: 'Comfortable · 5.4px', note: '8% roomier — edging toward Relaxed', vars: { '--u': '5.4px' } },
  ], 4);

  const tone = (a, b) => ({ '--surface': `color-mix(in oklab, var(--text) ${a}%, var(--bg))`, '--surface-2': `color-mix(in oklab, var(--text) ${b}%, var(--bg))` });
  push('depth', '#17 Borderless · deeper tone', [
    dep('deeper tone · softer step', 'Surfaces only 3% off the page — barely there', tone(3, 7)),
    dep('deeper tone · stronger step', 'Surfaces 8% off the page — clearly blocked out', tone(8, 12)),
    dep('deeper tone + whisper shadow', 'The same tone step plus the faintest lift', {
      ...tone(5, 9), '--shadow-sm': `0 1px 2px ${black(0.05)}`, '--shadow': `0 1px 3px ${black(0.06)}`, '--shadow-lg': `0 12px 30px -12px ${black(0.2)}`,
    }),
    dep('deeper tone + faint ring', 'The same tone step, edged with a 1px tonal ring', {
      ...tone(5, 9), '--shadow-sm': `0 0 0 1px ${ring}`, '--shadow': `0 0 0 1px ${ring}`, '--shadow-lg': `0 0 0 1px ${ring}, 0 16px 36px -16px ${black(0.22)}`,
    }),
    dep('lighter surfaces', 'Inverted step: cards sit lighter than the page, like paper on a desk', {
      '--surface': 'color-mix(in oklab, var(--bg) 90%, white)', '--surface-2': 'color-mix(in oklab, var(--text) 6%, var(--bg))',
    }),
  ].map((o) => ({ ...o, name: o.name.replace('Borderless · deeper tone · ', 'Deeper tone · ').replace('Borderless · deeper tone + ', 'Deeper tone + ').replace('Borderless · lighter', 'Deeper tone · lighter') })), 4);

  // Film grain (#02) = fractal noise .8 / 3 octaves, grey at .55 alpha, rect opacity .35, 180px tile.
  const grain = (freq, oct, alpha, rgb = '.5 .5 .5', op = '.35') => {
    const [r, g, b] = rgb.split(' ');
    return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${oct}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 ${alpha} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='${op}'/></svg>")`;
  };
  const gtex = (name, note, t, size) => ({ name: `Film grain · ${name}`, note, vars: { '--tex': t, '--tex-size': size } });
  push('texture', '#02 Film grain', [
    gtex('finer', 'Same strength, smaller specks — reads as a smooth matte', grain('1.15', 3, '.55'), '140px 140px'),
    gtex('coarser', 'Bigger, softer clumps — more analog photo', grain('.5', 2, '.55'), '220px 220px'),
    gtex('warmer', 'Grain tinted toward umber instead of neutral grey', grain('.8', 3, '.6', '.55 .42 .3'), '180px 180px'),
    gtex('softer', 'Same grain at about two-thirds strength', grain('.8', 3, '.55', '.5 .5 .5', '.23'), '180px 180px'),
  ], 4);

  push('font-body', '#06 Figtree', [
    body('Red Hat Text', 'Warm geometric with slightly squarer curves', 'sans · 300–700 + italic'),
    body('Wix Madefor Text', 'Friendly, open, a touch rounder than Figtree', 'sans · 400–800 + italic'),
    body('Nunito Sans', 'Softer, rounder humanist geometry', 'sans · 200–1000 + italic'),
    body('Mulish', 'Minimal, light on the page, very even', 'sans · 200–1000 + italic'),
  ], 4);

  push('radius', '#04 Subtle', [
    rad('bigger dialogs', '5px', '8px', '14px', 'Controls and boxes unchanged; dialogs and big panels rounder'),
    rad('rounder controls', '7px', '8px', '10px', 'Buttons and inputs nearly match the boxes'),
    rad('boxes 10', '5px', '10px', '12px', 'Cards and menus a step rounder, controls unchanged'),
    rad('uniform 8', '8px', '8px', '8px', 'One 8px radius everywhere'),
  ], 4);
})();
