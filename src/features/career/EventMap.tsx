import { useState, useCallback, useMemo, useEffect, lazy, Suspense } from 'react';
import { Star, X, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../shared/ui/Image';
import { LOCATIONS } from './data';
import { useScrollLock } from '../../shared/hooks/useScrollLock';
import MediaLoader from '../../shared/ui/MediaLoader';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';
import type { CityMarker } from './InteractiveMap';

// mapbox-gl only downloads when the modal opens (or on hover/focus of a CTA, as a head start).
const loadInteractiveMap = () => import('./InteractiveMap');
const InteractiveMap = lazy(loadInteractiveMap);

// Configuration
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const DEFAULT_CENTER = { longitude: -63.6167, latitude: -38.4161 };

// Static preview via Mapbox Static Images API (max 1280px per side, so 640@2x).
function buildStaticMapUrl(markers: { lng: number; lat: number }[], size: number) {
  if (!MAPBOX_TOKEN) return '';
  const pins = markers
    .map(m => `pin-s+60a5fa(${m.lng.toFixed(4)},${m.lat.toFixed(4)})`)
    .join(',');
  const center = `${DEFAULT_CENTER.longitude},${DEFAULT_CENTER.latitude},3.1,0`;
  return `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${pins}/${center}/${size}x${size}@2x?access_token=${MAPBOX_TOKEN}&attribution=false&logo=false`;
}
// Decorative flight routes behind the Career section (viewBox 0..1000). Fixed timings keep render pure.
const FLIGHT_ROUTES: {
  d: string;
  width: number;
  dash: string;
  opacity: number;
  pulse: number;
  flow: number;
  plane?: { dur: number; delay: number };
}[] = [
  { d: 'M-100,200 Q300,400 500,100', width: 3.5, dash: '12 18', opacity: 0.8, pulse: 7, flow: 38, plane: { dur: 14, delay: 0 } },
  { d: 'M1100,800 Q700,600 500,900', width: 3.5, dash: '12 18', opacity: 0.8, pulse: 8, flow: 42, plane: { dur: 16, delay: 3 } },
  { d: 'M-50,700 Q400,500 200,950', width: 3, dash: '8 15', opacity: 0.7, pulse: 6, flow: 34 },
  { d: 'M1050,100 Q600,300 800,-50', width: 3, dash: '8 15', opacity: 0.7, pulse: 9, flow: 46, plane: { dur: 12, delay: 6 } },
  { d: 'M-80,480 Q350,300 700,520 T1080,420', width: 3, dash: '10 16', opacity: 0.65, pulse: 7.5, flow: 40, plane: { dur: 20, delay: 1.5 } },
  { d: 'M300,1080 Q450,650 980,600', width: 2.5, dash: '6 14', opacity: 0.6, pulse: 6.5, flow: 36 },
  { d: 'M620,-60 Q520,350 1080,300', width: 2.5, dash: '6 14', opacity: 0.6, pulse: 8.5, flow: 44, plane: { dur: 15, delay: 8 } },
  { d: 'M-60,940 Q500,780 760,1060', width: 2.5, dash: '8 15', opacity: 0.55, pulse: 7, flow: 39 },
];

// Custom Styles
const CUSTOM_STYLES = `
  .custom-scrollbar::-webkit-scrollbar { width: 3px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
`;

export default function EventMap() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -63.6167,
    latitude: -38.4161,
    zoom: 3.5,
    pitch: 0,
    bearing: 0
  });

  const [previewFailed, setPreviewFailed] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  // Lock page scroll (html + body) while the modal is open
  useScrollLock(isModalOpen);

  // Navigating to another section (hash change) closes the modal
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash !== '#events') setIsModalOpen(false);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const allEvents = useMemo(() => {
    return LOCATIONS.flatMap(loc => 
      loc.events.map((event: any) => ({
        ...event,
        id: `${loc.id}-${event.name.replace(/\s+/g, '-').toLowerCase()}`,
        provinceName: loc.provinceName,
        description: loc.description,
        locId: loc.id,
        cityId: `${loc.id}-${event.city.replace(/\s+/g, '-').toLowerCase()}`
      }))
    ).sort((a, b) => {
        const latestA = Math.max(...a.years.map(Number));
        const latestB = Math.max(...b.years.map(Number));
        return latestB - latestA;
    });
  }, []);

  const cityMarkers = useMemo(() => {
    const groups: Record<string, any> = {};
    LOCATIONS.forEach(loc => {
      loc.events.forEach((event: any) => {
        const cityId = `${loc.id}-${event.city.replace(/\s+/g, '-').toLowerCase()}`;
        if (!groups[cityId]) {
          groups[cityId] = {
            id: cityId,
            city: event.city,
            provinceName: loc.provinceName,
            lat: event.lat ?? loc.lat,
            lng: event.lng ?? loc.lng,
            eventCount: 0,
            events: []
          };
        }
        groups[cityId].eventCount++;
        groups[cityId].events.push(event);
      });
    });
    return Object.values(groups);
  }, []);

  const onMarkerClick = useCallback((marker: CityMarker) => {
    setSelectedCityId(marker.id);
    setViewState(prev => ({
      ...prev,
      longitude: marker.lng,
      latitude: marker.lat,
      zoom: 6, // Focus on the city
      transitionDuration: 1000
    }));
  }, []);

  const resetView = useCallback(() => {
    setSelectedCityId(null);
    setViewState(prev => ({
      ...prev,
      longitude: -63.6167,
      latitude: -38.4161,
      zoom: 3.5,
      transitionDuration: 1000
    }));
  }, []);

  const staticMap = useMemo(() => ({
    src: buildStaticMapUrl(cityMarkers, 640),
    srcSet: MAPBOX_TOKEN
      ? `${buildStaticMapUrl(cityMarkers, 400)} 800w, ${buildStaticMapUrl(cityMarkers, 640)} 1280w`
      : '',
  }), [cityMarkers]);

  const selectedCityMetadata = useMemo(() => cityMarkers.find(m => m.id === selectedCityId), [selectedCityId, cityMarkers]);
  const displayedEvents = useMemo(() => selectedCityId ? allEvents.filter(e => e.cityId === selectedCityId) : allEvents, [selectedCityId, allEvents]);

  const renderPreview = () => {
    if (!staticMap.src || previewFailed) {
      return (
        <div className="w-full h-full bg-[#050505] flex items-center justify-center opacity-40">
          <svg className="w-full h-full opacity-60" viewBox="0 0 400 600" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M100,50 L300,50 L350,150 L200,550 L50,150 Z" stroke="rgba(96,165,250,0.2)" />
          </svg>
        </div>
      );
    }
    return (
      <img
        src={staticMap.src}
        srcSet={staticMap.srcSet}
        sizes="(min-width: 1024px) 650px, 100vw"
        alt="Map of event participations across Argentina and the Southern Cone"
        loading="lazy"
        decoding="async"
        // A cached image can finish before React attaches onLoad.
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setPreviewLoaded(true);
        }}
        onLoad={() => setPreviewLoaded(true)}
        onError={() => setPreviewFailed(true)}
        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/preview:scale-[1.03]"
      />
    );
  };

  const renderMap = () => (
    <Suspense
      fallback={
        <div className="w-full h-full bg-[#050505]">
          <LoadingSpinner className="w-full h-full" delay={300} />
        </div>
      }
    >
      <InteractiveMap
        token={MAPBOX_TOKEN}
        viewState={viewState}
        onViewStateChange={(vs) => setViewState(vs)}
        onBackgroundClick={resetView}
        markers={cityMarkers}
        selectedCityId={selectedCityId}
        onMarkerClick={onMarkerClick}
      />
    </Suspense>
  );

  const openFullMap = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="events-section" className="w-full bg-[#050505] pt-24 md:pt-32 pb-12 md:pb-16 lg:py-12 relative overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-brand-400/10 to-transparent z-[1] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(96,165,250,0.08)_0%,transparent_60%)] z-0 pointer-events-none" />

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-60" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            {/* Plane silhouette pointing along +x so animateMotion's rotate="auto" follows the route */}
            <path id="career-plane" d="M14,0 L4,-2 L-2,-10 L-6,-10 L-2,-2 L-10,-2 L-13,-6 L-15,-6 L-13,0 L-15,6 L-13,6 L-10,2 L-2,2 L-6,10 L-2,10 L4,2 Z" />
          </defs>
          {FLIGHT_ROUTES.map((route, i) => (
            <motion.path
              key={`route-${i}`}
              id={`career-route-${i}`}
              d={route.d}
              stroke="#60a5fa"
              strokeWidth={route.width}
              strokeDasharray={route.dash}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: route.opacity * 0.4, strokeDashoffset: 0 }}
              animate={{ opacity: [route.opacity * 0.45, route.opacity, route.opacity * 0.45], strokeDashoffset: [0, -120] }}
              transition={{
                opacity: { duration: route.pulse, repeat: Infinity, ease: 'easeInOut' },
                strokeDashoffset: { duration: route.flow, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}
          {/* Planes travelling the routes (hidden for users who prefer reduced motion) */}
          <g className="motion-reduce:hidden">
            {FLIGHT_ROUTES.map((route, i) =>
              route.plane ? (
                <use key={`plane-${i}`} href="#career-plane" fill="#bfdbfe" opacity={0.9} className="drop-shadow-[0_0_6px_rgba(96,165,250,0.9)]">
                  <animateMotion dur={`${route.plane.dur}s`} begin={`${route.plane.delay}s`} repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href={`#career-route-${i}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur={`${route.plane.dur}s`} begin={`${route.plane.delay}s`} repeatCount="indefinite" />
                </use>
              ) : null
            )}
          </g>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="order-2 lg:order-1 flex justify-center relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none" />
               <div className="relative w-full max-w-[650px] lg:max-w-[clamp(360px,calc(100svh-160px),650px)] aspect-square bg-[#080808] border border-white/10 group/preview overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] hover:border-brand-400/40 transition-colors duration-500">
                  <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
                     <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.15) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
                     <motion.div animate={{ y: ['0%', '100%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute w-full h-[2px] bg-brand-400/30 z-20" />
                  </div>
                  <div className="absolute inset-x-0 inset-y-0 z-20 pointer-events-none">
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-brand-400/30" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-brand-400/30" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-brand-400/30" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-brand-400/30" />
                  </div>
                  <div className="absolute inset-0">
                    {renderPreview()}
                    <MediaLoader active={!!staticMap.src && !previewLoaded && !previewFailed} />
                  </div>
                  {/* Soft vignette to blend the static map with the section */}
                  <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,5,5,0.85)_100%)]" />

                  <button
                    type="button"
                    onClick={openFullMap}
                    onPointerEnter={loadInteractiveMap}
                    onFocus={loadInteractiveMap}
                    aria-label="Explore interactive map"
                    className="absolute inset-0 z-30 flex flex-col items-center justify-end sm:justify-center gap-3 sm:gap-4 p-4 sm:p-6 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-black/50 backdrop-blur-md border border-brand-400/40 group-hover/preview:border-brand-400 group-hover/preview:bg-brand-400/15 transition-all duration-500 shadow-[0_0_30px_rgba(96,165,250,0.25)]">
                      <MapPin size={16} className="text-brand-400 shrink-0" />
                      <span className="text-white text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.3em] sm:tracking-[0.4em]">Explore interactive map</span>
                    </span>
                    <span className="flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] text-white/70 uppercase tracking-[0.25em]">{allEvents.length} events</span>
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] text-white/70 uppercase tracking-[0.25em]">{cityMarkers.length} cities</span>
                    </span>
                  </button>
               </div>
            </div>

           <div className="order-1 lg:order-2 flex flex-col items-start lg:pl-12">
              <div className="mb-12 md:mb-16">
                  <h2 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[min(10rem,calc((100vw-260px)/9))] font-serif text-white tracking-widest leading-none mb-4 uppercase">CAREER</h2>
                  <div className="flex items-center gap-6 mt-2">
                     <p className="text-brand-400 font-sans text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">PARTICIPATIONS</p>
                     <div className="h-[1px] flex-grow bg-gradient-to-r from-brand-400 to-transparent opacity-30 mt-1"></div>
                  </div>
              </div>
              <div className="space-y-8">
                 <p className="text-white/40 font-sans text-sm md:text-base leading-relaxed tracking-wide max-w-sm border-l border-brand-400/20 pl-6 italic">A comprehensive operational chronicle of creative visualizations across the Southern Cone.</p>
                 <div className="flex flex-col gap-6">
                    <button onClick={openFullMap} onPointerEnter={loadInteractiveMap} onFocus={loadInteractiveMap} className="group relative px-10 py-5 bg-brand-400/5 hover:bg-brand-400 text-brand-400 hover:text-black font-sans text-[10px] uppercase font-bold tracking-[0.4em] border border-brand-400/20 hover:border-brand-400 transition-all duration-500 rounded-none">
                       <span className="relative z-10 flex items-center gap-3"><MapPin size={14} /> Explore the map</span>
                    </button>
                    <div className="flex items-center gap-4 text-white/20 text-[9px] font-mono tracking-[0.2em] font-bold">
                       <div className="w-2 h-2 rounded-full bg-brand-400/30 animate-pulse" /> REGISTRY // ACTIVE
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 overscroll-contain"
            onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm touch-none" />
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-[1400px] h-[85vh] h-[85dvh] bg-[#050505] border border-white/10 rounded-none shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row z-[101]">
                {/* Close — top-right corner of the panel, shared by mobile and desktop */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close map"
                  className="group/close absolute top-3 right-3 md:top-4 md:right-4 z-50 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-colors rounded-none"
                >
                  <X size={20} className="group-hover/close:rotate-90 transition-transform duration-300" />
                </button>
                <div className="w-full md:w-3/5 h-full relative overflow-hidden">
                   {renderMap()}
                   
                   <div className="absolute left-6 bottom-6 z-20 flex flex-col gap-4 pointer-events-none md:flex hidden">
                      <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-none text-[9px] text-white/40 uppercase tracking-[0.2em]">Scroll to zoom • Click cities to filter</div>
                   </div>

                   {/* Reset View Button - Desktop only, handled in floating panel for mobile */}
                   {selectedCityId && (
                     <motion.button 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       onClick={resetView}
                       className="absolute right-6 bottom-6 z-30 px-4 py-2 bg-brand-400 text-black font-sans text-[9px] uppercase font-bold tracking-widest shadow-xl hidden md:flex items-center gap-2 hover:bg-white transition-colors rounded-none"
                     >
                       <Star size={10} fill="currentColor" /> Reset View
                     </motion.button>
                   )}

                   {/* Mobile Floating Info Panel (Unified Aesthetic) */}
                   <AnimatePresence>
                     {selectedCityId && (
                       <motion.div 
                         initial={{ y: '100%', opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         exit={{ y: '100%', opacity: 0 }}
                         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                         className="absolute inset-x-0 bottom-0 z-40 md:hidden bg-[#0a0a0a] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[60vh] overflow-hidden rounded-none"
                       >
                         <div className="p-8 border-b border-white/5 bg-gradient-to-r from-brand-400/5 via-transparent to-transparent flex items-center justify-between">
                            <div className="flex flex-col gap-4">
                               <div className="flex items-center gap-4 text-brand-400 font-sans text-[9px] uppercase tracking-[0.5em] font-bold">
                                  <span>LOCATION DATA</span>
                               </div>
                               <h4 className="text-white font-serif text-3xl uppercase tracking-[0.1em] italic leading-tight">{selectedCityMetadata?.city}</h4>
                            </div>
                            <button onClick={resetView} className="p-3 text-white/40 hover:text-white border border-white/10 flex items-center justify-center rounded-none"><X size={18} /></button>
                         </div>
                         <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar bg-black/20">
                            {displayedEvents.map((event: any, idx) => (
                              <div key={idx} className="group flex items-start gap-6 border-b border-white/5 py-6 last:border-0">
                                 <div className="w-14 h-14 shrink-0 bg-[#020b1a] border border-white/5 flex items-center justify-center p-1 rounded-none shadow-lg">
                                    <Image publicId={event.logoId} alt={event.name} variant="thumb" className="w-full h-full" objectFit="contain" />
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                       <span className="text-brand-400 font-sans text-[9px] uppercase font-bold tracking-widest">{event.provinceName}</span>
                                       <div className="w-[1px] h-3 bg-white/10" />
                                       <span className="text-white/30 font-sans text-[8px] uppercase tracking-[0.2em]">{event.type}</span>
                                       <ChevronRight size={10} className="text-brand-400/40 ml-auto" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                       <h5 className="text-white font-serif text-lg uppercase tracking-wide leading-tight">{event.name}</h5>
                                       {event.rank === 'AWARD' && <Star size={12} fill="#facc15" className="text-yellow-400" />}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">{event.years.map((year: string, yidx: number) => <span key={yidx} className="px-1.5 py-0.5 bg-brand-400/10 border border-brand-400/20 text-[7px] text-brand-400 tracking-widest font-bold rounded-none">{year}</span>)}</div>
                                 </div>
                              </div>
                            ))}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>

                </div>

                {/* Sidebar - Desktop Only */}
                <div className="w-full md:w-2/5 h-full hidden md:flex flex-col bg-[#0a0a0a] border-l border-white/10 overflow-hidden rounded-none">
                    <div className="p-10 pr-20 [@media(max-height:800px)]:py-5 border-b border-white/5 bg-gradient-to-r from-brand-400/5 via-transparent to-transparent">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col gap-4">
                             <div className="flex items-center gap-4 text-brand-400 font-sans text-[9px] uppercase tracking-[0.5em] font-bold">
                                <span>{selectedCityId ? 'LOCATION DATA' : 'COLLABORATION REGISTER'}</span>
                             </div>
                             <h3 className="text-white font-serif text-4xl lg:text-5xl tracking-[0.1em] uppercase italic leading-tight">
                               {selectedCityId ? `${selectedCityMetadata?.city.toUpperCase()}` : 'GLOBAL LOG'}
                             </h3>
                          </div>
                       </div>
                    </div>
                   <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar bg-black/10 text-white/40 font-sans text-xs">
                      {displayedEvents.map((event: any, idx) => (
                        <div key={idx} className="group flex items-start gap-8 border-b border-white/5 pb-8 pt-4 last:border-0 transition-all">
                           <div className="w-16 h-16 shrink-0 bg-[#020b1a] border border-white/5 flex items-center justify-center p-1 rounded-none"><Image publicId={event.logoId} alt={event.name} variant="thumb" className="w-full h-full" objectFit="contain" imgClassName="p-1 group-hover:scale-110 transition-transform duration-700" /></div>
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2"><span className="text-brand-400 font-sans text-[10px] uppercase font-bold tracking-widest">{event.city}</span><div className="w-[1px] h-3 bg-white/10" /><span className="text-white/30 font-sans text-[9px] uppercase tracking-widest">{event.type}</span><ChevronRight size={10} className="text-brand-400/40 ml-auto" /></div>
                              <div className="flex items-center gap-3 mb-3"><h4 className="text-white font-serif text-xl tracking-wide uppercase">{event.name}</h4>{event.rank === 'AWARD' && <Star size={14} fill="#facc15" className="text-yellow-400" />}</div>
                              <div className="flex flex-wrap gap-1.5">{event.years.map((year: string, yidx: number) => <span key={yidx} className="px-2 py-0.5 bg-brand-400/10 border border-brand-400/20 rounded-none text-[8px] text-brand-400 tracking-wider">{year}</span>)}</div>
                           </div>
                        </div>
                      ))}
                   </div>
                    <div className="p-6 bg-[#050505] border-t border-white/5 flex items-center justify-between text-[8px] text-white/20 uppercase tracking-[0.5em] font-bold"><div><span>SOUTHERN CONE OPERATIONS</span></div><div><span>OPERATIONAL RECORD</span></div></div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{ __html: CUSTOM_STYLES }} />
    </section>
  );
}
