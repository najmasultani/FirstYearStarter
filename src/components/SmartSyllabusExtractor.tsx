import React, { useState, useRef } from 'react';
import { Upload, FileText, Brain, BookOpen, MapPin, Clock, User, ExternalLink, Download, Search, Star, DollarSign, AlertCircle, CheckCircle, Zap, Target, TrendingUp, Award, Users } from 'lucide-react';
import { useUniversity } from '../contexts/UniversityContext';
import { extractTextFromPDF, parseSyllabusText, ParsedSyllabusData } from '../utils/pdfParser';

export const SmartSyllabusExtractor: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ParsedSyllabusData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'textbooks' | 'schedule' | 'insights' | 'resources'>('overview');
  const [error, setError] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Extract text
      setProcessingStep('Extracting text from PDF...');
      await new Promise(resolve => setTimeout(resolve, 500)); // Visual delay
      
      const extractedTextData = await extractTextFromPDF(file);
      
      if (!extractedTextData.fullText || extractedTextData.fullText.trim().length < 100) {
        throw new Error('Could not extract sufficient text from PDF. Please ensure the PDF contains readable text and is not password protected.');
      }

      // Step 2: Parse with basic parsing
      setProcessingStep('Analyzing course information...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const parsedData = parseSyllabusText(extractedTextData.fullText, selectedUniversity?.id || '');
      
      // Step 3: Complete
      setProcessingStep('Finalizing extraction...');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setExtractedData(parsedData);
    } catch (err) {
      console.error('Error processing PDF:', err);
      setError(err instanceof Error ? err.message : 'Failed to process PDF. Please try again with a different file.');
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        const event = { target: { files: [file] } } as any;
        handleFileUpload(event);
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const getDifficultyColor = (level: number) => {
    if (level >= 4) return 'text-red-600 bg-red-100 border-red-200';
    if (level >= 3) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-green-600 bg-green-100 border-green-200';
  };

  const getDifficultyText = (level: number) => {
    if (level >= 4) return 'High';
    if (level >= 3) return 'Medium';
    return 'Low';
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: FileText, description: 'Course summary & details' },
    { key: 'textbooks', label: 'Textbooks', icon: BookOpen, description: 'Required books & alternatives' },
    { key: 'schedule', label: 'Schedule', icon: Clock, description: 'Class times & calendar' },
    { key: 'insights', label: 'Study Tips', icon: Brain, description: 'Study tips & strategies' },
    { key: 'resources', label: 'Resources', icon: Target, description: 'Related clubs & materials' }
  ];

  const resetExtractor = () => {
    setExtractedData(null);
    setUploadedFile(null);
    setError(null);
    setIsProcessing(false);
    setIsUploading(false);
    setProcessingStep('');
    setActiveTab('overview');
  };

  if (!selectedUniversity) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Syllabus Extractor</h3>
          <p className="text-gray-600">Select your university to start extracting syllabus data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Brain className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Syllabus Extractor</h3>
          <p className="text-sm text-gray-600">Extract course information from PDF syllabi</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800 font-medium">Error</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
          <button
            onClick={resetExtractor}
            className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {!extractedData ? (
        <div>
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isUploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {isProcessing ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Syllabus</h4>
                  <p className="text-gray-600 mb-4">
                    {uploadedFile ? `Analyzing "${uploadedFile.name}"...` : 'Extracting course information...'}
                  </p>
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500" 
                         style={{ width: isProcessing ? '75%' : '0%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500">{processingStep}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Course Syllabus</h4>
                  <p className="text-gray-600 mb-4">
                    Drop your PDF here or click to browse. We'll extract course info, textbooks, professor details, and study tips.
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    Choose PDF File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB • Supports all PDF formats</p>
                </div>
              </div>
            )}
          </div>

          {/* Features Preview */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">What We Extract</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <FileText className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium text-blue-900">Course Details</div>
                  <div className="text-sm text-blue-700">Professor info, schedule, grading breakdown, prerequisites</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <BookOpen className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <div className="font-medium text-green-900">Textbook Finder</div>
                  <div className="text-sm text-green-700">Required books, alternatives, library availability</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <Brain className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <div className="font-medium text-purple-900">Study Strategy</div>
                  <div className="text-sm text-purple-700">Study tips, difficulty analysis, success strategies</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <Target className="h-6 w-6 text-orange-600 mt-1" />
                <div>
                  <div className="font-medium text-orange-900">Related Resources</div>
                  <div className="text-sm text-orange-700">Clubs, YouTube channels, study groups, online tools</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Success Message */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">Successfully extracted syllabus data!</span>
            </div>
            <p className="text-green-700 mt-1">
              Found information for {extractedData.courseCode} - {extractedData.courseName}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-purple-500 text-purple-600 bg-purple-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <div className="text-left">
                    <div>{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content - Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Course Header */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{extractedData.courseCode}</h4>
                    <p className="text-lg text-gray-700 mb-2">{extractedData.courseName}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>📚 {extractedData.courseDetails.credits} Credits</span>
                      {extractedData.courseDetails.prerequisites.length > 0 && (
                        <span>📋 Prerequisites: {extractedData.courseDetails.prerequisites.slice(0, 2).join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(extractedData.aiInsights.difficulty)}`}>
                      {getDifficultyText(extractedData.aiInsights.difficulty)} Difficulty
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(extractedData.aiInsights.workload)}`}>
                      {getDifficultyText(extractedData.aiInsights.workload)} Workload
                    </span>
                  </div>
                </div>
                {extractedData.courseDetails.description && (
                  <p className="text-gray-700 bg-white bg-opacity-50 p-3 rounded-lg">
                    {extractedData.courseDetails.description}
                  </p>
                )}
              </div>

              {/* Instructor and Schedule Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <h5 className="font-semibold text-gray-900">Instructor Information</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {extractedData.instructor.name}</div>
                    <div><span className="font-medium">Email:</span> 
                      <a href={`mailto:${extractedData.instructor.email}`} className="text-blue-600 hover:text-blue-700 ml-1">
                        {extractedData.instructor.email}
                      </a>
                    </div>
                    <div><span className="font-medium">Office:</span> {extractedData.instructor.office}</div>
                    <div><span className="font-medium">Office Hours:</span> {extractedData.instructor.officeHours}</div>
                    {extractedData.instructor.phone && (
                      <div><span className="font-medium">Phone:</span> {extractedData.instructor.phone}</div>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <h5 className="font-semibold text-gray-900">Class Schedule</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Days:</span> {extractedData.classSchedule.days.join(', ')}</div>
                    <div><span className="font-medium">Time:</span> {extractedData.classSchedule.time}</div>
                    <div><span className="font-medium">Location:</span> {extractedData.classSchedule.location}</div>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 mt-2">
                      <MapPin className="h-3 w-3" />
                      <span>Add to Campus Map</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Grading Breakdown */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-4">Grading Breakdown</h5>
                <div className="space-y-3">
                  {extractedData.gradingBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{item.component}</div>
                        {item.description && (
                          <div className="text-sm text-gray-600">{item.description}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-gray-200">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Download className="h-4 w-4" />
              <span>Export Summary</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Clock className="h-4 w-4" />
              <span>Add to Schedule</span>
            </button>
            <button 
              onClick={resetExtractor}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Another Syllabus</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};