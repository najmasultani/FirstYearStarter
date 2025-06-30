import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 300);
    const timer2 = setTimeout(() => setShowTagline(true), 1200);
    const timer3 = setTimeout(() => setShowSubtext(true), 1800);
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Animated Logo */}
        <div className={`transition-all duration-1000 ease-out transform ${
          showLogo 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-8'
        }`}>
          <div className="relative mb-8">
            {/* Logo container with glow effect */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Compass className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            
            {/* Floating particles around logo */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-1 -right-3 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-2 -left-1 w-2 h-2 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* App Name */}
        <div className={`transition-all duration-1000 ease-out transform ${
          showTagline 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
              First Year Starter
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-1000 ease-out transform ${
          showSubtext 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-xl md:text-2xl text-gray-600 font-medium mb-2">
            Your Smart University Guide
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto px-4">
            Navigate university life with confidence using AI-powered tools, curated resources, and student community wisdom
          </p>
        </div>

        {/* Loading indicator */}
        <div className={`mt-12 transition-all duration-500 ${
          showSubtext ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm text-gray-400 mt-3">Loading your personalized experience...</p>
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};