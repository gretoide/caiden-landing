import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { NAV_LOCK_ATTR } from '../../shared/lib/scrollToSkills';

export type Suit = { id: string; label: string; group: string };

/** Names near the current suit read clearly; the further away, the fainter (full list on hover). */
function fadeFor(index: number, activeIndex: number) {
  const distance = Math.abs(index - activeIndex);
  if (distance <= 2) return 'text-white/55';
  if (distance <= 4) return 'text-white/30';
  return 'text-white/15';
}

/** Gap left between the navbar and a section's top when jumping to it (px). */
const LAND_GAP = 16;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The site navbar (Layout). It hides on scroll down and comes back on scroll up. */
const siteNav = () => document.querySelector<HTMLElement>('nav[data-site-nav]');

/**
 * Vertical index of suits for /gallery, fixed on the right edge so it never takes room from the
 * photos. The names hang from a rail that fills in blue as you scroll, so you always see how much is
 * behind you and how much is left; the current suit is highlighted and a click jumps to any of them.
 */
export default function SuitNav({ suits, galleryRef }: { suits: Suit[]; galleryRef: React.RefObject<HTMLElement | null> }) {
  const [active, setActive] = useState<string | null>(null);
  // Only shown while the gallery itself is on screen (not over the header or the closing section).
  const [visible, setVisible] = useState(false);
  // Suit the user just jumped to: it stays highlighted (and the navbar stays shown, so the landing
  // spot is always the same) until they scroll on their own.
  const clickedRef = useRef<string | null>(null);
  // False while the page is still scrolling towards the clicked suit.
  const arrivedRef = useRef(true);
  // Rail: a faint track from the first dot to the last, and the blue fill up to where you are.
  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef(new Map<string, HTMLSpanElement>());

  useEffect(() => {
    const forget = () => {
      if (!clickedRef.current) return;
      clickedRef.current = null;
      document.documentElement.removeAttribute(NAV_LOCK_ATTR);
    };
    window.addEventListener('wheel', forget, { passive: true });
    window.addEventListener('touchstart', forget, { passive: true });
    window.addEventListener('keydown', forget);
    window.addEventListener('hashchange', forget);
    return () => {
      window.removeEventListener('wheel', forget);
      window.removeEventListener('touchstart', forget);
      window.removeEventListener('keydown', forget);
      window.removeEventListener('hashchange', forget);
    };
  }, []);

  // Work out which suit is on screen while scrolling.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      const gallery = galleryRef.current?.getBoundingClientRect();
      setVisible(!!gallery && gallery.top < middle && gallery.bottom > middle);

      // Active suit: the last one whose top has passed the upper third of the screen. Builds side by
      // side in a grid share a top: the first of that row wins, unless one was clicked.
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      let currentTop = -Infinity;
      for (const { id } of suits) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top === undefined || top > line || Math.abs(top - currentTop) < 2) continue;
        current = id;
        currentTop = top;
      }
      // While scrolling towards a clicked suit, keep it lit (no flicking through the ones in between);
      // once there, only while it is still on screen.
      const clicked = clickedRef.current ? document.getElementById(clickedRef.current)?.getBoundingClientRect() : null;
      if (clicked && clicked.bottom > 0 && (!arrivedRef.current || clicked.top < window.innerHeight)) {
        current = clickedRef.current;
      }
      setActive(current);
      drawRail(current, line);
    };

    /** Fill the rail to the current dot, plus how far through that suit's section you are. */
    const drawRail = (current: string | null, line: number) => {
      const list = listRef.current?.getBoundingClientRect();
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!list || !track || !fill) return;
      const centers = suits.map(({ id }) => {
        const dot = dotRefs.current.get(id)?.getBoundingClientRect();
        return dot ? { x: dot.left + dot.width / 2 - list.left, y: dot.top + dot.height / 2 - list.top } : null;
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      if (!first || !last) return;
      for (const el of [track, fill]) {
        el.style.left = `${first.x - 0.5}px`;
        el.style.top = `${first.y}px`;
      }
      track.style.height = `${last.y - first.y}px`;

      const index = suits.findIndex((s) => s.id === current);
      let y = first.y;
      if (index >= 0) {
        const here = centers[index]!;
        const next = centers[index + 1];
        const section = document.getElementById(suits[index].id)?.getBoundingClientRect();
        const nextTop = suits[index + 1] ? document.getElementById(suits[index + 1].id)?.getBoundingClientRect().top : undefined;
        const end = nextTop ?? section?.bottom ?? line;
        const start = section?.top ?? line;
        const through = end > start ? Math.min(1, Math.max(0, (line - start) / (end - start))) : 0;
        y = here.y + (next ? (next.y - here.y) * through : 0);
      }
      fill.style.height = `${y - first.y}px`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
      cancelAnimationFrame(frame);
    };
  }, [suits, galleryRef]);

  /** Jump to a suit, leaving its top just under the navbar (which stays shown until the user scrolls). */
  const jumpTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    clickedRef.current = id;
    arrivedRef.current = false;
    const arrive = () => {
      arrivedRef.current = true;
    };
    window.addEventListener('scrollend', arrive, { once: true });
    window.setTimeout(arrive, 2000); // browsers without `scrollend`
    setActive(id);
    document.documentElement.setAttribute(NAV_LOCK_ATTR, '');
    const navHeight = siteNav()?.offsetHeight ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - navHeight - LAND_GAP;
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion() ? 'instant' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  const activeIndex = Math.max(0, suits.findIndex((s) => s.id === active));
  const groups = suits.reduce<{ name: string; items: Suit[] }[]>((list, suit) => {
    const last = list[list.length - 1];
    if (last?.name === suit.group) last.items.push(suit);
    else list.push({ name: suit.group, items: [suit] });
    return list;
  }, []);

  const backToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    clickedRef.current = null;
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'instant' : 'smooth' });
    history.replaceState(null, '', window.location.pathname);
  };

  return (
    <nav
      aria-label="Suits"
      // Desktop/tablet only: on phones it covers the photos.
      className={`group hidden md:block fixed right-0 top-1/2 z-[90] -translate-y-1/2 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Soft shade so the names read over any photo; darker glass on hover. Both fade out on every
          side but the screen edge, so there is no visible box. */}
      <span
        aria-hidden
        className="absolute -inset-y-10 -left-10 right-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent mask-y-from-75% mask-y-to-100%"
      />
      <span
        aria-hidden
        className="absolute -inset-y-10 -left-16 right-0 bg-gradient-to-l from-[#081226]/90 via-[#081226]/60 to-transparent backdrop-blur-md mask-y-from-75% mask-y-to-100% mask-l-from-50% mask-l-to-100% opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <div ref={listRef} className="relative flex flex-col items-end py-3 pl-6 pr-4">
        {/* The rail behind the dots: faint track + blue fill (placed from the dots' positions) */}
        <span ref={trackRef} aria-hidden className="absolute w-px bg-white/15" />
        <span
          ref={fillRef}
          aria-hidden
          className="absolute w-px bg-brand-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-[height] duration-300 ease-out"
        />
        {groups.map(({ name, items }) => {
          const isCurrentGroup = items.some((s) => s.id === active);
          return (
            <div key={name} className="flex flex-col items-end mt-2 first-of-type:mt-0">
              {/* Section title; skipped when the group is a single entry (it would repeat its name). */}
              {items.length > 1 && (
                <span
                  className={`mb-0.5 mr-[1.125rem] font-sans text-[9px] font-bold uppercase tracking-[0.4em] transition-colors duration-300 ${
                    isCurrentGroup ? 'text-brand-400' : 'text-brand-400/40 group-hover:text-brand-400/80'
                  }`}
                >
                  {name}
                </span>
              )}
              <ul className="flex flex-col items-end">
                {items.map((suit) => {
                  const index = suits.indexOf(suit);
                  const isActive = suit.id === active;
                  const isPassed = active !== null && index < activeIndex;
                  return (
                    <li key={suit.id}>
                      <a
                        href={`#${suit.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        onClick={(e) => jumpTo(e, suit.id)}
                        className="flex items-center justify-end gap-3 py-1 outline-none"
                      >
                        {/* Bright near where you are, fading with distance; all readable on hover. */}
                        <span
                          className={`whitespace-nowrap font-sans uppercase tracking-[0.25em] [text-shadow:0_1px_6px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:text-white ${
                            isActive ? 'text-[11px] text-white font-bold' : `text-[10px] ${fadeFor(index, activeIndex)} group-hover:text-white/70`
                          }`}
                        >
                          {suit.label}
                        </span>
                        {/* Dot on the rail: passed ones blue, the current one bigger and glowing */}
                        <span aria-hidden className="relative z-10 flex size-1.5 shrink-0 items-center justify-center">
                          <span
                            ref={(el) => {
                              if (el) dotRefs.current.set(suit.id, el);
                              else dotRefs.current.delete(suit.id);
                            }}
                            className={`rounded-full transition-all duration-300 ${
                              isActive
                                ? 'size-2.5 bg-brand-400 ring-4 ring-brand-400/20 shadow-[0_0_10px_rgba(96,165,250,0.9)]'
                                : isPassed
                                  ? 'size-1.5 bg-brand-400/80'
                                  : 'size-1.5 bg-white/30'
                            }`}
                          />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* Way out of the long scroll */}
        <a
          href="#"
          onClick={backToTop}
          className="mt-4 flex items-center gap-2 py-1 font-sans text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors outline-none focus-visible:text-white"
        >
          <ArrowUp size={12} aria-hidden /> Top
        </a>
      </div>
    </nav>
  );
}
