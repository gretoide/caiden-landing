import { useState, useRef } from 'react';
import ImageModal from '../ui/ImageModal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from '../ui/OptimizedImage';
import DeferredBackground from '../ui/DeferredBackground';
import { cloudinaryUrl } from '../../lib/cloudinary';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string | number;
  publicId: string;
  title?: string;
}

interface GallerySectionProps {
  id?: string;
  title: string;
  items: GalleryItem[];
}

export default function GallerySection({ id, title, items }: GallerySectionProps) {
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const galleryItems = gsap.utils.toArray('.gallery-item-anim', containerRef.current);
    
    gsap.from(galleryItems, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: containerRef });

  if (!items || items.length === 0) return null;

  return (
    <section id={id} ref={containerRef} className="py-24 bg-black border-t border-white/5 relative z-10 w-full overflow-hidden">
      {/* Background Image */}
      {items[0] && (
        <DeferredBackground
          publicId={items[0].publicId}
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"
          width={768}
        />
      )}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-16 text-center tracking-wider drop-shadow-xl">
          {title}
        </h2>

        {/* Masonry Layout via CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, i) => (
            <div 
              key={`${item.id}-${i}`} 
              className="gallery-item-anim group relative overflow-hidden break-inside-avoid cursor-pointer bg-[#050505] shadow-2xl rounded-sm"
              onClick={() => setExpandedPublicId(item.publicId)}
            >
              <OptimizedImage
                publicId={item.publicId}
                alt={item.title || 'Prop'}
                variant="thumb"
                className="w-full"
                imgClassName="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03] grayscale-[20%] group-hover:grayscale-0"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                onPointerEnter={() => {
                  const img = new Image();
                  img.src = cloudinaryUrl(item.publicId, { variant: 'full', width: 1200 });
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex flex-col justify-end p-6 md:p-8">
                {item.title && (
                  <h4 className="text-white font-serif text-2xl md:text-3xl drop-shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.title}
                  </h4>
                )}
                <div className="w-12 h-[2px] bg-brand-400 mt-4 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-150"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expandedPublicId && (
        <ImageModal key={expandedPublicId} publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />
      )}
    </section>
  );
}
