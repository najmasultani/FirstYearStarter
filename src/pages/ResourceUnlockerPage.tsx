import React, { useState } from 'react';
import { Unlock, BookOpen, Users, TrendingUp, Star, Zap, DollarSign } from 'lucide-react';
import { ResourceUnlocker } from '../components/ResourceUnlocker';
import { useUniversity } from '../contexts/UniversityContext';

export const ResourceUnlockerPage: React.FC = () => {
  const { selectedUniversity } = useUniversity();

  if (!selectedUniversity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your University</h2>
          <p className="text-gray-600">
            Choose your campus to unlock exclusive student resources, free software, and amazing discounts.
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
          <div className="flex items-center space-x-3 mb-4">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedUniversity.colors.primary }}
            ></div>
            <h1 className="text-3xl font-bold text-gray-900">Free & Discounted Resources</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Unlock exclusive {selectedUniversity.name} student resources, free professional software, and amazing discounts
          </p>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Unlock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">25+</div>
              <div className="text-sm text-gray-600">Free Software Tools</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-600">Student Discounts</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">$1000+</div>
              <div className="text-sm text-gray-600">Value Unlocked</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">5K+</div>
              <div className="text-sm text-gray-600">Students Helped</div>
            </div>
          </div>
        </div>

        {/* Main Resource Unlocker Component */}
        <ResourceUnlocker />

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900">How It Works</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                <div>
                  <div className="font-medium text-gray-900">Verify Your Student Status</div>
                  <div className="text-sm text-gray-600">Use your {selectedUniversity.shortName} email or student ID to access exclusive resources</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">2</div>
                <div>
                  <div className="font-medium text-gray-900">Browse & Discover</div>
                  <div className="text-sm text-gray-600">Explore free software, learning platforms, and exclusive student discounts</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">3</div>
                <div>
                  <div className="font-medium text-gray-900">Start Saving</div>
                  <div className="text-sm text-gray-600">Access thousands of dollars worth of software and discounts completely free</div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular This Week */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900">Popular This Week</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Adobe Creative Cloud</div>
                  <div className="text-sm text-gray-600">Complete creative suite</div>
                </div>
                <div className="text-sm font-medium text-green-600">FREE</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">MATLAB Campus License</div>
                  <div className="text-sm text-gray-600">Mathematical computation</div>
                </div>
                <div className="text-sm font-medium text-green-600">FREE</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Microsoft 365</div>
                  <div className="text-sm text-gray-600">Office suite + 5TB storage</div>
                </div>
                <div className="text-sm font-medium text-green-600">FREE</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Student Transit Pass</div>
                  <div className="text-sm text-gray-600">Monthly savings</div>
                </div>
                <div className="text-sm font-medium text-blue-600">$28 OFF</div>
              </div>
            </div>
          </div>
        </div>

        {/* University-specific note */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center space-x-3 mb-4">
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: selectedUniversity.colors.primary }}
            ></div>
            <h3 className="text-lg font-semibold text-gray-900">{selectedUniversity.shortName} Exclusive Access</h3>
          </div>
          <p className="text-gray-700 mb-4">
            As a {selectedUniversity.name} student, you have access to exclusive software licenses, learning platforms, 
            and local discounts that can save you thousands of dollars throughout your academic journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Professional software worth $2000+</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Local business discounts</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Learning platform access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};