# file upload — `file-upload`

Takes files by drop or by browsing, then shows each one with its size, progress and outcome. The dropzone is a label around a real file input, so click, keyboard and drop all work.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/file-upload

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Dropzone

Try it: click to browse, or drag files from your desktop onto it. Each file gets a row with a remove button; a type it doesn’t take, or a file over 20 MB, gets an error row instead.

```html
<div class="dd-stack" style="--dd-gap: 12px">
  <label class="dd-dropzone" data-dd-dropzone="#fu-list-1" data-dd-max-size="20MB">
    <input type="file" multiple accept=".png,.jpg,.svg,.pdf,.csv,.json">
    <span class="dd-dropzone__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg></span>
    <p class="dd-dropzone__title">Drop files here or <span class="dd-dropzone__browse">browse</span></p>
    <p class="dd-dropzone__meta">PNG, SVG, PDF, CSV or JSON · up to 20 MB each</p>
  </label>
  <ul class="dd-file-list" id="fu-list-1" aria-label="Chosen files"></ul>
</div>
```

## Drag state

While files hover the zone it gets `.is-dragover`: an accent tint, accent dashes and a lifted icon.

Pinned in its drag state. To see it live, drag a file over the dropzone above.

```html
<label class="dd-dropzone is-dragover">
  <input type="file">
  <span class="dd-dropzone__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg></span>
  <p class="dd-dropzone__title">Release to upload</p>
  <p class="dd-dropzone__meta">3 files · 4.2 MB</p>
</label>
```

## File list

One row per file: a type tile (Color set by kind), name, mono meta and an outcome. Uploading rows show a progress bar; errors turn the tile, meta and bar red and offer a retry.

Try it: remove a row with × (focus moves to the next one); retry gives feedback.

```html
<ul class="dd-file-list">
  <li class="dd-file is-uploading">
    <span class="dd-file__icon is-image" data-ext="png"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg></span>
    <span class="dd-file__body">
      <span class="dd-file__name">dockey-ui-hero@2x.png</span>
      <span class="dd-file__meta"><span>2.4 MB</span><span class="dd-file__status">Uploading 64%</span></span>
      <progress class="dd-file__progress" max="100" value="64" aria-label="Upload progress">64%</progress>
    </span>
    <span class="dd-file__actions"><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" aria-label="Cancel upload" data-dd-file-remove><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  </li>
  <li class="dd-file is-done">
    <span class="dd-file__icon is-data" data-ext="csv"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg></span>
    <span class="dd-file__body">
      <span class="dd-file__name">billing-worker-usage-2026-10.csv</span>
      <span class="dd-file__meta"><span>812 KB</span><span class="dd-file__status"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg>Uploaded</span></span>
    </span>
    <span class="dd-file__actions"><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" aria-label="Remove billing-worker-usage-2026-10.csv" data-dd-file-remove><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg></button></span>
  </li>
  <li class="dd-file is-error">
    <span class="dd-file__icon is-doc" data-ext="pdf"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg></span>
    <span class="dd-file__body">
      <span class="dd-file__name">auth-gateway-runbook.pdf</span>
      <span class="dd-file__meta"><span>24.8 MB</span><span class="dd-file__status"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>Too large — 20 MB max</span></span>
      <progress class="dd-file__progress" max="100" value="100" aria-label="Upload progress">100%</progress>
    </span>
    <span class="dd-file__actions"><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" aria-label="Retry upload" data-dd-toast="Still too large" data-dd-toast-description="auth-gateway-runbook.pdf is 24.8 MB; the limit is 20 MB." data-dd-toast-intent="bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg></button><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" aria-label="Remove auth-gateway-runbook.pdf" data-dd-file-remove><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  </li>
  <li class="dd-file is-error">
    <span class="dd-file__icon is-code" data-ext="json"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg></span>
    <span class="dd-file__body">
      <span class="dd-file__name">edge-cache.config.json</span>
      <span class="dd-file__meta"><span>3 KB</span><span class="dd-file__status"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>Network lost at 30%</span></span>
      <progress class="dd-file__progress" max="100" value="30" aria-label="Upload progress">30%</progress>
    </span>
    <span class="dd-file__actions"><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" aria-label="Retry upload" data-dd-toast="Retrying upload" data-dd-toast-description="edge-cache.config.json"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg></button><button class="dd-btn dd-btn--ghost dd-btn--icon dd-btn--sm" type="button" aria-label="Remove edge-cache.config.json" data-dd-file-remove><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></span>
  </li>
</ul>
```

## Compact

A one-line zone for single files inside a form. Pair it with a label-above field.

Try it: one image at a time — choosing another replaces it.

```html
<div class="dd-field dd-field--above" style="max-width: 520px">
  <span class="dd-field__label" id="fu-c-label">Avatar</span>
  <label class="dd-dropzone dd-dropzone--compact" data-dd-dropzone="#fu-list-2" data-dd-max-size="5MB" aria-labelledby="fu-c-label">
    <input type="file" accept="image/*">
    <span class="dd-dropzone__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg></span>
    <span class="dd-dropzone__text">
      <span class="dd-dropzone__title">Drop an image or <span class="dd-dropzone__browse">browse</span></span>
      <span class="dd-dropzone__meta">Square, at least 256 × 256 · up to 5 MB</span>
    </span>
  </label>
  <ul class="dd-file-list" id="fu-list-2" aria-label="Chosen image"></ul>
</div>
```

Still a working zone: click to browse or drag a file over it.

```html
<div class="dd-field dd-field--above" style="max-width: 520px">
  <span class="dd-field__label" id="fu-i-label">TLS certificate</span>
  <label class="dd-dropzone dd-dropzone--compact is-invalid" data-dd-dropzone aria-labelledby="fu-i-label" aria-describedby="fu-i-err">
    <input type="file" accept=".pem,.crt" aria-invalid="true">
    <span class="dd-dropzone__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-shield"/></svg></span>
    <span class="dd-dropzone__text">
      <span class="dd-dropzone__title">Drop a .pem or <span class="dd-dropzone__browse">browse</span></span>
      <span class="dd-dropzone__meta">Certificate and chain in one file</span>
    </span>
  </label>
  <p class="dd-field__error" id="fu-i-err"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg>A certificate is required for custom domains.</p>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-dropzone` | A `<label>` around an `<input type="file">` (visually hidden, still focusable). A `disabled` input fades the zone and ignores drops. |
| `.dd-dropzone__icon · __title · __browse · __meta` | Icon disc, title with a dotted “browse” link, mono constraints line. |
| `.dd-dropzone--compact · __text` | One-row zone; wrap the title and meta in `__text`. |
| `.is-dragover · .is-invalid` | Drag-hover state (added by the script) and error state. |
| `.dd-file-list` | List of files (`<ul>`). |
| `.dd-file` | One file row. `.is-done`, `.is-error`, `.is-uploading`; `.is-new` slides a freshly added row in (the script sets it). |
| `.dd-file__icon` | Type tile; `data-ext` adds a badge. Tones: `.is-image`, `.is-doc`, `.is-data`, `.is-code`. |
| `.dd-file__body · __name · __meta · __status` | Name (truncates), mono meta items separated by dots, and the outcome. |
| `.dd-file__progress` | A native `<progress>`; turns red in an error row. |
| `.dd-file__actions` | Trailing icon buttons (cancel, retry, remove). |

## Behaviour

`ds/behaviors/file-upload.js` adds the drag state, lists chosen files and checks them against the zone’s limits.

| class / attribute | what it does |
|---|---|
| `data-dd-dropzone` | Adds `.is-dragover` while files hover; dropped files go to the inner input, which fires `change`. |
| `data-dd-dropzone="#list"` | Also appends a `.dd-file` row per chosen file to that list. A `multiple` input adds to the list and its files are everything listed; a single one replaces its row. |
| `accept · data-dd-max-size` | Files that don’t match the input’s `accept`, or are bigger than `data-dd-max-size` on the zone (`"20MB"`, `"500KB"` or bytes), are listed as errors with the reason and kept out of the input. Dropping skips the browser’s own `accept` filter, so this check matters. |
| `data-dd-file-remove` | On a button in a row: removes the row and its file from the input, moves focus to a neighbouring remove button (or back to the dropzone when the list is empty), and fires a bubbling `dd-file-remove` event on the list with `{ name }`. |

## Guidelines

Do:
- State the accepted types and size limit before people pick a file.
- Say why a file failed, in the row, with a way to retry.
- Keep the dropzone a real file input so keyboard and screen reader users can browse.

Don't:
- Don’t auto-upload sensitive files without a confirm step.
- Don’t clear the list on error — keep the failed rows visible.
- Don’t use the dropzone’s dashed edge for anything else.

