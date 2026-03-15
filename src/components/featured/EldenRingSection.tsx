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
    banner: string;
    bg: string;
    gallery: readonly string[];
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
      
      {/* Top transition from Hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-1"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Title and Intro */}
        <div className="mb-24 max-w-4xl">
           <h2 className="text-7xl md:text-[10rem] font-serif text-white leading-none drop-shadow-2xl">Elden Ring</h2>
           <div className="flex flex-col md:flex-row md:items-end gap-6 mt-6">
             <p className="text-xl md:text-3xl font-sans tracking-widest text-brand-400 font-bold uppercase drop-shadow-md">
               Shadow of the Erdtree — 2024
             </p>
             <div className="h-[1px] flex-grow bg-gradient-to-r from-brand-400 to-transparent mb-4 opacity-30 hidden md:block"></div>
           </div>
        </div>

        {/* Cinematic Featured Banner (16:9) */}
        <div className="w-full aspect-video mb-12 relative group overflow-hidden border border-white/10 shadow-2xl">
           <OptimizedImage
              publicId={imageIds.banner}
              alt="Elden Ring Featured Banner"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
              sizes="100vw"
              onClick={() => onOpen(imageIds.banner)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-4 left-4 flex gap-2 overflow-hidden pointer-events-none">
               <span className="bg-brand-400 px-3 py-1 text-[10px] text-black font-bold uppercase tracking-tighter">Cinematic View</span>
            </div>
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
               <p className="text-white/40 font-sans text-xs tracking-widest uppercase">Elden Ring // Full Field Showcase</p>
            </div>
        </div>

        {/* Secondary Gallery Grid - Dynamic Mosaic Layout */}
        <div className="grid grid-cols-12 auto-rows-[25vh] md:auto-rows-[30vh] gap-3 mb-12">
           {/* Shot 1 - Small Portrait */}
           <div className="col-span-6 md:col-span-3 row-span-1 relative group overflow-hidden bg-white/5 border border-white/5">
              <OptimizedImage
                publicId={imageIds.gallery[0]}
                alt="Elden Ring Portrait"
                variant="thumb"
                className="w-full h-full"
                imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                onClick={() => onOpen(imageIds.gallery[0])}
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-1 h-1 bg-brand-400"></div>
                 <span className="text-[8px] text-white/50 tracking-[0.2em] font-sans">SHOT // 01</span>
              </div>
           </div>

           {/* Shot 2 - Horizontal Rect */}
           <div className="col-span-6 md:col-span-5 row-span-1 relative group overflow-hidden bg-white/5 border border-white/5">
              <OptimizedImage
                publicId={imageIds.gallery[1]}
                alt="Elden Ring Close-up"
                variant="thumb"
                className="w-full h-full"
                imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                onClick={() => onOpen(imageIds.gallery[1])}
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-1 h-1 bg-brand-400"></div>
                 <span className="text-[8px] text-white/50 tracking-[0.2em] font-sans">SHOT // 02</span>
              </div>
           </div>

           {/* Shot 3 - Large Square/Tall */}
           <div className="col-span-7 md:col-span-4 row-span-1 md:row-span-2 relative group overflow-hidden bg-white/5 border border-white/10">
              <OptimizedImage
                publicId={imageIds.gallery[2]}
                alt="Elden Ring Action"
                variant="thumb"
                className="w-full h-full"
                imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                onClick={() => onOpen(imageIds.gallery[2])}
              />
              <div className="absolute bottom-4 right-4 text-right opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                 <span className="text-[8px] text-white/30 tracking-[0.3em] font-sans block mb-1">PROTOTYPE PHASE</span>
                 <span className="text-[10px] text-brand-400 font-bold tracking-[0.1em] font-sans uppercase">Ref: High Detail Capture</span>
              </div>
           </div>

           {/* Shot 4 - Horizontal Bottom Left */}
           <div className="col-span-5 md:col-span-8 row-span-1 relative group overflow-hidden bg-white/5 border border-white/5">
              <OptimizedImage
                publicId={imageIds.gallery[3]}
                alt="Elden Ring Texture"
                variant="thumb"
                className="w-full h-full"
                imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                onClick={() => onOpen(imageIds.gallery[3])}
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-1 h-1 bg-brand-400"></div>
                 <span className="text-[8px] text-white/50 tracking-[0.2em] font-sans">SHOT // 04</span>
              </div>
           </div>
        </div>

        {/* Stitched Grid Layout - High Detail Focus Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 h-auto md:h-[120vh]">
          
          {/* Main View - Large Left */}
          <div className="md:col-span-7 h-[60vh] md:h-full relative group">
            <OptimizedImage
              publicId={imageIds.main}
              alt="Elden Ring Main"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer"
              sizes="(min-width: 1024px) 60vw, 100vw"
              onClick={() => onOpen(imageIds.main)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white/40 font-sans text-xs tracking-widest uppercase">Full Anatomy</span>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-5 grid grid-cols-1 gap-2 md:gap-4 h-auto md:h-full">
            
            {/* Top Detail - Zoomed on Face/Torso */}
            <div className="h-[40vh] md:h-full relative group overflow-hidden border border-white/5">
              <OptimizedImage
                publicId={imageIds.main}
                alt="Face Detail"
                variant="full"
                className="w-full h-full"
                imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                zoom={1.8}
                objectPosition="10% 90%"
                sizes="(min-width: 1024px) 40vw, 100vw"
                onClick={() => onOpen(imageIds.main)}
              />
               <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
               <div className="absolute top-4 right-4 text-[10px] text-white/30 tracking-[0.3em] uppercase">Focus 01 // Torso</div>
            </div>

            {/* Bottom Details Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 h-[40vh] md:h-full">
               <div className="relative group overflow-hidden border border-white/5">
                 <OptimizedImage
                    publicId={imageIds.main}
                    alt="Waist Detail"
                    variant="full"
                    className="w-full h-full"
                    imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                    zoom={2.5}
                    objectPosition="55% 50%"
                    onClick={() => onOpen(imageIds.main)}
                  />
                  <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 text-[8px] text-white/30 tracking-[0.2em] uppercase">Focus 02 // Leather</div>
               </div>
               <div className="relative group overflow-hidden border border-white/5">
                  <OptimizedImage
                    publicId={imageIds.main}
                    alt="Hand Detail"
                    variant="full"
                    className="w-full h-full"
                    imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                    zoom={2.5}
                    objectPosition="80% 90%"
                    onClick={() => onOpen(imageIds.main)}
                  />
                  <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 text-[8px] text-white/30 tracking-[0.2em] uppercase">Focus 03 // Metal</div>
               </div>
            </div>

          </div>

        </div>

        {/* Footer info breakdown */}
        <div className="mt-12 flex flex-wrap gap-12 border-t border-white/10 pt-8">
           <div className="max-w-xs">
              <p className="text-white font-serif text-xl mb-2">The Crucible Knight</p>
              <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px] leading-relaxed">
                Reinforced polymer & Hand-painted oxidation. Integrated harness system for 20kg load-bearing.
              </p>
           </div>
           <div className="max-w-xs">
              <p className="text-white font-serif text-xl mb-2">Artifact Anatomy</p>
              <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px] leading-relaxed">
                Composite fiberglass & resin foundation. 1:1 Scale accuracy for high-fidelity cinematography.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}

