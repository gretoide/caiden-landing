import { ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';
import type { GalleryItem } from './content/craftsmanship';
import { cloudinaryVideoUrl } from '../../lib/cloudinary';

type Props = {
  items: GalleryItem[];
  activeIndex: number;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function SubSkillCarousel({ items, activeIndex, onNext, onPrev }: Props) {
  if (!items || items.length === 0) return null;

  // Ensure index is within bounds
  const safeIndex = ((activeIndex % items.length) + items.length) % items.length;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center group/carousel">
      {items.map((item, idx) => {
        const isActive = idx === safeIndex;
        
        return (
          <div
            key={`${item.publicId}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {item.type === 'video' ? (
              <video
                src={cloudinaryVideoUrl(item.publicId)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster={`https://res.cloudinary.com/dmhfkaovp/image/upload/f_auto,q_auto,w_800/${item.publicId}.jpg`}
              />
            ) : (
              <OptimizedImage
                publicId={item.publicId}
                alt=""
                variant="hero"
                fill
                objectFit="cover"
                objectPosition="center"
                imgClassName="transition-transform duration-[10s] ease-out"
              />
            )}
          </div>
        );
      })}

      {/* Manual Navigation Controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev?.();
            }}
            className="absolute left-6 z-30 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-brand-400 hover:text-black hover:border-brand-400 transition-all opacity-80 group-hover/carousel:opacity-100 translate-x-0 group-hover/carousel:-translate-x-2"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            className="absolute right-6 z-30 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-brand-400 hover:text-black hover:border-brand-400 transition-all opacity-80 group-hover/carousel:opacity-100 translate-x-0 group-hover/carousel:translate-x-2"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {items.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 transition-all duration-500 rounded-full ${
                  idx === safeIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
