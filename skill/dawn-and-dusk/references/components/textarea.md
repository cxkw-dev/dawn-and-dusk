# textarea — `textarea`

Several lines of text in the same tonal box as the text input. The label tucks in above the text, a counter keeps length honest, and auto-grow is one attribute away.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/textarea

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### With counter

Put a .dd-field__counter in the field’s foot; it counts against the textarea’s maxlength as you type. Try it: type, or paste a long text — it stops at 500.

```html
<div class="dd-field" style="max-width: 520px">
  <label class="dd-field__label" for="ta-1">Release notes</label>
  <div class="dd-input dd-textarea">
    <textarea class="dd-input__control" id="ta-1" rows="4" maxlength="500" placeholder="What changed in this deploy?">Moves session refresh into auth-gateway and drops the legacy cookie. Cold starts on billing-worker are down 38%.</textarea>
  </div>
  <div class="dd-field__foot">
    <p class="dd-field__hint">Markdown works. Shown on the changelog.</p>
    <span class="dd-field__counter">112 / 500</span>
  </div>
</div>
```

## Auto-grow

Add `data-dd-autogrow`: the box starts at two lines, grows with the content up to ten, then scrolls. It shrinks back when the text is deleted or its form is reset.

Try it: press Enter a few times, keep going past ten lines, then Discard.

```html
<form class="dd-stack" id="ta-2-form" style="--dd-gap: 10px; max-width: 520px" onsubmit="return false">
  <div class="dd-field">
    <label class="dd-field__label" for="ta-2">Comment</label>
    <div class="dd-input dd-textarea">
      <textarea class="dd-input__control" id="ta-2" data-dd-autogrow required placeholder="Leave a note for the reviewer…"></textarea>
    </div>
    <p class="dd-field__hint">Grows as you type, up to ten lines.</p>
  </div>
  <div class="dd-row" style="justify-content: flex-end">
    <button class="dd-btn dd-btn--ghost" type="reset">Discard</button>
    <button class="dd-btn dd-btn--primary" type="submit">Comment</button>
  </div>
</form>
```

## Soft limit, error and disabled

`data-dd-counter="72"` sets a soft limit: typing past it is allowed, but the counter turns red and the control is marked invalid until it is back under. An error marked `data-dd-counter-error` shows only while the limit is passed.

Try it: trim the commit message under 72 characters — the error goes away.

```html
<div class="dd-form__grid">
  <div class="dd-field">
    <label class="dd-field__label" for="ta-3">Commit message</label>
    <div class="dd-input dd-textarea">
      <textarea class="dd-input__control" id="ta-3" rows="2" aria-invalid="true" aria-describedby="ta-3-err ta-3-c">fix(edge-cache): respect stale-while-revalidate on 304s so purges stop racing the origin</textarea>
    </div>
    <div class="dd-field__foot">
      <p class="dd-field__error" id="ta-3-err" data-dd-counter-error>Keep the subject line under 72 characters.</p>
      <span class="dd-field__counter is-over" id="ta-3-c" data-dd-counter="72">88 / 72</span>
    </div>
  </div>
  <div class="dd-field">
    <label class="dd-field__label" for="ta-4">Incident summary</label>
    <div class="dd-input dd-textarea">
      <textarea class="dd-input__control" id="ta-4" rows="2" disabled>edge-cache served stale purges for 14 minutes after the 09:12 deploy.</textarea>
    </div>
    <p class="dd-field__hint">Locked since the post-mortem went out on Oct 21.</p>
  </div>
</div>
```

## Code and config

Add `.dd-mono` to the control for config, keys and logs; turn spellcheck off.

```html
<div class="dd-field dd-field--above" style="max-width: 520px">
  <label class="dd-field__label" for="ta-5">Environment variables</label>
  <div class="dd-input dd-textarea">
    <textarea class="dd-input__control dd-mono" id="ta-5" rows="4" spellcheck="false">DATABASE_URL=postgres://billing@db.internal:5432/billing
EDGE_CACHE_TTL=300
LOG_LEVEL=info</textarea>
  </div>
  <p class="dd-field__hint">One KEY=value per line. Values are encrypted at rest.</p>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-input.dd-textarea` | The box. Carries the padding so scrolled text never slides under the tucked label. |
| `.dd-input__control` | The `<textarea>`. Height follows `rows` (2, 3, 4 or 6; 3 by default); resizes vertically, up to 24 lines. |
| `.dd-input__control.dd-mono` | Mono text with a taller line height, for config, keys and logs. |
| `[data-dd-autogrow]` | Grows with its content (2–10 lines). |
| `.dd-field__counter` | Character counter in the field foot (see Form field). |

## Behaviour

`ds/behaviors/textarea.js` handles auto-grow; the counter comes from `form-field.js`.

| class / attribute | what it does |
|---|---|
| `textarea[data-dd-autogrow]` | Resizes to fit on every input, up to the CSS max-height, then scrolls. Also refits after its form is reset, and once a hidden one (in a closed dialog or tab panel) shows. |
| `.dd-field__counter` | Counts the field’s control: `n / maxlength`, or `n / data-dd-counter` as a soft limit. `.is-near` at 90%, `.is-over` past it. Re-counts when its form is reset. |
| `[data-dd-counter-error]` | On a `.dd-field__error` in the field: shown only while the soft limit is passed. |

## Guidelines

Do:
- Size the box to the expected answer — two lines for a note, six for a description.
- Show a counter only when there is a limit.
- Use a soft limit when people need to see the whole draft before trimming.

Don't:
- Don’t use a textarea for one-line answers.
- Don’t cut pasted text silently at maxlength; prefer a soft limit.
- Don’t turn off resizing unless the layout depends on it.

