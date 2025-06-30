import React, { useState, useEffect } from 'react';
import { RefreshCw, Star, ExternalLink, Calendar } from 'lucide-react';
import { Resource } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

interface ResourceRotatorProps {
  resources: Resource[];
}

export const ResourceRotator: React.FC<ResourceRotatorProps> = ({ resources }) => {
  const { selectedUniversity } = useUniversity();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [rotatingResources, setRotatingResources] = useState<Resource[]>([]);

  // Mock rotating resources
  const weeklyResources = {
    1: [
      {
        id: 'workshop-1',
        title: 'Free MATLAB Workshop',
        url: '#',
        category: 'academic' as const,
        description: 'Learn MATLAB basics for engineering courses',
        upvotes: 45,
        tags: ['matlab', 'engineering', 'free'],
        universityId: selectedUniversity?.id || '',
        isWeeklyRotation: true,
        rotationWeek: 1
      },
      {
        id: 'job-1',
        title: 'Research Assistant Position',
        url: '#',
        category: 'internships' as const,
        description: 'Part-time research opportunity in Computer Science',
        upvotes: 32,
        tags: ['research', 'part-time', 'cs'],
        universityId: selectedUniversity?.id || '',
        isWeeklyRotation: true,
        rotationWeek: 1
      },
      {
        id: 'club-1',
        title: 'Hidden Gem: Debate Society',
        url: '#',
        category: 'clubs' as const,
        description: 'Small but active debate club looking for new members',
        upvotes: 28,
        tags: ['debate', 'speaking', 'small-group'],
        universityId: selectedUniversity?.id || '',
        isWeeklyRotation: true,
        rotationWeek: 1
      }
    ],
    2: [
      {
        id: 'workshop-2',
        title: 'Python for Data Science',
        url: '#',
        category: 'academic' as const,
        description: 'Introduction to data analysis with Python',
        upvotes: 52,
        tags: ['python', 'data-science', 'free'],
        universityId: selectedUniversity?.id || '',
        isWeeklyRotation: true,
        rotationWeek: 2
      },
      {
        id: 'job-2',
        title: 'Teaching Assistant Opening',
        url: '#',
        category: 'internships' as const,
        description: 'TA position for first-year mathematics courses',
        upvotes: 38,
        tags: ['teaching', 'math', 'flexible'],
        universityId: selectedUniversity?.id || '',
        isWeeklyRotation: true,
        rotationWeek: 2
      },
      {
        id: 'club-2',
        title: 'Hidden Gem: Photography Club',
        url: '#',
        category: 'clubs' as const,
        description: 'Weekly photo walks and darkroom access',
        upvotes: 41,
        tags: ['photography', 'creative', 'weekly'],
        universityId: selectedUniversity?.id || '',
        isWeeklyRotation: true,
        rotationWeek: 2
      }
    ]
  };

  useEffect(() => {
    // Simulate weekly rotation based on current date
    const weekNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % 2 + 1;
    setCurrentWeek(weekNumber);
    setRotatingResources(weeklyResources[weekNumber as keyof typeof weeklyResources] || []);
  }, []);

  const handleRefresh = () => {
    const nextWeek = currentWeek === 1 ? 2 : 1;
    setCurrentWeek(nextWeek);
    setRotatingResources(weeklyResources[nextWeek as keyof typeof weeklyResources] || []);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'internships': return '💼';
      case 'clubs': return '🎭';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      internships: 'bg-green-100 text-green-800',
      clubs: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">This Week's Highlights</h3>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="space-y-4">
        {rotatingResources.map((resource) => (
          <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(resource.category)}</div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(resource.category)}`}>
                      {resource.category === 'academic' ? 'Free Workshop' :
                       resource.category === 'internships' ? 'Job of the Week' :
                       'Hidden Club Spotlight'}
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Week {resource.rotationWeek}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{resource.upvotes}</span>
                </div>
                <div className="flex space-x-1">
                  {resource.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <span>Learn More</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600 font-semibold text-sm">AI</span>
          </div>
          <span className="font-medium text-gray-900">Auto-Updated Weekly</span>
        </div>
        <p className="text-sm text-gray-600">
          Resources are automatically fetched from {selectedUniversity?.shortName} websites and updated every week. 
          New opportunities, workshops, and hidden gems are discovered for you!
        </p>
      </div>
    </div>
  );
};