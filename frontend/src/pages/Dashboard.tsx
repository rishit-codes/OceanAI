import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import AIChat from '@/components/AIChat';
import InteractiveMap from '@/components/InteractiveMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataService } from '@/api/services';
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
  const [selectedFloat, setSelectedFloat] = useState('');
  const [floatData, setFloatData] = useState([]);
  const [oceanMetrics, setOceanMetrics] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  const metricIcons = {
    'Surface Temperature': Thermometer,
    'Salinity (PSU)': Droplets,
    'Pressure (dbar)': Gauge,
    'Oxygen (μmol/kg)': Wind
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [floats, metrics, alerts, tsData] = await Promise.all([
          dataService.getDashboardFloats(),
          dataService.getDashboardMetrics(),
          dataService.getDashboardAlerts(),
          dataService.getTemperatureSalinityData()
        ]);
        
        setFloatData(floats || []);
        setOceanMetrics(metrics?.map(metric => ({
          ...metric,
          icon: metricIcons[metric.label] || Activity,
          color: 'primary'
        })) || []);
        setRecentAlerts(alerts || []);
        setChartData(tsData || []);
        
        if (floats && floats.length > 0) {
          setSelectedFloat(floats[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getFloatId = (id) => {
    return String(id).replace(/[^0-9]/g, '');
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-emerald-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-amber-500';
  };

  const getGradientColor = (trend) => {
    if (trend === 'up') return 'from-emerald-500 to-emerald-400';
    if (trend === 'down') return 'from-red-500 to-red-400';
    return 'from-amber-500 to-amber-400';
  };

  const getAlertBgColor = (type) => {
    if (type === 'warning') return 'bg-amber-500/10';
    if (type === 'info') return 'bg-blue-500/10';
    return 'bg-emerald-500/10';
  };

  const getAlertBorderColor = (type) => {
    if (type === 'warning') return 'bg-amber-500';
    if (type === 'info') return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Tooltip for graph hover */}
      <div id="tooltip" className="fixed z-50 bg-background border border-border rounded-lg p-2 text-xs shadow-lg pointer-events-none" style={{display: 'none'}}></div>
      
      <div className="pt-20 container mx-auto px-4 pb-8">
        <div className="mb-8">
          <h1 className="text-primary mb-2">Ocean Intelligence Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and analysis of global ARGO float network</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-8 mb-6">
              {oceanMetrics.slice(0, 3).map((metric, index) => (
                <Card key={index} className="relative overflow-hidden border border-border/20 bg-gradient-to-br from-card to-card/50 hover:shadow-xl hover:scale-105 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <metric.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex items-center space-x-1">
                        {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                        {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        {metric.trend === 'stable' && <Activity className="w-4 h-4 text-amber-500" />}
                        <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getGradientColor(metric.trend)} group-hover:h-2 transition-all duration-300`} />
                </Card>
              ))}
            </div>

            <Card className="relative overflow-hidden border border-border/20 bg-gradient-to-br from-card to-card/50 hover:shadow-xl hover:border-primary/30 transition-all duration-500 group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center group-hover:text-primary transition-colors">
                    <Globe className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    Global Float Network
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => setIsMapFullscreen(true)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Full Screen
                  </Button>
                </div>
                
                <div className="h-96 rounded-xl overflow-hidden border border-border/10 group-hover:border-primary/20 transition-all duration-300">
                  <InteractiveMap isFullscreen={false} />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>

            <Tabs defaultValue="profiles" className="w-full">
              <TabsList className="w-full h-14 p-1 bg-muted/30 rounded-xl flex justify-between">
                <TabsTrigger value="profiles" className="flex-1 mx-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 transition-all duration-300 rounded-lg font-medium">Profile Analysis</TabsTrigger>
                <TabsTrigger value="trends" className="flex-1 mx-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 transition-all duration-300 rounded-lg font-medium">Temporal Trends</TabsTrigger>
                <TabsTrigger value="anomalies" className="flex-1 mx-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 transition-all duration-300 rounded-lg font-medium">Anomaly Detection</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profiles" className="space-y-4">
                <Card className="data-card p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Interactive Temperature vs Salinity
                  </h4>
                  <div className="relative aspect-video bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl p-6 border border-border/10 group">
                    {chartData.length > 0 ? (
                      <div className="relative w-full h-full">
                        <svg width="100%" height="100%" viewBox="0 0 700 400" className="overflow-visible">
                          <defs>
                            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="50%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                          </defs>
                          
                          <rect width="700" height="400" fill="transparent" stroke="#374151" strokeWidth="1" rx="12" />
                          
                          {/* Grid with values */}
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <g key={`grid-${i}`}>
                              <line x1={80 + i * 100} y1="40" x2={80 + i * 100} y2="320" stroke="#374151" strokeWidth="0.5" opacity="0.3" />
                              <line x1="80" y1={40 + i * 56} x2="580" y2={40 + i * 56} stroke="#374151" strokeWidth="0.5" opacity="0.3" />
                            </g>
                          ))}
                          
                          {/* Axes */}
                          <line x1="80" y1="320" x2="580" y2="320" stroke="#6b7280" strokeWidth="2" />
                          <line x1="80" y1="40" x2="80" y2="320" stroke="#6b7280" strokeWidth="2" />
                          
                          {/* X-axis values (Salinity) */}
                          {[30, 32, 34, 36, 38].map((value, i) => (
                            <text key={i} x={80 + i * 100} y="340" textAnchor="middle" className="fill-foreground text-xs font-medium">
                              {value}
                            </text>
                          ))}
                          
                          {/* Y-axis values (Temperature) */}
                          {[5, 10, 15, 20, 25].map((value, i) => (
                            <text key={i} x="70" y={320 - i * 56} textAnchor="end" className="fill-foreground text-xs font-medium">
                              {value}
                            </text>
                          ))}
                          
                          {/* Temperature vs Salinity Line */}
                          <path
                            d={`M ${chartData.slice(0, 25).map((point, i) => {
                              const x = 80 + ((point.salinity - 30) * 12.5);
                              const y = 320 - ((point.temperature - 5) * 14);
                              return `${i === 0 ? 'M' : 'L'} ${Math.max(80, Math.min(580, x))} ${Math.max(40, Math.min(320, y))}`;
                            }).join(' ')}`}
                            stroke="#ef4444"
                            strokeWidth="2"
                            fill="none"
                            opacity="0.8"
                          />
                          
                          {/* Data Points */}
                          {chartData.slice(0, 25).map((point, i) => {
                            const x = 80 + ((point.salinity - 30) * 12.5);
                            const y = 320 - ((point.temperature - 5) * 14);
                            return (
                              <circle
                                key={i}
                                cx={Math.max(80, Math.min(580, x))}
                                cy={Math.max(40, Math.min(320, y))}
                                r="4"
                                fill="#ffffff"
                                stroke="#ef4444"
                                strokeWidth="2"
                                className="hover:r-6 transition-all cursor-pointer"
                                onMouseEnter={(e) => {
                                  const tooltip = document.getElementById('tooltip');
                                  if (tooltip) {
                                    tooltip.innerHTML = `Temp: ${point.temperature.toFixed(1)}°C<br/>Salinity: ${point.salinity.toFixed(1)} PSU`;
                                    tooltip.style.display = 'block';
                                    tooltip.style.left = e.pageX + 10 + 'px';
                                    tooltip.style.top = e.pageY - 10 + 'px';
                                  }
                                }}
                                onMouseLeave={() => {
                                  const tooltip = document.getElementById('tooltip');
                                  if (tooltip) tooltip.style.display = 'none';
                                }}
                              />
                            );
                          })}
                          
                          {/* Axis Labels */}
                          <text x="330" y="370" textAnchor="middle" className="fill-foreground text-sm font-semibold">Salinity (PSU)</text>
                          <text x="25" y="180" textAnchor="middle" className="fill-foreground text-sm font-semibold" transform="rotate(-90 25 180)">Temperature (°C)</text>
                        </svg>
                        
                        {/* Legend */}
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border border-border/20 rounded-lg p-3 shadow-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-1 bg-red-500"></div>
                            <span className="text-xs font-medium">Line</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-white border-2 border-red-500 rounded-full"></div>
                            <span className="text-xs font-medium">Data Points</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                          <p className="font-medium">Loading oceanographic data...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-4">
                <Card className="data-card p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Interactive Temperature vs Depth
                  </h4>
                  <div className="relative aspect-video bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl p-6 border border-border/10 group">
                    {chartData.length > 0 ? (
                      <div className="relative w-full h-full">
                        <svg width="100%" height="100%" viewBox="0 0 700 400" className="overflow-visible">
                          <defs>
                            <linearGradient id="depthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="50%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                          
                          <rect width="700" height="400" fill="transparent" stroke="#374151" strokeWidth="1" rx="12" />
                          
                          {/* Grid with values */}
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <g key={`depth-grid-${i}`}>
                              <line x1={80 + i * 100} y1="40" x2={80 + i * 100} y2="320" stroke="#374151" strokeWidth="0.5" opacity="0.3" />
                              <line x1="80" y1={40 + i * 56} x2="580" y2={40 + i * 56} stroke="#374151" strokeWidth="0.5" opacity="0.3" />
                            </g>
                          ))}
                          
                          {/* Axes */}
                          <line x1="80" y1="320" x2="580" y2="320" stroke="#6b7280" strokeWidth="2" />
                          <line x1="80" y1="40" x2="80" y2="320" stroke="#6b7280" strokeWidth="2" />
                          
                          {/* X-axis values (Temperature) */}
                          {[5, 10, 15, 20, 25].map((value, i) => (
                            <text key={i} x={80 + i * 100} y="340" textAnchor="middle" className="fill-foreground text-xs font-medium">
                              {value}°C
                            </text>
                          ))}
                          
                          {/* Y-axis values (Depth) */}
                          {[0, 200, 400, 600, 800].map((value, i) => (
                            <text key={i} x="70" y={320 - i * 56} textAnchor="end" className="fill-foreground text-xs font-medium">
                              {value}m
                            </text>
                          ))}
                          
                          {/* Temperature vs Depth Line */}
                          <path
                            d={`M ${chartData.slice(0, 25).map((point, i) => {
                              const x = 80 + ((point.temperature - 5) * 20);
                              const depth = Math.min(point.pressure * 8, 800);
                              const y = 320 - (depth * 0.35);
                              return `${i === 0 ? 'M' : 'L'} ${Math.max(80, Math.min(580, x))} ${Math.max(40, Math.min(320, y))}`;
                            }).join(' ')}`}
                            stroke="#3b82f6"
                            strokeWidth="2"
                            fill="none"
                            opacity="0.8"
                          />
                          
                          {/* Data Points */}
                          {chartData.slice(0, 25).map((point, i) => {
                            const x = 80 + ((point.temperature - 5) * 20);
                            const depth = Math.min(point.pressure * 8, 800);
                            const y = 320 - (depth * 0.35);
                            return (
                              <circle
                                key={i}
                                cx={Math.max(80, Math.min(580, x))}
                                cy={Math.max(40, Math.min(320, y))}
                                r="4"
                                fill={depth < 200 ? "#ef4444" : depth < 400 ? "#f97316" : "#3b82f6"}
                                stroke="#ffffff"
                                strokeWidth="1"
                                className="hover:r-6 transition-all cursor-pointer"
                                onMouseEnter={(e) => {
                                  const tooltip = document.getElementById('tooltip');
                                  if (tooltip) {
                                    tooltip.innerHTML = `Temp: ${point.temperature.toFixed(1)}°C<br/>Depth: ${depth.toFixed(0)}m`;
                                    tooltip.style.display = 'block';
                                    tooltip.style.left = e.pageX + 10 + 'px';
                                    tooltip.style.top = e.pageY - 10 + 'px';
                                  }
                                }}
                                onMouseLeave={() => {
                                  const tooltip = document.getElementById('tooltip');
                                  if (tooltip) tooltip.style.display = 'none';
                                }}
                              />
                            );
                          })}
                          
                          {/* Axis Labels */}
                          <text x="330" y="370" textAnchor="middle" className="fill-foreground text-sm font-semibold">Temperature (°C)</text>
                          <text x="25" y="180" textAnchor="middle" className="fill-foreground text-sm font-semibold" transform="rotate(-90 25 180)">Depth (m)</text>
                        </svg>
                        
                        {/* Legend */}
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border border-border/20 rounded-lg p-3 shadow-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-1 bg-blue-500"></div>
                            <span className="text-xs font-medium">Line</span>
                          </div>
                          <div className="text-xs font-medium mb-1">Depth Colors:</div>
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-xs">0-200m</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-xs">200-400m</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs">400m+</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                          <TrendingUp className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                          <p className="font-medium">Loading depth profile...</p>
                        </div>
                      </div>
                    )}
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

          <div className="space-y-6">
            <Card className="data-card">
              <div className="h-[600px]">
                <AIChat />
              </div>
            </Card>

            <Card className="data-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Waves className="w-5 h-5 mr-2 text-primary" />
                Active Floats
              </h3>
              <div className="space-y-3">
                {floatData.map((float) => (
                  <div 
                    key={float.id}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedFloat === float.id 
                        ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg' 
                        : 'border-border/20 bg-gradient-to-br from-card to-card/50 hover:border-primary/30'
                    }`}
                    onClick={() => setSelectedFloat(float.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="font-semibold text-foreground">#{getFloatId(float.id)}</span>
                      </div>
                      <Badge 
                        variant={float.status === 'active' ? 'default' : 'destructive'}
                        className="text-xs px-2 py-1"
                      >
                        {float.status === 'active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {float.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{float.lat.toFixed(2)}°, {float.lon.toFixed(2)}°</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{float.profiles} profiles</span>
                        <span className="text-accent font-medium">{float.lastUpdate}</span>
                      </div>
                    </div>
                    {selectedFloat === float.id && (
                      <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="data-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                Recent Alerts
              </h3>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="relative p-4 rounded-xl bg-gradient-to-r from-card to-card/50 border border-border/20 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getAlertBgColor(alert.type)}`}>
                        {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                        {alert.type === 'info' && <Activity className="w-4 h-4 text-blue-500" />}
                        {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground leading-relaxed">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">{alert.time}</p>
                      </div>
                    </div>
                    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${getAlertBorderColor(alert.type)}`} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="relative w-full h-full">
            <InteractiveMap isFullscreen={true} />
            <button
              onClick={() => setIsMapFullscreen(false)}
              className="close-button"
              title="Close fullscreen map"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;