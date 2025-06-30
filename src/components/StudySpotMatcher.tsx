import React, { useState } from 'react';
import { Brain, Check, ArrowRight } from 'lucide-react';
import { StudyPreferences, Location } from '../types';

interface StudySpotMatcherProps {
  locations: Location[];
  onMatchResults: (matches: Location[]) => void;
}

export const StudySpotMatcher: React.FC<StudySpotMatcherProps> = ({ locations, onMatchResults }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<StudyPreferences>>({});
  const [isMatching, setIsMatching] = useState(false);

  const questions = [
    {
      id: 'noise',
      title: 'How much noise can you handle?',
      options: [
        { value: 'quiet', label: 'Silent (Library quiet)', icon: '🤫' },
        { value: 'moderate', label: 'Some chatter is fine', icon: '💬' },
        { value: 'lively', label: 'Bustling atmosphere', icon: '🎉' }
      ]
    },
    {
      id: 'lighting',
      title: 'What lighting do you prefer?',
      options: [
        { value: 'natural', label: 'Natural sunlight', icon: '☀️' },
        { value: 'warm', label: 'Warm cozy lighting', icon: '💡' },
        { value: 'bright', label: 'Bright fluorescent', icon: '🔆' }
      ]
    },
    {
      id: 'space',
      title: 'How do you like to study?',
      options: [
        { value: 'private', label: 'Solo and focused', icon: '🧘' },
        { value: 'shared', label: 'Around others quietly', icon: '👥' },
        { value: 'group', label: 'Collaborative study', icon: '🤝' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setPreferences(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      findMatches({ ...preferences, [questionId]: value });
    }
  };

  const findMatches = async (finalPreferences: Partial<StudyPreferences>) => {
    setIsMatching(true);
    
    // Simulate AI matching logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const studyLocations = locations.filter(loc => loc.category === 'study');
    const matches = studyLocations
      .map(location => {
        let score = 0;
        
        // Simple scoring based on preferences
        if (finalPreferences.noise === 'quiet' && location.features.includes('Quiet Study')) score += 3;
        if (finalPreferences.noise === 'moderate' && location.features.includes('Group Rooms')) score += 2;
        if (finalPreferences.space === 'group' && location.features.includes('Group Study')) score += 3;
        if (finalPreferences.lighting === 'natural' && location.features.includes('Natural Light')) score += 2;
        
        return { location, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.location);
    
    setIsMatching(false);
    onMatchResults(matches);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setPreferences({});
    setIsMatching(false);
  };

  if (isMatching) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding Your Perfect Study Spots</h3>
        <p className="text-gray-600 mb-4">Our AI is analyzing campus locations based on your preferences...</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Smart Study Matcher</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Question {currentStep + 1} of {questions.length}</span>
          <button onClick={resetQuiz} className="text-sm text-blue-600 hover:text-blue-700">
            Start Over
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">{currentQuestion.title}</h4>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="flex-1 font-medium text-gray-900">{option.label}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Answer a few quick questions and we'll recommend the perfect study spots based on your preferences!
        </p>
      </div>
    </div>
  );
};