import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { University } from '../types';
import { mockUniversities } from '../data/mockData';

interface UniversityContextType {
  selectedUniversity: University | null;
  universities: University[];
  setSelectedUniversity: (university: University | null) => void;
  isLoading: boolean;
}

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export const useUniversity = () => {
  const context = useContext(UniversityContext);
  if (context === undefined) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
};

interface UniversityProviderProps {
  children: ReactNode;
}

export const UniversityProvider: React.FC<UniversityProviderProps> = ({ children }) => {
  const [selectedUniversity, setSelectedUniversityState] = useState<University | null>(null);
  const [universities] = useState<University[]>(mockUniversities);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved university from localStorage on mount
  useEffect(() => {
    const savedUniversityId = localStorage.getItem('selectedUniversityId');
    if (savedUniversityId) {
      const university = universities.find(u => u.id === savedUniversityId);
      if (university) {
        setSelectedUniversityState(university);
      }
    }
    setIsLoading(false);
  }, [universities]);

  const setSelectedUniversity = (university: University | null) => {
    setSelectedUniversityState(university);
    if (university) {
      localStorage.setItem('selectedUniversityId', university.id);
    } else {
      localStorage.removeItem('selectedUniversityId');
    }
  };

  const value = {
    selectedUniversity,
    universities,
    setSelectedUniversity,
    isLoading
  };

  return (
    <UniversityContext.Provider value={value}>
      {children}
    </UniversityContext.Provider>
  );
};