import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../content/images';

const HERO_BG = IMAGES.hero.background;

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          publicId={HERO_BG}
          alt="Hero background"
          variant="hero"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover"
          sizes="100vw"
        />
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        {/* Main transition to black at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        {/* Extra bottom vignette for seamless cut */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-widest leading-tight mb-4 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          CAIDEN MIKAEL DRI
        </h1>
        <h2 className="text-xl md:text-3xl font-sans tracking-[0.4em] text-brand-400 uppercase drop-shadow-lg font-bold">
          Prop Maker
        </h2>
        
        <p className="mt-8 md:mt-12 text-sm md:text-base font-sans text-white/60 max-w-2xl text-center leading-relaxed tracking-wide">
          I am a passionate artist and creator with a strong work ethic and an unwavering commitment to excellence. 
          Honesty, dedication, and creativity are the pillars of my work.
        </p>

        {/* Scroll indicator - fixed position and bridging the transition */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 animate-pulse">
           <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-sans">Discover Work</span>
           <div className="w-[1px] h-20 bg-gradient-to-b from-brand-400 via-white/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
