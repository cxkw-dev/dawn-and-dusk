/* dawn & dusk picker — form components: buttons, inputs, dropdowns, controls */
(function () {
  // Soft color field behind "glass" variants so the frosting has something to blur.
  var GLASS_FIELD =
    'background: radial-gradient(circle at 16% 24%, color-mix(in oklab, var(--accent) 45%, transparent), transparent 55%),' +
    ' radial-gradient(circle at 88% 80%, color-mix(in oklab, var(--info) 40%, transparent), transparent 55%);' +
    ' padding: calc(var(--u) * 4); border-radius: var(--r-box);';

  // Round 3 riffs repeat their pick's CSS verbatim, then append the one or two rules that change.
  var SOLID = `
.b-primary { background: var(--accent); color: var(--on-accent); box-shadow: var(--shadow-sm); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent-hover); }
.b-primary:active { transform: translateY(1px); }
.b-secondary { background: var(--surface-2); color: var(--text); }
.b-secondary:hover, .b-secondary.is-hover { background: color-mix(in oklab, var(--surface-2), var(--text) 9%); }
`;

  var GROUP_HTML = `
<div class="f-grp">
  <label class="f"><span class="f-label">Name</span><span class="f-box"><input class="f-in" placeholder="Ada Lovelace"></span></label>
  <label class="f is-focus"><span class="f-label">Email</span><span class="f-box"><input class="f-in" value="hello@cxkw.dev"><span class="f-suf">{{icon:check}}</span></span></label>
  <label class="f"><span class="f-label">City</span><span class="f-box"><input class="f-in" placeholder="Brooklyn, NY"></span></label>
</div>
<span class="f-help">Only when it matters. No newsletters.</span>`;

  var GROUP = `
gap: calc(var(--u) * 2);
.f-grp { display: flex; flex-direction: column; gap: 2px; border-radius: var(--r-box); overflow: hidden; }
.f { gap: calc(var(--u) * 0.5); padding: calc(var(--u) * 2.25) calc(var(--u) * 3.5); background: var(--surface-2); transition: background-color var(--dur) var(--ease); }
.f-label { font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-in { font-size: var(--fs-sm); }
.f:hover { background: color-mix(in oklab, var(--surface-2), var(--text) 4%); }
.f:focus-within, .f.is-focus { background: var(--accent-soft); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-help { padding-left: calc(var(--u) * 3.5); }
`;

  var POP = `
.dd-trigger { width: auto; align-self: flex-start; border-radius: 999px; padding-inline: calc(var(--u) * 4); }
.dd-menu { position: relative; margin-top: calc(var(--u) * 2); padding: calc(var(--u) * 2); border-radius: var(--r-lg); }
.dd-menu::before { content: ''; position: absolute; top: -6px; left: 22px; width: 10px; height: 10px; background: var(--surface);
  border-left: inherit; border-top: inherit; transform: rotate(45deg); }
.dd-ic { display: flex; }
.dd-desc { display: block; }
.dd-item.is-selected .dd-ic { color: var(--accent); }
`;

  /* ── Round 4 family builders: the pick's language expanded to every role, size and state ── */

  var r2 = function (x) { return Math.round(x * 100) / 100; };

  // Tiny mono caption above each row of a family card.
  var CAP = `
.fx-cap { margin: calc(var(--u) * 1.5) 0 0; font-family: var(--font-mono); font-size: calc(var(--fs-xs) * .85); line-height: 1.2;
  letter-spacing: .04em; color: var(--muted); }
.fx-cap:first-child { margin-top: 0; }
`;

  var BTN_FAMILY_HTML = `
<div class="bf">
  <p class="fx-cap">primary · secondary · ghost · danger · link</p>
  <div class="b-row">
    <button class="b b-primary"><span class="b-ic">{{icon:plus}}</span><span class="b-l">New project</span></button>
    <button class="b b-secondary"><span class="b-ic">{{icon:external}}</span><span class="b-l">Open</span></button>
    <button class="b b-ghost"><span class="b-ic">{{icon:copy}}</span><span class="b-l">Copy</span></button>
    <button class="b b-danger"><span class="b-ic">{{icon:trash}}</span><span class="b-l">Delete</span></button>
    <button class="b b-link"><span class="b-l">Read more</span><span class="b-ic">{{icon:arrow-right}}</span></button>
  </div>
  <p class="fx-cap">sm / md / lg</p>
  <div class="b-row">
    <button class="b b-primary b-sm"><span class="b-ic">{{icon:plus}}</span><span class="b-l">Small</span></button>
    <button class="b b-primary"><span class="b-ic">{{icon:plus}}</span><span class="b-l">Medium</span></button>
    <button class="b b-primary b-lg"><span class="b-ic">{{icon:plus}}</span><span class="b-l">Large</span></button>
    <button class="b b-secondary b-sm"><span class="b-l">Small</span></button>
    <button class="b b-secondary b-lg"><span class="b-l">Large</span></button>
  </div>
  <p class="fx-cap">icon-only · hover · disabled · loading</p>
  <div class="b-row">
    <button class="b b-primary b-icon" aria-label="Add">{{icon:plus}}</button>
    <button class="b b-secondary b-icon" aria-label="Save">{{icon:heart}}</button>
    <button class="b b-ghost b-icon" aria-label="Settings">{{icon:settings}}</button>
    <button class="b b-primary is-hover"><span class="b-ic">{{icon:plus}}</span><span class="b-l">Hovered</span></button>
    <button class="b b-primary" disabled><span class="b-ic">{{icon:plus}}</span><span class="b-l">Disabled</span></button>
    <button class="b b-primary is-loading"><span class="b-spin"></span><span class="b-l">Saving</span></button>
  </div>
</div>`;

  // Composite page markup for button families: the pick's icon-first pair.
  var BTN_PAGE = `
<div class="b-row">
  <button class="b b-primary"><span class="b-ic">{{icon:plus}}</span><span class="b-l">New project</span></button>
  <button class="b b-secondary"><span class="b-ic">{{icon:external}}</span><span class="b-l">Read more</span></button>
  <button class="b b-secondary b-icon" aria-label="Save">{{icon:heart}}</button>
</div>`;

  // o: r radius · py/px padding units · w weight · sec 'tone'|'ring' · soft (tinted danger + accent ghost hover)
  function btnFamily(o) {
    var sec = o.sec === 'ring'
      ? `.b-secondary { background: transparent; color: var(--text); box-shadow: inset 0 0 0 1px var(--border-strong); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); box-shadow: inset 0 0 0 1px var(--text); }`
      : `.b-secondary { background: color-mix(in oklab, var(--surface-2), var(--text) 6%); color: var(--text); }
.b-secondary:hover, .b-secondary.is-hover { background: color-mix(in oklab, var(--surface-2), var(--text) 14%); }`;
    var danger = o.soft
      ? `.b-danger { background: var(--bad-soft); color: var(--bad); }
.b-danger:hover, .b-danger.is-hover { background: color-mix(in oklab, var(--bad) 22%, var(--bg)); }
.b-ghost:hover, .b-ghost.is-hover { background: var(--accent-soft); }`
      : `.b-danger { background: var(--bad); color: var(--bg); }
.b-danger:hover, .b-danger.is-hover { background: color-mix(in oklab, var(--bad), black 12%); }
.b-ghost:hover, .b-ghost.is-hover { background: var(--surface-2); }`;
    return CAP + `
align-items: stretch;
@keyframes dd-forms-spin { to { transform: rotate(360deg); } }
.bf { display: flex; flex-direction: column; gap: calc(var(--u) * 2); min-width: 0; }
.b-row { display: flex; flex-wrap: wrap; align-items: center; gap: calc(var(--u) * 2); }
.b { --py: ${o.py}; --px: ${o.px}; padding: calc(var(--u) * var(--py)) calc(var(--u) * var(--px));
  gap: calc(var(--u) * 1.75); border-radius: ${o.r}; font-weight: ${o.w}; }
.b:has(> .b-ic:first-child) { padding-left: calc(var(--u) * var(--px) * .78); }
.b-sm { --py: ${r2(o.py * 0.7)}; --px: ${r2(o.px * 0.72)}; font-size: var(--fs-xs); gap: calc(var(--u) * 1.25); }
.b-lg { --py: ${r2(o.py * 1.3)}; --px: ${r2(o.px * 1.3)}; font-size: var(--fs-base); }
.b-icon { padding: calc(var(--u) * var(--py)); }
.b-primary { background: var(--accent); color: var(--on-accent); box-shadow: var(--shadow-sm); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent-hover); }
.b-primary:active { transform: translateY(1px); }
${sec}
.b-ghost { background: transparent; color: var(--text); }
${danger}
.b-link { padding-inline: 0; background: none; color: var(--text); border-radius: 0; }
.b-link .b-l { text-decoration: underline dotted; text-decoration-color: var(--muted); text-decoration-thickness: 1.5px; text-underline-offset: 4px; }
.b-link:hover, .b-link.is-hover { color: var(--accent); }
.b-link:hover .b-l, .b-link.is-hover .b-l { text-decoration-color: currentColor; }
.b-spin { flex: none; width: 1em; height: 1em; box-sizing: border-box; border-radius: 50%;
  border: 2px solid color-mix(in oklab, currentColor 30%, transparent); border-top-color: currentColor; animation: dd-forms-spin .8s linear infinite; }
.b.is-loading { cursor: progress; pointer-events: none; }
`;
  }

  var INPUT_FAMILY_HTML = `
<div class="ff">
  <div class="ff-cell"><p class="fx-cap">default</p>
    <label class="f"><span class="f-label">Name</span><span class="f-box"><input class="f-in" placeholder="Ada Lovelace"></span></label></div>
  <div class="ff-cell"><p class="fx-cap">focused · value</p>
    <label class="f is-focus"><span class="f-label">Email</span><span class="f-box"><input class="f-in" value="hello@cxkw.dev"><span class="f-suf">{{icon:check}}</span></span></label></div>
  <div class="ff-cell"><p class="fx-cap">error</p>
    <label class="f is-error"><span class="f-label">Website</span><span class="f-box"><input class="f-in" value="cxkw"><span class="f-suf">{{icon:alert}}</span></span><span class="f-help">Use the full address, like https://cxkw.dev</span></label></div>
  <div class="ff-cell"><p class="fx-cap">disabled</p>
    <label class="f is-disabled"><span class="f-label">Plan</span><span class="f-box"><input class="f-in" value="Studio" disabled></span><span class="f-help">Change plans in Billing.</span></label></div>
  <div class="ff-cell"><p class="fx-cap">leading icon</p>
    <label class="f has-pre"><span class="f-label">Search</span><span class="f-box"><span class="f-pre">{{icon:search}}</span><input class="f-in" placeholder="Projects, notes…"></span></label></div>
  <div class="ff-cell"><p class="fx-cap">suffix · unit</p>
    <label class="f"><span class="f-label">Budget</span><span class="f-box"><input class="f-in" value="1,200"><span class="f-suf f-unit">USD / mo</span></span></label></div>
  <div class="ff-cell"><p class="fx-cap">small</p>
    <label class="f f-sm"><span class="f-label">Tag</span><span class="f-box"><input class="f-in" placeholder="design-system"></span></label></div>
  <div class="ff-cell ff-wide"><p class="fx-cap">textarea</p>
    <label class="f f-area"><span class="f-label">Message</span><span class="f-box"><textarea class="f-in" rows="3" placeholder="What are you building?"></textarea></span><span class="f-help">0 / 500</span></label></div>
</div>`;

  // o: pt/px/pb box padding units, lt label top, val value size · focus 'lift'|'ring'|'line' · caps labels · fill rest tone
  function inputFamily(o) {
    var focus = {
      lift: 'background: var(--surface); box-shadow: var(--shadow);',
      ring: 'background: var(--surface); box-shadow: inset 0 0 0 1.5px var(--accent);',
      line: 'background: color-mix(in oklab, var(--surface-2), var(--text) 4%); box-shadow: inset 0 -2px 0 var(--accent);',
    }[o.focus];
    var label = o.caps
      ? 'font-size: calc(var(--fs-xs) * .82); font-weight: 600; text-transform: uppercase; letter-spacing: .12em; color: var(--faint);'
      : 'font-size: var(--fs-xs); font-weight: 500; color: var(--muted);';
    return CAP + `
gap: calc(var(--u) * 3);
&:has(> .ff) { max-width: none; }
.ff { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 170px), 1fr)); gap: calc(var(--u) * 4) calc(var(--u) * 3); align-items: start; }
.ff-cell { display: flex; flex-direction: column; gap: calc(var(--u) * 1.25); min-width: 0; }
.ff-wide { grid-column: 1 / -1; }
.f { gap: calc(var(--u) * 1.25); }
.f-label { position: absolute; top: calc(var(--u) * ${o.lt}); left: calc(var(--u) * ${o.px}); z-index: 1; pointer-events: none; line-height: 1.2; ${label} }
.f-box { padding: calc(var(--u) * ${o.pt}) calc(var(--u) * ${o.px}) calc(var(--u) * ${o.pb}); background: ${o.fill}; border-radius: var(--r-box); }
.f-in { font-size: ${o.val}; }
.f-box:focus-within, .f.is-focus .f-box { ${focus} }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-help { padding-left: calc(var(--u) * ${o.px}); overflow-wrap: anywhere; }
.f.has-pre .f-pre { display: flex; }
.f-suf.f-unit { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--muted); white-space: nowrap; }
.f.is-error .f-box { background: var(--bad-soft); }
.f.is-error .f-label, .f.is-error .f-help, .f.is-error .f-suf { color: var(--bad); }
.f.is-disabled { cursor: not-allowed; }
.f.is-disabled .f-box { background: color-mix(in oklab, var(--surface-2) 50%, transparent); }
.f.is-disabled .f-label, .f-in:disabled { color: var(--faint); cursor: not-allowed; }
.f-area .f-box { align-items: flex-start; }
.f-area .f-in { display: block; resize: vertical; min-height: calc(${o.val} * 1.4 * 3); }
.f-sm .f-box { padding: calc(var(--u) * ${r2(o.pt * 0.78)}) calc(var(--u) * ${r2(o.px * 0.8)}) calc(var(--u) * ${r2(o.pb * 0.75)}); }
.f-sm .f-label { top: calc(var(--u) * ${r2(o.lt * 0.75)}); left: calc(var(--u) * ${r2(o.px * 0.8)}); font-size: calc(var(--fs-xs) * .85); }
.f-sm .f-in { font-size: var(--fs-xs); }
`;
  }

  var DD_FAMILY_HTML = `
<p class="fx-cap">groups · icons · descriptions · kbd · checked · disabled · danger · submenu</p>
<div class="dd">
  <button class="dd-trigger"><span class="dd-tic">{{icon:folder}}</span><span class="dd-val">dawn-and-dusk</span><span class="dd-chev">{{icon:chevron-down}}</span></button>
  <div class="dd-menu">
    <div class="dd-group">Project</div>
    <div class="dd-item"><span class="dd-ic">{{icon:folder}}</span><span class="dd-txt"><span class="dd-name">Open</span><span class="dd-desc">In a new window</span></span><span class="dd-kbd">⌘O</span></div>
    <div class="dd-item is-hover"><span class="dd-ic">{{icon:copy}}</span><span class="dd-txt"><span class="dd-name">Duplicate</span><span class="dd-desc">Keeps history and comments</span></span><span class="dd-kbd">⌘D</span></div>
    <div class="dd-item"><span class="dd-ic">{{icon:external}}</span><span class="dd-txt"><span class="dd-name">Share</span><span class="dd-desc">Link, embed or export</span></span><span class="dd-sub">{{icon:chevron-down}}</span></div>
    <div class="dd-sep"></div>
    <div class="dd-group">View</div>
    <div class="dd-item is-selected"><span class="dd-ic">{{icon:star}}</span><span class="dd-txt"><span class="dd-name">Pin to sidebar</span></span><span class="dd-check">{{icon:check}}</span></div>
    <div class="dd-item"><span class="dd-ic">{{icon:calendar}}</span><span class="dd-txt"><span class="dd-name">Show dates</span></span><span class="dd-check">{{icon:check}}</span></div>
    <div class="dd-item is-disabled"><span class="dd-ic">{{icon:sparkle}}</span><span class="dd-txt"><span class="dd-name">Present</span><span class="dd-desc">Connect a second display</span></span><span class="dd-kbd">⌘P</span></div>
    <div class="dd-sep"></div>
    <div class="dd-item is-danger"><span class="dd-ic">{{icon:trash}}</span><span class="dd-txt"><span class="dd-name">Delete project</span><span class="dd-desc">This can’t be undone</span></span><span class="dd-kbd">⌘⌫</span></div>
  </div>
</div>`;

  // The #05 Grouped pick plus everything a real menu needs; `extra` carries the sibling's one or two changes.
  var DD_FAMILY = CAP + `
gap: calc(var(--u) * 2); display: flex; flex-direction: column;
.dd { max-width: 320px; }
.dd-menu { padding: calc(var(--u) * 1.5) 0; }
.dd-group { display: block; padding-inline: calc(var(--u) * 3.5); font-size: 10.5px; text-transform: uppercase; letter-spacing: .1em; color: var(--faint); }
.dd-item { border-radius: 0; padding-inline: calc(var(--u) * 3.5); }
.dd-name { overflow-wrap: anywhere; }
.dd-desc { display: block; }
.dd-ic, .dd-tic { display: flex; }
.dd-kbd { display: block; flex: none; white-space: nowrap; }
.dd-sub { display: flex; flex: none; color: var(--faint); transform: rotate(-90deg); }
.dd-sep { margin: calc(var(--u) * 1.5) 0; }
.dd-item.is-selected .dd-name { font-weight: 600; }
.dd-item.is-disabled { color: var(--faint); cursor: not-allowed; }
.dd-item.is-disabled .dd-ic, .dd-item.is-disabled .dd-desc, .dd-item.is-disabled .dd-kbd { color: var(--faint); opacity: .75; }
.dd-item.is-disabled:hover { background: none; }
.dd-item.is-danger:hover, .dd-item.is-danger.is-hover { background: var(--bad-soft); }
`;

  var CTRL_FAMILY_HTML = `
<div class="cf">
  <p class="fx-cap">switch · sm / md · on / off / disabled</p>
  <div class="cf-row">
    <span class="sw sw-sm is-on"><i></i></span><span class="sw sw-sm"><i></i></span>
    <span class="sw is-on"><i></i></span><span class="sw"><i></i></span>
    <span class="sw is-on is-disabled"><i></i></span><span class="sw is-disabled"><i></i></span>
  </div>
  <p class="fx-cap">checkbox · on / off / mixed / disabled</p>
  <div class="cf-row">
    <span class="cb is-on"></span><span class="cb"></span><span class="cb is-mixed"></span><span class="cb is-on is-disabled"></span><span class="cb is-disabled"></span>
  </div>
  <p class="fx-cap">radio · on / off / disabled</p>
  <div class="cf-row"><span class="rd is-on"></span><span class="rd"></span><span class="rd is-on is-disabled"></span><span class="rd is-disabled"></span></div>
  <p class="fx-cap">with label + description</p>
  <div class="cf-list">
    <div class="ct-row ct-desc"><span class="sw is-on"><i></i></span><span class="ct-txt"><span class="ct-l">Dusk at sunset</span><span class="ct-d">Switch themes with your local time.</span></span></div>
    <div class="ct-row ct-desc"><span class="cb is-on"></span><span class="ct-txt"><span class="ct-l">Weekly digest</span><span class="ct-d">One email on Sundays. Leave any time.</span></span></div>
    <div class="ct-row ct-desc"><span class="rd"></span><span class="ct-txt"><span class="ct-l">Yearly billing</span><span class="ct-d">Two months free.</span></span></div>
  </div>
</div>`;

  // #21 Classic pill · crisp checks (with the on-accent knob) plus sizes, disabled, mixed and description rows.
  var CTRL_FAMILY = CAP + `
.cf { display: flex; flex-direction: column; gap: calc(var(--u) * 2); min-width: 0; font-size: var(--fs-sm); }
.cf-row { display: flex; flex-wrap: wrap; align-items: center; gap: calc(var(--u) * 3); }
.cf-list { display: flex; flex-direction: column; gap: calc(var(--u) * 3); }
.cb, .rd { border-width: 1px; }
.cb { border-radius: 3px; }
.cb::after { width: 4px; height: 9px; border-width: 0 1.5px 1.5px 0; }
.rd::after { width: 8px; height: 8px; }
.sw.is-on i { background: var(--on-accent); }
.sw-sm { width: 32px; height: 18px; padding: 2px; }
.sw-sm i { width: 14px; height: 14px; }
.sw-sm.is-on i { transform: translateX(14px); }
.is-disabled { opacity: .4; pointer-events: none; }
.cb.is-mixed { background: var(--accent); border-color: var(--accent); }
.cb.is-mixed::after { width: 8px; height: 0; border-width: 0 0 1.5px 0; transform: none; }
.ct-desc { align-items: flex-start; }
.ct-desc > .cb, .ct-desc > .rd { margin-top: 1px; }
.ct-txt { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.ct-d { font-size: var(--fs-xs); line-height: 1.4; color: var(--muted); }
`;

  /* ───────────────────────────── Buttons ───────────────────────────── */

  DD.category({
    id: 'buttons',
    group: 'Components',
    title: 'Buttons',
    blurb: 'Primary, secondary and icon actions — the second row shows hover and disabled states.',
    html: `
<div class="b-row">
  <button class="b b-primary"><span class="b-l">Get started</span><span class="b-ic">{{icon:arrow-right}}</span></button>
  <button class="b b-secondary"><span class="b-l">Read more</span></button>
  <button class="b b-secondary b-icon" aria-label="Save">{{icon:heart}}</button>
</div>
<div class="b-row b-states dd-states">
  <button class="b b-primary is-hover"><span class="b-l">Hovered</span><span class="b-ic">{{icon:arrow-right}}</span></button>
  <button class="b b-secondary is-hover"><span class="b-l">Hovered</span></button>
  <button class="b b-primary" disabled><span class="b-l">Disabled</span></button>
</div>`,
    css: `
display: flex; flex-direction: column; align-items: flex-start; gap: calc(var(--u) * 3);
.b-row { display: flex; flex-wrap: wrap; align-items: center; gap: calc(var(--u) * 2.5); }
.b { appearance: none; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: calc(var(--u) * 2);
  padding: calc(var(--u) * 2.5) calc(var(--u) * 4.5); border: 0; border-radius: var(--r-ctl); background: none; color: var(--text);
  font-family: var(--font-body); font-size: var(--fs-sm); font-weight: 600; line-height: 1.1; letter-spacing: 0;
  white-space: nowrap; cursor: pointer; text-decoration: none;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease), opacity var(--dur) var(--ease); }
.b-ic, .b-icon { display: inline-flex; }
.b-icon { padding: calc(var(--u) * 2.5); }
.b:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
.b:disabled { opacity: .45; cursor: not-allowed; pointer-events: none; }
`,
    options: [
      {
        name: 'Solid',
        note: 'Filled accent, tinted neutral secondary',
        css: `
.b-primary { background: var(--accent); color: var(--on-accent); box-shadow: var(--shadow-sm); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent-hover); }
.b-primary:active { transform: translateY(1px); }
.b-secondary { background: var(--surface-2); color: var(--text); }
.b-secondary:hover, .b-secondary.is-hover { background: color-mix(in oklab, var(--surface-2), var(--text) 9%); }
`,
      },
      {
        name: 'Soft tint',
        note: 'Accent-washed fill, no hard edges',
        css: `
.b-primary { background: var(--accent-soft); color: color-mix(in oklab, var(--accent) 80%, var(--text)); }
.b-primary:hover, .b-primary.is-hover { background: color-mix(in oklab, var(--accent) 24%, var(--bg)); }
.b-secondary { background: transparent; color: var(--muted); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); color: var(--text); }
.b-icon { background: var(--surface-2); color: var(--text); }
`,
      },
      {
        name: 'Outline',
        note: 'Hairline frames that fill on hover',
        css: `
.b { border: 1.5px solid var(--border-strong); background: transparent; }
.b-primary { border-color: var(--accent); color: var(--accent); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent); color: var(--on-accent); }
.b-secondary:hover, .b-secondary.is-hover { border-color: var(--text); background: var(--surface-2); }
`,
      },
      {
        name: 'Ghost',
        note: 'Text-only until hovered',
        css: `
.b { padding-inline: calc(var(--u) * 3); }
.b-primary { color: var(--accent); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent-soft); }
.b-secondary { color: var(--muted); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); color: var(--text); }
`,
      },
      {
        name: 'Underline link',
        note: 'Buttons that read as typography',
        css: `
.b-row { gap: calc(var(--u) * 6); }
.b { padding: calc(var(--u) * 1) 0; border-radius: 0; }
.b-icon { padding: calc(var(--u) * 1); }
.b-l { text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 5px;
  transition: text-underline-offset var(--dur) var(--ease), text-decoration-color var(--dur) var(--ease); }
.b-ic { transition: transform var(--dur) var(--ease); }
.b-primary { color: var(--text); }
.b-primary .b-l { text-decoration-color: var(--accent); text-decoration-thickness: 2px; }
.b-primary:hover, .b-primary.is-hover { color: var(--accent); }
.b-primary:hover .b-ic, .b-primary.is-hover .b-ic { transform: translateX(3px); }
.b:hover .b-l, .b.is-hover .b-l { text-underline-offset: 8px; }
.b-secondary { color: var(--muted); }
.b-secondary .b-l { text-decoration-color: var(--border-strong); }
.b-secondary:hover, .b-secondary.is-hover { color: var(--text); }
`,
      },
      {
        name: 'Inverted pill',
        note: 'Ink-on-paper capsule, flips to accent',
        css: `
.b { border-radius: 999px; padding-inline: calc(var(--u) * 5); }
.b-icon { padding: calc(var(--u) * 2.5); }
.b-primary { background: var(--text); color: var(--bg); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent); color: var(--on-accent); }
.b-secondary { box-shadow: inset 0 0 0 1px var(--border-strong); }
.b-secondary:hover, .b-secondary.is-hover { box-shadow: inset 0 0 0 1px var(--text); }
`,
      },
      {
        name: 'Brutalist offset',
        note: 'Thick rule + hard shadow, presses in',
        css: `
.b-row { gap: calc(var(--u) * 3.5); }
.b { border: 2px solid var(--text); border-radius: 0; box-shadow: 4px 4px 0 var(--text);
  font-size: var(--fs-xs); font-weight: 800; text-transform: uppercase; letter-spacing: .04em;
  padding: calc(var(--u) * 3) calc(var(--u) * 4.5); }
.b-icon { padding: calc(var(--u) * 3); }
.b-primary { background: var(--accent); color: var(--on-accent); }
.b-secondary { background: var(--surface); color: var(--text); }
.b:hover, .b.is-hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--text); }
.b:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
`,
      },
      {
        name: 'Pressable 3D',
        note: 'Chunky bottom edge, sinks on press',
        css: `
padding-bottom: 4px;
.b { box-shadow: 0 4px 0 var(--edge); }
.b-primary { --edge: color-mix(in oklab, var(--accent), black 35%); background: var(--accent); color: var(--on-accent); }
.b-secondary { --edge: var(--border-strong); background: var(--surface); color: var(--text); border: 1px solid var(--border-strong); }
.b:hover, .b.is-hover { transform: translateY(2px); box-shadow: 0 2px 0 var(--edge); }
.b:active { transform: translateY(4px); box-shadow: 0 0 0 var(--edge); }
`,
      },
      {
        name: 'Bracket mono',
        note: '[ TERMINAL ] labels in your mono face',
        css: `
.b { font-family: var(--font-mono); font-size: var(--fs-xs); font-weight: 500; text-transform: uppercase; letter-spacing: .08em;
  border-radius: 0; padding: calc(var(--u) * 2) calc(var(--u) * 2.5); white-space: pre; }
.b-ic { display: none; }
.b-l::before { content: '[ '; }
.b-l::after { content: ' ]'; }
.b-icon::before { content: '['; }
.b-icon::after { content: ']'; }
.b-l::before, .b-l::after, .b-icon::before, .b-icon::after { color: var(--faint); transition: color var(--dur) var(--ease); }
.b:hover .b-l::before, .b:hover .b-l::after, .b.is-hover .b-l::before, .b.is-hover .b-l::after,
.b-icon:hover::before, .b-icon:hover::after { color: inherit; }
.b-primary { color: var(--accent); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent); color: var(--on-accent); }
.b-secondary { color: var(--muted); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); color: var(--text); }
`,
      },
      {
        name: 'Arrow reveal',
        note: 'Arrow slides in on hover',
        css: `
.b-primary { background: var(--accent); color: var(--on-accent); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent-hover); }
.b-ic { width: 0; opacity: 0; margin-left: calc(var(--u) * -2); overflow: hidden;
  transition: width var(--dur) var(--ease), opacity var(--dur) var(--ease), margin var(--dur) var(--ease); }
.b:hover .b-ic, .b.is-hover .b-ic { width: 1.1em; opacity: 1; margin-left: 0; }
.b-secondary { color: var(--text); box-shadow: inset 0 0 0 1px var(--border); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); box-shadow: inset 0 0 0 1px var(--border-strong); }
`,
      },
      {
        name: 'Sweep fill',
        note: 'Outline that floods left → right',
        css: `
.b { isolation: isolate; overflow: hidden; border: 1.5px solid var(--line); color: var(--text); }
.b::before { content: ''; position: absolute; inset: 0; z-index: -1; background: var(--fill);
  transform: scaleX(0); transform-origin: left center; transition: transform var(--dur) var(--ease); }
.b:hover::before, .b.is-hover::before { transform: scaleX(1); }
.b-primary { --line: var(--text); --fill: var(--accent); }
.b-primary:hover, .b-primary.is-hover { color: var(--on-accent); border-color: var(--accent); }
.b-secondary { --line: var(--border-strong); --fill: var(--surface-2); }
`,
      },
      {
        name: 'Accent glow',
        note: 'Lit from within — sings at dusk',
        css: `
.b-primary { background: var(--accent); color: var(--on-accent);
  box-shadow: 0 0 0 1px color-mix(in oklab, var(--accent) 60%, transparent), 0 8px 24px -8px color-mix(in oklab, var(--accent) 80%, transparent); }
.b-primary:hover, .b-primary.is-hover {
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--accent) 22%, transparent), 0 10px 32px -6px color-mix(in oklab, var(--accent) 90%, transparent); }
.b-secondary { background: color-mix(in oklab, var(--accent) 6%, var(--surface)); color: var(--text);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--accent) 35%, transparent); }
.b-secondary:hover, .b-secondary.is-hover {
  box-shadow: inset 0 0 0 1px var(--accent), 0 0 18px -4px color-mix(in oklab, var(--accent) 55%, transparent); }
`,
      },
      {
        name: 'Gradient ring',
        note: 'Sunrise gradient border, quiet fill',
        css: `
.b { border: 2px solid transparent; }
.b-primary { color: var(--text);
  background: linear-gradient(var(--surface), var(--surface)) padding-box,
    linear-gradient(120deg, var(--accent), var(--warn), var(--info)) border-box; }
.b-primary:hover, .b-primary.is-hover {
  background: linear-gradient(var(--accent-soft), var(--accent-soft)) padding-box,
    linear-gradient(300deg, var(--accent), var(--warn), var(--info)) border-box; }
.b-primary .b-ic { color: var(--accent); }
.b-secondary { border-color: var(--border); color: var(--muted); }
.b-secondary:hover, .b-secondary.is-hover { color: var(--text); border-color: var(--border-strong); }
`,
      },
      {
        name: 'Ink',
        note: 'Display-font italic, editorial',
        css: `
.b { font-family: var(--font-display); font-style: italic; font-weight: 400; font-size: var(--fs-base); }
.b-icon { font-style: normal; }
.b-primary { background: var(--text); color: var(--bg); }
.b-primary:hover, .b-primary.is-hover { background: var(--accent); color: var(--on-accent); }
.b-secondary { color: var(--text); padding-inline: calc(var(--u) * 2); }
.b-secondary .b-l { text-decoration: underline wavy transparent 1.5px; text-underline-offset: 6px;
  transition: text-decoration-color var(--dur) var(--ease); }
.b-secondary:hover .b-l, .b-secondary.is-hover .b-l { text-decoration-color: var(--accent); }
`,
      },
      {
        name: 'Split',
        note: 'Label | icon segments',
        css: `
.b { padding: 0; gap: 0; overflow: hidden; }
.b-l { padding: calc(var(--u) * 2.5) calc(var(--u) * 4); }
.b-ic { align-self: stretch; align-items: center; padding: 0 calc(var(--u) * 3); transition: background-color var(--dur) var(--ease); }
.b-icon { padding: calc(var(--u) * 2.5); }
.b-primary { background: var(--accent); color: var(--on-accent); }
.b-primary .b-ic { border-left: 1px solid color-mix(in oklab, var(--on-accent) 30%, transparent); }
.b-primary:hover .b-ic, .b-primary.is-hover .b-ic { background: var(--accent-hover); }
.b-secondary { box-shadow: inset 0 0 0 1px var(--border-strong); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); }
`,
      },
      {
        name: 'Glass',
        note: 'Frosted, over a soft color field',
        css: `
${GLASS_FIELD}
.b { backdrop-filter: blur(12px) saturate(1.4); -webkit-backdrop-filter: blur(12px) saturate(1.4); }
.b-primary { background: color-mix(in oklab, var(--accent) 70%, transparent); color: var(--on-accent);
  box-shadow: inset 0 1px 0 color-mix(in oklab, white 35%, transparent), inset 0 0 0 1px color-mix(in oklab, white 18%, transparent), var(--shadow-sm); }
.b-primary:hover, .b-primary.is-hover { background: color-mix(in oklab, var(--accent) 88%, transparent); }
.b-secondary { background: color-mix(in oklab, var(--surface) 45%, transparent); color: var(--text);
  box-shadow: inset 0 1px 0 color-mix(in oklab, white 30%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--text) 12%, transparent); }
.b-secondary:hover, .b-secondary.is-hover { background: color-mix(in oklab, var(--surface) 70%, transparent); }
`,
      },
      {
        name: 'Letterpress',
        note: 'Double rule, display type, old-print feel',
        css: `
.b { border: 3px double var(--text); border-radius: 0; font-family: var(--font-display); font-weight: 600; letter-spacing: .02em;
  padding: calc(var(--u) * 2.25) calc(var(--u) * 4.5); }
.b-icon { padding: calc(var(--u) * 2.25); }
.b-primary { color: var(--text); }
.b-primary:hover, .b-primary.is-hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
.b-secondary { border-color: var(--border-strong); color: var(--muted); }
.b-secondary:hover, .b-secondary.is-hover { color: var(--text); border-color: var(--text); }
`,
      },

      /* Round 3 — siblings of #01 Solid */
      {
        round: 3,
        basedOn: '#01 Solid',
        name: 'Solid · pill',
        note: 'Same fills, fully rounded ends',
        css: SOLID + `
.b { border-radius: 999px; padding-inline: calc(var(--u) * 5); }
.b-icon { padding: calc(var(--u) * 2.5); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Solid',
        name: 'Solid · compact',
        note: 'Smaller padding, xs text, medium weight',
        css: SOLID + `
.b-row { gap: calc(var(--u) * 2); }
.b { padding: calc(var(--u) * 1.75) calc(var(--u) * 3.25); font-size: var(--fs-xs); font-weight: 500; gap: calc(var(--u) * 1.5); }
.b-icon { padding: calc(var(--u) * 1.75); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Solid',
        name: 'Solid · large',
        note: 'Roomier padding, base-size text',
        css: SOLID + `
.b-row { gap: calc(var(--u) * 3); }
.b { padding: calc(var(--u) * 3.25) calc(var(--u) * 6); font-size: var(--fs-base); }
.b-icon { padding: calc(var(--u) * 3.25); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Solid',
        name: 'Solid · outlined secondary',
        note: 'Primary unchanged; secondary is a hairline ring, no fill',
        css: SOLID + `
.b-secondary { background: transparent; box-shadow: inset 0 0 0 1px var(--border-strong); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); box-shadow: inset 0 0 0 1px var(--text); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Solid',
        name: 'Solid · text secondary',
        note: 'Primary unchanged; secondary is bare text until hovered',
        css: SOLID + `
.b-secondary { background: transparent; color: var(--muted); padding-inline: calc(var(--u) * 3); }
.b-secondary:hover, .b-secondary.is-hover { background: var(--surface-2); color: var(--text); }
.b-icon { padding: calc(var(--u) * 2.5); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Solid',
        name: 'Solid · icon first',
        note: 'Icons lead the label, on both buttons',
        html: `
<div class="b-row">
  <button class="b b-primary"><span class="b-ic">{{icon:plus}}</span><span class="b-l">New project</span></button>
  <button class="b b-secondary"><span class="b-ic">{{icon:external}}</span><span class="b-l">Read more</span></button>
  <button class="b b-secondary b-icon" aria-label="Save">{{icon:heart}}</button>
</div>
<div class="b-row b-states dd-states">
  <button class="b b-primary is-hover"><span class="b-ic">{{icon:plus}}</span><span class="b-l">Hovered</span></button>
  <button class="b b-secondary is-hover"><span class="b-ic">{{icon:external}}</span><span class="b-l">Hovered</span></button>
  <button class="b b-primary" disabled><span class="b-ic">{{icon:plus}}</span><span class="b-l">Disabled</span></button>
</div>`,
        css: SOLID + `
.b { gap: calc(var(--u) * 1.75); padding-left: calc(var(--u) * 3.5); }
.b-icon { padding: calc(var(--u) * 2.5); }
.b-ic { opacity: .85; }
`,
      },
      {
        round: 3,
        basedOn: '#01 Solid',
        name: 'Solid · mono caps',
        note: 'Same fills; labels in your mono face, uppercase, tracked',
        css: SOLID + `
.b { font-family: var(--font-mono); font-size: var(--fs-xs); font-weight: 500; text-transform: uppercase; letter-spacing: .08em; }
`,
      },

      /* Round 4 — families around #23 Solid · icon first */
      {
        round: 4, family: true, basedOn: '#23 Solid · icon first',
        name: 'Solid · icon first · core set',
        note: 'Your pick across every role, size and state',
        html: BTN_FAMILY_HTML, page: BTN_PAGE,
        css: btnFamily({ r: 'var(--r-ctl)', py: 2.5, px: 4.5, w: 600, sec: 'tone' }),
      },
      {
        round: 4, family: true, basedOn: '#23 Solid · icon first',
        name: 'Solid · icon first · pill',
        note: 'Same set with fully rounded ends',
        html: BTN_FAMILY_HTML, page: BTN_PAGE,
        css: btnFamily({ r: '999px', py: 2.5, px: 4.75, w: 600, sec: 'tone' }),
      },
      {
        round: 4, family: true, basedOn: '#23 Solid · icon first',
        name: 'Solid · icon first · compact',
        note: 'Shorter heights and medium weight, for dense UI',
        html: BTN_FAMILY_HTML, page: BTN_PAGE,
        css: btnFamily({ r: 'var(--r-ctl)', py: 2, px: 3.75, w: 500, sec: 'tone' }),
      },
      {
        round: 4, family: true, basedOn: '#23 Solid · icon first',
        name: 'Solid · icon first · tall',
        note: 'Taller, roomier hit areas',
        html: BTN_FAMILY_HTML, page: BTN_PAGE,
        css: btnFamily({ r: 'var(--r-ctl)', py: 3, px: 5.25, w: 600, sec: 'tone' }),
      },
      {
        round: 4, family: true, basedOn: '#23 Solid · icon first',
        name: 'Solid · icon first · ring secondary',
        note: 'Secondary becomes a hairline ring instead of a tone',
        html: BTN_FAMILY_HTML, page: BTN_PAGE,
        css: btnFamily({ r: 'var(--r-ctl)', py: 2.5, px: 4.5, w: 600, sec: 'ring' }),
      },
      {
        round: 4, family: true, basedOn: '#23 Solid · icon first',
        name: 'Solid · icon first · soft roles',
        note: 'Danger is a tint, ghost hovers in accent tone',
        html: BTN_FAMILY_HTML, page: BTN_PAGE,
        css: btnFamily({ r: 'var(--r-ctl)', py: 2.5, px: 4.5, w: 600, sec: 'tone', soft: true }),
      },
    ],
  });

  /* ───────────────────────────── Inputs ───────────────────────────── */

  DD.category({
    id: 'inputs',
    group: 'Components',
    title: 'Text inputs',
    blurb: 'A resting field and a focused one with a value, validation mark and helper text.',
    html: `
<label class="f">
  <span class="f-label">Name</span>
  <span class="f-box"><span class="f-pre">›</span><input class="f-in" placeholder="Ada Lovelace"><span class="f-suf"></span></span>
</label>
<label class="f is-focus">
  <span class="f-label">Email</span>
  <span class="f-box"><span class="f-pre">›</span><input class="f-in" value="hello@cxkw.dev"><span class="f-suf">{{icon:check}}</span></span>
  <span class="f-help">Only when it matters. No newsletters.</span>
</label>`,
    css: `
display: flex; flex-direction: column; gap: calc(var(--u) * 4); max-width: 340px;
.f { position: relative; display: flex; flex-direction: column; gap: calc(var(--u) * 1.5); min-width: 0; cursor: text; }
.f-label { font-size: var(--fs-sm); font-weight: 600; color: var(--text); transition: color var(--dur) var(--ease); }
.f-box { display: flex; align-items: center; gap: calc(var(--u) * 2); min-width: 0;
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background-color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.f-in { flex: 1; min-width: 0; width: 100%; padding: 0; border: 0; outline: 0; background: transparent; color: var(--text);
  font: inherit; font-size: var(--fs-base); line-height: 1.4; caret-color: var(--accent); }
.f-in::placeholder { color: var(--faint); opacity: 1; }
.f-pre { display: none; color: var(--muted); }
.f-suf { display: flex; color: var(--ok); }
.f-help { font-size: var(--fs-xs); color: var(--muted); }
`,
    options: [
      {
        name: 'Boxed',
        note: 'Classic frame + soft focus halo',
        css: `
.f-box { padding: calc(var(--u) * 2.5) calc(var(--u) * 3.5); background: var(--surface);
  border: max(var(--bw), 1px) var(--bstyle) var(--border-strong); border-radius: var(--r-ctl); }
.f-box:hover { border-color: color-mix(in oklab, var(--border-strong), var(--text) 25%); }
.f-box:focus-within, .f.is-focus .f-box { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 55%, transparent); }
`,
      },
      {
        name: 'Filled',
        note: 'Tinted well with a bottom rule',
        css: `
.f-label { font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 3) calc(var(--u) * 3.5); background: var(--surface-2); border-radius: var(--r-ctl);
  box-shadow: inset 0 -2px 0 var(--border-strong); }
.f-box:hover { background: color-mix(in oklab, var(--surface-2), var(--text) 5%); }
.f-box:focus-within, .f.is-focus .f-box { background: color-mix(in oklab, var(--surface-2), var(--accent) 7%); box-shadow: inset 0 -2px 0 var(--accent); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
`,
      },
      {
        name: 'Underline',
        note: 'Just a line; tracked caps labels',
        css: `
gap: calc(var(--u) * 6);
.f-label { font-size: var(--fs-xs); font-weight: 600; text-transform: uppercase; letter-spacing: .12em; color: var(--muted); }
.f-box { padding: calc(var(--u) * 2) 0; border-bottom: 1.5px solid var(--border-strong); }
.f-box:focus-within, .f.is-focus .f-box { border-bottom-color: var(--accent); box-shadow: 0 1.5px 0 var(--accent); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
`,
      },
      {
        name: 'Floating label',
        note: 'Label tucked inside the field',
        css: `
.f-label { position: absolute; top: calc(var(--u) * 2.25); left: calc(var(--u) * 3.5); z-index: 1; pointer-events: none;
  font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 6.5) calc(var(--u) * 3.5) calc(var(--u) * 2.25); background: var(--surface);
  border: 1px solid var(--border); border-radius: var(--r-ctl); }
.f-box:hover { border-color: var(--border-strong); }
.f-box:focus-within, .f.is-focus .f-box { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-help { padding-left: calc(var(--u) * 3.5); }
`,
      },
      {
        name: 'Pill',
        note: 'Rounded capsule, halo on focus',
        css: `
.f-label { padding-left: calc(var(--u) * 5); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 2.75) calc(var(--u) * 5); border-radius: 999px; background: var(--surface-2); border: 1px solid transparent; }
.f-box:focus-within, .f.is-focus .f-box { background: var(--surface); border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
.f-help { padding-left: calc(var(--u) * 5); }
`,
      },
      {
        name: 'Inset well',
        note: 'Pressed-in, tactile',
        css: `
.f-box { padding: calc(var(--u) * 3) calc(var(--u) * 3.5); border-radius: var(--r-ctl);
  background: color-mix(in oklab, var(--bg), var(--text) 4%);
  box-shadow: inset 0 2px 5px color-mix(in oklab, black 14%, transparent), inset 0 0 0 1px var(--border); }
.f-box:focus-within, .f.is-focus .f-box {
  box-shadow: inset 0 2px 5px color-mix(in oklab, black 14%, transparent), inset 0 0 0 2px var(--accent); }
`,
      },
      {
        name: 'Brutalist',
        note: 'Heavy rule, hard shadow, lifts on focus',
        css: `
gap: calc(var(--u) * 5);
.f-label { font-family: var(--font-mono); font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
.f-box { padding: calc(var(--u) * 3) calc(var(--u) * 3.5); background: var(--surface); border: 2px solid var(--text);
  border-radius: 0; box-shadow: 4px 4px 0 var(--text); }
.f-box:focus-within, .f.is-focus .f-box { box-shadow: 6px 6px 0 var(--accent); transform: translate(-2px, -2px); }
.f-help { font-family: var(--font-mono); }
`,
      },
      {
        name: 'Ghost',
        note: 'Invisible until hovered — page-like',
        css: `
.f-label { font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 2.5) calc(var(--u) * 3); border: 1px solid transparent; border-radius: var(--r-ctl);
  background: color-mix(in oklab, var(--surface-2) 45%, transparent); }
.f-in { font-size: var(--fs-lg); font-weight: 500; }
.f-box:hover { background: var(--surface-2); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--surface); border-color: var(--border-strong); box-shadow: var(--shadow); }
`,
      },
      {
        name: 'Inline label',
        note: 'Settings-sheet rows, label on the left',
        css: `
gap: 0;
.f { display: grid; grid-template-columns: 5.5em minmax(0, 1fr); align-items: center; column-gap: calc(var(--u) * 3); row-gap: calc(var(--u) * 1);
  padding: calc(var(--u) * 3) 0; border-top: 1px solid var(--border); }
.f:last-child { border-bottom: 1px solid var(--border); }
.f-label { font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 1.5) calc(var(--u) * 2); border-radius: var(--r-ctl); }
.f-box:hover { background: var(--surface-2); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--accent-soft); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--text); }
.f-help { grid-column: 2; padding-left: calc(var(--u) * 2); }
`,
      },
      {
        name: 'Terminal',
        note: 'Mono, › prompt, gutter rail',
        css: `
.f-label { font-family: var(--font-mono); font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-label::before { content: '// '; color: var(--faint); }
.f-box { padding: calc(var(--u) * 2.5) calc(var(--u) * 3); background: var(--surface-2); border-left: 2px solid var(--border-strong); }
.f-pre { display: block; color: var(--accent); font-family: var(--font-mono); font-weight: 700; }
.f-in { font-family: var(--font-mono); font-size: var(--fs-sm); }
.f-box:focus-within, .f.is-focus .f-box { border-left-color: var(--accent); background: color-mix(in oklab, var(--surface-2), var(--accent) 6%); }
.f-suf { display: none; }
.f-help { font-family: var(--font-mono); }
.f.is-focus .f-help::before { content: '✓ '; color: var(--ok); }
`,
      },
      {
        name: 'Notched',
        note: 'Label sits in the border',
        css: `
gap: calc(var(--u) * 6); padding-top: calc(var(--u) * 2);
.f-label { position: absolute; top: 0; left: calc(var(--u) * 2.5); z-index: 1; transform: translateY(-50%);
  padding: 0 calc(var(--u) * 1.5); background: var(--notch-bg, var(--bg)); line-height: 1.2;
  font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 3.5) calc(var(--u) * 3.5) calc(var(--u) * 3); border: 1px solid var(--border-strong); border-radius: var(--r-ctl); }
.f-box:focus-within, .f.is-focus .f-box { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-help { padding-left: calc(var(--u) * 3.5); }
`,
      },
      {
        name: 'Accent rail',
        note: 'Left rail lights up on focus',
        css: `
.f-label { font-size: var(--fs-base); font-weight: 600; font-variant-caps: all-small-caps; letter-spacing: .06em; color: var(--muted); }
.f-box { padding: calc(var(--u) * 3) calc(var(--u) * 4); background: var(--surface); border-radius: var(--r-ctl);
  box-shadow: inset 3px 0 0 var(--border-strong), var(--shadow-sm); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent), var(--shadow-sm); }
`,
      },
      {
        name: 'Search',
        note: 'Icon + ⌘K hint, palette-ready',
        html: `
<label class="f">
  <span class="f-box"><span class="f-pre">{{icon:search}}</span><input class="f-in" placeholder="Search projects, notes…" aria-label="Search"><span class="f-suf"><kbd>⌘K</kbd></span></span>
</label>
<label class="f is-focus">
  <span class="f-box"><span class="f-pre">{{icon:search}}</span><input class="f-in" value="dawn" aria-label="Search"><span class="f-suf"><kbd>esc</kbd></span></span>
  <span class="f-help">3 results in Projects</span>
</label>`,
        css: `
.f-box { padding: calc(var(--u) * 2.5) calc(var(--u) * 3.5); background: var(--surface-2); border: 1px solid transparent; border-radius: var(--r-box); }
.f-pre { display: flex; }
.f-suf { color: var(--muted); }
.f-in { font-size: var(--fs-sm); }
kbd { font-family: var(--font-mono); font-size: var(--fs-xs); line-height: 1; padding: 3px 6px; border: 1px solid var(--border);
  border-bottom-width: 2px; border-radius: 5px; background: var(--surface); color: var(--muted); }
.f-box:hover { border-color: var(--border); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--surface); border-color: color-mix(in oklab, var(--accent) 50%, var(--border));
  box-shadow: 0 0 0 4px var(--accent-soft), var(--shadow); }
.f.is-focus .f-pre, .f:focus-within .f-pre { color: var(--accent); }
`,
      },
      {
        name: 'Editorial',
        note: 'Big display-font entry, mono label',
        css: `
gap: calc(var(--u) * 7);
.f-label { font-family: var(--font-mono); font-size: var(--fs-xs); font-weight: 500; text-transform: uppercase; letter-spacing: .14em; color: var(--muted); }
.f-box { padding: calc(var(--u) * 1) 0 calc(var(--u) * 2); border-bottom: 1px solid var(--text); }
.f-in { font-family: var(--font-display); font-size: var(--fs-xl); line-height: 1.2; }
.f-in::placeholder { font-style: italic; }
.f-box:focus-within, .f.is-focus .f-box { border-bottom-color: var(--accent); box-shadow: 0 1px 0 var(--accent); }
.f-help { font-style: italic; }
`,
      },

      /* Round 2 — borderless at rest, small labels, input size spread xs → xl */
      {
        round: 2,
        name: 'Tonal',
        note: 'Quiet fill, tiny label above · sm text',
        css: `
gap: calc(var(--u) * 3.5);
.f { gap: calc(var(--u) * 1); }
.f-label { font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 2.25) calc(var(--u) * 3); background: var(--surface-2); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-sm); }
.f-box:hover { background: color-mix(in oklab, var(--surface-2), var(--text) 4%); }
.f-box:focus-within, .f.is-focus .f-box { background: color-mix(in oklab, var(--surface-2), var(--text) 8%); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--text); }
`,
      },
      {
        round: 2,
        name: 'Tucked label',
        note: 'Micro label inside the fill, value below · sm',
        css: `
gap: calc(var(--u) * 3);
.f { gap: calc(var(--u) * 1.25); }
.f-label { position: absolute; top: calc(var(--u) * 2); left: calc(var(--u) * 3); z-index: 1; pointer-events: none;
  font-size: var(--fs-xs); font-weight: 500; line-height: 1.2; color: var(--muted); }
.f-box { padding: calc(var(--u) * 6.5) calc(var(--u) * 3) calc(var(--u) * 2); background: var(--surface-2); border-radius: var(--r-box); }
.f-in { font-size: var(--fs-sm); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--surface); box-shadow: var(--shadow); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-help { padding-left: calc(var(--u) * 3); }
`,
      },
      {
        round: 2,
        name: 'Micro caps',
        note: 'Tracked caps label, focus tints accent · sm',
        css: `
gap: calc(var(--u) * 3.5);
.f { gap: calc(var(--u) * 1.25); }
.f-label { font-size: calc(var(--fs-xs) * .88); font-weight: 600; text-transform: uppercase; letter-spacing: .12em; color: var(--faint); }
.f-box { padding: calc(var(--u) * 2.5) calc(var(--u) * 3); background: var(--surface-2); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-sm); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--accent-soft); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
`,
      },
      {
        round: 2,
        name: 'Mono micro',
        note: 'Lowercase mono label, compact · xs text',
        css: `
gap: calc(var(--u) * 3);
.f { gap: calc(var(--u) * 1); }
.f-label { font-family: var(--font-mono); font-size: calc(var(--fs-xs) * .92); font-weight: 400; text-transform: lowercase; letter-spacing: .02em; color: var(--muted); }
.f-box { padding: calc(var(--u) * 2) calc(var(--u) * 2.5); background: var(--surface-2); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-xs); }
.f-help { font-family: var(--font-mono); font-size: calc(var(--fs-xs) * .92); }
.f-box:focus-within, .f.is-focus .f-box { background: color-mix(in oklab, var(--surface-2), var(--accent) 9%); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
`,
      },
      {
        round: 2,
        name: 'Focus baseline',
        note: 'Fill grows an accent line only on focus · base',
        css: `
.f-label { font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 3) calc(var(--u) * 3.5); border-radius: var(--r-ctl);
  background: linear-gradient(var(--accent), var(--accent)) center bottom / 0% 2px no-repeat, var(--surface-2);
  transition: background-size var(--dur) var(--ease), background-color var(--dur) var(--ease); }
.f-in { font-size: var(--fs-base); }
.f-box:focus-within, .f.is-focus .f-box { background-size: 100% 2px, auto; }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--text); }
`,
      },
      {
        round: 2,
        name: 'Bare',
        note: 'Nothing at rest — focus brings a soft fill · sm',
        css: `
gap: calc(var(--u) * 3);
.f { gap: calc(var(--u) * 0.5); }
.f-label { padding-left: calc(var(--u) * 2.5); font-size: var(--fs-xs); font-weight: 500; color: var(--faint); }
.f-box { padding: calc(var(--u) * 2) calc(var(--u) * 2.5); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-sm); }
.f-box:hover { background: color-mix(in oklab, var(--surface-2) 50%, transparent); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--surface-2); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--muted); }
.f-help { padding-left: calc(var(--u) * 2.5); }
`,
      },
      {
        round: 2,
        name: 'Settings sheet',
        note: 'Label left, value right, no rules · sm',
        css: `
gap: calc(var(--u) * 1);
.f { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; column-gap: calc(var(--u) * 4); row-gap: calc(var(--u) * 0.5);
  padding: calc(var(--u) * 2.5) calc(var(--u) * 3); border-radius: var(--r-ctl); transition: background-color var(--dur) var(--ease); }
.f:hover { background: color-mix(in oklab, var(--surface-2) 60%, transparent); }
.f:focus-within, .f.is-focus { background: var(--surface-2); }
.f-label { font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--text); }
.f-box { justify-content: flex-end; }
.f-in { font-size: var(--fs-sm); text-align: right; }
.f-help { grid-column: 1 / -1; text-align: right; }
`,
      },
      {
        round: 2,
        name: 'Soft pill',
        note: 'Borderless capsule, lifts on focus · xs',
        css: `
gap: calc(var(--u) * 3.5);
.f { gap: calc(var(--u) * 1); }
.f-label { padding-left: calc(var(--u) * 4); font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 2.25) calc(var(--u) * 4); border-radius: 999px; background: var(--surface-2); }
.f-in { font-size: var(--fs-xs); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--surface);
  box-shadow: 0 1px 2px color-mix(in oklab, black 8%, transparent), 0 6px 18px -8px color-mix(in oklab, black 30%, transparent); }
.f-help { padding-left: calc(var(--u) * 4); }
`,
      },
      {
        round: 2,
        name: 'Tiny label · big value',
        note: 'Micro caps over an xl value, no fill at rest',
        css: `
gap: calc(var(--u) * 5);
.f { gap: calc(var(--u) * 0.5); }
.f-label { padding-left: calc(var(--u) * 2); font-size: calc(var(--fs-xs) * .88); font-weight: 600; text-transform: uppercase; letter-spacing: .14em; color: var(--faint); }
.f-box { padding: calc(var(--u) * 1.5) calc(var(--u) * 2); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-xl); font-weight: 600; letter-spacing: -0.01em; line-height: 1.25; }
.f-box:hover { background: color-mix(in oklab, var(--surface-2) 50%, transparent); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--accent-soft); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-help { padding-left: calc(var(--u) * 2); }
`,
      },
      {
        round: 2,
        name: 'Placeholder float',
        note: 'Label rests as placeholder, floats tiny when filled · base',
        html: `
<label class="f">
  <span class="f-label">Name</span>
  <span class="f-box"><input class="f-in" placeholder=" "><span class="f-suf"></span></span>
</label>
<label class="f is-focus">
  <span class="f-label">Email</span>
  <span class="f-box"><input class="f-in" value="hello@cxkw.dev" placeholder=" "><span class="f-suf">{{icon:check}}</span></span>
  <span class="f-help">Only when it matters. No newsletters.</span>
</label>`,
        css: `
gap: calc(var(--u) * 3);
.f { gap: calc(var(--u) * 1.25); }
.f-box { padding: calc(var(--u) * 5) calc(var(--u) * 3.5) calc(var(--u) * 1.5); background: var(--surface-2); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-base); }
.f-label { position: absolute; z-index: 1; left: calc(var(--u) * 3.5); top: calc(var(--u) * 3.25); pointer-events: none;
  font-size: var(--fs-base); font-weight: 400; line-height: 1.4; color: var(--faint);
  transition: top var(--dur) var(--ease), font-size var(--dur) var(--ease), color var(--dur) var(--ease); }
.f.is-focus .f-label, .f:focus-within .f-label, .f:has(.f-in:not(:placeholder-shown)) .f-label {
  top: calc(var(--u) * 1.5); font-size: calc(var(--fs-xs) * .92); font-weight: 500; line-height: 1.2; color: var(--muted); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-box:focus-within, .f.is-focus .f-box { background: color-mix(in oklab, var(--surface-2), var(--accent) 8%); }
.f-help { padding-left: calc(var(--u) * 3.5); }
`,
      },
      {
        round: 2,
        name: 'Grouped cells',
        note: 'iOS-style stack in one surface, split by tone · sm',
        html: `
<div class="f-grp">
  <label class="f"><span class="f-label">Name</span><span class="f-box"><input class="f-in" placeholder="Ada Lovelace"></span></label>
  <label class="f is-focus"><span class="f-label">Email</span><span class="f-box"><input class="f-in" value="hello@cxkw.dev"><span class="f-suf">{{icon:check}}</span></span></label>
  <label class="f"><span class="f-label">City</span><span class="f-box"><input class="f-in" placeholder="Brooklyn, NY"></span></label>
</div>
<span class="f-help">Only when it matters. No newsletters.</span>`,
        css: `
gap: calc(var(--u) * 2);
.f-grp { display: flex; flex-direction: column; gap: 2px; border-radius: var(--r-box); overflow: hidden; }
.f { gap: calc(var(--u) * 0.5); padding: calc(var(--u) * 2.25) calc(var(--u) * 3.5); background: var(--surface-2); transition: background-color var(--dur) var(--ease); }
.f-label { font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-in { font-size: var(--fs-sm); }
.f:hover { background: color-mix(in oklab, var(--surface-2), var(--text) 4%); }
.f:focus-within, .f.is-focus { background: var(--accent-soft); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
.f-help { padding-left: calc(var(--u) * 3.5); }
`,
      },
      {
        round: 2,
        name: 'Shadow lift',
        note: 'Defined by a soft drop shadow only · sm',
        css: `
gap: calc(var(--u) * 4);
.f-label { font-size: var(--fs-xs); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 2.75) calc(var(--u) * 3.5); background: var(--surface); border-radius: var(--r-ctl);
  box-shadow: inset 0 1px 0 color-mix(in oklab, var(--text) 6%, transparent), 0 1px 2px color-mix(in oklab, black 8%, transparent),
    0 4px 12px -3px color-mix(in oklab, black 16%, transparent); }
.f-in { font-size: var(--fs-sm); }
.f-box:focus-within, .f.is-focus .f-box { transform: translateY(-1px);
  box-shadow: inset 0 1px 0 color-mix(in oklab, var(--text) 6%, transparent), 0 2px 4px color-mix(in oklab, black 8%, transparent),
    0 14px 30px -10px color-mix(in oklab, black 32%, transparent); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--text); }
`,
      },
      {
        round: 2,
        name: 'Ring on focus',
        note: 'Flat fill; a ring appears only when focused · xs',
        css: `
gap: calc(var(--u) * 3.5);
.f { gap: calc(var(--u) * 1.25); }
.f-label { font-size: var(--fs-xs); font-weight: 600; color: var(--text); }
.f-box { padding: calc(var(--u) * 2.25) calc(var(--u) * 3); background: var(--surface-2); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-xs); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--surface); box-shadow: 0 0 0 1.5px var(--accent), 0 0 0 5px var(--accent-soft); }
`,
      },
      {
        round: 2,
        name: 'Two-up compact',
        note: 'Name + email side by side, dense · xs',
        html: `
<div class="f-two">
  <label class="f"><span class="f-label">Name</span><span class="f-box"><input class="f-in" placeholder="Ada Lovelace"></span></label>
  <label class="f is-focus"><span class="f-label">Email</span><span class="f-box"><input class="f-in" value="hello@cxkw.dev"><span class="f-suf">{{icon:check}}</span></span></label>
</div>
<label class="f"><span class="f-label">Note</span><span class="f-box"><input class="f-in" placeholder="What are you building?"></span></label>
<span class="f-help">Only when it matters. No newsletters.</span>`,
        css: `
gap: calc(var(--u) * 2.5);
.f-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: calc(var(--u) * 2.5); }
.f { gap: calc(var(--u) * 1); }
.f-label { font-size: calc(var(--fs-xs) * .92); font-weight: 500; color: var(--muted); }
.f-box { padding: calc(var(--u) * 1.75) calc(var(--u) * 2.5); background: var(--surface-2); border-radius: var(--r-ctl); }
.f-in { font-size: var(--fs-xs); }
.f-box:focus-within, .f.is-focus .f-box { background: var(--accent-soft); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--accent); }
`,
      },

      /* Round 3 — siblings of #25 Grouped cells */
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · hairline seams',
        note: '1px inset hairlines instead of gaps; lighter focus tone so seams stay visible',
        html: GROUP_HTML,
        css: GROUP + `
.f-grp { gap: 0; }
.f + .f { background-image: linear-gradient(color-mix(in oklab, var(--text) 12%, transparent), color-mix(in oklab, var(--text) 12%, transparent));
  background-repeat: no-repeat; background-size: 100% 1px; background-position: calc(var(--u) * 3.5) 0; }
.f:focus-within, .f.is-focus { background-color: color-mix(in oklab, var(--surface-2), var(--text) 6%); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · inline labels',
        note: 'Label sits left of the value on one line',
        html: GROUP_HTML,
        css: GROUP + `
.f { display: grid; grid-template-columns: 4.5em minmax(0, 1fr); align-items: center; column-gap: calc(var(--u) * 3); padding-block: calc(var(--u) * 2.75); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · roomy',
        note: 'More padding, base-size values',
        html: GROUP_HTML,
        css: GROUP + `
.f-grp { gap: 3px; }
.f { gap: calc(var(--u) * 1); padding: calc(var(--u) * 3.25) calc(var(--u) * 4); }
.f-in { font-size: var(--fs-base); }
.f-help { padding-left: calc(var(--u) * 4); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · dense',
        note: 'Tighter cells, xs values, smaller labels',
        html: GROUP_HTML,
        css: GROUP + `
.f { gap: 0; padding: calc(var(--u) * 1.5) calc(var(--u) * 3); }
.f-label { font-size: calc(var(--fs-xs) * .9); }
.f-in { font-size: var(--fs-xs); }
.f-help { padding-left: calc(var(--u) * 3); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · micro caps labels',
        note: 'Labels in tiny tracked caps, fainter',
        html: GROUP_HTML,
        css: GROUP + `
.f { gap: calc(var(--u) * 1); }
.f-label { font-size: calc(var(--fs-xs) * .85); font-weight: 600; text-transform: uppercase; letter-spacing: .12em; color: var(--faint); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · mono labels',
        note: 'Labels and helper text in your mono face, lowercase',
        html: GROUP_HTML,
        css: GROUP + `
.f-label { font-family: var(--font-mono); font-size: calc(var(--fs-xs) * .92); font-weight: 400; text-transform: lowercase; }
.f-help { font-family: var(--font-mono); font-size: calc(var(--fs-xs) * .92); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · focus bar',
        note: 'Focus shows a 2px ink bar instead of a tint',
        html: GROUP_HTML,
        css: GROUP + `
.f:focus-within, .f.is-focus { background: var(--surface-2); box-shadow: inset 2px 0 0 var(--accent); }
.f.is-focus .f-label, .f:focus-within .f-label { color: var(--text); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · tray',
        note: 'Lighter cells sitting inside a tonal tray',
        html: GROUP_HTML,
        css: GROUP + `
.f-grp { gap: 3px; padding: 3px; background: var(--surface-2); }
.f { background: var(--surface); border-radius: var(--r-ctl); }
.f:hover { background: color-mix(in oklab, var(--surface), var(--text) 3%); }
`,
      },
      {
        round: 3,
        basedOn: '#25 Grouped cells',
        name: 'Grouped cells · two-up row',
        note: 'Name and city share the first row',
        html: `
<div class="f-grp">
  <div class="f-row">
    <label class="f"><span class="f-label">Name</span><span class="f-box"><input class="f-in" placeholder="Ada Lovelace"></span></label>
    <label class="f"><span class="f-label">City</span><span class="f-box"><input class="f-in" placeholder="Brooklyn, NY"></span></label>
  </div>
  <label class="f is-focus"><span class="f-label">Email</span><span class="f-box"><input class="f-in" value="hello@cxkw.dev"><span class="f-suf">{{icon:check}}</span></span></label>
</div>
<span class="f-help">Only when it matters. No newsletters.</span>`,
        css: GROUP + `
.f-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px; }
`,
      },

      /* Round 4 — families around #16 Tucked label */
      {
        round: 4, family: true, basedOn: '#16 Tucked label',
        name: 'Tucked label · core set',
        note: 'Your pick with error, disabled, icon, unit, textarea and small',
        html: INPUT_FAMILY_HTML,
        css: inputFamily({ pt: 6.5, px: 3, pb: 2, lt: 2, val: 'var(--fs-sm)', focus: 'lift', fill: 'color-mix(in oklab, var(--surface-2), var(--text) 4%)' }),
      },
      {
        round: 4, family: true, basedOn: '#16 Tucked label',
        name: 'Tucked label · focus ring',
        note: 'Focus draws a thin accent ring instead of lifting',
        html: INPUT_FAMILY_HTML,
        css: inputFamily({ pt: 6.5, px: 3, pb: 2, lt: 2, val: 'var(--fs-sm)', focus: 'ring', fill: 'color-mix(in oklab, var(--surface-2), var(--text) 4%)' }),
      },
      {
        round: 4, family: true, basedOn: '#16 Tucked label',
        name: 'Tucked label · focus line',
        note: 'Focus grows a 2px accent baseline',
        html: INPUT_FAMILY_HTML,
        css: inputFamily({ pt: 6.5, px: 3, pb: 2, lt: 2, val: 'var(--fs-sm)', focus: 'line', fill: 'color-mix(in oklab, var(--surface-2), var(--text) 4%)' }),
      },
      {
        round: 4, family: true, basedOn: '#16 Tucked label',
        name: 'Tucked label · roomy',
        note: 'More padding and base-size values',
        html: INPUT_FAMILY_HTML,
        css: inputFamily({ pt: 7.5, px: 4, pb: 2.75, lt: 2.5, val: 'var(--fs-base)', focus: 'lift', fill: 'color-mix(in oklab, var(--surface-2), var(--text) 4%)' }),
      },
      {
        round: 4, family: true, basedOn: '#16 Tucked label',
        name: 'Tucked label · micro caps',
        note: 'Labels in tiny tracked caps',
        html: INPUT_FAMILY_HTML,
        css: inputFamily({ pt: 6.5, px: 3, pb: 2, lt: 2, val: 'var(--fs-sm)', focus: 'lift', fill: 'color-mix(in oklab, var(--surface-2), var(--text) 4%)', caps: true }),
      },
      {
        round: 4, family: true, basedOn: '#16 Tucked label',
        name: 'Tucked label · deeper fill',
        note: 'A darker resting tone, so fields read without borders',
        html: INPUT_FAMILY_HTML,
        css: inputFamily({ pt: 6.5, px: 3, pb: 2, lt: 2, val: 'var(--fs-sm)', focus: 'lift', fill: 'color-mix(in oklab, var(--surface-2), var(--text) 9%)' }),
      },
    ],
  });

  /* ───────────────────────────── Dropdowns ───────────────────────────── */

  DD.category({
    id: 'dropdowns',
    group: 'Components',
    title: 'Dropdowns & menus',
    blurb: 'Trigger plus its open menu — “Dusk” is selected, “System” is hovered.',
    html: `
<div class="dd">
  <button class="dd-trigger"><span class="dd-tic">{{icon:moon}}</span><span class="dd-val">Dusk</span><span class="dd-chev">{{icon:chevron-down}}</span></button>
  <div class="dd-menu">
    <div class="dd-search"><span class="dd-sic">{{icon:search}}</span><span class="dd-sph">Search themes…</span></div>
    <div class="dd-group">Appearance</div>
    <div class="dd-item"><span class="dd-dot" style="--dot: var(--warn)"></span><span class="dd-ic">{{icon:sun}}</span><span class="dd-txt"><span class="dd-name">Dawn</span><span class="dd-desc">Light, warm paper</span></span><span class="dd-kbd">⌘1</span><span class="dd-check">{{icon:check}}</span></div>
    <div class="dd-item is-selected"><span class="dd-dot" style="--dot: var(--info)"></span><span class="dd-ic">{{icon:moon}}</span><span class="dd-txt"><span class="dd-name">Dusk</span><span class="dd-desc">Deep, low light</span></span><span class="dd-kbd">⌘2</span><span class="dd-check">{{icon:check}}</span></div>
    <div class="dd-item is-hover"><span class="dd-dot" style="--dot: var(--muted)"></span><span class="dd-ic">{{icon:settings}}</span><span class="dd-txt"><span class="dd-name">System</span><span class="dd-desc">Follows your OS</span></span><span class="dd-kbd">⌘3</span><span class="dd-check">{{icon:check}}</span></div>
    <div class="dd-sep"></div>
    <div class="dd-group">Danger zone</div>
    <div class="dd-item is-danger"><span class="dd-dot" style="--dot: var(--bad)"></span><span class="dd-ic">{{icon:trash}}</span><span class="dd-txt"><span class="dd-name">Reset theme</span><span class="dd-desc">Back to defaults</span></span><span class="dd-kbd">⌫</span><span class="dd-check">{{icon:check}}</span></div>
  </div>
</div>`,
    css: `
.dd { display: flex; flex-direction: column; gap: calc(var(--u) * 1.5); width: 100%; max-width: 270px; font-size: var(--fs-sm); }
.dd-trigger { display: flex; align-items: center; gap: calc(var(--u) * 2); width: 100%; padding: calc(var(--u) * 2.5) calc(var(--u) * 3);
  font: inherit; color: var(--text); text-align: left; cursor: pointer; background: var(--surface);
  border: max(var(--bw), 1px) var(--bstyle) var(--border-strong); border-radius: var(--r-ctl);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background-color var(--dur) var(--ease); }
.dd-val { flex: 1; font-weight: 500; }
.dd-chev { display: flex; color: var(--muted); transform: rotate(180deg); }
.dd-tic { display: none; color: var(--muted); }
.dd-menu { display: flex; flex-direction: column; padding: calc(var(--u) * 1.5); background: var(--surface);
  border: max(var(--bw), 1px) var(--bstyle) var(--border); border-radius: var(--r-box); box-shadow: var(--shadow-lg); }
.dd-item { display: flex; align-items: center; gap: calc(var(--u) * 2.5); padding: calc(var(--u) * 2) calc(var(--u) * 2.5);
  border-radius: var(--r-ctl); color: var(--text); cursor: pointer;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease); }
.dd-item:hover, .dd-item.is-hover { background: var(--surface-2); }
.dd-txt { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.dd-name { font-weight: 500; }
.dd-desc, .dd-kbd, .dd-search, .dd-group, .dd-dot, .dd-ic { display: none; }
.dd-desc { font-size: var(--fs-xs); color: var(--muted); }
.dd-kbd { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--faint); }
.dd-ic { color: var(--muted); }
.dd-dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--dot); }
.dd-check { display: flex; color: var(--accent); visibility: hidden; }
.dd-item.is-selected .dd-check { visibility: visible; }
.dd-sep { height: 1px; margin: calc(var(--u) * 1.5) calc(var(--u) * -1.5); background: var(--border); }
.dd-group { padding: calc(var(--u) * 2) calc(var(--u) * 2.5) calc(var(--u) * 1); font-size: var(--fs-xs); font-weight: 600; color: var(--muted); }
.dd-search { align-items: center; gap: calc(var(--u) * 2); margin: calc(var(--u) * -1.5) calc(var(--u) * -1.5) calc(var(--u) * 1.5);
  padding: calc(var(--u) * 2.5) calc(var(--u) * 3); color: var(--faint); border-bottom: 1px solid var(--border); }
.dd-sic { display: flex; }
.dd-item.is-danger, .dd-item.is-danger .dd-ic { color: var(--bad); }
`,
    options: [
      {
        name: 'Classic',
        note: 'Selected row tinted with accent',
        css: `
.dd-check { display: none; }
.dd-item.is-selected { background: var(--accent-soft); color: color-mix(in oklab, var(--accent) 80%, var(--text)); }
.dd-item.is-selected .dd-name { font-weight: 600; }
`,
      },
      {
        name: 'Checkmark',
        note: 'Leading check, shortcut hints',
        css: `
.dd-check { order: -1; color: var(--text); }
.dd-item { padding-left: calc(var(--u) * 2); }
.dd-item.is-selected .dd-name { font-weight: 600; }
.dd-kbd { display: block; }
`,
      },
      {
        name: 'Icon + description',
        note: 'Icon tiles with a second line',
        css: `
.dd { max-width: 290px; }
.dd-tic, .dd-ic { display: flex; }
.dd-desc { display: block; }
.dd-ic { flex: none; width: 32px; height: 32px; align-items: center; justify-content: center; border-radius: var(--r-ctl);
  background: var(--surface-2); color: var(--text); transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
.dd-item { gap: calc(var(--u) * 3); }
.dd-name { font-weight: 600; }
.dd-check { display: none; }
.dd-item.is-selected .dd-ic { background: var(--accent); color: var(--on-accent); }
.dd-item.is-danger .dd-ic { background: var(--bad-soft); color: var(--bad); }
.dd-sep { background: transparent; margin-block: calc(var(--u) * 0.5); }
`,
      },
      {
        name: 'Command palette',
        note: 'Search, groups, kbd hints',
        css: `
.dd { max-width: 300px; }
.dd-menu { border-radius: var(--r-lg); box-shadow: var(--shadow-lg), 0 0 0 1px var(--border); }
.dd-search { display: flex; font-size: var(--fs-sm); }
.dd-group { display: block; }
.dd-ic, .dd-kbd { display: flex; }
.dd-kbd { padding: 2px 6px; border-radius: 5px; background: var(--surface-2); color: var(--muted); }
.dd-check { display: none; }
.dd-item:hover, .dd-item.is-hover { background: var(--accent-soft); }
.dd-item:hover .dd-ic, .dd-item.is-hover .dd-ic { color: var(--accent); }
.dd-item.is-selected .dd-name::after { content: ' · current'; color: var(--faint); font-weight: 400; }
`,
      },
      {
        name: 'Grouped',
        note: 'Labeled sections, full-bleed rows',
        css: `
.dd-menu { padding: calc(var(--u) * 1.5) 0; }
.dd-group { display: block; padding-inline: calc(var(--u) * 3.5); font-size: 10.5px; text-transform: uppercase; letter-spacing: .1em; color: var(--faint); }
.dd-item { border-radius: 0; padding-inline: calc(var(--u) * 3.5); }
.dd-desc { display: block; }
.dd-sep { margin: calc(var(--u) * 1.5) 0; }
.dd-item.is-selected .dd-name { font-weight: 600; }
`,
      },
      {
        name: 'Chips',
        note: 'Options as pill chips',
        css: `
.dd { max-width: 300px; }
.dd-trigger { border-radius: 999px; }
.dd-menu { flex-direction: row; flex-wrap: wrap; gap: calc(var(--u) * 2); padding: calc(var(--u) * 3); }
.dd-sep, .dd-check { display: none; }
.dd-ic { display: flex; }
.dd-txt { flex: none; }
.dd-item { gap: calc(var(--u) * 1.5); padding: calc(var(--u) * 1.5) calc(var(--u) * 3); border-radius: 999px; border: 1px solid var(--border); }
.dd-item:hover, .dd-item.is-hover { border-color: var(--border-strong); background: var(--surface-2); }
.dd-item.is-selected { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.dd-item.is-selected .dd-ic { color: var(--on-accent); }
.dd-item.is-danger { border-style: dashed; border-color: color-mix(in oklab, var(--bad) 50%, transparent); }
`,
      },
      {
        name: 'Brutalist',
        note: 'Ruled rows, hard shadow, inverted pick',
        css: `
.dd-trigger { border: 2px solid var(--text); border-radius: 0; box-shadow: 3px 3px 0 var(--text);
  font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.dd-menu { margin-top: calc(var(--u) * 1); padding: 0; border: 2px solid var(--text); border-radius: 0; box-shadow: 5px 5px 0 var(--text); }
.dd-item { border-radius: 0; border-bottom: 2px solid var(--text); padding: calc(var(--u) * 2.5) calc(var(--u) * 3); font-weight: 600; }
.dd-item:last-child { border-bottom: 0; }
.dd-sep { display: none; }
.dd-item:hover, .dd-item.is-hover { background: var(--accent); color: var(--on-accent); }
.dd-item.is-selected { background: var(--text); color: var(--bg); }
.dd-item.is-selected .dd-check { color: var(--bg); }
.dd-kbd { display: block; color: inherit; font-weight: 700; opacity: .7; }
`,
      },
      {
        name: 'Glass',
        note: 'Frosted menu over color',
        css: `
${GLASS_FIELD}
.dd-trigger, .dd-menu { background: color-mix(in oklab, var(--surface) 50%, transparent);
  backdrop-filter: blur(18px) saturate(1.5); -webkit-backdrop-filter: blur(18px) saturate(1.5);
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in oklab, white 25%, transparent), var(--shadow); }
.dd-menu { border-radius: var(--r-lg); box-shadow: inset 0 1px 0 color-mix(in oklab, white 25%, transparent), var(--shadow-lg); }
.dd-item:hover, .dd-item.is-hover { background: color-mix(in oklab, var(--text) 8%, transparent); }
.dd-ic { display: flex; }
.dd-sep { background: color-mix(in oklab, var(--text) 10%, transparent); }
`,
      },
      {
        name: 'Terminal',
        note: '$ prompt, > cursor, inverted hover line',
        css: `
.dd { font-family: var(--font-mono); font-size: var(--fs-xs); }
.dd-trigger { font-family: var(--font-mono); border-radius: 0; background: var(--surface-2); border: 1px solid var(--border); }
.dd-trigger::before { content: '$ theme --set'; color: var(--faint); }
.dd-trigger::after { content: '▍'; color: var(--accent); }
.dd-val { flex: none; color: var(--accent); }
.dd-chev { display: none; }
.dd-menu { margin-top: calc(var(--u) * -1.5); padding: calc(var(--u) * 1) 0; border-radius: 0; background: var(--surface-2);
  border: 1px solid var(--border); border-top: 0; box-shadow: none; }
.dd-item { border-radius: 0; padding: calc(var(--u) * 1) calc(var(--u) * 3); gap: 0; }
.dd-item::before { content: '  '; white-space: pre; color: var(--accent); }
.dd-item.is-selected::before { content: '> '; }
.dd-item:hover, .dd-item.is-hover { background: var(--accent); color: var(--on-accent); }
.dd-item:hover::before, .dd-item.is-hover::before { color: var(--on-accent); }
.dd-check { display: none; }
.dd-kbd { display: block; }
.dd-item:hover .dd-kbd, .dd-item.is-hover .dd-kbd { color: inherit; }
.dd-sep { height: 0; margin: calc(var(--u) * 1) 0; background: none; border-top: 1px dashed var(--border-strong); }
`,
      },
      {
        name: 'Color dots',
        note: 'Status dots as the leading mark',
        css: `
.dd-dot { display: block; transition: box-shadow var(--dur) var(--ease); }
.dd-trigger::before { content: ''; flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--info); }
.dd-item.is-selected .dd-name { font-weight: 600; }
.dd-item.is-selected .dd-dot, .dd-item:hover .dd-dot, .dd-item.is-hover .dd-dot { box-shadow: 0 0 0 3px color-mix(in oklab, var(--dot) 25%, transparent); }
.dd-kbd { display: block; }
.dd-check { color: var(--text); }
`,
      },
      {
        name: 'Radio',
        note: 'Radio rings, single-choice clarity',
        css: `
.dd-check { display: none; }
.dd-desc { display: block; }
.dd-item::before { content: ''; flex: none; box-sizing: border-box; width: 14px; height: 14px; border-radius: 50%;
  border: 1.5px solid var(--border-strong); transition: border var(--dur) var(--ease); }
.dd-item.is-selected::before { border: 4.5px solid var(--accent); }
.dd-item.is-danger::before { visibility: hidden; }
.dd-item.is-selected { background: var(--surface-2); }
`,
      },
      {
        name: 'Minimal text',
        note: 'No chrome — a display-font list',
        css: `
.dd-trigger { width: auto; align-self: flex-start; padding: calc(var(--u) * 1) 0; background: none; border: 0;
  border-bottom: 1px solid var(--text); border-radius: 0; font-weight: 600; }
.dd-menu { padding: calc(var(--u) * 1) 0; background: none; border: 0; box-shadow: none; }
.dd-item { padding: calc(var(--u) * 1) 0; border-radius: 0; color: var(--muted); }
.dd-item:hover, .dd-item.is-hover { background: none; color: var(--text); transform: translateX(4px); }
.dd-item.is-selected { color: var(--text); }
.dd-item.is-selected .dd-name::before { content: '— '; color: var(--accent); }
.dd-name { font-family: var(--font-display); font-size: var(--fs-lg); font-weight: 400; }
.dd-check { display: none; }
.dd-sep { width: 24px; margin: calc(var(--u) * 1.5) 0; }
`,
      },
      {
        name: 'Popover arrow',
        note: 'Speech-bubble menu with a pointer',
        css: `
.dd-trigger { width: auto; align-self: flex-start; border-radius: 999px; padding-inline: calc(var(--u) * 4); }
.dd-menu { position: relative; margin-top: calc(var(--u) * 2); padding: calc(var(--u) * 2); border-radius: var(--r-lg); }
.dd-menu::before { content: ''; position: absolute; top: -6px; left: 22px; width: 10px; height: 10px; background: var(--surface);
  border-left: inherit; border-top: inherit; transform: rotate(45deg); }
.dd-ic { display: flex; }
.dd-desc { display: block; }
.dd-item.is-selected .dd-ic { color: var(--accent); }
`,
      },
      {
        name: 'Accent rail',
        note: 'Left rail marks hover & selection',
        css: `
.dd-trigger { box-shadow: inset 3px 0 0 var(--accent); }
.dd-menu { padding: calc(var(--u) * 1) 0; }
.dd-item { border-radius: 0; padding-inline: calc(var(--u) * 4); }
.dd-item:hover, .dd-item.is-hover { background: var(--surface-2); box-shadow: inset 2px 0 0 var(--border-strong); }
.dd-item.is-selected { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
.dd-check { display: none; }
.dd-kbd { display: block; }
.dd-sep { margin-inline: 0; }
`,
      },

      /* Round 3 — siblings of #13 Popover arrow */
      {
        round: 3,
        basedOn: '#13 Popover arrow',
        name: 'Popover arrow · no descriptions',
        note: 'Single-line rows, tighter menu',
        css: POP + `
.dd-desc { display: none; }
.dd-item { padding-block: calc(var(--u) * 1.75); }
`,
      },
      {
        round: 3,
        basedOn: '#13 Popover arrow',
        name: 'Popover arrow · square trigger',
        note: 'Trigger uses your control radius instead of a pill',
        css: POP + `
.dd-trigger { border-radius: var(--r-ctl); padding-inline: calc(var(--u) * 3); }
`,
      },
      {
        round: 3,
        basedOn: '#13 Popover arrow',
        name: 'Popover arrow · shortcuts',
        note: 'Shortcut hints replace descriptions; bold marks the pick',
        css: POP + `
.dd-desc, .dd-check { display: none; }
.dd-kbd { display: block; }
.dd-item.is-selected .dd-name { font-weight: 600; }
`,
      },
      {
        round: 3,
        basedOn: '#13 Popover arrow',
        name: 'Popover arrow · tinted selection',
        note: 'Selected row gets the tone instead of a check',
        css: POP + `
.dd-check { display: none; }
.dd-item:hover, .dd-item.is-hover { background: color-mix(in oklab, var(--surface-2) 55%, transparent); }
.dd-item.is-selected { background: var(--surface-2); }
.dd-item.is-selected .dd-name { font-weight: 600; }
`,
      },
      {
        round: 3,
        basedOn: '#13 Popover arrow',
        name: 'Popover arrow · shadow only',
        note: 'Menu outline dropped; a soft shadow carries it',
        css: POP + `
.dd-menu { border-color: transparent; box-shadow: none;
  filter: drop-shadow(0 1px 1px color-mix(in oklab, black 8%, transparent)) drop-shadow(0 10px 24px color-mix(in oklab, black 16%, transparent)); }
`,
      },
      {
        round: 3,
        basedOn: '#13 Popover arrow',
        name: 'Popover arrow · inverted',
        note: 'Ink menu on paper (paper on ink at dusk)',
        css: POP + `
.dd-menu { background: var(--text); border-color: var(--text); }
.dd-menu::before { background: var(--text); }
.dd-item { color: var(--bg); }
.dd-ic, .dd-desc { color: color-mix(in oklab, var(--bg) 62%, var(--text)); }
.dd-item:hover, .dd-item.is-hover { background: color-mix(in oklab, var(--text), var(--bg) 14%); }
.dd-item.is-selected .dd-ic, .dd-check { color: var(--bg); }
.dd-sep { background: color-mix(in oklab, var(--bg) 18%, var(--text)); }
.dd-item.is-danger, .dd-item.is-danger .dd-ic { color: color-mix(in oklab, var(--bad), var(--bg) 25%); }
`,
      },
      {
        round: 3,
        basedOn: '#13 Popover arrow',
        name: 'Popover arrow · icon tiles',
        note: 'Icons sit in small tonal tiles; the pick fills ink',
        css: POP + `
.dd-ic { flex: none; width: 28px; height: 28px; align-items: center; justify-content: center; border-radius: var(--r-ctl);
  background: var(--surface-2); color: var(--text); transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease); }
.dd-item:hover .dd-ic, .dd-item.is-hover .dd-ic { background: var(--surface); }
.dd-item.is-selected .dd-ic { background: var(--accent); color: var(--on-accent); }
.dd-item.is-danger .dd-ic { background: var(--bad-soft); }
`,
      },

      /* Round 4 — families around #05 Grouped */
      {
        round: 4, family: true, basedOn: '#05 Grouped',
        name: 'Grouped · core set',
        note: 'Your pick with icons, kbd, checks, disabled, danger and submenu',
        html: DD_FAMILY_HTML,
        css: DD_FAMILY,
      },
      {
        round: 4, family: true, basedOn: '#05 Grouped',
        name: 'Grouped · inset rows',
        note: 'Rows float inside the menu with rounded hovers',
        html: DD_FAMILY_HTML,
        css: DD_FAMILY + `
.dd-menu { padding: calc(var(--u) * 1.5); }
.dd-item { border-radius: var(--r-ctl); padding-inline: calc(var(--u) * 2.5); }
.dd-group { padding-inline: calc(var(--u) * 2.5); }
.dd-sep { margin: calc(var(--u) * 1.5) calc(var(--u) * -1.5); }
`,
      },
      {
        round: 4, family: true, basedOn: '#05 Grouped',
        name: 'Grouped · compact',
        note: 'Descriptions dropped, tighter rows',
        html: DD_FAMILY_HTML,
        css: DD_FAMILY + `
.dd-desc { display: none; }
.dd-item { padding-block: calc(var(--u) * 1.5); }
.dd-sep { margin-block: calc(var(--u) * 1); }
`,
      },
      {
        round: 4, family: true, basedOn: '#05 Grouped',
        name: 'Grouped · text only',
        note: 'No icons; type and kbd carry it',
        html: DD_FAMILY_HTML,
        css: DD_FAMILY + `
.dd-ic, .dd-tic { display: none; }
`,
      },
      {
        round: 4, family: true, basedOn: '#05 Grouped',
        name: 'Grouped · leading checks',
        note: 'A check column on the left replaces icons',
        html: DD_FAMILY_HTML,
        css: DD_FAMILY + `
.dd-ic { display: none; }
.dd-item { position: relative; padding-left: calc(var(--u) * 3.5 + 1.4em); }
.dd-group { padding-left: calc(var(--u) * 3.5 + 1.4em); }
.dd-check { position: absolute; left: calc(var(--u) * 3); top: 50%; transform: translateY(-50%); color: var(--text); }
`,
      },
      {
        round: 4, family: true, basedOn: '#05 Grouped',
        name: 'Grouped · banded headers',
        note: 'Group labels sit in tonal bands; no divider lines',
        html: DD_FAMILY_HTML,
        css: DD_FAMILY + `
.dd-menu { padding-top: 0; overflow: hidden; }
.dd-group { margin-bottom: calc(var(--u) * 1); padding-block: calc(var(--u) * 1.75); background: var(--surface-2); }
.dd-sep { display: none; }
.dd-sep + .dd-item { margin-top: calc(var(--u) * 1); }
.dd-item:hover, .dd-item.is-hover { background: color-mix(in oklab, var(--surface-2) 55%, transparent); }
`,
      },
    ],
  });

  /* ───────────────────────────── Controls ───────────────────────────── */

  DD.category({
    id: 'controls',
    group: 'Components',
    title: 'Switches, checkboxes & radios',
    blurb: 'On and off states side by side — click any control to flip it.',
    html: `
<div class="ct">
  <div class="ct-row"><span class="sw is-on" role="switch" aria-checked="true"><i></i></span><span class="ct-l">Dusk mode</span></div>
  <div class="ct-row"><span class="sw" role="switch" aria-checked="false"><i></i></span><span class="ct-l">Sounds</span></div>
  <div class="ct-row"><span class="cb is-on" role="checkbox" aria-checked="true"></span><span class="ct-l">Ship it</span></div>
  <div class="ct-row"><span class="cb" role="checkbox" aria-checked="false"></span><span class="ct-l">Write tests</span></div>
  <div class="ct-row"><span class="rd is-on" role="radio" aria-checked="true"></span><span class="ct-l">Monthly</span></div>
  <div class="ct-row"><span class="rd" role="radio" aria-checked="false"></span><span class="ct-l">Yearly</span></div>
</div>`,
    css: `
.ct { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: calc(var(--u) * 3.5) calc(var(--u) * 5); font-size: var(--fs-sm); }
.ct-row { display: flex; align-items: center; gap: calc(var(--u) * 2.5); min-width: 0; }
.ct-l { color: var(--text); transition: color var(--dur) var(--ease), text-decoration-color var(--dur) var(--ease); }
.sw, .cb, .rd { position: relative; flex: none; box-sizing: border-box; cursor: pointer;
  transition: background-color var(--dur) var(--ease), border-color var(--dur) var(--ease), border-width var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease), color var(--dur) var(--ease); }
.sw { display: inline-flex; align-items: center; justify-content: flex-start; width: 40px; height: 24px; padding: 3px;
  border-radius: 999px; background: var(--border-strong); }
.sw i { display: block; flex: none; width: 18px; height: 18px; border-radius: 50%; background: white;
  box-shadow: 0 1px 3px color-mix(in oklab, black 30%, transparent);
  transition: transform var(--dur) var(--ease), background-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.sw.is-on { background: var(--accent); }
.sw.is-on i { transform: translateX(16px); background: var(--on-accent); }
.cb, .rd { display: inline-grid; place-items: center; width: 20px; height: 20px; border: 1.5px solid var(--border-strong); background: var(--surface); }
.cb { border-radius: 6px; }
.rd { border-radius: 50%; }
.cb::after, .rd::after { content: ''; display: block; transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease); }
.cb::after { width: 5px; height: 10px; border: solid var(--on-accent); border-width: 0 2px 2px 0; transform: translateY(-1px) rotate(45deg) scale(0); }
.cb.is-on { background: var(--accent); border-color: var(--accent); }
.cb.is-on::after { transform: translateY(-1px) rotate(45deg) scale(1); }
.rd::after { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); transform: scale(0); }
.rd.is-on { border-color: var(--accent); }
.rd.is-on::after { transform: scale(1); }
`,
    options: [
      {
        name: 'Classic pill',
        note: 'Familiar pill switch, white knob',
        css: `
.sw.is-on i { box-shadow: 0 1px 3px color-mix(in oklab, black 30%, transparent), 0 0 0 0.5px color-mix(in oklab, black 10%, transparent); }
`,
      },
      {
        name: 'Square',
        note: 'Squared track & knob, technical',
        css: `
.sw { width: 44px; height: 24px; padding: 3px; border-radius: 3px; background: transparent; border: 1.5px solid var(--border-strong); }
.sw i { width: 15px; height: 15px; border-radius: 1px; background: var(--border-strong); box-shadow: none; }
.sw.is-on { background: var(--accent); border-color: var(--accent); }
.sw.is-on i { transform: translateX(20px); background: var(--on-accent); }
.cb { border-radius: 2px; }
.rd::after { width: 8px; height: 8px; border-radius: 1px; }
`,
      },
      {
        name: 'Thin track',
        note: 'Oversized knob on a slim rail',
        css: `
.ct-row { gap: calc(var(--u) * 3); }
.sw { width: 36px; height: 14px; padding: 0; background: color-mix(in oklab, var(--text) 22%, transparent); }
.sw i { width: 20px; height: 20px; margin-left: -2px; background: var(--surface);
  box-shadow: 0 1px 4px color-mix(in oklab, black 35%, transparent), 0 0 0 1px var(--border); }
.sw.is-on { background: color-mix(in oklab, var(--accent) 45%, transparent); }
.sw.is-on i { transform: translateX(18px); background: var(--accent); box-shadow: 0 1px 4px color-mix(in oklab, black 35%, transparent); }
.cb, .rd { border-width: 2px; border-color: var(--muted); background: transparent; }
.cb { border-radius: 3px; }
.cb::after { border-color: var(--accent); }
.cb.is-on, .rd.is-on { background: transparent; border-color: var(--accent); }
.rd::after { width: 8px; height: 8px; }
`,
      },
      {
        name: 'Brutalist',
        note: 'Heavy rules, hard shadows',
        css: `
.ct-l { font-size: var(--fs-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.sw { width: 50px; height: 26px; padding: 2px; border-radius: 0; background: var(--surface); border: 2px solid var(--text); box-shadow: 2px 2px 0 var(--text); }
.sw i { width: 18px; height: 18px; border-radius: 0; background: var(--text); box-shadow: none; }
.sw.is-on { background: var(--accent); }
.sw.is-on i { transform: translateX(24px); }
.cb, .rd { width: 22px; height: 22px; border: 2px solid var(--text); box-shadow: 2px 2px 0 var(--text); }
.cb { border-radius: 0; }
.cb::after { border-color: var(--text); border-width: 0 3px 3px 0; }
.cb.is-on, .rd.is-on { background: var(--accent); border-color: var(--text); }
.rd::after { width: 8px; height: 8px; background: var(--text); }
`,
      },
      {
        name: 'ON / OFF',
        note: 'Labeled switch, no guessing',
        css: `
.sw { width: 54px; height: 26px; padding: 3px; border-radius: var(--r-ctl); background: var(--surface-2); border: 1px solid var(--border-strong); }
.sw i { width: 18px; height: 18px; border-radius: var(--r-ctl); background: var(--muted); box-shadow: none; }
.sw::before { content: 'OFF'; position: absolute; top: 50%; right: 7px; transform: translateY(-50%);
  font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: .06em; line-height: 1; color: var(--muted); }
.sw.is-on { background: var(--accent); border-color: var(--accent); }
.sw.is-on i { transform: translateX(28px); background: var(--on-accent); }
.sw.is-on::before { content: 'ON'; right: auto; left: 8px; color: var(--on-accent); }
`,
      },
      {
        name: 'Sun / moon',
        note: 'Sun knob sets into a crescent — on-brand',
        css: `
.sw { width: 56px; height: 30px; padding: 3px; border: 1px solid var(--border); background: color-mix(in oklab, var(--warn) 22%, var(--surface)); }
.sw i { width: 22px; height: 22px; background: var(--warn); box-shadow: 0 0 10px color-mix(in oklab, var(--warn) 60%, transparent); }
.sw::before { content: '✦'; position: absolute; top: 50%; left: 10px; transform: translateY(-50%); font-size: 8px; line-height: 1;
  color: var(--info); opacity: 0; transition: opacity var(--dur) var(--ease); }
.sw.is-on { background: color-mix(in oklab, var(--info) 18%, var(--surface)); }
.sw.is-on i { transform: translateX(26px); background: transparent; box-shadow: inset 7px -4px 0 0 var(--info); }
.sw.is-on::before { opacity: 1; }
.cb.is-on { background: var(--warn); border-color: var(--warn); }
.cb::after { border-color: var(--bg); }
.rd.is-on { border-color: var(--info); }
.rd::after { background: var(--info); }
`,
      },
      {
        name: 'Tinted',
        note: 'Soft accent washes, low contrast',
        css: `
.sw { background: var(--surface-2); box-shadow: inset 0 0 0 1px var(--border); }
.sw i { width: 16px; height: 16px; margin: 1px; background: var(--muted); box-shadow: none; }
.sw.is-on { background: var(--accent-soft); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--accent) 40%, transparent); }
.sw.is-on i { background: var(--accent); }
.cb, .rd { background: var(--surface-2); border-color: var(--border); }
.cb { border-radius: 7px; }
.cb::after { border-color: var(--accent); }
.cb.is-on, .rd.is-on { background: var(--accent-soft); border-color: color-mix(in oklab, var(--accent) 50%, transparent); }
`,
      },
      {
        name: 'Swiss sharp',
        note: 'Hairline rectangles, ink fills',
        css: `
.ct-l { font-size: var(--fs-xs); letter-spacing: .02em; }
.sw { width: 44px; height: 20px; padding: 0; border-radius: 0; background: transparent; border: 1px solid var(--text); }
.sw i { width: 22px; height: 100%; border-radius: 0; background: var(--text); box-shadow: none; }
.sw.is-on { background: transparent; }
.sw.is-on i { transform: translateX(20px); background: var(--accent); }
.cb, .rd { width: 18px; height: 18px; border: 1px solid var(--text); background: transparent; }
.cb { border-radius: 0; }
.cb::after { width: 4px; height: 9px; border-color: var(--bg); }
.cb.is-on { background: var(--text); border-color: var(--text); }
.rd.is-on { border-color: var(--text); }
.rd::after { width: 8px; height: 8px; background: var(--text); }
`,
      },
      {
        name: 'Circle checks',
        note: 'Round checks, ✓ rides the knob',
        css: `
.sw { width: 46px; height: 28px; }
.sw i { display: grid; place-items: center; width: 22px; height: 22px; font-style: normal; font-size: 12px; font-weight: 800; line-height: 1; color: var(--accent); }
.sw.is-on i { transform: translateX(18px); }
.sw.is-on i::after { content: '✓'; }
.cb, .rd { width: 22px; height: 22px; border-radius: 50%; }
.rd { border-width: 2px; }
.rd::after { display: none; }
.rd.is-on { border-width: 7px; }
`,
      },
      {
        name: 'Terminal',
        note: '[x] ( ) [ on ] in mono',
        css: `
.ct-l { font-family: var(--font-mono); font-size: var(--fs-xs); }
.sw, .cb, .rd, .sw.is-on, .cb.is-on, .rd.is-on { display: inline-block; width: auto; height: auto; padding: 0; border: 0; border-radius: 0;
  background: none; box-shadow: none; font-family: var(--font-mono); font-size: var(--fs-sm); font-weight: 700; white-space: pre; color: var(--muted); }
.sw.is-on, .cb.is-on, .rd.is-on { color: var(--accent); }
.sw i { display: none; }
.sw::before { content: '[ off ]'; }
.sw.is-on::before { content: '[ on  ]'; }
.cb::after, .rd::after, .cb.is-on::after, .rd.is-on::after { width: auto; height: auto; border: 0; border-radius: 0; background: none; transform: none; }
.cb::after { content: '[ ]'; }
.cb.is-on::after { content: '[x]'; }
.rd::after { content: '( )'; }
.rd.is-on::after { content: '(•)'; }
`,
      },
      {
        name: 'Todo strike',
        note: 'Checking strikes the label through',
        css: `
.ct-l { text-decoration: line-through; text-decoration-thickness: 1.5px; text-decoration-color: transparent; }
.cb.is-on + .ct-l { color: var(--faint); text-decoration-color: var(--accent); }
.cb { width: 22px; height: 22px; border-radius: 50%; border-style: dashed; }
.cb::after { border-color: var(--bg); }
.cb.is-on { border-style: solid; background: var(--ok); border-color: var(--ok); }
.sw { width: 34px; height: 20px; }
.sw i { width: 14px; height: 14px; }
.sw.is-on { background: var(--ok); }
.sw.is-on i { transform: translateX(14px); }
.rd.is-on { border-color: var(--ok); }
.rd::after { background: var(--ok); }
`,
      },
      {
        name: 'Outline',
        note: 'Everything outlined, accent when on',
        css: `
.sw { padding: 2.5px; background: transparent; border: 1.5px solid var(--border-strong); }
.sw i { width: 15px; height: 15px; background: var(--border-strong); box-shadow: none; }
.sw.is-on { background: transparent; border-color: var(--accent); }
.sw.is-on i { transform: translateX(17px); background: var(--accent); }
.cb, .rd { background: transparent; }
.cb::after { border-color: var(--accent); }
.cb.is-on, .rd.is-on { background: transparent; border-color: var(--accent); }
.rd::after { width: 8px; height: 8px; }
`,
      },
      {
        name: 'Glow',
        note: 'Lit states with a halo',
        css: `
.sw { background: color-mix(in oklab, var(--text) 14%, transparent); }
.sw.is-on { background: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft), 0 0 16px color-mix(in oklab, var(--accent) 65%, transparent); }
.cb, .rd { background: transparent; }
.cb.is-on, .rd.is-on { background: var(--accent); border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft), 0 0 14px color-mix(in oklab, var(--accent) 60%, transparent); }
.rd::after { width: 7px; height: 7px; background: var(--on-accent); }
`,
      },
      {
        name: 'Tactile',
        note: 'Inset wells, raised knobs',
        css: `
.sw { background: color-mix(in oklab, var(--bg), var(--text) 8%);
  box-shadow: inset 0 2px 4px color-mix(in oklab, black 25%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--text) 8%, transparent); }
.sw i { background: linear-gradient(white, color-mix(in oklab, white, black 10%));
  box-shadow: 0 2px 4px color-mix(in oklab, black 35%, transparent), 0 0 0 0.5px color-mix(in oklab, black 20%, transparent); }
.sw.is-on { background: var(--accent); box-shadow: inset 0 2px 4px color-mix(in oklab, black 30%, transparent); }
.cb, .rd { border-color: transparent; background: color-mix(in oklab, var(--bg), var(--text) 6%);
  box-shadow: inset 0 1.5px 3px color-mix(in oklab, black 25%, transparent); }
.cb.is-on, .rd.is-on { background: var(--accent); border-color: transparent;
  box-shadow: inset 0 1.5px 3px color-mix(in oklab, black 30%, transparent), 0 1px 0 color-mix(in oklab, white 20%, transparent); }
.rd::after { background: linear-gradient(white, color-mix(in oklab, white, black 12%)); box-shadow: 0 1px 2px color-mix(in oklab, black 35%, transparent); }
`,
      },

      /* Round 3 — siblings of #01 Classic pill */
      {
        round: 3,
        basedOn: '#01 Classic pill',
        name: 'Classic pill · small',
        note: 'Same shapes, scaled down; xs labels',
        css: `
.ct-l { font-size: var(--fs-xs); }
.sw { width: 32px; height: 18px; padding: 2px; }
.sw i { width: 14px; height: 14px; }
.sw.is-on i { transform: translateX(14px); }
.cb, .rd { width: 16px; height: 16px; }
.cb { border-radius: 4px; }
.cb::after { width: 4px; height: 8px; }
.rd::after { width: 8px; height: 8px; }
.sw.is-on i { background: var(--on-accent); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Classic pill',
        name: 'Classic pill · large',
        note: 'Same shapes, scaled up; base-size labels',
        css: `
.ct-l { font-size: var(--fs-base); }
.sw { width: 50px; height: 30px; }
.sw i { width: 24px; height: 24px; }
.sw.is-on i { transform: translateX(20px); }
.cb, .rd { width: 24px; height: 24px; }
.cb { border-radius: 7px; }
.cb::after { width: 6px; height: 12px; border-width: 0 2.5px 2.5px 0; }
.rd::after { width: 12px; height: 12px; }
.sw.is-on i { background: var(--on-accent); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Classic pill',
        name: 'Classic pill · airy track',
        note: 'More room around a slightly smaller knob',
        css: `
.sw { width: 44px; height: 26px; padding: 4px; }
.sw i { width: 18px; height: 18px; }
.sw.is-on i { transform: translateX(18px); }
.sw.is-on i { background: var(--on-accent); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Classic pill',
        name: 'Classic pill · tonal off',
        note: 'Off states sit in a soft tone instead of grey',
        css: `
.sw { background: var(--surface-2); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--text) 8%, transparent); }
.sw.is-on { background: var(--accent); box-shadow: none; }
.cb, .rd { background: var(--surface-2); border-color: color-mix(in oklab, var(--text) 10%, transparent); }
.cb.is-on, .rd.is-on { border-color: var(--accent); }
.cb.is-on { background: var(--accent); }
.sw.is-on i { background: var(--on-accent); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Classic pill',
        name: 'Classic pill · outlined off',
        note: 'Off is a hairline outline; on fills ink',
        css: `
.sw { background: transparent; box-shadow: inset 0 0 0 1.5px var(--border-strong); }
.sw i { background: var(--border-strong); box-shadow: none; }
.sw.is-on { background: var(--accent); box-shadow: none; }
.sw.is-on i { background: var(--on-accent); box-shadow: 0 1px 3px color-mix(in oklab, black 30%, transparent); }
.cb, .rd { background: transparent; }
.cb.is-on { background: var(--accent); }
`,
      },
      {
        round: 3,
        basedOn: '#01 Classic pill',
        name: 'Classic pill · flat knob',
        note: 'Knob takes the page color, no shadow',
        css: `
.sw i { background: var(--bg); box-shadow: none; }
`,
      },
      {
        round: 3,
        basedOn: '#01 Classic pill',
        name: 'Classic pill · crisp checks',
        note: 'Hairline checkbox and radio, tighter corners',
        css: `
.cb, .rd { border-width: 1px; }
.cb { border-radius: 3px; }
.cb::after { width: 4px; height: 9px; border-width: 0 1.5px 1.5px 0; }
.rd::after { width: 8px; height: 8px; }
.sw.is-on i { background: var(--on-accent); }
`,
      },

      /* Round 4 — families around #21 Classic pill · crisp checks */
      {
        round: 4, family: true, basedOn: '#21 Classic pill · crisp checks',
        name: 'Crisp checks · core set',
        note: 'Your pick with sizes, disabled, mixed and described rows',
        html: CTRL_FAMILY_HTML,
        css: CTRL_FAMILY,
      },
      {
        round: 4, family: true, basedOn: '#21 Classic pill · crisp checks',
        name: 'Crisp checks · squared track',
        note: 'Switch track and knob take your control radius',
        html: CTRL_FAMILY_HTML,
        css: CTRL_FAMILY + `
.sw, .sw i { border-radius: var(--r-ctl); }
`,
      },
      {
        round: 4, family: true, basedOn: '#21 Classic pill · crisp checks',
        name: 'Crisp checks · filled radios',
        note: 'Selected radios fill with accent, like the checkboxes',
        html: CTRL_FAMILY_HTML,
        css: CTRL_FAMILY + `
.rd.is-on { background: var(--accent); border-color: var(--accent); }
.rd::after { width: 6px; height: 6px; background: var(--on-accent); }
`,
      },
      {
        round: 4, family: true, basedOn: '#21 Classic pill · crisp checks',
        name: 'Crisp checks · tonal off',
        note: 'Off states sit in a soft tone instead of grey',
        html: CTRL_FAMILY_HTML,
        css: CTRL_FAMILY + `
.sw { background: var(--surface-2); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--text) 14%, transparent); }
.sw.is-on { background: var(--accent); box-shadow: none; }
.cb, .rd { background: var(--surface-2); border-color: color-mix(in oklab, var(--text) 18%, transparent); }
.cb.is-on, .rd.is-on, .cb.is-mixed { border-color: var(--accent); }
.cb.is-on, .cb.is-mixed { background: var(--accent); }
`,
      },
      {
        round: 4, family: true, basedOn: '#21 Classic pill · crisp checks',
        name: 'Crisp checks · flat knob',
        note: 'Knob loses its shadow for a hairline edge',
        html: CTRL_FAMILY_HTML,
        css: CTRL_FAMILY + `
.sw i { box-shadow: 0 0 0 0.5px color-mix(in oklab, var(--text) 18%, transparent); }
.sw.is-on i { box-shadow: none; }
`,
      },
      {
        round: 4, family: true, basedOn: '#21 Classic pill · crisp checks',
        name: 'Crisp checks · trailing controls',
        note: 'Settings-list rows: label left, control right, hairline between',
        html: CTRL_FAMILY_HTML,
        css: CTRL_FAMILY + `
.ct-row { flex-direction: row-reverse; justify-content: space-between; }
.cf-list { gap: 0; }
.cf-list .ct-row { padding-block: calc(var(--u) * 2.5); gap: calc(var(--u) * 4); }
.cf-list .ct-row + .ct-row { border-top: 1px solid color-mix(in oklab, var(--text) 10%, transparent); }
.ct-desc > .sw { margin-top: 1px; }
`,
      },
    ],
  });
})();
