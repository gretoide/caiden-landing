import heroImage from '../assets/caiden/1_elden_ring/banner.webp';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Setup */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundAttachment: 'fixed' // Simple parallax effect
        }}
      >
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center mt-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-widest leading-tight mb-4 drop-shadow-2xl">
          CAIDEN MIKAEL DRI
        </h1>
        <h2 className="text-xl md:text-3xl font-sans tracking-[0.3em] text-brand-400 uppercase drop-shadow-lg">
          Prop Maker
        </h2>
        
        <p className="mt-8 md:mt-12 text-sm md:text-base font-sans text-white/80 max-w-2xl text-center leading-relaxed">
          I am a passionate artist and creator with a strong work ethic and an unwavering commitment to excellence. 
          Honesty, dedication, and creativity are the pillars of my work.
        </p>

        {/* Scroll indicator */}
        <div className="absolute -bottom-32 md:-bottom-48 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
