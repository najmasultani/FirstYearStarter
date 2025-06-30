import React, { useState } from 'react';
import { Search, MapPin, Globe, ChevronDown, Check } from 'lucide-react';
import { University } from '../types';

interface UniversitySelectorProps {
  universities: University[];
  selectedUniversity: University | null;
  onUniversitySelect: (university: University) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const UniversitySelector: React.FC<UniversitySelectorProps> = ({
  universities,
  selectedUniversity,
  onUniversitySelect,
  isOpen,
  onToggle
}) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleUniversitySelect = (university: University) => {
    onUniversitySelect(university);
    onToggle();
    setSearchQuery('');
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px]"
      >
        <Globe className="h-4 w-4 text-gray-500" />
        <div className="flex-1 text-left">
          {selectedUniversity ? (
            <div>
              <div className="font-medium text-gray-900">{selectedUniversity.shortName}</div>
              <div className="text-xs text-gray-500">{selectedUniversity.city}, {selectedUniversity.country === 'Canada' ? selectedUniversity.province : selectedUniversity.state}</div>
            </div>
          ) : (
            <span className="text-gray-500">Select your university</span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* University List */}
          <div className="max-h-80 overflow-y-auto">
            {Object.entries(groupedUniversities).map(([country, countryUniversities]) => (
              <div key={country}>
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {country}
                    </span>
                    <span className="text-xs text-gray-400">({countryUniversities.length})</span>
                  </div>
                </div>
                {countryUniversities.map((university) => (
                  <button
                    key={university.id}
                    onClick={() => handleUniversitySelect(university)}
                    className="w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: university.colors.primary }}
                        ></div>
                        <div>
                          <div className="font-medium text-gray-900">{university.name}</div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{university.city}, {country === 'Canada' ? university.province : university.state}</span>
                          </div>
                        </div>
                      </div>
                      {selectedUniversity?.id === university.id && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Globe className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No universities found</p>
              <p className="text-sm">Try adjusting your search</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};