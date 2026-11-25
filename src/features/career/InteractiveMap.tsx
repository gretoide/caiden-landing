import { useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl';
import type { ViewState } from 'react-map-gl';
import type { Map as MapboxMap } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * Interactive Mapbox map. Lives in its own module so `mapbox-gl` (~480 KB gzip) is only
 * downloaded when the user opens the map modal, never on the initial page load.
 */

export type CityMarker = {
  id: string;
  city: string;
  lat: number;
  lng: number;
  eventCount: number;
};

type Props = {
  token: string;
  viewState: Partial<ViewState> & { transitionDuration?: number };
  onViewStateChange: (viewState: ViewState) => void;
  onBackgroundClick: () => void;
  markers: CityMarker[];
  selectedCityId: string | null;
  onMarkerClick: (marker: CityMarker) => void;
};

const MAX_BOUNDS: [[number, number], [number, number]] = [[-130, -72], [0, 5]];
const FIT_PADDING = { top: 56, bottom: 40, left: 32, right: 32 };

// Web Mercator: longitude/latitude <-> fraction of the world map (0..1).
const toX = (lng: number) => (lng + 180) / 360;
const toY = (lat: number) => (1 - Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) / Math.PI) / 2;
const toLat = (y: number) => (Math.atan(Math.exp(Math.PI * (1 - 2 * y))) * 360) / Math.PI - 90;

/** Camera that shows every marker inside a map of the given size. */
function overviewCamera(markers: CityMarker[], width: number, height: number) {
  const xs = markers.map((m) => toX(m.lng));
  const ys = markers.map((m) => toY(m.lat));
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  // Mapbox draws the world 512px wide at zoom 0.
  const scale = Math.min(
    (width - FIT_PADDING.left - FIT_PADDING.right) / ((maxX - minX) * 512),
    (height - FIT_PADDING.top - FIT_PADDING.bottom) / ((maxY - minY) * 512)
  );
  const zoom = Math.min(5, Math.max(2, Math.log2(scale)));
  const worldPx = 512 * 2 ** zoom;
  // Shift the center so the larger top padding leaves room for the pins, which sit above their point.
  const centerY = (minY + maxY) / 2 - (FIT_PADDING.top - FIT_PADDING.bottom) / 2 / worldPx;
  return { longitude: ((minX + maxX) / 2) * 360 - 180, latitude: toLat(centerY), zoom, pitch: 0, bearing: 0 };
}

const MAP_STYLES = `
  .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib { display: none !important; }
  .mapboxgl-ctrl-group { background: rgba(10, 10, 10, 0.7) !important; backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 4px !important; }
  .mapboxgl-ctrl-icon { filter: invert(1) brightness(2) opacity(0.5); }
`;

function applyDarkTheme(map: MapboxMap) {
  const layers = map.getStyle().layers;
  layers?.forEach((layer) => {
    if (layer.id.includes('label')) {
      try {
        map.setLayoutProperty(layer.id, 'text-field', ['get', 'name_en']);
        map.setPaintProperty(layer.id, 'text-color', 'rgba(255,255,255,0.2)');
      } catch { /* layer without text */ }
    }
  });
  if (map.getLayer('water')) map.setPaintProperty('water', 'fill-color', '#000000');
  if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', '#000000');
  if (map.getLayer('land')) map.setPaintProperty('land', 'fill-color', '#050505');
  if (map.getLayer('admin-0-boundary')) map.setPaintProperty('admin-0-boundary', 'line-color', 'rgba(255,255,255,0.05)');
}

export default function InteractiveMap({
  token,
  viewState,
  onViewStateChange,
  onBackgroundClick,
  markers,
  selectedCityId,
  onMarkerClick,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // The camera is controlled by the parent, so a new view is reported to it.
  const changeViewRef = useRef(onViewStateChange);
  useEffect(() => {
    changeViewRef.current = onViewStateChange;
  });

  // Overview (on open and on "Reset view"): zoom so every city fits, whatever the screen height.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (selectedCityId || !wrapper || !markers.length) return;
    const camera = overviewCamera(markers, wrapper.clientWidth, wrapper.clientHeight);
    changeViewRef.current({ ...camera, padding: { top: 0, bottom: 0, left: 0, right: 0 } });
  }, [selectedCityId, markers]);

  return (
    <div ref={wrapperRef} className="w-full h-full relative">
      <Map
        {...viewState}
        onMove={(evt) => onViewStateChange(evt.viewState)}
        onClick={onBackgroundClick}
        maxBounds={MAX_BOUNDS}
        minZoom={2}
        // Flat map: the overview math assumes Mercator (v3 styles default to a globe at low zoom).
        projection={{ name: "mercator" }}
        onLoad={(e) => applyDarkTheme(e.target)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={token}
        attributionControl={false}
      >
        {markers.map((marker) => {
          const isSelected = selectedCityId === marker.id;
          return (
            <Marker
              key={marker.id}
              longitude={marker.lng}
              latitude={marker.lat}
              anchor="bottom"
              onClick={(e) => { e.originalEvent.stopPropagation(); onMarkerClick(marker); }}
            >
              {/* Outer touch target (44px min for mobile accessibility) */}
              <div className="relative w-12 h-12 flex items-center justify-center cursor-pointer touch-manipulation group/marker">
                <div className="transition-all duration-300 group-hover/marker:scale-110">
                  <div className={`relative rounded-full rounded-br-none bg-brand-400 rotate-[45deg] flex items-center justify-center border border-white/20 transition-all duration-500 ${isSelected ? 'w-9 h-9 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.6)] z-10' : 'w-6 h-6 opacity-80'}`}>
                    <div className="w-[30%] h-[30%] bg-[#050505] rounded-full rotate-[-45deg]" />
                    {marker.eventCount > 1 && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-black text-[7px] font-bold rounded-full flex items-center justify-center rotate-[-45deg] shadow-lg">{marker.eventCount}</div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/marker:opacity-100 group-active/marker:opacity-100 transition-opacity pointer-events-none z-50">
                  <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[8px] text-white uppercase tracking-[0.2em] whitespace-nowrap">{marker.city}</div>
                </div>
              </div>
            </Marker>
          );
        })}
      </Map>
      <style dangerouslySetInnerHTML={{ __html: MAP_STYLES }} />
    </div>
  );
}
