// Minimal test registry: test('menu opens on click', async ({ open }) => { … }). Run all with `npm test`.
export const tests = [];
export const test = (name, fn, { only = false } = {}) => tests.push({ name, fn, only, file: currentFile });
let currentFile = '';
export const setFile = (f) => { currentFile = f; };
