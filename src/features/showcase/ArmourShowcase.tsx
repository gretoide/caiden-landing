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

/** One preview photo per suit. Only the CTA links to the full gallery. */
const ARMOURS = [
  // Short label so it fits the card on one line, matching the format of the other suits.
  { id: 'elden-ring', client: eldenRingData.title, subtitle: 'Elden Ring // 2024', accent: eldenRingData.subtitleClassName, cover: 'elden_ring_6_k5z39c' },
  { id: 'diablo-iv', client: diabloIVData.title, subtitle: diabloIVData.subtitle, accent: diabloIVData.subtitleClassName, cover: 'diablo_iv_5_k4ddrg' },
  { id: 'skyrim', client: skyrimData.title, subtitle: skyrimData.subtitle, accent: skyrimData.subtitleClassName, cover: 'skyrim_7_yqhwyx' },
];

/**
 * Landing "Work" section: a featured Elden Ring photo, one preview per armour and a link to the
 * full gallery page. The long per-suit layouts live in /gallery.
 */
export default function ArmourShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.armour-reveal', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-black border-t border-white/5 overflow-hidden py-20 md:py-32">
      <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-red-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="armour-reveal mb-10 md:mb-14 flex flex-col gap-4 max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-brand-400/80" />
            <span className="text-brand-400 font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">Featured work</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-serif text-white tracking-wide leading-none">Armour</h2>
          <p className="text-white/50 font-sans leading-relaxed max-w-xl">
            Full-scale armour and costume builds for studios and campaigns, from concept to camera-ready.
          </p>
        </div>

        {/* Featured: Elden Ring */}
        <div
          data-zoom-src={eldenRingData.gallery[0]}
          className="armour-reveal group relative block w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-video overflow-hidden border border-[#4a0a0a]/50 bg-[#250707] shadow-2xl"
        >
          <Image
            publicId={eldenRingData.gallery[0]}
            alt="Elden Ring armour by Caiden Dri"
            variant="full"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            imgClassName="object-cover md:object-[center_35%] grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-[transform,filter] duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
            <div className="max-w-xl">
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-none drop-shadow-2xl">{eldenRingData.title}</h3>
              <p className={`mt-3 text-sm md:text-lg font-sans font-bold uppercase tracking-[0.2em] ${eldenRingData.subtitleClassName}`}>
                {eldenRingData.subtitle}
              </p>
              <p className="mt-4 text-white/70 font-sans text-sm md:text-base leading-relaxed border-l-2 border-red-500 pl-4">
                {eldenRingData.description}
              </p>
            </div>
          </div>
        </div>

        {/* One preview per armour */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
          {ARMOURS.map((armour) => (
            <div
              key={armour.id}
              className="armour-reveal group bg-white/[0.03] backdrop-blur-md border border-white/10"
            >
              <div data-zoom-src={armour.cover} className="relative isolate aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-black">
                <Image
                  publicId={armour.cover}
                  alt={`${armour.subtitle} armour`}
                  variant="thumb"
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  imgClassName="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-[1.05] transition-[transform,filter] duration-700 ease-out"
                />
                <span aria-hidden className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10 group-hover:ring-white/40 transition-[box-shadow] duration-300" />
              </div>
              <div className="flex items-center justify-between gap-3 p-4 md:p-5">
                <div className="min-w-0">
                  <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight truncate">{armour.client}</h3>
                  <p className={`mt-1 text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.25em] truncate ${armour.accent}`}>
                    {armour.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="armour-reveal flex justify-center mt-12 md:mt-16">
          <a
            href={GALLERY_HREF}
            target="_blank"
            // `opener` (not noopener): the gallery tab uses window.opener to scroll this tab and close itself.
            rel="opener"
            className="group relative inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-white/[0.03] backdrop-blur-md text-white text-xs md:text-sm font-sans font-bold uppercase tracking-[0.35em] outline-none"
          >
            <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-400/25 via-brand-400/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />
            <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/15 group-hover:ring-transparent transition-[box-shadow] duration-300" />
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand-400/80 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-400/80 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
            <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-brand-400/80 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
            <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-brand-400/80 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
            <span className="relative">View all armours</span>
            <ArrowUpRight size={18} aria-hidden className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
