// Inline reference to an icon in the sprite that the docs layout embeds: i('plus') → <svg class="dd-icon">…</svg>.
// Names: see ds/icons/icons.svg (dd-i-NAME).
export const i = (name: string, label?: string) =>
  label
    ? `<svg class="dd-icon" role="img" aria-label="${label}"><use href="#dd-i-${name}"/></svg>`
    : `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-${name}"/></svg>`;
