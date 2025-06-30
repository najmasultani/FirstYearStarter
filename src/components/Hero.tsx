import React from 'react';
import { ArrowRight, Brain, Map, Users, Star, Compass, Zap, BookOpen, Lightbulb, DollarSign } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 section-spacing">
      <div className="content-width-wide px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center">
          <h1 className="title-main mb-8">
            Navigate Campus Life
            <span className="block bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>
          
          <p className="text-body text-xl content-width-narrow mb-12">
            More than just a campus map, First Year Starter helps you navigate university life with smart tools, curated resources, AI-powered recommendations, and a student-led community to support you every step of the way.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 btn-hover focus-ring shadow-lg font-semibold"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 btn-hover focus-ring shadow-lg font-semibold"
            >
              <span>Explore Campus Map</span>
            </button>
          </div>

          {/* Feature Cards - Better responsive grid */}
          <div className="wide-cards-grid content-width mb-20">
            <div className="group bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100 card-hover focus-ring" tabIndex={0}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Map className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Campus Navigator</h3>
              <p className="text-body mb-6">
                Discover hidden study spots, cafes, and everything you need with our interactive campus map
              </p>
              <button 
                onClick={onGetStarted}
                className="text-blue-700 hover:text-blue-800 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 focus-ring rounded mx-auto"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100 card-hover focus-ring" tabIndex={0}>
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <p className="text-body mb-6">
                Get personalized suggestions based on your preferences and current campus events
              </p>
              <button 
                onClick={onGetStarted}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 focus-ring rounded mx-auto"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100 card-hover focus-ring" tabIndex={0}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Wisdom</h3>
              <p className="text-body mb-6">
                Learn from fellow students' tips and contribute your own discoveries
              </p>
              <button 
                onClick={onGetStarted}
                className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 focus-ring rounded mx-auto"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* What's Inside Section */}
          <div className="subheading-spacing content-width-narrow">
            <h2 className="title-sub mb-6">What's Inside First Year Starter</h2>
            <p className="text-body text-lg mb-16">Powerful tools to help you succeed at university</p>
            
            <div className="cards-grid">
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Compass className="h-8 w-8 text-blue-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Interactive Maps</h4>
                <p className="text-body">Find your way around campus</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Free Resources</h4>
                <p className="text-body">Free software & student discounts</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Study Techniques</h4>
                <p className="text-body">Personalized learning strategies</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                  <Lightbulb className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Community Tips</h4>
                <p className="text-body">Learn from fellow students</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Smart Tools</h4>
                <p className="text-body">AI-powered campus assistance</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="subheading-spacing content-width-narrow">
            <h2 className="title-sub mb-6">How First Year Starter Works</h2>
            <p className="text-body text-lg mb-16">Your personalized guide to university success</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-xl font-bold text-blue-700">1</span>
                  <div className="absolute w-16 h-0.5 bg-blue-200 left-full top-1/2 hidden md:block"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Select Your University</h4>
                <p className="text-body">Choose your campus to get personalized recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-xl font-bold text-purple-600">2</span>
                  <div className="absolute w-16 h-0.5 bg-purple-200 left-full top-1/2 hidden md:block"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Explore Resources</h4>
                <p className="text-body">Discover campus locations, tools, and community wisdom</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-green-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Succeed Like a Pro</h4>
                <p className="text-body">Use our tools to excel in your university journey</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 text-meta">
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