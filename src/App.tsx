import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LoadingScreen } from './components/LoadingScreen';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceUnlockerPage } from './pages/ResourceUnlockerPage';
import { CommunityPage } from './pages/CommunityPage';
import { DashboardPage } from './pages/DashboardPage';
import { UniversitySelectionModal } from './components/UniversitySelectionModal';
import { UniversityProvider, useUniversity } from './contexts/UniversityContext';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const { selectedUniversity, universities, setSelectedUniversity, isLoading } = useUniversity();

  // Show university selection modal if no university is selected and not loading
  useEffect(() => {
    if (!isLoading && !selectedUniversity && !showLoadingScreen) {
      setShowUniversityModal(true);
    }
  }, [isLoading, selectedUniversity, showLoadingScreen]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // In a real app, this would handle actual authentication
  };

  const handleGetStarted = () => {
    if (!selectedUniversity) {
      setShowUniversityModal(true);
      return;
    }
    if (!isAuthenticated) {
      handleLogin();
    }
    // Navigate to map or dashboard
  };

  const handleUniversitySelect = (university: any) => {
    setSelectedUniversity(university);
    setShowUniversityModal(false);
  };

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  // Show loading screen first
  if (showLoadingScreen) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading First Year Starter...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation 
          isAuthenticated={isAuthenticated} 
          onLogin={handleLogin}
          selectedUniversity={selectedUniversity}
          onUniversityChange={() => setShowUniversityModal(true)}
        />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onGetStarted={handleGetStarted} />} 
          />
          <Route path="/map" element={<MapPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resource-unlocker" element={<ResourceUnlockerPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>

        {showUniversityModal && (
          <UniversitySelectionModal
            universities={universities}
            onUniversitySelect={handleUniversitySelect}
            onClose={() => setShowUniversityModal(false)}
          />
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <UniversityProvider>
      <AppContent />
    </UniversityProvider>
  );
}

export default App;