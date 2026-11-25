import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from '../../shared/ui/Image';
import { HERO_BG } from './data/images';

gsap.registerPlugin(ScrollTrigger);

/** A word split into letters so each one can rise in on its own. */
function Letters({ word }: { word: string }) {
  return (
    <>
      {Array.from(word).map((letter, i) => (
        <span key={i} aria-hidden className="hero-letter inline-block">
          {letter}
        </span>
      ))}
    </>
  );
}

/**
 * Same composition as always, now in motion: cinematic intro (photo settles, name rises letter by
 * letter), a slow breathing zoom and a scroll parallax on the way out.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // One transform per layer, so the effects never fight each other: scroll > zoom.
  const bgScrollRef = useRef<HTMLDivElement>(null);
  const bgZoomRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Intro: the photo settles from a close-up while the name rises letter by letter.
      gsap.fromTo(bgZoomRef.current, { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4, ease: 'power3.out' });
      gsap.from('.hero-letter', {
        yPercent: 60,
        opacity: 0,
        filter: 'blur(14px)',
        duration: 1.3,
        stagger: 0.08,
        delay: 0.25,
        ease: 'power4.out',
        clearProps: 'filter',
      });
      // Then it keeps breathing, so the cover never feels static.
      gsap.to(bgZoomRef.current, { scale: 1.08, duration: 9, delay: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      // On the way out: the photo lags behind and the text lifts and fades.
      const scrollTrigger = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(bgScrollRef.current, { yPercent: 18, ease: 'none', scrollTrigger });
      gsap.to(contentScrollRef.current, { yPercent: -25, opacity: 0, ease: 'none', scrollTrigger: { ...scrollTrigger, end: '70% top' } });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <div ref={bgScrollRef} className="absolute inset-0">
            <div ref={bgZoomRef} className="absolute inset-0">
              <Image
                publicId={HERO_BG}
                alt="Hero background"
                variant="hero"
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0"
                imgClassName="w-full h-full object-cover opacity-60 scale-110 md:object-[center_35%]"
                sizes="100vw"
              />
            </div>
        </div>
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        {/* Main transition to black at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        {/* Extra bottom vignette for seamless cut */}
        <div className="absolute -bottom-1 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div ref={contentScrollRef} className="relative z-10">
        <div className="text-center px-6 max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center w-full mb-8 translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
            <span className="text-brand-400 font-sans text-[10px] md:text-xs tracking-[0.6em] -mr-[0.6em] uppercase font-bold text-center">― Asset Crafter ―</span>
          </div>

          <h1 aria-label="Caiden Dri" className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif text-white tracking-widest leading-[0.85] mb-4 md:mb-8 italic">
            <Letters word="CAIDEN" />{' '}
            <span className="text-white/60 md:text-white/30 block md:inline">
              <Letters word="DRI" />
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12 translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.9s_forwards]">
            <h2 className="text-sm md:text-xl font-sans tracking-[0.5em] -mr-[0.5em] text-white uppercase font-light">
              PROFESSIONAL <span className="font-bold text-brand-400">PROPMAKER</span>
            </h2>
            <span className="hidden md:block text-brand-400/80 font-sans text-sm tracking-widest font-bold">//</span>
            <h2 className="text-sm md:text-xl font-sans tracking-[0.5em] -mr-[0.5em] text-white uppercase font-light">
              REALITY <span className="font-bold text-brand-400">SCULPTOR</span>
            </h2>
          </div>

          <p className="max-w-xl text-xs md:text-sm font-sans text-white/40 leading-loose tracking-[0.2em] uppercase text-center translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_1.1s_forwards]">
            Bridging the gap between design vision and physical reality through a decade of mastery in cross-disciplinary fabrication.
          </p>
        </div>
      </div>
    </section>
  );
}
