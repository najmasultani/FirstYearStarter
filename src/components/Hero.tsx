import React from 'react';
import { ArrowRight, Brain, Map, Users, Star, Compass, Zap, BookOpen, Lightbulb, DollarSign } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Navigate Campus Life
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            More than just a campus map, First Year Starter helps you navigate university life with smart tools, curated resources, AI-powered recommendations, and a student-led community to support you every step of the way.
          </p>

          {/* Action Buttons - Aligned with cards below */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 max-w-md mx-auto">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Explore Campus Map
            </button>
          </div>

          {/* Feature Cards with Enhanced Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Map className="h-8 w-8 text-white group-hover:animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Smart Campus Navigator</h3>
              <p className="text-gray-600 mb-4">
                Discover hidden study spots, cafes, and everything you need with our interactive campus map
              </p>
              <button 
                onClick={onGetStarted}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">AI Recommendations</h3>
              <p className="text-gray-600 mb-4">
                Get personalized suggestions based on your preferences and current campus events
              </p>
              <button 
                onClick={onGetStarted}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white group-hover:animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Community Wisdom</h3>
              <p className="text-gray-600 mb-4">
                Learn from fellow students' tips and contribute your own discoveries
              </p>
              <button 
                onClick={onGetStarted}
                className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* What's Inside Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Inside First Year Starter</h2>
            <p className="text-lg text-gray-600 mb-12">Powerful tools to help you succeed at university</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Compass className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Interactive Maps</h4>
                <p className="text-sm text-gray-600">Find your way around campus</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Free Resources</h4>
                <p className="text-sm text-gray-600">Free software & student discounts</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Study Techniques</h4>
                <p className="text-sm text-gray-600">Personalized learning strategies</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <Lightbulb className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Tips</h4>
                <p className="text-sm text-gray-600">Learn from fellow students</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How First Year Starter Works</h2>
            <p className="text-lg text-gray-600 mb-12">Your personalized guide to university success</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-xl font-bold text-blue-600">1</span>
                  <div className="absolute w-16 h-0.5 bg-blue-200 left-full top-1/2 hidden md:block"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Select Your University</h4>
                <p className="text-sm text-gray-600">Choose your campus to get personalized recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-xl font-bold text-purple-600">2</span>
                  <div className="absolute w-16 h-0.5 bg-purple-200 left-full top-1/2 hidden md:block"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Explore Resources</h4>
                <p className="text-sm text-gray-600">Discover campus locations, tools, and community wisdom</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Succeed Like a Pro</h4>
                <p className="text-sm text-gray-600">Use our tools to excel in your university journey</p>
              </div>
            </div>
          </div>

          {/* Stats with better spacing */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.8/5 student rating</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
            <span>1,200+ active users</span>
            <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
            <span>500+ verified locations</span>
          </div>
        </div>
      </div>
    </div>
  );
};