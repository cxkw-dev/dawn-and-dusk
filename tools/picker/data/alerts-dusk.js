/* Dusk fix for the Soft fill alert family (the user's pick #20 and its round-4 families).
   In dark mode the soft washes were mixed into the page colour and went muddy, and the toast was a cream slab.
   Dusk only: a stronger, near-opaque tint over the card surface (no border), and raise the toast as a dark surface. */
(() => {
  const c = DD.byId.alerts;
  if (!c) return;
  const DUSK = `
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al:not(.al--toast) {
  background: color-mix(in oklab, var(--c) 30%, var(--surface));
  box-shadow: inset var(--al-edge, 0px) 0 0 var(--c);
}
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al-ic { color: var(--c); }
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al-d { color: color-mix(in oklab, var(--text) 78%, var(--c)); }
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al--toast {
  background: color-mix(in oklab, var(--text) 11%, var(--bg)); color: var(--text);
  box-shadow: 0 18px 40px -14px rgb(0 0 0 / 0.65);
}
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al--toast .al-t,
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al--toast .al-btn { color: var(--text); }
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al--toast .al-d { color: var(--muted); }
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al--toast .al-ic { color: var(--c); background: color-mix(in oklab, var(--c) 18%, transparent); }
:is(html[data-mode="dusk"] .dd-scope:not(.fixed-dawn), .dd-scope.fixed-dusk) & .al--toast .al-x { color: var(--faint); }
`;
  c.options.forEach((o) => {
    if (/^Soft fill/.test(o.name)) o.css = (o.css || '') + DUSK;
  });
})();
