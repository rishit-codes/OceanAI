
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Sparkles, Database, BarChart3, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'data' | 'chart' | 'location';
  data?: any;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your advanced oceanographic AI assistant. I can help you:\n\n🌊 Analyze ARGO float data in real-time\n📊 Generate interactive visualizations\n🔍 Detect anomalies and patterns\n🌍 Track global ocean conditions\n📈 Create predictive models\n\nWhat would you like to explore today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const intelligentQueries = [
    "Show temperature anomalies in the North Atlantic",
    "Compare salinity trends between 2020-2024",
    "Find active floats near the Gulf Stream",
    "Predict ocean warming patterns for next month",
    "Analyze oxygen levels in the Pacific",
    "Generate report on Arctic Ocean changes"
  ];

  const quickActions = [
    { icon: Database, label: "Data Pipeline", query: "Show me the current ARGO data ingestion status" },
    { icon: BarChart3, label: "Analytics", query: "Generate advanced analytics for recent ocean data" },
    { icon: MapPin, label: "Global Map", query: "Display global float network with real-time positions" },
    { icon: Sparkles, label: "AI Insights", query: "What are the most significant ocean patterns detected recently?" }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate realistic AI processing time
    const processingTime = 1500 + Math.random() * 3000;
    
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateIntelligentResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, processingTime);
  };

  const generateIntelligentResponse = (query: string): Message => {
    const lowercaseQuery = query.toLowerCase();
    
    // Analyze query intent and generate contextual response
    if (lowercaseQuery.includes('temperature') || lowercaseQuery.includes('warming')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `🌡️ **Temperature Analysis Complete**\n\nI've analyzed ${Math.floor(Math.random() * 1000 + 500)} temperature profiles from the past 30 days:\n\n**Key Findings:**\n• Average SST: ${(Math.random() * 5 + 20).toFixed(1)}°C\n• Anomaly detected: +${(Math.random() * 2 + 0.5).toFixed(1)}°C above seasonal average\n• Hotspot identified at 35.2°N, 75.4°W\n• Trend: ${Math.random() > 0.5 ? 'Increasing' : 'Stabilizing'} pattern observed\n\n**Recommendations:**\n✓ Monitor Gulf Stream dynamics\n✓ Check for El Niño correlation\n✓ Validate with satellite data\n\nWould you like me to generate a detailed temperature map or trend analysis?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'data',
        data: { type: 'temperature', floats: Math.floor(Math.random() * 1000 + 500) }
      };
    }
    
    if (lowercaseQuery.includes('salinity') || lowercaseQuery.includes('salt')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `🧂 **Salinity Analysis Results**\n\nProcessed ${Math.floor(Math.random() * 800 + 300)} salinity measurements:\n\n**Ocean Basin Summary:**\n• Atlantic: ${(Math.random() * 1 + 35).toFixed(1)} PSU (±${(Math.random() * 0.5).toFixed(1)})\n• Pacific: ${(Math.random() * 1 + 34).toFixed(1)} PSU (±${(Math.random() * 0.5).toFixed(1)})\n• Indian: ${(Math.random() * 1 + 34.5).toFixed(1)} PSU (±${(Math.random() * 0.5).toFixed(1)})\n\n**Notable Patterns:**\n🔍 Freshwater intrusion detected in Arctic regions\n📊 Seasonal variation within normal range\n⚠️  Monitoring subsurface salinity gradients\n\nShall I create a comparative salinity chart or focus on a specific region?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'data'
      };
    }
    
    if (lowercaseQuery.includes('float') || lowercaseQuery.includes('argo')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `🎯 **ARGO Float Network Status**\n\n**Global Fleet Overview:**\n• Active Floats: ${Math.floor(Math.random() * 500 + 3800)}\n• Daily Profiles: ${Math.floor(Math.random() * 5000 + 12000)}\n• Ocean Coverage: ${Math.floor(Math.random() * 10 + 85)}%\n• Data Quality: ${Math.floor(Math.random() * 5 + 95)}% validated\n\n**Recent Deployments:**\n🚢 15 new floats deployed in Southern Ocean\n🌊 Gulf Stream array maintenance completed\n📡 Real-time transmission: 98.7% success rate\n\n**Performance Metrics:**\n✅ ${Math.floor(Math.random() * 200 + 3600)} floats reporting normally\n⚠️  ${Math.floor(Math.random() * 50 + 150)} floats in warning status\n🔧 ${Math.floor(Math.random() * 30 + 45)} floats due for maintenance\n\nWould you like to see the interactive global map or detailed float performance metrics?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'location'
      };
    }
    
    if (lowercaseQuery.includes('predict') || lowercaseQuery.includes('forecast')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `🔮 **Predictive Ocean Modeling**\n\nUsing advanced ML algorithms to forecast ocean conditions:\n\n**30-Day Forecast:**\n📈 Temperature: ${Math.random() > 0.5 ? 'Warming trend' : 'Cooling trend'} expected\n🌊 Salinity: Stable with minor seasonal variations\n💨 Current strength: ${Math.floor(Math.random() * 20 + 80)}% of seasonal average\n\n**Model Performance:**\n• Accuracy: ${(Math.random() * 10 + 85).toFixed(1)}%\n• Confidence: ${(Math.random() * 15 + 80).toFixed(1)}%\n• Updated: ${Math.floor(Math.random() * 24 + 1)} hours ago\n\n**Key Predictions:**\n🌀 Potential eddy formation in Gulf of Mexico\n❄️  Arctic stratification changes expected\n🌡️  SST anomalies may persist for 2-3 weeks\n\nWant me to run a specific regional forecast or generate prediction visualizations?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'chart'
      };
    }
    
    // Default intelligent response
    const responses = [
      `🧠 **Advanced Analysis Complete**\n\nI've processed your query using our neural network models:\n\n**Data Sources Analyzed:**\n• ${Math.floor(Math.random() * 2000 + 1000)} ARGO profiles\n• ${Math.floor(Math.random() * 500 + 200)} satellite observations\n• ${Math.floor(Math.random() * 100 + 50)} coastal stations\n\n**AI Insights:**\n🔍 Pattern recognition identified ${Math.floor(Math.random() * 5 + 3)} significant features\n📊 Statistical analysis shows ${Math.random() > 0.5 ? 'positive' : 'negative'} correlation\n⚡ Anomaly detection flagged ${Math.floor(Math.random() * 10 + 2)} potential outliers\n\n**Recommended Actions:**\n✓ Cross-reference with historical data\n✓ Validate findings with domain experts\n✓ Monitor for emerging patterns\n\nHow would you like to visualize these results?`,
      
      `🌊 **Ocean Intelligence Report**\n\nYour query has been processed through our comprehensive analytics pipeline:\n\n**Processing Summary:**\n• Analysis Duration: ${(Math.random() * 3 + 1).toFixed(1)} seconds\n• Data Points: ${Math.floor(Math.random() * 50000 + 100000).toLocaleString()}\n• Quality Score: ${(Math.random() * 10 + 85).toFixed(1)}%\n• Confidence Level: High\n\n**Key Results:**\n📈 Trend analysis reveals significant patterns\n🎯 Target parameters within expected ranges\n🔬 Research-grade accuracy achieved\n🌍 Global context analysis included\n\n**Next Steps:**\n• Generate detailed visualization?\n• Export data for further analysis?\n• Set up monitoring alerts?\n• Create automated reports?\n\nWhat aspect would you like to explore deeper?`,
      
      `🚀 **Smart Ocean Analytics**\n\nLeveraging AI-powered insights from our comprehensive database:\n\n**Query Processing:**\n• Vector search through ${Math.floor(Math.random() * 10 + 50)}M data points\n• Machine learning inference completed\n• Natural language understanding: 98% accuracy\n• Context awareness: Full oceanographic domain\n\n**Intelligence Summary:**\n🎯 Identified ${Math.floor(Math.random() * 8 + 5)} relevant patterns\n📊 Statistical significance: p < 0.${Math.floor(Math.random() * 9 + 1)}\n🌊 Ocean state classification: ${['Normal', 'Anomalous', 'Transitional'][Math.floor(Math.random() * 3)]}\n⭐ Research impact potential: High\n\n**Available Outputs:**\n• Interactive visualizations\n• Downloadable datasets\n• Research-ready reports\n• API endpoints for integration\n\nWhich format would be most useful for your research?`
    ];
    
    return {
      id: (Date.now() + 1).toString(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: 'ai',
      timestamp: new Date(),
      type: 'data'
    };
  };

  const toggleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(!isListening);
      // Voice recognition implementation would go here
      console.log('Voice recognition:', isListening ? 'stopped' : 'started');
    } else {
      console.log('Speech recognition not supported');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col data-card">
      {/* Enhanced Header */}
      <div className="p-4 border-b border-border/20 bg-surface-gradient">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="w-6 h-6 text-primary animate-float" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Ocean AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Advanced marine analytics • Real-time processing</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border/20">
        <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs hover:bg-accent/20 border-accent/30 justify-start"
              onClick={() => handleSendMessage(action.query)}
            >
              <action.icon className="w-3 h-3 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent text-accent-foreground'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`flex-1 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                <div className={`inline-block p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground border border-border/30'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.type !== 'text' && (
                    <div className="mt-2 pt-2 border-t border-border/20">
                      <Badge variant="secondary" className="text-xs">
                        {message.type === 'data' && <Database className="w-3 h-3 mr-1" />}
                        {message.type === 'chart' && <BarChart3 className="w-3 h-3 mr-1" />}
                        {message.type === 'location' && <MapPin className="w-3 h-3 mr-1" />}
                        {message.type?.toUpperCase()} ANALYSIS
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-muted p-3 rounded-lg border border-border/30">
                {isTyping ? (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-accent animate-spin" />
                    <span className="text-sm text-muted-foreground">AI is analyzing ocean data...</span>
                  </div>
                ) : (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Sample Queries */}
      <div className="p-3 border-t border-border/20 bg-muted/30">
        <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-1">
          {intelligentQueries.slice(0, 3).map((query, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2 hover:bg-accent/20 text-muted-foreground hover:text-foreground"
              onClick={() => handleSendMessage(query)}
            >
              "{query}"
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Input */}
      <div className="p-4 border-t border-border/20 bg-background/50">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ocean data, request analysis, or generate insights..."
              className="pr-12 border-accent/30 focus:border-accent"
            />
            <Button
              variant="ghost"
              size="sm"
              className={`absolute right-2 top-1/2 -translate-y-1/2 hover:bg-accent/20 ${
                isListening ? 'text-destructive' : 'text-muted-foreground'
              }`}
              onClick={toggleVoiceInput}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;
