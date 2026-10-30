/* dawn & dusk picker — data-display components: tables, cards, badges, tabs, alerts */
(function () {
  // @keyframes can't live inside nested option CSS, so the few this file needs go in one global sheet.
  if (typeof document !== 'undefined' && document.head) {
    var s = document.createElement('style');
    s.setAttribute('data-from', 'components-data');
    s.textContent =
      '@keyframes dd-data-pulse{0%{transform:scale(1);opacity:.55}100%{transform:scale(3.2);opacity:0}}';
    document.head.appendChild(s);
  }
})();

/* ───────── Round 4 — family helpers: showcase markup + shared CSS cores ───────── */
const DATA_R4 = (() => {
  const cap = (t) => `<p class="fam-cap">${t}</p>`;
  const FAM = `
.fam { display: flex; flex-direction: column; gap: calc(var(--u) * 2); min-width: 0; }
.fam-cap { margin: calc(var(--u) * 1.5) 0 0; font-family: var(--font-mono); font-size: 10.5px; line-height: 1.2; letter-spacing: 0.04em; color: var(--faint); }
.fam-cap:first-child { margin-top: 0; }
`;

  /* badges */
  const INTENTS = [['n', 'Draft'], ['a', 'New'], ['ok', 'Live'], ['warn', 'Beta'], ['bad', 'Failed'], ['info', 'Info']];
  const bd = (cls, label, pre = '', post = '') => `<span class="bd ${cls}"><i class="bd-dot"></i>${pre}<span class="bd-l">${label}</span>${post}</span>`;
  const bdRow = (v) => `<div class="bdg">${INTENTS.map(([k, l]) => bd(`bd--${v} bd-${k}`, l)).join('')}</div>`;
  const badgeHTML = `<div class="fam">${['solid', 'soft', 'outline', 'dot', 'ghost'].map((v) => cap(v) + bdRow(v)).join('')}
${cap('sm · md')}<div class="bdg">${bd('bd--solid bd-ok', 'Live')}${bd('bd--solid bd-ok bd--md', 'Live')}${bd('bd--soft bd-a', 'New')}${bd('bd--soft bd-a bd--md', 'New')}${bd('bd--outline bd-n bd--md', 'Draft')}</div>
${cap('icon · count')}<div class="bdg">${bd('bd--solid bd-ok', 'Live', '{{icon:check}}')}${bd('bd--soft bd-bad', 'Failed', '{{icon:alert}}')}${bd('bd--soft bd-n', 'Inbox', '', '<span class="bd-ct">12</span>')}${bd('bd--solid bd-a bd--md', 'New', '', '<span class="bd-ct">3</span>')}</div></div>`;
  const BADGE = `
& { --bd-py: calc(var(--u) * 1); --bd-px: calc(var(--u) * 1.75); --bd-py-md: calc(var(--u) * 1.5); --bd-px-md: calc(var(--u) * 2.5);
  --bd-r: 3px; --bd-ff: var(--font-body); --bd-fs: calc(var(--fs-xs) * 0.82); --bd-fs-md: calc(var(--fs-xs) * 0.95);
  --bd-fw: 700; --bd-ls: 0.12em; --bd-tt: uppercase; }
.bdg { display: flex; flex-wrap: wrap; align-items: center; gap: calc(var(--u) * 1.5); }
.bd-info { --c: var(--info); --cs: var(--info-soft); --s: var(--info); --on: var(--bg); }
:is(.bd-n, .bd-a, .bd-ok, .bd-warn, .bd-bad, .bd-info) { --cs: color-mix(in oklab, var(--c) 18%, transparent); }
.bd-n { --cs: color-mix(in oklab, var(--text) 10%, transparent); }
.bd { display: inline-flex; align-items: center; justify-content: center; gap: 0.5em; line-height: 1; white-space: nowrap;
  padding: var(--bd-py) var(--bd-px); border: 0; border-radius: var(--bd-r); box-shadow: none;
  font-family: var(--bd-ff); font-size: var(--bd-fs); font-weight: var(--bd-fw); letter-spacing: var(--bd-ls); text-transform: var(--bd-tt);
  background: var(--s); color: var(--on); }
.bd-l, .bd-ct { text-box: trim-both cap alphabetic; }
.bd-l { margin-inline-end: calc(var(--bd-ls) * -1); }
.bd-dot { display: none; width: 0.55em; height: 0.55em; border-radius: 50%; background: var(--c); flex: none; }
.bd .ic { width: 1.2em; height: 1.2em; margin-block: -0.3em; vertical-align: 0; }
.bd-ct { padding-left: 0.5em; border-left: 1px solid color-mix(in oklab, currentColor 35%, transparent); font-family: var(--font-mono); font-weight: 500; letter-spacing: 0; }
.bd--solid { background: var(--s); color: var(--on); }
.bd--soft { background: var(--cs); color: var(--c); }
.bd--outline { background: transparent; color: var(--c); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--c) 50%, transparent); }
.bd--dot { background: color-mix(in oklab, var(--text) 9%, transparent); color: var(--text); }
.bd--dot .bd-dot { display: block; }
.bd--ghost { background: transparent; color: var(--c); }
.bd--ghost:hover { background: var(--cs); }
.bd--md { padding: var(--bd-py-md) var(--bd-px-md); font-size: var(--bd-fs-md); }
`;

  /* alerts */
  const al = (k, icon, t, d, o = {}) => `<div class="al al-${k}${o.mod ? ' ' + o.mod : ''}">
  <span class="al-ic">{{icon:${icon}}}</span>
  <div class="al-body"><strong class="al-t">${t}</strong>${d ? `<span class="al-d">${d}</span>` : ''}</div>${o.act ? `
  <div class="al-act">${o.act.map((a, i) => `<a class="al-btn${i ? ' al-btn2' : ''}">${a}</a>`).join('')}</div>` : ''}${o.x ? `
  <button class="al-x" aria-label="Dismiss">{{icon:x}}</button>` : ''}
</div>`;
  const alertHTML = `<div class="fam">
${cap('intents · info ok warn bad')}<div class="als">
${al('info', 'info', 'Heads up', 'Fonts are cached for 24 hours.')}
${al('ok', 'check', 'Deployed', 'cxkw.dev is live.')}
${al('warn', 'alert', 'Slow build', '2m 14s, about twice the usual.')}
${al('bad', 'alert', 'Couldn’t load fonts', 'Falling back to system-ui.')}</div>
${cap('inline · compact')}<div class="als">${al('ok', 'check', 'Saved.', 'Changes sync in a few seconds.', { mod: 'al--inline' })}</div>
${cap('with actions')}<div class="als">${al('warn', 'alert', 'Domain renews in 3 days', 'Auto-renew is off for cxkw.dev.', { act: ['Renew now', 'Remind me'], x: true })}</div>
${cap('banner')}<div class="als">${al('info', 'sparkle', 'Dusk mode is here.', 'Flip it from the top bar.', { mod: 'al--banner', act: ['Try it'], x: true })}</div>
${cap('toast')}<div class="als">${al('ok', 'check', 'Post archived', '', { mod: 'al--toast', act: ['Undo'], x: true })}</div>
</div>`;
  const ALERT = `
& { container-type: inline-size; --al-wash: 14%; --al-t: var(--text); --al-edge: 0px; --al-chip: transparent; --al-ic-w: 1.25em; }
.als { max-width: none; gap: calc(var(--u) * 2.5); }
.al-info { --c: var(--info); --cs: var(--info-soft); }
.al-warn { --c: var(--warn); --cs: var(--warn-soft); }
.al { flex-wrap: nowrap; align-items: flex-start; border: 0; background: color-mix(in oklab, var(--c) var(--al-wash), var(--bg)); box-shadow: inset var(--al-edge) 0 0 var(--c); }
.al-ic { display: inline-grid; place-items: center; width: var(--al-ic-w); height: var(--al-ic-w); margin-top: 0.12em; border-radius: var(--r-ctl); background: var(--al-chip); font-size: 1em; }
.al-ic .ic { width: 1.15em; height: 1.15em; }
.al-body { overflow-wrap: anywhere; }
.al-t { color: var(--al-t); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al-act { display: flex; flex-wrap: wrap; align-items: center; align-self: center; gap: calc(var(--u) * 3); }
.al-btn { color: var(--text); font-weight: 500; text-decoration: underline dotted; text-decoration-thickness: 2px; text-underline-offset: 0.28em; text-decoration-color: color-mix(in oklab, var(--text) 45%, transparent); }
.al-btn:hover { text-decoration-style: solid; text-decoration-color: currentColor; }
.al-btn2 { display: inline; color: var(--muted); }
.al--inline { align-items: center; gap: calc(var(--u) * 2); padding: calc(var(--u) * 2) calc(var(--u) * 3); }
.al--inline .al-ic { margin-top: 0; }
.al--inline .al-body { flex-direction: row; flex-wrap: wrap; column-gap: calc(var(--u) * 1.5); }
.al--banner { align-items: center; justify-content: center; border-radius: 0; padding: calc(var(--u) * 2.25) calc(var(--u) * 10); }
.al--banner .al-ic { margin-top: 0; }
.al--banner .al-body { flex: 0 1 auto; flex-direction: row; flex-wrap: wrap; column-gap: calc(var(--u) * 1.5); }
.al--banner .al-x { position: absolute; right: calc(var(--u) * 2.5); top: 50%; transform: translateY(-50%); }
.al--toast { flex-wrap: nowrap; align-items: center; max-width: 420px; background: var(--text); color: var(--bg); box-shadow: var(--shadow-lg); }
.al--toast .al-act { order: 0; flex-basis: auto; padding-left: 0; }
.al--toast .al-x { order: 0; }
.al--toast .al-ic { margin-top: 0; color: color-mix(in oklab, var(--c) 65%, var(--bg)); background: color-mix(in oklab, var(--al-chip), transparent 40%); }
.al--toast .al-t { color: var(--bg); }
.al--toast .al-d { color: color-mix(in oklab, var(--bg) 72%, var(--text)); }
.al--toast .al-btn { color: var(--bg); text-decoration-color: color-mix(in oklab, var(--bg) 50%, transparent); }
.al--toast .al-x { color: color-mix(in oklab, var(--bg) 60%, var(--text)); }
.al--toast .al-x:hover { color: var(--bg); background: color-mix(in oklab, var(--bg) 14%, transparent); }
@container (max-width: 440px) {
  .al:has(.al-act):not(.al--toast) { flex-wrap: wrap; }
  .al:not(.al--toast) .al-x { order: 2; }
  .al:not(.al--toast) .al-act { order: 3; flex-basis: 100%; align-self: auto; padding-left: calc(var(--al-ic-w) + var(--u) * 3); }
  .al--banner { justify-content: flex-start; padding-inline: calc(var(--u) * 4) calc(var(--u) * 9); }
  .al--banner .al-body { flex: 1 1 0; }
  .al--banner .al-x { top: calc(var(--u) * 2); transform: none; }
}
`;

  /* cards */
  const card = (capt, mods, kind, title, text, meta, kpi = '', kpiL = '') => `<div class="cf-item">${cap(capt)}
<article class="c ${mods}">
  <div class="c-media" aria-hidden="true"></div>
  <div class="c-body">
    <div class="c-eyebrow"><span class="c-num">01</span><span class="c-kind">${kind}</span></div>
    <h4 class="dd-h c-title">${title}</h4>
    <div class="c-stat"><span class="c-kpi">${kpi}</span><span class="c-kpi-l">${kpiL}</span></div>
    <p class="c-text">${text}</p>
    <div class="c-foot"><span class="c-meta">${meta}</span><a class="c-link">Read {{icon:arrow-right}}</a></div>
  </div>
</article></div>`;
  const cardHTML = `<div class="cf">
${card('default', '', 'Case study', 'A calmer inbox', 'Triage rebuilt around two moods: dawn for planning, dusk for clearing out.', '6 min read')}
${card('interactive · hover', 'c--link is-hover', 'Open source', 'Dockey for macOS', 'A native companion for the local Docker engine.', 'Swift · macOS')}
${card('media', 'c--media', 'Photo essay', 'Blue hour, Hanoi', 'Twelve frames between dusk and dark.', '12 photos')}
${card('stat', 'c--stat', 'This year', 'Side projects shipped', '', 'Since January', '7', 'shipped, 3 still alive')}
${card('horizontal', 'c--row', 'Note', 'On quiet software', 'Why the best tools disappear into the work.', '3 min')}
${card('compact', 'c--compact', 'Link list', 'Reading, October', '', '14 links')}
</div>`;
  const CARD = `
& { container-type: inline-size; --cd-bg: var(--surface); --cd-bg-h: var(--surface-2); --cd-pad: calc(var(--u) * 5); --cd-title: var(--fs-xl); --cd-mi: 0px; --cd-mr: 0px; }
.cf { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); gap: calc(var(--u) * 3) calc(var(--u) * 4); align-items: start; }
.cf-item { display: flex; flex-direction: column; gap: calc(var(--u) * 1.5); min-width: 0; }
.c { width: 100%; max-width: none; background: var(--cd-bg); border: 0; border-radius: var(--r-box); box-shadow: var(--shadow); }
.c:hover { box-shadow: var(--shadow-lg); }
.c-body { padding: var(--cd-pad); }
.c-title { font-size: var(--cd-title); overflow-wrap: anywhere; }
.c-text { overflow-wrap: anywhere; }
.c-media { margin: var(--cd-mi) var(--cd-mi) 0; border-radius: var(--cd-mr); background: radial-gradient(120% 90% at 18% 110%, var(--tone-2) 0%, transparent 60%), linear-gradient(160deg, var(--tone-1), var(--tone-3)); }
.c--link { cursor: pointer; }
.c--link:hover, .c--link.is-hover { background: var(--cd-bg-h); box-shadow: var(--shadow-lg); outline: 1px solid color-mix(in oklab, var(--text) 14%, transparent); outline-offset: -1px; }
.c--link.is-hover .c-link .ic { transform: translateX(3px); }
.c--media .c-media { display: block; }
.c--stat .c-eyebrow { order: 0; }
.c--stat .c-stat { order: 1; display: flex; flex-direction: column; gap: calc(var(--u) * 1); }
.c--stat .c-title { order: 2; font-size: var(--fs-base); }
.c--stat .c-foot { order: 3; }
.c--stat .c-text { display: none; }
.c-kpi { font-family: var(--font-display); font-weight: var(--h-weight, 600); font-size: var(--fs-3xl); line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.c-kpi-l { color: var(--muted); font-size: var(--fs-sm); }
.c--row { display: grid; grid-template-columns: minmax(88px, 34%) 1fr; }
.c--row .c-media { display: block; aspect-ratio: auto; min-height: 100%; margin: var(--cd-mi) 0 var(--cd-mi) var(--cd-mi); }
.c--row .c-body { padding: calc(var(--cd-pad) * 0.8); gap: calc(var(--u) * 1.5); }
.c--row .c-title { font-size: var(--fs-lg); }
.c--row .c-text { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.c--compact .c-body { padding: calc(var(--cd-pad) * 0.7); gap: calc(var(--u) * 1); }
.c--compact .c-title { font-size: var(--fs-base); }
.c--compact .c-text { display: none; }
.c--compact .c-foot { margin-top: 0; }
@container (max-width: 300px) {
  .c--row { grid-template-columns: 1fr; }
  .c--row .c-media { aspect-ratio: 16 / 7; min-height: 0; margin: var(--cd-mi) var(--cd-mi) 0; }
}
`;

  /* tabs */
  const tab = (label, o = {}) => `<button class="tb-i${o.on ? ' is-active' : ''}${o.hover ? ' is-hover' : ''}" role="tab">${o.icon ? `{{icon:${o.icon}}}` : ''}<span class="tb-l">${label}</span>${o.count ? `<span class="tb-c">${o.count}</span>` : ''}</button>`;
  const tabs = (mod, list) => `<div class="tb${mod ? ' ' + mod : ''}" role="tablist">${list.join('')}</div>`;
  const tabHTML = `<div class="fam">
${cap('default')}${tabs('', [tab('Overview', { on: 1 }), tab('Projects'), tab('Writing', { hover: 1 }), tab('Lab')])}
${cap('with counts')}${tabs('', [tab('Inbox', { on: 1, count: 12 }), tab('Drafts', { count: 3 }), tab('Archive')])}
${cap('with icons')}${tabs('', [tab('Home', { on: 1, icon: 'home' }), tab('Work', { icon: 'folder' }), tab('Settings', { icon: 'settings' })])}
${cap('small')}${tabs('tb--sm', [tab('Day'), tab('Week', { on: 1 }), tab('Month'), tab('Year')])}
${cap('secondary · pill')}${tabs('tb--pill', [tab('All', { on: 1 }), tab('Open source', { hover: 1 }), tab('Writing'), tab('Talks')])}
${cap('vertical')}${tabs('tb--v', [tab('Profile', { on: 1, icon: 'user' }), tab('Notifications', { icon: 'bell', count: 3 }), tab('Preferences', { icon: 'settings' })])}
</div>`;
  const TAB = `
& { --tb-gap: calc(var(--u) * 5); --tb-mk: 2px; --tb-mkr: 0px; --tb-mkc: var(--text); --tb-base: var(--border); --tb-afw: 500;
  --tb-ff: var(--font-body); --tb-fs: var(--fs-sm); --tb-fs-sm: var(--fs-xs); }
.fam { gap: calc(var(--u) * 2.5); }
.tb { flex-wrap: nowrap; gap: var(--tb-gap); max-width: 100%; border: 0; overflow-x: auto; scrollbar-width: none; box-shadow: inset 0 -1px 0 var(--tb-base); }
.tb::-webkit-scrollbar { display: none; }
.tb-i { flex: none; margin: 0; padding: calc(var(--u) * 2.5) 0; border: 0; font-family: var(--tb-ff); font-size: var(--tb-fs); }
.tb-i::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: var(--tb-mk); border-radius: var(--tb-mkr); background: transparent; transition: background var(--dur) var(--ease); }
.tb-i:hover::after, .tb-i.is-hover::after { background: var(--border-strong); }
.tb-i.is-active { font-weight: var(--tb-afw); }
.tb-i.is-active::after { background: var(--tb-mkc); }
.tb-i .ic { opacity: 0.8; }
.tb-i.is-active .ic { opacity: 1; }
.tb-c { line-height: 1; padding: 3px 6px; background: color-mix(in oklab, var(--text) 10%, transparent); }
.tb-i.is-active .tb-c { color: var(--text); }
.tb--sm { gap: calc(var(--tb-gap) * 0.8); }
.tb--sm .tb-i { padding-block: calc(var(--u) * 1.75); font-size: var(--tb-fs-sm); }
.tb--pill { gap: calc(var(--u) * 1); box-shadow: none; }
.tb--pill .tb-i { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); border-radius: 999px; line-height: 1; }
.tb--pill .tb-i::after { display: none; }
.tb--pill .tb-i:hover, .tb--pill .tb-i.is-hover { background: color-mix(in oklab, var(--text) 6%, transparent); }
.tb--pill .tb-i.is-active { background: color-mix(in oklab, var(--text) 11%, transparent); color: var(--text); }
.tb--v { flex-direction: column; align-items: stretch; gap: 0; max-width: 260px; overflow: visible; box-shadow: inset 1px 0 0 var(--tb-base); }
.tb--v .tb-i { justify-content: flex-start; padding: calc(var(--u) * 2) calc(var(--u) * 4); }
.tb--v .tb-i::after { top: 0; bottom: 0; right: auto; width: var(--tb-mk); height: auto; }
.tb--v .tb-c { margin-left: auto; }
`;

  const fam = (core) => (vars = '', extra = '') => FAM + core + (vars ? `& { ${vars} }\n` : '') + extra;
  return {
    badgeHTML, alertHTML, cardHTML, tabHTML,
    badge: fam(BADGE), alert: fam(ALERT), card: fam(CARD), tab: fam(TAB),
  };
})();

/* ───────────────────────────── Tables ───────────────────────────── */

DD.category({
  id: 'tables',
  group: 'Components',
  title: 'Tables',
  blurb: 'Rows of real-ish data — rules, rhythm, header voice and the hovered row.',
  wide: true,
  html: `
<div class="tw">
  <table class="t">
    <thead>
      <tr><th>Project</th><th>Status</th><th class="num">Stars</th><th class="num">Updated</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="t-name">dawn-and-dusk</span><span class="t-sub">Design system</span></td><td><span class="t-st t-ok">Live</span></td><td class="num">1,284</td><td class="num t-date">2h ago</td></tr>
      <tr class="is-hover"><td><span class="t-name">dockey-ui</span><span class="t-sub">Docker, natively</span></td><td><span class="t-st t-ok">Live</span></td><td class="num">642</td><td class="num t-date">1d ago</td></tr>
      <tr><td><span class="t-name">insomnia</span><span class="t-sub">caffeinate, but kind</span></td><td><span class="t-st t-warn">Beta</span></td><td class="num">318</td><td class="num t-date">3d ago</td></tr>
      <tr><td><span class="t-name">ai-focus</span><span class="t-sub">Todo + focus board</span></td><td><span class="t-st t-info">Draft</span></td><td class="num">96</td><td class="num t-date">2w ago</td></tr>
      <tr><td><span class="t-name">leetnode</span><span class="t-sub">Interview reps</span></td><td><span class="t-st t-bad">Archived</span></td><td class="num">41</td><td class="num t-date">4mo ago</td></tr>
    </tbody>
  </table>
</div>`,
  css: `
.tw { width: 100%; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: var(--fs-sm); color: var(--text); }
th, td { text-align: left; padding: calc(var(--u) * 2.5) calc(var(--u) * 3); vertical-align: middle; white-space: nowrap; }
th { font-weight: 600; color: var(--muted); font-size: var(--fs-xs); }
.num { text-align: right; font-variant-numeric: tabular-nums; }
.t-name { display: block; font-weight: 600; }
.t-sub { display: block; color: var(--muted); font-size: var(--fs-xs); }
.t-date { color: var(--muted); }
.t-st { display: inline-flex; align-items: center; gap: calc(var(--u) * 1.5); font-size: var(--fs-xs); font-weight: 500; }
.t-st::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.t-ok { color: var(--ok); }
.t-warn { color: var(--warn); }
.t-info { color: var(--info); }
.t-bad { color: var(--bad); }
tbody tr, tbody td { transition: background var(--dur) var(--ease), color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
`,
  options: [
    {
      name: 'Hairline',
      note: 'Single rules between rows, nothing else',
      css: `
thead th { border-bottom: 1px solid var(--border-strong); }
tbody td { border-bottom: 1px solid var(--border); }
tbody tr:last-child td { border-bottom: 0; }
tbody tr:hover, tbody tr.is-hover { background: var(--surface-2); }
`,
    },
    {
      name: 'Zebra',
      note: 'Alternating fills inside a soft container',
      css: `
.tw { overflow: hidden; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); box-shadow: var(--shadow-sm); }
thead th { border-bottom: var(--bw) var(--bstyle) var(--border); }
tbody tr:nth-child(even) { background: var(--surface-2); }
tbody tr:hover, tbody tr.is-hover { background: var(--accent-soft); }
`,
    },
    {
      name: 'Gridlines',
      note: 'Every cell boxed, tinted header row',
      css: `
table { border: 1px solid var(--border-strong); }
th, td { border: 1px solid var(--border); }
thead th { background: var(--surface-2); color: var(--text); }
tbody tr:hover td, tbody tr.is-hover td { background: var(--accent-soft); }
`,
    },
    {
      name: 'Floating rows',
      note: 'Each row is its own little card',
      css: `
table { border-collapse: separate; border-spacing: 0 calc(var(--u) * 1.5); }
thead th { padding-bottom: 0; }
tbody td { background: var(--surface); border-top: var(--bw) var(--bstyle) var(--border); border-bottom: var(--bw) var(--bstyle) var(--border); }
tbody td:first-child { border-left: var(--bw) var(--bstyle) var(--border); border-top-left-radius: var(--r-box); border-bottom-left-radius: var(--r-box); }
tbody td:last-child { border-right: var(--bw) var(--bstyle) var(--border); border-top-right-radius: var(--r-box); border-bottom-right-radius: var(--r-box); }
tbody tr:hover td, tbody tr.is-hover td { background: var(--surface-2); border-color: var(--border-strong); }
`,
    },
    {
      name: 'Open air',
      note: 'No lines at all, generous padding, rounded hover',
      css: `
th, td { padding: calc(var(--u) * 4); }
thead th { font-weight: 500; color: var(--faint); }
tbody td:first-child { border-top-left-radius: var(--r-box); border-bottom-left-radius: var(--r-box); }
tbody td:last-child { border-top-right-radius: var(--r-box); border-bottom-right-radius: var(--r-box); }
tbody tr:hover td, tbody tr.is-hover td { background: var(--surface-2); }
`,
    },
    {
      name: 'Dense data',
      note: 'Compact rows, mono tabular numerals',
      css: `
table { font-size: var(--fs-xs); }
th, td { padding: calc(var(--u) * 1.25) calc(var(--u) * 2); }
th { font-family: var(--font-mono); font-size: calc(var(--fs-xs) * 0.9); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
.num, .t-date { font-family: var(--font-mono); }
.t-sub { display: none; }
.t-name { font-weight: 500; }
.t-st::before { border-radius: 1px; }
thead th { border-bottom: 1px solid var(--text); }
tbody td { border-bottom: 1px dotted var(--border-strong); }
tbody tr:hover td, tbody tr.is-hover td { background: var(--accent-soft); }
`,
    },
    {
      name: 'Ledger',
      note: 'Ruled paper, margin line, display-font entries',
      css: `
.tw { position: relative; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); padding: calc(var(--u) * 2) calc(var(--u) * 1) calc(var(--u) * 2) calc(var(--u) * 7); }
.tw::before { content: ""; position: absolute; top: 0; bottom: 0; left: calc(var(--u) * 4.5); border-left: 3px double color-mix(in oklab, var(--bad) 55%, transparent); }
thead th { font-family: var(--font-display); font-style: italic; font-weight: 400; font-size: var(--fs-sm); color: var(--muted); border-bottom: 2px solid var(--border-strong); }
td { border-bottom: 1px solid color-mix(in oklab, var(--info) 28%, transparent); }
.t-name { font-family: var(--font-display); font-weight: 400; font-size: var(--fs-base); }
.t-sub { font-style: italic; }
.num { font-family: var(--font-mono); }
tbody tr:hover td, tbody tr.is-hover td { background: color-mix(in oklab, var(--warn) 14%, transparent); }
`,
    },
    {
      name: 'Accent header',
      note: 'Header row filled with your accent',
      css: `
.tw { overflow: hidden; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); box-shadow: var(--shadow-sm); }
thead th { background: var(--accent); color: var(--on-accent); font-weight: 600; }
tbody tr + tr td { border-top: 1px solid var(--border); }
tbody tr:hover, tbody tr.is-hover { background: var(--accent-soft); }
`,
    },
    {
      name: 'Brutalist',
      note: 'Thick ink borders, hard shadow, inverted hover',
      css: `
.tw { overflow: hidden; background: var(--surface); border: 2px solid var(--text); box-shadow: 5px 5px 0 var(--text); margin: 0 5px 5px 0; }
table { font-weight: 500; }
thead th { background: var(--text); color: var(--bg); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.04em; }
td { border-top: 2px solid var(--text); }
th + th, td + td { border-left: 2px solid var(--text); }
.t-st::before { border-radius: 0; width: 8px; height: 8px; }
tbody tr:hover, tbody tr.is-hover { background: var(--accent); color: var(--on-accent); }
tbody tr:hover :is(.t-st, .t-sub, .t-date), tbody tr.is-hover :is(.t-st, .t-sub, .t-date) { color: inherit; }
`,
    },
    {
      name: 'Terminal',
      note: 'Mono, dashed rules, [status] in brackets',
      css: `
.tw { font-family: var(--font-mono); background: var(--surface); border: 1px dashed var(--border-strong); border-radius: var(--r-box); padding: calc(var(--u) * 3); }
.tw::before { content: "$ ls ~/projects --long"; display: block; color: var(--muted); font-size: var(--fs-xs); margin-bottom: calc(var(--u) * 2); }
table { font-family: var(--font-mono); font-size: var(--fs-xs); }
th, td { padding: calc(var(--u) * 1.25) calc(var(--u) * 2); }
thead th { color: var(--accent); font-weight: 400; text-transform: lowercase; border-bottom: 1px dashed var(--border-strong); }
.t-sub { display: none; }
.t-name { font-weight: 400; }
.t-st { gap: 0; text-transform: lowercase; }
.t-st::before { content: "["; width: auto; height: auto; background: none; border-radius: 0; }
.t-st::after { content: "]"; }
tbody tr:hover, tbody tr.is-hover { background: var(--text); color: var(--bg); }
tbody tr:hover :is(.t-st, .t-date), tbody tr.is-hover :is(.t-st, .t-date) { color: inherit; }
`,
    },
    {
      name: 'Editorial',
      note: 'Double rule, small caps, oldstyle numerals',
      css: `
table { border-top: 3px double var(--text); border-bottom: 1px solid var(--text); }
thead th { font-variant-caps: all-small-caps; letter-spacing: 0.08em; font-size: var(--fs-sm); color: var(--text); font-weight: 600; border-bottom: 1px solid var(--text); }
td { border-bottom: 1px solid var(--border); padding-block: calc(var(--u) * 3); }
.t-name { font-family: var(--font-display); font-size: var(--fs-lg); font-weight: 400; }
.t-sub { font-style: italic; }
.num { font-family: var(--font-display); font-variant-numeric: oldstyle-nums tabular-nums; font-size: var(--fs-base); }
.t-date { font-size: var(--fs-sm); }
.t-st { font-variant-caps: all-small-caps; letter-spacing: 0.06em; font-size: var(--fs-sm); }
.t-st::before { display: none; }
tbody tr:hover, tbody tr.is-hover { background: var(--surface-2); }
`,
    },
    {
      name: 'Rail',
      note: 'Hovered row gets an accent rail',
      css: `
thead th { border-bottom: 1px solid var(--border-strong); }
tbody td { border-bottom: 1px solid var(--border); }
tbody td:first-child { box-shadow: inset 0 0 0 0 var(--accent); }
tbody tr:hover td:first-child, tbody tr.is-hover td:first-child { box-shadow: inset 3px 0 0 0 var(--accent); }
tbody tr:hover, tbody tr.is-hover { background: color-mix(in oklab, var(--accent) 7%, transparent); }
tbody tr:hover .t-name, tbody tr.is-hover .t-name { color: var(--accent); }
`,
    },
    {
      name: 'Spreadsheet',
      note: 'Row-number gutter, grid, selected cell',
      css: `
.tw { background: var(--surface); border: 1px solid var(--border-strong); }
table { font-size: var(--fs-xs); }
th, td { border: 1px solid var(--border); padding: calc(var(--u) * 1.25) calc(var(--u) * 2); }
thead th { background: var(--surface-2); color: var(--muted); font-weight: 500; text-align: center; }
tbody { counter-reset: dd-row; }
tbody tr { counter-increment: dd-row; }
th:first-child, td:first-child { position: relative; padding-left: calc(var(--u) * 2 + 28px); }
th:first-child::before, td:first-child::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 24px; display: grid; place-items: center; background: var(--surface-2); color: var(--muted); border-right: 1px solid var(--border); font-family: var(--font-mono); font-weight: 400; }
td:first-child::before { content: counter(dd-row); }
.num, .t-date { font-family: var(--font-mono); }
.t-sub { display: none; }
.t-name { font-weight: 500; }
tbody tr:hover td { background: var(--surface-2); }
tbody tr.is-hover td:nth-child(3) { outline: 2px solid var(--accent); outline-offset: -2px; background: var(--accent-soft); }
`,
    },
  ],
});

/* ───────────────────────────── Cards ───────────────────────────── */

DD.category({
  id: 'cards',
  group: 'Components',
  title: 'Cards',
  blurb: 'The container for a project, post or stat — surface, edge and how it reacts.',
  html: `
<article class="c">
  <div class="c-media" aria-hidden="true"></div>
  <div class="c-body">
    <div class="c-eyebrow"><span class="c-num">01</span><span class="c-kind">Case study</span></div>
    <h4 class="dd-h c-title">A calmer inbox for <em>busy</em> mornings</h4>
    <div class="c-stat"><span class="c-kpi">−42%</span><span class="c-kpi-l">time spent in the inbox</span></div>
    <p class="c-text">Triage rebuilt around two moods: dawn for planning, dusk for clearing out.</p>
    <div class="c-foot"><span class="c-meta">6 min read</span><a class="c-link">Read {{icon:arrow-right}}</a></div>
  </div>
</article>`,
  css: `
.c { position: relative; max-width: 380px; background: var(--surface); color: var(--text); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); box-shadow: var(--shadow-sm); overflow: hidden; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease), background var(--dur) var(--ease); }
.c-media { display: none; aspect-ratio: 16 / 7; background:
  radial-gradient(120% 90% at 18% 110%, var(--accent) 0%, transparent 55%),
  radial-gradient(90% 80% at 92% 0%, color-mix(in oklab, var(--info) 70%, transparent) 0%, transparent 60%),
  linear-gradient(160deg, var(--accent-soft), var(--surface-2)); transition: transform var(--dur) var(--ease); }
.c-body { display: flex; flex-direction: column; gap: calc(var(--u) * 2); padding: calc(var(--u) * 5); }
.c-eyebrow { display: flex; align-items: center; gap: calc(var(--u) * 2); font-size: var(--fs-xs); color: var(--muted); }
.c-num { display: none; }
.c-title { margin: 0; font-size: var(--fs-xl); line-height: 1.15; }
.c-stat { display: none; }
.c-text { margin: 0; color: var(--muted); font-size: var(--fs-sm); line-height: var(--lh); }
.c-foot { display: flex; align-items: center; justify-content: space-between; margin-top: calc(var(--u) * 2); font-size: var(--fs-sm); }
.c-meta { color: var(--faint); }
.c-link { display: inline-flex; align-items: center; gap: calc(var(--u) * 1.5); color: var(--accent); font-weight: 600; cursor: pointer; }
.c-link .ic { transition: transform var(--dur) var(--ease); }
.c:hover .c-link .ic { transform: translateX(3px); }
`,
  options: [
    {
      name: 'Plain sheet',
      note: 'Hairline border, no shadow, border darkens on hover',
      css: `
.c { border: 1px solid var(--border); box-shadow: none; }
.c:hover { border-color: var(--border-strong); }
`,
    },
    {
      name: 'Lifted',
      note: 'Borderless, sits on a soft shadow',
      css: `
.c { border-color: transparent; box-shadow: var(--shadow); }
.c:hover { box-shadow: var(--shadow-lg); }
`,
    },
    {
      name: 'Top bar',
      note: 'Accent strip along the top edge',
      css: `
.c { box-shadow: none; }
.c::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 4px; background: var(--accent); }
.c-body { padding-top: calc(var(--u) * 6); }
.c-eyebrow { color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
`,
    },
    {
      name: 'Frosted',
      note: 'Translucent glass over colored light',
      css: `
& { position: relative; isolation: isolate; }
&::before, &::after { content: ""; position: absolute; z-index: -1; border-radius: 50%; filter: blur(30px); opacity: 0.7; pointer-events: none; }
&::before { width: 170px; height: 170px; background: var(--accent); top: -14px; right: 6%; }
&::after { width: 140px; height: 140px; background: var(--info); bottom: -12px; left: 2%; }
.c { background: color-mix(in oklab, var(--surface) 45%, transparent); backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4); border: 1px solid color-mix(in oklab, var(--text) 14%, transparent); box-shadow: inset 0 1px 0 color-mix(in oklab, white 22%, transparent), var(--shadow); }
.c-text { color: color-mix(in oklab, var(--text) 75%, transparent); }
`,
    },
    {
      name: 'Brutalist',
      note: 'Ink border, hard shadow, stamped label',
      css: `
.c { border: 2px solid var(--text); border-radius: 0; box-shadow: 6px 6px 0 var(--text); margin: 0 6px 6px 0; }
.c:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--text); }
.c-kind { background: var(--accent); color: var(--on-accent); padding: 2px 6px; font-family: var(--font-mono); text-transform: uppercase; font-weight: 700; }
.c-text { color: var(--text); }
.c-meta { font-family: var(--font-mono); color: var(--muted); }
.c-link { color: var(--text); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
`,
    },
    {
      name: 'Cover',
      note: 'Gradient “image” on top, zooms on hover',
      css: `
.c-media { display: block; }
.c:hover .c-media { transform: scale(1.04); }
.c:hover { box-shadow: var(--shadow); }
.c-body { padding-top: calc(var(--u) * 4); }
`,
    },
    {
      name: 'KPI',
      note: 'Big number first, story second',
      css: `
.c-eyebrow { order: 0; }
.c-stat { order: 1; display: flex; flex-direction: column; gap: calc(var(--u) * 1); }
.c-title { order: 2; font-size: var(--fs-base); }
.c-foot { order: 3; }
.c-text { display: none; }
.c-kpi { font-family: var(--font-display); font-size: var(--fs-4xl); line-height: 1; letter-spacing: -0.03em; color: var(--accent); font-variant-numeric: tabular-nums; }
.c-kpi-l { color: var(--muted); font-size: var(--fs-sm); }
.c::after { content: ""; position: absolute; right: calc(var(--u) * 5); top: calc(var(--u) * 5); width: 88px; height: 32px; background: linear-gradient(to top, transparent, color-mix(in oklab, var(--accent) 35%, transparent)); clip-path: polygon(0 72%, 14% 58%, 28% 64%, 42% 38%, 57% 46%, 71% 18%, 86% 28%, 100% 4%, 100% 100%, 0 100%); }
`,
    },
    {
      name: 'Ticket',
      note: 'Perforated stub with punched notches',
      css: `
.c { box-shadow: var(--shadow-sm); }
.c-eyebrow { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.1em; }
.c-foot { position: relative; margin-top: calc(var(--u) * 3); padding-top: calc(var(--u) * 4); border-top: 2px dashed var(--border-strong); font-family: var(--font-mono); }
.c-foot::before, .c-foot::after { content: ""; position: absolute; top: -11px; width: 20px; height: 20px; border-radius: 50%; background: var(--bg); box-shadow: inset 0 0 0 var(--bw) var(--border); }
.c-foot::before { left: calc(var(--u) * -5 - 10px); }
.c-foot::after { right: calc(var(--u) * -5 - 10px); }
`,
    },
    {
      name: 'Polaroid',
      note: 'Photo frame, washi tape, slight tilt',
      css: `
.c { overflow: visible; max-width: 300px; margin: calc(var(--u) * 4) calc(var(--u) * 2); padding: calc(var(--u) * 3) calc(var(--u) * 3) 0; border: 1px solid var(--border); border-radius: 3px; box-shadow: 0 1px 1px color-mix(in oklab, var(--text) 8%, transparent), 0 14px 28px -14px color-mix(in oklab, var(--text) 40%, transparent); transform: rotate(-1.5deg); }
.c:hover { transform: rotate(0deg) translateY(-2px); }
.c::before { content: ""; position: absolute; z-index: 1; top: -10px; left: 50%; width: 84px; height: 22px; transform: translateX(-50%) rotate(-3deg); background: color-mix(in oklab, var(--warn) 30%, color-mix(in oklab, var(--surface) 55%, transparent)); box-shadow: 0 1px 2px color-mix(in oklab, var(--text) 12%, transparent); }
.c-media { display: block; aspect-ratio: 1 / 0.78; border-radius: 1px; }
.c-body { gap: calc(var(--u) * 1.5); padding: calc(var(--u) * 4) calc(var(--u) * 1) calc(var(--u) * 5); }
.c-eyebrow { font-family: var(--font-mono); }
.c-title { font-size: var(--fs-lg); }
.c-text { display: none; }
.c-foot { margin-top: 0; }
`,
    },
    {
      name: 'Prism edge',
      note: 'Conic gradient border, accent glow on hover',
      css: `
.c { border: 2px solid transparent; background: linear-gradient(var(--surface), var(--surface)) padding-box, conic-gradient(from 210deg, var(--accent), var(--info), var(--ok), var(--accent)) border-box; box-shadow: none; }
.c:hover { box-shadow: 0 18px 40px -18px color-mix(in oklab, var(--accent) 60%, transparent); }
`,
    },
    {
      name: 'Inset',
      note: 'Pressed into the page instead of floating',
      css: `
.c { background: var(--surface-2); border: 0; box-shadow: inset 0 2px 5px color-mix(in oklab, black 14%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--text) 7%, transparent); }
.c-link { color: var(--text); }
.c-link .ic { color: var(--accent); }
`,
    },
    {
      name: 'Editorial',
      note: 'No box: rule, big index number, vertical label',
      css: `
.c { background: none; border: 0; border-top: 2px solid var(--text); border-radius: 0; box-shadow: none; overflow: visible; }
.c-body { display: grid; grid-template-columns: auto 1fr; column-gap: calc(var(--u) * 4); row-gap: calc(var(--u) * 2); padding: calc(var(--u) * 4) 0 0; }
.c-eyebrow { grid-column: 1; grid-row: 1 / span 4; flex-direction: column; align-items: flex-start; gap: calc(var(--u) * 3); }
.c-body > :not(.c-eyebrow) { grid-column: 2; }
.c-num { display: block; font-family: var(--font-display); font-size: var(--fs-3xl); line-height: 0.9; color: var(--accent); }
.c-kind { writing-mode: vertical-rl; transform: rotate(180deg); text-transform: uppercase; letter-spacing: 0.14em; font-size: calc(var(--fs-xs) * 0.85); }
.c-title { font-size: var(--fs-2xl); }
.c-link { color: var(--text); text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 2px; text-underline-offset: 4px; }
`,
    },
    {
      name: 'Landscape',
      note: 'Media left, content right',
      css: `
.c { display: grid; grid-template-columns: 38% 1fr; max-width: 480px; }
.c-media { display: block; aspect-ratio: auto; min-height: 100%; }
.c-body { padding: calc(var(--u) * 4); gap: calc(var(--u) * 1.5); }
.c-title { font-size: var(--fs-lg); }
.c-text { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.c-foot { margin-top: calc(var(--u) * 1); }
`,
    },
    {
      name: 'Hover lift',
      note: 'Rests flat; hover it — rises, rings, underlines',
      css: `
.c { box-shadow: var(--shadow-sm); }
.c::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform var(--dur) var(--ease); }
.c:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: var(--shadow-lg); }
.c:hover::after { transform: scaleX(1); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Plain sheet',
      name: 'Plain sheet · tonal fill',
      note: 'Border swapped for a soft surface-2 fill; separates by tone like your Borderless depth',
      css: `
.c { border: 0; box-shadow: none; background: var(--surface-2); }
.c:hover { background: color-mix(in oklab, var(--surface-2) 75%, var(--border)); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Plain sheet',
      name: 'Plain sheet · softer edge',
      note: 'Same sheet, hairline pulled halfway toward the page color',
      css: `
.c { border: 1px solid color-mix(in oklab, var(--border) 55%, var(--bg)); box-shadow: none; }
.c:hover { border-color: var(--border); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Plain sheet',
      name: 'Plain sheet · compact',
      note: 'Tighter padding and a one-step-smaller title for dense grids',
      css: `
.c { border: 1px solid var(--border); box-shadow: none; }
.c:hover { border-color: var(--border-strong); }
.c-body { padding: calc(var(--u) * 3.5) calc(var(--u) * 4); gap: calc(var(--u) * 1.5); }
.c-title { font-size: var(--fs-lg); }
.c-foot { margin-top: calc(var(--u) * 1); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Plain sheet',
      name: 'Plain sheet · ruled footer',
      note: 'A hairline separates the footer from the story',
      css: `
.c { border: 1px solid var(--border); box-shadow: none; }
.c:hover { border-color: var(--border-strong); }
.c-foot { margin-top: calc(var(--u) * 2); padding-top: calc(var(--u) * 3); border-top: 1px solid var(--border); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Plain sheet',
      name: 'Plain sheet · mono labels',
      note: 'Eyebrow and read-time set in your mono; eyebrow in spaced caps',
      css: `
.c { border: 1px solid var(--border); box-shadow: none; }
.c:hover { border-color: var(--border-strong); }
.c-eyebrow { font-family: var(--font-mono); font-size: calc(var(--fs-xs) * 0.9); letter-spacing: 0.08em; text-transform: uppercase; }
.c-meta { font-family: var(--font-mono); font-size: var(--fs-xs); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Plain sheet',
      name: 'Plain sheet · dotted link',
      note: 'Read link uses your Dotted link style instead of bold accent',
      css: `
.c { border: 1px solid var(--border); box-shadow: none; }
.c:hover { border-color: var(--border-strong); }
.c-link { color: var(--text); font-weight: 500; text-decoration: underline dotted; text-decoration-thickness: 2px; text-underline-offset: 0.28em; text-decoration-color: var(--accent); }
.c-link:hover { text-decoration-style: solid; }
`,
    },
    {
      round: 3,
      basedOn: '#01 Plain sheet',
      name: 'Plain sheet · hover fill',
      note: 'Hover tints the whole sheet instead of darkening the border',
      css: `
.c { border: 1px solid var(--border); box-shadow: none; }
.c:hover { background: var(--surface-2); }
`,
    },
    {
      round: 4,
      family: true,
      basedOn: '#02 Lifted',
      name: 'Lifted · family',
      note: 'Your pick as default, hover, media, stat, horizontal and compact cards',
      html: DATA_R4.cardHTML,
      css: DATA_R4.card(``, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#02 Lifted',
      name: 'Lifted · deeper step family',
      note: 'Cards sit one tone deeper (surface-2); hover goes deeper still',
      html: DATA_R4.cardHTML,
      css: DATA_R4.card(`--cd-bg: var(--surface-2); --cd-bg-h: color-mix(in oklab, var(--surface-2), var(--text) 6%);`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#02 Lifted',
      name: 'Lifted · roomy family',
      note: 'More padding and a one-step-larger title',
      html: DATA_R4.cardHTML,
      css: DATA_R4.card(`--cd-pad: calc(var(--u) * 7); --cd-title: var(--fs-2xl);`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#02 Lifted',
      name: 'Lifted · mono meta family',
      note: 'Eyebrow and meta set in your mono, eyebrow in spaced caps',
      html: DATA_R4.cardHTML,
      css: DATA_R4.card(``, `
.c-eyebrow { font-family: var(--font-mono); font-size: calc(var(--fs-xs) * 0.9); letter-spacing: 0.08em; text-transform: uppercase; }
.c-meta { font-family: var(--font-mono); font-size: var(--fs-xs); }
`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#02 Lifted',
      name: 'Lifted · ruled footer family',
      note: 'A faint rule separates the footer',
      html: DATA_R4.cardHTML,
      css: DATA_R4.card(``, `
.c-foot { padding-top: calc(var(--u) * 3); border-top: 1px solid color-mix(in oklab, var(--text) 10%, transparent); }
`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#02 Lifted',
      name: 'Lifted · inset media family',
      note: 'Images sit inset with their own rounded corners',
      html: DATA_R4.cardHTML,
      css: DATA_R4.card(`--cd-mi: calc(var(--u) * 2.5); --cd-mr: var(--r-ctl);`, `

`),
    },
  ],
});

/* ───────────────────────────── Badges ───────────────────────────── */

DD.category({
  id: 'badges',
  group: 'Components',
  title: 'Badges & tags',
  blurb: 'Tiny status labels — neutral, accent, ok, warning, danger.',
  html: `
<div class="bdg">
  <span class="bd bd-n"><i class="bd-dot"></i><span class="bd-l">Draft</span></span>
  <span class="bd bd-a"><i class="bd-dot"></i><span class="bd-l">New</span></span>
  <span class="bd bd-ok"><i class="bd-dot"></i><span class="bd-l">Live</span></span>
  <span class="bd bd-warn"><i class="bd-dot"></i><span class="bd-l">Beta</span></span>
  <span class="bd bd-bad"><i class="bd-dot"></i><span class="bd-l">Failed</span></span>
</div>`,
  css: `
.bdg { display: flex; flex-wrap: wrap; align-items: center; gap: calc(var(--u) * 2); }
.bd { --c: var(--muted); --cs: var(--surface-2); --s: var(--text); --on: var(--bg);
  position: relative; display: inline-flex; align-items: center; gap: calc(var(--u) * 1.5); padding: calc(var(--u) * 1.25) calc(var(--u) * 2.5);
  font-size: var(--fs-xs); font-weight: 600; line-height: 1; white-space: nowrap; border-radius: var(--r-ctl); color: var(--c);
  transition: background var(--dur) var(--ease), color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.bd-n { --c: var(--muted); --cs: var(--surface-2); --s: var(--text); --on: var(--bg); }
.bd-a { --c: var(--accent); --cs: var(--accent-soft); --s: var(--accent); --on: var(--on-accent); }
.bd-ok { --c: var(--ok); --cs: var(--ok-soft); --s: var(--ok); --on: var(--bg); }
.bd-warn { --c: var(--warn); --cs: var(--warn-soft); --s: var(--warn); --on: var(--bg); }
.bd-bad { --c: var(--bad); --cs: var(--bad-soft); --s: var(--bad); --on: var(--bg); }
.bd-dot { display: none; position: relative; flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--c); }
`,
  options: [
    {
      name: 'Solid pill',
      note: 'Filled, fully rounded',
      css: `
.bd { background: var(--s); color: var(--on); border-radius: 999px; }
`,
    },
    {
      name: 'Soft pill',
      note: 'Tinted fill, colored text',
      css: `
.bd { background: var(--cs); color: var(--c); border-radius: 999px; }
`,
    },
    {
      name: 'Outline',
      note: 'Colored hairline, transparent inside',
      css: `
.bd { background: transparent; color: var(--c); border: 1px solid color-mix(in oklab, var(--c) 55%, transparent); }
`,
    },
    {
      name: 'Dot',
      note: 'Just a colored dot and plain text',
      css: `
.bd { padding-inline: 0 calc(var(--u) * 2); color: var(--text); font-weight: 500; }
.bd-dot { display: block; width: 7px; height: 7px; }
`,
    },
    {
      name: 'Square tag',
      note: 'Sharp corners, colored left edge',
      css: `
.bd { border-radius: 0; background: var(--cs); color: var(--text); font-weight: 500; border-left: 3px solid var(--c); padding-left: calc(var(--u) * 2); }
`,
    },
    {
      name: 'Bracket',
      note: 'Mono, lowercase, [wrapped]',
      css: `
.bd { gap: 1px; padding: 0; background: none; font-family: var(--font-mono); font-weight: 400; text-transform: lowercase; color: var(--c); }
.bd::before { content: "["; color: var(--faint); }
.bd::after { content: "]"; color: var(--faint); }
.bd-n { color: var(--text); }
`,
    },
    {
      name: 'Micro caps',
      note: 'Tiny, uppercase, widely tracked',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
`,
    },
    {
      name: 'Gradient',
      note: 'Hue-shifted fill with a glossy top edge',
      css: `
.bd { border-radius: 999px; color: var(--on); background: linear-gradient(120deg, var(--s), oklch(from var(--s) calc(l + 0.06) c calc(h + 45))); box-shadow: inset 0 1px 0 color-mix(in oklab, white 35%, transparent), 0 2px 8px -3px color-mix(in oklab, var(--s) 70%, transparent); }
`,
    },
    {
      name: 'Brutalist',
      note: 'Ink outline, hard shadow, uppercase mono',
      css: `
.bd { background: var(--s); color: var(--on); border: 2px solid var(--text); border-radius: 0; box-shadow: 2px 2px 0 var(--text); font-family: var(--font-mono); text-transform: uppercase; font-weight: 700; }
.bd-n { background: var(--surface); color: var(--text); }
.bd:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0 var(--text); }
`,
    },
    {
      name: 'Flag',
      note: 'Ribbon with a notched tail',
      css: `
.bd { border-radius: 0; background: var(--s); color: var(--on); padding-right: calc(var(--u) * 2.5 + 8px); clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 50%, 100% 100%, 0 100%); }
`,
    },
    {
      name: 'Pulse',
      note: 'Live dot that breathes; neutral stays still',
      css: `
.bd { background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: 999px; font-weight: 500; padding-left: calc(var(--u) * 2.25); }
.bd-dot { display: block; }
.bd-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--c); animation: dd-data-pulse 1.8s var(--ease) infinite; }
.bd-n .bd-dot::after { display: none; }
`,
    },
    {
      name: 'Hashtag',
      note: '#lowercase, colored hash',
      css: `
.bd { gap: 1px; padding: 0; background: none; color: var(--text); font-weight: 500; text-transform: lowercase; }
.bd::before { content: "#"; color: var(--c); font-weight: 700; }
.bd:hover { color: var(--c); }
`,
    },
    {
      name: 'Stamp',
      note: 'Rubber stamp, double edge, slightly crooked',
      css: `
.bdg { gap: calc(var(--u) * 3); padding: 4px; }
.bd { background: none; color: var(--c); border: 2px solid var(--c); outline: 1px solid var(--c); outline-offset: 2px; border-radius: 3px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; transform: rotate(-4deg); opacity: 0.9; }
.bd:nth-child(even) { transform: rotate(3deg); }
.bd-n { color: var(--text); border-color: var(--text); outline-color: var(--text); }
`,
    },
    {
      round: 3,
      basedOn: '#07 Micro caps',
      name: 'Micro caps · mono',
      note: 'Same chip, label set in your mono at medium weight',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.bd { font-family: var(--font-mono); font-weight: 500; letter-spacing: 0.06em; }
`,
    },
    {
      round: 3,
      basedOn: '#07 Micro caps',
      name: 'Micro caps · lighter',
      note: 'Medium weight, wider tracking: quieter',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.bd { font-weight: 500; letter-spacing: 0.16em; }
`,
    },
    {
      round: 3,
      basedOn: '#07 Micro caps',
      name: 'Micro caps · ink label',
      note: 'Tint stays; label turns ink, so color lives only in the fill',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.bd { color: var(--text); }
`,
    },
    {
      round: 3,
      basedOn: '#07 Micro caps',
      name: 'Micro caps · dot lead',
      note: 'Adds a small status dot before the label',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.bd { gap: calc(var(--u) * 1.25); padding-left: calc(var(--u) * 1.5); }
.bd-dot { display: block; width: 5px; height: 5px; }
`,
    },
    {
      round: 3,
      basedOn: '#07 Micro caps',
      name: 'Micro caps · outline',
      note: 'Fill swapped for a hairline in the status color',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.bd { background: transparent; box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--c) 45%, transparent); }
`,
    },
    {
      round: 3,
      basedOn: '#07 Micro caps',
      name: 'Micro caps · solid',
      note: 'Full-strength fill with a knocked-out label',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.bd { background: var(--s); color: var(--on); }
`,
    },
    {
      round: 3,
      basedOn: '#07 Micro caps',
      name: 'Micro caps · pill',
      note: 'Same type, fully rounded ends',
      css: `
.bd { padding: calc(var(--u) * 1) calc(var(--u) * 1.75); border-radius: 3px; background: var(--cs); color: var(--c); font-size: calc(var(--fs-xs) * 0.82); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.bd { border-radius: 999px; padding-inline: calc(var(--u) * 2.25); }
`,
    },
    {
      round: 4,
      family: true,
      basedOn: '#19 Micro caps · solid',
      name: 'Micro caps · family',
      note: 'Your pick as a full set: solid, soft, outline, dot and ghost × 6 intents, two sizes, icon and count',
      html: DATA_R4.badgeHTML,
      css: DATA_R4.badge(``, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#19 Micro caps · solid',
      name: 'Micro caps · mono family',
      note: 'The same set with labels in your mono at medium weight',
      html: DATA_R4.badgeHTML,
      css: DATA_R4.badge(`--bd-ff: var(--font-mono); --bd-fw: 500; --bd-ls: 0.06em;`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#19 Micro caps · solid',
      name: 'Micro caps · pill family',
      note: 'The same set with fully rounded ends',
      html: DATA_R4.badgeHTML,
      css: DATA_R4.badge(`--bd-r: 999px; --bd-px: calc(var(--u) * 2.25); --bd-px-md: calc(var(--u) * 3);`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#19 Micro caps · solid',
      name: 'Micro caps · sentence-case family',
      note: 'No caps or tracking, semibold, one size up',
      html: DATA_R4.badgeHTML,
      css: DATA_R4.badge(`--bd-tt: none; --bd-ls: 0em; --bd-fw: 600; --bd-fs: var(--fs-xs); --bd-fs-md: var(--fs-sm);`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#19 Micro caps · solid',
      name: 'Micro caps · roomy family',
      note: 'The same type with more air around it',
      html: DATA_R4.badgeHTML,
      css: DATA_R4.badge(`--bd-py: calc(var(--u) * 1.5); --bd-px: calc(var(--u) * 2.25); --bd-py-md: calc(var(--u) * 2); --bd-px-md: calc(var(--u) * 3);`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#19 Micro caps · solid',
      name: 'Micro caps · light family',
      note: 'Medium weight and wider tracking: quieter labels',
      html: DATA_R4.badgeHTML,
      css: DATA_R4.badge(`--bd-fw: 500; --bd-ls: 0.16em;`, `

`),
    },
  ],
});

/* ───────────────────────────── Tabs ───────────────────────────── */

DD.category({
  id: 'tabs',
  group: 'Components',
  title: 'Tabs',
  blurb: 'Switching views — active marker, hover, and a counter.',
  html: `
<div class="tb" role="tablist">
  <button class="tb-i is-active" role="tab"><span class="tb-n">01</span><span class="tb-l">Overview</span></button>
  <button class="tb-i" role="tab"><span class="tb-n">02</span><span class="tb-l">Projects</span><span class="tb-c">12</span></button>
  <button class="tb-i is-hover" role="tab"><span class="tb-n">03</span><span class="tb-l">Writing</span></button>
  <button class="tb-i" role="tab"><span class="tb-n">04</span><span class="tb-l">Lab</span></button>
</div>`,
  css: `
.tb { position: relative; display: flex; align-items: center; gap: calc(var(--u) * 1); }
.tb-i { appearance: none; position: relative; display: inline-flex; align-items: center; gap: calc(var(--u) * 1.5); padding: calc(var(--u) * 2) calc(var(--u) * 3);
  background: none; border: 0; margin: 0; font: inherit; font-size: var(--fs-sm); font-weight: 500; color: var(--muted); white-space: nowrap; cursor: pointer;
  transition: color var(--dur) var(--ease), background var(--dur) var(--ease), border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease); }
.tb-i:hover, .tb-i.is-hover { color: var(--text); }
.tb-i.is-active { color: var(--text); }
.tb-i:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
.tb-n { display: none; font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--faint); }
.tb-c { padding: 2px 6px; border-radius: 999px; background: var(--surface-2); color: var(--muted); font-size: var(--fs-xs); line-height: 1.2; font-variant-numeric: tabular-nums; }
`,
  options: [
    {
      name: 'Underline',
      note: 'Baseline rule, ink underline on the active tab',
      css: `
.tb { gap: calc(var(--u) * 5); border-bottom: 1px solid var(--border); }
.tb-i { padding: calc(var(--u) * 2.5) 0; margin-bottom: -1px; border-bottom: 2px solid transparent; }
.tb-i:hover, .tb-i.is-hover { border-bottom-color: var(--border-strong); }
.tb-i.is-active { border-bottom-color: var(--text); }
`,
    },
    {
      name: 'Segmented',
      note: 'Pill track, raised active segment',
      css: `
.tb { display: inline-flex; gap: 2px; padding: 3px; background: var(--surface-2); border-radius: 999px; }
.tb-i { padding: calc(var(--u) * 1.5) calc(var(--u) * 3.5); border-radius: 999px; }
.tb-i.is-active { background: var(--surface); box-shadow: var(--shadow-sm), 0 0 0 1px var(--border); }
.tb-i.is-active .tb-c { background: var(--accent-soft); color: var(--accent); }
`,
    },
    {
      name: 'Folder',
      note: 'File-folder tabs joined to a baseline',
      css: `
.tb { align-items: flex-end; gap: 2px; padding-left: calc(var(--u) * 2); border-bottom: 1px solid var(--border-strong); }
.tb-i { background: var(--surface-2); border: 1px solid var(--border); border-bottom: 0; border-top-left-radius: var(--r-box); border-top-right-radius: var(--r-box); }
.tb-i:hover, .tb-i.is-hover { background: color-mix(in oklab, var(--surface-2) 60%, var(--surface)); }
.tb-i.is-active { background: var(--surface); border-color: var(--border-strong); margin-bottom: -1px; padding-bottom: calc(var(--u) * 2 + 1px); }
`,
    },
    {
      name: 'Draw bar',
      note: 'Thick accent bar draws in under hover and active',
      css: `
.tb { padding-bottom: 6px; }
.tb::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 3px; background: var(--surface-2); }
.tb-i::after { content: ""; position: absolute; z-index: 1; left: calc(var(--u) * 3); right: calc(var(--u) * 3); bottom: -6px; height: 3px; border-radius: 3px; background: var(--border-strong); transform: scaleX(0); transform-origin: left; transition: transform var(--dur) var(--ease), background var(--dur) var(--ease); }
.tb-i:hover::after, .tb-i.is-hover::after { transform: scaleX(0.5); }
.tb-i.is-active { color: var(--accent); }
.tb-i.is-active::after { transform: scaleX(1); background: var(--accent); }
`,
    },
    {
      name: 'Weight only',
      note: 'No chrome — active just gets heavier',
      css: `
.tb { gap: calc(var(--u) * 5); }
.tb-i { padding: calc(var(--u) * 1) 0; font-size: var(--fs-base); font-weight: 400; color: var(--faint); }
.tb-i:hover, .tb-i.is-hover { color: var(--muted); }
.tb-i.is-active { font-weight: 700; color: var(--text); }
.tb-c { align-self: flex-start; padding: 0; background: none; color: var(--accent); font-size: 0.65em; font-weight: 600; }
`,
    },
    {
      name: 'Chips',
      note: 'Bordered pills, active is inverted',
      css: `
.tb { flex-wrap: wrap; gap: calc(var(--u) * 2); }
.tb-i { padding: calc(var(--u) * 1.5) calc(var(--u) * 3.5); border: 1px solid var(--border); border-radius: 999px; }
.tb-i:hover, .tb-i.is-hover { border-color: var(--border-strong); background: var(--surface-2); }
.tb-i.is-active { background: var(--text); color: var(--bg); border-color: var(--text); }
.tb-i.is-active .tb-c { background: color-mix(in oklab, var(--bg) 22%, transparent); color: var(--bg); }
`,
    },
    {
      name: 'Numbered',
      note: '01 / 02 stepper with a top rule',
      css: `
.tb { gap: calc(var(--u) * 2); align-items: stretch; }
.tb-i { flex: 1; flex-direction: column; align-items: flex-start; gap: 2px; padding: calc(var(--u) * 2.5) calc(var(--u) * 4) calc(var(--u) * 1) 0; border-top: 1px solid var(--border); }
.tb-n { display: block; }
.tb-c { position: absolute; top: calc(var(--u) * 2.5); right: 0; }
.tb-i:hover, .tb-i.is-hover { box-shadow: inset 0 1px 0 var(--border-strong); }
.tb-i.is-active { box-shadow: inset 0 2px 0 var(--accent); }
.tb-i.is-active .tb-n { color: var(--accent); }
`,
    },
    {
      name: 'Bracket',
      note: 'Mono, lowercase, active wears [ brackets ]',
      css: `
.tb { gap: calc(var(--u) * 2); }
.tb-i { padding: calc(var(--u) * 1) calc(var(--u) * 1); gap: calc(var(--u) * 1); font-family: var(--font-mono); font-size: var(--fs-xs); text-transform: lowercase; }
.tb-i::before { content: "["; color: var(--accent); opacity: 0; transition: opacity var(--dur) var(--ease); }
.tb-i::after { content: "]"; color: var(--accent); opacity: 0; transition: opacity var(--dur) var(--ease); order: 9; }
.tb-i:hover::before, .tb-i:hover::after, .tb-i.is-hover::before, .tb-i.is-hover::after { opacity: 0.4; }
.tb-i.is-active::before, .tb-i.is-active::after { opacity: 1; }
.tb-c { padding: 0; background: none; color: var(--faint); }
.tb-c::before { content: "("; }
.tb-c::after { content: ")"; }
`,
    },
    {
      name: 'Brutalist',
      note: 'Joined boxes, active pops out with a hard shadow',
      css: `
.tb { gap: 0; padding: 0 4px 4px 0; }
.tb-i { padding: calc(var(--u) * 2) calc(var(--u) * 3); background: var(--surface); color: var(--text); border: 2px solid var(--text); font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.tb-i + .tb-i { margin-left: -2px; }
.tb-i:hover, .tb-i.is-hover { background: var(--surface-2); }
.tb-i.is-active { z-index: 1; background: var(--accent); color: var(--on-accent); box-shadow: 3px 3px 0 var(--text); transform: translate(-1px, -1px); }
.tb-c { border-radius: 0; background: var(--text); color: var(--bg); }
`,
    },
    {
      name: 'Side rail',
      note: 'Vertical list with an accent edge',
      css: `
.tb { flex-direction: column; align-items: stretch; gap: 2px; width: 200px; border-left: 1px solid var(--border); }
.tb-i { justify-content: flex-start; margin-left: -1px; padding: calc(var(--u) * 2) calc(var(--u) * 4); border-left: 2px solid transparent; }
.tb-i:hover, .tb-i.is-hover { border-left-color: var(--border-strong); background: var(--surface-2); }
.tb-i.is-active { border-left-color: var(--accent); background: linear-gradient(90deg, var(--accent-soft), transparent); }
.tb-c { margin-left: auto; }
`,
    },
    {
      name: 'Overline',
      note: 'Uppercase labels, marker rides on top',
      css: `
.tb { gap: calc(var(--u) * 5); border-top: 1px solid var(--border); }
.tb-i { margin-top: -1px; padding: calc(var(--u) * 3) 0 calc(var(--u) * 1); border-top: 2px solid transparent; font-size: var(--fs-xs); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
.tb-i:hover, .tb-i.is-hover { border-top-color: var(--border-strong); }
.tb-i.is-active { border-top-color: var(--accent); }
`,
    },
    {
      name: 'Dot',
      note: 'Plain text, a dot marks where you are',
      css: `
.tb { gap: calc(var(--u) * 4); }
.tb-i { padding: calc(var(--u) * 1.5) 0; }
.tb-i::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); transform: scale(0); transition: transform var(--dur) var(--ease), background var(--dur) var(--ease); }
.tb-i:hover::before, .tb-i.is-hover::before { transform: scale(0.6); background: var(--border-strong); }
.tb-i.is-active::before { transform: scale(1); background: var(--accent); }
`,
    },
    {
      name: 'Tinted',
      note: 'Active gets a soft accent wash',
      css: `
.tb { gap: calc(var(--u) * 1); }
.tb-i { border-radius: var(--r-ctl); }
.tb-i:hover, .tb-i.is-hover { background: var(--surface-2); }
.tb-i.is-active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
.tb-i.is-active .tb-c { background: var(--accent); color: var(--on-accent); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Underline',
      name: 'Underline · no baseline',
      note: 'Drops the full-width rule; only the marker remains',
      css: `
.tb { gap: calc(var(--u) * 5); border-bottom: 1px solid var(--border); }
.tb-i { padding: calc(var(--u) * 2.5) 0; margin-bottom: -1px; border-bottom: 2px solid transparent; }
.tb-i:hover, .tb-i.is-hover { border-bottom-color: var(--border-strong); }
.tb-i.is-active { border-bottom-color: var(--text); }
.tb { border-bottom: 0; }
.tb-i { margin-bottom: 0; }
`,
    },
    {
      round: 3,
      basedOn: '#01 Underline',
      name: 'Underline · thick marker',
      note: '3px marker with rounded ends instead of a 2px line',
      css: `
.tb { gap: calc(var(--u) * 5); border-bottom: 1px solid var(--border); }
.tb-i { padding: calc(var(--u) * 2.5) 0 calc(var(--u) * 3); margin-bottom: -1px; }
.tb-i::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 3px; background: transparent; transition: background var(--dur) var(--ease); }
.tb-i:hover::after, .tb-i.is-hover::after { background: var(--border-strong); }
.tb-i.is-active::after { background: var(--text); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Underline',
      name: 'Underline · bold active',
      note: 'Active label steps up to semibold',
      css: `
.tb { gap: calc(var(--u) * 5); border-bottom: 1px solid var(--border); }
.tb-i { padding: calc(var(--u) * 2.5) 0; margin-bottom: -1px; border-bottom: 2px solid transparent; }
.tb-i:hover, .tb-i.is-hover { border-bottom-color: var(--border-strong); }
.tb-i.is-active { border-bottom-color: var(--text); }
.tb-i.is-active { font-weight: 600; }
`,
    },
    {
      round: 3,
      basedOn: '#01 Underline',
      name: 'Underline · mono labels',
      note: 'Labels set in your mono, one size smaller',
      css: `
.tb { gap: calc(var(--u) * 5); border-bottom: 1px solid var(--border); }
.tb-i { padding: calc(var(--u) * 2.5) 0; margin-bottom: -1px; border-bottom: 2px solid transparent; }
.tb-i:hover, .tb-i.is-hover { border-bottom-color: var(--border-strong); }
.tb-i.is-active { border-bottom-color: var(--text); }
.tb-i { font-family: var(--font-mono); font-size: var(--fs-xs); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Underline',
      name: 'Underline · plain counter',
      note: 'Count loses its pill, leaving a muted mono number',
      css: `
.tb { gap: calc(var(--u) * 5); border-bottom: 1px solid var(--border); }
.tb-i { padding: calc(var(--u) * 2.5) 0; margin-bottom: -1px; border-bottom: 2px solid transparent; }
.tb-i:hover, .tb-i.is-hover { border-bottom-color: var(--border-strong); }
.tb-i.is-active { border-bottom-color: var(--text); }
.tb-c { padding: 0; background: none; color: var(--faint); font-family: var(--font-mono); }
`,
    },
    {
      round: 3,
      basedOn: '#01 Underline',
      name: 'Underline · padded hover',
      note: 'Tabs get side padding and a soft fill on hover',
      css: `
.tb { gap: calc(var(--u) * 5); border-bottom: 1px solid var(--border); }
.tb-i { padding: calc(var(--u) * 2.5) 0; margin-bottom: -1px; border-bottom: 2px solid transparent; }
.tb-i:hover, .tb-i.is-hover { border-bottom-color: var(--border-strong); }
.tb-i.is-active { border-bottom-color: var(--text); }
.tb { gap: calc(var(--u) * 1); }
.tb-i { padding: calc(var(--u) * 2.25) calc(var(--u) * 3); border-top-left-radius: var(--r-ctl); border-top-right-radius: var(--r-ctl); }
.tb-i:hover, .tb-i.is-hover { background: var(--surface-2); }
`,
    },
    {
      round: 4,
      family: true,
      basedOn: '#01 Underline',
      name: 'Underline · family',
      note: 'Your pick as default, counts, icons, small, secondary pill and vertical tabs',
      html: DATA_R4.tabHTML,
      css: DATA_R4.tab(``, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#01 Underline',
      name: 'Underline · no baseline family',
      note: 'Marker only, without the full-width rule',
      html: DATA_R4.tabHTML,
      css: DATA_R4.tab(`--tb-base: transparent;`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#01 Underline',
      name: 'Underline · thick marker family',
      note: '3px marker with rounded ends',
      html: DATA_R4.tabHTML,
      css: DATA_R4.tab(`--tb-mk: 3px; --tb-mkr: 3px;`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#01 Underline',
      name: 'Underline · bold active family',
      note: 'Active labels step up to semibold',
      html: DATA_R4.tabHTML,
      css: DATA_R4.tab(`--tb-afw: 600;`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#01 Underline',
      name: 'Underline · accent marker family',
      note: 'Marker in your accent instead of ink',
      html: DATA_R4.tabHTML,
      css: DATA_R4.tab(`--tb-mkc: var(--accent);`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#01 Underline',
      name: 'Underline · mono family',
      note: 'Labels set in your mono, one size down',
      html: DATA_R4.tabHTML,
      css: DATA_R4.tab(`--tb-ff: var(--font-mono); --tb-fs: var(--fs-xs); --tb-fs-sm: calc(var(--fs-xs) * 0.88);`, `

`),
    },
  ],
});

/* ───────────────────────────── Alerts ───────────────────────────── */

DD.category({
  id: 'alerts',
  group: 'Components',
  title: 'Alerts & toasts',
  blurb: 'Success and failure messages — inline notes, banners and toasts.',
  html: `
<div class="als">
  <div class="al al-ok" role="status">
    <span class="al-ic">{{icon:check}}</span>
    <div class="al-body">
      <span class="al-time">09:41:07</span>
      <span class="al-tag">Success</span>
      <strong class="al-t">Deployed to cxkw.dev</strong>
      <span class="al-d">dawn-and-dusk v0.3 is live. Build took 41s.</span>
    </div>
    <div class="al-act"><a class="al-btn">View site</a><a class="al-btn al-btn2">Undo</a></div>
    <button class="al-x" aria-label="Dismiss">{{icon:x}}</button>
  </div>
  <div class="al al-bad" role="alert">
    <span class="al-ic">{{icon:alert}}</span>
    <div class="al-body">
      <span class="al-time">09:41:12</span>
      <span class="al-tag">Error</span>
      <strong class="al-t">Couldn’t load fonts</strong>
      <span class="al-d">Falling back to system-ui until the CDN answers.</span>
    </div>
    <div class="al-act"><a class="al-btn">Retry</a><a class="al-btn al-btn2">Details</a></div>
    <button class="al-x" aria-label="Dismiss">{{icon:x}}</button>
  </div>
</div>`,
  css: `
.als { display: flex; flex-direction: column; gap: calc(var(--u) * 3); max-width: 460px; }
.al { --c: var(--info); --cs: var(--info-soft); position: relative; display: flex; align-items: flex-start; gap: calc(var(--u) * 3); padding: calc(var(--u) * 3.5) calc(var(--u) * 4); border-radius: var(--r-box); color: var(--text); font-size: var(--fs-sm); line-height: var(--lh); }
.al-ok { --c: var(--ok); --cs: var(--ok-soft); }
.al-bad { --c: var(--bad); --cs: var(--bad-soft); }
.al-ic { flex: none; display: inline-grid; place-items: center; margin-top: 0.15em; color: var(--c); font-size: 1.15em; line-height: 1; }
.al-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.al-t { font-weight: 600; }
.al-d { color: var(--muted); }
.al-time, .al-tag { display: none; }
.al-act { display: none; gap: calc(var(--u) * 3); align-items: center; }
.al-btn { cursor: pointer; font-weight: 600; font-size: var(--fs-sm); color: var(--c); white-space: nowrap; }
.al-btn2 { display: none; }
.al-x { appearance: none; flex: none; display: inline-grid; place-items: center; padding: 3px; margin: 0; border: 0; border-radius: 4px; background: none; color: var(--faint); font: inherit; line-height: 1; cursor: pointer; transition: color var(--dur) var(--ease), background var(--dur) var(--ease); }
.al-x:hover { color: var(--text); background: var(--surface-2); }
.al-x:focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
& { container-type: inline-size; }
.al-body { overflow-wrap: anywhere; }
@container (max-width: 400px) {
  .al:has(> .al-act) { flex-wrap: wrap; }
  .al-x { order: 2; }
  .al-act { order: 3; flex-basis: 100%; padding-left: calc(1.27em + var(--u) * 3); }
}
`,
  options: [
    {
      name: 'Left bar',
      note: 'Surface card with a colored edge',
      css: `
.al { background: var(--surface); border: var(--bw) var(--bstyle) var(--border); box-shadow: inset 3px 0 0 var(--c), var(--shadow-sm); }
`,
    },
    {
      name: 'Soft fill',
      note: 'Tinted background, no border',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
`,
    },
    {
      name: 'Outline',
      note: 'Colored hairline, colored title',
      css: `
.al { background: transparent; border: 1px solid color-mix(in oklab, var(--c) 50%, transparent); }
.al-t { color: var(--c); }
`,
    },
    {
      name: 'Icon disc',
      note: 'Solid status disc leads the message',
      css: `
.al { align-items: center; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); box-shadow: var(--shadow-sm); }
.al-ic { width: 32px; height: 32px; margin-top: 0; border-radius: 50%; background: var(--c); color: var(--bg); font-size: 1em; }
`,
    },
    {
      name: 'Brutalist',
      note: 'Ink frame, hard shadow, square icon block',
      css: `
.als { padding: 0 4px 4px 0; }
.al { align-items: center; background: var(--surface); border: 2px solid var(--text); border-radius: 0; box-shadow: 4px 4px 0 var(--text); }
.al-ic { width: 30px; height: 30px; margin-top: 0; background: var(--c); color: var(--bg); border: 2px solid var(--text); }
.al-t { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.02em; }
.al-d { color: var(--text); }
.al-x { color: var(--text); border-radius: 0; }
`,
    },
    {
      name: 'Inverted toast',
      note: 'Flipped colors, floats, inline action',
      css: `
.al { align-items: center; background: var(--text); color: var(--bg); border-radius: var(--r-box); box-shadow: var(--shadow-lg); }
.al-ic { color: color-mix(in oklab, var(--c) 70%, var(--bg)); margin-top: 0; }
.al-d { color: color-mix(in oklab, var(--bg) 70%, var(--text)); }
.al-act { display: flex; }
.al-btn { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.al-x { color: color-mix(in oklab, var(--bg) 60%, var(--text)); }
.al-x:hover { color: var(--bg); background: color-mix(in oklab, var(--bg) 14%, transparent); }
`,
    },
    {
      name: 'Banner',
      note: 'Full-width strip, centered, solid color',
      css: `
.als { max-width: none; gap: 0; }
.al { align-items: center; justify-content: center; padding: calc(var(--u) * 2.5) calc(var(--u) * 10); border-radius: 0; background: var(--c); color: var(--bg); }
.al-ic { color: inherit; margin-top: 0; }
.al-body { flex: 0 1 auto; flex-direction: row; flex-wrap: wrap; align-items: baseline; column-gap: calc(var(--u) * 2); }
.al-d { color: color-mix(in oklab, var(--bg) 82%, var(--c)); }
.al-act { display: flex; }
.al-btn { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.al-x { position: absolute; right: calc(var(--u) * 3); top: 50%; transform: translateY(-50%); color: inherit; }
.al-x:hover { color: inherit; background: color-mix(in oklab, var(--bg) 18%, transparent); }
`,
    },
    {
      name: 'Inline note',
      note: 'No box — icon and a colored lead-in',
      css: `
.als { gap: calc(var(--u) * 2); }
.al { padding: 0; gap: calc(var(--u) * 2); background: none; }
.al-body { flex-direction: row; flex-wrap: wrap; column-gap: calc(var(--u) * 1.5); }
.al-t { color: var(--c); }
.al-x { display: none; }
`,
    },
    {
      name: 'Glass',
      note: 'Frosted panel over colored light',
      css: `
& { position: relative; isolation: isolate; }
&::before, &::after { content: ""; position: absolute; z-index: -1; border-radius: 50%; filter: blur(28px); opacity: 0.65; pointer-events: none; }
&::before { width: 150px; height: 120px; background: var(--ok); top: -10px; left: 10%; }
&::after { width: 150px; height: 120px; background: var(--bad); bottom: -10px; right: 12%; }
.al { align-items: center; background: color-mix(in oklab, var(--surface) 50%, transparent); backdrop-filter: blur(16px) saturate(1.5); -webkit-backdrop-filter: blur(16px) saturate(1.5); border: 1px solid color-mix(in oklab, var(--text) 12%, transparent); box-shadow: inset 0 1px 0 color-mix(in oklab, white 20%, transparent), var(--shadow); }
.al-ic { width: 30px; height: 30px; margin-top: 0; border-radius: 50%; background: var(--cs); }
`,
    },
    {
      name: 'Log line',
      note: 'Terminal output: time, [level], message',
      css: `
.als { gap: 0; padding: calc(var(--u) * 3); background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-box); font-family: var(--font-mono); }
.als::before { content: "~/cxkw.dev $ deploy --prod"; display: block; margin-bottom: calc(var(--u) * 2); color: var(--muted); font-size: var(--fs-xs); }
.al { align-items: baseline; gap: calc(var(--u) * 2); padding: calc(var(--u) * 1) 0; border-radius: 0; font-family: var(--font-mono); font-size: var(--fs-xs); }
.al-ic, .al-x { display: none; }
.al-body { flex-direction: row; flex-wrap: wrap; column-gap: calc(var(--u) * 2); }
.al-time { display: inline; color: var(--faint); }
.al-tag { display: inline; color: var(--c); text-transform: lowercase; }
.al-tag::before { content: "["; }
.al-tag::after { content: "]"; }
.al-t { font-weight: 400; }
.al-d::before { content: "— "; }
`,
    },
    {
      name: 'Tag-led',
      note: 'Solid uppercase tag above the title',
      css: `
.al { align-items: center; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); box-shadow: var(--shadow-sm); }
.al-ic { display: none; }
.al-tag { display: inline-flex; align-self: flex-start; margin-bottom: 4px; padding: 2px 8px; border-radius: var(--r-ctl); background: var(--c); color: var(--bg); font-size: calc(var(--fs-xs) * 0.9); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
`,
    },
    {
      name: 'Timer stripe',
      note: 'Toast with a draining top stripe',
      css: `
.al { overflow: hidden; padding-top: calc(var(--u) * 4.5); background: var(--surface); border: var(--bw) var(--bstyle) var(--border); box-shadow: var(--shadow); }
.al::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: linear-gradient(90deg, var(--c) 64%, color-mix(in oklab, var(--c) 20%, transparent) 64%); }
`,
    },
    {
      name: 'Action toast',
      note: 'Floating toast with primary + ghost actions',
      css: `
.al { flex-wrap: wrap; padding: calc(var(--u) * 4); background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-lg); box-shadow: var(--shadow-lg); }
.al-x { order: 2; }
.al-act { order: 3; display: flex; gap: calc(var(--u) * 2); flex-basis: 100%; padding-left: calc(1.15em + var(--u) * 3); }
.al-btn { display: inline-flex; align-items: center; padding: calc(var(--u) * 1.5) calc(var(--u) * 3); border-radius: var(--r-ctl); background: var(--text); color: var(--bg); font-size: var(--fs-xs); transition: opacity var(--dur) var(--ease), background var(--dur) var(--ease); }
.al-btn:hover { opacity: 0.85; }
.al-btn2 { display: inline-flex; background: transparent; color: var(--text); box-shadow: inset 0 0 0 1px var(--border-strong); }
.al-btn2:hover { opacity: 1; background: var(--surface-2); }
`,
    },
    {
      round: 3,
      basedOn: '#02 Soft fill',
      name: 'Soft fill · tinted title',
      note: 'Title takes the status color',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al-t { color: var(--c); }
`,
    },
    {
      round: 3,
      basedOn: '#02 Soft fill',
      name: 'Soft fill · lighter wash',
      note: 'Half-strength tint for quieter pages',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al { background: color-mix(in oklab, var(--c) 7%, var(--bg)); }
`,
    },
    {
      round: 3,
      basedOn: '#02 Soft fill',
      name: 'Soft fill · deeper wash',
      note: 'Stronger tint, detail text closer to ink',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al { background: color-mix(in oklab, var(--c) 24%, var(--bg)); }
.al-d { color: color-mix(in oklab, var(--text) 88%, var(--c)); }
`,
    },
    {
      round: 3,
      basedOn: '#02 Soft fill',
      name: 'Soft fill · edge',
      note: 'Adds a 2px status edge on the left',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al { box-shadow: inset 2px 0 0 var(--c); }
`,
    },
    {
      round: 3,
      basedOn: '#02 Soft fill',
      name: 'Soft fill · compact',
      note: 'Tighter padding; detail runs on after the title instead of its own line',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al { align-items: center; gap: calc(var(--u) * 2.5); padding: calc(var(--u) * 2.5) calc(var(--u) * 3); }
.al-ic { margin-top: 0; }
.al-body { flex-direction: row; flex-wrap: wrap; column-gap: calc(var(--u) * 1.5); }
`,
    },
    {
      round: 3,
      basedOn: '#02 Soft fill',
      name: 'Soft fill · icon chip',
      note: 'Icon sits in a small square of deeper tint',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al { align-items: center; }
.al-ic { width: 30px; height: 30px; margin-top: 0; border-radius: var(--r-ctl); background: color-mix(in oklab, var(--c) 18%, transparent); font-size: 1em; }
`,
    },
    {
      round: 3,
      basedOn: '#02 Soft fill',
      name: 'Soft fill · with action',
      note: 'Adds a dotted text action on the right',
      css: `
.al { background: var(--cs); }
.al-d { color: color-mix(in oklab, var(--text) 72%, var(--c)); }
.al-x:hover { background: color-mix(in oklab, var(--c) 14%, transparent); }
.al-act { display: flex; align-self: center; }
.al-btn { color: var(--text); font-weight: 500; text-decoration: underline dotted; text-decoration-thickness: 2px; text-underline-offset: 0.28em; }
.al-btn:hover { text-decoration-style: solid; }
`,
    },
    {
      round: 4,
      family: true,
      basedOn: '#20 Soft fill · with action',
      name: 'Soft fill · family',
      note: 'Your pick across info, ok, warn, bad, plus inline, actions, banner and toast. Actions drop under the text when narrow',
      html: DATA_R4.alertHTML,
      css: DATA_R4.alert(``, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#20 Soft fill · with action',
      name: 'Soft fill · button actions family',
      note: 'Actions become small buttons: accent primary, tinted secondary',
      html: DATA_R4.alertHTML,
      css: DATA_R4.alert(``, `
.al-act { gap: calc(var(--u) * 2); }
.al-btn { display: inline-flex; align-items: center; line-height: 1; padding: calc(var(--u) * 1.6) calc(var(--u) * 3); border-radius: var(--r-ctl); background: var(--accent); color: var(--on-accent); font-size: var(--fs-xs); font-weight: 600; text-decoration: none; transition: background var(--dur) var(--ease); }
.al-btn:hover { background: var(--accent-hover); }
.al-btn2 { display: inline-flex; background: color-mix(in oklab, var(--c) 16%, transparent); color: var(--text); }
.al-btn2:hover { background: color-mix(in oklab, var(--c) 26%, transparent); }
.al--toast .al-btn { background: var(--bg); color: var(--text); }
.al--toast .al-btn:hover { background: color-mix(in oklab, var(--bg) 85%, var(--text)); }
`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#20 Soft fill · with action',
      name: 'Soft fill · tinted title family',
      note: 'Titles take the status color',
      html: DATA_R4.alertHTML,
      css: DATA_R4.alert(`--al-t: var(--c);`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#20 Soft fill · with action',
      name: 'Soft fill · edge family',
      note: 'A 2px status edge on the left of every alert',
      html: DATA_R4.alertHTML,
      css: DATA_R4.alert(`--al-edge: 2px;`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#20 Soft fill · with action',
      name: 'Soft fill · lighter wash family',
      note: 'Half-strength tint for quieter pages',
      html: DATA_R4.alertHTML,
      css: DATA_R4.alert(`--al-wash: 7%;`, `

`),
    },
    {
      round: 4,
      family: true,
      basedOn: '#20 Soft fill · with action',
      name: 'Soft fill · icon chip family',
      note: 'Icons sit in a small square of deeper tint',
      html: DATA_R4.alertHTML,
      css: DATA_R4.alert(`--al-ic-w: 2em; --al-chip: color-mix(in oklab, var(--c) 18%, transparent);`, `
.al { align-items: center; }
.al-ic { margin-top: 0; }
`),
    },
  ],
});
