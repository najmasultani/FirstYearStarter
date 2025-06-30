import React, { useState } from 'react';
import { X, MapPin, Camera, Tag, Plus } from 'lucide-react';
import { LocationCategory } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

interface ShareDiscoveryModalProps {
  onClose: () => void;
  onSubmit: (discovery: any) => void;
}

export const ShareDiscoveryModal: React.FC<ShareDiscoveryModalProps> = ({
  onClose,
  onSubmit
}) => {
  const { selectedUniversity } = useUniversity();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'study' as LocationCategory,
    features: [] as string[],
    hours: '',
    tip: ''
  });
  const [newFeature, setNewFeature] = useState('');

  const categories: { key: LocationCategory; label: string }[] = [
    { key: 'study', label: 'Study Spot' },
    { key: 'food', label: 'Food & Dining' },
    { key: 'social', label: 'Social Space' },
    { key: 'admin', label: 'Admin Office' },
    { key: 'recreation', label: 'Recreation' },
    { key: 'services', label: 'Services' },
    { key: 'hidden-gems', label: 'Hidden Gem' }
  ];

  const commonFeatures = [
    'WiFi', 'Quiet Study', 'Group Study', 'Natural Light', 'Coffee Available',
    'Comfortable Seating', 'Whiteboards', 'Computers', 'Printing', 'Food Allowed',
    '24/7 Access', 'Air Conditioning', 'Outdoor Seating', 'Power Outlets'
  ];

  const handleAddFeature = (feature: string) => {
    if (!formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleAddCustomFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      handleAddFeature(newFeature.trim());
      setNewFeature('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in the required fields');
      return;
    }

    const discovery = {
      ...formData,
      universityId: selectedUniversity?.id,
      universityName: selectedUniversity?.shortName
    };

    onSubmit(discovery);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Share a Discovery</h2>
            <p className="text-gray-600 mt-1">
              Help fellow {selectedUniversity?.shortName} students discover amazing spots
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Quiet corner in Engineering building"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as LocationCategory }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what makes this place special..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours (Optional)
              </label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                placeholder="e.g., 8am - 10pm, 24/7, Weekdays only"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features & Amenities
              </label>
              
              {/* Selected Features */}
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.features.map(feature => (
                    <span
                      key={feature}
                      className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Common Features */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {commonFeatures.map(feature => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleAddFeature(feature)}
                    disabled={formData.features.includes(feature)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.features.includes(feature)
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>

              {/* Custom Feature */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add custom feature..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomFeature())}
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Pro Tip */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pro Tip (Optional)
              </label>
              <textarea
                value={formData.tip}
                onChange={(e) => setFormData(prev => ({ ...prev, tip: e.target.value }))}
                placeholder="Share a helpful tip for other students..."
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Photo Upload Placeholder */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo (Coming Soon)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Photo upload feature coming soon</p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Share Discovery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};