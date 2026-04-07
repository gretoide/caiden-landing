import { useMemo } from 'react';
import SkillCarousel from './SkillCarousel';
import { SKILLS_CONTENT } from './data';

type Props = {
  activeTab: string;
  selectedSkillId: string;
  setSelectedSkillId: (id: string | null) => void;
  expertiseBgTick: number;
  setExpertiseBgTick: (tick: number | ((t: number) => number)) => void;
  setIsAutoPlayDisabled: (disabled: boolean) => void;
};

export default function SkillDetails({
  activeTab,
  selectedSkillId,
  setSelectedSkillId,
  expertiseBgTick,
  setExpertiseBgTick,
  setIsAutoPlayDisabled,
}: Props) {
  const activeMetadata = useMemo(() => 
    SKILLS_CONTENT.categories.find((c) => c.id === activeTab) || SKILLS_CONTENT.categories[0],
  [activeTab]);

  const selectedSubSkill = useMemo(() => 
    activeMetadata.subSkills.find(s => s.id === selectedSkillId),
  [activeMetadata, selectedSkillId]);

  const items = useMemo(() => {
    if (selectedSubSkill && selectedSubSkill.gallery && selectedSubSkill.gallery.length > 0) {
      return selectedSubSkill.gallery;
    }
    return activeMetadata.gallery && activeMetadata.gallery.length > 0 
      ? activeMetadata.gallery 
      : [{ type: 'image', publicId: activeMetadata.publicId } as const];
  }, [activeMetadata, selectedSubSkill]);

  const handleNext = () => {
    setExpertiseBgTick(t => t + 1);
    setIsAutoPlayDisabled(true);
  };
  const handlePrev = () => {
    setExpertiseBgTick(t => t - 1);
    setIsAutoPlayDisabled(true);
  };

  if (!selectedSubSkill) return null;

  return (
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
            {selectedSubSkill.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-sans tracking-widest uppercase text-brand-400 border border-brand-400/30 px-2 py-1 bg-black/40">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-3xl lg:text-5xl font-serif text-white mb-6 uppercase tracking-tight">
            {selectedSubSkill.title}
          </h3>
          <p className="text-white/70 font-sans leading-relaxed text-base md:text-lg mb-12 italic border-l-2 border-brand-400/40 pl-6">
            {selectedSubSkill.description}
          </p>
          <button onClick={() => setSelectedSkillId(null)} className="mt-auto flex items-center gap-3 text-white/30 font-sans text-[10px] tracking-[0.4em] uppercase hover:text-brand-400 transition-all border-t border-white/5 w-fit py-4">
            {SKILLS_CONTENT.uiLabels.back}
          </button>
        </div>

        <div className="lg:w-[55%] aspect-square lg:aspect-auto min-h-[400px] md:min-h-[600px] relative group overflow-hidden bg-[#020b1a] shadow-2xl">
           <SkillCarousel items={items} activeIndex={expertiseBgTick} onNext={handleNext} onPrev={handlePrev} />
        </div>
      </div>
    </div>
  );
}
