# dawn & dusk components (v0.3.2)

Generated from `ds/components/*.css`: what each component is, its classes and its `data-dd-*` hooks. Every component is plain
HTML + these classes; behaviours are opt-in `data-dd-*` attributes handled by `dawn-and-dusk.js`.

**For markup, read `components/<name>.md`** next to this file: the exact, working HTML of every docs example, the class
table and the guidelines. Live demos: https://cxkw-dev.github.io/dawn-and-dusk/components/<name>

Index: [accordion](#accordion) · [alert](#alert) · [app-shell](#app-shell) · [avatar](#avatar) · [badge](#badge) · [banner](#banner) · [breadcrumbs](#breadcrumbs) · [button-group](#button-group) · [button](#button) · [callout](#callout) · [card](#card) · [chart](#chart) · [checkbox](#checkbox) · [chip](#chip) · [code](#code) · [combobox](#combobox) · [command-palette](#command-palette) · [data-table](#data-table) · [date-picker](#date-picker) · [description-list](#description-list) · [dialog](#dialog) · [divider](#divider) · [drawer](#drawer) · [empty-state](#empty-state) · [file-upload](#file-upload) · [form-field](#form-field) · [form-layout](#form-layout) · [guide-cue](#guide-cue) · [json-viewer](#json-viewer) · [kbd](#kbd) · [link](#link) · [loader](#loader) · [log-viewer](#log-viewer) · [logo](#logo) · [menu](#menu) · [page-header](#page-header) · [pagination](#pagination) · [popover](#popover) · [progress](#progress) · [radio](#radio) · [segmented-control](#segmented-control) · [select](#select) · [sheet](#sheet) · [side-nav](#side-nav) · [skeleton](#skeleton) · [slider](#slider) · [spinner](#spinner) · [stat](#stat) · [status-dot](#status-dot) · [stepper](#stepper) · [switch](#switch) · [table](#table) · [tabs](#tabs) · [text-input](#text-input) · [textarea](#textarea) · [timeline](#timeline) · [toast](#toast) · [tooltip](#tooltip) · [top-bar](#top-bar)

## accordion

Accordion — native <details>/<summary>, no JS. Sections stack with hairlines between them; the chevron turns on open, and the body eases open where the browser supports animating to auto. Group items with the native name="…" attribute so only one stays open. Variants: --boxed (tonal fill) and .dd-expand (an expandable card).

Classes: `.dd-expand` `.dd-accordion` `.dd-accordion__item` `.dd-accordion__summary` `.dd-expand__summary` `.dd-accordion__title` `.dd-accordion__meta` `.dd-accordion__chevron` `.dd-expand__chevron` `.dd-accordion__body` `.dd-accordion--icons` `.dd-accordion--boxed` `.dd-expand__lead` `.dd-expand__titles` `.dd-expand__title` `.dd-expand__meta` `.dd-expand__side` `.dd-expand__status` `.dd-expand__body` `.dd-expand__dl`

Markup: `references/components/accordion.md`

## alert

Alert — "Soft fill · with action". An inline status message: icon, title, description, text actions on the right and an optional dismiss button ([data-dd-dismiss], see behaviors/dismiss.js). Intents: info (default) · ok · warn · bad. Dawn: a soft 14% wash of the status colour over the page. Dusk: a SOLID fill of 30% status over the surface and no border, so it never goes muddy. The alert is its own size container: under ~460px the actions drop under the text.

Classes: `.dd-alert` `.dd-alert--info` `.dd-alert--ok` `.dd-alert--warn` `.dd-alert--bad` `.dd-alert__icon` `.dd-alert__body` `.dd-alert__title` `.dd-alert__text` `.dd-alert__actions` `.dd-alert__action` `.dd-alert__action--secondary` `.dd-alert__dismiss` `.dd-alert--compact`

Attributes/states: `data-dd-dismiss`

Markup: `references/components/alert.md`

## app-shell

App shell — the page layout: the side nav runs the full height on the left; the top bar and the content share the rest. Two ways to scroll. By default the shell is the viewport (--dd-app-shell-h: 100dvh, or a height to fit a frame) and only the content area scrolls inside it. With --page the document scrolls: the shell grows with its content while the side nav and the top bar stick to the top of the viewport. The shell is a size container named dd-app-shell: under 768px of it (900px with --offcanvas-md, 1024px with --offcanvas-lg) the side nav goes off-canvas and the top bar's menu button opens it; a .dd-side-nav--offcanvas nav stays off-canvas at every width. Its rules reach only its own side nav and top bar (child combinators), never the components in its content.

Classes: `.dd-app-shell` `.dd-app-shell__main` `.dd-app-shell__content` `.dd-app-shell__page` `.dd-app-shell__page--narrow` `.dd-app-shell--page` `.dd-app-shell--offcanvas-lg` `.dd-app-shell--offcanvas-md`

Works with: `.dd-side-nav` `.dd-top-bar`

Markup: `references/components/app-shell.md`

## avatar

Avatar — a person or project. Initials on a Color set wash (the same recipe as the Soft wash chips: 30% colour over the page, deep text in the same hue), or a photo. Sizes xs · sm · md (default) · lg · xl, round or square. Groups overlap with a ring in the page colour (set --dd-avatar-ring to the surface colour when they sit on one; the initials wash mixes over it too) and end in a "+3" overflow. A .dd-status-dot inside pins to the bottom-right corner.

Classes: `.dd-avatar` `.dd-avatar--set-1` `.dd-avatar--set-2` `.dd-avatar--set-3` `.dd-avatar--set-4` `.dd-avatar--set-5` `.dd-avatar--set-6` `.dd-avatar--set-7` `.dd-avatar--set-8` `.dd-avatar--xs` `.dd-avatar--sm` `.dd-avatar--md` `.dd-avatar--lg` `.dd-avatar--xl` `.dd-avatar--square` `.dd-avatar--more` `.dd-avatar-group` `.dd-avatar-label` `.dd-avatar-label__text`

Works with: `.dd-status-dot`

Attributes/states: `aria-expanded`

Markup: `references/components/avatar.md`

## badge

Badge — "Micro caps · roomy family". Tiny tracked uppercase labels with generous padding, for status and metadata. Styles: soft (default) · solid · outline · dot · ghost. Intents: neutral (default) · accent · ok · warn · bad · info. Sizes: sm (default) · md. Optically centred: Figtree's caps sit exactly in the middle of a line-height:1 box, so the block padding is trimmed by the half-leading (.15em) and the trailing letter-spacing is taken off the end padding.

Classes: `.dd-badge` `.dd-badge--neutral` `.dd-badge--accent` `.dd-badge--ok` `.dd-badge--warn` `.dd-badge--bad` `.dd-badge--info` `.dd-badge--soft` `.dd-badge--solid` `.dd-badge--outline` `.dd-badge--ghost` `.dd-badge--dot` `.dd-badge--md` `.dd-badge__count` `.dd-badge--count` `.dd-badge--corner`

Works with: `.dd-btn`

Markup: `references/components/badge.md`

## banner

Banner — a page-level message across the full width, above the app chrome. Same soft fill as the alert: a 14% status wash over the page in dawn, a SOLID 30% status fill over the surface in dusk, never a border. Content is centred on wide screens; the banner is its own size container, so under ~560px it left-aligns and the actions wrap under the text. Intents: info (default) · ok · warn · bad · neutral. Dismiss with [data-dd-dismiss].

Classes: `.dd-banner` `.dd-banner--info` `.dd-banner--ok` `.dd-banner--warn` `.dd-banner--bad` `.dd-banner--neutral` `.dd-banner__inner` `.dd-banner__text` `.dd-mono` `.dd-banner__actions` `.dd-banner__action` `.dd-banner__dismiss` `.dd-banner--sticky`

Attributes/states: `data-dd-dismiss`

Markup: `references/components/banner.md`

## breadcrumbs

Breadcrumbs — a quiet trail of muted links divided by faint slashes; the current page is in ink. Long labels truncate with an ellipsis; skipped levels fold into a "…" dropdown (<details data-dd-autoclose>).

Classes: `.dd-breadcrumbs` `.dd-breadcrumbs__list` `.dd-breadcrumbs__item` `.dd-breadcrumbs__link` `.dd-mono` `.dd-breadcrumbs__more` `.dd-breadcrumbs__menu` `.dd-breadcrumbs__menu-link` `.dd-breadcrumbs--sm`

Attributes/states: `aria-current`

Markup: `references/components/breadcrumbs.md`

## button-group

Button group — attached .dd-btn's that read as one control. Borderless: buttons butt together with a 1px gap, so whatever sits behind the group draws the seam. Toggle buttons use aria-pressed. A split button pairs a main action with a narrow chevron that opens a .dd-menu.

Classes: `.dd-btn-group` `.dd-btn-group--vertical` `.dd-btn-group--block` `.dd-btn-group--split` `.dd-btn-group__caret`

Works with: `.dd-btn` `.dd-menu`

Attributes/states: `aria-pressed` `aria-expanded`

Markup: `references/components/button-group.md`

## button

Button — "Solid · icon first". Primary is filled with --dd-primary (Golden hour apricot); secondary is a tonal fill; ink, ghost, danger and link cover the rest. Icons lead the label. Sizes: sm · md (default) · lg; plus icon-only, block, disabled and loading (.is-loading + .dd-btn__spinner).

Classes: `.dd-btn__spinner` `.dd-btn` `.dd-btn--icon` `.dd-btn--primary` `.dd-btn--secondary` `.dd-btn--ink` `.dd-btn--ghost` `.dd-btn--danger` `.dd-btn--link` `.dd-btn--sm` `.dd-btn--lg` `.dd-btn--block`

Attributes/states: `aria-disabled`

Markup: `references/components/button.md`

## callout

Callout — an aside for docs and long-form writing: note · tip · important · warning (· caution). Quiet on purpose: a neutral surface block that separates by tone; only the icon and the label carry the colour, so a page full of callouts stays calm in dawn and never goes muddy in dusk. Prose inside keeps its rhythm.

Classes: `.dd-callout` `.dd-callout--note` `.dd-callout--tip` `.dd-callout--important` `.dd-callout--warning` `.dd-callout--caution` `.dd-callout__title` `.dd-callout__dismiss` `.dd-callout--compact`

Markup: `references/components/callout.md`

## card

Card — "Lifted": borderless, lifted off the page by tone alone (--dd-surface on --dd-bg), no shadow. Interactive cards lift a tone toward ink on hover — tone only, no edge. Variants: media · stat · row · compact. Lay several out with .dd-card-grid.

Classes: `.dd-card-grid` `.dd-card` `.dd-card__media` `.dd-card__body` `.dd-card__eyebrow` `.dd-card__title` `.dd-card__text` `.dd-card__foot` `.dd-card__meta` `.dd-card__link` `.dd-card--link` `.dd-card__media--warm` `.dd-card--inset-media` `.dd-card__stretch` `.dd-card__stat` `.dd-card__label` `.dd-card__delta` `.dd-card--stat` `.dd-card--row` `.dd-card--compact`

Works with: `.dd-app-shell`

Markup: `references/components/card.md`

## chart

Chart — conventions for SVG/HTML charts in dawn & dusk. Data is the only loud thing: recessive hairline grid, thin marks, 2px surface gaps between touching marks, 2px surface rings on markers, and text that never wears a series colour. Axes, ticks and gridlines are HTML so text stays legible at any width; lines and areas are inline SVG with preserveAspectRatio="none" + non-scaling strokes; bars are HTML so their 4px data-end radius never distorts. Series colour order (validated for separation in both modes; Golden hour is warm-only, so ≤3 series is ideal): 1 terracotta · 2 honey · 3 wine · 4 rose · 5 sand · 6 ochre · 7 apricot · 8 amber · other = tone-2.

Classes: `.dd-chart-s1` `.dd-chart-s2` `.dd-chart-s3` `.dd-chart-s4` `.dd-chart-s5` `.dd-chart-s6` `.dd-chart-s7` `.dd-chart-s8` `.dd-chart-other` `.dd-chart` `.dd-chart--bare` `.dd-chart__head` `.dd-chart__title` `.dd-chart__sub` `.dd-chart__total` `.dd-chart__legend` `.dd-chart__key` `.dd-chart__key--line` `.dd-chart__key--dot` `.dd-chart__key-value` `.dd-chart__key-share` `.dd-chart__legend--stack` `.dd-chart__frame` `.dd-chart__end` `.dd-chart__y` `.dd-chart__x` `.dd-chart__x--points` `.dd-chart__plot` `.dd-chart__plot--clean` `.dd-chart__svg` `.dd-chart__line` `.dd-chart__area` `.dd-chart__gridline` `.dd-chart__baseline` `.dd-chart__tick` `.dd-chart__marker` `.dd-chart__rule` `.dd-chart__cols` `.dd-chart__slot` `.dd-chart__col` `.dd-chart__stackcol` `.dd-chart__hits` `.dd-chart__hit` `.dd-chart__dot` `.dd-chart__tip` `.dd-chart__tip-title` `.dd-chart__tip-row` `.dd-chart__tip-row--total` `.dd-chart__hbars` `.dd-chart__hbar` `.dd-chart__hbar-label` `.dd-chart__hbar-track` `.dd-chart__hbar-fill` `.dd-chart__hbar-value` `.dd-chart__stack` `.dd-chart__seg` `.dd-chart__stack--thin` `.dd-chart__pie` `.dd-chart__donut` `.dd-chart__arc` `.dd-chart__arc-track` `.dd-chart__donut-center` `.dd-chart__empty` `.dd-chart__data` `.dd-chart__data-scroll` `.dd-chart__tip--float` `.dd-chart__data--swap` `.dd-chart__actions` `.dd-chart-dialog` `.dd-chart__placeholder`

Works with: `.dd-btn` `.dd-dialog`

Attributes/states: `data-dd-chart` `data-dd-chart-view` `aria-pressed` `data-dd-chart-expand`

Markup: `references/components/chart.md`

## checkbox

Checkbox — "Crisp checks": a 20px box with a hairline edge and tight 3px corners; checked fills with the accent and draws a thin check in --dd-on-accent. Indeterminate draws a bar. Style a native <input type="checkbox">; wrap it in a <label class="dd-checkbox"> with a label and optional description. .dd-checkbox-card turns the whole row into a selectable card.

Classes: `.dd-checkbox-card` `.dd-checkbox` `.dd-checkbox__input` `.dd-checkbox__text` `.dd-checkbox__label` `.dd-checkbox__desc` `.dd-checkbox--sm` `.dd-checkbox-group` `.dd-checkbox-group--inline` `.dd-checkbox-group__legend` `.dd-checkbox-group__nested` `.dd-checkbox-card__aside` `.dd-checkbox-card__icon` `.dd-checkbox-cards`

Attributes/states: `aria-invalid`

Markup: `references/components/checkbox.md`

## chip

Chip — "Soft wash". Categorical chips in the Color set (--dd-set-1…8): a tinted fill with deep text in the same hue (40% hue, 60% text colour, so every set and status colour holds 4.5:1 on its fill over the page, a surface, a well, a well card or a floating layer, in both themes). Topics, tags and people; removable (×), filter chips that toggle (aria-pressed) and an input that turns typing into chips. Behaviour lives in behaviors/chip.js. Colour: .dd-chip--set-1…8, or style="--dd-chip: <colour>".

Classes: `.dd-chip--set-1` `.dd-chip` `.dd-chip--set-2` `.dd-chip--set-3` `.dd-chip--set-4` `.dd-chip--set-5` `.dd-chip--set-6` `.dd-chip--set-7` `.dd-chip--set-8` `.dd-chip__dot` `.dd-chip__remove` `.dd-chip--filter` `.dd-chip__check` `.dd-chip--avatar` `.dd-chip-input` `.dd-chip-input__field` `.dd-chip-group`

Works with: `.dd-avatar` `.dd-input`

Attributes/states: `aria-pressed`

Markup: `references/components/chip.md`

## code

Code — blocks with a title bar, language tag and copy button; optional line numbers, highlighted and diff lines. Also inline code (.dd-code-inline), a copyable field with reveal (.dd-code-field) and a terminal (.dd-code--terminal). Syntax colours are set-colours pulled toward the text colour so they stay legible in dawn and dusk. Shell tokens (prompt, user, cwd, cmd, sub, flag, arg, var, path, op; output out/ok/warn/err/dim) colour commands in any block. The terminal (terminal.js) can type its commands out (data-dd-terminal-play, with a [data-dd-terminal-replay] button), copy only the commands ([data-dd-terminal-copy], data-dd-terminal-line-copy) and take live input (data-dd-terminal-interactive + <template data-dd-terminal-command="…">).

Classes: `.dd-code-inline` `.dd-code-field` `.dd-code--terminal` `.dd-code` `.dd-code__bar` `.dd-code__title` `.dd-code__lang` `.dd-code__copy` `.dd-code__pre` `.dd-code__line` `.dd-code--numbered` `.dd-code--diff` `.dd-code__k` `.dd-code__s` `.dd-code__n` `.dd-code__c` `.dd-code__f` `.dd-code__p` `.dd-code__t` `.dd-code-field__label` `.dd-code-field__box` `.dd-code-field__prefix` `.dd-code-field__value` `.dd-code-field__btn` `.dd-code-field__hint` `.dd-code__prompt` `.dd-code__user` `.dd-code__cwd` `.dd-code__cmd` `.dd-code__sub` `.dd-code__flag` `.dd-code__arg` `.dd-code__var` `.dd-code__path` `.dd-code__op` `.dd-code__out` `.dd-code__ok` `.dd-code__warn` `.dd-code__err` `.dd-code__dim` `.dd-code__action` `.dd-code__dots` `.dd-code__actions` `.dd-code__cursor` `.dd-code__input` `.dd-code__line-copy` `.dd-code__live` `.dd-code__field`

Attributes/states: `data-dd-terminal-replay` `data-dd-terminal-copy` `data-dd-code-secret` `aria-pressed` `data-dd-terminal-interactive`

Markup: `references/components/code.md`

## combobox

Combobox — a text input that filters a .dd-listbox (select.css) as you type. Single: the chosen label fills the input. Multi (.dd-combobox--multi): chosen values become chips inside the box, in the "Soft wash" chip style — a 22% wash of a Color set hue (--dd-chip: var(--dd-set-N)) with deep text in the same hue (a little closer to ink than .dd-chip, since it sits on the field's own wash). ds/behaviors/combobox.js filters, highlights matches and manages chips.

Classes: `.dd-combobox--multi` `.dd-combobox` `.dd-combobox__toggle` `.dd-combobox__chip` `.dd-combobox__remove` `.dd-combobox__create`

Works with: `.dd-listbox` `.dd-chip` `.dd-input`

Markup: `references/components/combobox.md`

## command-palette

Command palette — the ⌘K dialog: a large borderless search field, grouped results, kbd hints, one selected row (aria-selected) and an empty state. Floats like a menu (--dd-float-bg) with --dd-shadow-float over a --dd-overlay backdrop. Use <dialog class="dd-command"> with ds/behaviors/command-palette.js, or a <div class="dd-command"> to show it inline.

Classes: `.dd-command` `.dd-command__search` `.dd-command__input` `.dd-command__list` `.dd-command__group` `.dd-command__item` `.dd-command__label` `.dd-command__icon` `.dd-command__meta` `.dd-command__body` `.dd-mono` `.dd-command__hint` `.dd-command__enter` `.dd-command__empty` `.dd-command__foot` `.dd-command__brand`

Works with: `.dd-input`

Attributes/states: `aria-selected` `aria-disabled`

Markup: `references/components/command-palette.md`

## data-table

Data table — "Hairline". The dense table for large data sets: a toolbar (search, filter chips, column toggle, row count), a bulk-action bar, a scroll container with a sticky header and a frozen first column, sortable headers, selectable, expandable and grouped rows, status cells, loading and empty states, and a pagination footer. Behaviour (sorting, selection, expand, filtering, column toggle) is in ds/behaviors/data-table.js — opt in with [data-dd-data-table] on the root. Sticky cells need an opaque background: set --dd-data-table-bg when the table sits on something other than the page (.dd-data-table--card does this for --dd-surface). Inside .dd-app-shell, whose content is a plain --dd-bg, the cells drop the page grain so the table reads as the same surface (the shell sets --dd-data-table-grain: none; set it to var(--dd-grain) to bring the grain back). Height: the scroll area caps at --dd-data-table-height (70vh). Set it to none and the table grows with its rows and the page does the scrolling (the header then scrolls away with the page); .dd-data-table--fill instead fills the height its parent gives it, so the table body is the only scroller and the header stays pinned.

Classes: `.dd-data-table--card` `.dd-data-table--fill` `.dd-data-table` `.dd-data-table__rownum` `.dd-data-table__select` `.dd-data-table__toolbar` `.dd-data-table__search` `.dd-data-table__chip` `.dd-data-table__chip-dot` `.dd-data-table__tools` `.dd-data-table__count` `.dd-data-table__menu` `.dd-data-table__menu-panel` `.dd-data-table__menu-title` `.dd-data-table__menu--start` `.dd-data-table__bulk` `.dd-data-table__bulk-count` `.dd-data-table__bulk-end` `.dd-data-table__scroll` `.dd-data-table__table` `.dd-data-table__group` `.dd-data-table__detail` `.dd-data-table__empty-row` `.dd-data-table__unit` `.dd-data-table__status` `.dd-data-table__sort` `.dd-data-table__check` `.dd-data-table__expand` `.dd-data-table__expand-spacer` `.dd-data-table__detail-body` `.dd-data-table__facts` `.dd-data-table__group-label` `.dd-data-table__group-count` `.dd-data-table__skeleton` `.dd-data-table__skeleton--box` `.dd-data-table__empty` `.dd-data-table__empty-icon` `.dd-data-table__empty-title` `.dd-row` `.dd-data-table__footer` `.dd-data-table--compact` `.dd-data-table--roomy`

Works with: `.dd-app-shell` `.dd-input` `.dd-btn` `.dd-pagination`

Attributes/states: `data-dd-data-table` `aria-pressed` `aria-sort` `aria-expanded`

Markup: `references/components/data-table.md`

## date-picker

Date picker — a text input with a calendar popover, plus the calendar on its own (.dd-calendar). The calendar is a month table of day buttons: today carries an apricot dot, the chosen day fills with the accent, a range draws a soft accent band between its filled ends. The range picker adds presets and a footer. ds/behaviors/date-picker.js renders months, handles selection, keyboard and the popover.

Classes: `.dd-calendar` `.dd-date-picker` `.dd-date-picker__popover` `.dd-date-picker__popover--end` `.dd-date-picker__popover--static` `.dd-date-picker__presets` `.dd-date-picker__preset` `.dd-date-picker__main` `.dd-date-picker__foot` `.dd-date-picker__summary` `.dd-calendar--panel` `.dd-calendar__head` `.dd-calendar__title` `.dd-calendar__nav` `.dd-calendar__grid` `.dd-calendar__day`

Works with: `.dd-input`

Attributes/states: `aria-pressed` `aria-current`

Markup: `references/components/date-picker.md`

## description-list

Description list — key-value pairs: a deploy's facts, a service's settings, a key's metadata. dl > div.__item > dt.__term + dd.__details. Inline by default (term column + value), stacked, or two columns. Collapses to stacked / one column in narrow containers. Copyable values reuse [data-dd-copy].

Classes: `.dd-description-list` `.dd-description-list__item` `.dd-description-list__term` `.dd-description-list__details` `.dd-description-list__mono` `.dd-description-list__muted` `.dd-description-list__status` `.dd-description-list__copy` `.dd-description-list--stacked` `.dd-description-list--columns` `.dd-description-list--compact` `.dd-description-list--card`

Attributes/states: `data-dd-copy`

Markup: `references/components/description-list.md`

## dialog

Dialog — "Classic": a centred card on a dim scrim, actions bottom-right. Built on native <dialog> opened with showModal() (behaviors/dialog.js wires [data-dd-dialog-open], close buttons, backdrop clicks and the exit motion). Parts: head (optional icon tile + eyebrow + title + close) · body (scrolls when long) · foot (optional hint + actions). Sizes: sm · md (default) · lg. When the dialog is 360px or narrower the actions split the footer evenly.

Classes: `.dd-dialog` `.dd-dialog__head` `.dd-dialog__icon` `.dd-dialog__titles` `.dd-dialog__eyebrow` `.dd-dialog__title` `.dd-dialog__close` `.dd-dialog__body` `.dd-dialog__foot` `.dd-dialog__hint` `.dd-dialog__form` `.dd-dialog--danger` `.dd-dialog--sm` `.dd-dialog--lg`

Works with: `.dd-form` `.dd-field` `.dd-input` `.dd-btn`

Attributes/states: `data-dd-dialog-open`

Markup: `references/components/dialog.md`

## divider

Divider — a hairline that separates without decorating. Horizontal (<hr>), vertical (between toolbar items) and labelled (centered or start-aligned, mono eyebrow). Spacing: --tight · default · --loose.

Classes: `.dd-divider` `.dd-divider--tight` `.dd-divider--loose` `.dd-divider--strong` `.dd-divider--vertical` `.dd-divider--label` `.dd-divider--start`

Markup: `references/components/divider.md`

## drawer

Drawer — a full-height side panel from the right for details and editing, over the same scrim as a dialog. Native <dialog class="dd-drawer"> opened with showModal() (behaviors/dialog.js). Parts: head (eyebrow + title + meta + close) · body (scrolls) · foot (actions, always in view). Sizes: sm · md (default) · lg; full width under 480px.

Classes: `.dd-drawer` `.dd-drawer__head` `.dd-drawer__titles` `.dd-drawer__eyebrow` `.dd-drawer__title` `.dd-drawer__meta` `.dd-drawer__close` `.dd-drawer__body` `.dd-drawer__section` `.dd-drawer__section-title` `.dd-drawer__props` `.dd-drawer__log` `.dd-drawer__form` `.dd-drawer__foot` `.dd-drawer__start` `.dd-drawer__hint` `.dd-drawer--sm` `.dd-drawer--lg`

Works with: `.dd-form` `.dd-field` `.dd-input` `.dd-btn`

Markup: `references/components/drawer.md`

## empty-state

Empty state — what to show when there is nothing yet: no illustration, just an icon in a soft tonal tile, a title, one or two sentences and the action that fills the space. Default size for panels and cards; --compact for table bodies, lists and side panels; --page for a whole empty screen (the title takes the heading lockup).

Classes: `.dd-empty-state` `.dd-empty-state__icon` `.dd-empty-state__title` `.dd-empty-state__text` `.dd-mono` `.dd-empty-state__actions` `.dd-empty-state__meta` `.dd-empty-state--compact` `.dd-empty-state--page`

Markup: `references/components/empty-state.md`

## file-upload

File upload — a dropzone (a <label> around a hidden file input, so click, keyboard and drop all work) and a file list with progress, done, error and remove. The dropzone is tonal with a faint dashed edge — the one place a dashed line is the affordance; dragging over it tints it and turns the dashes accent. ds/behaviors/file-upload.js adds the drag state and lists chosen files.

Classes: `.dd-dropzone` `.dd-dropzone__icon` `.dd-dropzone__title` `.dd-dropzone__browse` `.dd-dropzone__meta` `.dd-dropzone--compact` `.dd-dropzone__text` `.dd-file-list` `.dd-file` `.dd-file__icon` `.dd-file__body` `.dd-file__name` `.dd-file__meta` `.dd-file__status` `.dd-file__actions` `.dd-file__progress`

Markup: `references/components/file-upload.md`

## form-field

Form field — the wrapper around one control: label, hint, error and counter. Default is the tucked label: a micro label sits inside the tonal, borderless box and the value sits under it. .dd-field--above moves the label over the box. The box itself is .dd-input (text-input.css) or one of its kin (textarea, select, combobox, date picker), placed directly inside the field or one wrapper deep.

Classes: `.dd-field--above` `.dd-field` `.dd-field__label` `.dd-field__opt` `.dd-field__hint` `.dd-field__error` `.dd-field__foot` `.dd-field__counter` `.dd-field__desc`

Works with: `.dd-input`

Attributes/states: `aria-invalid`

Markup: `references/components/form-field.md`

## form-layout

Form layout — how fields group into a form: sections (fieldset + legend or section + title), a responsive two-column grid, an aside layout that puts the section's title and description beside its fields once there is room (container query on .dd-form), and a footer for the actions. Sections separate by space and tone, with a hairline only between stacked sections and above the footer.

Classes: `.dd-form` `.dd-form--divided` `.dd-form__section` `.dd-form__title` `.dd-form__section--panel` `.dd-form__head` `.dd-form__legend` `.dd-form__desc` `.dd-form__body` `.dd-form__section--aside` `.dd-form__grid` `.dd-form__grid--3` `.dd-form__span` `.dd-form__row` `.dd-form__choices` `.dd-form__choices--rows` `.dd-form__footer` `.dd-form__meta` `.dd-form__footer--sticky` `.dd-form__footer--plain`

Works with: `.dd-btn`

Markup: `references/components/form-layout.md`

## guide-cue

Guide cue — an onboarding tip that points at one thing on the page: step count, title, a sentence, Next / dismiss, an arrow toward the target and a beacon pulsing on it. Steps are .dd-guide-cue[popover] elements sharing a data-dd-guide name; behaviors/guide-cue.js walks them. Dawn: an ink card, like the toast. Dusk: a raised surface-3.

Classes: `.dd-guide-cue` `.dd-guide-cue__actions` `.dd-guide-cue__close` `.dd-guide-cue__step` `.dd-guide-cue__pips` `.dd-guide-cue__title` `.dd-guide-cue__text` `.dd-guide-cue__arrow` `.dd-guide-beacon` `.dd-guide-beacon--static` `.dd-guide-cue--static`

Works with: `.dd-btn`

Attributes/states: `data-dd-guide-active`

Markup: `references/components/guide-cue.md`

## json-viewer

JSON viewer — a collapsible, keyboard-navigable tree rendered by behaviors/json-viewer.js from an inline <script type="application/json">. Type colours, child counts, collapsed previews and a copyable path bar.

Classes: `.dd-json-viewer` `.dd-json-viewer__bar` `.dd-json-viewer__path` `.dd-json-viewer__path-label` `.dd-json-viewer__path-value` `.dd-json-viewer__actions` `.dd-json-viewer__btn` `.dd-json-viewer__btn--icon` `.dd-json-viewer__tree` `.dd-json-viewer__group` `.dd-json-viewer__node` `.dd-json-viewer__close` `.dd-json-viewer__row` `.dd-json-viewer__toggle` `.dd-json-viewer__spacer` `.dd-json-viewer__key` `.dd-json-viewer__index` `.dd-json-viewer__colon` `.dd-json-viewer__brace` `.dd-json-viewer__value--string` `.dd-json-viewer__value--number` `.dd-json-viewer__value--boolean` `.dd-json-viewer__value--null` `.dd-json-viewer__preview` `.dd-json-viewer__count` `.dd-json-viewer__error`

Attributes/states: `aria-expanded` `aria-selected`

Markup: `references/components/json-viewer.md`

## kbd

Kbd — keyboard keys and combos. A tonal keycap: a translucent ink wash (so it reads on bg, surface or surface-2) with a soft lower edge instead of a border. Mono, small, muted. Combos group keys; sequences add “then”.

Classes: `.dd-kbd` `.dd-kbd--sm` `.dd-kbd--lg` `.dd-kbd--quiet` `.dd-kbd-combo__sep` `.dd-kbd-combo` `.dd-kbd-list`

Works with: `.dd-btn`

Markup: `references/components/kbd.md`

## link

Link — “Dotted · fine”. Fine 1.5px dots in --dd-border-strong sit close under the text; on hover the link takes the accent and the dots turn solid. Standalone links nudge their arrow, external links lift their ↗, nav links stay muted until hovered and carry a solid underline when current.

Classes: `.dd-link` `.dd-link--standalone` `.dd-link--external` `.dd-link--muted` `.dd-link--nav` `.dd-link-nav` `.dd-link--inverse`

Attributes/states: `aria-current` `aria-disabled`

Markup: `references/components/link.md`

## loader

Loader — the ampersand from the logo, set moving: the brand's own way to say "loading". It is the real Outfit 800 "&" (traced from the font, so it matches the wordmark exactly). Ten variants share one outer element and differ only in what's inside — copy a variant's markup from the docs page, then swap sizes freely. The outer element carries role="status" and the label; everything inside is aria-hidden. Ink is currentColor (--dd-text, like the logo); the accent is --dd-loader-accent (apricot primary); the faint "track" glyph is --dd-loader-track. Every loop is built from --dd-dur and --dd-ease and moves only transform, opacity, stroke-dashoffset and masks. Under reduced motion each variant settles into a still glyph that fades slowly, so a paused loader never reads as "done". Glyph geometry: viewBox "-2 -755 740 800" (baseline at y=0, 1000-unit em).

Classes: `.dd-loader` `.dd-loader__glyph` `.dd-loading` `.dd-page-loader` `.dd-loader--sm` `.dd-loader--lg` `.dd-loader--xl` `.dd-loader__b` `.dd-loader__a` `.dd-loader--ink` `.dd-loader__line` `.dd-loader--trace` `.dd-loader--sky` `.dd-loader__sky` `.dd-loader--sun` `.dd-loader--horizon` `.dd-loader__morph` `.dd-loader--weight` `.dd-loader__tail` `.dd-loader__spark` `.dd-loader--firefly` `.dd-loader--tones` `.dd-loader--cut` `.dd-loader--join`

Markup: `references/components/loader.md`

## log-viewer

Log viewer — a monospace stream with timestamps, level badges and a service column; a bar to search, filter by level and toggle wrapping (behaviors/log-viewer.js). Columns line up across lines via subgrid.

Classes: `.dd-log-viewer` `.dd-log-viewer__bar` `.dd-log-viewer__search` `.dd-log-viewer__levels` `.dd-log-viewer__toggle` `.dd-log-viewer__toggle--wrap` `.dd-log-viewer__toggle--follow` `.dd-log-viewer__toggle-label` `.dd-log-viewer__n` `.dd-log-viewer__count` `.dd-log-viewer__live` `.dd-log-viewer__scroll` `.dd-log-viewer__lines` `.dd-log-viewer__line` `.dd-log-viewer__time` `.dd-log-viewer__level` `.dd-log-viewer__src` `.dd-log-viewer__msg` `.dd-log-viewer__dim` `.dd-log-viewer__mark` `.dd-log-viewer__empty`

Attributes/states: `data-dd-log-viewer-level` `aria-pressed`

Markup: `references/components/log-viewer.md`

## logo

Logo — the dawn & dusk wordmark. "One line" is the default: Outfit 800 at -0.055em tracking, set in currentColor so it follows dawn / dusk and any block it sits on. The stacked lockup cuts its second line out of the first with a stroke in the colour behind it (--dd-logo-bg). The tile is the "d&" crop for favicons, app icons and the side-nav rail.

Classes: `.dd-logo` `.dd-logo--xs` `.dd-logo--sm` `.dd-logo--lg` `.dd-logo--xl` `.dd-logo--2xl` `.dd-logo--stack` `.dd-logo__line` `.dd-logo__amp` `.dd-logo--muted` `.dd-logo--accent` `.dd-logo-block` `.dd-logo-block--surface` `.dd-logo-block--ink` `.dd-logo-block--primary` `.dd-logo-tile` `.dd-logo-tile--16` `.dd-logo-tile--24` `.dd-logo-tile--32` `.dd-logo-tile--64` `.dd-logo-tile--96` `.dd-logo-tile--primary` `.dd-logo-tile--paper`

Markup: `references/components/logo.md`

## menu

Menu — “Grouped · text only”. A floating tonal panel (--dd-shadow-float, no border) with full-bleed rows, small-caps group labels and hairline dividers. Type and shortcut hints carry it; icons are optional. Items: descriptions, checked (menuitemcheckbox / menuitemradio), disabled, danger, kbd hints, submenu chevron. Static by default (render it inline in docs); ds/behaviors/menu.js floats it next to its trigger. Floating layer: --dd-float-bg (lighter than the page in dawn, a step up in dusk); rows highlight one tone deeper.

Classes: `.dd-menu` `.dd-menu__header` `.dd-menu__group` `.dd-menu__label` `.dd-menu__sep` `.dd-menu__item` `.dd-menu__body` `.dd-menu__desc` `.dd-menu__icon` `.dd-menu__kbd` `.dd-menu__check` `.dd-menu__sub` `.dd-menu__item--danger`

Works with: `.dd-btn`

Attributes/states: `aria-expanded` `aria-checked` `aria-disabled` `data-dd-menu`

Markup: `references/components/menu.md`

## page-header

Page header — the top of a view: breadcrumbs, the title in the heading lockup (lowercase, 800, tight), a description, meta facts, actions on the right and tabs underneath. Actions wrap under the title when space runs out.

Classes: `.dd-page-header` `.dd-page-header__row` `.dd-page-header__titles` `.dd-page-header__eyebrow` `.dd-page-header__back` `.dd-page-header__title` `.dd-page-header__title--mono` `.dd-page-header__mark` `.dd-page-header__desc` `.dd-page-header__meta` `.dd-page-header__status` `.dd-page-header__status--warn` `.dd-page-header__status--bad` `.dd-page-header__actions` `.dd-page-header--sm` `.dd-page-header--lg`

Works with: `.dd-tabs`

Markup: `references/components/page-header.md`

## pagination

Pagination — numbered pages, a compact prev/next with a range ("1–50 of 2,481") and a page-size select. Tone, not lines: the current page sits on --dd-wash-strong; hover takes the lighter --dd-wash. Both are translucent steps toward the text colour, so they read on the page, on a card and in dusk alike. Works with <a> or <button>.

Classes: `.dd-pagination` `.dd-pagination__pages` `.dd-pagination__page` `.dd-pagination__step` `.dd-pagination__gap` `.dd-pagination__step--label` `.dd-pagination__range` `.dd-pagination__status` `.dd-pagination__size` `.dd-pagination__select` `.dd-pagination__end` `.dd-pagination--spread` `.dd-pagination--compact`

Works with: `.dd-input`

Attributes/states: `aria-current` `aria-disabled`

Markup: `references/components/pagination.md`

## popover

Popover — a small non-modal panel opened by a click: header, body, actions and an arrow pointing at its trigger. Built on the native popover attribute (top layer, Esc and outside-click close for free); behaviors/popover.js places it next to the trigger, flips it when there is no room and keeps aria-expanded in sync. Floating layer: --dd-shadow-float on --dd-float-bg (lighter than the page in dawn, a clear step up in dusk).

Classes: `.dd-popover` `.dd-popover--wide` `.dd-popover__header` `.dd-popover__title` `.dd-popover__eyebrow` `.dd-popover__close` `.dd-popover__body` `.dd-mono` `.dd-popover__actions` `.dd-popover__meta` `.dd-popover__arrow` `.dd-popover--static`

Markup: `references/components/popover.md`

## progress

Progress — how far along something is, or how full. Linear bars (determinate and indeterminate), meters with thresholds, rings, segmented steps and usage quotas. The unfilled track is a lighter step of the fill colour, so the state reads across the whole bar. Values come from --dd-value (0–100) on the track.

Classes: `.dd-progress` `.dd-progress__head` `.dd-progress__label` `.dd-progress__value` `.dd-progress__hint` `.dd-progress__track` `.dd-progress__fill` `.dd-progress--sm` `.dd-progress--lg` `.dd-progress--ok` `.dd-progress--warn` `.dd-progress--bad` `.dd-progress--info` `.dd-progress--primary` `.dd-progress__mark` `.dd-progress__scale` `.dd-progress-ring` `.dd-progress-ring__track` `.dd-progress-ring__fill` `.dd-progress-ring__label` `.dd-progress-ring__sub` `.dd-progress-ring--sm` `.dd-progress-ring--lg` `.dd-progress-ring--ok` `.dd-progress-ring--warn` `.dd-progress-ring--bad` `.dd-progress-ring--info` `.dd-progress-ring--primary` `.dd-progress-steps` `.dd-progress-steps__list` `.dd-progress-steps__step` `.dd-progress-steps__label` `.dd-progress-steps__meta` `.dd-progress-steps__summary` `.dd-progress-steps--compact` `.dd-progress-quota` `.dd-progress-quota__head` `.dd-progress-quota__title` `.dd-progress-quota__amount` `.dd-progress-quota__track` `.dd-progress-quota__seg` `.dd-progress-quota__legend` `.dd-progress-quota__hint`

Markup: `references/components/progress.md`

## radio

Radio — "Crisp checks": a 20px circle with a hairline edge; selected draws an 8px accent dot and an accent edge. .dd-radio-group stacks options in a fieldset. .dd-radio-card turns each option into a selectable box (a radio box group): the native radio is visually hidden; the chosen card tints with the accent and shows a check badge (tone, not an edge).

Classes: `.dd-radio-group` `.dd-radio-card` `.dd-radio` `.dd-radio__input` `.dd-radio__text` `.dd-radio__label` `.dd-radio__desc` `.dd-radio-group--inline` `.dd-radio-group__legend` `.dd-radio-group__hint` `.dd-radio-cards` `.dd-radio-card__icon` `.dd-radio-card__title` `.dd-radio-card__desc` `.dd-radio-card__meta` `.dd-radio-card__mark` `.dd-radio-card--row`

Attributes/states: `aria-invalid`

Markup: `references/components/radio.md`

## segmented-control

Segmented control — one choice from a few, shown all at once. A tonal track; the chosen segment takes the deeper selected tone and full-strength text. Two flavours share the classes: · buttons — role="radio" + aria-checked inside [data-dd-segmented] (ds/behaviors/segmented-control.js) · radios  — <label class="dd-segmented__item"><input type="radio"> …</label>, no JavaScript at all. A track that runs out of room scrolls sideways, with soft fades at the overflowing edges where supported.

Classes: `.dd-segmented` `.dd-segmented__item` `.dd-segmented__count` `.dd-segmented--sm` `.dd-segmented--lg` `.dd-segmented__item--icon` `.dd-segmented--block` `.dd-segmented--inset` `.dd-mono`

Attributes/states: `data-dd-segmented` `aria-checked` `aria-disabled`

Markup: `references/components/segmented-control.md`

## select

Select — two flavours in the tonal .dd-input box: 1. Native: .dd-input.dd-select around a <select class="dd-input__control">, with a chevron. Best on mobile. 2. Custom: .dd-select-menu wraps a <button class="dd-input dd-select"> and a .dd-listbox (role=listbox) for options that need icons, descriptions or metadata. ds/behaviors/select.js adds the keyboard model. .dd-listbox is the floating option list ("Grouped" menu language: full-bleed rows, small-caps group labels, a check on the selected row) on --dd-float-bg, like the menu. The combobox reuses it.

Classes: `.dd-select` `.dd-select-menu` `.dd-listbox` `.dd-select__chevron` `.dd-select__placeholder` `.dd-listbox--up` `.dd-listbox--end` `.dd-listbox--static` `.dd-listbox__group` `.dd-listbox__sep` `.dd-listbox__option` `.dd-listbox__desc` `.dd-listbox__meta` `.dd-listbox__icon` `.dd-listbox__swatch` `.dd-listbox__text` `.dd-listbox__check` `.dd-listbox__match` `.dd-listbox__empty`

Works with: `.dd-input`

Attributes/states: `aria-expanded` `aria-selected` `aria-disabled`

Markup: `references/components/select.md`

## sheet

Sheet — a bottom sheet for mobile: rises from the bottom edge with a grab handle and rounded top corners, holds a short task or a list of actions, and stops at 85% of the screen (the body scrolls). On wide screens it stays a centred column. Native <dialog class="dd-sheet"> opened with showModal() (behaviors/dialog.js).

Classes: `.dd-sheet` `.dd-sheet__handle` `.dd-sheet__head` `.dd-sheet__titles` `.dd-sheet__title` `.dd-sheet__desc` `.dd-sheet__close` `.dd-sheet__body` `.dd-sheet__list` `.dd-sheet__item` `.dd-sheet__item-label` `.dd-sheet__item-meta` `.dd-sheet__item--danger` `.dd-sheet__check` `.dd-sheet__sep` `.dd-sheet__foot` `.dd-sheet__foot--stack`

Works with: `.dd-btn`

Attributes/states: `aria-checked`

Markup: `references/components/sheet.md`

## side-nav

Side nav — "Icon rail · two-level" (blended). An icon column for sections, toned a step from the page, plus a column with that section's pages. Hairlines divide the columns; the chevron at the foot of the rail folds the page column away. Spans the full viewport height (sticky) on its own, or fills its parent with --fill / inside .dd-app-shell. Below the app shell's breakpoint (or always, with --offcanvas) it slides in from the left over a scrim.

Classes: `.dd-side-nav` `.dd-side-nav--fill` `.dd-side-nav__rail` `.dd-side-nav__logo` `.dd-side-nav__spacer` `.dd-side-nav__sep` `.dd-side-nav__item` `.dd-side-nav__collapse` `.dd-side-nav__panel` `.dd-scroll` `.dd-side-nav__pane` `.dd-side-nav__head` `.dd-side-nav__title` `.dd-side-nav__section` `.dd-side-nav__link` `.dd-side-nav__label` `.dd-side-nav__count` `.dd-side-nav__badge` `.dd-side-nav__badge--new` `.dd-side-nav__badge--solid` `.dd-side-nav__dot` `.dd-side-nav__dot--ok` `.dd-side-nav__dot--warn` `.dd-side-nav__dot--bad` `.dd-side-nav__dot--idle` `.dd-side-nav__group` `.dd-side-nav__chev` `.dd-side-nav__sub` `.dd-side-nav__foot` `.dd-side-nav__note` `.dd-side-nav__meter` `.dd-side-nav--offcanvas` `.dd-side-nav-lock`

Works with: `.dd-app-shell`

Attributes/states: `aria-current`

Markup: `references/components/side-nav.md`

## skeleton

Skeleton — the shape of content that is on its way: text lines, avatars, cards and table rows in a flat tone with a slow shimmer. The tone is a 9% tint of the text colour, so it reads the same on the page and on a surface. Wrap a loading region in aria-busy="true" (and say "Loading…" for screen readers); the skeleton pieces themselves are decoration. Under reduced motion the shimmer stops and the shapes stay still. The shimmer is tuned to the same perceived strength in both themes (dusk's shine is a stronger text tint, because a step on a dark tone reads smaller than the same step on a light one).

Classes: `.dd-skeleton` `.dd-skeleton--text` `.dd-skeleton--title` `.dd-skeleton--circle` `.dd-skeleton--block` `.dd-skeleton--button` `.dd-skeleton-lines` `.dd-skeleton-group`

Attributes/states: `aria-busy`

Markup: `references/components/skeleton.md`

## slider

Slider — native <input type="range"> on a thin tonal track that fills with the accent up to the thumb. The thumb is the switch knob (light, soft shadow). Single or range (two thumbs over one track), with optional tick marks and value labels: a heading output and bubbles that ride above the thumbs. ds/behaviors/slider.js keeps the fill (--_p, or --_lo / --_hi for ranges) and the outputs in sync.

Classes: `.dd-slider` `.dd-slider__head` `.dd-slider__label` `.dd-slider__value` `.dd-slider__rail` `.dd-slider__bubble` `.dd-slider__input` `.dd-slider--range` `.dd-slider__fill` `.dd-slider__ticks` `.dd-slider--sm`

Markup: `references/components/slider.md`

## spinner

Spinner — something is working and we can't say how long. A thin ring (the same one the loading button uses; it reuses the dd-spin keyframes from button.css), three breathing dots for chat-like waits, an inline "Loading…" line and a page loader. Spinners inherit currentColor. Under reduced motion they slow right down instead of freezing, so a stopped ring never reads as "done".

Classes: `.dd-spinner` `.dd-spinner--sm` `.dd-spinner--lg` `.dd-spinner--xl` `.dd-spinner--inline` `.dd-spinner--muted` `.dd-spinner--dots` `.dd-loading` `.dd-page-loader` `.dd-page-loader__label` `.dd-page-loader__meta` `.dd-page-loader--overlay` `.dd-page-loader--fixed`

Works with: `.dd-btn`

Markup: `references/components/spinner.md`

## stat

Stat — KPI tiles. A tile is a label, one figure, an optional delta (direction = icon, tone = good/bad), comparison text and a sparkline in a de-emphasis tone. Tiles sit on --dd-surface; grids separate them by tone and gap, never by lines. Also: a joined grid (one surface split by 2px gaps), a compact inline stat and a hero figure.

Classes: `.dd-stat` `.dd-stat-grid--joined` `.dd-stat__label` `.dd-stat__main` `.dd-stat__value` `.dd-stat__unit` `.dd-stat__foot` `.dd-stat__delta` `.dd-stat__delta--ok` `.dd-stat__delta--bad` `.dd-stat__delta--warn` `.dd-stat__delta--flat` `.dd-stat__compare` `.dd-stat__spark` `.dd-stat__spark-area` `.dd-stat__spark-line` `.dd-stat__spark-dot` `.dd-stat--hero` `.dd-stat--bare` `.dd-stat--inline` `.dd-stat-inline-group` `.dd-stat-grid`

Markup: `references/components/stat.md`

## status-dot

Status dot — a small coloured dot for presence and service health: online · idle · error · unknown (· offline). The dot is the element's ::before, so any text inside becomes its label. --live adds a slow pulse for streams that are happening now (deploying, recording, live tail); under reduced motion the pulse is dropped.

Classes: `.dd-status-dot` `.dd-status-dot--online` `.dd-status-dot--idle` `.dd-status-dot--error` `.dd-status-dot--info` `.dd-status-dot--offline` `.dd-status-dot--unknown` `.dd-status-dot--sm` `.dd-status-dot--lg` `.dd-status-dot--muted` `.dd-status-dot--live`

Markup: `references/components/status-dot.md`

## stepper

Stepper — progress through ordered steps. Wizard steps are done · current · upcoming · error, laid out horizontally (connectors between steps) or --vertical (with descriptions). --pipeline is the status flavour: compact stages for a deploy (passed · running · failed · skipped · queued) with mono durations and connectors coloured by the stage before them. Mark the current step with aria-current="step".

Classes: `.dd-stepper` `.dd-stepper__step` `.dd-stepper__marker` `.dd-stepper__text` `.dd-stepper__label` `.dd-stepper__desc` `.dd-stepper--vertical` `.dd-stepper--pipeline` `.dd-stepper--sm` `.dd-stepper__spinner`

Markup: `references/components/stepper.md`

## switch

Switch — "Classic pill": a pill track that fills with the accent when on; the knob slides across and takes --dd-on-accent. Off, the track is --dd-border-strong with a light knob. Style a native checkbox with role="switch" inside <label class="dd-switch">. Sizes sm · md · lg. .dd-switch--end puts the control after the text, for settings rows.

Classes: `.dd-switch--end` `.dd-switch` `.dd-switch__input` `.dd-switch__text` `.dd-switch__label` `.dd-switch__desc` `.dd-switch--sm` `.dd-switch--lg`

Markup: `references/components/switch.md`

## table

Table — "Quiet card". A simple table for a handful of rows: single-line cells on one rounded surface, hairlines between rows, a quiet header. The card is also the horizontal scroll container, so wide tables never break the layout. Markup: <div class="dd-table"><table>…</table></div>. Use .dd-data-table for large, interactive data sets.

Classes: `.dd-table` `.dd-visually-hidden` `.dd-table__status` `.dd-table--interactive` `.dd-table__row-link` `.dd-table--compact` `.dd-table--mono` `.dd-table--plain` `.dd-table-header` `.dd-table-header__title` `.dd-table-header__meta` `.dd-table-header__action` `.dd-table__empty` `.dd-table__empty-icon` `.dd-table__empty-title`

Works with: `.dd-data-table` `.dd-btn`

Markup: `references/components/table.md`

## tabs

Tabs — "Underline". A hairline baseline with an ink marker under the active tab; hover previews the marker in a softer tone. Counts sit in a small mono pill. Modifiers: --sm, --pill (secondary, inside a view), --vertical. The list scrolls sideways when it runs out of room, with soft fades at the edges where supported. Works as real tabs ([data-dd-tabs] + role="tab") or as page navigation (links with aria-current="page").

Classes: `.dd-tabs` `.dd-tabs__list` `.dd-tabs__tab` `.dd-tabs__count` `.dd-tabs__dot` `.dd-tabs__panel` `.dd-tabs--sm` `.dd-tabs--pill` `.dd-tabs--vertical`

Attributes/states: `data-dd-tabs` `aria-selected` `aria-current` `aria-disabled`

Markup: `references/components/tabs.md`

## text-input

Text input — the tonal, borderless box every form control shares (textarea, select, combobox and date picker build on it). The box (.dd-input) holds the control (.dd-input__control) plus optional affixes, units and inline buttons. Inside a .dd-field the box grows a top pad so the tucked label fits; on its own it is button height. Sizes: sm · md (default) · lg. Focus clears the fill toward the page and lifts the box. The fill is a translucent wash of the text colour in both themes, so the box always reads one step from whatever it sits on: the grain page, a card, a well or a floating panel (an opaque surface step vanishes into some of them).

Classes: `.dd-input` `.dd-input__control` `.dd-mono` `.dd-num` `.dd-input__affix` `.dd-input__unit` `.dd-input__prefix` `.dd-input__status` `.dd-input__btn` `.dd-input__steppers` `.dd-input__hide` `.dd-input__show` `.dd-input--sm` `.dd-input--lg`

Works with: `.dd-field`

Attributes/states: `aria-pressed` `data-dd-clear` `aria-invalid`

Markup: `references/components/text-input.md`

## textarea

Textarea — multi-line text in the same tonal box as .dd-input (use both classes: .dd-input.dd-textarea). The box carries the padding so scrolled text never slides under the tucked label. Resizes vertically; [data-dd-autogrow] grows with the content instead (up to ~10 lines, then scrolls).

Classes: `.dd-textarea` `.dd-mono`

Works with: `.dd-input` `.dd-field`

Attributes/states: `data-dd-autogrow`

Markup: `references/components/textarea.md`

## timeline

Timeline — an activity feed or audit log, grouped by day. Each item has a marker (an avatar with initials, or an icon in a tonal circle), a sentence, a timestamp and optional detail. A faint connector runs between markers. --audit turns it into compact single-line rows with a mono time column.

Classes: `.dd-timeline` `.dd-timeline__group` `.dd-timeline__day` `.dd-timeline__date` `.dd-timeline__list` `.dd-timeline__item` `.dd-timeline__marker` `.dd-timeline__marker--avatar` `.dd-timeline__marker--ok` `.dd-timeline__marker--warn` `.dd-timeline__marker--bad` `.dd-timeline__marker--info` `.dd-timeline__marker--accent` `.dd-timeline__body` `.dd-timeline__text` `.dd-timeline__detail` `.dd-timeline__time` `.dd-timeline__meta` `.dd-timeline__diff` `.dd-timeline__add` `.dd-timeline__del` `.dd-timeline--audit`

Markup: `references/components/timeline.md`

## toast

Toast — a short, temporary confirmation in a stack at the bottom-right (.dd-toaster). From the Soft fill alert family: in dawn the toast is an ink slab (text colour fill, page colour type); in dusk it is a raised dark surface (--dd-float-bg + --dd-shadow-float, like menus and popovers), never a light slab. Intents tint only the icon and the progress line. Motion: toasts in the stack slide in, the others glide to make room, and a toast swiped sideways (touch, pen or a mouse drag) follows the pointer and leaves; reduced motion drops all of it. Create them with dd.toast({ title, description, intent, action }) or a [data-dd-toast] trigger (behaviors/toast.js).

Classes: `.dd-toaster` `.dd-toast` `.dd-toast--info` `.dd-toast--ok` `.dd-toast--warn` `.dd-toast--bad` `.dd-toast--neutral` `.dd-toast__body` `.dd-toast__title` `.dd-toast__text` `.dd-mono` `.dd-toast__actions` `.dd-toast__action` `.dd-toast__dismiss` `.dd-toast__progress`

Attributes/states: `data-dd-toast`

Markup: `references/components/toast.md`

## tooltip

Tooltip — a short label on hover or keyboard focus. Add data-dd-tooltip="text" to any element; behaviors/tooltip.js renders one shared .dd-tooltip, places it (top by default, flips when there is no room) and points the arrow at the trigger. Dawn: an ink chip (text colour fill). Dusk: a raised surface-3 chip. data-dd-tooltip-kbd adds a key hint.

Classes: `.dd-tooltip` `.dd-tooltip__keys` `.dd-tooltip--static`

Markup: `references/components/tooltip.md`

## top-bar

Top bar — the app header: logo, context, a search trigger, actions and the avatar menu. It sits on the page tone with a hairline underneath. Under 640px of its own width the menu button appears, the search collapses to an icon, and the context and anything marked __wide hide. As the top bar of a .dd-app-shell, the shell decides the menu button and the __narrow logo instead (shown while its side nav is off-canvas); bars inside the shell's content keep these rules.

Classes: `.dd-top-bar` `.dd-top-bar__inner` `.dd-top-bar__nav-btn` `.dd-top-bar__brand` `.dd-top-bar__context` `.dd-top-bar__sep` `.dd-top-bar__switch` `.dd-top-bar__mark` `.dd-top-bar__links` `.dd-top-bar__link` `.dd-top-bar__search` `.dd-top-bar__kbd` `.dd-top-bar__actions` `.dd-top-bar__icon-btn` `.dd-top-bar__dot` `.dd-top-bar__user` `.dd-top-bar__avatar` `.dd-top-bar__menu` `.dd-top-bar__menu-head` `.dd-top-bar__menu-sep` `.dd-top-bar__menu-item` `.dd-top-bar__narrow` `.dd-top-bar__wide`

Works with: `.dd-app-shell` `.dd-logo`

Attributes/states: `aria-current`

Markup: `references/components/top-bar.md`

## Behaviours (dawn-and-dusk.js)

- **theme** — Theme: dawn (light) / dusk (dark). - <html data-theme="dawn|dusk"> is the source of truth; the choice persists in localStorage ("dd-theme"). - With nothing stored, the OS preference decides (tokens.css also handles that without JS). - Any element with [data-dd-theme-toggle] flips the theme on click.
- **autoclose** — Dropdowns built on <details data-dd-autoclose> (the top-bar avatar menu, the breadcrumb overflow). - Closes on a click outside, on Esc (focus inside it returns to the <summary>; focus elsewhere stays put), after choosing an item inside, and when another autoclose dropdown opens. That Esc goes no further (a dialog around it stays open), and an Esc something else already handled leaves it open. - ↓ on the summary opens it and focuses the first item; ↑/↓ move between items while it is open.
- **button-group** — Button group toggles: inside .dd-btn-group[data-dd-btn-toggle], a click on a button with aria-pressed flips it. Each button is independent (several can be pressed); for a single choice use the segmented control.
- **button** — Button: a busy (.is-loading) or aria-disabled .dd-btn ignores activation. CSS already stops pointer clicks; this also stops the keyboard (Enter / Space), a form's implicit submit and an aria-disabled link's navigation, so a busy Save can't be sent twice. Runs in the capture phase, before any other click handler.
- **chart** — Chart: keyboard, touch and table view for .dd-chart. Opt in with [data-dd-chart] on the .dd-chart figure. Marks — .dd-chart__slot (columns), .dd-chart__hit (line/area points), .dd-chart__seg (100% bar), .dd-chart__arc (donut) or anything with [data-dd-chart-point] — become ONE tab stop per group of siblings (roving tabindex): ← → (↑ ↓) step through the marks, Home / End jump to the ends, Esc hides the tooltip until the next move. The mark under the pointer, finger or keyboard focus gets .is-active, which shows its tooltip: the .dd-chart__tip inside it, or — for marks without one — a floating tip built from data-dd-chart-label / data-dd-chart-value (plus the mark's series class). Tapping a mark on a touch screen shows its tooltip; tapping elsewhere hides it. Tooltips flip to whichever side has room. View as table: a button [data-dd-chart-view] (aria-controls = the table container, or the figure's .dd-chart__data) swaps the plot for its data table and back; aria-pressed and .is-table on the figure follow. A plain <details class="dd-chart__data"> needs no script. Fires `dd:change` on the figure with { view: 'chart' | 'table' }. Expand: a button [data-dd-chart-expand] moves the figure into a large modal dialog (.dd-chart-dialog), leaving a placeholder of the same height, and moves it back when the dialog closes (Esc, backdrop, or the button again); focus returns to the button. Fires `dd:change` with { expanded: true | false }: expanded: true just before the figure leaves the page, expanded: false once it is back, so both reach listeners on its container. In between the figure sits in the dialog at the end of <body>: events from it then (a Table toggle) reach the figure itself and document, not its old container. The figure itself moves, so keep it out of framework-owned markup (render your own dialog there).
- **checkbox** — Checkbox helpers. - input[data-dd-indeterminate] starts in the mixed state (HTML has no attribute for it). - input[data-dd-check-all="key"] is a parent for every input[data-dd-check-in="key"]: checking it sets them all; changing a child updates the parent to checked, unchecked or mixed.
- **chip** — Chips: - Remove: a .dd-chip__remove button removes its chip (Enter, Space, Delete or Backspace on it works too). The chip gets a cancelable "dd:chip-remove" event first; focus moves to the neighbouring chip so keyboard users stay put. - Filter: <button class="dd-chip dd-chip--filter" aria-pressed="false"> toggles aria-pressed on click and fires "dd:chip-toggle" (detail.pressed). - Input: .dd-chip-input with a .dd-chip-input__field. Enter or a comma turns the text into a chip (colour picked from the Color set by the text, so a tag keeps its colour); a tag that is already there flashes (a still, deeper tint under reduced motion) instead of being added twice; Backspace in an empty field removes the last chip. The container fires "dd:chips-change" with detail.values (chips still playing their exit are left out). Icons come from the inline sprite (#dd-i-x). When a chip goes, the chips after it glide into its place (not under reduced motion). Inside [data-dd-manual] (chips a framework renders from state) the script does nothing; listen for clicks yourself.
- **code** — Code field reveal: a button with [data-dd-code-reveal] inside .dd-code-field swaps the masked value of its [data-dd-code-secret] element for the secret and back. aria-pressed tracks the state; the copy button (data-dd-copy) always copies the real secret. Optional data-dd-code-reveal-label="Show key|Hide key".
- **combobox** — Combobox — type to filter a listbox. Markup: [data-dd-combobox] (or ="multi") > .dd-input > input[role="combobox"] (+ optional [data-dd-combobox-toggle]) and [role="listbox"] > [role="option"][data-value] (+ optional .dd-listbox__group / .dd-listbox__empty). Single: choosing fills the input. Multi: choosing toggles the option and adds / removes a chip (.dd-combobox__chip, coloured from the option's data-set="1…8" or by position). Matches are underlined. An optional <input type="hidden"> receives the value (comma-separated for multi). Fires a bubbling "dd-combobox" event with detail { value, values, option } (+ created: true for a new value). data-dd-combobox-create on the wrapper allows new values: when the text matches no option exactly, a "Create “…”" row (.dd-combobox__create) ends the list; choosing it adds that option and selects it. Keyboard: ↓ / ↑ open and move · Enter chooses · Esc closes, then clears · Backspace on empty removes the last chip. Single, on blur: text that is exactly an option's label (any case) chooses it; anything else, an emptied field included, puts back the chosen label (or empties the field when nothing is chosen). Esc twice is how to clear.
- **command-palette** — Command palette: [data-dd-command="dialog-id"] opens that <dialog class="dd-command"> (empty value → the first one); ⌘K / Ctrl+K toggles the page's palette (the one marked [data-dd-hotkey], else the first). Typing filters .dd-command__item rows by their text and optional data-keywords; empty groups hide and .dd-command__empty shows (its .dd-command__query echoes the search). ↑ ↓ (or Ctrl+P / Ctrl+N) move the selected row, Enter runs it, Esc clears the search and then closes, a click on the backdrop closes (only when the press started there too, so drag-selecting the search text out of the box is safe). Running a row clicks it (links navigate), fires a bubbling `dd:command` event with detail { item, value } and closes the dialog. value = the row's data-value, else its name (the first part of .dd-command__body), else its text. Works on inline palettes too. Closing returns focus to what had focus before the palette opened, kept on the dialog as dialog.ddReturn (dialog.js uses it too: a row with data-dd-dialog-open hands focus back there when the dialog it opened closes).
- **copy** — Copy to clipboard: [data-dd-copy="text to copy"] or [data-dd-copy-target="#id"] (copies that element's text). The trigger gets [data-copied] for 1.6s so CSS can show a confirmation.
- **data-table** — Data table — opt in with [data-dd-data-table] on .dd-data-table. - Sort: <th aria-sort="none"><button class="dd-data-table__sort">…</button></th> cycles none → ascending → descending → none. Rows sort within each group; expanded detail rows travel with their row. A cell's data-value (if set) is used instead of its text. Two values compare as numbers only when both are fully numeric ("1,240", "0.5%", "-3", "−3" with a U+2212 minus), else as times when both are ISO dates ("2026-10-30", "2026-10-30T09:41"), else as text (localeCompare, numeric: true, so "v2" < "v10"). In a figure column (.is-num) a value like "84 ms" or "2 of 12" still reads as its first number and a dash counts as blank. Blanks sort last both ways. Emits dd:sort { column, direction, index }. - Select: .dd-data-table__check in the header selects every visible row (with indeterminate state); Shift-click selects a range. Disabled row boxes are never changed by the table (select all, range, clear) and don't count toward the header's checked / indeterminate state. Selected rows get .is-selected; .dd-data-table__bulk shows while anything is selected and [data-dd-data-table-selected] receives the count. [data-dd-data-table-clear] clears the selection (focus moves to the select-all box), and so does the bulk bar hiding while focus is in it. Emits dd:selectionchange { count, rows }. - Expand: .dd-data-table__expand[aria-controls] toggles its detail row (hidden) and aria-expanded. - Filter: [data-dd-data-table-search] (text), toggle chips [data-dd-data-table-filter="col=value"] with aria-pressed, and checkboxes with the same attribute (e.g. in a .dd-data-table__menu). Cells carry data-col="col" and optionally data-value. Same column = OR, different columns = AND. [data-dd-data-table-filter-label="col"] shows "all", the one value, or "2 selected", and marks its chip .is-active. A chip with [data-dd-data-table-removable] disappears once cleared. [data-dd-data-table-count="noun"] shows "12 services" / "3 of 12 services"; .dd-data-table__empty-row shows when nothing matches and [data-dd-data-table-query] receives the query. [data-dd-data-table-reset] clears filters and returns focus to the search. - Pages: a [data-dd-pagination] element inside the root (see pagination.js) pages the filtered rows in the browser. Filtering returns to page 1; sorting keeps the page. - Columns: inputs [data-dd-data-table-column="col"] show/hide the column whose <th data-col="col"> (rows added later too). - Menus (.dd-data-table__menu, a <details>) close on Esc (focus returns to the summary) and on any click outside. - Scroll: adds .is-scrolled-x / .is-scrolled-y to the root so the frozen column and sticky header cast an edge. - Rows added or removed from script (or a framework, even one that swaps the whole <tbody>) are picked up on their own: count, filters, empty row, hidden columns, pages and selection refresh on the next frame. dd.dataTable.refresh(root) does it by hand; for a table added to the page after load, its first call also sets the table up and starts watching its rows. - Focus: when a row that holds focus is removed, focus moves (without scrolling) to the first control of the next remaining visible row (else the previous one, else the select-all box, else the scroll region / table); a replaced <tbody> lands on its first row. A row that is only moved (re-sorted or re-inserted by a framework) gets its focus back. Once focus has moved on (elsewhere on the page, or to the page itself) a removed row leaves it alone; a menu or dialog opened from the row still counts as the row.
- **date-picker** — Calendar + date picker. Calendar: [data-dd-calendar] on a .dd-calendar with data-month="YYYY-MM", data-today, data-week-start (1 = Monday, default; 0 = Sunday), data-min / data-max (YYYY-MM-DD), data-mode="single" (data-value) or "range" (data-start / data-end). The script renders the month body, moves months ([data-dd-cal-nav="-1|1"]), selects days and supports ← → ↑ ↓, Page Up / Down (month), Home / End (week). Fires bubbling "dd:date" and legacy "dd-date" events with detail { value } or { start, end }. Date picker: [data-dd-date-picker] wraps a .dd-input (with a [data-dd-date-toggle] button) and a .dd-date-picker__popover holding a calendar. Choosing a day fills the input and closes; a range closes on its second click unless the popover has [data-dd-date-apply]. [data-start][data-end] or [data-days="7"] buttons with .dd-date-picker__preset set a range. Esc, the toggle, a click outside or tabbing out closes without changes (a range picked but not applied goes back). Single mode parses a typed date on change: YYYY-MM-DD (or YYYY-MM, the 1st) is a local day, anything else goes through Date.parse with data-today's year when none is typed ("Oct 14", "12/1"); a day the month doesn't have ("2026-02-31") is invalid, not rolled over.
- **dialog** — Dialog, drawer and sheet: native <dialog class="dd-dialog | dd-drawer | dd-sheet"> opened modally. - [data-dd-dialog-open="#id"] on any element opens that dialog with showModal() and remembers the opener. - [data-dd-dialog-close] inside a dialog closes it; a value (data-dd-dialog-close="delete") becomes dialog.returnValue. - <form method="dialog"> inside closes it on submit (after native validation) with the submitter's value. A submitter's own formmethod wins: <button formmethod="post"> posts the form instead, <button formmethod="dialog"> closes. - A click on the backdrop closes it, unless the dialog has data-dd-dialog-backdrop="static". Esc closes (native). - Closing plays the exit animation (.is-closing), then calls close(); focus returns to the opener. An opener inside a floating menu (a .dd-menu__item with data-dd-dialog-open) has closed with its menu, so focus goes to the button that opened that menu instead (menu.ddTrigger; for a submenu, the root menu's trigger). Likewise a command palette row (a .dd-command__item with data-dd-dialog-open) closes its palette as it runs, so focus goes to what had focus before the palette opened (palette.ddReturn). If that element is gone by then — removed before the dialog closed, or by a "close" listener (the row the dialog deleted) — focus lands on the nearest focusable where it was: the first control of the next element after it, else the one before, else further up the page. - Tab / Shift+Tab wrap inside the open dialog instead of leaving for the browser's own UI. - Inside a role="menu" list (sheet actions / choices): ↑ ↓ move between rows, Home / End jump to the ends. Choosing a role="menuitemradio" row marks it aria-checked (and unmarks the others); a menuitemcheckbox row flips. A .dd-menu inside the dialog is left to menu.js, which does the same for its own items. - Reopening a dialog while it plays its exit animation cancels the exit. - Global: dd.dialog.open('#id'), dd.dialog.close('#id', value). Listen for the native "close" event for the result.
- **dismiss** — Dismiss: a [data-dd-dismiss] button closes the alert, banner, callout or [data-dd-dismissible] element it sits in, or the element its value names (data-dd-dismiss="#promo"). The target first gets a cancelable "dd:dismiss" event (call preventDefault() to keep it), then fades, collapses and is removed. Focus still inside it at that point moves to its parent; focus that went elsewhere meanwhile stays there. dd.dismiss(el) does the same from code.
- **file-upload** — File upload. - [data-dd-dropzone] (a .dd-dropzone label around an <input type="file">) gets .is-dragover while files hover it; dropped files are handed to the input, which fires "change". - data-dd-dropzone="#listId" lists the chosen files in that .dd-file-list (name, size, a remove button). A multiple input adds to the list (and its files are everything listed); a single one replaces it. - Files that don't match the input's accept="…" or exceed data-dd-max-size ("20MB", "500KB", bytes) are listed as errors with the reason, and left out of the input's files. File inputs outside a dropzone are left alone. - [data-dd-file-remove] inside a .dd-file removes that row (with a short exit animation) and its file, then fires a bubbling "dd-file-remove" event on the list with detail { name }. - Resetting the form clears the rows the script listed (rows rendered by the page stay).
- **form-field** — Form field counter: a .dd-field__counter inside a .dd-field counts the characters of the field's control. The limit comes from data-dd-counter="280" (a soft limit: typing past it marks the field invalid, but doesn't stop a submit) or from the control's maxlength (a hard limit). The counter gets .is-near at 90% and .is-over past the limit, and re-counts when its form is reset. Form validation (form-layout.js) shares aria-invalid with the soft limit: each leaves it in place while the other still needs it. An error in the same field marked [data-dd-counter-error] shows only while a soft limit is passed. Leave a counter alone (a framework renders it) with data-dd-counter="manual" or [data-dd-manual] on an ancestor.
- **form-layout** — Form validation: <form data-dd-validate novalidate> checks its controls when it is submitted, using the browser's own constraints (required, type, pattern, min / max, minlength…) but showing the result in the form's own style. - Each invalid control gets aria-invalid="true" and a .dd-field__error under its box, linked with aria-describedby. A hint in the same spot steps aside while the error shows. The text, first match wins: a message set from script with setCustomValidity(); the control's message for this reason: data-dd-error-missing (required), data-dd-error-type (type="email" / url, or a number box holding text), data-dd-error-pattern, data-dd-error-range (min / max / step), data-dd-error-length (minlength / maxlength); the control's data-dd-error (any reason); the browser's own message. - Focus moves to the first invalid control, and the submit stops there: no other submit listener sees it. - After a failed submit, an error clears as soon as its control is valid again (on input) and follows the reason while it is still showing (an emptied name that now breaks the pattern says so); a control is re-checked when it is committed (on change) — never while someone is typing a first value. - Resetting the form clears every error. - A field's soft character limit (form-field.js) also sets aria-invalid; clearing an error leaves that mark alone while the text is over the limit. The soft limit never stops the submit. A valid form submits as usual: handle "submit" yourself. A submit button with formnovalidate skips the check.
- **guide-cue** — Guide cue: a short onboarding tour, one cue per step. <button data-dd-guide-start="deploys">Take the tour</button> <div class="dd-guide-cue" popover="manual" role="dialog" aria-labelledby="…" data-dd-guide="deploys" data-dd-guide-target="#new-deploy" data-dd-placement="bottom"> <span class="dd-guide-cue__arrow"></span> <p class="dd-guide-cue__step"></p>            ← filled with "1 of 3" (or its .dd-guide-cue__count; empty .dd-guide-cue__pips get one pip per step) <h3 class="dd-guide-cue__title">…</h3> <p class="dd-guide-cue__text">…</p> <div class="dd-guide-cue__actions"><button data-dd-guide-dismiss>Skip tour</button><button data-dd-guide-next>Next</button></div> </div> Steps run in document order; a cue whose target isn't on the page is skipped, both ways, and left out of the count and pips. [data-dd-guide-back] goes back a step (on the first it stays); Next on the last step finishes the tour; Esc (unless something inside already handled it) or [data-dd-guide-dismiss] ends it early. Each step scrolls its target into view, rings it, drops a beacon on it (in the dawn/dusk theme of the target's section) and points the arrow at it. Focus moves to the cue and returns to the start button at the end. Events on document: "dd:guide-step" (detail.index: the cue's place among all the tour's cues) and "dd:guide-end" (detail.completed). From code: dd.guide.start(name, trigger) · dd.guide.next() · dd.guide.back() · dd.guide.end().
- **json-viewer** — JSON viewer: renders [data-dd-json-viewer] from its inline <script type="application/json"> into a collapsible tree. - data-depth="2" sets how many levels start expanded (root = level 0). - Click a row to select it: the bar shows its path ($.replicas[0].region) and the copy button copies it. - Keyboard (WAI-ARIA tree): ↑/↓ move, → expand / first child, ← collapse / parent, Enter/Space toggle, Home/End. - dd.jsonViewer(el, data, { depth, label }) renders any value programmatically. Clicks and keys act only on trees rendered here; a tree a framework renders from the same classes is left to it.
- **log-viewer** — Log viewer: [data-dd-log-viewer] wires up its bar. - input[data-dd-log-viewer-search]: filters lines by text and highlights matches (service and message) with <mark>. Esc clears it, and goes no further (a dialog around it stays open); in an empty search Esc is left alone. - button[data-dd-log-viewer-level="debug|info|warn|error"]: aria-pressed toggles that level. - button[data-dd-log-viewer-wrap]: aria-pressed toggles .is-wrapped (long messages wrap instead of scrolling). - [data-dd-log-viewer-count]: gets “18 of 24 lines”; [data-dd-log-viewer-empty] shows when nothing matches. - button[data-dd-log-viewer-clear]: clears the search and turns every level back on. - button[data-dd-log-viewer-follow]: aria-pressed keeps the stream pinned to the newest line as lines arrive. Scrolling up to read pauses it; scrolling back to the bottom (or pressing it) resumes. Lines are .dd-log-viewer__line[data-level]; matches are highlighted inside .dd-log-viewer__msg. Append new lines to the list at any time: they are filtered, highlighted and counted like the rest.
- **menu** — Menu: a trigger with [data-dd-menu="menu-id"] toggles that .dd-menu (an empty value means the next .dd-menu sibling). [data-dd-contextmenu="menu-id"] on an area opens the menu at the pointer on right-click, Shift+F10 or the Menu key. An item inside a menu with [data-dd-menu] opens a submenu to its side, on hover or click (a click never closes it, as hovering may have opened it a moment before). Optional [data-dd-placement] on the trigger: bottom-start (default) · bottom-end · top-start · top-end. Menus flip when they would leave the viewport. Several triggers may share one menu (a ⋯ button per row): clicking another one moves the open menu to it. Which trigger: the menu fires dd:menuopen and dd:menuclose (they bubble) with detail { trigger } — the button that opened it, or the area for a context menu — and keeps menu.ddTrigger set to that element after it closes, so an item's click handler can read the row it was opened from (moving to another trigger fires close, then open). Global: dd.menu.open(menu, trigger, { focus: 'first' | 'last' | 'none' }), dd.menu.close(menu) (or no argument for every open menu), dd.menu.trigger(menu). `menu` is the element, its id or '#id'. Running an item closes every menu. Both hand focus back to the trigger only while it is still in the menus (or was dropped on <body>): an item handler that moved it elsewhere (into an inline rename field, a dialog) keeps it there. Keyboard: ↓ / ↑ on the trigger open at the first / last item; in the menu ↑ ↓ Home End move, a letter jumps (to the next item starting with it; letters typed quickly match a prefix, staying on the current item while it still matches), → opens a submenu, ← closes it, Esc closes and returns focus, Tab closes. Clicking outside closes. role=menuitemcheckbox toggles aria-checked; role=menuitemradio checks one per group — both keep the menu open.
- **pagination** — Pagination — opt in with [data-dd-pagination] on a .dd-pagination, or on a wrapper that also holds the page-size select. State lives in attributes: data-page (1-based) and either data-pages, or data-total + data-page-size (a .dd-pagination__size select inside sets the size when data-page-size is absent). The behaviour keeps the markup in step: numbered pages (first, last, the current page and its neighbours, a gap for the rest: never more than seven slots), aria-current="page", "Page 4 of 50", the range ("<b>151–200</b> of 2,481") and aria-disabled on the arrows at either end (they stay focusable, so keyboard focus never drops). The first .dd-pagination__step goes back, the last goes forward, counted within each list of pages (or pager): one root can hold the same pagination above and below a table. Clicking a page or an arrow, or changing the size, emits a bubbling dd:pagechange with { page, pages, pageSize, total, from, to }. dd.pagination(el, { page, pages, total, pageSize }) sets state from script (no event) and returns it. Without the attribute the markup is static: render links with real hrefs on the server.
- **popover** — Popover: <button popovertarget="deploy-pop"> + <div class="dd-popover" id="deploy-pop" popover role="dialog">. The browser does the opening, Esc and outside-click closing, and puts the panel in the top layer; this script places it beside the button that opened it, flips it when there is no room, points .dd-popover__arrow at the button, keeps aria-expanded in sync and follows the button on scroll and resize. data-dd-placement  on the popover: bottom (default) · top · left · right, optionally -start / -end From code: dd.popover.open(panel, anchor) · dd.popover.close(panel) · dd.popover.toggle(panel, anchor).
- **scrollbar** — Scrollbar width: keeps --dd-scrollbar-w on <html> at the width of the page's vertical scrollbar (0 with overlay scrollbars), so base.css can pad the page by it while a modal layer locks scrolling — nothing shifts sideways. It is only measured while the page is not locked.
- **segmented-control** — Segmented control (button flavour): [data-dd-segmented] holds role="radio" buttons with aria-checked. Click or ← → ↑ ↓ Home End choose a segment; only the chosen one is in the tab order (roving tabindex). On change the control fires a bubbling `dd:change` event with detail { value, item } (value = the item's value / data-value attribute, or its label). The radio flavour needs no script.
- **select** — Select menu — a button that opens a listbox of options. Markup: [data-dd-select] > button[aria-haspopup="listbox"] (.dd-select) + [role="listbox"] (.dd-listbox, hidden) > [role="option"][data-value] (aria-selected on the chosen one, aria-disabled to skip). The trigger's [data-dd-select-value] (or its .dd-input__control) shows the chosen option's label; an optional <input type="hidden"> inside the root receives the value. Fires bubbling "dd:select" and legacy "dd-select" events with detail { value, label, option, values, selected }, and "change" on the hidden input. Multiple: aria-multiselectable="true" on the listbox. Choosing toggles an option and keeps the list open; the trigger lists the chosen labels (or its placeholder when none), the hidden input gets the values joined by commas, and detail.values holds them all. Keyboard: Enter / Space / ↓ / ↑ / Home / End open; ↑ ↓ Home End move; type to jump (a letter typed again cycles through the options that start with it; typing on the closed trigger opens it there); Enter / Space choose (toggle in a multiple list); Esc closes.
- **side-nav** — Side nav (.dd-side-nav): collapse, sections and the mobile off-canvas mode. - [data-dd-nav-toggle] folds / unfolds the page panel of its nav (or of the nav named by its value, e.g. "#app-nav"). A nav with an id remembers the choice in localStorage ("dd-side-nav:<id>"). aria-expanded follows; an aria-label / data-label of "Collapse navigation" / "Collapse" swaps with "Expand …", any other label is the author's and stays. - [data-dd-nav-section="name"] on a rail item shows the pane [data-dd-nav-pane="name"]; pressing the active one again folds the panel, like the chevron. - [data-dd-nav-open="#id"] opens a nav that is off-canvas (mobile); [data-dd-nav-close] closes it. Esc (unless something inside already handled it), a click on the scrim, the chevron or following a link inside also close it, and focus returns to the opener. Tabbing out of it, onto anything outside (the menu button too), closes it and focus stays where it went. While it covers the viewport the page behind doesn't scroll (.dd-side-nav-lock on <html>). If it stops being off-canvas while open (the window widens past the breakpoint) it is simply in view, and closes.
- **slider** — Slider: keeps a .dd-slider's fill and labels in step with its range inputs. - Single: sets --_p (0–1) on the slider. Range (.dd-slider--range, two inputs): sets --_lo / --_hi and stops the thumbs crossing. - <output for="inputId"> (anywhere) shows that input's value; data-unit on the output appends a unit. - .dd-slider__bubble[data-for="inputId"] rides above its thumb. - .dd-slider__ticks > [data-value] gets .is-active when it matches a value. - When a value is committed (thumb released, or a key step) the .dd-slider fires a bubbling `dd:change` event with detail { value, input }: value is a number, or [low, high] for a range.
- **tabs** — Tabs: [data-dd-tabs] wraps a [role="tablist"] of [role="tab"] buttons and their [role="tabpanel"]s. - A tab finds its panel through aria-controls, or by order when aria-controls is missing (ids are filled in). - Roving focus: only the selected tab is in the tab order; Tab from it moves into its panel. - Automatic activation: ←/→ (↑/↓ when the list has aria-orientation="vertical"), Home and End move focus and select the tab in one step, wrapping at the ends; disabled tabs are skipped. - Fires "dd:tabchange" on the [data-dd-tabs] element when the selection changes (not on load, not when the current tab is pressed again) with { detail: { tab, panel, previous } }. - Global: dd.tabs.select(tabOrSelector) · dd.tabs.init() wires tabs added to the page later (left alone, they wire themselves the first time focus, a click or a key reaches them).
- **terminal** — Terminal (.dd-code--terminal): typing playback, copy-the-commands and a live prompt. Opt in per terminal: Markup: one .dd-code__line per line (plain newline-separated markup is wrapped for you). A line with a .dd-code__prompt is a command line; its command is the .dd-code__input after the prompt (or everything after it). - [data-dd-terminal-play]: when the terminal scrolls into view, commands type out with a block cursor, output follows after a short beat, then it rests. data-dd-terminal-speed="42" sets ms per character; data-dd-terminal-delay="600" on a line holds before it appears. button[data-dd-terminal-replay] plays it again; a click in the terminal skips to the end. With prefers-reduced-motion the final state shows at once (and replay hides). - button[data-dd-terminal-copy]: copies only the commands, one per line — no prompts, no output. [data-copied] 1.6s. - [data-dd-terminal-line-copy]: adds a small copy button to every command line (on hover / focus). - [data-dd-terminal-interactive]: the last prompt goes live. Enter runs the line against <template data-dd-terminal-command="npm test" data-dd-terminal-description="run the tests">output</template> inside the terminal; unknown commands get a friendly "command not found". Built in: help, clear (also Ctrl+L), Ctrl+C. ↑/↓ recall history, Tab completes known commands (only when there is something to complete — otherwise Tab moves focus as usual). Output is announced through a polite live region. data-dd-terminal-label names the input. One command runs at a time: Enter while output is still printing runs next (type-ahead), and so does run(). A replay drops whatever was printing or waiting. The terminal reports data-dd-terminal-state="playing|done" and fires dd:terminalplayed and dd:terminalrun (detail: { command, known }). API: dd.terminal(el) → { play(), finish(), run(command) }; dd.terminal.init(root). run() returns a promise for when its output has printed and leaves what the visitor is typing alone.
- **text-input** — Text input helpers, all opt-in and delegated from document: - [data-dd-reveal]  on a button inside .dd-input toggles its control between password and text (aria-pressed) and swaps its aria-label; optional data-dd-reveal-label="Show password|Hide password" sets the pair. - [data-dd-clear]   empties the control, fires input/change and puts focus back (not on a disabled or read-only one). - [data-dd-step="1"|"-1"] steps a number control (stepUp / stepDown honour min, max and step); the button is disabled while the value sits on that end of the range, re-checked when the form is reset.
- **textarea** — Textarea auto-grow: textarea[data-dd-autogrow] resizes to its content on every input, up to its CSS max-height, then scrolls. One that is hidden at the time (a closed dialog, another tab) is fitted when it shows. (Browsers with field-sizing: content do this natively; the script keeps the others in step.)
- **toast** — Toast: dd.toast({ title, description, intent, action, duration }) adds a toast to the stack at the bottom-right. intent    'info' (default) · 'ok' · 'warn' · 'bad' · 'neutral' action    { label: 'Undo', onClick(toast) {} } — clicking it runs onClick, then dismisses the toast duration  ms before it leaves on its own (default 5000; 0 keeps it until dismissed). A hairline shows the time left; hovering or focusing the stack pauses every timer, and so does hiding the tab. icon      any sprite name, to override the intent's icon dismissible  false leaves out the × button (default true) Swipe a toast sideways (or drag it with the mouse) to dismiss it; Esc dismisses the toast that has focus, and focus then moves to the next toast or back to where it was before the stack. The stack is a manual popover (top layer), so toasts show above modal dialogs; while a modal is open the stack moves inside it so its buttons aren't inert — also when the modal opens over toasts already showing (however it was opened: dd, the palette, showModal()). Returns { el, dismiss() }. dd.toast('Saved') works too, and dd.toast.clear() empties the stack. Declarative: <button data-dd-toast="Title" data-dd-toast-description="…" data-dd-toast-intent="ok" data-dd-toast-action="Undo" data-dd-toast-duration="8000">. The toast takes the dawn/dusk theme of the element that raised it, so a toast from a dusk panel is a dusk toast. Icons come from the inline sprite (#dd-i-NAME); set dd.iconSprite = 'icons.svg' to use an external one.
- **tooltip** — Tooltip: data-dd-tooltip="Copy link" on any element shows a tooltip on mouse hover (after a short delay; instant while moving between tooltips) and on keyboard focus. Esc, a click, scrolling or leaving hides it. data-dd-tooltip-placement  top (default) · bottom · left · right, optionally -start / -end. Flips when it doesn't fit. data-dd-tooltip-kbd        a key hint, keys separated by spaces: "⌘ K" → <kbd>⌘</kbd><kbd>K</kbd> One shared .dd-tooltip (role="tooltip") lives at the end of <body> — or, for a trigger inside an open modal dialog (drawer, sheet), at the end of that dialog, since everything outside a modal is inert. While it is open the trigger points at it with aria-describedby. It takes the dawn/dusk theme of its trigger. Pointer can move onto the tooltip without losing it. Esc hides it and stops there (an Esc inside a dialog hides the tooltip, not the dialog); an Esc something else already handled is left alone. Where the browser supports it the tooltip is a manual popover, so it shows in the top layer — above open dialogs, drawers and popovers whose buttons it describes.
