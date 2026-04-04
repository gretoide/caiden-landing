import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeferredBackground from '../../ui/DeferredBackground';
import OptimizedImage from '../../ui/OptimizedImage';
import { skyrimData as data } from '../content/skyrim';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpen: (publicId: string) => void;
};

export default function Skyrim({ onOpen }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray('.skyrim-header-anim', containerRef.current);
    
    gsap.from(elements, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    const items = gsap.utils.toArray('.skyrim-item-anim', containerRef.current);
    gsap.from(items, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden py-24 md:py-32 border-t border-white/5">
      <DeferredBackground
        publicId={data.bg}
        className={`absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none ${data.blurClassName || 'blur-md'} scale-105`}
        style={{ backgroundAttachment: 'fixed' }}
        width={1024}
        rootMargin="1200px"
      />
      
      {data.bgOverlayClassName && (
        <div className={`absolute inset-0 z-[1] pointer-events-none ${data.bgOverlayClassName}`}></div>
      )}
      
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-1"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-1"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-16 md:mb-24 max-w-4xl">
           <h2 className="skyrim-header-anim text-6xl md:text-[10rem] font-serif text-white leading-none drop-shadow-2xl">
             {data.title}
           </h2>
           <div className="skyrim-header-anim flex flex-col md:flex-row md:items-end gap-6 mt-6">
             <p className={`text-xl md:text-3xl font-sans tracking-widest font-bold uppercase drop-shadow-md ${data.subtitleClassName || 'text-[#9ca3af]'}`}>
               {data.subtitle}
             </p>
             <div className="h-[1px] flex-grow bg-gradient-to-r from-[#9ca3af] to-transparent mb-4 opacity-30 hidden md:block"></div>
           </div>
           {data.description && (
             <p className="skyrim-header-anim text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 border-[#9ca3af]">
               {data.description}
             </p>
           )}
        </div>

        {/* 3-Grid Layout (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 h-auto md:h-[90vh]">
          {/* Column 1 */}
          <div className="skyrim-item-anim relative group overflow-hidden border border-white/5 h-[60vh] md:h-full">
            <OptimizedImage
              publicId={data.gallery[0]}
              alt="Skyrim Detail 1"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              sizes="(min-width: 1024px) 33vw, 100vw"
              onClick={() => onOpen(data.gallery[0])}
            />
            <div className="absolute top-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              Dragonborn // Daedric armor // 01
            </div>
          </div>

          {/* Column 2 - Main View */}
          <div className="skyrim-item-anim relative group overflow-hidden border border-white/5 h-[60vh] md:h-full">
            <OptimizedImage
              publicId={data.gallery[1]}
              alt="Skyrim Main View"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
              sizes="(min-width: 1024px) 33vw, 100vw"
              onClick={() => onOpen(data.gallery[1])}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              Dragonborn // Daedric armor // 02
            </div>
          </div>

          {/* Column 3 */}
          <div className="skyrim-item-anim relative group overflow-hidden border border-white/5 h-[60vh] md:h-full">
            <OptimizedImage
              publicId={data.gallery[2]}
              alt="Skyrim Detail 2"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              sizes="(min-width: 1024px) 33vw, 100vw"
              onClick={() => onOpen(data.gallery[2])}
            />
            <div className="absolute top-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              Dragonborn // Daedric armor // 03
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
