import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from '../../shared/ui/Image';

type Props = {
  /** Public ids shown as mini thumbnails while collapsed (first 4 on mobile, 5 from sm up). */
  previewIds: readonly string[];
  /** Total number of photos inside the gallery (used for the "+N" badge and the label). */
  count: number;
  /** Tailwind text color class for the suit accent (e.g. `text-red-500`). */
  accentClassName?: string;
  defaultOpen?: boolean;
  /** Notified after every open/close so the section can (re)build its GSAP item animations. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
};

const MOBILE_THUMBS = 4;
const DESKTOP_THUMBS = 5;

export default function CollapsibleGallery({
  previewIds,
  count,
  accentClassName = 'text-brand-400',
  defaultOpen = false,
  onOpenChange,
  children,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentId = useId();
  // `mounted` puts the children in the DOM; `open` drives the 0fr → 1fr transition one frame later.
  const [mounted, setMounted] = useState(defaultOpen);
  const [open, setOpen] = useState(defaultOpen);

  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  useEffect(() => {
    onOpenChangeRef.current?.(open);
  }, [open]);

  // Scroll position to keep while expanding, so the gallery opens downward without moving the view.
  const keepScrollRef = useRef<number | null>(null);

  const holdScroll = () => {
    const saved = keepScrollRef.current;
    if (saved !== null && Math.abs(window.scrollY - saved) > 1) {
      window.scrollTo({ top: saved, behavior: 'instant' });
    }
  };

  const expand = () => {
    keepScrollRef.current = window.scrollY;
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  };

  // Guard against anything (scroll anchoring, ScrollTrigger) moving the page while the expand animates.
  useEffect(() => {
    if (!open || keepScrollRef.current === null) return;
    let frame = 0;
    const tick = () => {
      holdScroll();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const stop = window.setTimeout(() => cancelAnimationFrame(frame), 900);
    // Releases the hold as soon as the user scrolls on purpose.
    const release = () => { cancelAnimationFrame(frame); keepScrollRef.current = null; };
    window.addEventListener('wheel', release, { passive: true, once: true });
    window.addEventListener('touchmove', release, { passive: true, once: true });
    window.addEventListener('keydown', release, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(stop);
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchmove', release);
      window.removeEventListener('keydown', release);
    };
  }, [open]);

  // Resolves when the smooth scroll back to the header has settled (scrollend, with a fallback timeout).
  const scrollSettledRef = useRef<Promise<void> | null>(null);

  const collapse = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Blur first: the content becomes `inert` and must not keep focus.
    e.currentTarget.blur();
    keepScrollRef.current = null;
    setOpen(false);
    const root = rootRef.current;
    const section = root?.closest('section');
    if (!root || !section) return;
    // Focus the first photo of the suit that stays visible once collapsed (e.g. the Elden Ring banner);
    // when every photo lives inside the gallery, focus the preview card (its first thumbnails).
    const firstImage = Array.from(section.querySelectorAll<HTMLElement>('[data-zoom-src]')).find(
      (el) => !root.contains(el)
    );
    const target = firstImage ?? root;
    scrollSettledRef.current = new Promise<void>((resolve) => {
      const done = () => {
        window.removeEventListener('scrollend', done);
        resolve();
      };
      window.addEventListener('scrollend', done, { once: true });
      window.setTimeout(done, 1500);
    });
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    // ScrollTrigger.refresh() restores the scroll position, which would cancel an in-flight smooth scroll.
    const pending = scrollSettledRef.current;
    if (pending) {
      scrollSettledRef.current = null;
      pending.then(() => ScrollTrigger.refresh());
    } else {
      ScrollTrigger.refresh();
      holdScroll();
      keepScrollRef.current = null;
    }
  };

  const mobileThumbs = previewIds.slice(0, MOBILE_THUMBS);
  const desktopThumbs = previewIds.slice(0, DESKTOP_THUMBS);
  const mobileRest = count - mobileThumbs.length;
  const desktopRest = count - desktopThumbs.length;

  return (
    <div ref={rootRef} className="relative [overflow-anchor:none]">
      {/* Collapsed preview card */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? 'grid-rows-[0fr] opacity-0 pointer-events-none' : 'grid-rows-[1fr] opacity-100'
        }`}
        aria-hidden={open}
      >
        <div className="min-h-0 overflow-hidden">
          <button
            type="button"
            onClick={expand}
            aria-expanded={open}
            aria-controls={contentId}
            tabIndex={open ? -1 : 0}
            className="group w-full text-left bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-colors duration-300 p-3 md:p-4 flex flex-col lg:flex-row lg:items-center gap-3 md:gap-4 lg:gap-6"
          >
            <div className="flex gap-1.5 md:gap-2 min-w-0">
              {desktopThumbs.map((id, i) => {
                const hiddenOnMobile = i >= MOBILE_THUMBS;
                const lastMobile = i === mobileThumbs.length - 1;
                const lastDesktop = i === desktopThumbs.length - 1;
                return (
                  <div
                    key={id}
                    // Fixed thumb size (4 per row on mobile) so suits with fewer photos don't leave empty slots.
                    className={`group/thumb relative isolate shrink-0 aspect-square w-[calc((100%-1.125rem)/4)] sm:w-24 md:w-28 lg:w-28 xl:w-32 overflow-hidden bg-black ${hiddenOnMobile ? 'hidden sm:block' : ''}`}
                  >
                    <Image
                      publicId={id}
                      alt=""
                      variant="thumb"
                      sizes="(min-width: 640px) 12vw, 22vw"
                      className="w-full h-full"
                      imgClassName="object-cover grayscale-[40%] group-hover:grayscale-[15%] group-hover/thumb:grayscale-0 group-hover/thumb:scale-[1.06]"
                    />
                    {/* Frame drawn above the image so its edge stays crisp while the photo zooms underneath */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10 group-hover/thumb:ring-white/45 transition-[box-shadow] duration-300"
                    />
                    {lastMobile && mobileRest > 0 && (
                      <span className="sm:hidden absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-bold tracking-wider">
                        +{mobileRest}
                      </span>
                    )}
                    {lastDesktop && desktopRest > 0 && (
                      <span className="hidden sm:flex absolute inset-0 items-center justify-center bg-black/60 text-white text-base font-bold tracking-wider">
                        +{desktopRest}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <span
              className={`shrink-0 lg:ml-auto flex items-center justify-center gap-2 border border-current/40 px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.25em] bg-black/40 group-hover:bg-black/60 transition-colors ${accentClassName}`}
            >
              View full gallery
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">▾</span>
            </span>
          </button>
        </div>
      </div>

      {/* Expanded content */}
      <div
        id={contentId}
        className={`grid [overflow-anchor:none] transition-[grid-template-rows] duration-700 ease-in-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          {mounted && children}
          <div className="flex justify-center pt-6 md:pt-8">
            <button
              type="button"
              onClick={collapse}
              aria-expanded={open}
              aria-controls={contentId}
              className={`flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-colors px-5 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.25em] ${accentClassName}`}
            >
              Collapse <span aria-hidden>▴</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
