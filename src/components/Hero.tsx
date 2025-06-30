import React from 'react';
import { ArrowRight, Brain, Map, Users, Star, Compass, Zap, BookOpen, Lightbulb, DollarSign } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 section-spacing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Get Started Button at Top */}
          <div className="mb-12">
            <button
              onClick={onGetStarted}
              className="btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <h1 className="title-main mb-8">
            Navigate Campus Life
            <span className="block bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>
          
          <p className="text-body text-xl max-w-4xl mx-auto mb-12">
            More than just a campus map, First Year Starter helps you navigate university life with smart tools, curated resources, AI-powered recommendations, and a student-led community to support you every step of the way.
          </p>

          {/* Feature Cards */}
          <div className="cards-grid max-w-6xl mx-auto mb-20">
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover focus-ring" tabIndex={0}>
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Map className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Campus Navigator</h3>
              <p className="text-body mb-6">
                Discover hidden study spots, cafes, and everything you need with our interactive campus map
              </p>
              <button 
                onClick={onGetStarted}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 focus-ring rounded"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover focus-ring" tabIndex={0}>
              <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <p className="text-body mb-6">
                Get personalized suggestions based on your preferences and current campus events
              </p>
              <button 
                onClick={onGetStarted}
                className="text-teal-500 hover:text-teal-600 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 focus-ring rounded"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover focus-ring" tabIndex={0}>
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Wisdom</h3>
              <p className="text-body mb-6">
                Learn from fellow students' tips and contribute your own discoveries
              </p>
              <button 
                onClick={onGetStarted}
                className="text-violet-600 hover:text-violet-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 focus-ring rounded"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* What's Inside Section */}
          <div className="subheading-spacing max-w-4xl mx-auto">
            <h2 className="title-sub mb-6">What's Inside First Year Starter</h2>
            <p className="text-body text-lg mb-16">Powerful tools to help you succeed at university</p>
            
            <div className="cards-grid">
              <div className="text-center group">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Compass className="h-8 w-8 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Interactive Maps</h4>
                <p className="text-body">Find your way around campus</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors">
                  <DollarSign className="h-8 w-8 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Free Resources</h4>
                <p className="text-body">Free software & student discounts</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-violet-200 transition-colors">
                  <BookOpen className="h-8 w-8 text-violet-600" />
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
            </div>
          </div>

          {/* How It Works Section */}
          <div className="subheading-spacing max-w-4xl mx-auto">
            <h2 className="title-sub mb-6">How First Year Starter Works</h2>
            <p className="text-body text-lg mb-16">Your personalized guide to university success</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-xl font-bold text-indigo-600">1</span>
                  <div className="absolute w-16 h-0.5 bg-indigo-200 left-full top-1/2 hidden md:block"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Select Your University</h4>
                <p className="text-body">Choose your campus to get personalized recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-xl font-bold text-violet-600">2</span>
                  <div className="absolute w-16 h-0.5 bg-violet-200 left-full top-1/2 hidden md:block"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Explore Resources</h4>
                <p className="text-body">Discover campus locations, tools, and community wisdom</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-teal-600">3</span>
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