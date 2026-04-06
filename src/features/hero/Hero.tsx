import Image from '../../shared/ui/Image';
import { HERO_BG } from './data/images';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image
          publicId={HERO_BG}
          alt="Hero background"
          variant="hero"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover opacity-60 scale-110 md:object-[center_35%]"
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
        <div className="flex items-center justify-center w-full mb-8 translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
          <span className="text-brand-400 font-sans text-[10px] md:text-xs tracking-[0.6em] -mr-[0.6em] uppercase font-bold text-center">― Asset Crafter ―</span>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif text-white tracking-widest leading-[0.85] mb-4 md:mb-8 italic translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.2s_forwards]">
          CAIDEN <span className="text-white/60 md:text-white/30 block md:inline">DRI</span>
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12 translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.4s_forwards]">
          <h2 className="text-sm md:text-xl font-sans tracking-[0.5em] -mr-[0.5em] text-white uppercase font-light">
            PROFESSIONAL <span className="font-bold text-brand-400">PROPMAKER</span>
          </h2>
          <span className="hidden md:block text-brand-400/80 font-sans text-sm tracking-widest font-bold">//</span>
          <h2 className="text-sm md:text-xl font-sans tracking-[0.5em] -mr-[0.5em] text-white uppercase font-light">
            REALITY <span className="font-bold text-brand-400">SCULPTOR</span>
          </h2>
        </div>
        
        <p className="max-w-xl text-xs md:text-sm font-sans text-white/40 leading-loose tracking-[0.2em] uppercase text-center translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_0.6s_forwards]">
          Bridging the gap between design vision and physical reality through a decade of mastery in cross-disciplinary fabrication.
        </p>


      </div>
    </section>
  );
}
