import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import AIChat from '@/components/AIChat';
import InteractiveMap from '@/components/InteractiveMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  MapPin, 
  Thermometer, 
  Droplets, 
  Gauge, 
  Wind,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Waves,
  Globe,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const [selectedFloat, setSelectedFloat] = useState('5906468');

  const floatData = [
    { id: '5906468', lat: 35.2, lon: -75.4, status: 'active', lastUpdate: '2h ago', profiles: 342 },
    { id: '5906469', lat: 40.1, lon: -68.2, status: 'active', lastUpdate: '4h ago', profiles: 298 },
    { id: '5906470', lat: 32.8, lon: -79.1, status: 'warning', lastUpdate: '12h ago', profiles: 156 },
    { id: '5906471', lat: 38.5, lon: -72.3, status: 'active', lastUpdate: '1h ago', profiles: 412 },
  ];

  const oceanMetrics = [
    { 
      label: 'Surface Temperature', 
      value: '23.4°C', 
      trend: 'up', 
      change: '+0.8°C',
      icon: Thermometer,
      color: 'data-temperature'
    },
    { 
      label: 'Salinity (PSU)', 
      value: '35.2', 
      trend: 'stable', 
      change: '±0.1',
      icon: Droplets,
      color: 'data-salinity'
    },
    { 
      label: 'Pressure (dbar)', 
      value: '2047.3', 
      trend: 'down', 
      change: '-12.4',
      icon: Gauge,
      color: 'data-pressure'
    },
    { 
      label: 'Oxygen (μmol/kg)', 
      value: '245.7', 
      trend: 'up', 
      change: '+8.3',
      icon: Wind,
      color: 'data-oxygen'
    }
  ];

  const recentAlerts = [
    { type: 'warning', message: 'Temperature anomaly detected in North Atlantic', time: '2h ago' },
    { type: 'info', message: 'New float deployed in Pacific Basin', time: '6h ago' },
    { type: 'success', message: 'Data quality validation completed', time: '1d ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 container mx-auto px-4 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-primary mb-2">Ocean Intelligence Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and analysis of global ARGO float network</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metrics Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {oceanMetrics.map((metric, index) => (
                <Card key={index} className="data-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`w-5 h-5 text-${metric.color}`} />
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {metric.trend === 'stable' && <Activity className="w4 h-4 text-yellow-500" />}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                  <div className="text-xs font-medium text-accent mt-1">{metric.change}</div>
                </Card>
              ))}
            </div>

            {/* Interactive Map */}
            <Card className="data-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Global Float Network
                </h3>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Full Screen
                </Button>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden">
                <InteractiveMap />
              </div>
            </Card>

            {/* Data Analysis Tabs */}
            <Tabs defaultValue="profiles" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profiles">Profile Analysis</TabsTrigger>
                <TabsTrigger value="trends">Temporal Trends</TabsTrigger>
                <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profiles" className="space-y-4">
                <Card className="data-card p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Temperature/Salinity Profiles
                  </h4>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive T-S diagram visualization</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-4">
                <Card className="data-card p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Long-term Ocean Trends
                  </h4>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Multi-year trend analysis charts</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="anomalies" className="space-y-4">
                <Card className="data-card p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                    AI-Detected Anomalies
                  </h4>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                      <p>Machine learning anomaly detection results</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Chat */}
            <Card className="data-card">
              <div className="h-96">
                <AIChat />
              </div>
            </Card>

            {/* Active Floats */}
            <Card className="data-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Waves className="w-5 h-5 mr-2 text-primary" />
                Active Floats
              </h3>
              <div className="space-y-3">
                {floatData.map((float) => (
                  <div 
                    key={float.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedFloat === float.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border/30 hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedFloat(float.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">#{float.id}</span>
                      <Badge 
                        variant={float.status === 'active' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {float.status === 'active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {float.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>Lat: {float.lat}°, Lon: {float.lon}°</div>
                      <div>{float.profiles} profiles • {float.lastUpdate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Alerts */}
            <Card className="data-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                Recent Alerts
              </h3>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border/30">
                    <div className="flex items-start space-x-3">
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />}
                      {alert.type === 'info' && <Activity className="w-4 h-4 text-blue-500 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
