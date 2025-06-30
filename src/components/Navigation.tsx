import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Map, BookOpen, Users, User, Home, ChevronDown, Brain, Settings, Menu, X, LayoutGrid, DollarSign } from 'lucide-react';
import { University } from '../types';

interface NavigationProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  selectedUniversity: University | null;
  onUniversityChange: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  isAuthenticated, 
  onLogin, 
  selectedUniversity,
  onUniversityChange 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { path: '/', label: 'Home', icon: Home, description: 'Dashboard & Overview' },
    { path: '/map', label: 'Campus Map', icon: Map, description: 'Explore Locations' },
    { path: '/resources', label: 'Educational Resources', icon: BookOpen, description: 'Study materials & guides' },
    { path: '/resource-unlocker', label: 'Free & Discounted Resources', icon: DollarSign, description: 'Free software & discounts' },
    { path: '/community', label: 'Community', icon: Users, description: 'Connect & Share' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 focus-ring rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                First Year Starter
              </span>
              <div className="text-meta">Smart University Guide</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-2 flex-1 justify-center max-w-4xl">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex flex-col items-center px-4 py-3 rounded-lg text-xs font-medium transition-all duration-200 focus-ring ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 shadow-sm'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mb-1" />
                  <span className="text-center leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden lg:flex xl:hidden items-center space-x-2 flex-1 justify-center">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 focus-ring ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 shadow-sm'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                  title={item.description}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus-ring"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            {/* University Selector */}
            {selectedUniversity && (
              <button
                onClick={onUniversityChange}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 focus-ring"
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedUniversity.colors.primary }}
                ></div>
                <span className="font-medium hidden xl:inline">{selectedUniversity.shortName}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">A</span>
                  </div>
                  <span className="hidden xl:inline font-medium">Alex</span>
                </div>
                <Link
                  to="/dashboard"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden xl:inline">Dashboard</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="btn-primary"
              >
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-6 space-y-2">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-lg transition-colors focus-ring ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-meta">{item.description}</div>
                  </div>
                </Link>
              );
            })}
            
            {/* Dashboard Link for Mobile */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-4 px-4 py-4 rounded-lg transition-colors text-gray-700 hover:text-indigo-600 hover:bg-gray-50 focus-ring"
              >
                <LayoutGrid className="h-5 w-5" />
                <div>
                  <div className="font-medium">Dashboard</div>
                  <div className="text-meta">Your personal space</div>
                </div>
              </Link>
            )}

            {/* Mobile University Selector */}
            {selectedUniversity && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    onUniversityChange();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-4 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors w-full focus-ring"
                >
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedUniversity.colors.primary }}
                  ></div>
                  <span className="font-medium">{selectedUniversity.name}</span>
                  <ChevronDown className="h-3 w-3 ml-auto" />
                </button>
              </div>
            )}

            {/* Mobile User Menu */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">A</span>
                    </div>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>Alex</span>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-4 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus-ring"
                  >
                    <User className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-primary w-full"
                >
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};