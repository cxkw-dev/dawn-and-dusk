# code — `code`

Code blocks, inline code, copyable fields and a terminal. Mono throughout, tone instead of borders, and a copy button wherever someone will want the text.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/code

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Code block

A title bar names the file and language; the copy button copies the code exactly (line spans are separated by real newlines). Try it: press copy — the icon turns into a check for a moment.

```html
<figure class="dd-code">
  <figcaption class="dd-code__bar">
    <span class="dd-code__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg>astro.config.mjs</span>
    <span class="dd-code__lang">js</span>
    <button class="dd-code__copy" type="button" data-dd-copy-target="#code-astro" aria-label="Copy code"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  </figcaption>
  <pre class="dd-code__pre" tabindex="0"><code id="code-astro"><span class="dd-code__line"><span class="dd-code__k">import</span> { defineConfig } <span class="dd-code__k">from</span> <span class="dd-code__s">'astro/config'</span>;</span>
<span class="dd-code__line"></span>
<span class="dd-code__line"><span class="dd-code__c">// Docs for the design system, served from GitHub Pages.</span></span>
<span class="dd-code__line"><span class="dd-code__k">export default</span> <span class="dd-code__f">defineConfig</span>({</span>
<span class="dd-code__line">  <span class="dd-code__p">site</span>: <span class="dd-code__s">'https://cxkw-dev.github.io'</span>,</span>
<span class="dd-code__line">  <span class="dd-code__p">base</span>: <span class="dd-code__s">'/dawn-and-dusk'</span>,</span>
<span class="dd-code__line">  <span class="dd-code__p">srcDir</span>: <span class="dd-code__s">'./site'</span>,</span>
<span class="dd-code__line">  <span class="dd-code__p">trailingSlash</span>: <span class="dd-code__s">'ignore'</span>,</span>
<span class="dd-code__line">  <span class="dd-code__p">devToolbar</span>: { <span class="dd-code__p">enabled</span>: <span class="dd-code__n">false</span> },</span>
<span class="dd-code__line">});</span></code></pre>
</figure>
```

## Line numbers & highlights

Add `dd-code--numbered` for a counter gutter (never copied). Mark lines with `is-highlight` to draw the eye to what changed or matters.

```html
<figure class="dd-code dd-code--numbered">
  <figcaption class="dd-code__bar">
    <span class="dd-code__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg>services/auth-gateway/retry.ts</span>
    <span class="dd-code__lang">ts</span>
    <button class="dd-code__copy" type="button" data-dd-copy-target="#code-retry" aria-label="Copy code"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  </figcaption>
  <pre class="dd-code__pre" tabindex="0"><code id="code-retry"><span class="dd-code__line"><span class="dd-code__k">export async function</span> <span class="dd-code__f">withRetry</span>&lt;T&gt;(<span class="dd-code__p">run</span>: () =&gt; Promise&lt;T&gt;, <span class="dd-code__p">tries</span> = <span class="dd-code__n">4</span>) {</span>
<span class="dd-code__line">  <span class="dd-code__k">for</span> (<span class="dd-code__k">let</span> attempt = <span class="dd-code__n">1</span>; ; attempt++) {</span>
<span class="dd-code__line">    <span class="dd-code__k">try</span> {</span>
<span class="dd-code__line">      <span class="dd-code__k">return await</span> <span class="dd-code__f">run</span>();</span>
<span class="dd-code__line">    } <span class="dd-code__k">catch</span> (err) {</span>
<span class="dd-code__line is-highlight">      <span class="dd-code__k">if</span> (attempt &gt;= tries || !<span class="dd-code__f">isRetryable</span>(err)) <span class="dd-code__k">throw</span> err;</span>
<span class="dd-code__line is-highlight">      <span class="dd-code__k">await</span> <span class="dd-code__f">sleep</span>(<span class="dd-code__n">2</span> ** attempt * <span class="dd-code__n">100</span>); <span class="dd-code__c">// 200, 400, 800 ms</span></span>
<span class="dd-code__line">    }</span>
<span class="dd-code__line">  }</span>
<span class="dd-code__line">}</span></code></pre>
</figure>
```

## Diff

`dd-code--diff` adds a +/− gutter; mark lines `is-add` and `is-del`.

```html
<figure class="dd-code dd-code--diff">
  <figcaption class="dd-code__bar">
    <span class="dd-code__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-file"/></svg>deploy/edge-cache.yaml</span>
    <span class="dd-code__lang">yaml</span>
    <button class="dd-code__copy" type="button" data-dd-copy-target="#code-diff" aria-label="Copy diff"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button>
  </figcaption>
  <pre class="dd-code__pre" tabindex="0"><code id="code-diff"><span class="dd-code__line"><span class="dd-code__p">service</span>: edge-cache</span>
<span class="dd-code__line"><span class="dd-code__p">region</span>: us-east-1</span>
<span class="dd-code__line is-del"><span class="dd-code__p">replicas</span>: <span class="dd-code__n">3</span></span>
<span class="dd-code__line is-add"><span class="dd-code__p">replicas</span>: <span class="dd-code__n">6</span></span>
<span class="dd-code__line is-del"><span class="dd-code__p">ttl</span>: <span class="dd-code__s">300s</span></span>
<span class="dd-code__line is-add"><span class="dd-code__p">ttl</span>: <span class="dd-code__s">120s</span></span>
<span class="dd-code__line"><span class="dd-code__p">purge_on_deploy</span>: <span class="dd-code__n">true</span></span></code></pre>
</figure>
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

For commands and what they print. Always dark: set `data-theme="dusk"` on the block so it reads dusk tokens on a dawn page too. Each command sits in `dd-code__input` after its prompt; prompts and output are never copied. The title bar carries three quiet dots in golden-hour tones, a centred title and the actions.

### A working session

Test, build, dev — the dawn & dusk loop. Copy in the bar takes only the commands, one per line; hover a command for its own copy button (data-dd-terminal-line-copy).

```html
<figure class="dd-code dd-code--terminal" data-theme="dusk" data-dd-terminal-line-copy>
  <figcaption class="dd-code__bar">
    <span class="dd-code__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="dd-code__title">~/dawn-and-dusk — zsh</span>
    <span class="dd-code__actions"><button class="dd-code__copy" type="button" data-dd-terminal-copy aria-label="Copy commands"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></span>
  </figcaption>
  <pre class="dd-code__pre" tabindex="0"><code><span class="dd-code__line"><span class="dd-code__prompt"><span class="dd-code__user">cxkw@dusk</span> <span class="dd-code__cwd">~/dawn-and-dusk</span> ❯ </span><span class="dd-code__input"><span class="dd-code__cmd">npm</span> <span class="dd-code__sub">test</span> <span class="dd-code__flag">--</span> <span class="dd-code__arg">menu</span></span></span>
<span class="dd-code__line"><span class="dd-code__ok">  ✓ menu › opens on click, closes on Esc</span></span>
<span class="dd-code__line"><span class="dd-code__ok">  ✓ menu › arrow keys move through items</span></span>
<span class="dd-code__line"><span class="dd-code__ok">  ✓ menu › typeahead jumps to the match</span></span>
<span class="dd-code__line"><span class="dd-code__ok">  ✓ menu › dusk: the popover reads on the page</span></span>
<span class="dd-code__line dd-code__out">4 passed, 0 failed (3.8s)</span>
<span class="dd-code__line"><span class="dd-code__prompt"><span class="dd-code__user">cxkw@dusk</span> <span class="dd-code__cwd">~/dawn-and-dusk</span> ❯ </span><span class="dd-code__input"><span class="dd-code__cmd">npm</span> <span class="dd-code__sub">run</span> <span class="dd-code__arg">build</span></span></span>
<span class="dd-code__line dd-code__dim">&gt; node scripts/build-ds.mjs &amp;&amp; astro build</span>
<span class="dd-code__line dd-code__out">› <span class="dd-code__path">release/dawn-and-dusk.css</span>  58 components · 212 kB</span>
<span class="dd-code__line dd-code__out">› <span class="dd-code__path">release/dawn-and-dusk.js</span>   34 behaviours · 64 kB</span>
<span class="dd-code__line"><span class="dd-code__warn">▲ skill/dawn-and-dusk/references/components.md changed — commit it with the release</span></span>
<span class="dd-code__line"><span class="dd-code__ok">✓ 74 pages built in 3.41s</span></span>
<span class="dd-code__line"><span class="dd-code__prompt"><span class="dd-code__user">cxkw@dusk</span> <span class="dd-code__cwd">~/dawn-and-dusk</span> ❯ </span><span class="dd-code__input"><span class="dd-code__cmd">npm</span> <span class="dd-code__sub">run</span> <span class="dd-code__arg">dev</span></span></span>
<span class="dd-code__line dd-code__out"><span class="dd-code__ok">astro</span>  v6.1.3 ready in 412 ms</span>
<span class="dd-code__line dd-code__out">┃ Local    <span class="dd-code__path">http://127.0.0.1:4321/dawn-and-dusk/</span></span>
<span class="dd-code__line dd-code__dim">┃ Network  use --host to expose</span>
<span class="dd-code__line"><span class="dd-code__dim">watching for file changes…</span> <span class="dd-code__cursor"></span></span></code></pre>
</figure>
```

`data-dd-terminal-play` types the commands out when the terminal scrolls into view: a natural typing rhythm and a steady block cursor, output a beat later, then it rests on a blinking prompt. `data-dd-terminal-delay` on a line holds it back (a slow upload, a build). Click the terminal to skip to the end; with reduced motion it shows the final state at once.

Try it: press replay in the title bar.

```html
<figure class="dd-code dd-code--terminal" data-theme="dusk" data-dd-terminal-play>
  <figcaption class="dd-code__bar">
    <span class="dd-code__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="dd-code__title">~/cxkw/insomnia — zsh</span>
    <span class="dd-code__actions"><button class="dd-code__action" type="button" data-dd-terminal-replay aria-label="Replay"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg></button><button class="dd-code__copy" type="button" data-dd-terminal-copy aria-label="Copy commands"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></span>
  </figcaption>
  <pre class="dd-code__pre" tabindex="0"><code><span class="dd-code__line"><span class="dd-code__prompt">$ </span><span class="dd-code__input"><span class="dd-code__cmd">npm</span> <span class="dd-code__sub">run</span> <span class="dd-code__arg">deploy</span> <span class="dd-code__flag">--</span> <span class="dd-code__flag">--region</span> <span class="dd-code__arg">eu-west-2</span></span></span>
<span class="dd-code__line dd-code__out">› building insomnia@2.4.0 (vite)</span>
<span class="dd-code__line dd-code__dim" data-dd-terminal-delay="700">› transforming 214 modules…</span>
<span class="dd-code__line dd-code__dim" data-dd-terminal-delay="600">› uploading 38 assets to edge-cache</span>
<span class="dd-code__line dd-code__ok" data-dd-terminal-delay="900">✓ deployed dpl_7Hq2 to eu-west-2 in 41s</span>
<span class="dd-code__line"><span class="dd-code__prompt">$ </span><span class="dd-code__input"><span class="dd-code__cmd">curl</span> <span class="dd-code__flag">-sI</span> <span class="dd-code__path">https://insomnia.cxkw.dev</span> <span class="dd-code__op">|</span> <span class="dd-code__cmd">head</span> <span class="dd-code__flag">-1</span></span></span>
<span class="dd-code__line dd-code__ok">HTTP/2 200</span>
<span class="dd-code__line"><span class="dd-code__prompt">$ </span><span class="dd-code__cursor"></span></span></code></pre>
</figure>
```

`data-dd-terminal-interactive` turns the last prompt into a real input. Enter runs the line against the `<template data-dd-terminal-command>` script inside the terminal; anything else gets a friendly “command not found”. `help` and `clear` are built in. Typed commands are highlighted with the same tokens as hand-written ones — an unknown command turns red as you type it.

### Try it: type help

Click the terminal and type. ↑ / ↓ walk back through history, Tab completes a command (try npm, then Tab), Ctrl+L clears.

```html
<figure class="dd-code dd-code--terminal" data-theme="dusk" data-dd-terminal-interactive style="--dd-code-height: 340px">
  <figcaption class="dd-code__bar">
    <span class="dd-code__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="dd-code__title">dawn &amp; dusk — try it</span>
    <span class="dd-code__actions"><button class="dd-code__copy" type="button" data-dd-terminal-copy aria-label="Copy commands"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-copy"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-check"/></svg></button></span>
  </figcaption>
  <pre class="dd-code__pre" tabindex="-1"><code><span class="dd-code__line dd-code__dim">dawn &amp; dusk shell · type help to see what it knows</span>
<span class="dd-code__line"><span class="dd-code__prompt"><span class="dd-code__user">cxkw@dusk</span> <span class="dd-code__cwd">~/dawn-and-dusk</span> ❯ </span><span class="dd-code__cursor"></span></span></code></pre>
  <template data-dd-terminal-command="ls" data-dd-terminal-description="list the repo">
    <span class="dd-code__path">ds/</span>  <span class="dd-code__path">site/</span>  <span class="dd-code__path">skill/</span>  <span class="dd-code__path">tests/</span>  <span class="dd-code__path">scripts/</span>  package.json  README.md
  </template>
  <template data-dd-terminal-command="git status" data-dd-terminal-description="what changed">
    On branch main
    Changes not staged for commit:
    <span class="dd-code__warn">  modified:   ds/components/code.css</span>
    <span class="dd-code__warn">  modified:   ds/behaviors/terminal.js</span>
    <span class="dd-code__dim">no changes added to commit (use "git add")</span>
  </template>
  <template data-dd-terminal-command="npm test -- menu" data-dd-terminal-description="run the menu tests">
    <span class="dd-code__ok">  ✓ menu › opens on click, closes on Esc</span>
    <span class="dd-code__ok">  ✓ menu › arrow keys move through items</span>
    <span class="dd-code__ok">  ✓ menu › typeahead jumps to the match</span>
    <span class="dd-code__line dd-code__out" data-dd-terminal-delay="400">3 passed, 0 failed (2.9s)</span>
  </template>
  <template data-dd-terminal-command="npm run build" data-dd-terminal-description="bundle the system and the docs">
    <span class="dd-code__dim">&gt; node scripts/build-ds.mjs &amp;&amp; astro build</span>
    › <span class="dd-code__path">release/dawn-and-dusk.css</span>  58 components
    <span class="dd-code__warn">▲ components.md changed — commit it with the release</span>
    <span class="dd-code__line dd-code__ok" data-dd-terminal-delay="600">✓ 74 pages built in 3.41s</span>
  </template>
  <template data-dd-terminal-command="npm run dev" data-dd-terminal-description="start the docs">
    <span class="dd-code__ok">astro</span>  v6.1.3 ready in 412 ms
    ┃ Local    <span class="dd-code__path">http://127.0.0.1:4321/dawn-and-dusk/</span>
  </template>
  <template data-dd-terminal-command="whoami" data-dd-terminal-description="who's here">
    cxkw — building dawn &amp; dusk, mostly after dusk
  </template>
</figure>
```

Hand-written token classes for commands and output. They read the code palette, so they work in any code block, in dawn and dusk — the terminal swaps in brighter prompt and status colours for its dark ground. Strings and comments reuse `dd-code__s` and `dd-code__c`.

Flip the example to dusk: every shell token holds at least 4.5:1 on its block, in both themes and in the terminal.

```html
<figure class="dd-code">
  <figcaption class="dd-code__bar">
    <span class="dd-code__title"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-terminal"/></svg>shell tokens</span>
    <span class="dd-code__lang">sh</span>
  </figcaption>
  <pre class="dd-code__pre" tabindex="0"><code><span class="dd-code__line"><span class="dd-code__prompt"><span class="dd-code__user">cxkw@dusk</span> <span class="dd-code__cwd">~/dawn-and-dusk</span> ❯ </span><span class="dd-code__input"><span class="dd-code__var">NODE_ENV=production</span> <span class="dd-code__cmd">npm</span> <span class="dd-code__sub">run</span> <span class="dd-code__arg">build</span> <span class="dd-code__flag">--</span> <span class="dd-code__flag">--force</span> <span class="dd-code__op">|</span> <span class="dd-code__cmd">tee</span> <span class="dd-code__path">$HOME/build.log</span> <span class="dd-code__op">&amp;&amp;</span> <span class="dd-code__cmd">echo</span> <span class="dd-code__s">"ship at dusk"</span> <span class="dd-code__c"># go</span></span></span>
<span class="dd-code__line"></span>
<span class="dd-code__line"><span class="dd-code__prompt">❯ $</span>                           <span class="dd-code__c"># .dd-code__prompt  prompt symbol</span></span>
<span class="dd-code__line"><span class="dd-code__user">cxkw@dusk</span>                     <span class="dd-code__c"># .dd-code__user  user@host</span></span>
<span class="dd-code__line"><span class="dd-code__cwd">~/dawn-and-dusk</span>               <span class="dd-code__c"># .dd-code__cwd  working directory</span></span>
<span class="dd-code__line"><span class="dd-code__cmd">npm</span>                           <span class="dd-code__c"># .dd-code__cmd  command</span></span>
<span class="dd-code__line"><span class="dd-code__sub">run</span>                           <span class="dd-code__c"># .dd-code__sub  subcommand</span></span>
<span class="dd-code__line"><span class="dd-code__flag">-v</span> <span class="dd-code__flag">--force</span>                    <span class="dd-code__c"># .dd-code__flag  flag / option</span></span>
<span class="dd-code__line"><span class="dd-code__arg">menu</span>                          <span class="dd-code__c"># .dd-code__arg  argument</span></span>
<span class="dd-code__line"><span class="dd-code__s">"ship at dusk"</span>                <span class="dd-code__c"># .dd-code__s  string</span></span>
<span class="dd-code__line"><span class="dd-code__var">$HOME</span> <span class="dd-code__var">NODE_ENV=dev</span>            <span class="dd-code__c"># .dd-code__var  variable</span></span>
<span class="dd-code__line"><span class="dd-code__path">./dist</span> <span class="dd-code__path">https://cxkw.dev</span>       <span class="dd-code__c"># .dd-code__path  path / URL</span></span>
<span class="dd-code__line"><span class="dd-code__op">|</span> <span class="dd-code__op">&amp;&amp;</span> <span class="dd-code__op">&gt;</span>                        <span class="dd-code__c"># .dd-code__op  pipe / operator</span></span>
<span class="dd-code__line"><span class="dd-code__c"># deploy at dusk</span>              <span class="dd-code__c"># .dd-code__c  comment</span></span>
<span class="dd-code__line"><span class="dd-code__out">214 modules transformed</span>       <span class="dd-code__c"># .dd-code__out  output</span></span>
<span class="dd-code__line"><span class="dd-code__ok">✓ 14 passed</span>                   <span class="dd-code__c"># .dd-code__ok  success</span></span>
<span class="dd-code__line"><span class="dd-code__warn">▲ 2 pages lack a lead</span>         <span class="dd-code__c"># .dd-code__warn  warning</span></span>
<span class="dd-code__line"><span class="dd-code__err">✕ build failed</span>                <span class="dd-code__c"># .dd-code__err  error</span></span>
<span class="dd-code__line"><span class="dd-code__dim">› transforming…</span>               <span class="dd-code__c"># .dd-code__dim  dimmed / progress</span></span></code></pre>
</figure>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-code` | Code block container (`<figure>`). Tonal surface, rounded. |
| `.dd-code__bar` | Title bar (`<figcaption>`): title, language tag, copy button. |
| `.dd-code__title / __lang` | File name (mono, with an icon) and a small uppercase language tag. |
| `.dd-code__copy` | Icon button; pair with `data-dd-copy-target="#id"`. Holds `copy` + `check` icons; swaps on `[data-copied]`. |
| `.dd-code__pre` | Scrolling `<pre>`. Set `--dd-code-height` to cap its height. |
| `.dd-code__line` | One line. Separate lines with literal newlines, not block elements. In a terminal the script wraps loose lines for you. |
| `.is-highlight / .is-add / .is-del` | Line states: highlighted, added, removed. |
| `.dd-code--numbered` | Line-number gutter (CSS counter, not copied). |
| `.dd-code--diff` | +/− gutter for diffs. |
| `.dd-code__k / __s / __n / __c / __f / __p / __t` | Syntax tokens: keyword, string, number, comment, function, property, tag name. Prism (`.token.*`) and highlight.js (`.hljs-*`) classes map to the same colours. |
| `--dd-code-keyword … --dd-code-punct` | Override the token colours on `.dd-code`. |
| `.dd-code-inline` | Inline code in running text. |
| `.dd-code-field` | Copyable value: `__label`, `__box`, `__prefix`, `__value`, `__btn`, `__hint`. |
| `.dd-code--terminal` | Dark terminal; use with `data-theme="dusk"`. Its bar is a three-column grid: dots, centred title, actions. |
| `.dd-code__dots` | Three window dots (`<i>`) in quiet golden-hour tones; they warm up while a live terminal has focus. Retune with `--dd-code-dot-1…3`. |
| `.dd-code__actions / __action` | Right-hand group of bar buttons; `__action` is a 28px icon button (replay) that matches `__copy`. |
| `.dd-code__prompt` | The prompt (`$ `, `❯ `): apricot, never selected or copied. May hold `__user` and `__cwd`. |
| `.dd-code__user / __cwd` | Prompt parts: user@host (muted) and the working directory (ochre). |
| `.dd-code__input` | The command after the prompt — what playback types, copy copies and history recalls. |
| `.dd-code__cmd / __sub / __flag / __arg` | Command name, subcommand, flags and options, arguments. |
| `.dd-code__var / __path / __op` | Variables (`$HOME`, `NODE_ENV=…`), paths and URLs (underlined), pipes and operators (`\|` `&&` `>`). Strings and comments use `__s` and `__c`. |
| `.dd-code__out / __ok / __warn / __err / __dim` | Output lines: plain (muted), success, warning, error, dimmed / progress. Put them on the `__line` or on a span inside it. |
| `.dd-code__cursor` | Block cursor: blinks at rest, holds steady while typing, turns hollow when a live terminal loses focus. |
| `--dd-code-prompt … --dd-code-dim` | Shell token colours (`-prompt -user -cwd -cmd -sub -flag -arg -var -path -op -out -ok -warn -err -dim`); they default to the code palette. |
| `.dd-code__line-copy` | Made by the script (`data-dd-terminal-line-copy`): a per-command copy button, shown on hover or focus. |
| `.dd-code__live / __field` | Made by the script (`data-dd-terminal-interactive`): the live prompt line and its invisible input. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-copy-target="#id"` | Copies the text of the element with that id (the `<code>`). From `copy.js`; the button gets `[data-copied]` for 1.6s. |
| `data-dd-copy="text"` | Copies the given text — use it for secrets so the masked value is never copied. |
| `data-dd-code-secret="…"` | On the field value: the real secret. The visible text is the masked form. |
| `data-dd-code-reveal` | On a button inside `.dd-code-field`: toggles masked ↔ secret and `aria-pressed`. Holds `eye` + `eye-off` icons. |
| `data-dd-code-reveal-label="Show|Hide"` | Optional accessible labels for the two states. |
| `data-dd-terminal-copy` | On a button in a terminal: copies only the commands (each `__input`), one per line — no prompts, no output. Same `[data-copied]` feedback. |
| `data-dd-terminal-line-copy` | On the terminal: adds a copy button to every command line. |
| `data-dd-terminal-play` | On the terminal: types the commands out when it scrolls into view, output a beat later, then rests. Sets `data-dd-terminal-state="playing\|done"` and fires `dd:terminalplayed`. A click in the terminal skips to the end. Reduced motion: final state at once. |
| `data-dd-terminal-speed="42"` | Typing speed in ms per character (with a little human jitter). |
| `data-dd-terminal-delay="600"` | On a line (also inside a template): wait this long before it appears. |
| `data-dd-terminal-replay` | On a bar button: plays the terminal again. Hidden with reduced motion. |
| `data-dd-terminal-interactive` | On the terminal: the last prompt becomes a live input. Fires `dd:terminalrun` with `{ command, known }`. |
| `<template data-dd-terminal-command="…">` | Inside a live terminal: the output for that command (markup, one line per line; plain lines read as muted output). `data-dd-terminal-description` shows in `help`. |
| `data-dd-terminal-label` | Accessible name for the live input (default “Terminal command (type help for a list)”). |
| `dd.terminal(el)` | Sets up a terminal added later and returns `{ play(), finish(), run(command) }` (`run` waits for any output still printing, and returns a promise); `dd.terminal.init(root)` sets up every terminal inside `root`. |

Copy and reveal are plain buttons: Tab to focus, Enter or Space to activate. The `<pre>` takes `tabindex="0"` so long lines can be scrolled from the keyboard.

Live terminal: click anywhere in it (or Tab to it) to focus the prompt. Enter runs the line, ↑ / ↓ walk through history (it starts with the commands already on screen), Tab completes a known command or lists the matches — and when there is nothing to complete, Tab moves focus on as usual, so the terminal never traps it. Ctrl L clears, Ctrl C abandons the line. Output is read out through a polite live region; the mirrored line is hidden from screen readers because the input carries the value.

## Guidelines

Do:
- Name the file in the bar when the snippet belongs somewhere.
- Highlight the one or two lines the reader should look at.
- Mask secrets by default and copy the real value.
- Keep prompts (`$`) out of the copied text: wrap each command in `dd-code__input`.
- Keep playback short — two or three commands with real output — and let it rest on a prompt.
- Give a live terminal a script for the commands people will try, with a description each for `help`.

Don't:
- Don’t wrap code lines in block elements inside `<pre>` — copy gets blank lines.
- Don’t use a terminal block for source files; it is for commands and output.
- Don’t colour whole lines to show syntax — tokens only. Status colours go on output lines, not commands.
- Don’t colour the window dots red, yellow and green; they are quiet tones, not buttons.
- Don’t autoplay more than one terminal per view, or loop it.

