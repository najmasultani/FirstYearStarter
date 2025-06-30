import React, { useState } from 'react';
import { Users, Clock, BookOpen, MessageCircle, Plus, MapPin } from 'lucide-react';
import { StudyBuddy, Location } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

interface StudyBuddyMapProps {
  locations: Location[];
}

export const StudyBuddyMap: React.FC<StudyBuddyMapProps> = ({ locations }) => {
  const { selectedUniversity } = useUniversity();
  const [showAddBuddy, setShowAddBuddy] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [buddyForm, setBuddyForm] = useState({
    timeSlot: '',
    subject: '',
    message: ''
  });

  // Mock study buddies data
  const studyBuddies: StudyBuddy[] = [
    {
      id: '1',
      name: 'Sarah M.',
      timeSlot: 'Today 3-5 PM',
      subject: 'Calculus',
      message: 'Working on problem sets, open to group study!',
      timestamp: new Date(),
      isOpen: true
    },
    {
      id: '2',
      name: 'Alex K.',
      timeSlot: 'Tomorrow 1-3 PM',
      subject: 'Physics',
      message: 'Lab prep session, need study partners',
      timestamp: new Date(),
      isOpen: true
    }
  ];

  const handleAddBuddy = () => {
    if (!selectedLocation || !buddyForm.timeSlot || !buddyForm.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Adding study buddy:', {
      location: selectedLocation,
      ...buddyForm,
      universityId: selectedUniversity?.id
    });
    
    alert('Study buddy session posted! Other students will be notified.');
    setShowAddBuddy(false);
    setBuddyForm({ timeSlot: '', subject: '', message: '' });
    setSelectedLocation('');
  };

  const getBusyLevel = (location: Location) => {
    const currentHour = new Date().getHours();
    const busyTime = location.busyTimes?.find(bt => bt.hour === currentHour);
    return busyTime?.busyLevel || 'low';
  };

  const getBusyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getBusyText = (level: string) => {
    switch (level) {
      case 'high': return 'Very Busy';
      case 'medium': return 'Moderately Busy';
      default: return 'Quiet';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Study Buddy Map</h3>
        </div>
        <button
          onClick={() => setShowAddBuddy(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Join Study Session</span>
        </button>
      </div>

      {/* Current Study Sessions */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900">Active Study Sessions</h4>
        {studyBuddies.map((buddy) => (
          <div key={buddy.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {buddy.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{buddy.name}</div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{buddy.timeSlot}</span>
                    {buddy.subject && (
                      <>
                        <span>•</span>
                        <BookOpen className="h-3 w-3" />
                        <span>{buddy.subject}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Open
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-3">{buddy.message}</p>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                <MessageCircle className="h-3 w-3" />
                <span>Join Session</span>
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <MapPin className="h-3 w-3 inline mr-1" />
                {selectedUniversity?.shortName} Main Library
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Location Busy Times */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Study Spot Availability</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {locations.filter(loc => loc.category === 'study').slice(0, 4).map((location) => {
            const busyLevel = getBusyLevel(location);
            return (
              <div key={location.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 text-sm">{location.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getBusyColor(busyLevel)}`}>
                    {getBusyText(busyLevel)}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  AI suggests: {busyLevel === 'low' ? 'Great time to study!' : 
                               busyLevel === 'medium' ? 'Moderate activity' : 
                               'Try again in 1-2 hours'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Study Buddy Modal */}
      {showAddBuddy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Study Session</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a location</option>
                  {locations.filter(loc => loc.category === 'study').map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Slot *
                </label>
                <input
                  type="text"
                  value={buddyForm.timeSlot}
                  onChange={(e) => setBuddyForm(prev => ({ ...prev, timeSlot: e.target.value }))}
                  placeholder="e.g., Today 3-5 PM, Tomorrow 1-3 PM"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  value={buddyForm.subject}
                  onChange={(e) => setBuddyForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g., Calculus, Physics, General Study"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={buddyForm.message}
                  onChange={(e) => setBuddyForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="What are you working on? Open to collaboration?"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddBuddy(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBuddy}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};