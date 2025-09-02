import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Waves, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [drops, setDrops] = useState<Array<{id: number, x: number, y: number}>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (Math.random() < 0.08) {
        const newDrop = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY
        };
        setDrops(prev => [...prev.slice(-15), newDrop]);
        
        setTimeout(() => {
          setDrops(prev => prev.filter(drop => drop.id !== newDrop.id));
        }, 2000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      localStorage.setItem('auth', 'true');
      navigate('/');
    } else {
      setError('Please fill all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-800 dark:via-blue-800 dark:to-indigo-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Futuristic Network Background */}
      <div className="absolute inset-0">
        {/* Nodes */}
        <div className="futuristic-node top-20 right-20" />
        <div className="futuristic-node top-40 left-32" />
        <div className="futuristic-node bottom-32 right-40" />
        <div className="futuristic-node bottom-20 left-20" />
        <div className="futuristic-node top-1/3 left-1/3" />
        <div className="futuristic-node top-16 right-1/3" />
        <div className="futuristic-node bottom-16 left-1/4" />
        <div className="futuristic-node top-2/3 right-1/4" />
        <div className="futuristic-node bottom-1/4 right-1/2" />
        <div className="futuristic-node top-1/4 left-1/2" />
        <div className="futuristic-node bottom-2/3 left-3/4" />
        
        {/* Connecting Lines */}
        <div className="futuristic-line line-1" />
        <div className="futuristic-line line-2" />
        <div className="futuristic-line line-3" />
        <div className="futuristic-line line-4" />
        <div className="futuristic-line" style={{top: '30%', right: '20%', width: '120px', transform: 'rotate(45deg)'}} />
        <div className="futuristic-line" style={{bottom: '30%', left: '25%', width: '160px', transform: 'rotate(-30deg)'}} />
        <div className="futuristic-line" style={{top: '70%', left: '60%', width: '90px', transform: 'rotate(75deg)'}} />
      </div>

      {/* Water Drops */}
      {drops.map(drop => (
        <div
          key={drop.id}
          className="water-drop"
          style={{
            left: drop.x,
            top: drop.y,
            position: 'fixed',
            zIndex: 5
          }}
        />
      ))}

      <div 
        className="w-full max-w-md relative z-20 bg-black/30 backdrop-blur-md border border-cyan-500/40 rounded-xl p-8 shadow-2xl shadow-cyan-500/30 login-card dark:bg-slate-800/40 dark:border-cyan-400/50 dark:shadow-cyan-400/25"
        style={{
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`
        } as React.CSSProperties}
      >
        <div className="text-center mb-8 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 cursor-pointer">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-light text-white hover:text-cyan-300 transition-colors duration-300">Aqua Lense</span>
          </div>
          <h2 className="text-2xl font-light mb-2 text-white hover:text-cyan-200 transition-colors duration-300">Create Account</h2>
          <p className="text-gray-300 font-light hover:text-gray-200 transition-colors duration-300">Join the oceanographic research community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          
          <div className="space-y-2 hover:scale-105 transition-all duration-300">
            <label className="text-sm font-light text-gray-200 hover:text-cyan-300 transition-colors duration-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-background/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary hover:border-cyan-400 transition-all duration-300"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2 hover:scale-105 transition-all duration-300">
            <label className="text-sm font-light text-gray-200 hover:text-cyan-300 transition-colors duration-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-background/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary hover:border-cyan-400 transition-all duration-300"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2 hover:scale-105 transition-all duration-300">
            <label className="text-sm font-light text-gray-200 hover:text-cyan-300 transition-colors duration-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-background/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary hover:border-cyan-400 transition-all duration-300"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 text-white py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm hover:scale-105 transition-all duration-300">
          <span className="text-gray-300 font-light hover:text-gray-200 transition-colors duration-300">Already have an account? </span>
          <Link to="/login" className="text-gray-300 hover:text-cyan-300 hover:underline font-light transition-all duration-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
