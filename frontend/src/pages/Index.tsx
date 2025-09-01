
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import AIChat from '@/components/AIChat';
import { 
  Waves, 
  Brain, 
  BarChart3, 
  Globe, 
  Zap, 
  Shield, 
  ArrowRight,
  Play,
  Database,
  TrendingUp,
  MapPin,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Database,
      title: 'ARGO Data Pipeline',
      description: 'Automated NetCDF ingestion with real-time processing and validation',
      color: 'data-temperature'
    },
    {
      icon: Brain,
      title: 'AI-Powered Queries',
      description: 'Natural language processing with multi-modal LLM integration',
      color: 'data-salinity'
    },
    {
      icon: BarChart3,
      title: 'Advanced Visualizations',
      description: 'Interactive maps, 3D models, and real-time oceanographic analysis',
      color: 'data-pressure'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Anomaly detection and climate change trend analysis',
      color: 'data-oxygen'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Worldwide ocean monitoring with satellite data integration',
      color: 'data-temperature'
    },
    {
      icon: Shield,
      title: 'Research Grade',
      description: 'Publication-ready outputs with collaborative research tools',
      color: 'data-salinity'
    }
  ];

  const stats = [
    { label: 'Active Floats', value: '4,087', change: '+12%' },
    { label: 'Daily Profiles', value: '15,234', change: '+8%' },
    { label: 'Ocean Coverage', value: '87%', change: '+3%' },
    { label: 'Data Points', value: '2.4M', change: '+25%' }
  ];

  return (
  <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 ocean-gradient opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-wave" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white"></div>
              
              <h1 className="text-white mb-6">
                Next-Gen Ocean Intelligence Platform
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Harness the power of AI to unlock insights from global ARGO float data. 
                Real-time analysis, predictive modeling, and collaborative research tools 
                for the future of oceanography.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                  <Play className="w-5 h-5 mr-2" />
                  Launch Dashboard
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Features
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="data-card p-6 h-96">
                <AIChat />
              </Card>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/80 backdrop-blur-sm border-y border-border/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="data-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-accent font-medium">{stat.change} this month</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Revolutionary Ocean Analytics</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining cutting-edge AI with comprehensive oceanographic data to deliver 
              unprecedented insights into our planet's ocean systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="data-card p-8 group hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 surface-gradient opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-wave" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-white mb-6">Ready to Explore the Ocean's Secrets?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join researchers worldwide in leveraging AI-powered oceanography for climate research, 
            marine conservation, and scientific discovery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                <Activity className="w-5 h-5 mr-2" />
                Access Dashboard
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ocean-deep text-white/80">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Waves className="w-6 h-6 text-accent animate-wave" />
                <span className="text-xl font-bold text-white">ArgoAI</span>
              </div>
              <p className="text-sm">
                Advanced oceanographic intelligence platform powered by AI and global ARGO float data.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>Real-time Data Processing</li>
                <li>AI-Powered Analysis</li>
                <li>Interactive Visualizations</li>
                <li>Predictive Modeling</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Research</h4>
              <ul className="space-y-2 text-sm">
                <li>Climate Studies</li>
                <li>Ocean Monitoring</li>
                <li>Marine Conservation</li>
                <li>Scientific Collaboration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>API Documentation</li>
                <li>Research Papers</li>
                <li>Community Forum</li>
                <li>Developer Tools</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 ArgoAI Platform. Built for SIH 2024 Hackathon. Empowering ocean research through AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
