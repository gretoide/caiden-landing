import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl';
import { MapPin, Globe } from 'lucide-react';
import type { FillLayer } from 'react-map-gl';
import OptimizedImage from './OptimizedImage';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const LOCATIONS = [
  {
    id: 'entre-rios',
    name: 'Entre Ríos',
    provinceName: 'Entre Ríos', // Matches GeoJSON property
    country: 'Argentina',
    lat: -31.7747,
    lng: -60.4956,
    description: 'Developed in collaboration with leading brands throughout the country across renowned events. Specialized in strategic marketing and brand publicity.',
    events: [
      {
        city: 'Concordia',
        name: 'Asia Fest',
        logoId: 'asia-fest',
        years: ['2015 July', '2016 July', '2017 August', '2018 July', '2019 August'],
        type: 'Festival'
      },
      {
        city: 'Paraná',
        name: 'Ani Chan',
        logoId: 'ani-chan',
        years: ['2015 August'],
        type: 'Convention'
      },
      {
        city: 'Concordia',
        name: 'Friki Mania',
        logoId: 'friki-mania',
        years: ['2017 January', '2018 February', '2019 February', '2020 October', '2021 February', '2022 May', '2022 November', '2023 August', '2024 July'],
        type: 'Theme Event'
      },
      {
        city: 'Paraná',
        name: 'Tin & B-Bop',
        logoId: 'tin-bbop',
        years: ['2023 May'],
        type: 'Exhibition'
      },
      {
        city: 'Concordia',
        name: 'Gamer Fest',
        logoId: 'gamer-fest',
        years: ['2023 May'],
        type: 'Gaming'
      },
      {
        city: 'Gualeguaychú',
        name: 'Neo Freak',
        logoId: 'neo-freak',
        years: ['2024 August'],
        type: 'Convention'
      },
      {
        city: 'Paraná',
        name: 'Paraná Con',
        logoId: 'parana-con',
        years: ['2024 May'],
        type: 'Comic Con'
      }
    ]
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    provinceName: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.6037,
    lng: -58.3816,
    description: 'Capital city operations and major commercial center implementations.',
    events: [
        { city: 'Buenos Aires', name: 'Argentina Comic Con', logoId: 'arg-comic-con', years: ['2023 December'], type: 'Mega Event' },
        { city: 'Buenos Aires', name: 'Gamescom', logoId: 'gamescom', years: ['2024'], type: 'International' }
    ]
  }
];

export default function EventMap() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [viewState, setViewState] = useState({
    longitude: -63.6167,
    latitude: -38.4161,
    zoom: 4.2,
    pitch: 0,
    bearing: 0
  });

  const onMarkerClick = useCallback((loc: typeof LOCATIONS[0]) => {
    setSelectedLocation(loc);
    setViewState(prev => ({
      ...prev,
      longitude: loc.lng,
      latitude: loc.lat,
      zoom: 6,
      transitionDuration: 1000
    }));
  }, []);

  // Highlight Layer Style
  const highlightLayer: FillLayer = useMemo(() => ({
    id: 'province-highlight',
    type: 'fill',
    source: 'provinces',
    paint: {
      'fill-color': '#00d0ff',
      'fill-opacity': 0.15,
      'fill-outline-color': '#00d0ff'
    },
    filter: ['==', ['get', 'nombre'], selectedLocation.provinceName]
  }), [selectedLocation.provinceName]);

  // Base Provinces Layer
  const baseLayer: FillLayer = {
    id: 'provinces-base',
    type: 'fill',
    source: 'provinces',
    paint: {
      'fill-color': '#ffffff',
      'fill-opacity': 0.03,
      'fill-outline-color': 'rgba(255,255,255,0.05)'
    }
  };

  return (
    <section className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-[1px] bg-brand-400/80" />
                <span className="text-brand-400 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">Global Presence</span>
             </div>
             <h2 className="text-white font-serif text-4xl md:text-6xl tracking-widest leading-none mb-6">MISSION LOCATOR</h2>
             <p className="text-white/40 font-sans leading-relaxed tracking-wide max-w-lg">
                Technical overview of operations, conventions, and strategic brand integrations worldwide.
             </p>
          </div>
          <div className="text-right flex flex-col items-end">
             <div className="flex items-center gap-2 font-sans text-xs text-brand-400 uppercase tracking-widest mb-1">
                <Globe size={14} />
                Tracking // Active
             </div>
             <div className="text-white/20 text-[9px] uppercase tracking-widest">MAPBOX ENGINE • PROVINCE GLOW • 4K RENDER</div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="flex flex-col lg:flex-row w-full h-[850px] bg-[#080808] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Map Section (Master) */}
          <div className="w-full lg:w-3/5 h-[400px] lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/10">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              maxBounds={[[-73.5, -55.2], [-53.6, -21.8]] as any}
              minZoom={3.5}
              onLoad={(e) => {
                const map = e.target;
                
                // Force English labels
                const layers = map.getStyle().layers;
                if (layers) {
                  layers.forEach((layer: any) => {
                    if (layer.id.includes('label')) {
                      try {
                        map.setLayoutProperty(layer.id, 'text-field', ['get', 'name_en']);
                      } catch (err) { /* ignore */ }
                    }
                  });
                }

                // Tactical colors
                if (map.getLayer('water')) {
                  map.setPaintProperty('water', 'fill-color', '#050505');
                }
                if (map.getLayer('background')) {
                  map.setPaintProperty('background', 'background-color', '#0a1b2e');
                }
                if (map.getLayer('land')) {
                  map.setPaintProperty('land', 'fill-color', '#0e243d');
                }
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              attributionControl={false}
            >
              <Source id="provinces" type="geojson" data="https://raw.githubusercontent.com/mgubels/argentina-geojson/master/provincias.json">
                 <Layer {...baseLayer} />
                 <Layer {...highlightLayer} />
              </Source>

              <NavigationControl position="top-left" />
              <FullscreenControl position="top-left" />

              {LOCATIONS.map(loc => (
                <Marker
                  key={loc.id}
                  longitude={loc.lng}
                  latitude={loc.lat}
                  anchor="bottom"
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    onMarkerClick(loc);
                  }}
                >
                  <div className={`p-2 rounded-full border-2 transition-all duration-500 cursor-pointer shadow-[0_0_15px_rgba(110,231,255,0.4)] hover:scale-125 ${selectedLocation.id === loc.id ? 'bg-brand-400 border-white scale-110' : 'bg-black/80 border-brand-400/50'}`}>
                     <MapPin size={16} className={selectedLocation.id === loc.id ? 'text-black' : 'text-brand-400'} />
                  </div>
                </Marker>
              ))}
            </Map>
            
            {/* Visual Decor Overlays */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-50">
               <div className="p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded font-sans text-[10px] text-white/40 tracking-widest uppercase">
                  Telemetry // {viewState.latitude.toFixed(4)}N {viewState.longitude.toFixed(4)}W
               </div>
            </div>
          </div>

          {/* Details Panel (Detail) */}
          <div className="w-full lg:w-2/5 h-full flex flex-col overflow-hidden bg-black/40 relative">
             {/* Dashboard Header */}
             <div className="p-10 border-b border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 text-brand-400 font-sans text-[9px] uppercase tracking-widest font-bold mb-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                   Sector Detail
                </div>
                <h3 className="text-white font-serif text-4xl md:text-5xl tracking-widest uppercase mb-6">{selectedLocation.name}</h3>
                <p className="text-white/40 font-sans text-sm leading-relaxed mb-0 italic border-l border-brand-400/30 pl-5 py-2">
                   {selectedLocation.description}
                </p>
             </div>

             {/* Events List (Scrollable) */}
             <div className="flex-1 overflow-y-auto p-10 space-y-16 custom-scrollbar">
                {selectedLocation.events.map((event, idx) => (
                  <div key={idx} className="group flex items-start gap-8 border-b border-white/5 pb-12 last:border-0 hover:bg-white/[0.02] transition-all duration-300 -mx-6 px-6 rounded-xl">
                     {/* Event Logo (Optimized) */}
                     <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center group-hover:border-brand-400/30 transition-colors relative">
                        <OptimizedImage
                            publicId={event.logoId}
                            alt={event.name}
                            variant="thumb"
                            className="w-full h-full"
                            imgClassName="p-4 group-hover:scale-110 transition-transform duration-500 relative z-20 object-contain"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/5 uppercase tracking-widest text-center px-2 z-10">
                           {event.name}
                        </div>
                     </div>

                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-5">
                           <span className="text-brand-400 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">{event.city}</span>
                           <div className="w-[1px] h-3 bg-white/20" />
                           <span className="text-white/30 font-sans text-[10px] uppercase tracking-widest">{event.type}</span>
                        </div>
                        <h4 className="text-white font-serif text-2xl md:text-3xl tracking-wide uppercase mb-6 group-hover:text-brand-400 transition-colors">
                           {event.name}
                        </h4>
                        
                        <div className="flex flex-wrap gap-2">
                            {event.years.map((year, yidx) => (
                                <span key={yidx} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded font-sans text-[10px] text-white/50 tracking-wider">
                                    {year}
                                </span>
                            ))}
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             {/* Footer Stats Decor */}
             <div className="p-5 bg-[#050505] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400/30" />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400/30" />
                   </div>
                   <span className="text-[9px] text-white/20 uppercase tracking-[0.4em]">MISSION ARCHIVE // 0{selectedLocation.events.length} RECORDS</span>
                </div>
                <div className="font-sans text-[9px] text-white/10 tracking-[0.2em] uppercase">Status // Verified</div>
             </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(110, 231, 255, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(110, 231, 255, 0.4);
        }
        
        /* Hide Mapbox Branding */
        .mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }

        /* Dark Mode for Mapbox Controls */
        .mapboxgl-ctrl-group {
          background: rgba(10, 10, 10, 0.9) !important;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        .mapboxgl-ctrl-group button {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          transition: background 0.2s ease;
        }
        .mapboxgl-ctrl-group button:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .mapboxgl-ctrl-group button:last-child {
          border-bottom: none !important;
        }
        .mapboxgl-ctrl-icon {
          filter: invert(1) brightness(2) !important;
          opacity: 0.5;
          transition: opacity 0.2s ease;
        }
        .mapboxgl-ctrl-group button:hover .mapboxgl-ctrl-icon {
          opacity: 1;
        }
      `}} />
    </section>
  );
}
