import React from 'react';
import { X, Star, Users, Clock, MapPin, Heart, MessageCircle, Share2, Navigation } from 'lucide-react';
import { Location } from '../types';

interface LocationDetailModalProps {
  location: Location;
  onClose: () => void;
  onToggleSave?: (locationId: string) => void;
  isSaved?: boolean;
}

export const LocationDetailModal: React.FC<LocationDetailModalProps> = ({
  location,
  onClose,
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: location.name,
        text: location.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out ${location.name}: ${location.description}`);
      alert('Location details copied to clipboard!');
    }
  };

  const handleGetDirections = () => {
    const [lat, lng] = location.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="h-16 w-16 mx-auto mb-2 opacity-80" />
              <p className="text-sm opacity-80">Photo coming soon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Title and Category */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(location.category)}`}>
                  {location.category.replace('-', ' ')}
                </span>
                {onToggleSave && (
                  <button
                    onClick={() => onToggleSave(location.id)}
                    className={`p-1 rounded-full transition-colors ${
                      isSaved ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{location.name}</h2>
              <p className="text-gray-600">{location.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">{location.rating.toFixed(1)}</span>
              <span>({location.votes} reviews)</span>
            </div>
            {location.hours && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{location.hours}</span>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features & Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {location.features.map((feature) => (
                <span key={feature} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          {location.tips.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Student Tips</h3>
              <div className="space-y-3">
                {location.tips.map((tip) => (
                  <div key={tip.id} className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {tip.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-blue-900 mb-1">"{tip.content}"</p>
                        <div className="flex items-center space-x-2 text-xs text-blue-600">
                          <span>- {tip.author}</span>
                          <span>•</span>
                          <span>{tip.votes} helpful</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGetDirections}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1"
            >
              <Navigation className="h-4 w-4" />
              <span>Get Directions</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex-1"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Add Tip Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Share Your Experience</h4>
            <div className="flex space-x-3">
              <textarea
                placeholder="Share a helpful tip about this location..."
                className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};