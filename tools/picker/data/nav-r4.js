// Round 4 · interactive navigation families around #18 Icon rail.
// Loaded after components-chrome.js; appends to the existing nav category (append-only: picks are stored by index).
// Interaction contract (wired by app.js): [data-nav-toggle] toggles .is-open on the closest .nv,
// [data-nav-group] toggles .is-open on the closest .nv-grp. `html` is the card demo (nav + faux page);
// `page` is the nav alone, used on the composite page.
(() => {
  const nav = DD.byId.nav;
  if (!nav) return;

  /* ── shared pieces (category-level css: lower specificity than any option css) ── */
  nav.css += `
.nd { position: relative; display: flex; min-height: 400px; overflow: hidden; border-radius: var(--r-box); background: var(--bg);
  transform: translateZ(0); container-type: inline-size; }
.nd.is-col { flex-direction: column; }
.nd-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: calc(var(--u) * 2.5); padding: calc(var(--u) * 5); }
.nd-hint { align-self: flex-start; display: inline-flex; align-items: center; margin-bottom: calc(var(--u) * 2); padding: 5px 10px;
  border-radius: 12px; background: var(--surface-2); font-family: var(--font-mono); font-size: 11px; line-height: 1.3; color: var(--muted); }
.nd-l { display: block; height: 10px; border-radius: 4px; background: var(--surface-2); }
.nd-l.l1 { width: 45%; height: 18px; background: color-mix(in oklab, var(--text) 14%, transparent); }
.nd-l.l2 { width: 85%; }
.nd-l.l3 { width: 62%; }
.nd-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: calc(var(--u) * 3); margin-top: calc(var(--u) * 3); }
.nd-cards i { display: block; height: 96px; border-radius: var(--r-box); background: var(--surface); }
@container (max-width: 440px) { .nd-cards { display: none; } .nd-main { padding: calc(var(--u) * 3); } .nd-hint { font-size: 10px; } }
.nv {
  :where(button) { font: inherit; color: inherit; background: none; border: 0; padding: 0; margin: 0; cursor: pointer; text-align: left; }
  .sn-logo { display: grid; place-items: center; flex: none; width: 40px; height: 40px; border-radius: var(--r-ctl); background: var(--text);
    color: var(--bg); font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: -0.06em; }
  .sn-name { font-family: 'Outfit', sans-serif; font-size: var(--fs-lg); font-weight: 800; letter-spacing: -0.04em; white-space: nowrap; }
  .sn-head { display: flex; align-items: center; gap: calc(var(--u) * 3); margin-bottom: calc(var(--u) * 3); }
  .sn-list { display: flex; flex-direction: column; gap: 2px; }
  .sn-foot { display: flex; flex-direction: column; gap: 2px; margin-top: auto; padding-top: calc(var(--u) * 3); }
  .sn-sec { padding: calc(var(--u) * 3) 10px calc(var(--u) * 1.5); font-size: 11px; font-weight: 600; text-transform: uppercase;
    letter-spacing: .1em; color: var(--faint); white-space: nowrap; }
  .sn-a { position: relative; display: flex; align-items: center; gap: calc(var(--u) * 3); width: 100%; min-height: 40px; padding: 0 10.5px;
    border-radius: var(--r-ctl); color: var(--muted); white-space: nowrap; cursor: pointer;
    transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
  .sn-a .ic { flex: none; font-size: 19px; }
  .sn-a:hover { background: var(--surface-2); color: var(--text); }
  .sn-a.is-active { background: var(--accent-soft); color: var(--text); font-weight: 500; }
  .sn-a.is-active .ic { color: var(--accent); }
  .sn-t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: var(--fs-sm); }
  .sn-n { font-family: var(--font-mono); font-size: 11px; font-weight: 400; color: var(--faint); }
  .sn-cta, .sn-cta:hover { background: var(--accent); color: var(--on-accent); }
  .sn-cta .ic { color: var(--on-accent); }
  .sn-s { position: relative; display: flex; align-items: center; gap: calc(var(--u) * 2); padding: 7px 10px; border-radius: var(--r-ctl);
    font-size: var(--fs-sm); color: var(--muted); white-space: nowrap; cursor: pointer;
    transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
  .sn-s:hover { background: var(--surface-2); color: var(--text); }
  .sn-s.is-active { color: var(--text); font-weight: 500; }
  .sn-s .sn-n { margin-left: auto; }
  .sn-btn { display: inline-grid; place-items: center; flex: none; width: 36px; height: 36px; border-radius: var(--r-ctl); color: var(--muted);
    font-size: 18px; transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
  .sn-btn:hover { background: var(--surface-2); color: var(--text); }
  .sn-chev { display: inline-grid; margin-left: auto; color: var(--faint); transition: transform var(--dur) var(--ease); }
  .sn-chev .ic { font-size: 15px; }
  .sn-bar { display: flex; align-items: center; gap: calc(var(--u) * 2); padding: calc(var(--u) * 2.5) calc(var(--u) * 3); background: var(--surface); }
  .sn-bar-r { display: flex; align-items: center; gap: calc(var(--u) * 1.5); margin-left: auto; }
  .sn-pill { display: inline-flex; align-items: center; gap: .45em; padding: 9px 14px; line-height: 1; border-radius: 999px;
    background: var(--accent); color: var(--on-accent); font-size: var(--fs-sm); font-weight: 500; white-space: nowrap; }
  .sn-scrim { position: fixed; inset: 0; z-index: 40; background: color-mix(in oklab, black 32%, transparent); opacity: 0;
    pointer-events: none; transition: opacity var(--dur) var(--ease); }
  &.is-open .sn-scrim { opacity: 1; pointer-events: auto; }
}
`;

  /* ── markup helpers ── */
  const ITEMS = [['folder', 'Work', ' is-active', '14'], ['copy', 'Writing', '', '32'], ['sparkle', 'Lab', '', '7'], ['user', 'About', '', '']];
  const items = (count = true) => ITEMS.map(([ic, t, s, n]) =>
    `<a class="sn-a${s}" data-tip="${t}">{{icon:${ic}}}<span class="sn-t">${t}</span>${count && n ? `<span class="sn-n">${n}</span>` : ''}</a>`).join('');
  const UTIL = `<a class="sn-a" data-tip="Theme">{{icon:moon}}<span class="sn-t">Dusk mode</span></a>
    <a class="sn-a sn-cta" data-tip="Contact">{{icon:mail}}<span class="sn-t">Contact</span></a>`;
  const HEAD = (extra = '') => `<div class="sn-head"><span class="sn-logo">d&amp;</span><span class="sn-name">cxkw</span>${extra}</div>`;
  const demo = (navHTML, hint, col = false) => `<div class="nd${col ? ' is-col' : ''}">${navHTML}
  <div class="nd-main"><span class="nd-hint">${hint}</span><i class="nd-l l1"></i><i class="nd-l l2"></i><i class="nd-l l3"></i>
    <div class="nd-cards"><i></i><i></i><i></i></div></div></div>`;
  const TL_SHELL = `
.nv { flex: none; flex-direction: row; flex-wrap: nowrap; align-items: stretch; gap: 0; padding: 0; height: 100%; }
.tl-sp { flex: 1; }
.tl-col .ic { transform: rotate(90deg); transition: transform var(--dur) var(--ease); }
.nv:not(.is-open) .tl-col .ic { transform: rotate(-90deg); }
.tl-panel { width: 0; overflow: hidden; transition: width var(--dur) var(--ease); }
.nv.is-open .tl-panel { width: 208px; }
.tl-in { display: flex; flex-direction: column; gap: 1px; width: 208px; padding: calc(var(--u) * 4) 12px; }
.tl-h { display: flex; align-items: baseline; justify-content: space-between; padding: 4px 10px calc(var(--u) * 2); font-size: var(--fs-lg); }
.tl-h b { font-family: 'Outfit', sans-serif; font-weight: 800; letter-spacing: -0.03em; }`;
  const opt = (o, navHTML, hint, col) => ({ round: 4, family: true, basedOn: '#18 Icon rail', ...o, html: demo(navHTML, hint, col), page: navHTML });

  // Sidebar shell shared by the vertical families.
  const SIDE = (w) => `
.nv { flex: none; flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: 2px; width: ${w}; padding: calc(var(--u) * 3) 12px;
  background: var(--surface); }
`;
  // Labels that fade with the width.
  const FADE = (on) => `
.sn-name, .sn-t, .sn-n { opacity: 0; transition: opacity var(--dur) var(--ease); }
${on} .sn-name, ${on} .sn-t, ${on} .sn-n { opacity: 1; }
`;

  /* ── families ── */
  const N1 = `<nav class="nv">
  ${HEAD()}
  <div class="sn-list">${items()}</div>
  <div class="sn-foot">${UTIL}<button class="sn-a sn-tog" data-nav-toggle>{{icon:chevron-down}}<span class="sn-t">Collapse</span></button></div>
</nav>`;

  const N2 = `<nav class="nv">
  ${HEAD()}
  <div class="sn-sec">Site</div>
  <div class="nv-grp is-open">
    <a class="sn-a is-active" data-nav-group>{{icon:folder}}<span class="sn-t">Work</span><span class="sn-chev">{{icon:chevron-down}}</span></a>
    <div class="sn-sub"><div class="sn-sub-in"><a class="sn-s is-active">dawn &amp; dusk</a><a class="sn-s">Dockey</a><a class="sn-s">Insomnia</a><a class="sn-s">Archive</a></div></div>
  </div>
  <div class="nv-grp">
    <a class="sn-a" data-nav-group>{{icon:copy}}<span class="sn-t">Writing</span><span class="sn-chev">{{icon:chevron-down}}</span></a>
    <div class="sn-sub"><div class="sn-sub-in"><a class="sn-s">Essays</a><a class="sn-s">Notes</a><a class="sn-s">Talks</a></div></div>
  </div>
  <div class="nv-grp">
    <a class="sn-a" data-nav-group>{{icon:sparkle}}<span class="sn-t">Lab</span><span class="sn-chev">{{icon:chevron-down}}</span></a>
    <div class="sn-sub"><div class="sn-sub-in"><a class="sn-s">Status</a><a class="sn-s">Experiments</a></div></div>
  </div>
  <a class="sn-a">{{icon:user}}<span class="sn-t">About</span></a>
  <div class="sn-foot">${UTIL}</div>
</nav>`;

  const N3 = `<nav class="nv">
  <div class="sn-bar"><button class="sn-btn" data-nav-toggle>{{icon:menu}}</button><span class="sn-name">cxkw</span>
    <span class="sn-bar-r"><span class="sn-btn">{{icon:search}}</span><a class="sn-pill">Contact</a></span></div>
  <div class="sn-scrim" data-nav-toggle></div>
  <aside class="sn-drawer">
    ${HEAD('<button class="sn-btn sn-close" data-nav-toggle>{{icon:x}}</button>')}
    <div class="sn-list">${items()}</div>
    <div class="sn-foot">${UTIL}</div>
  </aside>
</nav>`;

  const N4 = `<nav class="nv">
  <span class="sn-logo">d&amp;</span>
  <div class="sn-list">
    <a class="sn-a is-active sn-fly-t" data-nav-toggle>{{icon:folder}}</a>
    <a class="sn-a">{{icon:copy}}</a><a class="sn-a">{{icon:sparkle}}</a><a class="sn-a">{{icon:user}}</a>
  </div>
  <div class="sn-foot"><a class="sn-a">{{icon:moon}}</a><a class="sn-a sn-cta">{{icon:mail}}</a></div>
  <div class="sn-fly">
    <div class="sn-fly-h"><b>Work</b><span class="sn-n">14 projects</span></div>
    <a class="sn-s is-active">dawn &amp; dusk</a><a class="sn-s">Dockey</a><a class="sn-s">Insomnia</a>
    <div class="sn-sec">More</div>
    <a class="sn-s">Case studies</a><a class="sn-s">Archive <span class="sn-n">{{icon:arrow-right}}</span></a>
  </div>
</nav>`;

  const N5 = `<nav class="nv">
  ${HEAD()}
  <div class="sn-search">{{icon:search}}<span>Search</span><kbd>⌘K</kbd></div>
  <div class="sn-list">${items()}</div>
  <div class="sn-sec">Pinned</div>
  <a class="sn-a">{{icon:star}}<span class="sn-t">dawn &amp; dusk</span></a>
  <a class="sn-a">{{icon:heart}}<span class="sn-t">Reading list</span></a>
  <div class="sn-prof">
    <div class="sn-menu"><a class="sn-s">{{icon:settings}} Settings</a><a class="sn-s">{{icon:moon}} Dusk mode</a><a class="sn-s">{{icon:logout}} Sign out</a></div>
    <button class="sn-me" data-nav-toggle><span class="sn-av">cx</span><span class="sn-who"><b>cxkw</b><small>cxkw.dev</small></span>{{icon:chevron-down}}</button>
  </div>
</nav>`;

  const N6 = `<nav class="nv is-open">
  ${HEAD('<button class="sn-btn sn-tog" data-nav-toggle>{{icon:chevron-down}}</button>')}
  <div class="sn-list">${items()}</div>
  <div class="sn-foot">${UTIL}</div>
</nav>`;

  const N7 = `<nav class="nv is-open">
  <div class="tl-icons">
    <span class="sn-logo">d&amp;</span>
    <a class="sn-a is-active" data-nav-toggle>{{icon:folder}}</a>
    <a class="sn-a">{{icon:copy}}</a><a class="sn-a">{{icon:sparkle}}</a><a class="sn-a">{{icon:user}}</a>
    <span class="tl-sp"></span>
    <a class="sn-a">{{icon:moon}}</a>
    <a class="sn-a tl-col" data-nav-toggle title="Collapse / expand">{{icon:chevron-down}}</a>
  </div>
  <div class="tl-panel"><div class="tl-in">
    <div class="tl-h"><b>Work</b><span class="sn-n">14</span></div>
    <div class="sn-sec">Featured</div>
    <a class="sn-s is-active">dawn &amp; dusk</a><a class="sn-s">Dockey</a><a class="sn-s">Insomnia</a>
    <div class="sn-sec">By type</div>
    <a class="sn-s">Open source <span class="sn-n">9</span></a><a class="sn-s">Client work <span class="sn-n">3</span></a>
    <a class="sn-s">Experiments <span class="sn-n">12</span></a>
  </div></div>
</nav>`;

  const N8 = `<nav class="nv">
  <div class="sn-bar"><span class="sn-wm">dawn &amp; dusk</span>
    <span class="sn-bar-r"><span class="sn-btn">{{icon:moon}}</span><button class="sn-pill" data-nav-toggle>Menu {{icon:menu}}</button></span></div>
  <div class="sn-scrim" data-nav-toggle></div>
  <aside class="sn-sheet">
    <div class="sn-sheet-h"><span class="sn-n">Index</span><button class="sn-pill" data-nav-toggle>Close {{icon:x}}</button></div>
    <div class="sh-list"><a class="sh-a is-active"><sup>01</sup>Work</a><a class="sh-a"><sup>02</sup>Writing</a><a class="sh-a"><sup>03</sup>Lab</a><a class="sh-a"><sup>04</sup>About</a></div>
    <div class="sn-sheet-f"><span>hello@cxkw.dev</span><span>GitHub ↗</span></div>
  </aside>
</nav>`;

  const N9 = `<nav class="nv">
  <div class="nv-grp ws">
    <button class="ws-btn" data-nav-group><span class="sn-logo">d&amp;</span><span class="ws-t"><b>cxkw.dev</b><small>Personal site</small></span>{{icon:chevron-down}}</button>
    <div class="ws-menu">
      <a class="ws-i is-active"><span class="ws-dot">d&amp;</span>cxkw.dev{{icon:check}}</a>
      <a class="ws-i"><span class="ws-dot">Dk</span>Dockey</a>
      <a class="ws-i"><span class="ws-dot">In</span>Insomnia</a>
      <a class="ws-i ws-new">{{icon:plus}}New workspace</a>
    </div>
  </div>
  <div class="sn-list">
    <a class="sn-a is-active">{{icon:folder}}<span class="sn-t">Work</span><span class="sn-bd">14</span></a>
    <a class="sn-a">{{icon:copy}}<span class="sn-t">Writing</span><span class="sn-bd sn-bd-new">new</span></a>
    <a class="sn-a">{{icon:sparkle}}<span class="sn-t">Lab</span><span class="sn-bd sn-bd-dot"></span></a>
    <a class="sn-a">{{icon:bell}}<span class="sn-t">Inbox</span><span class="sn-bd sn-bd-solid">3</span></a>
    <a class="sn-a">{{icon:user}}<span class="sn-t">About</span></a>
  </div>
  <div class="sn-foot">${UTIL}</div>
</nav>`;

  const N10 = `<nav class="nv">
  <div class="hp">
    ${HEAD('<button class="hp-pin" data-nav-toggle></button>')}
    <div class="sn-list">${items()}</div>
    <div class="sn-foot">${UTIL}</div>
  </div>
</nav>`;

  nav.options.push(
    opt({
      name: 'Icon rail · expands to sidebar',
      note: 'Your rail by default; the chevron at the bottom opens it into a full labelled sidebar and the page reflows',
      layout: 'side',
      css: `${SIDE('64px')}
.nv { gap: 0; overflow: hidden; transition: width var(--dur) var(--ease); }
.nv.is-open { width: 232px; }
${FADE('.nv.is-open')}
.sn-tog .ic { transform: rotate(-90deg); transition: transform var(--dur) var(--ease); }
.nv.is-open .sn-tog .ic { transform: rotate(90deg); }
`,
    }, N1, 'click the chevron (bottom left) to expand'),

    opt({
      name: 'Icon rail · accordion sidebar',
      note: 'Open sidebar; sections fold open to show nested pages, with a guide line and an active tick',
      layout: 'side',
      css: `${SIDE('248px')}
.sn-sub { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur) var(--ease); }
.sn-sub-in { min-height: 0; overflow: hidden; display: flex; flex-direction: column; gap: 1px; margin-left: 20px; padding-left: 10px;
  border-left: 1px solid color-mix(in oklab, var(--text) 12%, transparent); }
.nv-grp.is-open .sn-sub { grid-template-rows: 1fr; }
.nv-grp.is-open .sn-chev { transform: rotate(180deg); }
.sn-s.is-active::before { content: ""; position: absolute; left: -11px; top: 8px; bottom: 8px; width: 2px; border-radius: 2px; background: var(--accent); }
`,
    }, N2, 'click Work · Writing · Lab to fold'),

    opt({
      name: 'Icon rail · off-canvas drawer',
      note: 'Top bar with a menu button; the rail’s items slide in as a drawer over a dimmed page',
      css: `
.nv { display: block; padding: 0; }
.sn-bar .sn-name { font-size: var(--fs-base); }
.sn-drawer { position: fixed; z-index: 41; top: 0; bottom: 0; left: 0; width: min(272px, 86%); display: flex; flex-direction: column; gap: 2px;
  padding: calc(var(--u) * 4) 12px; background: var(--surface); visibility: hidden;
  transform: translateX(-104%); transition: transform var(--dur) var(--ease), visibility 0s linear var(--dur); }
.sn-close { margin-left: auto; }
.nv.is-open .sn-drawer { transform: none; visibility: visible; transition: transform var(--dur) var(--ease);
  box-shadow: 16px 0 48px -16px color-mix(in oklab, black 35%, transparent); }
`,
    }, N3, 'click ☰ to open the drawer', true),

    opt({
      name: 'Icon rail · flyout panel',
      note: 'Rail stays 64px; its active icon opens a panel of sub-pages that floats over the page',
      layout: 'rail',
      css: `${SIDE('64px')}
.nv { position: relative; z-index: 5; align-items: center; }
.sn-logo { margin-bottom: calc(var(--u) * 3); }
.sn-list, .sn-foot { align-items: center; }
.sn-a { width: 40px; padding: 0; justify-content: center; }
.sn-fly-t::after { content: ""; position: absolute; right: 4px; bottom: 4px; border: 3px solid transparent;
  border-right-color: currentColor; border-bottom-color: currentColor; opacity: .55; }
.nv.is-open .sn-fly-t { background: var(--text); color: var(--bg); }
.nv.is-open .sn-fly-t .ic { color: var(--bg); }
.sn-fly { position: absolute; z-index: 6; top: 0; bottom: 0; left: 100%; width: 224px; display: flex; flex-direction: column; gap: 1px;
  padding: calc(var(--u) * 4) 12px; background: var(--surface); border-left: 1px solid color-mix(in oklab, var(--text) 8%, transparent);
  box-shadow: 16px 0 36px -18px color-mix(in oklab, black 35%, transparent);
  opacity: 0; transform: translateX(-8px); pointer-events: none; transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease); }
.nv.is-open .sn-fly { opacity: 1; transform: none; pointer-events: auto; }
.sn-fly-h { display: flex; align-items: baseline; justify-content: space-between; padding: 0 10px calc(var(--u) * 2); font-size: var(--fs-base); }
.sn-fly-h b { font-family: 'Outfit', sans-serif; font-weight: 800; letter-spacing: -0.03em; }
`,
    }, N4, 'click the folder icon'),

    opt({
      name: 'Icon rail · search + profile',
      note: 'Open sidebar with a search field, pinned items and a profile footer that opens its own menu',
      layout: 'side',
      css: `${SIDE('256px')}
.sn-search { display: flex; align-items: center; gap: calc(var(--u) * 2); height: 38px; margin-bottom: calc(var(--u) * 2); padding: 0 10.5px;
  border-radius: var(--r-ctl); background: var(--bg); color: var(--faint); font-size: var(--fs-sm); cursor: text; }
.sn-search span { flex: 1; }
.sn-search kbd { padding: 3px 5px; border-radius: 4px; background: var(--surface-2); font-family: var(--font-mono); font-size: 10px; line-height: 1; color: var(--muted); }
.sn-prof { position: relative; margin-top: auto; padding-top: calc(var(--u) * 3); }
.sn-me { display: flex; align-items: center; gap: calc(var(--u) * 2.5); width: 100%; padding: 8px; border-radius: var(--r-ctl);
  transition: background-color var(--dur) var(--ease); }
.sn-me:hover, .nv.is-open .sn-me { background: var(--surface-2); }
.sn-av { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: var(--on-accent);
  font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 800; letter-spacing: -0.04em; }
.sn-who { display: flex; flex-direction: column; flex: 1; min-width: 0; line-height: 1.25; }
.sn-who b { font-size: var(--fs-sm); font-weight: 600; }
.sn-who small { font-size: 11px; color: var(--faint); }
.sn-me > .ic { color: var(--faint); transform: rotate(180deg); transition: transform var(--dur) var(--ease); }
.nv.is-open .sn-me > .ic { transform: none; }
.sn-menu { position: absolute; left: 0; right: 0; bottom: calc(100% - 6px); display: flex; flex-direction: column; gap: 1px; padding: 6px;
  border-radius: var(--r-box); background: var(--bg); box-shadow: 0 18px 40px -14px color-mix(in oklab, black 30%, transparent);
  opacity: 0; transform: translateY(6px); pointer-events: none; transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease); }
.nv.is-open .sn-menu { opacity: 1; transform: none; pointer-events: auto; }
.sn-menu .ic { color: var(--faint); }
`,
    }, N5, 'click the profile (bottom) for its menu'),

    opt({
      name: 'Icon rail · floating card',
      note: 'Sidebar as a lifted card with margin around it; the chevron folds it back into your rail',
      layout: 'side',
      css: `${SIDE('64px')}
.nv { align-self: flex-start; gap: 0; margin: 12px; overflow: hidden; border-radius: var(--r-lg);
  box-shadow: 0 1px 2px color-mix(in oklab, black 6%, transparent), 0 14px 36px -14px color-mix(in oklab, black 26%, transparent);
  transition: width var(--dur) var(--ease); }
.nv.is-open { width: 232px; }
.sn-head { flex-wrap: wrap; gap: 8px; }
.nv:not(.is-open) .sn-name { display: none; }
.sn-tog { width: 40px; height: 32px; margin-left: auto; }
${FADE('.nv.is-open')}
.sn-tog .ic { transform: rotate(-90deg); transition: transform var(--dur) var(--ease); }
.nv.is-open .sn-tog .ic { transform: rotate(90deg); }
`,
    }, N6, 'click the chevron (top right) to fold'),

    opt({
      name: 'Icon rail · two-level',
      note: 'Icon column for sections plus a column of that section’s pages, both toned from the page; the chevron (or active icon) collapses it',
      layout: 'side',
      css: `${TL_SHELL}
.tl-icons { display: flex; flex-direction: column; align-items: center; gap: 2px; width: 64px; padding: calc(var(--u) * 3) 12px;
  background: color-mix(in oklab, var(--text) 6%, var(--bg)); color: var(--muted); box-shadow: inset -1px 0 0 color-mix(in oklab, var(--text) 7%, transparent); }
.tl-icons .sn-logo { margin-bottom: calc(var(--u) * 3); }
.tl-icons .sn-a { width: 40px; padding: 0; justify-content: center; color: var(--muted); }
.tl-icons .sn-a:hover { background: color-mix(in oklab, var(--text) 7%, transparent); color: var(--text); }
.tl-icons .sn-a.is-active { background: color-mix(in oklab, var(--text) 10%, transparent); color: var(--text); }
.tl-icons .sn-a.is-active .ic { color: var(--text); }
.tl-panel { background: color-mix(in oklab, var(--text) 3%, var(--bg)); box-shadow: inset -1px 0 0 color-mix(in oklab, var(--text) 8%, transparent); }
`,
    }, N7, 'click the chevron (bottom) or the folder icon to collapse'),

    opt({
      name: 'Icon rail · side sheet',
      note: 'One-line wordmark bar; “Menu” opens a full-height ink sheet from the right with big numbered links',
      css: `
.nv { display: block; padding: 0; }
.sn-wm { font-family: 'Outfit', sans-serif; font-size: var(--fs-lg); font-weight: 800; letter-spacing: -0.055em; white-space: nowrap; }
.sn-bar .sn-pill { background: var(--surface-2); color: var(--text); }
.sn-sheet { position: fixed; z-index: 41; top: 0; bottom: 0; right: 0; width: min(420px, 92%); display: flex; flex-direction: column;
  padding: calc(var(--u) * 4) calc(var(--u) * 6); background: var(--text); color: var(--bg); visibility: hidden;
  transform: translateX(104%); transition: transform var(--dur) var(--ease), visibility 0s linear var(--dur); }
.nv.is-open .sn-sheet { transform: none; visibility: visible; transition: transform var(--dur) var(--ease); }
.sn-sheet-h { display: flex; align-items: center; justify-content: space-between; }
.sn-sheet-h .sn-n { color: color-mix(in oklab, var(--bg) 60%, var(--text)); text-transform: uppercase; letter-spacing: .12em; }
.sn-sheet .sn-pill { background: color-mix(in oklab, var(--bg) 14%, transparent); color: var(--bg); }
.sh-list { display: flex; flex-direction: column; margin: auto 0; }
.sh-a { display: flex; align-items: flex-start; gap: .3em; width: fit-content; font-family: 'Outfit', sans-serif; font-size: var(--fs-3xl);
  font-weight: 800; line-height: 1.04; letter-spacing: -0.05em; color: color-mix(in oklab, var(--bg) 50%, var(--text)); cursor: pointer;
  transition: color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.sh-a sup { margin-top: .6em; font-family: var(--font-mono); font-size: 11px; font-weight: 400; letter-spacing: 0; }
.sh-a.is-active, .sh-a:hover { color: var(--bg); }
.sh-a:hover { transform: translateX(6px); }
.sn-sheet-f { display: flex; flex-wrap: wrap; gap: 8px 24px; padding-top: calc(var(--u) * 3);
  border-top: 1px solid color-mix(in oklab, var(--bg) 18%, transparent); font-family: var(--font-mono); font-size: var(--fs-xs);
  color: color-mix(in oklab, var(--bg) 65%, var(--text)); }
`,
    }, N8, 'click Menu to open the sheet', true),

    opt({
      name: 'Icon rail · workspace switcher',
      note: 'Open sidebar headed by a workspace switcher, with micro-caps badges, a status dot and a count',
      layout: 'side',
      css: `${SIDE('256px')}
.ws { position: relative; margin-bottom: calc(var(--u) * 3); }
.ws-btn { display: flex; align-items: center; gap: calc(var(--u) * 2.5); width: 100%; padding: 6px; border-radius: var(--r-ctl);
  transition: background-color var(--dur) var(--ease); }
.ws-btn:hover, .ws.is-open .ws-btn { background: var(--surface-2); }
.ws-btn .sn-logo { width: 34px; height: 34px; font-size: 14px; }
.ws-t { display: flex; flex-direction: column; flex: 1; min-width: 0; line-height: 1.25; }
.ws-t b { font-size: var(--fs-sm); font-weight: 600; }
.ws-t small { font-size: 11px; color: var(--faint); }
.ws-btn > .ic { color: var(--faint); transition: transform var(--dur) var(--ease); }
.ws.is-open .ws-btn > .ic { transform: rotate(180deg); }
.ws-menu { position: absolute; z-index: 5; left: 0; right: 0; top: calc(100% + 4px); display: flex; flex-direction: column; gap: 1px; padding: 6px;
  border-radius: var(--r-box); background: var(--bg); box-shadow: 0 18px 40px -14px color-mix(in oklab, black 30%, transparent);
  opacity: 0; transform: translateY(-6px); pointer-events: none; transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease); }
.ws.is-open .ws-menu { opacity: 1; transform: none; pointer-events: auto; }
.ws-i { display: flex; align-items: center; gap: calc(var(--u) * 2.5); padding: 7px 8px; border-radius: var(--r-ctl); font-size: var(--fs-sm);
  color: var(--text); cursor: pointer; }
.ws-i:hover { background: var(--surface-2); }
.ws-i .ic { margin-left: auto; color: var(--accent); }
.ws-dot { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: 6px; background: var(--surface-2);
  font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 800; letter-spacing: -0.03em; }
.ws-i.is-active .ws-dot { background: var(--text); color: var(--bg); }
.ws-new, .ws-new .ic { color: var(--muted); }
.ws-new .ic { order: -1; margin-left: 0; width: 24px; }
.sn-bd { display: inline-flex; align-items: center; height: 18px; padding: 0 6px; line-height: 1; border-radius: 4px; background: var(--surface-2);
  font-family: var(--font-mono); font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
.sn-bd-new { background: var(--accent); color: var(--on-accent); }
.sn-bd-solid { background: var(--text); color: var(--bg); }
.sn-bd-dot { width: 7px; height: 7px; margin-right: 5px; padding: 0; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 3px var(--ok-soft); }
`,
    }, N9, 'click the workspace (top) to switch'),

    opt({
      name: 'Icon rail · peek + pin',
      note: 'Rail that peeks open over the page on hover; “pin” keeps it open and pushes the page over',
      layout: 'side',
      css: `
.nv { position: relative; z-index: 5; flex: none; display: block; width: 64px; padding: 0; transition: width var(--dur) var(--ease); }
.nv.is-open { width: 232px; }
.hp { position: relative; display: flex; flex-direction: column; gap: 2px; width: 64px; min-height: 100%; padding: calc(var(--u) * 3) 12px;
  overflow: hidden; background: var(--surface); transition: width var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.nv:hover .hp, .nv.is-open .hp { width: 232px; }
.nv:hover:not(.is-open) .hp { box-shadow: 18px 0 40px -18px color-mix(in oklab, black 35%, transparent); }
.sn-name, .sn-t, .sn-n, .hp-pin { opacity: 0; transition: opacity var(--dur) var(--ease); }
:is(.nv:hover, .nv.is-open) :is(.sn-name, .sn-t, .sn-n, .hp-pin) { opacity: 1; }
.hp-pin { margin-left: auto; padding: 5px 8px; border-radius: 999px; background: var(--surface-2); font-family: var(--font-mono); font-size: 10px;
  line-height: 1; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
.hp-pin::after { content: "pin"; }
.nv.is-open .hp-pin { background: var(--text); color: var(--bg); }
.nv.is-open .hp-pin::after { content: "unpin"; }
`,
    }, N10, 'hover the rail to peek · pin to keep it open'),
  );

  // Appended later (append-only): the original ink-column look of #42, kept as its own option.
  DD.byId.nav.options.push(
    opt({
      name: 'Icon rail · two-level · ink column',
      note: 'The original two-level look: solid ink icon column, lighter page column',
      layout: 'side',
      basedOn: '#42 Icon rail · two-level',
      css: `${TL_SHELL}
.tl-icons { display: flex; flex-direction: column; align-items: center; gap: 2px; width: 64px; padding: calc(var(--u) * 3) 12px;
  background: var(--text); color: var(--bg); }
.tl-icons .sn-logo { margin-bottom: calc(var(--u) * 3); background: var(--bg); color: var(--text); }
.tl-icons .sn-a { width: 40px; padding: 0; justify-content: center; color: color-mix(in oklab, var(--bg) 55%, var(--text)); }
.tl-icons .sn-a:hover { background: color-mix(in oklab, var(--bg) 12%, transparent); color: var(--bg); }
.tl-icons .sn-a.is-active, .tl-icons .sn-a.is-active .ic { background: color-mix(in oklab, var(--bg) 18%, transparent); color: var(--bg); }
.tl-icons .sn-a.is-active .ic { background: none; }
.tl-sp { flex: 1; }
.tl-panel { width: 0; overflow: hidden; background: var(--surface); transition: width var(--dur) var(--ease); }
.nv.is-open .tl-panel { width: 208px; }
.tl-in { display: flex; flex-direction: column; gap: 1px; width: 208px; padding: calc(var(--u) * 4) 12px; }
.tl-h { display: flex; align-items: baseline; justify-content: space-between; padding: 4px 10px calc(var(--u) * 2); font-size: var(--fs-lg); }
.tl-h b { font-family: 'Outfit', sans-serif; font-weight: 800; letter-spacing: -0.03em; }
`,
    }, N7, 'click the folder icon to fold the panel'),
  );
})();
