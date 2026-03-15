import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from '../OptimizedImage';
import DeferredBackground from '../DeferredBackground';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  imageIds: {
    main: string;
    sub1: string;
    sub2: string;
    detail1: string;
    bg: string;
  };
  onOpen: (publicId: string) => void;
};

export default function EldenRingSection({ imageIds, onOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.to('.parallax-slow', {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.parallax-fast', {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.hero-main', {
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full min-h-[160vh] bg-black overflow-hidden py-32">
      <DeferredBackground
        publicId={imageIds.bg}
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"
        style={{ backgroundAttachment: 'fixed' }}
        width={1024}
        rootMargin="1200px"
      />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
        <div className="hero-main relative w-full h-[80vh] md:h-[90vh] mb-32 group">
          <OptimizedImage
            publicId={imageIds.main}
            alt="Elden Ring Main"
            variant="full"
            className="w-full h-full"
            imgClassName="w-full h-full object-cover shadow-[0_0_100px_rgba(0,0,0,0.8)] cursor-pointer grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000"
            sizes="100vw"
            onClick={() => onOpen(imageIds.main)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-12 left-6 md:left-12">
            <h2 className="text-6xl md:text-9xl font-serif text-white drop-shadow-2xl">Elden Ring</h2>
            <p className="text-lg md:text-2xl font-sans tracking-widest text-[#eab308] mt-4 font-bold uppercase drop-shadow-md">
              Shadow of the Erdtree — 2024
            </p>
          </div>
        </div>

        <div className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-x-48 gap-y-64 mt-32">
          <div className="parallax-slow group flex flex-col">
            <OptimizedImage
              publicId={imageIds.detail1}
              alt="Helmet Detail"
              variant="full"
              className="w-full h-[55vh]"
              imgClassName="w-full h-full object-cover shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer scale-100 group-hover:scale-[1.02]"
              sizes="(min-width: 768px) 50vw, 100vw"
              onClick={() => onOpen(imageIds.detail1)}
            />
            <div className="mt-8 pl-4 border-l border-[#eab308]/40">
              <p className="text-white font-serif text-2xl mb-2">The Crucible Knight</p>
              <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px]">
                Reinforced polymer & Hand-painted oxidation
              </p>
            </div>
          </div>

          <div className="parallax-fast group flex flex-col md:mt-32">
            <OptimizedImage
              publicId={imageIds.sub1}
              alt="Back detail"
              variant="full"
              className="w-full h-[65vh]"
              imgClassName="w-full h-full object-cover shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer scale-100 group-hover:scale-[1.02]"
              sizes="(min-width: 768px) 50vw, 100vw"
              onClick={() => onOpen(imageIds.sub1)}
            />
            <div className="mt-8 pl-4 border-l border-[#eab308]/40">
              <p className="text-white font-serif text-2xl mb-2">Artifact Anatomy</p>
              <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px]">
                Integrated harness system for 20kg load-bearing
              </p>
            </div>
          </div>

          <div className="parallax-fast group flex flex-col md:-mt-32">
            <OptimizedImage
              publicId={imageIds.sub2}
              alt="Construction"
              variant="full"
              className="w-full h-[50vh]"
              imgClassName="w-full h-full object-cover shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer scale-100 group-hover:scale-[1.02]"
              sizes="(min-width: 768px) 50vw, 100vw"
              onClick={() => onOpen(imageIds.sub2)}
            />
            <div className="mt-8 pl-4 border-l border-[#eab308]/40">
              <p className="text-white font-serif text-2xl mb-2">Base Structure</p>
              <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px]">
                Composite fiberglass & resin foundation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

