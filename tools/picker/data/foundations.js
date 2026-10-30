/* Foundations: palette, fonts, type scale, headings, radius, density, depth, texture, motion. */
(() => {
  const G = 'Foundations';

  // ---------- palettes ----------
  // Logo neutrals: warm ink #332d2c on cream #fcf9f2.
  const LOGO_DAWN = { bg: '#fcf9f2', surface: '#fffdf8', surface2: '#f3eee3', border: '#e4ddd0', text: '#332d2c', muted: '#7a716d' };
  const LOGO_DUSK = { bg: '#1d1a19', surface: '#262221', surface2: '#302b2a', border: '#403a38', text: '#fcf9f2', muted: '#aaa29d' };
  const logo = (name, note, aDawn, aDusk, onDawn = '#fcf9f2', onDusk = '#1d1a19') => ({
    name, note,
    dawn: { ...LOGO_DAWN, accent: aDawn, onAccent: onDawn },
    dusk: { ...LOGO_DUSK, accent: aDusk, onAccent: onDusk },
  });
  const pal = (name, note, dawn, dusk) => {
    const k = ['bg', 'surface', 'surface2', 'border', 'text', 'muted', 'accent', 'onAccent'];
    const obj = (a) => Object.fromEntries(k.map((key, i) => [key, a[i]]));
    return { name, note, dawn: obj(dawn), dusk: obj(dusk) };
  };
  // Round 3: riffs on the user's pick (#01 Logo · ink & cream). Accent stays ink; one or two things change.
  const MUTED_STATUS = {
    dawn: { ok: '#4f7a52', warn: '#a8761c', bad: '#a8432f', info: '#4a6a85' },
    dusk: { ok: '#94c294', warn: '#d9b05c', bad: '#e08a72', info: '#93b2cc' },
  };
  const inkCream = (name, note, dawn, dusk, toneNames) => {
    const d = { ...LOGO_DAWN, accent: LOGO_DAWN.text, onAccent: LOGO_DAWN.bg, ...dawn };
    const n = { ...LOGO_DUSK, accent: LOGO_DUSK.text, onAccent: LOGO_DUSK.bg, ...dusk };
    if (!dawn.accent) d.accent = d.text;
    if (!dawn.onAccent) d.onAccent = d.bg;
    if (!dusk.accent) n.accent = n.text;
    if (!dusk.onAccent) n.onAccent = n.bg;
    if (toneNames) { d.status = MUTED_STATUS.dawn; n.status = MUTED_STATUS.dusk; }
    return { name: `Ink & cream · ${name}`, note, dawn: d, dusk: n, toneNames, round: 3, basedOn: '#01 Logo · ink & cream' };
  };
  // Round 4: siblings of the user's pick (#25 Greige Gallery). One or two things change per option.
  const GG_DAWN = { bg: '#f3f0ea', surface: '#f9f7f3', surface2: '#e8e3da', border: '#dbd4c8', text: '#1f1e1c', muted: '#6e675e',
    accent: '#5f564c', onAccent: '#f3f0ea', tones: ['#d4cbbf', '#a39b8f', '#c8bfae'], status: MUTED_STATUS.dawn };
  const GG_DUSK = { bg: '#191816', surface: '#211f1d', surface2: '#2a2825', border: '#3a3733', text: '#ece7df', muted: '#a59e94',
    accent: '#d4cbbf', onAccent: '#191816', tones: ['#d4cbbf', '#8a8277', '#5c554d'], status: MUTED_STATUS.dusk };
  const greige = (name, note, dawn, dusk, toneNames = 'greige · stone · putty') => ({
    name: `Greige Gallery · ${name}`, note, toneNames, round: 4, basedOn: '#25 Greige Gallery',
    dawn: { ...GG_DAWN, ...dawn }, dusk: { ...GG_DUSK, ...dusk },
  });
  // Interior set (round 2): cream + near-black bases from cxkw.dev, plus three supporting tones each.
  const interior = (name, note, toneNames, dawn, dusk) => {
    const a = pal(name, note, dawn.slice(0, 8), dusk.slice(0, 8));
    a.dawn.tones = dawn[8];
    a.dusk.tones = dusk[8];
    a.dawn.status = { ok: '#4f7a52', warn: '#a8761c', bad: '#a8432f', info: '#4a6a85' };
    a.dusk.status = { ok: '#94c294', warn: '#d9b05c', bad: '#e08a72', info: '#93b2cc' };
    return { ...a, toneNames, round: 2 };
  };

  DD.category({
    id: 'palette', group: G, kind: 'palette', title: 'Palette',
    blurb: 'Each palette is a dawn (light) + dusk (dark) pair. #1–5 come from your logo; #22–39 are the interior set built from cxkw.dev — cream and near-black bases with three supporting tones each (the round dots).',
    options: [
      logo('Logo · ink & cream', 'Pure logo colors. Monochrome — ink is the accent.', '#332d2c', '#fcf9f2'),
      logo('Logo · ember', 'Logo neutrals + a sunrise orange accent', '#d9531e', '#ff7f4d', '#fff8f0', '#1d1a19'),
      logo('Logo · dusk violet', 'Logo neutrals + twilight violet', '#5a3fd0', '#a690ff', '#fcf9f2', '#1d1a19'),
      logo('Logo · horizon blue', 'Logo neutrals + blue-hour accent', '#2c58d0', '#86a6ff', '#fcf9f2', '#1d1a19'),
      logo('Logo · sage', 'Logo neutrals + soft green', '#3f6e46', '#9fcaa3', '#fcf9f2', '#1d1a19'),
      pal('cxkw.dev today', 'Cream, forest ink, coral / lime — your current site',
        ['#f1eddf', '#f8f5ea', '#e7e2d0', '#d6d0bb', '#163c2c', '#4f6a5c', '#d97757', '#ffffff'],
        ['#081510', '#0e2019', '#153026', '#23423a', '#f1eddf', '#a9b8a8', '#c7d67a', '#081510']),
      pal('Ember Hour', 'Terracotta glow, warm espresso nights',
        ['#fbf6f1', '#ffffff', '#f3e9df', '#e6d6c6', '#2a1d17', '#7a6458', '#d4572a', '#ffffff'],
        ['#17110f', '#211816', '#2c201c', '#3d2c26', '#f6e9df', '#b39a8c', '#ff7a45', '#1a0e09']),
      pal('Blue Hour', 'Cool slate days, deep navy evenings',
        ['#f4f6fa', '#ffffff', '#e9edf5', '#d5dcea', '#141b2d', '#5b667f', '#3355ff', '#ffffff'],
        ['#0b1020', '#121a30', '#1a2440', '#26325a', '#e6ebf7', '#93a0c0', '#7d9bff', '#0b1020']),
      pal('Golden Hour', 'Honey and amber, low sun',
        ['#fdf8ec', '#fffdf6', '#f6ecd3', '#eadcb6', '#2b2210', '#7d6c45', '#d99a00', '#2b2210'],
        ['#15110a', '#1f1a10', '#2a2316', '#3b3120', '#f7ecd2', '#b8a37a', '#f5b82e', '#15110a']),
      pal('Lavender Haze', 'Soft violet mornings, plum nights',
        ['#f8f6fc', '#ffffff', '#efeaf8', '#ddd4ee', '#231b35', '#6c6186', '#7c4dff', '#ffffff'],
        ['#141022', '#1c172e', '#262040', '#352d55', '#ece6fb', '#a69cc6', '#b49cff', '#141022']),
      pal('Desert Mesa', 'Sand, clay and burnt umber',
        ['#f6efe6', '#fbf7f1', '#ece0d0', '#dcc9b2', '#3a2516', '#86664c', '#b5532a', '#ffffff'],
        ['#1c120c', '#261911', '#321f15', '#47301f', '#f1dfcb', '#bf9f82', '#e07a45', '#1c120c']),
      pal('Fjord', 'Sea-glass teal, cold deep water',
        ['#f2f7f6', '#ffffff', '#e3efed', '#cddfdc', '#0f2a2a', '#4f6f6c', '#0f8a7e', '#ffffff'],
        ['#071716', '#0d2120', '#132d2b', '#1e403d', '#dff2ef', '#8fb3ae', '#3fd1bf', '#071716']),
      pal('Paper & Ink', 'Strict monochrome; red only for errors',
        ['#faf9f6', '#ffffff', '#f0eee8', '#dedbd2', '#111111', '#666660', '#111111', '#ffffff'],
        ['#0d0d0c', '#161615', '#1f1f1d', '#2e2e2b', '#f2f1ec', '#9a9993', '#f2f1ec', '#0d0d0c']),
      pal('Rosewater', 'Blush pinks, wine-dark evenings',
        ['#fcf5f5', '#ffffff', '#f6e6e8', '#ecd3d6', '#2f1519', '#8a5d64', '#d6336c', '#ffffff'],
        ['#1a0d11', '#241318', '#301920', '#46242e', '#f8e4e8', '#c4939d', '#ff6b9a', '#1a0d11']),
      pal('Moss & Stone', 'Olive, lichen and forest floor',
        ['#f4f4ee', '#fbfbf7', '#e8e9df', '#d5d7c8', '#1f2419', '#5f6654', '#4f7a28', '#ffffff'],
        ['#10130d', '#181c14', '#21271b', '#2f3727', '#e7ebdc', '#a0a990', '#a3cf62', '#10130d']),
      pal('Nordic Frost', 'Ice white, glacier cyan, polar night',
        ['#f5f8fa', '#ffffff', '#e8eff3', '#d3dee6', '#102030', '#587080', '#0089b8', '#ffffff'],
        ['#0a1218', '#101c24', '#172630', '#233745', '#e3eef5', '#8aa5b5', '#5cd0ff', '#0a1218']),
      pal('Neon Dusk', 'Synthwave magenta on midnight',
        ['#f7f5fb', '#ffffff', '#ece8f5', '#d9d2ea', '#1a1030', '#675d80', '#d81b80', '#ffffff'],
        ['#0a0814', '#120e22', '#1b1530', '#2c2348', '#f0eaff', '#9e93c2', '#ff2fa0', '#0a0814']),
      pal('Sepia Archive', 'Old paper, rust ink, lamplight',
        ['#f3ead8', '#f8f1e3', '#eadfc7', '#d6c7a8', '#3b2f1e', '#7c6a4f', '#8c3b1f', '#f8f1e3'],
        ['#1d1810', '#262017', '#30291d', '#43392a', '#ebdfc5', '#b0a07f', '#d08a52', '#1d1810']),
      pal('Ultraviolet Graphite', 'Neutral graphite + electric violet',
        ['#f5f5f4', '#ffffff', '#ebebea', '#d8d8d6', '#18181b', '#63636b', '#5b21ff', '#ffffff'],
        ['#111113', '#18181b', '#222226', '#313137', '#ededf0', '#9898a2', '#8f6bff', '#ffffff']),
      pal('Citrus Pop', 'Bright tangerine days, amber nights',
        ['#fffbf2', '#ffffff', '#fff0d6', '#f2dfb8', '#221a0b', '#7b6a48', '#f26200', '#ffffff'],
        ['#121009', '#1b1810', '#262115', '#3a3220', '#fff3dc', '#b9a67e', '#ffb000', '#121009']),
      pal('Sky Gradient', 'Literal dawn peach → dusk indigo',
        ['#fff5f0', '#ffffff', '#ffe8de', '#f5d2c4', '#2c1a2e', '#85677a', '#f2554a', '#ffffff'],
        ['#161127', '#1f1836', '#2a2147', '#3b2f5e', '#f3e9ff', '#ab9cc8', '#ffa36c', '#161127']),
      interior('Forest Study', 'Your site exactly — cream, forest, sage, lime', 'sage · lime · oat',
        ['#f1eddf', '#f7f4ea', '#e4ddca', '#d8d0ba', '#163c2c', '#5a7062', '#163c2c', '#f1eddf', ['#a8bca4', '#c7d67a', '#e4ddca']],
        ['#0c2b1f', '#123527', '#1a4232', '#24503e', '#f1eddf', '#a8bca4', '#c7d67a', '#0c2b1f', ['#a8bca4', '#c7d67a', '#2c5a44']]),
      interior('Ink & Sage', 'Logo ink and cream with quiet sage', 'sage · oat · moss',
        ['#fcf9f2', '#fffdf8', '#f1ede2', '#e2dccf', '#332d2c', '#77706a', '#4f6b52', '#fcf9f2', ['#a8bca4', '#d9d3c0', '#6e7f63']],
        ['#1d1a19', '#262221', '#302b2a', '#403a38', '#fcf9f2', '#aaa29d', '#a8bca4', '#1d1a19', ['#a8bca4', '#5d6f58', '#3a3532']]),
      interior('Ink & Brass', 'Near-black on bone with antique brass — your older site', 'brass · greige · walnut',
        ['#f5f2ed', '#faf8f4', '#ebe6dd', '#ddd6ca', '#1a1a1a', '#6f6a62', '#8a6a2f', '#f5f2ed', ['#c9a96e', '#d4cbbf', '#5a4632']],
        ['#141312', '#1c1b19', '#252320', '#34312c', '#f5f2ed', '#a39d93', '#c9a96e', '#141312', ['#c9a96e', '#d4cbbf', '#6b5640']]),
      interior('Greige Gallery', 'Warm greys only — the accent is taupe', 'greige · stone · putty',
        ['#f3f0ea', '#f9f7f3', '#e8e3da', '#dbd4c8', '#1f1e1c', '#6e675e', '#5f564c', '#f3f0ea', ['#d4cbbf', '#a39b8f', '#c8bfae']],
        ['#191816', '#211f1d', '#2a2825', '#3a3733', '#ece7df', '#a59e94', '#d4cbbf', '#191816', ['#d4cbbf', '#8a8277', '#5c554d']]),
      interior('Terracotta Clay', 'Fired clay accent, sand and olive around it', 'coral · sand · olive',
        ['#f6f0e6', '#fbf7f0', '#ece3d5', '#e0d4c2', '#2b2420', '#7a6a5e', '#a84e33', '#fbf7f0', ['#d97757', '#e3cfb4', '#6f6b3f']],
        ['#1c1613', '#241d19', '#2e2520', '#40342c', '#f3e9dc', '#b8a593', '#e0896a', '#1c1613', ['#d97757', '#a8916f', '#7d7a4f']]),
      interior('Olive Grove', 'Olive ink-green with lime and sage', 'lime · sage · flax',
        ['#f4f1e6', '#faf8f0', '#e9e5d4', '#dcd6c0', '#23251c', '#686b58', '#55632a', '#f4f1e6', ['#c7d67a', '#a8bca4', '#dcd3b5']],
        ['#13150f', '#1a1d15', '#23271c', '#333828', '#eef0e2', '#a7ab95', '#b8c86a', '#13150f', ['#c7d67a', '#8fa38b', '#4f5a31']]),
      interior('Mushroom & Moss', 'Soft fungal neutrals, deep moss accent', 'mushroom · moss · linen',
        ['#efebe4', '#f6f3ee', '#e3ddd3', '#d5cec2', '#2a2722', '#716a60', '#47573a', '#efebe4', ['#bfb3a3', '#8d9c78', '#e6dfd3']],
        ['#1a1814', '#22201b', '#2b2822', '#3b3730', '#ebe5da', '#a69e91', '#9fb08a', '#1a1814', ['#bfb3a3', '#6f7d5c', '#4a443b']]),
      interior('Plaster & Slate', 'Cool plaster walls, slate-blue ink', 'dusty blue · stone · lichen',
        ['#f2f0eb', '#f8f7f3', '#e6e3dc', '#d8d4cb', '#1e2326', '#5e666b', '#43566a', '#f2f0eb', ['#9fb0bc', '#c9c3b8', '#a7ad94']],
        ['#121619', '#181d21', '#20262b', '#2e363c', '#e9ebe8', '#9aa4aa', '#a3b7c7', '#121619', ['#9fb0bc', '#6f7f8a', '#8a9178']]),
      interior('Oxblood Library', 'Leather-bound red on parchment, brass details', 'rosewood · brass · parchment',
        ['#f4eee3', '#faf6ee', '#e9e0d1', '#ddd1be', '#241c1a', '#74655d', '#6e2a26', '#f4eee3', ['#b07a72', '#c9a96e', '#e6dcc8']],
        ['#1a1211', '#231918', '#2d201e', '#40302c', '#f1e6d8', '#b5a396', '#cf8076', '#1a1211', ['#b07a72', '#c9a96e', '#4a2b27']]),
      interior('Travertine', 'Stone floors — sandstone, travertine, charcoal', 'travertine · sandstone · charcoal',
        ['#f5efe5', '#fbf8f2', '#ebe2d4', '#e0d4c1', '#2e2a25', '#77695a', '#8a6a4a', '#fbf8f2', ['#dccbb2', '#c4a582', '#4a4540']],
        ['#1b1814', '#23201b', '#2c2822', '#3d3830', '#f0e7d9', '#b2a593', '#d6b48c', '#1b1814', ['#dccbb2', '#a68a68', '#57514a']]),
      interior('Walnut & Linen', 'Dark wood on natural linen, a touch of sage', 'walnut · linen · sage',
        ['#f3eee6', '#f9f6f0', '#e7dfd2', '#dad0c0', '#241d17', '#73665a', '#5c4330', '#f3eee6', ['#9c7a5b', '#e2d7c6', '#a8bca4']],
        ['#17120e', '#1f1914', '#29211a', '#3a2f26', '#efe6da', '#b0a191', '#c9a07a', '#17120e', ['#9c7a5b', '#6b5340', '#8fa38b']]),
      interior('Eucalyptus', 'Grey-green leaves, chalk, a clay pot', 'eucalyptus · chalk · clay',
        ['#f1f2ec', '#f8f9f5', '#e4e7de', '#d5d9ce', '#1c2421', '#5d6964', '#3f6359', '#f1f2ec', ['#9fb7ad', '#e6e7df', '#c08a6c']],
        ['#111816', '#17201d', '#1f2a26', '#2c3a35', '#e7ece8', '#9aaaa3', '#94b8ab', '#111816', ['#9fb7ad', '#4f6b62', '#b0806a']]),
      interior('Ochre Studio', 'Mustard ochre lead, terracotta and forest support', 'mustard · terracotta · forest',
        ['#f6f1e4', '#fbf8ef', '#ece4d0', '#e0d5ba', '#262019', '#75695a', '#94680f', '#fbf8ef', ['#d6b25e', '#c27455', '#163c2c']],
        ['#181410', '#201b15', '#29231b', '#3a3226', '#f2e9d6', '#b3a68e', '#dcb055', '#181410', ['#d6b25e', '#c27455', '#2c5a44']]),
      interior('Charcoal & Chalk', 'Pure neutral black and chalk — no hue at all', 'graphite · ash · chalk',
        ['#f4f3ef', '#fafaf7', '#e8e7e2', '#dad9d3', '#232323', '#6b6b68', '#232323', '#f4f3ef', ['#6b6b68', '#b9b7b0', '#e3e1da']],
        ['#161616', '#1e1e1e', '#272727', '#363636', '#ecebe6', '#a0a09b', '#ecebe6', '#161616', ['#8a8a85', '#4a4a48', '#c9c7c0']]),
      interior('Blush Plaster', 'Pink-washed plaster, rose-brown ink, sage', 'blush · plaster · sage',
        ['#f6efea', '#fbf7f4', '#ece1da', '#e0d2c9', '#2a2120', '#7a6863', '#8f5249', '#fbf7f4', ['#e2c3b8', '#efdcd3', '#a8bca4']],
        ['#1a1413', '#221b1a', '#2c2321', '#3e3230', '#f2e5df', '#b8a29b', '#d79c90', '#1a1413', ['#c99c90', '#6e4f49', '#8fa38b']]),
      interior('Lime Wash', 'Forest-black and cream, lime leads — the site at night', 'lime · forest · sage',
        ['#f1eddf', '#f7f4ea', '#e7e2cf', '#d9d2b9', '#081510', '#4f5c52', '#5b6b16', '#f1eddf', ['#c7d67a', '#163c2c', '#a8bca4']],
        ['#081510', '#0e1d17', '#15271f', '#20362b', '#f1eddf', '#9fb09c', '#c7d67a', '#081510', ['#c7d67a', '#2c5a44', '#a8bca4']]),
      interior('Bone & Bronze', 'Bone white, bronze hardware, deep green', 'bronze · bone · bottle green',
        ['#f2ede4', '#f8f5ef', '#e6dfd2', '#d9d0bf', '#201c18', '#6f665b', '#7a5a36', '#f8f5ef', ['#b08d5f', '#cfc5b4', '#3f4a3c']],
        ['#161310', '#1e1a16', '#27221d', '#383129', '#eee7db', '#aa9f8f', '#c39b6a', '#161310', ['#b08d5f', '#5d4a33', '#6f7d64']]),
      interior('Smoke & Sand', 'Smoky blue-black, sand and olive', 'sand · smoke · olive',
        ['#f3f1ec', '#f9f8f5', '#e7e4dd', '#d9d5cc', '#2a2b2d', '#6a6c6f', '#4d5560', '#f3f1ec', ['#cdbfa5', '#9aa1a8', '#7d7a4f']],
        ['#151619', '#1c1d21', '#24262a', '#34363b', '#ebe9e4', '#a1a3a6', '#c9bfae', '#151619', ['#cdbfa5', '#6d747c', '#8f8c5e']]),
      inkCream('tonal cards', 'Cards a shade darker than the page — separation without borders',
        { surface: '#f4efe4', surface2: '#ebe5d8', border: '#ddd5c6' },
        { surface: '#2a2624', surface2: '#35302d', border: '#46403d' }),
      inkCream('sunken page', 'Page a shade darker, cards lift in lighter cream',
        { bg: '#f3eee3', surface: '#fffdf8', surface2: '#ece6da', border: '#ddd5c6' },
        { bg: '#161312', surface: '#262221', surface2: '#2f2a28', border: '#3d3734' }),
      inkCream('warmer cream', 'Yellower, more parchment cream; ink unchanged',
        { bg: '#faf4e8', surface: '#fdf9f0', surface2: '#f1e9d9', border: '#e3d8c4', muted: '#7b7068' },
        { bg: '#1f1a17', surface: '#29231f', surface2: '#332c27', border: '#453c36', text: '#faf4e8', muted: '#ada296' }),
      inkCream('cooler bone', 'Greyer bone white; ink a touch cooler',
        { bg: '#f8f7f3', surface: '#fdfcfa', surface2: '#eeece6', border: '#e0ddd5', text: '#2f2c2b', muted: '#75716d' },
        { bg: '#1b1a19', surface: '#232221', surface2: '#2d2b2a', border: '#3c3a38', text: '#f6f5f1', muted: '#a8a5a0' }),
      inkCream('deeper ink', 'Near-black ink for more contrast',
        { text: '#221e1d', muted: '#6c6461' },
        { bg: '#151312', surface: '#1e1b1a', surface2: '#282423', border: '#38332f' }),
      inkCream('softer ink', 'Warm charcoal ink, gentler contrast',
        { text: '#4a4240', muted: '#8a817c' },
        { bg: '#262220', surface: '#2f2a28', surface2: '#3a3431', border: '#4a4340', text: '#f3eee5', muted: '#b3aaa2' }),
      inkCream('sage tones', 'Same ink & cream; sage, oat and moss as supporting colors + muted status',
        { tones: ['#a8bca4', '#d9d3c0', '#6e7f63'] }, { tones: ['#a8bca4', '#5d6f58', '#3a3532'] }, 'sage · oat · moss'),
      inkCream('brass tones', 'Same ink & cream; brass, greige and walnut as supporting colors',
        { tones: ['#c9a96e', '#d4cbbf', '#5a4632'] }, { tones: ['#c9a96e', '#8a8277', '#6b5640'] }, 'brass · greige · walnut'),
      inkCream('clay tones', 'Same ink & cream; terracotta, sand and olive as supporting colors',
        { tones: ['#d97757', '#e3cfb4', '#6f6b3f'] }, { tones: ['#d97757', '#a8916f', '#7d7a4f'] }, 'clay · sand · olive'),
      greige('warmer', 'More beige in the walls and cards; taupe accent warms with it',
        { bg: '#f4efe7', surface: '#faf6f0', surface2: '#e9e1d5', border: '#dcd2c3', accent: '#6a5c4e', onAccent: '#f4efe7' },
        { bg: '#1c1916', surface: '#25211d', surface2: '#2e2924', border: '#3f3832', accent: '#d9cdbd', onAccent: '#1c1916' }),
      greige('cooler', 'Greyer, gallery-white greige; accent a cooler taupe',
        { bg: '#f2f1ee', surface: '#f9f8f6', surface2: '#e6e4df', border: '#d8d5ce', accent: '#58544e', onAccent: '#f2f1ee' },
        { bg: '#181818', surface: '#212120', surface2: '#2a2a28', border: '#393836', accent: '#d2cec7', onAccent: '#181818' }),
      greige('deeper ink', 'Near-black text and accent for more contrast',
        { text: '#141312', muted: '#625c55', accent: '#3d3731' },
        { bg: '#121110', surface: '#1b1a18', surface2: '#252321', border: '#33302c', text: '#f2ede5' }),
      greige('tonal cards', 'Cards a shade darker than the page — separation with Borderless depth',
        { surface: '#ebe6dd', surface2: '#e1dbcf', border: '#d2cabd' },
        { surface: '#2a2724', surface2: '#34302c', border: '#433e39' }),
      greige('ink accent', 'Monochrome — buttons and links in ink, greige stays in the surfaces',
        { accent: '#1f1e1c', onAccent: '#f3f0ea' }, { accent: '#ece7df', onAccent: '#191816' }),
      greige('sage detail', 'Same greige; accent becomes a muted sage',
        { accent: '#56704f', onAccent: '#f3f0ea', tones: ['#a8bca4', '#d4cbbf', '#a39b8f'] },
        { accent: '#a8bca4', onAccent: '#191816', tones: ['#a8bca4', '#8a8277', '#5c554d'] }, 'sage · greige · stone'),
      greige('brass detail', 'Same greige; antique brass accent',
        { accent: '#8a6a2f', onAccent: '#f3f0ea', tones: ['#c9a96e', '#d4cbbf', '#5a4632'] },
        { accent: '#c9a96e', onAccent: '#191816', tones: ['#c9a96e', '#8a8277', '#6b5640'] }, 'brass · greige · walnut'),
      greige('clay detail', 'Same greige; fired-clay accent',
        { accent: '#9a5038', onAccent: '#f3f0ea', tones: ['#d97757', '#d4cbbf', '#a39b8f'] },
        { accent: '#e08a6a', onAccent: '#191816', tones: ['#d97757', '#8a8277', '#5c554d'] }, 'clay · greige · stone'),
    ],
    preview: (o) => `<div class="pv-pal">${['dawn', 'dusk'].map((m) => `
      <div class="pv-pal-p" style="${DD.style(DD.paletteVars(o[m], m))}">
        <div class="pv-pal-top mono"><span>${m === 'dawn' ? '☀ dawn' : '☾ dusk'}</span><span>${o[m].accent}</span></div>
        <div class="pv-pal-sw">${['--bg', '--surface', '--surface-2', '--border', '--muted', '--text', '--accent']
          .map((v) => `<i style="background:var(${v})"></i>`).join('')}</div>
        <div class="pv-pal-ui"><span class="pv-pal-btn">Button</span><span class="pv-pal-tag">Tag</span>
          <span class="pv-pal-dots"><i style="background:var(--ok)"></i><i style="background:var(--warn)"></i><i style="background:var(--bad)"></i><i style="background:var(--info)"></i></span></div>
        <div class="pv-pal-tones"><i style="background:var(--tone-1)"></i><i style="background:var(--tone-2)"></i><i style="background:var(--tone-3)"></i>
          ${o.toneNames ? `<span class="mono">${o.toneNames}</span>` : ''}</div>
        <p class="pv-pal-txt">Body text, <span class="muted">a muted note</span> and <u>a link</u>.</p>
      </div>`).join('')}</div>`,
    css: `
      .pv-pal { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .pv-pal-p { background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 10px; padding: 12px;
        display: flex; flex-direction: column; gap: 10px; font-family: var(--font-body); min-width: 0; }
      .pv-pal-top { display: flex; justify-content: space-between; font-size: 10.5px; color: var(--muted); }
      .pv-pal-sw { display: flex; height: 26px; border-radius: 6px; overflow: hidden; border: 1px solid var(--border); }
      .pv-pal-sw i { flex: 1; }
      .pv-pal-ui { display: flex; align-items: center; gap: 6px; }
      .pv-pal-btn { background: var(--accent); color: var(--on-accent); font-size: 12px; padding: 4px 9px; border-radius: 6px; font-weight: 600; }
      .pv-pal-tag { background: var(--accent-soft); color: var(--accent); font-size: 11px; padding: 2px 7px; border-radius: 99px; }
      .pv-pal-dots { display: flex; gap: 3px; margin-left: auto; }
      .pv-pal-dots i { width: 8px; height: 8px; border-radius: 50%; }
      .pv-pal-tones { display: flex; align-items: center; gap: 4px; min-width: 0; }
      .pv-pal-tones i { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--text) 12%, transparent); flex: none; }
      .pv-pal-tones span { margin-left: 4px; font-size: 9.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .pv-pal-txt { margin: 0; font-size: 12.5px; line-height: 1.4; }
      .pv-pal-txt u { color: var(--accent); text-decoration-thickness: 1px; text-underline-offset: 2px; }
    `,
  });

  // ---------- fonts ----------
  const font = (prop, fallback) => (family, note, meta) => ({ name: family, note, meta, vars: { [prop]: `'${family}', ${fallback}` } });
  const disp = font('--font-display', 'sans-serif');
  const dispSerif = font('--font-display', 'serif');
  const body = font('--font-body', 'sans-serif');
  const bodySerif = font('--font-body', 'serif');
  const mono = font('--font-mono', 'monospace');
  const meta = (o) => `<div class="pv-meta mono">${o.meta}</div>`;
  const fontCSS = `.pv-meta { margin-top: 14px; font-size: 11px; color: var(--muted); letter-spacing: 0.02em; }`;

  DD.category({
    id: 'font-display', group: G, kind: 'tokens', title: 'Display font',
    blurb: 'Headlines, hero text, big numbers. The first five sit closest to your logo’s heavy, single-storey-a geometric letterforms.',
    options: [
      disp('Outfit', 'Closest match to your logo — geometric, single-storey a', 'geometric sans · 100–900'),
      disp('Urbanist', 'Logo cousin — rounder, slightly wider', 'geometric sans · 100–900'),
      disp('Sora', 'Geometric-tech, open and modern', 'geometric sans · 100–800'),
      disp('Lexend', 'Wide geometric, very calm at weight', 'geometric sans · 100–900'),
      disp('Red Hat Display', 'Warm grotesk with real heft', 'grotesk · 300–900'),
      dispSerif('Instrument Serif', 'Condensed editorial serif — on cxkw.dev now', 'serif · 400 + italic'),
      disp('Archivo Black', 'Poster grotesk — on cxkw.dev now', 'grotesk · 400 (black only)'),
      dispSerif('Fraunces', 'Soft “wonky” old-style, warm and bookish', 'serif · 100–900 + italic'),
      dispSerif('Playfair Display', 'High-contrast didone, magazine covers', 'serif · 400–900 + italic'),
      dispSerif('DM Serif Display', 'Chunky contrast, friendly-luxe', 'serif · 400 + italic'),
      dispSerif('Young Serif', 'Heavy old-style, vintage print', 'serif · 400'),
      dispSerif('Gloock', 'Sharp, dramatic high contrast', 'serif · 400'),
      dispSerif('Cormorant Garamond', 'Delicate Garamond, poetic', 'serif · 300–700 + italic'),
      dispSerif('Bodoni Moda', 'Fashion didone, razor serifs', 'serif · 400–900 + italic'),
      dispSerif('Newsreader', 'Newspaper serif, calm authority', 'serif · 200–800 + italic'),
      disp('Space Grotesk', 'Quirky geometric grotesk, techy', 'grotesk · 300–700'),
      disp('Syne', 'Art-gallery extended, odd and bold', 'sans · 400–800'),
      disp('Bricolage Grotesque', 'Ink-trapped grotesk, lots of character', 'grotesk · 200–800'),
      disp('Unbounded', 'Wide rounded display, playful-tech', 'sans · 200–900'),
      disp('Anton', 'Tall condensed impact', 'condensed · 400'),
      disp('Darker Grotesque', 'Tall x-height, airy grotesk', 'grotesk · 300–900'),
      dispSerif('Italiana', 'Thin roman caps, couture', 'serif · 400'),
      font('--font-display', 'monospace')('Major Mono Display', 'Geometric mono display, glitchy', 'mono display · 400'),
    ],
    preview: (o) => `<div class="dd-h pv-disp">dawn <em>&amp;</em> dusk</div>
      <div class="dd-h pv-disp-sub">Quiet systems, loud ideas</div>${meta(o)}`,
    css: `${fontCSS}
      .pv-disp { font-size: 42px; line-height: 1; white-space: nowrap; }
      .pv-disp-sub { font-size: 20px; margin-top: 10px; color: var(--muted); }`,
  });

  DD.category({
    id: 'font-body', group: G, kind: 'tokens', title: 'Body / UI font',
    blurb: 'Paragraphs, labels, buttons, tables — the font you read most. Check the numbers and the 0O / 1lI shapes.',
    options: [
      body('DM Sans', 'Low-contrast geometric — on cxkw.dev now', 'sans · 100–1000'),
      body('Outfit', 'Geometric, matches the logo — on cxkw.dev now', 'sans · 100–900'),
      body('Inter', 'Neutral workhorse, superb at small sizes', 'sans · 100–900'),
      body('Manrope', 'Modern semi-geometric, crisp', 'sans · 200–800'),
      body('Plus Jakarta Sans', 'Friendly, open, slightly playful', 'sans · 200–800'),
      body('Figtree', 'Clean and warm geometric', 'sans · 300–900'),
      body('Onest', 'Crisp, slightly condensed, very legible', 'sans · 100–900'),
      body('Instrument Sans', 'Pairs natively with Instrument Serif', 'sans · 400–700'),
      body('Hanken Grotesk', 'Calm humanist grotesk', 'sans · 100–900'),
      body('Schibsted Grotesk', 'Newspaper grotesk, sturdy', 'sans · 400–900'),
      body('Albert Sans', 'Scandinavian geometric', 'sans · 100–900'),
      body('Urbanist', 'Geometric, logo cousin', 'sans · 100–900'),
      body('IBM Plex Sans', 'Engineered, technical, neutral', 'sans · 100–700'),
      body('Work Sans', 'Slightly quirky, wide', 'sans · 100–900'),
      body('Atkinson Hyperlegible', 'Accessibility-first letterforms', 'sans · 400 / 700'),
      bodySerif('Source Serif 4', 'Serif body for long reads', 'serif · 200–900 + italic'),
      bodySerif('Literata', 'Bookish e-reader serif', 'serif · 200–900 + italic'),
    ],
    preview: (o) => `<p class="pv-bp">I design calm interfaces and write about the hours between dawn and dusk. Good systems disappear; great ones feel like yours.</p>
      <div class="pv-bw"><span style="font-weight:300">Light</span><span style="font-weight:400">Regular</span><span style="font-weight:500">Medium</span><span style="font-weight:700">Bold</span><em>Italic</em></div>
      <div class="pv-bui"><span class="pv-chip">Settings</span><span>$1,284.50</span><span class="muted">0O 1lI 3:45</span></div>${meta(o)}`,
    css: `${fontCSS}
      .pv-bp { margin: 0 0 12px; font-size: 15px; line-height: 1.55; }
      .pv-bw { display: flex; gap: 12px; flex-wrap: wrap; font-size: 14px; color: var(--muted); }
      .pv-bui { display: flex; gap: 12px; align-items: center; margin-top: 10px; font-size: 13px; font-variant-numeric: tabular-nums; }
      .pv-chip { border: 1px solid var(--border); border-radius: 6px; padding: 2px 8px; font-weight: 500; }`,
  });

  DD.category({
    id: 'font-mono', group: G, kind: 'tokens', title: 'Mono font',
    blurb: 'Code, numbers, metadata, eyebrows. Fira Code and JetBrains show ligatures (=> !==).',
    options: [
      mono('JetBrains Mono', 'Tall, clear, dev favorite', 'mono · ligatures'),
      mono('IBM Plex Mono', 'Typewriter warmth, engineered', 'mono · italic'),
      mono('Fira Code', 'Ligature-rich, friendly', 'mono · ligatures'),
      mono('Space Mono', 'Retro-futurist, geometric', 'mono · 400 / 700'),
      mono('DM Mono', 'Soft, low contrast, pairs with DM Sans', 'mono · 300–500'),
      mono('Martian Mono', 'Wide, techy, very distinctive', 'mono · variable width'),
      mono('Red Hat Mono', 'Neutral, compact', 'mono · 300–700'),
      mono('Source Code Pro', 'Classic Adobe code face', 'mono · 200–900'),
      mono('Azeret Mono', 'Geometric, crisp numerals', 'mono · 100–900'),
      mono('Victor Mono', 'Narrow, cursive italics', 'mono · cursive italic'),
      mono('Spline Sans Mono', 'Grotesk-flavored mono', 'mono · 300–700'),
      mono('Fragment Mono', 'Helvetica-ish mono, minimal', 'mono · 400 + italic'),
    ],
    preview: (o) => `<pre class="pv-code"><span class="c">// dawn → dusk</span>
<span class="k">const</span> theme = <span class="s">"dusk"</span>;
<span class="k">export</span> <span class="f">paint</span>(theme, { r: <span class="n">12</span> });
<span class="c">0O 1lI {} =&gt; !== ===</span></pre>${meta(o)}`,
    css: `${fontCSS}
      .pv-code { margin: 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.65; background: var(--surface);
        border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; overflow: hidden; white-space: pre; }
      .k { color: var(--accent); } .s { color: var(--ok); } .f { color: var(--info); } .n { color: var(--warn); } .c { color: var(--muted); }`,
  });

  // ---------- type scale ----------
  const STEPS = { xs: -2, sm: -1, base: 0, lg: 1, xl: 2, '2xl': 3, '3xl': 4, '4xl': 5 };
  const CAP = { xs: [11, 99], sm: [12, 99], base: [0, 99], lg: [0, 30], xl: [0, 44], '2xl': [0, 64], '3xl': [0, 88], '4xl': [0, 120] };
  const scaleVars = (o) => {
    const v = { '--lh': o.lh };
    for (const [k, n] of Object.entries(STEPS)) {
      const [lo, hi] = CAP[k];
      v[`--fs-${k}`] = `${Math.round(Math.min(hi, Math.max(lo, o.base * o.ratio ** n)) * 10) / 10}px`;
    }
    return v;
  };
  const scale = (name, ratio, base, lh, note) => ({ name: `${name} · ${ratio}`, ratio, base, lh, note: `${base}px base, line-height ${lh} — ${note}` });
  const ROWS = [['4xl', 'Display'], ['3xl', 'Title'], ['2xl', 'Heading'], ['xl', 'Subhead'], ['lg', 'Lead'], ['base', 'Body text'], ['sm', 'Small'], ['xs', 'Caption']];

  DD.category({
    id: 'type-scale', group: G, kind: 'tokens', default: 3, title: 'Type scale',
    blurb: 'Base size × ratio. Bigger ratios = more drama between body and headings (top steps capped at 120px for screens).',
    toVars: scaleVars,
    options: [
      scale('Minor second', 1.067, 15, 1.6, 'dense dashboards'),
      scale('Major second', 1.125, 15, 1.55, 'app UI, subtle hierarchy'),
      scale('Minor third', 1.2, 16, 1.55, 'balanced all-rounder'),
      scale('Major third', 1.25, 16, 1.5, 'clear hierarchy'),
      scale('Perfect fourth', 1.333, 16, 1.5, 'editorial, confident'),
      scale('Augmented fourth', 1.414, 16, 1.5, 'dramatic headings'),
      scale('Perfect fifth', 1.5, 17, 1.55, 'poster-like landing pages'),
      scale('Golden', 1.618, 17, 1.6, 'maximum contrast'),
      scale('Compact third', 1.25, 14, 1.45, 'small base, punchy heads'),
      scale('Reading', 1.2, 18, 1.7, 'large body for long reads'),
      scale('Editorial fourth', 1.333, 18, 1.65, 'big body + big heads'),
    ],
    preview: (o) => {
      const v = scaleVars(o);
      return `<div class="pv-ts">${ROWS.map(([k, l]) => `<div class="pv-ts-row"><span class="pv-ts-k mono">${k}<br>${v[`--fs-${k}`]}</span>
        <span class="pv-ts-s${['4xl', '3xl', '2xl', 'xl'].includes(k) ? ' dd-h' : ''}" style="font-size:var(--fs-${k})">${l}</span></div>`).join('')}</div>`;
    },
    css: `
      .pv-ts { display: flex; flex-direction: column; gap: 6px; }
      .pv-ts-row { display: grid; grid-template-columns: 52px 1fr; align-items: baseline; gap: 8px; min-width: 0; }
      .pv-ts-k { font-size: 10px; line-height: 1.2; color: var(--muted); }
      .pv-ts-s { white-space: nowrap; overflow: hidden; line-height: 1.1; }`,
  });

  // ---------- heading treatment ----------
  const H = {
    '--h-weight': '600', '--h-tracking': '-0.02em', '--h-case': 'none', '--h-style': 'normal', '--h-leading': '1.08',
    '--h-variant': 'normal', '--h-stroke': '0px transparent', '--h-color': 'inherit', '--h-em-style': 'italic',
    '--h-em-color': 'inherit', '--h-em-bg': 'none', '--h-em-deco': 'none', '--h-em-pad': '0', '--h-em-font': 'inherit',
  };
  const head = (name, note, v) => ({ name, note, vars: { ...H, ...v } });

  DD.category({
    id: 'headings', group: G, kind: 'tokens', title: 'Heading treatment',
    blurb: 'Weight, tracking, case and how an emphasized word behaves. Combines with whichever display font is applied.',
    options: [
      head('Logo lockup', 'Heavy, lowercase, very tight — mirrors your logo', { '--h-weight': '800', '--h-tracking': '-0.05em', '--h-case': 'lowercase', '--h-leading': '0.92', '--h-em-style': 'normal' }),
      head('Quiet', 'Regular weight, gentle tracking', { '--h-weight': '400', '--h-tracking': '-0.01em', '--h-leading': '1.15' }),
      head('Tight bold', 'Bold and compact', { '--h-weight': '700', '--h-tracking': '-0.035em', '--h-leading': '1.02' }),
      head('Heavy + accent word', 'Black weight, emphasis in accent', { '--h-weight': '800', '--h-tracking': '-0.045em', '--h-leading': '0.98', '--h-em-style': 'normal', '--h-em-color': 'var(--accent)' }),
      head('Light & airy', 'Thin weight, open leading', { '--h-weight': '300', '--h-tracking': '0em', '--h-leading': '1.2' }),
      head('Italic voice', 'Whole heading italic, emphasis upright', { '--h-weight': '400', '--h-style': 'italic', '--h-em-style': 'normal', '--h-em-color': 'var(--accent)' }),
      head('Uppercase tracked', 'Caps with air between letters', { '--h-weight': '600', '--h-tracking': '0.06em', '--h-case': 'uppercase', '--h-leading': '1.1' }),
      head('Small caps', 'All-small-caps, bookish', { '--h-weight': '500', '--h-tracking': '0.04em', '--h-variant': 'all-small-caps' }),
      head('Accent italic', 'Medium weight, italic accent word', { '--h-weight': '500', '--h-em-color': 'var(--accent)' }),
      head('Underlined word', 'Emphasis gets a thick accent underline', { '--h-em-style': 'normal', '--h-em-deco': 'underline 0.09em var(--accent)' }),
      head('Highlighter', 'Marker swipe behind the emphasis', { '--h-weight': '650', '--h-em-style': 'normal', '--h-em-bg': 'linear-gradient(transparent 58%, color-mix(in oklab, var(--accent) 38%, transparent) 58%)', '--h-em-pad': '0 0.06em' }),
      head('Outline', 'Stroked letters, filled accent word', { '--h-weight': '800', '--h-tracking': '-0.03em', '--h-stroke': '1.2px var(--text)', '--h-color': 'transparent', '--h-em-style': 'normal', '--h-em-color': 'var(--accent)' }),
      head('Mono accent', 'Emphasis switches to the mono font', { '--h-em-style': 'normal', '--h-em-font': 'var(--font-mono)', '--h-em-color': 'var(--accent)' }),
      head('Two-tone', 'Emphasis fades to muted', { '--h-weight': '700', '--h-tracking': '-0.03em', '--h-em-style': 'normal', '--h-em-color': 'var(--muted)' }),
    ],
    preview: () => `<h3 class="dd-h pv-hd">Build <em>quietly</em>, ship at dusk</h3>
      <p class="pv-hd-sub">Notes on calm software · <span class="muted">Oct 2026</span></p>`,
    css: `
      .pv-hd { font-size: 34px; }
      .pv-hd-sub { margin: 10px 0 0; font-size: 14px; }`,
  });

  // ---------- radius ----------
  const rad = (name, ctl, box, lg, note) => ({ name, note, vars: { '--r-ctl': ctl, '--r-box': box, '--r-lg': lg } });
  DD.category({
    id: 'radius', group: G, kind: 'tokens', default: 3, title: 'Corner radius',
    blurb: 'Three radii: controls (buttons, inputs, badges), boxes (cards, menus, tables) and large panels (dialogs).',
    options: [
      rad('Sharp', '0px', '0px', '0px', 'Hard edges everywhere — architectural'),
      rad('Hairline', '2px', '2px', '3px', 'Barely softened'),
      rad('Crisp', '4px', '4px', '6px', 'Precise, technical'),
      rad('Subtle', '5px', '8px', '10px', 'Quietly modern'),
      rad('Soft', '8px', '10px', '14px', 'Friendly without being bubbly'),
      rad('Rounded', '10px', '14px', '18px', 'Contemporary app feel'),
      rad('Friendly', '12px', '16px', '22px', 'Warm and approachable'),
      rad('Plush', '14px', '20px', '28px', 'Soft, pillowy surfaces'),
      rad('Bubbly', '18px', '24px', '32px', 'Playful, very round'),
      rad('Pill controls', '999px', '16px', '24px', 'Capsule buttons + rounded boxes'),
      rad('Sharp boxes, pill controls', '999px', '0px', '0px', 'Contrast: capsules on hard grid'),
      rad('Leaf', '12px 3px', '20px 4px', '28px 6px', 'Asymmetric corners — a signature shape'),
    ],
    preview: (o) => `<div class="pv-rad">
      <div class="pv-rad-row"><span class="pv-r-btn">Button</span><span class="pv-r-in">Search…</span><span class="pv-r-badge">New</span></div>
      <div class="pv-r-card"><b>Card surface</b><span class="muted">uses the box radius</span></div>
      <div class="pv-meta mono">ctl ${o.vars['--r-ctl']} · box ${o.vars['--r-box']} · lg ${o.vars['--r-lg']}</div></div>`,
    css: `${fontCSS}
      .pv-rad { display: flex; flex-direction: column; gap: 12px; }
      .pv-rad-row { display: flex; gap: 8px; align-items: center; }
      .pv-r-btn { background: var(--accent); color: var(--on-accent); padding: 7px 14px; border-radius: var(--r-ctl); font-weight: 600; font-size: 13px; }
      .pv-r-in { flex: 1; border: 1px solid var(--border); background: var(--surface); color: var(--muted); padding: 7px 12px; border-radius: var(--r-ctl); font-size: 13px; }
      .pv-r-badge { background: var(--accent-soft); color: var(--accent); padding: 2px 9px; border-radius: var(--r-ctl); font-size: 11px; font-weight: 600; }
      .pv-r-card { display: flex; flex-direction: column; gap: 2px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-box); padding: 14px 16px; font-size: 13px; }
      .pv-meta { margin-top: 0; }`,
  });

  // ---------- density ----------
  const den = (name, u, note) => ({ name, note, vars: { '--u': u } });
  DD.category({
    id: 'density', group: G, kind: 'tokens', default: 3, title: 'Density',
    blurb: 'One spacing unit drives every padding and gap. Smaller = more on screen; larger = more breathing room.',
    options: [
      den('Cockpit', '2.5px', 'Maximum information, terminal-tight'),
      den('Compact', '3px', 'Data-heavy tools'),
      den('Snug', '3.5px', 'Efficient but not cramped'),
      den('Default', '4px', 'The classic 4px grid'),
      den('Balanced', '4.5px', 'A touch more air'),
      den('Comfortable', '5px', 'Relaxed product UI'),
      den('Relaxed', '5.5px', 'Marketing-site calm'),
      den('Airy', '6px', 'Generous, editorial'),
      den('Spacious', '7px', 'Lots of whitespace'),
      den('Gallery', '8px', 'Museum-wall emptiness'),
    ],
    preview: (o) => `<div class="pv-den">
      <div class="pv-den-list">${['Inbox', 'Drafts', 'Archive'].map((t, i) => `<div class="pv-den-row${i === 0 ? ' is-on' : ''}"><span>${t}</span><span class="muted mono">${[12, 3, 48][i]}</span></div>`).join('')}</div>
      <div class="pv-den-ctl"><span class="pv-den-btn">Save</span><span class="pv-den-btn is-ghost">Cancel</span><span class="pv-meta mono">unit ${o.vars['--u']}</span></div></div>`,
    css: `${fontCSS}
      .pv-den { display: flex; flex-direction: column; gap: calc(var(--u) * 4); font-size: 14px; }
      .pv-den-list { display: flex; flex-direction: column; gap: var(--u); background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: calc(var(--u) * 1.5); }
      .pv-den-row { display: flex; justify-content: space-between; padding: calc(var(--u) * 2) calc(var(--u) * 3); border-radius: 6px; }
      .pv-den-row.is-on { background: var(--accent-soft); color: var(--accent); }
      .pv-den-ctl { display: flex; align-items: center; gap: calc(var(--u) * 2); }
      .pv-den-btn { background: var(--accent); color: var(--on-accent); padding: calc(var(--u) * 2) calc(var(--u) * 4); border-radius: 8px; font-weight: 600; font-size: 13px; }
      .pv-den-btn.is-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
      .pv-meta { margin: 0 0 0 auto; }`,
  });

  // ---------- depth ----------
  const black = (a) => `rgb(0 0 0 / ${a})`;
  const dep = (name, note, v) => ({ name, note, vars: { '--bw': '1px', '--bstyle': 'solid', '--shadow-sm': 'none', '--shadow': 'none', '--shadow-lg': 'none', ...v } });
  DD.category({
    id: 'depth', group: G, kind: 'tokens', title: 'Depth & borders',
    blurb: 'How surfaces separate from the background: lines, shadows, offsets or glows.',
    options: [
      dep('Lines only', 'Flat, 1px borders, zero shadow', {}),
      dep('Borderless', 'No lines — surfaces separate by tone alone', { '--bw': '0px' }),
      dep('Whisper', 'Hairline + barely-there shadow', { '--shadow-sm': `0 1px 1px ${black(0.04)}`, '--shadow': `0 1px 2px ${black(0.06)}, 0 1px 1px ${black(0.03)}`, '--shadow-lg': `0 6px 16px ${black(0.08)}` }),
      dep('Soft diffuse', 'Large, soft, low-opacity shadows', { '--shadow-sm': `0 2px 6px -2px ${black(0.1)}`, '--shadow': `0 12px 32px -12px ${black(0.22)}`, '--shadow-lg': `0 28px 64px -20px ${black(0.32)}` }),
      dep('Layered', 'Stacked realistic shadows, no border', { '--bw': '0px', '--shadow-sm': `0 0 0 1px ${black(0.07)}, 0 1px 2px ${black(0.06)}`, '--shadow': `0 0 0 1px ${black(0.06)}, 0 1px 1px ${black(0.05)}, 0 3px 6px ${black(0.05)}, 0 10px 20px ${black(0.06)}`, '--shadow-lg': `0 0 0 1px ${black(0.06)}, 0 4px 8px ${black(0.06)}, 0 16px 32px ${black(0.1)}, 0 40px 64px ${black(0.1)}` }),
      dep('Floating', 'Surfaces hover well above the page', { '--bw': '0px', '--shadow-sm': `0 4px 12px -4px ${black(0.2)}`, '--shadow': `0 18px 40px -16px ${black(0.38)}`, '--shadow-lg': `0 40px 80px -24px ${black(0.5)}` }),
      dep('Hard offset · ink', 'Neo-brutalist: 2px ink border + solid offset', { '--bw': '2px', '--border': 'var(--text)', '--shadow-sm': '2px 2px 0 var(--text)', '--shadow': '4px 4px 0 var(--text)', '--shadow-lg': '8px 8px 0 var(--text)' }),
      dep('Hard offset · accent', 'Brutalist with an accent-colored offset', { '--bw': '2px', '--border': 'var(--text)', '--shadow-sm': '2px 2px 0 var(--accent)', '--shadow': '4px 4px 0 var(--accent)', '--shadow-lg': '8px 8px 0 var(--accent)' }),
      dep('Bevel', 'Top highlight + tight shadow, tactile', { '--shadow-sm': `inset 0 1px 0 rgb(255 255 255 / 0.22), 0 1px 2px ${black(0.14)}`, '--shadow': `inset 0 1px 0 rgb(255 255 255 / 0.18), 0 2px 6px ${black(0.12)}`, '--shadow-lg': `inset 0 1px 0 rgb(255 255 255 / 0.15), 0 10px 24px ${black(0.18)}` }),
      dep('Accent glow', 'Tinted halo in the accent color', { '--border': 'color-mix(in oklab, var(--accent) 30%, var(--bg))', '--shadow-sm': '0 0 0 3px color-mix(in oklab, var(--accent) 12%, transparent)', '--shadow': '0 10px 30px -10px color-mix(in oklab, var(--accent) 45%, transparent)', '--shadow-lg': '0 24px 60px -16px color-mix(in oklab, var(--accent) 55%, transparent)' }),
      dep('Double rule', 'Classic double border, no shadow', { '--bw': '3px', '--bstyle': 'double', '--border': 'var(--border-strong)' }),
      dep('Sketch', 'Dashed lines + a faint offset', { '--bw': '1.5px', '--bstyle': 'dashed', '--border': 'var(--border-strong)', '--shadow': '3px 3px 0 color-mix(in oklab, var(--text) 10%, transparent)', '--shadow-lg': '5px 5px 0 color-mix(in oklab, var(--text) 12%, transparent)' }),
      dep('Soft emboss', 'Neumorphic light + dark pair', { '--bw': '0px', '--shadow-sm': '3px 3px 6px color-mix(in oklab, var(--bg) 82%, black), -3px -3px 6px color-mix(in oklab, var(--bg) 70%, white)', '--shadow': '6px 6px 14px color-mix(in oklab, var(--bg) 78%, black), -6px -6px 14px color-mix(in oklab, var(--bg) 65%, white)', '--shadow-lg': '12px 12px 28px color-mix(in oklab, var(--bg) 74%, black), -10px -10px 24px color-mix(in oklab, var(--bg) 60%, white)' }),
    ],
    preview: () => `<div class="pv-dep">
      <div class="pv-dep-card"><b>Surface</b><span class="muted">--shadow</span></div>
      <div class="pv-dep-card is-lg"><b>Raised</b><span class="muted">--shadow-lg</span></div>
      <span class="pv-dep-btn">Button</span></div>`,
    css: `
      .pv-dep { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 4px 8px 10px 4px; font-size: 13px; }
      .pv-dep-card { display: flex; flex-direction: column; gap: 2px; background: var(--surface); border: var(--bw) var(--bstyle) var(--border);
        box-shadow: var(--shadow); border-radius: var(--r-box); padding: 14px; }
      .pv-dep-card.is-lg { box-shadow: var(--shadow-lg); }
      .pv-dep-btn { justify-self: start; background: var(--surface); border: var(--bw) var(--bstyle) var(--border); box-shadow: var(--shadow-sm);
        border-radius: var(--r-ctl); padding: 6px 14px; font-weight: 600; }`,
  });

  // ---------- texture ----------
  const tint = (c, a) => `color-mix(in oklab, ${c} ${a}%, transparent)`;
  const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.35'/></svg>")`;
  const tex = (name, note, t, size = 'auto') => ({ name, note, vars: { '--tex': t, '--tex-size': size } });
  const star = (x, y, s, a) => `radial-gradient(${s}px ${s}px at ${x}px ${y}px, ${tint('var(--text)', a)}, transparent)`;
  DD.category({
    id: 'texture', group: G, kind: 'tokens', title: 'Background texture',
    blurb: 'What sits behind the page. All tinted from the palette, so they shift between dawn and dusk.',
    options: [
      tex('Plain', 'Solid background', 'none'),
      tex('Film grain', 'Fine analog noise', GRAIN, '180px 180px'),
      tex('Dot grid', 'Quiet engineering dots', `radial-gradient(${tint('var(--text)', 16)} 1px, transparent 1.3px)`, '18px 18px'),
      tex('Graph paper', 'Fine square grid', `linear-gradient(${tint('var(--text)', 6)} 1px, transparent 1px), linear-gradient(90deg, ${tint('var(--text)', 6)} 1px, transparent 1px)`, '24px 24px'),
      tex('Horizon glow', 'Accent light rising from the top edge', `radial-gradient(120% 70% at 50% 0%, ${tint('var(--accent)', 18)}, transparent 70%)`),
      tex('Sky wash', 'Vertical dawn/dusk gradient', `linear-gradient(180deg, color-mix(in oklab, var(--accent) 13%, var(--bg)) 0%, var(--bg) 65%)`),
      tex('Mesh blobs', 'Two soft colored lights', `radial-gradient(40% 55% at 12% 18%, ${tint('var(--accent)', 18)}, transparent), radial-gradient(38% 50% at 88% 85%, ${tint('var(--info)', 15)}, transparent)`),
      tex('Ruled paper', 'Notebook lines', `repeating-linear-gradient(transparent 0 27px, ${tint('var(--info)', 16)} 27px 28px)`),
      tex('Diagonal hatch', 'Fine 45° lines', `repeating-linear-gradient(135deg, ${tint('var(--text)', 6)} 0 1px, transparent 1px 9px)`),
      tex('Scanlines', 'CRT horizontal lines', `repeating-linear-gradient(0deg, ${tint('var(--text)', 5)} 0 1px, transparent 1px 3px)`),
      tex('Starfield', 'Scattered pinpoints — made for dusk',
        [star(20, 30, 1.6, 55), star(118, 74, 1.2, 40), star(182, 160, 2, 60), star(62, 188, 1.2, 35), star(204, 22, 1.4, 45), star(150, 120, 1, 30), star(88, 128, 1.4, 40)].join(', '), '220px 220px'),
      tex('Vignette', 'Darkened edges, spotlit center', `radial-gradient(130% 100% at 50% 40%, transparent 55%, ${tint('var(--text)', 9)})`),
    ],
    preview: () => `<div class="pv-tex"><div class="pv-tex-card"><b class="dd-h">Evening notes</b><span class="muted">Texture sits behind content.</span></div></div>`,
    css: `
      .pv-tex { min-height: 110px; display: grid; place-items: center; }
      .pv-tex-card { display: flex; flex-direction: column; gap: 2px; background: var(--surface); border: 1px solid var(--border);
        border-radius: 10px; padding: 12px 16px; font-size: 13px; box-shadow: 0 8px 24px -12px rgb(0 0 0 / 0.25); }
      .pv-tex-card b { font-size: 17px; }`,
  });

  // ---------- motion ----------
  const mo = (name, dur, ease, note) => ({ name, note, vars: { '--dur': dur, '--ease': ease } });
  DD.category({
    id: 'motion', group: G, kind: 'tokens', default: 3, title: 'Motion',
    blurb: 'One duration + easing used by every hover, toggle and reveal. Hover the button, click the switch.',
    options: [
      mo('Still', '0ms', 'linear', 'No animation at all'),
      mo('Snap', '90ms', 'cubic-bezier(.2,0,0,1)', 'Instant, decisive'),
      mo('Quick', '140ms', 'cubic-bezier(.2,.8,.2,1)', 'Fast and crisp'),
      mo('Smooth', '220ms', 'cubic-bezier(.22,1,.36,1)', 'Ease-out quint — polished'),
      mo('Gentle', '320ms', 'cubic-bezier(.45,0,.55,1)', 'Symmetric, calm'),
      mo('Spring', '420ms', 'cubic-bezier(.34,1.56,.64,1)', 'Slight overshoot, lively'),
      mo('Elastic', '650ms', 'cubic-bezier(.68,-.55,.27,1.55)', 'Big bounce, playful'),
      mo('Cinematic', '700ms', 'cubic-bezier(.16,1,.3,1)', 'Long, luxurious settle'),
      mo('Stepped', '280ms', 'steps(4, end)', 'Frame-by-frame, retro'),
      mo('Mechanical', '200ms', 'linear', 'Constant speed, robotic'),
      mo('Dreamy', '1000ms', 'cubic-bezier(.4,0,.2,1)', 'Slow drift'),
    ],
    preview: (o) => `<div class="pv-mo">
      <div class="pv-mo-track"><i class="pv-mo-dot"></i></div>
      <div class="pv-mo-row"><span class="pv-mo-btn">Hover me</span><span class="sw pv-mo-sw is-on"><i></i></span>
      <span class="pv-mo-meta mono">${o.vars['--dur']}</span></div></div>`,
    css: `
      @keyframes pv-mo-move { 0%, 12% { transform: translateX(0); } 62%, 100% { transform: translateX(calc(100cqw - 20px)); } }
      .pv-mo { display: flex; flex-direction: column; gap: 16px; }
      .pv-mo-track { container-type: inline-size; height: 28px; border-radius: 99px; background: var(--surface-2); padding: 4px; }
      .pv-mo-dot { display: block; width: 20px; height: 20px; border-radius: 50%; background: var(--accent);
        animation: pv-mo-move calc(var(--dur) * 4) var(--ease) infinite alternate; }
      .pv-mo-row { display: flex; align-items: center; gap: 14px; }
      .pv-mo-btn { background: var(--surface); border: 1px solid var(--border); padding: 7px 14px; border-radius: 8px; font-weight: 600; font-size: 13px;
        transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
      .pv-mo-btn:hover { transform: translateY(-4px); box-shadow: 0 10px 20px -10px rgb(0 0 0 / 0.35); }
      .pv-mo-sw { position: relative; width: 40px; height: 24px; border-radius: 99px; background: var(--surface-2); border: 1px solid var(--border);
        transition: background var(--dur) var(--ease); cursor: pointer; }
      .pv-mo-sw i { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: var(--text);
        transition: transform var(--dur) var(--ease); }
      .pv-mo-sw.is-on { background: var(--accent); }
      .pv-mo-sw.is-on i { transform: translateX(16px); background: var(--on-accent); }
      .pv-mo-meta { margin-left: auto; font-size: 11px; color: var(--muted); }`,
  });
})();
