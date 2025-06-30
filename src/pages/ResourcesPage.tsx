import React, { useState } from 'react';
import { Search, Plus, BookOpen, Brain, FileText, Calculator, Clock, Unlock } from 'lucide-react';
import { ResourceCard } from '../components/ResourceCard';
import { SettlingInToolkit } from '../components/SettlingInToolkit';
import { ResourceRotator } from '../components/ResourceRotator';
import { FreeTextbooksAndTools } from '../components/FreeTextbooksAndTools';
import { StudyTechniquesQuiz } from '../components/StudyTechniquesQuiz';
import { useUniversity } from '../contexts/UniversityContext';
import { getUniversityData } from '../data/mockData';
import { ResourceCategory } from '../types';

export const ResourcesPage: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'educational' | 'study-techniques' | 'tools' | 'resources'>('educational');

  // Get university-specific data
  const universityData = selectedUniversity ? getUniversityData(selectedUniversity.id) : { resources: [] };
  const universityResources = universityData.resources;

  const categories: { key: ResourceCategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All Resources', icon: '📚' },
    { key: 'academic', label: 'Academic Help', icon: '🎓' },
    { key: 'internships', label: 'Jobs & Internships', icon: '💼' },
    { key: 'clubs', label: 'Design Teams & Clubs', icon: '🎭' },
    { key: 'financial', label: 'Financial Aid', icon: '💰' },
    { key: 'mental-health', label: 'Mental Health', icon: '💚' },
    { key: 'social', label: 'Social & Events', icon: '🎉' }
  ];

  const tabs = [
    { key: 'educational', label: 'Educational Resources', icon: BookOpen, description: 'Free textbooks, YouTube, AI tools' },
    { key: 'study-techniques', label: 'Study Techniques', icon: Brain, description: 'Personalized study methods' },
    { key: 'tools', label: 'First Year Survival Toolkit', icon: Calculator, description: 'Essential first-year resources' },
    { key: 'resources', label: 'Resource Library', icon: FileText, description: 'Curated links & guides' }
  ];

  const filteredResources = universityResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpvote = (resourceId: string) => {
    console.log('Upvote resource:', resourceId);
  };

  const handleToolClick = (toolName: string) => {
    // Handle tool clicks - you can implement specific functionality for each tool
    console.log(`Clicked on ${toolName}`);
    alert(`${toolName} feature coming soon! This will open the ${toolName} tool.`);
  };

  if (!selectedUniversity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your University</h2>
          <p className="text-gray-600">
            Choose your campus to access curated resources and helpful tools.
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
              <h1 className="text-3xl font-bold text-gray-900">Academic Resources & Tools</h1>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Everything you need to succeed at {selectedUniversity.name}</p>

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

        {/* Content */}
        {activeTab === 'educational' && (
          <div className="space-y-8">
            <FreeTextbooksAndTools />
          </div>
        )}

        {activeTab === 'study-techniques' && (
          <div className="space-y-8">
            <StudyTechniquesQuiz />
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-8">
            {/* Featured Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">First Year Survival Toolkit</h2>
                  <SettlingInToolkit />
                </div>
              </div>
            </div>

            {/* Quick Tools */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button 
                  onClick={() => handleToolClick('GPA Calculator')}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer text-left"
                >
                  <Calculator className="h-8 w-8 text-emerald-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">GPA Calculator</h3>
                  <p className="text-sm text-gray-600">Track your academic progress</p>
                </button>
                <button 
                  onClick={() => handleToolClick('Schedule Planner')}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer text-left"
                >
                  <Clock className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Schedule Planner</h3>
                  <p className="text-sm text-gray-600">Optimize your class schedule</p>
                </button>
                <button 
                  onClick={() => handleToolClick('Study Planner')}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer text-left"
                >
                  <Brain className="h-8 w-8 text-orange-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Study Planner</h3>
                  <p className="text-sm text-gray-600">Organize your study schedule</p>
                </button>
                <button 
                  onClick={() => handleToolClick('Note Organizer')}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer text-left"
                >
                  <FileText className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Note Organizer</h3>
                  <p className="text-sm text-gray-600">Keep your notes organized</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={() => alert('Add Resource feature coming soon!')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Resource</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onUpvote={handleUpvote}
                />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {/* Campus Navigator Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Campus Navigator for {selectedUniversity.shortName}</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Discover everything you need to succeed at {selectedUniversity.name} with our comprehensive resource library and academic tools.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Free textbooks and educational resources</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Personalized study technique recommendations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>AI tools and study planners</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Design teams and student organizations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};