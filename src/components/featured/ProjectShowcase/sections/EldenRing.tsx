import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeferredBackground from '../../../DeferredBackground';
import OptimizedImage from '../../../OptimizedImage';
import { PROJECTS } from '../../../../content/projects';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpen: (publicId: string) => void;
};

export default function EldenRing({ onOpen }: Props) {
  const data = PROJECTS.eldenRing;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const headerElements = gsap.utils.toArray('.elden-header-anim', containerRef.current);
    
    gsap.from(headerElements, {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.25,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    // Sub-components animations
    const items = gsap.utils.toArray('.elden-item-anim', containerRef.current);
    gsap.from(items, {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0a0202] overflow-hidden py-24 md:py-32 border-t border-white/5">
      {/* Background Container - Integrated with Header/Title Area */}
      <div className="absolute inset-x-0 top-0 h-[80vh] z-0 pointer-events-none overflow-hidden">
        <DeferredBackground
          publicId={data.bg}
          className={`absolute inset-0 opacity-60 bg-cover bg-[center_15%] ${data.blurClassName || 'blur-sm'}`}
          style={{ backgroundAttachment: 'scroll' }}
          width={1400}
          rootMargin="1200px"
        />
        {/* Soft Velvet Transition */}
        <div className="absolute inset-x-0 bottom-0 top-[65%] bg-gradient-to-b from-transparent via-[#3d0808]/70 to-[#0a0202] z-[1]"></div>
        {/* Deep Color Wash */}
        <div className="absolute inset-0 bg-[#0a0202]/30 mix-blend-multiply z-[1] pointer-events-none"></div>
      </div>
      
      {/* Section Side Shadow Transitions */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent z-[5]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-[5]"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 md:mb-24 max-w-4xl relative z-20">
           <h2 className="elden-header-anim text-6xl md:text-[10rem] font-serif text-white leading-none drop-shadow-2xl">
             {data.title}
           </h2>
           <div className="elden-header-anim flex flex-col md:flex-row md:items-end gap-6 mt-6">
             <p className={`text-xl md:text-3xl font-sans tracking-widest font-bold uppercase drop-shadow-md ${data.subtitleClassName || 'text-brand-400'}`}>
               {data.subtitle}
             </p>
             <div className={`h-[1px] flex-grow bg-gradient-to-r ${data.subtitleClassName ? 'from-current' : 'from-brand-400'} to-transparent mb-4 opacity-30 hidden md:block`}></div>
           </div>
           {data.description && (
             <p className={`elden-header-anim text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 ${data.descBorderClassName || 'border-brand-400'}`}>
               {data.description}
             </p>
           )}
        </div>

        {/* Banner */}
        <div className="elden-item-anim w-full aspect-video mb-12 relative group overflow-hidden border border-[#4a0a0a]/40 shadow-2xl bg-[#250707]">
          <OptimizedImage
            publicId={data.banner!}
            alt="Elden Ring Featured Banner"
            variant="full"
            className="w-full h-full"
            imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
            sizes="100vw"
            onClick={() => onOpen(data.banner!)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute top-4 left-4 flex gap-2 overflow-hidden pointer-events-none">
            <span className="bg-red-500 px-3 py-1 text-[10px] text-black font-bold uppercase tracking-tighter">Cinematic View</span>
          </div>
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
            <p className="text-white/40 font-sans text-xs tracking-widest uppercase">Elden Ring // Full Field Showcase</p>
          </div>
        </div>

        {/* Mosaic Gallery */}
        <div className="grid grid-cols-12 auto-rows-[25vh] md:auto-rows-[30vh] gap-3 mb-12">
          {/* Shot 1 */}
          <div className="elden-item-anim col-span-6 md:col-span-3 row-span-1 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/50">
            <OptimizedImage
              publicId={data.gallery[0]}
              alt="Showcase Shot 1"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              onClick={() => onOpen(data.gallery[0])}
            />
            {/* Velvet Overlay */}
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>
          {/* Shot 2 */}
          <div className="elden-item-anim col-span-6 md:col-span-5 row-span-1 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/50">
            <OptimizedImage
              publicId={data.gallery[1]}
              alt="Showcase Shot 2"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              onClick={() => onOpen(data.gallery[1])}
            />
            {/* Velvet Overlay */}
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>
          {/* Shot 3 */}
          <div className="elden-item-anim col-span-7 md:col-span-4 row-span-1 md:row-span-2 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/60">
            <OptimizedImage
              publicId={data.gallery[2]}
              alt="Showcase Shot 3"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              onClick={() => onOpen(data.gallery[2])}
            />
            {/* Velvet Overlay */}
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>
          {/* Shot 4 */}
          <div className="elden-item-anim col-span-5 md:col-span-8 row-span-1 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/50">
            <OptimizedImage
              publicId={data.gallery[3]}
              alt="Showcase Shot 4"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              onClick={() => onOpen(data.gallery[3])}
            />
            {/* Velvet Overlay */}
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>
        </div>

        {/* Zoom Focus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 h-auto md:h-[120vh]">
          {/* Main View */}
          <div className="elden-item-anim md:col-span-7 h-[60vh] md:h-full relative group shadow-2xl overflow-hidden border border-[#4a0a0a]/40">
            <div className="absolute inset-0 bg-[#250707] z-[-1]"></div>
            <OptimizedImage
              publicId={data.main}
              alt="Main Showcase View"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-default"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-16 left-6 right-6 flex flex-wrap gap-8 md:gap-12 animate-in fade-in duration-1000">
               <div className="max-w-xs drop-shadow-lg">
                 <p className="text-white font-serif text-lg md:text-xl mb-1">The Crucible Knight</p>
                 <p className="text-white/70 font-sans uppercase tracking-[0.2em] text-[8px] md:text-[10px] leading-relaxed">
                   Reinforced polymer & Hand-painted oxidation. Integrated harness system for 20kg load-bearing.
                 </p>
               </div>
               <div className="max-w-xs drop-shadow-lg">
                 <p className="text-white font-serif text-lg md:text-xl mb-1">Artifact Anatomy</p>
                 <p className="text-white/70 font-sans uppercase tracking-[0.2em] text-[8px] md:text-[10px] leading-relaxed">
                   Composite fiberglass & resin foundation. 1:1 Scale accuracy for high-fidelity cinematography.
                 </p>
               </div>
            </div>

            <div className="absolute bottom-6 left-6">
              <span className="text-white/40 font-sans text-xs tracking-widest uppercase italic">Master Composition</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-5 grid grid-cols-1 gap-2 md:gap-4 h-auto md:h-full">
            {/* Top Detail */}
            <div className="elden-item-anim h-[40vh] md:h-full relative group overflow-hidden border border-[#4a0a0a]/30 bg-[#250707] shadow-xl">
              <OptimizedImage
                publicId={data.main}
                alt={data.zoomDetails[0].label}
                variant="full"
                className="w-full h-full"
                imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-default"
                zoom={data.zoomDetails[0].zoom}
                objectPosition={data.zoomDetails[0].position}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              {/* Velvet Overlay */}
              <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
              <div className="absolute inset-0 border-[0.5px] border-[#4a0a0a]/20 pointer-events-none"></div>
              <div className="absolute top-4 right-4 text-[10px] text-white/30 tracking-[0.3em] uppercase">Focus 01 // {data.zoomDetails[0].label}</div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 h-[40vh] md:h-full">
              {data.zoomDetails.slice(1, 3).map((detail, idx) => (
                <div key={detail.id} className="elden-item-anim relative group overflow-hidden border border-[#4a0a0a]/30 bg-[#250707] shadow-lg">
                  <OptimizedImage
                    publicId={data.main}
                    alt={detail.label}
                    variant="full"
                    className="w-full h-full"
                    imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-default"
                    zoom={detail.zoom}
                    objectPosition={detail.position}
                  />
                  {/* Velvet Overlay */}
                  <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 border-[0.5px] border-[#4a0a0a]/20 pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 text-[8px] text-white/30 tracking-[0.2em] uppercase">Focus 0{idx + 2} // {detail.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
