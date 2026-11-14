export interface Recipe { title: string; lead: string; note: string; html: string; script: string; }
export const recipes: Record<string, Recipe> = {
  settings: {
    title: 'Workspace settings', lead: 'A complete settings form with native controls, validation, saving feedback, and browser persistence.',
    note: 'This demo saves to this browser only. Connect the save handler to your API when using it in a shared workspace.',
    html: `<form data-settings class="dd-stack" style="--dd-gap:var(--dd-space-5)">
  <header><h2 class="dd-h3">workspace settings</h2><p class="dd-small dd-muted">Choose how your team works.</p></header>
  <div class="dd-field"><label class="dd-field__label" for="workspace-name">Workspace name</label><div class="dd-input"><input class="dd-input__control" id="workspace-name" name="workspace" value="cxkw" required minlength="2" aria-describedby="workspace-hint workspace-error"></div><p class="dd-field__hint" id="workspace-hint">At least two characters.</p><p class="dd-field__error" id="workspace-error" hidden></p></div>
  <div class="dd-field"><label class="dd-field__label" for="workspace-region">Default region</label><div class="dd-input dd-select"><select class="dd-input__control" id="workspace-region" name="region"><option value="iad1">Washington, D.C.</option><option value="fra1">Frankfurt</option><option value="sin1">Singapore</option></select><span class="dd-select__chevron" aria-hidden="true">⌄</span></div></div>
  <div class="dd-field"><label class="dd-field__label" for="workspace-description">Description</label><div class="dd-input dd-textarea"><textarea class="dd-input__control" id="workspace-description" name="description" rows="3">Tools for thoughtful work.</textarea></div></div>
  <label class="dd-checkbox"><input class="dd-checkbox__input" type="checkbox" name="digest" checked>Send a weekly activity digest</label>
  <label class="dd-switch"><input class="dd-switch__input" type="checkbox" role="switch" name="deploy" checked>Automatically deploy approved changes</label>
  <div class="dd-row"><button class="dd-btn dd-btn--primary" type="submit">Save changes</button><button class="dd-btn dd-btn--ghost" type="reset">Reset form</button></div>
  <p class="dd-small" style="min-height:1.5em" data-settings-status role="status" aria-live="polite"></p>
</form>`,
    script: `const form = document.querySelector('[data-settings]');
const status = form.querySelector('[data-settings-status]');
const name = form.elements.namedItem('workspace');
const error = form.querySelector('#workspace-error');
const validate = () => {
  const valid = name.value.trim().length >= 2;
  name.setCustomValidity(valid ? '' : 'Enter at least two characters.');
  name.setAttribute('aria-invalid', String(!valid));
  error.hidden = valid; error.textContent = valid ? '' : 'Enter at least two characters.';
  return valid;
};
try {
  const saved = JSON.parse(localStorage.getItem('dd-recipe-settings') || 'null');
  if (saved && typeof saved === 'object') for (const key of ['workspace', 'region', 'description', 'digest', 'deploy']) {
    const field = form.elements.namedItem(key);
    if (field.type === 'checkbox' && typeof saved[key] === 'boolean') field.checked = saved[key];
    else if (typeof saved[key] === 'string') field.value = saved[key];
  }
} catch { status.textContent = 'Saved settings could not be read. You can still edit the form.'; }
name.addEventListener('input', validate);
name.addEventListener('invalid', validate);
form.addEventListener('reset', () => { name.setCustomValidity(''); name.removeAttribute('aria-invalid'); error.hidden = true; status.textContent = 'Form reset. Save to replace the stored settings.'; });
form.addEventListener('submit', async (event) => {
  event.preventDefault(); if (!validate() || !form.reportValidity()) return;
  const button = form.querySelector('[type="submit"]');
  button.disabled = true; button.setAttribute('aria-busy', 'true'); status.textContent = 'Saving changes…';
  const saved = { workspace: name.value.trim(), region: form.elements.namedItem('region').value, description: form.elements.namedItem('description').value, digest: form.elements.namedItem('digest').checked, deploy: form.elements.namedItem('deploy').checked };
  try {
    // Replace this delay and localStorage write with your API request.
    await new Promise((resolve) => setTimeout(resolve, 450));
    localStorage.setItem('dd-recipe-settings', JSON.stringify(saved));
    status.textContent = 'Changes saved in this browser.';
  } catch { status.textContent = 'Changes could not be saved. Check browser storage and try again.'; }
  finally { button.disabled = false; button.removeAttribute('aria-busy'); }
});`,
  },
  projects: {
    title: 'Project directory', lead: 'A searchable project table with loading, empty results, failure, and retry states.',
    note: 'The rows are sample data. Use the preview-state control to inspect each state; replace loadProjects with your API request.',
    html: `<section data-projects class="dd-stack" style="--dd-gap:var(--dd-space-5)" aria-label="Project directory">
  <header><h2 class="dd-h3">projects</h2><p class="dd-small dd-muted">Everything your team is building.</p></header>
  <div class="dd-field"><label class="dd-field__label" for="project-search">Find a project</label><div class="dd-input"><input class="dd-input__control" id="project-search" type="search" placeholder="Search by name or region…"></div></div>
  <p data-project-status class="dd-small" role="status" aria-live="polite"></p>
  <div style="overflow-x:auto" data-project-table><table class="dd-table"><caption class="dd-visually-hidden">Workspace projects</caption><thead><tr><th scope="col">Project</th><th scope="col">Region</th><th scope="col">Status</th></tr></thead><tbody></tbody></table></div>
  <div data-project-empty hidden><h3 class="dd-h4">No projects found</h3><p class="dd-small dd-muted">Try another name or clear your search.</p><button class="dd-btn dd-btn--secondary" type="button" data-project-clear>Clear search</button></div>
  <div data-project-error hidden role="alert"><h3 class="dd-h4">Projects could not be loaded</h3><p class="dd-small">Your changes are safe. Try loading the list again.</p><button class="dd-btn dd-btn--primary" type="button" data-project-retry>Try again</button></div>
</section>`,
    script: `const root = document.querySelector('[data-projects]');
const input = root.querySelector('#project-search');
const status = root.querySelector('[data-project-status]');
const rows = [{ name: 'edge-cache', region: 'Frankfurt', state: 'Ready' }, { name: 'auth-gateway', region: 'Washington', state: 'Building' }, { name: 'billing-worker', region: 'Singapore', state: 'Ready' }];
let state = 'ready', generation = 0;
function render() {
  const preview = document.querySelector('[data-recipe-state]'); if (preview) preview.value = state;
  const matches = state === 'empty' ? [] : rows.filter((row) => (row.name + ' ' + row.region).toLowerCase().includes(input.value.trim().toLowerCase()));
  root.setAttribute('aria-busy', String(state === 'loading'));
  root.querySelector('[data-project-table]').hidden = state === 'loading' || state === 'error' || !matches.length;
  root.querySelector('[data-project-empty]').hidden = state === 'loading' || state === 'error' || matches.length > 0;
  root.querySelector('[data-project-error]').hidden = state !== 'error';
  status.textContent = state === 'loading' ? 'Loading projects…' : state === 'error' ? '' : matches.length + (matches.length === 1 ? ' project' : ' projects');
  const body = root.querySelector('tbody'); body.replaceChildren();
  for (const row of matches) {
    const tr = document.createElement('tr');
    for (const value of [row.name, row.region, row.state]) { const td = document.createElement('td'); td.textContent = value; tr.append(td); }
    body.append(tr);
  }
}
async function loadProjects(fromRetry = false) {
  const request = ++generation; state = 'loading'; render();
  try {
    // Replace this delay with fetch; check response.ok and handle failures in catch.
    await new Promise((resolve) => setTimeout(resolve, 450));
    if (request !== generation) return;
    state = 'ready'; render(); if (fromRetry) input.focus();
  } catch { if (request === generation) { state = 'error'; render(); } }
}
input.addEventListener('input', () => { if (state === 'empty') state = 'ready'; render(); });
root.querySelector('[data-project-clear]').addEventListener('click', () => { input.value = ''; state = 'ready'; render(); input.focus(); });
root.querySelector('[data-project-retry]').addEventListener('click', loadProjects);
// The docs' preview control is outside the copied recipe. No control is required in your app.
document.querySelector('[data-recipe-state]')?.addEventListener('change', (event) => { generation++; state = event.target.value; render(); });
loadProjects();`,
  },
  'sign-in': {
    title: 'Sign in', lead: 'A sign-in form with labeled fields, validation, pending feedback, recoverable errors, and a simulated signed-in state.',
    note: 'This is a UI demo, not authentication. It never sends or stores credentials. Connect a trusted authentication provider before using it in a real app.',
    html: `<div data-sign-in>
  <form><div class="dd-stack" style="--dd-gap:var(--dd-space-5)">
    <header><h2 class="dd-h3">welcome back</h2><p class="dd-small dd-muted">Sign in to your workspace.</p></header>
    <div class="dd-field"><label class="dd-field__label" for="sign-in-email">Email</label><div class="dd-input"><input class="dd-input__control" type="email" id="sign-in-email" name="email" autocomplete="username" placeholder="you@example.com" required></div></div>
    <div class="dd-field"><label class="dd-field__label" for="sign-in-password">Password</label><div class="dd-input"><input class="dd-input__control" type="password" id="sign-in-password" name="password" autocomplete="current-password" minlength="8" required aria-describedby="password-hint"></div><p class="dd-field__hint" id="password-hint">For this demo, use any eight characters.</p></div>
    <button class="dd-btn dd-btn--primary" type="submit">Sign in</button>
    <p class="dd-small" style="min-height:1.5em" data-sign-in-status role="status" aria-live="polite"></p>
  </div></form>
  <section data-session hidden tabindex="-1" aria-label="Demo session"><h2 class="dd-h3">you’re signed in</h2><p class="dd-small">This is a simulated session. No credentials were sent or saved.</p><button class="dd-btn dd-btn--secondary" type="button" data-sign-out>Sign out</button></section>
</div>`,
    script: `const root = document.querySelector('[data-sign-in]');
const form = root.querySelector('form');
const status = root.querySelector('[data-sign-in-status]');
const session = root.querySelector('[data-session]');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); if (!form.reportValidity()) return;
  const button = form.querySelector('[type="submit"]');
  button.disabled = true; button.setAttribute('aria-busy', 'true'); status.textContent = 'Signing in…';
  try {
    // Replace the simulation with your authentication provider. Never persist passwords.
    await new Promise((resolve) => setTimeout(resolve, 450));
    if (document.querySelector('[data-recipe-state]')?.value === 'error') throw new Error('Demo failure');
    form.elements.namedItem('password').value = '';
    form.hidden = true; session.hidden = false; session.focus(); status.textContent = '';
  } catch { status.textContent = 'Sign-in could not be completed. Check your details and try again.'; }
  finally { button.disabled = false; button.removeAttribute('aria-busy'); }
});
root.querySelector('[data-sign-out]').addEventListener('click', () => { session.hidden = true; form.hidden = false; form.reset(); form.elements.namedItem('email').focus(); });`,
  },
};
