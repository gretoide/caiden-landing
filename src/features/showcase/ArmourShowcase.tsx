import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { cloudinaryUrl } from '../../shared/lib/cloudinary';
import { scrollToSkills } from '../../shared/lib/scrollToSkills';
import { eldenRingData } from './data/eldenRing';
import { diabloIVData } from './data/diabloIV';
import { skyrimData } from './data/skyrim';
import { chainsawManData } from './data/chainsawMan';
import { hipoData } from './data/hipo';
import { attackOnTitanData } from './data/attackOnTitan';
import { gojoData } from './data/gojo';
import { hippolytaData } from './data/hippolyta';
import { leonData } from './data/leon';
import { neroData } from './data/nero';
import { spyFamilyData } from './data/spyFamily';
import { starWarsData } from './data/starWars';
import { compactBuilds, propBuilds } from './data/compactBuilds';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_HREF = '/gallery';
/** Touch screens (no hover): each tile of the wall changes photo about this often. */
const TILE_MS = 24000;
const PARALLAX_PX = 60;

type Photo = { id: string; project: string };

// Photos the wall rotates through: the studio builds, Elden Ring to Chainsaw Man (MAPPA).
const PROJECTS = [
  { project: 'Elden Ring', ids: eldenRingData.gallery },
  { project: 'Diablo IV', ids: diabloIVData.gallery },
  { project: 'Skyrim', ids: skyrimData.gallery },
  { project: 'Chainsaw Man', ids: chainsawManData.gallery },
];

// The counter covers everything on /gallery, including builds the wall does not show.
const ALL_BUILDS = [
  eldenRingData,
  diabloIVData,
  skyrimData,
  chainsawManData,
  hipoData,
  attackOnTitanData,
  gojoData,
  hippolytaData,
  leonData,
  neroData,
  spyFamilyData,
  starWarsData,
];
// Cards at the end of /gallery. The extra Skyrim pieces belong to the Skyrim build, so they only add photos.
const CARDS = [...compactBuilds, ...propBuilds];
const TOTAL_BUILDS = ALL_BUILDS.length + CARDS.filter((card) => !card.id.startsWith('skyrim-')).length;
const TOTAL_PHOTOS = [...ALL_BUILDS, ...CARDS].reduce((total, build) => total + build.gallery.length, 0);

// Spread every project evenly along the list, so neighbouring tiles come from different builds.
const PHOTOS: Photo[] = PROJECTS.flatMap(({ project, ids }, p) =>
  ids.map((id, i) => ({ id, project, at: (i + 0.5) / ids.length + p * 0.001 }))
)
  .sort((a, b) => a.at - b.at)
  .map(({ id, project }) => ({ id, project }));

const photoUrl = (id: string) => cloudinaryUrl(id, { variant: 'thumb', width: 768 });

// Vertical stagger of each column (always negative, so the parallax never uncovers the top).
const STAGGER = ['-mt-20', '-mt-44', '-mt-28', '-mt-48', '-mt-24'];

function columnsFor(width: number) {
  if (width >= 1024) return 5;
  return width >= 640 ? 3 : 2;
}

function useColumnCount() {
  const [count, setCount] = useState(() => (typeof window === 'undefined' ? 5 : columnsFor(window.innerWidth)));
  useEffect(() => {
    const update = () => setCount(columnsFor(window.innerWidth));
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
}

/** One frame of the wall: when its photo changes, the new one slides up and pushes the old one out. */
function Tile({ photo, duration, onHover }: { photo: Photo; duration: number; onHover?: () => void }) {
  const [layers, setLayers] = useState<{ current: Photo; previous: Photo | null }>({ current: photo, previous: null });
  if (layers.current.id !== photo.id) setLayers({ current: photo, previous: layers.current });
  const currentRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!layers.previous) return;
    const tweens = [
      gsap.fromTo(currentRef.current, { yPercent: 100 }, { yPercent: 0, duration, ease: 'power3.inOut' }),
      gsap.fromTo(previousRef.current, { yPercent: 0 }, { yPercent: -100, duration, ease: 'power3.inOut' }),
    ];
    return () => tweens.forEach((t) => t.progress(1).kill());
  }, [layers, duration]);

  const visible = layers.previous ? [layers.previous, layers.current] : [layers.current];

  return (
    <div
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') onHover?.();
      }}
      className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a]"
    >
      {visible.map((layer) => (
        <div key={layer.id} ref={layer.id === layers.current.id ? currentRef : previousRef} className="absolute inset-0">
          <img
            src={photoUrl(layer.id)}
            alt={`${layer.project} build`}
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover brightness-[0.85] saturate-[0.9] group-hover/col:brightness-125 group-hover/col:saturate-100 group-hover/col:scale-[1.04] transition-[filter,transform] duration-700 ease-out"
          />
          <span className="absolute left-3 bottom-3 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-white/70">
            {layer.project}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Staggered columns of photos. A tile swaps to a photo that is not on screen when the mouse passes
 * over it; without a mouse, one tile at a time swaps on a timer.
 */
function PhotoWall({
  columns,
  running,
  hoverSwap,
  columnRefs,
}: {
  columns: number;
  running: boolean;
  hoverSwap: boolean;
  columnRefs: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  // Fewer columns means smaller tiles, so more rows are needed to fill the height.
  const rows = columns === 5 ? 3 : 4;
  const tiles = columns * rows;
  const [shown, setShown] = useState(() => Array.from({ length: tiles }, (_, i) => i % PHOTOS.length));
  const shownRef = useRef(shown);
  const queueRef = useRef(PHOTOS.map((_, i) => i).filter((i) => !shown.includes(i)));
  const stepRef = useRef(0);
  /** Tiles waiting for their next photo to load. */
  const pendingRef = useRef(new Set<number>());

  const swap = useCallback((tile: number) => {
    if (pendingRef.current.has(tile)) return;
    const next = queueRef.current.shift();
    if (next === undefined) return;
    pendingRef.current.add(tile);
    // Preload first: the tile only changes once the new photo can be painted.
    const loader = new window.Image();
    loader.onload = () => {
      pendingRef.current.delete(tile);
      const updated = [...shownRef.current];
      queueRef.current.push(updated[tile]);
      updated[tile] = next;
      shownRef.current = updated;
      setShown(updated);
    };
    loader.onerror = () => {
      pendingRef.current.delete(tile);
      queueRef.current.push(next);
    };
    loader.src = photoUrl(PHOTOS[next].id);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // Walk the tiles with a stride so consecutive changes happen in different columns.
      swap((stepRef.current++ * (rows + 1)) % tiles);
    }, TILE_MS / tiles);
    return () => window.clearInterval(timer);
  }, [running, rows, tiles, swap]);

  return (
    <div className="absolute inset-0 flex items-start gap-2 md:gap-3 px-2 md:px-3">
      {Array.from({ length: columns }, (_, col) => (
        <div key={col} className={`group/col flex-1 min-w-0 ${STAGGER[col]}`}>
          <div
            ref={(el) => {
              columnRefs.current[col] = el;
            }}
            className="flex flex-col gap-2 md:gap-3 will-change-transform"
          >
            {Array.from({ length: rows }, (_, row) => (
              <Tile
                key={row}
                photo={PHOTOS[shown[col * rows + row]]}
                duration={hoverSwap ? 0.7 : 1.6}
                onHover={hoverSwap ? () => swap(col * rows + row) : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Opening the gallery (new tab) also moves this tab to Skills, so closing the gallery lands the visitor
 * on the next section instead of back here. Modified clicks (background tab) are left alone.
 */
function leaveLandingAtSkills(e: React.MouseEvent<HTMLAnchorElement>) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  // Let the browser open the new tab first, then jump (unseen, the visitor is on the gallery tab).
  window.setTimeout(() => scrollToSkills(document, 'instant'), 50);
}

/**
 * Landing "Portfolio" section: a wall of staggered photo columns (parallax with the mouse), a huge
 * title and a call to action. The whole section opens /gallery in a new tab.
 */
export default function ArmourShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columns = useColumnCount();
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [mouseEffects] = useState(
    () => typeof window !== 'undefined' && !reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  // `near` loads the photos shortly before they are needed; `inView` runs the rotation.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '800px' }
    );
    const viewObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    nearObserver.observe(el);
    viewObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  // Mouse: columns drift up and down in alternating directions.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !mouseEffects || !near) return;
    const drift = columnRefs.current
      .slice(0, columns)
      .map((el) => (el ? gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }) : null));
    const move = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const ratio = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      drift.forEach((to, i) => to?.(ratio * PARALLAX_PX * (i % 2 === 0 ? -1 : 1)));
    };
    const leave = () => drift.forEach((to) => to?.(0));
    section.addEventListener('pointermove', move, { passive: true });
    section.addEventListener('pointerleave', leave);
    return () => {
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', leave);
    };
  }, [columns, mouseEffects, near]);

  // Content reveal when the section scrolls into view.
  useGSAP(() => {
    gsap.from('.portfolio-reveal', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-[90vh] min-h-[36rem] overflow-hidden bg-black">
      {/* The whole section is the link */}
      <a
        href={GALLERY_HREF}
        target="_blank"
        // `opener` (not noopener): the gallery tab uses window.opener to scroll this tab and close itself.
        rel="opener"
        onClick={leaveLandingAtSkills}
        aria-label="View the full gallery (opens in a new tab)"
        className="group absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400"
      >
        {near && <PhotoWall key={columns} columns={columns} running={inView && !reducedMotion && !mouseEffects} hoverSwap={mouseEffects} columnRefs={columnRefs} />}

        {/* Dark spot behind the text, and fades to black into the hero above and Skills below */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.5)_32%,transparent_62%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <h2 className="portfolio-reveal text-[12.5vw] sm:text-[11vw] lg:text-[10vw] font-serif uppercase text-white tracking-[0.04em] leading-none whitespace-nowrap drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
            The Gallery
          </h2>
          <p className="portfolio-reveal mt-4 md:mt-6 text-white/80 font-sans text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] leading-relaxed">
            {TOTAL_BUILDS} builds · {TOTAL_PHOTOS} photos
          </p>

          {/* Site button style (glass + blue frame on hover) with a pulsing glow */}
          <span
            className="portfolio-reveal relative mt-8 md:mt-10 inline-flex items-center gap-3 px-8 md:px-14 py-4 md:py-5 bg-black/60 backdrop-blur-md text-white text-xs md:text-sm font-sans font-bold uppercase tracking-[0.35em] whitespace-nowrap"
          >
            <span aria-hidden className="absolute -inset-3 bg-brand-400/25 blur-2xl animate-pulse pointer-events-none" />
            <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/40 group-hover:ring-white/20 transition-[box-shadow] duration-300" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-400/40 via-brand-400/15 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand-400 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-400 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
            <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-brand-400 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
            <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-brand-400 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
            <span className="relative">View full portfolio</span>
            <ArrowUpRight size={18} aria-hidden className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </section>
  );
}
