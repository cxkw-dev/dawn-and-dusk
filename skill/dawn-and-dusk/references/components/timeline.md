# timeline — `timeline`

An activity feed or audit log, grouped by day. Who did what to which thing, and when — with room for a commit, a diff or a comment underneath.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/timeline

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Activity feed

Avatars for people, tonal icons for system events. Times are mono; detail sits in an inset block.

```html
<div class="dd-timeline" style="max-width: 640px">
  <section class="dd-timeline__group">
    <h3 class="dd-timeline__day">Today <time class="dd-timeline__date" datetime="2026-10-30">Oct 30</time></h3>
    <ol class="dd-timeline__list">
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text">Deploy <code>dpl_7Hq2xK9mW4</code> passed health checks in <b>us-east-1</b></p>
          <time class="dd-timeline__time" datetime="2026-10-30T09:43">09:43</time>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-3)" role="img" aria-label="Andy">AN</span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Andy</b> deployed <a href="#">dawn-and-dusk</a> to <code>production</code></p>
          <time class="dd-timeline__time" datetime="2026-10-30T09:41">09:41</time>
          <div class="dd-timeline__detail"><p><span class="dd-mono">a41f9c2</span> fix(table): sticky header in dusk</p><p class="dd-timeline__diff">4 files · <span class="dd-timeline__add">+128</span> <span class="dd-timeline__del">−42</span></p></div>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-danger"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>notify-fanout</b> went down in <b>eu-west-2</b></p>
          <time class="dd-timeline__time" datetime="2026-10-30T09:39">09:39</time>
          <div class="dd-timeline__detail"><p>Health check failed 3 times: <code>connection refused :8080</code></p></div>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-6)" role="img" aria-label="Mira K.">MK</span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Mira K.</b> commented on <a href="#">#214 Data table density</a></p>
          <time class="dd-timeline__time" datetime="2026-10-30T08:12">08:12</time>
          <div class="dd-timeline__detail"><p>Compact rows feel right for the services list. Can we keep row numbers off by default?</p></div>
        </div>
      </li>
    </ol>
  </section>
  <section class="dd-timeline__group">
    <h3 class="dd-timeline__day">Yesterday <time class="dd-timeline__date" datetime="2026-10-29">Oct 29</time></h3>
    <ol class="dd-timeline__list">
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--warn"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-alert"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>search-indexer</b> degraded — p95 at <span class="dd-mono">611 ms</span></p>
          <time class="dd-timeline__time" datetime="2026-10-29T18:20">18:20</time>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-1)" role="img" aria-label="Ravi L.">RL</span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Ravi L.</b> rotated API key <code>key_live_8f2c41</code></p>
          <time class="dd-timeline__time" datetime="2026-10-29T16:05">16:05</time>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--info"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-tag"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text">Released <a href="#">dockey-ui v2.4.0</a></p>
          <time class="dd-timeline__time" datetime="2026-10-29T11:30">11:30</time>
        </div>
      </li>
    </ol>
  </section>
  <section class="dd-timeline__group">
    <h3 class="dd-timeline__day">Tuesday <time class="dd-timeline__date" datetime="2026-10-28">Oct 28</time></h3>
    <ol class="dd-timeline__list">
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-3)" role="img" aria-label="Andy">AN</span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Andy</b> invited <b>mira@cxkw.dev</b> to <a href="#">cxkw.dev</a> as Maintainer</p>
          <time class="dd-timeline__time" datetime="2026-10-28T14:52">14:52</time>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-box"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text">Created project <a href="#">leetnode</a> from template</p>
          <time class="dd-timeline__time" datetime="2026-10-28T10:03">10:03</time>
        </div>
      </li>
    </ol>
  </section>
</div>
```

## Without day groups

Put a `__list` straight inside `.dd-timeline` when there is only one day — a deploy’s event history, for example.

```html
<div class="dd-timeline" style="max-width: 420px">
  <ol class="dd-timeline__list">
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Build</b> finished</p>
          <time class="dd-timeline__time" datetime="2026-10-30T09:40">09:40</time>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Tests</b> passed — 412 of 412</p>
          <time class="dd-timeline__time" datetime="2026-10-30T09:41">09:41</time>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker dd-timeline__marker--accent"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-upload"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Deploy</b> to us-east-1 in progress</p>
          <time class="dd-timeline__time" datetime="2026-10-30T09:41">09:41</time>
        </div>
      </li>
      <li class="dd-timeline__item">
        <span class="dd-timeline__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-clock"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>Verify</b> queued</p>
          <span class="dd-timeline__time" aria-hidden="true">—</span>
        </div>
      </li>
  </ol>
</div>
```

## Audit log

`--audit` packs each event onto one line: a mono time column, a small marker, the sentence and the source (IP, client). Rows wrap instead of truncating in narrow containers.

```html
<div class="dd-timeline dd-timeline--audit">
  <section class="dd-timeline__group">
    <h3 class="dd-timeline__day">Today <time class="dd-timeline__date" datetime="2026-10-30">Oct 30</time></h3>
    <ol class="dd-timeline__list">
      <li class="dd-timeline__item">
        <time class="dd-timeline__time" datetime="2026-10-30T09:41:07Z">09:41:07</time>
        <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-3)" role="img" aria-label="Andy">AN</span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>andy@cxkw.dev</b> deployed <code>dawn-and-dusk</code> to production</p>
          <span class="dd-timeline__meta">203.0.113.24</span>
        </div>
      </li>
      <li class="dd-timeline__item">
        <time class="dd-timeline__time" datetime="2026-10-30T09:38:52Z">09:38:52</time>
        <span class="dd-timeline__marker dd-timeline__marker--info"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-bolt"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>ci-bot</b> triggered build <code>#1284</code> on main</p>
          <span class="dd-timeline__meta">github-actions</span>
        </div>
      </li>
      <li class="dd-timeline__item">
        <time class="dd-timeline__time" datetime="2026-10-30T09:12:30Z">09:12:30</time>
        <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-6)" role="img" aria-label="Mira K.">MK</span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>mira@cxkw.dev</b> changed role of <b>ravi@cxkw.dev</b> to Admin</p>
          <span class="dd-timeline__meta">198.51.100.7</span>
        </div>
      </li>
      <li class="dd-timeline__item">
        <time class="dd-timeline__time" datetime="2026-10-30T08:55:01Z">08:55:01</time>
        <span class="dd-timeline__marker dd-timeline__marker--avatar" style="--dd-color: var(--dd-set-1)" role="img" aria-label="Ravi L.">RL</span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>ravi@cxkw.dev</b> rotated key <code>key_live_8f2c41</code></p>
          <span class="dd-timeline__meta">192.0.2.44</span>
        </div>
      </li>
      <li class="dd-timeline__item">
        <time class="dd-timeline__time" datetime="2026-10-30T08:20:16Z">08:20:16</time>
        <span class="dd-timeline__marker dd-timeline__marker--bad"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-lock"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text">Failed sign-in for <b>andy@cxkw.dev</b> — wrong passkey</p>
          <span class="dd-timeline__meta">203.0.113.91</span>
        </div>
      </li>
    </ol>
  </section>
  <section class="dd-timeline__group">
    <h3 class="dd-timeline__day">Yesterday <time class="dd-timeline__date" datetime="2026-10-29">Oct 29</time></h3>
    <ol class="dd-timeline__list">
      <li class="dd-timeline__item">
        <time class="dd-timeline__time" datetime="2026-10-29T23:04:44Z">23:04:44</time>
        <span class="dd-timeline__marker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-settings"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>andy@cxkw.dev</b> updated env var <code>EDGE_CACHE_TTL</code> on edge-cache</p>
          <span class="dd-timeline__meta">203.0.113.24</span>
        </div>
      </li>
      <li class="dd-timeline__item">
        <time class="dd-timeline__time" datetime="2026-10-29T17:31:09Z">17:31:09</time>
        <span class="dd-timeline__marker dd-timeline__marker--warn"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-trash"/></svg></span>
        <div class="dd-timeline__body">
          <p class="dd-timeline__text"><b>mira@cxkw.dev</b> deleted 14 preview deployments of <code>insomnia</code></p>
          <span class="dd-timeline__meta">198.51.100.7</span>
        </div>
      </li>
    </ol>
  </section>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-timeline` | Wrapper for day groups, or for a single `__list`. A size container: below 440px the time drops under the sentence. |
| `.dd-timeline__group` | One day: a `__day` heading and a `__list`. |
| `.dd-timeline__day / __date` | Day heading (“Today”) with a mono date. |
| `.dd-timeline__list / __item` | The `<ol>` of events. A faint connector runs between markers. |
| `.dd-timeline__marker` | Icon in a neutral tonal circle. |
| `.dd-timeline__marker--avatar` | Initials (or an `<img>`) on `style="--dd-color: var(--dd-set-N)"`. |
| `.dd-timeline__marker--ok / --warn / --bad / --info / --accent` | Tonal icon markers for system events. |
| `.dd-timeline__body / __text` | The sentence: `<b>` actor, linked target, `<code>` refs. |
| `.dd-timeline__time` | Mono timestamp in a `<time datetime>`. |
| `.dd-timeline__meta` | Mono source detail (IP, client) — mostly for audit rows. |
| `.dd-timeline__detail` | Inset tonal block: commit message, error, quoted comment. |
| `.dd-timeline__diff / __add / __del` | Diff stats line: `+128 −42`. |
| `.dd-timeline--audit` | Compact single-line rows with a time column and hairlines. Put the `__time` first in each item, before the marker. |

## Guidelines

Do:
- Write events as sentences: actor, verb, target.
- Group by day and show the time of day; put the full timestamp in `datetime`.
- Use avatars for people and tonal icons for the system, so the two read apart.

Don't:
- Don’t colour the sentence — tone belongs to the marker.
- Don’t show relative times (“3 min ago”) in an audit log; use exact times.
- Don’t nest detail blocks or put tables inside them; link out instead.

