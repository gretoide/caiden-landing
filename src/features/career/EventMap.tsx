import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { Globe, ChevronDown, Plus, Minus, Star } from 'lucide-react';
import type { LineLayer } from 'react-map-gl';
import Image from '../../shared/ui/Image';
import { LOCATIONS } from './data';

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
  const [viewState, setViewState] = useState({
    longitude: -63.6167,
    latitude: -38.4161,
    zoom: 3.5,
    pitch: 0,
    bearing: 0
  });
  const [isInteracting, setIsInteracting] = useState(false);

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
    setIsInteracting(true);
    setSelectedCityId(cityId);
  }, []);

  const onMapClick = useCallback(() => {
    setSelectedCityId(null);
  }, []);

  const handleZoom = useCallback((delta: number) => {
    setViewState(prev => ({
      ...prev,
      zoom: Math.min(Math.max(prev.zoom + delta, 3), 12),
      transitionDuration: 300
    }));
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

  return (
    <section className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Header Container */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8 md:mb-16 px-4">
          <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-[1px] bg-brand-400/60" />
                 <span className="text-brand-400 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">EVENT PORTFOLIO</span>
              </div>
              <h2 className="text-white font-serif text-4xl md:text-5xl tracking-[0.2em] leading-none mb-6">CAREER</h2>
          </div>
          <div className="text-right flex flex-col items-end opacity-40">
              <div className="flex items-center gap-2 font-sans text-[10px] text-white uppercase tracking-widest mb-1">
                 <Globe size={12} />
                 Global Infrastructure // Tracking
              </div>
              <div className="text-white/40 text-[8px] uppercase tracking-widest">MAPBOX RENDER • BRAND COLLABORATIONS • SECTOR ANALYSIS</div>
          </div>
        </div>

        {/* Main Dashboard UI */}
        <div className="flex flex-col lg:flex-row w-full h-[600px] md:h-[850px] bg-[#050505] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
          
          {/* Left Panel: Map */}
          <div className="w-full lg:w-3/5 h-full relative border-b lg:border-b-0 lg:border-r border-white/5 z-0">
            {/* Interaction Lock Overlay */}
            {!isInteracting && (
              <div 
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer group/overlay transition-all duration-500 hover:bg-black/10"
                onClick={() => setIsInteracting(true)}
              >
                <div className="px-6 py-3 bg-brand-400 text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm shadow-2xl transform transition-transform group-hover/overlay:scale-110">
                  Click to Interact with Map
                </div>
              </div>
            )}

            {/* Custom Zoom Controls */}
            {isInteracting && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
                <button 
                  onClick={() => handleZoom(1)}
                  className="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-brand-400 hover:border-brand-400/50 transition-all shadow-xl"
                  title="Zoom In"
                >
                  <Plus size={18} />
                </button>
                <button 
                  onClick={() => handleZoom(-1)}
                  className="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-brand-400 hover:border-brand-400/50 transition-all shadow-xl"
                  title="Zoom Out"
                >
                  <Minus size={18} />
                </button>
              </div>
            )}

            {/* Mobile Tooltip */}
            {!selectedCityId && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex lg:hidden flex-col items-center gap-1 z-20 pointer-events-none animate-bounce">
                 <div className="px-3 py-1.5 bg-brand-400 text-black text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-xl">
                    SELECT EVENT
                 </div>
              </div>
            )}
            <Map
              {...viewState}
              onMove={evt => isInteracting && setViewState(evt.viewState)}
              onClick={onMapClick}
              scrollZoom={isInteracting}
              dragPan={isInteracting}
              dragRotate={isInteracting}
              touchZoomRotate={isInteracting}
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
                    <div className="cursor-pointer transition-all duration-300 hover:scale-110">
                      <div 
                        className={`relative rounded-full rounded-br-none bg-brand-400 rotate-[45deg] flex items-center justify-center border border-white/20 transition-all duration-500 ${
                          isSelected ? 'w-10 h-10 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.4)]' : 'w-7 h-7 opacity-80'
                        }`}
                      >
                         <div className="w-[30%] h-[30%] bg-[#050505] rounded-full rotate-[-45deg]" />
                         {/* Optional: Add event count badge if more than 1 */}
                         {marker.eventCount > 1 && !isSelected && (
                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[7px] font-bold rounded-full flex items-center justify-center rotate-[-45deg] shadow-lg">
                              {marker.eventCount}
                           </div>
                         )}
                      </div>
                    </div>
                  </Marker>
                );
              })}
            </Map>
          </div>

          {/* Right Panel: Event List */}
          <div className={`w-full lg:w-2/5 h-full flex flex-col overflow-hidden bg-[#0a0a0a]/95 lg:bg-[#0a0a0a] backdrop-blur-md lg:backdrop-blur-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${selectedCityId 
              ? 'translate-y-0 opacity-100 visible z-30' 
              : 'translate-y-full opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100 lg:z-10'} 
            max-lg:absolute max-lg:inset-0 max-lg:pt-12`}>
             
              {/* Mobile Close Handle */}
              <div className="lg:hidden flex justify-center pt-2 pb-0">
                 <button 
                   onClick={onMapClick}
                   className="w-12 h-8 flex items-center justify-center text-white/20 hover:text-brand-400 transition-colors"
                 >
                    <ChevronDown size={32} strokeWidth={1.5} />
                 </button>
              </div>

              {/* List Header */}
              <div className="p-8 lg:p-10 border-b border-white/5 bg-[#0a0a0a]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3 text-brand-400 font-sans text-[9px] uppercase tracking-[0.4em] font-bold">
                        <div className={`w-1.5 h-1.5 rounded-full bg-brand-400 ${selectedCityId ? 'animate-pulse' : ''}`} />
                        {selectedCityId ? `${selectedCityMetadata?.city.toUpperCase()} DEPLOYMENTS` : 'ALL EVENTS'}
                    </div>
                    <h3 className="text-white font-serif text-xl md:text-3xl tracking-[0.1em] uppercase leading-tight italic">
                        {selectedCityId ? selectedCityMetadata?.city : 'ALL EVENTS'}
                    </h3>
                  </div>
                  {/* Desktop Return Button */}
                  {selectedCityId && (
                    <button 
                      onClick={onMapClick}
                      className="hidden lg:flex text-[11px] text-white/40 hover:text-brand-400 font-sans uppercase tracking-[0.2em] items-center gap-2 transition-all group/back border border-white/10 hover:border-brand-400/30 px-4 py-2 rounded-full bg-white/[0.04] shadow-lg self-start mt-1"
                    >
                      <span className="opacity-40 group-hover/back:opacity-100 transition-opacity translate-x-1 group-hover/back:translate-x-0 transition-transform text-lg">«</span>
                      Return to All
                    </button>
                  )}
                </div>
                <p className="text-white/30 font-sans text-xs leading-relaxed mb-0 pl-5 border-l border-brand-400/20 italic">
                   {selectedCityId 
                    ? `Consolidated history for ${selectedCityMetadata?.city}, ${selectedCityMetadata?.provinceName}. Explore individual projects below.`
                    : 'Consolidated tracking of all marketing campaigns history across the Southern Cone. Click a marker or city to explore.'}
                </p>
              </div>

             {/* Scrollable list */}
             <div className={`flex-1 overflow-y-auto p-8 pt-10 space-y-4 custom-scrollbar bg-black/10 transition-opacity duration-500 ${!isInteracting ? 'pointer-events-none opacity-50' : 'opacity-100'}`}>
                {displayedEvents.map((event: any, idx) => {
                  return (
                    <div key={idx} 
                      className="group flex items-start gap-8 border-b border-white/5 pb-8 pt-4 last:border-0 transition-all duration-300 -mx-4 px-8 rounded-xl cursor-default hover:bg-white/[0.03] relative overflow-hidden"
                    >
                       <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden flex items-center justify-center relative">
                        <Image
                            publicId={event.logoId}
                            alt={event.name}
                            variant="thumb"
                            className="w-full h-full"
                            objectFit="contain"
                            imgClassName="p-1 group-hover:scale-110 transition-transform duration-700 relative z-20"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[7px] text-white/5 uppercase tracking-widest text-center px-2 z-10 opacity-40">
                           {event.name}
                        </div>
                     </div>

                     <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2.5 mb-3">
                           {(() => {
                              let raw = [event.city, event.provinceName];
                              if (event.city.toLowerCase() === event.provinceName.toLowerCase() || 
                                  event.provinceName.toLowerCase().includes(event.city.toLowerCase())) {
                                  raw = [event.provinceName];
                              }
                              
                              const locParts = raw
                                  .flatMap(s => s.split(/[\/|\-]/).map((t: string) => t.trim()))
                                  .filter((v, i, a) => a.findIndex((t: string) => t.toLowerCase() === v.toLowerCase()) === i && v.length > 0)
                                  .slice(0, 2);
                                  
                              const colors = ['text-brand-400 font-bold', 'text-brand-400/70'];
                              
                              return (
                                 <>
                                    {locParts.map((tag, i) => (
                                       <div key={i} className="flex items-center gap-2.5">
                                          <span className={`font-sans text-[10px] uppercase tracking-[0.2em] ${colors[i] || 'text-brand-400/20'}`}>
                                             {tag}
                                          </span>
                                          {i < locParts.length - 1 && (
                                             <span className="text-brand-400/30 font-bold tracking-widest text-[8px] mx-0.5">//</span>
                                          )}
                                       </div>
                                    ))}
                                    {locParts.length > 0 && <div className="w-[1px] h-3 bg-white/10 ml-0.5" />}
                                    <span className="text-white/30 font-sans text-[9px] uppercase tracking-widest">{event.type}</span>
                                 </>
                              );
                           })()}
                        </div>
                          <div className="flex items-center gap-4 mb-4">
                             <h4 className="text-white font-serif text-xl md:text-2xl tracking-wide uppercase group-hover:text-brand-400 transition-colors">
                                {event.name}
                             </h4>
                             {event.rank === 'AWARD' && (
                                <Star 
                                  size={16} 
                                  fill="#facc15" 
                                  className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" 
                                />
                             )}
                          </div>
                        
                        <div className="flex flex-wrap gap-1.5">
                            {[...event.years].sort((a, b) => Number(b) - Number(a)).map((year: string, yidx: number) => (
                                <span key={yidx} className="px-2 py-0.5 bg-white/[0.02] border border-white/[0.05] rounded text-[9px] text-white/30 tracking-wider">
                                    {year}
                                </span>
                            ))}
                        </div>
                     </div>
                  </div>
                  );
                })}
             </div>

              {/* List Footer */}
              <div className="p-6 bg-[#050505] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 opacity-30">
                   <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-brand-400" />
                      <div className="w-2 h-1 rounded-full bg-white" />
                   </div>
                   <span className="text-[8px] text-white uppercase tracking-[0.3em]">
                        DATA TRACKING: {displayedEvents.length} PROJECTS
                   </span>
                </div>
                <div className="font-mono text-[8px] text-brand-400/30 tracking-[0.2em] uppercase">LINK | ACTIVE</div>
             </div>
          </div>
        </div>
      </div>

       <style dangerouslySetInnerHTML={{ __html: CUSTOM_STYLES }} />
    </section>
  );
}
