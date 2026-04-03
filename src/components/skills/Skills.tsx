import { useEffect, useMemo, useRef, useState } from 'react';
import { SKILLS_CONTENT } from './content';
import SubSkillCarousel from './SubSkillCarousel';
import OptimizedImage from '../ui/OptimizedImage';
import ImageModal from '../ui/ImageModal';

export default function Skills() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(SKILLS_CONTENT.categories[0].id);
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [isAutoPlayDisabled, setIsAutoPlayDisabled] = useState(false);

  const activeData = SKILLS_CONTENT.categories.find((c) => c.id === activeTab) || SKILLS_CONTENT.categories[0];
  const [expertiseBgTick, setExpertiseBgTick] = useState(0);
  
  const expertiseCarouselItems = useMemo(() => {
    const selectedSubSkill = activeData.subSkills.find(s => s.id === selectedSkillId);
    if (selectedSubSkill && selectedSubSkill.gallery && selectedSubSkill.gallery.length > 0) {
      return selectedSubSkill.gallery;
    }
    return activeData.gallery && activeData.gallery.length > 0 
      ? activeData.gallery 
      : [{ type: 'image', publicId: activeData.publicId } as const];
  }, [activeData, selectedSkillId]);

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

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#skills-')) {
        const id = hash.replace('#skills-', '');
        const exists = SKILLS_CONTENT.categories.find(c => c.id === id);
        if (exists) {
          setActiveTab(id);
          setSelectedSkillId(null);
          // Small delay to ensure the DOM is ready for calculations
          setTimeout(scrollToDetails, 100);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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
            {SKILLS_CONTENT.mainHeader.title}
          </h2>
        </div>

        {/* Top visual section: Tabs Banner (Responsive) */}
        <div className="relative w-[100vw] ml-[calc(50%-50vw)] overflow-hidden bg-black border-y border-white/5">
          
          {/* DESKTOP: Edge-to-Edge Horizontal Diagonal Image Slices */}
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
                    <OptimizedImage
                      publicId={craft.publicId}
                      alt={craft.title}
                      variant="hero"
                      fill
                      imgClassName="transition-transform duration-700 ease-out"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div
                      className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                        isActive ? 'opacity-0' : 'opacity-40 group-hover:opacity-10'
                      }`}
                    />
                  </div>
                  
                  <div 
                    className="absolute bottom-8 z-20 w-max pointer-events-none transition-all duration-500"
                    style={{
                      left: craft.id === SKILLS_CONTENT.categories[0].id ? 'calc(50% + 24px)' : 
                            craft.id === SKILLS_CONTENT.categories[SKILLS_CONTENT.categories.length - 1].id ? 'calc(50% - 24px)' : '50%',
                      transform: 'translateX(-50%) skewX(-12deg)'
                    }}
                  >
                        <div className={`flex flex-col items-center justify-center font-sans font-medium leading-tight tracking-[0.25em] uppercase transition-all duration-500 ${
                         isActive ? 'text-white text-sm' : 'text-white/40 text-xs group-hover:text-white/70'
                       }`}>
                          {/* Split by ' & ' or by space if it's 'Skilled Materials' to ensure two lines as requested */}
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

          {/* MOBILE: Vertical Diagonal Blade Stack */}
          <div className="flex md:hidden flex-col w-full bg-black">
            {SKILLS_CONTENT.categories.map((craft, index) => {
              const isActive = activeTab === craft.id;
              
              return (
                <div
                  key={craft.id}
                  className={`relative w-full cursor-pointer transition-all duration-500 ease-in-out group overflow-hidden border-b border-white/5 last:border-b-0 ${
                    isActive ? 'h-[160px]' : 'h-[60px] hover:h-[70px]'
                  }`}
                  onClick={() => {
                    setActiveTab(craft.id);
                    setExpertiseBgTick(0);
                    setSelectedSkillId(null);
                    requestAnimationFrame(() => requestAnimationFrame(scrollToDetails));
                  }}
                >
                  {/* Background Image with diagonal clip/skew look */}
                  <div className="absolute inset-0 scale-110">
                    <OptimizedImage
                      publicId={craft.publicId}
                      alt={craft.title}
                      variant="hero"
                      fill
                      imgClassName={`object-cover transition-all duration-1000 ${isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-40 grayscale-[0.5]'}`}
                      sizes="100vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-60' : 'opacity-85'}`} />
                  </div>

                  {/* Content for the mobile blade */}
                  <div className="absolute inset-0 flex items-center px-8 z-20">
                     <div className="flex flex-col items-start gap-0.5">
                        <span className={`font-sans tracking-[0.3em] uppercase transition-all duration-500 ${
                          isActive ? 'text-brand-400 text-[10px] font-bold' : 'text-white/20 text-[9px]'
                        }`}>
                          {`0${index + 1} // ${craft.subtitle.split(' & ')[0]}`}
                        </span>
                        <h3 className={`font-serif uppercase tracking-widest transition-all duration-500 ${
                          isActive ? 'text-white text-2xl' : 'text-white/40 text-sm'
                        }`}>
                          {craft.title}
                        </h3>
                        <div className={`h-[1px] bg-brand-400 transition-all duration-700 ${isActive ? 'w-12 opacity-100' : 'w-0 opacity-0'}`} />
                     </div>
                     
                     {/* Indicator for the active blade */}
                     {isActive && (
                       <div className="ml-auto animate-pulse">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                       </div>
                     )}
                  </div>
                  
                  {/* Diagonal Overlay Effect */}
                  <div 
                    className="absolute bottom-0 right-0 w-[40%] h-full bg-brand-400/5 transform skew-x-[-25deg] translate-x-[20%] pointer-events-none" 
                  />
                </div>
              );
            })}
          </div>

          {/* Spacer for desktop as the flex container above is absolute */}
          <div className="hidden md:block h-[600px]" />
        </div>

        {/* Bottom Content Section */}
        <div
          ref={detailsRef}
          className="w-full max-w-[1600px] mx-auto flex flex-col px-6 md:px-6 mt-4 md:mt-8"
          style={{ animation: 'fade-in-up 0.5s ease-out forwards' }}
          key={activeData.id}
        >
          {/* Header Section - Only show when no skill is selected or adapt it */}
          <div className={`flex flex-col gap-4 max-w-4xl mx-auto w-full transition-all duration-700 ${selectedSkillId ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mb-8'}`}>
            <h3 className="text-3xl lg:text-4xl font-serif text-white mb-1">{activeData.title}</h3>
            <h4 className="text-brand-400 font-sans tracking-[0.2em] text-xs uppercase mb-4">{activeData.subtitle}</h4>
            <p className="text-white/80 font-sans leading-relaxed text-base md:text-lg lg:text-xl mb-6 max-w-2xl">
              {activeData.description}
            </p>
            <div className="w-12 h-[1px] bg-white/20 mb-6"></div>
          </div>

            {!selectedSkillId ? (
              /* --- VIEW A: SKILL GRID (Image 1) --- */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeData.subSkills.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    className="group relative aspect-[4/5] overflow-hidden bg-[#020b1a] border border-white/5 cursor-pointer hover:border-brand-400/30 active:scale-[0.98] transition-all duration-500"
                  >
                    {skill.publicId && (
                      <OptimizedImage
                        publicId={skill.publicId}
                        alt={skill.title}
                        variant="thumb"
                        fill
                        imgClassName="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    {/* Glassmorphism Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                      {/* View Details CTA - Always Visible */}
                      <div className="absolute top-6 right-6 transition-all duration-500">
                        <div className="flex items-center gap-2 text-brand-400 font-sans text-[10px] tracking-[0.2em] uppercase bg-black/40 backdrop-blur-md border border-brand-400/30 px-3 py-2 rounded-sm group-hover:bg-brand-400 group-hover:text-black transition-colors duration-300">
                          {SKILLS_CONTENT.uiLabels.ctaExplore} <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>

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
                      <h4 className="text-2xl font-serif text-white mb-2 group-hover:text-brand-400 transition-colors duration-300">
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
              /* --- VIEW B: SKILL SPLIT (Image 2) --- */
              <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-right-4 duration-700">
                {/* Quick Navigation Cards */}
                <div className="flex justify-center gap-4 overflow-x-auto pb-4 -mx-2 px-2 custom-scrollbar">
                  {activeData.subSkills.map((skill) => {
                    const isActive = skill.id === selectedSkillId;
                    return (
                      <button
                        key={skill.id}
                        onClick={() => {
                          setSelectedSkillId(skill.id);
                          setExpertiseBgTick(0);
                          setIsAutoPlayDisabled(false); // Reset auto-play for new subskill
                        }}
                        className={`group relative shrink-0 w-32 md:w-40 aspect-video overflow-hidden border transition-all duration-500 ${
                          isActive ? 'border-brand-400 ring-1 ring-brand-400/50' : 'border-white/10 hover:border-brand-400/50'
                        }`}
                      >
                        {skill.publicId && (
                          <OptimizedImage
                            publicId={skill.publicId}
                            alt={skill.title}
                            variant="thumb"
                            fill
                            imgClassName={`object-cover transition-transform duration-700 ${isActive ? 'opacity-100' : 'opacity-100'}`}
                            sizes="160px"
                          />
                        )}
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
                {/* Left Side: Content */}
                <div className="lg:w-[45%] flex flex-col pt-4">
                  <div className="flex flex-col gap-2 mb-12">
                     <h3 className="text-white/30 font-serif text-xl lg:text-2xl">{activeData.title}</h3>
                     <h4 className="text-brand-400 font-sans tracking-[0.2em] text-[10px] uppercase">{activeData.subtitle}</h4>
                  </div>

                  <p className="text-white/80 font-sans leading-relaxed text-sm md:text-base mb-8 max-w-md">
                    {activeData.description}
                  </p>

                  <div className="w-8 h-[1px] bg-white/20 mb-12" />

                  <p className="text-white/50 font-sans leading-relaxed text-xs max-w-md mb-12 border-l border-white/10 pl-4 py-2">
                    {activeData.expandedDetails}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeData.subSkills.find(s => s.id === selectedSkillId)?.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-sans tracking-widest uppercase text-brand-400 border border-brand-400/30 px-2 py-1 bg-black/40 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl lg:text-5xl font-serif text-white mb-6 uppercase tracking-tight">
                    {activeData.subSkills.find(s => s.id === selectedSkillId)?.title}
                  </h3>
                  
                  <p className="text-white/70 font-sans leading-relaxed text-base md:text-lg mb-12 italic border-l-2 border-brand-400/40 pl-6">
                    {activeData.subSkills.find(s => s.id === selectedSkillId)?.description}
                  </p>

                  <button 
                    onClick={() => setSelectedSkillId(null)}
                    className="mt-auto flex items-center gap-3 text-white/30 font-sans text-[10px] tracking-[0.4em] uppercase hover:text-brand-400 transition-all group py-4 border-t border-white/5 w-fit hover:scale-105 origin-left"
                  >
                    {SKILLS_CONTENT.uiLabels.back}
                  </button>
                </div>

                {/* Right Side: Visuals */}
                <div className="lg:w-[55%] aspect-square lg:aspect-auto min-h-[400px] md:min-h-[600px] relative group overflow-hidden bg-[#020b1a] shadow-2xl">
                   <SubSkillCarousel
                      items={expertiseCarouselItems}
                      activeIndex={expertiseBgTick}
                      onNext={handleNext}
                      onPrev={handlePrev}
                   />
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
                    {SKILLS_CONTENT.uiLabels.explore}
                  </span>
                </div>
                <span className="hidden md:block text-white/25 font-sans text-[10px] tracking-[0.35em] uppercase">
                  {SKILLS_CONTENT.uiLabels.jump}
                </span>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {SKILLS_CONTENT.categories.map((craft) => {
                  const isActive = activeTab === craft.id;
                  return (
                    <button
                      key={craft.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(craft.id);
                        setExpertiseBgTick(0);
                        setSelectedSkillId(null);
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
