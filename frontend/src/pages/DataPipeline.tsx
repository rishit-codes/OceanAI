
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Activity,
  Server,
  FileText,
  Zap,
  RefreshCw,
  TrendingUp,
  Globe,
  Shield
} from 'lucide-react';

const DataPipeline = () => {
  const [selectedPipeline, setSelectedPipeline] = useState('netcdf-ingestion');

  const pipelineStatus = [
    { 
      id: 'netcdf-ingestion', 
      name: 'NetCDF Ingestion', 
      status: 'running', 
      progress: 87, 
      processed: 15234, 
      total: 17500,
      lastUpdate: '2 mins ago'
    },
    { 
      id: 'data-validation', 
      name: 'Data Validation', 
      status: 'running', 
      progress: 92, 
      processed: 14156, 
      total: 15234,
      lastUpdate: '1 min ago'
    },
    { 
      id: 'quality-control', 
      name: 'Quality Control', 
      status: 'completed', 
      progress: 100, 
      processed: 13987, 
      total: 13987,
      lastUpdate: '5 mins ago'
    },
    { 
      id: 'database-insert', 
      name: 'Database Insert', 
      status: 'running', 
      progress: 78, 
      processed: 10890, 
      total: 13987,
      lastUpdate: '3 mins ago'
    }
  ];

  const dataSourcesStats = [
    { name: 'FTP Servers', active: 12, total: 15, status: 'healthy' },
    { name: 'Real-time Feeds', active: 8, total: 8, status: 'healthy' },
    { name: 'Historical Archives', active: 5, total: 6, status: 'warning' },
    { name: 'Satellite Data', active: 3, total: 4, status: 'healthy' }
  ];

  const processingMetrics = [
    { label: 'Daily Ingestion', value: '2.4TB', change: '+12%', icon: Database },
    { label: 'Processing Speed', value: '850 MB/min', change: '+8%', icon: Zap },
    { label: 'Data Quality', value: '98.7%', change: '+0.3%', icon: Shield },
    { label: 'Storage Used', value: '847GB', change: '+15%', icon: Server }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 container mx-auto px-4 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-primary mb-2">ARGO Data Pipeline</h1>
              <p className="text-muted-foreground">Real-time NetCDF ingestion and processing system</p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </div>

        {/* Processing Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {processingMetrics.map((metric, index) => (
            <Card key={index} className="data-card p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="w-8 h-8 text-primary" />
                <Badge className={`${
                  metric.change.startsWith('+') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                }`}>
                  {metric.change}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{metric.value}</h3>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pipeline Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="data-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Pipeline Status
              </h3>
              
              <div className="space-y-4">
                {pipelineStatus.map((pipeline) => (
                  <div 
                    key={pipeline.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPipeline === pipeline.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border/30 hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedPipeline(pipeline.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          pipeline.status === 'running' ? 'bg-blue-500 animate-pulse' :
                          pipeline.status === 'completed' ? 'bg-green-500' :
                          'bg-yellow-500'
                        }`} />
                        <h4 className="font-semibold text-foreground">{pipeline.name}</h4>
                      </div>
                      <Badge variant={
                        pipeline.status === 'running' ? 'default' :
                        pipeline.status === 'completed' ? 'secondary' :
                        'outline'
                      }>
                        {pipeline.status}
                      </Badge>
                    </div>
                    
                    <Progress value={pipeline.progress} className="mb-2" />
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{pipeline.processed.toLocaleString()} / {pipeline.total.toLocaleString()} files</span>
                      <span>{pipeline.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Data Sources */}
            <Card className="data-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
                Data Sources
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {dataSourcesStats.map((source, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{source.name}</h4>
                      <div className={`w-3 h-3 rounded-full ${
                        source.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {source.active} / {source.total} active
                    </div>
                    <Progress 
                      value={(source.active / source.total) * 100} 
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="data-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                {[
                  { type: 'success', message: 'NetCDF batch processed successfully', time: '2 mins ago' },
                  { type: 'info', message: 'New float data detected', time: '5 mins ago' },
                  { type: 'warning', message: 'Quality check flagged anomalies', time: '8 mins ago' },
                  { type: 'success', message: 'Database optimization completed', time: '15 mins ago' },
                  { type: 'info', message: 'Backup process initiated', time: '1 hour ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    {activity.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />}
                    {activity.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />}
                    {activity.type === 'info' && <Activity className="w-4 h-4 text-blue-500 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Health */}
            <Card className="data-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Server className="w-5 h-5 mr-2 text-primary" />
                System Health
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">CPU Usage</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <Progress value={67} />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Memory Usage</span>
                  <span className="text-sm font-medium">84%</span>
                </div>
                <Progress value={84} />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Disk Space</span>
                  <span className="text-sm font-medium">56%</span>
                </div>
                <Progress value={56} />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Network I/O</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <Progress value={42} />
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="data-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Manual Upload
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Report
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPipeline;
