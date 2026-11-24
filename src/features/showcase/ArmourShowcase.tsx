import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Image from '../../shared/ui/Image';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_HREF = '/gallery';
const SLIDE_MS = 5000;

// Background photos, in order. Starts with cool colours to contrast with the red hero above.
const SLIDES = [
  { id: 'skyrim_6_b9efrf', alt: 'Skyrim Daedric armour', position: 'object-[center_30%]', desktopFrame: 'lg:left-[30%]' },
  { id: 'diablo_iv_5_k4ddrg', alt: 'Diablo IV armour', position: 'object-[center_25%]', desktopFrame: 'lg:left-[30%]' },
  { id: 'skyrim_7_yqhwyx', alt: 'Skyrim Daedric armour detail', position: 'object-[center_30%]', desktopFrame: 'lg:left-[30%]' },
  { id: 'elden_ring_9_gccxgg', alt: 'Elden Ring armour', position: 'object-[center_30%] lg:object-[center_0%]', desktopFrame: 'lg:left-[33.25%] lg:-right-[3.25%]' },
];

/**
 * Opening the gallery (new tab) also moves this tab to Skills, so closing the gallery lands the visitor
 * on the next section instead of back on the banner. Modified clicks (background tab) are left alone.
 */
function leaveLandingAtSkills(e: React.MouseEvent<HTMLAnchorElement>) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  // Let the browser open the new tab first, then jump (unseen, the visitor is on the gallery tab).
  window.setTimeout(() => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, 50);
}

/**
 * Landing "Portfolio" banner, below the hero and styled like it (but quieter): rotating background
 * photos, a left-aligned serif title and a "View full gallery" button. The whole banner opens /gallery
 * in a new tab.
 */
export default function ArmourShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  // Outer layer: clipped by the diagonal curtain. Inner layer: the photo (zoom / dim).
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const activeRef = useRef(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const goTo = useCallback((next: number) => {
    if (next === activeRef.current) return;
    setPrev(activeRef.current);
    activeRef.current = next;
    setActive(next);
  }, []);

  // Only rotate while the banner is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = window.setInterval(() => goTo((activeRef.current + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion, active, goTo]);

  // Diagonal curtain: the new photo sweeps in over the previous one, zooming in, while the old one
  // recedes and dims. Layout effect so the clip is set before the new layer is painted (no flash).
  useLayoutEffect(() => {
    const outer = outerRefs.current[active];
    const inner = innerRefs.current[active];
    if (!outer || !inner) return;
    if (reducedMotion) {
      gsap.set(outer, { clipPath: 'none' });
      gsap.set(inner, { scale: 1, filter: 'none', opacity: 1 });
      return;
    }
    // A slide may have been dimmed when it was underneath another one; restore it before entry.
    gsap.set(inner, { opacity: 1 });
    const tweens: gsap.core.Tween[] = [];
    // Long, slow zoom on the photo being shown (covers the entrance and the whole time on screen).
    tweens.push(gsap.fromTo(inner, { scale: 1.12, filter: 'brightness(1)' }, { scale: 1, duration: SLIDE_MS / 1000 + 1.3, ease: 'power2.out' }));
    if (prev !== null) {
      // If the previous transition was interrupted, its photo could still be half-clipped: show it whole.
      const below = outerRefs.current[prev];
      if (below) gsap.set(below, { clipPath: 'none' });
      tweens.push(
        gsap.fromTo(
          outer,
          { clipPath: 'polygon(0% 0%, 0% 0%, -25% 100%, -25% 100%)' },
          {
            clipPath: 'polygon(0% 0%, 125% 0%, 100% 100%, -25% 100%)',
            duration: 1.3,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.set(outer, { clipPath: 'none' });
            },
          }
        )
      );
      const leaving = innerRefs.current[prev];
      if (leaving) {
        tweens.push(
          gsap.to(leaving, {
            scale: '+=0.025',
            filter: 'brightness(0.5)',
            opacity: 0.35,
            duration: 0.75,
            ease: 'power3.out',
          })
        );
      }
    } else {
      gsap.set(outer, { clipPath: 'none' });
    }
    return () => tweens.forEach((t) => t.kill());
  }, [active, prev, reducedMotion]);

  // Content reveal when the banner scrolls into view.
  useGSAP(() => {
    gsap.from('.portfolio-reveal', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-black">
      {/* Rotating background photos. On desktop each sits on the right (subject away from the text)
          and fades out to the left with a mask. Layers: incoming on top, previous below, rest hidden. */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          ref={(el) => {
            outerRefs.current[i] = el;
          }}
          aria-hidden={i !== active}
          className={`absolute inset-0 ${i === active ? 'z-[2] visible' : i === prev ? 'z-[1] visible' : 'z-0 invisible'}`}
        >
          <div
            ref={(el) => {
              innerRefs.current[i] = el;
            }}
            className={`absolute inset-0 ${slide.desktopFrame} lg:mask-l-from-30% lg:mask-l-to-100% will-change-transform`}
          >
            <Image
              publicId={slide.id}
              alt={slide.alt}
              variant="hero"
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              loading={i === 0 ? 'eager' : 'lazy'}
              imgClassName={`object-cover ${slide.position}`}
            />
          </div>
          {/* Soften the hard left edge while the diagonal curtain moves over the previous photo. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[18%] hidden w-[42%] bg-gradient-to-r from-[#061226] via-[#061226]/75 to-transparent lg:block"
          />
        </div>
      ))}

      {/* Text side: blue gradient + blur that fades out towards the photo */}
      <div className="absolute z-[3] inset-y-0 left-0 w-full bg-gradient-to-r from-[#061226]/80 via-[#0b1a33]/25 to-transparent pointer-events-none lg:w-[60%] lg:backdrop-blur-xl lg:mask-r-from-40% lg:mask-r-to-100% lg:from-[#061226]/90 lg:via-[#0b1a33]/50" />
      <div aria-hidden className="absolute z-[3] left-[5%] top-1/2 -translate-y-1/2 w-[28rem] max-w-[80vw] aspect-square rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
      {/* Blend with the hero above and Skills below */}
      <div className="absolute z-[3] inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute z-[3] inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

      {/* The whole banner is the link */}
      <a
        href={GALLERY_HREF}
        target="_blank"
        // `opener` (not noopener): the gallery tab uses window.opener to scroll this tab and close itself.
        rel="opener"
        onClick={leaveLandingAtSkills}
        className="group absolute inset-0 z-10 flex items-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400"
      >
        {/* Left-aligned (unlike the centred home cover) */}
        <div className="container mx-auto px-6 flex flex-col items-start text-left">
        <h2 className="portfolio-reveal text-5xl sm:text-7xl lg:text-8xl font-serif uppercase text-white tracking-[0.12em] leading-none drop-shadow-2xl">
          Portfolio
        </h2>
        {/* Same button style as the rest of the site (glass + blue frame drawn on hover) */}
        <span className="portfolio-reveal relative mt-8 md:mt-10 inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-black/40 backdrop-blur-md text-white text-xs md:text-sm font-sans font-bold uppercase tracking-[0.35em] whitespace-nowrap">
          <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/25 group-hover:ring-transparent transition-[box-shadow] duration-300" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-400/30 via-brand-400/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand-400/80 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-400/80 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out" />
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-brand-400/80 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
          <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-brand-400/80 scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-300 ease-out delay-150" />
          <span className="relative">View full gallery</span>
          <ArrowUpRight size={16} aria-hidden className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        <p className="portfolio-reveal mt-6 md:mt-8 max-w-md md:max-w-lg text-white/60 font-serif text-base md:text-xl leading-relaxed">
          Full armour builds and props for studios and campaigns. Every piece, from concept to camera-ready.
        </p>
        </div>
      </a>

      {/* Slide indicators (selectable on desktop) */}
      <div className="absolute z-20 inset-x-0 bottom-8 container mx-auto px-6 flex items-center gap-2 pointer-events-none">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            className="py-3 px-0.5 md:pointer-events-auto"
          >
            <span className={`block h-px transition-all duration-500 ${i === active ? 'w-10 bg-white' : 'w-5 bg-white/30 hover:bg-white/60'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
