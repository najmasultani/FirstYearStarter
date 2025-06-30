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
      window.location.href = '/map';
    }
  };

  const handleUniversitySelect = (university: any) => {
    setSelectedUniversity(university);
    setShowUniversityModal(false);
  };

  return (
    <div className="min-h-screen page-fade-in" style={{ backgroundColor: 'var(--background)' }}>
      <Hero onGetStarted={handleGetStarted} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
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

        {/* Quick Stats */}
        <div className="cards-grid mb-20">
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 card-hover">
            <Compass className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
            <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{universityLocations.length}+</div>
            <div className="text-meta">Campus Locations</div>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 card-hover">
            <Users className="h-8 w-8 text-teal-500 mx-auto mb-4" />
            <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>1.2K</div>
            <div className="text-meta">Active Students</div>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 card-hover">
            <DollarSign className="h-8 w-8 text-violet-600 mx-auto mb-4" />
            <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>150+</div>
            <div className="text-meta">Free Resources</div>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 card-hover">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>4.8</div>
            <div className="text-meta">Average Rating</div>
          </div>
        </div>

        {selectedUniversity ? (
          <div className="space-y-24">
            {/* Main Features Section */}
            <section>
              <div className="text-center mb-16">
                <h2 className="title-sub mb-6">Get Started with First Year Starter</h2>
                <p className="text-body text-lg max-w-3xl mx-auto">
                  Discover the best features to help you navigate {selectedUniversity.name} like a pro
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Voice AI */}
                <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center mb-8">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>Voice Campus AI</h3>
                  <p className="text-body mb-8">
                    Ask questions about {selectedUniversity.shortName} and get instant spoken answers about study spots, dining, and campus life.
                  </p>
                  <VoiceCampusAI />
                </div>

                {/* Study Spot Matcher */}
                <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-xl flex items-center justify-center mb-8">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>Smart Study Matcher</h3>
                  <p className="text-body mb-8">
                    Answer a few questions and we'll find the perfect study spots that match your preferences and study style.
                  </p>
                  <StudySpotMatcher locations={universityLocations} onMatchResults={handleMatchResults} />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-violet-500 rounded-xl flex items-center justify-center mb-8">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>Quick Actions</h3>
                  <p className="text-body mb-8">
                    Jump into the most popular features and start exploring {selectedUniversity.shortName} right away.
                  </p>
                  <div className="space-y-4">
                    <Link
                      to="/map"
                      className="flex items-center justify-between w-full p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors btn-hover focus-ring"
                    >
                      <span>🗺️ Explore Campus Map</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/resources"
                      className="flex items-center justify-between w-full p-4 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors btn-hover focus-ring"
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
                      className="flex items-center justify-between w-full p-4 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors btn-hover focus-ring"
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
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium btn-hover focus-ring rounded"
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
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium btn-hover focus-ring rounded"
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

            {/* Daily Tips Sidebar */}
            {universityTips.length > 0 && (
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-10 border border-indigo-100">
                      <h3 className="title-sub mb-6">Ready to Explore More?</h3>
                      <p className="text-body text-lg mb-8">
                        Discover academic tools, connect with the community, and make the most of your {selectedUniversity.shortName} experience.
                      </p>
                      <div className="flex flex-wrap gap-6">
                        <Link
                          to="/resources"
                          className="btn-primary"
                        >
                          Educational Resources
                        </Link>
                        <Link
                          to="/resource-unlocker"
                          className="btn-secondary"
                        >
                          Free & Discounted Resources
                        </Link>
                        <Link
                          to="/community"
                          className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors btn-hover focus-ring font-semibold"
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
              <div className="text-center mb-16">
                <h2 className="title-sub mb-6">How First Year Starter Helps You</h2>
                <p className="text-body text-lg max-w-3xl mx-auto">
                  Your comprehensive guide to navigating university life successfully
                </p>
              </div>

              <div className="cards-grid">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                    <Compass className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Find Your Way</h3>
                  <p className="text-body">
                    Interactive maps show you the best study spots, dining options, and hidden gems on campus
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                    <DollarSign className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Access Resources</h3>
                  <p className="text-body">
                    Unlock free software, textbooks, and exclusive student discounts worth thousands
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                    <Brain className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Study Smarter</h3>
                  <p className="text-body">
                    Discover personalized study techniques and tools that match your learning style
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Lightbulb className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Get Insider Tips</h3>
                  <p className="text-body">
                    Learn from experienced students who've already navigated the challenges you face
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center section-spacing-sm">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>Choose Your University</h3>
              <p className="text-body mb-8">
                Select your campus to get personalized recommendations, study spots, and community tips.
              </p>
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