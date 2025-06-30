import React, { useState } from 'react';
import { CheckCircle, Circle, ExternalLink, Lightbulb, ChevronDown, ChevronRight } from 'lucide-react';
import { SettlingInTask } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

export const SettlingInToolkit: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['essential']);

  // Mock settling-in tasks
  const tasks: SettlingInTask[] = [
    {
      id: 'tcard',
      title: 'Get Your TCard',
      description: 'Your student ID card for library access, meal plans, and building entry',
      category: 'essential',
      priority: 'high',
      completed: false,
      links: [`${selectedUniversity?.website}/tcard`],
      tips: [
        'Bring government-issued photo ID',
        'Visit the TCard office in the Student Centre',
        'Your TCard also works as a debit card on campus'
      ],
      universityId: selectedUniversity?.id || ''
    },
    {
      id: 'acorn',
      title: 'Master ACORN System',
      description: 'Learn to navigate course enrollment, grades, and academic records',
      category: 'essential',
      priority: 'high',
      completed: false,
      links: [`${selectedUniversity?.website}/acorn`],
      tips: [
        'Bookmark ACORN for quick access',
        'Set up grade notifications',
        'Use the mobile app for quick grade checks'
      ],
      universityId: selectedUniversity?.id || ''
    },
    {
      id: 'software',
      title: 'Download Free Software',
      description: 'Access MATLAB, Office 365, and other essential software',
      category: 'academic',
      priority: 'medium',
      completed: false,
      links: [`${selectedUniversity?.website}/software`],
      tips: [
        'Use your university email for free Office 365',
        'MATLAB is free for all engineering students',
        'Adobe Creative Suite available in computer labs'
      ],
      universityId: selectedUniversity?.id || ''
    },
    {
      id: 'library',
      title: 'Library System Tour',
      description: 'Learn about borrowing, study spaces, and research resources',
      category: 'academic',
      priority: 'medium',
      completed: false,
      links: [`${selectedUniversity?.website}/library`],
      tips: [
        'Book group study rooms online',
        'Use interlibrary loans for books not available',
        'Librarians offer free research help sessions'
      ],
      universityId: selectedUniversity?.id || ''
    },
    {
      id: 'health',
      title: 'Register with Health Services',
      description: 'Set up healthcare and mental health support',
      category: 'wellness',
      priority: 'high',
      completed: false,
      links: [`${selectedUniversity?.website}/health`],
      tips: [
        'Free counseling services available',
        'Walk-in clinic for minor health issues',
        'Mental health resources are confidential'
      ],
      universityId: selectedUniversity?.id || ''
    },
    {
      id: 'transit',
      title: 'Get Transit Pass',
      description: 'Set up your public transportation for getting around the city',
      category: 'practical',
      priority: 'medium',
      completed: false,
      links: ['#'],
      tips: [
        'Student discounts available on monthly passes',
        'Download transit apps for real-time schedules',
        'Consider bike sharing for short trips'
      ],
      universityId: selectedUniversity?.id || ''
    }
  ];

  const categories = [
    { key: 'essential', label: 'Essential First Steps', icon: '🎯' },
    { key: 'academic', label: 'Academic Setup', icon: '📚' },
    { key: 'wellness', label: 'Health & Wellness', icon: '💚' },
    { key: 'practical', label: 'Practical Life', icon: '🏠' }
  ];

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getCompletionPercentage = () => {
    return Math.round((completedTasks.length / tasks.length) * 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Settling In Toolkit</h3>
          <p className="text-gray-600 text-sm">Your {selectedUniversity?.shortName} survival checklist</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{getCompletionPercentage()}%</div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{completedTasks.length} of {tasks.length} completed</span>
          <span>{tasks.length - completedTasks.length} remaining</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryTasks = tasks.filter(task => task.category === category.key);
          const completedInCategory = categoryTasks.filter(task => completedTasks.includes(task.id)).length;
          const isExpanded = expandedCategories.includes(category.key);

          return (
            <div key={category.key} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleCategory(category.key)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{category.label}</div>
                    <div className="text-sm text-gray-500">
                      {completedInCategory} of {categoryTasks.length} completed
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                  {categoryTasks.map((task) => {
                    const isCompleted = completedTasks.includes(task.id);
                    return (
                      <div key={task.id} className={`border rounded-lg p-4 transition-all ${
                        isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-1 flex-shrink-0"
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className={`font-medium ${isCompleted ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                                {task.title}
                              </h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            
                            <p className={`text-sm mb-3 ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                              {task.description}
                            </p>

                            {/* Tips */}
                            <div className="mb-3">
                              <div className="flex items-center space-x-1 mb-2">
                                <Lightbulb className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-700">Pro Tips:</span>
                              </div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {task.tips.map((tip, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-yellow-500 mt-1">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap gap-2">
                              {task.links.map((link, index) => (
                                <a
                                  key={index}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                                >
                                  <span>Official Link</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">AI</span>
          </div>
          <span className="font-medium text-gray-900">Smart Recommendations</span>
        </div>
        <p className="text-sm text-gray-600">
          Based on your progress, we recommend focusing on getting your TCard and setting up ACORN first. 
          These will unlock access to most other {selectedUniversity?.shortName} services and resources.
        </p>
      </div>
    </div>
  );
};