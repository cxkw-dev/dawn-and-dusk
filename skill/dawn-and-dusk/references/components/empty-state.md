# empty state — `empty-state`

What a view says before it has anything to show: why it’s empty, and the one thing that fills it. No illustrations — an icon on a soft tile, a sentence, an action.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/empty-state

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### In a panel

The default size, for cards and panels. Title says what’s missing, text says what will be here, the primary action makes it happen. Try it: the actions on this page answer with a toast.

```html
<div class="dd-surface">
  <div class="dd-empty-state">
    <div class="dd-empty-state__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-box"/></svg></div>
    <h3 class="dd-empty-state__title">No deploys yet</h3>
    <p class="dd-empty-state__text">Connect a repository and every push to <code>main</code> ships to fra1, sfo3 and sgp1.</p>
    <div class="dd-empty-state__actions">
      <button class="dd-btn dd-btn--primary" type="button" data-dd-toast="New deploy" data-dd-toast-description="In an app this opens the deploy form."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New deploy</span></button>
      <a class="dd-btn dd-btn--ghost" href="#" data-dd-toast="Opening the deploy guide" data-dd-toast-description="In an app this opens the docs."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-external"/></svg><span>Read the guide</span></a>
    </div>
  </div>
</div>
```

## Compact

For table bodies, lists and side panels — and for the other reasons a view can be empty: no results, nothing to do, no permission, or an error.

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: var(--dd-space-3)">
  <div class="dd-surface">
    <div class="dd-empty-state dd-empty-state--compact">
      <div class="dd-empty-state__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg></div>
      <h3 class="dd-empty-state__title">No logs match</h3>
      <p class="dd-empty-state__text"><code>status:500 service:edge-cache</code> in the last hour.</p>
      <div class="dd-empty-state__actions"><button class="dd-btn dd-btn--sm" type="button" data-dd-toast="Filters cleared" data-dd-toast-description="In an app the matching logs come back here."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg><span>Clear filters</span></button></div>
    </div>
  </div>
  <div class="dd-surface">
    <div class="dd-empty-state dd-empty-state--compact">
      <div class="dd-empty-state__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-inbox"/></svg></div>
      <h3 class="dd-empty-state__title">Inbox zero</h3>
      <p class="dd-empty-state__text">Nothing needs you right now.</p>
    </div>
  </div>
  <div class="dd-surface">
    <div class="dd-empty-state dd-empty-state--compact">
      <div class="dd-empty-state__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-lock"/></svg></div>
      <h3 class="dd-empty-state__title">Billing is owner-only</h3>
      <p class="dd-empty-state__text">Ask andy@cxkw.dev for access.</p>
      <div class="dd-empty-state__actions"><button class="dd-btn dd-btn--sm" type="button" data-dd-toast="Access requested" data-dd-toast-description="andy@cxkw.dev will get an email." data-dd-toast-intent="ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-mail"/></svg><span>Request access</span></button></div>
    </div>
  </div>
  <div class="dd-surface">
    <div class="dd-empty-state dd-empty-state--compact">
      <div class="dd-empty-state__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-cloud"/></svg></div>
      <h3 class="dd-empty-state__title">Couldn’t load metrics</h3>
      <p class="dd-empty-state__text">The metrics API timed out after 30s.</p>
      <div class="dd-empty-state__actions"><button class="dd-btn dd-btn--sm" type="button" data-dd-toast="Loading metrics again" data-dd-toast-description="In an app this retries the request."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Try again</span></button></div>
    </div>
  </div>
</div>
```

## Page

A whole empty screen, such as a new account. The title takes the heavy lowercase lockup.

```html
<div class="dd-empty-state dd-empty-state--page">
  <div class="dd-empty-state__icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></div>
  <h2 class="dd-empty-state__title">nothing here yet</h2>
  <p class="dd-empty-state__text">Projects hold your deploys, domains and logs. Start one from a repository or a template — it takes about a minute.</p>
  <div class="dd-empty-state__actions">
    <button class="dd-btn dd-btn--primary dd-btn--lg" type="button" data-dd-toast="New project" data-dd-toast-description="In an app this opens the new-project form."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New project</span></button>
    <button class="dd-btn dd-btn--lg" type="button" data-dd-toast="Import" data-dd-toast-description="In an app this lets you pick a repository."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Import</span></button>
  </div>
  <p class="dd-empty-state__meta">or run <span class="dd-mono">dd init</span> in a folder</p>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-empty-state` | Centred column, default size for panels. Honours `hidden`, so you can toggle it with the data. |
| `.dd-empty-state--compact` | Tighter: for table bodies, lists and narrow panels. |
| `.dd-empty-state--page` | Whole screen; the title uses the heading lockup. |
| `.dd-empty-state__icon` | Tonal tile holding one icon. |
| `.dd-empty-state__title / __text` | What’s missing, and what will be here. |
| `.dd-empty-state__actions` | One primary action, maybe a quiet second. |
| `.dd-empty-state__meta` | A faint footnote — a CLI alternative, a link. |

## Guidelines

Do:
- Say what will appear here, not only that it’s empty.
- Offer the action that fills it, right there.
- Tell no-results apart from no-data: “No logs match” with Clear filters.

Don't:
- Don’t add illustrations or mascots.
- Don’t show an empty state while data is still loading — use a skeleton.
- Don’t blame the person: “You have no projects” → “Nothing here yet”.

