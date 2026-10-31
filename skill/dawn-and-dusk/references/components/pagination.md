# pagination — `pagination`

Moves through pages of results. Numbered for browsing, compact when the range matters more than the page number, with a page-size select for data tables.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/pagination

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Numbered

Show the first and last page, the current page and its neighbours; collapse the rest into a gap. The current page sits on a tone. Try it: click a page or the arrows, or Tab to them and press Enter.

```html
<nav class="dd-pagination" aria-label="Pagination" data-dd-pagination data-pages="50" data-page="6">
  <ul class="dd-pagination__pages">
    <li><button class="dd-pagination__step" type="button" aria-label="Previous page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 1">1</button></li>
    <li class="dd-pagination__gap" aria-hidden="true">…</li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 5">5</button></li>
    <li><button class="dd-pagination__page" type="button" aria-current="page" aria-label="Page 6">6</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 7">7</button></li>
    <li class="dd-pagination__gap" aria-hidden="true">…</li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 50">50</button></li>
    <li class="dd-pagination__status">Page 6 of 50</li>
    <li><button class="dd-pagination__step" type="button" aria-label="Next page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button></li>
  </ul>
</nav>
```

## At the edges

On the first or last page, keep the arrow in place and disable it so the control does not shift. The behaviour uses `aria-disabled`, so a keyboard user who pressed it keeps their focus.

Try it: step forward, then back to page 1. The previous arrow dims again.

```html
<nav class="dd-pagination" aria-label="Pagination" data-dd-pagination data-pages="50" data-page="1">
  <ul class="dd-pagination__pages">
    <li><button class="dd-pagination__step" type="button" aria-label="Previous page" aria-disabled="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button></li>
    <li><button class="dd-pagination__page" type="button" aria-current="page" aria-label="Page 1">1</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 2">2</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 3">3</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 4">4</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 5">5</button></li>
    <li class="dd-pagination__gap" aria-hidden="true">…</li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 50">50</button></li>
    <li class="dd-pagination__status">Page 1 of 50</li>
    <li><button class="dd-pagination__step" type="button" aria-label="Next page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button></li>
  </ul>
</nav>
```

For short sets, label the arrows and show every page.

```html
<nav class="dd-pagination" aria-label="Pagination" data-dd-pagination data-pages="6" data-page="2">
  <ul class="dd-pagination__pages">
    <li><button class="dd-pagination__step dd-pagination__step--label" type="button"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-left"/></svg><span>Previous</span></button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 1">1</button></li>
    <li><button class="dd-pagination__page" type="button" aria-current="page" aria-label="Page 2">2</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 3">3</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 4">4</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 5">5</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 6">6</button></li>
    <li class="dd-pagination__status">Page 2 of 6</li>
    <li><button class="dd-pagination__step dd-pagination__step--label" type="button"><span>Next</span><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></button></li>
  </ul>
</nav>
```

## Compact

The range and two arrows. Use it in table footers, side panels and anywhere the total matters more than the page number.

Try it: step through the range; the arrows stop at 1–50 and 2,451–2,481.

```html
<nav class="dd-pagination dd-pagination--compact" aria-label="Pagination" data-dd-pagination data-total="2481" data-page-size="50">
  <span class="dd-pagination__range"><b>1–50</b> of 2,481</span>
  <button class="dd-pagination__step" type="button" aria-label="Previous page" aria-disabled="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
  <button class="dd-pagination__step" type="button" aria-label="Next page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
</nav>
```

## With page size

A native `<select>` for rows per page, the range, then the arrows. `--spread` pushes the groups to opposite edges; they stack when space runs out.

Try it: change the page size; the range keeps its first row in view.

```html
<div class="dd-pagination dd-pagination--spread" data-dd-pagination data-total="2481" data-page="2">
  <label class="dd-pagination__size">Rows per page
    <span class="dd-pagination__select">
      <select aria-label="Rows per page">
        <option>25</option>
        <option selected>50</option>
        <option>100</option>
        <option>250</option>
      </select><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg>
    </span>
  </label>
  <nav class="dd-pagination dd-pagination--compact" aria-label="Pagination">
    <span class="dd-pagination__range"><b>51–100</b> of 2,481</span>
    <button class="dd-pagination__step" type="button" aria-label="Previous page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
    <button class="dd-pagination__step" type="button" aria-label="Next page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
  </nav>
</div>
```

### Table footer

Page size and range on the left, numbered pages on the right. Under 560px the numbers collapse to “Page 4 of 50” between the arrows. Try it: every control here moves the same state.

```html
<div class="dd-pagination dd-pagination--spread" data-dd-pagination data-total="2481" data-page="4">
  <div class="dd-pagination">
    <label class="dd-pagination__size">Rows
      <span class="dd-pagination__select">
        <select aria-label="Rows per page"><option>25</option><option selected>50</option><option>100</option></select><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg>
      </span>
    </label>
    <span class="dd-pagination__range"><b>151–200</b> of 2,481</span>
  </div>
  <nav class="dd-pagination" aria-label="Pagination">
    <ul class="dd-pagination__pages">
      <li><button class="dd-pagination__step" type="button" aria-label="Previous page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 1">1</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 2">2</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 3">3</button></li>
    <li><button class="dd-pagination__page" type="button" aria-current="page" aria-label="Page 4">4</button></li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 5">5</button></li>
    <li class="dd-pagination__gap" aria-hidden="true">…</li>
    <li><button class="dd-pagination__page" type="button" aria-label="Page 50">50</button></li>
    <li class="dd-pagination__status">Page 4 of 50</li>
      <li><button class="dd-pagination__step" type="button" aria-label="Next page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button></li>
    </ul>
  </nav>
</div>
```

## Server-rendered pages

When each page has its own URL, render the same markup with links (`<a class="dd-pagination__page" href="?page=3">`) and leave `data-dd-pagination` off: the browser navigates, and people can share a page or open it in a new tab. The styles are the same for `<a>` and `<button>`.

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-pagination` | Flex row that wraps. Use on `<nav aria-label="Pagination">`. |
| `.dd-pagination__pages` | The `<ul>` of pages and arrows. |
| `.dd-pagination__page` | A page link or button. Mark the current one `aria-current="page"`. |
| `.dd-pagination__step` | Previous / next arrow. Disable with `disabled` or `aria-disabled="true"`; always give it an `aria-label`. |
| `.dd-pagination__step--label` | Arrow with a text label (“Previous”, “Next”). |
| `.dd-pagination__gap` | The “…” between page ranges (`aria-hidden`). |
| `.dd-pagination__status` | “Page 4 of 50”. Hidden on wide screens, replaces the numbers under 560px. |
| `.dd-pagination__range` | “1–50 of 2,481”. Wrap the visible range in `<b>`. |
| `.dd-pagination__size + __select` | Label and native select for rows per page; the wrapper adds the chevron. |
| `.dd-pagination--compact` | Range and arrows only. |
| `.dd-pagination--spread` | Space-between, for a footer with two groups. |
| `.dd-pagination__end` | Pushes a group to the far edge. |

## Behaviour

For pages that change in the browser, add `data-dd-pagination` to the pager, or to a wrapper that also holds the page-size select. The script keeps every part in step.

| class / attribute | what it does |
|---|---|
| `data-page` | The current page, from 1. Kept up to date. |
| `data-pages` | How many pages, when you don’t know the item count. |
| `data-total + data-page-size` | Item count and page size; pages and the range (“151–200 of 2,481”) follow. A `.dd-pagination__size` select inside sets the size. |
| `Pages and arrows` | Clicking a page or an arrow moves there. The numbers redraw around the current page (never more than seven slots), `aria-current="page"` moves, and the arrows take `aria-disabled="true"` at either end. The first `__step` goes back, the last goes forward. |
| `Page size` | Changing the select keeps the first visible row on screen. |
| `Keyboard` | Tab to a page or arrow, Enter or Space to go. Focus stays on the page you chose, and on an arrow even when it disables. |
| `dd:pagechange` | Bubbles after a user changes page or size: `{ page, pages, pageSize, total, from, to }`. Fetch the page here. |
| `dd.pagination(el, { page, pages, total, pageSize })` | Sets state from script (no event) and returns it. The data table uses it to page its rows. |

## Guidelines

Do:
- Use links (`<a href>`) when pages have URLs so they can be shared and opened in new tabs.
- Keep the control in the same place on every page, usually the table footer.
- Show the total when you know it: “1–50 of 2,481”.

Don't:
- Don’t show more than seven page slots; collapse with gaps.
- Don’t hide the arrows on the first or last page; disable them.
- Don’t paginate under ~50 rows; let the list scroll.

