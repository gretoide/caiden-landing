import { useState, useCallback, useMemo, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { Star, X, Plane, Activity, Radio, ChevronRight } from 'lucide-react';
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
                    {marker.eventCount > 1 && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[7px] font-bold rounded-full flex items-center justify-center rotate-[-45deg] shadow-lg">
                        {marker.eventCount}
                      </div>
                    )}
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
    <section className="w-full bg-[#050505] pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden border-t border-white/5">
      {/* Background Horizon Glow for Depth */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-brand-400/10 to-transparent z-[1] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(96,165,250,0.08)_0%,transparent_60%)] z-0 pointer-events-none" />

      {/* Background Data Trails, Arrows & Airplanes per sketch */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-100">
        <svg className="w-full h-full opacity-40 shadow-[0_0_50px_rgba(96,165,250,0.1)]" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
            </marker>
          </defs>
          
          {/* Curved Data Trails with Arrows - Increased Density */}
          <path d="M-100,200 Q300,400 500,100" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="10 15" markerEnd="url(#arrowhead)" className="opacity-50" vectorEffect="non-scaling-stroke" />
          <path d="M1100,800 Q700,600 500,900" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="10 15" markerEnd="url(#arrowhead)" className="opacity-50" vectorEffect="non-scaling-stroke" />
          <path d="M-50,700 Q400,500 200,950" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 12" markerEnd="url(#arrowhead)" className="opacity-40" vectorEffect="non-scaling-stroke" />
          <path d="M1050,100 Q600,300 800,-50" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 12" markerEnd="url(#arrowhead)" className="opacity-40" vectorEffect="non-scaling-stroke" />
          
          <path d="M-100,400 Q400,600 900,200" stroke="#60a5fa" strokeWidth="2" strokeDasharray="12 20" markerEnd="url(#arrowhead)" className="opacity-30" vectorEffect="non-scaling-stroke" />
          <path d="M1100,200 Q600,400 100,800" stroke="#60a5fa" strokeWidth="2" strokeDasharray="12 20" markerEnd="url(#arrowhead)" className="opacity-30" vectorEffect="non-scaling-stroke" />
          
          <path d="M200,-50 Q500,500 800,1050" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="5 15" markerEnd="url(#arrowhead)" className="opacity-25" vectorEffect="non-scaling-stroke" />
          <path d="M800,-50 Q500,500 200,1050" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="5 15" markerEnd="url(#arrowhead)" className="opacity-25" vectorEffect="non-scaling-stroke" />

          <path d="M-100,100 Q500,100 1100,100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="20 30" markerEnd="url(#arrowhead)" className="opacity-20" vectorEffect="non-scaling-stroke" />
          <path d="M-100,900 Q500,900 1100,900" stroke="#60a5fa" strokeWidth="1" strokeDasharray="20 30" markerEnd="url(#arrowhead)" className="opacity-20" vectorEffect="non-scaling-stroke" />
          <path d="M100,-100 Q100,500 100,1100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="20 30" markerEnd="url(#arrowhead)" className="opacity-20" vectorEffect="non-scaling-stroke" />
          <path d="M900,-100 Q900,500 900,1100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="20 30" markerEnd="url(#arrowhead)" className="opacity-20" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Floating Airplanes */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`plane-${i}`}
            animate={{ 
              x: i % 2 === 0 ? [-200, 1200] : [1200, -200],
              y: [100 + i * 250, 200 + i * 200],
              opacity: [0, 0.8, 0]
            }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear", delay: i * 5 }}
            className="absolute text-brand-400"
          >
            <div className="relative">
              <Plane size={36} className={`${i % 2 === 0 ? "rotate-45" : "-rotate-135"} drop-shadow-[0_0_20px_rgba(96,165,250,0.9)]`} />
              <div className="absolute inset-0 bg-brand-400/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Pulsing Blue Flashes (Luciernagas) */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`flash-${i}`}
            animate={{ 
               opacity: [0, 1, 0], 
               scale: [0.5, 2.2, 0.5],
            }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 8 }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 30px rgba(96,165,250,1), 0 0 10px white, 0 0 50px rgba(96,165,250,0.4)'
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
           
           {/* Left Column: Tactical Map Square */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start relative">
               {/* Background Glow behind map */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none" />
               
               <div className="relative w-full max-w-[650px] aspect-square bg-[#080808] border border-white/10 group/preview overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_30px_rgba(96,165,250,0.05)]">
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

                  {/* Expansion Overlay (Central Button as per sketch) */}
                  <div 
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/10 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                     <motion.div 
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="group/btn relative px-8 py-4 bg-brand-400/10 backdrop-blur-md border border-brand-400/30 hover:border-brand-400 transition-all duration-500 shadow-[0_0_30px_rgba(96,165,250,0.2)]"
                     >
                        {/* Glow effect for button */}
                        <div className="absolute inset-0 bg-brand-400/10 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        
                        <div className="relative z-10 flex flex-col items-center gap-2">
                           <div className="flex items-center gap-3">
                              <Star size={14} className="text-brand-400 group-hover/btn:rotate-90 transition-transform duration-500" />
                              <span className="text-white text-[10px] uppercase font-bold tracking-[0.4em]">View Full History</span>
                           </div>
                           <div className="w-full h-[1px] bg-brand-400/20 group-hover/btn:bg-brand-400/50 transition-colors" />
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>

           {/* Right Column: Informational Header & CTA */}
           <div className="order-1 lg:order-2 flex flex-col items-start lg:pl-12">
              <div className="mb-12 md:mb-16">
                  {/* Header matching ProjectSection style */}
                  <h2 className="text-[6rem] md:text-[10rem] font-serif text-white tracking-widest leading-none mb-4 uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                     CAREER
                  </h2>
                  <div className="flex items-center gap-6 mt-2">
                     <p className="text-brand-400 font-sans text-xl md:text-2xl font-bold uppercase tracking-[0.3em] drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]">
                        PARTICIPATIONS
                     </p>
                     <div className="h-[1px] flex-grow bg-gradient-to-r from-brand-400 to-transparent opacity-30 mt-1"></div>
                  </div>
              </div>

              <div className="space-y-8">
                 <p className="text-white/40 font-sans text-sm md:text-base leading-relaxed tracking-wide max-w-sm border-l border-brand-400/20 pl-6 italic">
                    A comprehensive operational chronicle of creative visualizations and promotional activations executed across the Southern Cone.
                 </p>

                 <div className="flex flex-col gap-6">
                    <button 
                       onClick={() => setIsModalOpen(true)}
                       className="group relative px-10 py-5 bg-brand-400/5 hover:bg-brand-400 text-brand-400 hover:text-black font-sans text-[10px] uppercase font-bold tracking-[0.4em] border border-brand-400/20 hover:border-brand-400 transition-all duration-500 overflow-hidden"
                    >
                       <span className="relative z-10 flex items-center gap-3">
                          <Star size={14} className="group-hover:rotate-[360deg] transition-transform duration-1000" />
                          View full History
                       </span>
                    </button>

                    <div className="flex items-center gap-4 text-white/20 text-[9px] font-mono tracking-[0.2em] font-bold">
                       <div className="w-2 h-2 rounded-full bg-brand-400/30 animate-pulse" />
                       REGISTRY // ACTIVE
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* MODAL PORTAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop with Fireflies */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm overflow-hidden"
            >
               {/* Background Data Trails & Stars for Modal Backdrop */}
               <div className="absolute inset-0 pointer-events-none opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="xMidYMid slice">
                     <path d="M-100,300 Q400,100 900,500" stroke="#60a5fa" strokeWidth="1" strokeDasharray="10 20" className="opacity-30" />
                     <path d="M1100,700 Q600,900 100,500" stroke="#60a5fa" strokeWidth="1" strokeDasharray="10 20" className="opacity-30" />
                  </svg>
                  {[...Array(8)].map((_, i) => (
                     <motion.div
                        key={`modal-flash-${i}`}
                        animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] }}
                        transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-1 h-1 bg-brand-400 rounded-full blur-[1px]"
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                     />
                  ))}
               </div>
            </motion.div>
            
            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              data-cursor="no-glow"
              className="relative w-[95vw] max-w-[1400px] h-[85vh] bg-[#050505] border border-white/10 rounded-none shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row z-[101]"
            >
               {/* Background Glow inside modal */}
               <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none" />

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
                   {/* Header: More Tech/Nomadic */}
                    <div className="p-10 border-b border-white/5 bg-gradient-to-r from-brand-400/5 via-transparent to-transparent">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col gap-4">
                             <div className="flex items-center gap-4 text-brand-400 font-sans text-[9px] uppercase tracking-[0.5em] font-bold">
                                <span className="drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">COLLABORATION REGISTER</span>
                             </div>
                             <h3 className="text-white font-serif text-4xl lg:text-5xl tracking-[0.1em] uppercase italic leading-tight">
                                {selectedCityId ? `${selectedCityMetadata?.city.toUpperCase()} OPERATIONS` : 'LOG REGISTRY'}
                             </h3>
                          </div>
                          {/* Desktop Close Button */}
                          <button 
                            onClick={() => setIsModalOpen(false)}
                            className="hidden md:flex p-3 text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full group/close"
                          >
                            <X size={20} className="group-hover/close:rotate-90 transition-transform duration-300" />
                          </button>
                       </div>
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
                                 <ChevronRight size={10} className="text-brand-400/40 ml-auto" />
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
                    <div className="p-6 bg-[#050505] border-t border-white/5 flex items-center justify-between text-[8px] text-white/20 uppercase tracking-[0.5em] font-bold">
                       <div className="flex items-center gap-4">
                          <span>SOUTHERN CONE OPERATIONS</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span>OPERATIONAL RECORD</span>
                       </div>
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
