import { useState, useCallback, useMemo, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { Star, X, ChevronRight } from 'lucide-react';
import type { LineLayer } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../shared/ui/Image';
import { LOCATIONS } from './data';
import 'mapbox-gl/dist/mapbox-gl.css';

// Configuration
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
// Custom Styles
const CUSTOM_STYLES = `
  .custom-scrollbar::-webkit-scrollbar { width: 3px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
  .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib { display: none !important; }
  .mapboxgl-ctrl-group { background: rgba(10, 10, 10, 0.7) !important; backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 4px !important; }
  .mapboxgl-ctrl-icon { filter: invert(1) brightness(2) opacity(0.5); }
`;

export default function EventMap() {
  const [isActivated, setIsActivated] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -63.6167,
    latitude: -38.4161,
    zoom: 3.5,
    pitch: 0,
    bearing: 0
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  // Handle external activation (hash change)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#events') {
        setIsActivated(true);
      }
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

  const onMarkerClick = useCallback((marker: any) => {
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

  const selectedCityMetadata = useMemo(() => cityMarkers.find(m => m.id === selectedCityId), [selectedCityId, cityMarkers]);
  const displayedEvents = useMemo(() => selectedCityId ? allEvents.filter(e => e.cityId === selectedCityId) : allEvents, [selectedCityId, allEvents]);

  const lineLayer: LineLayer = {
    id: 'provinces-outline',
    type: 'line',
    source: 'provinces',
    paint: { 'line-color': 'rgba(255,255,255,0.03)', 'line-width': 0.5 }
  };

  const renderMap = (interactive = false, variant: 'preview' | 'full' = 'full') => {
    if (!isActivated && variant === 'preview') {
       return (
         <div className="w-full h-full bg-[#050505] flex items-center justify-center grayscale opacity-40">
           <svg className="w-full h-full opacity-60" viewBox="0 0 400 600" fill="none" stroke="currentColor" strokeWidth="0.5">
             <path d="M100,50 L300,50 L350,150 L200,550 L50,150 Z" stroke="rgba(96,165,250,0.2)" />
           </svg>
         </div>
       );
    }

    return (
      <div className={`w-full h-full relative ${variant === 'preview' ? 'grayscale opacity-80 brightness-[0.7] contrast-125' : ''}`}>
        <Map
          {...viewState}
          onMove={evt => interactive && setViewState(evt.viewState)}
          onClick={resetView}
          scrollZoom={interactive}
          dragPan={interactive}
          dragRotate={interactive}
          touchZoomRotate={interactive}
          maxBounds={[[-95, -65], [-35, -5]] as any}
          minZoom={3}
          onLoad={(e) => {
            const map = e.target;
            const layers = map.getStyle().layers;
            if (layers) {
              layers.forEach((layer: any) => {
                if (layer.id.includes('label')) {
                  try {
                    map.setLayoutProperty(layer.id, 'text-field', ['get', 'name_en']);
                    map.setPaintProperty(layer.id, 'text-color', 'rgba(255,255,255,0.2)');
                  } catch (err) { /* ignore */ }
                }
              });
            }
            if (map.getLayer('water')) map.setPaintProperty('water', 'fill-color', '#000000');
            if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', '#000000');
            if (map.getLayer('land')) map.setPaintProperty('land', 'fill-color', '#050505');
            if (map.getLayer('admin-0-boundary')) map.setPaintProperty('admin-0-boundary', 'line-color', 'rgba(255,255,255,0.05)');
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={false}
        >
          <Source id="provinces" type="geojson" data="https://raw.githubusercontent.com/mgubels/argentina-geojson/master/provincias.json">
              <Layer {...lineLayer} />
          </Source>

          {cityMarkers.map((marker) => {
            const isSelected = selectedCityId === marker.id;
            return (
              <Marker key={marker.id} longitude={marker.lng} latitude={marker.lat} anchor="bottom" onClick={e => { e.originalEvent.stopPropagation(); onMarkerClick(marker); }}>
                {/* Outer touch target div (44px min for mobile accessibility) */}
                <div className="relative w-12 h-12 flex items-center justify-center cursor-pointer touch-manipulation group/marker">
                  <div className={`transition-all duration-300 ${interactive ? 'group-hover/marker:scale-110' : ''}`}>
                    <div className={`relative rounded-full rounded-br-none bg-brand-400 rotate-[45deg] flex items-center justify-center border border-white/20 transition-all duration-500 ${isSelected ? 'w-9 h-9 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.6)] z-10' : 'w-6 h-6 opacity-80'}`}>
                        <div className="w-[30%] h-[30%] bg-[#050505] rounded-full rotate-[-45deg]" />
                        {marker.eventCount > 1 && !isSelected && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-black text-[7px] font-bold rounded-full flex items-center justify-center rotate-[-45deg] shadow-lg">{marker.eventCount}</div>}
                    </div>
                  </div>

                  {/* Tooltip on Mobile (hidden until touch) */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/marker:opacity-100 group-active/marker:opacity-100 transition-opacity pointer-events-none z-50">
                     <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[8px] text-white uppercase tracking-[0.2em] whitespace-nowrap">{marker.city}</div>
                  </div>
                </div>
              </Marker>
            );
          })}
        </Map>
      </div>
    );
  };
   

  const openFullMap = () => {
    setIsActivated(true);
    setIsModalOpen(true);
  };

  return (
    <section id="events-section" className="w-full bg-[#050505] pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-brand-400/10 to-transparent z-[1] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(96,165,250,0.08)_0%,transparent_60%)] z-0 pointer-events-none" />

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-100">
        <svg className="w-full h-full opacity-40" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <marker id="arrowhead" markerWidth="12" markerHeight="9" refX="0" refY="4.5" orient="auto"><polygon points="0 0, 12 4.5, 0 9" fill="#93c5fd" /></marker>
          </defs>
          {[
            { d: "M-100,200 Q300,400 500,100", strokeWidth: "3.5", dash: "12 18", opacity: 0.7 },
            { d: "M1100,800 Q700,600 500,900", strokeWidth: "3.5", dash: "12 18", opacity: 0.7 },
            { d: "M-50,700 Q400,500 200,950", strokeWidth: "3", dash: "8 15", opacity: 0.6 },
            { d: "M1050,100 Q600,300 800,-50", strokeWidth: "3", dash: "8 15", opacity: 0.6 },
          ].map((path, i) => (
            <motion.path key={`p-${i}`} d={path.d} stroke="#60a5fa" strokeWidth={path.strokeWidth} strokeDasharray={path.dash} markerEnd="url(#arrowhead)" vectorEffect="non-scaling-stroke" initial={{ opacity: path.opacity * 0.4, strokeDashoffset: 0 }} animate={{ opacity: [path.opacity * 0.3, path.opacity, path.opacity * 0.3], strokeDashoffset: [0, -120] }} transition={{ opacity: { duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }, strokeDashoffset: { duration: 30 + Math.random() * 20, repeat: Infinity, ease: "linear" }}} />
          ))}
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none" />
               <div className="relative w-full max-w-[650px] aspect-square bg-[#080808] border border-white/10 group/preview overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
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
                  <div className="absolute inset-0 scale-105">{renderMap(false, 'preview')}</div>
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/10 cursor-pointer" onClick={openFullMap}>
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group/btn relative px-8 py-4 bg-brand-400/10 backdrop-blur-md border border-brand-400/30 hover:border-brand-400 transition-all duration-500 shadow-[0_0_30px_rgba(96,165,250,0.2)]">
                        <div className="relative z-10 flex flex-col items-center gap-2">
                           <div className="flex items-center gap-3"><Star size={14} className="text-brand-400" /><span className="text-white text-[10px] uppercase font-bold tracking-[0.4em]">View Full History</span></div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>

           <div className="order-1 lg:order-2 flex flex-col items-start lg:pl-12">
              <div className="mb-12 md:mb-16">
                  <h2 className="text-7xl sm:text-8xl md:text-[10rem] font-serif text-white tracking-widest leading-none mb-4 uppercase">CAREER</h2>
                  <div className="flex items-center gap-6 mt-2">
                     <p className="text-brand-400 font-sans text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">PARTICIPATIONS</p>
                     <div className="h-[1px] flex-grow bg-gradient-to-r from-brand-400 to-transparent opacity-30 mt-1"></div>
                  </div>
              </div>
              <div className="space-y-8">
                 <p className="text-white/40 font-sans text-sm md:text-base leading-relaxed tracking-wide max-w-sm border-l border-brand-400/20 pl-6 italic">A comprehensive operational chronicle of creative visualizations across the Southern Cone.</p>
                 <div className="flex flex-col gap-6">
                    <button onClick={openFullMap} className="group relative px-10 py-5 bg-brand-400/5 hover:bg-brand-400 text-brand-400 hover:text-black font-sans text-[10px] uppercase font-bold tracking-[0.4em] border border-brand-400/20 hover:border-brand-400 transition-all duration-500 rounded-none">
                       <span className="relative z-10 flex items-center gap-3"><Star size={14} /> View full History</span>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-[95vw] max-w-[1400px] h-[85vh] bg-[#050505] border border-white/10 rounded-none shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row z-[101]">
                <div className="w-full md:w-3/5 h-full relative overflow-hidden">
                   {renderMap(true, 'full')}
                   
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

                   <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 md:hidden w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 z-30 rounded-none"><X size={20} /></button>
                </div>

                {/* Sidebar - Desktop Only */}
                <div className="w-full md:w-2/5 h-full hidden md:flex flex-col bg-[#0a0a0a] border-l border-white/10 overflow-hidden rounded-none">
                    <div className="p-10 border-b border-white/5 bg-gradient-to-r from-brand-400/5 via-transparent to-transparent">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col gap-4">
                             <div className="flex items-center gap-4 text-brand-400 font-sans text-[9px] uppercase tracking-[0.5em] font-bold">
                                <span>{selectedCityId ? 'LOCATION DATA' : 'COLLABORATION REGISTER'}</span>
                             </div>
                             <h3 className="text-white font-serif text-4xl lg:text-5xl tracking-[0.1em] uppercase italic leading-tight">
                               {selectedCityId ? `${selectedCityMetadata?.city.toUpperCase()}` : 'GLOBAL LOG'}
                             </h3>
                          </div>
                          <button onClick={() => setIsModalOpen(false)} className="hidden md:flex p-3 text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-none group/close"><X size={20} className="group-hover/close:rotate-90 transition-transform duration-300" /></button>
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
