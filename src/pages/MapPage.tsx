import React, { useState, useEffect } from 'react';
import { Filter, Search, MapPin, Layers, Navigation, Star, Users } from 'lucide-react';
import { LocationCard } from '../components/LocationCard';
import { LocationDetailModal } from '../components/LocationDetailModal';
import { StudyBuddyMap } from '../components/StudyBuddyMap';
import { useUniversity } from '../contexts/UniversityContext';
import { getUniversityData } from '../data/mockData';
import { Location, LocationCategory } from '../types';

export const MapPage: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [selectedFilters, setSelectedFilters] = useState<LocationCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'map' | 'list' | 'buddies'>('map');
  const [universityLocations, setUniversityLocations] = useState<Location[]>([]);

  // Fetch university-specific data when selectedUniversity changes
  useEffect(() => {
    if (selectedUniversity) {
      const universityData = getUniversityData(selectedUniversity.id);
      setUniversityLocations(universityData?.locations || []);
    } else {
      setUniversityLocations([]);
    }
  }, [selectedUniversity]);

  const categories: { key: LocationCategory; label: string; color: string; icon: string }[] = [
    { key: 'study', label: 'Study Spots', color: 'bg-blue-500', icon: '📚' },
    { key: 'food', label: 'Food & Dining', color: 'bg-orange-500', icon: '🍕' },
    { key: 'social', label: 'Social Spaces', color: 'bg-purple-500', icon: '👥' },
    { key: 'admin', label: 'Admin Offices', color: 'bg-gray-500', icon: '🏢' },
    { key: 'recreation', label: 'Recreation', color: 'bg-green-500', icon: '⚽' },
    { key: 'services', label: 'Services', color: 'bg-indigo-500', icon: '🛠️' },
    { key: 'hidden-gems', label: 'Hidden Gems', color: 'bg-pink-500', icon: '💎' }
  ];

  const views = [
    { key: 'map', label: 'Interactive Map', icon: MapPin, description: 'Visual campus exploration' },
    { key: 'list', label: 'Location List', icon: Layers, description: 'Browse all locations' },
    { key: 'buddies', label: 'Study Buddies', icon: Users, description: 'Find study partners' }
  ];

  const filteredLocations = universityLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(location.category);
    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (category: LocationCategory) => {
    setSelectedFilters(prev => 
      prev.includes(category) 
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
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

  if (!selectedUniversity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your University</h2>
          <p className="text-gray-600">
            Choose your campus to explore locations and get personalized recommendations.
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
          <div className="flex items-center space-x-3 mb-4">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedUniversity.colors.primary }}
            ></div>
            <h1 className="text-3xl font-bold text-gray-900">{selectedUniversity.shortName} Campus Explorer</h1>
          </div>
          <p className="text-gray-600 mb-6">Discover and explore all the amazing places at {selectedUniversity.name}</p>

          {/* View Toggle */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6">
            <div className="flex space-x-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.key}
                    onClick={() => setActiveView(view.key as any)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex-1 ${
                      activeView === view.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-left">
                      <div>{view.label}</div>
                      <div className={`text-xs ${activeView === view.key ? 'text-blue-100' : 'text-gray-500'}`}>
                        {view.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Filters:</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => toggleFilter(category.key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilters.includes(category.key)
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredLocations.length}</div>
              <div className="text-sm text-gray-600">Total Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{filteredLocations.filter(l => l.category === 'study').length}</div>
              <div className="text-sm text-gray-600">Study Spots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{filteredLocations.filter(l => l.category === 'food').length}</div>
              <div className="text-sm text-gray-600">Food Options</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{filteredLocations.filter(l => l.category === 'hidden-gems').length}</div>
              <div className="text-sm text-gray-600">Hidden Gems</div>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeView === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center h-96 lg:h-[600px] flex items-center justify-center">
                <div>
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    Full interactive campus map for {selectedUniversity.shortName} with real-time location tracking and navigation
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Layers className="h-4 w-4" />
                      <span>Multiple layers</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Navigation className="h-4 w-4" />
                      <span>GPS navigation</span>
                    </div>
                    <span>•</span>
                    <span>Real-time updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Locations ({filteredLocations.length})
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredLocations.slice(0, 5).map((location) => (
                    <div key={location.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{location.name}</h4>
                        <span className={`w-3 h-3 rounded-full ${
                          categories.find(c => c.key === location.category)?.color || 'bg-gray-400'
                        }`}></span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{location.rating.toFixed(1)}</span>
                        </div>
                        <button
                          onClick={() => handleViewDetails(location)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Location */}
              {filteredLocations.length > 0 && (
                <LocationCard
                  location={filteredLocations[0]}
                  onViewDetails={handleViewDetails}
                  onToggleSave={handleToggleSave}
                  isSaved={savedLocations.includes(filteredLocations[0].id)}
                />
              )}
            </div>
          </div>
        )}

        {activeView === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onViewDetails={handleViewDetails}
                onToggleSave={handleToggleSave}
                isSaved={savedLocations.includes(location.id)}
              />
            ))}
            {filteredLocations.length === 0 && (
              <div className="col-span-full text-center py-12">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Locations Found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {activeView === 'buddies' && (
          <StudyBuddyMap locations={universityLocations} />
        )}
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <LocationDetailModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          onToggleSave={handleToggleSave}
          isSaved={savedLocations.includes(selectedLocation.id)}
        />
      )}
    </div>
  );
};