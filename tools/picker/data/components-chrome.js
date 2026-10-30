// Chrome & brand categories for the dawn & dusk picker: nav, links, dialogs, wordmark.
// Follows picker/CONTRACT.md — option css is auto-nested inside .spec[data-cat][data-v].

(() => {

/* Shared bits for round-2 nav options. */
// Mini version of the user's two-line lockup (Outfit 800, line 2 cut out of line 1 with a bg-colored stroke).
const NV_LG = `<span class="nl"><span class="nl-1">dawn</span><span class="nl-2"><span class="nl-amp">&amp;</span>dusk</span></span>`;
const NV_LG_CSS = `
.nl { --lg-bg: var(--bg); display: inline-grid; flex: none; font-family: 'Outfit', sans-serif; font-weight: 800; line-height: .78;
  letter-spacing: -0.055em; color: var(--text); }
.nl-1, .nl-2 { position: relative; display: block; white-space: nowrap; }
.nl-2 { z-index: 1; -webkit-text-stroke: .045em var(--lg-bg); paint-order: stroke fill; }
.nl-amp { display: inline-block; width: .56em; margin-left: -.05em; }
`;
// Prefix for rules that should apply when the surrounding scope renders in dusk (live mode or fixed composite).
const IN_DUSK = ':is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .fixed-dusk) &';

// Icon rail (nav #18) building blocks, reused by its round-3 siblings.
const RAIL_ITEMS = [['folder', 'Work', ' is-active'], ['copy', 'Writing', ''], ['sparkle', 'Lab', ' is-hover'], ['user', 'About', '']];
const railLinks = (labels) => RAIL_ITEMS.map(([ic, t, s]) =>
  `<a class="rl-a${s}" data-tip="${t}">{{icon:${ic}}}${labels ? `<span class="rl-t">${t}</span>` : ''}</a>`).join('\n  ');
const railTail = (labels) => `<span class="rl-sep"></span>
  <a class="rl-a" data-tip="Theme">{{icon:moon}}${labels ? '<span class="rl-t">Dusk</span>' : ''}</a>
  <a class="rl-a rl-cta" data-tip="Contact">{{icon:mail}}${labels ? '<span class="rl-t">Contact</span>' : ''}</a>`;
const railHTML = ({ logo = '<span class="rl-logo">d&amp;</span>', labels = false } = {}) => `
<nav class="nv">
  ${logo}
  ${railLinks(labels)}
  ${railTail(labels)}
</nav>`;
const RAIL_CSS = `
.nv { flex-direction: column; flex-wrap: nowrap; align-items: center; gap: calc(var(--u) * 1.5); width: 64px; padding: calc(var(--u) * 3) 0;
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-lg); box-shadow: var(--shadow-sm); }
.rl-logo { display: grid; place-items: center; flex: none; width: 40px; height: 40px; margin-bottom: calc(var(--u) * 2); border-radius: var(--r-ctl);
  background: var(--text); color: var(--bg); font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: -0.06em; }
.rl-a { position: relative; display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--r-ctl); font-size: 19px; color: var(--muted); }
.rl-a:hover, .rl-a.is-hover { background: var(--surface-2); color: var(--text); }
.rl-a.is-active { background: var(--accent-soft); color: var(--accent); }
.rl-a.is-active::before { content: ""; position: absolute; left: -7px; top: 10px; bottom: 10px; width: 3px; border-radius: 0 3px 3px 0; background: var(--accent); }
.rl-a:hover::after, .rl-a.is-hover::after { content: attr(data-tip); position: absolute; z-index: 2; left: calc(100% + 12px); top: 50%;
  transform: translateY(-50%); padding: calc(var(--u) * 1) calc(var(--u) * 2.5); border-radius: 6px; background: var(--text); color: var(--bg);
  font-family: var(--font-body); font-size: var(--fs-xs); font-weight: 500; white-space: nowrap; pointer-events: none; }
.rl-sep { width: 24px; height: 1px; margin: calc(var(--u) * 2) 0; background: var(--border); }
.rl-cta, .rl-cta:hover { background: var(--accent); color: var(--on-accent); }
`;


/* ───────────────────────────── NAV ───────────────────────────── */

DD.category({
  id: 'nav',
  group: 'Components',
  title: 'Navigation',
  blurb: 'The top bar of cxkw.dev: logo, four sections, a mode toggle and one call to action.',
  wide: true,
  html: `
<nav class="nv">
  <span class="nv-logo"><span class="nv-mark"></span><span class="nv-name">cxkw</span></span>
  <span class="nv-path">~/cxkw/<b>work</b></span>
  <span class="nv-links">
    <a class="nv-a is-active"><span class="nv-ix">01</span>Work</a>
    <a class="nv-a"><span class="nv-ix">02</span>Writing</a>
    <a class="nv-a is-hover"><span class="nv-ix">03</span>Lab</a>
    <a class="nv-a"><span class="nv-ix">04</span>About</a>
  </span>
  <span class="nv-search">{{icon:search}}<span class="nv-search-t">Search or jump to…</span><kbd>⌘K</kbd></span>
  <span class="nv-tools"><span class="nv-mode">{{icon:moon}}</span><a class="nv-cta"><span>Contact</span>{{icon:arrow-up-right}}</a></span>
</nav>`,
  css: `
.nv { display: flex; align-items: center; flex-wrap: wrap; gap: calc(var(--u) * 2) calc(var(--u) * 5);
  padding: calc(var(--u) * 3) calc(var(--u) * 4); font-family: var(--font-body); font-size: var(--fs-sm);
  line-height: 1.2; color: var(--text); }
.nv a { cursor: pointer; color: inherit; text-decoration: none;
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease),
    border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.nv-logo { display: inline-flex; align-items: center; gap: calc(var(--u) * 2); font-family: var(--font-display);
  font-size: var(--fs-lg); font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
.nv-mark, .nv-path, .nv-ix, .nv-search { display: none; }
.nv-links { display: flex; align-items: center; gap: calc(var(--u) * 5); }
.nv-a { position: relative; display: inline-flex; align-items: baseline; color: var(--muted); white-space: nowrap; }
.nv-a:hover, .nv-a.is-hover, .nv-a.is-active { color: var(--text); }
.nv-tools { margin-left: auto; display: flex; align-items: center; gap: calc(var(--u) * 3); }
.nv-mode { display: inline-grid; place-items: center; width: 2em; height: 2em; color: var(--muted);
  border-radius: var(--r-ctl); cursor: pointer; transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease); }
.nv-mode:hover { color: var(--text); }
.nv-cta { display: inline-flex; align-items: center; gap: .35em; white-space: nowrap; font-weight: 500; }
.nv kbd { font-family: var(--font-mono); font-size: var(--fs-xs); }
`,
  options: [
    {
      name: 'Quiet',
      note: 'Muted text links; the page does the talking',
      css: `
.nv-a.is-active { font-weight: 600; }
.nv-cta { color: var(--accent); }
.nv-cta:hover { color: var(--accent-hover); }
`,
    },
    {
      name: 'Centered crest',
      note: 'Tracked logo dead-center, links left, actions right',
      css: `
.nv { display: grid; grid-template-columns: minmax(max-content, 1fr) auto minmax(max-content, 1fr);
  grid-template-areas: "links logo tools"; }
.nv-logo { grid-area: logo; justify-self: center; font-size: var(--fs-base); font-weight: 700;
  text-transform: uppercase; letter-spacing: .22em; }
.nv-links { grid-area: links; gap: calc(var(--u) * 4); }
.nv-tools { grid-area: tools; justify-self: end; margin-left: 0; }
.nv-a.is-active { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .45em; }
.nv-cta { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); border: 1px solid var(--border-strong); border-radius: var(--r-ctl); }
.nv-cta:hover { border-color: var(--text); }
`,
    },
    {
      name: 'Floating pill',
      note: 'Detached capsule, ink-filled active tab',
      css: `
.nv { width: fit-content; max-width: 100%; margin-inline: auto; gap: calc(var(--u) * 1);
  padding: calc(var(--u) * 1.25) calc(var(--u) * 1.25) calc(var(--u) * 1.25) calc(var(--u) * 4);
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: 999px; box-shadow: var(--shadow); }
.nv-logo { font-size: var(--fs-base); margin-right: calc(var(--u) * 3); }
.nv-links { gap: 2px; }
.nv-a { padding: calc(var(--u) * 1.75) calc(var(--u) * 3); border-radius: 999px; }
.nv-a:hover, .nv-a.is-hover { background: var(--surface-2); }
.nv-a.is-active { background: var(--text); color: var(--bg); }
.nv-tools { margin-left: calc(var(--u) * 1); gap: calc(var(--u) * 1); }
.nv-mode { border-radius: 999px; }
.nv-mode:hover { background: var(--surface-2); }
.nv-cta { padding: calc(var(--u) * 1.75) calc(var(--u) * 3.5); border-radius: 999px; background: var(--accent); color: var(--on-accent); }
.nv-cta:hover { background: var(--accent-hover); }
`,
    },
    {
      name: 'Rule & rail',
      note: 'Hairline across the page; active link sits on it',
      css: `
.nv { align-items: stretch; gap: 0 calc(var(--u) * 6); padding: 0 calc(var(--u) * 1); border-bottom: 1px solid var(--border); }
.nv-logo, .nv-tools { padding: calc(var(--u) * 3.5) 0; }
.nv-links { align-items: stretch; gap: calc(var(--u) * 5); }
.nv-a { align-items: center; padding: calc(var(--u) * 3.5) 0; margin-bottom: -1px; border-bottom: 2px solid transparent; }
.nv-a:hover, .nv-a.is-hover { border-bottom-color: var(--border-strong); }
.nv-a.is-active { border-bottom-color: var(--accent); font-weight: 500; }
.nv-cta { padding: calc(var(--u) * 1.75) calc(var(--u) * 3); border-radius: var(--r-ctl); background: var(--surface-2); border: 1px solid var(--border); }
.nv-cta:hover { border-color: var(--border-strong); }
`,
    },
    {
      name: 'Brutalist bar',
      note: 'Boxed cells, 2px ink borders, hard offset shadow',
      css: `
.nv { gap: 0; padding: 0; align-items: stretch; background: var(--surface); border: 2px solid var(--text);
  box-shadow: 5px 5px 0 var(--text); font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
.nv-logo { padding: calc(var(--u) * 3) calc(var(--u) * 4); background: var(--text); color: var(--bg);
  font-size: var(--fs-base); font-weight: 800; letter-spacing: -0.02em; text-transform: none; }
.nv-links { gap: 0; align-items: stretch; }
.nv-a { align-items: center; padding: 0 calc(var(--u) * 4); border-right: 2px solid var(--text); color: var(--text); }
.nv-a:hover, .nv-a.is-hover { background: var(--surface-2); color: var(--text); }
.nv-a.is-active { background: var(--accent); color: var(--on-accent); }
.nv-tools { gap: 0; align-items: stretch; }
.nv-mode { width: auto; height: auto; padding: 0 calc(var(--u) * 3); border-radius: 0; border-left: 2px solid var(--text); color: var(--text); }
.nv-mode:hover { background: var(--surface-2); }
.nv-cta { padding: 0 calc(var(--u) * 4); border-left: 2px solid var(--text); background: var(--text); color: var(--bg); }
.nv-cta:hover { background: var(--accent); color: var(--on-accent); }
`,
    },
    {
      name: 'Frosted glass',
      note: 'Translucent blur over a colored wash',
      css: `
& { padding: calc(var(--u) * 3); border-radius: var(--r-lg);
  background:
    radial-gradient(60% 140% at 8% 0%, color-mix(in oklab, var(--accent) 45%, transparent), transparent 70%),
    radial-gradient(50% 140% at 92% 100%, color-mix(in oklab, var(--info) 40%, transparent), transparent 70%),
    var(--bg); }
.nv { background: color-mix(in oklab, var(--surface) 50%, transparent);
  -webkit-backdrop-filter: blur(16px) saturate(1.6); backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent); border-radius: var(--r-box);
  box-shadow: inset 0 1px 0 color-mix(in oklab, white 30%, transparent), var(--shadow-sm); }
.nv-links { gap: calc(var(--u) * 1); }
.nv-a { padding: calc(var(--u) * 1.5) calc(var(--u) * 2.75); border-radius: 999px; }
.nv-a.is-active, .nv-a:hover, .nv-a.is-hover { background: color-mix(in oklab, var(--text) 9%, transparent); }
.nv-mode { border-radius: 999px; }
.nv-cta { padding: calc(var(--u) * 1.75) calc(var(--u) * 3.5); border-radius: 999px; background: var(--text); color: var(--bg); }
.nv-cta:hover { background: color-mix(in oklab, var(--text) 82%, var(--bg)); }
`,
    },
    {
      name: 'Command bar',
      note: 'Search-first, ⌘K hint, two links max',
      css: `
.nv-search { order: 1; display: inline-flex; flex: 1 1 200px; min-width: 0; align-items: center; gap: calc(var(--u) * 2);
  padding: calc(var(--u) * 2) calc(var(--u) * 3); background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--r-ctl); color: var(--muted); cursor: text;
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.nv-search:hover { border-color: var(--border-strong); }
.nv-search-t { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nv-search kbd { padding: 1px calc(var(--u) * 1.5); border: 1px solid var(--border); border-bottom-width: 2px;
  border-radius: 5px; background: var(--surface); color: var(--muted); }
.nv-links { order: 2; gap: calc(var(--u) * 4); }
.nv-a:nth-child(n+3) { display: none; }
.nv-tools { order: 3; margin-left: 0; }
.nv-cta { padding: calc(var(--u) * 2) calc(var(--u) * 3); border-radius: var(--r-ctl); background: var(--accent); color: var(--on-accent); }
.nv-cta:hover { background: var(--accent-hover); }
`,
    },
    {
      name: 'Masthead',
      note: 'Newspaper title, double-ruled section strip',
      css: `
.nv { position: relative; flex-direction: column; flex-wrap: nowrap; align-items: center; gap: calc(var(--u) * 2);
  padding: calc(var(--u) * 1) 0 0; text-align: center; }
.nv::before { content: "Vol. III · Notes from the lab"; font-size: var(--fs-xs); letter-spacing: .16em;
  text-transform: uppercase; color: var(--muted); }
.nv-logo { font-size: var(--fs-3xl); font-weight: 400; font-style: italic; letter-spacing: -0.03em; line-height: 1; }
.nv-links { align-self: stretch; justify-content: center; gap: calc(var(--u) * 7); padding: calc(var(--u) * 2.5) 0;
  border-top: 3px double var(--text); border-bottom: 1px solid var(--text); font-size: var(--fs-xs);
  text-transform: uppercase; letter-spacing: .16em; }
.nv-a.is-active { font-weight: 700; }
.nv-tools { position: absolute; top: 0; right: 0; margin: 0; }
.nv-mode { display: none; }
.nv-cta { font-size: var(--fs-xs); text-transform: uppercase; letter-spacing: .12em; text-decoration: underline;
  text-underline-offset: .35em; }
`,
    },
    {
      name: 'Terminal path',
      note: 'Mono prompt breadcrumb, [bracketed] links',
      css: `
.nv { gap: calc(var(--u) * 2) calc(var(--u) * 4); padding: calc(var(--u) * 2.5) calc(var(--u) * 3.5);
  font-family: var(--font-mono); font-size: var(--fs-xs); background: var(--surface);
  border: 1px solid var(--border); border-radius: var(--r-box); }
.nv-logo { display: none; }
.nv-path { display: inline; color: var(--muted); white-space: nowrap; }
.nv-path::before { content: "❯ "; color: var(--ok); }
.nv-path b { color: var(--text); font-weight: 600; }
.nv-path::after { content: ""; display: inline-block; width: .6em; height: 1.15em; margin-left: 2px;
  vertical-align: -.22em; background: var(--accent); }
.nv-links { gap: calc(var(--u) * 2.5); }
.nv-a::before { content: "["; margin-right: .15em; color: var(--faint); }
.nv-a::after { content: "]"; margin-left: .15em; color: var(--faint); }
.nv-a.is-active, .nv-a.is-active::before, .nv-a.is-active::after { color: var(--accent); }
.nv-mode { width: auto; height: auto; }
.nv-cta { font-weight: 400; color: var(--accent); }
.nv-cta::before { content: "./"; color: var(--faint); }
.nv-cta:hover { color: var(--accent-hover); }
`,
    },
    {
      name: 'Dot marker',
      note: 'Sun/moon logo mark; active link earns a dot',
      css: `
.nv-mark { display: inline-block; width: .85em; height: .85em; border-radius: 50%;
  background: linear-gradient(90deg, var(--accent) 50%, var(--text) 50%); }
.nv-logo { font-family: var(--font-body); font-size: var(--fs-base); font-weight: 700; letter-spacing: -0.02em; }
.nv-links { gap: calc(var(--u) * 6); }
.nv-a { padding: calc(var(--u) * 1.5) 0; }
.nv-a::after { content: ""; position: absolute; left: 50%; bottom: -3px; width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent); transform: translateX(-50%) scale(0); transition: transform var(--dur) var(--ease), background-color var(--dur) var(--ease); }
.nv-a:hover::after, .nv-a.is-hover::after { transform: translateX(-50%) scale(.7); background: var(--border-strong); }
.nv-a.is-active::after { transform: translateX(-50%) scale(1); background: var(--accent); }
.nv-cta { padding-bottom: 2px; border-bottom: 1.5px solid var(--accent); }
`,
    },
    {
      name: 'Segmented track',
      note: 'Links in a recessed track, raised active tab',
      css: `
.nv-links { margin-inline: auto; gap: 2px; padding: 3px; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r-ctl); }
.nv-a { padding: calc(var(--u) * 1.5) calc(var(--u) * 3.5); border-radius: var(--r-ctl); }
.nv-a.is-active { background: var(--surface); box-shadow: var(--shadow-sm), 0 0 0 1px var(--border); font-weight: 500; }
.nv-tools { margin-left: 0; }
.nv-cta { padding: calc(var(--u) * 2) calc(var(--u) * 3.5); border-radius: var(--r-ctl); background: var(--accent); color: var(--on-accent); }
.nv-cta:hover { background: var(--accent-hover); }
`,
    },
    {
      name: 'Indexed',
      note: 'Display-font links with tiny mono numerals',
      css: `
.nv-logo { font-style: italic; font-weight: 400; }
.nv-links { gap: calc(var(--u) * 6); }
.nv-a { font-family: var(--font-display); font-size: var(--fs-base); }
.nv-ix { display: inline-block; margin-right: .35em; font-family: var(--font-mono); font-size: .62em; color: var(--faint);
  transform: translateY(-.55em); transition: color var(--dur) var(--ease); }
.nv-a.is-active .nv-ix, .nv-a:hover .nv-ix, .nv-a.is-hover .nv-ix { color: var(--accent); }
.nv-cta { font-family: var(--font-display); font-size: var(--fs-base); font-style: italic; font-weight: 400; }
.nv-cta .ic { color: var(--accent); }
`,
    },
    {
      name: 'Ink bar',
      note: 'Solid inverted strip; reverses itself in dusk',
      css: `
.nv { background: var(--text); color: var(--bg); border-radius: var(--r-box); box-shadow: var(--shadow); }
.nv-a { align-items: center; color: color-mix(in oklab, var(--bg) 60%, var(--text)); }
.nv-a:hover, .nv-a.is-hover, .nv-a.is-active { color: var(--bg); }
.nv-a.is-active::before { content: ""; width: 6px; height: 6px; margin-right: .5em; border-radius: 50%; background: var(--accent); }
.nv-mode { color: color-mix(in oklab, var(--bg) 60%, var(--text)); }
.nv-mode:hover { color: var(--bg); }
.nv-cta { padding: calc(var(--u) * 1.75) calc(var(--u) * 3.5); border-radius: var(--r-ctl); background: var(--accent); color: var(--on-accent); }
.nv-cta:hover { background: var(--accent-hover); }
`,
    },
    // ───── round 2 ─────
    {
      name: 'Logo lockup',
      note: 'Your two-line dawn & dusk mark at bar height',
      round: 2,
      html: `
<nav class="nv">
  ${NV_LG}
  <span class="nv-links"><a class="nv-a is-active">Work</a><a class="nv-a">Writing</a><a class="nv-a is-hover">Lab</a><a class="nv-a">About</a></span>
  <span class="nv-tools"><span class="nv-mode">{{icon:moon}}</span><a class="nv-cta"><span>Contact</span>{{icon:arrow-up-right}}</a></span>
</nav>`,
      css: `${NV_LG_CSS}
.nv { gap: calc(var(--u) * 2) calc(var(--u) * 7); padding: calc(var(--u) * 3) calc(var(--u) * 1); border-bottom: 1px solid var(--border); }
.nl { font-size: 25px; margin-right: calc(var(--u) * 2); }
.nv-a { font-weight: 500; }
.nv-a.is-active { text-decoration: underline; text-decoration-thickness: 2px; text-decoration-color: var(--accent); text-underline-offset: .55em; }
.nv-cta { padding: calc(var(--u) * 1.75) calc(var(--u) * 3.5); border-radius: 999px; background: var(--text); color: var(--bg); }
.nv-cta:hover { background: var(--accent); color: var(--on-accent); }
`,
    },
    {
      name: 'Two-tier',
      note: 'Utility strip (status, local time, theme) above the main bar',
      round: 2,
      html: `
<nav class="nv">
  <div class="tt-strip">
    <span class="tt-status"><i></i>Available for new work</span>
    <span class="tt-time">09:41 local</span>
    <span class="tt-theme"><b class="is-on">{{icon:sun}}</b><b>{{icon:moon}}</b></span>
  </div>
  <div class="tt-main">
    <span class="nv-logo">cxkw</span>
    <span class="nv-links"><a class="nv-a is-active">Work</a><a class="nv-a">Writing</a><a class="nv-a is-hover">Lab</a><a class="nv-a">About</a></span>
    <a class="nv-cta"><span>Contact</span>{{icon:arrow-right}}</a>
  </div>
</nav>`,
      css: `
.nv { flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: 0; padding: 0; overflow: hidden;
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); }
.tt-strip { display: flex; align-items: center; gap: calc(var(--u) * 5); padding: calc(var(--u) * 1.5) calc(var(--u) * 4);
  font-size: var(--fs-xs); color: var(--muted); background: var(--surface-2); border-bottom: 1px solid var(--border); }
.tt-status { display: inline-flex; align-items: center; gap: .6em; color: var(--text); }
.tt-status i { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 3px var(--ok-soft); }
.tt-time { margin-left: auto; font-family: var(--font-mono); }
.tt-theme { display: inline-flex; gap: 2px; padding: 2px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); }
.tt-theme b { display: grid; place-items: center; width: 24px; height: 18px; border-radius: 999px; font-weight: 400; color: var(--faint); cursor: pointer; }
.tt-theme b.is-on { background: var(--accent-soft); color: var(--accent); }
${IN_DUSK} .tt-theme b.is-on { background: none; color: var(--faint); }
${IN_DUSK} .tt-theme b + b { background: var(--accent-soft); color: var(--accent); }
.tt-main { display: flex; align-items: center; gap: calc(var(--u) * 6); padding: calc(var(--u) * 3.5) calc(var(--u) * 4); }
.nv-cta { margin-left: auto; color: var(--accent); }
.nv-cta .ic { transition: transform var(--dur) var(--ease); }
.nv-cta:hover .ic { transform: translateX(3px); }
`,
    },
    {
      name: 'Breadcrumb',
      note: 'Where-am-I path with a switcher on the current page',
      round: 2,
      html: `
<nav class="nv">
  <span class="bc">
    <span class="bc-tile">cx</span>
    <a class="bc-i">cxkw</a><span class="bc-s">{{icon:chevron-down}}</span>
    <a class="bc-i is-hover">work</a><span class="bc-s">{{icon:chevron-down}}</span>
    <span class="bc-i is-current">dawn-and-dusk<span class="bc-tag">public</span>{{icon:chevron-down}}</span>
  </span>
  <span class="nv-tools"><span class="bc-meta">edited 2d ago</span><a class="nv-cta">{{icon:copy}}<span>Share</span></a></span>
</nav>`,
      css: `
.nv { gap: calc(var(--u) * 2) calc(var(--u) * 4); padding: calc(var(--u) * 2.5) calc(var(--u) * 3); border-bottom: 1px solid var(--border); }
.bc { display: flex; align-items: center; gap: calc(var(--u) * .5); min-width: 0; }
.bc-tile { display: grid; place-items: center; flex: none; width: 26px; height: 26px; margin-right: calc(var(--u) * 2);
  border-radius: var(--r-ctl); background: var(--text); color: var(--bg);
  font-family: 'Outfit', var(--font-display); font-size: 12px; font-weight: 800; letter-spacing: -0.05em; }
.bc-i { display: inline-flex; align-items: center; gap: .45em; padding: calc(var(--u) * 1) calc(var(--u) * 2);
  border-radius: var(--r-ctl); color: var(--muted); white-space: nowrap; }
.bc-i:hover, .bc-i.is-hover { background: var(--surface-2); color: var(--text); }
.bc-s { display: inline-grid; font-size: .85em; color: var(--faint); transform: rotate(-90deg); }
.bc-i.is-current { background: var(--surface-2); color: var(--text); font-weight: 600; }
.bc-i.is-current .ic { font-size: .85em; color: var(--muted); }
.bc-tag { padding: 1px 7px; border: 1px solid var(--border-strong); border-radius: 999px; font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.bc-meta { font-size: var(--fs-xs); color: var(--faint); white-space: nowrap; }
.nv-cta { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); border: 1px solid var(--border); border-radius: var(--r-ctl); background: var(--surface); }
.nv-cta:hover { border-color: var(--border-strong); }
`,
    },
    {
      name: 'Docs sidebar',
      layout: 'rail',
      note: 'Vertical: search, section headings, icon + label rows',
      round: 2,
      html: `
<nav class="nv">
  <div class="sb-head"><span class="nv-logo">cxkw</span><span class="sb-ver">v0.1</span></div>
  <div class="sb-search">{{icon:search}}<span>Search</span><kbd>/</kbd></div>
  <div class="sb-sec">Site</div>
  <a class="sb-a is-active">{{icon:folder}}<span>Work</span><em>14</em></a>
  <a class="sb-a">{{icon:copy}}<span>Writing</span><em>32</em></a>
  <a class="sb-a is-hover">{{icon:sparkle}}<span>Lab</span></a>
  <a class="sb-a">{{icon:user}}<span>About</span></a>
  <div class="sb-sec">System</div>
  <a class="sb-a">{{icon:star}}<span>Tokens</span></a>
  <a class="sb-a">{{icon:settings}}<span>Components</span></a>
  <a class="sb-foot">{{icon:mail}}<span>Contact</span>{{icon:arrow-up-right}}</a>
</nav>`,
      css: `
.nv { flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: 1px; width: 250px; padding: calc(var(--u) * 3);
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); }
.sb-head { display: flex; align-items: baseline; justify-content: space-between; padding: calc(var(--u) * 1) calc(var(--u) * 2) calc(var(--u) * 3); }
.sb-ver { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--faint); }
.sb-search { display: flex; align-items: center; gap: calc(var(--u) * 2); margin-bottom: calc(var(--u) * 1); padding: calc(var(--u) * 1.75) calc(var(--u) * 2.5);
  border: 1px solid var(--border); border-radius: var(--r-ctl); background: var(--bg); color: var(--faint); }
.sb-search span { flex: 1; }
.sb-search kbd { padding: 0 6px; border: 1px solid var(--border); border-radius: 4px; color: var(--muted); }
.sb-sec { padding: calc(var(--u) * 3) calc(var(--u) * 2.5) calc(var(--u) * 1.5); font-size: var(--fs-xs); font-weight: 600;
  text-transform: uppercase; letter-spacing: .1em; color: var(--faint); }
.sb-a, .sb-foot { display: flex; align-items: center; gap: calc(var(--u) * 2.5); padding: calc(var(--u) * 1.75) calc(var(--u) * 2.5);
  border-radius: var(--r-ctl); color: var(--muted); }
.sb-a span, .sb-foot span { flex: 1; }
.sb-a .ic { color: var(--faint); transition: color var(--dur) var(--ease); }
.sb-a em { font-family: var(--font-mono); font-size: var(--fs-xs); font-style: normal; color: var(--faint); }
.sb-a:hover, .sb-a.is-hover { background: var(--surface-2); color: var(--text); }
.sb-a:hover .ic, .sb-a.is-hover .ic { color: var(--text); }
.sb-a.is-active { background: var(--accent-soft); color: var(--text); font-weight: 500; }
.sb-a.is-active .ic, .sb-a.is-active em { color: var(--accent); }
.sb-foot { margin-top: calc(var(--u) * 3); padding-top: calc(var(--u) * 3); border-top: 1px solid var(--border); border-radius: 0; color: var(--accent); }
`,
    },
    {
      name: 'Icon rail',
      layout: 'rail',
      note: 'Collapsed 64px rail, tooltip labels on hover',
      round: 2,
      html: `
<nav class="nv">
  <span class="rl-logo">d&amp;</span>
  <a class="rl-a is-active" data-tip="Work">{{icon:folder}}</a>
  <a class="rl-a" data-tip="Writing">{{icon:copy}}</a>
  <a class="rl-a is-hover" data-tip="Lab">{{icon:sparkle}}</a>
  <a class="rl-a" data-tip="About">{{icon:user}}</a>
  <span class="rl-sep"></span>
  <a class="rl-a" data-tip="Theme">{{icon:moon}}</a>
  <a class="rl-a rl-cta" data-tip="Contact">{{icon:mail}}</a>
</nav>`,
      css: `
.nv { flex-direction: column; flex-wrap: nowrap; align-items: center; gap: calc(var(--u) * 1.5); width: 64px; padding: calc(var(--u) * 3) 0;
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-lg); box-shadow: var(--shadow-sm); }
.rl-logo { display: grid; place-items: center; width: 40px; height: 40px; margin-bottom: calc(var(--u) * 2); border-radius: var(--r-ctl);
  background: var(--text); color: var(--bg); font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: -0.06em; }
.rl-a { position: relative; display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--r-ctl); font-size: 19px; color: var(--muted); }
.rl-a:hover, .rl-a.is-hover { background: var(--surface-2); color: var(--text); }
.rl-a.is-active { background: var(--accent-soft); color: var(--accent); }
.rl-a.is-active::before { content: ""; position: absolute; left: -7px; top: 10px; bottom: 10px; width: 3px; border-radius: 0 3px 3px 0; background: var(--accent); }
.rl-a:hover::after, .rl-a.is-hover::after { content: attr(data-tip); position: absolute; z-index: 2; left: calc(100% + 12px); top: 50%;
  transform: translateY(-50%); padding: calc(var(--u) * 1) calc(var(--u) * 2.5); border-radius: 6px; background: var(--text); color: var(--bg);
  font-family: var(--font-body); font-size: var(--fs-xs); font-weight: 500; white-space: nowrap; pointer-events: none; }
.rl-sep { width: 24px; height: 1px; margin: calc(var(--u) * 2) 0; background: var(--border); }
.rl-cta, .rl-cta:hover { background: var(--accent); color: var(--on-accent); }
`,
    },
    {
      name: 'Floating dock',
      note: 'Glass dock of icon tiles that magnify toward the pointer',
      round: 2,
      html: `
<nav class="nv">
  <a class="dk-a" data-tip="Home">{{icon:home}}</a>
  <a class="dk-a is-active" data-tip="Work">{{icon:folder}}</a>
  <a class="dk-a" data-tip="Writing">{{icon:copy}}</a>
  <a class="dk-a is-hover" data-tip="Lab">{{icon:sparkle}}</a>
  <a class="dk-a" data-tip="About">{{icon:user}}</a>
  <span class="dk-sep"></span>
  <a class="dk-a" data-tip="Theme">{{icon:moon}}</a>
  <a class="dk-a dk-cta" data-tip="Contact">{{icon:mail}}</a>
</nav>`,
      css: `
.nv { width: fit-content; max-width: 100%; margin: 34px auto 8px; flex-wrap: nowrap; align-items: flex-end; gap: calc(var(--u) * 2);
  padding: calc(var(--u) * 2); background: color-mix(in oklab, var(--surface) 72%, transparent);
  -webkit-backdrop-filter: blur(16px) saturate(1.5); backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent); border-radius: var(--r-lg); box-shadow: var(--shadow-lg); }
.dk-a { position: relative; display: grid; place-items: center; width: 44px; height: 44px; border-radius: var(--r-box);
  background: var(--surface-2); color: var(--text); font-size: 20px; transform-origin: 50% 100%;
  transition: transform var(--dur) var(--ease), background-color var(--dur) var(--ease); }
.dk-a:hover, .dk-a.is-hover { transform: scale(1.3) translateY(-3px); }
.dk-a:has(+ .dk-a.is-hover), .dk-a.is-hover + .dk-a { transform: scale(1.12) translateY(-1px); }
.dk-a.is-active::before { content: ""; position: absolute; bottom: -6px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
  background: var(--text); transform: translateX(-50%); }
.dk-a:hover::after, .dk-a.is-hover::after { content: attr(data-tip); position: absolute; bottom: calc(100% + 8px); left: 50%;
  transform: translateX(-50%); padding: 2px 8px; border-radius: 6px; background: var(--surface); border: 1px solid var(--border);
  box-shadow: var(--shadow-sm); color: var(--text); font-family: var(--font-body); font-size: 9px; font-weight: 500; white-space: nowrap; }
.dk-sep { align-self: stretch; width: 1px; margin: 4px 2px; background: var(--border); }
.dk-cta { background: var(--accent); color: var(--on-accent); }
`,
    },
    {
      name: 'Mobile tab bar',
      note: 'Phone bottom bar, icon + label, raised contact button',
      round: 2,
      html: `
<nav class="nv">
  <a class="mt-a is-active"><span class="mt-ic">{{icon:folder}}</span>Work</a>
  <a class="mt-a"><span class="mt-ic">{{icon:copy}}</span>Writing</a>
  <a class="mt-a mt-fab"><span class="mt-ic">{{icon:mail}}</span>Contact</a>
  <a class="mt-a is-hover"><span class="mt-ic">{{icon:sparkle}}</span>Lab</a>
  <a class="mt-a"><span class="mt-ic">{{icon:user}}</span>About</a>
</nav>`,
      css: `
.nv { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); align-items: end; gap: 0; width: min(390px, 100%);
  margin: 28px auto 0; padding: calc(var(--u) * 2) calc(var(--u) * 2) 22px; background: var(--surface);
  border: var(--bw) var(--bstyle) var(--border); border-bottom: 0; border-radius: var(--r-lg);
  border-bottom-left-radius: 0; border-bottom-right-radius: 0; box-shadow: 0 -8px 24px -12px color-mix(in oklab, black 30%, transparent); }
.nv::after { content: ""; position: absolute; left: 50%; bottom: 7px; width: 112px; height: 4px; border-radius: 99px;
  background: color-mix(in oklab, var(--text) 35%, transparent); transform: translateX(-50%); }
.mt-a { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: calc(var(--u) * 1) 0; font-size: 11px; font-weight: 500; color: var(--muted); }
.mt-ic { display: grid; place-items: center; width: 52px; height: 28px; border-radius: 999px; font-size: 19px;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
.mt-a:hover, .mt-a.is-hover, .mt-a.is-active { color: var(--text); }
.mt-a.is-active .mt-ic { background: var(--accent-soft); color: var(--accent); }
.mt-fab, .mt-fab:hover { color: var(--accent); }
.mt-fab .mt-ic { width: 50px; height: 50px; margin-top: -30px; border-radius: 50%; background: var(--accent); color: var(--on-accent); font-size: 20px;
  box-shadow: 0 0 0 5px var(--surface), 0 8px 18px -6px color-mix(in oklab, var(--accent) 70%, transparent); }
`,
    },
    {
      name: 'Menu overlay',
      note: 'Logo + one button; shown open as a full ink panel',
      round: 2,
      html: `
<nav class="nv">
  <div class="mo-bar"><span class="nv-logo">cxkw</span><a class="mo-btn">Close {{icon:x}}</a></div>
  <div class="mo-list">
    <a class="mo-a is-active"><sup>01</sup>Work</a>
    <a class="mo-a is-hover"><sup>02</sup>Writing</a>
    <a class="mo-a"><sup>03</sup>Lab</a>
    <a class="mo-a"><sup>04</sup>About</a>
  </div>
  <div class="mo-foot"><span>Email ↗</span><span>GitHub ↗</span><span class="mo-mode">{{icon:moon}} Dusk</span></div>
</nav>`,
      css: `
.nv { flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: 0; padding: 0; overflow: hidden;
  background: var(--text); color: var(--bg); border-radius: var(--r-lg); }
.mo-bar { display: flex; align-items: center; justify-content: space-between; padding: calc(var(--u) * 4) calc(var(--u) * 5); }
.mo-btn { display: inline-flex; align-items: center; gap: .5em; padding: calc(var(--u) * 1.5) calc(var(--u) * 3.5); border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--bg) 30%, transparent); font-weight: 500; }
.mo-btn:hover { background: var(--bg); color: var(--text); }
.mo-list { display: flex; flex-direction: column; padding: calc(var(--u) * 1) calc(var(--u) * 5) calc(var(--u) * 4); }
.mo-a { display: flex; align-items: flex-start; gap: .3em; width: fit-content; font-family: var(--font-display); font-size: var(--fs-3xl);
  line-height: 1.08; letter-spacing: -0.03em; color: color-mix(in oklab, var(--bg) 45%, var(--text));
  transition: color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.mo-a sup { margin-top: .55em; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0; color: color-mix(in oklab, var(--bg) 60%, var(--text)); }
.mo-a.is-active { color: var(--bg); }
.mo-a:hover, .mo-a.is-hover { color: var(--bg); font-style: italic; transform: translateX(10px); }
.mo-a:hover sup, .mo-a.is-hover sup { color: var(--bg); }
.mo-foot { display: flex; gap: calc(var(--u) * 6); padding: calc(var(--u) * 3) calc(var(--u) * 5);
  border-top: 1px solid color-mix(in oklab, var(--bg) 18%, transparent); font-family: var(--font-mono); font-size: var(--fs-xs);
  color: color-mix(in oklab, var(--bg) 65%, var(--text)); }
.mo-mode { display: inline-flex; align-items: center; gap: .4em; margin-left: auto; }
`,
    },
    {
      name: 'Mega menu',
      note: '“Work” open: project thumbnails + a browse column',
      round: 2,
      html: `
<nav class="nv">
  <div class="mm-bar">
    <span class="nv-logo">cxkw</span>
    <span class="nv-links"><a class="nv-a is-active is-open">Work {{icon:chevron-down}}</a><a class="nv-a">Writing</a><a class="nv-a">Lab</a><a class="nv-a">About</a></span>
    <a class="nv-cta">Contact</a>
  </div>
  <div class="mm-panel">
    <div class="mm-grid">
      <a class="mm-card is-hover"><span class="mm-th t1"></span><b>dawn &amp; dusk</b><span>Personal design system</span></a>
      <a class="mm-card"><span class="mm-th t2"></span><b>Dockey</b><span>Docker, natively on macOS</span></a>
      <a class="mm-card"><span class="mm-th t3"></span><b>Insomnia</b><span>Caffeinate, but kinder</span></a>
    </div>
    <div class="mm-side"><span class="mm-h">Browse</span><a>All projects →</a><a>Case studies</a><a>Open source</a><a>Archive</a></div>
  </div>
</nav>`,
      css: `
.nv { flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: 0; padding: 0 0 calc(var(--u) * 1); }
.mm-bar { display: flex; align-items: center; gap: calc(var(--u) * 6); padding: calc(var(--u) * 3) calc(var(--u) * 4); }
.nv-links { gap: calc(var(--u) * 1); }
.nv-a { align-items: center; gap: .3em; padding: calc(var(--u) * 1.5) calc(var(--u) * 2.5); border-radius: var(--r-ctl); }
.nv-a .ic { font-size: .85em; transition: transform var(--dur) var(--ease); }
.nv-a.is-open { background: var(--surface-2); }
.nv-a.is-open .ic { transform: rotate(180deg); }
.nv-cta { margin-left: auto; padding: calc(var(--u) * 1.75) calc(var(--u) * 3.5); border-radius: var(--r-ctl); background: var(--accent); color: var(--on-accent); }
.nv-cta:hover { background: var(--accent-hover); }
.mm-panel { display: grid; grid-template-columns: 1fr 140px; gap: calc(var(--u) * 5); margin: 0 calc(var(--u) * 2); padding: calc(var(--u) * 4);
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); box-shadow: var(--shadow-lg); }
.mm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: calc(var(--u) * 3); }
.mm-card { display: flex; flex-direction: column; gap: 2px; min-width: 0; margin: calc(var(--u) * -1.5); padding: calc(var(--u) * 1.5); border-radius: var(--r-ctl); }
.mm-card:hover, .mm-card.is-hover { background: var(--surface-2); }
.mm-th { aspect-ratio: 16 / 10; margin-bottom: calc(var(--u) * 2); border-radius: var(--r-ctl); }
.t1 { background: linear-gradient(135deg, var(--warn), var(--accent) 60%, var(--info)); }
.t2 { background: radial-gradient(circle at 70% 30%, var(--accent-soft), transparent 60%), var(--surface-2); box-shadow: inset 0 0 0 1px var(--border); }
.t3 { background: repeating-linear-gradient(-45deg, var(--accent-soft) 0 6px, transparent 6px 12px), var(--surface-2); }
.mm-card b { font-size: var(--fs-sm); font-weight: 600; }
.mm-card span:not(.mm-th) { font-size: var(--fs-xs); line-height: 1.35; color: var(--muted); }
.mm-side { display: flex; flex-direction: column; gap: calc(var(--u) * 1.5); padding-left: calc(var(--u) * 4); border-left: 1px solid var(--border); }
.mm-h { font-size: var(--fs-xs); font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--faint); }
.mm-side a { color: var(--muted); }
.mm-side a:hover { color: var(--text); }
.mm-side a:first-of-type { color: var(--accent); }
`,
    },
    {
      name: 'Corner index',
      note: 'Portfolio layout: name top-left, a line of intro, links stacked right',
      round: 2,
      html: `
<nav class="nv">
  <span class="cn-logo">cxkw<em>.dev</em></span>
  <span class="cn-mid">Software, systems &amp; quiet interfaces.<br><span>Open to work · 09:41 local</span></span>
  <span class="cn-links"><a class="is-active">Work</a><a>Writing</a><a class="is-hover">Lab</a><a>About</a><a class="cn-cta">Contact ↗</a></span>
</nav>`,
      css: `
.nv { display: grid; grid-template-columns: auto 1fr auto; align-items: start; gap: calc(var(--u) * 8); padding: calc(var(--u) * 4) calc(var(--u) * 1); }
.cn-logo { font-family: var(--font-display); font-size: var(--fs-xl); font-weight: 600; line-height: 1; letter-spacing: -0.02em; }
.cn-logo em { font-style: normal; color: var(--faint); }
.cn-mid { max-width: 30ch; line-height: 1.45; }
.cn-mid span { color: var(--muted); }
.cn-links { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.3; }
.cn-links a { color: var(--muted); }
.cn-links a:hover, .cn-links a.is-hover, .cn-links a.is-active { color: var(--text); }
.cn-links a.is-active::before { content: "● "; font-size: .6em; vertical-align: .2em; color: var(--accent); }
.cn-links a.cn-cta { margin-top: calc(var(--u) * 2); color: var(--accent); }
`,
    },
    {
      name: 'Big index',
      note: 'Sections set huge in the display face, with counts',
      round: 2,
      html: `
<nav class="nv">
  <div class="ei-top"><span class="nv-logo">cxkw</span><span class="ei-meta">Index — four rooms</span><span class="nv-mode">{{icon:moon}}</span></div>
  <div class="ei-links"><a class="ei-a is-active">Work<sup>14</sup></a><a class="ei-a">Writing<sup>32</sup></a><a class="ei-a is-hover">Lab<sup>07</sup></a><a class="ei-a">About</a></div>
</nav>`,
      css: `
.nv { flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: calc(var(--u) * 3); padding: 0 0 calc(var(--u) * 2); }
.ei-top { display: flex; align-items: center; gap: calc(var(--u) * 4); padding-bottom: calc(var(--u) * 2); border-bottom: 1px solid var(--text); font-size: var(--fs-xs); }
.ei-top .nv-logo { font-size: var(--fs-base); }
.ei-meta { text-transform: uppercase; letter-spacing: .14em; color: var(--muted); }
.ei-top .nv-mode { margin-left: auto; }
.ei-links { display: flex; flex-wrap: wrap; column-gap: .3em; font-family: var(--font-display); font-size: var(--fs-4xl); line-height: .98; letter-spacing: -0.035em; }
.ei-a { color: var(--faint); transition: color var(--dur) var(--ease); }
.ei-a:not(:last-child)::after { content: ","; color: var(--faint); }
.ei-a sup { position: relative; top: .5em; margin-left: .08em; vertical-align: top; font-family: var(--font-mono); font-size: .2em; letter-spacing: 0; color: var(--accent); }
.ei-a.is-active { color: var(--text); }
.ei-a:hover, .ei-a.is-hover { color: var(--accent); }
`,
    },
    {
      name: 'Key hints',
      note: 'Every link has a keyboard shortcut (W R L A)',
      round: 2,
      html: `
<nav class="nv">
  <span class="nv-logo">cxkw</span>
  <span class="nv-links"><a class="nv-a is-active"><kbd>W</kbd>Work</a><a class="nv-a"><kbd>R</kbd>Writing</a><a class="nv-a is-hover"><kbd>L</kbd>Lab</a><a class="nv-a"><kbd>A</kbd>About</a></span>
  <span class="nv-tools"><span class="kb-help"><kbd>?</kbd>shortcuts</span><a class="nv-cta"><kbd>C</kbd>Contact</a></span>
</nav>`,
      css: `
.nv { padding: calc(var(--u) * 2.5) calc(var(--u) * 3.5); background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r-box); }
.nv-links { gap: calc(var(--u) * 4); }
.nv-a, .nv-cta { align-items: center; gap: 0; }
.nv kbd { display: inline-grid; place-items: center; min-width: 1.75em; height: 1.75em; margin-right: .55em; padding: 0 .3em; font-size: 11px; line-height: 1;
  color: var(--muted); background: var(--surface); border: 1px solid var(--border-strong); border-bottom-width: 2px; border-radius: 5px;
  transition: transform var(--dur) var(--ease), border-width var(--dur) var(--ease), background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
.nv-a:hover kbd, .nv-a.is-hover kbd { transform: translateY(1px); border-bottom-width: 1px; color: var(--text); }
.nv-a.is-active kbd { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.kb-help { display: inline-flex; align-items: center; font-size: var(--fs-xs); color: var(--faint); }
.nv-cta { color: var(--accent); }
`,
    },
    {
      name: 'Reading progress',
      note: 'Scrolled article state: title in the bar, accent progress hairline',
      round: 2,
      html: `
<nav class="nv">
  <span class="nv-logo">cxkw</span>
  <span class="rp-title"><span>Writing</span>{{icon:chevron-down}}<b>Designing for dawn &amp; dusk</b></span>
  <span class="nv-tools"><span class="rp-left">62% · 4 min left</span><span class="nv-mode">{{icon:moon}}</span></span>
  <span class="rp-bar"><i></i></span>
</nav>`,
      css: `
.nv { position: relative; flex-wrap: nowrap; gap: calc(var(--u) * 5); padding: calc(var(--u) * 3); border-bottom: 1px solid var(--border);
  background: color-mix(in oklab, var(--bg) 82%, transparent); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
.nv-logo { font-size: var(--fs-base); }
.rp-title { display: flex; align-items: center; gap: calc(var(--u) * 1.5); min-width: 0; padding-left: calc(var(--u) * 5);
  border-left: 1px solid var(--border); color: var(--muted); }
.rp-title .ic { font-size: .85em; color: var(--faint); transform: rotate(-90deg); }
.rp-title b { font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rp-left { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--faint); white-space: nowrap; }
.rp-bar { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; }
.rp-bar i { display: block; width: 62%; height: 100%; border-radius: 0 2px 2px 0; background: var(--accent);
  box-shadow: 0 0 10px color-mix(in oklab, var(--accent) 60%, transparent); }
`,
    },
    {
      name: 'Sun / moon switch',
      note: 'A big dawn↔dusk toggle as the centrepiece; follows the mode',
      round: 2,
      html: `
<nav class="nv">
  <span class="nv-logo">cxkw</span>
  <span class="sm-l"><a class="nv-a is-active">Work</a><a class="nv-a">Writing</a></span>
  <span class="sm-sw"><span class="sm-track"><span class="sm-ic">{{icon:sun}}</span><span class="sm-ic">{{icon:moon}}</span><span class="sm-knob"></span></span><span class="sm-lbl"><b class="d1">dawn</b><b class="d2">dusk</b></span></span>
  <span class="sm-r"><a class="nv-a is-hover">Lab</a><a class="nv-a">About</a></span>
  <a class="nv-cta">Contact</a>
</nav>`,
      css: `
.nv { display: grid; grid-template-columns: auto 1fr auto 1fr auto; gap: calc(var(--u) * 5); padding: calc(var(--u) * 3) calc(var(--u) * 2); }
.sm-l, .sm-r { display: flex; gap: calc(var(--u) * 5); }
.sm-l { justify-content: flex-end; }
.sm-sw { display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: pointer; }
.sm-track { position: relative; display: flex; align-items: center; justify-content: space-between; width: 84px; height: 38px; padding: 0 10px;
  border-radius: 999px; background: linear-gradient(180deg, color-mix(in oklab, var(--warn) 30%, var(--bg)), color-mix(in oklab, var(--accent) 28%, var(--bg)));
  box-shadow: inset 0 1px 3px color-mix(in oklab, black 18%, transparent), 0 0 0 1px var(--border); }
.sm-ic { display: grid; font-size: 15px; color: color-mix(in oklab, var(--text) 45%, transparent); }
.sm-knob { position: absolute; top: 4px; left: 4px; width: 30px; height: 30px; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, color-mix(in oklab, var(--warn) 55%, white), var(--warn) 72%);
  box-shadow: 0 0 14px color-mix(in oklab, var(--warn) 70%, transparent), 0 2px 4px color-mix(in oklab, black 22%, transparent);
  transition: transform var(--dur) var(--ease), background var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.sm-lbl { display: flex; gap: .7em; font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
.sm-lbl b { font-weight: 400; color: var(--faint); }
.sm-lbl .d1 { color: var(--text); }
${IN_DUSK} .sm-track { background: linear-gradient(180deg, color-mix(in oklab, var(--info) 30%, black), color-mix(in oklab, var(--accent) 22%, black)); }
${IN_DUSK} .sm-knob { transform: translateX(46px); background: color-mix(in oklab, white 88%, var(--info));
  box-shadow: inset -7px -3px 0 color-mix(in oklab, var(--info) 30%, white), 0 0 14px color-mix(in oklab, var(--info) 45%, transparent); }
${IN_DUSK} .sm-lbl .d1 { color: var(--faint); }
${IN_DUSK} .sm-lbl .d2 { color: var(--text); }
.nv-cta { padding: calc(var(--u) * 1.75) calc(var(--u) * 3.5); border: 1px solid var(--border-strong); border-radius: 999px; }
.nv-cta:hover { border-color: var(--text); }
`,
    },
    // ───── round 3 · siblings of #18 Icon rail ─────
    {
      name: 'Icon rail · labels below',
      note: 'Same rail, a little wider, with a tiny label under each icon instead of hover tooltips',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: railHTML({ labels: true }),
      css: `${RAIL_CSS}
.nv { width: 76px; gap: calc(var(--u) * 1); }
.rl-a { display: flex; flex-direction: column; align-items: center; gap: 4px; width: 64px; height: auto; padding: calc(var(--u) * 2) 0 calc(var(--u) * 1.5); }
.rl-t { font-family: var(--font-body); font-size: 10px; font-weight: 500; letter-spacing: .01em; }
.rl-a.is-active::before { left: -4px; }
.rl-a:hover::after, .rl-a.is-hover::after { content: none; }
`,
    },
    {
      name: 'Icon rail · ink',
      note: 'Rail filled with ink, icons in cream; the active tile is a lighter ink tone',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: railHTML(),
      css: `${RAIL_CSS}
.nv { background: var(--text); box-shadow: var(--shadow); }
.rl-logo { background: var(--bg); color: var(--text); }
.rl-a { color: color-mix(in oklab, var(--bg) 55%, var(--text)); }
.rl-a:hover, .rl-a.is-hover { background: color-mix(in oklab, var(--bg) 12%, transparent); color: var(--bg); }
.rl-a.is-active { background: color-mix(in oklab, var(--bg) 20%, transparent); color: var(--bg); }
.rl-a.is-active::before { background: var(--bg); }
.rl-sep { background: color-mix(in oklab, var(--bg) 18%, transparent); }
.rl-cta, .rl-cta:hover { background: var(--bg); color: var(--text); }
`,
    },
    {
      name: 'Icon rail · flush edge',
      note: 'Full-height and square, docked to the page edge; theme and contact pinned to the bottom',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: railHTML(),
      css: `${RAIL_CSS}
.nv { min-height: 380px; border-radius: 0; box-shadow: none; border-width: 0 var(--bw) 0 0; }
.rl-sep { flex: 1; width: 0; margin: 0; background: none; }
`,
    },
    {
      name: 'Icon rail · round tiles',
      note: 'Circular tiles; active is a solid ink disc instead of tint + edge bar',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: railHTML(),
      css: `${RAIL_CSS}
.rl-logo, .rl-a { border-radius: 50%; }
.rl-a.is-active { background: var(--text); color: var(--bg); }
.rl-a.is-active::before { content: none; }
`,
    },
    {
      name: 'Icon rail · expanded',
      note: 'The same rail opened to 208px: labels beside icons, wordmark next to the tile',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: railHTML({ logo: '<span class="rl-head"><span class="rl-logo">d&amp;</span><b>cxkw</b></span>', labels: true }),
      css: `${RAIL_CSS}
.nv { width: 208px; align-items: stretch; padding: calc(var(--u) * 3); }
.rl-head { display: flex; align-items: center; gap: calc(var(--u) * 3); margin-bottom: calc(var(--u) * 2); font-size: var(--fs-base); }
.rl-head .rl-logo { margin: 0; }
.rl-a { display: flex; justify-content: flex-start; gap: calc(var(--u) * 3); width: auto; padding: 0 calc(var(--u) * 2.5); }
.rl-t { font-family: var(--font-body); font-size: var(--fs-sm); }
.rl-a.is-active::before { left: -9px; }
.rl-a:hover::after, .rl-a.is-hover::after { content: none; }
.rl-sep { width: auto; }
`,
    },
    {
      name: 'Icon rail · lockup mark',
      note: 'Your two-line dawn & dusk mark at the top instead of the d& tile',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: railHTML({ logo: `<span class="rl-mark">${NV_LG}</span>` }),
      css: `${RAIL_CSS}${NV_LG_CSS}
.rl-mark { margin: calc(var(--u) * 1) 0 calc(var(--u) * 3); }
.nl { --lg-bg: var(--surface); font-size: 17px; }
`,
    },
    {
      name: 'Icon rail · compact',
      note: '48px rail with 32px tiles; active marked by a small dot, no tint',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: railHTML(),
      css: `${RAIL_CSS}
.nv { width: 48px; gap: calc(var(--u) * 1); padding: calc(var(--u) * 2) 0; }
.rl-logo { width: 32px; height: 32px; margin-bottom: calc(var(--u) * 1.5); font-size: 13px; }
.rl-a { width: 32px; height: 32px; font-size: 16px; }
.rl-a.is-active { background: none; color: var(--text); }
.rl-a.is-active::before { left: -6px; top: 50%; bottom: auto; width: 4px; height: 4px; border-radius: 50%; transform: translateY(-50%); background: var(--text); }
.rl-sep { width: 18px; margin: calc(var(--u) * 1.5) 0; }
`,
    },
    {
      name: 'Icon rail · grouped',
      note: 'Split into three floating pieces — logo, sections, utilities — with gaps between',
      round: 3, basedOn: '#18 Icon rail', layout: 'rail',
      html: `
<nav class="nv">
  <span class="rl-g"><span class="rl-logo">d&amp;</span></span>
  <span class="rl-g">${railLinks(false)}</span>
  <span class="rl-g"><a class="rl-a" data-tip="Theme">{{icon:moon}}</a><a class="rl-a rl-cta" data-tip="Contact">{{icon:mail}}</a></span>
</nav>`,
      css: `${RAIL_CSS}
.nv { width: fit-content; gap: calc(var(--u) * 2.5); padding: 0; background: none; border: 0; box-shadow: none; }
.rl-g { display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 1.5); padding: calc(var(--u) * 2);
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-lg); box-shadow: var(--shadow-sm); }
.rl-logo { margin: 0; }
.rl-a.is-active::before { left: -6px; }
`,
    },
  ],
});

/* ───────────────────────────── LINKS ───────────────────────────── */

DD.category({
  id: 'links',
  group: 'Components',
  title: 'Links',
  blurb: 'Inline links in running text — the middle one is shown in its hover state.',
  html: `
<p class="lk">I build calm software, write about <a class="lk-a">design systems</a>, and keep a <a class="lk-a is-hover">small lab</a> of experiments. Say hi by <a class="lk-a">email</a>.</p>`,
  css: `
.lk { margin: 0; max-width: 44ch; font-family: var(--font-body); font-size: var(--fs-base); line-height: var(--lh); color: var(--text); }
.lk-a { cursor: pointer; color: inherit; text-decoration: none;
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease), background-size var(--dur) var(--ease),
    text-decoration-color var(--dur) var(--ease), text-underline-offset var(--dur) var(--ease); }
`,
  options: [
    {
      name: 'Classic underline',
      note: 'Accent text, soft underline that firms up',
      css: `
.lk-a { color: var(--accent); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .18em;
  text-decoration-color: color-mix(in oklab, var(--accent) 40%, transparent); }
.lk-a:hover, .lk-a.is-hover { color: var(--accent-hover); text-decoration-color: currentColor; }
`,
    },
    {
      name: 'Thick offset',
      note: 'Ink text, chunky accent bar that rises on hover',
      css: `
.lk-a { font-weight: 500; text-decoration: underline; text-decoration-thickness: .12em; text-underline-offset: .34em;
  text-decoration-color: var(--accent); }
.lk-a:hover, .lk-a.is-hover { color: var(--accent); text-underline-offset: .14em; }
`,
    },
    {
      name: 'Wavy',
      note: 'Hand-drawn squiggle, a little playful',
      css: `
.lk-a { text-decoration: underline wavy; text-decoration-thickness: 1.5px; text-underline-offset: .26em;
  text-decoration-skip-ink: none; text-decoration-color: color-mix(in oklab, var(--accent) 70%, transparent); }
.lk-a:hover, .lk-a.is-hover { color: var(--accent); text-decoration-color: var(--accent); }
`,
    },
    {
      name: 'Highlighter',
      note: 'Marker swipe behind the words; floods on hover',
      css: `
.lk-a { padding: 0 .12em; margin: 0 -.06em; -webkit-box-decoration-break: clone; box-decoration-break: clone;
  background-image: linear-gradient(100deg, transparent 0 .2em, color-mix(in oklab, var(--accent) 32%, transparent) .3em calc(100% - .3em), transparent calc(100% - .2em));
  background-size: 100% 46%; background-position: 0 88%; background-repeat: no-repeat; }
.lk-a:hover, .lk-a.is-hover { background-size: 100% 90%; }
`,
    },
    {
      name: 'Arrow out',
      note: 'Trailing ↗ that nudges toward the corner',
      css: `
.lk-a { color: var(--accent); font-weight: 500; white-space: nowrap; }
.lk-a::after { content: "↗"; display: inline-block; margin-left: .1em; font-size: .78em; transition: transform var(--dur) var(--ease); }
.lk-a:hover, .lk-a.is-hover { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .2em; }
.lk-a:hover::after, .lk-a.is-hover::after { transform: translate(.14em, -.14em); }
`,
    },
    {
      name: 'Color only',
      note: 'Bare accent weight — cleanest, leans on color',
      css: `
.lk-a { color: var(--accent); font-weight: 600; }
.lk-a:hover, .lk-a.is-hover { color: var(--text); }
`,
    },
    {
      name: 'Grow line',
      note: 'Faint rule at rest; accent line draws across',
      css: `
.lk-a { padding-bottom: .08em;
  background-image: linear-gradient(var(--accent), var(--accent)), linear-gradient(var(--border-strong), var(--border-strong));
  background-size: 0% 2px, 100% 1px; background-position: 0 100%, 0 100%; background-repeat: no-repeat; }
.lk-a:hover, .lk-a.is-hover { background-size: 100% 2px, 100% 1px; }
`,
    },
    {
      name: 'Dotted',
      note: 'Dotted accent rule that turns solid',
      css: `
.lk-a { text-decoration: underline dotted; text-decoration-thickness: 2px; text-underline-offset: .28em; text-decoration-color: var(--accent); }
.lk-a:hover, .lk-a.is-hover { color: var(--accent); text-decoration-style: solid; }
`,
    },
    {
      name: 'Brackets',
      note: 'Mono [link] — brackets open up on hover',
      css: `
.lk-a { font-family: var(--font-mono); font-size: .9em; color: var(--accent); }
.lk-a::before { content: "["; margin-right: .1em; color: var(--faint); transition: margin var(--dur) var(--ease), color var(--dur) var(--ease); }
.lk-a::after { content: "]"; margin-left: .1em; color: var(--faint); transition: margin var(--dur) var(--ease), color var(--dur) var(--ease); }
.lk-a:hover::before, .lk-a.is-hover::before { margin-right: .3em; color: var(--accent); }
.lk-a:hover::after, .lk-a.is-hover::after { margin-left: .3em; color: var(--accent); }
`,
    },
    {
      name: 'Strike',
      note: 'Quiet underline that crosses itself out',
      css: `
.lk-a { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .2em; text-decoration-color: var(--border-strong); }
.lk-a:hover, .lk-a.is-hover { color: var(--muted); text-decoration-line: line-through; text-decoration-thickness: 2px; text-decoration-color: var(--accent); }
`,
    },
    {
      name: 'Sweep fill',
      note: 'Accent baseline that floods up into a block',
      css: `
.lk-a { padding: 0 .15em; margin: 0 -.05em; -webkit-box-decoration-break: clone; box-decoration-break: clone;
  background-image: linear-gradient(var(--accent), var(--accent)); background-size: 100% 2px;
  background-position: 0 100%; background-repeat: no-repeat; }
.lk-a:hover, .lk-a.is-hover { background-size: 100% 100%; color: var(--on-accent); }
`,
    },
    {
      name: 'Mono caps',
      note: 'Small uppercase mono, technical and terse',
      css: `
.lk-a { font-family: var(--font-mono); font-size: .76em; text-transform: uppercase; letter-spacing: .08em; color: var(--accent);
  text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .4em; }
.lk-a:hover, .lk-a.is-hover { background: var(--accent-soft); text-decoration-color: transparent; }
`,
    },
    {
      name: 'Chip',
      note: 'Tinted pill; fills solid on hover',
      css: `
.lk-a { padding: .04em .5em; border-radius: 999px; background: var(--accent-soft); color: var(--accent); font-weight: 500; white-space: nowrap; }
.lk-a:hover, .lk-a.is-hover { background: var(--accent); color: var(--on-accent); }
`,
    },
    {
      name: 'Footnote',
      note: 'Hairline + numbered superscript marker',
      css: `
.lk { counter-reset: fn; }
.lk-a { counter-increment: fn; border-bottom: 1px solid var(--border-strong); transition: border-color var(--dur) var(--ease), color var(--dur) var(--ease); }
.lk-a::after { content: counter(fn); margin-left: .15em; font-family: var(--font-mono); font-size: .62em; vertical-align: super; color: var(--accent); }
.lk-a:hover, .lk-a.is-hover { color: var(--accent); border-bottom-color: var(--accent); }
`,
    },
    // ───── round 3 · siblings of #08 Dotted ─────
    {
      name: 'Dotted · fine',
      note: 'Hairline 1px dots sitting closer to the text',
      round: 3, basedOn: '#08 Dotted',
      css: `
.lk-a { text-decoration: underline dotted; text-decoration-thickness: 1px; text-underline-offset: .22em; text-decoration-color: var(--accent); }
.lk-a:hover, .lk-a.is-hover { color: var(--accent); text-decoration-style: solid; }
`,
    },
    {
      name: 'Dotted · muted dots',
      note: 'Dots in a soft grey that turn to solid ink on hover',
      round: 3, basedOn: '#08 Dotted',
      css: `
.lk-a { text-decoration: underline dotted; text-decoration-thickness: 2px; text-underline-offset: .28em; text-decoration-color: var(--border-strong); }
.lk-a:hover, .lk-a.is-hover { text-decoration-color: var(--accent); text-decoration-style: solid; }
`,
    },
    {
      name: 'Dotted · dashed',
      note: 'Short dashes instead of dots; same weight and offset',
      round: 3, basedOn: '#08 Dotted',
      css: `
.lk-a { text-decoration: underline dashed; text-decoration-thickness: 1.5px; text-underline-offset: .28em; text-decoration-color: var(--accent); }
.lk-a:hover, .lk-a.is-hover { color: var(--accent); text-decoration-style: solid; }
`,
    },
    {
      name: 'Dotted · rising',
      note: 'Dots hang lower at rest and rise up to the text, going solid',
      round: 3, basedOn: '#08 Dotted',
      css: `
.lk-a { text-decoration: underline dotted; text-decoration-thickness: 2px; text-underline-offset: .42em; text-decoration-color: var(--accent); }
.lk-a:hover, .lk-a.is-hover { text-underline-offset: .16em; text-decoration-style: solid; }
`,
    },
    {
      name: 'Dotted · tinted hover',
      note: 'Same dots at rest; hover swaps them for a soft tone block',
      round: 3, basedOn: '#08 Dotted',
      css: `
.lk-a { padding: 0 .12em; margin: 0 -.12em; border-radius: 3px; text-decoration: underline dotted; text-decoration-thickness: 2px;
  text-underline-offset: .28em; text-decoration-color: var(--accent); }
.lk-a:hover, .lk-a.is-hover { background: var(--accent-soft); text-decoration-color: transparent; }
`,
    },
    {
      name: 'Dotted · arrow on hover',
      note: 'Dots go solid and a small ↗ slides in after the word',
      round: 3, basedOn: '#08 Dotted',
      css: `
.lk-a { text-decoration: underline dotted; text-decoration-thickness: 2px; text-underline-offset: .28em; text-decoration-color: var(--accent); }
.lk-a::after { content: "↗"; display: inline-block; width: 0; overflow: hidden; vertical-align: top; font-size: .75em; opacity: 0;
  transition: width var(--dur) var(--ease), opacity var(--dur) var(--ease); }
.lk-a:hover, .lk-a.is-hover { text-decoration-style: solid; }
.lk-a:hover::after, .lk-a.is-hover::after { width: .95em; opacity: 1; }
`,
    },
  ],
});

/* ───────────────────────────── DIALOGS ───────────────────────────── */

const DG_STAGE_OPEN = `<div class="dg-stage"><div class="dg-scrim"></div><div class="dg">`;

DD.category({
  id: 'dialogs',
  group: 'Components',
  title: 'Dialogs',
  blurb: 'Modal moments — shown open over a faux page so you can judge scrim, surface and actions together.',
  wide: true,
  html: `
${DG_STAGE_OPEN}
    <div class="dg-head">
      <span class="dg-ic">{{icon:sparkle}}</span>
      <div class="dg-titles"><span class="dg-eyebrow">Release</span><h4 class="dg-title dd-h">Publish dawn &amp; dusk?</h4></div>
      <span class="dg-x">{{icon:x}}</span>
    </div>
    <p class="dg-body">Your new tokens go live on cxkw.dev. You can roll back from history at any time.</p>
    <div class="dg-foot"><span class="dg-hint">esc to cancel</span><button class="dg-btn dg-btn-2">Cancel</button><button class="dg-btn dg-btn-1">Publish</button></div>
  </div>
</div>`,
  css: `
.dg-stage { position: relative; height: 260px; overflow: hidden; display: flex; align-items: center; justify-content: center;
  padding: calc(var(--u) * 4); border: 1px solid var(--border); border-radius: var(--r-box);
  background:
    linear-gradient(var(--surface-2) 0 0) 20px 20px / 30% 12px no-repeat,
    linear-gradient(var(--surface-2) 0 0) 20px 44px / 62% 8px no-repeat,
    linear-gradient(var(--surface-2) 0 0) 20px 60px / 52% 8px no-repeat,
    linear-gradient(var(--surface-2) 0 0) 20px 92px / calc(50% - 30px) 130px no-repeat,
    linear-gradient(var(--surface-2) 0 0) right 20px top 92px / calc(50% - 30px) 130px no-repeat,
    var(--bg); }
.dg-scrim { position: absolute; inset: 0; background: color-mix(in oklab, black 38%, transparent); }
.dg { position: relative; z-index: 1; width: min(380px, 100%); display: flex; flex-direction: column; gap: calc(var(--u) * 3);
  padding: calc(var(--u) * 5); background: var(--surface); color: var(--text); border: var(--bw) var(--bstyle) var(--border);
  border-radius: var(--r-lg); box-shadow: var(--shadow-lg); font-family: var(--font-body); text-align: left; }
.dg-head { display: flex; align-items: flex-start; gap: calc(var(--u) * 3); }
.dg-titles { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: calc(var(--u) * 1); }
.dg-ic, .dg-eyebrow, .dg-hint, .dg-search, .dg-list { display: none; }
.dg-eyebrow { font-size: var(--fs-xs); text-transform: uppercase; letter-spacing: .12em; color: var(--muted); }
.dg-title { margin: 0; font-size: var(--fs-lg); line-height: 1.2; }
.dg-x { display: inline-grid; place-items: center; flex: none; width: 1.8em; height: 1.8em; margin: -.3em -.3em 0 0;
  border-radius: var(--r-ctl); color: var(--muted); cursor: pointer;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
.dg-x:hover { background: var(--surface-2); color: var(--text); }
.dg-body { margin: 0; font-size: var(--fs-sm); line-height: var(--lh); color: var(--muted); }
.dg-foot { display: flex; align-items: center; justify-content: flex-end; gap: calc(var(--u) * 2); margin-top: calc(var(--u) * 1); }
.dg-hint { margin-right: auto; font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--faint); }
.dg-btn { font: inherit; font-size: var(--fs-sm); font-weight: 500; padding: calc(var(--u) * 2) calc(var(--u) * 3.5);
  border: 1px solid var(--border); border-radius: var(--r-ctl); background: var(--surface); color: var(--text); cursor: pointer;
  transition: background-color var(--dur) var(--ease), border-color var(--dur) var(--ease), color var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease); }
.dg-btn-2:hover { background: var(--surface-2); }
.dg-btn-1 { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.dg-btn-1:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.dg kbd { font-family: var(--font-mono); font-size: var(--fs-xs); }
`,
  options: [
    {
      name: 'Classic',
      note: 'Centered card on a dim scrim, actions bottom-right',
      css: ``,
    },
    {
      name: 'Bottom sheet',
      note: 'Rises from the bottom edge, grab handle, full-width actions',
      css: `
.dg-stage { align-items: flex-end; padding: 0 calc(var(--u) * 3); }
.dg { width: 100%; padding-top: calc(var(--u) * 7); border-radius: var(--r-lg); border-bottom-left-radius: 0;
  border-bottom-right-radius: 0; border-bottom: 0; box-shadow: 0 -16px 40px -16px color-mix(in oklab, black 40%, transparent); }
.dg::before { content: ""; position: absolute; top: calc(var(--u) * 2.5); left: 50%; width: 40px; height: 4px;
  border-radius: 99px; background: var(--border-strong); transform: translateX(-50%); }
.dg-x { display: none; }
.dg-btn { flex: 1; padding-block: calc(var(--u) * 2.75); }
`,
    },
    {
      name: 'Side drawer',
      note: 'Slides in from the right, ruled header and footer',
      css: `
.dg-stage { justify-content: flex-end; align-items: stretch; padding: 0; }
.dg { width: 58%; border-radius: 0; border-width: 0 0 0 var(--bw);
  box-shadow: -16px 0 40px -16px color-mix(in oklab, black 40%, transparent); }
.dg-eyebrow { display: block; }
.dg-head { padding-bottom: calc(var(--u) * 3); border-bottom: 1px solid var(--border); }
.dg-foot { margin-top: auto; padding-top: calc(var(--u) * 3); border-top: 1px solid var(--border); }
`,
    },
    {
      name: 'Brutalist',
      note: 'Hatched scrim, accent title bar, stamped buttons',
      css: `
.dg-scrim { background: repeating-linear-gradient(-45deg, color-mix(in oklab, var(--text) 22%, transparent) 0 2px, transparent 2px 9px); }
.dg { gap: 0; padding: 0; border: 2px solid var(--text); border-radius: 0; box-shadow: 7px 7px 0 var(--text); }
.dg-head { align-items: center; padding: calc(var(--u) * 3) calc(var(--u) * 4); background: var(--accent); color: var(--on-accent);
  border-bottom: 2px solid var(--text); }
.dg-title { font-size: var(--fs-base); font-weight: 800; text-transform: uppercase; letter-spacing: .02em; }
.dg-x { margin: 0; border-radius: 0; color: var(--on-accent); }
.dg-x:hover { background: var(--text); color: var(--bg); }
.dg-body { padding: calc(var(--u) * 4); font-size: var(--fs-base); color: var(--text); }
.dg-foot { margin: 0; padding: calc(var(--u) * 3) calc(var(--u) * 4); border-top: 2px solid var(--text); }
.dg-btn { border: 2px solid var(--text); border-radius: 0; background: var(--surface); color: var(--text); box-shadow: 3px 3px 0 var(--text);
  font-size: var(--fs-xs); font-weight: 800; text-transform: uppercase; letter-spacing: .05em; }
.dg-btn:hover { transform: translate(-1px, -1px); box-shadow: 4px 4px 0 var(--text); }
.dg-btn:active { transform: translate(3px, 3px); box-shadow: 0 0 0 var(--text); }
.dg-btn-2:hover { background: var(--surface); }
.dg-btn-1, .dg-btn-1:hover { background: var(--text); border-color: var(--text); color: var(--bg); }
`,
    },
    {
      name: 'Frosted glass',
      note: 'Blurred light-wash panel floating over color',
      css: `
.dg-stage::before, .dg-stage::after { content: ""; position: absolute; width: 170px; height: 170px; border-radius: 50%;
  filter: blur(38px); opacity: .7; }
.dg-stage::before { left: 14%; top: 6%; background: var(--accent); }
.dg-stage::after { right: 12%; bottom: -4%; background: var(--info); }
.dg-scrim { background: color-mix(in oklab, var(--bg) 22%, transparent); }
.dg { background: color-mix(in oklab, var(--surface) 52%, transparent);
  -webkit-backdrop-filter: blur(20px) saturate(1.6); backdrop-filter: blur(20px) saturate(1.6);
  border: 1px solid color-mix(in oklab, var(--text) 14%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in oklab, white 30%, transparent), 0 24px 60px -20px color-mix(in oklab, black 45%, transparent); }
.dg-body { color: color-mix(in oklab, var(--text) 72%, transparent); }
.dg-btn { border-radius: 999px; }
.dg-btn-2 { background: color-mix(in oklab, var(--text) 8%, transparent); border-color: transparent; }
.dg-btn-2:hover { background: color-mix(in oklab, var(--text) 14%, transparent); }
.dg-btn-1 { background: var(--text); border-color: var(--text); color: var(--bg); }
.dg-btn-1:hover { background: color-mix(in oklab, var(--text) 84%, var(--bg)); border-color: transparent; }
`,
    },
    {
      name: 'Terminal',
      note: 'Window chrome, mono prompt, [ bracketed ] actions',
      css: `
.dg { width: min(420px, 100%); gap: 0; padding: 0; font-family: var(--font-mono); font-size: var(--fs-sm); border-radius: var(--r-box); }
.dg-head { align-items: center; padding: calc(var(--u) * 2.5) calc(var(--u) * 3); background: var(--surface-2); border-bottom: 1px solid var(--border); }
.dg-head::before { content: ""; flex: none; width: 10px; height: 10px; margin-right: 36px; border-radius: 50%;
  background: var(--bad); box-shadow: 16px 0 0 var(--warn), 32px 0 0 var(--ok); }
.dg-title { font-family: var(--font-mono); font-size: var(--fs-xs); font-weight: 400; font-style: normal; letter-spacing: 0;
  text-transform: none; color: var(--muted); }
.dg-x { display: none; }
.dg-body { padding: calc(var(--u) * 4) calc(var(--u) * 4) 0; font-size: var(--fs-sm); color: var(--muted); }
.dg-body::before { content: "$ dd publish --prod\\A"; white-space: pre; color: var(--text); }
.dg-body::after { content: "\\A\\A? proceed (y/N)"; white-space: pre; color: var(--ok); }
.dg-foot { justify-content: flex-start; gap: calc(var(--u) * 5); margin: 0; padding: calc(var(--u) * 3) calc(var(--u) * 4) calc(var(--u) * 4); }
.dg-btn, .dg-btn:hover { padding: 0; border: 0; background: none; font-family: var(--font-mono); font-weight: 400; text-transform: lowercase; }
.dg-btn::before { content: "[ "; color: var(--faint); }
.dg-btn::after { content: " ]"; color: var(--faint); }
.dg-btn-2 { color: var(--muted); }
.dg-btn-2:hover { color: var(--text); }
.dg-btn-1 { color: var(--accent); }
.dg-btn-1:hover { color: var(--accent-hover); }
`,
    },
    {
      name: 'Editorial',
      note: 'Heavy top rule, big display title, text actions',
      css: `
.dg { width: min(420px, 100%); padding: calc(var(--u) * 5) calc(var(--u) * 6); border: 0; border-top: 4px solid var(--text); border-radius: 0; }
.dg-eyebrow { display: block; color: var(--accent); }
.dg-title { font-size: var(--fs-2xl); line-height: 1.05; }
.dg-x { display: none; }
.dg-body { font-size: var(--fs-base); color: var(--text); }
.dg-foot { justify-content: flex-start; gap: calc(var(--u) * 6); padding-top: calc(var(--u) * 4); border-top: 1px solid var(--border); }
.dg-btn, .dg-btn:hover { padding: 0; border: 0; background: none; font-family: var(--font-display); font-size: var(--fs-base); font-weight: 400; }
.dg-btn-1 { order: -1; color: var(--accent); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .25em; }
.dg-btn-1::after { content: " →"; }
.dg-btn-1:hover { color: var(--accent-hover); }
.dg-btn-2 { color: var(--muted); }
.dg-btn-2:hover { color: var(--text); }
`,
    },
    {
      name: 'Danger confirm',
      note: 'Centered warning icon, full-width destructive action',
      html: `
${DG_STAGE_OPEN}
    <span class="dg-ic">{{icon:trash}}</span>
    <h4 class="dg-title dd-h">Delete dawn-and-dusk?</h4>
    <p class="dg-body">This permanently removes the project, its 24 components and all version history.</p>
    <div class="dg-foot"><button class="dg-btn dg-btn-2">Keep it</button><button class="dg-btn dg-btn-1">Delete forever</button></div>
  </div>
</div>`,
      css: `
.dg { width: min(340px, 100%); align-items: center; text-align: center; }
.dg-ic { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; font-size: 20px;
  background: var(--bad-soft); color: var(--bad); box-shadow: 0 0 0 6px color-mix(in oklab, var(--bad) 8%, transparent); }
.dg-foot { align-self: stretch; }
.dg-btn { flex: 1; }
.dg-btn-1 { background: var(--bad); border-color: var(--bad); color: var(--bg); }
.dg-btn-1:hover { background: color-mix(in oklab, var(--bad) 85%, var(--text)); border-color: transparent; }
`,
    },
    {
      name: 'Command palette',
      note: 'Search field, keyboard-first result list',
      html: `
${DG_STAGE_OPEN}
    <div class="dg-search">{{icon:search}}<span class="dg-q">publ<span class="dg-caret"></span></span><kbd>esc</kbd></div>
    <div class="dg-list">
      <div class="dg-group">Actions</div>
      <div class="dg-item is-active">{{icon:sparkle}}<span>Publish theme</span><kbd>⏎</kbd></div>
      <div class="dg-item">{{icon:copy}}<span>Publish as draft</span><kbd>⌘D</kbd></div>
      <div class="dg-item">{{icon:calendar}}<span>Open publish history</span><kbd>⌘H</kbd></div>
    </div>
    <div class="dg-foot"><span class="dg-hint">↑↓ navigate · ⏎ select</span><span class="dg-count">3 results</span></div>
  </div>
</div>`,
      css: `
.dg-stage { align-items: flex-start; padding-top: calc(var(--u) * 5); }
.dg { width: min(440px, 100%); gap: 0; padding: 0; overflow: hidden; }
.dg-search { display: flex; align-items: center; gap: calc(var(--u) * 3); padding: calc(var(--u) * 3.5) calc(var(--u) * 4);
  border-bottom: 1px solid var(--border); font-size: var(--fs-base); color: var(--muted); }
.dg-q { flex: 1; color: var(--text); }
.dg-caret { display: inline-block; width: 1.5px; height: 1.1em; margin-left: 1px; vertical-align: -.2em; background: var(--accent); }
.dg kbd { padding: 1px calc(var(--u) * 1.5); border: 1px solid var(--border); border-radius: 5px; background: var(--surface-2); color: var(--muted); }
.dg-list { display: flex; flex-direction: column; gap: 2px; padding: calc(var(--u) * 2); }
.dg-group { padding: calc(var(--u) * 1.5) calc(var(--u) * 2.5) calc(var(--u) * 1); font-size: var(--fs-xs); color: var(--faint);
  text-transform: uppercase; letter-spacing: .1em; }
.dg-item { display: flex; align-items: center; gap: calc(var(--u) * 3); padding: calc(var(--u) * 2) calc(var(--u) * 2.5);
  border-radius: var(--r-ctl); font-size: var(--fs-sm); cursor: pointer; transition: background-color var(--dur) var(--ease); }
.dg-item span { flex: 1; }
.dg-item .ic { color: var(--muted); }
.dg-item:hover { background: var(--surface-2); }
.dg-item.is-active { background: var(--accent-soft); box-shadow: inset 2px 0 0 var(--accent); }
.dg-item.is-active .ic { color: var(--accent); }
.dg-foot { justify-content: space-between; margin: 0; padding: calc(var(--u) * 2.5) calc(var(--u) * 4);
  border-top: 1px solid var(--border); background: var(--surface-2); font-size: var(--fs-xs); color: var(--faint); }
.dg-hint { display: inline; margin: 0; }
.dg-count { font-family: var(--font-mono); }
`,
    },
    {
      name: 'Toast confirm',
      note: 'Non-modal, inverted, tucked bottom-right',
      css: `
.dg-stage { align-items: flex-end; justify-content: flex-end; }
.dg-scrim { display: none; }
.dg { width: min(320px, 100%); gap: calc(var(--u) * 2); padding: calc(var(--u) * 3.5) calc(var(--u) * 4);
  background: var(--text); color: var(--bg); border: 0; border-radius: var(--r-box); }
.dg-head { align-items: center; gap: calc(var(--u) * 2); }
.dg-ic { display: grid; place-items: center; color: var(--accent); }
.dg-title { font-family: var(--font-body); font-size: var(--fs-sm); font-weight: 600; font-style: normal; letter-spacing: 0; text-transform: none; }
.dg-x { color: color-mix(in oklab, var(--bg) 60%, var(--text)); }
.dg-x:hover { background: color-mix(in oklab, var(--bg) 12%, transparent); color: var(--bg); }
.dg-body { font-size: var(--fs-xs); color: color-mix(in oklab, var(--bg) 68%, var(--text)); }
.dg-foot { margin: 0; }
.dg-btn { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); font-size: var(--fs-xs); }
.dg-btn-2 { background: transparent; border-color: color-mix(in oklab, var(--bg) 25%, transparent); color: var(--bg); }
.dg-btn-2:hover { background: color-mix(in oklab, var(--bg) 10%, transparent); }
`,
    },
    {
      name: 'Color block',
      note: 'Accent header band with icon tile',
      css: `
.dg { gap: 0; padding: 0; overflow: hidden; }
.dg-head { align-items: center; padding: calc(var(--u) * 5) calc(var(--u) * 5) calc(var(--u) * 4); background: var(--accent); color: var(--on-accent); }
.dg-ic { display: grid; place-items: center; flex: none; width: 40px; height: 40px; font-size: 18px; border-radius: var(--r-ctl);
  background: color-mix(in oklab, var(--on-accent) 16%, transparent); }
.dg-eyebrow { display: block; color: color-mix(in oklab, var(--on-accent) 72%, transparent); }
.dg-x { align-self: flex-start; color: var(--on-accent); }
.dg-x:hover { background: color-mix(in oklab, var(--on-accent) 15%, transparent); color: var(--on-accent); }
.dg-body { padding: calc(var(--u) * 4) calc(var(--u) * 5) 0; }
.dg-foot { margin: 0; padding: calc(var(--u) * 4) calc(var(--u) * 5) calc(var(--u) * 5); }
`,
    },
    {
      name: 'Takeover',
      note: 'Full-screen surface, oversized title, no scrim',
      css: `
.dg-stage { padding: 0; }
.dg-scrim { display: none; }
.dg { width: 100%; height: 100%; justify-content: center; padding: calc(var(--u) * 6) calc(var(--u) * 8);
  border: 0; border-radius: 0; box-shadow: none; }
.dg-eyebrow { display: block; color: var(--accent); }
.dg-title { font-size: var(--fs-2xl); line-height: 1.05; letter-spacing: -0.02em; }
.dg-x { position: absolute; top: calc(var(--u) * 4); right: calc(var(--u) * 4); margin: 0; width: 2.4em; height: 2.4em;
  border: 1px solid var(--border); border-radius: 999px; }
.dg-body { max-width: 40ch; font-size: var(--fs-base); }
.dg-foot { justify-content: flex-start; }
.dg-btn { padding: calc(var(--u) * 2.75) calc(var(--u) * 5); font-size: var(--fs-base); }
.dg-btn-1 { order: -1; }
.dg-hint { display: inline; order: 3; margin: 0 0 0 calc(var(--u) * 2); }
`,
    },
    {
      name: 'Popover confirm',
      note: 'Small bubble anchored to its trigger, no scrim',
      css: `
.dg-stage { flex-direction: column; justify-content: flex-end; align-items: center; gap: 14px; padding-bottom: calc(var(--u) * 5); }
.dg-scrim { display: none; }
.dg-stage::after { content: "Publish ▾"; position: relative; z-index: 1; padding: calc(var(--u) * 2) calc(var(--u) * 3.5);
  border-radius: var(--r-ctl); background: var(--accent); color: var(--on-accent); font-size: var(--fs-sm); font-weight: 500;
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 55%, transparent); }
.dg { width: min(300px, 100%); gap: calc(var(--u) * 2); padding: calc(var(--u) * 4); border-radius: var(--r-box); }
.dg::after { content: ""; position: absolute; left: 50%; bottom: -7px; width: 12px; height: 12px; background: var(--surface);
  border-right: var(--bw) var(--bstyle) var(--border); border-bottom: var(--bw) var(--bstyle) var(--border);
  transform: translateX(-50%) rotate(45deg); }
.dg-title { font-size: var(--fs-base); }
.dg-x { display: none; }
.dg-body { font-size: var(--fs-xs); }
.dg-foot { margin: 0; }
.dg-btn { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); font-size: var(--fs-xs); }
`,
    },
    // ───── round 3 · siblings of #01 Classic ─────
    {
      name: 'Classic · full-width actions',
      note: 'Same card; the two buttons split the full width',
      round: 3, basedOn: '#01 Classic',
      css: `
.dg-foot { margin-top: calc(var(--u) * 2); }
.dg-btn { flex: 1; padding-block: calc(var(--u) * 2.5); }
`,
    },
    {
      name: 'Classic · icon tile',
      note: 'A soft square icon beside the title; body text aligns under the title',
      round: 3, basedOn: '#01 Classic',
      css: `
.dg-head { align-items: center; }
.dg-ic { display: grid; place-items: center; flex: none; width: 36px; height: 36px; border-radius: var(--r-ctl); background: var(--surface-2); color: var(--text); font-size: 18px; }
.dg-body { padding-left: calc(36px + var(--u) * 3); }
`,
    },
    {
      name: 'Classic · soft scrim',
      note: 'Page behind is washed out in the page color and blurred instead of dimmed',
      round: 3, basedOn: '#01 Classic',
      css: `
.dg-scrim { background: color-mix(in oklab, var(--bg) 55%, transparent); -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); }
.dg { box-shadow: 0 24px 60px -18px color-mix(in oklab, black 35%, transparent), 0 0 0 1px color-mix(in oklab, var(--text) 6%, transparent); }
`,
    },
    {
      name: 'Classic · quiet cancel',
      note: 'Cancel becomes a plain text button; an “esc” hint sits bottom-left',
      round: 3, basedOn: '#01 Classic',
      css: `
.dg-hint { display: inline; }
.dg-btn-2 { background: none; border-color: transparent; color: var(--muted); }
.dg-btn-2:hover { background: var(--surface-2); color: var(--text); }
`,
    },
    {
      name: 'Classic · toned footer',
      note: 'Actions sit on a slightly darker band across the bottom',
      round: 3, basedOn: '#01 Classic',
      css: `
.dg { padding-bottom: 0; overflow: hidden; }
.dg-foot { margin: calc(var(--u) * 2) calc(var(--u) * -5) 0; padding: calc(var(--u) * 3) calc(var(--u) * 5); background: var(--surface-2); }
`,
    },
    {
      name: 'Classic · compact',
      note: 'Narrower and tighter: smaller title, text and buttons',
      round: 3, basedOn: '#01 Classic',
      css: `
.dg { width: min(320px, 100%); gap: calc(var(--u) * 2); padding: calc(var(--u) * 4); }
.dg-title { font-size: var(--fs-base); }
.dg-body { font-size: var(--fs-xs); }
.dg-btn { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); font-size: var(--fs-xs); }
`,
    },
  ],
});

/* ───────────────────────────── LOGO USAGE ─────────────────────────────
   The user's own lockup: "dawn" / "& dusk", heavy geometric grotesk (Outfit 800 — fixed, it's the logo),
   tight tracking and leading; where line 2 overlaps line 1 it is cut out by a thin stroke in the
   container color (--lg-bg). Options vary usage only, never the mark. */

const LG = (cls = '') =>
  `<span class="lg ${cls}"><span class="lg-1">dawn</span><span class="lg-2"><span class="lg-amp">&amp;</span>dusk</span></span>`;
const LG_CROP = (cls = '') =>
  `<span class="lg ${cls}"><span class="lg-1">d</span><span class="lg-2"><span class="lg-amp">&amp;</span></span></span>`;
// Clear-space spec (wordmark #10), reused by its round-3 siblings.
const CS_X = '<span class="cs-x cs-t">x</span><span class="cs-x cs-l">x</span><span class="cs-x cs-r">x</span><span class="cs-x cs-b">x</span>';
const CS_CSS = `
.lu-col { flex-direction: column; gap: calc(var(--u) * 3); }
.cs { position: relative; font-size: 48px; padding: .5em; border: 1px dashed var(--accent);
  background: repeating-linear-gradient(45deg, color-mix(in oklab, var(--accent) 14%, transparent) 0 1px, transparent 1px 7px); }
.cs .lg { font-size: 1em; background: var(--bg); outline: 1px dashed var(--border-strong); }
.cs-x { position: absolute; font-family: var(--font-mono); font-size: 11px; line-height: 1; color: var(--accent); }
.cs-t { top: 7px; left: 50%; transform: translateX(-50%); }
.cs-b { bottom: 7px; left: 50%; transform: translateX(-50%); }
.cs-l { left: 8px; top: 50%; transform: translateY(-50%); }
.cs-r { right: 8px; top: 50%; transform: translateY(-50%); }
`;

DD.category({
  id: 'wordmark',
  group: 'Brand',
  title: 'Logo usage',
  blurb: 'Your dawn & dusk lockup (Outfit 800, cut-out second line) across real contexts — the mark never changes, only how it’s placed.',
  html: `<div class="lu">${LG()}</div>`,
  css: `
.lu { display: flex; align-items: center; justify-content: center; gap: calc(var(--u) * 4); min-height: 190px;
  padding: calc(var(--u) * 6); border-radius: var(--r-box); background: var(--bg); border: 1px solid var(--border); }
.lg { --lg-ink: var(--text); --lg-bg: var(--bg); --lg-cut: .04em;
  display: inline-grid; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 64px; line-height: .78;
  letter-spacing: -0.055em; color: var(--lg-ink); font-style: normal; text-transform: none; }
.lg-1, .lg-2 { position: relative; display: block; white-space: nowrap; }
.lg-2 { z-index: 1; -webkit-text-stroke: var(--lg-cut) var(--lg-bg); paint-order: stroke fill; }
.lg-amp { display: inline-block; width: .56em; margin-left: -.05em; }
.lu-cap { font-family: var(--font-mono); font-size: var(--fs-xs); letter-spacing: .04em; color: var(--muted); }
`,
  options: [
    {
      name: 'Original',
      note: 'Warm ink #332d2c on cream #fcf9f2 — fixed, ignores the palette',
      css: `
.lu { background: #fcf9f2; border-color: color-mix(in oklab, #332d2c 14%, transparent); }
.lg { --lg-ink: #332d2c; --lg-bg: #fcf9f2; }
`,
    },
    {
      name: 'Palette ink',
      note: 'Text color on page background — flips with dawn / dusk',
      css: ``,
    },
    {
      name: 'Reversed',
      note: 'Background-colored mark on an ink block',
      css: `
.lu { background: var(--text); border-color: var(--text); }
.lg { --lg-ink: var(--bg); --lg-bg: var(--text); }
`,
    },
    {
      name: 'Accent ink',
      note: 'Mark in the accent color on the page',
      css: `.lg { --lg-ink: var(--accent); }`,
    },
    {
      name: 'On accent',
      note: 'Solid accent block, on-accent mark',
      css: `
.lu { background: var(--accent); border-color: var(--accent); }
.lg { --lg-ink: var(--on-accent); --lg-bg: var(--accent); }
`,
    },
    {
      name: 'Outline',
      note: 'Stroke-only; line 2 still occludes line 1',
      css: `
.lg-1, .lg-2 { color: var(--lg-bg); -webkit-text-stroke: .028em var(--lg-ink); paint-order: normal; }
`,
    },
    {
      name: 'One line',
      note: 'Inline “dawn & dusk” for tight horizontal spaces',
      html: `<div class="lu"><span class="lg lg-line">dawn &amp; dusk</span></div>`,
      css: `.lg-line { display: inline-block; font-size: 46px; line-height: 1; white-space: nowrap; }`,
    },
    {
      name: 'Favicon tiles',
      note: '“d&” crop of the lockup + “d&d” — app icon to 16px',
      html: `<div class="lu">
  <span class="fv fv-xl">${LG_CROP()}</span>
  <span class="fv fv-md">${LG_CROP()}</span>
  <span class="fv fv-sm">${LG_CROP()}</span>
  <span class="fv fv-xl fv-alt"><span class="lg lg-line">d&amp;d</span></span>
</div>`,
      css: `
.lu { align-items: flex-end; }
.fv { display: grid; place-items: center; flex: none; border-radius: 22%; background: var(--text); }
.fv .lg { --lg-ink: var(--bg); --lg-bg: var(--text); }
.fv-xl { width: 84px; height: 84px; }
.fv-xl .lg { font-size: 44px; }
.fv-md { width: 44px; height: 44px; }
.fv-md .lg { font-size: 23px; }
.fv-sm { width: 22px; height: 22px; border-radius: 5px; }
.fv-sm .lg { font-size: 11.5px; }
.fv-alt { background: var(--accent); }
.fv-alt .lg { --lg-ink: var(--on-accent); --lg-bg: var(--accent); }
.lg-line { display: inline-block; font-size: 32px; line-height: 1; white-space: nowrap; }
`,
    },
    {
      name: 'With sub-line',
      note: 'Lockup, hairline divider, mono “cxkw.dev”',
      html: `<div class="lu"><div class="lu-lock">${LG()}<span class="lu-rule"></span><span class="lu-cap">cxkw.dev<br>design system</span></div></div>`,
      css: `
.lu-lock { display: flex; align-items: center; gap: calc(var(--u) * 4); }
.lg { font-size: 52px; }
.lu-rule { align-self: stretch; width: 1.5px; background: var(--border-strong); }
.lu-cap { line-height: 1.6; }
`,
    },
    {
      name: 'Clear space',
      note: 'Dashed exclusion zone — keep everything outside it',
      html: `<div class="lu lu-col"><div class="cs">${LG()}<span class="cs-x cs-t">x</span><span class="cs-x cs-l">x</span><span class="cs-x cs-r">x</span><span class="cs-x cs-b">x</span></div><span class="lu-cap">x = height of the “a”</span></div>`,
      css: `
.lu-col { flex-direction: column; gap: calc(var(--u) * 3); }
.cs { position: relative; font-size: 48px; padding: .5em; border: 1px dashed var(--accent);
  background: repeating-linear-gradient(45deg, color-mix(in oklab, var(--accent) 14%, transparent) 0 1px, transparent 1px 7px); }
.cs .lg { font-size: 1em; background: var(--bg); outline: 1px dashed var(--border-strong); }
.cs-x { position: absolute; font-family: var(--font-mono); font-size: 11px; line-height: 1; color: var(--accent); }
.cs-t { top: 7px; left: 50%; transform: translateX(-50%); }
.cs-b { bottom: 7px; left: 50%; transform: translateX(-50%); }
.cs-l { left: 8px; top: 50%; transform: translateY(-50%); }
.cs-r { right: 8px; top: 50%; transform: translateY(-50%); }
`,
    },
    {
      name: 'In the nav',
      note: 'Small lockup at bar height, on a surface',
      html: `<div class="lu lu-nav"><nav class="mn">${LG()}<span class="mn-links"><a>Work</a><a>Writing</a><a>Lab</a></span><a class="mn-cta">Contact</a></nav></div>`,
      css: `
.lu-nav { min-height: 0; padding: calc(var(--u) * 4); }
.mn { display: flex; align-items: center; gap: calc(var(--u) * 6); width: 100%; padding: calc(var(--u) * 3) calc(var(--u) * 4);
  background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); box-shadow: var(--shadow-sm);
  font-family: var(--font-body); font-size: var(--fs-sm); }
.mn .lg { font-size: 21px; --lg-bg: var(--surface); }
.mn-links { display: flex; gap: calc(var(--u) * 5); color: var(--muted); }
.mn a { cursor: pointer; }
.mn-cta { margin-left: auto; font-weight: 500; color: var(--accent); }
`,
    },
    {
      name: 'Sky fill',
      note: 'Letters filled with a warm-to-cool sky',
      css: `
.lg-1, .lg-2 { background: linear-gradient(100deg, var(--warn), var(--accent) 55%, var(--info));
  -webkit-background-clip: text; background-clip: text; color: transparent; }
`,
    },
    {
      name: 'On the sky',
      note: 'Light knockout over a dawn-to-dusk gradient block',
      css: `
.lu { min-height: 210px; border: 0;
  background: linear-gradient(180deg, color-mix(in oklab, var(--warn) 80%, var(--bg)) 0%, var(--accent) 44% 56%,
    color-mix(in oklab, var(--info) 65%, black) 100%); }
.lg { --lg-ink: color-mix(in oklab, white 94%, var(--accent)); --lg-bg: var(--accent); }
`,
    },
    {
      name: 'Size ladder',
      note: '56 → 28 → 14 → 10px legibility check',
      html: `<div class="lu lu-col"><div class="ld">${LG('s1')}${LG('s2')}${LG('s3')}${LG('s4')}</div><span class="lu-cap">56 · 28 · 14 · 10 px</span></div>`,
      css: `
.lu-col { flex-direction: column; gap: calc(var(--u) * 4); }
.ld { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: center; gap: calc(var(--u) * 4); }
.s1 { font-size: 56px; }
.s2 { font-size: 28px; }
.s3 { font-size: 14px; }
.s4 { font-size: 10px; }
`,
    },
    // ───── round 3 · siblings of #10 Clear space ─────
    {
      name: 'Clear space · minimum size',
      note: 'Clear-space box plus the smallest sizes the lockup may be used at',
      round: 3, basedOn: '#10 Clear space',
      html: `<div class="lu"><div class="ms">
  <div class="cs">${LG()}${CS_X}</div>
  <div class="ms-min">
    <span class="ms-row">${LG('m1')}<span class="lu-cap">24px · digital min</span></span>
    <span class="ms-row">${LG('m2')}<span class="lu-cap">16px · absolute min</span></span>
    <span class="ms-row is-no">${LG('m3')}<span class="lu-cap">12px · use the d&amp; tile</span></span>
  </div>
</div></div>`,
      css: `${CS_CSS}
.ms { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: calc(var(--u) * 6); }
.cs { font-size: 34px; }
.ms-min { display: flex; flex-direction: column; gap: calc(var(--u) * 3); }
.ms-row { display: flex; align-items: center; gap: calc(var(--u) * 3); }
.m1 { font-size: 24px; }
.m2 { font-size: 16px; }
.m3 { font-size: 12px; }
.ms-row.is-no .lg { opacity: .35; }
.ms-row.is-no .lu-cap { text-decoration: line-through; }
`,
    },
    {
      name: 'Clear space · construction grid',
      note: 'The lockup on its square module grid, with the line join and where “dusk” starts marked',
      round: 3, basedOn: '#10 Clear space',
      html: `<div class="lu lu-col"><div class="cg">${LG()}<span class="cg-v"></span><span class="cg-h"></span><span class="cg-tag cg-tag-v">dusk · 0.51em</span><span class="cg-tag cg-tag-h">join · 0.78em</span></div><span class="lu-cap">module = 1/8 em · tracking −0.055em</span></div>`,
      css: `
.lu-col { flex-direction: column; gap: calc(var(--u) * 3); }
.cg { position: relative; font-size: 64px; padding: 16px;
  background-image: linear-gradient(color-mix(in oklab, var(--text) 9%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklab, var(--text) 9%, transparent) 1px, transparent 1px);
  background-size: 8px 8px; background-position: -1px -1px; outline: 1px solid color-mix(in oklab, var(--text) 14%, transparent); }
.cg .lg { font-size: 1em; }
.cg-v { position: absolute; top: 0; bottom: 0; left: calc(16px + .51em); width: 1px; background: var(--accent); }
.cg-h { position: absolute; left: 0; right: 0; top: calc(16px + .78em); height: 1px; background: var(--accent); }
.cg-tag { position: absolute; padding: 2px 4px; font-family: var(--font-mono); font-size: 10px; line-height: 1; color: var(--bg); background: var(--accent); white-space: nowrap; }
.cg-tag-v { top: -8px; left: calc(16px + 33px); }
.cg-tag-h { right: calc(100% + 6px); top: calc(16px + 50px - 7px); }
`,
    },
    {
      name: 'Clear space · dawn + dusk',
      note: 'The same spec twice, side by side: on the page and reversed on ink',
      round: 3, basedOn: '#10 Clear space',
      html: `<div class="lu lu-pair"><div class="cs">${LG()}${CS_X}</div><div class="cs cs-inv">${LG()}${CS_X}</div></div>`,
      css: `${CS_CSS}
.lu-pair { flex-wrap: wrap; gap: calc(var(--u) * 5); }
.cs { font-size: 34px; }
.cs-inv { border-color: color-mix(in oklab, var(--bg) 55%, transparent);
  background: repeating-linear-gradient(45deg, color-mix(in oklab, var(--bg) 16%, transparent) 0 1px, transparent 1px 7px), var(--text); }
.cs-inv .lg { --lg-ink: var(--bg); --lg-bg: var(--text); background: var(--text); outline-color: color-mix(in oklab, var(--bg) 35%, transparent); }
.cs-inv .cs-x { color: var(--bg); }
`,
    },
    {
      name: 'Clear space · on a surface',
      note: 'Lockup on a toned 1200×630 share card, with its safe-area margins marked',
      round: 3, basedOn: '#10 Clear space',
      html: `<div class="lu"><div class="og">${LG()}<span class="og-sub">cxkw.dev — design system</span><span class="og-dim og-dim-t">x</span><span class="og-dim og-dim-l">x</span></div></div>`,
      css: `
.og { position: relative; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; width: 100%; max-width: 360px;
  aspect-ratio: 1200 / 630; padding: 30px; background: var(--surface-2); border-radius: var(--r-box); }
.og::before { content: ""; position: absolute; inset: 22px; border: 1px dashed color-mix(in oklab, var(--accent) 55%, transparent); pointer-events: none; }
.og .lg { --lg-bg: var(--surface-2); font-size: 44px; }
.og-sub { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--muted); }
.og-dim { position: absolute; font-family: var(--font-mono); font-size: 10px; line-height: 1; color: var(--accent); }
.og-dim-t { top: 6px; left: 34px; }
.og-dim-l { left: 8px; top: 34px; }
`,
    },
    {
      name: 'Clear space · dimension lines',
      note: 'No hatching — measured with dimension lines and ticks instead',
      round: 3, basedOn: '#10 Clear space',
      html: `<div class="lu lu-col"><div class="dm">${LG()}<span class="dm-h"><i>x</i></span><span class="dm-v"><i>x</i></span></div><span class="lu-cap">clear space = x on every side</span></div>`,
      css: `
.lu-col { flex-direction: column; gap: calc(var(--u) * 3); }
.dm { position: relative; font-size: 48px; padding: .5em; outline: 1px dashed var(--border-strong); }
.dm .lg { font-size: 1em; outline: 1px solid color-mix(in oklab, var(--accent) 30%, transparent); }
.dm-h, .dm-v { position: absolute; background: var(--accent); }
.dm-h { left: 0; top: 50%; width: .5em; height: 1px; }
.dm-v { top: 0; left: 50%; width: 1px; height: .5em; }
.dm-h::before, .dm-h::after { content: ""; position: absolute; top: -3px; width: 1px; height: 7px; background: var(--accent); }
.dm-h::before { left: 0; }
.dm-h::after { right: 0; }
.dm-v::before, .dm-v::after { content: ""; position: absolute; left: -3px; width: 7px; height: 1px; background: var(--accent); }
.dm-v::before { top: 0; }
.dm-v::after { bottom: 0; }
.dm i { position: absolute; font-family: var(--font-mono); font-size: 10px; font-style: normal; line-height: 1; color: var(--accent); }
.dm-h i { left: 50%; bottom: 4px; transform: translateX(-50%); }
.dm-v i { top: 50%; left: 5px; transform: translateY(-50%); }
`,
    },
  ],
});

})();
