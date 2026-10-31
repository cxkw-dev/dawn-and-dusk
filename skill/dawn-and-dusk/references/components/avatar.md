# avatar — `avatar`

A person, a team, a project or a service — as a photo, initials or an icon. Initials take a colour from the Color set, washed the same way as a chip.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/avatar

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Initials

30% of a Color set hue over the page, deep text in the same hue. Pick the colour from a hash of the user id so a person keeps their colour everywhere.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <span class="dd-avatar dd-avatar--set-1" role="img" aria-label="Andy Nguyen">AN</span>
  <span class="dd-avatar dd-avatar--set-2" role="img" aria-label="Mai Kha">MK</span>
  <span class="dd-avatar dd-avatar--set-3" role="img" aria-label="Jonas Sauer">JS</span>
  <span class="dd-avatar dd-avatar--set-4" role="img" aria-label="Rosa Lind">RL</span>
  <span class="dd-avatar dd-avatar--set-5" role="img" aria-label="Tomás Cruz">TC</span>
  <span class="dd-avatar dd-avatar--set-6" role="img" aria-label="Elif Varol">EV</span>
  <span class="dd-avatar dd-avatar--set-7" role="img" aria-label="Omar Bello">OB</span>
  <span class="dd-avatar dd-avatar--set-8" role="img" aria-label="Hana Park">HP</span>
</div>
```

## Sizes

xs 20 · sm 28 · md 36 (default) · lg 48 · xl 64. Initials scale with the circle.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-4); align-items: end">
  <span class="dd-avatar dd-avatar--xs dd-avatar--set-1" role="img" aria-label="Andy Nguyen">AN</span>
  <span class="dd-avatar dd-avatar--sm dd-avatar--set-1" role="img" aria-label="Andy Nguyen">AN</span>
  <span class="dd-avatar dd-avatar--set-1" role="img" aria-label="Andy Nguyen">AN</span>
  <span class="dd-avatar dd-avatar--lg dd-avatar--set-1" role="img" aria-label="Andy Nguyen">AN</span>
  <span class="dd-avatar dd-avatar--xl dd-avatar--set-1" role="img" aria-label="Andy Nguyen">AN</span>
  <span class="dd-avatar dd-avatar--xs"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt="Mai Kha"></span>
  <span class="dd-avatar dd-avatar--sm"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt="Mai Kha"></span>
  <span class="dd-avatar"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt="Mai Kha"></span>
  <span class="dd-avatar dd-avatar--lg"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt="Mai Kha"></span>
  <span class="dd-avatar dd-avatar--xl"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt="Mai Kha"></span>
</div>
```

## Photos, projects and services

A photo fills the circle. Projects, teams and services are square, with initials or an icon.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-3)">
  <span class="dd-avatar dd-avatar--lg"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt="Mai Kha"></span>
  <span class="dd-avatar dd-avatar--lg"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23d5dde3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%238aa2b6%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%231f1a17%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%23e8e3db%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23c99a78%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23c99a78%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%231f1a17%22%2F%3E%3C%2Fsvg%3E" alt="Jonas Sauer"></span>
  <span class="dd-avatar dd-avatar--lg"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23efdcae%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c99c4a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%238a5233%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%239c4f5f%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23f0caa8%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23f0caa8%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%238a5233%22%2F%3E%3C%2Fsvg%3E" alt="Rosa Lind"></span>
  <span class="dd-avatar dd-avatar--lg dd-avatar--square dd-avatar--set-1" role="img" aria-label="dawn-and-dusk">dd</span>
  <span class="dd-avatar dd-avatar--lg dd-avatar--square dd-avatar--set-6" role="img" aria-label="insomnia"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-moon"/></svg></span>
  <span class="dd-avatar dd-avatar--lg dd-avatar--square dd-avatar--set-1" role="img" aria-label="ai-focus"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-sparkle"/></svg></span>
  <span class="dd-avatar dd-avatar--lg dd-avatar--square" role="img" aria-label="edge-cache"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg></span>
</div>
```

## Group

Avatars overlap a little, each ringed in the page colour so the edges read; a “+3” closes the group. On a surface, set `--dd-avatar-ring: var(--dd-surface)` on the container — the ring and the initials wash both follow it. Label the group, not each avatar.

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-4)">
  <div class="dd-avatar-group" role="group" aria-label="Reviewers: Andy Nguyen, Mai Kha, Jonas Sauer, Rosa Lind and 3 more">
    <span class="dd-avatar dd-avatar--set-1" aria-hidden="true">AN</span>
    <span class="dd-avatar" aria-hidden="true"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt=""></span>
    <span class="dd-avatar dd-avatar--set-4" aria-hidden="true">JS</span>
    <span class="dd-avatar" aria-hidden="true"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23efdcae%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c99c4a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%238a5233%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%239c4f5f%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23f0caa8%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23f0caa8%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%238a5233%22%2F%3E%3C%2Fsvg%3E" alt=""></span>
    <span class="dd-avatar dd-avatar--more" aria-hidden="true">+3</span>
  </div>
  <div class="dd-avatar-group" role="group" aria-label="Watching: 5 people">
    <span class="dd-avatar dd-avatar--sm dd-avatar--set-2" aria-hidden="true">TC</span>
    <span class="dd-avatar dd-avatar--sm dd-avatar--set-5" aria-hidden="true">EV</span>
    <span class="dd-avatar dd-avatar--sm" aria-hidden="true"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23d5dde3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%238aa2b6%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%231f1a17%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%23e8e3db%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23c99a78%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23c99a78%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%231f1a17%22%2F%3E%3C%2Fsvg%3E" alt=""></span>
    <span class="dd-avatar dd-avatar--sm dd-avatar--set-8" aria-hidden="true">HP</span>
    <span class="dd-avatar dd-avatar--sm dd-avatar--more" aria-hidden="true">+1</span>
  </div>
  <div class="dd-surface" style="padding: var(--dd-space-4); --dd-avatar-ring: var(--dd-surface)">
    <div class="dd-avatar-group" role="group" aria-label="On a surface: 4 people">
      <span class="dd-avatar dd-avatar--sm dd-avatar--set-6" aria-hidden="true">OB</span>
      <span class="dd-avatar dd-avatar--sm dd-avatar--set-7" aria-hidden="true">RL</span>
      <span class="dd-avatar dd-avatar--sm dd-avatar--set-1" aria-hidden="true">AN</span>
      <span class="dd-avatar dd-avatar--sm dd-avatar--more" aria-hidden="true">+1</span>
    </div>
  </div>
</div>
```

## Status

Drop a status dot inside and it pins to the bottom-right, ringed like the group. Put the status in the label too.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-4)">
  <span class="dd-avatar dd-avatar--set-1" role="img" aria-label="Andy Nguyen, online">AN<span class="dd-status-dot dd-status-dot--online"></span></span>
  <span class="dd-avatar" role="img" aria-label="Mai Kha, idle"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt=""><span class="dd-status-dot dd-status-dot--idle"></span></span>
  <span class="dd-avatar dd-avatar--set-4" role="img" aria-label="Jonas Sauer, offline">JS<span class="dd-status-dot dd-status-dot--offline"></span></span>
  <span class="dd-avatar dd-avatar--lg" role="img" aria-label="Rosa Lind, online"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23efdcae%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c99c4a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%238a5233%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%239c4f5f%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23f0caa8%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23f0caa8%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%238a5233%22%2F%3E%3C%2Fsvg%3E" alt=""><span class="dd-status-dot dd-status-dot--online"></span></span>
  <span class="dd-avatar dd-avatar--lg dd-avatar--square" role="img" aria-label="billing-worker, error"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-server"/></svg><span class="dd-status-dot dd-status-dot--error"></span></span>
</div>
```

## Interactive

Make an avatar a `<button>` (an account menu) or an `<a>` (a profile) and it answers the pointer with a soft halo, which stays while its menu is open. In a group, the avatar under the pointer or keyboard focus comes to the front and lifts 2px, so it is whole and its focus ring is never covered by a neighbour. Name each one with `aria-label` and a tooltip.

Try it: open the account menu (click, or Tab to it and press Enter or ↓); hover or Tab along the reviewers to bring each one forward with its name.

```html
<div class="dd-row" style="--dd-gap: var(--dd-space-8); align-items: center">
  <div>
    <button class="dd-avatar dd-avatar--set-1" type="button" aria-label="Account: Andy Nguyen" data-dd-menu="av-account" data-dd-placement="bottom-start" aria-haspopup="menu" aria-expanded="false" aria-controls="av-account">AN<span class="dd-status-dot dd-status-dot--online"></span></button>
    <div class="dd-menu" id="av-account" role="menu" aria-label="Account" hidden>
      <div class="dd-menu__header"><span>Andy Nguyen</span><span>andy@cxkw.dev</span></div>
      <hr class="dd-menu__sep">
      <button class="dd-menu__item" role="menuitem" data-dd-toast="Opening your profile" data-dd-toast-description="In an app this goes to cxkw.dev/people/andy."><span class="dd-menu__body">Profile</span></button>
      <button class="dd-menu__item" role="menuitem" data-dd-toast="Opening settings" data-dd-toast-description="In an app this opens account settings."><span class="dd-menu__body">Settings</span></button>
      <hr class="dd-menu__sep">
      <button class="dd-menu__item" role="menuitem" data-dd-toast="Signed out" data-dd-toast-description="Not really — this is the docs." data-dd-toast-intent="neutral"><span class="dd-menu__body">Sign out</span></button>
    </div>
  </div>
  <div class="dd-avatar-group" role="group" aria-label="Reviewers">
    <a class="dd-avatar dd-avatar--set-1" href="#" aria-label="Andy Nguyen" data-dd-tooltip="Andy Nguyen">AN</a>
    <a class="dd-avatar" href="#" aria-label="Mai Kha" data-dd-tooltip="Mai Kha"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6d2b2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e09a72%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%233b2a22%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%236a5c4e%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23eab993%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23eab993%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%233b2a22%22%2F%3E%3C%2Fsvg%3E" alt=""></a>
    <a class="dd-avatar dd-avatar--set-4" href="#" aria-label="Jonas Sauer" data-dd-tooltip="Jonas Sauer">JS</a>
    <a class="dd-avatar" href="#" aria-label="Rosa Lind" data-dd-tooltip="Rosa Lind"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23efdcae%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23c99c4a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%238a5233%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%239c4f5f%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23f0caa8%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23f0caa8%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%238a5233%22%2F%3E%3C%2Fsvg%3E" alt=""></a>
    <a class="dd-avatar dd-avatar--more" href="#" aria-label="3 more reviewers" data-dd-tooltip="Tomás Cruz, Elif Varol, Omar Bello">+3</a>
  </div>
</div>
```

## With a name

```html
<div class="dd-stack" style="--dd-gap: var(--dd-space-4)">
  <span class="dd-avatar-label">
    <span class="dd-avatar dd-avatar--set-1" aria-hidden="true">AN<span class="dd-status-dot dd-status-dot--online"></span></span>
    <span class="dd-avatar-label__text"><span>Andy Nguyen</span><span>andy@cxkw.dev · Owner</span></span>
  </span>
  <span class="dd-avatar-label">
    <span class="dd-avatar dd-avatar--sm" aria-hidden="true"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23d5dde3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%238aa2b6%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2227%22%20r%3D%2214%22%20fill%3D%22%231f1a17%22%2F%3E%3Cellipse%20cx%3D%2232%22%20cy%3D%2264%22%20rx%3D%2222%22%20ry%3D%2216%22%20fill%3D%22%23e8e3db%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2236%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%223%22%20fill%3D%22%23c99a78%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2230%22%20r%3D%2211%22%20fill%3D%22%23c99a78%22%2F%3E%3Cpath%20d%3D%22M20%2028c1-8%206-12%2012-12s11%204%2012%2012c-4-4-8-5-12-5s-8%201-12%205z%22%20fill%3D%22%231f1a17%22%2F%3E%3C%2Fsvg%3E" alt=""></span>
    <span class="dd-avatar-label__text"><span>Jonas Sauer</span><span>Pushed 3 commits to dockey-ui</span></span>
  </span>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-avatar` | Circle, 36px. Holds initials, an `<img>` or an icon. Neutral greige without a colour. |
| `.dd-avatar--set-{1…8}` | Initials colour from the Color set (or set `--dd-avatar-color`). |
| `.dd-avatar--{size}` | Size: `xs` 20 · `sm` 28 · `md` 36 · `lg` 48 · `xl` 64px. Or set `--dd-avatar-size`. |
| `.dd-avatar--square` | Rounded square, for projects, teams and services. |
| `.dd-avatar--more` | The “+3” overflow count. |
| `> .dd-status-dot` | Presence, pinned bottom-right. |
| `.dd-avatar-group` | Overlapping row. Ring colour: `--dd-avatar-ring` (default `--dd-bg`). |
| `.dd-avatar-label / __text` | Avatar beside a name and a muted second line. |
| `a.dd-avatar / button.dd-avatar` | Interactive: a `--dd-wash-strong` halo on hover and while `aria-expanded="true"`; 1px press. In a group it comes to the front and lifts 2px on hover and focus. |

## Guidelines

Do:
- Use two initials, uppercase.
- Give photo avatars real alt text, or `alt=""` when the name is right beside them.
- Show at most five in a group, then “+N”.

Don't:
- Don’t pick avatar colours by hand per screen — derive them from the id.
- Don’t use primary apricot for people; it means “do this”.
- Don’t rely on the status dot alone to say someone is offline.

