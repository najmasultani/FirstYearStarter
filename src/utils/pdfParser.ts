import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Set up PDF.js worker with local import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface ParsedSyllabusData {
  courseCode: string;
  courseName: string;
  instructor: {
    name: string;
    email: string;
    officeHours: string;
    office: string;
    phone?: string;
  };
  classSchedule: {
    days: string[];
    time: string;
    location: string;
    coordinates?: [number, number];
  };
  textbooks: {
    title: string;
    author: string;
    isbn?: string;
    edition?: string;
    required: boolean;
    estimatedCost: string;
    freeAlternatives: string[];
    amazonLink?: string;
    libraryAvailable: boolean;
  }[];
  gradingBreakdown: {
    component: string;
    percentage: number;
    description?: string;
  }[];
  importantLinks: {
    name: string;
    url: string;
    type: 'lms' | 'resource' | 'tool' | 'other';
  }[];
  aiInsights: {
    studyStrategy: string;
    professorInsights: string;
    courseAdvice: string;
    difficulty: number;
    workload: number;
    keyTopics: string[];
    examTips: string;
  };
  relatedResources: {
    clubs: string[];
    youtubeChannels: string[];
    studyGroups: string[];
    onlineResources: string[];
  };
  courseDetails: {
    credits: number;
    prerequisites: string[];
    description: string;
    learningObjectives: string[];
  };
}

export interface ExtractedTextData {
  fullText: string;
  structuredData: any[];
}

export async function extractTextFromPDF(file: File): Promise<ExtractedTextData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ 
      data: arrayBuffer,
      useSystemFonts: true,
      standardFontDataUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/standard_fonts/'
    }).promise;
    
    let fullText = '';
    let structuredText: any[] = [];
    
    // Extract text from all pages with positioning information
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Sort items by position (top to bottom, left to right)
      const sortedItems = textContent.items.sort((a: any, b: any) => {
        const yDiff = b.transform[5] - a.transform[5]; // Y position (top to bottom)
        if (Math.abs(yDiff) > 5) return yDiff > 0 ? 1 : -1;
        return a.transform[4] - b.transform[4]; // X position (left to right)
      });
      
      let pageText = '';
      let currentLine = '';
      let lastY = null;
      
      for (const item of sortedItems) {
        const text = item.str.trim();
        if (!text) continue;
        
        const currentY = item.transform[5];
        
        // Check if we're on a new line
        if (lastY !== null && Math.abs(currentY - lastY) > 5) {
          if (currentLine.trim()) {
            pageText += currentLine.trim() + '\n';
            structuredText.push({
              text: currentLine.trim(),
              page: pageNum,
              y: lastY,
              type: 'line'
            });
          }
          currentLine = text;
        } else {
          currentLine += (currentLine ? ' ' : '') + text;
        }
        
        lastY = currentY;
      }
      
      // Add the last line
      if (currentLine.trim()) {
        pageText += currentLine.trim() + '\n';
        structuredText.push({
          text: currentLine.trim(),
          page: pageNum,
          y: lastY,
          type: 'line'
        });
      }
      
      fullText += pageText + '\n';
    }
    
    return {
      fullText,
      structuredData: structuredText
    };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the PDF is not password protected and contains readable text.');
  }
}

export function parseSyllabusText(text: string, universityId: string): ParsedSyllabusData {
  console.log('Parsing syllabus text:', text.substring(0, 500) + '...');
  
  // Clean and normalize text
  const cleanText = text.replace(/\s+/g, ' ').trim();
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Extract course information with multiple patterns
  const courseInfo = extractCourseInfo(cleanText, lines);
  const instructorInfo = extractInstructorInfo(cleanText, lines);
  const scheduleInfo = extractScheduleInfo(cleanText, lines);
  const textbooks = extractTextbooksAdvanced(cleanText, lines);
  const grading = extractGradingBreakdownAdvanced(cleanText, lines);
  const links = extractLinksAdvanced(cleanText, lines);
  const courseDetails = extractCourseDetails(cleanText, lines);
  
  // Generate enhanced AI insights
  const aiInsights = generateEnhancedAIInsights(courseInfo, instructorInfo, textbooks, grading, cleanText);
  
  // Generate comprehensive related resources
  const relatedResources = generateComprehensiveResources(courseInfo.courseCode, universityId, courseInfo.courseName);
  
  return {
    courseCode: courseInfo.courseCode,
    courseName: courseInfo.courseName,
    instructor: instructorInfo,
    classSchedule: scheduleInfo,
    textbooks,
    gradingBreakdown: grading,
    importantLinks: links,
    aiInsights,
    relatedResources,
    courseDetails
  };
}

function extractCourseInfo(text: string, lines: string[]) {
  // Multiple patterns for course code extraction
  const courseCodePatterns = [
    /([A-Z]{2,4}[\s\-]*\d{3}[A-Z]?\d?)/gi,
    /Course[\s\-:]*([A-Z]{2,4}[\s\-]*\d{3}[A-Z]?\d?)/gi,
    /([A-Z]{2,4}\d{3}[A-Z]?\d?)/gi
  ];
  
  let courseCode = 'Course Code Not Found';
  let courseCodeMatch = null;
  
  for (const pattern of courseCodePatterns) {
    const match = text.match(pattern);
    if (match) {
      courseCode = match[1] || match[0];
      courseCode = courseCode.replace(/[\s\-]+/g, '').toUpperCase();
      courseCodeMatch = match;
      break;
    }
  }
  
  // Extract course name with better context awareness
  let courseName = 'Course Name Not Found';
  
  // Look for course name in the first few lines
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i];
    
    // Skip lines that are just course codes
    if (/^[A-Z]{2,4}[\s\-]*\d{3}[A-Z]?\d?$/.test(line.trim())) continue;
    
    // Look for substantial course names
    if (line.length > 10 && line.length < 100) {
      // Check if it contains course-like words
      const courseWords = /introduction|principles|fundamentals|advanced|theory|practice|analysis|design|systems|methods|concepts/i;
      const academicWords = /mathematics|physics|chemistry|biology|computer|engineering|science|history|literature|psychology|economics|business/i;
      
      if (courseWords.test(line) || academicWords.test(line) || 
          (line.includes(courseCode.replace(/\d+/g, '')) && line.length > courseCode.length + 5)) {
        courseName = line.replace(/course\s*:?\s*/gi, '').trim();
        break;
      }
    }
  }
  
  // If still not found, look for patterns after course code
  if (courseName === 'Course Name Not Found' && courseCodeMatch) {
    const afterCodeText = text.substring(courseCodeMatch.index! + courseCodeMatch[0].length);
    const nameMatch = afterCodeText.match(/[:\-\s]*([A-Za-z\s&,\-()]+?)(?:\n|instructor|professor|credits|units|semester|term)/i);
    if (nameMatch && nameMatch[1].trim().length > 5) {
      courseName = nameMatch[1].trim();
    }
  }
  
  return { courseCode, courseName };
}

function extractInstructorInfo(text: string, lines: string[]) {
  const instructorInfo = {
    name: 'Instructor Not Found',
    email: 'Email not found',
    officeHours: 'Office hours not found',
    office: 'Office not found',
    phone: undefined as string | undefined
  };
  
  // Enhanced instructor name extraction
  const instructorPatterns = [
    /(?:instructor|professor|prof|teacher|faculty)[:\s]*([A-Za-z\s\.,]+?)(?:\n|email|office|phone|department)/gi,
    /taught\s+by[:\s]*([A-Za-z\s\.,]+?)(?:\n|email|office)/gi,
    /([A-Za-z]+\s+[A-Za-z]+)(?:\s*,?\s*(?:ph\.?d\.?|dr\.?|professor|prof))/gi
  ];
  
  for (const pattern of instructorPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const name = match[1].trim().replace(/[,\.]$/, '');
      if (name.length > 3 && name.length < 50 && /^[A-Za-z\s\.,]+$/.test(name)) {
        instructorInfo.name = name;
        break;
      }
    }
  }
  
  // Email extraction with validation
  const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const emailMatches = text.match(emailPattern);
  if (emailMatches) {
    // Prefer .edu emails or emails that contain instructor name parts
    const nameWords = instructorInfo.name.toLowerCase().split(' ');
    const preferredEmail = emailMatches.find(email => 
      email.includes('.edu') || 
      nameWords.some(word => word.length > 2 && email.toLowerCase().includes(word))
    );
    instructorInfo.email = preferredEmail || emailMatches[0];
  }
  
  // Office extraction
  const officePatterns = [
    /(?:office|room)[:\s]*([A-Za-z0-9\s\-]+?)(?:\n|phone|email|hours)/gi,
    /(?:location|office)[:\s]*([A-Za-z0-9\s\-]+?)(?:\n|office\s+hours)/gi
  ];
  
  for (const pattern of officePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const office = match[1].trim();
      if (office.length > 2 && office.length < 30) {
        instructorInfo.office = office;
        break;
      }
    }
  }
  
  // Office hours extraction
  const officeHoursPatterns = [
    /(?:office\s+hours?)[:\s]*([A-Za-z0-9\s\-:,]+?)(?:\n|email|phone|by\s+appointment)/gi,
    /(?:hours?)[:\s]*([A-Za-z0-9\s\-:,]+?)(?:\n|or\s+by\s+appointment)/gi
  ];
  
  for (const pattern of officeHoursPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const hours = match[1].trim();
      if (hours.length > 5 && hours.length < 100) {
        instructorInfo.officeHours = hours;
        break;
      }
    }
  }
  
  // Phone extraction
  const phonePattern = /(?:phone|tel)[:\s]*([0-9\-\(\)\s\.]+)/gi;
  const phoneMatch = text.match(phonePattern);
  if (phoneMatch && phoneMatch[1]) {
    instructorInfo.phone = phoneMatch[1].trim();
  }
  
  return instructorInfo;
}

function extractScheduleInfo(text: string, lines: string[]) {
  const scheduleInfo = {
    days: [] as string[],
    time: 'Time not found',
    location: 'Location not found',
    coordinates: [43.6629, -79.3957] as [number, number]
  };
  
  // Enhanced day extraction
  const dayPatterns = [
    /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi,
    /(mon|tue|wed|thu|fri|sat|sun)/gi,
    /(mwf|tth|mw|tr|mf|tw|th|wr|wf)/gi
  ];
  
  const dayAbbreviations: { [key: string]: string[] } = {
    'mwf': ['Monday', 'Wednesday', 'Friday'],
    'tth': ['Tuesday', 'Thursday'],
    'mw': ['Monday', 'Wednesday'],
    'tr': ['Tuesday', 'Thursday'],
    'mf': ['Monday', 'Friday'],
    'tw': ['Tuesday', 'Wednesday'],
    'th': ['Thursday'],
    'wr': ['Wednesday'],
    'wf': ['Wednesday', 'Friday']
  };
  
  const fullDayNames: { [key: string]: string } = {
    'mon': 'Monday', 'tue': 'Tuesday', 'wed': 'Wednesday',
    'thu': 'Thursday', 'fri': 'Friday', 'sat': 'Saturday', 'sun': 'Sunday'
  };
  
  for (const pattern of dayPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      const uniqueDays = new Set<string>();
      matches.forEach(match => {
        const day = match.toLowerCase();
        if (dayAbbreviations[day]) {
          dayAbbreviations[day].forEach(d => uniqueDays.add(d));
        } else if (fullDayNames[day]) {
          uniqueDays.add(fullDayNames[day]);
        } else if (day.length > 3) {
          uniqueDays.add(day.charAt(0).toUpperCase() + day.slice(1));
        }
      });
      scheduleInfo.days = Array.from(uniqueDays);
      break;
    }
  }
  
  // Enhanced time extraction
  const timePatterns = [
    /(?:time|schedule|class)[:\s]*([0-9]{1,2}:[0-9]{2}\s*(?:am|pm)?\s*[\-–]\s*[0-9]{1,2}:[0-9]{2}\s*(?:am|pm)?)/gi,
    /([0-9]{1,2}:[0-9]{2}\s*(?:am|pm)?\s*[\-–]\s*[0-9]{1,2}:[0-9]{2}\s*(?:am|pm)?)/gi,
    /(?:from\s+)?([0-9]{1,2}:[0-9]{2})\s*(?:am|pm)?\s*(?:to|[\-–])\s*([0-9]{1,2}:[0-9]{2})\s*(?:am|pm)?/gi
  ];
  
  for (const pattern of timePatterns) {
    const match = text.match(pattern);
    if (match) {
      scheduleInfo.time = match[1] || `${match[1]} - ${match[2]}`;
      break;
    }
  }
  
  // Enhanced location extraction
  const locationPatterns = [
    /(?:location|room|building|classroom)[:\s]*([A-Za-z0-9\s\-]+?)(?:\n|time|schedule)/gi,
    /(?:meets?\s+in)[:\s]*([A-Za-z0-9\s\-]+?)(?:\n|on\s+)/gi,
    /([A-Za-z]+\s+[0-9]+[A-Za-z]?)/g // Building + room number pattern
  ];
  
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const location = match[1].trim();
      if (location.length > 2 && location.length < 50) {
        scheduleInfo.location = location;
        break;
      }
    }
  }
  
  return scheduleInfo;
}

function extractTextbooksAdvanced(text: string, lines: string[]) {
  const textbooks: any[] = [];
  
  // Enhanced textbook extraction patterns
  const textbookSections = text.split(/(?:required|textbook|text|reading|materials?)[:\s]/gi);
  
  for (let i = 1; i < textbookSections.length; i++) {
    const section = textbookSections[i].substring(0, 500); // Limit section size
    
    // Pattern for "Title by Author"
    const titleAuthorPattern = /([A-Za-z\s&,\-:()]+?)\s+by\s+([A-Za-z\s&,\.]+?)(?:\n|isbn|edition|publisher|\d{4})/gi;
    let match;
    
    while ((match = titleAuthorPattern.exec(section)) !== null) {
      const title = match[1].trim();
      const author = match[2].trim();
      
      if (title.length > 5 && title.length < 100 && author.length > 3 && author.length < 50) {
        const isRequired = /required|mandatory/i.test(section.substring(Math.max(0, match.index - 100), match.index + 100));
        
        // Extract ISBN if present
        const isbnMatch = section.substring(match.index).match(/isbn[:\s]*(\d{10}|\d{13}|\d{3}-\d{10})/i);
        const isbn = isbnMatch ? isbnMatch[1] : undefined;
        
        // Extract edition
        const editionMatch = section.substring(match.index).match(/(\d+)(?:st|nd|rd|th)?\s+edition/i);
        const edition = editionMatch ? editionMatch[0] : undefined;
        
        textbooks.push({
          title,
          author,
          isbn,
          edition,
          required: isRequired,
          estimatedCost: estimateBookCost(title, isRequired),
          freeAlternatives: generateFreeAlternatives(title, author),
          amazonLink: generateAmazonLink(title, author),
          libraryAvailable: true // Assume available, would check in real implementation
        });
      }
    }
  }
  
  // If no textbooks found with standard patterns, try alternative extraction
  if (textbooks.length === 0) {
    const bookTitlePattern = /(?:textbook|book|text)[:\s]*([A-Za-z\s&,\-:()]+?)(?:\n|author|by|isbn)/gi;
    let match;
    
    while ((match = bookTitlePattern.exec(text)) !== null) {
      const title = match[1].trim();
      if (title.length > 10 && title.length < 100) {
        textbooks.push({
          title,
          author: 'Author information not specified',
          required: true,
          estimatedCost: '$200-300 CAD',
          freeAlternatives: [
            'University Library Digital Collection',
            'Course Reserve Materials',
            'Open Educational Resources'
          ],
          libraryAvailable: true
        });
      }
    }
  }
  
  return textbooks.slice(0, 5); // Limit to 5 textbooks
}

function estimateBookCost(title: string, required: boolean): string {
  // Basic cost estimation based on book type
  if (/introduction|intro|basic|fundamental/i.test(title)) {
    return required ? '$150-250 CAD' : '$100-180 CAD';
  } else if (/advanced|graduate|research/i.test(title)) {
    return required ? '$250-400 CAD' : '$200-350 CAD';
  } else {
    return required ? '$200-300 CAD' : '$150-250 CAD';
  }
}

function generateFreeAlternatives(title: string, author: string): string[] {
  const alternatives = [
    'University Library Digital Collection',
    'Course Reserve Materials',
    'Google Scholar - Free Articles',
    'Open Educational Resources (OER)',
    'Internet Archive - Free Books'
  ];
  
  // Add subject-specific alternatives
  if (/math|calculus|algebra/i.test(title)) {
    alternatives.push('Khan Academy', 'MIT OpenCourseWare');
  } else if (/computer|programming|software/i.test(title)) {
    alternatives.push('GitHub Free Books', 'FreeCodeCamp Resources');
  } else if (/physics|chemistry|biology/i.test(title)) {
    alternatives.push('OpenStax Free Textbooks', 'MIT OpenCourseWare');
  }
  
  return alternatives.slice(0, 6);
}

function generateAmazonLink(title: string, author: string): string {
  const searchQuery = encodeURIComponent(`${title} ${author}`);
  return `https://www.amazon.ca/s?k=${searchQuery}&i=stripbooks`;
}

function extractGradingBreakdownAdvanced(text: string, lines: string[]) {
  const gradingBreakdown: any[] = [];
  const processedComponents = new Set<string>();
  
  // Enhanced grading patterns
  const gradingPatterns = [
    /(\w+(?:\s+\w+)*)[:\s]*(\d+)%/g,
    /(\d+)%[:\s]*(\w+(?:\s+\w+)*)/g,
    /(\w+(?:\s+\w+)*)[:\s]*(\d+)\s*percent/gi,
    /(\w+(?:\s+\w+)*)[:\s]*(\d+)\s*pts?/g
  ];
  
  // Look for grading sections
  const gradingSections = text.split(/(?:grading|evaluation|assessment|breakdown)[:\s]/gi);
  
  for (const section of gradingSections) {
    for (const pattern of gradingPatterns) {
      let match;
      while ((match = pattern.exec(section)) !== null) {
        let component, percentage;
        
        if (pattern.source.includes('(\\w+')) {
          component = match[1].trim();
          percentage = parseInt(match[2]);
        } else {
          percentage = parseInt(match[1]);
          component = match[2].trim();
        }
        
        // Clean up component name
        component = component.replace(/[:\-\s]+$/, '').trim();
        
        // Validate and normalize
        if (percentage > 0 && percentage <= 100 && 
            component.length > 2 && component.length < 50 &&
            !processedComponents.has(component.toLowerCase())) {
          
          processedComponents.add(component.toLowerCase());
          
          // Add description based on component type
          let description = '';
          if (/exam|test/i.test(component)) {
            description = 'Written examination';
          } else if (/assignment|homework|hw/i.test(component)) {
            description = 'Regular coursework';
          } else if (/project/i.test(component)) {
            description = 'Major project work';
          } else if (/participation|attendance/i.test(component)) {
            description = 'Class engagement';
          } else if (/quiz/i.test(component)) {
            description = 'Short assessments';
          }
          
          gradingBreakdown.push({ 
            component: component.charAt(0).toUpperCase() + component.slice(1), 
            percentage,
            description 
          });
        }
      }
    }
  }
  
  // Validate total percentage
  const totalPercentage = gradingBreakdown.reduce((sum, item) => sum + item.percentage, 0);
  
  // If total is not 100% or no grading found, add default breakdown
  if (Math.abs(totalPercentage - 100) > 10 || gradingBreakdown.length === 0) {
    return [
      { component: 'Assignments', percentage: 30, description: 'Regular coursework and homework' },
      { component: 'Midterm Exam', percentage: 30, description: 'Mid-semester examination' },
      { component: 'Final Exam', percentage: 35, description: 'Comprehensive final examination' },
      { component: 'Participation', percentage: 5, description: 'Class attendance and engagement' }
    ];
  }
  
  return gradingBreakdown.slice(0, 8); // Limit to 8 components
}

function extractLinksAdvanced(text: string, lines: string[]) {
  const links: any[] = [];
  
  // Extract URLs with context
  const urlPattern = /(https?:\/\/[^\s\)]+)/g;
  let match;
  
  while ((match = urlPattern.exec(text)) !== null) {
    const url = match[1];
    const context = text.substring(Math.max(0, match.index - 50), match.index + 50);
    
    let name = 'Course Link';
    let type: 'lms' | 'resource' | 'tool' | 'other' = 'other';
    
    // Determine link type and name based on URL and context
    if (url.includes('quercus') || url.includes('canvas') || url.includes('blackboard') || url.includes('moodle')) {
      name = 'Learning Management System';
      type = 'lms';
    } else if (url.includes('piazza') || url.includes('discord') || url.includes('slack')) {
      name = 'Discussion Platform';
      type = 'tool';
    } else if (url.includes('github') || url.includes('gitlab') || url.includes('bitbucket')) {
      name = 'Code Repository';
      type = 'resource';
    } else if (url.includes('zoom') || url.includes('teams') || url.includes('meet')) {
      name = 'Virtual Classroom';
      type = 'tool';
    } else if (url.includes('youtube') || url.includes('vimeo')) {
      name = 'Video Resources';
      type = 'resource';
    } else if (url.includes('google.com/drive') || url.includes('dropbox') || url.includes('onedrive')) {
      name = 'Shared Files';
      type = 'resource';
    } else if (/syllabus|course/i.test(context)) {
      name = 'Course Website';
      type = 'lms';
    }
    
    links.push({ name, url, type });
  }
  
  // Add common university links if none found
  if (links.length === 0) {
    links.push(
      { name: 'Course Management System', url: '#', type: 'lms' as const },
      { name: 'Discussion Forum', url: '#', type: 'tool' as const },
      { name: 'Course Resources', url: '#', type: 'resource' as const }
    );
  }
  
  return links.slice(0, 8); // Limit to 8 links
}

function extractCourseDetails(text: string, lines: string[]) {
  const courseDetails = {
    credits: 3, // Default
    prerequisites: [] as string[],
    description: '',
    learningObjectives: [] as string[]
  };
  
  // Extract credits
  const creditsPattern = /(\d+)\s*(?:credit|unit|hour)/gi;
  const creditsMatch = text.match(creditsPattern);
  if (creditsMatch) {
    courseDetails.credits = parseInt(creditsMatch[0]);
  }
  
  // Extract prerequisites
  const prereqPattern = /(?:prerequisite|prereq)[:\s]*([A-Za-z0-9\s,\-&]+?)(?:\n|description|objective)/gi;
  const prereqMatch = text.match(prereqPattern);
  if (prereqMatch && prereqMatch[1]) {
    const prereqs = prereqMatch[1].split(/[,&]/).map(p => p.trim()).filter(p => p.length > 2);
    courseDetails.prerequisites = prereqs.slice(0, 5);
  }
  
  // Extract course description
  const descPattern = /(?:description|overview|about)[:\s]*([A-Za-z\s,\.\-]+?)(?:\n\n|objective|prerequisite|textbook)/gi;
  const descMatch = text.match(descPattern);
  if (descMatch && descMatch[1]) {
    courseDetails.description = descMatch[1].trim().substring(0, 300);
  }
  
  // Extract learning objectives
  const objectivePattern = /(?:objective|outcome|goal)[:\s]*([A-Za-z\s,\.\-]+?)(?:\n\n|grading|textbook)/gi;
  const objectiveMatch = text.match(objectivePattern);
  if (objectiveMatch && objectiveMatch[1]) {
    const objectives = objectiveMatch[1].split(/[\.;]/).map(o => o.trim()).filter(o => o.length > 10);
    courseDetails.learningObjectives = objectives.slice(0, 5);
  }
  
  return courseDetails;
}

function generateEnhancedAIInsights(courseInfo: any, instructorInfo: any, textbooks: any[], grading: any[], text: string) {
  const { courseCode, courseName } = courseInfo;
  
  // Analyze course characteristics
  const isSTEM = /math|calculus|physics|chemistry|engineering|computer|science|biology|statistics/i.test(courseName + ' ' + courseCode);
  const isLab = /lab|laboratory|practical|workshop/i.test(text);
  const hasProjects = /project|assignment|homework|portfolio/i.test(text);
  const isWritingIntensive = /essay|paper|writing|report|thesis/i.test(text);
  const hasGroupWork = /group|team|collaborative|peer/i.test(text);
  
  // Determine difficulty and workload
  let difficulty = 3;
  let workload = 3;
  
  // Course level analysis
  const courseNumber = courseCode.match(/\d+/)?.[0];
  if (courseNumber) {
    const level = parseInt(courseNumber);
    if (level >= 400) difficulty = 5;
    else if (level >= 300) difficulty = 4;
    else if (level >= 200) difficulty = 3;
    else difficulty = 2;
  }
  
  // Adjust based on content and structure
  if (isLab) workload += 1;
  if (hasProjects) workload += 1;
  if (isSTEM) difficulty += 1;
  if (isWritingIntensive) workload += 1;
  if (textbooks.length > 3) workload += 1;
  if (grading.some(g => g.component.toLowerCase().includes('participation'))) workload += 0.5;
  
  // Cap at 5
  difficulty = Math.min(5, Math.max(1, difficulty));
  workload = Math.min(5, Math.max(1, workload));
  
  // Generate study strategy
  let studyStrategy = '';
  if (isSTEM) {
    studyStrategy = "Focus on problem-solving practice and understanding fundamental concepts. Work through examples step-by-step, form study groups for collaborative learning, and practice regularly rather than cramming.";
  } else if (isWritingIntensive) {
    studyStrategy = "Emphasize reading comprehension and critical analysis. Take detailed notes during lectures, participate actively in discussions, and start writing assignments early to allow for multiple drafts.";
  } else {
    studyStrategy = "Balance reading, note-taking, and active participation. Create study schedules, use active recall techniques, and engage with course materials through discussion and practice.";
  }
  
  // Generate professor insights
  const professorInsights = `Based on the syllabus structure and communication style, this instructor appears ${
    text.length > 2000 ? 'very detailed and organized' : 'concise and focused'
  }. ${
    instructorInfo.officeHours !== 'Office hours not found' ? 
    'Office hours are clearly specified - take advantage of them for clarification and deeper understanding.' :
    'Make sure to ask about office hours and availability for questions.'
  }`;
  
  // Generate course advice
  let courseAdvice = '';
  if (isLab) {
    courseAdvice = "This course includes lab components, so hands-on practice is crucial. Prepare for labs in advance, take detailed notes during experiments, and understand the theory behind practical work.";
  } else if (hasProjects) {
    courseAdvice = "Project-based course requires excellent time management. Start assignments early, break them into smaller tasks, and seek feedback during the process.";
  } else if (hasGroupWork) {
    courseAdvice = "Group work is a component - establish clear communication with teammates early, set regular meeting times, and define individual responsibilities clearly.";
  } else {
    courseAdvice = "Regular study schedule is key to success. Review material consistently, attend all classes, and don't hesitate to ask questions when concepts are unclear.";
  }
  
  // Extract key topics
  const keyTopics = extractKeyTopics(text, courseName);
  
  // Generate exam tips
  const examTips = generateExamTips(grading, isSTEM, hasProjects);
  
  return {
    studyStrategy,
    professorInsights,
    courseAdvice,
    difficulty,
    workload,
    keyTopics,
    examTips
  };
}

function extractKeyTopics(text: string, courseName: string): string[] {
  const topics: string[] = [];
  
  // Look for topic lists, chapters, or modules
  const topicPatterns = [
    /(?:topics?|chapters?|modules?|units?)[:\s]*([A-Za-z\s,\.\-\n]+?)(?:\n\n|grading|textbook|schedule)/gi,
    /(?:covers?|includes?|studies?)[:\s]*([A-Za-z\s,\.\-\n]+?)(?:\n\n|prerequisite|textbook)/gi
  ];
  
  for (const pattern of topicPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const topicText = match[1];
      const extractedTopics = topicText.split(/[,\.\n]/)
        .map(t => t.trim())
        .filter(t => t.length > 5 && t.length < 50)
        .slice(0, 8);
      topics.push(...extractedTopics);
    }
  }
  
  // If no topics found, generate based on course name
  if (topics.length === 0) {
    if (/calculus/i.test(courseName)) {
      topics.push('Limits and Continuity', 'Derivatives', 'Integrals', 'Applications');
    } else if (/physics/i.test(courseName)) {
      topics.push('Mechanics', 'Thermodynamics', 'Waves', 'Electricity');
    } else if (/computer|programming/i.test(courseName)) {
      topics.push('Programming Fundamentals', 'Data Structures', 'Algorithms', 'Problem Solving');
    } else if (/chemistry/i.test(courseName)) {
      topics.push('Atomic Structure', 'Chemical Bonding', 'Reactions', 'Thermodynamics');
    } else {
      topics.push('Fundamental Concepts', 'Core Principles', 'Applications', 'Analysis');
    }
  }
  
  return topics.slice(0, 6);
}

function generateExamTips(grading: any[], isSTEM: boolean, hasProjects: boolean): string {
  const hasExams = grading.some(g => /exam|test/i.test(g.component));
  const examWeight = grading.filter(g => /exam|test/i.test(g.component))
    .reduce((sum, g) => sum + g.percentage, 0);
  
  if (!hasExams) {
    return "No traditional exams - focus on consistent performance in assignments and projects throughout the semester.";
  }
  
  if (examWeight > 60) {
    return `Exams are heavily weighted (${examWeight}%). ${isSTEM ? 
      'Practice problems extensively and understand underlying concepts rather than memorizing formulas.' :
      'Focus on understanding key concepts and practice applying them to different scenarios.'
    }`;
  } else {
    return `Balanced assessment approach. ${isSTEM ?
      'Combine regular problem practice with consistent assignment work.' :
      'Maintain steady performance across all components - no single assessment dominates.'
    }`;
  }
}

function generateComprehensiveResources(courseCode: string, universityId: string, courseName: string) {
  const subject = courseCode.replace(/\d+/g, '').trim().toUpperCase();
  
  const clubMap: { [key: string]: string[] } = {
    'ECE': ['IEEE Student Branch', 'Engineering Society', 'Robotics Team', 'Electronics Club'],
    'CSC': ['Computer Science Student Union', 'Hackathon Club', 'AI/ML Society', 'Programming Club'],
    'MAT': ['Mathematics Society', 'Statistics Club', 'Actuarial Science Club', 'Math Tutoring'],
    'PHY': ['Physics Club', 'Astronomy Society', 'Science Olympiad', 'Research Society'],
    'CHE': ['Chemistry Club', 'Pre-Med Society', 'Science Students Association', 'Lab Safety Committee'],
    'BIO': ['Biology Students Union', 'Pre-Health Society', 'Research Club', 'Environmental Society'],
    'ENG': ['English Society', 'Writing Center', 'Literary Magazine', 'Debate Club'],
    'PSY': ['Psychology Society', 'Research Volunteers', 'Mental Health Awareness', 'Peer Support'],
    'ECO': ['Economics Society', 'Investment Club', 'Policy Debate', 'Business Society']
  };
  
  const youtubeMap: { [key: string]: string[] } = {
    'ECE': ['ElectroBOOM', 'EEVblog', 'Khan Academy Circuits', 'MIT OpenCourseWare'],
    'CSC': ['CS50', 'Computerphile', 'MIT OpenCourseWare', 'FreeCodeCamp'],
    'MAT': ['Khan Academy Math', 'Professor Leonard', '3Blue1Brown', 'PatrickJMT'],
    'PHY': ['MinutePhysics', 'Physics Girl', 'MIT Physics', 'Khan Academy Physics'],
    'CHE': ['Crash Course Chemistry', 'Khan Academy Chemistry', 'NileRed', 'Professor Dave'],
    'BIO': ['Crash Course Biology', 'Khan Academy Biology', 'Amoeba Sisters', 'Bozeman Science'],
    'ENG': ['Crash Course Literature', 'TED-Ed', 'The Art of Poetry', 'Writing Advice'],
    'PSY': ['Crash Course Psychology', 'Khan Academy Psychology', 'TED Psychology', 'Research Methods'],
    'ECO': ['Khan Academy Economics', 'Crash Course Economics', 'Marginal Revolution', 'EconTalk']
  };
  
  const onlineResourcesMap: { [key: string]: string[] } = {
    'ECE': ['Circuit Simulator (Falstad)', 'IEEE Xplore Digital Library', 'Electronics Tutorials', 'SPICE Simulation'],
    'CSC': ['LeetCode', 'HackerRank', 'GitHub Student Pack', 'Stack Overflow'],
    'MAT': ['Wolfram Alpha', 'Desmos Graphing', 'Khan Academy', 'MIT OpenCourseWare'],
    'PHY': ['PhET Simulations', 'Wolfram Physics', 'HyperPhysics', 'Physics Classroom'],
    'CHE': ['ChemSketch', 'PubChem Database', 'Chemical Safety Database', 'Molecular Modeling'],
    'BIO': ['NCBI Database', 'Khan Academy Biology', 'BioInteractive', 'Protein Data Bank'],
    'ENG': ['Purdue OWL', 'Grammarly', 'Project Gutenberg', 'MLA Style Guide'],
    'PSY': ['APA Style Guide', 'PsycINFO Database', 'Research Methods Resources', 'Statistical Software'],
    'ECO': ['FRED Economic Data', 'World Bank Data', 'IMF Resources', 'Economic Research Papers']
  };
  
  return {
    clubs: clubMap[subject] || ['Student Academic Society', 'Study Groups', 'Peer Tutoring', 'Academic Support'],
    youtubeChannels: youtubeMap[subject] || ['Khan Academy', 'Crash Course', 'MIT OpenCourseWare', 'TED-Ed'],
    studyGroups: [
      `${courseCode} Study Group - Discord`,
      `${subject} Tutoring Center`,
      'Peer Study Sessions',
      'Online Study Communities'
    ],
    onlineResources: onlineResourcesMap[subject] || ['Course Website', 'Library Databases', 'Academic Search Engines', 'Study Guides']
  };
}