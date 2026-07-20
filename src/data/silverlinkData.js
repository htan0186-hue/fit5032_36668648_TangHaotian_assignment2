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
    accessibility: ['Step-free venue', 'Quiet seating'],
    summary:
      'Weekly morning tea and conversation group for older adults who want gentle social connection.',
    verifiedDate: '2026-07-08'
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
    places: 30,
    accessibility: ['Captioned', 'Phone option'],
    description:
      'A short evening workshop for family members helping older relatives compare support options.'
  }
]
