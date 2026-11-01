# data table — `data-table`

The dense table for large data sets: search and filter, sort, select in bulk, expand a row for detail, and scroll wide data with the header and first column pinned.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/data-table

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Hairline

Toolbar, bulk actions, sticky header, frozen service column, sortable figures, selectable and expandable rows, pagination. Try it: click a header to sort (again for descending, a third time to reset), filter for “cache”, pick a region or toggle Degraded, select rows (Shift-click for a range), expand a row, open Columns, page with the arrows, scroll sideways.

```html
<div class="dd-data-table" data-dd-data-table style="--dd-data-table-height: 460px">
  <div class="dd-data-table__toolbar">
    <label class="dd-data-table__search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><input type="search" placeholder="Filter services…" aria-label="Filter services" data-dd-data-table-search></label>
    <details class="dd-data-table__menu dd-data-table__menu--start">
      <summary class="dd-data-table__chip"><span>Region</span> <b data-dd-data-table-filter-label="region">all</b><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></summary>
      <div class="dd-data-table__menu-panel">
        <p class="dd-data-table__menu-title">Region</p>
        <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-filter="region=us-east-1"> us-east-1</label>
        <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-filter="region=eu-west-2"> eu-west-2</label>
        <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-filter="region=ap-south-1"> ap-south-1</label>
      </div>
    </details>
    <button class="dd-data-table__chip" type="button" aria-pressed="false" data-dd-data-table-filter="status=warn"><span class="dd-data-table__chip-dot" style="--_c: var(--dd-warn)"></span>Degraded</button>
    <button class="dd-data-table__chip" type="button" aria-pressed="false" data-dd-data-table-filter="status=bad"><span class="dd-data-table__chip-dot" style="--_c: var(--dd-bad)"></span>Down</button>
    <div class="dd-data-table__tools">
      <span class="dd-data-table__count" data-dd-data-table-count="services">12 services</span>
      <details class="dd-data-table__menu">
        <summary class="dd-btn dd-btn--ghost dd-btn--sm"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-layers"/></svg><span>Columns</span></summary>
        <div class="dd-data-table__menu-panel">
          <p class="dd-data-table__menu-title">Show columns</p>
          <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-column="id" checked> ID</label>
          <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-column="region" checked> Region</label>
          <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-column="version" checked> Version</label>
          <label><input class="dd-data-table__check" type="checkbox" data-dd-data-table-column="owner"> Owner</label>
        </div>
      </details>
      <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-dd-toast="Export started" data-dd-toast-description="services.csv downloads when it’s ready."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Export</span></button>
    </div>
  </div>
  <div class="dd-data-table__bulk" role="region" aria-label="Bulk actions">
    <span class="dd-data-table__bulk-count"><span data-dd-data-table-selected>2</span> selected</span>
    <button class="dd-btn dd-btn--sm" type="button" data-dd-toast="Restart queued" data-dd-toast-description="The selected services restart one instance at a time." data-dd-toast-intent="ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-refresh"/></svg><span>Restart</span></button>
    <button class="dd-btn dd-btn--sm" type="button" data-dd-toast="Traffic paused" data-dd-toast-description="The selected services stop taking new requests." data-dd-toast-intent="warn"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-pause"/></svg><span>Pause</span></button>
    <button class="dd-btn dd-btn--sm" type="button" data-dd-toast="Export started" data-dd-toast-description="The selected rows download as a CSV."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-download"/></svg><span>Export</span></button>
    <button class="dd-btn dd-btn--sm dd-data-table__bulk-end" type="button" data-dd-data-table-clear>Clear</button>
  </div>
  <div class="dd-data-table__scroll" tabindex="0" role="region" aria-label="Services">
    <table class="dd-data-table__table">
      <thead>
      <tr>
        <th class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select all services"></th>
        <th class="is-frozen" data-col="service" aria-sort="none"><button class="dd-data-table__sort" type="button">Service<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th data-col="id">ID</th>
        <th data-col="status" aria-sort="none"><button class="dd-data-table__sort" type="button">Status<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th data-col="region" aria-sort="none"><button class="dd-data-table__sort" type="button">Region<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th data-col="version">Version</th>
        <th data-col="owner">Owner</th>
        <th class="is-num" data-col="req" aria-sort="none"><button class="dd-data-table__sort" type="button">Req / min<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th class="is-num" data-col="err" aria-sort="none"><button class="dd-data-table__sort" type="button">Errors<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th class="is-num" data-col="p95" aria-sort="none"><button class="dd-data-table__sort" type="button">p95<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th class="is-num" data-col="cpu" aria-sort="none"><button class="dd-data-table__sort" type="button">CPU<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th class="is-num" data-col="at" aria-sort="none"><button class="dd-data-table__sort" type="button">Updated<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th class="is-actions"><span class="dd-visually-hidden">Actions</span></th>
      </tr>
    </thead>
      <tbody>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select auth-gateway"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0141" aria-label="Details for auth-gateway"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">auth-gateway</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0141</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">us-east-1</td>
        <td class="is-mono" data-col="version">v2.14.0</td>
        <td class="is-muted" data-col="owner">platform</td>
        <td class="is-num">12,480</td>
        <td class="is-num">0.02%</td>
        <td class="is-num" data-value="84">84<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">41%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:41:07">09:41:07</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for auth-gateway" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0141" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">a41f9c2</span> · Rotate JWKS keys every 6h</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">3 / 3</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">auth-gateway.us-east-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr class="is-selected">
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select billing-worker" checked></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0152" aria-label="Details for billing-worker"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">billing-worker</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0152</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">us-east-1</td>
        <td class="is-mono" data-col="version">v1.8.3</td>
        <td class="is-muted" data-col="owner">payments</td>
        <td class="is-num">3,212</td>
        <td class="is-num">0.11%</td>
        <td class="is-num" data-value="142">142<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">58%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:41:02">09:41:02</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for billing-worker" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0152" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">7be03d1</span> · Retry idempotent charges</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">6 / 6</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">billing-worker.us-east-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select search-indexer"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="true" aria-controls="dt-svc-0167" aria-label="Details for search-indexer"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">search-indexer</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0167</td>
        <td data-col="status" data-value="warn"><span class="dd-data-table__status" data-status="warn">Degraded</span></td>
        <td data-col="region">us-east-1</td>
        <td class="is-mono" data-col="version">v0.9.12</td>
        <td class="is-muted" data-col="owner">search</td>
        <td class="is-num">8,904</td>
        <td class="is-num is-warn">1.84%</td>
        <td class="is-num is-warn" data-value="611">611<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num is-warn">87%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:55">09:40:55</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for search-indexer" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0167">
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">c90e5aa</span> · Batch shard merges</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">3 / 3</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.71%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">search-indexer.us-east-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select edge-cache"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0171" aria-label="Details for edge-cache"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">edge-cache</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0171</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">us-east-1</td>
        <td class="is-mono" data-col="version">v3.2.1</td>
        <td class="is-muted" data-col="owner">platform</td>
        <td class="is-num">41,337</td>
        <td class="is-num">0.00%</td>
        <td class="is-num" data-value="12">12<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">33%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:51">09:40:51</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for edge-cache" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0171" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">6 / 6</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">edge-cache.us-east-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr class="is-selected">
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select ledger-sync" checked></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0203" aria-label="Details for ledger-sync"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">ledger-sync</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0203</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">eu-west-2</td>
        <td class="is-mono" data-col="version">v1.2.0</td>
        <td class="is-muted" data-col="owner">payments</td>
        <td class="is-num">1,048</td>
        <td class="is-num">0.05%</td>
        <td class="is-num" data-value="96">96<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">22%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:48">09:40:48</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for ledger-sync" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0203" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">3 / 3</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">ledger-sync.eu-west-2.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select notify-fanout"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0219" aria-label="Details for notify-fanout"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">notify-fanout</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0219</td>
        <td data-col="status" data-value="bad"><span class="dd-data-table__status" data-status="bad">Down</span></td>
        <td data-col="region">eu-west-2</td>
        <td class="is-mono" data-col="version">v2.0.0-rc.2</td>
        <td class="is-muted" data-col="owner">growth</td>
        <td class="is-num">0</td>
        <td class="is-num"><span class="is-faint">—</span></td>
        <td class="is-num"><span class="is-faint">—</span></td>
        <td class="is-num">0%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:39:12">09:39:12</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for notify-fanout" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0219" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">0 / 3</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">97.12%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">notify-fanout.eu-west-2.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select mail-relay"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0224" aria-label="Details for mail-relay"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">mail-relay</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0224</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">eu-west-2</td>
        <td class="is-mono" data-col="version">v4.1.7</td>
        <td class="is-muted" data-col="owner">growth</td>
        <td class="is-num">2,771</td>
        <td class="is-num">0.08%</td>
        <td class="is-num" data-value="133">133<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">19%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:40">09:40:40</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for mail-relay" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0224" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">3 / 3</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">mail-relay.eu-west-2.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select session-store"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0230" aria-label="Details for session-store"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">session-store</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0230</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">eu-west-2</td>
        <td class="is-mono" data-col="version">v5.0.2</td>
        <td class="is-muted" data-col="owner">platform</td>
        <td class="is-num">18,452</td>
        <td class="is-num">0.01%</td>
        <td class="is-num" data-value="9">9<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">47%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:38">09:40:38</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for session-store" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0230" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">6 / 6</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">session-store.eu-west-2.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select image-resizer"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0310" aria-label="Details for image-resizer"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">image-resizer</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0310</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">ap-south-1</td>
        <td class="is-mono" data-col="version">v1.5.0</td>
        <td class="is-muted" data-col="owner">media</td>
        <td class="is-num">6,502</td>
        <td class="is-num">0.32%</td>
        <td class="is-num" data-value="188">188<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">64%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:37">09:40:37</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for image-resizer" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0310" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">3 / 3</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">image-resizer.ap-south-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select metrics-agg"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0318" aria-label="Details for metrics-agg"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">metrics-agg</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0318</td>
        <td data-col="status" data-value="warn"><span class="dd-data-table__status" data-status="warn">Degraded</span></td>
        <td data-col="region">ap-south-1</td>
        <td class="is-mono" data-col="version">v2.3.4</td>
        <td class="is-muted" data-col="owner">observability</td>
        <td class="is-num">19,220</td>
        <td class="is-num">0.94%</td>
        <td class="is-num is-warn" data-value="402">402<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num is-warn">91%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:33">09:40:33</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for metrics-agg" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0318" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">6 / 6</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.71%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">metrics-agg.ap-south-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr hidden>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select cron-runner"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0327" aria-label="Details for cron-runner"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">cron-runner</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0327</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">ap-south-1</td>
        <td class="is-mono" data-col="version">v1.0.9</td>
        <td class="is-muted" data-col="owner">platform</td>
        <td class="is-num">112</td>
        <td class="is-num">0.00%</td>
        <td class="is-num" data-value="51">51<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">6%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:29">09:40:29</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for cron-runner" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0327" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">3 / 3</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">cron-runner.ap-south-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr hidden>
        <td class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select webhook-relay"></td>
        <td class="is-frozen" data-col="service"><button class="dd-data-table__expand" type="button" aria-expanded="false" aria-controls="dt-svc-0331" aria-label="Details for webhook-relay"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button><a href="#">webhook-relay</a></td>
        <td class="is-mono is-muted" data-col="id">svc-0331</td>
        <td data-col="status" data-value="ok"><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
        <td data-col="region">ap-south-1</td>
        <td class="is-mono" data-col="version">v2.7.1</td>
        <td class="is-muted" data-col="owner">growth</td>
        <td class="is-num">4,380</td>
        <td class="is-num">0.21%</td>
        <td class="is-num" data-value="117">117<span class="dd-data-table__unit">ms</span></td>
        <td class="is-num">38%</td>
        <td class="is-num is-muted" data-value="2026-10-30T09:40:21">09:40:21</td>
        <td class="is-actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" aria-label="Actions for webhook-relay" data-dd-menu="dt-row-menu" data-dd-placement="bottom-end" aria-haspopup="menu" aria-expanded="false" aria-controls="dt-row-menu"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-more"/></svg></button></td>
      </tr>
      <tr class="dd-data-table__detail" id="dt-svc-0331" hidden>
        <td colspan="13"><div class="dd-data-table__detail-body">
          <dl class="dd-data-table__facts">
            <div><dt>Last deploy</dt><dd><span class="dd-mono">3f0d8b1</span> · Bump runtime to node 22.12</dd></div>
            <div><dt>Instances</dt><dd class="dd-mono">6 / 6</dd></div>
            <div><dt>Uptime (30d)</dt><dd class="dd-mono">99.99%</dd></div>
            <div><dt>Endpoint</dt><dd class="dd-mono">webhook-relay.ap-south-1.cxkw.dev</dd></div>
          </dl>
        </div></td>
      </tr>
      <tr class="dd-data-table__empty-row" hidden>
        <td colspan="13"><div class="dd-data-table__empty">
          <span class="dd-data-table__empty-icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg></span>
          <p class="dd-data-table__empty-title">No services match <span data-dd-data-table-query></span></p>
          <p>Try another name or region, or clear the filters.</p>
          <div class="dd-row"><button class="dd-btn dd-btn--secondary dd-btn--sm" type="button" data-dd-data-table-reset>Clear filters</button></div>
        </div></td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="dd-data-table__footer" data-dd-pagination data-total="12">
    <label class="dd-pagination__size">Rows per page
      <span class="dd-pagination__select"><select aria-label="Rows per page"><option selected>10</option><option>25</option><option>50</option></select><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></span>
    </label>
    <nav class="dd-pagination dd-pagination--compact" aria-label="Pagination">
      <span class="dd-pagination__range"><b>1–10</b> of 12</span>
      <button class="dd-pagination__step" type="button" aria-label="Previous page" aria-disabled="true"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <button class="dd-pagination__step" type="button" aria-label="Next page"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </nav>
  </div>
  <div class="dd-menu" id="dt-row-menu" role="menu" aria-label="Service actions" hidden>
    <button class="dd-menu__item" role="menuitem" type="button" data-dd-toast="Opening logs" data-dd-toast-description="The log viewer opens filtered to this service."><span class="dd-menu__body">View logs</span></button>
    <button class="dd-menu__item" role="menuitem" type="button" data-dd-toast="Restart queued" data-dd-toast-description="Instances restart one at a time." data-dd-toast-intent="ok"><span class="dd-menu__body">Restart</span></button>
    <button class="dd-menu__item" role="menuitem" type="button" data-dd-toast="Traffic paused" data-dd-toast-description="The service stops taking new requests." data-dd-toast-intent="warn"><span class="dd-menu__body">Pause traffic</span></button>
    <hr class="dd-menu__sep">
    <button class="dd-menu__item dd-menu__item--danger" role="menuitem" type="button" data-dt-remove><span class="dd-menu__body">Remove from fleet</span></button>
  </div>
</div>
```

## Anatomy

- Toolbar: search on the left, filter chips, then the row count, column toggle and table-level actions on the right. It wraps on narrow screens; search takes the first line.
- Bulk bar: appears under the toolbar while rows are selected, in the accent tone, with the count and the actions that apply to the selection.
- Scroll container: `.dd-data-table__scroll` scrolls both ways. The header sticks to its top; the row-number, select and first data columns stick to its left and cast a soft edge once you scroll. Its height caps at `--dd-data-table-height` (default `70vh`); see Height to drop the cap.
- Footer: page size and the pagination range. Give it `data-dd-pagination` and the table pages its rows in the browser; leave it off when the server pages.

## Columns and cells

Text columns align left; figures align right in DM Mono with tabular digits (`.is-num`) so magnitudes line up. Units sit in a muted `.dd-data-table__unit`. Cells past a threshold take `.is-warn` or `.is-bad`, and status cells pair a dot with a word.

## Grouped rows and row numbers

Group rows are a tonal band whose label stays visible while the table scrolls sideways. Sorting keeps rows inside their group. Row numbers (`.dd-data-table__rownum`) make a read-only table feel like a sheet. This one is `--compact`.

Try it: sort Req / min or p95. Rows reorder inside their region; the group bands stay put.

```html
<div class="dd-data-table dd-data-table--compact" data-dd-data-table>
  <div class="dd-data-table__scroll" tabindex="0" role="region" aria-label="Services by region">
    <table class="dd-data-table__table">
      <thead>
      <tr>
        <th class="dd-data-table__rownum"><span class="dd-visually-hidden">Row</span></th>
        <th class="is-frozen">Service</th>
        <th>Status</th>
        <th class="is-num" data-col="req" aria-sort="none"><button class="dd-data-table__sort" type="button">Req / min<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th class="is-num" data-col="p95" aria-sort="none"><button class="dd-data-table__sort" type="button">p95<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
        <th class="is-num">Updated</th>
      </tr>
    </thead>
      <tbody>
        <tr class="dd-data-table__group"><th colspan="6" scope="colgroup"><span class="dd-data-table__group-label"><b>us-east-1</b><span class="dd-data-table__group-count">4 services</span></span></th></tr>
        <tr>
          <td class="dd-data-table__rownum">1</td>
          <td class="is-frozen">auth-gateway</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">12,480</td>
          <td class="is-num" data-value="84">84<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:41:07</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">2</td>
          <td class="is-frozen">billing-worker</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">3,212</td>
          <td class="is-num" data-value="142">142<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:41:02</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">3</td>
          <td class="is-frozen">search-indexer</td>
          <td><span class="dd-data-table__status" data-status="warn">Degraded</span></td>
          <td class="is-num">8,904</td>
          <td class="is-num is-warn" data-value="611">611<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:55</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">4</td>
          <td class="is-frozen">edge-cache</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">41,337</td>
          <td class="is-num" data-value="12">12<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:51</td>
        </tr>
        <tr class="dd-data-table__group"><th colspan="6" scope="colgroup"><span class="dd-data-table__group-label"><b>eu-west-2</b><span class="dd-data-table__group-count">4 services</span></span></th></tr>
        <tr>
          <td class="dd-data-table__rownum">5</td>
          <td class="is-frozen">ledger-sync</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">1,048</td>
          <td class="is-num" data-value="96">96<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:48</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">6</td>
          <td class="is-frozen">notify-fanout</td>
          <td><span class="dd-data-table__status" data-status="bad">Down</span></td>
          <td class="is-num">0</td>
          <td class="is-num"><span class="is-faint">—</span></td>
          <td class="is-num is-muted">09:39:12</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">7</td>
          <td class="is-frozen">mail-relay</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">2,771</td>
          <td class="is-num" data-value="133">133<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:40</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">8</td>
          <td class="is-frozen">session-store</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">18,452</td>
          <td class="is-num" data-value="9">9<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:38</td>
        </tr>
        <tr class="dd-data-table__group"><th colspan="6" scope="colgroup"><span class="dd-data-table__group-label"><b>ap-south-1</b><span class="dd-data-table__group-count">4 services</span></span></th></tr>
        <tr>
          <td class="dd-data-table__rownum">9</td>
          <td class="is-frozen">image-resizer</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">6,502</td>
          <td class="is-num" data-value="188">188<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:37</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">10</td>
          <td class="is-frozen">metrics-agg</td>
          <td><span class="dd-data-table__status" data-status="warn">Degraded</span></td>
          <td class="is-num">19,220</td>
          <td class="is-num is-warn" data-value="402">402<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:33</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">11</td>
          <td class="is-frozen">cron-runner</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">112</td>
          <td class="is-num" data-value="51">51<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:29</td>
        </tr>
        <tr>
          <td class="dd-data-table__rownum">12</td>
          <td class="is-frozen">webhook-relay</td>
          <td><span class="dd-data-table__status" data-status="ok">Healthy</span></td>
          <td class="is-num">4,380</td>
          <td class="is-num" data-value="117">117<span class="dd-data-table__unit">ms</span></td>
          <td class="is-num is-muted">09:40:21</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Loading

Keep the header and draw skeleton bars where values will land, with widths that vary like real data. Set `aria-busy="true"` on the region.

```html
<div class="dd-data-table">
  <div class="dd-data-table__scroll" role="region" aria-label="Services" aria-busy="true">
    <table class="dd-data-table__table">
      <thead>
      <tr>
        <th class="dd-data-table__select"><input class="dd-data-table__check" type="checkbox" aria-label="Select all" disabled></th>
        <th class="is-frozen">Service</th>
        <th>Status</th>
        <th>Region</th>
        <th class="is-num">Req / min</th>
        <th class="is-num">p95</th>
      </tr>
    </thead>
      <tbody>
        <tr>
          <td class="dd-data-table__select"><span class="dd-data-table__skeleton dd-data-table__skeleton--box"></span></td>
          <td class="is-frozen"><span class="dd-data-table__skeleton" style="--w: 112px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 64px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 72px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 48px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 40px"></span></td>
        </tr>
        <tr>
          <td class="dd-data-table__select"><span class="dd-data-table__skeleton dd-data-table__skeleton--box"></span></td>
          <td class="is-frozen"><span class="dd-data-table__skeleton" style="--w: 96px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 64px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 72px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 48px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 40px"></span></td>
        </tr>
        <tr>
          <td class="dd-data-table__select"><span class="dd-data-table__skeleton dd-data-table__skeleton--box"></span></td>
          <td class="is-frozen"><span class="dd-data-table__skeleton" style="--w: 128px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 64px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 72px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 48px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 40px"></span></td>
        </tr>
        <tr>
          <td class="dd-data-table__select"><span class="dd-data-table__skeleton dd-data-table__skeleton--box"></span></td>
          <td class="is-frozen"><span class="dd-data-table__skeleton" style="--w: 84px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 64px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 72px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 48px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 40px"></span></td>
        </tr>
        <tr>
          <td class="dd-data-table__select"><span class="dd-data-table__skeleton dd-data-table__skeleton--box"></span></td>
          <td class="is-frozen"><span class="dd-data-table__skeleton" style="--w: 104px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 64px"></span></td>
          <td><span class="dd-data-table__skeleton" style="--w: 72px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 48px"></span></td>
          <td class="is-num"><span class="dd-data-table__skeleton" style="--w: 40px"></span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Empty and filtered

When filters hide everything, say so, name the query and offer to clear the filters. The behaviour fills in the query and shows `.dd-data-table__empty-row` for you.

Try it: remove the region chip, then press Clear filters.

```html
<div class="dd-data-table" data-dd-data-table>
  <div class="dd-data-table__toolbar">
    <label class="dd-data-table__search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><input type="search" value="edge-proxy" aria-label="Filter services" data-dd-data-table-search></label>
    <button class="dd-data-table__chip" type="button" aria-pressed="true" data-dd-data-table-filter="region=eu-west-2" data-dd-data-table-removable aria-label="Remove filter: region eu-west-2">Region <b>eu-west-2</b><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button>
    <div class="dd-data-table__tools"><span class="dd-data-table__count" data-dd-data-table-count="services">0 of 3 services</span></div>
  </div>
  <div class="dd-data-table__scroll" role="region" aria-label="Services">
    <table class="dd-data-table__table">
      <thead>
      <tr>
        <th class="is-frozen">Service</th>
        <th>Status</th>
        <th data-col="region">Region</th>
        <th class="is-num">Req / min</th>
      </tr>
    </thead>
      <tbody>
        <tr><td class="is-frozen">auth-gateway</td><td><span class="dd-data-table__status" data-status="ok">Healthy</span></td><td data-col="region">us-east-1</td><td class="is-num">12,480</td></tr>
        <tr><td class="is-frozen">billing-worker</td><td><span class="dd-data-table__status" data-status="ok">Healthy</span></td><td data-col="region">us-east-1</td><td class="is-num">3,212</td></tr>
        <tr><td class="is-frozen">search-indexer</td><td><span class="dd-data-table__status" data-status="warn">Degraded</span></td><td data-col="region">us-east-1</td><td class="is-num">8,904</td></tr>
        <tr class="dd-data-table__empty-row">
          <td colspan="4"><div class="dd-data-table__empty">
            <span class="dd-data-table__empty-icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-filter"/></svg></span>
            <p class="dd-data-table__empty-title">No services match <span data-dd-data-table-query>“edge-proxy”</span></p>
            <p>Nothing in eu-west-2 has that name. Check the spelling or search every region.</p>
            <div class="dd-row"><button class="dd-btn dd-btn--secondary dd-btn--sm" type="button" data-dd-data-table-reset>Clear filters</button></div>
          </div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

With no data at all, explain what will appear and give the one action that creates it. `--card` puts the whole table on `--dd-surface`.

```html
<div class="dd-data-table dd-data-table--card">
  <div class="dd-data-table__scroll" role="region" aria-label="Webhooks">
    <table class="dd-data-table__table">
      <thead>
      <tr>
        <th class="is-frozen">Endpoint</th>
        <th>Events</th>
        <th class="is-num">Success</th>
        <th class="is-num">Last delivery</th>
      </tr>
    </thead>
      <tbody>
        <tr class="dd-data-table__empty-row">
          <td colspan="4"><div class="dd-data-table__empty">
            <span class="dd-data-table__empty-icon"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-link"/></svg></span>
            <p class="dd-data-table__empty-title">No webhooks yet</p>
            <p>Send deploy and incident events from billing-worker to your own endpoint.</p>
            <div class="dd-row"><button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-dd-toast="Add webhook" data-dd-toast-description="In an app this opens the new-webhook form."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-plus"/></svg><span>Add webhook</span></button></div>
          </div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Height

By default the scroll area caps at `70vh` and scrolls inside the page, so the header stays pinned while the rows scroll. In an app, where the page already scrolls, that is a scroller inside a scroller. Two ways out:

- `style="--dd-data-table-height: none"` drops the cap: the table grows with its rows and the page does all the scrolling (wide tables still scroll sideways). The header then scrolls away with the page, so page the rows.
- `.dd-data-table--fill` takes the height its parent gives it — a flex column, or a box with a set height — and the scroll area gets what the toolbar and footer leave. The table body is the only scroller and the header stays pinned. In an app shell, give the `.dd-app-shell__page` that holds it `height: 100%`, so the page fills the content area and the table fills the rest of the page.

Inside `.dd-app-shell`, whose content area is a plain `--dd-bg`, the cells drop the page grain so the table reads as the same surface (in dusk the grain would make it a lighter, textured block). The shell does this by setting `--dd-data-table-grain: none`; set it to `var(--dd-grain)` on a shell that keeps the grained page behind it.

A --fill table in a 340px box. Created shows a short date but sorts by its ISO data-value, so last year’s deploy goes last; Build reads “18.2 s” as a number.

```html
<div style="display: flex; flex-direction: column; height: 340px">
  <div class="dd-data-table dd-data-table--compact dd-data-table--fill" data-dd-data-table>
    <div class="dd-data-table__toolbar">
      <label class="dd-data-table__search"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-search"/></svg><input type="search" placeholder="Filter deploys…" aria-label="Filter deploys" data-dd-data-table-search></label>
      <div class="dd-data-table__tools"><span class="dd-data-table__count" data-dd-data-table-count="deploys">11 deploys</span></div>
    </div>
    <div class="dd-data-table__scroll" tabindex="0" role="region" aria-label="Deploys">
      <table class="dd-data-table__table">
        <thead>
      <tr>
          <th class="is-frozen">Deploy</th>
          <th data-col="service" aria-sort="none"><button class="dd-data-table__sort" type="button">Service<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
          <th>Status</th>
          <th>Region</th>
          <th class="is-num" data-col="build" aria-sort="none"><button class="dd-data-table__sort" type="button">Build<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
          <th class="is-num" data-col="created" aria-sort="none"><button class="dd-data-table__sort" type="button">Created<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></th>
      </tr>
    </thead>
        <tbody>
          <tr>
            <td class="is-frozen is-mono">dpl_7Hq2xK9m</td>
            <td>auth-gateway</td>
            <td><span class="dd-data-table__status" data-status="ok">Ready</span></td>
            <td class="is-muted">iad1</td>
            <td class="is-num">18.2<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-10-30T09:41">Oct 30 · 09:41</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_71be09Qa</td>
            <td>billing-worker</td>
            <td><span class="dd-data-table__status" data-status="bad">Failed</span></td>
            <td class="is-muted">fra1</td>
            <td class="is-num">41.0<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-10-30T08:12">Oct 30 · 08:12</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_8f3a2cLw</td>
            <td>edge-cache</td>
            <td><span class="dd-data-table__status" data-status="ok">Ready</span></td>
            <td class="is-muted">hnd1</td>
            <td class="is-num">9.4<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-10-29T22:47">Oct 29 · 22:47</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_5c40d1Tz</td>
            <td>dockey-ui</td>
            <td><span class="dd-data-table__status" data-status="info">Building</span></td>
            <td class="is-muted">iad1</td>
            <td class="is-num"><span class="is-faint">—</span></td>
            <td class="is-num is-muted" data-value="2026-10-29T17:03">Oct 29 · 17:03</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_2e91aaRk</td>
            <td>search-indexer</td>
            <td><span class="dd-data-table__status" data-status="ok">Ready</span></td>
            <td class="is-muted">fra1</td>
            <td class="is-num">63.5<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-10-28T11:55">Oct 28 · 11:55</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_44c18bPe</td>
            <td>ai-focus</td>
            <td><span class="dd-data-table__status" data-status="ok">Ready</span></td>
            <td class="is-muted">iad1</td>
            <td class="is-num">22.8<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-10-21T06:58">Oct 21 · 06:58</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_0b7e52Ns</td>
            <td>notify-fanout</td>
            <td><span class="dd-data-table__status" data-status="bad">Failed</span></td>
            <td class="is-muted">fra1</td>
            <td class="is-num">12.1<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-10-09T14:20">Oct 9 · 14:20</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_6a3f90Cu</td>
            <td>leetnode</td>
            <td><span class="dd-data-table__status" data-status="ok">Ready</span></td>
            <td class="is-muted">hnd1</td>
            <td class="is-num">31.7<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-09-30T05:42">Sep 30 · 05:42</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_3c71e4Vd</td>
            <td>insomnia</td>
            <td><span class="dd-data-table__status" data-status="ok">Ready</span></td>
            <td class="is-muted">iad1</td>
            <td class="is-num">15.0<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-09-04T16:15">Sep 4 · 16:15</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_1f88d2Jb</td>
            <td>image-resizer</td>
            <td><span class="dd-data-table__status" data-status="muted">Rolled back</span></td>
            <td class="is-muted">fra1</td>
            <td class="is-num">27.3<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2026-08-17T03:02">Aug 17 · 03:02</td>
          </tr>
          <tr>
            <td class="is-frozen is-mono">dpl_5e2c07Xo</td>
            <td>ledger-sync</td>
            <td><span class="dd-data-table__status" data-status="ok">Ready</span></td>
            <td class="is-muted">hnd1</td>
            <td class="is-num">19.9<span class="dd-data-table__unit">s</span></td>
            <td class="is-num is-muted" data-value="2025-12-31T23:47">Dec 31, 2025 · 23:47</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-data-table` | Root: a column of toolbar, bulk bar, scroll container and footer. Add `data-dd-data-table` for behaviour. |
| `.dd-data-table__toolbar` | Wrapping row. Holds `__search` (label + icon + input), `__chip`s and `__tools` (pushed right). |
| `.dd-data-table__chip` | Filter chip. `aria-pressed="true"` or `.is-active` for an applied filter; `__chip-dot` adds a status dot (`--_c`). |
| `.dd-data-table__count` | Row count, mono. |
| `.dd-data-table__menu` | Dropdown built on `<details>` (column toggle, filter list); `__menu-panel` floats, `__menu-title` heads it. `__menu--start` opens the panel from its left edge, for a menu at the start of the toolbar. |
| `.dd-data-table__bulk` | Bulk-action bar (`__bulk-count`, `__bulk-end`); hidden with the `hidden` attribute while nothing is selected. |
| `.dd-data-table__scroll` | Scroll container (both axes). Give it `tabindex="0"`, `role="region"` and an `aria-label`. |
| `.dd-data-table__table` | The `<table>`. |
| `.dd-data-table__sort` | Button inside a sortable `<th aria-sort>`, with a `chevron-down` icon. |
| `.dd-data-table__rownum · __select · .is-frozen` | Sticky columns, left to right: row numbers, the checkbox column, then the first data column. |
| `.dd-data-table__check` | Restyled native checkbox (checked, indeterminate and disabled). |
| `td.is-num · .is-mono` | Figures right-aligned in mono; IDs and hashes in mono. |
| `td.is-muted · .is-faint · .is-strong` | Secondary text; a placeholder tone for empty values (the — dash), never for text people must read; emphasis. |
| `td.is-shrink · .is-actions` | Shrink-to-fit column; a right-aligned cell of row actions. |
| `td.is-warn · td.is-bad` | Tint a figure past its threshold. |
| `.dd-data-table__status[data-status]` | Dot + label: `ok · warn · bad · info · muted`. |
| `.dd-data-table__unit` | Muted unit after a figure (“ms”). |
| `.dd-data-table__expand` | Row disclosure button (`aria-expanded`, `aria-controls`). `__expand-spacer` holds its place in rows that have no detail. |
| `.dd-data-table__detail` | The detail row (`__detail-body`, `__facts`); its body stays in view while scrolling sideways. |
| `.dd-data-table__group` | Group header row (`__group-label`, `__group-count`); put a `<th colspan scope="colgroup">` in it. |
| `.dd-data-table__skeleton (--box)` | Shimmering placeholder bar; width via `--w`. |
| `.dd-data-table__empty-row + __empty` | Empty / filtered state row (`__empty-icon`, `__empty-title`). |
| `.dd-data-table__footer` | Footer row for page size and pagination. |
| `.dd-data-table--compact · --roomy` | Density. |
| `.dd-data-table--card` | The whole table on `--dd-surface`. |
| `.dd-data-table--fill` | Fills the height its parent gives it (a flex column or a box with a set height); the scroll area takes the rest, uncapped, so it is the only scroller. |
| `--dd-data-table-height` | Scroll height cap (default `70vh`). `none`: no cap, the table grows and the page scrolls. |
| `--dd-data-table-bg` | The opaque cell colour that keeps sticky cells solid (default `--dd-bg`). Set it when the table sits on something other than the page. |
| `--dd-data-table-grain` | The texture on cells (default the page grain; `none` inside `.dd-app-shell` and on `--card`). |

## Behaviour

Load `dawn-and-dusk.js` and add `data-dd-data-table` to the root. Everything is delegated, so rows added later work too.

| class / attribute | what it does |
|---|---|
| `th[aria-sort] .dd-data-table__sort` | Click cycles `none → ascending → descending → none` and sorts the rows by each cell’s `data-value`, else its text. Two values compare as numbers when both are fully numeric (`1,240`, `0.5%`, `-3`), as times when both are ISO dates (`2026-10-30`, `2026-10-30T09:41`), else as text with numbers in order (`v2` before `v10`). In an `.is-num` column (or a header with `data-type="number"`), “84 ms” still reads as 84 and a dash counts as blank. Blanks sort last; groups and detail rows stay together. |
| `thead .dd-data-table__check` | Selects or clears every visible row; shows indeterminate when some are selected. Rows whose box is `disabled` are skipped and don’t count toward its state. |
| `tbody .dd-data-table__check` | Selects the row (`.is-selected`). Shift-click selects a range (skipping disabled boxes). A `disabled` box is never changed by the table — select all, ranges and Clear leave it as it is. |
| `[data-dd-data-table-selected]` | Receives the selected count. `.dd-data-table__bulk` is shown while it is above zero; if it hides with focus inside (a bulk action removed the rows), focus moves to the select-all box. |
| `[data-dd-data-table-clear]` | Clears the selection and moves focus to the select-all box. |
| `.dd-data-table__expand` | Toggles `aria-expanded` and the `hidden` detail row named by `aria-controls`. |
| `[data-dd-data-table-search]` | Filters rows by their text as you type. |
| `[data-dd-data-table-filter="col=value"]` | Toggle chip (`aria-pressed`) or checkbox (e.g. in a `__menu`). Matches cells with `data-col="col"` by `data-value` or text. Same column = any, different columns = all. |
| `[data-dd-data-table-filter-label="col"]` | Shows `all`, the one value or “2 selected” for that column, and marks its chip `.is-active`. |
| `[data-dd-data-table-removable]` | On a filter chip: it disappears once cleared (focus moves to the search). |
| `[data-dd-data-table-count="noun"]` | Shows “12 services”, or “3 of 12 services” while filtered. |
| `[data-dd-data-table-query]` | Receives the quoted search text in the empty state. |
| `[data-dd-data-table-reset]` | Clears the search and every filter, and returns focus to the search. |
| `[data-dd-pagination] inside the root` | Pages the matching rows in the browser (see pagination): `data-total` is kept in step, the page-size select and arrows move through the rows. Filtering goes back to page 1; sorting keeps the page. |
| `[data-dd-data-table-column="col"]` | Checkbox that shows / hides the column whose header has `data-col="col"`. |
| `Rows added or removed` | Picked up on their own, including a replaced `<tbody>` (count, filters, hidden columns, empty row, pages and selection refresh on the next frame); `dd.dataTable.refresh(root)` does it by hand. |
| `Focus on removed rows` | When the row holding focus is removed (a ⋯ menu’s Remove, a bulk action, a framework re-render), focus moves to the first control of the next shown row, else the previous one, else the select-all box, else the scroll region, without scrolling the page. Only focus still in the table moves: once you’ve clicked or tabbed elsewhere, removing a row leaves it alone. A row that is only moved keeps its focus. Try it: a row’s ⋯ → Remove from fleet. |
| `.is-scrolled-x · .is-scrolled-y` | Set on the root while the scroll area is scrolled sideways / down; they draw the frozen column’s edge and the header’s shadow. |
| `Keyboard` | Every control is a native button, checkbox or input, so Tab, Enter and Space work throughout. The scroll region is focusable, so arrow keys scroll it. Esc closes a column or filter menu and returns focus to its button; a click outside closes it too. |
| `Events` | `dd:sort` `{ column, direction, index }` after a header sorts; `dd:selectionchange` `{ count, rows }` after the selection changes; `dd:pagechange` (from the pager) `{ page, pages, pageSize, total, from, to }`. All bubble from the root, so a server-backed table can listen and fetch. |

## Guidelines

Do:
- Freeze the column that names the row so it stays in view while scrolling sideways.
- Right-align figures, use mono and keep one unit per column.
- Show the selected count and only the bulk actions that apply to it.
- Keep sorting, filtering and selection state in the URL in real apps.

Don't:
- Don’t wrap cells; truncate and show the rest in the expanded row.
- Don’t hide the header or the count while filtering.
- Don’t paint whole rows red; mark the cell and the status.
- Don’t put primary buttons inside rows. Use a ghost “more” menu.

