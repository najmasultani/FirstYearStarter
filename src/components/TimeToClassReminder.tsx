import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, Bell } from 'lucide-react';
import { ClassSchedule } from '../types';
import { useUniversity } from '../contexts/UniversityContext';

export const TimeToClassReminder: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextClass, setNextClass] = useState<ClassSchedule | null>(null);
  const [timeToLeave, setTimeToLeave] = useState<number | null>(null);

  // Mock class schedule
  const schedule: ClassSchedule[] = [
    {
      id: '1',
      courseName: 'MAT137 - Calculus',
      location: 'BA1130',
      coordinates: [43.6629, -79.3957], // Mock coordinates
      startTime: '14:00',
      endTime: '15:00',
      days: ['Monday', 'Wednesday', 'Friday']
    },
    {
      id: '2',
      courseName: 'PHY131 - Physics',
      location: 'MP203',
      coordinates: [43.6625, -79.3952],
      startTime: '16:00',
      endTime: '17:00',
      days: ['Tuesday', 'Thursday']
    },
    {
      id: '3',
      courseName: 'CSC108 - Programming',
      location: 'BA1170',
      coordinates: [43.6631, -79.3960],
      startTime: '10:00',
      endTime: '11:00',
      days: ['Monday', 'Wednesday', 'Friday']
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const findNextClass = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      const currentTimeStr = now.toTimeString().slice(0, 5);

      // Find today's remaining classes
      const todayClasses = schedule.filter(cls => 
        cls.days.includes(currentDay) && cls.startTime > currentTimeStr
      );

      if (todayClasses.length > 0) {
        // Sort by start time and get the next one
        todayClasses.sort((a, b) => a.startTime.localeCompare(b.startTime));
        setNextClass(todayClasses[0]);
      } else {
        // Find tomorrow's first class
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
        
        const tomorrowClasses = schedule.filter(cls => cls.days.includes(tomorrowDay));
        if (tomorrowClasses.length > 0) {
          tomorrowClasses.sort((a, b) => a.startTime.localeCompare(b.startTime));
          setNextClass(tomorrowClasses[0]);
        } else {
          setNextClass(null);
        }
      }
    };

    findNextClass();
  }, [currentTime]);

  useEffect(() => {
    if (nextClass) {
      const calculateTimeToLeave = () => {
        const now = new Date();
        const [hours, minutes] = nextClass.startTime.split(':').map(Number);
        const classTime = new Date(now);
        classTime.setHours(hours, minutes, 0, 0);

        // If class is tomorrow, add a day
        if (classTime <= now) {
          classTime.setDate(classTime.getDate() + 1);
        }

        // Assume 10 minutes walking time (this would be calculated based on actual location)
        const walkingTime = 10;
        const leaveTime = new Date(classTime.getTime() - walkingTime * 60000);
        
        const minutesToLeave = Math.floor((leaveTime.getTime() - now.getTime()) / 60000);
        setTimeToLeave(minutesToLeave);
      };

      calculateTimeToLeave();
    }
  }, [nextClass, currentTime]);

  const getTimeToLeaveMessage = () => {
    if (!timeToLeave || !nextClass) return null;

    if (timeToLeave <= 0) {
      return {
        message: "You should leave now!",
        color: "bg-red-100 text-red-800",
        urgent: true
      };
    } else if (timeToLeave <= 5) {
      return {
        message: `Leave in ${timeToLeave} minutes`,
        color: "bg-yellow-100 text-yellow-800",
        urgent: true
      };
    } else if (timeToLeave <= 15) {
      return {
        message: `Leave in ${timeToLeave} minutes`,
        color: "bg-blue-100 text-blue-800",
        urgent: false
      };
    }

    return null;
  };

  const timeMessage = getTimeToLeaveMessage();

  if (!nextClass) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Class Reminders</h3>
        </div>
        <div className="text-center py-8">
          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Classes Today</h4>
          <p className="text-gray-600">Enjoy your free time!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Next Class</h3>
      </div>

      <div className="space-y-4">
        {/* Next Class Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{nextClass.courseName}</h4>
            <span className="text-sm text-gray-600">{nextClass.startTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{nextClass.location}</span>
          </div>
        </div>

        {/* Time to Leave Alert */}
        {timeMessage && (
          <div className={`rounded-lg p-4 ${timeMessage.color} ${timeMessage.urgent ? 'animate-pulse' : ''}`}>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span className="font-medium">{timeMessage.message}</span>
            </div>
            <div className="mt-2 text-sm">
              Walking time to {nextClass.location}: ~10 minutes
            </div>
          </div>
        )}

        {/* Route Button */}
        <button
          onClick={() => {
            const [lat, lng] = nextClass.coordinates;
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
            window.open(url, '_blank');
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Navigation className="h-4 w-4" />
          <span>Get Walking Directions</span>
        </button>

        {/* Today's Schedule */}
        <div className="pt-4 border-t border-gray-200">
          <h5 className="font-medium text-gray-900 mb-3">Today's Schedule</h5>
          <div className="space-y-2">
            {schedule
              .filter(cls => cls.days.includes(new Date().toLocaleDateString('en-US', { weekday: 'long' })))
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((cls) => (
                <div key={cls.id} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{cls.courseName.split(' - ')[0]}</span>
                    <span className="text-gray-600 ml-2">{cls.location}</span>
                  </div>
                  <span className="text-gray-600">{cls.startTime} - {cls.endTime}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Walking speed: Average</span>
          <button className="text-blue-600 hover:text-blue-700">
            Adjust Settings
          </button>
        </div>
      </div>
    </div>
  );
};