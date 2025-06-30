import React, { useState } from 'react';
import { BookmarkIcon, MapPin, TrendingUp, Calendar, Award, Settings, Clock, MessageCircle, AlertTriangle, BookOpen, Brain, Unlock, DollarSign } from 'lucide-react';
import { LocationCard } from '../components/LocationCard';
import { LocationDetailModal } from '../components/LocationDetailModal';
import { ShareDiscoveryModal } from '../components/ShareDiscoveryModal';
import { CampusFixIt } from '../components/CampusFixIt';
import { AskUpperYears } from '../components/AskUpperYears';
import { TimeToClassReminder } from '../components/TimeToClassReminder';
import { MiniCoursepedia } from '../components/MiniCoursepedia';
import { VoiceCampusAI } from '../components/VoiceCampusAI';
import { SettlingInToolkit } from '../components/SettlingInToolkit';
import { ResourceUnlocker } from '../components/ResourceUnlocker';
import { useUniversity } from '../contexts/UniversityContext';
import { getUniversityData } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [savedLocations, setSavedLocations] = useState<string[]>(['uoft-1', 'uoft-2', 'uoft-3']);
  const [activeSection, setActiveSection] = useState<'overview' | 'academic' | 'community' | 'tools'>('overview');

  // Get university-specific data
  const universityData = selectedUniversity ? getUniversityData(selectedUniversity.id) : { locations: [] };
  const universityLocations = universityData.locations;

  const savedLocationData = universityLocations.filter(loc => savedLocations.includes(loc.id)).slice(0, 3);
  const recentlyVisited = universityLocations.slice(3, 5);

  const achievements = [
    { id: '1', name: 'Explorer', description: 'Visited 10 locations', earned: true },
    { id: '2', name: 'Contributor', description: 'Shared 5 tips', earned: true },
    { id: '3', name: 'Social Butterfly', description: 'Joined 3 events', earned: false },
    { id: '4', name: 'Study Master', description: 'Found perfect study spot', earned: true }
  ];

  const sections = [
    { key: 'overview', label: 'Overview', icon: TrendingUp, description: 'Your activity & stats' },
    { key: 'academic', label: 'Academic Tools', icon: BookOpen, description: 'Study resources & tools' },
    { key: 'community', label: 'Community', icon: MessageCircle, description: 'Connect & share' },
    { key: 'tools', label: 'Campus Tools', icon: Settings, description: 'Utilities & helpers' }
  ];

  const handleViewDetails = (location: any) => {
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

  if (!selectedUniversity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookmarkIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your University</h2>
          <p className="text-gray-600">
            Choose your campus to access your personalized dashboard and saved locations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedUniversity.colors.primary }}
                ></div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
              </div>
              <p className="text-gray-600">Here's what's happening at {selectedUniversity.name} today</p>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <div className="flex space-x-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key as any)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex-1 ${
                      activeSection === section.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-left">
                      <div>{section.label}</div>
                      <div className={`text-xs ${activeSection === section.key ? 'text-blue-100' : 'text-gray-500'}`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <BookmarkIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{savedLocations.length}</div>
                    <div className="text-sm text-gray-600">Saved Spots</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-sm text-gray-600">Places Visited</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">15</div>
                    <div className="text-sm text-gray-600">Tips Shared</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time to Class */}
            <TimeToClassReminder />

            {/* Saved & Recent Locations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Saved Locations */}
              {savedLocationData.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Saved {selectedUniversity.shortName} Spots</h2>
                  <div className="space-y-4">
                    {savedLocationData.map((location) => (
                      <LocationCard
                        key={location.id}
                        location={location}
                        onViewDetails={handleViewDetails}
                        onToggleSave={handleToggleSave}
                        isSaved={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <Award className={`h-4 w-4 ${
                          achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className="text-sm text-gray-500">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'academic' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <ResourceUnlocker />
                <MiniCoursepedia />
              </div>
              <div className="space-y-8">
                <VoiceCampusAI />
                <SettlingInToolkit />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'community' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AskUpperYears />
              <CampusFixIt />
            </div>
          </div>
        )}

        {activeSection === 'tools' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TimeToClassReminder />
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="w-full text-left p-4 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center space-x-3"
                  >
                    <MapPin className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Add new {selectedUniversity.shortName} discovery</div>
                      <div className="text-sm text-blue-600">Share a hidden gem with the community</div>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Share a tip</div>
                      <div className="text-sm text-emerald-600">Help fellow students succeed</div>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors flex items-center space-x-3">
                    <BookOpen className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Write course review</div>
                      <div className="text-sm text-purple-600">Share your course experience</div>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors flex items-center space-x-3">
                    <DollarSign className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Unlock free resources</div>
                      <div className="text-sm text-orange-600">Discover {selectedUniversity.shortName} perks</div>
                    </div>
                  </button>
                </div>
              </div>
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
    </div>
  );
};