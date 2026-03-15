import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../content/images';

const HERO_BG = IMAGES.hero.background;

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          publicId={HERO_BG}
          alt="Hero background"
          variant="hero"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover opacity-60"
          sizes="100vw"
        />
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        {/* Main transition to black at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        {/* Extra bottom vignette for seamless cut */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8 translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
          <div className="w-12 h-[1px] bg-brand-400"></div>
          <span className="text-brand-400 font-sans text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold">EST. 2014 // ARTIFACT DESIGN</span>
          <div className="w-12 h-[1px] bg-brand-400"></div>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white tracking-widest leading-[0.85] mb-8 italic translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.2s_forwards]">
          CAIDEN <span className="text-white/20">DRI</span>
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mb-12 translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.4s_forwards]">
          <h2 className="text-sm md:text-xl font-sans tracking-[0.5em] text-white uppercase font-light">
            TECHNICAL <span className="font-bold text-brand-400">ARTISTRY</span>
          </h2>
          <div className="hidden md:block w-px h-6 bg-white/20"></div>
          <h2 className="text-sm md:text-xl font-sans tracking-[0.5em] text-white uppercase font-light">
            MATERIAL <span className="font-bold text-brand-400">PRECISION</span>
          </h2>
        </div>
        
        <p className="max-w-xl text-xs md:text-sm font-sans text-white/40 leading-loose tracking-[0.2em] uppercase text-center translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.6s_forwards]">
          Bridging the gap between digital vision and physical reality through a decade of mastery in cross-disciplinary fabrication.
        </p>

        {/* Scroll indicator - fixed position and bridging the transition */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6 animate-pulse">
           <span className="text-white/20 text-[10px] uppercase tracking-[0.6em] font-sans">Index // Explore</span>
           <div className="w-[1px] h-24 bg-gradient-to-b from-brand-400 via-brand-400/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
