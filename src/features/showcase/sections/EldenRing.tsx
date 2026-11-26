import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from '../../../shared/ui/Image';
import { eldenRingData as data } from '../data/eldenRing';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpen: (publicId: string) => void;
};

// Full-screen suit layout, shown on the /gallery page.
export default function EldenRing({ onOpen }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  const galleryRef = useRef<HTMLDivElement>(null);

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

    // The cover photo settles in from a slight zoom.
    gsap.from('.elden-banner-anim', { scale: 1.08, opacity: 0, duration: 1.6, ease: 'power3.out' });
  }, { scope: containerRef });

  useGSAP(() => {
    if (!galleryRef.current) return;
    const items = gsap.utils.toArray('.elden-item-anim', galleryRef.current);
    gsap.from(items, {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: containerRef });

  const galleryContent = (
    <>
        <div ref={galleryRef}>
        {/* Mosaic Gallery - Gallery[1-4] */}
        <div className="grid grid-cols-12 auto-rows-[25vh] md:auto-rows-[30vh] gap-3 mb-12">
          {/* Shot 1 */}
          <div className="elden-item-anim col-span-6 md:col-span-3 row-span-1 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/50">
            <Image
              publicId={data.gallery[1]}
              alt="Showcase Shot 1"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              onClick={() => onOpen(data.gallery[1])}
            />
            <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              Warrior of the lands
            </div>
          </div>
          {/* Shot 2 */}
          <div className="elden-item-anim col-span-6 md:col-span-5 row-span-1 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/50">
            <Image
              publicId={data.gallery[2]}
              alt="Showcase Shot 2"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              objectPosition="center 50%"
              onClick={() => onOpen(data.gallery[2])}
            />
            <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              Crossed build sets
            </div>
          </div>
          {/* Shot 3 */}
          <div className="elden-item-anim col-span-7 md:col-span-4 row-span-1 md:row-span-2 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/60">
            <Image
              publicId={data.gallery[3]}
              alt="Showcase Shot 3"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              onClick={() => onOpen(data.gallery[3])}
            />
            <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              Drama design
            </div>
          </div>
          {/* Shot 4 */}
          <div className="elden-item-anim col-span-5 md:col-span-8 row-span-1 relative group overflow-hidden bg-[#250707] border border-[#4a0a0a]/50">
            <Image
              publicId={data.gallery[4]}
              alt="Showcase Shot 4"
              variant="thumb"
              className="w-full h-full"
              imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
              objectPosition="center 20%"
              onClick={() => onOpen(data.gallery[4])}
            />
            <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              Essence captor
            </div>
          </div>
        </div>

        {/* Focus Grid - Gallery[5-8] */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 h-auto">
          {/* Main View */}
          <div className="elden-item-anim md:col-span-7 aspect-[4/5] md:aspect-auto md:h-full relative group shadow-2xl overflow-hidden border border-[#4a0a0a]/40">
            <Image
              publicId={data.gallery[5]}
              alt="Main Showcase View"
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
              onClick={() => onOpen(data.gallery[5])}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
              DRAMA DESIGN
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-5 grid grid-cols-1 gap-2 md:gap-4 h-auto">
            {/* Top Detail */}
            <div className="elden-item-anim aspect-square relative group overflow-hidden border border-[#4a0a0a]/30 bg-[#250707] shadow-xl">
              <Image
                publicId={data.gallery[6]}
                alt="Focus Detail 1"
                variant="full"
                className="w-full h-full"
                imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
                onClick={() => onOpen(data.gallery[6])}
              />
              <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
                ESSENCE CAPTOR
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 aspect-[2/1]">
              <div className="elden-item-anim relative group overflow-hidden border border-[#4a0a0a]/30 bg-[#250707] shadow-lg">
                <Image
                  publicId={data.gallery[7]}
                  alt="Focus Detail 2"
                  variant="full"
                  className="w-full h-full"
                  imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                  onClick={() => onOpen(data.gallery[7])}
                />
                <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
                  FOCUS // 02
                </div>
              </div>
              <div className="elden-item-anim relative group overflow-hidden border border-[#4a0a0a]/30 bg-[#250707] shadow-lg">
                <Image
                  publicId={data.gallery[8]}
                  alt="Focus Detail 3"
                  variant="full"
                  className="w-full h-full"
                  imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
                  onClick={() => onOpen(data.gallery[8])}
                />
                <div className="absolute bottom-4 left-4 text-[7px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase z-20">
                  FOCUS // 03
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  );

  return (
    <section ref={containerRef} id="elden-ring" className="relative w-full min-h-screen bg-[#0a0202] overflow-hidden pb-24 md:pb-32">
      {/* Opening banner of /gallery: the first photo ("Warrior of the lands") fills the first screen
          behind the header, so the page starts like a cover and the gallery begins below it. */}
      <div className="elden-banner-anim absolute inset-x-0 top-0 h-svh z-0 pointer-events-none overflow-hidden mask-b-from-50% mask-b-to-100%">
        <Image
          publicId={data.gallery[0]}
          alt=""
          variant="full"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover object-[65%_35%] opacity-80"
          sizes="100vw"
        />
        {/* Darker on the left, where the title sits. The whole banner fades out at the bottom (mask)
            into the section colour, so there is no visible band where the photo ends. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-[1]"></div>
        <div className="absolute inset-0 bg-[#0a0202]/30 mix-blend-multiply z-[1] pointer-events-none"></div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent z-[5]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-[5]"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header Section */}
        <div className="min-h-svh flex flex-col justify-end pt-32 pb-16 md:pb-24 mb-12 md:mb-16 max-w-none relative z-20">
           <h2 className="elden-header-anim text-5xl sm:text-6xl md:text-[10rem] font-serif text-white leading-none drop-shadow-2xl sm:whitespace-nowrap">
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

        {galleryContent}
      </div>
    </section>
  );
}
