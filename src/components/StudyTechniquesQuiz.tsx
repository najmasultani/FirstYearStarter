import React, { useState } from 'react';
import { Brain, CheckCircle, ArrowRight, RotateCcw, BookOpen, Clock, Users, Target, Lightbulb, Star } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    icon: string;
  }[];
}

interface StudyTechnique {
  id: string;
  name: string;
  description: string;
  howItWorks: string;
  benefits: string[];
  bestFor: string[];
  timeRequired: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  effectiveness: number; // 1-5 stars
  steps: string[];
  tips: string[];
  example: string;
}

export const StudyTechniquesQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedTechniques, setRecommendedTechniques] = useState<StudyTechnique[]>([]);
  const [selectedTechnique, setSelectedTechnique] = useState<StudyTechnique | null>(null);

  const questions: QuizQuestion[] = [
    {
      id: 'learning_style',
      question: 'How do you learn best?',
      options: [
        { value: 'visual', label: 'Visual (diagrams, charts, colors)', icon: '👁️' },
        { value: 'auditory', label: 'Auditory (listening, discussing)', icon: '👂' },
        { value: 'kinesthetic', label: 'Hands-on (doing, moving)', icon: '✋' },
        { value: 'reading', label: 'Reading/Writing (text, notes)', icon: '📝' }
      ]
    },
    {
      id: 'attention_span',
      question: 'How long can you typically focus without a break?',
      options: [
        { value: 'short', label: '15-25 minutes', icon: '⏰' },
        { value: 'medium', label: '25-45 minutes', icon: '🕐' },
        { value: 'long', label: '45-90 minutes', icon: '⏳' },
        { value: 'variable', label: 'It depends on the subject', icon: '🔄' }
      ]
    },
    {
      id: 'study_preference',
      question: 'Do you prefer to study alone or with others?',
      options: [
        { value: 'alone', label: 'Alone - I focus better solo', icon: '🧘' },
        { value: 'small_group', label: 'Small group (2-4 people)', icon: '👥' },
        { value: 'large_group', label: 'Large group or class setting', icon: '👨‍👩‍👧‍👦' },
        { value: 'mixed', label: 'Mix of both depending on topic', icon: '🔀' }
      ]
    },
    {
      id: 'memory_challenge',
      question: 'What\'s your biggest challenge with remembering information?',
      options: [
        { value: 'retention', label: 'Forgetting after a few days', icon: '🧠' },
        { value: 'understanding', label: 'Understanding complex concepts', icon: '🤔' },
        { value: 'application', label: 'Applying knowledge to problems', icon: '🎯' },
        { value: 'organization', label: 'Organizing and connecting ideas', icon: '🗂️' }
      ]
    },
    {
      id: 'motivation_style',
      question: 'What motivates you most when studying?',
      options: [
        { value: 'achievement', label: 'Completing tasks and goals', icon: '🏆' },
        { value: 'understanding', label: 'Deep understanding of topics', icon: '💡' },
        { value: 'grades', label: 'Getting good grades', icon: '📊' },
        { value: 'curiosity', label: 'Satisfying curiosity', icon: '🔍' }
      ]
    },
    {
      id: 'stress_response',
      question: 'How do you handle study stress?',
      options: [
        { value: 'structure', label: 'I need clear structure and plans', icon: '📋' },
        { value: 'flexibility', label: 'I prefer flexible approaches', icon: '🌊' },
        { value: 'breaks', label: 'Frequent breaks help me most', icon: '☕' },
        { value: 'intensity', label: 'I work better under pressure', icon: '⚡' }
      ]
    }
  ];

  const studyTechniques: StudyTechnique[] = [
    {
      id: 'pomodoro',
      name: 'Pomodoro Technique',
      description: 'Work in focused 25-minute intervals followed by 5-minute breaks',
      howItWorks: 'Break your study time into 25-minute focused sessions (called "pomodoros") followed by 5-minute breaks. After 4 pomodoros, take a longer 15-30 minute break.',
      benefits: [
        'Improves focus and concentration',
        'Reduces mental fatigue',
        'Makes large tasks feel manageable',
        'Builds momentum and motivation'
      ],
      bestFor: ['Procrastinators', 'People with short attention spans', 'Large projects', 'Maintaining consistent study habits'],
      timeRequired: '25-minute sessions',
      difficulty: 'Easy',
      effectiveness: 4,
      steps: [
        'Choose a specific task to work on',
        'Set a timer for 25 minutes',
        'Work on the task until the timer rings',
        'Take a 5-minute break',
        'Repeat 3 more times, then take a longer break'
      ],
      tips: [
        'Turn off all notifications during pomodoros',
        'If you think of something else, write it down and return to it later',
        'Use the breaks to stretch, hydrate, or rest your eyes',
        'Adjust the timing if needed (some prefer 45-minute sessions)'
      ],
      example: 'Study calculus for 25 minutes → 5-minute break → Study calculus for 25 minutes → 5-minute break → Continue pattern'
    },
    {
      id: 'active_recall',
      name: 'Active Recall',
      description: 'Test yourself on material without looking at notes or textbooks',
      howItWorks: 'Instead of passively re-reading notes, actively try to remember information from memory. Quiz yourself, explain concepts out loud, or write down everything you remember about a topic.',
      benefits: [
        'Strengthens memory pathways',
        'Identifies knowledge gaps',
        'Improves long-term retention',
        'Builds confidence for exams'
      ],
      bestFor: ['Memorizing facts', 'Preparing for exams', 'Building long-term retention', 'Self-assessment'],
      timeRequired: '15-30 minutes per session',
      difficulty: 'Medium',
      effectiveness: 5,
      steps: [
        'Study material normally first',
        'Close your books and notes',
        'Try to recall key information from memory',
        'Write down or say out loud what you remember',
        'Check your accuracy and review missed points'
      ],
      tips: [
        'Start with active recall early, not just before exams',
        'Use flashcards or apps like Anki for spaced repetition',
        'Explain concepts to someone else or record yourself',
        'Focus on understanding, not just memorization'
      ],
      example: 'After reading about photosynthesis, close your book and try to explain the entire process from memory, then check what you missed'
    },
    {
      id: 'spaced_repetition',
      name: 'Spaced Repetition',
      description: 'Review information at increasing intervals to maximize retention',
      howItWorks: 'Review material at strategically spaced intervals: first after 1 day, then 3 days, then 1 week, then 2 weeks, etc. This fights the forgetting curve and builds long-term memory.',
      benefits: [
        'Maximizes long-term retention',
        'Efficient use of study time',
        'Reduces cramming need',
        'Builds permanent knowledge'
      ],
      bestFor: ['Language learning', 'Medical/law school', 'Factual information', 'Long-term retention'],
      timeRequired: '10-20 minutes daily',
      difficulty: 'Medium',
      effectiveness: 5,
      steps: [
        'Learn new material thoroughly',
        'Review after 1 day',
        'Review again after 3 days',
        'Review after 1 week',
        'Continue with increasing intervals'
      ],
      tips: [
        'Use apps like Anki or Quizlet for automated scheduling',
        'Focus on material you find difficult',
        'Combine with active recall for best results',
        'Be consistent with daily reviews'
      ],
      example: 'Learn Spanish vocabulary on Monday → Review Tuesday → Review Friday → Review next Friday → Review in 2 weeks'
    },
    {
      id: 'feynman',
      name: 'Feynman Technique',
      description: 'Explain complex concepts in simple terms as if teaching someone else',
      howItWorks: 'Choose a concept, explain it in simple language as if teaching a child, identify gaps in your understanding, and refine your explanation until it\'s clear and complete.',
      benefits: [
        'Deepens understanding',
        'Identifies knowledge gaps',
        'Improves communication skills',
        'Makes complex topics accessible'
      ],
      bestFor: ['Complex concepts', 'STEM subjects', 'Preparing to teach others', 'Deep understanding'],
      timeRequired: '20-45 minutes per concept',
      difficulty: 'Medium',
      effectiveness: 5,
      steps: [
        'Choose a concept you want to understand',
        'Explain it in simple terms (as if to a 12-year-old)',
        'Identify areas where you struggle to explain',
        'Go back to source material for those areas',
        'Refine and simplify your explanation'
      ],
      tips: [
        'Use analogies and real-world examples',
        'Avoid jargon and technical terms',
        'Actually teach someone else if possible',
        'Write out your explanations'
      ],
      example: 'Explain quantum physics: "Imagine particles are like spinning coins that can be heads, tails, or both at the same time until you look at them..."'
    },
    {
      id: 'mind_mapping',
      name: 'Mind Mapping',
      description: 'Create visual diagrams connecting related concepts and ideas',
      howItWorks: 'Start with a central topic in the middle of a page, then branch out with related subtopics, using colors, images, and keywords to create a visual representation of information.',
      benefits: [
        'Visualizes connections between ideas',
        'Engages both logical and creative thinking',
        'Improves memory through visual association',
        'Great for brainstorming and planning'
      ],
      bestFor: ['Visual learners', 'Complex topics with many connections', 'Essay planning', 'Creative subjects'],
      timeRequired: '30-60 minutes',
      difficulty: 'Easy',
      effectiveness: 4,
      steps: [
        'Write the main topic in the center of a page',
        'Draw branches for major subtopics',
        'Add smaller branches for details',
        'Use colors, symbols, and images',
        'Connect related ideas across branches'
      ],
      tips: [
        'Use different colors for different themes',
        'Keep text brief - use keywords only',
        'Add drawings or symbols to aid memory',
        'Review and refine your map regularly'
      ],
      example: 'For studying World War II: Central topic "WWII" with branches for "Causes," "Major Battles," "Key Figures," "Consequences," each with detailed sub-branches'
    },
    {
      id: 'cornell_notes',
      name: 'Cornell Note-Taking',
      description: 'Structured note-taking system with cues, notes, and summary sections',
      howItWorks: 'Divide your page into three sections: a narrow left column for cues/questions, a wide right column for notes, and a bottom section for summary. This creates an organized, reviewable format.',
      benefits: [
        'Organizes information clearly',
        'Encourages active review',
        'Identifies key concepts',
        'Improves note quality'
      ],
      bestFor: ['Lecture notes', 'Reading comprehension', 'Organized learners', 'Review preparation'],
      timeRequired: 'During lectures/reading',
      difficulty: 'Easy',
      effectiveness: 4,
      steps: [
        'Divide page: 2.5" left column, 6" right column, 2" bottom',
        'Take notes in the right column during lecture',
        'Add cues/questions in left column after class',
        'Write summary in bottom section',
        'Use for review by covering notes and testing with cues'
      ],
      tips: [
        'Review and add cues within 24 hours',
        'Use abbreviations and symbols for speed',
        'Focus on main ideas, not every detail',
        'Use the cue column for potential test questions'
      ],
      example: 'Left: "What is photosynthesis?" Right: "Process where plants convert sunlight to energy using chlorophyll..." Bottom: "Photosynthesis is essential for plant energy and oxygen production"'
    },
    {
      id: 'sq3r',
      name: 'SQ3R Method',
      description: 'Survey, Question, Read, Recite, Review - systematic reading approach',
      howItWorks: 'A five-step reading method: Survey the material first, form Questions, Read actively, Recite key points, and Review regularly. This systematic approach improves comprehension and retention.',
      benefits: [
        'Improves reading comprehension',
        'Increases retention',
        'Makes reading more active',
        'Provides structure for study sessions'
      ],
      bestFor: ['Textbook reading', 'Research papers', 'Dense material', 'Systematic learners'],
      timeRequired: '1-2 hours per chapter',
      difficulty: 'Medium',
      effectiveness: 4,
      steps: [
        'Survey: Skim headings, summaries, and key points',
        'Question: Turn headings into questions',
        'Read: Read actively to answer your questions',
        'Recite: Summarize key points from memory',
        'Review: Go over material regularly'
      ],
      tips: [
        'Don\'t skip the survey step - it provides context',
        'Write down your questions before reading',
        'Take breaks between sections',
        'Use the recite step to identify weak areas'
      ],
      example: 'For a biology chapter: Survey headings → Ask "How does DNA replication work?" → Read section → Recite process from memory → Review next week'
    },
    {
      id: 'interleaving',
      name: 'Interleaving',
      description: 'Mix different topics or problem types within a single study session',
      howItWorks: 'Instead of studying one topic for hours (blocking), alternate between different subjects or problem types. This forces your brain to constantly retrieve and apply different strategies.',
      benefits: [
        'Improves problem-solving skills',
        'Enhances ability to distinguish between concepts',
        'Builds flexible thinking',
        'Better prepares for mixed exams'
      ],
      bestFor: ['Math and science problems', 'Language learning', 'Skill development', 'Exam preparation'],
      timeRequired: '45-90 minutes',
      difficulty: 'Hard',
      effectiveness: 4,
      steps: [
        'Identify 3-4 related topics or problem types',
        'Study each for 15-20 minutes',
        'Switch to the next topic',
        'Return to previous topics in mixed order',
        'Continue alternating throughout session'
      ],
      tips: [
        'Start with related topics, not completely different subjects',
        'It will feel harder initially - that\'s normal and beneficial',
        'Keep track of which topics need more attention',
        'Combine with spaced repetition for best results'
      ],
      example: 'Math study: 20 min algebra → 20 min geometry → 20 min statistics → back to algebra → geometry → statistics in mixed order'
    },
    {
      id: 'elaborative_interrogation',
      name: 'Elaborative Interrogation',
      description: 'Continuously ask "why" and "how" questions to deepen understanding',
      howItWorks: 'For every fact or concept you encounter, ask yourself "Why is this true?" or "How does this work?" Then seek out or reason through the answers. This creates deeper, more connected knowledge.',
      benefits: [
        'Builds deeper understanding',
        'Creates stronger memory connections',
        'Improves critical thinking',
        'Makes information more meaningful'
      ],
      bestFor: ['Conceptual subjects', 'Science and history', 'Critical thinking development', 'Deep learning'],
      timeRequired: '30-45 minutes per topic',
      difficulty: 'Medium',
      effectiveness: 4,
      steps: [
        'Read or learn a new fact/concept',
        'Ask "Why is this true?" or "How does this work?"',
        'Try to answer from existing knowledge',
        'Research or reason through the answer',
        'Connect to other concepts you know'
      ],
      tips: [
        'Don\'t just accept facts - dig deeper',
        'Use multiple sources to answer your questions',
        'Create concept maps to show connections',
        'Discuss your questions with others'
      ],
      example: 'Learning "Water boils at 100°C" → Ask "Why 100°C specifically?" → Learn about atmospheric pressure, molecular motion, and energy states'
    },
    {
      id: 'dual_coding',
      name: 'Dual Coding',
      description: 'Combine verbal and visual information to enhance memory',
      howItWorks: 'Process information through both verbal (words, speech) and visual (images, diagrams) channels simultaneously. This creates multiple pathways to the same information, making it easier to remember.',
      benefits: [
        'Strengthens memory through multiple pathways',
        'Appeals to different learning styles',
        'Makes abstract concepts concrete',
        'Improves recall and understanding'
      ],
      bestFor: ['Visual learners', 'Complex concepts', 'Abstract subjects', 'Memory improvement'],
      timeRequired: '20-40 minutes per concept',
      difficulty: 'Easy',
      effectiveness: 4,
      steps: [
        'Learn concept through text/lecture',
        'Create or find visual representation',
        'Explain concept using both words and images',
        'Practice recalling using both channels',
        'Test yourself with visual and verbal cues'
      ],
      tips: [
        'Draw simple diagrams even if you\'re not artistic',
        'Use colors and symbols meaningfully',
        'Create mental images for abstract concepts',
        'Combine with other techniques like mind mapping'
      ],
      example: 'Learning about the water cycle: Read description + draw diagram + explain while pointing to diagram + visualize process mentally'
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendations
      const recommendations = calculateRecommendations(answers);
      setRecommendedTechniques(recommendations);
      setShowResults(true);
    }
  };

  const calculateRecommendations = (userAnswers: { [key: string]: string }): StudyTechnique[] => {
    const scores: { [key: string]: number } = {};
    
    // Initialize scores
    studyTechniques.forEach(technique => {
      scores[technique.id] = 0;
    });

    // Score based on learning style
    if (userAnswers.learning_style === 'visual') {
      scores.mind_mapping += 3;
      scores.dual_coding += 3;
      scores.cornell_notes += 2;
    } else if (userAnswers.learning_style === 'auditory') {
      scores.feynman += 3;
      scores.elaborative_interrogation += 2;
      scores.active_recall += 2;
    } else if (userAnswers.learning_style === 'kinesthetic') {
      scores.active_recall += 3;
      scores.interleaving += 2;
      scores.pomodoro += 2;
    } else if (userAnswers.learning_style === 'reading') {
      scores.cornell_notes += 3;
      scores.sq3r += 3;
      scores.spaced_repetition += 2;
    }

    // Score based on attention span
    if (userAnswers.attention_span === 'short') {
      scores.pomodoro += 3;
      scores.active_recall += 2;
      scores.interleaving += 2;
    } else if (userAnswers.attention_span === 'long') {
      scores.feynman += 2;
      scores.sq3r += 2;
      scores.mind_mapping += 2;
    }

    // Score based on study preference
    if (userAnswers.study_preference === 'alone') {
      scores.pomodoro += 2;
      scores.spaced_repetition += 2;
      scores.cornell_notes += 1;
    } else if (userAnswers.study_preference === 'small_group') {
      scores.feynman += 3;
      scores.elaborative_interrogation += 2;
    }

    // Score based on memory challenge
    if (userAnswers.memory_challenge === 'retention') {
      scores.spaced_repetition += 3;
      scores.active_recall += 3;
      scores.dual_coding += 2;
    } else if (userAnswers.memory_challenge === 'understanding') {
      scores.feynman += 3;
      scores.elaborative_interrogation += 3;
      scores.mind_mapping += 2;
    } else if (userAnswers.memory_challenge === 'application') {
      scores.interleaving += 3;
      scores.active_recall += 2;
      scores.feynman += 2;
    } else if (userAnswers.memory_challenge === 'organization') {
      scores.cornell_notes += 3;
      scores.mind_mapping += 3;
      scores.sq3r += 2;
    }

    // Score based on motivation style
    if (userAnswers.motivation_style === 'achievement') {
      scores.pomodoro += 2;
      scores.spaced_repetition += 2;
    } else if (userAnswers.motivation_style === 'understanding') {
      scores.feynman += 3;
      scores.elaborative_interrogation += 2;
    }

    // Score based on stress response
    if (userAnswers.stress_response === 'structure') {
      scores.cornell_notes += 2;
      scores.sq3r += 2;
      scores.pomodoro += 2;
    } else if (userAnswers.stress_response === 'breaks') {
      scores.pomodoro += 3;
      scores.interleaving += 2;
    }

    // Sort techniques by score and return top 3
    const sortedTechniques = studyTechniques
      .map(technique => ({ ...technique, score: scores[technique.id] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return sortedTechniques;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedTechniques([]);
    setSelectedTechnique(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedTechnique) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">{selectedTechnique.name}</h3>
          </div>
          <button
            onClick={() => setSelectedTechnique(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Results
          </button>
        </div>

        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
            <p className="text-lg text-gray-800 mb-4">{selectedTechnique.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700">{selectedTechnique.timeRequired}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(selectedTechnique.difficulty)}`}>
                  {selectedTechnique.difficulty}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(selectedTechnique.effectiveness)}
                <span className="text-sm text-gray-600 ml-1">Effectiveness</span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">How It Works</h4>
            <p className="text-gray-700">{selectedTechnique.howItWorks}</p>
          </div>

          {/* Step-by-Step Guide */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Guide</h4>
            <div className="space-y-3">
              {selectedTechnique.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedTechnique.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best For */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Best For</h4>
            <div className="flex flex-wrap gap-2">
              {selectedTechnique.bestFor.map((item, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Pro Tips</h4>
            <div className="space-y-2">
              {selectedTechnique.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Example</h4>
            <p className="text-gray-700 italic">{selectedTechnique.example}</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">Your Personalized Study Techniques</h3>
          </div>
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Quiz</span>
          </button>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800">
            Based on your answers, here are the study techniques that will work best for your learning style and preferences:
          </p>
        </div>

        <div className="space-y-6">
          {recommendedTechniques.map((technique, index) => (
            <div key={technique.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{technique.name}</h4>
                    <p className="text-gray-600">{technique.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(technique.effectiveness)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{technique.timeRequired}</span>
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(technique.difficulty)}`}>
                    {technique.difficulty}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">High effectiveness</span>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium text-gray-900 mb-2">Best For:</h5>
                <div className="flex flex-wrap gap-2">
                  {technique.bestFor.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Why this works for you: Based on your learning style and preferences
                </div>
                <button
                  onClick={() => setSelectedTechnique(technique)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Getting Started Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <ul className="space-y-2">
              <li>• Start with one technique and master it before adding others</li>
              <li>• Give each technique at least 2 weeks to see results</li>
              <li>• Combine techniques for maximum effectiveness</li>
            </ul>
            <ul className="space-y-2">
              <li>• Track your progress and adjust as needed</li>
              <li>• Be patient - new habits take time to develop</li>
              <li>• Experiment to find what works best for different subjects</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-6 w-6 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-900">Study Techniques Quiz</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-900 mb-6">{currentQ.question}</h4>
        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQ.id, option.value)}
              className="w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left group"
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="flex-1 font-medium text-gray-900 group-hover:text-purple-700">
                {option.label}
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4">
        <p className="text-sm text-purple-800">
          This quiz will help identify the most effective study techniques based on your learning style, 
          attention span, and study preferences. Answer honestly for the best recommendations!
        </p>
      </div>
    </div>
  );
};