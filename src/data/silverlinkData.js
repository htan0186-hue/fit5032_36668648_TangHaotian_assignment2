export const serviceCategories = [
  'Transport',
  'Home Help',
  'Digital Support',
  'Health Navigation',
  'Social Connection'
]

export const services = [
  {
    id: 'svc-transport-1',
    name: 'Neighbourhood Ride Connect',
    category: 'Transport',
    suburb: 'Clayton',
    cost: 'Low cost',
    phone: '03 9123 4401',
    lat: -37.915,
    lng: 145.13,
    accessibility: ['Wheelchair access', 'Phone booking'],
    summary:
      'Door-to-door community transport for medical appointments, shopping trips and social visits.',
    verifiedDate: '2026-07-01'
  },
  {
    id: 'svc-home-1',
    name: 'Safe Steps Home Assistance',
    category: 'Home Help',
    suburb: 'Oakleigh',
    cost: 'Subsidised',
    phone: '03 9123 4418',
    lat: -37.899,
    lng: 145.088,
    accessibility: ['In-home visit', 'Interpreter available'],
    summary:
      'Light home maintenance, safety checks and practical help for older adults living independently.',
    verifiedDate: '2026-06-28'
  },
  {
    id: 'svc-digital-1',
    name: 'Tablet Confidence Clinic',
    category: 'Digital Support',
    suburb: 'Glen Waverley',
    cost: 'Free',
    phone: '03 9123 4484',
    lat: -37.879,
    lng: 145.164,
    accessibility: ['Step-by-step help', 'Large-print notes'],
    summary:
      'Friendly one-on-one technology support for video calls, email, online forms and scam awareness.',
    verifiedDate: '2026-07-05'
  },
  {
    id: 'svc-health-1',
    name: 'Care Pathway Desk',
    category: 'Health Navigation',
    suburb: 'Dandenong',
    cost: 'Free',
    phone: '03 9123 4550',
    lat: -37.987,
    lng: 145.215,
    accessibility: ['Phone support', 'Family supporter welcome'],
    summary:
      'Plain-language guidance for finding aged care, community nursing and local health services.',
    verifiedDate: '2026-06-30'
  },
  {
    id: 'svc-social-1',
    name: 'Community Morning Circle',
    category: 'Social Connection',
    suburb: 'Mulgrave',
    cost: 'Gold coin',
    phone: '03 9123 4620',
    lat: -37.928,
    lng: 145.177,
    accessibility: ['Step-free venue', 'Quiet seating'],
    summary:
      'Weekly morning tea and conversation group for older adults who want gentle social connection.',
    verifiedDate: '2026-07-08'
  },
  {
    id: 'svc-meals-1',
    name: 'Warm Meals Network',
    category: 'Home Help',
    suburb: 'Springvale',
    cost: 'Subsidised',
    phone: '03 9123 4692',
    lat: -37.949,
    lng: 145.153,
    accessibility: ['Home delivery', 'Dietary options'],
    summary: 'Nutritious meal delivery and welfare check-ins for older adults living at home.',
    verifiedDate: '2026-07-10'
  },
  {
    id: 'svc-language-1',
    name: 'Multilingual Support Desk',
    category: 'Health Navigation',
    suburb: 'Noble Park',
    cost: 'Free',
    phone: '03 9123 4704',
    lat: -37.967,
    lng: 145.176,
    accessibility: ['Interpreter available', 'Family supporter welcome'],
    summary: 'Translated guidance for service forms, appointments and local support options.',
    verifiedDate: '2026-07-12'
  },
  {
    id: 'svc-repairs-1',
    name: 'Handy Home Safety Team',
    category: 'Home Help',
    suburb: 'Mount Waverley',
    cost: 'Low cost',
    phone: '03 9123 4730',
    lat: -37.877,
    lng: 145.129,
    accessibility: ['In-home visit', 'Falls prevention'],
    summary: 'Minor repairs, grab-rail checks and simple safety improvements around the home.',
    verifiedDate: '2026-07-14'
  },
  {
    id: 'svc-buddy-1',
    name: 'Friendly Phone Buddy',
    category: 'Social Connection',
    suburb: 'Wheelers Hill',
    cost: 'Free',
    phone: '03 9123 4761',
    lat: -37.907,
    lng: 145.189,
    accessibility: ['Phone support', 'No travel required'],
    summary: 'Regular social phone calls for people who want conversation and gentle check-ins.',
    verifiedDate: '2026-07-15'
  },
  {
    id: 'svc-shopping-1',
    name: 'Assisted Shopping Shuttle',
    category: 'Transport',
    suburb: 'Dandenong North',
    cost: 'Gold coin',
    phone: '03 9123 4788',
    lat: -37.951,
    lng: 145.214,
    accessibility: ['Wheelchair access', 'Volunteer assistance'],
    summary: 'Scheduled shopping trips with help carrying bags and reading labels.',
    verifiedDate: '2026-07-16'
  },
  {
    id: 'svc-devices-1',
    name: 'Device Setup Home Visit',
    category: 'Digital Support',
    suburb: 'Chadstone',
    cost: 'Low cost',
    phone: '03 9123 4815',
    lat: -37.886,
    lng: 145.083,
    accessibility: ['In-home visit', 'Large-print notes'],
    summary: 'Home setup for tablets, emergency contact shortcuts and video-call apps.',
    verifiedDate: '2026-07-18'
  },
  {
    id: 'svc-garden-1',
    name: 'Light Garden Help',
    category: 'Home Help',
    suburb: 'Clarinda',
    cost: 'Subsidised',
    phone: '03 9123 4833',
    lat: -37.941,
    lng: 145.103,
    accessibility: ['In-home visit', 'Seasonal booking'],
    summary: 'Small garden maintenance jobs that reduce trip hazards and support independence.',
    verifiedDate: '2026-07-19'
  }
]

export const events = [
  {
    id: 'evt-1',
    title: 'Gentle Walking Group',
    category: 'Wellbeing',
    date: '2026-08-04',
    time: '10:00 AM',
    location: 'Clayton Community Garden',
    lat: -37.918,
    lng: 145.126,
    places: 12,
    accessibility: ['Flat path', 'Rest stops'],
    description:
      'A relaxed local walk with rest breaks, friendly volunteers and optional morning tea.'
  },
  {
    id: 'evt-2',
    title: 'Avoiding Online Scams',
    category: 'Digital Safety',
    date: '2026-08-08',
    time: '2:00 PM',
    location: 'Oakleigh Library',
    lat: -37.900,
    lng: 145.089,
    places: 20,
    accessibility: ['Large slides', 'Printed guide'],
    description:
      'A practical session on identifying suspicious messages, safer passwords and where to get help.'
  },
  {
    id: 'evt-3',
    title: 'Family Support Planning',
    category: 'Carers',
    date: '2026-08-13',
    time: '6:30 PM',
    location: 'Online and phone dial-in',
    lat: -37.914,
    lng: 145.132,
    places: 30,
    accessibility: ['Captioned', 'Phone option'],
    description:
      'A short evening workshop for family members helping older relatives compare support options.'
  },
  {
    id: 'evt-4',
    title: 'Chair Yoga And Balance',
    category: 'Wellbeing',
    date: '2026-08-16',
    time: '11:00 AM',
    location: 'Mulgrave Community Hall',
    lat: -37.928,
    lng: 145.177,
    places: 18,
    accessibility: ['Seated options', 'Step-free venue'],
    description: 'A gentle movement class designed for strength, balance and confidence.'
  },
  {
    id: 'evt-5',
    title: 'Tablet Basics Workshop',
    category: 'Digital Safety',
    date: '2026-08-19',
    time: '1:30 PM',
    location: 'Glen Waverley Learning Room',
    lat: -37.879,
    lng: 145.164,
    places: 14,
    accessibility: ['Large-print guide', 'Volunteer support'],
    description: 'Hands-on practice for email, photos, video calls and safe browsing.'
  },
  {
    id: 'evt-6',
    title: 'Carer Coffee Meetup',
    category: 'Carers',
    date: '2026-08-21',
    time: '9:30 AM',
    location: 'Springvale Neighbourhood House',
    lat: -37.949,
    lng: 145.153,
    places: 16,
    accessibility: ['Quiet seating', 'Family supporter welcome'],
    description: 'An informal morning for carers to exchange practical support tips.'
  },
  {
    id: 'evt-7',
    title: 'Safe Transport Information Day',
    category: 'Transport',
    date: '2026-08-25',
    time: '10:30 AM',
    location: 'Dandenong Civic Centre',
    lat: -37.987,
    lng: 145.215,
    places: 24,
    accessibility: ['Wheelchair access', 'Printed routes'],
    description: 'Compare transport options, eligibility rules and booking methods.'
  },
  {
    id: 'evt-8',
    title: 'Scam Message Practice Lab',
    category: 'Digital Safety',
    date: '2026-08-28',
    time: '2:00 PM',
    location: 'Chadstone Digital Hub',
    lat: -37.886,
    lng: 145.083,
    places: 12,
    accessibility: ['Slow-paced session', 'Large examples'],
    description: 'Practice spotting suspicious messages using realistic examples.'
  }
]
