import React from 'react';
import { ExternalLink, ArrowUp, Tag } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onUpvote: (resourceId: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onUpvote }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      internships: 'bg-green-100 text-green-800',
      clubs: 'bg-purple-100 text-purple-800',
      financial: 'bg-yellow-100 text-yellow-800',
      'mental-health': 'bg-red-100 text-red-800',
      social: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || colors.academic;
  };

  const handleVisit = () => {
    if (resource.url && resource.url !== '#') {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      alert('This resource link will be available soon!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(resource.category)}`}>
              {resource.category.replace('-', ' ')}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Tag className="h-4 w-4 text-gray-400" />
        <div className="flex flex-wrap gap-1">
          {resource.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => onUpvote(resource.id)}
          className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <ArrowUp className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-700">{resource.upvotes}</span>
        </button>
        
        <button
          onClick={handleVisit}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Visit</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};