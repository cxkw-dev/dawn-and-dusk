export const kinds = ['button', 'badge', 'text-input', 'textarea', 'select', 'checkbox', 'switch', 'card'];
export interface Options { variant: string; size: string; disabled: boolean; loading: boolean; invalid: boolean; }
export function snippet(kind: string, o: Options, id = 'example-control') {
  const size = o.size === 'md' ? '' : ` dd-${kind === 'text-input' || kind === 'select' ? 'input' : kind}--${o.size}`;
  const disabled = o.disabled ? ' disabled' : '';
  const error = o.invalid ? ' aria-invalid="true"' : '';
  const message = o.invalid ? 'Enter a project name.' : 'Visible to everyone in your workspace.';
  const field = (control: string) => `<div class="dd-field">\n  <label class="dd-field__label" for="${id}">Project name</label>\n  ${control}\n  <p class="dd-field__${o.invalid ? 'error' : 'hint'}" id="${id}-message">${message}</p>\n</div>`;
  let html = '', jsx = '', name = '';
  if (kind === 'button') {
    name = 'Button'; html = `<button class="dd-btn dd-btn--${o.variant}${size}${o.loading ? ' is-loading' : ''}" type="button"${o.disabled || o.loading ? ' disabled' : ''}${o.loading ? ' aria-busy="true"' : ''}>${o.loading ? '<span class="dd-btn__spinner" aria-hidden="true"></span>' : ''}Save changes</button>`;
    jsx = `<Button variant="${o.variant}" size="${o.size}"${o.disabled ? ' disabled' : ''}${o.loading ? ' loading' : ''}>Save changes</Button>`;
  } else if (kind === 'badge') {
    name = 'Badge'; html = `<span class="dd-badge dd-badge--${o.variant} dd-badge--soft">Production</span>`; jsx = `<Badge intent="${o.variant}">Production</Badge>`;
  } else if (kind === 'card') {
    name = 'Card'; html = '<div class="dd-card"><div class="dd-card__body"><h3 class="dd-h4">Workspace</h3><p>Your next project starts here.</p></div></div>'; jsx = '<Card><h3 className="dd-h4">Workspace</h3><p>Your next project starts here.</p></Card>';
  } else if (kind === 'checkbox' || kind === 'switch') {
    name = kind === 'checkbox' ? 'Checkbox' : 'Switch'; html = `<label class="dd-${kind}${size}"><input class="dd-${kind}__input" type="checkbox"${kind === 'switch' ? ' role="switch"' : ''}${disabled}>Weekly updates</label>`;
    jsx = `<${name} label="Weekly updates" size="${o.size}"${o.disabled ? ' disabled' : ''} />`;
  } else {
    name = kind === 'text-input' ? 'Input' : kind === 'textarea' ? 'Textarea' : 'Select';
    const attrs = `id="${id}" name="project" class="dd-input__control" aria-describedby="${id}-message"${disabled}${error}`;
    const control = kind === 'textarea' ? `<div class="dd-input dd-textarea"><textarea ${attrs} rows="3" placeholder="My project"></textarea></div>` : kind === 'select' ? `<div class="dd-input dd-select${size}"><select ${attrs}><option value="edge-cache">edge-cache</option><option value="auth-gateway">auth-gateway</option></select><span class="dd-select__chevron" aria-hidden="true">⌄</span></div>` : `<div class="dd-input${size}"><input ${attrs} placeholder="My project"></div>`;
    html = field(control);
    jsx = `<${name} label="Project name" name="project"${name === 'Textarea' ? ' rows={3}' : ` size="${o.size}"`}${name !== 'Select' ? ' placeholder="My project"' : ''}${o.disabled ? ' disabled' : ''}${o.invalid ? ' error="Enter a project name."' : ' hint="Visible to everyone in your workspace."'}${name === 'Select' ? '><option value="edge-cache">edge-cache</option><option value="auth-gateway">auth-gateway</option></Select>' : ' />'}`;
  }
  return { html, react: `import 'dawn-and-dusk/styles.css';\nimport { ${name} } from 'dawn-and-dusk/react';\n\nexport default function App() {\n  return (${jsx});\n}` };
}
