/* Terminal (.dd-code--terminal): typing playback, copy-the-commands and a live prompt. Opt in per terminal:
   Markup: one .dd-code__line per line (plain newline-separated markup is wrapped for you). A line with a
   .dd-code__prompt is a command line; its command is the .dd-code__input after the prompt (or everything after it).
   - [data-dd-terminal-play]: when the terminal scrolls into view, commands type out with a block cursor, output follows
     after a short beat, then it rests. data-dd-terminal-speed="42" sets ms per character; data-dd-terminal-delay="600"
     on a line holds before it appears. button[data-dd-terminal-replay] plays it again; a click in the terminal skips
     to the end. With prefers-reduced-motion the final state shows at once (and replay hides).
   - button[data-dd-terminal-copy]: copies only the commands, one per line — no prompts, no output. [data-copied] 1.6s.
   - [data-dd-terminal-line-copy]: adds a small copy button to every command line (on hover / focus).
   - [data-dd-terminal-interactive]: the last prompt goes live. Enter runs the line against
     <template data-dd-terminal-command="npm test" data-dd-terminal-description="run the tests">output</template>
     inside the terminal; unknown commands get a friendly "command not found". Built in: help, clear (also Ctrl+L),
     Ctrl+C. ↑/↓ recall history, Tab completes known commands (only when there is something to complete — otherwise
     Tab moves focus as usual). Output is announced through a polite live region. data-dd-terminal-label names the input.
   The terminal reports data-dd-terminal-state="playing|done" and fires dd:terminalplayed and dd:terminalrun
   (detail: { command, known }). API: dd.terminal(el) → { play(), finish(), run(command) }; dd.terminal.init(root). */
(() => {
  const C = 'dd-code';
  const dd = (window.dd = window.dd || {});
  const SEL = `.${C}--terminal:is([data-dd-terminal-play], [data-dd-terminal-interactive], [data-dd-terminal-line-copy])`;
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const icon = (n) => `<svg class="dd-icon" aria-hidden="true"><use href="${dd.iconSprite || ''}#dd-i-${n}"/></svg>`;
  const span = (cls, html = '') => { const el = document.createElement('span'); el.className = cls; el.innerHTML = html; return el; };
  const norm = (s) => String(s || '').trim().replace(/\s+/g, ' ');
  const states = new WeakMap();
  const cmdOf = new WeakMap(); // command line → its full command text (survives typing and partial playback)

  const state = (term) => {
    let st = states.get(term);
    if (!st) states.set(term, (st = { run: 0, history: [], hIndex: null, draft: '' }));
    return st;
  };
  const codeOf = (term) => term.querySelector(`.${C}__pre code`) || term.querySelector(`.${C}__pre`);
  const preOf = (term) => term.querySelector(`.${C}__pre`);
  const lines = (code) => [...code.children].filter((el) => el.classList.contains(`${C}__line`));
  const isCmd = (line) => !!line.querySelector(`.${C}__prompt`);
  const scrollEnd = (pre) => { if (pre && pre.scrollHeight > pre.clientHeight) pre.scrollTop = pre.scrollHeight; };
  const enter = (line) => {
    if (still()) return;
    line.classList.add('is-entering');
    line.addEventListener('animationend', () => line.classList.remove('is-entering'), { once: true });
  };

  // Loose markup ("<prompt>npm test\n<out>…") → one .dd-code__line per line, separated by real newlines.
  // Lines that are already .dd-code__line spans are kept as they are, so the two can be mixed.
  const isLine = (n) => n.nodeType === 1 && n.classList.contains(`${C}__line`);
  function wrapLines(code) {
    const rows = [[]];
    for (const node of [...code.childNodes]) {
      if (node.nodeType !== 3) { rows[rows.length - 1].push(node); continue; }
      node.nodeValue.split('\n').forEach((part, i) => {
        if (i) rows.push([]);
        if (part) rows[rows.length - 1].push(document.createTextNode(part));
      });
    }
    const blank = (nodes) => nodes.every((n) => n.nodeType === 3 && !n.nodeValue.trim());
    while (rows.length && blank(rows[0])) rows.shift();
    while (rows.length && blank(rows[rows.length - 1])) rows.pop();
    code.replaceChildren();
    rows.forEach((nodes, i) => {
      const own = nodes.filter((n) => !(n.nodeType === 3 && !n.nodeValue.trim()));
      let line;
      if (own.length === 1 && isLine(own[0])) line = own[0];
      else { line = span(`${C}__line`); line.append(...nodes); }
      code.append(...(i ? ['\n', line] : [line]));
    });
  }

  // A command line keeps what was typed in .dd-code__input (created from whatever follows the prompt).
  function markCommand(line) {
    const prompt = line.querySelector(`.${C}__prompt`);
    if (!prompt) return;
    let input = line.querySelector(`.${C}__input`);
    if (!input) {
      input = span(`${C}__input`);
      const move = [];
      for (let n = prompt.nextSibling; n; n = n.nextSibling) {
        if (!(n.nodeType === 1 && n.matches(`.${C}__cursor, .${C}__line-copy, .${C}__field`))) move.push(n);
      }
      input.append(...move);
      prompt.after(input);
    }
    cmdOf.set(line, norm(input.textContent));
  }

  function addLineCopy(line) {
    if (line.querySelector(`.${C}__line-copy`)) return;
    const cmd = cmdOf.get(line);
    if (!cmd) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `${C}__line-copy`;
    btn.setAttribute('aria-label', `Copy command: ${cmd}`);
    btn.innerHTML = icon('copy') + icon('check');
    line.append(btn);
  }

  function decorate(term) {
    const code = codeOf(term);
    lines(code).forEach(markCommand);
    if (term.hasAttribute('data-dd-terminal-line-copy')) {
      lines(code).filter((l) => isCmd(l) && !l.classList.contains(`${C}__live`)).forEach(addLineCopy);
    }
  }

  function prepare(term) {
    const st = state(term);
    if (st.ready) return st;
    st.ready = true;
    const code = codeOf(term);
    wrapLines(code);
    lines(code).forEach(markCommand);
    st.snapshot = code.cloneNode(true); // the authored final state, before any decoration
    decorate(term);
    st.history = lines(code).map((l) => cmdOf.get(l)).filter(Boolean);
    return st;
  }

  function restore(term) {
    const st = state(term);
    const code = codeOf(term);
    code.replaceChildren(...st.snapshot.cloneNode(true).childNodes);
    st.live = null;
    decorate(term);
  }

  const commands = (term) => {
    const st = prepare(term);
    const all = st.playing ? st.lines : lines(codeOf(term));
    return all.filter((l) => isCmd(l) && !l.classList.contains(`${C}__live`)).map((l) => cmdOf.get(l)).filter(Boolean);
  };

  // ---------- playback ----------
  const charDelay = (ch, speed) => speed * (0.55 + Math.random() * 0.9) + (ch === ' ' ? speed * 0.9 : 0);

  async function play(term) {
    const st = prepare(term);
    const run = ++st.run;
    const alive = () => st.run === run && term.isConnected;
    restore(term);
    term.classList.remove('is-typing'); // a replay can cut a run off mid-word
    if (still()) return done(term);
    const code = codeOf(term), pre = preOf(term);
    st.lines = lines(code);
    st.playing = true;
    term.dataset.ddTerminalState = 'playing';
    // Hold the finished height so nothing below the terminal moves while lines arrive.
    const h = pre.getBoundingClientRect().height;
    if (h) pre.style.minHeight = `${h}px`;
    code.replaceChildren();
    const speed = Number(term.dataset.ddTerminalSpeed) || 42;
    let first = true;
    for (const line of st.lines) {
      const delay = Number(line.dataset.ddTerminalDelay) || 0;
      const sep = () => (code.childNodes.length ? ['\n', line] : [line]);
      if (!isCmd(line)) {
        await (first ? st.visible : null);
        await sleep(delay || 110);
        if (!alive()) return;
        code.append(...sep());
        enter(line);
        scrollEnd(pre);
        continue;
      }
      const input = line.querySelector(`.${C}__input`);
      const walker = document.createTreeWalker(input, NodeFilter.SHOW_TEXT);
      const texts = [];
      while (walker.nextNode()) texts.push(walker.currentNode);
      const full = texts.map((t) => t.nodeValue);
      if (!full.join('').trim()) { // a resting prompt: it just appears
        if (!first) await sleep(delay || 260);
        if (!alive()) return;
        code.append(...sep());
        enter(line);
        scrollEnd(pre);
        continue;
      }
      texts.forEach((t) => { t.nodeValue = ''; });
      const cursor = span(`${C}__cursor`);
      input.after(cursor);
      if (!first) await sleep(delay || 320);
      if (!alive()) return;
      code.append(...sep());
      enter(line);
      scrollEnd(pre);
      await (first ? st.visible : null); // the first prompt waits, cursor blinking, until the terminal is seen
      await sleep(first ? 550 : 420);
      first = false;
      if (!alive()) return;
      term.classList.add('is-typing');
      for (let t = 0; t < texts.length; t++) {
        for (const ch of full[t]) {
          texts[t].nodeValue += ch;
          await sleep(charDelay(ch, speed));
          if (!alive()) return;
        }
      }
      term.classList.remove('is-typing');
      await sleep(280); // a beat, then Enter
      if (!alive()) return;
      cursor.remove();
      await sleep(220);
    }
    if (alive()) done(term);
  }

  function done(term) {
    const st = state(term);
    st.playing = false;
    st.lines = null;
    term.classList.remove('is-typing');
    const pre = preOf(term);
    if (pre) pre.style.minHeight = '';
    if (term.hasAttribute('data-dd-terminal-play')) {
      term.dataset.ddTerminalState = 'done';
      term.dispatchEvent(new CustomEvent('dd:terminalplayed', { bubbles: true }));
    }
    if (term.hasAttribute('data-dd-terminal-interactive')) goLive(term);
  }

  function finish(term) {
    const st = state(term);
    if (!st.playing) return;
    st.run++;
    restore(term);
    done(term);
  }

  function watch(term) {
    const st = state(term);
    st.visible = new Promise((r) => { st.reveal = r; });
    if (!('IntersectionObserver' in window)) return st.reveal();
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      st.reveal();
    }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(term);
  }

  // ---------- live prompt ----------
  // Shell highlighting for what visitors type: the same token classes authors use by hand.
  const TOKEN = /(\s+)|(#.*$)|("(?:[^"\\]|\\.)*"?|'[^']*'?)|(\|\||&&|[|;&<>]+)|([^\s|&;<>"'#][^\s|&;<>"']*|#)/gs;
  function highlight(src, known) {
    let html = '', expectCmd = true, words = 0, redirect = false;
    const tok = (cls, t) => `<span class="${C}__${cls}">${esc(t)}</span>`;
    for (const [t, ws, comment, str, op, word] of src.matchAll(TOKEN)) {
      if (ws) html += esc(ws);
      else if (comment) html += tok('c', comment);
      else if (str) { html += tok('s', str); expectCmd = false; words++; }
      else if (op) { html += tok('op', op); redirect = /[<>]/.test(op); if (!redirect) { expectCmd = true; words = 0; } }
      else if (word) {
        if (redirect) { html += tok('path', word); redirect = false; }
        else if (expectCmd && /^[A-Za-z_]\w*=/.test(word)) html += tok('var', word);
        else if (expectCmd) { html += tok(known && !known.has(word) ? 'err' : 'cmd', word); expectCmd = false; words = 0; }
        else if (word[0] === '-') html += tok('flag', word);
        else if (word.includes('$')) html += tok('var', word);
        else if (/^(\.{0,2}\/|~)|\/|:\/\//.test(word)) html += tok('path', word);
        else html += tok(words++ === 0 && /^[a-z][\w:-]*$/.test(word) ? 'sub' : 'arg', word);
      } else html += esc(t);
    }
    return html;
  }

  const templates = (term) => [...term.querySelectorAll('template[data-dd-terminal-command]')];
  const BUILTINS = { help: 'list what this terminal can run', clear: 'clear the screen' };
  const known = (term) => [...new Set([...templates(term).map((t) => norm(t.dataset.ddTerminalCommand)), ...Object.keys(BUILTINS)])];
  const knownWords = (term) => new Set(known(term).map((c) => c.split(' ')[0]));

  // Template markup → output lines. Indentation from the page source is removed; plain lines read as muted output.
  function parseOutput(html) {
    let rows = html.replace(/\t/g, '  ').split('\n');
    while (rows.length && !rows[0].trim()) rows.shift();
    while (rows.length && !rows[rows.length - 1].trim()) rows.pop();
    const indent = Math.min(...rows.filter((r) => r.trim()).map((r) => r.match(/^ */)[0].length));
    rows = rows.map((r) => r.slice(Number.isFinite(indent) ? indent : 0));
    const box = document.createElement('code');
    box.innerHTML = rows.join('\n');
    wrapLines(box);
    return lines(box).map((l) => { if (l.classList.length === 1) l.classList.add(`${C}__out`); return l; });
  }
  const outLine = (html, cls = 'out') => { const l = span(`${C}__line ${C}__${cls}`, html); return l; };

  function helpLines(term) {
    const rows = [
      ...templates(term).map((t) => [norm(t.dataset.ddTerminalCommand), t.dataset.ddTerminalDescription || '']),
      ...Object.entries(BUILTINS),
    ].filter(([c], i, all) => all.findIndex(([d]) => d === c) === i);
    const w = Math.max(...rows.map(([c]) => c.length)) + 3;
    const words = knownWords(term);
    return [
      outLine('this terminal knows:'),
      ...rows.map(([c, d]) => outLine(`  ${highlight(c, words)}${' '.repeat(w - c.length)}<span class="${C}__dim">${esc(d)}</span>`)),
      outLine('↑ ↓ history · tab completes · ctrl+l clears', 'dim'),
    ];
  }

  function outputFor(term, cmd) {
    const tpl = templates(term).find((t) => norm(t.dataset.ddTerminalCommand) === cmd);
    if (tpl) return { known: true, lines: parseOutput(tpl.innerHTML) };
    if (cmd === 'help') return { known: true, lines: helpLines(term) };
    const name = cmd.split(' ')[0];
    return {
      known: false,
      lines: [
        outLine(`command not found: ${esc(name)}`, 'err'),
        outLine(`this is a small demo shell — type <span class="${C}__cmd">help</span> to see what it can run`, 'dim'),
      ],
    };
  }

  function goLive(term) {
    const st = state(term);
    const code = codeOf(term);
    if (st.live && st.live.isConnected) return;
    const all = lines(code);
    let line = all[all.length - 1];
    if (!line || !isCmd(line) || cmdOf.get(line)) {
      const proto = [...all].reverse().find(isCmd);
      line = span(`${C}__line`);
      line.append(proto ? proto.querySelector(`.${C}__prompt`).cloneNode(true) : span(`${C}__prompt`, '$ '));
      code.append(...(code.childNodes.length ? ['\n', line] : [line]));
    }
    line.querySelectorAll(`.${C}__cursor, .${C}__line-copy`).forEach((el) => el.remove());
    if (!line.querySelector(`.${C}__input`)) line.querySelector(`.${C}__prompt`).after(span(`${C}__input`));
    line.querySelector(`.${C}__input`).setAttribute('aria-hidden', 'true'); // the field itself carries the value
    line.classList.add(`${C}__live`);
    if (!st.field) makeField(term);
    line.append(st.field);
    st.live = line;
    render(term);
  }

  function makeField(term) {
    const st = state(term);
    const f = (st.field = document.createElement('input'));
    f.type = 'text';
    f.className = `${C}__field`;
    f.setAttribute('aria-label', term.dataset.ddTerminalLabel || 'Terminal command (type help for a list)');
    f.setAttribute('autocomplete', 'off');
    f.setAttribute('autocapitalize', 'off');
    f.setAttribute('autocorrect', 'off');
    f.setAttribute('enterkeyhint', 'send');
    f.spellcheck = false;
    st.region = document.createElement('div');
    st.region.className = 'dd-visually-hidden';
    st.region.setAttribute('aria-live', 'polite');
    term.append(st.region);
    const later = () => requestAnimationFrame(() => render(term));
    f.addEventListener('input', () => render(term));
    ['keyup', 'click', 'select', 'focus', 'blur'].forEach((t) => f.addEventListener(t, later));
    f.addEventListener('keydown', (e) => onKey(term, e));
  }

  // Mirror the field into the live line: highlighted text, with the block cursor on the character at the caret.
  function render(term) {
    const st = state(term);
    if (!st.live) return;
    const v = st.field.value;
    const pos = st.field.selectionStart ?? v.length;
    const input = st.live.querySelector(`.${C}__input`);
    input.innerHTML = highlight(v, knownWords(term));
    const cursor = span(`${C}__cursor`);
    const walker = document.createTreeWalker(input, NodeFilter.SHOW_TEXT);
    let n = pos;
    let placed = false;
    while (!placed && walker.nextNode()) {
      const node = walker.currentNode;
      if (n < node.length) {
        const at = node.splitText(n);
        at.splitText(1);
        cursor.textContent = at.nodeValue === ' ' ? '\u00a0' : at.nodeValue;
        at.replaceWith(cursor);
        placed = true;
      } else n -= node.length;
    }
    if (!placed) input.append(cursor);
    // Keep the cursor in view when a long line scrolls sideways (narrow screens).
    const pre = preOf(term);
    if (document.activeElement === st.field && pre.scrollWidth > pre.clientWidth) {
      const c = cursor.getBoundingClientRect(), p = pre.getBoundingClientRect(), pad = 24;
      if (c.right > p.right - pad) pre.scrollLeft += c.right - p.right + pad;
      else if (c.left < p.left + pad) pre.scrollLeft -= p.left + pad - c.left;
    }
  }

  function setValue(term, v) {
    const f = state(term).field;
    f.value = v;
    f.setSelectionRange(v.length, v.length);
    render(term);
  }

  function onKey(term, e) {
    const st = state(term);
    const f = st.field;
    if (e.isComposing) return;
    if (e.key === 'Enter') { e.preventDefault(); if (st.busy) st.queued = true; else submit(term); } // type-ahead runs next
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); recall(term, e.key === 'ArrowUp' ? -1 : 1); }
    else if (e.key === 'Tab' && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) { if (complete(term)) e.preventDefault(); }
    else if (e.ctrlKey && !e.metaKey && (e.key === 'l' || e.key === 'L')) { e.preventDefault(); clear(term); }
    else if (e.ctrlKey && !e.metaKey && (e.key === 'c' || e.key === 'C') && f.selectionStart === f.selectionEnd) {
      e.preventDefault();
      freeze(term, f.value, `<span class="${C}__dim">^C</span>`);
      setValue(term, '');
    }
  }

  function recall(term, dir) {
    const st = state(term);
    const h = st.history;
    if (!h.length) return;
    if (st.hIndex === null) { st.hIndex = h.length; st.draft = st.field.value; }
    const next = Math.max(0, Math.min(h.length, st.hIndex + dir));
    if (next === st.hIndex) return;
    st.hIndex = next;
    setValue(term, next === h.length ? st.draft : h[next]);
  }

  // Tab: complete to the one match, or to the shared prefix; with nothing more to add, list the matches (like zsh).
  // Returns false when there is nothing to complete, so Tab keeps moving focus.
  function complete(term) {
    const st = state(term);
    const v = st.field.value.replace(/^\s+/, '');
    if (!v || st.field.selectionStart !== st.field.value.length) return false;
    const matches = known(term).filter((c) => c.startsWith(v) && c !== v);
    if (!matches.length) return false;
    const prefix = matches.reduce((a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; return a.slice(0, i); });
    if (prefix.length > v.length) setValue(term, prefix);
    else {
      const l = outLine(matches.map(esc).join('   '), 'dim');
      st.live.before(l, '\n');
      enter(l);
      scrollEnd(preOf(term));
    }
    return true;
  }

  // Leave the typed line above the live prompt, as a terminal does.
  function freeze(term, raw, suffix = '') {
    const st = state(term);
    const line = span(`${C}__line`);
    line.append(st.live.querySelector(`.${C}__prompt`).cloneNode(true), span(`${C}__input`, highlight(raw, knownWords(term)) + suffix));
    cmdOf.set(line, suffix ? '' : norm(raw));
    st.live.before(line, '\n');
    if (term.hasAttribute('data-dd-terminal-line-copy')) addLineCopy(line);
    scrollEnd(preOf(term));
    return line;
  }

  function clear(term) {
    const st = state(term);
    // Remove everything but the live line (moving it would drop focus from the field).
    for (const n of [...codeOf(term).childNodes]) if (n !== st.live) n.remove();
    preOf(term).scrollTop = 0;
  }

  async function submit(term, given) {
    const st = state(term);
    const raw = given ?? st.field.value;
    const cmd = norm(raw);
    freeze(term, raw);
    st.hIndex = null;
    st.draft = '';
    setValue(term, '');
    if (!cmd) return;
    if (st.history[st.history.length - 1] !== cmd) st.history.push(cmd);
    const emit = (isKnown) => term.dispatchEvent(new CustomEvent('dd:terminalrun', { bubbles: true, detail: { command: cmd, known: isKnown } }));
    if (cmd === 'clear' && !templates(term).some((t) => norm(t.dataset.ddTerminalCommand) === 'clear')) {
      clear(term);
      announce(term, 'cleared');
      return emit(true);
    }
    const out = outputFor(term, cmd);
    const live = st.live;
    const pre = preOf(term);
    st.busy = true;
    live.classList.add('is-busy');
    for (const [i, l] of out.lines.entries()) {
      if (!still()) await sleep(Number(l.dataset.ddTerminalDelay) || (i ? 55 : 180));
      if (!live.isConnected) break; // replayed meanwhile
      live.before(l, '\n');
      enter(l);
      scrollEnd(pre);
    }
    st.busy = false;
    live.classList.remove('is-busy');
    scrollEnd(pre);
    announce(term, out.lines.map((l) => l.textContent.trim()).filter(Boolean).join('\n'));
    emit(out.known);
    if (st.queued && live.isConnected) { st.queued = false; submit(term); }
  }

  function announce(term, text) {
    const r = state(term).region;
    if (!r) return;
    r.textContent = '';
    setTimeout(() => { r.textContent = text; }, 60); // a fresh change, so a repeated output is read again
  }

  // ---------- wiring ----------
  const timers = new WeakMap();
  async function copy(btn, text) {
    if (!text) return; // nothing on screen to copy: no false confirmation
    try {
      await navigator.clipboard.writeText(text);
      btn.setAttribute('data-copied', '');
      clearTimeout(timers.get(btn));
      timers.set(btn, setTimeout(() => btn.removeAttribute('data-copied'), 1600));
    } catch { /* clipboard blocked — the text stays selectable */ }
  }

  document.addEventListener('click', (e) => {
    const term = e.target.closest(`.${C}--terminal`);
    if (!term) return;
    const all = e.target.closest('[data-dd-terminal-copy]');
    if (all) return void copy(all, commands(term).join('\n'));
    const one = e.target.closest(`.${C}__line-copy`);
    if (one) return void copy(one, cmdOf.get(one.closest(`.${C}__line`)) || '');
    const replay = e.target.closest('[data-dd-terminal-replay]');
    if (replay) {
      const st = setup(term) && state(term);
      st.reveal?.();
      return void play(term);
    }
    if (!e.target.closest(`.${C}__pre`) || String(getSelection())) return;
    const st = states.get(term);
    if (st?.playing) finish(term); // click to skip
    if (st?.live && e.target !== st.field) st.field.focus({ preventScroll: true });
  });

  function setup(term) {
    const st = state(term);
    if (!st.setup) {
      st.setup = true;
      prepare(term);
      if (term.hasAttribute('data-dd-terminal-play')) {
        if (still()) {
          term.querySelectorAll('[data-dd-terminal-replay]').forEach((b) => { b.hidden = true; });
          done(term);
        } else {
          watch(term);
          play(term);
        }
      } else if (term.hasAttribute('data-dd-terminal-interactive')) goLive(term);
    }
    return { play: () => { st.reveal?.(); return play(term); }, finish: () => finish(term), run: (cmd) => (st.live ? submit(term, cmd) : undefined) };
  }

  const init = (root = document) => root.querySelectorAll(SEL).forEach(setup);
  dd.terminal = setup;
  dd.terminal.init = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
