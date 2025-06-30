import { Location, Resource, DailyTip, Tip, University, StudyBuddy, BusyTime } from '../types';

export const mockUniversities: University[] = [
  // Canadian Universities
  {
    id: 'uoft',
    name: 'University of Toronto',
    shortName: 'UofT',
    country: 'Canada',
    province: 'Ontario',
    city: 'Toronto',
    coordinates: [43.6629, -79.3957],
    timezone: 'America/Toronto',
    website: 'https://www.utoronto.ca',
    colors: {
      primary: '#003A79',
      secondary: '#0077C8'
    }
  },
  {
    id: 'ubc',
    name: 'University of British Columbia',
    shortName: 'UBC',
    country: 'Canada',
    province: 'British Columbia',
    city: 'Vancouver',
    coordinates: [49.2606, -123.2460],
    timezone: 'America/Vancouver',
    website: 'https://www.ubc.ca',
    colors: {
      primary: '#002145',
      secondary: '#0055B7'
    }
  },
  {
    id: 'mcgill',
    name: 'McGill University',
    shortName: 'McGill',
    country: 'Canada',
    province: 'Quebec',
    city: 'Montreal',
    coordinates: [45.5048, -73.5772],
    timezone: 'America/Montreal',
    website: 'https://www.mcgill.ca',
    colors: {
      primary: '#ED1B2F',
      secondary: '#FFD700'
    }
  },
  {
    id: 'waterloo',
    name: 'University of Waterloo',
    shortName: 'Waterloo',
    country: 'Canada',
    province: 'Ontario',
    city: 'Waterloo',
    coordinates: [43.4723, -80.5449],
    timezone: 'America/Toronto',
    website: 'https://uwaterloo.ca',
    colors: {
      primary: '#FFD100',
      secondary: '#000000'
    }
  },
  {
    id: 'queens',
    name: 'Queen\'s University',
    shortName: 'Queen\'s',
    country: 'Canada',
    province: 'Ontario',
    city: 'Kingston',
    coordinates: [44.2253, -76.4951],
    timezone: 'America/Toronto',
    website: 'https://www.queensu.ca',
    colors: {
      primary: '#041E42',
      secondary: '#B90E32'
    }
  },
  {
    id: 'sfu',
    name: 'Simon Fraser University',
    shortName: 'SFU',
    country: 'Canada',
    province: 'British Columbia',
    city: 'Burnaby',
    coordinates: [49.2781, -122.9199],
    timezone: 'America/Vancouver',
    website: 'https://www.sfu.ca',
    colors: {
      primary: '#A6192E',
      secondary: '#FFB300'
    }
  },

  // US Universities
  {
    id: 'harvard',
    name: 'Harvard University',
    shortName: 'Harvard',
    country: 'United States',
    state: 'Massachusetts',
    city: 'Cambridge',
    coordinates: [42.3744, -71.1169],
    timezone: 'America/New_York',
    website: 'https://www.harvard.edu',
    colors: {
      primary: '#A51C30',
      secondary: '#FFFFFF'
    }
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    country: 'United States',
    state: 'Massachusetts',
    city: 'Cambridge',
    coordinates: [42.3601, -71.0942],
    timezone: 'America/New_York',
    website: 'https://web.mit.edu',
    colors: {
      primary: '#750014',
      secondary: '#8A8B8C'
    }
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    shortName: 'Stanford',
    country: 'United States',
    state: 'California',
    city: 'Stanford',
    coordinates: [37.4275, -122.1697],
    timezone: 'America/Los_Angeles',
    website: 'https://www.stanford.edu',
    colors: {
      primary: '#8C1515',
      secondary: '#DAA900'
    }
  },
  {
    id: 'berkeley',
    name: 'University of California, Berkeley',
    shortName: 'UC Berkeley',
    country: 'United States',
    state: 'California',
    city: 'Berkeley',
    coordinates: [37.8719, -122.2585],
    timezone: 'America/Los_Angeles',
    website: 'https://www.berkeley.edu',
    colors: {
      primary: '#003262',
      secondary: '#FDB515'
    }
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    shortName: 'U-M',
    country: 'United States',
    state: 'Michigan',
    city: 'Ann Arbor',
    coordinates: [42.2780, -83.7382],
    timezone: 'America/Detroit',
    website: 'https://umich.edu',
    colors: {
      primary: '#00274C',
      secondary: '#FFCB05'
    }
  },
  {
    id: 'nyu',
    name: 'New York University',
    shortName: 'NYU',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    coordinates: [40.7295, -73.9965],
    timezone: 'America/New_York',
    website: 'https://www.nyu.edu',
    colors: {
      primary: '#57068C',
      secondary: '#FFFFFF'
    }
  }
];

// Real university-specific data with comprehensive design teams and clubs
const universitySpecificData = {
  uoft: {
    libraries: [
      { name: 'Robarts Library', description: 'Main research library with 14 floors of study space', features: ['24/7 Access', 'Silent Study', 'Group Rooms', 'Computers', 'Research Collections'] },
      { name: 'Gerstein Science Information Centre', description: 'Science and health sciences library', features: ['Science Collections', 'Study Spaces', 'Computer Labs', 'Group Study'] },
      { name: 'Thomas Fisher Rare Book Library', description: 'Special collections and rare books', features: ['Rare Books', 'Archives', 'Reading Room', 'Research Support'] },
      { name: 'Engineering & Computer Science Library', description: 'Specialized library for engineering students', features: ['Engineering Resources', 'Computer Access', 'Study Spaces', 'Technical Support'] },
      { name: 'Trinity College Library', description: 'Historic college library with beautiful reading rooms', features: ['Historic Setting', 'Quiet Study', 'College Collections', 'Reading Rooms'] }
    ],
    dining: [
      { name: 'Sidney Smith Commons', description: 'Large food court with multiple vendors', features: ['Multiple Vendors', 'Seating Area', 'Late Hours', 'Variety'] },
      { name: 'New College Dining Hall', description: 'All-you-can-eat dining hall', features: ['Buffet Style', 'Healthy Options', 'Vegetarian', 'Social Dining'] },
      { name: 'Hart House Great Hall', description: 'Historic dining hall with traditional atmosphere', features: ['Historic Setting', 'Fine Dining', 'Events', 'Traditional'] },
      { name: 'Woodsworth College Café', description: 'Cozy café with coffee and light meals', features: ['Coffee', 'Light Meals', 'Study Space', 'Quiet'] },
      { name: 'Medical Sciences Building Food Court', description: 'Convenient food court for science students', features: ['Quick Service', 'Healthy Options', 'Convenient Location', 'Affordable'] }
    ],
    buildings: [
      { name: 'Bahen Centre for Information Technology', description: 'Modern building housing computer science', features: ['Computer Labs', 'Modern Facilities', 'Study Spaces', 'Tech Support'] },
      { name: 'Sandford Fleming Building', description: 'Engineering building with labs and classrooms', features: ['Engineering Labs', 'Lecture Halls', 'Study Areas', 'Workshop Space'] },
      { name: 'Medical Sciences Building', description: 'Life sciences teaching and research facility', features: ['Science Labs', 'Lecture Theatres', 'Research Facilities', 'Study Spaces'] },
      { name: 'University College', description: 'Historic building with beautiful architecture', features: ['Historic Architecture', 'Classrooms', 'Study Spaces', 'Cultural Heritage'] }
    ],
    recreation: [
      { name: 'Athletic Centre', description: 'Main fitness facility with pools and courts', features: ['Swimming Pool', 'Fitness Equipment', 'Courts', 'Classes'] },
      { name: 'Hart House', description: 'Student center with fitness, dining, and activities', features: ['Fitness Center', 'Pool', 'Squash Courts', 'Social Spaces'] },
      { name: 'Goldring Centre for High Performance Sport', description: 'State-of-the-art athletic facility', features: ['Olympic Facilities', 'Fitness Center', 'Courts', 'Training'] }
    ],
    resources: [
      // UofT Design Teams (from skule.ca)
      { title: 'University of Toronto Aerospace Team (UTAT)', category: 'clubs', description: 'Rocket design and space systems development team' },
      { title: 'UofT Formula Racing', category: 'clubs', description: 'Formula SAE racing car design and competition team' },
      { title: 'UofT Robotics Association (UTRA)', category: 'clubs', description: 'Robotics design and competition teams' },
      { title: 'UofT Solar Car Team', category: 'clubs', description: 'Solar-powered vehicle design and racing team' },
      { title: 'UofT Supermileage Team', category: 'clubs', description: 'Ultra-efficient vehicle design for fuel economy competitions' },
      { title: 'UofT Concrete Canoe Team', category: 'clubs', description: 'Concrete canoe design and racing competitions' },
      { title: 'UofT Seismic Design Team', category: 'clubs', description: 'Earthquake-resistant structure design competitions' },
      { title: 'UofT Steel Bridge Team', category: 'clubs', description: 'Steel bridge design and construction competitions' },
      { title: 'UofT Human Powered Vehicle Team', category: 'clubs', description: 'Human-powered vehicle design and racing' },
      { title: 'UofT Baja SAE', category: 'clubs', description: 'Off-road vehicle design and competition team' },
      { title: 'UofT Aero Design', category: 'clubs', description: 'Radio-controlled aircraft design competitions' },
      { title: 'UofT Chem-E-Car', category: 'clubs', description: 'Chemical engineering car design team' },
      { title: 'UofT Concrete Toboggan', category: 'clubs', description: 'Concrete toboggan design and racing team' },
      { title: 'UofT Mining Team', category: 'clubs', description: 'Mining engineering competition team' },
      { title: 'UofT Sumobot', category: 'clubs', description: 'Sumo robot design and competition team' },
      
      // Academic and Professional Clubs
      { title: 'Engineering Society (EngSoc)', category: 'clubs', description: 'Main student government for engineering students' },
      { title: 'Computer Science Student Union (CSSU)', category: 'clubs', description: 'Student union for computer science students' },
      { title: 'UofT IEEE Student Branch', category: 'clubs', description: 'Institute of Electrical and Electronics Engineers student chapter' },
      { title: 'Women in Science and Engineering (WISE)', category: 'clubs', description: 'Supporting women in STEM fields' },
      { title: 'National Society of Black Engineers (NSBE)', category: 'clubs', description: 'Supporting Black engineers and STEM students' },
      { title: 'UofT Entrepreneurship Association', category: 'clubs', description: 'Student entrepreneurship and startup community' },
      
      // Academic Resources
      { title: 'UofT Academic Success Centre', category: 'academic', description: 'Academic support and study skills workshops' },
      { title: 'Career Exploration & Education', category: 'internships', description: 'Career services and job placement support' },
      { title: 'Health & Wellness Centre', category: 'mental-health', description: 'Mental health and wellness services' },
      { title: 'UofT Student Life', category: 'social', description: 'Student organizations and campus events' },
      { title: 'Financial Aid & Awards Office', category: 'financial', description: 'Scholarships, bursaries, and financial assistance' }
    ]
  },
  waterloo: {
    libraries: [
      { name: 'Dana Porter Library', description: 'Main library with extensive study facilities', features: ['Research Collections', 'Study Spaces', 'Group Rooms', '24/7 Access'] },
      { name: 'Davis Centre Library', description: 'Mathematics and computer science library', features: ['Math/CS Collections', 'Computer Labs', 'Study Areas', 'Research Support'] },
      { name: 'Engineering Library', description: 'Specialized engineering resources', features: ['Engineering Collections', 'Study Spaces', 'Technical Support', 'Research Materials'] }
    ],
    dining: [
      { name: 'Bomber Food Court', description: 'Large food court in the student life centre', features: ['Multiple Vendors', 'Social Space', 'Late Hours', 'Variety'] },
      { name: 'V1 Cafeteria', description: 'Residence dining hall', features: ['All-You-Can-Eat', 'Meal Plans', 'Healthy Options', 'Social Dining'] },
      { name: 'Tim Hortons (Multiple)', description: 'Several campus locations', features: ['Coffee', 'Quick Service', 'Study Space', 'Convenient'] },
      { name: 'Subway (SLC)', description: 'Sandwich shop in student center', features: ['Quick Service', 'Healthy Options', 'Customizable', 'Convenient'] }
    ],
    buildings: [
      { name: 'Davis Centre', description: 'Computer science and mathematics building', features: ['Computer Labs', 'Study Spaces', 'Research Facilities', 'Modern Technology'] },
      { name: 'Engineering 7', description: 'Main engineering building', features: ['Engineering Labs', 'Lecture Halls', 'Study Areas', 'Workshop Space'] },
      { name: 'Mathematics 3', description: 'Mathematics and statistics facility', features: ['Lecture Halls', 'Study Spaces', 'Computer Labs', 'Math Support'] }
    ],
    recreation: [
      { name: 'Physical Activities Complex (PAC)', description: 'Main fitness and recreation facility', features: ['Fitness Center', 'Pool', 'Courts', 'Classes'] },
      { name: 'Columbia Ice Field', description: 'Ice rink for hockey and skating', features: ['Ice Hockey', 'Figure Skating', 'Public Skating', 'Lessons'] }
    ],
    resources: [
      // Waterloo Design Teams
      { title: 'Waterloo Rocketry', category: 'clubs', description: 'Rocket design and high-powered rocketry team' },
      { title: 'UW Formula Motorsports', category: 'clubs', description: 'Formula SAE electric and combustion racing teams' },
      { title: 'Waterloo Aerial Robotics Group (WARG)', category: 'clubs', description: 'Autonomous drone and UAV development' },
      { title: 'UW Alternative Fuels Team (UWAFT)', category: 'clubs', description: 'Clean energy vehicle design and development' },
      { title: 'Waterloo Baja SAE', category: 'clubs', description: 'Off-road vehicle design and competition' },
      { title: 'UW Solar Car Team', category: 'clubs', description: 'Solar vehicle design and racing' },
      { title: 'Waterloo Concrete Canoe Team', category: 'clubs', description: 'Concrete canoe design and competition' },
      { title: 'UW Steel Bridge Team', category: 'clubs', description: 'Steel bridge design and construction' },
      { title: 'Waterloo Robotics Team', category: 'clubs', description: 'Various robotics competitions and projects' },
      { title: 'UW Chem-E-Car', category: 'clubs', description: 'Chemical engineering powered vehicle team' },
      
      // Tech and Innovation
      { title: 'UW Tech+', category: 'clubs', description: 'Technology and innovation student community' },
      { title: 'Waterloo Data Science Club', category: 'clubs', description: 'Data science projects and competitions' },
      { title: 'UW Fintech', category: 'clubs', description: 'Financial technology and blockchain projects' },
      { title: 'Waterloo AI', category: 'clubs', description: 'Artificial intelligence research and projects' },
      { title: 'UW Cybersecurity Club', category: 'clubs', description: 'Information security and ethical hacking' },
      
      // Academic Resources
      { title: 'Centre for Extended Learning', category: 'academic', description: 'Academic support and online learning' },
      { title: 'WatPD Career Services', category: 'internships', description: 'Co-op and career development' },
      { title: 'Counselling Services', category: 'mental-health', description: 'Mental health and wellness support' },
      { title: 'Student Success Office', category: 'academic', description: 'Academic advising and support' },
      { title: 'Student Financial Services', category: 'financial', description: 'Financial aid and awards' }
    ]
  },
  queens: {
    libraries: [
      { name: 'Douglas Library', description: 'Main library with historic architecture', features: ['Research Collections', 'Study Spaces', 'Historic Setting', 'Group Rooms'] },
      { name: 'Stauffer Library', description: 'Humanities and social sciences library', features: ['Arts Collections', 'Study Areas', 'Research Support', 'Special Collections'] },
      { name: 'Engineering & Science Library', description: 'Technical library for STEM students', features: ['Science Collections', 'Study Spaces', 'Computer Labs', 'Research Support'] }
    ],
    dining: [
      { name: 'Leonard Dining Hall', description: 'Main campus dining facility', features: ['Multiple Stations', 'Healthy Options', 'Social Dining', 'Meal Plans'] },
      { name: 'The Lazy Scholar', description: 'Pub-style restaurant on campus', features: ['Casual Dining', 'Social Space', 'Events', 'Local Favorites'] },
      { name: 'Tim Hortons (JDUC)', description: 'Coffee shop in student center', features: ['Coffee', 'Quick Service', 'Study Space', 'Meeting Point'] }
    ],
    buildings: [
      { name: 'Goodwin Hall', description: 'Engineering and applied science building', features: ['Engineering Labs', 'Lecture Halls', 'Study Areas', 'Research Facilities'] },
      { name: 'Jeffery Hall', description: 'Mathematics and statistics building', features: ['Lecture Halls', 'Study Spaces', 'Computer Labs', 'Math Resources'] }
    ],
    recreation: [
      { name: 'Athletics and Recreation Centre (ARC)', description: 'Main fitness facility', features: ['Fitness Center', 'Pool', 'Courts', 'Classes'] },
      { name: 'Richardson Stadium', description: 'Football stadium and track facility', features: ['Football Field', 'Track', 'Outdoor Sports', 'Events'] }
    ],
    resources: [
      // Queen's Design Teams
      { title: 'Queen\'s Formula SAE', category: 'clubs', description: 'Formula racing car design and competition' },
      { title: 'Queen\'s Baja SAE', category: 'clubs', description: 'Off-road vehicle design team' },
      { title: 'Queen\'s Solar Car Team', category: 'clubs', description: 'Solar-powered vehicle development' },
      { title: 'Queen\'s Concrete Canoe', category: 'clubs', description: 'Concrete canoe design and racing' },
      { title: 'Queen\'s Steel Bridge', category: 'clubs', description: 'Steel bridge construction competition' },
      { title: 'Queen\'s Robotics Team', category: 'clubs', description: 'Robotics design and competitions' },
      { title: 'Queen\'s Aero Design Team', category: 'clubs', description: 'Aircraft design competitions' },
      { title: 'Queen\'s Mining Team', category: 'clubs', description: 'Mining engineering competitions' },
      { title: 'Queen\'s Chem-E-Car', category: 'clubs', description: 'Chemical engineering car team' },
      
      // Professional and Academic
      { title: 'Engineering Society (EngSoc)', category: 'clubs', description: 'Engineering student government' },
      { title: 'Queen\'s IEEE Student Branch', category: 'clubs', description: 'Electrical engineering professional society' },
      { title: 'Women in Engineering (WiE)', category: 'clubs', description: 'Supporting women in engineering' },
      { title: 'Queen\'s Entrepreneurship Association', category: 'clubs', description: 'Student startup and business community' },
      
      // Academic Resources
      { title: 'Student Academic Success Services', category: 'academic', description: 'Academic support and tutoring' },
      { title: 'Career Services', category: 'internships', description: 'Career counseling and job search' },
      { title: 'Counselling Services', category: 'mental-health', description: 'Mental health and wellness support' },
      { title: 'Student Life', category: 'social', description: 'Student activities and leadership' },
      { title: 'Student Awards Office', category: 'financial', description: 'Financial aid and scholarships' }
    ]
  },
  ubc: {
    libraries: [
      { name: 'Walter C. Koerner Library', description: 'Main library with extensive collections', features: ['Research Collections', 'Study Spaces', 'Group Rooms', 'Computer Access'] },
      { name: 'Irving K. Barber Learning Centre', description: 'Modern learning facility with collaborative spaces', features: ['Collaborative Learning', 'Technology', 'Flexible Spaces', 'Research Support'] },
      { name: 'Woodward Library', description: 'Biomedical branch library', features: ['Health Sciences', 'Study Spaces', 'Research Support', 'Specialized Collections'] },
      { name: 'Engineering & Computer Science Library', description: 'Technical library for STEM students', features: ['Engineering Resources', 'Computer Labs', 'Study Areas', 'Technical Support'] }
    ],
    dining: [
      { name: 'The Nest Food Court', description: 'Large food court in the student union building', features: ['Multiple Vendors', 'Social Space', 'Late Hours', 'Variety'] },
      { name: 'Totem Park Dining Hall', description: 'Residence dining hall with meal plans', features: ['All-You-Can-Eat', 'Healthy Options', 'Social Dining', 'Meal Plans'] },
      { name: 'Sage Bistro', description: 'Upscale dining in the Faculty Club', features: ['Fine Dining', 'Local Ingredients', 'Scenic Views', 'Special Events'] },
      { name: 'Tim Hortons (Multiple Locations)', description: 'Canadian coffee chain with campus locations', features: ['Coffee', 'Quick Service', 'Convenient', 'Canadian Classic'] }
    ],
    buildings: [
      { name: 'ICICS (Computer Science)', description: 'Institute for Computing, Information and Cognitive Systems', features: ['Computer Labs', 'Research Facilities', 'Study Spaces', 'Modern Technology'] },
      { name: 'Kaiser Building (Engineering)', description: 'Engineering teaching and research facility', features: ['Engineering Labs', 'Lecture Halls', 'Workshop Space', 'Research Facilities'] },
      { name: 'Life Sciences Centre', description: 'Modern facility for biological sciences', features: ['Science Labs', 'Research Facilities', 'Study Areas', 'Modern Equipment'] }
    ],
    recreation: [
      { name: 'UBC Aquatic Centre', description: 'Olympic-standard aquatic facility', features: ['Olympic Pool', 'Diving Boards', 'Fitness Classes', 'Competitive Training'] },
      { name: 'Student Recreation Centre', description: 'Main fitness facility for students', features: ['Fitness Equipment', 'Courts', 'Classes', 'Climbing Wall'] },
      { name: 'Thunderbird Sports Centre', description: 'Multi-sport facility with various courts', features: ['Basketball Courts', 'Volleyball', 'Badminton', 'Fitness Center'] }
    ],
    resources: [
      // UBC Design Teams
      { title: 'UBC Formula Electric', category: 'clubs', description: 'Electric formula racing car team' },
      { title: 'UBC Baja SAE', category: 'clubs', description: 'Off-road vehicle design and racing' },
      { title: 'UBC Solar Car Team', category: 'clubs', description: 'Solar vehicle design and competition' },
      { title: 'UBC Rocket', category: 'clubs', description: 'Rocket design and high-powered rocketry' },
      { title: 'UBC Sailbot', category: 'clubs', description: 'Autonomous sailing robot development' },
      { title: 'UBC Concrete Canoe', category: 'clubs', description: 'Concrete canoe design team' },
      { title: 'UBC Steel Bridge', category: 'clubs', description: 'Steel bridge construction competition' },
      { title: 'UBC Chem-E-Car', category: 'clubs', description: 'Chemical engineering car team' },
      { title: 'UBC Robotics', category: 'clubs', description: 'Various robotics projects and competitions' },
      { title: 'UBC Aero Design', category: 'clubs', description: 'Aircraft design and competition' },
      
      // Tech and Innovation
      { title: 'UBC Tech Career Fair', category: 'clubs', description: 'Technology career and networking events' },
      { title: 'UBC AI Club', category: 'clubs', description: 'Artificial intelligence and machine learning' },
      { title: 'UBC Blockchain', category: 'clubs', description: 'Blockchain technology and cryptocurrency' },
      { title: 'UBC Game Development Club', category: 'clubs', description: 'Video game design and development' },
      
      // Academic Resources
      { title: 'UBC Learning Commons', category: 'academic', description: 'Academic support and tutoring services' },
      { title: 'UBC Career Services', category: 'internships', description: 'Career counseling and job search support' },
      { title: 'UBC Counselling Services', category: 'mental-health', description: 'Mental health and counseling support' },
      { title: 'UBC Student Life', category: 'social', description: 'Student clubs and campus activities' },
      { title: 'Enrolment Services', category: 'financial', description: 'Financial aid and student awards' }
    ]
  },
  mcgill: {
    libraries: [
      { name: 'McLennan Library', description: 'Main library with extensive study spaces', features: ['Research Collections', 'Study Spaces', 'Group Rooms', 'Computer Labs'] },
      { name: 'Redpath Library', description: 'Science and engineering library', features: ['Science Collections', 'Study Areas', 'Research Support', 'Technical Resources'] },
      { name: 'Schulich Library of Science and Engineering', description: 'Specialized STEM library', features: ['Engineering Resources', 'Computer Access', 'Study Spaces', 'Research Support'] },
      { name: 'Humanities and Social Sciences Library', description: 'Arts and humanities collections', features: ['Humanities Collections', 'Study Spaces', 'Research Support', 'Archives'] }
    ],
    dining: [
      { name: 'Bishop Mountain Hall', description: 'Main dining hall with multiple options', features: ['Multiple Stations', 'Healthy Options', 'Social Dining', 'Meal Plans'] },
      { name: 'Redpath Café', description: 'Coffee shop in the library building', features: ['Coffee', 'Light Meals', 'Study Space', 'Convenient'] },
      { name: 'Thomson House', description: 'Graduate student and faculty dining', features: ['Fine Dining', 'Social Space', 'Events', 'Networking'] },
      { name: 'Tim Hortons (Leacock)', description: 'Popular coffee spot in academic building', features: ['Coffee', 'Quick Service', 'Study Space', 'Convenient'] }
    ],
    buildings: [
      { name: 'Trottier Building', description: 'Engineering and computer science facility', features: ['Computer Labs', 'Engineering Labs', 'Study Spaces', 'Research Facilities'] },
      { name: 'Burnside Hall', description: 'Mathematics and statistics building', features: ['Lecture Halls', 'Study Areas', 'Computer Labs', 'Math Resources'] },
      { name: 'Stewart Biology Building', description: 'Life sciences teaching and research', features: ['Biology Labs', 'Research Facilities', 'Study Spaces', 'Greenhouse'] }
    ],
    recreation: [
      { name: 'Currie Gymnasium', description: 'Main athletic facility with multiple sports', features: ['Fitness Center', 'Courts', 'Pool', 'Classes'] },
      { name: 'McGill Outdoor Recreation', description: 'Outdoor activities and equipment rental', features: ['Equipment Rental', 'Outdoor Trips', 'Adventure Programs', 'Climbing'] }
    ],
    resources: [
      // McGill Design Teams
      { title: 'McGill Formula Electric', category: 'clubs', description: 'Electric formula racing team' },
      { title: 'McGill Baja SAE', category: 'clubs', description: 'Off-road vehicle design team' },
      { title: 'McGill Rocket Team', category: 'clubs', description: 'Rocket design and competition' },
      { title: 'McGill Robotics', category: 'clubs', description: 'Robotics design and competitions' },
      { title: 'McGill Concrete Canoe', category: 'clubs', description: 'Concrete canoe racing team' },
      { title: 'McGill Steel Bridge', category: 'clubs', description: 'Steel bridge construction' },
      { title: 'McGill Chem-E-Car', category: 'clubs', description: 'Chemical engineering car team' },
      { title: 'McGill Aero Design', category: 'clubs', description: 'Aircraft design competition' },
      
      // Professional and Academic
      { title: 'Engineering Undergraduate Society (EUS)', category: 'clubs', description: 'Engineering student government' },
      { title: 'McGill IEEE Student Branch', category: 'clubs', description: 'Electrical engineering society' },
      { title: 'Women in Engineering (WiE)', category: 'clubs', description: 'Supporting women in STEM' },
      { title: 'McGill Entrepreneurs', category: 'clubs', description: 'Student entrepreneurship community' },
      
      // Academic Resources
      { title: 'McGill Learning Services', category: 'academic', description: 'Academic support and study skills' },
      { title: 'Career Planning Service', category: 'internships', description: 'Career counseling and job placement' },
      { title: 'McGill Counselling Service', category: 'mental-health', description: 'Mental health and wellness support' },
      { title: 'Student Life and Learning', category: 'social', description: 'Student activities and leadership' },
      { title: 'Scholarships and Student Aid', category: 'financial', description: 'Financial assistance and awards' }
    ]
  },
  harvard: {
    libraries: [
      { name: 'Widener Library', description: 'Iconic main library with vast collections', features: ['Historic Architecture', 'Research Collections', 'Study Spaces', 'Special Collections'] },
      { name: 'Lamont Library', description: 'Undergraduate library with modern facilities', features: ['Undergraduate Focus', 'Study Spaces', 'Computer Labs', 'Group Rooms'] },
      { name: 'Cabot Science Library', description: 'Science and engineering library', features: ['Science Collections', 'Study Areas', 'Research Support', 'Technology'] }
    ],
    dining: [
      { name: 'Annenberg Hall', description: 'Freshman dining hall with Harry Potter-like atmosphere', features: ['Historic Setting', 'Freshman Dining', 'Social Space', 'Traditional'] },
      { name: 'Harvard Square Restaurants', description: 'Numerous dining options in Harvard Square', features: ['Variety', 'Local Culture', 'Walking Distance', 'All Budgets'] }
    ],
    buildings: [
      { name: 'Maxwell Dworkin', description: 'Computer science and engineering building', features: ['Computer Labs', 'Research Facilities', 'Study Spaces', 'Modern Technology'] },
      { name: 'Harvard Hall', description: 'Historic academic building', features: ['Historic Architecture', 'Lecture Halls', 'Classrooms', 'Cultural Heritage'] }
    ],
    recreation: [
      { name: 'Malkin Athletic Center', description: 'Main fitness facility', features: ['Fitness Center', 'Pool', 'Courts', 'Classes'] },
      { name: 'Harvard Stadium', description: 'Historic football stadium', features: ['Football', 'Track', 'Historic Venue', 'Events'] }
    ],
    resources: [
      // Harvard Design Teams and Clubs
      { title: 'Harvard Formula SAE', category: 'clubs', description: 'Formula racing car design team' },
      { title: 'Harvard Robotics Club', category: 'clubs', description: 'Robotics design and competition' },
      { title: 'Harvard Undergraduate Robotics Club', category: 'clubs', description: 'Student robotics projects' },
      { title: 'Harvard Computer Society', category: 'clubs', description: 'Computer science and programming' },
      { title: 'Harvard Innovation Lab', category: 'clubs', description: 'Entrepreneurship and innovation hub' },
      { title: 'Harvard Undergraduate Research Association', category: 'clubs', description: 'Research opportunities and support' },
      
      // Academic Resources
      { title: 'Bureau of Study Counsel', category: 'academic', description: 'Academic support and study skills' },
      { title: 'Office of Career Services', category: 'internships', description: 'Career counseling and networking' },
      { title: 'Counseling and Mental Health Services', category: 'mental-health', description: 'Mental health support' },
      { title: 'Harvard College Student Life', category: 'social', description: 'Student activities and organizations' },
      { title: 'Financial Aid Office', category: 'financial', description: 'Need-based financial assistance' }
    ]
  },
  mit: {
    libraries: [
      { name: 'Hayden Library', description: 'Main library with extensive STEM collections', features: ['STEM Collections', 'Study Spaces', 'Research Support', 'Technology'] },
      { name: 'Barker Engineering Library', description: 'Engineering-focused library', features: ['Engineering Resources', 'Study Areas', 'Computer Access', 'Research Support'] }
    ],
    dining: [
      { name: 'Next House Dining', description: 'Popular dining hall with variety', features: ['Multiple Options', 'Social Space', 'Late Hours', 'Student Favorite'] },
      { name: 'The Stata Center Food Court', description: 'Food court in the famous Stata building', features: ['Multiple Vendors', 'Modern Setting', 'Convenient', 'Tech Hub'] }
    ],
    buildings: [
      { name: 'Ray and Maria Stata Center', description: 'Computer science and artificial intelligence', features: ['Modern Architecture', 'Computer Labs', 'Research Facilities', 'Innovation Hub'] },
      { name: 'Building 32 (Stata)', description: 'Computer Science and Artificial Intelligence Laboratory', features: ['AI Research', 'Computer Labs', 'Study Spaces', 'Cutting-edge Technology'] }
    ],
    recreation: [
      { name: 'Z Center', description: 'Main fitness and recreation facility', features: ['Fitness Center', 'Pool', 'Courts', 'Classes'] },
      { name: 'Pierce Boathouse', description: 'Rowing and water sports facility', features: ['Rowing', 'Water Sports', 'Scenic Location', 'Team Sports'] }
    ],
    resources: [
      // MIT Design Teams and Clubs
      { title: 'MIT Formula SAE', category: 'clubs', description: 'Formula racing car design team' },
      { title: 'MIT Rocket Team', category: 'clubs', description: 'Rocket design and space technology' },
      { title: 'MIT Robotics Team', category: 'clubs', description: 'Advanced robotics and AI projects' },
      { title: 'MIT Solar Electric Vehicle Team', category: 'clubs', description: 'Solar car design and racing' },
      { title: 'MIT Autonomous Vehicle Club', category: 'clubs', description: 'Self-driving vehicle technology' },
      { title: 'MIT Entrepreneurship Club', category: 'clubs', description: 'Startup and innovation community' },
      { title: 'MIT Computer Science and Artificial Intelligence Laboratory (CSAIL)', category: 'clubs', description: 'AI and computer science research' },
      
      // Academic Resources
      { title: 'Academic Resource Center', category: 'academic', description: 'Tutoring and academic support' },
      { title: 'Global Education & Career Development', category: 'internships', description: 'Career services and global opportunities' },
      { title: 'Mental Health and Counseling', category: 'mental-health', description: 'Comprehensive mental health services' },
      { title: 'Student Life Programs', category: 'social', description: 'Student activities and leadership' },
      { title: 'Student Financial Services', category: 'financial', description: 'Financial aid and support' }
    ]
  }
};

// Generate university-specific data with real information
const generateUniversityData = () => {
  const allLocations: Location[] = [];
  const allResources: Resource[] = [];
  const allTips: DailyTip[] = [];

  mockUniversities.forEach((university) => {
    const universityData = universitySpecificData[university.id as keyof typeof universitySpecificData];
    
    if (!universityData) {
      // Fallback for universities without specific data
      const fallbackLocations = generateFallbackLocations(university);
      allLocations.push(...fallbackLocations);
      allResources.push(...generateFallbackResources(university));
      allTips.push(...generateFallbackTips(university));
      return;
    }

    // Generate busy times for study locations
    const generateBusyTimes = (): BusyTime[] => {
      const busyTimes: BusyTime[] = [];
      for (let hour = 8; hour <= 22; hour++) {
        let busyLevel: 'low' | 'medium' | 'high' = 'low';
        
        // Peak hours: 10-12, 14-16, 19-21
        if ((hour >= 10 && hour <= 12) || (hour >= 14 && hour <= 16) || (hour >= 19 && hour <= 21)) {
          busyLevel = Math.random() > 0.3 ? 'high' : 'medium';
        } else if (hour >= 13 && hour <= 18) {
          busyLevel = Math.random() > 0.5 ? 'medium' : 'low';
        }
        
        busyTimes.push({
          hour,
          busyLevel,
          day: 'Monday'
        });
      }
      return busyTimes;
    };

    // Generate study buddies for locations
    const generateStudyBuddies = (): StudyBuddy[] => {
      return [
        {
          id: `${university.id}-buddy-1`,
          name: 'Sarah M.',
          timeSlot: 'Today 3-5 PM',
          subject: 'Calculus',
          message: 'Working on problem sets, open to group study!',
          timestamp: new Date(),
          isOpen: true
        }
      ];
    };

    let locationId = 1;

    // Add libraries
    universityData.libraries.forEach((lib) => {
      allLocations.push({
        id: `${university.id}-${locationId++}`,
        name: lib.name,
        description: lib.description,
        category: 'study',
        coordinates: [
          university.coordinates[0] + (Math.random() - 0.5) * 0.01,
          university.coordinates[1] + (Math.random() - 0.5) * 0.01
        ],
        rating: 4.0 + Math.random() * 1.0,
        votes: 80 + Math.floor(Math.random() * 120),
        features: lib.features,
        hours: lib.name.includes('Robarts') ? '24/7 during exams' : '8am - 12am',
        tips: [
          {
            id: `${university.id}-tip-${locationId}`,
            content: `The upper floors of ${lib.name} have the best natural lighting during afternoon study sessions`,
            author: 'Alex K.',
            votes: 15 + Math.floor(Math.random() * 25),
            timestamp: new Date('2024-01-15'),
            universityId: university.id
          }
        ],
        universityId: university.id,
        busyTimes: generateBusyTimes(),
        studyBuddies: generateStudyBuddies()
      });
    });

    // Add dining locations
    universityData.dining.forEach((dining) => {
      allLocations.push({
        id: `${university.id}-${locationId++}`,
        name: dining.name,
        description: dining.description,
        category: 'food',
        coordinates: [
          university.coordinates[0] + (Math.random() - 0.5) * 0.01,
          university.coordinates[1] + (Math.random() - 0.5) * 0.01
        ],
        rating: 3.8 + Math.random() * 1.0,
        votes: 100 + Math.floor(Math.random() * 150),
        features: dining.features,
        hours: dining.name.includes('Tim Hortons') ? '6am - 11pm' : '7am - 9pm',
        tips: [
          {
            id: `${university.id}-tip-${locationId}`,
            content: `Best time to visit ${dining.name} is between 2-4pm when it's less crowded`,
            author: 'Jamie L.',
            votes: 20 + Math.floor(Math.random() * 30),
            timestamp: new Date('2024-01-12'),
            universityId: university.id
          }
        ],
        universityId: university.id
      });
    });

    // Add academic buildings
    universityData.buildings.forEach((building) => {
      allLocations.push({
        id: `${university.id}-${locationId++}`,
        name: building.name,
        description: building.description,
        category: 'study',
        coordinates: [
          university.coordinates[0] + (Math.random() - 0.5) * 0.01,
          university.coordinates[1] + (Math.random() - 0.5) * 0.01
        ],
        rating: 4.0 + Math.random() * 0.8,
        votes: 60 + Math.floor(Math.random() * 100),
        features: building.features,
        hours: '6am - 11pm',
        tips: [],
        universityId: university.id,
        busyTimes: generateBusyTimes()
      });
    });

    // Add recreation facilities
    universityData.recreation.forEach((rec) => {
      allLocations.push({
        id: `${university.id}-${locationId++}`,
        name: rec.name,
        description: rec.description,
        category: 'recreation',
        coordinates: [
          university.coordinates[0] + (Math.random() - 0.5) * 0.01,
          university.coordinates[1] + (Math.random() - 0.5) * 0.01
        ],
        rating: 4.2 + Math.random() * 0.6,
        votes: 150 + Math.floor(Math.random() * 200),
        features: rec.features,
        hours: '5am - 11pm',
        tips: [],
        universityId: university.id
      });
    });

    // Add some hidden gems
    const hiddenGems = [
      {
        name: `${university.shortName} Quiet Garden`,
        description: 'Peaceful outdoor study spot with benches and WiFi',
        features: ['Outdoor Seating', 'WiFi Access', 'Peaceful', 'Natural Setting']
      },
      {
        name: `${university.shortName} Rooftop Study Lounge`,
        description: 'Hidden study space with city views',
        features: ['City Views', 'Quiet Study', 'Natural Light', 'Hidden Gem']
      }
    ];

    hiddenGems.forEach((gem) => {
      allLocations.push({
        id: `${university.id}-${locationId++}`,
        name: gem.name,
        description: gem.description,
        category: 'hidden-gems',
        coordinates: [
          university.coordinates[0] + (Math.random() - 0.5) * 0.01,
          university.coordinates[1] + (Math.random() - 0.5) * 0.01
        ],
        rating: 4.5 + Math.random() * 0.4,
        votes: 30 + Math.floor(Math.random() * 70),
        features: gem.features,
        hours: 'Dawn - Dusk',
        tips: [],
        universityId: university.id
      });
    });

    // Add resources
    universityData.resources.forEach((resource, index) => {
      allResources.push({
        id: `${university.id}-res-${index + 1}`,
        title: resource.title,
        url: resource.category === 'clubs' ? `${university.website}/clubs` : `${university.website}/${resource.category}`,
        category: resource.category as any,
        description: resource.description,
        upvotes: 40 + Math.floor(Math.random() * 80),
        tags: [resource.category, university.shortName.toLowerCase(), 'official'],
        universityId: university.id
      });
    });

    // Generate daily tips
    const universityTips: DailyTip[] = [
      {
        id: `${university.id}-dailytip-1`,
        content: `Pro tip: ${universityData.libraries[0].name} has the best study spots on the upper floors. Arrive before 9am during exam season to secure a spot!`,
        category: 'Study Tips',
        relevantLocations: [`${university.id}-1`],
        timestamp: new Date(),
        universityId: university.id
      },
      {
        id: `${university.id}-dailytip-2`,
        content: `${universityData.dining[0].name} is less crowded between 2-4pm. Perfect time for a peaceful lunch break!`,
        category: "Dining Tips",
        relevantLocations: [`${university.id}-${universityData.libraries.length + 1}`],
        timestamp: new Date(),
        universityId: university.id
      }
    ];

    allTips.push(...universityTips);
  });

  return { allLocations, allResources, allTips };
};

// Fallback data for universities without specific information
function generateFallbackLocations(university: University): Location[] {
  const locations: Location[] = [];
  let locationId = 1;

  // Generic locations
  const genericLocations = [
    {
      name: `${university.shortName} Main Library`,
      description: 'Central library with extensive study spaces and research collections',
      category: 'study' as const,
      features: ['Study Spaces', 'Research Collections', 'Computer Access', 'Group Rooms']
    },
    {
      name: `${university.shortName} Student Center`,
      description: 'Hub for student activities with dining and social spaces',
      category: 'food' as const,
      features: ['Food Court', 'Social Space', 'Student Services', 'Events']
    },
    {
      name: `${university.shortName} Recreation Center`,
      description: 'Fitness and recreation facility for students',
      category: 'recreation' as const,
      features: ['Fitness Equipment', 'Courts', 'Pool', 'Classes']
    }
  ];

  genericLocations.forEach((loc) => {
    locations.push({
      id: `${university.id}-${locationId++}`,
      name: loc.name,
      description: loc.description,
      category: loc.category,
      coordinates: [
        university.coordinates[0] + (Math.random() - 0.5) * 0.01,
        university.coordinates[1] + (Math.random() - 0.5) * 0.01
      ],
      rating: 4.0 + Math.random() * 0.8,
      votes: 80 + Math.floor(Math.random() * 120),
      features: loc.features,
      hours: '8am - 10pm',
      tips: [],
      universityId: university.id
    });
  });

  return locations;
}

function generateFallbackResources(university: University): Resource[] {
  return [
    {
      id: `${university.id}-res-1`,
      title: `${university.shortName} Academic Support`,
      url: `${university.website}/academic-support`,
      category: 'academic',
      description: 'Academic assistance and tutoring services',
      upvotes: 50,
      tags: ['academic', 'tutoring', university.shortName.toLowerCase()],
      universityId: university.id
    },
    {
      id: `${university.id}-res-2`,
      title: `${university.shortName} Career Services`,
      url: `${university.website}/careers`,
      category: 'internships',
      description: 'Career counseling and job placement assistance',
      upvotes: 75,
      tags: ['careers', 'jobs', university.shortName.toLowerCase()],
      universityId: university.id
    }
  ];
}

function generateFallbackTips(university: University): DailyTip[] {
  return [
    {
      id: `${university.id}-dailytip-1`,
      content: `Welcome to ${university.name}! Check out the main library for excellent study spaces.`,
      category: 'General Tips',
      relevantLocations: [`${university.id}-1`],
      timestamp: new Date(),
      universityId: university.id
    }
  ];
}

const { allLocations, allResources, allTips } = generateUniversityData();

export const mockLocations: Location[] = allLocations;
export const mockResources: Resource[] = allResources;
export const mockDailyTips: DailyTip[] = allTips;

// Helper function to get data for a specific university
export const getUniversityData = (universityId: string) => {
  return {
    locations: mockLocations.filter(location => location.universityId === universityId),
    resources: mockResources.filter(resource => resource.universityId === universityId),
    dailyTips: mockDailyTips.filter(tip => tip.universityId === universityId)
  };
};