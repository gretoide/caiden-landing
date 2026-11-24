import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import Cursor from '../../shared/ui/Cursor';
import { NAV_LOCK_ATTR } from '../../shared/lib/scrollToSkills';

/** Default: below this scroll position (px) the navbar is always shown. */
const HIDE_AFTER = 96;
/** Ignore scroll changes smaller than this (px) so the navbar does not flicker. */
const SCROLL_DELTA = 8;
/** If a mobile menu is ever added, mark it open with this attribute on <html> to keep the navbar shown. */
const MENU_OPEN_ATTR = 'data-menu-open';

type LayoutProps = {
  children: ReactNode;
  /**
   * Scroll position below which the navbar never hides: px, or 'half-screen' (50% of the viewport
   * height, measured on every scroll/resize). Defaults to HIDE_AFTER.
   */
  navHideAfter?: number | 'half-screen';
};

export default function Layout({ children, navHideAfter = HIDE_AFTER }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  // Hidden while scrolling down past HIDE_AFTER, shown again as soon as the user scrolls up.
  const [hidden, setHidden] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 50);
      const root = document.documentElement;
      const hideAfter = navHideAfter === 'half-screen' ? window.innerHeight * 0.5 : navHideAfter;
      if (y <= hideAfter || root.hasAttribute(NAV_LOCK_ATTR) || root.hasAttribute(MENU_OPEN_ATTR)) {
        setHidden(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_DELTA) return;
      setHidden(delta > 0);
      lastY = y;
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [navHideAfter]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Cursor />

      {/* Navigation — transparent gradient bar: brand + contact only */}
      <nav
        // Keyboard users tabbing into the navbar always get it back on screen.
        onFocusCapture={() => setHidden(false)}
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: reducedMotion
            ? 'none'
            : 'transform 280ms ease-out, padding 500ms ease, box-shadow 500ms ease, background-color 500ms ease',
        }}
        className={`fixed top-0 inset-x-0 z-[100] pointer-events-none will-change-transform ${
          scrolled
            ? 'py-3 md:py-4 bg-gradient-to-b from-[#0b1a33]/75 to-[#081226]/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_30px_-10px_rgba(96,165,250,0.25)]'
            : 'py-5 md:py-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          <a href="/" className="pointer-events-auto flex flex-col min-w-0">
            <span className="text-xl sm:text-2xl font-serif text-white tracking-[0.2em] uppercase leading-none">
              CMD
            </span>
            <span className="text-[7px] sm:text-[8px] text-brand-400 tracking-[0.4em] sm:tracking-[0.5em] uppercase font-sans mt-1 truncate">
              MASTER VISUAL ARTIST
            </span>
          </a>

          <a
            href="/#contact"
            className="pointer-events-auto group relative shrink-0 px-5 sm:px-6 py-2 sm:py-2.5 text-white/80 hover:text-white focus-visible:text-white text-[10px] font-sans tracking-[0.3em] uppercase transition-colors duration-500 outline-none"
          >
            {/* Soft glass + blue glow, only on hover/focus */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-brand-400/25 via-brand-400/10 to-transparent backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"
            />
            {/* Frame drawn from the centre of each side on hover/focus (no border at rest) */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand-400/70 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-400/70 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
            <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-brand-400/70 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
            <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-brand-400/70 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
            <span className="relative">Contact</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-20 bg-black text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-white/20 text-[10px] font-sans tracking-[0.5em] uppercase">
            © {new Date().getFullYear()} Caiden Mikael Dri // All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
