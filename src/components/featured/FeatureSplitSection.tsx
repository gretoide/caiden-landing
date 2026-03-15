import { useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from '../OptimizedImage';
import DeferredBackground from '../DeferredBackground';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  title: ReactNode;
  subtitle: string;
  subtitleClassName: string;
  description: string;
  borderClassName: string;
  layout: 'left' | 'right';
  bgPublicId: string;
  image1: { publicId: string; alt: string; className: string; objectClassName?: string };
  image2: { publicId: string; alt: string; className: string; objectClassName?: string };
  onOpen: (publicId: string) => void;
};

export default function FeatureSplitSection({
  title,
  subtitle,
  subtitleClassName,
  description,
  borderClassName,
  layout,
  bgPublicId,
  image1,
  image2,
  onOpen,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const onHover = (e: React.MouseEvent, scale: number) => {
    if (window.innerWidth < 768) return;
    gsap.to(e.currentTarget, { scale, duration: 0.6, ease: 'power2.out' });
  };

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.from(titleRef.current, {
          x: layout === 'left' ? 350 : -350,
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'top 15%',
            scrub: 3,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const isReverse = layout === 'right';

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen bg-black py-24 flex items-center border-t border-white/5 overflow-hidden`}
    >
      <DeferredBackground
        publicId={bgPublicId}
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"
        width={1024}
      />

      <div
        className={`container mx-auto px-6 md:px-12 flex flex-col md:flex-row ${
          isReverse ? 'md:flex-row-reverse' : ''
        } gap-8 lg:gap-16 items-center relative z-10`}
      >
        <div ref={titleRef} className="w-full md:w-5/12 flex flex-col justify-center">
          <h2 className="text-6xl md:text-8xl font-serif text-white leading-none drop-shadow-2xl">{title}</h2>
          <p className={`text-lg md:text-xl font-sans tracking-widest mt-6 font-bold uppercase drop-shadow-lg ${subtitleClassName}`}>
            {subtitle}
          </p>
          <p className={`text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 ${borderClassName}`}>
            {description}
          </p>
        </div>

        <div className="w-full md:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-16 md:mt-0">
          {isReverse && (
            <div className="flex flex-col md:mt-32">
              <OptimizedImage
                publicId={image1.publicId}
                alt={image1.alt}
                variant="full"
                className={image1.className}
                imgClassName={`w-full h-full object-cover cursor-pointer shadow-2xl ${image1.objectClassName ?? ''}`}
                sizes="(min-width: 768px) 50vw, 100vw"
                onClick={() => onOpen(image1.publicId)}
                onMouseEnter={(e) => onHover(e, 1.05)}
                onMouseLeave={(e) => onHover(e, 1)}
              />
            </div>
          )}

          <OptimizedImage
            publicId={isReverse ? image2.publicId : image1.publicId}
            alt={isReverse ? image2.alt : image1.alt}
            variant="full"
            className={isReverse ? image2.className : image1.className}
            imgClassName={`w-full h-full object-cover cursor-pointer shadow-2xl ${(isReverse ? image2.objectClassName : image1.objectClassName) ?? ''}`}
            sizes="(min-width: 768px) 50vw, 100vw"
            onClick={() => onOpen(isReverse ? image2.publicId : image1.publicId)}
            onMouseEnter={(e) => onHover(e, 1.05)}
            onMouseLeave={(e) => onHover(e, 1)}
          />

          {!isReverse && (
            <div className="flex flex-col md:mt-32">
              <OptimizedImage
                publicId={image2.publicId}
                alt={image2.alt}
                variant="full"
                className={image2.className}
                imgClassName={`w-full h-full object-cover cursor-pointer shadow-2xl ${image2.objectClassName ?? ''}`}
                sizes="(min-width: 768px) 50vw, 100vw"
                onClick={() => onOpen(image2.publicId)}
                onMouseEnter={(e) => onHover(e, 1.05)}
                onMouseLeave={(e) => onHover(e, 1)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
