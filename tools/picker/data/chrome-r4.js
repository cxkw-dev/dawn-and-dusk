/* Round 4: link and dialog families around the user's picks (#08 Dotted, #01 Classic).
   Each option's html is a family showcase; its css also styles the shared markup the composite page uses. */
(() => {
  const links = DD.byId.links;
  const dialogs = DD.byId.dialogs;
  if (!links || !dialogs) return;

  const CAP = `.lkf-cap, .dgf-cap { font-family: var(--font-mono); font-size: 10px; letter-spacing: .04em; line-height: 1; color: var(--muted); }`;

  // ---------- links ----------
  const LINK_HTML = `<div class="lkf">
  <div class="lkf-row"><span class="lkf-cap">inline</span>
    <p class="lk">I build calm software, write about <a class="lk-a">design systems</a>, and keep a <a class="lk-a is-hover">small lab</a> of experiments.</p></div>
  <div class="lkf-row"><span class="lkf-cap">standalone · rest / hover</span>
    <div class="lkf-line"><a class="lk-a lk-sa">Read the case study {{icon:arrow-right}}</a><a class="lk-a lk-sa is-hover">All projects {{icon:arrow-right}}</a></div></div>
  <div class="lkf-row"><span class="lkf-cap">nav · active / hover</span>
    <div class="lkf-line"><a class="lk-a lk-nav is-active">Work</a><a class="lk-a lk-nav">Writing</a><a class="lk-a lk-nav is-hover">Lab</a><a class="lk-a lk-nav">About</a></div></div>
  <div class="lkf-row"><span class="lkf-cap">external</span>
    <div class="lkf-line"><a class="lk-a lk-ext">GitHub {{icon:arrow-up-right}}</a><a class="lk-a lk-ext is-hover">LinkedIn {{icon:arrow-up-right}}</a></div></div>
  <div class="lkf-row"><span class="lkf-cap">muted · visited</span>
    <p class="lk lk-small"><a class="lk-a lk-muted">Privacy</a> · <a class="lk-a lk-muted">Colophon</a> · <a class="lk-a is-visited">Already read</a></p></div>
  <div class="lkf-row lkf-dark"><span class="lkf-cap">on ink</span>
    <p class="lk">Say hi by <a class="lk-a">email</a> or find me on <a class="lk-a lk-ext">GitHub {{icon:arrow-up-right}}</a>.</p></div>
</div>`;

  const LINK_BASE = `${CAP}
.lkf { display: flex; flex-direction: column; gap: calc(var(--u) * 3.5); min-width: 0; }
.lkf-row { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.lkf-line { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 18px; font-size: var(--fs-sm); }
.lkf .lk { max-width: none; }
.lk-small { font-size: var(--fs-sm); color: var(--muted); }
.lkf-dark { padding: calc(var(--u) * 3.5) calc(var(--u) * 4); border-radius: var(--r-box); background: var(--text); color: var(--bg); }
.lkf-dark .lkf-cap { color: color-mix(in oklab, var(--bg) 62%, transparent); }
.lkf-dark .lk { color: var(--bg); }
.lk-sa, .lk-ext { display: inline-flex; align-items: center; gap: .35em; font-weight: 500; }
.lk-sa .ic, .lk-ext .ic { transition: transform var(--dur) var(--ease); }
.lk-ext .ic { width: .9em; height: .9em; }
.lk-sa:hover .ic, .lk-sa.is-hover .ic { transform: translateX(3px); }
.lk-ext:hover .ic, .lk-ext.is-hover .ic { transform: translate(2px, -2px); }
.lk-nav { color: var(--muted); text-decoration-color: transparent; }
.lk-nav:hover, .lk-nav.is-hover, .lk-nav.is-active { color: var(--text); }
.lk-muted, .lk-a.is-visited { color: var(--muted); }`;

  // dots: underline colour; hover: what changes on hover; extra: anything else
  const linkFam = (name, note, { dots, thick = '2px', offset = '.28em', hover, extra = '' }) => ({
    name: `Dotted · ${name}`, note, round: 4, family: true, basedOn: '#08 Dotted', html: LINK_HTML,
    css: `${LINK_BASE}
.lk-a { text-decoration: underline dotted; text-decoration-thickness: ${thick}; text-underline-offset: ${offset}; text-decoration-color: ${dots}; }
.lk-a:hover, .lk-a.is-hover { ${hover} }
.lk-nav { text-decoration-color: transparent; }
.lk-nav:hover, .lk-nav.is-hover { text-decoration-color: ${dots}; text-decoration-style: dotted; }
.lk-nav.is-active { text-decoration-color: currentColor; text-decoration-style: solid; }
.lk-muted, .lk-a.is-visited { text-decoration-color: var(--faint); }
.lkf-dark .lk-a { text-decoration-color: color-mix(in oklab, var(--bg) 55%, transparent); }
.lkf-dark .lk-a:hover, .lkf-dark .lk-a.is-hover { color: var(--bg); text-decoration-color: var(--bg); background: none; }
${extra}`,
  });

  links.options.push(
    linkFam('accent dots', 'Your pick as a family: accent dots that turn solid on hover', {
      dots: 'var(--accent)', hover: 'color: var(--accent); text-decoration-style: solid;' }),
    linkFam('ink dots', 'Dots in softened ink instead of accent — fully monochrome', {
      dots: 'color-mix(in oklab, var(--text) 45%, transparent)', hover: 'text-decoration-style: solid; text-decoration-color: var(--text);' }),
    linkFam('fine', 'Thinner dots sitting closer to the text, grey until hovered', {
      dots: 'var(--border-strong)', thick: '1.5px', offset: '.2em',
      hover: 'color: var(--accent); text-decoration-style: solid; text-decoration-color: var(--accent);' }),
    linkFam('heavy + tint', 'Chunky dots; hover lays a soft accent wash behind the word', {
      dots: 'var(--accent)', thick: '3px', offset: '.3em',
      hover: 'background: var(--accent-soft); text-decoration-style: solid; border-radius: 3px; box-decoration-break: clone; -webkit-box-decoration-break: clone;' }),
    linkFam('accent text', 'Link text itself in the accent, with lighter accent dots', {
      dots: 'color-mix(in oklab, var(--accent) 50%, transparent)',
      hover: 'color: var(--accent-hover); text-decoration-style: solid; text-decoration-color: var(--accent-hover);',
      extra: `.lk-a:not(.lk-nav):not(.lk-muted):not(.is-visited) { color: var(--accent); }
.lkf-dark .lk .lk-a:not(.lk-nav):not(.lk-muted):not(.is-visited) { color: var(--bg); }` }),
    linkFam('mono utility', 'Inline links stay dotted; standalone, nav and external links go mono caps', {
      dots: 'var(--accent)', hover: 'color: var(--accent); text-decoration-style: solid;',
      extra: `.lk-sa, .lk-ext, .lk-nav { font-family: var(--font-mono); font-size: var(--fs-xs); font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.lk .lk-ext { font-size: .82em; }` }),
  );

  // ---------- dialogs ----------
  const dlg = (cls, ic, eyebrow, title, middle, btn2, btn1) => `<div class="dg-stage"><div class="dg-scrim"></div><div class="dg ${cls}">
    <div class="dg-head"><span class="dg-ic">{{icon:${ic}}}</span><div class="dg-titles"><span class="dg-eyebrow">${eyebrow}</span><h4 class="dg-title dd-h">${title}</h4></div><span class="dg-x">{{icon:x}}</span></div>
    ${middle}
    <div class="dg-foot"><span class="dg-hint">esc to cancel</span><button class="dg-btn dg-btn-2">${btn2}</button><button class="dg-btn dg-btn-1">${btn1}</button></div>
  </div></div>`;
  const cell = (cap, inner) => `<div class="dgf-cell"><span class="dgf-cap">${cap}</span>${inner}</div>`;

  const DIALOG_HTML = `<div class="dgf">
  ${cell('confirm · md', dlg('', 'sparkle', 'Release', 'Publish dawn &amp; dusk?',
    '<p class="dg-body">Your new tokens go live on cxkw.dev. You can roll back from history at any time.</p>', 'Cancel', 'Publish'))}
  ${cell('destructive · sm', dlg('dg-sm dg-danger', 'alert', 'Danger zone', 'Delete project?',
    '<p class="dg-body">This permanently removes dawn-and-dusk and its 24 versions.</p>', 'Keep it', 'Delete'))}
  ${cell('form · md', dlg('dg-form', 'folder', 'New', 'Name your project',
    '<label class="dg-field"><span>Project name</span><span class="dg-input is-focus">dawn-and-dusk</span><span class="dg-help">Lowercase, dashes allowed.</span></label>', 'Cancel', 'Create'))}
  ${cell('long content · scrolls', dlg('dg-long', 'info', 'Changelog', 'What’s new in v0.4',
    `<div class="dg-scroll"><p>Dusk is now its own layer: sixteen dark-mode designs that sit over any palette.</p>
      <p>Tables split into simple and dense families, both with hairline rhythm.</p>
      <p>Inputs moved to borderless fills with tucked labels, and buttons gained a colour role.</p>
      <p>The picker itself now wears your theme while you choose.</p></div>`, 'Close', 'Got it'))}
</div>`;

  const DIALOG_BASE = `${CAP}
.dgf { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr)); gap: calc(var(--u) * 3.5); }
.dgf-cell { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.dgf .dg-stage { height: 260px; padding: calc(var(--u) * 3); }
.dg-foot { flex-wrap: wrap; }
.dg-sm { width: min(300px, 100%); }
.dg-sm .dg-title { font-size: var(--fs-base); }
.dg-danger .dg-ic { display: inline-grid; place-items: center; flex: none; width: 2.1em; height: 2.1em; border-radius: var(--r-ctl);
  color: var(--bad); background: var(--bad-soft); }
.dg-danger .dg-btn-1 { background: var(--bad); border-color: var(--bad); color: var(--bg); }
.dg-danger .dg-btn-1:hover { background: color-mix(in oklab, var(--bad) 85%, var(--text)); border-color: color-mix(in oklab, var(--bad) 85%, var(--text)); }
.dg-field { display: flex; flex-direction: column; gap: 5px; font-size: var(--fs-xs); color: var(--muted); }
.dg-input { display: block; padding: calc(var(--u) * 2) calc(var(--u) * 3); border-radius: var(--r-ctl); background: var(--surface-2);
  color: var(--text); font-size: var(--fs-sm); }
.dg-input.is-focus { background: var(--surface); box-shadow: 0 0 0 2px var(--ring); }
.dg-help { color: var(--faint); }
.dg-scroll { max-height: 76px; overflow: auto; padding-right: 4px; font-size: var(--fs-sm); line-height: var(--lh); color: var(--muted);
  -webkit-mask-image: linear-gradient(black 62%, transparent); mask-image: linear-gradient(black 62%, transparent); }
.dg-scroll p { margin: 0 0 .6em; }`;

  const dialogFam = (name, note, css = '') => ({
    name: `Classic · ${name}`, note, round: 4, family: true, basedOn: '#01 Classic', html: DIALOG_HTML,
    css: `${DIALOG_BASE}\n${css}`,
  });

  dialogs.options.push(
    dialogFam('right-aligned actions', 'Your pick as a family: confirm, destructive, form and long content — actions sit bottom-right'),
    dialogFam('full-width actions', 'Buttons split the footer evenly — easier to hit, reads well on mobile', `
.dg-hint { display: none; }
.dg-foot { justify-content: stretch; }
.dg-foot .dg-btn { flex: 1 1 0; text-align: center; }`),
    dialogFam('ruled sections', 'Hairlines frame the header and a tinted footer bar', `
.dg { padding: 0; overflow: hidden; }
.dg-head { padding: calc(var(--u) * 4) calc(var(--u) * 5) calc(var(--u) * 3); border-bottom: 1px solid var(--border); }
.dg > :not(.dg-head):not(.dg-foot) { margin: 0 calc(var(--u) * 5); }
.dg-foot { margin-top: calc(var(--u) * 1); padding: calc(var(--u) * 3) calc(var(--u) * 5); background: var(--surface-2); border-top: 1px solid var(--border); }`),
    dialogFam('icon-led', 'Every dialog opens with an icon tile and a small eyebrow above the title', `
.dg-head { align-items: center; }
.dg-ic { display: inline-grid; place-items: center; flex: none; width: 2.3em; height: 2.3em; border-radius: var(--r-ctl);
  background: var(--surface-2); color: var(--text); }
.dg-eyebrow { display: block; }`),
    dialogFam('roomy, soft scrim', 'More padding, bigger title, a light frosted scrim instead of a dark one', `
.dgf .dg-stage { height: 300px; }
.dg { padding: calc(var(--u) * 7); gap: calc(var(--u) * 4); }
.dg-title { font-size: var(--fs-xl); }
.dg-sm .dg-title { font-size: var(--fs-lg); }
.dg-scrim { background: color-mix(in oklab, var(--bg) 40%, transparent); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); }`),
    dialogFam('compact', 'Tighter padding, small title and small buttons — for quick confirms', `
.dg { padding: calc(var(--u) * 4); gap: calc(var(--u) * 2); }
.dg-title, .dg-sm .dg-title { font-size: var(--fs-base); }
.dg-body { font-size: var(--fs-xs); }
.dg-btn { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); font-size: var(--fs-xs); }`),
  );
})();
