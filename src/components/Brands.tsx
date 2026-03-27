
const BRANDS = [
  { name: 'Diablo IV', logo: '/brands/placeholder.png' },
  { name: 'Elden Ring', logo: '/brands/placeholder.png' },
  { name: 'Skyrim', logo: '/brands/placeholder.png' },
  { name: 'Ubisoft', logo: '/brands/placeholder.png' },
  { name: 'SteelSeries', logo: '/brands/placeholder.png' },
  { name: 'CD Projekt Red', logo: '/brands/placeholder.png' },
  { name: 'Nvidia', logo: '/brands/placeholder.png' },
  { name: 'Razer', logo: '/brands/placeholder.png' },
];

export default function Brands() {
  // Duplicate brands for seamless loop
  const displayBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="w-full bg-black py-20 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-8 h-[1px] bg-brand-400"></div>
          <span className="text-brand-400 font-sans text-[10px] tracking-[0.5em] uppercase font-bold">Trusted By</span>
        </div>
        <h2 className="text-white font-serif text-3xl md:text-4xl tracking-wider">COLLABORATIONS & PARTNERS</h2>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 py-4">
          {displayBrands.map((brand, idx) => (
            <div 
              key={`${brand.name}-${idx}`} 
              className="flex items-center justify-center min-w-[150px] md:min-w-[200px]"
            >
              {/* For now using styled text as placeholder until PNGs are provided */}
              <div className="text-white/20 group-hover:text-white/40 transition-colors duration-500 font-serif text-2xl md:text-3xl tracking-[0.2em] grayscale hover:grayscale-0 hover:text-brand-400/80 transition-all duration-700 cursor-default uppercase">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
