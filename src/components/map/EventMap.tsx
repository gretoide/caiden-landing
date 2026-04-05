import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { Globe, ChevronDown, Plus, Minus, Star } from 'lucide-react';
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

const LOCATIONS = [
  {
    id: 'entre-rios',
    name: 'Entre Ríos',
    provinceName: 'Entre Ríos', 
    country: 'Argentina',
    lat: -31.7747,
    lng: -60.4956,
    description: 'Central hub with a rich history of brand collaborations across Concordia, Paraná, and the Uruguay River region.',
    events: [
      { city: 'Concordia', name: 'Frikimania', logoId: '2019_Feb_i8ywbx', years: ['2017', '2018', '2019', '2020', '2021', '2022', '2024'], type: 'CONVENTION' },
      { city: 'Paraná', name: 'Paraná Comic Con', logoId: '2024_May_2_nnfc8i', years: ['2024'], type: 'INTERNATIONAL' },
      { city: 'Gualeguaychú', name: 'Neo Freak', logoId: '2024_Ago_1_m01lci', years: ['2024'], type: 'CONVENTION' },
      { city: 'Villa Elisa', name: 'Mirai Fest', logoId: '2022_Feb_niodok', years: ['2022', '2023'], type: 'FESTIVAL' },
      { city: 'Concordia', name: 'Gamer Fest', logoId: '2023_May_2_m6mzrr', years: ['2023'], type: 'GAMING EXHIBITION' },
      { city: 'Concordia', name: 'Asia Fest', logoId: '2016_Jul_wddizo', years: ['2016', '2017', '2018', '2019'], type: 'FESTIVAL' },
      { city: 'Villaguay', name: 'Neko Fest', logoId: '2017_May_kcz85v', years: ['2017', '2018'], type: 'FAN EVENT' },
      { city: 'Colón', name: 'Kyubi Fest', logoId: '2018_Abril_2_yo6cug', years: ['2018'], type: 'FESTIVAL' },
      { city: 'Concordia', name: 'Zombie Walk', logoId: '2018_Nov_m4b5rz', years: ['2016', '2017'], type: 'THEMED' }
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
      { city: 'Posadas', name: 'Ichi Ni San Fest', logoId: '2016_Nov_udjntt', years: ['2016', '2023'], type: 'FESTIVAL' },
      { city: 'Posadas', name: 'Cosplay & Games', logoId: '2017_Ago_2_z4f0xp', years: ['2017'], type: 'GAMING EXHIBITION' }
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
      { city: 'CABA', name: 'Comic Con', logoId: '2023_Dec_sevrvj', years: ['2023', '2024', '2025'], type: 'INTERNATIONAL' },
      { city: 'CABA', name: 'Anime Con', logoId: '2023_Sep_2_npt6jh', years: ['2022', '2024'], type: 'INTERNATIONAL' },
      { city: 'CABA', name: 'AGS', logoId: '2023_Oct_kja7mq', years: ['2023'], type: 'GAMING EXHIBITION' },
      { city: 'Tandil', name: 'Kawaii Koto', logoId: '2023_Sep_1_ajbiqh', years: ['2023'], type: 'CULTURE' },
      { city: 'CABA', name: 'Martin Fierro Digital', logoId: '2024_Ago_3_rlvmal', years: ['2024'], type: 'AWARDS', rank: 'AWARD' }
    ]
  },
  {
    id: 'santa-cruz',
    name: 'Santa Cruz',
    provinceName: 'Santa Cruz',
    country: 'Argentina',
    lat: -51.62,
    lng: -69.21,
    description: 'Deep south operational coverage and extreme environment deployments.',
    events: [
      { city: 'Caleta Olivia', name: 'Kogarashi Fest', logoId: '2024_May_1_tiod5h', years: ['2024'], type: 'FESTIVAL' },
      { city: 'Gallegos', name: 'Feña', logoId: '2024_Nov_2_tn9sgf', years: ['2024'], type: 'THEMED' }
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
      { city: 'Chubut', name: 'Banzai', logoId: '2017_Ago_1_ebbazm', years: ['2017'], type: 'CONVENTION' }
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
      { city: 'Formosa', name: 'AVK Natsu Geek', logoId: '2018_Ene_zfirdd', years: ['2018'], type: 'CONVENTION' }
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
      { city: 'Santiago del Estero', name: 'Anime Town', logoId: '2018_Abril_1_t2twv4', years: ['2018'], type: 'FESTIVAL' }
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
      { city: 'Santa Fe', name: 'D.M.O', logoId: '2019_Mar_a4qoex', years: ['2019'], type: 'EXHIBITION' },
      { city: 'Rosario', name: 'Crack Bang Boom', logoId: '2023_Ago_2_ugqa2j', years: ['2024'], type: 'EVENT' }
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
      { city: 'Rio Negro', name: 'Comarca Fest', logoId: '2019_Jul_gwrkyu', years: ['2019'], type: 'FESTIVAL' }
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
      { city: 'Córdoba', name: 'CAF', logoId: '2023_Abr_dssdkl', years: ['2023'], type: 'CONVENTION' },
      { city: 'San Francisco', name: 'FrikiFest', logoId: '2024_Sep_1_oam2kd', years: ['2024'], type: 'EVENT' }
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
      { city: 'La Pampa', name: 'Fan Expo 4.0 x AGS', logoId: '2023_Sep_3_f6pict', years: ['2023'], type: 'GAMING EXHIBITION' }
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
      { city: 'Chaco', name: 'Comic World', logoId: '2023_Nov_wbqtbx', years: ['2023'], type: 'INTERNATIONAL' }
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
      { city: 'Montevideo', name: 'Expo Convention', logoId: '2024_Abr_sv4yve', years: ['2024'], type: 'INTERNATIONAL' }
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
      { city: 'Jujuy', name: 'Funnanime', logoId: '2024_Sep_2_vyqyqb', years: ['2024'], type: 'EXHIBITION' }
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
      { city: 'San Luis', name: '3DFest', logoId: '2024_Oct_2_gj9wxq', years: ['2024'], type: 'FESTIVAL' }
    ]
  },
  {
    id: 'corrientes',
    name: 'Corrientes',
    provinceName: 'Corrientes',
    country: 'Argentina',
    lat: -27.46,
    lng: -58.83,
    description: 'Mesopotamian regional coordination and brand awards.',
    events: [
      { city: 'Corrientes', name: 'K-Anime', logoId: '2024_Nov_1_zkt9qu', years: ['2024'], type: 'EVENT' },
      { city: 'Corrientes', name: 'Blaze Awards', logoId: 'B_jdz75u', years: ['2024'], type: 'AWARDS', rank: 'AWARD' }
    ]
  }
];

export default function EventMap() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -63.6167,
    latitude: -38.4161,
    zoom: 3.5,
    pitch: 0,
    bearing: 0
  });
  const [isInteracting, setIsInteracting] = useState(false);

  // Flatten and Jitter logic
  const allEventsWithCoords = useMemo(() => {
    // Group by lat/lng to apply jitter correctly
    const coordGroups: Record<string, number> = {};
    
    return LOCATIONS.flatMap(loc => 
      loc.events.map((event) => {
        const coordKey = `${loc.lat},${loc.lng}`;
        const indexInGroup = coordGroups[coordKey] || 0;
        coordGroups[coordKey] = indexInGroup + 1;

        // Apply a small deterministic jitter if there's more than one event at the same base coordinate
        // This creates a small circle or line effect so markers don't overlap
        const angle = (indexInGroup * 137.5) * (Math.PI / 180); // Golden angle for even distribution
        const radius = 0.04; // Roughly 4-5km offset
        const jitterLat = indexInGroup === 0 ? 0 : Math.cos(angle) * radius;
        const jitterLng = indexInGroup === 0 ? 0 : Math.sin(angle) * radius;

        return {
          ...event,
          id: `${loc.id}-${event.name.replace(/\s+/g, '-').toLowerCase()}`,
          provinceName: loc.name,
          description: loc.description,
          baseLat: loc.lat,
          baseLng: loc.lng,
          lat: loc.lat + jitterLat,
          lng: loc.lng + jitterLng,
          locId: loc.id
        };
      })
    ).sort((a, b) => {
        const latestA = Math.max(...a.years.map(Number));
        const latestB = Math.max(...b.years.map(Number));
        return latestB - latestA;
    });
  }, []);

  const onMarkerClick = useCallback((event: any) => {
    setIsInteracting(true);
    setSelectedEvent(event);
    setViewState(prev => ({
      ...prev,
      longitude: event.lng,
      latitude: event.lat,
      zoom: 7, // Zoom in more for individual events
      transitionDuration: 1200
    }));
  }, []);

  const onMapClick = useCallback(() => {
    setSelectedEvent(null);
    setViewState(prev => ({
      ...prev,
      zoom: 3.5,
      transitionDuration: 1000
    }));
  }, []);

  const handleZoom = useCallback((delta: number) => {
    setViewState(prev => ({
      ...prev,
      zoom: Math.min(Math.max(prev.zoom + delta, 3), 12),
      transitionDuration: 300
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
    filter: ['==', ['get', 'nombre'], selectedEvent?.provinceName || '']
  }), [selectedEvent]);

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
            {!selectedEvent && (
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
                 <Layer {...highlightLayer} />
                 <Layer {...lineLayer} />
              </Source>

              {allEventsWithCoords.map((event) => {
                return (
                  <Marker
                    key={event.id}
                    longitude={event.lng}
                    latitude={event.lat}
                    anchor="bottom"
                    onClick={e => {
                      e.originalEvent.stopPropagation();
                      onMarkerClick(event);
                    }}
                  >
                    <div className="cursor-pointer transition-all duration-300 hover:scale-110">
                      <div 
                        className={`relative rounded-full rounded-br-none bg-brand-400 rotate-[45deg] flex items-center justify-center border border-white/20 transition-all duration-500 ${
                          selectedEvent?.id === event.id ? 'w-10 h-10 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.4)]' : 'w-7 h-7 opacity-80'
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
          <div className={`w-full lg:w-2/5 h-full flex flex-col overflow-hidden bg-[#0a0a0a]/95 lg:bg-[#0a0a0a] backdrop-blur-md lg:backdrop-blur-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${selectedEvent 
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
                        <div className={`w-1.5 h-1.5 rounded-full bg-brand-400 ${selectedEvent ? 'animate-pulse' : ''}`} />
                        {selectedEvent ? 'EVENT DETAILS' : 'ALL EVENTS'}
                    </div>
                    <h3 className="text-white font-serif text-xl md:text-3xl tracking-[0.1em] uppercase leading-tight italic">
                        {selectedEvent ? selectedEvent.name : 'ALL EVENTS'}
                    </h3>
                  </div>
                  {/* Desktop Return Button */}
                  {selectedEvent && (
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
                   {selectedEvent 
                    ? `Deployment details for ${selectedEvent.name} in ${selectedEvent.city.toLowerCase() === selectedEvent.provinceName.toLowerCase() || selectedEvent.provinceName.toLowerCase().includes(selectedEvent.city.toLowerCase()) ? selectedEvent.provinceName : `${selectedEvent.city}, ${selectedEvent.provinceName}`}.`
                    : 'Consolidated tracking of all marketing campaigns history across the Southern Cone. Click a marker or event to explore.'}
                </p>
              </div>

             {/* Scrollable list */}
             <div className={`flex-1 overflow-y-auto p-8 pt-10 space-y-4 custom-scrollbar bg-black/10 transition-opacity duration-500 ${!isInteracting ? 'pointer-events-none opacity-50' : 'opacity-100'}`}>
                {(selectedEvent ? [selectedEvent] : allEventsWithCoords).map((event: any, idx) => {
                  return (
                    <div key={idx} 
                      className={`group flex items-start gap-8 border-b border-white/5 pb-8 pt-4 last:border-0 transition-all duration-300 -mx-4 px-8 rounded-xl cursor-pointer hover:bg-white/[0.03] relative overflow-hidden ${selectedEvent?.id === event.id ? 'bg-white/[0.04]' : ''}`}
                      onClick={() => onMarkerClick(event)}
                    >
                       <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden flex items-center justify-center relative">
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
                        FIELD EXPERIENCE: {selectedEvent ? '1' : allEventsWithCoords.length}
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
