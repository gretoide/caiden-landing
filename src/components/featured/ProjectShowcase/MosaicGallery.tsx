import { useRef } from 'react';
import OptimizedImage from '../../OptimizedImage';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  galleryIds: readonly string[];
  onOpen: (publicId: string) => void;
};

export default function MosaicGallery({ galleryIds, onOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.mosaic-item-anim', containerRef.current);
    
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

  if (!galleryIds || galleryIds.length < 4) return null;

  return (
    <div ref={containerRef} className="grid grid-cols-12 auto-rows-[25vh] md:auto-rows-[30vh] gap-3 mb-12">
      {/* Shot 1 - Small Portrait */}
      <div className="mosaic-item-anim col-span-6 md:col-span-3 row-span-1 relative group overflow-hidden bg-white/5 border border-white/5">
        <OptimizedImage
          publicId={galleryIds[0]}
          alt="Showcase Shot 1"
          variant="thumb"
          className="w-full h-full"
          imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
          onClick={() => onOpen(galleryIds[0])}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-1 h-1 bg-brand-400"></div>
          <span className="text-[8px] text-white/50 tracking-[0.2em] font-sans uppercase">Ref // Alpha-01</span>
        </div>
      </div>

      {/* Shot 2 - Horizontal Rect */}
      <div className="mosaic-item-anim col-span-6 md:col-span-5 row-span-1 relative group overflow-hidden bg-white/5 border border-white/5">
        <OptimizedImage
          publicId={galleryIds[1]}
          alt="Showcase Shot 2"
          variant="thumb"
          className="w-full h-full"
          imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
          onClick={() => onOpen(galleryIds[1])}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-1 h-1 bg-brand-400"></div>
          <span className="text-[8px] text-white/50 tracking-[0.2em] font-sans uppercase">Ref // Beta-02</span>
        </div>
      </div>

      {/* Shot 3 - Large Square/Tall */}
      <div className="mosaic-item-anim col-span-7 md:col-span-4 row-span-1 md:row-span-2 relative group overflow-hidden bg-white/5 border border-white/10">
        <OptimizedImage
          publicId={galleryIds[2]}
          alt="Showcase Shot 3"
          variant="thumb"
          className="w-full h-full"
          imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
          onClick={() => onOpen(galleryIds[2])}
        />
        <div className="absolute bottom-4 right-4 text-right opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
          <span className="text-[8px] text-white/30 tracking-[0.3em] font-sans block mb-1 uppercase">Production Detail</span>
          <span className="text-[10px] text-brand-400 font-bold tracking-[0.1em] font-sans uppercase">Artifact Capture</span>
        </div>
      </div>

      {/* Shot 4 - Horizontal Bottom Left */}
      <div className="mosaic-item-anim col-span-5 md:col-span-8 row-span-1 relative group overflow-hidden bg-white/5 border border-white/5">
        <OptimizedImage
          publicId={galleryIds[3]}
          alt="Showcase Shot 4"
          variant="thumb"
          className="w-full h-full"
          imgClassName="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover"
          onClick={() => onOpen(galleryIds[3])}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-1 h-1 bg-brand-400"></div>
          <span className="text-[8px] text-white/50 tracking-[0.2em] font-sans uppercase">Ref // Gamma-04</span>
        </div>
      </div>
    </div>
  );
}
