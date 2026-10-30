/* Chips:
   - Remove: a .dd-chip__remove button removes its chip (Enter, Space, Delete or Backspace on it works too). The chip
     gets a cancelable "dd:chip-remove" event first; focus moves to the neighbouring chip so keyboard users stay put.
   - Filter: <button class="dd-chip dd-chip--filter" aria-pressed="false"> toggles aria-pressed on click and fires
     "dd:chip-toggle" (detail.pressed).
   - Input: .dd-chip-input with a .dd-chip-input__field. Enter or a comma turns the text into a chip (colour picked
     from the Color set by the text, so a tag keeps its colour); Backspace in an empty field removes the last chip.
     The container fires "dd:chips-change" with detail.values. Icons come from the inline sprite (#dd-i-x). */
(() => {
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const valueOf = (chip) => chip.dataset.value || chip.textContent.trim();
  const valuesIn = (box) => [...box.querySelectorAll('.dd-chip')].map(valueOf);
  const changed = (box) => box?.dispatchEvent(new CustomEvent('dd:chips-change', { bubbles: true, detail: { values: valuesIn(box) } }));

  const remove = (chip) => {
    if (!chip || chip.classList.contains('is-leaving')) return;
    if (!chip.dispatchEvent(new CustomEvent('dd:chip-remove', { bubbles: true, cancelable: true, detail: { value: valueOf(chip) } }))) return;
    const box = chip.closest('.dd-chip-input');
    if (chip.contains(document.activeElement)) {
      const peers = [...chip.parentElement.querySelectorAll(':scope > .dd-chip .dd-chip__remove')];
      const i = peers.indexOf(chip.querySelector('.dd-chip__remove'));
      const next = peers[i + 1] || peers[i - 1] || box?.querySelector('.dd-chip-input__field');
      next?.focus();
    }
    const gone = () => { chip.remove(); changed(box); };
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
      if (!valuesIn(box).some((v) => v.toLowerCase() === text.toLowerCase())) {
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
