import React, { useState } from 'react';
import { BookOpen, Star, TrendingUp, Search, Filter, Brain, Plus } from 'lucide-react';
import { CourseReview } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

export const MiniCoursepedia: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'difficulty' | 'rating'>('all');
  const [showAddReview, setShowAddReview] = useState(false);

  // Mock course reviews
  const courseReviews: CourseReview[] = [
    {
      id: '1',
      courseCode: 'MAT137',
      courseName: 'Calculus with Proofs',
      professor: 'Dr. Smith',
      difficulty: 4,
      workload: 4,
      rating: 4,
      review: 'Challenging but rewarding. The proof-based approach really helps understand calculus deeply.',
      tips: 'Attend tutorials religiously. Practice proofs daily, not just before exams.',
      semester: 'Fall',
      year: 2023,
      universityId: selectedUniversity?.id || '',
      upvotes: 23
    },
    {
      id: '2',
      courseCode: 'CSC108',
      courseName: 'Introduction to Programming',
      professor: 'Prof. Johnson',
      difficulty: 2,
      workload: 3,
      rating: 5,
      review: 'Perfect introduction to programming. Well-structured assignments and helpful TAs.',
      tips: 'Start assignments early. Use office hours - TAs are super helpful.',
      semester: 'Fall',
      year: 2023,
      universityId: selectedUniversity?.id || '',
      upvotes: 31
    },
    {
      id: '3',
      courseCode: 'ECE212',
      courseName: 'Circuit Analysis',
      professor: 'Dr. Wilson',
      difficulty: 5,
      workload: 5,
      rating: 3,
      review: 'Very difficult course. Labs are time-consuming but essential for understanding.',
      tips: 'Form study groups for problem sets. Review basic circuit theory before starting.',
      semester: 'Winter',
      year: 2023,
      universityId: selectedUniversity?.id || '',
      upvotes: 18
    }
  ];

  const filteredReviews = courseReviews.filter(review => {
    const matchesSearch = review.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.professor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (selectedFilter) {
      case 'difficulty':
        return b.difficulty - a.difficulty;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.upvotes - a.upvotes;
    }
  });

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 4) return 'bg-red-100 text-red-800';
    if (difficulty >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty >= 4) return 'Hard';
    if (difficulty >= 3) return 'Medium';
    return 'Easy';
  };

  const getAISummary = (review: CourseReview) => {
    // Mock AI summary based on review data
    const difficultyText = getDifficultyText(review.difficulty);
    const workloadText = review.workload >= 4 ? 'Heavy' : review.workload >= 3 ? 'Moderate' : 'Light';
    
    return `${difficultyText} difficulty, ${workloadText} workload. Best strategy: ${review.tips.split('.')[0]}.`;
  };

  const handleAddReview = () => {
    setShowAddReview(true);
    // In a real app, this would open a form modal
    alert('Course review form coming soon! You\'ll be able to share your course experience to help other students.');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900">Course Reviews</h3>
        </div>
        <button
          onClick={handleAddReview}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, professors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'Most Helpful' },
              { key: 'difficulty', label: 'Difficulty' },
              { key: 'rating', label: 'Rating' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Reviews */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4">
            {/* Course Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">
                    {review.courseCode} - {review.courseName}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(review.difficulty)}`}>
                    {getDifficultyText(review.difficulty)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Prof. {review.professor} • {review.semester} {review.year}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{review.rating}/5</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>{review.upvotes}</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900">Difficulty</div>
                <div className="text-gray-600">{review.difficulty}/5</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Workload</div>
                <div className="text-gray-600">{review.workload}/5</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Overall</div>
                <div className="text-gray-600">{review.rating}/5</div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-blue-50 rounded-lg p-3 mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">AI Summary</span>
              </div>
              <p className="text-sm text-blue-800">{getAISummary(review)}</p>
            </div>

            {/* Review Content */}
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">Review: </span>
                <span className="text-sm text-gray-600">{review.review}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Study Tips: </span>
                <span className="text-sm text-gray-600">{review.tips}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review CTA */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
        <div className="text-center">
          <h4 className="font-medium text-gray-900 mb-2">Help Future Students</h4>
          <p className="text-sm text-gray-600 mb-3">
            Share your course experience and study tips with {selectedUniversity?.shortName} students
          </p>
          <button 
            onClick={handleAddReview}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Course Review
          </button>
        </div>
      </div>
    </div>
  );
};