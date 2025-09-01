
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Layers,
  Zap
} from 'lucide-react';

const Analytics = () => {
  const analysisResults = [
    {
      title: 'North Atlantic Warming Trend',
      type: 'Climate Analysis',
      confidence: 94,
      timeframe: '2020-2024',
      description: 'Significant temperature increase detected in upper 500m layer',
      status: 'critical'
    },
    {
      title: 'Pacific Salinity Anomaly',
      type: 'Anomaly Detection',
      confidence: 87,
      timeframe: 'Last 6 months',
      description: 'Unusual freshwater intrusion patterns identified',
      status: 'warning'
    },
    {
      title: 'Arctic Ocean Changes',
      type: 'Seasonal Analysis',
      confidence: 91,
      timeframe: '2023-2024',
      description: 'Altered stratification patterns observed',
      status: 'info'
    }
  ];

  const predictiveModels = [
    { name: 'Temperature Forecast', accuracy: '92.3%', horizon: '30 days', status: 'running' },
    { name: 'Salinity Prediction', accuracy: '89.1%', horizon: '14 days', status: 'running' },
    { name: 'Anomaly Detection', accuracy: '95.7%', horizon: 'Real-time', status: 'active' },
    { name: 'Climate Projection', accuracy: '78.4%', horizon: '1 year', status: 'training' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 container mx-auto px-4 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-primary mb-2">Advanced Ocean Analytics</h1>
              <p className="text-muted-foreground">AI-powered insights and predictive modeling for oceanographic research</p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="data-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-8 h-8 text-data-temperature" />
              <Badge className="bg-green-500/10 text-green-600">Active</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">47</h3>
            <p className="text-sm text-muted-foreground">AI Models Running</p>
          </Card>

          <Card className="data-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-data-salinity" />
              <Badge className="bg-blue-500/10 text-blue-600">94.2%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">2.1M</h3>
            <p className="text-sm text-muted-foreground">Predictions Generated</p>
          </Card>

          <Card className="data-card p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-data-pressure" />
              <Badge className="bg-purple-500/10 text-purple-600">+15%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">387</h3>
            <p className="text-sm text-muted-foreground">Anomalies Detected</p>
          </Card>

          <Card className="data-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-data-oxygen" />
              <Badge className="bg-orange-500/10 text-orange-600">Real-time</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">12</h3>
            <p className="text-sm text-muted-foreground">Active Alerts</p>
          </Card>
        </div>

        {/* Main Analytics Content */}
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="predictions">Predictive Models</TabsTrigger>
            <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
            <TabsTrigger value="reports">Research Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Analysis Results */}
              <Card className="data-card p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  Recent AI Analysis
                </h3>
                <div className="space-y-4">
                  {analysisResults.map((result, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/30 hover:border-accent/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{result.title}</h4>
                        <Badge 
                          variant={result.status === 'critical' ? 'destructive' : 
                                  result.status === 'warning' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {result.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="bg-accent/10 text-accent px-2 py-1 rounded">{result.type}</span>
                        <span>{result.timeframe}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Visualization */}
              <Card className="data-card p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Global Ocean Health Index
                </h3>
                <div className="aspect-square bg-depth-gradient rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-ocean-gradient opacity-80" />
                  <div className="relative z-10 text-center text-white">
                    <div className="text-5xl font-bold mb-2 animate-pulse">78.4</div>
                    <p className="text-white/80 mb-4">Overall Health Score</p>
                    <div className="flex justify-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">↑ 23%</div>
                        <div>Temperature</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">↓ 12%</div>
                        <div>Salinity</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">→ 5%</div>
                        <div>Oxygen</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card className="data-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Predictive Model Performance
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {predictiveModels.map((model, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/30 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">{model.name}</h4>
                      <Badge 
                        variant={model.status === 'running' ? 'default' : 
                                model.status === 'active' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="font-medium text-accent">{model.accuracy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Horizon:</span>
                        <span className="font-medium">{model.horizon}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <Card className="data-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-primary" />
                Pattern Recognition Results
              </h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Layers className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Ocean Pattern Analysis</h4>
                  <p>Interactive visualization of detected oceanographic patterns</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="data-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Research Reports
                </h3>
                <Button size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Reports
                </Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Monthly Ocean Health Assessment', date: 'March 2024', type: 'Automated', status: 'Published' },
                  { title: 'Climate Change Impact Analysis', date: 'February 2024', type: 'Research', status: 'Review' },
                  { title: 'ARGO Float Performance Report', date: 'January 2024', type: 'Technical', status: 'Published' }
                ].map((report, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/30 hover:border-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{report.title}</h4>
                      <Badge variant="outline">{report.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{report.date}</span>
                      <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">{report.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
