// Scroll is the timeline: no scroll interception, timers or idle animation loop.
const cover = document.querySelector<HTMLElement>('.home-cover');
const gallery = document.querySelector<HTMLElement>('.home-collage');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const suns = [...document.querySelectorAll<HTMLElement>('.home-cover .home-sun')];
const wordmarks = [...document.querySelectorAll<HTMLElement>('.home-cover .home-mast')];
const windowEl = gallery?.querySelector<HTMLElement>('.home-window');
const face = gallery?.querySelector<HTMLElement>('.home-face--over');
const clamp = (value: number) => Math.max(0, Math.min(1, value));
let frame = 0;

function paint() {
  frame = 0;
  // Read both bounds before writing transforms. Geometry follows responsive layout and font loading.
  const c = cover?.getBoundingClientRect();
  const g = gallery?.getBoundingClientRect();
  const quiet = reduced.matches;
  if (c) {
    const progress = quiet ? 0 : clamp((60 - c.top) / c.height);
    const mobile = c.width < 600;
    const sunY = progress * Math.min(c.height * (mobile ? .16 : .27), 230);
    const sunX = progress * c.width * (mobile ? -.035 : .055);
    const mastY = progress * Math.min(c.height * (mobile ? .055 : .11), 96);
    suns.forEach((el) => { el.style.transform = quiet ? '' : `translate3d(${sunX}px, ${sunY}px, 0)`; });
    wordmarks.forEach((el) => { el.style.transform = quiet ? '' : `translate3d(0, ${mastY}px, 0)`; });
  }
  if (g && windowEl && face) {
    // A broad diagonal travels through the entire lookbook, with the content counter-translated to stay aligned.
    const progress = clamp((innerHeight * .85 - g.top) / (g.height + innerHeight * .7));
    const x = quiet ? 0 : (.5 - progress) * g.width * 1.6;
    windowEl.style.transform = quiet ? '' : `translate3d(${x}px, 0, 0)`;
    face.style.transform = quiet ? '' : `translate3d(${-x}px, 0, 0)`;
  }
}
function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule, { passive: true });
addEventListener('pageshow', schedule);
reduced.addEventListener('change', schedule);
const observer = new ResizeObserver(schedule);
if (cover) observer.observe(cover);
if (gallery) observer.observe(gallery);
document.fonts.ready.then(schedule);
schedule();
