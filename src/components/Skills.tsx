import { useEffect, useMemo, useRef, useState } from 'react';
import { CRAFTSMANSHIP } from '../content/craftsmanship';
import { ALL_SKILLS } from '../content/skills';
import BackgroundCarousel from './BackgroundCarousel';
import OptimizedImage from './OptimizedImage';
import ImageModal from './ImageModal';

export default function Skills() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(CRAFTSMANSHIP[0].id);
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);

  const activeData = CRAFTSMANSHIP.find((c) => c.id === activeTab) || CRAFTSMANSHIP[0];
  const relatedExpertise = ALL_SKILLS.filter((s) => activeData.expertiseSkillIds.includes(s.id));
  const [expertiseBgTick, setExpertiseBgTick] = useState(0);
  const expertiseCarouselIds = useMemo(() => {
    const ids = new Set<string>();
    relatedExpertise.forEach((s) => {
      if (s.publicId) ids.add(s.publicId);
    });
    activeData.gallery?.forEach((g) => ids.add(g.id));
    if (activeData.publicId) ids.add(activeData.publicId);
    return Array.from(ids);
  }, [activeData, relatedExpertise]);
  const expertiseCarouselKey = useMemo(() => expertiseCarouselIds.join('|'), [expertiseCarouselIds]);

  useEffect(() => {
    if (relatedExpertise.length === 0) return;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => setExpertiseBgTick((t) => t + 1), 14000);
    return () => window.clearInterval(timer);
  }, [activeTab, relatedExpertise.length, expertiseCarouselKey]);

  const scrollToDetails = () => {
    const target = detailsRef.current;
    if (!target) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const NAV_OFFSET_PX = 120;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="skills" className="w-full bg-black relative flex flex-col justify-center overflow-hidden py-12 md:py-24">
      <div className="max-w-[1600px] mx-auto w-full px-0 md:px-6 flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="px-6 md:px-0 flex flex-col items-start text-left gap-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-brand-400/80" />
          </div>
          <h2 className="text-white font-serif tracking-[0.18em] text-4xl sm:text-5xl md:text-6xl leading-none drop-shadow-2xl">
            Skills
          </h2>
        </div>

        {/* Top visual section: Tabs Banner */}
        <div className="relative w-full h-[50vh] min-h-[400px] md:h-[600px] flex overflow-hidden bg-black border-y border-white/5">
          {/* Edge-to-Edge Diagonal Image Slices & Tabs */}
          <div className="w-full h-full relative flex transform skew-x-12 origin-center -ml-12 overflow-hidden bg-black z-10">
            {CRAFTSMANSHIP.map((craft) => {
              const isActive = activeTab === craft.id;
              return (
                <div
                  key={craft.id}
                  className={`relative flex-1 h-full cursor-pointer transition-all duration-700 ease-out group border-r border-white/5 last:border-r-0 overflow-hidden ${
                    isActive ? 'flex-[2]' : 'hover:flex-[1.2]'
                  }`}
                  onClick={() => {
                    setActiveTab(craft.id);
                    setExpertiseBgTick(0);
                    // Scroll to the details area after layout settles (mobile-friendly).
                    requestAnimationFrame(() => requestAnimationFrame(scrollToDetails));
                  }}
                >
                  {/* Image container un-skewed */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250%] h-full transform -skew-x-12 origin-center">
                    <OptimizedImage
                      publicId={craft.publicId}
                      alt={craft.title}
                      variant="hero"
                      fill
                      imgClassName="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Shadow overlay for text readability and inactive state */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div
                      className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                        isActive ? 'opacity-0' : 'opacity-70 group-hover:opacity-40'
                      }`}
                    />
                  </div>
                  
                  {/* Tab Title Integrated inside the slice */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -skew-x-12 z-20 w-max pointer-events-none transition-all duration-500">
                    <div className="flex flex-col items-center">
                      <span className={`font-sans tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-500 ${
                        isActive ? 'text-white text-xs md:text-sm font-semibold' : 'text-white/50 text-[10px] md:text-xs group-hover:text-white/80'
                      }`}>
                        {craft.title}
                       </span>
                      {/* Active Indicator Underline */}
                      <div className={`mt-2 h-[2px] bg-brand-400 transition-all duration-500 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                      }`} />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Content Section */}
        <div
          ref={detailsRef}
          className="w-full max-w-[1600px] mx-auto flex flex-col px-6 md:px-6 mt-4 md:mt-8 animate-[fade-in-up_0.5s_ease-out_forwards]"
          key={activeData.id}
        >
          <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
            <h3 className="text-3xl lg:text-4xl font-serif text-white mb-1">{activeData.title}</h3>
            <h4 className="text-brand-400 font-sans tracking-[0.2em] text-xs uppercase mb-4">{activeData.subtitle}</h4>
            <p className="text-white/80 font-sans leading-relaxed text-base md:text-lg lg:text-xl mb-6 max-w-2xl">
              {activeData.description}
            </p>
            <div className="w-12 h-[1px] bg-white/20 mb-6"></div>
            <p className="text-white/40 font-sans leading-relaxed text-sm max-w-3xl mb-12">
              {activeData.expandedDetails}
            </p>
          </div>

            {/* Dynamic Gallery */}
            {activeData.gallery && activeData.gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
                {activeData.gallery.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-square overflow-hidden bg-[#020b1a] border border-white/5 group cursor-pointer"
                    onClick={() => setExpandedPublicId(item.id)}
                  >
                    <OptimizedImage
                      publicId={item.id}
                      alt={item.title || `${activeData.title} gallery image ${idx + 1}`}
                      variant="thumb"
                      fill
                      imgClassName="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {/* Hover Title Overlay */}
                    {item.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex flex-col justify-end p-4">
                        <span className="text-white font-sans text-xs md:text-sm tracking-widest font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          {item.title}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full border border-dashed border-white/10 p-12 flex flex-col items-center justify-center text-center bg-white/5 rounded-lg group transition-colors hover:border-white/20">
                <span className="text-white/30 text-xs md:text-sm font-sans tracking-[0.2em] uppercase mb-2 group-hover:text-white/50 transition-colors">
                  Gallery Space Ready
                </span>
                <span className="text-white/20 text-[10px] md:text-xs font-sans">
                  Add Cloudinary public IDs to the `gallery` array in `{activeData.id}` inside `craftsmanship.ts`
                </span>
              </div>
            )}

            {/* Related Expertise */}
            {relatedExpertise.length > 0 && (
              <div className="mt-16 relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto w-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-[1px] bg-brand-400/80"></div>
                    <span className="text-brand-400 font-sans text-[10px] tracking-[0.5em] uppercase font-bold">
                      Related Expertise
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 md:gap-6 w-full">
                    {relatedExpertise.map((skill, idx) => {
                      const cardIds = (() => {
                        const ids = new Set<string>();
                        if (skill.publicId) ids.add(skill.publicId);
                        activeData.gallery?.forEach((g) => ids.add(g.id));
                        if (activeData.publicId) ids.add(activeData.publicId);
                        return Array.from(ids);
                      })();

                      return (
                        <div
                          key={skill.id}
                          className="group relative w-full border border-white/5 bg-black/35 backdrop-blur-md overflow-hidden min-h-[320px] md:min-h-[380px] flex"
                        >
                          <div className="absolute inset-0 z-0 pointer-events-none">
                            {cardIds.length > 0 && (
                              <BackgroundCarousel
                                publicIds={cardIds}
                                activeIndex={expertiseBgTick + idx}
                                imagesPerSlide={3}
                                intervalMs={14000}
                                slideMs={2400}
                                className="absolute inset-0 opacity-50 blur-sm scale-105 saturate-110 contrast-105"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
                          </div>

                          <div className="relative p-6 md:p-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {skill.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[9px] font-sans tracking-widest uppercase text-brand-400 border border-brand-400/30 px-2 py-1 bg-black/40 backdrop-blur-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <h4 className="text-2xl md:text-3xl font-serif text-white mb-3 group-hover:text-brand-400 transition-colors duration-300">
                              {skill.title}
                            </h4>
                            <p className="text-white/65 font-sans text-sm md:text-base leading-relaxed">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Tabs (quick jump) */}
            <div className="mt-14 pt-10 border-t border-white/5">
              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-brand-400/80"></div>
                  <span className="text-brand-400 font-sans text-[10px] tracking-[0.5em] uppercase font-bold">
                    Explore All Skills
                  </span>
                </div>
                <span className="hidden md:block text-white/25 font-sans text-[10px] tracking-[0.35em] uppercase">
                  Jump to section
                </span>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {CRAFTSMANSHIP.map((craft) => {
                  const isActive = activeTab === craft.id;
                  return (
                    <button
                      key={craft.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(craft.id);
                        setExpertiseBgTick(0);
                        requestAnimationFrame(() => requestAnimationFrame(scrollToDetails));
                      }}
                      className={[
                        'shrink-0 px-4 py-3 border font-sans uppercase tracking-[0.25em] text-[10px] transition-colors duration-300',
                        isActive
                          ? 'border-brand-400/60 text-white bg-brand-400/10'
                          : 'border-white/10 text-white/55 bg-black/30 hover:text-white/80 hover:border-white/20',
                      ].join(' ')}
                    >
                      {craft.title}
                    </button>
                  );
                })}
              </div>
            </div>
        </div>

      </div>

      {expandedPublicId && (
        <ImageModal 
          publicId={expandedPublicId} 
          onClose={() => setExpandedPublicId(null)} 
        />
      )}
    </section>
  );
}
