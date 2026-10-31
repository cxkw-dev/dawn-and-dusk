# code — `code`

Code blocks, inline code, copyable fields and a terminal. Mono throughout, tone instead of borders, and a copy button wherever someone will want the text.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/code

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

```
import { defineConfig } from 'astro/config';

// Docs for the design system, served from GitHub Pages.
export default defineConfig({
  site: 'https://cxkw-dev.github.io',
  base: '/dawn-and-dusk',
  srcDir: './site',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
```

```html
&#x3C;figure class="dd-code">
  &#x3C;figcaption class="dd-code__bar">
    &#x3C;span class="dd-code__title">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-file"/>&#x3C;/svg>astro.config.mjs&#x3C;/span>
    &#x3C;span class="dd-code__lang">js&#x3C;/span>
    &#x3C;button class="dd-code__copy" type="button" data-dd-copy-target="#code-astro" aria-label="Copy code">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-copy"/>&#x3C;/svg>&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-check"/>&#x3C;/svg>&#x3C;/button>
  &#x3C;/figcaption>
  &#x3C;pre class="dd-code__pre" tabindex="0">&#x3C;code id="code-astro">&#x3C;span class="dd-code__line">&#x3C;span class="dd-code__k">import&#x3C;/span> { defineConfig } &#x3C;span class="dd-code__k">from&#x3C;/span> &#x3C;span class="dd-code__s">'astro/config'&#x3C;/span>;&#x3C;/span>
&#x3C;span class="dd-code__line">&#x3C;/span>
&#x3C;span class="dd-code__line">&#x3C;span class="dd-code__c">// Docs for the design system, served from GitHub Pages.&#x3C;/span>&#x3C;/span>
&#x3C;span class="dd-code__line">&#x3C;span class="dd-code__k">export default&#x3C;/span> &#x3C;span class="dd-code__f">defineConfig&#x3C;/span>({&#x3C;/span>
&#x3C;span class="dd-code__line">  &#x3C;span class="dd-code__p">site&#x3C;/span>: &#x3C;span class="dd-code__s">'https://cxkw-dev.github.io'&#x3C;/span>,&#x3C;/span>
&#x3C;span class="dd-code__line">  &#x3C;span class="dd-code__p">base&#x3C;/span>: &#x3C;span class="dd-code__s">'/dawn-and-dusk'&#x3C;/span>,&#x3C;/span>
&#x3C;span class="dd-code__line">  &#x3C;span class="dd-code__p">srcDir&#x3C;/span>: &#x3C;span class="dd-code__s">'./site'&#x3C;/span>,&#x3C;/span>
&#x3C;span class="dd-code__line">  &#x3C;span class="dd-code__p">trailingSlash&#x3C;/span>: &#x3C;span class="dd-code__s">'ignore'&#x3C;/span>,&#x3C;/span>
&#x3C;span class="dd-code__line">  &#x3C;span class="dd-code__p">devToolbar&#x3C;/span>: { &#x3C;span class="dd-code__p">enabled&#x3C;/span>: &#x3C;span class="dd-code__n">false&#x3C;/span> },&#x3C;/span>
&#x3C;span class="dd-code__line">});&#x3C;/span>&#x3C;/code>&#x3C;/pre>
&#x3C;/figure>
```

## Line numbers & highlights

Add `dd-code--numbered` for a counter gutter (never copied). Mark lines with `is-highlight` to draw the eye to what changed or matters.

```
export async function withRetry&lt;T&gt;(run: () =&gt; Promise&lt;T&gt;, tries = 4) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await run();
    } catch (err) {
      if (attempt &gt;= tries || !isRetryable(err)) throw err;
      await sleep(2 ** attempt * 100); // 200, 400, 800 ms
    }
  }
}
```

```html
&#x3C;figure class="dd-code dd-code--numbered">
  &#x3C;figcaption class="dd-code__bar">
    &#x3C;span class="dd-code__title">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-file"/>&#x3C;/svg>services/auth-gateway/retry.ts&#x3C;/span>
    &#x3C;span class="dd-code__lang">ts&#x3C;/span>
    &#x3C;button class="dd-code__copy" type="button" data-dd-copy-target="#code-retry" aria-label="Copy code">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-copy"/>&#x3C;/svg>&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-check"/>&#x3C;/svg>&#x3C;/button>
  &#x3C;/figcaption>
  &#x3C;pre class="dd-code__pre" tabindex="0">&#x3C;code id="code-retry">&#x3C;span class="dd-code__line">&#x3C;span class="dd-code__k">export async function&#x3C;/span> &#x3C;span class="dd-code__f">withRetry&#x3C;/span>&#x26;lt;T&#x26;gt;(&#x3C;span class="dd-code__p">run&#x3C;/span>: () =&#x26;gt; Promise&#x26;lt;T&#x26;gt;, &#x3C;span class="dd-code__p">tries&#x3C;/span> = &#x3C;span class="dd-code__n">4&#x3C;/span>) {&#x3C;/span>
&#x3C;span class="dd-code__line">  &#x3C;span class="dd-code__k">for&#x3C;/span> (&#x3C;span class="dd-code__k">let&#x3C;/span> attempt = &#x3C;span class="dd-code__n">1&#x3C;/span>; ; attempt++) {&#x3C;/span>
&#x3C;span class="dd-code__line">    &#x3C;span class="dd-code__k">try&#x3C;/span> {&#x3C;/span>
&#x3C;span class="dd-code__line">      &#x3C;span class="dd-code__k">return await&#x3C;/span> &#x3C;span class="dd-code__f">run&#x3C;/span>();&#x3C;/span>
&#x3C;span class="dd-code__line">    } &#x3C;span class="dd-code__k">catch&#x3C;/span> (err) {&#x3C;/span>
&#x3C;span class="dd-code__line is-highlight">      &#x3C;span class="dd-code__k">if&#x3C;/span> (attempt &#x26;gt;= tries || !&#x3C;span class="dd-code__f">isRetryable&#x3C;/span>(err)) &#x3C;span class="dd-code__k">throw&#x3C;/span> err;&#x3C;/span>
&#x3C;span class="dd-code__line is-highlight">      &#x3C;span class="dd-code__k">await&#x3C;/span> &#x3C;span class="dd-code__f">sleep&#x3C;/span>(&#x3C;span class="dd-code__n">2&#x3C;/span> ** attempt * &#x3C;span class="dd-code__n">100&#x3C;/span>); &#x3C;span class="dd-code__c">// 200, 400, 800 ms&#x3C;/span>&#x3C;/span>
&#x3C;span class="dd-code__line">    }&#x3C;/span>
&#x3C;span class="dd-code__line">  }&#x3C;/span>
&#x3C;span class="dd-code__line">}&#x3C;/span>&#x3C;/code>&#x3C;/pre>
&#x3C;/figure>
```

## Diff

`dd-code--diff` adds a +/− gutter; mark lines `is-add` and `is-del`.

```
service: edge-cache
region: us-east-1
replicas: 3
replicas: 6
ttl: 300s
ttl: 120s
purge_on_deploy: true
```

```html
&#x3C;figure class="dd-code dd-code--diff">
  &#x3C;figcaption class="dd-code__bar">
    &#x3C;span class="dd-code__title">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-file"/>&#x3C;/svg>deploy/edge-cache.yaml&#x3C;/span>
    &#x3C;span class="dd-code__lang">yaml&#x3C;/span>
    &#x3C;button class="dd-code__copy" type="button" data-dd-copy-target="#code-diff" aria-label="Copy diff">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-copy"/>&#x3C;/svg>&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-check"/>&#x3C;/svg>&#x3C;/button>
  &#x3C;/figcaption>
  &#x3C;pre class="dd-code__pre" tabindex="0">&#x3C;code id="code-diff">&#x3C;span class="dd-code__line">&#x3C;span class="dd-code__p">service&#x3C;/span>: edge-cache&#x3C;/span>
&#x3C;span class="dd-code__line">&#x3C;span class="dd-code__p">region&#x3C;/span>: us-east-1&#x3C;/span>
&#x3C;span class="dd-code__line is-del">&#x3C;span class="dd-code__p">replicas&#x3C;/span>: &#x3C;span class="dd-code__n">3&#x3C;/span>&#x3C;/span>
&#x3C;span class="dd-code__line is-add">&#x3C;span class="dd-code__p">replicas&#x3C;/span>: &#x3C;span class="dd-code__n">6&#x3C;/span>&#x3C;/span>
&#x3C;span class="dd-code__line is-del">&#x3C;span class="dd-code__p">ttl&#x3C;/span>: &#x3C;span class="dd-code__s">300s&#x3C;/span>&#x3C;/span>
&#x3C;span class="dd-code__line is-add">&#x3C;span class="dd-code__p">ttl&#x3C;/span>: &#x3C;span class="dd-code__s">120s&#x3C;/span>&#x3C;/span>
&#x3C;span class="dd-code__line">&#x3C;span class="dd-code__p">purge_on_deploy&#x3C;/span>: &#x3C;span class="dd-code__n">true&#x3C;/span>&#x3C;/span>&#x3C;/code>&#x3C;/pre>
&#x3C;/figure>
```

## Without a bar

For one-line commands, drop the bar; the copy button floats in the corner.

```html
<div class="dd-code">
  <button class="dd-code__copy" type="button" data-dd-copy-target="#code-bare" aria-label="Copy command"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  <pre class="dd-code__pre" tabindex="0"><code id="code-bare">npm install @cxkw/dawn-and-dusk</code></pre>
</div>
```

## Inline code

```html
<p class="dd-text dd-small" style="max-width: 56ch">
  Set <code class="dd-code-inline">data-theme="dusk"</code> on <code class="dd-code-inline">&lt;html&gt;</code> to switch the whole page,
  or on any element to scope it. Tokens live in <code class="dd-code-inline">ds/tokens.css</code>; run
  <code class="dd-code-inline">node scripts/build-ds.mjs</code> after adding a component.
</p>
```

## Copyable field

A single value someone needs to copy: API keys, webhook URLs, IDs. Secrets stay masked until revealed, and copy always copies the real value.

Try it: press the eye to reveal the key and again to mask it; copy gives you the real key either way.

```html
<div class="dd-stack" style="max-width: 520px">
  <div class="dd-code-field">
    <span class="dd-code-field__label" id="key-label">Secret key</span>
    <div class="dd-code-field__box" role="group" aria-labelledby="key-label">
      <code class="dd-code-field__value" data-dd-code-secret="dd_live_51Hc7aQ2xK9mV0dRb4Lp8TzY3f9a">dd_live_••••••••••••••••••••3f9a</code>
      <button class="dd-code-field__btn" type="button" data-dd-code-reveal data-dd-code-reveal-label="Show key|Hide key" aria-pressed="false" aria-label="Show key"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-eye-off"/></svg></button>
      <button class="dd-code-field__btn" type="button" data-dd-copy="dd_live_51Hc7aQ2xK9mV0dRb4Lp8TzY3f9a" aria-label="Copy key"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    </div>
    <p class="dd-code-field__hint">billing-worker · created Oct 12 · last used 4 min ago from eu-west-2</p>
  </div>
  <div class="dd-code-field">
    <span class="dd-code-field__label" id="hook-label">Webhook URL</span>
    <div class="dd-code-field__box" role="group" aria-labelledby="hook-label">
      <span class="dd-code-field__prefix">POST</span>
      <code class="dd-code-field__value">https://hooks.cxkw.dev/v1/deploys/dockey-ui/9f2c41e7</code>
      <button class="dd-code-field__btn" type="button" data-dd-copy="https://hooks.cxkw.dev/v1/deploys/dockey-ui/9f2c41e7" aria-label="Copy URL"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
    </div>
  </div>
</div>
```

## Terminal

Always dark. Set `data-theme="dusk"` on the block so it reads dusk tokens in either mode. Prompts are not selectable, and the copy button copies just the command (`data-dd-copy`), never the output.

```
$ npm run deploy -- --region eu-west-2
› building insomnia@2.4.0 (vite)
› 214 modules transformed in 1.82s
› uploading 38 assets to edge-cache
✓ deployed dpl_7Hq2 to eu-west-2 in 41s
$ 
```

```html
&#x3C;figure class="dd-code dd-code--terminal" data-theme="dusk">
  &#x3C;figcaption class="dd-code__bar">
    &#x3C;span class="dd-code__dots" aria-hidden="true">&#x3C;i>&#x3C;/i>&#x3C;i>&#x3C;/i>&#x3C;i>&#x3C;/i>&#x3C;/span>
    &#x3C;span class="dd-code__title">~/cxkw/insomnia — zsh&#x3C;/span>
    &#x3C;button class="dd-code__copy" type="button" data-dd-copy="npm run deploy -- --region eu-west-2" aria-label="Copy command">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-copy"/>&#x3C;/svg>&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-check"/>&#x3C;/svg>&#x3C;/button>
  &#x3C;/figcaption>
  &#x3C;pre class="dd-code__pre" tabindex="0">&#x3C;code>&#x3C;span class="dd-code__prompt">$ &#x3C;/span>npm run deploy -- --region eu-west-2
&#x3C;span class="dd-code__out">› building insomnia@2.4.0 (vite)&#x3C;/span>
&#x3C;span class="dd-code__out">› 214 modules transformed in 1.82s&#x3C;/span>
&#x3C;span class="dd-code__out">› uploading 38 assets to edge-cache&#x3C;/span>
&#x3C;span class="dd-code__ok">✓ deployed dpl_7Hq2 to eu-west-2 in 41s&#x3C;/span>
&#x3C;span class="dd-code__prompt">$ &#x3C;/span>&#x3C;span class="dd-code__cursor">&#x3C;/span>&#x3C;/code>&#x3C;/pre>
&#x3C;/figure>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-code` | Code block container (`<figure>`). Tonal surface, rounded. |
| `.dd-code__bar` | Title bar (`<figcaption>`): title, language tag, copy button. |
| `.dd-code__title / __lang` | File name (mono, with an icon) and a small uppercase language tag. |
| `.dd-code__copy` | Icon button; pair with `data-dd-copy-target="#id"`. Holds `copy` + `check` icons; swaps on `[data-copied]`. |
| `.dd-code__pre` | Scrolling `<pre>`. Set `--dd-code-height` to cap its height. |
| `.dd-code__line` | One line. Separate lines with literal newlines, not block elements. |
| `.is-highlight / .is-add / .is-del` | Line states: highlighted, added, removed. |
| `.dd-code--numbered` | Line-number gutter (CSS counter, not copied). |
| `.dd-code--diff` | +/− gutter for diffs. |
| `.dd-code__k / __s / __n / __c / __f / __p` | Syntax tokens: keyword, string, number, comment, function, property. Prism (`.token.*`) and highlight.js (`.hljs-*`) classes map to the same colours. |
| `--dd-code-keyword … --dd-code-punct` | Override the token colours on `.dd-code`. |
| `.dd-code-inline` | Inline code in running text. |
| `.dd-code-field` | Copyable value: `__label`, `__box`, `__prefix`, `__value`, `__btn`, `__hint`. |
| `.dd-code--terminal` | Dark terminal; use with `data-theme="dusk"`. Parts: `__dots`, `__prompt`, `__out`, `__ok`, `__err`, `__cursor`. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-copy-target="#id"` | Copies the text of the element with that id (the `<code>`). From `copy.js`; the button gets `[data-copied]` for 1.6s. |
| `data-dd-copy="text"` | Copies the given text — use it for secrets so the masked value is never copied. |
| `data-dd-code-secret="…"` | On the field value: the real secret. The visible text is the masked form. |
| `data-dd-code-reveal` | On a button inside `.dd-code-field`: toggles masked ↔ secret and `aria-pressed`. Holds `eye` + `eye-off` icons. |
| `data-dd-code-reveal-label="Show|Hide"` | Optional accessible labels for the two states. |

Copy and reveal are plain buttons: Tab to focus, Enter or Space to activate. The `<pre>` takes `tabindex="0"` so long lines can be scrolled from the keyboard.

## Guidelines

Do:
- Name the file in the bar when the snippet belongs somewhere.
- Highlight the one or two lines the reader should look at.
- Mask secrets by default and copy the real value.
- Keep prompts (`$`) out of the copied text.

Don't:
- Don’t wrap code lines in block elements inside `<pre>` — copy gets blank lines.
- Don’t use a terminal block for source files; it is for commands and output.
- Don’t colour whole lines to show syntax — tokens only.
