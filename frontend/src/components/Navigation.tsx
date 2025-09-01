import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Theme toggle button
const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="ml-2 px-3 py-1 rounded-full border border-border bg-background dark:bg-gray-800 text-foreground dark:text-white transition-colors hover:bg-accent/30 dark:hover:bg-gray-700 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
};
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Waves, 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  Database, 
  Brain,
  Globe,
  Activity,
  Info,
  Sun,
  Moon
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem('auth') === 'true');

  useEffect(() => {
    const handleStorage = () => setIsAuth(localStorage.getItem('auth') === 'true');
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuth(false);
    navigate('/login', { replace: true });
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Activity },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  // { path: '/data-pipeline', label: 'Data Pipeline', icon: Database },
    { path: '/about', label: 'About', icon: Info }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">ArgoAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 ${
                    isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent/20'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Brain className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            {isAuth && (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full border border-border bg-background dark:bg-gray-800 text-foreground dark:text-white hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      isActive(item.path) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent/20'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-border/20 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
                <Button size="sm" className="w-full justify-start bg-accent hover:bg-accent/90">
                  <Globe className="w-4 h-4 mr-2" />
                  Go Live
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
