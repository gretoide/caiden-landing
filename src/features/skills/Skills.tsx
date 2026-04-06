import { useEffect, useMemo, useRef, useState } from 'react';
import { SKILLS_CONTENT } from './data';
import SkillCarousel from './SkillCarousel';

import Image from '../../shared/ui/Image';
import Lightbox from '../../shared/ui/Lightbox';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(SKILLS_CONTENT.categories[0].id);
  
  // All data is now loaded synchronously
  const activeMetadata = useMemo(() => 
    SKILLS_CONTENT.categories.find((c) => c.id === activeTab) || SKILLS_CONTENT.categories[0],
  [activeTab]);

  // Other UI state
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [isAutoPlayDisabled, setIsAutoPlayDisabled] = useState(false);
  const [expertiseBgTick, setExpertiseBgTick] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Lighting Effect for Mobile (No height change)
  useGSAP(() => {
    if (!isMobile) return;

    const blades = gsap.utils.toArray('.mobile-blade-anim');
    const container = document.querySelector('.mobile-blades-wrapper');
    if (!container || blades.length === 0) return;

    // Individual blade transitions tied to scroll position
    blades.forEach((blade: any) => {
      const img = blade.querySelector('.mobile-blade-img-inner');
      const text = blade.querySelector('.mobile-blade-content');
      const isActive = blade.classList.contains('is-active');
      
      // If it's active, it's always bright and standout (no scale)
      if (isActive) {
        gsap.set(img, { filter: "grayscale(0) brightness(1.4)" });
        gsap.set(text, { opacity: 1, filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3)) drop-shadow(0 0 10px rgba(0,0,0,0.8))" });
        return; 
      }

      // Initial state for non-active blades: dim and desaturated but legible
      gsap.set(img, { filter: "grayscale(0.8) brightness(0.35)" });
      gsap.set(text, { opacity: 0.25, filter: "none" });

      // Create a seamless Timeline for entering and leaving the focal point
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blade,
          start: "top 95%",
          end: "bottom 5%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      tl.to(img, { 
        filter: "grayscale(0) brightness(1.6)",
        ease: "power2.inOut",
        duration: 0.5 
      }, 0)
      .to(text, { 
        opacity: 1,
        filter: "drop-shadow(0 0 20px rgba(255,255,255,0.4)) drop-shadow(0 0 10px rgba(0,0,0,0.9))",
        ease: "power2.inOut",
        duration: 0.5 
      }, 0)
      .to(img, { 
        filter: "grayscale(0.8) brightness(0.35)",
        ease: "power2.inOut",
        duration: 0.5 
      }, 0.5)
      .to(text, { 
        opacity: 0.25,
        filter: "none",
        ease: "power2.inOut",
        duration: 0.5 
      }, 0.5);
    });
  }, { scope: containerRef, dependencies: [activeTab, isMobile] });
  
  const expertiseCarouselItems = useMemo(() => {
    const selectedSubSkill = activeMetadata.subSkills.find(s => s.id === selectedSkillId);
    if (selectedSubSkill && selectedSubSkill.gallery && selectedSubSkill.gallery.length > 0) {
      return selectedSubSkill.gallery;
    }
    return activeMetadata.gallery && activeMetadata.gallery.length > 0 
      ? activeMetadata.gallery 
      : [{ type: 'image', publicId: activeMetadata.publicId } as const];
  }, [activeMetadata, selectedSkillId]);

  const expertiseCarouselKey = useMemo(() => 
    expertiseCarouselItems.map(item => item.publicId).join('|'), 
  [expertiseCarouselItems]);

  useEffect(() => {
    if (isAutoPlayDisabled || !selectedSkillId) return;
    const interval = setInterval(() => {
      setExpertiseBgTick(t => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlayDisabled, expertiseCarouselKey, selectedSkillId]);

  const handleNext = () => {
    setExpertiseBgTick(t => t + 1);
    setIsAutoPlayDisabled(true);
  };
  const handlePrev = () => {
    setExpertiseBgTick(t => t - 1);
    setIsAutoPlayDisabled(true);
  };

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

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#skills-')) {
        const id = hash.replace('#skills-', '');
        const exists = SKILLS_CONTENT.categories.find(c => c.id === id);
        if (exists) {
          setActiveTab(id);
          setSelectedSkillId(null);
          setTimeout(scrollToDetails, 100);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-black relative flex flex-col justify-center overflow-hidden py-12 md:py-24">
      <div className="max-w-[1600px] mx-auto w-full px-0 md:px-6 flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="px-6 md:px-0 flex flex-col items-start text-left gap-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-brand-400/80" />
          </div>
          <h2 className="text-white font-serif tracking-[0.18em] text-4xl sm:text-5xl md:text-6xl leading-none drop-shadow-2xl">
            {SKILLS_CONTENT.mainHeader.title}
          </h2>
        </div>

        {/* Top visual section: Tabs Banner */}
        <div className="relative w-[100vw] ml-[calc(50%-50vw)] overflow-hidden bg-black border-y border-white/5">
          <div className="hidden md:flex absolute top-0 bottom-0 -left-[64px] -right-[64px] transform skew-x-12 origin-center overflow-hidden bg-black z-10 h-[600px]">
             {SKILLS_CONTENT.categories.map((craft, index) => {
              const isActive = activeTab === craft.id;
              const isEdge = index === 0 || index === SKILLS_CONTENT.categories.length - 1;
              const flexClass = isActive 
                ? (isEdge ? 'flex-[2.2]' : 'flex-[2]') 
                : (isEdge ? 'flex-[1.6] hover:flex-[1.8]' : 'flex-1 hover:flex-[1.2]');

              return (
                <div
                  key={craft.id}
                  className={`relative h-full cursor-pointer transition-all duration-700 ease-out group border-r border-white/5 last:border-r-0 overflow-hidden ${flexClass}`}
                  onClick={() => {
                    setActiveTab(craft.id);
                    setExpertiseBgTick(0);
                    setSelectedSkillId(null);
                    requestAnimationFrame(() => requestAnimationFrame(scrollToDetails));
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250%] h-full transform -skew-x-12 origin-center">
                    <Image
                      publicId={craft.publicId}
                      alt={craft.title}
                      variant="hero"
                      fill
                      imgClassName="transition-transform duration-700 ease-out"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-40 group-hover:opacity-10'}`} />
                  </div>
                  
                  <div 
                    className="absolute bottom-8 z-20 w-max pointer-events-none transition-all duration-500"
                    style={{
                      left: craft.id === SKILLS_CONTENT.categories[0].id ? 'calc(50% + 24px)' : 
                            craft.id === SKILLS_CONTENT.categories[SKILLS_CONTENT.categories.length - 1].id ? 'calc(50% - 24px)' : '50%',
                      transform: 'translateX(-50%) skewX(-12deg)'
                    }}
                  >
                    <div className={`flex flex-col items-center justify-center font-sans font-medium leading-tight tracking-[0.25em] uppercase transition-all duration-500 ${isActive ? 'text-white text-sm' : 'text-white/40 text-xs group-hover:text-white/70'}`}>
                      {(craft.title === 'Skilled Materials' 
                        ? craft.title.split(' ') 
                        : craft.title.replace(' & ', '\n&\n').split('\n')
                      ).map((line, i) => (
                        <span key={i} className={line === '&' ? 'text-[0.8em] opacity-60' : ''}>{line}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mobile-blades-wrapper flex md:hidden flex-col w-full bg-black">
            {SKILLS_CONTENT.categories.map((craft, index) => {
              const isActive = activeTab === craft.id;
              return (
                <div
                  key={craft.id}
                  className={`mobile-blade-anim relative w-full cursor-pointer transition-colors duration-500 ease-in-out group overflow-hidden border-b border-white/5 last:border-b-0 ${isActive ? 'h-[160px] is-active' : 'h-[60px]'}`}
                  onClick={() => {
                    setActiveTab(craft.id);
                    setExpertiseBgTick(0);
                    setSelectedSkillId(null);
                    requestAnimationFrame(() => requestAnimationFrame(scrollToDetails));
                  }}
                >
                  <div className="absolute inset-0 mobile-blade-bg">
                    <div className="mobile-blade-img-inner absolute inset-0">
                       <Image
                         publicId={craft.publicId}
                         alt={craft.title}
                         variant="hero"
                         fill
                         imgClassName={`object-cover transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-80'}`}
                         sizes="100vw"
                       />
                       <div className={`absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/10 transition-opacity duration-500 ${isActive ? 'opacity-90' : 'opacity-100'}`} />
                    </div>
                  </div>

                  <div className="mobile-blade-content absolute inset-0 flex items-center px-8 z-20">
                     <div className="flex flex-col items-start gap-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        <span className={`font-sans tracking-[0.3em] uppercase transition-all duration-500 ${isActive ? 'text-brand-400 text-[10px] font-bold' : 'text-white/20 text-[9px]'}`}>
                          {`0${index + 1} // ${craft.subtitle.split(' & ')[0]}`}
                        </span>
                        <h3 className={`font-serif uppercase tracking-widest transition-all duration-500 ${isActive ? 'text-white text-2xl' : 'text-white/40 text-sm'}`}>
                          {craft.title}
                        </h3>
                        <div className={`h-[1px] bg-brand-400 transition-all duration-700 ${isActive ? 'w-12 opacity-100' : 'w-0 opacity-0'}`} />
                     </div>
                     {isActive && (
                       <div className="ml-auto animate-pulse">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                       </div>
                     )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block h-[600px]" />
        </div>

        {/* Content Section */}
        <div
          ref={detailsRef}
          className="relative w-full max-w-[1600px] mx-auto flex flex-col px-6 md:px-6 mt-4 md:mt-8 min-h-[500px]"
          style={{ animation: 'fade-in-up 0.5s ease-out forwards' }}
          key={activeTab}
        >
          <div className="opacity-100 transition-all duration-700">
            {!selectedSkillId ? (
              /* --- VIEW A: SKILL GRID --- */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeMetadata.subSkills.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    className="group relative aspect-[4/5] overflow-hidden bg-[#020b1a] border border-white/5 cursor-pointer hover:border-brand-400/30 active:scale-[0.98] transition-all duration-500"
                  >
                    {skill.publicId && (
                      <Image
                        publicId={skill.publicId}
                        alt={skill.title}
                        variant="thumb"
                        fill
                        imgClassName="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                      <div className="absolute top-6 right-6">
                        <div className="flex items-center gap-2 text-brand-400 font-sans text-[10px] tracking-[0.2em] uppercase bg-black/40 backdrop-blur-md border border-brand-400/30 px-3 py-2 rounded-sm group-hover:bg-brand-400 group-hover:text-black transition-colors duration-300">
                          {SKILLS_CONTENT.uiLabels.ctaExplore} <span>→</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skill.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-sans tracking-widest uppercase text-brand-400 border border-brand-400/30 px-2 py-1 bg-black/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-2xl font-serif text-white mb-2 group-hover:text-brand-400 transition-colors duration-300 drop-shadow-lg">
                        {skill.title}
                      </h4>
                      <p className="text-white/50 font-sans text-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* --- VIEW B: SKILL SPLIT --- */
              <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="flex justify-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  {activeMetadata.subSkills.map((skill) => {
                    const isActive = skill.id === selectedSkillId;
                    return (
                      <button
                        key={skill.id}
                        onClick={() => { setSelectedSkillId(skill.id); setExpertiseBgTick(0); setIsAutoPlayDisabled(false); }}
                        className={`group relative shrink-0 w-32 md:w-40 aspect-video overflow-hidden border transition-all duration-500 ${isActive ? 'border-brand-400 ring-1 ring-brand-400/50' : 'border-white/10 hover:border-brand-400/50'}`}
                      >
                        {skill.publicId && <Image publicId={skill.publicId} alt={skill.title} variant="thumb" fill imgClassName="object-cover" sizes="160px" />}
                        <div className={`absolute inset-0 bg-black/20 ${isActive ? 'bg-transparent' : ''}`} />
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black to-transparent">
                          <span className={`text-[8px] font-sans uppercase tracking-[0.2em] font-bold block truncate ${isActive ? 'text-brand-400' : 'text-white/60'}`}>
                            {skill.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-[45%] flex flex-col pt-4">
                    <div className="flex flex-col gap-2 mb-12">
                       <h3 className="text-white/30 font-serif text-xl lg:text-2xl">{activeMetadata.title}</h3>
                       <h4 className="text-brand-400 font-sans tracking-[0.2em] text-[10px] uppercase">{activeMetadata.subtitle}</h4>
                    </div>
                    <p className="text-white/80 font-sans leading-relaxed text-sm md:text-base mb-8 max-w-md">
                      {activeMetadata.description}
                    </p>
                    <div className="w-8 h-[1px] bg-white/20 mb-12" />
                    <p className="text-white/50 font-sans leading-relaxed text-xs max-w-md mb-12 border-l border-white/10 pl-4 py-2">
                      {activeMetadata.expandedDetails}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeMetadata.subSkills.find(s => s.id === selectedSkillId)?.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-sans tracking-widest uppercase text-brand-400 border border-brand-400/30 px-2 py-1 bg-black/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl lg:text-5xl font-serif text-white mb-6 uppercase tracking-tight">
                      {activeMetadata.subSkills.find(s => s.id === selectedSkillId)?.title}
                    </h3>
                    <p className="text-white/70 font-sans leading-relaxed text-base md:text-lg mb-12 italic border-l-2 border-brand-400/40 pl-6">
                      {activeMetadata.subSkills.find(s => s.id === selectedSkillId)?.description}
                    </p>
                    <button onClick={() => setSelectedSkillId(null)} className="mt-auto flex items-center gap-3 text-white/30 font-sans text-[10px] tracking-[0.4em] uppercase hover:text-brand-400 transition-all border-t border-white/5 w-fit py-4">
                      {SKILLS_CONTENT.uiLabels.back}
                    </button>
                  </div>

                  <div className="lg:w-[55%] aspect-square lg:aspect-auto min-h-[400px] md:min-h-[600px] relative group overflow-hidden bg-[#020b1a] shadow-2xl">
                     <SkillCarousel items={expertiseCarouselItems} activeIndex={expertiseBgTick} onNext={handleNext} onPrev={handlePrev} />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Tabs (quick jump) */}
            <div className="mt-14 pt-10 border-t border-white/5">
              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-brand-400/80" />
                  <span className="text-brand-400 font-sans text-[10px] tracking-[0.5em] uppercase font-bold">{SKILLS_CONTENT.uiLabels.explore}</span>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {SKILLS_CONTENT.categories.map((craft) => (
                  <button
                    key={craft.id}
                    onClick={() => { setActiveTab(craft.id); setExpertiseBgTick(0); setSelectedSkillId(null); requestAnimationFrame(() => requestAnimationFrame(scrollToDetails)); }}
                    className={`shrink-0 px-4 py-3 border font-sans uppercase tracking-[0.25em] text-[10px] transition-colors duration-300 ${activeTab === craft.id ? 'border-brand-400/60 text-white bg-brand-400/10' : 'border-white/10 text-white/55 bg-black/30 hover:text-white/80'}`}
                  >
                    {craft.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {expandedPublicId && <Lightbox publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />}
    </section>
  );
}
