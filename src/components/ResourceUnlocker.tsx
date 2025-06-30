import React, { useState } from 'react';
import { Unlock, ExternalLink, Star, Users, Calendar, BookOpen, Laptop, GraduationCap, Percent, Gift, DollarSign } from 'lucide-react';
import { useUniversity } from '../contexts/UniversityContext';
import { StudentDiscounts } from './StudentDiscounts';

interface SoftwareResource {
  id: string;
  name: string;
  description: string;
  category: 'software' | 'learning' | 'research' | 'career' | 'library' | 'discounts';
  cost: 'free' | 'discounted' | 'premium';
  platforms: string[];
  url: string;
  popularity: number; // 1-5 stars
  studentUsage: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export const ResourceUnlocker: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'software' | 'discounts'>('software');

  const categories = [
    { key: 'all', label: 'All Resources', icon: '🔓', color: 'bg-purple-500' },
    { key: 'software', label: 'Free Software', icon: '💻', color: 'bg-blue-500' },
    { key: 'learning', label: 'Learning Platforms', icon: '📚', color: 'bg-green-500' },
    { key: 'research', label: 'Research Tools', icon: '🔬', color: 'bg-indigo-500' },
    { key: 'career', label: 'Career Services', icon: '💼', color: 'bg-orange-500' },
    { key: 'library', label: 'Library Resources', icon: '📖', color: 'bg-red-500' }
  ];

  const tabs = [
    { key: 'software', label: 'Free Software & Tools', icon: Laptop, description: 'Professional software & platforms' },
    { key: 'discounts', label: 'Student Discounts', icon: Percent, description: 'Exclusive deals & perks' }
  ];

  // University-specific resources with accurate information
  const universityResources: { [key: string]: SoftwareResource[] } = {
    uoft: [
      // Professional Software
      {
        id: 'uoft-adobe-cc',
        name: 'Adobe Creative Cloud All Apps',
        description: 'Complete Adobe suite including Photoshop, Illustrator, Premiere Pro, After Effects, and more',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.adobe.com/ca/creativecloud/plans.html',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-matlab',
        name: 'MATLAB Campus License',
        description: 'Complete MATLAB suite with all toolboxes for mathematical computation and engineering',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac', 'Linux', 'Mobile'],
        url: 'https://www.mathworks.com/academia/tah-portal/university-of-toronto-31487956.html',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-office365',
        name: 'Microsoft 365 Apps for Enterprise',
        description: 'Complete Office suite with Teams, OneDrive (5TB), and premium features',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac', 'Mobile', 'Web'],
        url: 'https://www.microsoft.com/en-ca/education/products/office',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-autocad',
        name: 'AutoCAD/AutoDesk Suite',
        description: 'Professional CAD software for engineering and design students',
        category: 'software',
        cost: 'free',
        platforms: ['Windows'],
        url: 'https://www.autodesk.com/education/edu-software/overview',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-chatgpt-edu',
        name: 'ChatGPT Edu',
        description: 'Educational version of ChatGPT with enhanced features for academic use',
        category: 'software',
        cost: 'premium',
        platforms: ['Web', 'Windows', 'Mac', 'Mobile'],
        url: 'https://openai.com/chatgpt/education/',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-chemdraw',
        name: 'ChemDraw Professional',
        description: 'Chemical structure drawing and analysis software',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://revvitysignals.com/products/research/chemdraw',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-endnote',
        name: 'EndNote Basic',
        description: 'Reference management and bibliography creation tool',
        category: 'research',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://endnote.com/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-esri-arcgis',
        name: 'ESRI ArcGIS Desktop',
        description: 'Professional GIS software for mapping and spatial analysis',
        category: 'software',
        cost: 'free',
        platforms: ['Windows'],
        url: 'https://www.esri.com/en-us/arcgis/products/arcgis-for-student-use',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-lucidchart',
        name: 'Lucidchart Professional',
        description: 'Professional diagramming and flowchart creation tool',
        category: 'software',
        cost: 'premium',
        platforms: ['Web'],
        url: 'https://www.lucidchart.com/pages/usecase/education',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-mathematica',
        name: 'Mathematica for Students',
        description: 'Advanced mathematical computation and symbolic programming',
        category: 'software',
        cost: 'premium',
        platforms: ['Windows', 'Mac', 'Linux'],
        url: 'https://www.wolfram.com/mathematica/pricing/students/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-azure-dev',
        name: 'Microsoft Azure Dev Tools',
        description: 'Development tools and software for computer science students',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://azure.microsoft.com/en-us/products/dev-tools-for-teaching/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-nvivo',
        name: 'NVivo Qualitative Analysis',
        description: 'Qualitative data analysis software for research',
        category: 'research',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.qsrinternational.com/nvivo-qualitative-data-analysis-software/home',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-sas',
        name: 'SAS Statistical Software',
        description: 'Professional statistical analysis and data management',
        category: 'software',
        cost: 'premium',
        platforms: ['Windows'],
        url: 'https://www.sas.com/en_ca/software/university-edition.html',
        popularity: 3,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-spss',
        name: 'IBM SPSS Statistics',
        description: 'Statistical analysis software for research and data science',
        category: 'software',
        cost: 'premium',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.ibm.com/products/spss-statistics',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-stata',
        name: 'Stata Statistical Software',
        description: 'Complete statistical software package for data analysis',
        category: 'software',
        cost: 'premium',
        platforms: ['Windows', 'Mac', 'Unix'],
        url: 'https://www.stata.com/',
        popularity: 3,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-snagit',
        name: 'TechSmith Snagit',
        description: 'Screen capture and image editing software',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac', 'Mobile'],
        url: 'https://www.techsmith.com/screen-capture.html',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      // Learning Platforms
      {
        id: 'uoft-coursera',
        name: 'Coursera for Campus',
        description: 'Free access to thousands of courses from top universities and companies',
        category: 'learning',
        cost: 'free',
        platforms: ['Web', 'Mobile'],
        url: 'https://www.coursera.org/campus/university-of-toronto',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-linkedin-learning',
        name: 'LinkedIn Learning',
        description: 'Professional development courses and skill building',
        category: 'learning',
        cost: 'free',
        platforms: ['Web', 'Mobile'],
        url: 'https://www.linkedin.com/learning/',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      // Library Resources
      {
        id: 'uoft-robarts-library',
        name: 'Robarts Research Library',
        description: 'Main research library with 14 floors and 24/7 access during exams',
        category: 'library',
        cost: 'free',
        platforms: ['Physical', 'Digital'],
        url: 'https://onesearch.library.utoronto.ca/',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'uoft-digital-collections',
        name: 'UofT Digital Collections',
        description: 'Access to millions of digital books, journals, and research databases',
        category: 'library',
        cost: 'free',
        platforms: ['Web'],
        url: 'https://collections.library.utoronto.ca/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      // Career Services
      {
        id: 'uoft-career-exploration',
        name: 'Career Exploration & Education',
        description: 'Career counseling, job search support, and networking events',
        category: 'career',
        cost: 'free',
        platforms: ['In-person', 'Virtual'],
        url: 'https://www.studentlife.utoronto.ca/cc',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      }
    ],
    waterloo: [
      // Software from the provided list
      {
        id: 'waterloo-office365',
        name: 'Microsoft 365 Applications',
        description: 'Excel, Word, PowerPoint, OneNote, SharePoint, Access, Outlook, Visio and Skype for Business + 5TB OneDrive',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac', 'Mobile', 'Web'],
        url: 'https://uwaterloo.ca/information-systems-technology/services/microsoft-office-365-education',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-windows10',
        name: 'Microsoft Windows 10 Education',
        description: 'Windows 10 and Windows 11 Education licence via Microsoft Azure Education Hub',
        category: 'software',
        cost: 'free',
        platforms: ['Windows'],
        url: 'https://portal.azure.com/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-adobe-cc',
        name: 'Adobe Creative Suite',
        description: 'Professional creative software suite available through WStore',
        category: 'software',
        cost: 'discounted',
        platforms: ['Windows', 'Mac'],
        url: 'https://wstore.uwaterloo.ca/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-arcgis',
        name: 'ArcGIS (Esri)',
        description: 'GIS software for teaching, learning and research purposes',
        category: 'software',
        cost: 'free',
        platforms: ['Windows'],
        url: 'https://uwaterloo.ca/information-systems-technology/services/software-students/accessing-esri-arcgis-software',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-autodesk',
        name: 'Autodesk Suite',
        description: 'Free download of Autodesk software for students',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.autodesk.com/education/edu-software/overview',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-maple',
        name: 'Maple Mathematical Software',
        description: 'Advanced mathematical computation software',
        category: 'software',
        cost: 'discounted',
        platforms: ['Windows', 'Mac', 'Linux'],
        url: 'https://wstore.uwaterloo.ca/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-matlab',
        name: 'MATLAB Campus License',
        description: 'Available for download or use online through campus license',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac', 'Linux', 'Web'],
        url: 'https://uwaterloo.ca/information-systems-technology/services/software-students/matlab',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-nvivo',
        name: 'NVivo Qualitative Analysis',
        description: 'Qualitative data analysis for teaching, learning and research',
        category: 'research',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://uwaterloo.ca/information-systems-technology/services/software-students/nvivo',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-sas',
        name: 'SAS Statistical Software',
        description: 'Free service from SAS (student account required)',
        category: 'software',
        cost: 'free',
        platforms: ['Web'],
        url: 'https://www.sas.com/en_ca/software/on-demand-for-academics.html',
        popularity: 3,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-spss',
        name: 'IBM SPSS Statistics',
        description: 'Statistical analysis software (student number required for purchase)',
        category: 'software',
        cost: 'discounted',
        platforms: ['Windows', 'Mac'],
        url: 'https://uwaterloo.myshopify.com/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      // Learning Platforms
      {
        id: 'waterloo-linkedin-learning',
        name: 'LinkedIn Learning',
        description: 'Free video courses with certificates for LinkedIn Profile',
        category: 'learning',
        cost: 'free',
        platforms: ['Web', 'Mobile'],
        url: 'https://uwaterloo.ca/information-systems-technology/services/linkedin-learning',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      // Tools
      {
        id: 'waterloo-portal',
        name: 'Portal App',
        description: 'View classes, calendars, exam schedules, and more',
        category: 'software',
        cost: 'free',
        platforms: ['Mobile'],
        url: 'https://uwaterloo.ca/portal/',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-duo-2fa',
        name: 'DUO 2FA',
        description: 'Protect your accounts from unknown and unwanted log ins',
        category: 'software',
        cost: 'free',
        platforms: ['Mobile', 'Web'],
        url: 'https://uwaterloo.ca/information-systems-technology/services/duo-two-factor-authentication',
        popularity: 4,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'waterloo-watsafe',
        name: 'WatSAFE',
        description: 'Get important safety alerts and instant access to campus safety resources',
        category: 'software',
        cost: 'free',
        platforms: ['Mobile'],
        url: 'https://uwaterloo.ca/safety-office/watsafe-app',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      }
    ],
    queens: [
      // Software from the provided list
      {
        id: 'queens-adobe-acrobat',
        name: 'Adobe Acrobat Pro DC',
        description: 'Professional PDF creation and editing software',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-adobe-cc',
        name: 'Adobe Creative Cloud - All Apps',
        description: 'Complete Adobe Creative suite for design and multimedia',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-adobe-express',
        name: 'Adobe Express',
        description: 'Quick design tool for presentations and social media',
        category: 'software',
        cost: 'free',
        platforms: ['Web', 'iOS', 'Android'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-arcgis',
        name: 'ArcGIS Desktop',
        description: 'Professional GIS and mapping software',
        category: 'software',
        cost: 'free',
        platforms: ['Windows'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-articulate360',
        name: 'Articulate 360 Suite',
        description: 'E-learning content creation and development tools',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-camtasia',
        name: 'Camtasia Screen Recording',
        description: 'Professional screen recording and video editing software',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-endnote',
        name: 'EndNote Reference Manager',
        description: 'Professional bibliography and reference management',
        category: 'research',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-maple',
        name: 'Maple Mathematical Software',
        description: 'Advanced mathematical modeling and computation',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-matlab',
        name: 'MATLAB with 48 Toolboxes',
        description: 'Complete mathematical computation suite',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-office365',
        name: 'Microsoft 365 Apps for Enterprise',
        description: 'Complete Office suite with Teams and OneDrive',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac', 'Mobile'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-azure-dev',
        name: 'Microsoft Azure Dev Tools for Teaching',
        description: 'Development software and tools for computer science',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-minecraft-edu',
        name: 'Minecraft Education Edition',
        description: 'Educational gaming platform for learning',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-nvivo',
        name: 'NVivo Qualitative Analysis',
        description: 'Research data analysis and qualitative research software',
        category: 'research',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 3,
        studentUsage: 'low',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-overleaf',
        name: 'Overleaf LaTeX Editor',
        description: 'Collaborative academic writing and LaTeX editing platform',
        category: 'software',
        cost: 'free',
        platforms: ['Web'],
        url: 'https://www.overleaf.com/edu/queensu',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-sas',
        name: 'SAS Statistical Software',
        description: 'Professional statistical analysis and data management',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Unix'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 3,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-snagit',
        name: 'TechSmith Snagit',
        description: 'Screen capture and image editing software',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-spss',
        name: 'IBM SPSS Statistics',
        description: 'Statistical analysis software for research',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-windows10',
        name: 'Windows 10 Education',
        description: 'Free Windows operating system for students',
        category: 'software',
        cost: 'free',
        platforms: ['Windows'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'queens-zoom',
        name: 'Zoom Pro Video Conferencing',
        description: 'Professional video meetings and webinars',
        category: 'software',
        cost: 'free',
        platforms: ['Windows', 'Mac', 'Mobile'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      // Learning Platforms
      {
        id: 'queens-linkedin-learning',
        name: 'LinkedIn Learning',
        description: 'Professional development courses and skill building',
        category: 'learning',
        cost: 'free',
        platforms: ['Web', 'Mobile'],
        url: 'https://www.queensu.ca/its/software-centre',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      // Library Resources
      {
        id: 'queens-stauffer-library',
        name: 'Stauffer Library Resources',
        description: 'Research databases, study spaces, and academic support',
        category: 'library',
        cost: 'free',
        platforms: ['Physical', 'Digital'],
        url: 'https://library.queensu.ca/',
        popularity: 5,
        studentUsage: 'high',
        lastUpdated: '2024-01-15'
      },
      // Career Services
      {
        id: 'queens-career-services',
        name: 'Career Services Portal',
        description: 'Job search, career counseling, and professional development',
        category: 'career',
        cost: 'free',
        platforms: ['Web', 'In-person'],
        url: 'https://careers.queensu.ca/',
        popularity: 4,
        studentUsage: 'medium',
        lastUpdated: '2024-01-15'
      }
    ]
  };

  const currentResources = selectedUniversity ? universityResources[selectedUniversity.id] || [] : [];

  const filteredResources = currentResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getCostBadge = (cost: string) => {
    switch (cost) {
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'discounted':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsageBadge = (usage: string) => {
    switch (usage) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!selectedUniversity) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Free & Discounted Resources</h3>
          <p className="text-gray-600">Select your university to unlock free software and exclusive student discounts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <DollarSign className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Free & Discounted Resources</h3>
          <p className="text-sm text-gray-600">Free software & exclusive discounts for {selectedUniversity.shortName} students</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <div className="text-left">
                <div>{tab.label}</div>
                <div className={`text-xs ${activeTab === tab.key ? 'text-blue-500' : 'text-gray-500'}`}>
                  {tab.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeTab === 'software' && (
        <>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCostBadge(resource.cost)}`}>
                        {resource.cost === 'free' ? 'FREE' : resource.cost === 'discounted' ? 'DISCOUNTED' : 'PREMIUM'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getUsageBadge(resource.studentUsage)}`}>
                        {resource.studentUsage} usage
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        {renderStars(resource.popularity)}
                        <span>({resource.popularity}/5)</span>
                      </div>
                      <span>Platforms: {resource.platforms.join(', ')}</span>
                      <span>Updated: {resource.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {resource.studentUsage === 'high' ? 'Very Popular' : 
                       resource.studentUsage === 'medium' ? 'Moderately Used' : 'Specialized Tool'}
                    </span>
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <span>Access Now</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentResources.filter(r => r.cost === 'free').length}
                </div>
                <div className="text-sm text-gray-600">Free Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentResources.filter(r => r.category === 'software').length}
                </div>
                <div className="text-sm text-gray-600">Software Apps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {currentResources.filter(r => r.studentUsage === 'high').length}
                </div>
                <div className="text-sm text-gray-600">Popular Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {currentResources.filter(r => r.category === 'learning').length}
                </div>
                <div className="text-sm text-gray-600">Learning Platforms</div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'discounts' && (
        <StudentDiscounts />
      )}

      {/* University-specific note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="flex items-center space-x-2 mb-2">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: selectedUniversity.colors.primary }}
          ></div>
          <span className="font-medium text-gray-900">{selectedUniversity.shortName} Exclusive Access</span>
        </div>
        <p className="text-sm text-gray-600">
          These resources are exclusively available to {selectedUniversity.name} students. 
          Access requires valid student credentials and may need verification through your university email or student ID.
        </p>
      </div>
    </div>
  );
};