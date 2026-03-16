import { useRef } from 'react';
import { ALL_SKILLS } from '../content/skills';
import OptimizedImage from './OptimizedImage';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AllSkills() {
  const containerRef = useRef<HTMLElement>(null);

  // Group skills by category
  const groupedSkills = ALL_SKILLS.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof ALL_SKILLS>);

  const categories = ['Fabrication', 'Finishing & FX', 'Digital'];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.skill-card-anim', containerRef.current);
    
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      }
    });

    const headers = gsap.utils.toArray('.skill-header-anim', containerRef.current);
    gsap.from(headers, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="expertise" className="w-full bg-black relative flex flex-col justify-center overflow-hidden py-16 md:py-32 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col gap-16 lg:gap-24">
        
        {/* Section Header */}
        <div className="max-w-4xl skill-header-anim">
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif text-white tracking-widest leading-none mb-6">
            TECHNICAL EXPERTISE
          </h2>
          <div className="w-24 h-[1px] bg-brand-400 mb-6"></div>
          <p className="text-white/50 font-sans tracking-wide leading-relaxed text-lg max-w-2xl">
            A comprehensive spectrum of specialized disciplines mastered over a decade of continuous iteration. From raw structural fabrication to hyper-realistic digital detailing.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-col gap-20">
          {categories.map((category) => (
            <div key={category} className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
              {/* Category Title - Sticky on larger screens */}
              <div className="w-full md:w-1/4 md:sticky md:top-32 skill-header-anim">
                <h3 className="text-2xl md:text-3xl font-sans text-brand-400 uppercase tracking-[0.2em] mb-2">{category}</h3>
                <div className="w-8 h-[2px] bg-white/20"></div>
              </div>

              {/* Skills Cards Grid */}
              <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {groupedSkills[category]?.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="skill-card-anim group relative bg-[#020b1a] border border-white/5 overflow-hidden flex flex-col h-full min-h-[300px]"
                  >
                    {/* Background Image/Placeholder */}
                    <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                      {skill.publicId ? (
                         <OptimizedImage
                            publicId={skill.publicId}
                            alt={skill.title}
                            variant="thumb"
                            fill
                            imgClassName="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                         />
                      ) : (
                         <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 flex flex-col flex-grow justify-end">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {skill.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-sans tracking-widest uppercase text-brand-400 border border-brand-400/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h4 className="text-xl md:text-2xl font-serif text-white mb-3 group-hover:text-brand-400 transition-colors duration-300">
                        {skill.title}
                      </h4>
                      <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
