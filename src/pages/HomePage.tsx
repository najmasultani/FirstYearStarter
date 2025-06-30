import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { DailyTips } from '../components/DailyTips';
import { LocationCard } from '../components/LocationCard';
import { StudySpotMatcher } from '../components/StudySpotMatcher';
import { VoiceCampusAI } from '../components/VoiceCampusAI';
import { LocationDetailModal } from '../components/LocationDetailModal';
import { ShareDiscoveryModal } from '../components/ShareDiscoveryModal';
import { UniversitySelectionModal } from '../components/UniversitySelectionModal';
import { useUniversity } from '../contexts/UniversityContext';
import { getUniversityData } from '../data/mockData';
import { Location, DailyTip } from '../types';
import { TrendingUp, Users, BookOpen, Star, ArrowRight, MapPin, MessageCircle, Brain, Compass, Zap, Lightbulb, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const { selectedUniversity, universities, setSelectedUniversity } = useUniversity();
  const [matchedSpots, setMatchedSpots] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  
  // State for university data
  const [universityLocations, setUniversityLocations] = useState<Location[]>([]);
  const [universityTips, setUniversityTips] = useState<DailyTip[]>([]);

  // Load university data when selected university changes
  useEffect(() => {
    if (selectedUniversity) {
      const data = getUniversityData(selectedUniversity.id);
      setUniversityLocations(data.locations || []);
      setUniversityTips(data.dailyTips || []);
    } else {
      setUniversityLocations([]);
      setUniversityTips([]);
    }
  }, [selectedUniversity]);

  const featuredLocations = universityLocations.slice(0, 3);

  const handleMatchResults = (matches: Location[]) => {
    setMatchedSpots(matches);
  };

  const handleViewDetails = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleToggleSave = (locationId: string) => {
    setSavedLocations(prev => 
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleShareDiscovery = (discovery: any) => {
    console.log('New discovery shared:', discovery);
    alert(`Thanks for sharing "${discovery.name}"! It will be reviewed and added to ${discovery.universityName} locations.`);
  };

  const handleGetStarted = () => {
    if (!selectedUniversity) {
      setShowUniversityModal(true);
    } else {
      // Navigate to map or dashboard
      window.location.href = '/map';
    }
  };

  const handleUniversitySelect = (university: any) => {
    setSelectedUniversity(university);
    setShowUniversityModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero onGetStarted={handleGetStarted} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* University-specific welcome message */}
        {selectedUniversity && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedUniversity.colors.primary }}
              ></div>
              <span className="text-gray-700">
                Exploring <span className="font-semibold">{selectedUniversity.name}</span>
              </span>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Compass className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{universityLocations.length}+</div>
            <div className="text-sm text-gray-600">Campus Locations</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1.2K</div>
            <div className="text-sm text-gray-600">Active Students</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-sm text-gray-600">Free Resources</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>

        {selectedUniversity ? (
          <div className="space-y-16">
            {/* Main Features Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started with First Year Starter</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover the best features to help you navigate {selectedUniversity.name} like a pro
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Voice AI */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice Campus AI</h3>
                  <p className="text-gray-600 mb-6">
                    Ask questions about {selectedUniversity.shortName} and get instant spoken answers about study spots, dining, and campus life.
                  </p>
                  <VoiceCampusAI />
                </div>

                {/* Study Spot Matcher */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Study Matcher</h3>
                  <p className="text-gray-600 mb-6">
                    Answer a few questions and we'll find the perfect study spots that match your preferences and study style.
                  </p>
                  <StudySpotMatcher locations={universityLocations} onMatchResults={handleMatchResults} />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  <p className="text-gray-600 mb-6">
                    Jump into the most popular features and start exploring {selectedUniversity.shortName} right away.
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/map"
                      className="flex items-center justify-between w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <span>🗺️ Explore Campus Map</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/resources"
                      className="flex items-center justify-between w-full p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      <span>📚 Educational Resources</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/resource-unlocker"
                      className="flex items-center justify-between w-full p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <span>💰 Free & Discounted Resources</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/community"
                      className="flex items-center justify-between w-full p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <span>👥 Join Community</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Matched Results */}
            {matchedSpots.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Your Personalized Matches</h3>
                  <Link
                    to="/map"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>View All Locations</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedSpots.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      onViewDetails={handleViewDetails}
                      onToggleSave={handleToggleSave}
                      isSaved={savedLocations.includes(location.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Featured Locations */}
            {featuredLocations.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Popular This Week</h3>
                  <Link
                    to="/map"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>Explore All</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredLocations.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      onViewDetails={handleViewDetails}
                      onToggleSave={handleToggleSave}
                      isSaved={savedLocations.includes(location.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Daily Tips Sidebar */}
            {universityTips.length > 0 && (
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore More?</h3>
                      <p className="text-gray-700 mb-6">
                        Discover academic tools, connect with the community, and make the most of your {selectedUniversity.shortName} experience.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Link
                          to="/resources"
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Educational Resources
                        </Link>
                        <Link
                          to="/resource-unlocker"
                          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Free & Discounted Resources
                        </Link>
                        <Link
                          to="/community"
                          className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Join Community
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <DailyTips tips={universityTips} />
                  </div>
                </div>
              </section>
            )}

            {/* How First Year Starter Helps */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How First Year Starter Helps You</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Your comprehensive guide to navigating university life successfully
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Compass className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Find Your Way</h3>
                  <p className="text-sm text-gray-600">
                    Interactive maps show you the best study spots, dining options, and hidden gems on campus
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Access Resources</h3>
                  <p className="text-sm text-gray-600">
                    Unlock free software, textbooks, and exclusive student discounts worth thousands
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Study Smarter</h3>
                  <p className="text-sm text-gray-600">
                    Discover personalized study techniques and tools that match your learning style
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Insider Tips</h3>
                  <p className="text-sm text-gray-600">
                    Learn from experienced students who've already navigated the challenges you face
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your University</h3>
              <p className="text-gray-600 mb-6">
                Select your campus to get personalized recommendations, study spots, and community tips.
              </p>
              <button
                onClick={handleGetStarted}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedLocation && (
        <LocationDetailModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          onToggleSave={handleToggleSave}
          isSaved={savedLocations.includes(selectedLocation.id)}
        />
      )}

      {showShareModal && (
        <ShareDiscoveryModal
          onClose={() => setShowShareModal(false)}
          onSubmit={handleShareDiscovery}
        />
      )}

      {showUniversityModal && (
        <UniversitySelectionModal
          universities={universities}
          onUniversitySelect={handleUniversitySelect}
          onClose={() => setShowUniversityModal(false)}
        />
      )}
    </div>
  );
};