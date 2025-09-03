import React, { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
// Change the Map import to use the maplibre version
import { Map } from 'react-map-gl/maplibre';
import { ScatterplotLayer } from '@deck.gl/layers';
// Import the MapLibre CSS
import 'maplibre-gl/dist/maplibre-gl.css';
import apiClient from '@/api/client';

// Define the type for our location data
interface FloatLocation {
  float_id: number;
  latitude: number;
  longitude: number;
}

// Define the initial view state for the map
const INITIAL_VIEW_STATE = {
  longitude: 80.7718, // Centered on the Indian Ocean
  latitude: 12.8797,
  zoom: 3,
  pitch: 30,
  bearing: 0,
  maxZoom: 15,
  minZoom: 1
} as any; // FIX: Added 'as any' to resolve the TypeScript type error

// A free, open map style from an external provider
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

interface InteractiveMapProps {
  isFullscreen?: boolean;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ isFullscreen = false }) => {
  const [locations, setLocations] = useState<FloatLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<any>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiClient.get('/argo/locations');
        setLocations(response.data);
      } catch (err) {
        setError('Failed to fetch float locations. Is the backend running?');
        console.error(err);
      }
    };

    fetchLocations();
  }, []);

  const layers = [
    new ScatterplotLayer<FloatLocation>({
      id: 'scatterplot-layer',
      data: locations,
      pickable: true,
      opacity: 0.9,
      stroked: true,
      filled: true,
      radiusScale: 8,
      radiusMinPixels: 6,
      radiusMaxPixels: 20,
      lineWidthMinPixels: 2,
      getPosition: d => [d.longitude, d.latitude],
      getFillColor: [255, 140, 0, 200],
      getLineColor: [255, 255, 255, 255],
      onHover: info => setTooltip(info),
      updateTriggers: {
        getFillColor: locations,
        getLineColor: locations
      }
    })
  ];
  
  if (error) {
    return <div className="w-full h-full flex items-center justify-center bg-muted text-destructive">{error}</div>;
  }

  return (
    <div className={`relative w-full h-full ${isFullscreen ? 'map-fullscreen' : ''}`}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Map mapStyle={MAP_STYLE} />
      </DeckGL>
      
      {/* Tooltip with higher z-index */}
      {tooltip && tooltip.object && (
        <div 
          style={{ 
            position: 'absolute', 
            zIndex: 10000, 
            pointerEvents: 'none', 
            left: tooltip.x + 10, 
            top: tooltip.y - 10,
            transform: 'translate(0, -100%)'
          }} 
          className="map-tooltip"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span>Float #{tooltip.object.float_id}</span>
          </div>
          <div className="text-xs opacity-80 mt-1">
            {tooltip.object.latitude.toFixed(4)}°, {tooltip.object.longitude.toFixed(4)}°
          </div>
        </div>
      )}
      
      {/* Map controls overlay */}
      <div className="map-controls">
        <div className="text-xs font-medium">
          🌊 Active Floats: {locations.length}
        </div>
        {isFullscreen && (
          <div className="text-xs opacity-70 mt-1">
            Zoom and pan to explore
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;