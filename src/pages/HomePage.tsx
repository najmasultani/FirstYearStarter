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
import { TrendingUp, Users, BookOpen, Star, ArrowRight, MapPin, MessageCircle, Brain, Compass, Zap, Lightbulb, DollarSign, Award, Target } from 'lucide-react';
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

  const featuredLocations = universityLocations.slice(0, 5); // Show 5 instead of 3

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
      window.location.href = '/map';
    }
  };

  const handleUniversitySelect = (university: any) => {
    setSelectedUniversity(university);
    setShowUniversityModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 page-fade-in">
      <Hero onGetStarted={handleGetStarted} />
      
      <div className="content-width-wide px-4 sm:px-6 lg:px-8 xl:px-12 section-spacing">
        {/* University-specific welcome message */}
        {selectedUniversity && (
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedUniversity.colors.primary }}
              ></div>
              <span className="text-body">
                Exploring <span className="font-semibold">{selectedUniversity.name}</span>
              </span>
            </div>
          </div>
        )}

        {/* Quick Stats - Better responsive grid */}
        <div className="stats-grid mb-20">
          <div className="bg-white rounded-xl p-6 lg:p-8 text-center shadow-sm border border-gray-100 card-hover">
            <Compass className="h-8 w-8 text-blue-700 mx-auto mb-4" />
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{universityLocations.length}+</div>
            <div className="text-meta">Campus Locations</div>
          </div>
          <div className="bg-white rounded-xl p-6 lg:p-8 text-center shadow-sm border border-gray-100 card-hover">
            <Users className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">1.2K</div>
            <div className="text-meta">Active Students</div>
          </div>
          <div className="bg-white rounded-xl p-6 lg:p-8 text-center shadow-sm border border-gray-100 card-hover">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">150+</div>
            <div className="text-meta">Free Resources</div>
          </div>
          <div className="bg-white rounded-xl p-6 lg:p-8 text-center shadow-sm border border-gray-100 card-hover">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">4.8</div>
            <div className="text-meta">Average Rating</div>
          </div>
        </div>

        {selectedUniversity ? (
          <div className="space-y-24">
            {/* Main Features Section */}
            <section>
              <div className="text-center mb-16">
                <h2 className="title-sub mb-6">Get Started with First Year Starter</h2>
                <p className="text-body text-lg content-width-narrow">
                  Discover the best features to help you navigate {selectedUniversity.name} like a pro
                </p>
              </div>

              <div className="features-grid">
                {/* Voice AI */}
                <div className="bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-8">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Voice Campus AI</h3>
                  <p className="text-body mb-8">
                    Ask questions about {selectedUniversity.shortName} and get instant spoken answers about study spots, dining, and campus life.
                  </p>
                  <VoiceCampusAI />
                </div>

                {/* Study Spot Matcher */}
                <div className="bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-8">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Study Matcher</h3>
                  <p className="text-body mb-8">
                    Answer a few questions and we'll find the perfect study spots that match your preferences and study style.
                  </p>
                  <StudySpotMatcher locations={universityLocations} onMatchResults={handleMatchResults} />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-xl flex items-center justify-center mb-8">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <p className="text-body mb-8">
                    Jump into the most popular features and start exploring {selectedUniversity.shortName} right away.
                  </p>
                  <div className="space-y-4">
                    <Link
                      to="/map"
                      className="flex items-center justify-between w-full p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors btn-hover focus-ring"
                    >
                      <span>🗺️ Explore Campus Map</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/resources"
                      className="flex items-center justify-between w-full p-4 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors btn-hover focus-ring"
                    >
                      <span>📚 Educational Resources</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/resource-unlocker"
                      className="flex items-center justify-between w-full p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors btn-hover focus-ring"
                    >
                      <span>💰 Free & Discounted Resources</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/community"
                      className="flex items-center justify-between w-full p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors btn-hover focus-ring"
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
                <div className="flex items-center justify-between mb-12">
                  <h3 className="title-sub">Your Personalized Matches</h3>
                  <Link
                    to="/map"
                    className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium btn-hover focus-ring rounded"
                  >
                    <span>View All Locations</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="cards-grid">
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
                <div className="flex items-center justify-between mb-12">
                  <h3 className="title-sub">Popular This Week</h3>
                  <Link
                    to="/map"
                    className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium btn-hover focus-ring rounded"
                  >
                    <span>Explore All</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="cards-grid">
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

            {/* Daily Tips and CTA Section */}
            {universityTips.length > 0 && (
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 lg:p-10 border border-blue-100">
                      <h3 className="title-sub mb-6">Ready to Explore More?</h3>
                      <p className="text-body text-lg mb-8">
                        Discover academic tools, connect with the community, and make the most of your {selectedUniversity.shortName} experience.
                      </p>
                      <div className="flex flex-wrap gap-4 lg:gap-6">
                        <Link
                          to="/resources"
                          className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors btn-hover focus-ring font-medium"
                        >
                          Educational Resources
                        </Link>
                        <Link
                          to="/resource-unlocker"
                          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors btn-hover focus-ring font-medium"
                        >
                          Free Resources
                        </Link>
                        <Link
                          to="/community"
                          className="px-6 py-3 bg-white text-blue-700 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors btn-hover focus-ring font-medium"
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

            {/* How First Year Starter Helps - Enhanced with more cards */}
            <section>
              <div className="text-center mb-16">
                <h2 className="title-sub mb-6">How First Year Starter Helps You</h2>
                <p className="text-body text-lg content-width-narrow">
                  Your comprehensive guide to navigating university life successfully
                </p>
              </div>

              <div className="cards-grid">
                <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Compass className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Find Your Way</h3>
                  <p className="text-body">
                    Interactive maps show you the best study spots, dining options, and hidden gems on campus
                  </p>
                </div>
                
                <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Access Resources</h3>
                  <p className="text-body">
                    Unlock free software, textbooks, and exclusive student discounts worth thousands
                  </p>
                </div>
                
                <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Study Smarter</h3>
                  <p className="text-body">
                    Discover personalized study techniques and tools that match your learning style
                  </p>
                </div>
                
                <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Lightbulb className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Get Insider Tips</h3>
                  <p className="text-body">
                    Learn from experienced students who've already navigated the challenges you face
                  </p>
                </div>

                <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Connect & Share</h3>
                  <p className="text-body">
                    Join a community of students sharing tips, asking questions, and helping each other succeed
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center section-spacing-sm">
            <div className="content-width-narrow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your University</h3>
              <p className="text-body mb-8">
                Select your campus to get personalized recommendations, study spots, and community tips.
              </p>
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors btn-hover focus-ring font-medium"
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