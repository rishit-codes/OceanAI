
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Waves, Thermometer, Droplets, Gauge, Wind, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface FloatData {
  id: string;
  lat: number;
  lon: number;
  temperature: number;
  salinity: number;
  status: 'active' | 'warning' | 'inactive';
  lastUpdate: string;
}

const InteractiveMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFloat, setSelectedFloat] = useState<FloatData | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const floatData: FloatData[] = [
    { id: '5906468', lat: 35.2, lon: -75.4, temperature: 23.4, salinity: 35.2, status: 'active', lastUpdate: '2h ago' },
    { id: '5906469', lat: 40.1, lon: -68.2, temperature: 19.8, salinity: 34.8, status: 'active', lastUpdate: '4h ago' },
    { id: '5906470', lat: 32.8, lon: -79.1, temperature: 25.1, salinity: 36.1, status: 'warning', lastUpdate: '12h ago' },
    { id: '5906471', lat: 38.5, lon: -72.3, temperature: 21.3, salinity: 35.0, status: 'active', lastUpdate: '1h ago' },
    { id: '5906472', lat: 42.2, lon: -70.8, temperature: 18.6, salinity: 34.5, status: 'active', lastUpdate: '3h ago' },
    { id: '5906473', lat: 28.5, lon: -82.3, temperature: 26.8, salinity: 36.4, status: 'active', lastUpdate: '5h ago' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ocean background with gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(0.5, 'rgba(29, 78, 216, 0.9)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    const gridSize = 50 * zoom;
    
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Convert lat/lon to canvas coordinates
    const latToY = (lat: number) => (90 - lat) * (canvas.height / 180);
    const lonToX = (lon: number) => (lon + 180) * (canvas.width / 360);

    // Draw float positions
    floatData.forEach((float) => {
      const x = lonToX(float.lon) * zoom + (canvas.width * (1 - zoom)) / 2;
      const y = latToY(float.lat) * zoom + (canvas.height * (1 - zoom)) / 2;

      // Skip if outside visible area
      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

      // Draw float indicator
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      
      // Color based on status
      if (float.status === 'active') {
        ctx.fillStyle = '#10b981';
      } else if (float.status === 'warning') {
        ctx.fillStyle = '#f59e0b';
      } else {
        ctx.fillStyle = '#ef4444';
      }
      
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add pulsing effect for active floats
      if (float.status === 'active') {
        const pulseRadius = 8 + Math.sin(Date.now() / 500) * 4;
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Draw float ID
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`#${float.id.slice(-3)}`, x, y - 15);
    });

    // Draw connections between nearby floats
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 1;
    floatData.forEach((float1, i) => {
      floatData.slice(i + 1).forEach((float2) => {
        const distance = Math.sqrt(
          Math.pow(float1.lat - float2.lat, 2) + Math.pow(float1.lon - float2.lon, 2)
        );
        if (distance < 15) { // Connect floats within 15 degrees
          const x1 = lonToX(float1.lon) * zoom + (canvas.width * (1 - zoom)) / 2;
          const y1 = latToY(float1.lat) * zoom + (canvas.height * (1 - zoom)) / 2;
          const x2 = lonToX(float2.lon) * zoom + (canvas.width * (1 - zoom)) / 2;
          const y2 = latToY(float2.lat) * zoom + (canvas.height * (1 - zoom)) / 2;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });
    });

  }, [zoom, rotation]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is near any float
    const latToY = (lat: number) => (90 - lat) * (canvas.height / 180);
    const lonToX = (lon: number) => (lon + 180) * (canvas.width / 360);

    floatData.forEach((float) => {
      const floatX = lonToX(float.lon) * zoom + (canvas.width * (1 - zoom)) / 2;
      const floatY = latToY(float.lat) * zoom + (canvas.height * (1 - zoom)) / 2;
      
      const distance = Math.sqrt(Math.pow(x - floatX, 2) + Math.pow(y - floatY, 2));
      if (distance < 20) {
        setSelectedFloat(float);
      }
    });
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg cursor-crosshair"
        onClick={handleCanvasClick}
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
          onClick={() => setZoom(Math.min(zoom * 1.2, 3))}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
          onClick={() => setZoom(Math.max(zoom / 1.2, 0.5))}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
          onClick={() => setRotation(rotation + 90)}
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Float Details Popup */}
      {selectedFloat && (
        <Card className="absolute top-4 left-4 p-4 bg-background/95 backdrop-blur-sm border-accent/30 max-w-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">Float #{selectedFloat.id}</h4>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedFloat(null)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{selectedFloat.lat}°N, {selectedFloat.lon}°W</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-data-temperature" />
              <span>{selectedFloat.temperature}°C</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-data-salinity" />
              <span>{selectedFloat.salinity} PSU</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Waves className="w-4 h-4 text-accent" />
              <span className={`px-2 py-1 rounded text-xs ${
                selectedFloat.status === 'active' ? 'bg-green-500/20 text-green-600' :
                selectedFloat.status === 'warning' ? 'bg-yellow-500/20 text-yellow-600' :
                'bg-red-500/20 text-red-600'
              }`}>
                {selectedFloat.status}
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground pt-2 border-t border-border/30">
              Last update: {selectedFloat.lastUpdate}
            </div>
          </div>
        </Card>
      )}

      {/* Stats Overlay */}
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border/30">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{floatData.filter(f => f.status === 'active').length} Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>{floatData.filter(f => f.status === 'warning').length} Warning</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{floatData.filter(f => f.status === 'inactive').length} Inactive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
