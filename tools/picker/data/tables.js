/* Round 2 tables: two families — simple (clean, few rows) and dense (large data sets).
   Replaces the round-1 `tables` category, which is hidden from the picker. */
(() => {
  if (DD.byId.tables) DD.byId.tables.hidden = true;

  // ---------- simple ----------
  const row = (name, s, label, stars, when, hover) => `<tr${hover ? ' class="is-hover"' : ''}><td>${name}</td>
    <td><span class="ct-st" data-s="${s}">${label}</span></td><td class="n">${stars}</td><td class="n ct-when">${when}</td></tr>`;
  const flush = `.ct th:first-child, .ct td:first-child { padding-left: 0; } .ct th:last-child, .ct td:last-child { padding-right: 0; }`;
  const hair = `.ct th, .ct td { border-bottom: 1px solid var(--border); } .ct tbody tr:last-child td { border-bottom: 0; }`;
  const roundRow = (sel) => `${sel} td:first-child { border-start-start-radius: var(--r-ctl); border-end-start-radius: var(--r-ctl); }
    ${sel} td:last-child { border-start-end-radius: var(--r-ctl); border-end-end-radius: var(--r-ctl); }`;
  const simple = (name, note, css) => ({ name, note, css });

  DD.category({
    id: 'tables-simple', group: 'Components', title: 'Tables · simple', round: 2, wide: true,
    blurb: 'Clean tables for a handful of rows — single-line cells, quiet header. Each varies just one or two things.',
    html: `<table class="ct">
      <thead><tr><th>Project</th><th>Status</th><th class="n">Stars</th><th class="n">Updated</th></tr></thead>
      <tbody>
        ${row('dawn-and-dusk', 'ok', 'Live', '1,284', '2h ago')}
        ${row('dockey-ui', 'ok', 'Live', '642', '1d ago', true)}
        ${row('insomnia', 'warn', 'Beta', '318', '3d ago')}
        ${row('ai-focus', 'info', 'Draft', '96', '2w ago')}
        ${row('leetnode', 'muted', 'Archived', '41', '4mo ago')}
      </tbody></table>`,
    css: `
      .ct { width: 100%; border-collapse: collapse; border-spacing: 0; font-size: var(--fs-sm); font-variant-numeric: tabular-nums; }
      .ct th, .ct td { text-align: left; padding: calc(var(--u) * 2.5) calc(var(--u) * 3); white-space: nowrap; }
      .ct th { font-weight: 500; font-size: var(--fs-xs); color: var(--muted); }
      .ct td { color: var(--text); }
      .ct .n { text-align: right; }
      .ct .ct-when { color: var(--muted); }
      .ct-st { display: inline-flex; align-items: center; gap: 0.5em; }
      .ct-st::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
      .ct-st[data-s="ok"]::before { background: var(--ok); }
      .ct-st[data-s="warn"]::before { background: var(--warn); }
      .ct-st[data-s="info"]::before { background: var(--info); }
      .ct-st[data-s="muted"] { color: var(--muted); }
      .ct-st[data-s="muted"]::before { background: var(--faint); }`,
    options: [
      simple('Plain hairline', 'One thin rule per row, flush to the text edge', `${flush} ${hair}`),
      simple('Header rule only', 'A single line under the header; rows separated by space', `${flush}
        .ct th { border-bottom: 1px solid var(--border-strong); padding-bottom: calc(var(--u) * 2); }
        .ct td { padding-top: calc(var(--u) * 3); padding-bottom: calc(var(--u) * 1); }`),
      simple('Quiet card', 'Same hairlines, sitting on a rounded surface', `
        .ct { border-collapse: separate; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); }
        .ct th, .ct td { padding-left: calc(var(--u) * 4); padding-right: calc(var(--u) * 4); }
        .ct td { border-top: 1px solid var(--border); }`),
      simple('Soft header', 'Header sits in a tinted band; rows have no lines', `
        .ct { border-collapse: separate; }
        .ct th { background: var(--surface-2); }
        .ct th:first-child { border-start-start-radius: var(--r-ctl); border-end-start-radius: var(--r-ctl); }
        .ct th:last-child { border-start-end-radius: var(--r-ctl); border-end-end-radius: var(--r-ctl); }
        .ct td { padding-top: calc(var(--u) * 3); padding-bottom: calc(var(--u) * 3); }`),
      simple('Roomy', 'Taller rows, body-size type, fainter rules', `${flush}
        .ct { font-size: var(--fs-base); }
        .ct th, .ct td { padding-top: calc(var(--u) * 4); padding-bottom: calc(var(--u) * 4);
          border-bottom: 1px solid color-mix(in oklab, var(--border) 60%, transparent); }
        .ct th { font-size: var(--fs-sm); } .ct tbody tr:last-child td { border-bottom: 0; }`),
      simple('Micro-caps header', 'Tiny uppercase tracked header, plain rows', `${flush} ${hair}
        .ct th { text-transform: uppercase; letter-spacing: 0.08em; font-size: 10.5px; font-weight: 600; }`),
      simple('Strong header', 'Header in full ink with a firm rule; no row lines', `${flush}
        .ct th { color: var(--text); font-weight: 600; font-size: var(--fs-sm); border-bottom: 1.5px solid var(--text); }`),
      simple('Faint zebra', 'No lines — every other row gets a whisper of tone', `
        .ct { border-collapse: separate; }
        .ct tbody tr:nth-child(odd) td { background: color-mix(in oklab, var(--surface-2) 70%, transparent); }
        ${roundRow('.ct tbody tr')}`),
      simple('Mono figures', 'Hairlines; numbers and dates in the mono font', `${flush} ${hair}
        .ct .n { font-family: var(--font-mono); font-size: var(--fs-xs); }`),
      simple('Monochrome', 'No status colors at all — text and rules only', `${flush} ${hair}
        .ct-st::before { display: none; } .ct-st { color: var(--muted); } .ct-st[data-s="ok"] { color: var(--text); }`),
      simple('Booktabs', 'Classic typeset table: top, header and bottom rules only', `${flush}
        .ct { border-top: 2px solid var(--text); border-bottom: 2px solid var(--text); }
        .ct th { border-bottom: 1px solid var(--text); color: var(--text); }`),
      simple('Inset dividers', 'Rules start after the first column’s padding, list-style', `
        .ct { border-collapse: separate; background: var(--surface); border-radius: var(--r-box); }
        .ct th, .ct td { padding-left: calc(var(--u) * 4); }
        .ct td { background: linear-gradient(var(--border), var(--border)) no-repeat left bottom / 100% 1px; }
        .ct td:first-child { background-position: right bottom; background-size: calc(100% - 16px) 1px; }
        .ct tbody tr:last-child td { background: none; }`),
      simple('Hover pill', 'No lines; the hovered row gets a soft rounded fill', `
        .ct { border-collapse: separate; }
        .ct th { border-bottom: 1px solid var(--border); }
        .ct td { transition: background var(--dur) var(--ease); }
        .ct tbody tr.is-hover td, .ct tbody tr:hover td { background: var(--surface-2); }
        ${roundRow('.ct tbody tr')}`),
      simple('Headerless list', 'Header hidden visually — rows read like a list', `${flush} ${hair}
        .ct thead { display: none; } .ct td:first-child { font-weight: 500; }`),
    ],
  });

  // ---------- dense ----------
  const ROWS = [
    ['us-east-1', 'svc-0141', 'auth-gateway', 'ok', 'Healthy', 12480, '84 ms', '09:41:07'],
    ['us-east-1', 'svc-0152', 'billing-worker', 'ok', 'Healthy', 3212, '142 ms', '09:41:02', 'sel'],
    ['us-east-1', 'svc-0167', 'search-indexer', 'warn', 'Degraded', 8904, '611 ms', '09:40:55', 'hover'],
    ['us-east-1', 'svc-0171', 'edge-cache', 'ok', 'Healthy', 41337, '12 ms', '09:40:51'],
    ['eu-west-2', 'svc-0203', 'ledger-sync', 'ok', 'Healthy', 1048, '96 ms', '09:40:48', 'sel'],
    ['eu-west-2', 'svc-0219', 'notify-fanout', 'bad', 'Down', 0, '—', '09:39:12'],
    ['eu-west-2', 'svc-0224', 'mail-relay', 'ok', 'Healthy', 2771, '133 ms', '09:40:40'],
    ['ap-south-1', 'svc-0310', 'image-resizer', 'ok', 'Healthy', 6502, '188 ms', '09:40:37'],
    ['ap-south-1', 'svc-0318', 'metrics-agg', 'warn', 'Degraded', 19220, '402 ms', '09:40:33'],
    ['ap-south-1', 'svc-0327', 'cron-runner', 'ok', 'Healthy', 112, '51 ms', '09:40:29'],
  ];
  const max = Math.max(...ROWS.map((r) => r[5]));
  let last = '';
  const body = ROWS.map(([region, id, svc, s, label, req, p95, at, state], i) => {
    const group = region !== last ? `<tr class="dt-group"><td colspan="9">${region} · ${ROWS.filter((r) => r[0] === region).length}</td></tr>` : '';
    last = region;
    const cls = state === 'sel' ? ' class="is-sel"' : state === 'hover' ? ' class="is-hover"' : '';
    return `${group}<tr${cls} data-s="${s}"><td class="dt-rn">${i + 1}</td><td class="dt-c"><i class="dt-cbx"></i></td>
      <td class="dt-id">${id}</td><td class="dt-svc">${svc}</td><td><span class="dt-st" data-s="${s}">${label}</span></td><td>${region}</td>
      <td class="n dt-req"><i class="dt-barfill" style="--w:${Math.round((req / max) * 100)}%"></i><span>${req.toLocaleString('en-US')}</span></td>
      <td class="n">${p95}</td><td class="n dt-at">${at}</td></tr>`;
  }).join('');

  const dense = (name, note, css) => ({ name, note, css });
  const grid = `.dt th, .dt td { border: 1px solid var(--border); } .dt table { border: 1px solid var(--border); }`;
  const dhair = `.dt th { border-bottom: 1px solid var(--border-strong); } .dt td { border-bottom: 1px solid var(--border); }`;

  DD.category({
    id: 'tables-dense', group: 'Components', title: 'Tables · dense', round: 2, wide: true,
    blurb: 'For large data sets: compact rows, toolbar, selection, sorting, pagination. Same data in every option — compare scan-ability.',
    html: `<div class="dt">
      <div class="dt-tool"><span class="dt-search">{{icon:search}} Filter services…</span><span class="dt-chip">Region: all</span>
        <span class="dt-chip">Status: any</span><span class="dt-count">1–10 of 2,481</span></div>
      <div class="dt-bulk"><b>2 selected</b><span>Restart</span><span>Export</span><span class="dt-bulk-x">Clear</span></div>
      <div class="dt-wrap"><table>
        <thead><tr><th class="dt-rn"></th><th class="dt-c"><i class="dt-cbx is-some"></i></th><th>ID</th><th>Service</th><th>Status</th>
          <th class="is-sorted">Region {{icon:chevron-down}}</th><th class="n">Req / min</th><th class="n">p95</th><th class="n">Updated</th></tr></thead>
        <tbody>${body}</tbody></table></div>
      <div class="dt-foot"><span>Rows per page: 50</span>
        <span class="dt-pg"><span>‹</span><span class="is-on">1</span><span>2</span><span>3</span><span>…</span><span>249</span><span>›</span></span></div>
    </div>`,
    css: `
      .dt { display: flex; flex-direction: column; gap: calc(var(--u) * 2.5); font-size: var(--fs-xs); }
      .dt-tool { display: flex; align-items: center; gap: calc(var(--u) * 2); flex-wrap: wrap; }
      .dt-search { display: inline-flex; align-items: center; gap: 6px; min-width: 170px; padding: calc(var(--u) * 1.25) calc(var(--u) * 2.5);
        background: var(--surface-2); border-radius: var(--r-ctl); color: var(--muted); }
      .dt-chip { padding: calc(var(--u) * 1) calc(var(--u) * 2); border-radius: var(--r-ctl); border: 1px solid var(--border); color: var(--muted); }
      .dt-count { margin-left: auto; color: var(--muted); font-variant-numeric: tabular-nums; }
      .dt-bulk { display: none; align-items: center; gap: calc(var(--u) * 4); padding: calc(var(--u) * 1.75) calc(var(--u) * 3);
        border-radius: var(--r-ctl); background: var(--accent-soft); color: var(--accent); }
      .dt-bulk span { cursor: pointer; font-weight: 500; }
      .dt-bulk-x { margin-left: auto; color: var(--muted); }
      .dt-wrap { overflow-x: auto; }
      .dt table { width: 100%; border-collapse: collapse; border-spacing: 0; font-variant-numeric: tabular-nums; }
      .dt th, .dt td { text-align: left; white-space: nowrap; padding: calc(var(--u) * 1.6) calc(var(--u) * 2.25); }
      .dt th { font-weight: 500; color: var(--muted); }
      .dt th.is-sorted { color: var(--text); }
      .dt th .ic { width: 0.95em; height: 0.95em; vertical-align: -0.15em; }
      .dt td { color: var(--text); }
      .dt .n { text-align: right; }
      .dt .dt-id, .dt .dt-at { color: var(--muted); }
      .dt .dt-id { font-family: var(--font-mono); }
      .dt .dt-c { width: 1px; padding-right: 0; }
      .dt-cbx { display: inline-block; width: 12px; height: 12px; border: 1px solid var(--border-strong); border-radius: 3px; vertical-align: -2px; }
      .dt tr.is-sel .dt-cbx, .dt-cbx.is-some { background: var(--accent); border-color: var(--accent);
        box-shadow: inset 0 0 0 2px var(--accent), inset 0 0 0 6px var(--on-accent); }
      .dt-cbx.is-some { box-shadow: inset 0 0 0 2.5px var(--accent), inset 0 -4px 0 2.5px var(--on-accent); }
      .dt tbody tr.is-sel td { background: color-mix(in oklab, var(--accent) 7%, transparent); }
      .dt tbody tr.is-hover td, .dt tbody tr:hover td { background: var(--surface-2); }
      .dt-st { display: inline-flex; align-items: center; gap: 0.5em; }
      .dt-st::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--ok); }
      .dt-st[data-s="warn"]::before { background: var(--warn); }
      .dt-st[data-s="bad"] { color: var(--bad); } .dt-st[data-s="bad"]::before { background: var(--bad); }
      .dt-rn, .dt-group { display: none; }
      .dt-req { position: relative; }
      .dt-req span { position: relative; }
      .dt-barfill { display: none; }
      .dt-foot { display: flex; justify-content: space-between; align-items: center; color: var(--muted); }
      .dt-pg { display: flex; gap: 2px; }
      .dt-pg span { min-width: 22px; text-align: center; padding: 2px 6px; border-radius: var(--r-ctl); cursor: pointer; }
      .dt-pg .is-on { background: var(--surface-2); color: var(--text); font-weight: 600; }`,
    options: [
      dense('Hairline', 'Row rules, checkbox column, toolbar and pager — the default data table', dhair),
      dense('Gridlines', 'Every cell boxed, tinted header — spreadsheet-clear', `${grid}
        .dt th { background: var(--surface-2); }`),
      dense('Zebra', 'No lines; alternating faint rows guide the eye', `
        .dt th { border-bottom: 1px solid var(--border); }
        .dt tbody tr:nth-child(even):not(.is-sel):not(.is-hover) td { background: color-mix(in oklab, var(--surface-2) 65%, transparent); }`),
      dense('Spreadsheet', 'Row numbers, gridlines, mono figures, gutter column', `${grid}
        .dt-rn { display: table-cell; text-align: center; color: var(--faint); background: var(--surface-2); font-family: var(--font-mono); }
        .dt th { background: var(--surface-2); } .dt .n { font-family: var(--font-mono); }
        .dt tbody tr.is-hover .dt-rn { background: var(--accent); color: var(--on-accent); }
        .dt .dt-c { display: none; }`),
      dense('Ultra compact', '22px rows, no checkboxes, minimal chrome — max rows per screen', `${dhair}
        .dt { font-size: 11px; gap: calc(var(--u) * 1.5); }
        .dt th, .dt td { padding: calc(var(--u) * 0.9) calc(var(--u) * 1.75); }
        .dt .dt-c, .dt-chip { display: none; }
        .dt-search { padding: calc(var(--u) * 0.75) calc(var(--u) * 2); }`),
      dense('Mono ledger', 'All-mono, uppercase header, dashed rules — terminal-precise', `
        .dt { font-family: var(--font-mono); font-size: 11px; }
        .dt th { text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px; border-bottom: 1px solid var(--text); }
        .dt td { border-bottom: 1px dashed var(--border); }
        .dt .dt-c { display: none; }`),
      dense('Selection mode', 'Bulk-action bar appears; selected rows tinted with the accent', `${dhair}
        .dt-bulk { display: flex; }
        .dt tbody tr.is-sel td { background: var(--accent-soft); }
        .dt tbody tr.is-sel td:first-child + td { box-shadow: inset 2px 0 0 var(--accent); }`),
      dense('Column bands', 'Alternate columns tinted — easier to compare figures down', `
        .dt th { border-bottom: 1px solid var(--border-strong); }
        .dt th:nth-child(odd), .dt td:nth-child(odd) { background: color-mix(in oklab, var(--surface-2) 55%, transparent); }`),
      dense('Status stripe', 'Thin colored edge per row instead of dots; problems jump out', `${dhair}
        .dt-st::before { display: none; }
        .dt tbody tr td.dt-c { box-shadow: inset 3px 0 0 var(--ok); padding-left: calc(var(--u) * 3); }
        .dt tbody tr[data-s="warn"] td.dt-c { box-shadow: inset 3px 0 0 var(--warn); }
        .dt tbody tr[data-s="bad"] td.dt-c { box-shadow: inset 3px 0 0 var(--bad); }
        .dt tbody tr[data-s="warn"] .dt-st { color: var(--warn); }`),
      dense('Inline bars', 'Numbers sit on tiny proportional bars — scan magnitude instantly', `${dhair}
        .dt-barfill { display: block; position: absolute; right: calc(var(--u) * 2.25); top: 50%; height: 14px; transform: translateY(-50%);
          width: calc(var(--w) * 0.8); max-width: 80%; border-radius: 2px; background: color-mix(in oklab, var(--accent) 24%, transparent); }`),
      dense('Grouped', 'Rows grouped under region headers', `
        .dt th { border-bottom: 1px solid var(--border-strong); }
        .dt td { border-bottom: 1px solid color-mix(in oklab, var(--border) 60%, transparent); }
        .dt-group { display: table-row; }
        .dt-group td { background: var(--surface-2); font-weight: 600; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted);
          padding-top: calc(var(--u) * 1.25); padding-bottom: calc(var(--u) * 1.25); }`),
      dense('Frozen column', 'Wide table scrolls sideways; ID + service stay pinned', `${dhair}
        .dt table { min-width: 760px; }
        .dt th:nth-child(-n+4), .dt td:nth-child(-n+4) { position: sticky; background: var(--bg); z-index: 1; }
        .dt th:nth-child(2), .dt td:nth-child(2) { left: 0; }
        .dt th:nth-child(3), .dt td:nth-child(3) { left: 22px; }
        .dt th:nth-child(4), .dt td:nth-child(4) { left: 84px; box-shadow: 6px 0 8px -6px rgb(0 0 0 / 0.25); }
        .dt tbody tr.is-hover td:nth-child(-n+4) { background: var(--surface-2); }
        .dt tbody tr.is-sel td:nth-child(-n+4) { background: color-mix(in oklab, var(--accent) 7%, var(--bg)); }`),
      dense('Console card', 'Whole table on one surface — toolbar header, footer strip', `${dhair}
        .dt { gap: 0; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); overflow: hidden; }
        .dt-tool { padding: calc(var(--u) * 2.5) calc(var(--u) * 3); border-bottom: 1px solid var(--border); }
        .dt-search { background: var(--bg); }
        .dt th { background: var(--surface-2); }
        .dt tbody tr:last-child td { border-bottom: 0; }
        .dt-foot { padding: calc(var(--u) * 2) calc(var(--u) * 3); border-top: 1px solid var(--border); background: var(--surface-2); }`),
      dense('Borderless', 'No rules at all — a strong header line and hover only', `
        .dt th { border-bottom: 1.5px solid var(--text); color: var(--text); font-weight: 600; }
        .dt tbody tr.is-sel td { background: transparent; }`),
    ],
  });

  // ---------- round 3: riffs on the user's picks ----------
  const r3 = (basedOn) => (name, note, css) => ({ name, note, css, round: 3, basedOn });
  const hro = r3('#02 Header rule only');
  const hroBase = `${flush}
    .ct th { border-bottom: 1px solid var(--border-strong); padding-bottom: calc(var(--u) * 2); }
    .ct td { padding-top: calc(var(--u) * 3); padding-bottom: calc(var(--u) * 1); }`;
  DD.byId['tables-simple'].options.push(
    hro('Header rule only · ink rule', 'The single rule drawn in full ink instead of grey', `${hroBase}
      .ct th { border-bottom-color: var(--text); color: var(--text); }`),
    hro('Header rule only · tighter rows', 'Same look, rows packed closer', `${hroBase}
      .ct td { padding-top: calc(var(--u) * 2); padding-bottom: calc(var(--u) * 0.5); }`),
    hro('Header rule only · micro-caps header', 'Header in tiny tracked capitals', `${hroBase}
      .ct th { text-transform: uppercase; letter-spacing: 0.08em; font-size: 10.5px; font-weight: 600; }`),
    hro('Header rule only · mono figures', 'Numbers and dates switch to the mono font', `${hroBase}
      .ct .n { font-family: var(--font-mono); font-size: var(--fs-xs); }`),
    hro('Header rule only · ghost row rules', 'Adds barely-there lines between rows', `${hroBase}
      .ct td { border-bottom: 1px solid color-mix(in oklab, var(--border) 45%, transparent); padding-bottom: calc(var(--u) * 2.5); }
      .ct tbody tr:last-child td { border-bottom: 0; }`),
    hro('Header rule only · hover tone', 'Rows stay bare; the hovered one gets a soft rounded tone', `
      .ct { border-collapse: separate; }
      .ct th { border-bottom: 1px solid var(--border-strong); padding-bottom: calc(var(--u) * 2); }
      .ct td { padding-top: calc(var(--u) * 2.25); padding-bottom: calc(var(--u) * 2.25); transition: background var(--dur) var(--ease); }
      .ct tbody tr.is-hover td, .ct tbody tr:hover td { background: var(--surface-2); }
      ${roundRow('.ct tbody tr')}`),
    hro('Header rule only · body size', 'Body-size rows, small header — reads like prose', `${hroBase}
      .ct { font-size: var(--fs-base); } .ct th { font-size: var(--fs-sm); }`),
  );

  const hl = r3('#01 Hairline');
  DD.byId['tables-dense'].options.push(
    hl('Hairline · no checkboxes', 'Drops the selection column for read-only data', `${dhair}
      .dt .dt-c { display: none; }`),
    hl('Hairline · mono figures', 'IDs, numbers and times in the mono font', `${dhair}
      .dt .n, .dt .dt-at { font-family: var(--font-mono); font-size: 11px; }`),
    hl('Hairline · micro-caps header', 'Header in tiny tracked capitals', `${dhair}
      .dt th { text-transform: uppercase; letter-spacing: 0.07em; font-size: 10px; font-weight: 600; }`),
    hl('Hairline · roomier rows', 'A little more air per row; still dense', `${dhair}
      .dt th, .dt td { padding-top: calc(var(--u) * 2.3); padding-bottom: calc(var(--u) * 2.3); }`),
    hl('Hairline · tighter rows', '11px type, compact rows — more on screen', `${dhair}
      .dt { font-size: 11px; } .dt th, .dt td { padding-top: calc(var(--u) * 1.1); padding-bottom: calc(var(--u) * 1.1); }`),
    hl('Hairline · tonal header', 'Header sits in a soft band instead of a strong rule', `
      .dt td { border-bottom: 1px solid var(--border); }
      .dt th { background: var(--surface-2); }`),
    hl('Hairline · bare toolbar', 'Filter and chips lose their boxes; just text and a hairline', `${dhair}
      .dt-search { background: none; padding-left: 0; border-bottom: 1px solid var(--border); border-radius: 0; }
      .dt-chip { border: 0; padding-left: 0; padding-right: 0; }`),
  );

  // ---------- round 4: families around the user's picks (#03 Quiet card, #01 Hairline) ----------
  const simpleC = DD.byId['tables-simple'];
  const denseC = DD.byId['tables-dense'];
  const small = `<table class="ct"><thead><tr><th>Project</th><th>Status</th><th class="n">Stars</th><th class="n">Updated</th></tr></thead><tbody>
    ${row('dawn-and-dusk', 'ok', 'Live', '1,284', '2h ago')}${row('dockey-ui', 'ok', 'Live', '642', '1d ago')}${row('insomnia', 'warn', 'Beta', '318', '3d ago')}</tbody></table>`;
  const sFamily = `<div class="tf">
    <p class="tf-cap mono">default</p>${simpleC.html}
    <p class="tf-cap mono">with title + action</p>
    <div class="tf-titled"><div class="tf-title"><b class="dd-h">Open source</b><span class="tf-act">View all {{icon:arrow-right}}</span></div>${small}</div>
    <p class="tf-cap mono">empty</p><div class="tf-empty"><b>No projects yet</b><span>Anything you publish shows up here.</span><span class="tf-act">{{icon:plus}} New project</span></div>
  </div>`;
  const dFamily = `<div class="tf">
    <p class="tf-cap mono">default · 2 selected</p>${denseC.html}
    <p class="tf-cap mono">loading</p><div class="tf-skel">${'<i></i>'.repeat(5)}</div>
    <p class="tf-cap mono">empty / filtered out</p><div class="tf-empty"><b>No services match “edge”</b><span>Try another region or clear filters.</span><span class="tf-act">Clear filters</span></div>
  </div>`;
  const famCSS = `
    .tf { display: flex; flex-direction: column; gap: calc(var(--u) * 2.5); }
    .tf-cap { margin: calc(var(--u) * 2) 0 0; font-size: 10.5px; letter-spacing: 0.06em; color: var(--muted); }
    .tf-cap:first-child { margin-top: 0; }
    .tf-titled { display: flex; flex-direction: column; gap: calc(var(--u) * 2.5); }
    .tf-title { display: flex; align-items: baseline; gap: 12px; }
    .tf-title b { font-size: var(--fs-lg); }
    .tf-act { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; color: var(--accent); font-size: var(--fs-sm); font-weight: 500; cursor: pointer; }
    .tf-empty { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: calc(var(--u) * 7) calc(var(--u) * 4); text-align: center;
      background: var(--surface); border-radius: var(--r-box); color: var(--muted); font-size: var(--fs-sm); }
    .tf-empty b { color: var(--text); font-size: var(--fs-base); }
    .tf-empty .tf-act { margin: 6px 0 0; }
    .tf-skel { display: flex; flex-direction: column; gap: 10px; padding: calc(var(--u) * 3) 0; }
    .tf-skel i { display: block; height: 10px; border-radius: 5px; background: linear-gradient(90deg, var(--surface-2) 0%,
      color-mix(in oklab, var(--surface-2) 40%, var(--bg)) 50%, var(--surface-2) 100%); background-size: 200% 100%; animation: tf-shim 1.4s linear infinite; }
    .tf-skel i:nth-child(3n + 2) { width: 82%; } .tf-skel i:nth-child(3n) { width: 64%; }
    @keyframes tf-shim { to { background-position: -200% 0; } }
    .tf .dt-bulk { display: flex; }`;
  simpleC.css += famCSS;
  denseC.css += famCSS;

  const quiet = `
    .ct { border-collapse: separate; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); border-radius: var(--r-box); }
    .ct th, .ct td { padding-left: calc(var(--u) * 4); padding-right: calc(var(--u) * 4); }
    .ct td { border-top: 1px solid var(--border); }`;
  const sf = (name, note, css) => ({ name: `Quiet card · ${name}`, note, css: quiet + css, html: sFamily, family: true, round: 4, basedOn: '#03 Quiet card' });
  simpleC.options.push(
    sf('family', 'Your pick as a full family: default, titled with action, empty state', ''),
    sf('tighter rows', 'Same card, rows packed closer', `.ct th, .ct td { padding-top: calc(var(--u) * 1.75); padding-bottom: calc(var(--u) * 1.75); }`),
    sf('tonal header', 'Header row sits in a soft band inside the card', `.ct th { background: var(--surface-2); }
      .ct th:first-child { border-start-start-radius: var(--r-box); } .ct th:last-child { border-start-end-radius: var(--r-box); }`),
    sf('inset dividers', 'Row lines start after the padding, list-style', `.ct td { border-top: 0; background: linear-gradient(var(--border), var(--border)) no-repeat left top / 100% 1px; }
      .ct td:first-child { background-position: right top; background-size: calc(100% - 16px) 1px; }`),
    sf('hover rows', 'No row lines; hovered row gets a tone', `.ct td { border-top: 0; transition: background var(--dur) var(--ease); }
      .ct th { border-bottom: 1px solid var(--border); } .ct tbody tr:hover td { background: var(--surface-2); }`),
    sf('mono figures', 'Numbers and dates in the mono font', `.ct .n { font-family: var(--font-mono); font-size: var(--fs-xs); }`),
  );

  const df = (name, note, css) => ({ name: `Hairline · ${name}`, note, css: dhair + css, html: dFamily, family: true, round: 4, basedOn: '#01 Hairline' });
  denseC.options.push(
    df('family', 'Your pick as a full family: selection bar, loading skeleton, empty/filtered state', ''),
    df('micro-caps header', 'Tiny tracked caps in the header', `.dt th { text-transform: uppercase; letter-spacing: 0.07em; font-size: 10px; font-weight: 600; }`),
    df('tonal header', 'Header in a soft band instead of a strong rule', `.dt th { background: var(--surface-2); border-bottom-color: transparent; }`),
    df('mono figures', 'IDs, numbers and times in the mono font', `.dt .n, .dt .dt-at { font-family: var(--font-mono); font-size: 11px; }`),
    df('read-only', 'No checkbox column or bulk bar — for data you only read', `.dt .dt-c { display: none; } .tf .dt-bulk { display: none; }`),
    df('roomier', 'A little more air per row; still dense', `.dt th, .dt td { padding-top: calc(var(--u) * 2.3); padding-bottom: calc(var(--u) * 2.3); }`),
  );
})();
