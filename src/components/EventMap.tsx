import { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl';
import { MapPin, Globe, ChevronRight } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const LOCATIONS = [
  {
    id: 'entre-rios',
    name: 'Entre Ríos',
    country: 'Argentina',
    lat: -31.7747,
    lng: -60.4956,
    description: 'Trabajado en colaboración con reconocidas marcas a lo largo y ancho del país en reconocidos eventos. A modo de marketing y publicidad de las marcas asociadas.',
    events: [
      {
        city: 'Concordia',
        name: 'Asia Fest',
        years: ['2015 July', '2016 July', '2017 August', '2018 July', '2019 August'],
        type: 'Festival'
      },
      {
        city: 'Paraná',
        name: 'Ani Chan',
        years: ['2015 August'],
        type: 'Convention'
      },
      {
        city: 'Concordia',
        name: 'Friki Mania',
        years: ['2017 January', '2018 February', '2019 February', '2020 October', '2021 February', '2022 May', '2022 November', '2023 August', '2024 July'],
        type: 'Theme Event'
      },
      {
        city: 'Paraná',
        name: 'Tin & B-Bop',
        years: ['2023 May'],
        type: 'Exhibition'
      },
      {
        city: 'Concordia',
        name: 'Gamer Fest',
        years: ['2023 May'],
        type: 'Gaming'
      },
      {
        city: 'Gualeguaychú',
        name: 'Neo Freak',
        years: ['2024 August'],
        type: 'Convention'
      },
      {
        city: 'Paraná',
        name: 'Paraná Con',
        years: ['2024 May'],
        type: 'Comic Con'
      }
    ]
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.6037,
    lng: -58.3816,
    description: 'Capital city missions and major convention centers setup.',
    events: [
        { city: 'CABA', name: 'Argentina Comic Con', years: ['2023 December'], type: 'Mega Event' },
        { city: 'CABA', name: 'Gamescom (Global Outreach)', years: ['2024'], type: 'International' }
    ]
  }
];

export default function EventMap() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [viewState, setViewState] = useState({
    longitude: -60.4956,
    latitude: -31.7747,
    zoom: 5.5,
    pitch: 0,
    bearing: 0
  });

  const onMarkerClick = useCallback((loc: typeof LOCATIONS[0]) => {
    setSelectedLocation(loc);
    setViewState(prev => ({
      ...prev,
      longitude: loc.lng,
      latitude: loc.lat,
      zoom: 6.5,
      transitionDuration: 1000
    }));
  }, []);

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
             <div className="text-white/20 text-[9px] uppercase tracking-widest">MAPBOX ENGINE • .ENV SECURE • DARK 2D</div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="flex flex-col lg:flex-row w-full h-[700px] bg-[#080808] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Map Section (Master) */}
          <div className="w-full lg:w-3/5 h-[350px] lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/10">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              onLoad={(e) => {
                const map = e.target;
                // Ajuste de colores táctico (Tierra Azul / Mar Negro)
                if (map.getLayer('water')) {
                  map.setPaintProperty('water', 'fill-color', '#050505'); // MAR NEGRO
                }
                if (map.getLayer('background')) {
                  map.setPaintProperty('background', 'background-color', '#0a1b2e'); // FONDO AZUL PROFUNDO
                }
                if (map.getLayer('land')) {
                  map.setPaintProperty('land', 'fill-color', '#0e243d'); // TIERRA AZULADA
                }
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              attributionControl={false}
            >
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
          <div className="w-full lg:w-2/5 h-full flex flex-col overflow-hidden bg-black/40">
             {/* Dashboard Header */}
             <div className="p-8 border-b border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 text-brand-400 font-sans text-[9px] uppercase tracking-widest font-bold mb-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                   Sector Detail
                </div>
                <h3 className="text-white font-serif text-3xl md:text-4xl tracking-widest uppercase mb-4">{selectedLocation.name}</h3>
                <p className="text-white/40 font-sans text-sm leading-relaxed mb-0 italic border-l border-brand-400/30 pl-4 py-1">
                   {selectedLocation.description}
                </p>
             </div>

             {/* Events List (Scrollable) */}
             <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
                {selectedLocation.events.map((event, idx) => (
                  <div key={idx} className="group flex justify-between gap-6 border-b border-white/5 pb-8 last:border-0 hover:bg-white/[0.02] transition-all duration-300 -mx-4 px-4 rounded-lg">
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="text-brand-400 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">{event.city}</span>
                           <div className="w-[1px] h-3 bg-white/20" />
                           <span className="text-white/30 font-sans text-[10px] uppercase tracking-widest">{event.type}</span>
                        </div>
                        <h4 className="text-white font-serif text-2xl tracking-wide uppercase mb-4 group-hover:text-brand-400 transition-colors">
                           {event.name}
                        </h4>
                        {/* Status bar decor */}
                        <div className="w-12 h-[1px] bg-white/10 group-hover:w-full group-hover:bg-brand-400/40 transition-all duration-500" />
                     </div>
                     
                     <div className="text-right shrink-0">
                        {event.years.map((year, yidx) => (
                          <div key={yidx} className="text-white/60 font-sans text-xs mb-1 tracking-widest group-hover:text-white transition-colors">
                             {year}
                          </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>

             {/* Footer Stats Decor */}
             <div className="p-4 bg-[#050505] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-brand-400" />
                      <div className="w-1 h-1 rounded-full bg-brand-400/30" />
                      <div className="w-1 h-1 rounded-full bg-brand-400/30" />
                   </div>
                   <span className="text-[8px] text-white/20 uppercase tracking-[0.4em]">MISSION ARCHIVE // 0{selectedLocation.events.length} RECORDS</span>
                </div>
                <button 
                  className="text-brand-400/60 hover:text-brand-400 font-sans text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors group"
                >
                   Full Report <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </button>
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
