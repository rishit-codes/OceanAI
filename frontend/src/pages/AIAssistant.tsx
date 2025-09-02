import React from 'react';
import Navigation from '@/components/Navigation';
import AIChat from '@/components/AIChat';
import { Card } from '@/components/ui/card';
import { Brain, MessageCircle } from 'lucide-react';

const AIAssistant = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 relative overflow-hidden">
      {/* Underwater Background Video */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-20 dark:opacity-30"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23001122'/%3E%3C/svg%3E"
        >
          <source src="/ocean-bg.mp4" type="video/mp4" />
        </video>
        {/* Animated fish and bubbles overlay */}
        <div className="absolute inset-0">
          <div className="fish fish-1" />
          <div className="fish fish-2" />
          <div className="fish fish-3" />
          <div className="fish fish-4" />
          <div className="fish fish-5" />
          <div className="fish fish-6" />
          <div className="fish fish-7" />
          <div className="fish fish-8" />
          <div className="bubble bubble-1" />
          <div className="bubble bubble-2" />
          <div className="bubble bubble-3" />
          <div className="bubble bubble-4" />
          <div className="bubble bubble-5" />
          <div className="bubble bubble-6" />
          <div className="bubble bubble-7" />
          <div className="bubble bubble-8" />
        </div>
      </div>
      <Navigation />
      
      <div className="pt-20 pb-8 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Ocean AI Assistant</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ask questions about oceanographic data, ARGO floats, and marine research. 
              Get intelligent insights powered by our AI system.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="h-[600px] bg-card/90 dark:bg-card/80 backdrop-blur-md rounded-xl border border-border/50 shadow-lg">
              <AIChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;