/* Scrollbar width: keeps --dd-scrollbar-w on <html> at the width of the page's vertical scrollbar (0 with overlay
   scrollbars), so base.css can pad the page by it while a modal layer locks scrolling — nothing shifts sideways. It is
   only measured while the page is not locked. */
(() => {
  const root = document.documentElement;
  const locked = () => root.matches(':has(dialog:modal), .dd-side-nav-lock');
  const measure = () => {
    if (locked()) return;
    root.style.setProperty('--dd-scrollbar-w', `${Math.max(0, innerWidth - root.clientWidth)}px`);
  };
  measure();
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', measure);
  // Content can grow until the page scrolls (or shrink until it doesn't): re-measure when the body's size changes.
  if ('ResizeObserver' in window) document.addEventListener('DOMContentLoaded', () => new ResizeObserver(measure).observe(document.body));
})();
