import { useRef, useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS ---
// Elden Ring
import eldenMain from '../assets/caiden/1_elden_ring/banner_3.webp';
import eldenSub1 from '../assets/caiden/1_elden_ring/espalda.webp';
import eldenSub2 from '../assets/caiden/1_elden_ring/banner_0.webp';
import eldenDetail1 from '../assets/caiden/1_elden_ring/cabeza.webp';

// Diablo
import diablo1 from '../assets/caiden/2_diablo_iv/IMG_0857.webp';
import diablo2 from '../assets/caiden/2_diablo_iv/IMG_0672.webp';
import diablo3 from '../assets/caiden/2_diablo_iv/IMG_0824.webp';
const diabloBg = diablo3; 

// Skyrim
import skyrim1 from '../assets/caiden/3_skyrim/ig_foto_120.webp';
import skyrim2 from '../assets/caiden/3_skyrim/ig_foto_180.webp';
import skyrim3 from '../assets/caiden/3_skyrim/ig_foto_119.webp';
const skyrimBg = skyrim3; 

// Chainsaw Man
import chainsaw1 from '../assets/caiden/5_chainsaw/Chainsaw (4).webp';
import chainsaw2 from '../assets/caiden/5_chainsaw/Chainsaw (2).webp';
import chainsaw3 from '../assets/caiden/5_chainsaw/chainsaw_5.webp';  
const chainsawBg = chainsaw3; 

// ----------------------------------------------------------------------
// 1. ELDEN RING - Cinematic Parallax Collage
// ----------------------------------------------------------------------
const EldenRingSection = ({ setExpandedImage }: { setExpandedImage: (img: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Smooth Parallax for floating layers
      gsap.to('.parallax-slow', {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.parallax-fast', {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Subtle scale for the main hero
      gsap.to('.hero-main', {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[160vh] bg-black overflow-hidden py-32">
        {/* Fixed Immersive BG */}
        <div 
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none" 
            style={{backgroundImage: `url(${eldenMain})`, backgroundAttachment: 'fixed'}}>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
            
            {/* 1. Primary Hero Image */}
            <div className="hero-main relative w-full h-[80vh] md:h-[90vh] mb-32 group">
                <img 
                    src={eldenMain} 
                    className="w-full h-full object-cover shadow-[0_0_100px_rgba(0,0,0,0.8)] cursor-pointer grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000"
                    onClick={() => setExpandedImage(eldenMain)}
                    alt="Elden Ring Main"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-12 left-6 md:left-12">
                   <h2 className="text-6xl md:text-9xl font-serif text-white drop-shadow-2xl">Elden Ring</h2>
                   <p className="text-lg md:text-2xl font-sans tracking-widest text-[#eab308] mt-4 font-bold uppercase drop-shadow-md">Shadow of the Erdtree — 2024</p>
                </div>
            </div>

            {/* 2. Layered Detail Collage */}
            <div className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-x-48 gap-y-64 mt-32">
                
                {/* Helmet Detail (Slow) */}
                <div className="parallax-slow group flex flex-col">
                  <img 
                    src={eldenDetail1} 
                    className="w-full h-[55vh] object-cover shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer scale-100 group-hover:scale-[1.02]"
                    onClick={() => setExpandedImage(eldenDetail1)}
                    alt="Helmet Detail"
                  />
                  <div className="mt-8 pl-4 border-l border-[#eab308]/40">
                    <p className="text-white font-serif text-2xl mb-2">The Crucible Knight</p>
                    <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px]">Reinforced polymer & Hand-painted oxidation</p>
                  </div>
                </div>

                {/* Back Detail (Fast) */}
                <div className="parallax-fast group flex flex-col md:mt-32">
                  <img 
                    src={eldenSub1} 
                    className="w-full h-[65vh] object-cover shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer scale-100 group-hover:scale-[1.02]"
                    onClick={() => setExpandedImage(eldenSub1)}
                    alt="Back detail"
                  />
                  <div className="mt-8 pl-4 border-l border-[#eab308]/40">
                    <p className="text-white font-serif text-2xl mb-2">Artifact Anatomy</p>
                    <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px]">Integrated harness system for 20kg load-bearing</p>
                  </div>
                </div>

                {/* Construction shot (Fast) */}
                <div className="parallax-fast group flex flex-col md:-mt-32">
                  <img 
                    src={eldenSub2} 
                    className="w-full h-[50vh] object-cover shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer scale-100 group-hover:scale-[1.02]"
                    onClick={() => setExpandedImage(eldenSub2)}
                    alt="Construction"
                  />
                  <div className="mt-8 pl-4 border-l border-[#eab308]/40">
                    <p className="text-white font-serif text-2xl mb-2">Base Structure</p>
                    <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px]">Composite fiberglass & resin foundation</p>
                  </div>
                </div>

            </div>
        </div>
    </section>
  );
};


// ----------------------------------------------------------------------
// 2. DIABLO IV - Staggered 2-Grid Left
// ----------------------------------------------------------------------
const DiabloSection = ({ setExpandedImage }: { setExpandedImage: (img: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const onHover = (e: React.MouseEvent, scale: number) => {
    if (window.innerWidth < 768) return;
    gsap.to(e.currentTarget, { scale, duration: 0.6, ease: "power2.out" });
  };

  useGSAP(() => {
    if (!titleRef.current) return;
    
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(titleRef.current, {
        x: 350,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "top -15%",
          scrub: 3,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black py-24 flex items-center border-t border-white/5 overflow-hidden">
       {/* Background Image */}
       <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none" 
          style={{ backgroundImage: `url(${diabloBg})` }}
       ></div>
       
       <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 lg:gap-16 items-center relative z-10">
          
          {/* Title Block */}
          <div 
            ref={titleRef}
            className="w-full md:w-5/12 flex flex-col justify-center"
          >
             <h2 className="text-6xl md:text-8xl font-serif text-white leading-none drop-shadow-2xl">Diablo IV</h2>
             <p className="text-lg md:text-xl font-sans tracking-widest text-[#dc2626] mt-6 font-bold uppercase drop-shadow-lg">Blizzard Ent. — 2023</p>
             <p className="text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 border-[#dc2626]">
                Built to match the brutal, gothic world of Sanctuary. The core structure uses reinforced fiberglass for durability.
             </p>
          </div>
          
          {/* Two Images Grid */}
          <div className="w-full md:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-16 md:mt-0">
            <img 
              src={diablo1} 
              onClick={() => setExpandedImage(diablo1)} 
              onMouseEnter={(e) => onHover(e, 1.05)}
              onMouseLeave={(e) => onHover(e, 1)}
              className="w-full h-[50vh] md:h-[65vh] object-cover object-top cursor-pointer shadow-2xl" 
              alt="Diablo 1" 
            />
            <div className="flex flex-col md:mt-32">
              <img 
                src={diablo2} 
                onClick={() => setExpandedImage(diablo2)} 
                onMouseEnter={(e) => onHover(e, 1.05)}
                onMouseLeave={(e) => onHover(e, 1)}
                className="w-full h-[40vh] md:h-[55vh] object-cover cursor-pointer shadow-2xl" 
                alt="Diablo 2" 
              />
            </div>
          </div>
       
       </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 3. SKYRIM - Staggered 2-Grid Right
// ----------------------------------------------------------------------
const SkyrimSection = ({ setExpandedImage }: { setExpandedImage: (img: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const onHover = (e: React.MouseEvent, scale: number) => {
    if (window.innerWidth < 768) return;
    gsap.to(e.currentTarget, { scale, duration: 0.6, ease: "power2.out" });
  };

  useGSAP(() => {
    if (!titleRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(titleRef.current, {
        x: -350,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "top -15%",
          scrub: 3,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black py-24 flex items-center border-t border-white/5 overflow-hidden">
       {/* Background Image */}
       <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none" 
          style={{ backgroundImage: `url(${skyrimBg})` }}
       ></div>

       <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row-reverse gap-8 lg:gap-16 items-center relative z-10">
          
          <div 
            ref={titleRef}
            className="w-full md:w-5/12 flex flex-col justify-center"
          >
             <h2 className="text-6xl md:text-8xl font-serif text-white leading-none drop-shadow-2xl">Skyrim</h2>
             <p className="text-lg md:text-xl font-sans tracking-widest text-[#9ca3af] mt-6 font-bold uppercase drop-shadow-lg">Bethesda — 2011</p>
             <p className="text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 border-[#9ca3af]">
                Forging the Dragonborn's legacy. Intricate weathering and Nordic motifs carved into every piece.
             </p>
          </div>
          
          <div className="w-full md:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-16 md:mt-0">
            <div className="flex flex-col md:mt-32">
              <img 
                src={skyrim1} 
                onClick={() => setExpandedImage(skyrim1)} 
                onMouseEnter={(e) => onHover(e, 1.05)}
                onMouseLeave={(e) => onHover(e, 1)}
                className="w-full h-[40vh] md:h-[55vh] object-cover object-top cursor-pointer shadow-2xl" 
                alt="Skyrim 1" 
              />
            </div>
            <img 
              src={skyrim2} 
              onClick={() => setExpandedImage(skyrim2)} 
              onMouseEnter={(e) => onHover(e, 1.05)}
              onMouseLeave={(e) => onHover(e, 1)}
              className="w-full h-[50vh] md:h-[65vh] object-cover cursor-pointer shadow-2xl" 
              alt="Skyrim 2" 
            />
          </div>
       
       </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 4. CHAINSAW MAN - Staggered 2-Grid Left
// ----------------------------------------------------------------------
const ChainsawSection = ({ setExpandedImage }: { setExpandedImage: (img: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const onHover = (e: React.MouseEvent, scale: number) => {
    if (window.innerWidth < 768) return;
    gsap.to(e.currentTarget, { scale, duration: 0.6, ease: "power2.out" });
  };

  useGSAP(() => {
    if (!titleRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(titleRef.current, {
        x: 350,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "top -15%",
          scrub: 3,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black py-24 flex items-center border-t border-white/5 overflow-hidden">
       {/* Background Image */}
       <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none" 
          style={{ backgroundImage: `url(${chainsawBg})` }}
       ></div>

       <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 lg:gap-16 items-center relative z-10">
          
          <div 
            ref={titleRef}
            className="w-full md:w-5/12 flex flex-col justify-center"
          >
             <h2 className="text-6xl md:text-8xl font-serif text-white leading-none drop-shadow-2xl">Chainsaw <br/> Man</h2>
             <p className="text-lg md:text-xl font-sans tracking-widest text-[#f97316] mt-6 font-bold uppercase drop-shadow-lg">MAPPA — 2023</p>
             <p className="text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 border-[#f97316]">
                A highly complex helmet and weapon rig prioritizing visual accuracy. Incorporates active motorized electronics.
             </p>
          </div>
          
          <div className="w-full md:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-16 md:mt-0">
            <img 
              src={chainsaw1} 
              onClick={() => setExpandedImage(chainsaw1)} 
              onMouseEnter={(e) => onHover(e, 1.05)}
              onMouseLeave={(e) => onHover(e, 1)}
              className="w-full h-[50vh] md:h-[65vh] object-cover object-top cursor-pointer shadow-2xl" 
              alt="Chainsaw 1" 
            />
            <div className="flex flex-col md:mt-32">
              <img 
                src={chainsaw2} 
                onClick={() => setExpandedImage(chainsaw2)} 
                onMouseEnter={(e) => onHover(e, 1.05)}
                onMouseLeave={(e) => onHover(e, 1)}
                className="w-full h-[40vh] md:h-[55vh] object-cover cursor-pointer shadow-2xl" 
                alt="Chainsaw 2" 
              />
            </div>
          </div>
       
       </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Shared Image Modal with Zoom and Pan
// ----------------------------------------------------------------------
export const ImageModal = ({ src, onClose }: { src: string, onClose: () => void }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, [src]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(1, scale - e.deltaY * 0.01), 5);
    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handlePointerUp = () => setIsDragging(false);

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-default backdrop-blur-md transition-opacity duration-300 overflow-hidden"
      onClick={onClose}
      onWheel={handleWheel}
    >
      <div className="absolute top-4 left-4 text-white/50 flex items-center gap-2 pointer-events-none z-10 bg-black/50 px-3 py-1.5 rounded-full">
        <ZoomIn className="w-4 h-4" />
        <span className="text-xs uppercase tracking-widest font-sans">Scroll to Zoom / Double-Click</span>
      </div>
      <button 
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X className="w-8 h-8 md:w-12 md:h-12" />
      </button>
      <div 
        className="w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <img 
          src={src} 
          className="max-w-full max-h-full object-contain cursor-move touch-none animate-in zoom-in duration-300" 
          alt="Expanded view" 
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// MAIN EXPORT
// ----------------------------------------------------------------------
export default function FeaturedBuilds() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div id="work" className="bg-black w-full flex flex-col">
      <EldenRingSection setExpandedImage={setExpandedImage} />
      <DiabloSection setExpandedImage={setExpandedImage} />
      <SkyrimSection setExpandedImage={setExpandedImage} />
      <ChainsawSection setExpandedImage={setExpandedImage} />

      {expandedImage && (
        <ImageModal src={expandedImage} onClose={() => setExpandedImage(null)} />
      )}
    </div>
  );
}
