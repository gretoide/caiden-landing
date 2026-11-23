import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from '../../shared/ui/Image';
import MediaLoader from '../../shared/ui/MediaLoader';
import type { GalleryItem } from './data';
import { cloudinaryVideoPosterUrl, cloudinaryVideoUrl } from '../../shared/lib/cloudinary';

type Props = {
  items: GalleryItem[];
  activeIndex: number;
  onNext?: () => void;
  onPrev?: () => void;
};

// Looping muted video that only plays while it is the active slide and visible on screen
type CarouselVideoProps = {
  publicId: string;
  endOffset?: number;
  skip?: [number, number][];
  isActive: boolean;
};

function CarouselVideo({ publicId, endOffset, skip, isActive }: CarouselVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Assume visible when IntersectionObserver is unavailable
  const isVisibleRef = useRef(typeof IntersectionObserver === 'undefined');
  const isActiveRef = useRef(isActive);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = cloudinaryVideoUrl(publicId, { endOffset });
  const poster = cloudinaryVideoPosterUrl(publicId) || undefined;

  const syncPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isActiveRef.current && isVisibleRef.current) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    isActiveRef.current = isActive;
    syncPlayback();
  }, [isActive]);

  // Jump over removed clips. requestVideoFrameCallback checks every presented frame, so no frame of a
  // skipped range is shown; browsers without it fall back to timeupdate with a wider look-ahead.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !skip?.length) return;
    // Land a bit past the range end: seeks snap to a frame, and the one just before `end` is still inside.
    const LANDING_MARGIN = 0.06;
    let seeking = false;
    const reveal = () => {
      seeking = false;
      video.style.opacity = '';
    };
    video.addEventListener('seeked', reveal);
    const jump = (time: number, lookAhead: number) => {
      if (seeking) return;
      const range = skip.find(([start, end]) => time + lookAhead >= start && time < end);
      if (!range) return;
      seeking = true;
      // Hide while seeking so no in-between frame of the removed clip can flash.
      video.style.opacity = '0';
      video.currentTime = range[1] + LANDING_MARGIN;
    };
    const supportsFrameCallback = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
    if (supportsFrameCallback) {
      let handle = 0;
      const onFrame: VideoFrameRequestCallback = (_now, meta) => {
        jump(meta.mediaTime, 0.05);
        handle = video.requestVideoFrameCallback(onFrame);
      };
      handle = video.requestVideoFrameCallback(onFrame);
      return () => {
        video.cancelVideoFrameCallback(handle);
        video.removeEventListener('seeked', reveal);
        video.style.opacity = '';
      };
    }
    const onTime = () => jump(video.currentTime, 0.3);
    video.addEventListener('timeupdate', onTime);
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('seeked', reveal);
      video.style.opacity = '';
    };
  }, [skip]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        poster={poster}
        onLoadedData={() => setReady(true)}
        // Safety net for browsers that ignore `loop` on some MP4s: restart instead of freezing on the last frame.
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          if (isActiveRef.current && isVisibleRef.current) e.currentTarget.play().catch(() => {});
        }}
        onError={() => setFailed(true)}
      />
      <MediaLoader active={!ready} error={failed} />
    </>
  );
}

export default function SkillCarousel({ items, activeIndex, onNext, onPrev }: Props) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  // Swipe handlers
  const minSwipeDistance = 50;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) onNext?.();
    if (distance < -minSwipeDistance) onPrev?.();
  };

  // Ensure index is within bounds
  const safeIndex = ((activeIndex % items.length) + items.length) % items.length;

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center group/carousel touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
              <CarouselVideo publicId={item.publicId} endOffset={item.endOffset} skip={item.skip} isActive={isActive} />
            ) : (
              <Image
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
            className="hidden md:block absolute left-6 z-30 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-brand-400 hover:text-black hover:border-brand-400 transition-all opacity-80 group-hover/carousel:opacity-100 translate-x-0 group-hover/carousel:-translate-x-2"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            className="hidden md:block absolute right-6 z-30 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-brand-400 hover:text-black hover:border-brand-400 transition-all opacity-80 group-hover/carousel:opacity-100 translate-x-0 group-hover/carousel:translate-x-2"
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
