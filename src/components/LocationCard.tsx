import React from 'react';
import { Star, Users, Clock, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { Location } from '../types';

interface LocationCardProps {
  location: Location;
  onViewDetails: (location: Location) => void;
  onToggleSave?: (locationId: string) => void;
  isSaved?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({ 
  location, 
  onViewDetails, 
  onToggleSave, 
  isSaved = false 
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      study: 'bg-blue-100 text-blue-800',
      food: 'bg-orange-100 text-orange-800',
      social: 'bg-purple-100 text-purple-800',
      admin: 'bg-gray-100 text-gray-800',
      recreation: 'bg-green-100 text-green-800',
      services: 'bg-indigo-100 text-indigo-800',
      'hidden-gems': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || colors.study;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden group card-hover">
      {/* Image placeholder with 4:3 aspect ratio */}
      <div className="aspect-4-3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-2">📍</div>
          <div className="text-meta">Photo coming soon</div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <span className={`text-meta px-2 py-1 rounded-full ${getCategoryColor(location.category)}`}>
                {location.category.replace('-', ' ')}
              </span>
              {onToggleSave && (
                <button
                  onClick={() => onToggleSave(location.id)}
                  className={`p-1 rounded-full transition-colors focus-ring ${
                    isSaved ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{location.name}</h3>
            <p className="text-body mb-4">{location.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-meta">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>{location.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{location.votes} reviews</span>
          </div>
          {location.hours && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{location.hours}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {location.features.slice(0, 3).map((feature) => (
            <span key={feature} className="text-meta bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {location.features.length > 3 && (
            <span className="text-meta text-gray-500">+{location.features.length - 3} more</span>
          )}
        </div>

        {location.tips.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="h-4 w-4 text-blue-700" />
              <span className="text-sm font-medium text-blue-900">Recent Tip</span>
            </div>
            <p className="text-sm text-blue-800">"{location.tips[0].content}"</p>
            <p className="text-meta text-blue-600 mt-1">- {location.tips[0].author}</p>
          </div>
        )}

        <button
          onClick={() => onViewDetails(location)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700 btn-hover focus-ring"
        >
          <span className="font-medium">View Details</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};