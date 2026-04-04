import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeferredBackground from '../../ui/DeferredBackground';
import OptimizedImage from '../../ui/OptimizedImage';
import { diabloIVData as data } from '../content/diabloIV';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpen: (publicId: string) => void;
};

export default function DiabloIV({ onOpen }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray('.diablo-header-anim', containerRef.current);
    
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

    const items = gsap.utils.toArray('.diablo-item-anim', containerRef.current);
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
           <h2 className="diablo-header-anim text-6xl md:text-[10rem] font-serif text-white leading-none drop-shadow-2xl">
             {data.title}
           </h2>
           <div className="diablo-header-anim flex flex-col md:flex-row md:items-end gap-6 mt-6">
             <p className={`text-xl md:text-3xl font-sans tracking-widest font-bold uppercase drop-shadow-md ${data.subtitleClassName || 'text-[#dc2626]'}`}>
               {data.subtitle}
             </p>
             <div className="h-[1px] flex-grow bg-gradient-to-r from-[#dc2626] to-transparent mb-4 opacity-30 hidden md:block"></div>
           </div>
           {data.description && (
             <p className="diablo-header-anim text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 border-[#dc2626]">
               {data.description}
             </p>
           )}
        </div>

        {/* 4-Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 h-auto md:h-[100vh]">
          {/* Shot 1 - Large Left */}
          <div className="diablo-item-anim md:col-span-3 h-[40vh] md:h-full relative group overflow-hidden border border-white/5 shadow-xl">
            <OptimizedImage
              publicId={data.gallery[0]}
              alt="Diablo IV View 01"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
              onClick={() => onOpen(data.gallery[0])}
            />
            <div className="absolute top-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              FULL SET
            </div>
          </div>

          {/* Shot 2 - Main View Center */}
          <div className="diablo-item-anim md:col-span-6 h-[60vh] md:h-full relative group overflow-hidden border border-white/5 shadow-2xl">
            <OptimizedImage
              publicId={data.gallery[1]}
              alt="Diablo IV View 02"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              onClick={() => onOpen(data.gallery[1])}
            />
            <div className="absolute bottom-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              NECROMANCER FROM SANCTUARY
            </div>
          </div>

          {/* Right Column - Shots 3 & 4 */}
          <div className="md:col-span-3 grid grid-cols-1 gap-2 md:gap-4 h-auto md:h-full">
            <div className="diablo-item-anim relative group overflow-hidden border border-white/5 aspect-square md:aspect-auto md:h-full">
              <OptimizedImage
                publicId={data.gallery[2]}
                alt="Diablo IV View 03"
                variant="full"
                className="w-full h-full"
                imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                onClick={() => onOpen(data.gallery[2])}
              />
              <div className="absolute bottom-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
                FOCUS // 01
              </div>
            </div>
            <div className="diablo-item-anim relative group overflow-hidden border border-white/5 aspect-square md:aspect-auto md:h-full">
              <OptimizedImage
                publicId={data.gallery[3]}
                alt="Diablo IV View 04"
                variant="full"
                className="w-full h-full"
                imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                onClick={() => onOpen(data.gallery[3])}
              />
              <div className="absolute bottom-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
                FOCUS // 02
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
