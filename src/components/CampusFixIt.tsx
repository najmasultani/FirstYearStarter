import React, { useState } from 'react';
import { AlertTriangle, Plus, ThumbsUp, MapPin, Clock, CheckCircle } from 'lucide-react';
import { CampusIssue, IssueCategory } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

export const CampusFixIt: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'facilities' as IssueCategory
  });

  // Mock campus issues
  const [issues, setIssues] = useState<CampusIssue[]>([
    {
      id: '1',
      title: 'Broken Microwave in Engineering Lounge',
      description: 'The microwave on the 3rd floor has been out of order for a week',
      location: 'Engineering Building, 3rd Floor Lounge',
      category: 'facilities',
      status: 'open',
      upvotes: 12,
      timestamp: new Date('2024-01-15'),
      universityId: selectedUniversity?.id || '',
      reportedBy: 'Anonymous'
    },
    {
      id: '2',
      title: 'Missing Power Outlets in Library Study Area',
      description: 'Several outlets are not working in the quiet study section',
      location: 'Main Library, 2nd Floor',
      category: 'facilities',
      status: 'in-progress',
      upvotes: 8,
      timestamp: new Date('2024-01-12'),
      universityId: selectedUniversity?.id || '',
      reportedBy: 'Sarah K.'
    },
    {
      id: '3',
      title: 'Dirty Tables in Student Center',
      description: 'Food court tables need more frequent cleaning',
      location: 'Student Center, Food Court',
      category: 'cleanliness',
      status: 'resolved',
      upvotes: 15,
      timestamp: new Date('2024-01-10'),
      universityId: selectedUniversity?.id || '',
      reportedBy: 'Mike R.'
    }
  ]);

  const categories: { key: IssueCategory; label: string; icon: string }[] = [
    { key: 'facilities', label: 'Facilities', icon: '🔧' },
    { key: 'technology', label: 'Technology', icon: '💻' },
    { key: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
    { key: 'safety', label: 'Safety', icon: '🚨' },
    { key: 'accessibility', label: 'Accessibility', icon: '♿' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleUpvote = (issueId: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, upvotes: issue.upvotes + 1 }
        : issue
    ));
  };

  const handleSubmitReport = () => {
    if (!reportForm.title.trim() || !reportForm.description.trim() || !reportForm.location.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newIssue: CampusIssue = {
      id: Date.now().toString(),
      title: reportForm.title,
      description: reportForm.description,
      location: reportForm.location,
      category: reportForm.category,
      status: 'open',
      upvotes: 0,
      timestamp: new Date(),
      universityId: selectedUniversity?.id || '',
      reportedBy: 'You'
    };

    setIssues(prev => [newIssue, ...prev]);
    setShowReportModal(false);
    setReportForm({
      title: '',
      description: '',
      location: '',
      category: 'facilities'
    });

    alert('Issue reported! The facilities team has been notified.');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-semibold text-gray-900">Campus Fix It</h3>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Report Issue</span>
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Help improve {selectedUniversity?.shortName} by reporting issues around campus. 
          Your reports help prioritize maintenance and improvements.
        </p>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {issues.map((issue) => {
          const category = categories.find(c => c.key === issue.category);
          return (
            <div key={issue.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{category?.icon}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(issue.status)}`}>
                      {getStatusIcon(issue.status)}
                      <span className="capitalize">{issue.status.replace('-', ' ')}</span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {issue.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{issue.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>{issue.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Reported by {issue.reportedBy}</span>
                </div>
                <button
                  onClick={() => handleUpvote(issue.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{issue.upvotes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Campus Issue</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Title *
                </label>
                <input
                  type="text"
                  value={reportForm.title}
                  onChange={(e) => setReportForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm(prev => ({ ...prev, category: e.target.value as IssueCategory }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.key} value={category.key}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={reportForm.location}
                  onChange={(e) => setReportForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Building name, floor, room number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the issue"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{issues.filter(i => i.status === 'resolved').length}</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{issues.filter(i => i.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{issues.filter(i => i.status === 'open').length}</div>
          <div className="text-sm text-gray-600">Open</div>
        </div>
      </div>
    </div>
  );
};