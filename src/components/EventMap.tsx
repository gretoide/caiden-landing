import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl';
import { Globe } from 'lucide-react';
import type { FillLayer, LineLayer } from 'react-map-gl';
import OptimizedImage from './OptimizedImage';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const BRAND_400 = '#60a5fa'; 
const SECTION_BG = '#050505'; 

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
      { city: 'Paraná', name: 'Asia Fest', logoId: 'asia-fest', years: ['2016', '2017', '2018', '2019'], type: 'Festival' },
      { city: 'Paraná', name: 'Zombie Walk', logoId: 'zombie-walk', years: ['2016', '2017'], type: 'Themed' },
      { city: 'Concordia', name: 'Frikimania', logoId: 'frikimania', years: ['2017', '2018', '2019', '2020', '2021', '2022', '2024'], type: 'Convention' },
      { city: 'Paraná', name: 'Neko Fest', logoId: 'neko-fest', years: ['2017', '2018'], type: 'Fan Event' },
      { city: 'Paraná', name: 'Mirai Fest', logoId: 'mirai-fest', years: ['2022', '2023'], type: 'Festival' },
      { city: 'Paraná', name: 'Kyubi Fest', logoId: 'kyubi-fest', years: ['2018'], type: 'Festival' },
      { city: 'Concordia', name: 'Gamer Fest', logoId: 'gamer-fest', years: ['2023'], type: 'Gaming' },
      { city: 'Paraná', name: 'Paraná Comic Con', logoId: 'parana-comic-con', years: ['2024'], type: 'Comic Con' },
      { city: 'Paraná', name: 'Neo Freak', logoId: 'neo-freak', years: ['2024'], type: 'Convention' }
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
      { city: 'Posadas', name: 'Ichi Ni San Fest', logoId: 'ichi-ni-san', years: ['2016', '2023'], type: 'Festival' },
      { city: 'Posadas', name: 'Cosplay & Games', logoId: 'cosplay-games', years: ['2017'], type: 'Gaming' }
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
      { city: 'CABA', name: 'Anime Con', logoId: 'anime-con', years: ['2022', '2024'], type: 'Mega' },
      { city: 'CABA', name: 'Comic Con', logoId: 'comic-con', years: ['2023', '2024'], type: 'International' },
      { city: 'Bs As', name: 'Kawaii Koto', logoId: 'kawaii-koto', years: ['2023'], type: 'Culture' },
      { city: 'CABA', name: 'Martin Fierro Digital', logoId: 'martin-fierro-digital', years: ['2024'], type: 'Awards' }
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
      { city: 'Gallegos', name: 'Kogarashi Fest', logoId: 'kogarashi-fest', years: ['2024'], type: 'Festival' },
      { city: 'Gallegos', name: 'Feña', logoId: 'fena', years: ['2024'], type: 'Themed' }
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
      { city: 'Trelew', name: 'Banzai', logoId: 'banzai', years: ['2017'], type: 'Fan Event' }
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
      { city: 'Formosa', name: 'AVK Natsu Geek', logoId: 'avk-natsu-geek', years: ['2018'], type: 'Geek' }
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
      { city: 'Santiago', name: 'Anime Town', logoId: 'anime-town', years: ['2018'], type: 'Festival' }
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
      { city: 'Santa Fe', name: 'D.M.O', logoId: 'dmo', years: ['2019'], type: 'Exhibition' }
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
      { city: 'Viedma', name: 'Comarca Fest', logoId: 'comarca-fest', years: ['2019'], type: 'Festival' }
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
      { city: 'Córdoba', name: 'CAF', logoId: 'caf', years: ['2023'], type: 'Convention' }
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
      { city: 'Sta Rosa', name: 'Fan Expo 4.0 x AGS', logoId: 'fan-expo-ags', years: ['2023'], type: 'Gaming' }
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
      { city: 'Resistencia', name: 'Comic World', logoId: 'comic-world', years: ['2023'], type: 'Comic Con' }
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
      { city: 'Montevideo', name: 'Expo Convention', logoId: 'expo-convention', years: ['2024'], type: 'International' }
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
      { city: 'Jujuy', name: 'FunnAnime', logoId: 'funnanime', years: ['2024'], type: 'Anime' }
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
      { city: 'San Luis', name: '3DFest', logoId: '3dfest', years: ['2024'], type: 'Festival' }
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
      { city: 'Corrientes', name: 'K-Anime', logoId: 'k-anime', years: ['2024'], type: 'Anime' }
    ]
  }
];

export default function EventMap() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [viewState, setViewState] = useState({
    longitude: -63.6167,
    latitude: -38.4161,
    zoom: 3.5,
    pitch: 0,
    bearing: 0
  });

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

  const highlightLayer: FillLayer = useMemo(() => ({
    id: 'province-highlight',
    type: 'fill',
    source: 'provinces',
    paint: {
      'fill-color': BRAND_400,
      'fill-opacity': 0.05,
    },
    filter: ['==', ['get', 'nombre'], selectedLocation.provinceName]
  }), [selectedLocation.provinceName]);

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
        
        {/* Header */}
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

        <div className="flex flex-col lg:flex-row w-full h-[850px] bg-[#050505] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="w-full lg:w-3/5 h-[400px] lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/5">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
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
                  <div className="cursor-pointer transition-all duration-300 hover:scale-110">
                    <div 
                      className={`relative rounded-full rounded-br-none bg-brand-400 rotate-[45deg] flex items-center justify-center border border-white/20 transition-all duration-500 ${
                        selectedLocation.id === loc.id ? 'w-8 h-8 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.4)]' : 'w-6 h-6 opacity-80'
                      }`}
                    >
                      <div className="w-[30%] h-[30%] bg-[#050505] rounded-full" />
                    </div>
                  </div>
                </Marker>
              ))}
            </Map>
          </div>

          <div className="w-full lg:w-2/5 h-full flex flex-col overflow-hidden bg-[#0a0a0a] relative">
             <div className="p-10 border-b border-white/5 bg-[#0a0a0a]">
                <div className="flex items-center gap-3 text-brand-400 font-sans text-[9px] uppercase tracking-[0.4em] font-bold mb-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                   Sector Profile
                </div>
                <h3 className="text-white font-serif text-3xl md:text-4xl tracking-[0.1em] uppercase mb-6 leading-tight italic">{selectedLocation.name}</h3>
                <p className="text-white/30 font-sans text-xs leading-relaxed mb-0 pl-5 border-l border-brand-400/20 italic">
                   {selectedLocation.description}
                </p>
             </div>

             <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-black/10">
                {selectedLocation.events.map((event, idx) => (
                  <div key={idx} className="group flex items-start gap-8 border-b border-white/5 pb-10 last:border-0 transition-all duration-300 -mx-4 px-4 rounded-lg">
                     <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center relative">
                        <OptimizedImage
                            publicId={event.logoId}
                            alt={event.name}
                            variant="thumb"
                            className="w-full h-full"
                             objectFit="contain"
                            imgClassName="p-3 group-hover:scale-110 transition-transform duration-700 relative z-20"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[7px] text-white/5 uppercase tracking-widest text-center px-2 z-10 opacity-40">
                           {event.name}
                        </div>
                     </div>

                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                           <span className="text-brand-400 font-sans text-[10px] uppercase tracking-[0.2em] font-bold">{event.city}</span>
                           <div className="w-[1px] h-3 bg-white/10" />
                           <span className="text-white/20 font-sans text-[9px] uppercase tracking-widest">{event.type}</span>
                        </div>
                        <h4 className="text-white font-serif text-xl md:text-2xl tracking-wide uppercase mb-4 group-hover:text-brand-400 transition-colors">
                           {event.name}
                        </h4>
                        
                        <div className="flex flex-wrap gap-1.5">
                            {event.years.map((year, yidx) => (
                                <span key={yidx} className="px-2 py-0.5 bg-white/[0.02] border border-white/[0.05] rounded text-[9px] text-white/30 tracking-wider">
                                    {year}
                                </span>
                            ))}
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="p-6 bg-[#050505] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 opacity-30">
                   <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-brand-400" />
                      <div className="w-2 h-1 rounded-full bg-white" />
                   </div>
                   <span className="text-[8px] text-white uppercase tracking-[0.3em]">LOC_ENTRIES: {selectedLocation.events.length}</span>
                </div>
                <div className="font-mono text-[8px] text-brand-400/30 tracking-[0.2em] uppercase">LINK // ACTIVE</div>
          </div>
        </div>
      </div>
     </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib { display: none !important; }
        .mapboxgl-ctrl-group { background: rgba(10, 10, 10, 0.7) !important; backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 4px !important; }
        .mapboxgl-ctrl-icon { filter: invert(1) brightness(2) opacity(0.5); }
      `}} />
    </section>
  );
}
