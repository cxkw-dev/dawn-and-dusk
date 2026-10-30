/* Chips:
   - Remove: a .dd-chip__remove button removes its chip (Enter, Space, Delete or Backspace on it works too). The chip
     gets a cancelable "dd:chip-remove" event first; focus moves to the neighbouring chip so keyboard users stay put.
   - Filter: <button class="dd-chip dd-chip--filter" aria-pressed="false"> toggles aria-pressed on click and fires
     "dd:chip-toggle" (detail.pressed).
   - Input: .dd-chip-input with a .dd-chip-input__field. Enter or a comma turns the text into a chip (colour picked
     from the Color set by the text, so a tag keeps its colour); a tag that is already there flashes (a still, deeper
     tint under reduced motion) instead of being added twice; Backspace in an empty field removes the last chip.
     The container fires "dd:chips-change" with detail.values. Icons come from the inline sprite (#dd-i-x).
   When a chip goes, the chips after it glide into its place (not under reduced motion). */
(() => {
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const valueOf = (chip) => chip.dataset.value || chip.textContent.trim();
  const valuesIn = (box) => [...box.querySelectorAll('.dd-chip')].map(valueOf);
  const changed = (box) => box?.dispatchEvent(new CustomEvent('dd:chips-change', { bubbles: true, detail: { values: valuesIn(box) } }));

  const remove = (chip) => {
    if (!chip || chip.classList.contains('is-leaving')) return;
    if (!chip.dispatchEvent(new CustomEvent('dd:chip-remove', { bubbles: true, cancelable: true, detail: { value: valueOf(chip) } }))) return;
    const box = chip.closest('.dd-chip-input');
    const parent = chip.parentElement;
    if (chip.contains(document.activeElement)) {
      const peers = [...parent.querySelectorAll(':scope > .dd-chip:not(.is-leaving) .dd-chip__remove')];
      const i = peers.indexOf(chip.querySelector('.dd-chip__remove'));
      const next = peers[i + 1] || peers[i - 1] || box?.querySelector('.dd-chip-input__field');
      if (next) next.focus();
      else {
        // Last chip in a plain group: keep focus nearby instead of dropping it on <body>.
        if (!parent.hasAttribute('tabindex')) {
          parent.setAttribute('tabindex', '-1');
          parent.addEventListener('blur', () => parent.removeAttribute('tabindex'), { once: true });
        }
        parent.focus({ preventScroll: true });
      }
    }
    const gone = () => {
      // The chips after this one glide into the space it leaves (FLIP), even across a wrapped line.
      const rest = still() ? [] : [...parent.children].filter((c) => c !== chip);
      const before = rest.map((c) => c.getBoundingClientRect());
      chip.remove();
      rest.forEach((c, n) => {
        const r = c.getBoundingClientRect();
        const dx = before[n].left - r.left;
        const dy = before[n].top - r.top;
        if (Math.abs(dx) + Math.abs(dy) > 0.5) c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 160, easing: 'cubic-bezier(.45, 0, .55, 1)' });
      });
      changed(box);
    };
    if (still()) return gone();
    chip.classList.add('is-leaving');
    setTimeout(gone, 170);
  };

  const hue = (text) => { let h = 0; for (const ch of text.toLowerCase()) h = (h * 31 + ch.codePointAt(0)) >>> 0; return (h % 8) + 1; };
  const create = (text) => {
    const chip = document.createElement('span');
    chip.className = `dd-chip dd-chip--set-${hue(text)}`;
    chip.dataset.value = text;
    const label = document.createElement('span');
    label.textContent = text;
    const x = document.createElement('button');
    x.type = 'button';
    x.className = 'dd-chip__remove';
    x.setAttribute('aria-label', `Remove ${text}`);
    x.innerHTML = `<svg class="dd-icon" aria-hidden="true"><use href="${(window.dd && window.dd.iconSprite) || ''}#dd-i-x"/></svg>`;
    chip.append(label, x);
    return chip;
  };

  document.addEventListener('click', (e) => {
    const x = e.target.closest('.dd-chip__remove');
    if (x) { e.preventDefault(); remove(x.closest('.dd-chip')); return; }
    const f = e.target.closest('button.dd-chip[aria-pressed]');
    if (f) {
      const on = f.getAttribute('aria-pressed') !== 'true';
      f.setAttribute('aria-pressed', String(on));
      f.dispatchEvent(new CustomEvent('dd:chip-toggle', { bubbles: true, detail: { pressed: on } }));
      return;
    }
    const box = e.target.closest('.dd-chip-input');
    if (box && !e.target.closest('.dd-chip, input')) box.querySelector('.dd-chip-input__field')?.focus();
  });

  document.addEventListener('keydown', (e) => {
    const x = e.target.closest?.('.dd-chip__remove');
    if (x && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); remove(x.closest('.dd-chip')); return; }
    const field = e.target.closest?.('.dd-chip-input__field');
    if (!field || e.isComposing) return;
    const box = field.closest('.dd-chip-input');
    if (e.key === 'Enter' || e.key === ',') {
      const text = field.value.replace(/,/g, '').trim();
      e.preventDefault();
      if (!text) return;
      const twin = [...box.querySelectorAll('.dd-chip:not(.is-leaving)')].find((c) => valueOf(c).toLowerCase() === text.toLowerCase());
      if (twin) {
        twin.classList.remove('is-duplicate');
        void twin.offsetWidth;
        twin.classList.add('is-duplicate');
        // Motion: the nudge animation clears it. Reduced motion: a still, deeper tint held briefly.
        clearTimeout(twin.ddDuplicate);
        if (still()) twin.ddDuplicate = setTimeout(() => twin.classList.remove('is-duplicate'), 600);
        else twin.addEventListener('animationend', () => twin.classList.remove('is-duplicate'), { once: true });
      } else {
        field.before(create(text));
        changed(box);
      }
      field.value = '';
    } else if (e.key === 'Backspace' && !field.value) {
      const chips = box.querySelectorAll('.dd-chip:not(.is-leaving)');
      if (chips.length) { e.preventDefault(); remove(chips[chips.length - 1]); }
    }
  });

  window.dd = window.dd || {};
  window.dd.chip = { remove, create };
})();
