import React, { useState } from 'react';
import { BookOpen, ExternalLink, Star, Users, Brain, Code, Video, Search, Globe, Zap, Download, Calculator, FileText, Laptop } from 'lucide-react';
import { useUniversity } from '../contexts/UniversityContext';

interface EducationalResource {
  id: string;
  name: string;
  description: string;
  category: 'textbooks' | 'youtube' | 'ai-tools' | 'study-tools' | 'coding' | 'math' | 'writing';
  url: string;
  popularity: number; // 1-5 stars
  free: boolean;
  subjects: string[];
  icon: string;
}

export const FreeTextbooksAndTools: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Resources', icon: Globe, color: 'bg-purple-500' },
    { key: 'textbooks', label: 'Free Textbooks', icon: BookOpen, color: 'bg-blue-500' },
    { key: 'youtube', label: 'YouTube Channels', icon: Video, color: 'bg-red-500' },
    { key: 'ai-tools', label: 'AI Tools', icon: Brain, color: 'bg-green-500' },
    { key: 'study-tools', label: 'Study Tools', icon: FileText, color: 'bg-orange-500' },
    { key: 'coding', label: 'Coding Resources', icon: Code, color: 'bg-indigo-500' },
    { key: 'math', label: 'Math Tools', icon: Calculator, color: 'bg-pink-500' },
    { key: 'writing', label: 'Writing Tools', icon: FileText, color: 'bg-yellow-500' }
  ];

  const educationalResources: EducationalResource[] = [
    // Free Textbooks
    {
      id: 'libgen',
      name: 'Library Genesis',
      description: 'Massive collection of free academic books, papers, and textbooks',
      category: 'textbooks',
      url: 'https://libgen.is/',
      popularity: 5,
      free: true,
      subjects: ['All Subjects'],
      icon: '📚'
    },
    {
      id: 'openstax',
      name: 'OpenStax',
      description: 'High-quality, peer-reviewed textbooks that are absolutely free',
      category: 'textbooks',
      url: 'https://openstax.org/',
      popularity: 5,
      free: true,
      subjects: ['Math', 'Science', 'Social Sciences', 'Humanities'],
      icon: '📖'
    },
    {
      id: 'mit-ocw',
      name: 'MIT OpenCourseWare',
      description: 'Free lecture notes, exams, and videos from MIT courses',
      category: 'textbooks',
      url: 'https://ocw.mit.edu/',
      popularity: 5,
      free: true,
      subjects: ['Engineering', 'Computer Science', 'Math', 'Physics'],
      icon: '🎓'
    },
    {
      id: 'project-gutenberg',
      name: 'Project Gutenberg',
      description: 'Over 70,000 free eBooks, especially classics and literature',
      category: 'textbooks',
      url: 'https://www.gutenberg.org/',
      popularity: 4,
      free: true,
      subjects: ['Literature', 'History', 'Philosophy'],
      icon: '📜'
    },
    {
      id: 'internet-archive',
      name: 'Internet Archive',
      description: 'Digital library with millions of free books, movies, and texts',
      category: 'textbooks',
      url: 'https://archive.org/',
      popularity: 4,
      free: true,
      subjects: ['All Subjects'],
      icon: '🏛️'
    },
    {
      id: 'bookboon',
      name: 'Bookboon',
      description: 'Free textbooks and business eBooks for students',
      category: 'textbooks',
      url: 'https://bookboon.com/',
      popularity: 4,
      free: true,
      subjects: ['Business', 'Engineering', 'IT'],
      icon: '💼'
    },

    // YouTube Educational Channels
    {
      id: 'khan-academy',
      name: 'Khan Academy',
      description: 'Comprehensive educational videos covering all subjects from K-12 to college',
      category: 'youtube',
      url: 'https://www.youtube.com/user/khanacademy',
      popularity: 5,
      free: true,
      subjects: ['Math', 'Science', 'Economics', 'History'],
      icon: '🎯'
    },
    {
      id: '3blue1brown',
      name: '3Blue1Brown',
      description: 'Beautiful mathematical concepts explained visually',
      category: 'youtube',
      url: 'https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw',
      popularity: 5,
      free: true,
      subjects: ['Math', 'Linear Algebra', 'Calculus'],
      icon: '🔵'
    },
    {
      id: 'organic-chemistry-tutor',
      name: 'The Organic Chemistry Tutor',
      description: 'Excellent tutorials for chemistry, physics, and math',
      category: 'youtube',
      url: 'https://www.youtube.com/channel/UCEWpbFLzoYGPfuWUMFPSaoA',
      popularity: 5,
      free: true,
      subjects: ['Chemistry', 'Physics', 'Math'],
      icon: '⚗️'
    },
    {
      id: 'crash-course',
      name: 'Crash Course',
      description: 'Fast-paced, comprehensive courses on various subjects',
      category: 'youtube',
      url: 'https://www.youtube.com/user/crashcourse',
      popularity: 5,
      free: true,
      subjects: ['History', 'Science', 'Literature', 'Psychology'],
      icon: '🚀'
    },
    {
      id: 'professor-leonard',
      name: 'Professor Leonard',
      description: 'Clear and detailed math lectures, especially calculus',
      category: 'youtube',
      url: 'https://www.youtube.com/user/professorleonard57',
      popularity: 5,
      free: true,
      subjects: ['Calculus', 'Algebra', 'Statistics'],
      icon: '📐'
    },
    {
      id: 'computerphile',
      name: 'Computerphile',
      description: 'Computer science concepts explained by experts',
      category: 'youtube',
      url: 'https://www.youtube.com/user/Computerphile',
      popularity: 5,
      free: true,
      subjects: ['Computer Science', 'Programming', 'Algorithms'],
      icon: '💻'
    },
    {
      id: 'minutephysics',
      name: 'MinutePhysics',
      description: 'Physics concepts explained in simple, short videos',
      category: 'youtube',
      url: 'https://www.youtube.com/user/minutephysics',
      popularity: 4,
      free: true,
      subjects: ['Physics', 'Science'],
      icon: '⚡'
    },
    {
      id: 'ted-ed',
      name: 'TED-Ed',
      description: 'Educational videos on a wide range of topics',
      category: 'youtube',
      url: 'https://www.youtube.com/user/TEDEducation',
      popularity: 5,
      free: true,
      subjects: ['All Subjects'],
      icon: '🎪'
    },

    // AI Tools
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      description: 'AI assistant for writing, coding, research, and problem-solving',
      category: 'ai-tools',
      url: 'https://chat.openai.com/',
      popularity: 5,
      free: true,
      subjects: ['All Subjects'],
      icon: '🤖'
    },
    {
      id: 'claude',
      name: 'Claude AI',
      description: 'Advanced AI assistant for analysis, writing, and complex reasoning',
      category: 'ai-tools',
      url: 'https://claude.ai/',
      popularity: 5,
      free: true,
      subjects: ['All Subjects'],
      icon: '🧠'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Google\'s AI assistant for research, coding, and creative tasks',
      category: 'ai-tools',
      url: 'https://gemini.google.com/',
      popularity: 5,
      free: true,
      subjects: ['All Subjects'],
      icon: '💎'
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      description: 'AI-powered search engine with real-time information and citations',
      category: 'ai-tools',
      url: 'https://www.perplexity.ai/',
      popularity: 4,
      free: true,
      subjects: ['Research', 'All Subjects'],
      icon: '🔍'
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      description: 'AI pair programmer that helps you write code faster',
      category: 'ai-tools',
      url: 'https://github.com/features/copilot',
      popularity: 5,
      free: false,
      subjects: ['Programming', 'Computer Science'],
      icon: '👨‍💻'
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      description: 'Platform for AI models, datasets, and machine learning tools',
      category: 'ai-tools',
      url: 'https://huggingface.co/',
      popularity: 4,
      free: true,
      subjects: ['AI/ML', 'NLP', 'Computer Vision'],
      icon: '🤗'
    },

    // Study Tools
    {
      id: 'anki',
      name: 'Anki',
      description: 'Powerful spaced repetition flashcard system for memorization',
      category: 'study-tools',
      url: 'https://apps.ankiweb.net/',
      popularity: 5,
      free: true,
      subjects: ['All Subjects'],
      icon: '🃏'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'All-in-one workspace for notes, tasks, and project management',
      category: 'study-tools',
      url: 'https://www.notion.so/',
      popularity: 5,
      free: true,
      subjects: ['Organization', 'Note-taking'],
      icon: '📝'
    },
    {
      id: 'obsidian',
      name: 'Obsidian',
      description: 'Knowledge management app with powerful linking and graph view',
      category: 'study-tools',
      url: 'https://obsidian.md/',
      popularity: 4,
      free: true,
      subjects: ['Note-taking', 'Research'],
      icon: '🔗'
    },
    {
      id: 'forest',
      name: 'Forest',
      description: 'Pomodoro timer app that helps you stay focused and productive',
      category: 'study-tools',
      url: 'https://www.forestapp.cc/',
      popularity: 4,
      free: false,
      subjects: ['Productivity', 'Focus'],
      icon: '🌲'
    },

    // Coding Resources
    {
      id: 'github',
      name: 'GitHub',
      description: 'Code hosting, version control, and collaboration platform',
      category: 'coding',
      url: 'https://github.com/',
      popularity: 5,
      free: true,
      subjects: ['Programming', 'Software Development'],
      icon: '🐙'
    },
    {
      id: 'google-colab',
      name: 'Google Colab',
      description: 'Free Jupyter notebooks with GPU access for data science and ML',
      category: 'coding',
      url: 'https://colab.research.google.com/',
      popularity: 5,
      free: true,
      subjects: ['Data Science', 'Machine Learning', 'Python'],
      icon: '📊'
    },
    {
      id: 'replit',
      name: 'Replit',
      description: 'Online IDE for coding in 50+ programming languages',
      category: 'coding',
      url: 'https://replit.com/',
      popularity: 4,
      free: true,
      subjects: ['Programming', 'Web Development'],
      icon: '⚡'
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      description: 'Platform for practicing coding problems and interview prep',
      category: 'coding',
      url: 'https://leetcode.com/',
      popularity: 5,
      free: true,
      subjects: ['Algorithms', 'Data Structures'],
      icon: '🧩'
    },
    {
      id: 'freecodecamp',
      name: 'freeCodeCamp',
      description: 'Learn to code with free interactive lessons and projects',
      category: 'coding',
      url: 'https://www.freecodecamp.org/',
      popularity: 5,
      free: true,
      subjects: ['Web Development', 'Data Science'],
      icon: '🔥'
    },

    // Math Tools
    {
      id: 'wolfram-alpha',
      name: 'Wolfram Alpha',
      description: 'Computational engine for math, science, and engineering',
      category: 'math',
      url: 'https://www.wolframalpha.com/',
      popularity: 5,
      free: true,
      subjects: ['Math', 'Physics', 'Engineering'],
      icon: '🔢'
    },
    {
      id: 'desmos',
      name: 'Desmos Graphing Calculator',
      description: 'Advanced online graphing calculator and math tools',
      category: 'math',
      url: 'https://www.desmos.com/',
      popularity: 5,
      free: true,
      subjects: ['Math', 'Graphing', 'Statistics'],
      icon: '📈'
    },
    {
      id: 'geogebra',
      name: 'GeoGebra',
      description: 'Interactive math software for geometry, algebra, and calculus',
      category: 'math',
      url: 'https://www.geogebra.org/',
      popularity: 4,
      free: true,
      subjects: ['Math', 'Geometry', 'Calculus'],
      icon: '📐'
    },

    // Writing Tools
    {
      id: 'grammarly',
      name: 'Grammarly',
      description: 'AI-powered writing assistant for grammar, style, and clarity',
      category: 'writing',
      url: 'https://www.grammarly.com/',
      popularity: 5,
      free: true,
      subjects: ['Writing', 'English'],
      icon: '✍️'
    },
    {
      id: 'hemingway',
      name: 'Hemingway Editor',
      description: 'Makes your writing bold and clear by highlighting complex sentences',
      category: 'writing',
      url: 'https://hemingwayapp.com/',
      popularity: 4,
      free: true,
      subjects: ['Writing', 'Editing'],
      icon: '📝'
    },
    {
      id: 'zotero',
      name: 'Zotero',
      description: 'Free reference manager for collecting and organizing research',
      category: 'writing',
      url: 'https://www.zotero.org/',
      popularity: 4,
      free: true,
      subjects: ['Research', 'Citations'],
      icon: '📚'
    }
  ];

  const filteredResources = educationalResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.key === category);
    return categoryData ? categoryData.icon : Globe;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(c => c.key === category);
    return categoryData ? categoryData.color : 'bg-gray-500';
  };

  const handleResourceClick = (resource: EducationalResource) => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`${resource.name} link will be available soon!`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <BookOpen className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Free Educational Resources</h3>
          <p className="text-sm text-gray-600">Free textbooks, YouTube channels, AI tools, and study resources</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => {
          const Icon = getCategoryIcon(resource.category);
          const categoryColor = getCategoryColor(resource.category);
          
          return (
            <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-3">
                <div className={`w-10 h-10 ${categoryColor} rounded-lg flex items-center justify-center`}>
                  <span className="text-lg">{resource.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                    {resource.free && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        FREE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(resource.popularity)}
                    <span className="text-xs text-gray-500 ml-1">({resource.popularity}/5)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.subjects.slice(0, 3).map((subject) => (
                      <span key={subject} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {subject}
                      </span>
                    ))}
                    {resource.subjects.length > 3 && (
                      <span className="text-xs text-gray-500">+{resource.subjects.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {resource.popularity >= 5 ? 'Extremely Popular' : 
                     resource.popularity >= 4 ? 'Very Popular' : 
                     resource.popularity >= 3 ? 'Popular' : 'Useful'}
                  </span>
                </div>
                <button
                  onClick={() => handleResourceClick(resource)}
                  className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <span>Visit</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why These Tools Matter */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Why These Tools Are Essential for Students</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Brain className="h-6 w-6 text-blue-600 mb-2" />
            <h5 className="font-medium text-blue-900 mb-1">AI Tools</h5>
            <p className="text-sm text-blue-700">Get instant help with research, writing, coding, and problem-solving. AI assistants can explain complex concepts and help with assignments.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <BookOpen className="h-6 w-6 text-green-600 mb-2" />
            <h5 className="font-medium text-green-900 mb-1">Free Textbooks</h5>
            <p className="text-sm text-green-700">Save hundreds of dollars on textbooks. Access high-quality academic materials without the financial burden.</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <Video className="h-6 w-6 text-red-600 mb-2" />
            <h5 className="font-medium text-red-900 mb-1">YouTube Learning</h5>
            <p className="text-sm text-red-700">Visual learning from expert educators. Perfect for understanding difficult concepts through video explanations.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Laptop className="h-6 w-6 text-purple-600 mb-2" />
            <h5 className="font-medium text-purple-900 mb-1">Study Tools</h5>
            <p className="text-sm text-purple-700">Organize your learning, manage time effectively, and improve retention with proven study techniques.</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {educationalResources.filter(r => r.free).length}
            </div>
            <div className="text-sm text-gray-600">Free Resources</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {educationalResources.filter(r => r.category === 'ai-tools').length}
            </div>
            <div className="text-sm text-gray-600">AI Tools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {educationalResources.filter(r => r.category === 'youtube').length}
            </div>
            <div className="text-sm text-gray-600">YouTube Channels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {educationalResources.filter(r => r.popularity === 5).length}
            </div>
            <div className="text-sm text-gray-600">Top Rated</div>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-900">Pro Tips for Students</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
          <ul className="space-y-1">
            <li>• Use ChatGPT/Claude to explain difficult concepts in simple terms</li>
            <li>• Check Library Genesis before buying expensive textbooks</li>
            <li>• Watch 3Blue1Brown for beautiful math visualizations</li>
          </ul>
          <ul className="space-y-1">
            <li>• Use Google Colab for free GPU access for ML projects</li>
            <li>• Combine Anki with YouTube videos for effective learning</li>
            <li>• Use Notion to organize all your study materials in one place</li>
          </ul>
        </div>
      </div>
    </div>
  );
};