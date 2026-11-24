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

/**
 * While this attribute is on <html>, the navbar stays visible even when the page scrolls down
 * (it normally hides on scroll down). Used during this programmatic scroll, so the heading lands
 * right under a visible navbar.
 */
export const NAV_LOCK_ATTR = 'data-nav-lock';

export function scrollToSkills(doc: Document = document, behavior: ScrollBehavior = 'smooth', refine = true): boolean {
  const win = doc.defaultView;
  const heading = doc.querySelector('[data-skills-heading]');
  if (!win || !heading) return false;
  const root = doc.documentElement;
  root.setAttribute(NAV_LOCK_ATTR, '');
  // The navbar is fixed at the top: use its layout height, so a hide/show transform does not count.
  const nav = doc.querySelector('nav');
  const navBottom = nav ? nav.offsetHeight : 0;
  const top = Math.max(0, win.scrollY + heading.getBoundingClientRect().top - navBottom - GAP_BELOW_NAV);
  if (Math.abs(top - win.scrollY) >= 1) win.scrollTo({ top, behavior });
  if (!refine) {
    // Last pass: give the (smooth) correction time to finish, then let the navbar hide again on scroll.
    win.setTimeout(() => root.removeAttribute(NAV_LOCK_ATTR), 900);
    return true;
  }

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