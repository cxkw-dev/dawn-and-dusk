/* File upload.
   - [data-dd-dropzone] (a .dd-dropzone label around an <input type="file">) gets .is-dragover while files hover it;
     dropped files are handed to the input, which fires "change".
   - data-dd-dropzone="#listId" lists the chosen files in that .dd-file-list (name, size, a remove button).
   - [data-dd-file-remove] inside a .dd-file removes that row (with a short exit animation). */
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

  // Drag state: count enter/leave pairs so moving over children doesn't flicker.
  const depth = new WeakMap();
  document.addEventListener('dragenter', (e) => {
    const z = zoneOf(e); if (!z) return;
    e.preventDefault();
    depth.set(z, (depth.get(z) || 0) + 1);
    z.classList.add('is-dragover');
  });
  document.addEventListener('dragover', (e) => { const z = zoneOf(e); if (z) { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; } });
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
    try {
      const dt = new DataTransfer();
      [...e.dataTransfer.files].slice(0, input.multiple ? undefined : 1).forEach((f) => dt.items.add(f));
      input.files = dt.files;
    } catch { return; }
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  document.addEventListener('change', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;
    const z = input.closest('[data-dd-dropzone]');
    const target = z?.dataset.ddDropzone;
    const list = target ? document.querySelector(target) : null;
    if (!list) return;
    for (const f of input.files) {
      const [cls, ext] = kind(f.name);
      const li = document.createElement('li');
      li.className = 'dd-file is-done is-new';
      li.innerHTML = `<span class="dd-file__icon ${cls}"${ext ? ` data-ext="${esc(ext)}"` : ''}>${icon('file')}</span>
        <span class="dd-file__body"><span class="dd-file__name">${esc(f.name)}</span>
        <span class="dd-file__meta"><span>${size(f.size)}</span><span class="dd-file__status">${icon('check')}Ready</span></span></span>
        <span class="dd-file__actions"><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" data-dd-file-remove aria-label="Remove ${esc(f.name)}">${icon('x')}</button></span>`;
      list.append(li);
    }
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dd-file-remove]');
    if (!btn) return;
    const row = btn.closest('.dd-file');
    if (!row) return;
    const list = row.parentElement;
    const next = row.nextElementSibling?.querySelector('[data-dd-file-remove]') || row.previousElementSibling?.querySelector('[data-dd-file-remove]');
    row.classList.add('is-removing');
    // Focus moves to the neighbouring remove button, or back to the list's dropzone once the list is empty.
    const zone = list?.id ? document.querySelector(`[data-dd-dropzone="#${CSS.escape(list.id)}"] input[type="file"]`) : null;
    const done = () => { row.remove(); (next || zone)?.focus(); list?.dispatchEvent(new CustomEvent('dd-file-remove', { bubbles: true })); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) done(); else row.addEventListener('animationend', done, { once: true });
  });
})();
