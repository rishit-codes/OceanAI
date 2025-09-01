
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Waves, 
  Brain, 
  Globe, 
  Users, 
  Award, 
  Target,
  Zap,
  Shield,
  Code,
  Database,
  TrendingUp,
  Heart
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    { name: 'Dr. Marine Explorer', role: 'Lead Oceanographer', expertise: 'Physical Oceanography' },
    { name: 'Alex DataScience', role: 'AI/ML Engineer', expertise: 'Machine Learning' },
    { name: 'Sam TechStack', role: 'Full Stack Developer', expertise: 'Web Development' },
    { name: 'Jordan Analytics', role: 'Data Analyst', expertise: 'Statistical Analysis' }
  ];

  const technologies = [
    { name: 'ARGO Float Network', description: 'Global ocean monitoring system', icon: Globe },
    { name: 'Machine Learning', description: 'Advanced AI algorithms for pattern detection', icon: Brain },
    { name: 'Real-time Processing', description: 'Live data ingestion and analysis', icon: Zap },
    { name: 'Cloud Infrastructure', description: 'Scalable and reliable data processing', icon: Database },
    { name: 'Interactive Visualizations', description: 'Advanced charting and mapping', icon: TrendingUp },
    { name: 'Security & Privacy', description: 'Enterprise-grade data protection', icon: Shield }
  ];

  const achievements = [
    'SIH 2024 Hackathon Project',
    '4,000+ ARGO Floats Monitored',
    '99.9% System Uptime',
    'Real-time Global Coverage',
    'AI-Powered Predictions',
    'Research-Grade Accuracy'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Waves className="w-4 h-4 text-primary animate-wave" />
            <span className="text-sm font-medium text-primary">About ArgoAI Platform</span>
          </div>
          
          <h1 className="text-primary mb-6">
            Revolutionizing Ocean Science with AI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            ArgoAI is an advanced oceanographic intelligence platform that combines the power of 
            artificial intelligence with comprehensive ARGO float data to deliver unprecedented 
            insights into our planet's ocean systems.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="data-card p-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-data-temperature mr-4" />
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to ocean intelligence by providing researchers, scientists, 
              and policymakers with AI-powered tools for understanding and monitoring our planet's 
              ocean systems in real-time.
            </p>
          </Card>

          <Card className="data-card p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-data-salinity mr-4" />
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A world where ocean science drives informed decision-making for climate research, 
              marine conservation, and sustainable ocean management through accessible, 
              intelligent data analysis platforms.
            </p>
          </Card>
        </div>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Platform Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced technologies working together to provide comprehensive ocean intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="data-card p-6 group hover:scale-105 transition-transform">
                <div className="flex items-center mb-4">
                  <tech.icon className="w-8 h-8 text-primary mr-3 group-hover:text-accent transition-colors" />
                  <h3 className="text-lg font-semibold text-foreground">{tech.name}</h3>
                </div>
                <p className="text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate researchers and developers dedicated to advancing ocean science
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="data-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-ocean-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-sm text-accent font-medium mb-1">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.expertise}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <Card className="data-card p-8 bg-surface-gradient text-white">
            <div className="text-center mb-8">
              <Award className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Recognized excellence in ocean data science and AI innovation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 mb-2">
                    {achievement}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Technical Stack */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Built with Modern Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge tools and frameworks for optimal performance
            </p>
          </div>
          
          <Card className="data-card p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Code className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Frontend</h4>
                <p className="text-sm text-muted-foreground">React, TypeScript, Tailwind CSS</p>
              </div>
              <div className="text-center">
                <Database className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Data Processing</h4>
                <p className="text-sm text-muted-foreground">PostgreSQL, FAISS, NetCDF</p>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">AI/ML</h4>
                <p className="text-sm text-muted-foreground">GPT, Llama, Vector Search</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Infrastructure</h4>
                <p className="text-sm text-muted-foreground">Cloud Native, APIs, Real-time</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact & Collaboration */}
        <section className="text-center">
          <Card className="data-card p-12 bg-ocean-gradient text-white">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">Let's Collaborate</h2>
            <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
              Join us in advancing ocean science and climate research. Together, we can unlock 
              the secrets of our planet's ocean systems and work towards a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 px-6 py-3 text-lg">
                Research Partnership
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 px-6 py-3 text-lg">
                Open Source Contribution
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 px-6 py-3 text-lg">
                Data Collaboration
              </Badge>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
