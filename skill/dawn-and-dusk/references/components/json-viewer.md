# json viewer — `json-viewer`

A collapsible tree for API responses, deploy records and config. Values keep their type colour, containers show how much they hold, and any node’s path is one click from the clipboard.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/json-viewer

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Deploy record

Two levels open by default. Click a row to select it — the bar shows its path, ready to copy. Use the chevrons (or the arrow keys) to open and close.

```html
<div class="dd-json-viewer" data-dd-json-viewer data-depth="2" aria-label="Deploy dpl_7Hq2xK9m">
  <script type="application/json">{
  "id": "dpl_7Hq2xK9m",
  "service": "auth-gateway",
  "region": "us-east-1",
  "status": "healthy",
  "version": "3.14.0",
  "commit": {
    "sha": "9f2c41e7b0d3",
    "message": "Cache JWKS for 10 minutes and retry on 429",
    "author": "andy@cxkw.dev"
  },
  "timings": {
    "queuedMs": 412,
    "buildMs": 18240,
    "rolloutMs": 23109,
    "p95LatencyMs": 84.2
  },
  "replicas": [
    {
      "id": "auth-gw-1",
      "zone": "us-east-1a",
      "ready": true,
      "restarts": 0
    },
    {
      "id": "auth-gw-2",
      "zone": "us-east-1b",
      "ready": true,
      "restarts": 1
    },
    {
      "id": "auth-gw-3",
      "zone": "us-east-1c",
      "ready": false,
      "restarts": 4
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "LOG_LEVEL": "info",
    "jwks.ttl": 600
  },
  "flags": [
    "edge-cache",
    "rate-limit-v2"
  ],
  "rollbackOf": null,
  "finishedAt": "2026-10-30T09:41:07.214Z"
}</script>
</div>
```

## Collapsed & capped

`data-depth="1"` opens only the root, so long arrays read as a list of previews. Cap the height with `--dd-json-viewer-height`; the tree scrolls inside.

```html
<div class="dd-json-viewer" data-dd-json-viewer data-depth="1" aria-label="Services" style="--dd-json-viewer-height: 300px">
  <script type="application/json">[
  {
    "name": "auth-gateway",
    "region": "us-east-1",
    "rpm": 12480,
    "healthy": true
  },
  {
    "name": "billing-worker",
    "region": "us-east-1",
    "rpm": 3212,
    "healthy": true
  },
  {
    "name": "edge-cache",
    "region": "eu-west-2",
    "rpm": 41337,
    "healthy": true
  },
  {
    "name": "notify-fanout",
    "region": "eu-west-2",
    "rpm": 0,
    "healthy": false,
    "lastError": "ECONNRESET upstream smtp-relay"
  },
  {
    "name": "metrics-agg",
    "region": "ap-south-1",
    "rpm": 19220,
    "healthy": true
  }
]</script>
</div>
```

## Rendering from script

Put the JSON in an inline `<script type="application/json">` and the viewer renders on load. For data you fetch at runtime, call `dd.jsonViewer`.

```
// Render any value into an element (replaces its content).
const res = await fetch('/api/deploys/dpl_7Hq2xK9m');
dd.jsonViewer(document.querySelector('#deploy'), await res.json(), { depth: 1 });

// Viewers added to the page later: render every unrendered [data-dd-json-viewer].
dd.jsonViewer.init();
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-json-viewer` | Container on a tonal surface. Add `data-dd-json-viewer` to render from its JSON script. |
| `.dd-json-viewer__bar` | Path of the selected node (`__path-value`), a copy-path button and Expand all / Collapse all. |
| `.dd-json-viewer__tree` | The `role="tree"` list. Scrolls when `--dd-json-viewer-height` is set. |
| `.dd-json-viewer__node` | A `treeitem`; containers carry `aria-expanded`, the selected node `aria-selected`. |
| `.dd-json-viewer__row` | One line: toggle, key or index, value / brace, preview and count. |
| `.dd-json-viewer__key / __index` | An object key (`--dd-json-key`) or a muted array index. |
| `.dd-json-viewer__value--string / --number / --boolean / --null` | Type colours. Override with `--dd-json-string`, `--dd-json-number`, `--dd-json-boolean`, `--dd-json-null`. |
| `.dd-json-viewer__count / __preview` | Child count (“3 items”, “6 keys”) and the `{…}` shown while collapsed. |
| `.dd-json-viewer__group` | Nested `role="group"` list with a faint indent guide. |
| `.dd-json-viewer__error` | Shown instead of the tree when the inline JSON can’t be parsed. |

## Behaviour

| class / attribute | what it does |
|---|---|
| `data-dd-json-viewer` | Renders the tree from the inline `<script type="application/json">` on load. |
| `data-depth="2"` | Levels open at first (root is level 0). Default 2. |
| `aria-label` | Names the tree for screen readers (“Deploy dpl_7Hq2xK9m”). |
| `dd.jsonViewer(el, data, { depth, label })` | Renders a value into `el`, replacing its content. `dd.jsonViewer.init()` renders viewers added later. |
| `Expand all / Collapse all` | Bar buttons: open every container, or close all but the root. |
| `↑ / ↓` | Previous / next visible node. Selection follows focus and updates the path. |
| `→ / ←` | Expand, or move to the first child · collapse, or move to the parent. |
| `Enter / Space` | Toggle the focused container. |
| `Home / End` | First / last visible node. |

## Guidelines

Do:
- Open just enough levels to show the shape; let people dig.
- Cap the height in panels and drawers so the page doesn’t jump.
- Use the copied path in docs and bug reports — it is unambiguous.

Don't:
- Don’t use it for data people compare across records — that is a table.
- Don’t render huge payloads unpaged; summarise or page them first.
- Don’t hide `null` fields; their absence is information.

