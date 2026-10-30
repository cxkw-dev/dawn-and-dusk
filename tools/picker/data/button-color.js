/* Button color: which palette color fills primary buttons. Every button style reads --accent / --on-accent,
   and app.css re-points those to --btn-accent / --btn-on inside button specs, so one pick recolours them all. */
(() => {
  // Readable text on any fill: light text on dark fills, dark text on light ones (relative color syntax).
  const auto = (c) => `oklch(from ${c} clamp(0.22, (0.66 - l) * 99, 0.97) 0.012 h)`;
  const bc = (name, note, fill, on = auto(fill)) => ({ name, note, round: 4, vars: { '--btn-accent': fill, '--btn-on': on } });

  DD.category({
    id: 'button-color', group: 'Components', kind: 'tokens', title: 'Button color',
    blurb: 'Which palette color fills primary buttons. Applies to every button style above and on the live page; text color adjusts automatically.',
    options: [
      bc('Palette accent', 'Whatever the palette’s accent is (Greige Gallery: taupe)', 'var(--accent)', 'var(--on-accent)'),
      bc('Ink', 'Your text color — monochrome, matches the logo', 'var(--text)', 'var(--bg)'),
      bc('Soft ink', 'Ink at 80% — a touch gentler', 'color-mix(in oklab, var(--text) 80%, var(--bg))', 'var(--bg)'),
      bc('Tone 1', 'First supporting tone (greige / sage / brass…)', 'var(--tone-1)'),
      bc('Tone 2', 'Second supporting tone', 'var(--tone-2)'),
      bc('Tone 3', 'Third supporting tone', 'var(--tone-3)'),
      bc('Deep tone 1', 'Tone 1 darkened toward ink — richer, still on-palette', 'color-mix(in oklab, var(--tone-1) 55%, var(--text))'),
      bc('Deep tone 2', 'Tone 2 darkened toward ink', 'color-mix(in oklab, var(--tone-2) 55%, var(--text))'),
      bc('Muted accent', 'Accent softened toward the page', 'color-mix(in oklab, var(--accent) 70%, var(--bg))'),
      bc('Surface', 'Light, low-key button — the fill is the subtle surface tone', 'var(--surface-2)', 'var(--text)'),
      bc('Success green', 'Status green for “go” actions', 'var(--ok)'),
    ],
    preview: () => `<div class="pv-bc">
      <div class="pv-bc-row"><span class="pv-bc-b">{{icon:plus}} New project</span><span class="pv-bc-b is-sm">Save</span><span class="pv-bc-s">Cancel</span></div>
      <div class="pv-bc-row pv-bc-on"><span class="pv-bc-b">{{icon:arrow-right}} Get started</span><span class="pv-bc-sw"><i></i><span class="mono">fill</span></span></div>
    </div>`,
    css: `
      .pv-bc { display: flex; flex-direction: column; gap: 14px; }
      .pv-bc-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .pv-bc-on { padding: 12px; border-radius: var(--r-box); background: var(--surface); }
      .pv-bc-b { display: inline-flex; align-items: center; gap: 6px; padding: calc(var(--u) * 2.25) calc(var(--u) * 4); border-radius: var(--r-ctl);
        background: var(--btn-accent); color: var(--btn-on); font-weight: 600; font-size: var(--fs-sm); line-height: 1; }
      .pv-bc-b.is-sm { padding: calc(var(--u) * 1.5) calc(var(--u) * 3); font-size: var(--fs-xs); }
      .pv-bc-s { display: inline-flex; padding: calc(var(--u) * 2.25) calc(var(--u) * 4); border-radius: var(--r-ctl); background: var(--surface-2);
        font-size: var(--fs-sm); font-weight: 600; line-height: 1; }
      .pv-bc-sw { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; color: var(--muted); }
      .pv-bc-sw i { width: 14px; height: 14px; border-radius: 50%; background: var(--btn-accent); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--text) 15%, transparent); }`,
  });
})();
