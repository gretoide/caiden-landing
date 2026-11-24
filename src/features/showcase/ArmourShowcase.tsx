import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Image from '../../shared/ui/Image';
import { eldenRingData } from './data/eldenRing';
import { diabloIVData } from './data/diabloIV';
import { skyrimData } from './data/skyrim';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_HREF = '/gallery';

// Side column: one photo strip per armour (people look, they don't read).
const STRIPS = [
  { id: 'elden_ring_6_k5z39c', alt: eldenRingData.subtitle, position: 'object-[center_25%]' },
  { id: 'diablo_iv_5_k4ddrg', alt: diabloIVData.subtitle, position: 'object-[center_20%]' },
  { id: 'skyrim_6_b9efrf', alt: skyrimData.subtitle, position: 'object-[center_25%]' },
];

/** Blue frame drawn from the centre of each side on hover/focus (same effect as the navbar Contact). */
function HoverFrame() {
  return (
    <>
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand-400/80 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-400/80 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
      <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-brand-400/80 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
      <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-brand-400/80 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
    </>
  );
}

/**
 * "Explore the gallery" pill. Visual only: the whole featured photo is the link (hover = the photo's).
 * No position/display class here: callers pass them (`relative`/`absolute`, `inline-flex`/`hidden`),
 * since two of the same kind clash and the one later in the CSS wins.
 */
function ExploreCta({ className = '' }: { className?: string }) {
  return (
    <span className={`items-center justify-center gap-3 px-5 md:px-6 py-3.5 md:py-4 bg-black/50 backdrop-blur-md text-white text-[11px] md:text-xs font-sans font-bold uppercase tracking-[0.3em] whitespace-nowrap ${className}`}>
      {/* Pulsing glow that draws the eye to the button */}
      <span aria-hidden className="absolute -inset-2 bg-brand-400/20 blur-xl animate-pulse pointer-events-none" />
      <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/25 group-hover:ring-transparent transition-[box-shadow] duration-300" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-400/30 via-brand-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <HoverFrame />
      <span className="relative">Explore the gallery</span>
      <ArrowUpRight size={16} aria-hidden className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  );
}

/**
 * Landing "Work" section: the Elden Ring photo plus a side column describing the full gallery, both
 * opening /gallery in a new tab. The warrior points right, towards the column.
 */
export default function ArmourShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.armour-reveal', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Slow push-in while the photo scrolls into view (no colour filters: the photo shows as shot).
    gsap.fromTo(
      photoRef.current,
      { scale: 1.08 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: photoRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 0.6,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-black overflow-hidden py-20 md:py-32">
      {/* Starts pure black so it blends with the end of the hero, then a faint red tint */}
      <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-transparent via-red-900/10 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <div className="armour-reveal mb-10 md:mb-14 flex flex-col gap-4 max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-brand-400/80" />
            <span className="text-brand-400 font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">Featured work</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-serif text-white tracking-wide leading-none">Armour</h2>
        </div>

        <a
          href={GALLERY_HREF}
          target="_blank"
          // `opener` (not noopener): the gallery tab uses window.opener to scroll this tab and close itself.
          rel="opener"
          aria-label="Explore the full armour gallery (opens in a new tab)"
          className="armour-reveal group grid lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] gap-2 lg:gap-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          {/* Photo (2/3 of the width, rule of thirds) with a caption bottom-left */}
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden border border-[#4a0a0a]/50 bg-black shadow-2xl">
            <div ref={photoRef} className="absolute inset-0 will-change-transform">
              <Image
                publicId={eldenRingData.gallery[0]}
                alt="Elden Ring armour by Caiden Dri"
                variant="full"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                imgClassName="object-cover object-[30%_center] lg:object-[100%_35%]"
              />
            </div>
            {/* Short caption in the magazine style: serif title + red tracked line */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute left-0 bottom-0 p-5 sm:p-8 lg:p-10">
              <span className="text-white/50 font-sans text-[10px] tracking-[0.4em] uppercase font-bold">Featured build</span>
              <h3 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-none drop-shadow-2xl">Elden Ring</h3>
              <p className="mt-3 text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-red-500">Bandai Namco // 2024</p>
            </div>
          </div>

          {/* Side column: a stack of photo strips, one per armour. The title sits on the first one and
              the button on the last; on desktop the strips share the photo's height. */}
          <div className="grid grid-rows-3 gap-2 lg:gap-3">
            {STRIPS.map((strip, i) => {
              const isFirst = i === 0;
              const isLast = i === STRIPS.length - 1;
              return (
                <div
                  key={strip.id}
                  className="relative isolate aspect-[16/7] lg:aspect-auto overflow-hidden border border-white/10 group-hover:border-white/25 bg-black transition-colors duration-300"
                >
                  <Image
                    publicId={strip.id}
                    alt={strip.alt}
                    variant="thumb"
                    fill
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    imgClassName={`object-cover ${strip.position} group-hover:scale-[1.05] transition-transform duration-700 ease-out ${['delay-0', 'delay-75', 'delay-150'][i]}`}
                  />
                  {isFirst && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/20 pointer-events-none" />
                      <div className="absolute inset-0 p-4 sm:p-5 lg:p-6 flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-[1px] bg-brand-400/80" />
                          <span className="text-brand-400 font-sans text-[10px] tracking-[0.4em] uppercase font-bold">Full gallery</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight drop-shadow-lg">Every build, up close</h3>
                        <p className="text-white/70 font-sans text-xs md:text-sm leading-relaxed">Full armour sets and the craft behind them.</p>
                      </div>
                    </>
                  )}
                  {isLast && (
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                        <ExploreCta className="relative inline-flex w-full" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </a>
      </div>
    </section>
  );
}
