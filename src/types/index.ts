// Add speech recognition types to global window
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  country: 'Canada' | 'United States';
  state?: string; // For US universities
  province?: string; // For Canadian universities
  city: string;
  coordinates: [number, number];
  timezone: string;
  website: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

export interface Location {
  id: string;
  name: string;
  description: string;
  category: LocationCategory;
  coordinates: [number, number];
  rating: number;
  votes: number;
  features: string[];
  image?: string;
  hours?: string;
  tips: Tip[];
  universityId: string; // Added for multi-university support
  busyTimes?: BusyTime[];
  studyBuddies?: StudyBuddy[];
}

export interface StudyBuddy {
  id: string;
  name: string;
  timeSlot: string;
  subject?: string;
  message: string;
  timestamp: Date;
  isOpen: boolean;
}

export interface BusyTime {
  hour: number;
  busyLevel: 'low' | 'medium' | 'high';
  day: string;
}

export interface Tip {
  id: string;
  content: string;
  author: string;
  votes: number;
  timestamp: Date;
  universityId: string; // Added for multi-university support
}

export interface User {
  id: string;
  email: string;
  name: string;
  savedLocations: string[];
  visitedLocations: string[];
  activityCount: number;
  selectedUniversityId?: string; // Added to store user's university preference
  schedule?: ClassSchedule[];
}

export interface ClassSchedule {
  id: string;
  courseName: string;
  location: string;
  coordinates: [number, number];
  startTime: string;
  endTime: string;
  days: string[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  category: ResourceCategory;
  description: string;
  upvotes: number;
  tags: string[];
  universityId: string; // Added for multi-university support
  isWeeklyRotation?: boolean;
  rotationWeek?: number;
}

export interface CourseReview {
  id: string;
  courseCode: string;
  courseName: string;
  professor: string;
  difficulty: number; // 1-5
  workload: number; // 1-5
  rating: number; // 1-5
  review: string;
  tips: string;
  semester: string;
  year: number;
  universityId: string;
  upvotes: number;
}

export interface QAPost {
  id: string;
  question: string;
  category: QACategory;
  tags: string[];
  answers: QAAnswer[];
  upvotes: number;
  isAnonymous: boolean;
  author?: string;
  timestamp: Date;
  universityId: string;
  aiSummary?: string;
}

export interface QAAnswer {
  id: string;
  content: string;
  author: string;
  upvotes: number;
  timestamp: Date;
  isVerified: boolean;
}

export interface CampusIssue {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates?: [number, number];
  category: IssueCategory;
  status: 'open' | 'in-progress' | 'resolved';
  upvotes: number;
  timestamp: Date;
  universityId: string;
  reportedBy: string;
}

export interface SettlingInTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  links: string[];
  tips: string[];
  universityId: string;
}

export interface VoiceMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  audioUrl?: string; // For ElevenLabs integration
}

export type LocationCategory = 
  | 'study'
  | 'food'
  | 'social'
  | 'admin'
  | 'recreation'
  | 'services'
  | 'hidden-gems';

export type ResourceCategory =
  | 'academic'
  | 'internships'
  | 'clubs'
  | 'financial'
  | 'mental-health'
  | 'social';

export type QACategory =
  | 'courses'
  | 'residence'
  | 'clubs'
  | 'work-study'
  | 'co-op'
  | 'general';

export type IssueCategory =
  | 'facilities'
  | 'technology'
  | 'cleanliness'
  | 'safety'
  | 'accessibility';

export interface DailyTip {
  id: string;
  content: string;
  category: string;
  relevantLocations: string[];
  timestamp: Date;
  universityId: string; // Added for multi-university support
}

export interface StudyPreferences {
  noise: 'quiet' | 'moderate' | 'lively';
  lighting: 'natural' | 'warm' | 'bright';
  space: 'private' | 'shared' | 'group';
  amenities: string[];
}