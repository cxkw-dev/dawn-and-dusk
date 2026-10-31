# breadcrumbs — `breadcrumbs`

Where you are and how you got there. Muted links divided by faint slashes; the current page is in ink and is not a link.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/breadcrumbs

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Default

```html
<nav class="dd-breadcrumbs" aria-label="Breadcrumb">
  <ol class="dd-breadcrumbs__list">
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>cxkw</span></a></li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>services</span></a></li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>auth-gateway</span></a></li>
  </ol>
</nav>
```

## With icons and IDs

An icon on the root or a typed object helps scanning. Set IDs and hashes in mono with `dd-mono` on the link.

```html
<nav class="dd-breadcrumbs" aria-label="Breadcrumb">
  <ol class="dd-breadcrumbs__list">
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-home"/></svg><span>Home</span></a></li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg><span>dawn-and-dusk</span></a></li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>Deploys</span></a></li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link dd-mono" aria-current="page"><span>dpl_8f3a2c</span></a></li>
  </ol>
</nav>
```

## Overflow

For deep trails, keep the root and the last two levels and fold the rest into “…”. It opens a small menu of the skipped levels.

Try it: click “…”, or Tab to it and press ↓, then ↑ ↓ through the levels; Esc or a click outside closes it.

```html
<nav class="dd-breadcrumbs" aria-label="Breadcrumb">
  <ol class="dd-breadcrumbs__list">
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-home"/></svg><span>cxkw</span></a></li>
    <li class="dd-breadcrumbs__item">
      <details class="dd-breadcrumbs__more" data-dd-autoclose>
        <summary aria-label="Show 3 hidden levels">…</summary>
        <ul class="dd-breadcrumbs__menu">
          <li><a class="dd-breadcrumbs__menu-link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg>infrastructure</a></li>
          <li><a class="dd-breadcrumbs__menu-link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg>production</a></li>
          <li><a class="dd-breadcrumbs__menu-link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg>eu-central</a></li>
        </ul>
      </details>
    </li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>edge-cache</span></a></li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>Purge rules</span></a></li>
  </ol>
</nav>
```

### Overflow, open

The same menu shown open for reference — it is live too, and closes like the one above.

```html
<nav class="dd-breadcrumbs" aria-label="Breadcrumb">
  <ol class="dd-breadcrumbs__list">
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-home"/></svg><span>cxkw</span></a></li>
    <li class="dd-breadcrumbs__item">
      <details class="dd-breadcrumbs__more" data-dd-autoclose open>
        <summary aria-label="Show 3 hidden levels">…</summary>
        <ul class="dd-breadcrumbs__menu">
          <li><a class="dd-breadcrumbs__menu-link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg>infrastructure</a></li>
          <li><a class="dd-breadcrumbs__menu-link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-folder"/></svg>production</a></li>
          <li><a class="dd-breadcrumbs__menu-link" href="#"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg>eu-central</a></li>
        </ul>
      </details>
    </li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>edge-cache</span></a></li>
    <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>Purge rules</span></a></li>
  </ol>
</nav>
```

## Long labels and small

Each crumb truncates with an ellipsis at about 24 characters (`24ch`). Screen readers still get the full text; add a `title` if sighted users need it too. The small size fits inside a top bar.

```html
<div class="dd-stack" style="--dd-gap: 20px">
  <nav class="dd-breadcrumbs" aria-label="Breadcrumb">
    <ol class="dd-breadcrumbs__list">
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>cxkw</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>billing-worker</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>Jobs</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>reconcile-stripe-invoices-for-annual-plans-eu</span></a></li>
    </ol>
  </nav>
  <nav class="dd-breadcrumbs dd-breadcrumbs--sm" aria-label="Breadcrumb">
    <ol class="dd-breadcrumbs__list">
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>cxkw</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>leetnode</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" href="#"><span>Settings</span></a></li>
      <li class="dd-breadcrumbs__item"><a class="dd-breadcrumbs__link" aria-current="page"><span>Environment variables</span></a></li>
    </ol>
  </nav>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-breadcrumbs` | The `<nav aria-label="Breadcrumb">`. |
| `__list / __item` | The `<ol>` and its items. Separators are drawn between items. |
| `__link` | A crumb. The last one gets `aria-current="page"` and no `href`. Wrap text in a `<span>` so it truncates. |
| `__more / __menu / __menu-link` | The “…” overflow: a `<details data-dd-autoclose>` with a list of links. |
| `.dd-breadcrumbs--sm` | Extra-small text for top bars and dense headers. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-autoclose` | On the overflow `<details>`: closes on a click outside, after choosing a level, or when another dropdown opens. |
| `↓ / ↑` | Open the menu from the “…” and move between levels. |
| `Esc` | Close the menu; focus returns to “…”. |

## Guidelines

Do:
- Show breadcrumbs from the second level down; the top level has nowhere to go back to.
- Use the same names as the side nav and page titles.
- Fold the middle, never the root or the parent.

Don't:
- Don’t make the current page a link.
- Don’t use breadcrumbs as the only navigation.
- Don’t put actions in the trail.

