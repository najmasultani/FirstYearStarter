import React, { useState } from 'react';
import { MessageCircle, Users, TrendingUp, Plus, Heart, MessageSquare, Award, Calendar } from 'lucide-react';
import { LocationCard } from '../components/LocationCard';
import { LocationDetailModal } from '../components/LocationDetailModal';
import { ShareDiscoveryModal } from '../components/ShareDiscoveryModal';
import { AskUpperYears } from '../components/AskUpperYears';
import { CampusFixIt } from '../components/CampusFixIt';
import { useUniversity } from '../contexts/UniversityContext';
import { getUniversityData } from '../data/mockData';

export const CommunityPage: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [activeTab, setActiveTab] = useState<'feed' | 'qa' | 'issues' | 'events'>('feed');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);

  // Get university-specific data
  const universityData = selectedUniversity ? getUniversityData(selectedUniversity.id) : { locations: [] };
  const universityLocations = universityData.locations;

  const recentActivity = selectedUniversity ? [
    {
      id: '1',
      type: 'tip',
      user: 'Alex Chen',
      content: `The 3rd floor of ${selectedUniversity.shortName} Main Library has amazing natural lighting in the afternoon!`,
      location: `${selectedUniversity.shortName} Main Library`,
      timestamp: '2 hours ago',
      votes: 12
    },
    {
      id: '2',
      type: 'location',
      user: 'Sarah Kim',
      content: `Added a new hidden study spot at ${selectedUniversity.name}`,
      location: `${selectedUniversity.shortName} Quiet Corner`,
      timestamp: '4 hours ago',
      votes: 8
    },
    {
      id: '3',
      type: 'tip',
      user: 'Mike Rodriguez',
      content: `Pro tip: The food court at ${selectedUniversity.shortName} Student Center is way less crowded after 2pm`,
      location: `${selectedUniversity.shortName} Student Center`,
      timestamp: '6 hours ago',
      votes: 23
    }
  ] : [];

  const tabs = [
    { key: 'feed', label: 'Community Feed', icon: MessageCircle, description: 'Latest activity & tips' },
    { key: 'qa', label: 'Ask Upper Years', icon: MessageSquare, description: 'Get advice from seniors' },
    { key: 'issues', label: 'Campus Fix It', icon: TrendingUp, description: 'Report & track issues' },
    { key: 'events', label: 'Events', icon: Calendar, description: 'Campus events & meetups' }
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

  const handleVoteActivity = (activityId: string) => {
    console.log('Voted on activity:', activityId);
  };

  if (!selectedUniversity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your University</h2>
          <p className="text-gray-600">
            Choose your campus to connect with fellow students and share campus wisdom.
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
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedUniversity.colors.primary }}
              ></div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedUniversity.shortName} Community</h1>
            </div>
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Share Discovery</span>
            </button>
          </div>
          <p className="text-gray-600 mb-6">Connect with fellow {selectedUniversity.name} students and share campus wisdom</p>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex-1 ${
                      activeTab === tab.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-left">
                      <div>{tab.label}</div>
                      <div className={`text-xs ${activeTab === tab.key ? 'text-blue-100' : 'text-gray-500'}`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-sm text-gray-600">{selectedUniversity.shortName} Members</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-8 w-8 text-emerald-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">3,456</div>
                <div className="text-sm text-gray-600">Tips Shared</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-sm text-gray-600">Helpful Rating</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-sm text-gray-600">Active Contributors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{activity.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{activity.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="text-blue-600">📍 {activity.location}</span>
                            <button 
                              onClick={() => handleVoteActivity(activity.id)}
                              className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                            >
                              <Heart className="h-4 w-4" />
                              <span>{activity.votes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Contributors */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top {selectedUniversity.shortName} Contributors</h3>
                <div className="space-y-3">
                  {['Sarah Kim', 'Alex Chen', 'Mike Rodriguez'].map((name, index) => (
                    <div key={name} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{name}</div>
                        <div className="text-sm text-gray-500">{45 - index * 10} contributions</div>
                      </div>
                      <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Challenge */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Challenge</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover 3 new {selectedUniversity.shortName} study spots this week and earn the Explorer badge!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="text-xs text-gray-600">2 of 3 spots discovered</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'qa' && (
          <AskUpperYears />
        )}

        {activeTab === 'issues' && (
          <CampusFixIt />
        )}

        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming {selectedUniversity.shortName} Events</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-3">
                <div className="font-medium text-gray-900">Study Group Meetup</div>
                <div className="text-sm text-gray-600">Today, 3:00 PM</div>
                <div className="text-xs text-gray-500">{selectedUniversity.shortName} Main Library, 5th Floor</div>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-3">
                <div className="font-medium text-gray-900">Free Pizza Social</div>
                <div className="text-sm text-gray-600">Tomorrow, 12:00 PM</div>
                <div className="text-xs text-gray-500">{selectedUniversity.shortName} Student Center</div>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-3">
                <div className="font-medium text-gray-900">Career Fair</div>
                <div className="text-sm text-gray-600">Friday, 10:00 AM</div>
                <div className="text-xs text-gray-500">{selectedUniversity.shortName} Campus Quad</div>
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