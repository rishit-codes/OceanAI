
import React, { useEffect } from 'react';
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
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
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
        <div className="absolute inset-0 hero-waves-animation" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-wave" />
          
          {/* Nodes */}
          <div className="futuristic-node top-16 left-16" />
          <div className="futuristic-node top-32 right-24" />
          <div className="futuristic-node bottom-24 left-32" />
          <div className="futuristic-node bottom-16 right-16" />
          <div className="futuristic-node top-1/3 left-1/4" />
          <div className="futuristic-node top-2/3 right-1/3" />
          
          {/* Connecting Lines */}
          <div className="futuristic-line line-1" />
          <div className="futuristic-line line-2" />
          <div className="futuristic-line line-3" />
          <div className="futuristic-line line-4" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              
              <h1 className="text-white mb-6">
                Next-Gen Ocean Intelligence Platform
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Harness the power of AI to unlock insights from global ARGO float data. 
                Real-time analysis, predictive modeling, and collaborative research tools 
                for the future of oceanography.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                    <Play className="w-5 h-5 mr-2" />
                    Launch Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <Card className="data-card p-6 h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-16 h-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ocean Intelligence</h3>
                  <p className="text-muted-foreground">Visualizing global oceanographic data</p>
                </div>
              </Card>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-blue-600/20 via-background/80 to-background backdrop-blur-sm">
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
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-cyan-50/30">
        {/* Fish and bubbles for features section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="fish fish-feature-1" />
          <div className="fish fish-feature-2" />
          <div className="fish fish-feature-3" />
          <div className="fish fish-feature-4" />
          <div className="bubble bubble-feature-1" />
          <div className="bubble bubble-feature-2" />
          <div className="bubble bubble-feature-3" />
          <div className="bubble bubble-feature-4" />
          <div className="bubble bubble-feature-5" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Revolutionary Ocean Analytics</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining cutting-edge AI with comprehensive oceanographic data to deliver 
              unprecedented insights into our planet's ocean systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="data-card p-8 group hover:scale-110 hover:-translate-y-2 transition-all duration-200 scroll-animate opacity-0 translate-y-8 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-200/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/30 dark:hover:border-cyan-400/30 dark:hover:shadow-cyan-400/20">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-cyan-100 transition-all duration-200`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-cyan-600 transition-colors duration-200">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-slate-700 transition-colors duration-200">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-cyan-50/30 to-blue-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-800 animate-gradient opacity-90" />
          <div className="absolute inset-0 ocean-waves-animation" />
          
          {/* Nodes */}
          <div className="futuristic-node top-12 left-12" />
          <div className="futuristic-node top-24 right-20" />
          <div className="futuristic-node bottom-20 left-24" />
          <div className="futuristic-node bottom-12 right-12" />
          <div className="futuristic-node top-1/4 left-1/3" />
          <div className="futuristic-node bottom-1/3 right-1/4" />
          
          {/* Connecting Lines */}
          <div className="futuristic-line line-1" />
          <div className="futuristic-line line-2" />
          <div className="futuristic-line line-3" />
          <div className="futuristic-line line-4" />
        </div>
        <div className="relative container mx-auto px-4 text-center z-10">
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
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-xl">
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
                <Waves className="w-6 h-6 text-accent" />
                <span className="text-xl font-bold text-white">Aqua Lense</span>
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
            <p>&copy; 2024 Aqua Lense Platform. Built for SIH 2024 Hackathon. Empowering ocean research through AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
