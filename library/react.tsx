'use client';

import { forwardRef, useId, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type SVGProps, type ReactNode } from 'react';
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
  /** Omit for decorative icons; provide for a meaningful standalone icon. */
  label?: string;
}
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon({ name, label, className, ...props }, ref) {
  const icon = icons[name];
  if (!icon) return null;
  // Markup is generated exclusively from the project-owned sprite, never from user input.
  return <svg {...props} ref={ref} viewBox={icon.viewBox} className={classes('dd-icon', className)} focusable="false" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} dangerouslySetInnerHTML={{ __html: icon.body }} />;
});

/** Changes the document theme. Call from a client event; "system" follows the OS. */
export function setTheme(theme: 'dawn' | 'dusk' | 'system') {
  if (typeof document === 'undefined') return;
  if (theme === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.dataset.theme = theme;
  try { if (theme === 'system') localStorage.removeItem('dd-theme'); else localStorage.setItem('dd-theme', theme); } catch { /* storage may be unavailable */ }
}
export const ThemeToggle = forwardRef<HTMLButtonElement, ButtonProps>(function ThemeToggle({ children = 'Switch theme', onClick, ...props }, ref) {
  return <Button {...props} ref={ref} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const current = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn');
    setTheme(current === 'dusk' ? 'dawn' : 'dusk');
  }}>{children}</Button>;
});
