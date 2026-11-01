'use client';

import { forwardRef, useId, useSyncExternalStore, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type SVGProps, type ReactNode } from 'react';
import { icons, type IconName } from './generated/icons.js';
export type { IconName };
const classes = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'ink' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'secondary', size = 'md', loading = false, disabled, className, children, type = 'button', ...props }, ref) {
  return <button {...props} ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || props['aria-busy']} className={classes('dd-btn', `dd-btn--${variant}`, size !== 'md' && `dd-btn--${size}`, loading && 'is-loading', className)}>
    {loading && <span className="dd-btn__spinner" aria-hidden="true" />}{children}
  </button>;
});

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Class on the field wrapper; className applies to the native input. */
  fieldClassName?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, hint, error, size = 'md', fieldClassName, id, className, 'aria-describedby': describedBy, ...props }, ref) {
  const generated = useId();
  const controlId = id ?? generated;
  const hasError = error !== undefined && error !== null && error !== false && error !== '';
  const message = hasError ? error : hint;
  const hasMessage = message !== undefined && message !== null && message !== false && message !== '';
  const messageId = `${controlId}-message`;
  return <div className={classes('dd-field', fieldClassName)}>
    <label className="dd-field__label" htmlFor={controlId}>{label}</label>
    <div className={classes('dd-input', size !== 'md' && `dd-input--${size}`)}>
      <input {...props} id={controlId} ref={ref} aria-invalid={hasError || props['aria-invalid']} aria-describedby={classes(describedBy, hasMessage && messageId) || undefined} className={classes('dd-input__control', className)} />
    </div>
    {hasMessage && <p id={messageId} className={hasError ? 'dd-field__error' : 'dd-field__hint'}>{message}</p>}
  </div>;
});

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}
/** A padded card; children are rendered inside its body. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ className, children, ...props }, ref) {
  return <div {...props} ref={ref} className={classes('dd-card', className)}><div className="dd-card__body">{children}</div></div>;
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: 'neutral' | 'accent' | 'ok' | 'warn' | 'bad' | 'info';
  variant?: 'soft' | 'solid' | 'outline' | 'dot' | 'ghost';
}
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ intent = 'neutral', variant = 'soft', className, ...props }, ref) {
  return <span {...props} ref={ref} className={classes('dd-badge', `dd-badge--${intent}`, `dd-badge--${variant}`, className)} />;
});

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'dangerouslySetInnerHTML'> {
  name: IconName;
  /** Omit for decorative icons; provide (or a native aria-label / aria-labelledby) for a meaningful standalone icon. */
  label?: string;
}
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon({ name, label, className, ...props }, ref) {
  const icon = icons[name];
  if (!icon) return null;
  const accessibleName = label ?? props['aria-label'];
  const labelled = !!accessibleName || !!props['aria-labelledby'];
  // Markup is generated exclusively from the project-owned sprite, never from user input.
  return <svg {...props} ref={ref} viewBox={icon.viewBox} className={classes('dd-icon', className)} focusable={props.focusable ?? 'false'}
    role={props.role ?? (labelled ? 'img' : undefined)} aria-label={accessibleName} aria-hidden={props['aria-hidden'] ?? (labelled ? undefined : true)}
    dangerouslySetInnerHTML={{ __html: icon.body }} />;
});

type Theme = 'dawn' | 'dusk';
const darkQuery = () => matchMedia('(prefers-color-scheme: dark)');
/** The theme in effect: the explicit choice on <html>, else the OS setting. */
const currentTheme = (): Theme => (document.documentElement.dataset.theme as Theme | undefined) || (darkQuery().matches ? 'dusk' : 'dawn');

/** Changes the document theme. Call from a client event; "system" follows the OS. */
export function setTheme(theme: Theme | 'system') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  // Swap in one frame, as dawn-and-dusk/auto does: with every colour transition running at once the page repaints for
  // --dd-dur and lags.
  const off = document.createElement('style');
  off.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.append(off);
  if (theme === 'system') root.removeAttribute('data-theme');
  else root.dataset.theme = theme;
  void document.body?.offsetHeight; // apply the new colours while transitions are off
  requestAnimationFrame(() => off.remove());
  try { if (theme === 'system') localStorage.removeItem('dd-theme'); else localStorage.setItem('dd-theme', theme); } catch { /* storage may be unavailable */ }
}

// Every toggle follows the theme however it changes: this toggle, another one, setTheme, or the OS.
const subscribeTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const query = darkQuery();
  query.addEventListener('change', onChange);
  return () => { observer.disconnect(); query.removeEventListener('change', onChange); };
};
const isDusk = () => currentTheme() === 'dusk';
// The server can't know the theme, so the server render and hydration carry no aria-pressed; it is set once mounted.
const unknown = () => undefined;

/** A toggle button between dawn and dusk; aria-pressed is true in dusk. */
export const ThemeToggle = forwardRef<HTMLButtonElement, ButtonProps>(function ThemeToggle({ children = 'Switch theme', onClick, ...props }, ref) {
  const dusk = useSyncExternalStore<boolean | undefined>(subscribeTheme, isDusk, unknown);
  return <Button aria-pressed={dusk} {...props} ref={ref} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    setTheme(currentTheme() === 'dusk' ? 'dawn' : 'dusk');
  }}>{children}</Button>;
});
