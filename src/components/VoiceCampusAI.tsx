import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Loader2 } from 'lucide-react';
import { useUniversity } from '../contexts/UniversityContext';
import { getUniversityData } from '../data/mockData';

export const VoiceCampusAI: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [conversation, setConversation] = useState<Array<{id: string, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Get university-specific data
  const universityData = selectedUniversity ? getUniversityData(selectedUniversity.id) : { locations: [] };
  const universityLocations = universityData.locations;

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleVoiceQuery(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVoiceQuery = async (query: string) => {
    setIsProcessing(true);
    
    // Add user message to conversation
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: query,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, userMessage]);

    // Simulate AI processing with campus-specific responses
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiResponse = generateCampusResponse(query);
    setResponse(aiResponse);

    // Add AI response to conversation
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai' as const,
      content: aiResponse,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, aiMessage]);

    if (isVoiceEnabled && synthRef.current) {
      speakResponse(aiResponse);
    }
    
    setIsProcessing(false);
  };

  const generateCampusResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (!selectedUniversity) {
      return "Please select your university first so I can provide campus-specific information.";
    }

    // Study location queries
    if (lowerQuery.includes('study') || lowerQuery.includes('library')) {
      const studySpots = universityLocations.filter(loc => loc.category === 'study');
      if (studySpots.length > 0) {
        const topSpot = studySpots[0];
        return `For studying at ${selectedUniversity.shortName}, I recommend ${topSpot.name}. It has ${topSpot.features.join(', ')} and is rated ${topSpot.rating.toFixed(1)} stars. ${topSpot.hours ? `It's open ${topSpot.hours}.` : ''} Would you like directions or more study spot options?`;
      }
    }

    // Food queries
    if (lowerQuery.includes('food') || lowerQuery.includes('eat') || lowerQuery.includes('dining')) {
      const foodSpots = universityLocations.filter(loc => loc.category === 'food');
      if (foodSpots.length > 0) {
        const topFood = foodSpots[0];
        return `For food at ${selectedUniversity.shortName}, check out ${topFood.name}. ${topFood.description} It's rated ${topFood.rating.toFixed(1)} stars by students. ${topFood.hours ? `Open ${topFood.hours}.` : ''}`;
      }
    }

    // Location-specific queries
    if (lowerQuery.includes('near') || lowerQuery.includes('close to')) {
      return `I can help you find places near specific buildings at ${selectedUniversity.shortName}. The campus has ${universityLocations.length} mapped locations including study spots, dining, and services. What specific building or area are you looking for?`;
    }

    // General campus queries
    if (lowerQuery.includes('campus') || lowerQuery.includes('university')) {
      return `${selectedUniversity.name} has ${universityLocations.length} locations mapped in First Year Starter. You can find study spots, dining options, recreation facilities, and hidden gems. What would you like to explore?`;
    }

    // Class and academic queries
    if (lowerQuery.includes('class') || lowerQuery.includes('course') || lowerQuery.includes('academic')) {
      return `For academic support at ${selectedUniversity.shortName}, you can access tutoring services, course reviews, and study groups. The main library and academic buildings have quiet study areas and group rooms. Need help with a specific course?`;
    }

    // Events and social queries
    if (lowerQuery.includes('event') || lowerQuery.includes('social') || lowerQuery.includes('club')) {
      return `${selectedUniversity.shortName} has many student organizations and events. Check the student center for social spaces and event listings. I can help you find clubs related to your interests or upcoming campus events.`;
    }

    // Default response
    return `I'm your ${selectedUniversity.shortName} campus AI assistant! I can help you find study spots, dining options, navigate campus, get academic support, and discover events. Try asking me "Where can I study?" or "What's good to eat on campus?" What would you like to know?`;
  };

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const playDailyTip = () => {
    const dailyTips = [
      `Good morning! Here's your daily ${selectedUniversity?.shortName} tip: The library's upper floors are usually quieter in the morning hours, perfect for focused study sessions.`,
      `Daily campus tip: Don't forget to check your student email for important updates about ${selectedUniversity?.shortName} events and deadlines.`,
      `Today's tip: The student center food court is less crowded between 2-4 PM, great for a peaceful lunch break.`,
      `Campus wisdom: Join study groups early in the semester - they're one of the best ways to succeed academically and make friends at ${selectedUniversity?.shortName}.`
    ];
    
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    
    const tipMessage = {
      id: Date.now().toString(),
      type: 'ai' as const,
      content: randomTip,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, tipMessage]);
    
    if (isVoiceEnabled) {
      speakResponse(randomTip);
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setTranscript('');
    setResponse('');
  };

  if (!selectedUniversity) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Campus AI</h3>
          <p className="text-gray-600">Select your university to start using voice assistance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Mic className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Voice Campus AI</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              isVoiceEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}
            title={isVoiceEnabled ? 'Voice responses enabled' : 'Voice responses disabled'}
          >
            {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          {conversation.length > 0 && (
            <button
              onClick={clearConversation}
              className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Voice Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isProcessing ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isListening ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </button>

        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <VolumeX className="h-4 w-4" />
            <span>Stop</span>
          </button>
        )}

        <button
          onClick={playDailyTip}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Daily Tip</span>
        </button>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        {isListening && (
          <div className="text-blue-600 font-medium">
            🎤 Listening... Ask me about {selectedUniversity.shortName}
          </div>
        )}
        {isProcessing && (
          <div className="text-orange-600 font-medium">
            🤔 Processing your question...
          </div>
        )}
        {isSpeaking && (
          <div className="text-green-600 font-medium">
            🗣️ Speaking response...
          </div>
        )}
        {!isListening && !isProcessing && !isSpeaking && (
          <div className="text-gray-600">
            Tap the microphone to ask about {selectedUniversity.shortName} campus
          </div>
        )}
      </div>

      {/* Conversation History */}
      {conversation.length > 0 && (
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {conversation.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Suggestions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Try asking:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "Where can I study near the library?",
            "What's good to eat on campus?",
            "How do I get to the student center?",
            "Tell me about campus events"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleVoiceQuery(suggestion)}
              className="text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </div>

      {/* ElevenLabs Integration Note */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-purple-900">Powered by Voice AI</span>
        </div>
        <p className="text-xs text-purple-700">
          Currently using browser speech APIs. Ready for ElevenLabs integration for enhanced voice quality and natural responses.
        </p>
      </div>
    </div>
  );
};