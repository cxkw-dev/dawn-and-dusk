# card — `card`

A container for one thing — a project, a service, a stat. Cards lift off the page by tone alone, with no border or shadow, and interactive cards lift a tone toward ink on hover.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/card

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Default

Eyebrow, lockup title, a line of text and a footer with meta and a link. On a static card only the link reacts: it underlines and its arrow nudges.

```html
<article class="dd-card" style="max-width: 360px">
  <div class="dd-card__body">
    <p class="dd-card__eyebrow"><span>Case study</span><span>·</span><span class="dd-mono">dawn-and-dusk</span></p>
    <h3 class="dd-card__title">Two moods, one system</h3>
    <p class="dd-card__text">Tokens, components and an agent skill that switch between dawn and dusk without a single hard-coded colour.</p>
    <div class="dd-card__foot">
      <span class="dd-card__meta">6 min read</span>
      <a class="dd-card__link" href="#">Read <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a>
    </div>
  </div>
</article>
```

## Interactive

When the whole card goes somewhere, make the card the link: an `<a class="dd-card dd-card--link">`, or keep the card an `<article>` and give its title a `.dd-card__stretch` link that covers the card. Hover lifts the card toward ink and nudges the arrow; keyboard focus draws the ring. On dusk’s grain page, which reads lighter than the cards, the lift is larger, so a hovered card always stands clear of the page.

Try it: hover a card, click anywhere on it, or Tab through — each card is one stop. The middle card is pinned in its hover state for reference.

```html
<div class="dd-card-grid">
  <a class="dd-card dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-code"/></svg><span>Open source</span></p>
      <h3 class="dd-card__title">dockey-ui</h3>
      <p class="dd-card__text">A native companion for the local Docker engine — containers, logs and volumes at a glance.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">Swift · macOS</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </a>
  <a class="dd-card dd-card--link is-hover" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bolt"/></svg><span>Hover state</span></p>
      <h3 class="dd-card__title">insomnia</h3>
      <p class="dd-card__text">A sleep journal that reads like a ship’s log. Shown here with its hover state forced on.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">TypeScript · web</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </a>
  <article class="dd-card dd-card--link">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg><span>Stretched link</span></p>
      <h3 class="dd-card__title"><a class="dd-card__stretch" href="#">ai-focus</a></h3>
      <p class="dd-card__text">Todos, notes and standups that an agent can read and write. The title link covers the whole card.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">Updated 2h ago</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </article>
</div>
```

A stretched-link card can still hold its own controls: buttons and links inside it sit above the link’s hit area and keep their own click.

Try it: click the card to follow its link; the bookmark saves without opening it.

```html
<article class="dd-card dd-card--link" style="max-width: 360px">
  <div class="dd-card__body">
    <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg><span class="dd-mono">billing-worker</span></p>
    <h3 class="dd-card__title"><a class="dd-card__stretch" href="#">Replay failed invoices</a></h3>
    <p class="dd-card__text">Re-run every charge that failed in the last 24 hours, oldest first.</p>
    <div class="dd-card__foot">
      <span class="dd-card__meta">Runbook · 6 steps</span>
      <button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Save runbook" data-dd-toast="Runbook saved" data-dd-toast-description="Replay failed invoices is in your saved list."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bookmark"/></svg></button>
    </div>
  </div>
</article>
```

## With media

A tonal cover (or an `<img class="dd-card__media">`) sits on top. `--inset-media` pulls it in with its own rounded corners.

```html
<div class="dd-card-grid" style="max-width: 600px">
  <article class="dd-card dd-card--link">
    <div class="dd-card__media" role="img" aria-label="Tonal cover"></div>
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><span>Photo essay</span></p>
      <h3 class="dd-card__title"><a class="dd-card__stretch" href="#">Blue hour, Hanoi</a></h3>
      <p class="dd-card__text">Twelve frames between dusk and dark.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">12 photos</span><span class="dd-card__link">View <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </article>
  <article class="dd-card dd-card--link dd-card--inset-media">
    <div class="dd-card__media dd-card__media--warm" role="img" aria-label="Warm cover"></div>
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><span>Release</span><span class="dd-mono">v0.1</span></p>
      <h3 class="dd-card__title"><a class="dd-card__stretch" href="#">dawn &amp; dusk ships</a></h3>
      <p class="dd-card__text">The first public cut: tokens, nearly sixty components and the docs you are reading.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">Oct 30</span><span class="dd-card__link">Changelog <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </article>
</div>
```

## Stat

A display figure, its label and a delta. Units go in a `<small>`; deltas say which way is good with `is-up` / `is-down`.

```html
<div class="dd-card-grid">
  <article class="dd-card dd-card--stat">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span>Deploys · 30 days</span></p>
      <p class="dd-card__stat dd-num">1,284</p>
      <p class="dd-card__label">across 6 services</p>
      <div class="dd-card__foot"><span class="dd-card__delta is-up"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg>+12.4%</span><span class="dd-card__meta">vs. September</span></div>
    </div>
  </article>
  <article class="dd-card dd-card--stat">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg><span>p95 latency · auth-gateway</span></p>
      <p class="dd-card__stat dd-num">182<small>ms</small></p>
      <p class="dd-card__label">eu-west-1, last hour</p>
      <div class="dd-card__foot"><span class="dd-card__delta is-down"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-up"/></svg>+38ms</span><span class="dd-card__meta">above budget</span></div>
    </div>
  </article>
  <article class="dd-card dd-card--stat">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-database"/></svg><span>Cache hit rate · edge-cache</span></p>
      <p class="dd-card__stat dd-num">97.2<small>%</small></p>
      <p class="dd-card__label">4.1M requests today</p>
      <div class="dd-card__foot"><span class="dd-card__delta"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-minus"/></svg>0.0%</span><span class="dd-card__meta">steady</span></div>
    </div>
  </article>
</div>
```

## Horizontal

Media beside the body for lists of notes and links. It stacks by itself once the card is narrower than about 300px.

```html
<div class="dd-stack" style="max-width: 560px">
  <article class="dd-card dd-card--row dd-card--link">
    <div class="dd-card__media" role="img" aria-label="Tonal cover"></div>
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><span>Note</span><span>·</span><span>3 min</span></p>
      <h3 class="dd-card__title"><a class="dd-card__stretch" href="#">On quiet software</a></h3>
      <p class="dd-card__text">Why the best tools disappear into the work — and what that means for a design system that wants to be noticed only when it helps.</p>
    </div>
  </article>
  <article class="dd-card dd-card--row dd-card--inset-media">
    <div class="dd-card__media dd-card__media--warm" role="img" aria-label="Warm cover"></div>
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><span class="dd-mono">leetnode</span></p>
      <h3 class="dd-card__title">Graph drills, daily</h3>
      <p class="dd-card__text">One problem a morning, spaced out by how badly you fumbled it last time.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">142 solved</span><a class="dd-card__link" href="#">Practice <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></a></div>
    </div>
  </article>
</div>
```

## Compact

Less padding, a smaller title, no body text — for runbooks, shortcuts and dense grids.

```html
<div class="dd-card-grid">
  <a class="dd-card dd-card--compact dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-mono">auth-gateway</span></p>
      <h3 class="dd-card__title">Rotate signing keys</h3>
      <div class="dd-card__foot"><span class="dd-card__meta">Runbook · 4 steps</span></div>
    </div>
  </a>
  <a class="dd-card dd-card--compact dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-mono">billing-worker</span></p>
      <h3 class="dd-card__title">Replay failed invoices</h3>
      <div class="dd-card__foot"><span class="dd-card__meta">Runbook · 6 steps</span></div>
    </div>
  </a>
  <a class="dd-card dd-card--compact dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-globe"/></svg><span class="dd-mono">edge-cache</span></p>
      <h3 class="dd-card__title">Purge a region</h3>
      <div class="dd-card__foot"><span class="dd-card__meta">Runbook · 2 steps</span></div>
    </div>
  </a>
</div>
```

## Card grid

`.dd-card-grid` fills the row with cards at least 220px wide and collapses to one column on phones. Cards in a row share a height.

```html
<div class="dd-card-grid">
  <a class="dd-card dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-layers"/></svg><span>Design system</span></p>
      <h3 class="dd-card__title">dawn-and-dusk</h3>
      <p class="dd-card__text">Tokens, components and docs for every cxkw.dev surface.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">24 versions</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </a>
  <a class="dd-card dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-box"/></svg><span>macOS app</span></p>
      <h3 class="dd-card__title">dockey-ui</h3>
      <p class="dd-card__text">The local Docker engine, without the terminal.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">Swift</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </a>
  <a class="dd-card dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg><span>Web app</span></p>
      <h3 class="dd-card__title">insomnia</h3>
      <p class="dd-card__text">A sleep journal with charts that stay out of the way.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">TypeScript</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </a>
  <a class="dd-card dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg><span>Agent tools</span></p>
      <h3 class="dd-card__title">ai-focus</h3>
      <p class="dd-card__text">Todos and notes an agent can read and write over MCP.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">Python</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </a>
  <a class="dd-card dd-card--link" href="#">
    <div class="dd-card__body">
      <p class="dd-card__eyebrow"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-graph"/></svg><span>Practice</span></p>
      <h3 class="dd-card__title">leetnode</h3>
      <p class="dd-card__text">Spaced-repetition drills for graph problems.</p>
      <div class="dd-card__foot"><span class="dd-card__meta">Go</span><span class="dd-card__link">Open <svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-right"/></svg></span></div>
    </div>
  </a>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-card` | The container: `--dd-surface` on the page, `--dd-r-box` corners, no border or shadow. |
| `.dd-card__body` | Padded column holding the content. |
| `.dd-card__eyebrow` | Small muted line above the title; takes an icon. |
| `.dd-card__title` | Lockup heading (lowercase, 800). |
| `.dd-card__text` | Muted body copy. |
| `.dd-card__foot` | Bottom row, pushed to the end: `.dd-card__meta` and `.dd-card__link` (as an `<a>` it underlines on hover; its arrow nudges with the card or the link). |
| `.dd-card__media` | Cover panel or image. `.dd-card__media--warm` for the Golden hour gradient. |
| `.dd-card--link` | Interactive card: lifts toward ink on hover and focus (`--dd-card-hover`). |
| `.dd-card--link.is-hover` | Pins the hover tone on, for previews and docs. |
| `--dd-card-hover` | The hover tone: 6% toward ink in dawn, 14% on dusk’s grain page. `.dd-app-shell` (a plain page, no grain) uses 6% in both. Set it yourself if cards sit on another surface. |
| `.dd-card__stretch` | A link whose hit area covers the whole card. Other buttons and links in the card stay clickable above it. |
| `.dd-card--inset-media` | Media inset with its own corners. |
| `.dd-card--stat` | With `.dd-card__stat`, `.dd-card__label`, `.dd-card__delta` (`is-up` / `is-down`). |
| `.dd-card--row` | Media beside the body; wraps to stacked when narrow. Body text clamps to two lines. |
| `.dd-card--compact` | Tighter padding, smaller title, hides body text. |
| `.dd-card-grid` | Responsive auto-fill grid of cards (min 220px). |

## Guidelines

Do:
- Let tone do the lifting: a card on `--dd-bg`, nothing else.
- Make the whole card one link when it goes one place; use `.dd-card__stretch` to keep the title as the accessible name.
- Put numbers in stat cards in tabular figures and say what “good” looks like with the delta colour.

Don't:
- Don’t add borders or drop shadows to cards.
- Don’t nest cards inside cards — use a divider or an inset `--dd-surface-2` block.
- Don’t put two competing links in an interactive card.

