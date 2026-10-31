import type { ScriptHTMLAttributes } from 'react';
import { themeScript } from './theme-source.mjs';
export { themeScript };
/** Place in <head>, before the stylesheet. Accepts a CSP nonce. Safe to render on the server. */
export function ThemeScript(props: Omit<ScriptHTMLAttributes<HTMLScriptElement>, 'src' | 'children' | 'dangerouslySetInnerHTML'>) {
  return <script {...props} dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
