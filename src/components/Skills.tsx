import { useState } from 'react';
import { CRAFTSMANSHIP } from '../content/images';
import OptimizedImage from './OptimizedImage';
import ImageModal from './ImageModal';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(CRAFTSMANSHIP[0].id);
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);

  const activeData = CRAFTSMANSHIP.find((c) => c.id === activeTab) || CRAFTSMANSHIP[0];

  return (
    <section id="skills" className="w-full bg-black relative flex flex-col justify-center overflow-hidden py-12 md:py-24">
      <div className="max-w-[1600px] mx-auto w-full px-0 md:px-6 flex flex-col gap-12 lg:gap-16">
        
        {/* Top visual section: Images (Left) + Logo (Right) */}
        <div className="relative w-full h-[50vh] min-h-[400px] md:h-[600px] flex overflow-hidden bg-black border-y border-white/5">
          
          {/* Left Side: Edge-to-Edge Diagonal Image Slices & Tabs */}
          <div className="w-[55%] md:w-[60%] h-full relative flex transform skew-x-12 origin-center -ml-16 overflow-hidden bg-black z-10 border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.8)]">
            {CRAFTSMANSHIP.map((craft) => {
              const isActive = activeTab === craft.id;
              return (
                <div
                  key={craft.id}
                  className={`relative flex-1 h-full cursor-pointer transition-all duration-700 ease-out group border-r border-white/5 last:border-r-0 overflow-hidden ${
                    isActive ? 'flex-[2]' : 'hover:flex-[1.2]'
                  }`}
                  onClick={() => setActiveTab(craft.id)}
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

          {/* Right Side: Logo Section */}
          <div className="flex-1 h-full bg-black relative flex flex-col items-center justify-center -ml-12 z-0">
            <div className="flex flex-col items-end pr-8 sm:pr-16 md:pr-24">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-serif text-white tracking-widest leading-[0.85] mb-6 italic">
                CAIDEN
              </h2>
              <div className="w-16 md:w-24 h-[1px] bg-brand-400 mb-6 self-end"></div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans tracking-[0.5em] text-white uppercase font-light">
                <span className="font-bold text-brand-400">COSPLAY</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom Content Section */}
        <div className="w-full max-w-4xl mx-auto flex flex-col px-6 md:px-0 mt-4 md:mt-8 animate-[fade-in-up_0.5s_ease-out_forwards]" key={activeData.id}>
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl lg:text-4xl font-serif text-white mb-1">{activeData.title}</h3>
            <h4 className="text-brand-400 font-sans tracking-[0.2em] text-xs uppercase mb-4">{activeData.subtitle}</h4>
            <p className="text-white/80 font-sans leading-relaxed text-base md:text-lg lg:text-xl mb-6 max-w-2xl">
              {activeData.description}
            </p>
            <div className="w-12 h-[1px] bg-white/20 mb-6"></div>
            <p className="text-white/40 font-sans leading-relaxed text-sm max-w-3xl mb-12">
              {activeData.expandedDetails}
            </p>

            {/* Dynamic Gallery */}
            {activeData.gallery && activeData.gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  Add Cloudinary public IDs to the `gallery` array in `{activeData.id}` inside `images.ts`
                </span>
              </div>
            )}
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
