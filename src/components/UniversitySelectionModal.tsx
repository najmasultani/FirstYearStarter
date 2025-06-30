import React, { useState } from 'react';
import { X, MapPin, ArrowRight, Globe, Check } from 'lucide-react';
import { University } from '../types';

interface UniversitySelectionModalProps {
  universities: University[];
  onUniversitySelect: (university: University) => void;
  onClose: () => void;
}

export const UniversitySelectionModal: React.FC<UniversitySelectionModalProps> = ({
  universities,
  onUniversitySelect,
  onClose
}) => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleConfirm = () => {
    if (selectedUniversity) {
      onUniversitySelect(selectedUniversity);
      onClose();
    }
  };

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    university.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    university.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedUniversities = filteredUniversities.reduce((acc, university) => {
    const country = university.country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(university);
    return acc;
  }, {} as Record<string, University[]>);

  const popularUniversities = universities.slice(0, 6);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose Your University</h2>
            <p className="text-gray-600 mt-1">Select your campus to get personalized recommendations</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* University Search */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Search for your university
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, city, or abbreviation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* University List */}
          {searchQuery ? (
            <div>
              {Object.entries(groupedUniversities).map(([country, countryUniversities]) => (
                <div key={country} className="mb-6">
                  <div className="px-3 py-2 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {country}
                      </span>
                      <span className="text-xs text-gray-400">({countryUniversities.length})</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {countryUniversities.map((university) => (
                      <button
                        key={university.id}
                        onClick={() => setSelectedUniversity(university)}
                        className={`p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                          selectedUniversity?.id === university.id
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: university.colors.primary }}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{university.name}</div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">
                                {university.city}, {university.country === 'Canada' ? university.province : university.state}
                              </span>
                            </div>
                          </div>
                          {selectedUniversity?.id === university.id && (
                            <Check className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {filteredUniversities.length === 0 && (
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No universities found</h3>
                  <p className="text-gray-600">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Universities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {popularUniversities.map((university) => (
                  <button
                    key={university.id}
                    onClick={() => setSelectedUniversity(university)}
                    className={`p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                      selectedUniversity?.id === university.id
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: university.colors.primary }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{university.shortName}</div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">
                            {university.city}, {university.country === 'Canada' ? university.province : university.state}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected University Preview */}
          {selectedUniversity && (
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: selectedUniversity.colors.primary }}
                ></div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedUniversity.name}</div>
                  <div className="text-sm text-gray-600">
                    {selectedUniversity.city}, {selectedUniversity.country === 'Canada' ? selectedUniversity.province : selectedUniversity.state}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                You'll get personalized campus maps, study spots, resources, and community tips specific to {selectedUniversity.shortName}.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedUniversity}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
              selectedUniversity
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};