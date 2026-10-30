/* File upload.
   - [data-dd-dropzone] (a .dd-dropzone label around an <input type="file">) gets .is-dragover while files hover it;
     dropped files are handed to the input, which fires "change".
   - data-dd-dropzone="#listId" lists the chosen files in that .dd-file-list (name, size, a remove button).
     A multiple input adds to the list (and its files are everything listed); a single one replaces it.
   - Files that don't match the input's accept="…" or exceed data-dd-max-size ("20MB", "500KB", bytes) are listed as
     errors with the reason, and left out of the input's files.
   - [data-dd-file-remove] inside a .dd-file removes that row (with a short exit animation) and its file, then fires
     a bubbling "dd-file-remove" event on the list with detail { name }. */
(() => {
  const size = (b) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`);
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (n) => `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-${n}"/></svg>`;
  const kind = (name) => {
    const ext = (name.split('.').pop() || '').toLowerCase();
    if (/^(png|jpe?g|gif|webp|svg|avif)$/.test(ext)) return ['is-image', ext];
    if (/^(pdf|docx?|md|txt)$/.test(ext)) return ['is-doc', ext];
    if (/^(csv|json|ya?ml|sql|parquet)$/.test(ext)) return ['is-data', ext];
    if (/^(js|ts|css|html|sh|py|go|rs)$/.test(ext)) return ['is-code', ext];
    return ['', ext.slice(0, 4)];
  };
  const zoneOf = (e) => e.target.closest?.('[data-dd-dropzone]');
  const added = new WeakSet(); // rows the script added
  const files = new WeakMap(); // row → File, for the accepted ones
  const UNITS = { b: 1, kb: 1024, mb: 1048576, gb: 1073741824 };
  const bytes = (s) => { const m = /^\s*([\d.]+)\s*(b|kb|mb|gb)?\s*$/i.exec(s || ''); return m ? Number(m[1]) * UNITS[(m[2] || 'b').toLowerCase()] : Infinity; };
  // Same rules as the accept attribute: ".png", "image/*", "application/pdf".
  const accepted = (input, f) => {
    const rules = (input.accept || '').split(',').map((r) => r.trim().toLowerCase()).filter(Boolean);
    const name = f.name.toLowerCase(); const type = (f.type || '').toLowerCase();
    return !rules.length || rules.some((r) => (r.startsWith('.') ? name.endsWith(r) : r.endsWith('/*') ? type.startsWith(r.slice(0, -1)) : type === r));
  };
  const problem = (input, zone, f) => {
    if (!accepted(input, f)) return 'Type not accepted';
    const max = zone?.dataset.ddMaxSize;
    if (max && f.size > bytes(max)) return `Too large — ${max.replace(/\s*([KMG]?B)$/i, ' $1').toUpperCase()} max`;
    return '';
  };
  const setFiles = (input, list) => {
    try { const dt = new DataTransfer(); list.forEach((f) => dt.items.add(f)); input.files = dt.files; } catch { /* old browsers: leave the input as it is */ }
  };
  const listFor = (input) => {
    const target = input.closest('[data-dd-dropzone]')?.dataset.ddDropzone;
    return target ? document.querySelector(target) : null;
  };

  // Drag state: count enter/leave pairs so moving over children doesn't flicker.
  const depth = new WeakMap();
  document.addEventListener('dragenter', (e) => {
    const z = zoneOf(e); if (!z) return;
    e.preventDefault();
    depth.set(z, (depth.get(z) || 0) + 1);
    if (!z.querySelector('input[type="file"]')?.disabled) z.classList.add('is-dragover');
  });
  document.addEventListener('dragover', (e) => { const z = zoneOf(e); if (z) { e.preventDefault(); e.dataTransfer.dropEffect = z.querySelector('input[type="file"]')?.disabled ? 'none' : 'copy'; } });
  document.addEventListener('dragleave', (e) => {
    const z = zoneOf(e); if (!z) return;
    const n = (depth.get(z) || 1) - 1;
    depth.set(z, n);
    if (n <= 0) z.classList.remove('is-dragover');
  });
  document.addEventListener('drop', (e) => {
    const z = zoneOf(e); if (!z) return;
    e.preventDefault();
    depth.set(z, 0);
    z.classList.remove('is-dragover');
    const input = z.querySelector('input[type="file"]');
    if (!input || input.disabled || !e.dataTransfer?.files?.length) return;
    const dropped = [...e.dataTransfer.files].slice(0, input.multiple ? undefined : 1);
    setFiles(input, dropped);
    if (input.files.length !== dropped.length) return;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  document.addEventListener('change', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;
    const zone = input.closest('[data-dd-dropzone]');
    const list = listFor(input);
    const chosen = [...input.files];
    // A single-file field holds one file: a new choice replaces the old row.
    if (list && !input.multiple) list.querySelectorAll(':scope > .dd-file').forEach((row) => added.has(row) && row.remove());
    const keep = list && input.multiple ? [...list.querySelectorAll(':scope > .dd-file')].map((row) => files.get(row)).filter(Boolean) : [];
    for (const f of chosen) {
      const why = problem(input, zone, f);
      if (!why) keep.push(f);
      if (!list) continue;
      const [cls, ext] = kind(f.name);
      const li = document.createElement('li');
      li.className = `dd-file ${why ? 'is-error' : 'is-done'} is-new`;
      li.innerHTML = `<span class="dd-file__icon ${cls}"${ext ? ` data-ext="${esc(ext)}"` : ''}>${icon('file')}</span>
        <span class="dd-file__body"><span class="dd-file__name">${esc(f.name)}</span>
        <span class="dd-file__meta"><span>${size(f.size)}</span><span class="dd-file__status">${icon(why ? 'alert' : 'check')}${why ? esc(why) : 'Ready'}</span></span></span>
        <span class="dd-file__actions"><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" data-dd-file-remove aria-label="Remove ${esc(f.name)}">${icon('x')}</button></span>`;
      added.add(li);
      if (!why) files.set(li, f);
      list.append(li);
    }
    // The input's files are the accepted ones the list shows; rejected files never reach the form.
    if (keep.length !== chosen.length || keep.some((f, n) => f !== chosen[n])) setFiles(input, keep);
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dd-file-remove]');
    if (!btn) return;
    const row = btn.closest('.dd-file');
    if (!row || row.classList.contains('is-removing')) return;
    const list = row.parentElement;
    const next = row.nextElementSibling?.querySelector('[data-dd-file-remove]') || row.previousElementSibling?.querySelector('[data-dd-file-remove]');
    row.classList.add('is-removing');
    // Focus moves to the neighbouring remove button, or back to the list's dropzone once the list is empty.
    const input = list?.id ? document.querySelector(`[data-dd-dropzone="#${CSS.escape(list.id)}"] input[type="file"]`) : null;
    const file = files.get(row);
    if (input && file) setFiles(input, [...input.files].filter((f) => f !== file));
    const name = row.querySelector('.dd-file__name')?.textContent.trim() ?? '';
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      const hadFocus = row.contains(document.activeElement);
      row.remove();
      if (hadFocus || document.activeElement === document.body) (next || input)?.focus();
      list?.dispatchEvent(new CustomEvent('dd-file-remove', { bubbles: true, detail: { name } }));
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
    else {
      row.addEventListener('animationend', (ev) => { if (ev.target === row) done(); });
      setTimeout(done, 600); // in case the animation never runs (hidden tab, display: none)
    }
  });
})();
