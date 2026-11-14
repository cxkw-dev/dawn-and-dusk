'use client';

import { forwardRef, useId, useSyncExternalStore, useEffect, useRef, useState, type SelectHTMLAttributes, type TextareaHTMLAttributes, type DialogHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type SVGProps, type ReactNode } from 'react';
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


export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string; hint?: ReactNode; error?: ReactNode; fieldClassName?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, hint, error, fieldClassName, id, className, 'aria-describedby': describedBy, ...props }, ref) {
  const generated = useId(); const controlId = id ?? generated;
  const invalid = error !== undefined && error !== null && error !== false && error !== '';
  const message = invalid ? error : hint; const hasMessage = message !== undefined && message !== null && message !== false && message !== ''; const messageId = `${controlId}-message`;
  return <div className={classes('dd-field', fieldClassName)}>
    <label className="dd-field__label" htmlFor={controlId}>{label}</label>
    <div className="dd-input dd-textarea"><textarea {...props} id={controlId} ref={ref} className={classes('dd-input__control', className)} aria-invalid={invalid || props['aria-invalid']} aria-describedby={classes(describedBy, hasMessage && messageId) || undefined} /></div>
    {hasMessage && <p id={messageId} className={invalid ? 'dd-field__error' : 'dd-field__hint'}>{message}</p>}
  </div>;
});

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string; hint?: ReactNode; error?: ReactNode; size?: 'sm' | 'md' | 'lg'; fieldClassName?: string;
}
/** Native select: browser keyboard, mobile picker, form submission and React state. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, hint, error, size = 'md', fieldClassName, id, className, children, 'aria-describedby': describedBy, ...props }, ref) {
  const generated = useId(); const controlId = id ?? generated;
  const invalid = error !== undefined && error !== null && error !== false && error !== '';
  const message = invalid ? error : hint; const hasMessage = message !== undefined && message !== null && message !== false && message !== ''; const messageId = `${controlId}-message`;
  return <div className={classes('dd-field', fieldClassName)}>
    <label className="dd-field__label" htmlFor={controlId}>{label}</label>
    <div className={classes('dd-input dd-select', size !== 'md' && `dd-input--${size}`)}>
      <select {...props} id={controlId} ref={ref} className={classes('dd-input__control', className)} aria-invalid={invalid || props['aria-invalid']} aria-describedby={classes(describedBy, hasMessage && messageId) || undefined}>{children}</select>
      <span className="dd-select__chevron"><Icon name="chevron-down" /></span>
    </div>
    {hasMessage && <p id={messageId} className={invalid ? 'dd-field__error' : 'dd-field__hint'}>{message}</p>}
  </div>;
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: ReactNode; hint?: ReactNode; error?: ReactNode; size?: 'sm' | 'md';
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, hint, error, size = 'md', className, id, 'aria-describedby': describedBy, ...props }, ref) {
  const generated = useId(); const controlId = id ?? generated;
  const invalid = error !== undefined && error !== null && error !== false && error !== '';
  const message = invalid ? error : hint; const hasMessage = message !== undefined && message !== null && message !== false && message !== '';
  return <div className="dd-field"><label className={classes('dd-checkbox', size !== 'md' && `dd-checkbox--${size}`)}>
    <input {...props} type="checkbox" id={controlId} ref={ref} className={classes('dd-checkbox__input', className)} aria-invalid={invalid || props['aria-invalid']} aria-describedby={classes(describedBy, hasMessage && `${controlId}-message`) || undefined} />
    <span className="dd-checkbox__text">{label}</span>
  </label>{hasMessage && <p id={`${controlId}-message`} className={invalid ? 'dd-field__error' : 'dd-field__hint'}>{message}</p>}</div>;
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'role'> {
  label: ReactNode; size?: 'sm' | 'md' | 'lg';
}
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, size = 'md', className, ...props }, ref) {
  return <label className={classes('dd-switch', size !== 'md' && `dd-switch--${size}`)}><input {...props} ref={ref} type="checkbox" role="switch" className={classes('dd-switch__input', className)} /><span>{label}</span></label>;
});

export interface DialogProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'title'> {
  open: boolean; title: ReactNode; onOpenChange: (open: boolean) => void; footer?: ReactNode;
}
/** Controlled native modal. The browser traps focus and returns it to the opener. */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog({ open, title, onOpenChange, footer, children, className, onCancel, onClose, ...props }, forwardedRef) {
  const ownRef = useRef<HTMLDialogElement | null>(null); const titleId = useId();
  useEffect(() => {
    const el = ownRef.current; if (!el) return;
    if (open && !el.open) el.showModal(); else if (!open && el.open) el.close();
    return () => { if (el.open) el.close(); };
  }, [open]);
  return <dialog {...props} ref={(el) => { ownRef.current = el; if (typeof forwardedRef === 'function') forwardedRef(el); else if (forwardedRef) forwardedRef.current = el; }} className={classes('dd-dialog', className)} aria-labelledby={props['aria-labelledby'] ?? titleId}
    onCancel={(event) => { onCancel?.(event); if (!event.defaultPrevented) { event.preventDefault(); onOpenChange(false); } }}
    onClose={(event) => { onClose?.(event); if (!event.currentTarget.open) onOpenChange(false); }}
    onKeyDown={(event) => {
      props.onKeyDown?.(event); if (event.defaultPrevented || event.key !== 'Tab') return;
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]')].filter((el) => el.tabIndex >= 0 && !el.matches(':disabled') && !el.closest('[inert]') && el.getClientRects().length > 0 && getComputedStyle(el).visibility === 'visible');
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      else if (!first) { event.preventDefault(); event.currentTarget.focus(); }
    }}>
    <header className="dd-dialog__head"><h2 className="dd-dialog__title" id={titleId}>{title}</h2><button className="dd-dialog__close" type="button" aria-label="Close" onClick={() => onOpenChange(false)}><Icon name="x" /></button></header>
    <div className="dd-dialog__body">{children}</div>{footer && <footer className="dd-dialog__foot">{footer}</footer>}
  </dialog>;
});

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  label: string;
  items: { value: string; label: ReactNode; content: ReactNode; disabled?: boolean }[];
  value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
}
/** Horizontal tabs with automatic activation and roving keyboard focus. Item values must be unique. */
export function Tabs({ label, items, value, defaultValue, onValueChange, className, ...props }: TabsProps) {
  const id = useId(); const [local, setLocal] = useState(defaultValue ?? items.find((item) => !item.disabled)?.value);
  const selected = value ?? local;
  const current = items.some((item) => item.value === selected && !item.disabled) ? selected : items.find((item) => !item.disabled)?.value;
  const select = (next: string) => { if (value === undefined) setLocal(next); onValueChange?.(next); };
  return <div {...props} className={classes('dd-tabs', className)}>
    <div className="dd-tabs__list" role="tablist" aria-label={label}>{items.map((item, index) => <button key={item.value} type="button" role="tab" className="dd-tabs__tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={current === item.value} tabIndex={current === item.value ? 0 : -1} disabled={item.disabled} onClick={() => select(item.value)} onKeyDown={(event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); const enabled = items.filter((tab) => !tab.disabled); const at = enabled.indexOf(item);
      const next = event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled[enabled.length - 1] : enabled[(at + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
      if (next) { select(next.value); document.getElementById(`${id}-tab-${items.indexOf(next)}`)?.focus(); }
    }}>{item.label}</button>)}</div>
    {items.map((item, index) => <div key={item.value} className="dd-tabs__panel" role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={current !== item.value} tabIndex={0}>{item.content}</div>)}
  </div>;
}
