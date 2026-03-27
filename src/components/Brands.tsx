import OptimizedImage from './OptimizedImage';

const BRANDS = [
  'x_-_Attack_on_titan_sn2mkr',
  'x_-_Detroit_Become_Human_mikxlu',
  'Skyrim_gajcky',
  'Leon_xywbmb',
  'God_of_war_fzssrq',
  'Fate_xjczcv',
  'Elden_Ring_2_okov1l',
  'Elden_Ring_1_gslevl',
  'Diablo_otxcsa',
  'Demon_Slayer_wifdmp',
  'Como_entrenar_a_tu_dragon_luqvxc',
  'Aion_b7nzoh',
  'Chainsawman_i4lslc',
  'Apex_Legends_dbovff',
];

export default function Brands() {
  // Split brands into two halves for the two rows
  const midPoint = Math.ceil(BRANDS.length / 2);
  const row1 = BRANDS.slice(0, midPoint);
  const row2 = BRANDS.slice(midPoint);

  // Duplicate for seamless loop
  const displayRow1 = [...row1, ...row1, ...row1];
  const displayRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="w-full bg-[#050505] py-24 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-10 h-[1px] bg-brand-400/60"></div>
          <span className="text-brand-400 font-sans text-[10px] tracking-[0.5em] uppercase font-bold">Trusted Alliances</span>
        </div>
        <h2 className="text-white font-serif text-4xl md:text-5xl tracking-widest leading-tight">STRATEGIC PARTNERS</h2>
      </div>

      <div className="relative space-y-12 group">
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Moving Right to Left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap gap-32 md:gap-48 py-8 items-center">
            {displayRow1.map((publicId, idx) => (
              <div 
                key={`${publicId}-${idx}`} 
                className="flex items-center justify-center min-w-[220px] md:min-w-[320px] group/item cursor-pointer h-16 md:h-24"
              >
                <div className="relative w-full h-full transition-all duration-700">
                    <OptimizedImage
                        publicId={publicId}
                        alt={`Brand Logo ${idx}`}
                        variant="thumb"
                        objectFit="contain"
                        overflowHidden={false}
                        className="w-full h-full"
                        imgClassName="grayscale opacity-30 group-hover/item:grayscale-0 group-hover/item:opacity-100 group-hover/item:brightness-125 transition-all duration-700"
                    />
                    {/* Subtle ID fallback */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-10 transition-opacity pointer-events-none">
                        <span className="text-white text-[10px] uppercase tracking-widest">{publicId}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving Left to Right */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap gap-32 md:gap-48 py-8 items-center">
            {displayRow2.map((publicId, idx) => (
              <div 
                key={`${publicId}-${idx}`} 
                className="flex items-center justify-center min-w-[220px] md:min-w-[320px] group/item cursor-pointer h-16 md:h-24"
              >
                <div className="relative w-full h-full transition-all duration-700">
                    <OptimizedImage
                        publicId={publicId}
                        alt={`Brand Logo ${idx}`}
                        variant="thumb"
                        objectFit="contain"
                        overflowHidden={false}
                        className="w-full h-full"
                        imgClassName="grayscale opacity-30 group-hover/item:grayscale-0 group-hover/item:opacity-100 group-hover/item:brightness-125 transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-10 transition-opacity pointer-events-none">
                        <span className="text-white text-[10px] uppercase tracking-widest">{publicId}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 55s linear infinite;
        }
        .group:hover .animate-marquee-left,
        .group:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
