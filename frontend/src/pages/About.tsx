
import React, { useState, useEffect, useRef } from 'react';
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
  Heart,
  Lightbulb,
  Rocket,
  Eye,
  Star,
  Fish
} from 'lucide-react';

const About = () => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isAchievementVisible, setIsAchievementVisible] = useState(false);
  const achievementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAchievementVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (achievementRef.current) {
      observer.observe(achievementRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const teamMembers = [
    { name: 'Ayush Chabhadiya', role: 'Frontend Developer', expertise: 'React & UI/UX' },
    { name: 'Rishit Bhowmick', role: 'AI Engineer', expertise: 'Machine Learning' },
    { name: 'Hemal Bhatt', role: 'Data Scientist', expertise: 'Data Analytics' },
    { name: 'Unnati Sharma', role: 'Project Management', expertise: 'Team Leadership' },
    { name: 'Malhar Gupte', role: 'Backend Developer', expertise: 'API Development' },
    { name: 'Chandraprakash Prajapati', role: 'Data Trainer', expertise: 'Model Training' }
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
    'SIH 2025',
    'Data Model Train',
    'AI-Powered Chat BOT',
    'Research-Grade Accuracy',
    'Real-time Ocean Analytics',
    'Advanced ML Pipeline'
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Static Logo */}
      <div className="fixed top-4 left-4 z-50 flex items-center space-x-2 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
          <Waves className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-foreground">Aqua Lense</span>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 20}, (_, i) => (
          <div key={`fish-${i}`} className={`fish fish-about-${i + 1}`} />
        ))}
        {Array.from({length: 100}, (_, i) => (
          <div key={`bubble-${i}`} className={`bubble bubble-about-${i + 1}`} />
        ))}
        <div className="floating-star star-about-1" />
        <div className="floating-star star-about-2" />
        <div className="floating-star star-about-3" />
        <div className="floating-star star-about-4" />
        <div className="floating-star star-about-5" />
      </div>
      
      <Navigation />
      
      <div className="pt-20 container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 relative">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-cyan-400/30">
            <Waves className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Pioneering Ocean Intelligence</span>
          </div>
          
          <h1 className="text-primary mb-8 relative">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Transforming Ocean Science
            </span>
            <br />
            <span className="text-foreground">Through AI Innovation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Aqua Lense harnesses cutting-edge artificial intelligence to unlock the mysteries of our oceans, 
            providing researchers and scientists with unprecedented insights into marine ecosystems and climate patterns.
          </p>
          
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Global Coverage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>AI-Powered</span>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Impact */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="data-card p-8 group hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-full" />
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-cyan-500 mr-4 group-hover:rotate-12 transition-transform" />
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Democratizing ocean intelligence through AI-powered tools that enable researchers, 
              scientists, and policymakers to understand and protect our planet's marine ecosystems.
            </p>
          </Card>

          <Card className="data-card p-8 group hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full" />
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-blue-500 mr-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A future where ocean science drives climate action, marine conservation, and sustainable 
              ocean management through accessible, intelligent data platforms.
            </p>
          </Card>
          
          <Card className="data-card p-8 group hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-bl-full" />
            <div className="flex items-center mb-6">
              <Rocket className="w-8 h-8 text-indigo-500 mr-4 group-hover:translate-y-1 transition-transform" />
              <h2 className="text-2xl font-bold text-foreground">Our Impact</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering breakthrough discoveries in oceanography, climate science, and marine biology 
              through innovative AI solutions and collaborative research platforms.
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
        <section className="mb-16 overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate developers and researchers dedicated to advancing ocean science
            </p>
          </div>
          
          <div className="team-scroll-container">
            <div className="team-scroll-track">
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <Card key={index} className="team-card data-card p-6 text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm text-accent font-medium mb-1 group-hover:text-cyan-500 transition-colors">{member.role}</p>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{member.expertise}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section ref={achievementRef} className="mb-16">
          <Card className={`data-card p-8 bg-surface-gradient text-white water-fill ${isAchievementVisible ? 'filled' : ''}`}>
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
          <Card className="data-card p-12 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
            <div 
              className="relative"
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
            >
              <div className="heart-3d-container mb-6">
                <Heart 
                  className={`w-16 h-16 mx-auto transition-all duration-500 transform ${
                    isHeartHovered 
                      ? 'text-red-500 scale-125 drop-shadow-2xl animate-bounce fill-current' 
                      : 'text-white/80 scale-100'
                  }`}
                  style={{
                    filter: isHeartHovered ? 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))' : 'none',
                    textShadow: isHeartHovered ? '0 0 20px rgba(239, 68, 68, 0.8)' : 'none'
                  }}
                />
              </div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Let's Collaborate with ❤️
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join our mission to revolutionize ocean science! Together, we can unlock the mysteries 
                of our blue planet and create a sustainable future for marine ecosystems worldwide.
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <Users className="w-8 h-8 text-cyan-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Research Partnership</h3>
                  <p className="text-sm text-white/80">Collaborate on groundbreaking ocean research</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <Code className="w-8 h-8 text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Open Source</h3>
                  <p className="text-sm text-white/80">Contribute to our open-source platform</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <Database className="w-8 h-8 text-indigo-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Data Sharing</h3>
                  <p className="text-sm text-white/80">Share and access ocean datasets</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
