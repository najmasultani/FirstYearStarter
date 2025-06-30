import React, { useState } from 'react';
import { MessageCircle, Plus, ThumbsUp, Tag, Brain, Search } from 'lucide-react';
import { QAPost, QAAnswer, QACategory } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

export const AskUpperYears: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [showAskModal, setShowAskModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QACategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [askForm, setAskForm] = useState({
    question: '',
    category: 'general' as QACategory,
    tags: [] as string[],
    isAnonymous: true
  });

  // Mock Q&A data
  const [posts, setPosts] = useState<QAPost[]>([
    {
      id: '1',
      question: 'What\'s the best way to prepare for ECE212 labs?',
      category: 'courses',
      tags: ['ECE212', 'labs', 'engineering'],
      answers: [
        {
          id: '1a',
          content: 'Read the lab manual thoroughly before each session. The TAs expect you to come prepared with basic understanding.',
          author: 'Alex (3rd year ECE)',
          upvotes: 15,
          timestamp: new Date('2024-01-14'),
          isVerified: true
        },
        {
          id: '1b',
          content: 'Form a study group! We used to review the theory together before labs and it helped a lot.',
          author: 'Sarah (4th year ECE)',
          upvotes: 12,
          timestamp: new Date('2024-01-14'),
          isVerified: false
        }
      ],
      upvotes: 23,
      isAnonymous: false,
      author: 'Mike R.',
      timestamp: new Date('2024-01-13'),
      universityId: selectedUniversity?.id || '',
      aiSummary: 'Best tip: Come prepared by reading lab manuals and form study groups for theory review.'
    },
    {
      id: '2',
      question: 'How do I make friends in residence?',
      category: 'residence',
      tags: ['residence', 'social', 'friends'],
      answers: [
        {
          id: '2a',
          content: 'Keep your door open when you\'re in your room! People will stop by and chat. Also attend floor events.',
          author: 'Emma (2nd year)',
          upvotes: 18,
          timestamp: new Date('2024-01-12'),
          isVerified: true
        }
      ],
      upvotes: 31,
      isAnonymous: true,
      timestamp: new Date('2024-01-11'),
      universityId: selectedUniversity?.id || '',
      aiSummary: 'Key advice: Keep your door open and participate in floor activities to meet people naturally.'
    }
  ]);

  const categories: { key: QACategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All Questions', icon: '💬' },
    { key: 'courses', label: 'Courses', icon: '📚' },
    { key: 'residence', label: 'Residence Life', icon: '🏠' },
    { key: 'clubs', label: 'Clubs & Activities', icon: '🎭' },
    { key: 'work-study', label: 'Work Study', icon: '💼' },
    { key: 'co-op', label: 'Co-op', icon: '🔄' },
    { key: 'general', label: 'General', icon: '❓' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUpvotePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, upvotes: post.upvotes + 1 }
        : post
    ));
  };

  const handleUpvoteAnswer = (postId: string, answerId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            answers: post.answers.map(answer =>
              answer.id === answerId
                ? { ...answer, upvotes: answer.upvotes + 1 }
                : answer
            )
          }
        : post
    ));
  };

  const handleSubmitQuestion = () => {
    if (!askForm.question.trim()) {
      alert('Please enter your question');
      return;
    }

    const newPost: QAPost = {
      id: Date.now().toString(),
      question: askForm.question,
      category: askForm.category,
      tags: askForm.tags,
      answers: [],
      upvotes: 0,
      isAnonymous: askForm.isAnonymous,
      author: askForm.isAnonymous ? undefined : 'You',
      timestamp: new Date(),
      universityId: selectedUniversity?.id || ''
    };

    setPosts(prev => [newPost, ...prev]);
    setShowAskModal(false);
    setAskForm({
      question: '',
      category: 'general',
      tags: [],
      isAnonymous: true
    });

    alert('Question posted! Upper year students will be notified.');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Ask Upper Years</h3>
        </div>
        <button
          onClick={() => setShowAskModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border border-gray-200 rounded-lg p-4">
            {/* Question */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{post.question}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Asked by {post.isAnonymous ? 'Anonymous' : post.author}</span>
                    <span>•</span>
                    <span>{post.timestamp.toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleUpvotePost(post.id)}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-50 hover:bg-gray-100 rounded text-sm"
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span>{post.upvotes}</span>
                </button>
              </div>

              {/* Tags */}
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="h-3 w-3 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Summary */}
              {post.aiSummary && (
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">AI Summary</span>
                  </div>
                  <p className="text-sm text-blue-800">{post.aiSummary}</p>
                </div>
              )}
            </div>

            {/* Answers */}
            <div className="space-y-3">
              {post.answers.map((answer) => (
                <div key={answer.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{answer.author}</span>
                      {answer.isVerified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleUpvoteAnswer(post.id, answer.id)}
                      className="flex items-center space-x-1 px-2 py-1 bg-white hover:bg-gray-100 rounded text-sm"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{answer.upvotes}</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{answer.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ask Upper Years</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question *
                </label>
                <textarea
                  value={askForm.question}
                  onChange={(e) => setAskForm(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="What would you like to know?"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={askForm.category}
                  onChange={(e) => setAskForm(prev => ({ ...prev, category: e.target.value as QACategory }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.filter(c => c.key !== 'all').map(category => (
                    <option key={category.key} value={category.key}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={askForm.isAnonymous}
                  onChange={(e) => setAskForm(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Ask anonymously
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAskModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuestion}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Ask Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};