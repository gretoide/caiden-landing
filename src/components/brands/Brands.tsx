import OptimizedImage from '../ui/OptimizedImage';

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
  // Split brands into three rows
  const perRow = Math.ceil(BRANDS.length / 3);
  const row1 = BRANDS.slice(0, perRow);
  const row2 = BRANDS.slice(perRow, perRow * 2);
  const row3 = BRANDS.slice(perRow * 2);

  // Duplicate for seamless loop
  const displayRow1 = [...row1, ...row1, ...row1];
  const displayRow2 = [...row2, ...row2, ...row2];
  const displayRow3 = [...row3, ...row3, ...row3];

  return (
    <section id="partners" className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-10 mb-20 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
                <div className="flex items-center gap-4 mb-3 justify-center md:justify-start">
                    <div className="w-10 h-[1px] bg-brand-400/60"></div>
                    <span className="text-brand-400 font-sans text-[10px] tracking-[0.5em] uppercase font-bold">Trusted Alliances</span>
                </div>
                <h2 className="text-white font-serif text-4xl md:text-5xl tracking-widest leading-tight">STRATEGIC PARTNERS</h2>
            </div>
            <div className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-sans border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 max-w-xs">
                COLLABORATIONS // MARKETING // GLOBAL OUTREACH // CROSS-OVER EVENTS
            </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative space-y-12 group">
        {/* Row 1: Right to Left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap gap-24 md:gap-40 py-4 items-center">
            {displayRow1.map((publicId, idx) => (
              <div 
                key={`${publicId}-${idx}`} 
                className="flex items-center justify-center min-w-[200px] md:min-w-[280px] group/item cursor-pointer h-14 md:h-20"
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap gap-24 md:gap-40 py-4 items-center">
            {displayRow2.map((publicId, idx) => (
              <div 
                key={`${publicId}-${idx}`} 
                className="flex items-center justify-center min-w-[200px] md:min-w-[280px] group/item cursor-pointer h-14 md:h-20"
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Right to Left (Faster or Slower) */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap gap-24 md:gap-40 py-4 items-center" style={{ animationDuration: '50s' }}>
            {displayRow3.map((publicId, idx) => (
              <div 
                key={`${publicId}-${idx}`} 
                className="flex items-center justify-center min-w-[200px] md:min-w-[280px] group/item cursor-pointer h-14 md:h-20"
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
