// Shiki theme for the docs' highlighted code, painted with the system's own --dd-syntax-* tokens, so a snippet on a docs
// page is coloured exactly like the .dd-code component and follows dawn / dusk with no re-render.
// Tags and keywords wine, attributes and properties ochre, strings sage, numbers terracotta, functions info, comments muted.
import type { ThemeRegistration } from 'shiki';

const c = (name: string) => `var(--dd-syntax-${name})`;

export const ddTheme: ThemeRegistration = {
  name: 'dawn-and-dusk',
  type: 'light',
  colors: { 'editor.foreground': 'var(--dd-text)', 'editor.background': 'transparent' },
  fg: 'var(--dd-text)',
  bg: 'transparent',
  tokenColors: [
    { settings: { foreground: 'var(--dd-text)' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c('comment'), fontStyle: 'italic' } },
    { scope: ['punctuation', 'meta.brace', 'punctuation.definition.tag', 'punctuation.separator', 'punctuation.terminator', 'keyword.operator.assignment'], settings: { foreground: c('punct') } },
    { scope: ['entity.name.tag', 'support.class.component', 'meta.tag.sgml', 'markup.heading', 'entity.name.section'], settings: { foreground: c('tag') } },
    { scope: ['keyword', 'storage', 'storage.type', 'keyword.control', 'keyword.operator.new', 'keyword.operator.expression', 'variable.language', 'constant.language.boolean', 'keyword.other.important'], settings: { foreground: c('keyword') } },
    { scope: ['entity.other.attribute-name', 'support.type.property-name', 'meta.property-name', 'variable.other.property', 'meta.object-literal.key', 'entity.name.tag.yaml', 'support.type.vendored.property-name'], settings: { foreground: c('attr') } },
    { scope: ['string', 'string.quoted', 'string.template', 'meta.attribute-value', 'markup.inline.raw', 'markup.raw'], settings: { foreground: c('string') } },
    { scope: ['constant.numeric', 'constant.language', 'constant.other', 'support.constant', 'keyword.other.unit', 'constant.other.color'], settings: { foreground: c('number') } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function', 'entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css', 'entity.name.tag.css', 'markup.underline.link'], settings: { foreground: c('function') } },
    { scope: ['variable.parameter', 'support.variable', 'variable.other.env', 'variable.other.normal.shell', 'punctuation.definition.variable'], settings: { foreground: c('variable') } },
    { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
    { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
  ],
};
