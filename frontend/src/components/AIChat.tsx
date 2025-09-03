import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Sparkles, Database, BarChart3, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { chatService } from '@/api/services';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am OceanAI. Ask me a question about the ARGO float data we have ingested.',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const questionsScrollRef = useRef<HTMLDivElement>(null);

  const intelligentQueries = [
    "What is the average temperature?",
    "Show me the latest profile",
    "How many floats are active?",
    "What is the deepest measurement?",
    "Show me salinity data",
    "Where are the floats located?"
  ];

  const quickActions = [
    { icon: Database, label: "Data Pipeline", query: "Show me the current ARGO data ingestion status" },
    { icon: BarChart3, label: "Analytics", query: "Generate advanced analytics for recent ocean data" },
    { icon: MapPin, label: "Global Map", query: "Display global float network with real-time positions" },
    { icon: Sparkles, label: "AI Insights", query: "What are the most significant ocean patterns detected recently?" }
  ];

  useEffect(() => {
    // This effect will scroll the chat to the bottom whenever a new message is added.
    const scrollViewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (scrollViewport) {
      scrollViewport.scrollTop = scrollViewport.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Auto-scroll questions horizontally
    const scrollContainer = questionsScrollRef.current;
    if (scrollContainer) {
      let scrollAmount = 0;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      const autoScroll = () => {
        scrollAmount += 1;
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      };
      
      const interval = setInterval(autoScroll, 50);
      
      // Pause auto-scroll on hover
      const handleMouseEnter = () => clearInterval(interval);
      const handleMouseLeave = () => {
        const newInterval = setInterval(autoScroll, 50);
        return newInterval;
      };
      
      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', () => {
        const newInterval = setInterval(autoScroll, 50);
        setTimeout(() => clearInterval(newInterval), 10000);
      });
      
      return () => {
        clearInterval(interval);
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, []);

  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(content.trim());
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't connect to the AI engine. Please make sure the backend server is running correctly.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/20 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Ocean AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Live RAG Pipeline Connected</p>
          </div>
        </div>
      </div>
      
      {/* Messages - Scrollable Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
                  {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-accent animate-spin" />
                    <span className="text-sm">AI is analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Horizontal Scrolling Questions */}
      <div className="border-t border-border/20 bg-muted/30 flex-shrink-0">
        <div 
          ref={questionsScrollRef}
          className="flex gap-2 p-3 overflow-x-auto"
        >
          {intelligentQueries.map((query, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-xs h-8 px-3 whitespace-nowrap flex-shrink-0 hover:bg-white/10 dark:hover:bg-white/3 transition-colors"
              onClick={() => handleSendMessage(query)}
            >
              "{query}"
            </Button>
          ))}
        </div>
      </div>

      {/* Input - Fixed at Bottom */}
      <div className="p-4 border-t border-border/20 flex-shrink-0">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ocean data..."
            disabled={isLoading}
          />
          <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

// Add CSS for hiding scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);