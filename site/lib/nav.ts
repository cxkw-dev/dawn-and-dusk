// The docs' navigation, read from site/nav/*.mjs and shared by the layout (breadcrumbs, current section) and DocsNav.
// Each nav file is one group, or — when its items name their own `group` — one group per label, in order. The file's
// own `group` stays a search keyword for its pages. Each group lands in the rail section its file names (`section`),
// else the one its pages' paths decide.

export interface NavItem { title: string; href: string; group?: string }
interface NavFile { group: string; order: number; section?: string; items: NavItem[] }
export interface NavGroup { group: string; keywords: string; items: NavItem[] }
export interface RailSection { key: string; label: string; icon: string; title: string; groups: NavGroup[] }

const RAIL = [
  { key: 'foundations', label: 'Foundations', icon: 'layers', title: 'foundations' },
  { key: 'components', label: 'Components', icon: 'box', title: 'components' },
  { key: 'ai', label: 'AI', icon: 'ai', title: 'ai' },
];

/** The site's base path without a trailing slash ('/dawn-and-dusk'). */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** A nav href ('components/button', '' for the introduction) as a site path, without a trailing slash. */
export const hrefOf = (href: string) => `${base}/${href}`.replace(/\/$/, '');

const files = Object.values(import.meta.glob<{ default: NavFile }>('../nav/*.mjs', { eager: true }))
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);

const groups = files.flatMap((f) => {
  const out: (NavGroup & { section: string })[] = [];
  const section = f.section ?? ((f.items[0]?.href ?? '').startsWith('components/') ? 'components' : 'foundations');
  for (const it of f.items) {
    const name = it.group ?? f.group;
    let g = out.find((x) => x.group === name);
    if (!g) out.push((g = { group: name, keywords: f.group, items: [], section }));
    g.items.push(it);
  }
  return out;
});

export const sections: RailSection[] = RAIL
  .map((r) => ({ ...r, groups: groups.filter((g) => g.section === r.key).map(({ section, ...g }) => g) }))
  .filter((s) => s.groups.length);

/** The section and nav item a page path (without a trailing slash) belongs to, if it is in the nav. */
export function locate(path: string): { section?: RailSection; item?: NavItem } {
  for (const section of sections) for (const g of section.groups) for (const item of g.items) if (hrefOf(item.href) === path) return { section, item };
  return {};
}
