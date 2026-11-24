/**
 * Puts the Skills section in its "home" position: the "Expertise / Skills" heading right under the
 * fixed navbar, with the slides strip below it. Works on another same-origin window too (the
 * element's own window is used), e.g. the landing tab opened from /gallery.
 *
 * The navbar gets shorter once the page is scrolled (animated ~500ms), so after the scroll settles
 * we measure again and nudge the position so the heading still sits right under it.
 */
const GAP_BELOW_NAV = 16;

/**
 * Message the /gallery tab posts to the landing tab that opened it. The landing does the scroll
 * itself (in its own window), so it still finishes after the gallery tab is closed.
 */
export const SCROLL_TO_SKILLS_MESSAGE = 'caiden:scroll-to-skills';

export function scrollToSkills(doc: Document = document, behavior: ScrollBehavior = 'smooth', refine = true): boolean {
  const win = doc.defaultView;
  const heading = doc.querySelector('[data-skills-heading]');
  if (!win || !heading) return false;
  const nav = doc.querySelector('nav');
  const navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
  const top = Math.max(0, win.scrollY + heading.getBoundingClientRect().top - navBottom - GAP_BELOW_NAV);
  if (Math.abs(top - win.scrollY) >= 1) win.scrollTo({ top, behavior });
  if (!refine) return true;

  let done = false;
  const settle = () => {
    if (done) return;
    done = true;
    win.removeEventListener('scrollend', settle);
    win.setTimeout(() => scrollToSkills(doc, behavior, false), 600);
  };
  win.addEventListener('scrollend', settle, { once: true });
  win.setTimeout(settle, 1500); // browsers without `scrollend`, or no scroll was needed
  return true;
}