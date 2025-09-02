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
  pitch: 45,
  bearing: 0
} as any; // FIX: Added 'as any' to resolve the TypeScript type error

// A free, open map style from an external provider
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

const InteractiveMap = () => {
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
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 5,
      radiusMaxPixels: 15,
      lineWidthMinPixels: 1,
      getPosition: d => [d.longitude, d.latitude],
      getFillColor: [255, 140, 0, 180],
      getLineColor: [255, 255, 255],
      onHover: info => setTooltip(info)
    })
  ];
  
  if (error) {
    return <div className="w-full h-full flex items-center justify-center bg-muted text-destructive">{error}</div>;
  }

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map mapStyle={MAP_STYLE} />
      {tooltip && tooltip.object && (
        <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: tooltip.x, top: tooltip.y }} className="bg-background p-2 rounded-md shadow-lg text-xs">
          Float ID: {tooltip.object.float_id}
        </div>
      )}
    </DeckGL>
  );
};

export default InteractiveMap;