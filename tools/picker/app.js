/* dawn & dusk — design-system picker runtime. Data files call DD.category(); index.html calls DD.boot(). */
(() => {
  const DD = (window.DD = { cats: [], byId: {} });

  const ORDER = ['wordmark', 'palette', 'dusk', 'spectrum', 'status', 'font-display', 'font-body', 'font-mono', 'type-scale', 'headings', 'radius',
    'density', 'depth', 'texture', 'icons', 'motion', 'buttons', 'button-color', 'links', 'inputs', 'dropdowns', 'controls', 'tabs',
    'badges', 'label-color', 'chips', 'tables-simple', 'tables-dense', 'tables', 'cards', 'alerts', 'dialogs', 'nav'];
  const GROUPS = ['Brand', 'Foundations', 'Components'];
  const KEY = 'dawn-and-dusk-picker-v1';
  const HEART = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
  const ICON_FALLBACK = {
    home: '⌂', search: '⌕', settings: '⚙', user: '◯', bell: '◔', heart: '♥', 'arrow-right': '→', 'arrow-up-right': '↗',
    sun: '☀', moon: '☾', check: '✓', x: '×', plus: '+', 'chevron-down': '⌄', trash: '⌫', mail: '✉', star: '★',
    info: 'i', alert: '!', calendar: '▦', folder: '▭', copy: '⧉', external: '↗', menu: '≡', filter: '⧩',
    download: '↓', logout: '⇥', sparkle: '✦',
  };
  const STATUS = {
    dawn: { ok: '#1f8a4c', warn: '#b26b00', bad: '#d0342c', info: '#2563eb' },
    dusk: { ok: '#4ade80', warn: '#fbbf24', bad: '#f87171', info: '#60a5fa' },
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const pad = (n) => String(n).padStart(2, '0');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- state ----------
  const fresh = () => ({ mode: 'dawn', applied: {}, fav: {}, notes: {}, onlyFav: false, onlyNew: false, compMode: 'live', themeUI: true, dock: true, showArchive: false });
  let S = fresh();
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { /* storage unavailable */ }
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* ignore */ }
    queueSync();
  };

  let sorted = [];
  const appliedIdx = (c) => {
    const i = S.applied[c.id];
    return Number.isInteger(i) && i >= 0 && i < c.options.length ? i : c.default || 0;
  };
  const favs = (c) => (S.fav[c.id] || []).filter((i) => i < c.options.length);
  const isFav = (c, i) => favs(c).includes(i);
  const roundOf = (c, o) => o.round || c.round || 1;
  let LATEST = 1;
  const isLatest = (c, o) => LATEST > 1 && roundOf(c, o) === LATEST;
  const newCount = (c) => c.options.filter((o) => isLatest(c, o)).length;
  const latestLabel = () => (LATEST > 2 ? `round ${LATEST}` : 'new');

  // ---------- registry ----------
  DD.category = (c) => {
    c.kind = c.kind || 'component';
    c.options = c.options || [];
    DD.cats.push(c);
    DD.byId[c.id] = c;
  };

  // ---------- tokens ----------
  const mix = (a, pct, b) => `color-mix(in oklab, ${a} ${pct}%, ${b})`;
  DD.paletteVars = (p, mode) => {
    const s = { ...STATUS[mode], ...(p.status || {}) };
    return {
      '--bg': p.bg, '--surface': p.surface, '--surface-2': p.surface2, '--border': p.border,
      '--border-strong': mix(p.text, 32, p.bg), '--text': p.text, '--muted': p.muted, '--faint': mix(p.muted, 55, p.bg),
      '--accent': p.accent, '--accent-hover': mix(p.accent, 84, p.text), '--accent-soft': mix(p.accent, 14, p.bg),
      '--on-accent': p.onAccent, '--ring': mix(p.accent, 45, 'transparent'),
      '--ok': s.ok, '--warn': s.warn, '--bad': s.bad, '--info': s.info,
      '--ok-soft': mix(s.ok, 14, p.bg), '--warn-soft': mix(s.warn, 16, p.bg),
      '--bad-soft': mix(s.bad, 14, p.bg), '--info-soft': mix(s.info, 14, p.bg),
      '--tone-1': p.tones?.[0] || mix(p.accent, 55, p.bg), '--tone-2': p.tones?.[1] || mix(p.accent, 28, p.surface2),
      '--tone-3': p.tones?.[2] || p.surface2,
    };
  };
  const varsOf = (c, o) => (c.kind === 'tokens' ? (c.toVars ? c.toVars(o) : o.vars) || {} : {});
  const styleOf = (v) => Object.entries(v).map(([k, x]) => `${k}:${x}`).join(';');
  DD.style = (v) => esc(styleOf(v));

  // The Dusk category can replace every palette's dark side; option #01 (no `p`) keeps the palette's own.
  const duskOf = (p) => {
    const d = DD.byId.dusk;
    return (d && d.options[appliedIdx(d)]?.p) || p.dusk;
  };
  DD.currentPalette = () => DD.byId.palette.options[appliedIdx(DD.byId.palette)];
  DD.duskOrDawn = (p, mode) => (mode === 'dawn' ? p.dawn : duskOf(p));
  // Color set: dawn values as given; dusk nudges lightness into a 0.62–0.82 band (deep colours lift, pastels don't blow out).
  DD.spectrumVars = (o, mode) => Object.fromEntries(o.colors.map((c, i) => [`--sp-${i + 1}`,
    mode === 'dawn' ? c : (o.dusk?.[i] || `oklch(from ${c} clamp(0.62, l + 0.06, 0.82) calc(c * 0.88) h)`)]));
  // Status colors: override the palette's ok/warn/bad/info (+ soft tints). Dusk lifts them for dark grounds.
  DD.statusVars = (o, mode) => {
    if (!o?.s) return {};
    const v = {};
    const soft = { ok: 14, warn: 16, bad: 14, info: 14 };
    for (const [k, c0] of Object.entries(o.s)) {
      const c = mode === 'dawn' ? c0 : `oklch(from ${c0} clamp(0.68, l + 0.16, 0.84) calc(c * 0.9) h)`;
      v[`--${k}`] = c;
      v[`--${k}-soft`] = `color-mix(in oklab, ${c} ${soft[k]}%, var(--bg))`;
    }
    return v;
  };
  const statusOf = (mode) => {
    const c = DD.byId.status;
    return c ? DD.statusVars(c.options[appliedIdx(c)], mode) : {};
  };
  const spectrumOpt = () => DD.byId.spectrum.options[appliedIdx(DD.byId.spectrum)];
  const spectrumOf = (mode) => {
    const c = DD.byId.spectrum;
    return c ? DD.spectrumVars(c.options[appliedIdx(c)], mode) : {};
  };
  DD.spectrumOf = spectrumOf;

  function tokenCSS() {
    const shared = {};
    for (const c of DD.cats) if (c.kind === 'tokens') Object.assign(shared, varsOf(c, c.options[appliedIdx(c)]));
    const pal = DD.byId.palette;
    const p = pal && pal.options[appliedIdx(pal)];
    let css = '';
    if (p) {
      css += `html[data-mode="dawn"], html[data-mode="dawn"] .dd-scope, .dd-scope.fixed-dawn.fixed-dawn{${styleOf({ ...DD.paletteVars(p.dawn, 'dawn'), ...spectrumOf('dawn'), ...statusOf('dawn') })}}\n`;
      css += `html[data-mode="dusk"], html[data-mode="dusk"] .dd-scope, .dd-scope.fixed-dusk.fixed-dusk{${styleOf({ ...DD.paletteVars(duskOf(p), 'dusk'), ...spectrumOf('dusk'), ...statusOf('dusk') })}}\n`;
    }
    // Higher specificity than the palette rules so foundations (e.g. a brutalist depth) can override colors.
    css += `html, html .dd-scope.dd-scope.dd-scope.dd-scope{${styleOf(shared)}}\n`;
    // Some dusk designs (recessed cards) must win over depth's surface overrides, in dusk only.
    const dk = DD.byId.dusk;
    const force = dk && dk.options[appliedIdx(dk)]?.force;
    if (force) css += `html[data-mode="dusk"].ui-themed, html[data-mode="dusk"] .dd-scope.dd-scope.dd-scope.dd-scope.dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk.fixed-dusk.fixed-dusk.fixed-dusk.fixed-dusk{${styleOf(force)}}\n`;
    return css;
  }

  // Native nesting can't hold @keyframes/@property/@font-face — hoist them to top level.
  function hoist(css, out) {
    let rest = '';
    let i = 0;
    const re = /@(keyframes|-webkit-keyframes|property|font-face)\b/g;
    let m;
    while ((m = re.exec(css))) {
      const open = css.indexOf('{', m.index);
      if (open < 0) break;
      let depth = 0;
      let j = open;
      for (; j < css.length; j++) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}' && --depth === 0) break;
      }
      rest += css.slice(i, m.index);
      out.push(css.slice(m.index, j + 1));
      i = j + 1;
      re.lastIndex = i;
    }
    return rest + css.slice(i);
  }

  function catCSS() {
    const top = [];
    let body = '';
    for (const c of DD.cats) {
      const base = `.spec[data-cat="${c.id}"]`;
      if (c.css) body += `${base}{${hoist(c.css, top)}}\n`;
      c.options.forEach((o, i) => {
        if (o.css) body += `${base}[data-v="${i}"]{${hoist(o.css, top)}}\n`;
      });
    }
    return top.join('\n') + '\n' + body;
  }

  // ---------- icons ----------
  function iconSet() {
    const c = DD.byId.icons;
    return c && c.options.length ? c.options[appliedIdx(c)].icons : null;
  }
  DD.icon = (n, set = iconSet()) => {
    const svg = set && set[n];
    return `<i class="ic" data-icon="${n}">${svg || `<b>${ICON_FALLBACK[n] || '•'}</b>`}</i>`;
  };
  const withIcons = (h) => (h || '').replace(/\{\{icon:([\w-]+)\}\}/g, (_, n) => DD.icon(n));

  const ICON_DEMO = ['home', 'search', 'settings', 'user', 'bell', 'heart', 'sun', 'moon', 'mail', 'calendar',
    'folder', 'star', 'copy', 'trash', 'filter', 'download', 'arrow-up-right', 'sparkle'];
  const iconsPreview = (o) => `<div class="pv-icons">${ICON_DEMO.map((n) => DD.icon(n, o.icons)).join('')}</div>
    <div class="pv-icons-row"><span class="pv-icons-btn">${DD.icon('plus', o.icons)} New project</span>
    <span class="pv-icons-link">Open ${DD.icon('external', o.icons)}</span></div>`;

  // ---------- rendering ----------
  function specHTML(c, o, i) {
    let inner;
    if (c.kind === 'component') inner = withIcons(o.html ?? c.html);
    else if (c.kind === 'icons') inner = iconsPreview(o);
    else inner = withIcons(c.preview ? c.preview(o, i) : '');
    return `<div class="spec" data-cat="${c.id}" data-v="${i}">${inner}</div>`;
  }
  const stageVars = (c, o) => {
    if (c.kind === 'palette') return { ...DD.paletteVars(o[S.mode], S.mode), ...spectrumOf(S.mode), ...statusOf(S.mode) };
    if (c.kind === 'status') return { ...DD.paletteVars(DD.duskOrDawn(DD.currentPalette(), S.mode), S.mode), ...spectrumOf(S.mode), ...DD.statusVars(o, S.mode) };
    if (c.kind === 'spectrum') return { ...DD.paletteVars(DD.duskOrDawn(DD.currentPalette(), S.mode), S.mode), ...DD.spectrumVars(o, S.mode) };
    if (c.kind === 'dusk') {
      const pal = DD.byId.palette;
      return DD.paletteVars(o.p || pal.options[appliedIdx(pal)].dusk, 'dusk');
    }
    return varsOf(c, o);
  };

  function cardHTML(c, o, i) {
    const ap = appliedIdx(c) === i;
    const fv = isFav(c, i);
    const old = LATEST > 1 && !isLatest(c, o) && !ap && !fv;
    return `<article class="opt${ap ? ' is-applied' : ''}${fv ? ' is-fav' : ''}${isLatest(c, o) ? ' is-latest' : ''}${old ? ' is-archived' : ''}" data-cat="${c.id}" data-i="${i}">
      <header class="opt-head"><span class="opt-num">${pad(i + 1)}</span><span class="opt-name">${esc(o.slot && DD.byId.spectrum ? `${o.name} · ${spectrumOpt().names[o.slot - 1]}` : o.name)}</span>${isLatest(c, o) ? `<span class="opt-new">${latestLabel()}</span>` : ''}
        <span class="opt-tag">applied</span>
        ${c.kind === 'spectrum' && ap ? '<button class="opt-use" type="button" data-use-set title="Point Button color and Label color at this set">Use for buttons + labels</button>' : ''}
        <button class="opt-heart" type="button" aria-pressed="${fv}" title="Shortlist">${HEART}</button></header>
      <div class="stage dd-scope" style="${DD.style(stageVars(c, o))}">${specHTML(c, o, i)}</div>
      ${o.note || o.basedOn ? `<p class="opt-note">${o.basedOn ? `<span class="opt-based">from ${esc(o.basedOn)} · </span>` : ''}${esc(o.note || '')}</p>` : ''}
    </article>`;
  }

  function sectionHTML(c, n) {
    return `<section class="ui-sec${newCount(c) ? ' has-new' : ''}" id="${c.id}">
      <div class="ui-sec-head">
        <div><p class="ui-eyebrow">${esc(c.group)} · ${pad(n)}</p><h2 class="ui-h2">${esc(c.title)}</h2>
          <p class="ui-blurb">${esc(c.blurb || '')}</p></div>
        <div class="ui-sec-meta"><span>${c.options.length} options${newCount(c) ? ` · <b class="ui-new">${newCount(c)} ${latestLabel()}</b>` : ''}</span><span class="ui-favcount" data-favcount="${c.id}"></span></div>
      </div>
      <textarea class="ui-notes" data-notes="${c.id}" rows="1" placeholder="Tune notes for ${esc(c.title.toLowerCase())} — e.g. “#3 but warmer”, “#5 + #8 hybrid”, “less contrast”">${esc(S.notes[c.id] || '')}</textarea>
      <div class="ui-grid${c.wide ? ' is-wide' : ''}" data-grid="${c.id}">${c.options.map((o, i) => cardHTML(c, o, i)).join('')}</div>
      <p class="ui-empty">Nothing shortlisted here yet.</p>
      ${LATEST > 1 && !newCount(c) ? `<p class="ui-locked">Locked to your pick — no round ${LATEST} variations here. Turn on “Show older rounds” to change it.</p>` : ''}
    </section>`;
  }

  function piece(id, swaps) {
    const c = DD.byId[id];
    if (!c || !c.options.length) return '';
    const i = appliedIdx(c);
    const o = c.options[i];
    // Specimens fake hover with .is-hover; on the real page only real :hover should apply.
    let h = (o.page ?? (o.family ? c.html : o.html ?? c.html)).replace(/\s?\bis-hover\b/g, '');
    for (const [a, b] of swaps || []) h = h.split(a).join(b);
    if (id === 'nav' && S.navCollapsed) h = h.replace(/(<nav class="nv[^"]*?)\s+is-open/, '$1');
    return `<div class="spec cp-${id}" data-cat="${id}" data-v="${i}">${withIcons(h)}</div>`;
  }

  // Same card markup, different content, so the work grid reads like a real page.
  const CARD = (num, kind, title, kpi, kpiL, text, meta) => [
    ['<span class="c-num">01</span>', `<span class="c-num">${num}</span>`], ['Case study', kind],
    ['A calmer inbox for <em>busy</em> mornings', title], ['−42%', kpi], ['time spent in the inbox', kpiL],
    ['Triage rebuilt around two moods: dawn for planning, dusk for clearing out.', text], ['6 min read', meta],
  ];
  const CARDS = [
    CARD('02', 'Open source', 'Dockey — Docker, <em>natively</em>', '1.2k', 'stars on GitHub',
      'A native macOS companion for the local Docker engine, built with SwiftUI.', 'Swift · macOS'),
    CARD('03', 'Utility', 'Insomnia, but <em>kind</em>', '0', 'unplanned sleeps',
      'A tiny menu-bar alternative to caffeinate that knows when to let go.', 'macOS · menu bar'),
  ];
  const secHead = (n, title, more) => `<header class="cp-sh"><span class="cp-idx mono">${n}</span><h2 class="dd-h cp-h2">${title}</h2>
    ${more ? `<a class="cp-more">${more} ${DD.icon('arrow-right')}</a>` : ''}</header>`;

  let cpModal = false;

  function compositeHTML(mode) {
    const tag = mode ? `${mode === 'dawn' ? '☀ dawn' : '☾ dusk'} · ` : '';
    const nav = DD.byId.nav;
    const rail = nav && ['rail', 'side'].includes(nav.options[appliedIdx(nav)]?.layout);
    return `<div class="dd-scope cp${rail ? ' has-rail' : ''}${mode ? ` fixed-${mode}` : ''}">
      <div class="cp-top">${piece('nav')}</div>
      <section class="cp-hero">
        <div class="cp-hero-copy">
          <p class="cp-eyebrow mono">${tag}Engineer · writing &amp; small tools</p>
          <h1 class="dd-h cp-h1">Build <em>quietly</em>, ship at dusk.</h1>
          ${piece('links')}
          ${piece('buttons')}
        </div>
        <div class="cp-art" aria-hidden="true"><i class="cp-arch"></i><i class="cp-sun"></i><i class="cp-hill"></i></div>
      </section>
      <section class="cp-sec">${secHead('01', 'Selected work', 'All projects')}
        <div class="cp-cards">${piece('cards')}${piece('cards', CARDS[0])}${piece('cards', CARDS[1])}</div></section>
      <section class="cp-sec">${secHead('02', 'Open source', 'GitHub')}${piece('chips')}${piece('tabs')}${piece('tables-simple')}</section>
      <section class="cp-sec">${secHead('03', 'The lab', 'Status page')}
        <p class="cp-lead muted">Everything I self-host, live. Degraded services float to the top of my morning.</p>
        ${piece('tables-dense')}
        <div class="cp-lab"><div class="cp-aside"><p class="cp-label mono">Recent events</p>${piece('alerts')}</div>
          <div class="cp-aside"><p class="cp-label mono">Labels</p>${piece('badges')}</div></div></section>
      <section class="cp-sec cp-contact">
        <div class="cp-contact-copy">${secHead('04', 'Say hello')}<p class="cp-lead">I answer within a day — usually at dusk.</p>
          <p class="cp-small mono muted">hello@cxkw.dev</p></div>
        <div class="cp-form">${piece('inputs')}${piece('dropdowns')}${piece('controls')}</div>
      </section>
      <footer class="cp-foot">${piece('wordmark')}<nav class="cp-foot-links"><span>Work</span><span>Writing</span><span>Lab</span><span>About</span></nav>
        <span class="mono muted cp-copy">© 2026 cxkw.dev</span></footer>
      <div class="cp-modal"${cpModal ? '' : ' hidden'}><div class="cp-modal-in">${piece('dialogs')}</div></div>
    </div>`;
  }

  // ---------- live preview dock: the same page, always visible, scaled to fit ----------
  const DOCK_W = 1200;
  function renderDock() {
    const d = $('#dock-wrap');
    if (d && S.dock !== false) d.innerHTML = compositeHTML('');
  }
  function fitDock() {
    const body = $('.ui-dock-body');
    const z = $('.ui-dock-zoom');
    if (!body || !z || !body.clientWidth) return;
    const zoom = body.clientWidth / DOCK_W;
    z.style.zoom = String(zoom);
    // Viewport height in the page's own (unzoomed) pixels, so a side nav can span top to bottom of the panel.
    $('#dock-wrap')?.style.setProperty('--cp-vh', `${body.clientHeight / zoom}px`);
  }
  function focusDock(id) {
    const body = $('.ui-dock-body');
    const el = body && body.querySelector(`.cp-${id}`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const b = body.getBoundingClientRect();
    if (r.top < b.top + 40 || r.bottom > b.bottom - 40) body.scrollBy({ top: r.top - b.top - b.height / 4, behavior: 'smooth' });
    el.classList.remove('cp-flash');
    void el.offsetWidth;
    el.classList.add('cp-flash');
  }
  function setDock(on) {
    S.dock = on;
    save();
    $('.ui-shell')?.classList.toggle('has-dock', on);
    $$('[data-dock]').forEach((b) => b.classList.toggle('is-on', on));
    if (on) { renderDock(); requestAnimationFrame(fitDock); }
  }

  function renderComposite() {
    renderDock();
    const w = $('#cp-wrap');
    if (!w) return;
    w.className = `cp-wrap${S.compMode === 'both' ? ' is-both' : ''}`;
    w.innerHTML = S.compMode === 'both' ? compositeHTML('dawn') + compositeHTML('dusk') : compositeHTML('');
    $$('[data-cm]').forEach((b) => b.classList.toggle('is-on', b.dataset.cm === S.compMode));
    $$('[data-cpmodal]').forEach((b) => b.classList.toggle('is-on', cpModal));
  }

  function setModal(on) {
    cpModal = on;
    $$('.cp-modal').forEach((m) => (m.hidden = !on));
    $$('[data-cpmodal]').forEach((b) => b.classList.toggle('is-on', on));
  }

  function setFull(on) {
    const sec = $('#composite');
    if (!sec) return;
    sec.classList.toggle('is-full', on);
    document.body.classList.toggle('cp-locked', on);
    if (on) sec.scrollTop = 0;
  }

  // ---------- sync picks to the artifact's db so Claude can read them ----------
  let remote = null;
  let syncTimer = 0;
  let syncing = false;
  let lastSent = '';

  function setSync(state) {
    const el = $('#ui-sync');
    if (!el) return;
    el.hidden = false;
    el.dataset.state = state;
    el.textContent = { on: '● Claude can see your picks', saving: '● syncing…', off: '○ sync off — use Export' }[state];
  }

  function picksPayload() {
    const picks = {};
    for (const c of sorted) {
      const ap = appliedIdx(c);
      picks[c.id] = {
        title: c.title,
        applied: `#${pad(ap + 1)} ${c.options[ap].name}`,
        shortlist: favs(c).map((i) => `#${pad(i + 1)} ${c.options[i].name}`),
        notes: (S.notes[c.id] || '').trim(),
      };
    }
    return { mode: S.mode, picks };
  }

  function queueSync() {
    if (!remote) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(pushSync, 1200);
  }

  async function pushSync() {
    if (!remote) return;
    if (syncing) return queueSync();
    const body = picksPayload();
    const key = JSON.stringify(body);
    if (key === lastSent) return;
    syncing = true;
    setSync('saving');
    try {
      await remote.set({ ...body, updatedAt: new Date().toISOString() });
      lastSent = key;
      setSync('on');
    } catch (e) {
      setSync('off');
      if (e && e.code !== 'unavailable') remote = null;
    } finally {
      syncing = false;
    }
  }

  async function connectSync() {
    if (typeof window.claude?.use !== 'function') return;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      const id = db && user ? await user.id() : null;
      if (!id) return;
      remote = db.doc(`picks/${String(id).replace(/[^A-Za-z0-9_\-.~:@+]/g, '_')}`);
      pushSync();
    } catch {
      setSync('off');
    }
  }

  function sideHTML() {
    const link = (c) => `<a class="ui-side-a" data-go="${c.id}"><span><span>${esc(c.title)}${newCount(c) ? ` <b class="ui-new">${latestLabel()}</b>` : ''}</span><small data-sideap="${c.id}"></small></span><span class="ui-side-n" data-sidefav="${c.id}"></span></a>`;
    return GROUPS.map((g) => {
      const cs = sorted.filter((c) => c.group === g);
      return cs.length ? `<div class="ui-side-g"><p class="ui-side-h">${g}</p>${cs.map(link).join('')}</div>` : '';
    }).join('') + `<div class="ui-side-g"><p class="ui-side-h">Result</p><a class="ui-side-a" data-go="composite"><span>Composite preview</span></a></div>`;
  }

  function updateMeta() {
    let total = 0;
    for (const c of sorted) {
      const n = favs(c).length;
      total += n;
      const ap = $(`[data-sideap="${c.id}"]`);
      if (ap) ap.textContent = c.options[appliedIdx(c)]?.name || '';
      const sf = $(`[data-sidefav="${c.id}"]`);
      if (sf) sf.textContent = n ? `♥ ${n}` : '';
      const fc = $(`[data-favcount="${c.id}"]`);
      if (fc) fc.textContent = n ? `♥ ${n} shortlisted` : '';
      const sec = document.getElementById(c.id);
      if (sec) sec.classList.toggle('has-fav', n > 0);
    }
    const t = $('#ui-total');
    if (t) t.textContent = total;
  }

  function renderMain() {
    const nOpts = sorted.reduce((a, c) => a + c.options.length, 0);
    $('#main').innerHTML = `<section class="ui-intro">
        <p class="ui-eyebrow">cxkw.dev · design system · round 1</p>
        <h1 class="ui-h1">dawn &amp; dusk</h1>
        <p class="ui-lead">${sorted.length} categories · ${nOpts} options. Nothing here is decided — you pick, then we tune.</p>
        <ol class="ui-how">
          <li><b>Click a card to try it on.</b> It becomes <i>applied</i> and flows into every other preview — palette, fonts, radius, depth, icons all compose live.</li>
          <li><b>♥ to shortlist</b> as many as you like per category (hybrids welcome).</li>
          <li><b>Write tune notes</b> in the dashed box under each title.</li>
          <li><b>Export picks</b> (top right) and paste it back to Claude for round 2.</li>
        </ol>
        <p class="ui-lead">Flip <b>Dawn / Dusk</b> at the top — every option is drawn from tokens, so it works in both.</p>
      </section>
      ${sorted.map((c, n) => sectionHTML(c, n + 1)).join('')}
      <section class="ui-sec" id="composite">
        <div class="ui-sec-head">
          <div><p class="ui-eyebrow">Result</p><h2 class="ui-h2">Composite preview</h2>
            <p class="ui-blurb">Your applied picks as one real page — cxkw.dev built from dawn &amp; dusk. Go full screen and scroll it like a visitor.</p></div>
          <div class="ui-cp-tools">
            <div class="ui-seg"><button type="button" data-cm="live">Current mode</button><button type="button" data-cm="both">Dawn + Dusk</button></div>
            <button type="button" class="ui-btn" data-cpmodal>Open modal</button>
            <button type="button" class="ui-btn ui-btn-primary" data-cpfull>Full screen ⤢</button>
          </div>
        </div>
        <div class="cp-frame"><div class="cp-chrome"><i></i><i></i><i></i><span class="cp-url">cxkw.dev</span></div>
          <div id="cp-wrap" class="cp-wrap"></div></div>
        <button type="button" class="cp-exit" data-cpfull aria-label="Exit full screen">Exit full screen ✕</button>
      </section>`;
    renderComposite();
    updateMeta();
    $$('.ui-notes').forEach(grow);
  }

  function rerenderGrid(id) {
    const c = DD.byId[id];
    const g = c && $(`[data-grid="${id}"]`);
    if (g) g.innerHTML = c.options.map((o, i) => cardHTML(c, o, i)).join('');
  }

  // ---------- actions ----------
  function apply(id, i) {
    const c = DD.byId[id];
    if (!c || appliedIdx(c) === i) return;
    S.applied[id] = i;
    // A Dusk design overrides every palette's dark side, which hid palette changes in dusk mode.
    // Picking a palette always shows that palette, so clear the override and say so.
    const dk = DD.byId.dusk;
    if (c.kind === 'palette' && dk && appliedIdx(dk) !== 0) {
      const was = dk.options[appliedIdx(dk)].name;
      S.applied.dusk = 0;
      toast(`Showing ${c.options[i].name} in dawn and its own dusk. “${was}” dusk was cleared — pick a Dusk design again to override.`);
    }
    save();
    $$(`.opt[data-cat="${id}"]`).forEach((el) => el.classList.toggle('is-applied', +el.dataset.i === i));
    if (['tokens', 'palette', 'dusk', 'spectrum', 'status'].includes(c.kind)) $('#dd-tokens').textContent = tokenCSS();
    if (c.kind === 'palette' || c.kind === 'dusk') ['dusk', 'spectrum', 'status'].forEach(rerenderGrid);
    if (c.kind === 'spectrum') {
      linkSet();
      ['spectrum', 'status', 'button-color', 'label-color'].forEach(rerenderGrid);
    }
    // A hand-picked button/label colour stops the Color set from overriding it.
    if (id === 'button-color') S.btnManual = !c.options[i].slot;
    if (id === 'label-color') S.lblManual = i === 0;
    if (c.kind === 'icons') renderMain();
    else renderComposite();
    updateMeta();
    focusDock(id);
  }

  // Picking a Color set also colours primary buttons (slot 1) and labels (set-tinted), unless the user
  // hand-picked a non-set Button color / Label color.
  function linkSet() {
    const bc = DD.byId['button-color'];
    const lcat = DD.byId['label-color'];
    if (!bc || !lcat || !DD.byId.spectrum) return false;
    const did = [];
    if (!S.btnManual && !bc.options[appliedIdx(bc)].slot) {
      S.applied['button-color'] = bc.options.findIndex((o) => o.slot === 1);
      did.push(`buttons → ${spectrumOpt().names[0]}`);
    }
    if (!S.lblManual && appliedIdx(lcat) === 0) {
      S.applied['label-color'] = lcat.options.findIndex((o) => o.tinted);
      did.push('labels → set-tinted');
    }
    if (!did.length) return false;
    save();
    $('#dd-tokens').textContent = tokenCSS();
    ['button-color', 'label-color'].forEach(rerenderGrid);
    renderComposite();
    updateMeta();
    toast(`${spectrumOpt().name} now colours chips, ${did.join(', ')}. Change either in Button color / Label color.`);
    return true;
  }

  function toggleFav(id, i) {
    const c = DD.byId[id];
    const f = favs(c);
    S.fav[id] = f.includes(i) ? f.filter((x) => x !== i) : [...f, i];
    save();
    const el = $(`.opt[data-cat="${id}"][data-i="${i}"]`);
    if (el) {
      el.classList.toggle('is-fav', S.fav[id].includes(i));
      $('.opt-heart', el).setAttribute('aria-pressed', S.fav[id].includes(i));
    }
    updateMeta();
  }

  function setMode(m) {
    S.mode = m;
    save();
    document.documentElement.dataset.mode = m;
    $$('[data-mode-btn]').forEach((b) => b.classList.toggle('is-on', b.dataset.modeBtn === m));
    rerenderGrid('palette');
    rerenderGrid('spectrum');
    rerenderGrid('status');
  }

  function shuffle() {
    for (const c of DD.cats) S.applied[c.id] = Math.floor(Math.random() * c.options.length);
    save();
    $('#dd-tokens').textContent = tokenCSS();
    renderMain();
  }

  function exportText() {
    const lines = [`dawn & dusk — picks (${new Date().toISOString().slice(0, 10)}, viewed in ${S.mode})`, ''];
    for (const c of sorted) {
      const ap = appliedIdx(c);
      const f = favs(c);
      lines.push(`[${c.title}]`);
      lines.push(`  applied:   #${pad(ap + 1)} ${c.options[ap].name}`);
      if (f.length) lines.push(`  shortlist: ${f.map((i) => `#${pad(i + 1)} ${c.options[i].name}`).join(', ')}`);
      if ((S.notes[c.id] || '').trim()) lines.push(`  notes:     ${S.notes[c.id].trim().replace(/\n+/g, ' / ')}`);
    }
    return lines.join('\n');
  }

  let toastTimer = 0;
  function toast(msg) {
    const el = $('#ui-toast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.hidden = true), 5200);
  }

  function grow(t) {
    t.style.height = 'auto';
    t.style.height = `${t.scrollHeight + 2}px`;
  }

  function go(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function wire() {
    document.addEventListener('click', (e) => {
      const t = e.target;
      const goEl = t.closest('[data-go]');
      if (goEl) return go(goEl.dataset.go);
      const modeBtn = t.closest('[data-mode-btn]');
      if (modeBtn) return setMode(modeBtn.dataset.modeBtn);
      const cm = t.closest('[data-cm]');
      if (cm) { S.compMode = cm.dataset.cm; save(); return renderComposite(); }
      const trig = t.closest('.cp .dd-trigger');
      if (trig) return trig.closest('.dd').classList.toggle('is-open');
      if (t.closest('.cp .dd-item')) return t.closest('.dd').classList.remove('is-open');
      if (t.closest('[data-cpfull]')) return setFull(!$('#composite').classList.contains('is-full'));
      if (t.closest('[data-cpmodal]')) return setModal(!cpModal);
      if (t.closest('.cp-modal .dg-scrim, .cp-modal .dg-x, .cp-modal .dg-btn')) return setModal(false);
      if (t.closest('[data-use-set]')) {
        const bc = DD.byId['button-color'];
        const lcat = DD.byId['label-color'];
        const bi = bc.options.findIndex((o) => o.slot === 1);
        const li = lcat.options.findIndex((o) => o.mapped);
        apply('button-color', bi);
        apply('label-color', li);
        rerenderGrid('button-color');
        rerenderGrid('label-color');
        return toast(`Buttons now use ${spectrumOpt().names[0]} (slot 1) and labels use ${spectrumOpt().name}. Fine-tune in Button color and Label color.`);
      }
      const heart = t.closest('.opt-heart');
      if (heart) {
        const card = heart.closest('.opt');
        return toggleFav(card.dataset.cat, +card.dataset.i);
      }
      const ctl = t.closest('.spec .sw, .spec .cb, .spec .rd');
      if (ctl) ctl.classList.toggle('is-on');
      const card = t.closest('.opt');
      if (card) return apply(card.dataset.cat, +card.dataset.i);
      if (t.closest('[data-shuffle]')) return shuffle();
      if (t.closest('[data-dock]')) return setDock(S.dock === false);
      if (t.closest('[data-themeui]')) {
        S.themeUI = !S.themeUI;
        save();
        return applyThemeUI();
      }
      if (t.closest('[data-onlynew]')) {
        S.showArchive = !S.showArchive;
        save();
        document.body.classList.toggle('show-archive', S.showArchive);
        return t.closest('[data-onlynew]').classList.toggle('is-on', S.showArchive);
      }
      const navT = t.closest('.spec [data-nav-toggle]');
      if (navT) navT.closest('.nv')?.classList.toggle('is-open');
      const navG = t.closest('.spec [data-nav-group]');
      if (navG) navG.closest('.nv-grp')?.classList.toggle('is-open');
      if (navT && t.closest('.cp')) {
        // Remember collapse on the live page so re-renders (and both previews) keep it.
        S.navCollapsed = !navT.closest('.nv')?.classList.contains('is-open');
        save();
        return renderComposite();
      }
      if (navG && t.closest('.cp')) return;
      if (t.closest('[data-onlyfav]')) {
        S.onlyFav = !S.onlyFav;
        save();
        document.body.classList.toggle('only-fav', S.onlyFav);
        return t.closest('[data-onlyfav]').classList.toggle('is-on', S.onlyFav);
      }
      if (t.closest('[data-export]')) {
        $('#ui-export-text').value = exportText();
        $('#ui-export').hidden = false;
        return;
      }
      if (t.closest('[data-close]') || t.id === 'ui-export') {
        $('#ui-export').hidden = true;
        return;
      }
      const copy = t.closest('[data-copy]');
      if (copy) {
        const txt = $('#ui-export-text');
        txt.select();
        const done = () => { copy.textContent = 'Copied ✓'; setTimeout(() => (copy.textContent = 'Copy'), 1600); };
        try {
          navigator.clipboard.writeText(txt.value).then(done, () => { copy.textContent = 'Select all + ⌘C'; });
        } catch { copy.textContent = 'Select all + ⌘C'; }
        return;
      }
      const reset = t.closest('[data-reset]');
      if (reset) {
        if (reset.dataset.armed) {
          S = fresh();
          save();
          location.reload();
        } else {
          reset.dataset.armed = '1';
          reset.textContent = 'Click again to reset everything';
        }
      }
    });
    document.addEventListener('input', (e) => {
      const t = e.target;
      if (t.matches('[data-notes]')) {
        S.notes[t.dataset.notes] = t.value;
        save();
        grow(t);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      $('#ui-export').hidden = true;
      if (cpModal) setModal(false);
      else setFull(false);
    });
  }

  function applyThemeUI() {
    document.documentElement.classList.toggle('ui-themed', S.themeUI !== false);
    const b = $('[data-themeui]');
    if (b) b.textContent = S.themeUI !== false ? 'Page: your theme' : 'Page: neutral';
  }

  DD.boot = () => {
    const rank = (c) => (ORDER.includes(c.id) ? ORDER.indexOf(c.id) : 999);
    sorted = DD.cats.filter((c) => !c.hidden).sort((a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) || rank(a) - rank(b));
    document.documentElement.dataset.mode = S.mode;
    applyThemeUI();
    $('.ui-shell')?.classList.toggle('has-dock', S.dock !== false);
    $$('[data-dock]').forEach((b) => b.classList.toggle('is-on', S.dock !== false));
    if (window.ResizeObserver && $('.ui-dock-body')) new ResizeObserver(fitDock).observe($('.ui-dock-body'));
    $$('[data-mode-btn]').forEach((b) => b.classList.toggle('is-on', b.dataset.modeBtn === S.mode));
    LATEST = Math.max(1, ...sorted.flatMap((c) => c.options.map((o) => roundOf(c, o))));
    document.body.classList.toggle('show-archive', !!S.showArchive);
    const nb = $('[data-onlynew]');
    if (nb) {
      nb.hidden = LATEST < 2;
      nb.textContent = 'Show older rounds';
      nb.classList.toggle('is-on', !!S.showArchive);
    }
    document.body.classList.toggle('only-fav', S.onlyFav);
    $('[data-onlyfav]')?.classList.toggle('is-on', S.onlyFav);
    $('#dd-cats').textContent = catCSS();
    $('#dd-tokens').textContent = tokenCSS();
    $('#side').innerHTML = sideHTML();
    renderMain();
    wire();
    connectSync();
    if (DD.byId.spectrum && appliedIdx(DD.byId.spectrum) !== (DD.byId.spectrum.default || 0) && !S.linkedOnce) {
      S.linkedOnce = true;
      setTimeout(linkSet, 400);
    }
    const h = location.hash.slice(1);
    if (h) requestAnimationFrame(() => go(h));
  };
})();
