import { useEffect, useRef, useState } from 'react';
import Image from '../../../shared/ui/Image';
import type { CompactBuild } from '../data/compactBuilds';

type Props = {
  id: string;
  heading: string;
  builds: readonly CompactBuild[];
  onOpen: (publicId: string) => void;
};

const ROTATE_MS = 3000;
const PHOTO_CLASS = 'grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer';

/** Card photo that cross-fades through the gallery while on screen; thumbnails jump to one. */
function RotatingPhotos({ build, sizes, onOpen }: { build: CompactBuild; sizes: string; onOpen: (publicId: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const count = build.gallery.length;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // `active` is a dependency so that picking a thumbnail gives that photo its full time.
  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timeout = window.setTimeout(() => setActive((i) => (i + 1) % count), ROTATE_MS);
    return () => window.clearTimeout(timeout);
  }, [active, visible, count]);

  return (
    <div ref={ref} className="absolute inset-0">
      {build.gallery.map((publicId, index) => (
        <div
          key={publicId}
          className={`absolute inset-0 transition-opacity duration-700 ${index === active ? 'opacity-100 z-[1]' : 'opacity-0 pointer-events-none'}`}
        >
          {build.uncropped?.includes(publicId) && (
            <Image publicId={publicId} alt="" variant="thumb" fill zoom={1.2} imgClassName="blur-2xl brightness-50" />
          )}
          <Image
            publicId={publicId}
            alt={`${build.subtitle} photo ${index + 1}`}
            variant="full"
            fill
            sizes={sizes}
            objectFit={build.uncropped?.includes(publicId) ? 'contain' : 'cover'}
            imgClassName={PHOTO_CLASS}
            onClick={() => onOpen(publicId)}
          />
        </div>
      ))}
      <div className="absolute bottom-3 right-3 left-3 z-[2] flex justify-end gap-1.5 sm:gap-2">
        {build.gallery.map((publicId, index) => (
          <button
            key={publicId}
            type="button"
            aria-label={`Show photo ${index + 1} of ${build.subtitle}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={`relative h-14 w-11 sm:h-20 sm:w-16 overflow-hidden border transition-all ${index === active ? 'border-brand-400 opacity-100' : 'border-white/30 opacity-60 hover:opacity-100'}`}
          >
            <Image publicId={publicId} alt="" variant="thumb" fill sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Same header language as the full sections (title, franchise // year in color, barred description).
export default function CompactBuilds({ id, heading, builds, onOpen }: Props) {
  return (
    <section id={id} className="relative w-full bg-black border-t border-white/5 py-16 md:py-28">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <div className="w-10 h-[1px] bg-brand-400/80" />
          <span className="text-brand-400 font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">{heading}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          {builds.map((build) => {
            const [main, ...extras] = build.gallery;
            return (
              <article key={build.id} id={build.id} className={`flex min-w-0 flex-col ${build.wide ? 'sm:col-span-2' : ''}`}>
                {/* Square cards; a wide one is 2:1, so both end up the same height in a row. */}
                <div
                  className={`relative overflow-hidden border border-white/5 bg-[#0a0a0a] group ${build.split ? 'aspect-[1/2] grid grid-rows-2 gap-0.5 sm:grid-rows-1 sm:grid-cols-2' : 'aspect-square'} ${build.wide ? 'sm:aspect-auto sm:flex-1' : ''}`}
                >
                  {build.split ? (
                    build.gallery.map((publicId, index) => (
                      <div key={publicId} className="relative min-h-0">
                        <Image
                          publicId={publicId}
                          alt={`${build.subtitle} photo ${index + 1}`}
                          variant="full"
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          imgClassName={PHOTO_CLASS}
                          onClick={() => onOpen(publicId)}
                        />
                      </div>
                    ))
                  ) : build.rotate ? (
                    <RotatingPhotos build={build} sizes="(min-width: 1024px) 66vw, 100vw" onOpen={onOpen} />
                  ) : (
                  <>
                      <Image
                        publicId={main}
                        alt={`${build.subtitle} build`}
                        variant="full"
                        fill
                        sizes={build.wide ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                        zoom={build.zoom}
                        objectPosition={build.position}
                        imgClassName={PHOTO_CLASS}
                        onClick={() => onOpen(main)}
                      />
                      {extras.length > 0 && (
                        <div className="absolute bottom-3 right-3 left-3 z-[2] flex justify-end gap-2">
                          {extras.map((publicId, index) => (
                            <button
                              key={publicId}
                              type="button"
                              aria-label={`View photo ${index + 2} of ${build.subtitle}`}
                              onClick={() => onOpen(publicId)}
                              className="relative h-14 w-12 sm:h-20 sm:w-16 overflow-hidden border border-white/30 hover:border-white transition-colors"
                            >
                              <Image publicId={publicId} alt="" variant="thumb" fill sizes="64px" />
                            </button>
                          ))}
                        </div>
                      )}
                  </>
                  )}
                </div>
                <h2 className="mt-6 font-serif text-4xl leading-none text-white">{build.title}</h2>
                <p className={`mt-3 font-sans text-sm font-bold uppercase tracking-widest ${build.subtitleClassName}`}>{build.subtitle}</p>
                <p className={`mt-4 border-l-2 pl-4 font-sans text-sm leading-relaxed tracking-wide text-white/50 ${build.descBorderClassName}`}>
                  {build.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
