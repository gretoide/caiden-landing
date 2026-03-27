import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { Globe, Trophy } from 'lucide-react';
import type { FillLayer, LineLayer } from 'react-map-gl';
import OptimizedImage from '../ui/OptimizedImage';

// Configuration
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const SECTION_BG = '#050505';
const BRAND_400 = '#60a5fa';

// Custom Styles
const CUSTOM_STYLES = `
  .custom-scrollbar::-webkit-scrollbar { width: 3px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
  .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib { display: none !important; }
  .mapboxgl-ctrl-group { background: rgba(10, 10, 10, 0.7) !important; backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 4px !important; }
  .mapboxgl-ctrl-icon { filter: invert(1) brightness(2) opacity(0.5); }
`;

// Helper for Achievement Colors
const getRankStyles = (rank?: string) => {
  if (!rank) return '';
  if (rank.includes('1º')) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
  if (rank.includes('2º')) return 'bg-slate-400/10 text-slate-400 border-slate-400/20';
  if (rank.includes('3º')) return 'bg-orange-700/10 text-orange-700 border-orange-700/20';
  return 'bg-brand-400/10 text-brand-400 border-brand-400/20';
};

const LOCATIONS = [
  {
    id: 'entre-rios',
    name: 'Entre Ríos',
    provinceName: 'Entre Ríos', 
    country: 'Argentina',
    lat: -31.7747,
    lng: -60.4956,
    description: 'Central operations hub with a rich history of recurring conventions and thematic festivals in Paraná and Concordia.',
    events: [
      { city: 'Paraná', name: 'Asia Fest', logoId: '2016_Jul_wddizo', years: ['2016', '2017', '2018', '2019'], type: 'Festival', rank: '1º Puesto' },
      { city: 'Paraná', name: 'Zombie Walk', logoId: '2018_Nov_m4b5rz', years: ['2016', '2017'], type: 'Themed' },
      { city: 'Concordia', name: 'Frikimania', logoId: '2019_Feb_i8ywbx', years: ['2017', '2018', '2019', '2020', '2021', '2022', '2024'], type: 'Convention', rank: '1º Puesto' },
      { city: 'Paraná', name: 'Neko Fest', logoId: '2017_May_kcz85v', years: ['2017', '2018'], type: 'Fan Event' },
      { city: 'Paraná', name: 'Mirai Fest', logoId: '2022_Feb_niodok', years: ['2022', '2023'], type: 'Festival' },
      { city: 'Paraná', name: 'Kyubi Fest', logoId: '2018_Abril_2_yo6cug', years: ['2018'], type: 'Festival' },
      { city: 'Concordia', name: 'Gamer Fest', logoId: '2023_May_2_m6mzrr', years: ['2023'], type: 'Gaming' },
      { city: 'Paraná', name: 'Paraná Comic Con', logoId: '2024_May_2_nnfc8i', years: ['2024'], type: 'Comic Con' },
      { city: 'Paraná', name: 'Neo Freak', logoId: '2024_Ago_1_m01lci', years: ['2024'], type: 'Convention' }
    ]
  },
  {
    id: 'misiones',
    name: 'Misiones',
    provinceName: 'Misiones',
    country: 'Argentina',
    lat: -27.3671,
    lng: -55.8961,
    description: 'Northeastern operations with focus on long-running series like Ichi Ni San in Posadas.',
    events: [
      { city: 'Posadas', name: 'Ichi Ni San Fest', logoId: '2016_Nov_udjntt', years: ['2016', '2023'], type: 'Festival' },
      { city: 'Posadas', name: 'Cosplay & Games', logoId: '2017_Ago_2_z4f0xp', years: ['2017'], type: 'Gaming' }
    ]
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires / CABA',
    provinceName: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.6037,
    lng: -58.3816,
    description: 'National capital operations and major event headquarters, including international Comic Con brand.',
    events: [
      { city: 'CABA', name: 'Anime Con', logoId: '2023_Sep_2_npt6jh', years: ['2022', '2024'], type: 'Mega', rank: '2º Puesto' },
      { city: 'CABA', name: 'Comic Con', logoId: '2023_Dec_sevrvj', years: ['2023', '2024'], type: 'International', rank: '2º Puesto' },
      { city: 'Bs As', name: 'Kawaii Koto', logoId: '2023_Sep_1_ajbiqh', years: ['2023'], type: 'Culture' },
      { city: 'CABA', name: 'Martin Fierro Digital', logoId: '2024_Ago_3_rlvmal', years: ['2024'], type: 'Awards' },
      { city: 'CABA', name: 'AGS', logoId: '2023_Oct_kja7mq', years: ['2023'], type: 'Awards', rank: '1º Puesto' }
    ]
  },
  {
    id: 'santa-cruz',
    name: 'Santa Cruz',
    provinceName: 'Santa Cruz',
    country: 'Argentina',
    lat: -51.62,
    lng: -69.21,
    description: 'Deep south operational coverage and extreme environment deployments in Gallegos.',
    events: [
      { city: 'Gallegos', name: 'Kogarashi Fest', logoId: '2024_May_1_tiod5h', years: ['2024'], type: 'Festival' },
      { city: 'Gallegos', name: 'Feña', logoId: '2024_Nov_2_tn9sgf', years: ['2024'], type: 'Themed', rank: '2º Puesto' }
    ]
  },
  {
    id: 'chubut',
    name: 'Chubut',
    provinceName: 'Chubut',
    country: 'Argentina',
    lat: -43.29,
    lng: -65.10,
    description: 'Patagonian presence through strategic event collaborations.',
    events: [
      { city: 'Trelew', name: 'Banzai', logoId: '2017_Ago_1_ebbazm', years: ['2017'], type: 'Fan Event' }
    ]
  },
  {
    id: 'formosa',
    name: 'Formosa',
    provinceName: 'Formosa',
    country: 'Argentina',
    lat: -26.18,
    lng: -58.17,
    description: 'Northern frontier brand integrations.',
    events: [
      { city: 'Formosa', name: 'AVK Natsu Geek', logoId: '2018_Ene_zfirdd', years: ['2018'], type: 'Geek' }
    ]
  },
  {
    id: 'santiago-del-estero',
    name: 'Santiago del Estero',
    provinceName: 'Santiago del Estero',
    country: 'Argentina',
    lat: -27.78,
    lng: -64.26,
    description: 'North-central regional deployments.',
    events: [
      { city: 'Santiago', name: 'Anime Town', logoId: '2018_Abril_1_t2twv4', years: ['2018'], type: 'Festival' }
    ]
  },
  {
    id: 'santa-fe',
    name: 'Santa Fe',
    provinceName: 'Santa Fe',
    country: 'Argentina',
    lat: -31.63,
    lng: -60.70,
    description: 'Major regional coordination and commercial integrations.',
    events: [
      { city: 'Santa Fe', name: 'D.M.O', logoId: '2019_Mar_a4qoex', years: ['2019'], type: 'Exhibition' }
    ]
  },
  {
    id: 'rio-negro',
    name: 'Río Negro',
    provinceName: 'Río Negro',
    country: 'Argentina',
    lat: -40.81,
    lng: -63.00,
    description: 'Southern operational baseline in Viedma region.',
    events: [
      { city: 'Viedma', name: 'Comarca Fest', logoId: '2019_Jul_gwrkyu', years: ['2019'], type: 'Festival' }
    ]
  },
  {
    id: 'cordoba',
    name: 'Córdoba',
    provinceName: 'Córdoba',
    country: 'Argentina',
    lat: -31.42,
    lng: -64.18,
    description: 'Central logistic and marketing hub for nationwide events.',
    events: [
      { city: 'Córdoba', name: 'CAF', logoId: '2023_Abr_dssdkl', years: ['2023'], type: 'Convention' }
    ]
  },
  {
    id: 'la-pampa',
    name: 'La Pampa',
    provinceName: 'La Pampa',
    country: 'Argentina',
    lat: -36.61,
    lng: -64.28,
    description: 'Strategic integrations for national gaming expos.',
    events: [
      { city: 'Sta Rosa', name: 'Fan Expo 4.0 x AGS', logoId: '2023_Sep_3_f6pict', years: ['2023'], type: 'Gaming' }
    ]
  },
  {
    id: 'chaco',
    name: 'Chaco',
    provinceName: 'Chaco',
    country: 'Argentina',
    lat: -27.45,
    lng: -58.98,
    description: 'Northeastern regional brand reach.',
    events: [
      { city: 'Resistencia', name: 'Comic World', logoId: '2023_Nov_wbqtbx', years: ['2023'], type: 'Comic Con' }
    ]
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    provinceName: 'Uruguay',
    country: 'Uruguay',
    lat: -34.90,
    lng: -56.16,
    description: 'International expansion and cross-border collaborations.',
    events: [
      { city: 'Montevideo', name: 'Expo Convention', logoId: '2024_Abr_sv4yve', years: ['2024'], type: 'International' }
    ]
  },
  {
    id: 'jujuy',
    name: 'Jujuy',
    provinceName: 'Jujuy',
    country: 'Argentina',
    lat: -24.18,
    lng: -65.30,
    description: 'Northernmost operational sector tracking.',
    events: [
      { city: 'Jujuy', name: 'FunnAnime', logoId: '2024_Sep_2_vyqyqb', years: ['2024'], type: 'Anime' }
    ]
  },
  {
    id: 'san-luis',
    name: 'San Luis',
    provinceName: 'San Luis',
    country: 'Argentina',
    lat: -33.30,
    lng: -66.33,
    description: 'Cuyo region strategic integrations.',
    events: [
      { city: 'San Luis', name: '3DFest', logoId: '2024_Oct_2_gj9wxq', years: ['2024'], type: 'Festival' }
    ]
  },
  {
    id: 'corrientes',
    name: 'Corrientes',
    provinceName: 'Corrientes',
    country: 'Argentina',
    lat: -27.46,
    lng: -58.83,
    description: 'Mesopotamian regional coordination and fan engagement.',
    events: [
      { city: 'Corrientes', name: 'K-Anime', logoId: '2024_Nov_1_zkt9qu', years: ['2024'], type: 'Anime' }
    ]
  }
];

export default function EventMap() {
  const [selectedLocation, setSelectedLocation] = useState<typeof LOCATIONS[0] | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -63.6167,
    latitude: -38.4161,
    zoom: 3.5,
    pitch: 0,
    bearing: 0
  });

  const allEvents = useMemo(() => {
    return LOCATIONS.flatMap(loc => 
      loc.events.map(event => ({
        ...event,
        provinceName: loc.name,
        lat: loc.lat,
        lng: loc.lng,
        locId: loc.id
      }))
    ).sort((a, b) => {
        const latestA = Math.max(...a.years.map(Number));
        const latestB = Math.max(...b.years.map(Number));
        return latestB - latestA;
    });
  }, []);

  const onMarkerClick = useCallback((loc: typeof LOCATIONS[0]) => {
    setSelectedLocation(loc);
    setViewState(prev => ({
      ...prev,
      longitude: loc.lng,
      latitude: loc.lat,
      zoom: 5.5,
      transitionDuration: 1200
    }));
  }, []);

  const onMapClick = useCallback(() => {
    setSelectedLocation(null);
    setViewState(prev => ({
      ...prev,
      zoom: 3.5,
      transitionDuration: 1000
    }));
  }, []);

  const highlightLayer: FillLayer = useMemo(() => ({
    id: 'province-highlight',
    type: 'fill',
    source: 'provinces',
    paint: {
      'fill-color': BRAND_400,
      'fill-opacity': 0.05,
    },
    filter: ['==', ['get', 'nombre'], selectedLocation?.provinceName || '']
  }), [selectedLocation]);

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
    <section id="events" className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Header Container */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 px-4">
          <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-[1px] bg-brand-400/60" />
                 <span className="text-brand-400 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">Operational Network</span>
              </div>
              <h2 className="text-white font-serif text-4xl md:text-5xl tracking-[0.2em] leading-none mb-6">EVENTS</h2>
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
        <div className="flex flex-col lg:flex-row w-full h-[850px] bg-[#050505] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Left Panel: Map */}
          <div className="w-full lg:w-3/5 h-[400px] lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/5">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              onClick={onMapClick}
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
                 <Layer {...highlightLayer} />
                 <Layer {...lineLayer} />
              </Source>

              {LOCATIONS.map(loc => {
                return (
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
                    <div className="cursor-pointer transition-all duration-300 hover:scale-110">
                      <div 
                        className={`relative rounded-full rounded-br-none bg-brand-400 rotate-[45deg] flex items-center justify-center border border-white/20 transition-all duration-500 ${
                          selectedLocation?.id === loc.id ? 'w-10 h-10 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.4)]' : 'w-8 h-8 opacity-80'
                        }`}
                      >
                        <div className="w-[30%] h-[30%] bg-[#050505] rounded-full rotate-[-45deg]" />
                      </div>
                    </div>
                  </Marker>
                );
              })}
            </Map>
          </div>

          {/* Right Panel: Event List */}
          <div className="w-full lg:w-2/5 h-full flex flex-col overflow-hidden bg-[#0a0a0a] relative">
             
             {/* List Header */}
             <div className="p-10 border-b border-white/5 bg-[#0a0a0a]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3 text-brand-400 font-sans text-[9px] uppercase tracking-[0.4em] font-bold">
                        <div className={`w-1.5 h-1.5 rounded-full bg-brand-400 ${selectedLocation ? 'animate-pulse' : ''}`} />
                        {selectedLocation ? 'SECTOR PROFILE' : 'ALL EVENTS'}
                    </div>
                    <h3 className="text-white font-serif text-3xl md:text-4xl tracking-[0.1em] uppercase leading-tight italic">
                        {selectedLocation ? selectedLocation.name : 'ALL EVENTS'}
                    </h3>
                  </div>
                  {selectedLocation && (
                    <button 
                      onClick={onMapClick}
                      className="text-[11px] text-white/40 hover:text-brand-400 font-sans uppercase tracking-[0.2em] flex items-center gap-2 transition-all group/back border border-white/10 hover:border-brand-400/30 px-4 py-2 rounded-full bg-white/[0.04] shadow-lg self-start mt-1"
                    >
                      <span className="opacity-40 group-hover/back:opacity-100 transition-opacity translate-x-1 group-hover/back:translate-x-0 transition-transform text-lg">«</span>
                      Return to All
                    </button>
                  )}
                </div>
                <p className="text-white/30 font-sans text-xs leading-relaxed mb-0 pl-5 border-l border-brand-400/20 italic">
                   {selectedLocation 
                    ? selectedLocation.description 
                    : 'Consolidated tracking of all operational history across the Southern Cone. Click a marker or event to explore.'}
                </p>
             </div>

             {/* Scrollable list */}
             <div className="flex-1 overflow-y-auto p-8 pt-10 space-y-4 custom-scrollbar bg-black/10">
                {(selectedLocation ? selectedLocation.events : allEvents).map((event: any, idx) => {
                  const isGold = (event.rank || '').includes('1º');
                  
                  return (
                    <div key={idx} 
                      className="group flex items-start gap-8 border-b border-white/5 pb-8 pt-4 last:border-0 transition-all duration-300 -mx-4 px-8 rounded-xl cursor-pointer hover:bg-white/[0.03] relative overflow-hidden"
                      onClick={() => {
                          if (!selectedLocation && 'locId' in event) {
                              const loc = LOCATIONS.find(l => l.id === event.locId);
                              if (loc) onMarkerClick(loc);
                          }
                      }}
                    >
                       <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden flex items-center justify-center relative bg-black/20 rounded-lg">
                        <OptimizedImage
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
                        <div className="flex items-center gap-3 mb-3">
                           <span className="text-brand-400 font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                                {selectedLocation ? event.city : event.provinceName}
                            </span>
                           <div className="w-[1px] h-3 bg-white/10" />
                           <span className="text-white/20 font-sans text-[9px] uppercase tracking-widest">{event.type}</span>
                        </div>
                         <div className="flex items-center gap-4 mb-4">
                             <h4 className="text-white font-serif text-xl md:text-2xl tracking-wide uppercase group-hover:text-brand-400 transition-colors">
                                {event.name}
                             </h4>
                             {event.rank && (
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getRankStyles(event.rank)}`}>
                                    <Trophy size={10} className={isGold ? 'animate-pulse' : ''} />
                                    {event.rank}
                                </div>
                             )}
                         </div>
                        
                        <div className="flex flex-wrap gap-1.5">
                            {event.years.map((year: string, yidx: number) => (
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
                        LOC_ENTRIES: {selectedLocation ? selectedLocation.events.length : allEvents.length}
                   </span>
                </div>
                <div className="font-mono text-[8px] text-brand-400/30 tracking-[0.2em] uppercase">LINK // ACTIVE</div>
             </div>
          </div>
        </div>
      </div>

       <style dangerouslySetInnerHTML={{ __html: CUSTOM_STYLES }} />
    </section>
  );
}
