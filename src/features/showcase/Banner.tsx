import { useRef } from 'react';
import Image from '../../shared/ui/Image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  publicId: string;
  title: string;
  onOpen: (publicId: string) => void;
};

export default function Banner({ publicId, title, onOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: containerRef });

  if (!publicId) return null;

  return (
    <div ref={containerRef} className="w-full aspect-video mb-12 relative group overflow-hidden border border-white/10 shadow-2xl">
      <Image
        publicId={publicId}
        alt={`${title} Featured Banner`}
        variant="full"
        className="w-full h-full"
        imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
        sizes="100vw"
        onClick={() => onOpen(publicId)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute top-4 left-4 flex gap-2 overflow-hidden pointer-events-none">
        <span className="bg-brand-400 px-3 py-1 text-[10px] text-black font-bold uppercase tracking-tighter">Cinematic View</span>
      </div>
      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
        <p className="text-white/40 font-sans text-xs tracking-widest uppercase">{title} // Full Field Showcase</p>
      </div>
    </div>
  );
}
