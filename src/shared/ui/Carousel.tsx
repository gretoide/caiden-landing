import { useMemo } from 'react';
import Image from './Image';

type Props = {
  publicIds: string[];
  intervalMs?: number;
  slideMs?: number;
  imagesPerSlide?: number;
  activeIndex?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

export default function Carousel({
  publicIds,
  intervalMs = 2000,
  slideMs = 900,
  imagesPerSlide = 1,
  activeIndex,
  className,
  objectFit = 'cover',
}: Props) {
  const ids = useMemo(() => publicIds.filter(Boolean), [publicIds]);
  const safeImagesPerSlide = Math.max(1, Math.min(6, Math.floor(imagesPerSlide)));
  const slides = useMemo(() => {
    const out: string[][] = [];
    if (ids.length === 0) return out;
    for (let i = 0; i < ids.length; i += safeImagesPerSlide) {
      out.push(ids.slice(i, i + safeImagesPerSlide));
    }
    // If last slide is short, wrap from start to fill to keep density consistent.
    const last = out[out.length - 1];
    if (last && last.length < safeImagesPerSlide) {
      let j = 0;
      while (last.length < safeImagesPerSlide && j < ids.length) {
        last.push(ids[j]!);
        j++;
      }
    }
    return out;
  }, [ids, safeImagesPerSlide]);
  const slidesKey = useMemo(() => slides.map((s) => s.join(',')).join('|'), [slides]);
  const effectiveIndex = useMemo(() => activeIndex ?? 0, [activeIndex]);
  const safeIndex = useMemo(() => {
    if (slides.length === 0) return 0;
    return ((effectiveIndex % slides.length) + slides.length) % slides.length;
  }, [effectiveIndex, slides.length]);

  const safeSlideMs = Math.max(150, Math.min(slideMs, Math.max(200, intervalMs - 150)));
  const holdMs = Math.max(0, intervalMs - safeSlideMs);
  const durationMs = Math.max(1, intervalMs * Math.max(1, slides.length));
  const framesName = useMemo(() => {
    const base = `${slidesKey}|${intervalMs}|${safeSlideMs}|${safeImagesPerSlide}|slide`;
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      hash = (hash * 31 + base.charCodeAt(i)) | 0;
    }
    return `bg_slide_${Math.abs(hash)}`;
  }, [slidesKey, intervalMs, safeImagesPerSlide, safeSlideMs]);

  const keyframesCss = useMemo(() => {
    const n = slides.length;
    if (n <= 1) return '';

    const total = intervalMs * n;
    const toPct = (ms: number) => (ms / total) * 100;

    const lines: string[] = [];
    lines.push(`@keyframes ${framesName} {`);
    for (let k = 0; k < n; k++) {
      const t0 = k * intervalMs;
      const tHold = t0 + holdMs;
      const tEnd = t0 + intervalMs;
      const x0 = -k * 100;
      const x1 = -(k + 1) * 100;

      lines.push(`  ${toPct(t0).toFixed(4)}% { transform: translateX(${x0}%); }`);
      lines.push(`  ${toPct(tHold).toFixed(4)}% { transform: translateX(${x0}%); }`);
      lines.push(`  ${toPct(tEnd).toFixed(4)}% { transform: translateX(${x1}%); }`);
    }
    lines.push(`  99.9900% { transform: translateX(${-slides.length * 100}%); }`);
    lines.push(`  100% { transform: translateX(0%); }`);
    lines.push('}');
    return lines.join('\n');
  }, [framesName, holdMs, intervalMs, slides.length]);

  if (slides.length === 0) return null;

  const renderSlides = slides.length <= 1 ? slides : [...slides, slides[0]!];

  return (
    <div className={className} aria-hidden="true">
      {keyframesCss ? <style>{keyframesCss}</style> : null}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 flex will-change-transform"
          style={{
            width: `${renderSlides.length * 100}%`,
            height: '100%',
            transform: slides.length <= 1 ? 'translateX(0%)' : `translateX(${-safeIndex * 100}%)`,
            animation: slides.length <= 1 || activeIndex !== undefined ? undefined : `${framesName} ${durationMs}ms infinite`,
            transition:
              slides.length <= 1 || activeIndex === undefined
                ? undefined
                : `transform ${safeSlideMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {renderSlides.map((slide, slideIdx) => (
            <div key={`${slide.join(',')}-${slideIdx}`} className="relative w-full h-full" style={{ flex: '0 0 100%' }}>
              <div className="absolute inset-0 flex">
                {slide.map((pid, imgIdx) => (
                  <div key={`${pid}-${imgIdx}`} className="relative h-full" style={{ flex: `0 0 ${100 / slide.length}%` }}>
                    <Image
                      publicId={pid}
                      alt=""
                      variant="bg"
                      fill
                      sizes="100vw"
                      objectFit={objectFit}
                      className="absolute inset-0"
                    />
                    <div className="absolute inset-y-0 right-0 w-px bg-white/5" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
