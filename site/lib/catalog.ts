import { sections } from './nav';
const sources = import.meta.glob<string>('../pages/components/*.astro', { query: '?raw', import: 'default', eager: true });
export const reactExports: Record<string, string> = { button: 'Button', 'text-input': 'Input', card: 'Card', badge: 'Badge', checkbox: 'Checkbox', switch: 'Switch', textarea: 'Textarea', select: 'Select', dialog: 'Dialog', tabs: 'Tabs' };
const nextReactExports = new Set(['textarea', 'select', 'checkbox', 'switch', 'dialog', 'tabs']);
export const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const catalog = sections.find((section) => section.key === 'components')!.groups.flatMap((group) => group.items.filter((item) => item.href.startsWith('components/')).map((item) => {
  const name = item.href.split('/')[1]; const source = sources[`../pages/components/${name}.astro`] ?? '';
  const lead = source.match(/<Docs[^>]* lead="([^"]*)"/)?.[1] ?? `${item.title} in dawn and dusk.`;
  return { ...item, name, category: group.group, lead, react: reactExports[name], unreleased: nextReactExports.has(name) };
}));
export const sectionIndex = Object.entries(sources).flatMap(([path, source]) => {
  const name = path.split('/').pop()!.replace('.astro', ''); const component = catalog.find((item) => item.name === name);
  if (!component) return [];
  // Index rendered documentation sections, without scripts or example source strings.
  const body = source.slice(source.indexOf('<Docs')).replace(/<script[\s\S]*?<\/script>/g, '');
  return [...body.matchAll(/<h2([^>]*)>([^<]+)<\/h2>([\s\S]*?)(?=<h2|<\/Docs>)/g)].map((match) => ({
    title: `${component.title} · ${match[2]}`,
    href: `${component.href}#${match[1].match(/id="([^"]+)"/)?.[1] ?? slug(match[2])}`,
    keywords: `${component.title} ${match[2]} ${match[3].replace(/<[^>]*>|\{[^}]*\}/g, ' ').replace(/\s+/g, ' ').slice(0, 1800)}`.toLowerCase(),
    component: name,
  }));
});
