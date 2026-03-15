import { useState, useRef } from 'react';
import { ImageModal } from './FeaturedBuilds';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string | number;
  image: string;
  title?: string;
}

interface GallerySectionProps {
  id?: string;
  title: string;
  items: GalleryItem[];
}

export default function GallerySection({ id, title, items }: GallerySectionProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
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
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none" 
          style={{ backgroundImage: `url(${items[0].image})` }}
        ></div>
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
              onClick={() => setExpandedImage(item.image)}
            >
              <img 
                src={item.image} 
                alt={item.title || 'Prop'} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03] grayscale-[20%] group-hover:grayscale-0"
                loading="lazy"
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

      {expandedImage && (
        <ImageModal src={expandedImage} onClose={() => setExpandedImage(null)} />
      )}
    </section>
  );
}
