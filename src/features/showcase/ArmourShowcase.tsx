import { useEffect, useRef, useState } from 'react';
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
  { id: 'skyrim_6_b9efrf', alt: 'Skyrim Daedric armour', position: 'object-[center_30%]' },
  { id: 'diablo_iv_5_k4ddrg', alt: 'Diablo IV armour', position: 'object-[center_25%]' },
  { id: 'skyrim_7_yqhwyx', alt: 'Skyrim Daedric armour detail', position: 'object-[center_30%]' },
  { id: 'elden_ring_6_k5z39c', alt: 'Elden Ring armour', position: 'object-[center_30%]' },
];

/**
 * Landing "Portfolio" banner, below the hero and styled like it (but quieter): rotating background
 * photos, a centred serif title and a "View full gallery" button. The whole banner opens /gallery
 * in a new tab.
 */
export default function ArmourShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

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
    const timer = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion, active]);

  // Slow push-in on the photo that is showing.
  useEffect(() => {
    const slide = slideRefs.current[active];
    if (!slide || reducedMotion) return;
    const tween = gsap.fromTo(slide, { scale: 1.06 }, { scale: 1, duration: SLIDE_MS / 1000 + 1.5, ease: 'none' });
    return () => {
      tween.kill();
    };
  }, [active, reducedMotion]);

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
      {/* Rotating background photos (crossfade) */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            publicId={slide.id}
            alt={slide.alt}
            variant="hero"
            fill
            sizes="100vw"
            loading={i === 0 ? 'eager' : 'lazy'}
            imgClassName={`object-cover ${slide.position}`}
          />
        </div>
      ))}

      {/* Blend with the hero above and Skills below, like the home cover */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

      {/* The whole banner is the link */}
      <a
        href={GALLERY_HREF}
        target="_blank"
        // `opener` (not noopener): the gallery tab uses window.opener to scroll this tab and close itself.
        rel="opener"
        className="group absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400"
      >
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
        <p className="portfolio-reveal mt-6 md:mt-8 max-w-md md:max-w-xl text-white/60 font-serif text-base md:text-xl leading-relaxed">
          Full armour builds and props for studios and campaigns. Every piece, from concept to camera-ready.
        </p>
      </a>

      {/* Slide indicators (selectable on desktop) */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            className="py-3 px-0.5 pointer-events-none md:pointer-events-auto"
          >
            <span className={`block h-px transition-all duration-500 ${i === active ? 'w-10 bg-white' : 'w-5 bg-white/30 hover:bg-white/60'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
