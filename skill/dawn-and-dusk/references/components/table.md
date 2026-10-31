# table — `table`

A quiet card for a handful of rows: single-line cells, hairlines between rows, a header that stays out of the way. For large or interactive data sets, use the data table.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/table

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Quiet card

The default. Numbers right-align with tabular figures; status is a dot plus a word, never colour alone. Try it on a narrow screen: the card scrolls sideways on its own, never the page — Tab to it and use the arrow keys.

```html
<div class="dd-table" tabindex="0" role="region" aria-label="Projects">
  <table>
    <thead><tr><th scope="col">Project</th><th scope="col">Status</th><th scope="col" class="is-num">Stars</th><th scope="col" class="is-num">Updated</th></tr></thead>
    <tbody>
      <tr><td><a href="#">dawn-and-dusk</a></td><td><span class="dd-table__status" data-status="ok">Live</span></td><td class="is-num">1,284</td><td class="is-num is-muted">2h ago</td></tr>
      <tr><td><a href="#">dockey-ui</a></td><td><span class="dd-table__status" data-status="ok">Live</span></td><td class="is-num">642</td><td class="is-num is-muted">1d ago</td></tr>
      <tr><td><a href="#">insomnia</a></td><td><span class="dd-table__status" data-status="warn">Beta</span></td><td class="is-num">318</td><td class="is-num is-muted">3d ago</td></tr>
      <tr><td><a href="#">ai-focus</a></td><td><span class="dd-table__status" data-status="info">Draft</span></td><td class="is-num">96</td><td class="is-num is-muted">2w ago</td></tr>
      <tr><td><a href="#">leetnode</a></td><td><span class="dd-table__status" data-status="muted">Archived</span></td><td class="is-num">41</td><td class="is-num is-muted">4mo ago</td></tr>
    </tbody>
  </table>
</div>
```

## With title and action

A lockup title sits above the card with an optional count and one action at the far edge, usually a link to the full list.

```html
<header class="dd-table-header">
  <h3 class="dd-table-header__title" id="tb-open-source">Open source</h3>
  <span class="dd-table-header__meta">3 of 12</span>
  <a class="dd-table-header__action" href="#" data-dd-toast="Opening all 12 projects" data-dd-toast-description="In an app this goes to the full list.">View all <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
</header>
<div class="dd-table" tabindex="0" role="region" aria-labelledby="tb-open-source">
  <table>
    <thead><tr><th scope="col">Project</th><th scope="col">Status</th><th scope="col" class="is-num">Stars</th><th scope="col" class="is-num">Updated</th></tr></thead>
    <tbody>
      <tr><td><a href="#">dawn-and-dusk</a></td><td><span class="dd-table__status" data-status="ok">Live</span></td><td class="is-num">1,284</td><td class="is-num is-muted">2h ago</td></tr>
      <tr><td><a href="#">dockey-ui</a></td><td><span class="dd-table__status" data-status="ok">Live</span></td><td class="is-num">642</td><td class="is-num is-muted">1d ago</td></tr>
      <tr><td><a href="#">insomnia</a></td><td><span class="dd-table__status" data-status="warn">Beta</span></td><td class="is-num">318</td><td class="is-num is-muted">3d ago</td></tr>
    </tbody>
  </table>
</div>
```

## Empty state

Keep the header so people can see what will be here. Say what is missing, why it matters and the one action that fills it.

```html
<header class="dd-table-header">
  <h3 class="dd-table-header__title" id="tb-projects">Projects</h3>
  <button class="dd-btn dd-btn--secondary dd-btn--sm" type="button" data-dd-toast="New project" data-dd-toast-description="In an app this opens the new-project form."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New project</span></button>
</header>
<div class="dd-table" tabindex="0" role="region" aria-labelledby="tb-projects">
  <table>
    <thead><tr><th scope="col">Project</th><th scope="col">Status</th><th scope="col" class="is-num">Stars</th><th scope="col" class="is-num">Updated</th></tr></thead>
  </table>
  <div class="dd-table__empty">
    <span class="dd-table__empty-icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg></span>
    <p class="dd-table__empty-title">No projects yet</p>
    <p>Anything you publish shows up here, with its status and stars.</p>
    <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-dd-toast="New project" data-dd-toast-description="In an app this opens the new-project form."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>New project</span></button>
  </div>
</div>
```

## Compact

Tighter rows for side panels and dashboards. Combine with `--mono` when the table is mostly figures, hashes and times.

```html
<div class="dd-table dd-table--compact dd-table--mono" tabindex="0" role="region" aria-label="Recent deploys">
  <table>
    <thead><tr><th scope="col">Commit</th><th scope="col">Service</th><th scope="col">Environment</th><th scope="col" class="is-num">Duration</th><th scope="col" class="is-num">Started</th></tr></thead>
    <tbody>
      <tr><td class="is-mono is-muted">a41f9c2</td><td>auth-gateway</td><td>production</td><td class="is-num">2m 14s</td><td class="is-num">09:41</td></tr>
      <tr><td class="is-mono is-muted">7be03d1</td><td>billing-worker</td><td>production</td><td class="is-num">3m 02s</td><td class="is-num">09:12</td></tr>
      <tr><td class="is-mono is-muted">c90e5aa</td><td>edge-cache</td><td>staging</td><td class="is-num">58s</td><td class="is-num">08:47</td></tr>
      <tr><td class="is-mono is-muted">1d2b7f0</td><td>dockey-ui</td><td>preview</td><td class="is-num">1m 31s</td><td class="is-num">08:03</td></tr>
      <tr><td class="is-mono is-muted">e66a4b9</td><td>ai-focus</td><td>preview</td><td class="is-num">1m 07s</td><td class="is-num">07:55</td></tr>
    </tbody>
  </table>
</div>
```

## Mono figures and interactive rows

`--mono` sets numeric cells in DM Mono. `--interactive` adds a hover tone when the whole row opens something; put a `.dd-table__row-link` in the first cell and it stretches over the row, so the row is one real link (middle-click and the keyboard work too). A `<tfoot>` carries totals.

Try it: hover a row and click anywhere on it, or Tab to a row and press Enter.

```html
<div class="dd-table dd-table--mono dd-table--interactive" tabindex="0" role="region" aria-label="Invoices">
  <table>
    <thead><tr><th scope="col">Invoice</th><th scope="col">Issued</th><th scope="col">Status</th><th scope="col" class="is-num">Amount</th></tr></thead>
    <tbody>
      <tr><td class="is-mono"><a class="dd-table__row-link" href="#" data-dd-toast="Opening INV-2026-0142" data-dd-toast-description="The row is one link: the whole row opens the invoice.">INV-2026-0142</a></td><td class="is-muted">Oct 1</td><td><span class="dd-table__status" data-status="ok">Paid</span></td><td class="is-num">$1,240.00</td></tr>
      <tr><td class="is-mono"><a class="dd-table__row-link" href="#" data-dd-toast="Opening INV-2026-0131" data-dd-toast-description="The row is one link: the whole row opens the invoice.">INV-2026-0131</a></td><td class="is-muted">Sep 1</td><td><span class="dd-table__status" data-status="ok">Paid</span></td><td class="is-num">$1,180.50</td></tr>
      <tr><td class="is-mono"><a class="dd-table__row-link" href="#" data-dd-toast="Opening INV-2026-0119" data-dd-toast-description="The row is one link: the whole row opens the invoice.">INV-2026-0119</a></td><td class="is-muted">Aug 1</td><td><span class="dd-table__status" data-status="warn">Overdue</span></td><td class="is-num">$968.25</td></tr>
    </tbody>
    <tfoot><tr><th scope="row" colspan="3">Total, last 3 months</th><td class="is-num">$3,388.75</td></tr></tfoot>
  </table>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-table` | The card: `--dd-surface`, rounded, and the horizontal scroll container. Put a plain `<table>` inside, with `scope="col"` on the header cells. Give it `tabindex="0"`, `role="region"` and a label (`aria-label`, or `aria-labelledby` pointing at the header title) so a wide table can be scrolled from the keyboard. |
| `th.is-num / td.is-num` | Right-aligned figure column (tabular numbers). |
| `.is-muted · .is-strong · .is-mono · .is-shrink` | Cell helpers: secondary text, emphasis, mono IDs/hashes, shrink-to-fit column. |
| `.dd-table__status[data-status]` | Dot + label: `ok · warn · bad · info · muted`. `bad` also colours the label; `muted` greys it. |
| `.dd-table--compact` | Tighter rows and padding. |
| `.dd-table--mono` | Numeric cells in DM Mono. |
| `.dd-table--interactive` | Rows get a pointer and a hover wash (a stronger one while pressed); a row also lights up while something inside it has focus. |
| `.dd-table__row-link` | In an `--interactive` table: the row’s one link, stretched over the whole row. It keeps the cell’s text style; keyboard focus rings the row. |
| `.dd-table--plain` | No card: hairlines on the page, flush to the text edge. |
| `.dd-table-header (+ __title, __meta, __action)` | Title row above the card. A `.dd-btn` placed in it is pushed to the far edge. |
| `.dd-table__empty (+ __empty-icon, __empty-title)` | Empty state inside the card, after a header-only table. |

## Guidelines

Do:
- Use it for up to ~10 rows that need no sorting or selection.
- Right-align numbers and keep their units consistent within a column.
- Keep cells to one line; truncate long text in the cell, not the column.

Don't:
- Don’t add vertical rules or zebra stripes; the hairline is enough.
- Don’t use it for hundreds of rows. Reach for the data table instead.
- Don’t put more than one action in the header.

