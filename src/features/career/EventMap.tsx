import { useState, useCallback, useMemo, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { Star, Maximize2, X } from 'lucide-react';
import type { LineLayer } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../shared/ui/Image';
import { LOCATIONS } from './data';
import 'mapbox-gl/dist/mapbox-gl.css';

// Configuration
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const SECTION_BG = '#050505';

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

  // 1. Get all events with metadata
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

  // 2. Group by city to create single markers
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

  const onMarkerClick = useCallback((cityId: string) => {
    setSelectedCityId(cityId);
  }, []);

  const resetView = useCallback(() => {
    setSelectedCityId(null);
  }, []);

  const selectedCityMetadata = useMemo(() => 
    cityMarkers.find(m => m.id === selectedCityId), 
  [selectedCityId, cityMarkers]);

  const displayedEvents = useMemo(() => {
    if (!selectedCityId) return allEvents;
    return allEvents.filter(e => e.cityId === selectedCityId);
  }, [selectedCityId, allEvents]);

  const lineLayer: LineLayer = {
    id: 'provinces-outline',
    type: 'line',
    source: 'provinces',
    paint: {
      'line-color': 'rgba(255,255,255,0.03)',
      'line-width': 0.5
    }
  };

  const renderMap = (interactive = false, variant: 'preview' | 'full' = 'full') => (
    <div className={`w-full h-full relative ${variant === 'preview' ? 'grayscale brightness-75 contrast-125 sepia-[0.3] hue-rotate-[160deg]' : ''}`}>
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
          if (map.getLayer('water')) map.setPaintProperty('water', 'fill-color', SECTION_BG);
          if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', SECTION_BG);
          if (map.getLayer('land')) map.setPaintProperty('land', 'fill-color', '#080808');
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
            <Marker
              key={marker.id}
              longitude={marker.lng}
              latitude={marker.lat}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                onMarkerClick(marker.id);
              }}
            >
              <div className={`cursor-pointer transition-all duration-300 ${interactive ? 'hover:scale-110' : ''}`}>
                <div 
                  className={`relative rounded-full rounded-br-none bg-brand-400 rotate-[45deg] flex items-center justify-center border border-white/20 transition-all duration-500 ${
                    isSelected ? 'w-10 h-10 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.4)]' : 'w-7 h-7 opacity-80'
                  }`}
                >
                    <div className="w-[30%] h-[30%] bg-[#050505] rounded-full rotate-[-45deg]" />
                </div>
                {variant === 'preview' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-brand-400 rounded-full animate-ping opacity-20" />
                )}
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );

  return (
    <section className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
           
           {/* Left Column: Tactical Map Square */}
           <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[500px] aspect-square bg-[#080808] border border-white/10 group/preview overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                 {/* Tactical Grid Overlay */}
                 <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.15) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
                    {/* Animated Scanline */}
                    <motion.div 
                      animate={{ y: ['0%', '100%', '0%'] }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-full h-[2px] bg-brand-400/30 shadow-[0_0_10px_rgba(96,165,250,0.5)] z-20"
                    />
                 </div>

                 {/* Corner Brackets */}
                 <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-brand-400/30 z-20" />
                 <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-brand-400/30 z-20" />
                 <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-brand-400/30 z-20" />
                 <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-brand-400/30 z-20" />

                 {/* The Tactical Schematic Map */}
                 <div className="absolute inset-0 scale-105">
                    {renderMap(false, 'preview')}
                 </div>

                 {/* Expansion Overlay (Hover) */}
                 <div 
                   className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 opacity-0 group-hover/preview:opacity-100 transition-all duration-500 cursor-pointer backdrop-blur-[2px]"
                   onClick={() => setIsModalOpen(true)}
                 >
                    <div className="flex flex-col items-center gap-3">
                       <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover/preview:scale-100 transition-all">
                          <Maximize2 size={24} />
                       </div>
                       <span className="text-white text-[8px] uppercase tracking-[0.4em] font-bold">Launch Full Map</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Column: Informational Header & CTA */}
           <div className="order-1 lg:order-2 flex flex-col items-start lg:pl-12">
              <div className="mb-12 md:mb-16">
                 {/* Header matching ProjectSection style */}
                 <h2 className="text-[6rem] md:text-[10rem] font-serif text-white tracking-widest leading-none mb-4 uppercase">
                    EVENTS
                 </h2>
                 <div className="flex items-center gap-6 mt-2">
                    <p className="text-brand-400 font-sans text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">
                       REGISTER
                    </p>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-brand-400 to-transparent opacity-30 mt-1"></div>
                 </div>
              </div>

              <div className="space-y-8">
                 <p className="text-white/40 font-sans text-sm md:text-base leading-relaxed tracking-wide max-w-sm border-l border-brand-400/20 pl-6 italic">
                    A comprehensive register of events and brand collaborations I have participated in across the Southern Cone. From international conventions to exclusive marketing campaigns.
                 </p>

                 <div className="flex flex-col gap-6">
                    <button 
                       onClick={() => setIsModalOpen(true)}
                       className="group relative px-10 py-5 bg-brand-400/5 hover:bg-brand-400 text-brand-400 hover:text-black font-sans text-[10px] uppercase font-bold tracking-[0.4em] border border-brand-400/20 hover:border-brand-400 transition-all duration-500 overflow-hidden"
                    >
                       <span className="relative z-10 flex items-center gap-3">
                          <Star size={14} className="group-hover:rotate-[360deg] transition-transform duration-1000" />
                          See All Participations
                       </span>
                    </button>

                    <div className="flex items-center gap-4 text-white/20 text-[9px] font-mono tracking-[0.2em] font-bold">
                       <div className="w-2 h-2 rounded-full bg-brand-400/30 animate-pulse" />
                       STATION.ID: CAIDEN_MASTER // DATA_STREAM: ACTIVE
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* MODAL PORTAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12">
             {/* Backdrop */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
             />

             {/* Modal Container */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
               className="relative w-full h-full max-w-[1500px] bg-[#050505] border border-white/10 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row z-[101]"
             >
                {/* Full Interactive Map */}
                <div className="w-full md:w-3/5 h-[40vh] md:h-full relative overflow-hidden">
                   {renderMap(true, 'full')}
                   
                   {/* Map Controls Helper */}
                   <div className="absolute left-6 bottom-6 z-20 flex flex-col gap-4 pointer-events-none">
                      <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[9px] text-white/40 uppercase tracking-[0.2em]">
                         Scroll to zoom • Click cities to filter
                      </div>
                   </div>

                   {/* Close Button Mobile (Top Right of Map) */}
                   <button 
                     onClick={() => setIsModalOpen(false)}
                     className="absolute top-4 right-4 md:hidden w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/50 z-30"
                   >
                     <X size={20} />
                   </button>
                </div>

                {/* Event Details Sidebar */}
                <div className="w-full md:w-2/5 h-full flex flex-col bg-[#0a0a0a] border-l border-white/10">
                   {/* Sidebar Header */}
                   <div className="p-8 border-b border-white/5">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-3 text-brand-400 font-sans text-[9px] uppercase tracking-[0.4em] font-bold">
                               <div className={`w-1.5 h-1.5 rounded-full bg-brand-400 ${selectedCityId ? 'animate-pulse' : ''}`} />
                               {selectedCityId ? `${selectedCityMetadata?.city.toUpperCase()} DEPLOYMENTS` : 'GLOBAL REGISTER'}
                            </div>
                            <h3 className="text-white font-serif text-2xl tracking-[0.1em] uppercase italic">
                               {selectedCityId ? selectedCityMetadata?.city : 'ALL OPERATIONS'}
                            </h3>
                         </div>
                         {/* Desktop Close Button */}
                         <button 
                            onClick={() => setIsModalOpen(false)}
                            className="hidden md:flex w-10 h-10 items-center justify-center text-white/20 hover:text-white/100 hover:bg-white/5 rounded-full transition-all border border-transparent hover:border-white/10"
                            title="Close ESC"
                         >
                            <X size={24} />
                         </button>
                      </div>
                      
                      {selectedCityId && (
                         <button 
                            onClick={resetView}
                            className="text-[10px] text-brand-400/60 hover:text-brand-400 font-sans uppercase tracking-[0.2em] flex items-center gap-2 mb-4 transition-all"
                         >
                            <span>←</span> Reset Filter
                         </button>
                      )}
                   </div>

                   {/* Full scrollable list */}
                   <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar bg-black/10">
                      {displayedEvents.map((event: any, idx) => (
                        <div key={idx} className="group flex items-start gap-8 border-b border-white/5 pb-8 pt-4 last:border-0 transition-all">
                           <div className="w-16 h-16 shrink-0 overflow-hidden flex items-center justify-center">
                              <Image
                                 publicId={event.logoId}
                                 alt={event.name}
                                 variant="thumb"
                                 className="w-full h-full"
                                 objectFit="contain"
                                 imgClassName="p-1 group-hover:scale-110 transition-transform duration-700"
                              />
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                 <span className="text-brand-400 font-sans text-[10px] uppercase font-bold tracking-widest">{event.city}</span>
                                 <div className="w-[1px] h-3 bg-white/10" />
                                 <span className="text-white/30 font-sans text-[9px] uppercase tracking-widest">{event.type}</span>
                              </div>
                              <div className="flex items-center gap-3 mb-3">
                                 <h4 className="text-white font-serif text-xl tracking-wide uppercase transition-colors">
                                    {event.name}
                                 </h4>
                                 {event.rank === 'AWARD' && (
                                    <Star size={14} fill="#facc15" className="text-yellow-400" />
                                 )}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                 {event.years.map((year: string, yidx: number) => (
                                    <span key={yidx} className="px-2 py-0.5 bg-brand-400/10 border border-brand-400/20 rounded text-[8px] text-brand-400 tracking-wider">
                                       {year}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>

                   {/* Footer Info */}
                   <div className="p-6 bg-[#050505] border-t border-white/5 flex items-center justify-between text-[8px] text-white/20 uppercase tracking-[0.3em]">
                      <span>SECURE ARCHIVE ACCESS</span>
                      <span>RECORDS ATTESTED</span>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: CUSTOM_STYLES }} />
    </section>
  );
}
