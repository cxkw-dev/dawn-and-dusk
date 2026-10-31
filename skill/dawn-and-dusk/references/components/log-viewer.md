# log viewer — `log-viewer`

A monospace stream for deploy and service logs: timestamps, level badges, the service that spoke, and a bar to search, filter by level and wrap long lines.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/log-viewer

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Live stream

Search filters and highlights; level toggles hide noise; Wrap breaks long messages instead of scrolling sideways; the arrow (Follow) keeps the newest line in view. Errors carry a faint tint so they catch the eye while scrolling. Try it: new lines arrive every few seconds — scroll up to read and Follow pauses, scroll back down (or press the arrow) to catch up, search “502” while it streams.

```html
<div class="dd-log-viewer" id="logs-auth-gateway" data-dd-log-viewer style="--dd-log-viewer-height: 360px">
  <div class="dd-log-viewer__bar">
    <span class="dd-log-viewer__live">Live</span>
    <label class="dd-log-viewer__search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><input type="search" placeholder="Search logs" aria-label="Search logs" value="" data-dd-log-viewer-search></label>
    <div class="dd-log-viewer__levels" role="group" aria-label="Levels">
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="debug" aria-pressed="true">Debug <span class="dd-log-viewer__n">5</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="info" aria-pressed="true">Info <span class="dd-log-viewer__n">12</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="warn" aria-pressed="true">Warn <span class="dd-log-viewer__n">4</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="error" aria-pressed="true">Error <span class="dd-log-viewer__n">3</span></button>
    </div>
    <button class="dd-log-viewer__toggle dd-log-viewer__toggle--wrap" type="button" data-dd-log-viewer-wrap aria-pressed="false"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg>Wrap</button>
    <button class="dd-log-viewer__toggle dd-log-viewer__toggle--follow" type="button" data-dd-log-viewer-follow aria-pressed="true" aria-label="Follow new lines"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-arrow-down"/></svg><span class="dd-log-viewer__toggle-label">Follow</span></button>
    <span class="dd-log-viewer__count" data-dd-log-viewer-count aria-live="polite">24 lines</span>
  </div>
  <div class="dd-log-viewer__scroll" tabindex="0" role="region" aria-label="auth-gateway deploy logs">
    <ol class="dd-log-viewer__lines" role="log">
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:51.008</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">deploy dpl_7Hq2xK9m started <span class="dd-log-viewer__dim">service=auth-gateway region=us-east-1 sha=9f2c41e</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:51.214</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">pulled image ghcr.io/cxkw/auth-gateway:3.14.0 <span class="dd-log-viewer__dim">(212 MB, cache hit)</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:52.930</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">listening on :8080 <span class="dd-log-viewer__dim">pid=41 node=v22.12.0</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:53.101</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">jwks cache warm <span class="dd-log-viewer__dim">keys=3 ttl=600s</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:53.477</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge requested <span class="dd-log-viewer__dim">paths=/auth/* reason=deploy</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:54.012</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge complete <span class="dd-log-viewer__dim">objects=1,284 took=531ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:40:55.640</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">upstream idp slow <span class="dd-log-viewer__dim">p95=611ms threshold=500ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:56.205</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">consumer joined group invoices <span class="dd-log-viewer__dim">partition=3</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:57.889</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">fetched batch <span class="dd-log-viewer__dim">size=50 lag=12</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:40:58.302</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">charge failed: card_declined <span class="dd-log-viewer__dim">invoice=in_2481 customer=cus_9Ab3 attempt=1/3</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:58.304</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">retry scheduled <span class="dd-log-viewer__dim">invoice=in_2481 in=30s</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:59.110</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">GET /v1/session 200 <span class="dd-log-viewer__dim">84ms ip=203.0.113.24</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:00.447</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">hit ratio below target <span class="dd-log-viewer__dim">ratio=0.71 target=0.85 region=eu-west-2</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:01.020</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">POST /v1/token 201 <span class="dd-log-viewer__dim">112ms client=dockey-ui</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:41:02.733</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">request timeout after 5000ms calling https://idp.cxkw.dev/oauth/token <span class="dd-log-viewer__dim">trace=7f3a9c21 attempt=2/4 upstream=idp</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:02.736</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">circuit half-open for upstream idp <span class="dd-log-viewer__dim">failures=5 window=30s</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:41:03.918</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">health probe ok <span class="dd-log-viewer__dim">replica=auth-gw-2 latency=9ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:04.250</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">traffic shifted <span class="dd-log-viewer__dim">canary=25% → 100%</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:05.512</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">invoice paid <span class="dd-log-viewer__dim">invoice=in_2477 amount=€49.00</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:41:06.001</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">revalidated /assets/app.9f2c.js <span class="dd-log-viewer__dim">etag match</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:06.740</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">replica auth-gw-3 not ready <span class="dd-log-viewer__dim">restarts=4 reason=CrashLoopBackOff</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:07.002</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">GET /v1/me 200 <span class="dd-log-viewer__dim">41ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:07.214</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">deploy dpl_7Hq2xK9m healthy <span class="dd-log-viewer__dim">took=16.2s replicas=2/3</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:41:07.390</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">notify-fanout</span><span class="dd-log-viewer__msg">smtp-relay ECONNRESET <span class="dd-log-viewer__dim">queue=deploys depth=18</span></span></li>
    </ol>
    <p class="dd-log-viewer__empty" data-dd-log-viewer-empty hidden><b>No lines match <span data-dd-log-viewer-query></span></b>Try another search, or <button class="dd-btn dd-btn--link" type="button" data-dd-log-viewer-clear><span>clear filters</span></button></p>
  </div>
</div>
```

## Filtered & wrapped

State comes from the markup: a pre-filled search value, toggles with `aria-pressed="false"` and a pressed Wrap button are applied on load. The count shows what is hidden.

```html
<div class="dd-log-viewer is-wrapped" data-dd-log-viewer>
  <div class="dd-log-viewer__bar">
    
    <label class="dd-log-viewer__search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><input type="search" placeholder="Search logs" aria-label="Search logs" value="idp" data-dd-log-viewer-search></label>
    <div class="dd-log-viewer__levels" role="group" aria-label="Levels">
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="debug" aria-pressed="false">Debug <span class="dd-log-viewer__n">5</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="info" aria-pressed="false">Info <span class="dd-log-viewer__n">12</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="warn" aria-pressed="true">Warn <span class="dd-log-viewer__n">4</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="error" aria-pressed="true">Error <span class="dd-log-viewer__n">3</span></button>
    </div>
    <button class="dd-log-viewer__toggle dd-log-viewer__toggle--wrap" type="button" data-dd-log-viewer-wrap aria-pressed="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg>Wrap</button>
    
    <span class="dd-log-viewer__count" data-dd-log-viewer-count aria-live="polite">24 lines</span>
  </div>
  <div class="dd-log-viewer__scroll" tabindex="0" role="region" aria-label="auth-gateway deploy logs">
    <ol class="dd-log-viewer__lines" role="log">
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:51.008</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">deploy dpl_7Hq2xK9m started <span class="dd-log-viewer__dim">service=auth-gateway region=us-east-1 sha=9f2c41e</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:51.214</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">pulled image ghcr.io/cxkw/auth-gateway:3.14.0 <span class="dd-log-viewer__dim">(212 MB, cache hit)</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:52.930</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">listening on :8080 <span class="dd-log-viewer__dim">pid=41 node=v22.12.0</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:53.101</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">jwks cache warm <span class="dd-log-viewer__dim">keys=3 ttl=600s</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:53.477</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge requested <span class="dd-log-viewer__dim">paths=/auth/* reason=deploy</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:54.012</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge complete <span class="dd-log-viewer__dim">objects=1,284 took=531ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:40:55.640</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">upstream idp slow <span class="dd-log-viewer__dim">p95=611ms threshold=500ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:56.205</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">consumer joined group invoices <span class="dd-log-viewer__dim">partition=3</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:57.889</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">fetched batch <span class="dd-log-viewer__dim">size=50 lag=12</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:40:58.302</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">charge failed: card_declined <span class="dd-log-viewer__dim">invoice=in_2481 customer=cus_9Ab3 attempt=1/3</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:58.304</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">retry scheduled <span class="dd-log-viewer__dim">invoice=in_2481 in=30s</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:59.110</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">GET /v1/session 200 <span class="dd-log-viewer__dim">84ms ip=203.0.113.24</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:00.447</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">hit ratio below target <span class="dd-log-viewer__dim">ratio=0.71 target=0.85 region=eu-west-2</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:01.020</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">POST /v1/token 201 <span class="dd-log-viewer__dim">112ms client=dockey-ui</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:41:02.733</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">request timeout after 5000ms calling https://idp.cxkw.dev/oauth/token <span class="dd-log-viewer__dim">trace=7f3a9c21 attempt=2/4 upstream=idp</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:02.736</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">circuit half-open for upstream idp <span class="dd-log-viewer__dim">failures=5 window=30s</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:41:03.918</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">health probe ok <span class="dd-log-viewer__dim">replica=auth-gw-2 latency=9ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:04.250</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">traffic shifted <span class="dd-log-viewer__dim">canary=25% → 100%</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:05.512</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">invoice paid <span class="dd-log-viewer__dim">invoice=in_2477 amount=€49.00</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:41:06.001</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">revalidated /assets/app.9f2c.js <span class="dd-log-viewer__dim">etag match</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:06.740</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">replica auth-gw-3 not ready <span class="dd-log-viewer__dim">restarts=4 reason=CrashLoopBackOff</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:07.002</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">GET /v1/me 200 <span class="dd-log-viewer__dim">41ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:07.214</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">deploy dpl_7Hq2xK9m healthy <span class="dd-log-viewer__dim">took=16.2s replicas=2/3</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:41:07.390</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">notify-fanout</span><span class="dd-log-viewer__msg">smtp-relay ECONNRESET <span class="dd-log-viewer__dim">queue=deploys depth=18</span></span></li>
    </ol>
    <p class="dd-log-viewer__empty" data-dd-log-viewer-empty hidden><b>No lines match <span data-dd-log-viewer-query></span></b>Try another search, or <button class="dd-btn dd-btn--link" type="button" data-dd-log-viewer-clear><span>clear filters</span></button></p>
  </div>
</div>
```

## Nothing matches

When search and levels leave no lines, the empty message names the query and offers to clear the filters.

```html
<div class="dd-log-viewer" data-dd-log-viewer>
  <div class="dd-log-viewer__bar">
    
    <label class="dd-log-viewer__search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><input type="search" placeholder="Search logs" aria-label="Search logs" value="ledger-sync" data-dd-log-viewer-search></label>
    <div class="dd-log-viewer__levels" role="group" aria-label="Levels">
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="debug" aria-pressed="true">Debug <span class="dd-log-viewer__n">5</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="info" aria-pressed="true">Info <span class="dd-log-viewer__n">12</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="warn" aria-pressed="true">Warn <span class="dd-log-viewer__n">4</span></button>
      <button class="dd-log-viewer__toggle" type="button" data-dd-log-viewer-level="error" aria-pressed="true">Error <span class="dd-log-viewer__n">3</span></button>
    </div>
    <button class="dd-log-viewer__toggle dd-log-viewer__toggle--wrap" type="button" data-dd-log-viewer-wrap aria-pressed="false"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-menu"/></svg>Wrap</button>
    
    <span class="dd-log-viewer__count" data-dd-log-viewer-count aria-live="polite">24 lines</span>
  </div>
  <div class="dd-log-viewer__scroll" tabindex="0" role="region" aria-label="auth-gateway deploy logs">
    <ol class="dd-log-viewer__lines" role="log">
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:51.008</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">deploy dpl_7Hq2xK9m started <span class="dd-log-viewer__dim">service=auth-gateway region=us-east-1 sha=9f2c41e</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:51.214</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">pulled image ghcr.io/cxkw/auth-gateway:3.14.0 <span class="dd-log-viewer__dim">(212 MB, cache hit)</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:52.930</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">listening on :8080 <span class="dd-log-viewer__dim">pid=41 node=v22.12.0</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:53.101</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">jwks cache warm <span class="dd-log-viewer__dim">keys=3 ttl=600s</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:53.477</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge requested <span class="dd-log-viewer__dim">paths=/auth/* reason=deploy</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:54.012</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge complete <span class="dd-log-viewer__dim">objects=1,284 took=531ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:40:55.640</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">upstream idp slow <span class="dd-log-viewer__dim">p95=611ms threshold=500ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:56.205</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">consumer joined group invoices <span class="dd-log-viewer__dim">partition=3</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:57.889</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">fetched batch <span class="dd-log-viewer__dim">size=50 lag=12</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:40:58.302</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">charge failed: card_declined <span class="dd-log-viewer__dim">invoice=in_2481 customer=cus_9Ab3 attempt=1/3</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:58.304</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">retry scheduled <span class="dd-log-viewer__dim">invoice=in_2481 in=30s</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:59.110</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">GET /v1/session 200 <span class="dd-log-viewer__dim">84ms ip=203.0.113.24</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:00.447</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">hit ratio below target <span class="dd-log-viewer__dim">ratio=0.71 target=0.85 region=eu-west-2</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:01.020</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">POST /v1/token 201 <span class="dd-log-viewer__dim">112ms client=dockey-ui</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:41:02.733</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">request timeout after 5000ms calling https://idp.cxkw.dev/oauth/token <span class="dd-log-viewer__dim">trace=7f3a9c21 attempt=2/4 upstream=idp</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:02.736</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">circuit half-open for upstream idp <span class="dd-log-viewer__dim">failures=5 window=30s</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:41:03.918</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">health probe ok <span class="dd-log-viewer__dim">replica=auth-gw-2 latency=9ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:04.250</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">traffic shifted <span class="dd-log-viewer__dim">canary=25% → 100%</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:05.512</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">billing-worker</span><span class="dd-log-viewer__msg">invoice paid <span class="dd-log-viewer__dim">invoice=in_2477 amount=€49.00</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:41:06.001</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">revalidated /assets/app.9f2c.js <span class="dd-log-viewer__dim">etag match</span></span></li>
    <li class="dd-log-viewer__line" data-level="warn"><time class="dd-log-viewer__time">09:41:06.740</time><span class="dd-log-viewer__level">warn</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">replica auth-gw-3 not ready <span class="dd-log-viewer__dim">restarts=4 reason=CrashLoopBackOff</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:07.002</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">GET /v1/me 200 <span class="dd-log-viewer__dim">41ms</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:41:07.214</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">deploy dpl_7Hq2xK9m healthy <span class="dd-log-viewer__dim">took=16.2s replicas=2/3</span></span></li>
    <li class="dd-log-viewer__line" data-level="error"><time class="dd-log-viewer__time">09:41:07.390</time><span class="dd-log-viewer__level">error</span><span class="dd-log-viewer__src">notify-fanout</span><span class="dd-log-viewer__msg">smtp-relay ECONNRESET <span class="dd-log-viewer__dim">queue=deploys depth=18</span></span></li>
    </ol>
    <p class="dd-log-viewer__empty" data-dd-log-viewer-empty hidden><b>No lines match <span data-dd-log-viewer-query></span></b>Try another search, or <button class="dd-btn dd-btn--link" type="button" data-dd-log-viewer-clear><span>clear filters</span></button></p>
  </div>
</div>
```

## Stream only

Drop the bar for short, fixed output — a build step in a deploy page. No behaviour needed.

```html
<div class="dd-log-viewer">
  <div class="dd-log-viewer__scroll" tabindex="0" role="region" aria-label="Build output">
    <ol class="dd-log-viewer__lines" role="log">
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:51.008</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">deploy dpl_7Hq2xK9m started <span class="dd-log-viewer__dim">service=auth-gateway region=us-east-1 sha=9f2c41e</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:51.214</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">deployer</span><span class="dd-log-viewer__msg">pulled image ghcr.io/cxkw/auth-gateway:3.14.0 <span class="dd-log-viewer__dim">(212 MB, cache hit)</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:52.930</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">listening on :8080 <span class="dd-log-viewer__dim">pid=41 node=v22.12.0</span></span></li>
    <li class="dd-log-viewer__line" data-level="debug"><time class="dd-log-viewer__time">09:40:53.101</time><span class="dd-log-viewer__level">debug</span><span class="dd-log-viewer__src">auth-gateway</span><span class="dd-log-viewer__msg">jwks cache warm <span class="dd-log-viewer__dim">keys=3 ttl=600s</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:53.477</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge requested <span class="dd-log-viewer__dim">paths=/auth/* reason=deploy</span></span></li>
    <li class="dd-log-viewer__line" data-level="info"><time class="dd-log-viewer__time">09:40:54.012</time><span class="dd-log-viewer__level">info</span><span class="dd-log-viewer__src">edge-cache</span><span class="dd-log-viewer__msg">purge complete <span class="dd-log-viewer__dim">objects=1,284 took=531ms</span></span></li>
    </ol>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-log-viewer` | Container on a tonal surface. `.is-wrapped` wraps messages. A size container: under 520px the service column drops and the level toggles take their own row. |
| `.dd-log-viewer__bar` | Toolbar: `__live`, `__search`, `__levels`, `__toggle`, `__count`. |
| `.dd-log-viewer__toggle` | Pressable button (`aria-pressed`). `--wrap` and `--follow` for those switches; a `__toggle-label` inside hides when the viewer is narrow. `__n` holds a level count, which follows the search. |
| `.dd-log-viewer__scroll` | Scroll area. Height from `--dd-log-viewer-height` (default 420px). |
| `.dd-log-viewer__lines` | The `role="log"` list; columns line up across lines (subgrid). |
| `.dd-log-viewer__line[data-level]` | `debug` · `info` · `warn` · `error`. Error lines are tinted. |
| `.dd-log-viewer__time / __level / __src / __msg` | Timestamp, level badge, service and message. `__dim` mutes key=value detail. |
| `.dd-log-viewer__mark` | Search match (added by the behaviour). |
| `.dd-log-viewer__empty` | Message shown when nothing matches. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-log-viewer` | On the container: wires up the bar below. |
| `data-dd-log-viewer-search` | On the search input: filters lines by text and highlights matches. Esc clears it. |
| `data-dd-log-viewer-level="info"` | On a toggle: shows or hides that level (`aria-pressed`). |
| `data-dd-log-viewer-wrap` | On a toggle: wraps long messages (`aria-pressed` ↔ `.is-wrapped`). |
| `data-dd-log-viewer-follow` | On a toggle: while pressed, the stream stays on the newest line as lines arrive. Scrolling up to read pauses it; scrolling back to the bottom, or pressing it, resumes. |
| `data-dd-log-viewer-count` | Receives “18 of 24 lines”. Give it `aria-live="polite"`. |
| `data-dd-log-viewer-empty / -query / -clear` | Empty message, the slot that names the query, and a button that resets search and levels. |

Lines can be appended to the list at any time — a live tail. New lines are filtered, highlighted and counted like the rest, and followed when Follow is on. The scroll area takes `tabindex="0"` so the stream can be scrolled with the arrow keys; toggles are buttons (Enter or Space).

## Guidelines

Do:
- Use full timestamps with milliseconds and a fixed width — lines must align.
- Keep key=value detail dimmed so the message reads first.
- Show how many lines a filter hides.

Don't:
- Don’t colour whole lines by level; the badge and the error tint are enough.
- Don’t let the stream grow the page — cap its height.
- Don’t auto-scroll to the bottom while someone is reading higher up.

