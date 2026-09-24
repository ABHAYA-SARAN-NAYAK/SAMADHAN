import { DomainMeta, Problem, ProblemCluster, University, Project, IndustryBounty, ImpactPassportEntry } from '../types';

export const JHARKHAND_DOMAINS: DomainMeta[] = [
  {
    key: 'water_resources',
    name: 'Water Resources',
    hindiName: 'जल संसाधन',
    icon: '💧',
    color: '#1D4ED8',
    badgeClass: 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]',
    jharkhandStat: '18.9% HH with safe water access',
    sampleProblems: [
      'Fluoride contamination in groundwater across 14 villages in Garhwa',
      'Solar hand pump motor failure causing acute drinking water shortage in Meral block',
      'Check-dam siltation reducing water storage capacity by 70% in Latehar'
    ]
  },
  {
    key: 'agriculture',
    name: 'Agriculture',
    hindiName: 'कृषि एवं सिंचाई',
    icon: '🌾',
    color: '#15803D',
    badgeClass: 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]',
    jharkhandStat: '80% population depends on farming',
    sampleProblems: [
      'Post-harvest tomato rotting in Gumla due to lack of low-cost cold storage',
      'Lac cultivation pest infestation in Khunti affecting tribal yield',
      'Soil acidity (pH < 5.0) reducing upland paddy productivity in Simdega'
    ]
  },
  {
    key: 'healthcare',
    name: 'Healthcare',
    hindiName: 'स्वास्थ्य सेवा',
    icon: '🏥',
    color: '#DC2626',
    badgeClass: 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
    jharkhandStat: '1 doctor per 10,000 rural population',
    sampleProblems: [
      'Diagnostic delay for sickle cell anemia screening in remote Chaibasa',
      'Cold-chain vaccine breakdown in un-electrified sub-centers of Dumka',
      'High maternal transfer delay in hilly terrains of Latehar'
    ]
  },
  {
    key: 'education',
    name: 'Education',
    hindiName: 'शिक्षा एवं कौशल',
    icon: '📚',
    color: '#C2410C',
    badgeClass: 'bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]',
    jharkhandStat: '44% literacy in tribal belts',
    sampleProblems: [
      'Lack of interactive multilingual STEM content in Ho & Santhali languages',
      'High girl student dropouts post-grade 8 due to 8km commute in Godda',
      'Offline digital smart classrooms failing due to power intermittency'
    ]
  },
  {
    key: 'sanitation',
    name: 'Sanitation',
    hindiName: 'स्वच्छता एवं अपशिष्ट',
    icon: '🚽',
    color: '#7C3AED',
    badgeClass: 'bg-[#FAF5FF] text-[#7C3AED] border border-[#E9D5FF]',
    jharkhandStat: '32% rural HH have functional toilets',
    sampleProblems: [
      'Twin-pit toilet water table contamination in rocky strata of Ranchi outskirts',
      'Biomedical waste unsegregated disposal in sub-divisional hospitals',
      'Weekly tribal haat plastic and organic waste composting failure'
    ]
  },
  {
    key: 'environment',
    name: 'Environment',
    hindiName: 'पर्यावरण व वन',
    icon: '🌳',
    color: '#065F46',
    badgeClass: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
    jharkhandStat: '29% forest cover under threat',
    sampleProblems: [
      'Coal dust particulate pollution (PM2.5 > 280) near Jharia open cast mines',
      'Mahua flower collection forest fires in Saranda forest range',
      'Abandoned stone quarry water poisoning affecting local wildlife'
    ]
  },
  {
    key: 'energy',
    name: 'Energy',
    hindiName: 'ऊर्जा एवं बिजली',
    icon: '⚡',
    color: '#854D0E',
    badgeClass: 'bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]',
    jharkhandStat: '38% villages without reliable power',
    sampleProblems: [
      'Transformer burnout frequency during monsoon in Palamu rural grid',
      'Micro-hydro potential unharnessed along Hundru & Jonha river tributaries',
      'Biomass briquette machine downtime in rural self-help groups'
    ]
  },
  {
    key: 'urban_infra',
    name: 'Urban Infra',
    hindiName: 'शहरी अवसंरचना',
    icon: '🏗️',
    color: '#334155',
    badgeClass: 'bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0]',
    jharkhandStat: 'Ranchi expansion outpacing services',
    sampleProblems: [
      'Harmu river drainage overflow during cloudburst in Ranchi city',
      'Traffic congestion at Jamshedpur industrial corridor entry bottlenecks',
      'Dhanbad municipal water pipeline leakages losing 42% treated water'
    ]
  },
  {
    key: 'rural_livelihood',
    name: 'Rural Livelihood',
    hindiName: 'ग्रामीण आजीविका',
    icon: '🧑‍🌾',
    color: '#92400E',
    badgeClass: 'bg-[#FFF8F1] text-[#92400E] border border-[#FFEDD5]',
    jharkhandStat: '38% ultra-poor in casual wage labour',
    sampleProblems: [
      'Low market price realization for organic Tussar silk weavers in Saraikela',
      'Bamboo craft artisans lacking modern modular seasoning kiln',
      'Mahuya liquor value-addition into non-alcoholic nutritional products'
    ]
  },
  {
    key: 'governance',
    name: 'Governance',
    hindiName: 'सुशासन एवं सेवाएं',
    icon: '🏛️',
    color: '#3730A3',
    badgeClass: 'bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE]',
    jharkhandStat: '62% schemes under-utilized due to awareness gap',
    sampleProblems: [
      'Tribal land record mutation delays due to lack of digitized geo-cadastral maps',
      'PDS ration card biometric failure for elderly citizens in deep forests',
      'Forest Rights Act (FRA) community claim tracking backlog'
    ]
  }
];

export const DOMAIN_ACCENT_COLORS: Record<string, string> = {
  water_resources: '#1D4ED8',
  agriculture: '#15803D',
  healthcare: '#DC2626',
  education: '#C2410C',
  sanitation: '#7C3AED',
  environment: '#065F46',
  energy: '#854D0E',
  urban_infra: '#334155',
  rural_livelihood: '#92400E',
  governance: '#3730A3'
};

export const DOMAIN_BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  water_resources: { bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]', border: 'border-[#BFDBFE]' },
  agriculture: { bg: 'bg-[#F0FDF4]', text: 'text-[#15803D]', border: 'border-[#BBF7D0]' },
  healthcare: { bg: 'bg-[#FEF2F2]', text: 'text-[#DC2626]', border: 'border-[#FECACA]' },
  education: { bg: 'bg-[#FFF7ED]', text: 'text-[#C2410C]', border: 'border-[#FFEDD5]' },
  sanitation: { bg: 'bg-[#FAF5FF]', text: 'text-[#7C3AED]', border: 'border-[#E9D5FF]' },
  environment: { bg: 'bg-[#ECFDF5]', text: 'text-[#065F46]', border: 'border-[#A7F3D0]' },
  energy: { bg: 'bg-[#FEFCE8]', text: 'text-[#854D0E]', border: 'border-[#FEF08A]' },
  urban_infra: { bg: 'bg-[#F8FAFC]', text: 'text-[#334155]', border: 'border-[#E2E8F0]' },
  rural_livelihood: { bg: 'bg-[#FFF8F1]', text: 'text-[#92400E]', border: 'border-[#FFEDD5]' },
  governance: { bg: 'bg-[#EEF2FF]', text: 'text-[#3730A3]', border: 'border-[#C7D2FE]' }
};

export const STATUS_BADGES: Record<string, { label: string; bg: string; text: string; border: string }> = {
  submitted: { label: 'Submitted', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]', border: 'border-[#BFDBFE]' },
  under_review: { label: 'Under Review', bg: 'bg-[#FFF7ED]', text: 'text-[#C2410C]', border: 'border-[#FFEDD5]' },
  assigned: { label: 'Assigned', bg: 'bg-[#FAF5FF]', text: 'text-[#7C3AED]', border: 'border-[#E9D5FF]' },
  in_progress: { label: 'In Progress', bg: 'bg-[#FEFCE8]', text: 'text-[#854D0E]', border: 'border-[#FEF08A]' },
  deployed: { label: 'Deployed', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]', border: 'border-[#BFDBFE]' },
  resolved: { label: 'Resolved', bg: 'bg-[#F0FDF4]', text: 'text-[#15803D]', border: 'border-[#BBF7D0]' }
};

export interface DistrictInfo {
  name: string;
  lat: number;
  lng: number;
  problemCount: number;
  resolvedCount: number;
  urgencyAverage: number;
  topDomain: string;
  headquarters: string;
  blocks: string[];
}

export const JHARKHAND_DISTRICTS: DistrictInfo[] = [
  { name: 'Garhwa', lat: 24.16, lng: 83.82, problemCount: 68, resolvedCount: 14, urgencyAverage: 88, topDomain: 'water_resources', headquarters: 'Garhwa', blocks: ['Garhwa', 'Meral', 'Ranka', 'Bhandaria', 'Chiniya', 'Kandi'] },
  { name: 'Palamu', lat: 24.03, lng: 84.07, problemCount: 54, resolvedCount: 18, urgencyAverage: 79, topDomain: 'water_resources', headquarters: 'Daltonganj', blocks: ['Daltonganj', 'Medininagar', 'Patan', 'Satbarwa', 'Chhatarpur'] },
  { name: 'Chatra', lat: 24.21, lng: 84.87, problemCount: 39, resolvedCount: 9, urgencyAverage: 74, topDomain: 'agriculture', headquarters: 'Chatra', blocks: ['Chatra', 'Hunterganj', 'Itkhori', 'Tandwa', 'Simaria'] },
  { name: 'Hazaribagh', lat: 23.99, lng: 85.36, problemCount: 42, resolvedCount: 22, urgencyAverage: 65, topDomain: 'energy', headquarters: 'Hazaribagh', blocks: ['Hazaribagh', 'Barhi', 'Barkagaon', 'Chauparan', 'Katkamsandi'] },
  { name: 'Koderma', lat: 24.47, lng: 85.59, problemCount: 28, resolvedCount: 15, urgencyAverage: 58, topDomain: 'environment', headquarters: 'Koderma', blocks: ['Koderma', 'Jhumri Telaiya', 'Jainagar', 'Chandwara', 'Satgawan'] },
  { name: 'Giridih', lat: 24.18, lng: 86.30, problemCount: 52, resolvedCount: 19, urgencyAverage: 76, topDomain: 'sanitation', headquarters: 'Giridih', blocks: ['Giridih', 'Dumri', 'Bagodar', 'Gandey', 'Deori'] },
  { name: 'Deoghar', lat: 24.48, lng: 86.70, problemCount: 36, resolvedCount: 20, urgencyAverage: 61, topDomain: 'healthcare', headquarters: 'Deoghar', blocks: ['Deoghar', 'Madhupur', 'Sarath', 'Karon', 'Devipur'] },
  { name: 'Dumka', lat: 24.26, lng: 87.25, problemCount: 46, resolvedCount: 17, urgencyAverage: 73, topDomain: 'healthcare', headquarters: 'Dumka', blocks: ['Dumka', 'Jama', 'Jarmundi', 'Masalia', 'Ranishwar'] },
  { name: 'Godda', lat: 24.83, lng: 87.21, problemCount: 41, resolvedCount: 12, urgencyAverage: 80, topDomain: 'education', headquarters: 'Godda', blocks: ['Godda', 'Mahagama', 'Boarijor', 'Pathargama', 'Poreyahat'] },
  { name: 'Sahebganj', lat: 25.24, lng: 87.65, problemCount: 38, resolvedCount: 13, urgencyAverage: 75, topDomain: 'water_resources', headquarters: 'Sahebganj', blocks: ['Sahebganj', 'Rajmahal', 'Borio', 'Barharwa', 'Taljhari'] },
  { name: 'Pakur', lat: 24.63, lng: 87.84, problemCount: 45, resolvedCount: 10, urgencyAverage: 83, topDomain: 'rural_livelihood', headquarters: 'Pakur', blocks: ['Pakur', 'Hiranpur', 'Littipara', 'Pakuria', 'Maheshpur'] },
  { name: 'Jamtara', lat: 23.96, lng: 86.80, problemCount: 26, resolvedCount: 14, urgencyAverage: 54, topDomain: 'governance', headquarters: 'Jamtara', blocks: ['Jamtara', 'Nala', 'Kundhit', 'Narayanpur', 'Karmatanr'] },
  { name: 'Dhanbad', lat: 23.80, lng: 86.43, problemCount: 62, resolvedCount: 35, urgencyAverage: 70, topDomain: 'environment', headquarters: 'Dhanbad', blocks: ['Dhanbad', 'Jharia', 'Govindpur', 'Nirsa', 'Baghmara'] },
  { name: 'Bokaro', lat: 23.67, lng: 85.96, problemCount: 48, resolvedCount: 27, urgencyAverage: 62, topDomain: 'environment', headquarters: 'Bokaro Steel City', blocks: ['Chas', 'Bermo', 'Gomia', 'Chandankiyari', 'Jaridih'] },
  { name: 'Ramgarh', lat: 23.63, lng: 85.51, problemCount: 31, resolvedCount: 18, urgencyAverage: 56, topDomain: 'urban_infra', headquarters: 'Ramgarh', blocks: ['Ramgarh', 'Patratu', 'Mandu', 'Gola', 'Chitarpur'] },
  { name: 'Ranchi', lat: 23.34, lng: 85.31, problemCount: 78, resolvedCount: 52, urgencyAverage: 55, topDomain: 'urban_infra', headquarters: 'Ranchi', blocks: ['Ranchi', 'Kanke', 'Ormanjhi', 'Namkum', 'Ratu', 'Bundu'] },
  { name: 'Lohardaga', lat: 23.43, lng: 84.68, problemCount: 22, resolvedCount: 11, urgencyAverage: 59, topDomain: 'agriculture', headquarters: 'Lohardaga', blocks: ['Lohardaga', 'Kuru', 'Bhandra', 'Kisko', 'Seno'] },
  { name: 'Gumla', lat: 23.04, lng: 84.54, problemCount: 44, resolvedCount: 16, urgencyAverage: 77, topDomain: 'agriculture', headquarters: 'Gumla', blocks: ['Gumla', 'Bishunpur', 'Ghaghra', 'Palkot', 'Raidih'] },
  { name: 'Simdega', lat: 22.62, lng: 84.51, problemCount: 34, resolvedCount: 14, urgencyAverage: 71, topDomain: 'education', headquarters: 'Simdega', blocks: ['Simdega', 'Kolebira', 'Bano', 'Jaldega', 'Thethaitangar'] },
  { name: 'Latehar', lat: 23.74, lng: 84.50, problemCount: 49, resolvedCount: 15, urgencyAverage: 82, topDomain: 'healthcare', headquarters: 'Latehar', blocks: ['Latehar', 'Chandwa', 'Balumath', 'Mahuadanr', 'Manika'] },
  { name: 'East Singhbhum', lat: 22.80, lng: 86.20, problemCount: 58, resolvedCount: 39, urgencyAverage: 57, topDomain: 'rural_livelihood', headquarters: 'Jamshedpur', blocks: ['Golmuri-cum-Jugsalai', 'Potka', 'Patamda', 'Ghatshila', 'Baharagora'] },
  { name: 'West Singhbhum', lat: 22.56, lng: 85.81, problemCount: 56, resolvedCount: 18, urgencyAverage: 85, topDomain: 'healthcare', headquarters: 'Chaibasa', blocks: ['Chaibasa', 'Chakradharpur', 'Jhinkpani', 'Noamundi', 'Manjhari'] },
  { name: 'Seraikela-Kharsawan', lat: 22.70, lng: 85.93, problemCount: 33, resolvedCount: 19, urgencyAverage: 60, topDomain: 'rural_livelihood', headquarters: 'Seraikela', blocks: ['Seraikela', 'Kharsawan', 'Adityapur', 'Chandil', 'Gamharia'] },
  { name: 'Khunti', lat: 23.07, lng: 85.28, problemCount: 32, resolvedCount: 16, urgencyAverage: 67, topDomain: 'agriculture', headquarters: 'Khunti', blocks: ['Khunti', 'Murhu', 'Karra', 'Torpa', 'Rania'] },
];

export const PRELOADED_UNIVERSITIES: University[] = [
  {
    id: 'uni-nit-jsr',
    name: 'National Institute of Technology (NIT) Jamshedpur',
    shortCode: 'NITJSR',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    emailDomain: 'nitjsr.ac.in',
    expertise: ['water_resources', 'environment', 'urban_infra', 'energy'],
    departments: [
      { name: 'Civil & Environmental Engineering', domains: ['water_resources', 'sanitation', 'urban_infra'], facultyCount: 28 },
      { name: 'Mechanical Engineering', domains: ['energy', 'agriculture'], facultyCount: 26 },
      { name: 'Electrical Engineering', domains: ['energy', 'rural_livelihood'], facultyCount: 22 },
      { name: 'Computer Applications & AI', domains: ['governance', 'education'], facultyCount: 18 }
    ],
    facultyProfiles: [
      { id: 'fac-1', name: 'Dr. Alok Kumar', department: 'Civil Engineering', specialization: 'Hydrogeology & Fluoride Filtration' },
      { id: 'fac-2', name: 'Prof. Sunita Murmu', department: 'Environmental Engg', specialization: 'Rural Watershed & Soil Health' },
      { id: 'fac-3', name: 'Dr. Rajiv Soren', department: 'Mechanical Engg', specialization: 'Low-cost Solar Pumps' }
    ],
    incubationCell: true,
    activeProjectCount: 3,
    totalProjectsCompleted: 14,
    successRate: 0.88,
    avgResolutionDays: 45,
    verified: true
  },
  {
    id: 'uni-bit-mesra',
    name: 'Birla Institute of Technology (BIT) Mesra',
    shortCode: 'BITMESRA',
    city: 'Ranchi',
    state: 'Jharkhand',
    emailDomain: 'bitmesra.ac.in',
    expertise: ['healthcare', 'agriculture', 'rural_livelihood', 'governance'],
    departments: [
      { name: 'Bioengineering & Healthcare Tech', domains: ['healthcare', 'sanitation'], facultyCount: 20 },
      { name: 'Remote Sensing & GIS', domains: ['environment', 'agriculture', 'governance'], facultyCount: 16 },
      { name: 'Computer Science & AI', domains: ['governance', 'education'], facultyCount: 32 }
    ],
    facultyProfiles: [
      { id: 'fac-4', name: 'Dr. Pradeep Mahato', department: 'Bioengineering', specialization: 'Low-Cost Point of Care Diagnostics' },
      { id: 'fac-5', name: 'Prof. Ananya Roy', department: 'Remote Sensing', specialization: 'Cadastral Mapping & Water Bodies' }
    ],
    incubationCell: true,
    activeProjectCount: 2,
    totalProjectsCompleted: 11,
    successRate: 0.82,
    avgResolutionDays: 52,
    verified: true
  },
  {
    id: 'uni-iit-dhanbad',
    name: 'IIT (ISM) Dhanbad',
    shortCode: 'IITDHN',
    city: 'Dhanbad',
    state: 'Jharkhand',
    emailDomain: 'iitism.ac.in',
    expertise: ['environment', 'energy', 'water_resources', 'urban_infra'],
    departments: [
      { name: 'Environmental Science & Engg', domains: ['environment', 'sanitation', 'water_resources'], facultyCount: 24 },
      { name: 'Mining Machinery & Energy', domains: ['energy', 'urban_infra'], facultyCount: 30 }
    ],
    facultyProfiles: [
      { id: 'fac-6', name: 'Dr. B. K. Singh', department: 'Environmental Science', specialization: 'Air Quality & Fly Ash Utilization' }
    ],
    incubationCell: true,
    activeProjectCount: 4,
    totalProjectsCompleted: 16,
    successRate: 0.91,
    avgResolutionDays: 41,
    verified: true
  },
  {
    id: 'uni-bau-ranchi',
    name: 'Birsa Agricultural University (BAU)',
    shortCode: 'BAU',
    city: 'Ranchi',
    state: 'Jharkhand',
    emailDomain: 'bauranchi.org',
    expertise: ['agriculture', 'rural_livelihood', 'environment'],
    departments: [
      { name: 'Agronomy & Soil Chemistry', domains: ['agriculture', 'environment'], facultyCount: 35 },
      { name: 'Forestry & Tribal Livelihoods', domains: ['rural_livelihood', 'environment'], facultyCount: 22 }
    ],
    facultyProfiles: [
      { id: 'fac-7', name: 'Dr. Rameshwar Oraon', department: 'Forest Products', specialization: 'Lac Cultivation & NTFP Value Chain' }
    ],
    incubationCell: true,
    activeProjectCount: 3,
    totalProjectsCompleted: 9,
    successRate: 0.79,
    avgResolutionDays: 60,
    verified: true
  },
  {
    id: 'uni-aiims-deoghar',
    name: 'AIIMS Deoghar (Public Health & MedTech Cell)',
    shortCode: 'AIIMSDEO',
    city: 'Deoghar',
    state: 'Jharkhand',
    emailDomain: 'aiimsdeoghar.edu.in',
    expertise: ['healthcare', 'sanitation'],
    departments: [
      { name: 'Community Medicine & Public Health', domains: ['healthcare', 'sanitation'], facultyCount: 18 }
    ],
    facultyProfiles: [
      { id: 'fac-8', name: 'Dr. Vandana Tirkey', department: 'Community Medicine', specialization: 'Maternal Health & Tele-Triage' }
    ],
    incubationCell: true,
    activeProjectCount: 2,
    totalProjectsCompleted: 6,
    successRate: 0.85,
    avgResolutionDays: 38,
    verified: true
  }
];

export const PRELOADED_INDUSTRY_PARTNERS = [
  {
    id: 'ind-tata-steel',
    name: 'Tata Steel CSR Foundation',
    cin: 'L27100MH1907PLC000260',
    focusDomains: ['water_resources', 'education', 'healthcare', 'rural_livelihood'],
    totalCommittedInr: 45000000,
    activeBountiesCount: 6,
    resolvedProjectsSupported: 18,
    badge: 'Platinum CSR Patron'
  },
  {
    id: 'ind-ccl',
    name: 'Central Coalfields Limited (CCL) CSR',
    cin: 'U10200JH1956GOI000581',
    focusDomains: ['environment', 'energy', 'sanitation', 'water_resources'],
    totalCommittedInr: 32000000,
    activeBountiesCount: 4,
    resolvedProjectsSupported: 12,
    badge: 'Public Sector Champion'
  },
  {
    id: 'ind-sail-bokaro',
    name: 'SAIL Bokaro Steel Plant CSR Cell',
    cin: 'L27109DL1973GOI006454',
    focusDomains: ['urban_infra', 'environment', 'education'],
    totalCommittedInr: 21000000,
    activeBountiesCount: 3,
    resolvedProjectsSupported: 9,
    badge: 'Industrial Co-builder'
  },
  {
    id: 'ind-jindal',
    name: 'Jindal Steel & Power Foundation (JSP)',
    cin: 'L27105HR1979PLC009913',
    focusDomains: ['agriculture', 'rural_livelihood', 'healthcare'],
    totalCommittedInr: 18500000,
    activeBountiesCount: 2,
    resolvedProjectsSupported: 7,
    badge: 'Rural Growth Ally'
  }
];

export const INITIAL_PROBLEMS: Problem[] = [
  {
    id: 'prob-garhwa-01',
    problemId: 'JH-2026-00047',
    title: 'High Fluoride and Iron Contamination in Deep Borewells Across Meral Block',
    description: 'Hamare gaon Bhoura aur aaspas ke 14 tolon me borewell ka paani peene se daant peele pad rahe hain aur bujurgon ko jodon ka dard ho raha hai. Hand pumps me laal rang ka gehra paani nikalta hai. 3 saal se filter plant band hai.',
    voiceTranscript: 'हमारे गांव भंवरा और आसपास के 14 टोलों में बोरवेल का पानी पीने से दांत पीले पड़ रहे हैं और जोड़ों का दर्द हो रहा है। 3 साल से फिल्टर प्लांट बंद है।',
    originalLanguage: 'hi',
    translatedDescription: 'In Bhoura village and surrounding 14 hamlets of Meral block, drinking deep borewell water is causing dental fluorosis and severe joint pain among elders. High iron precipitate visible.',
    submittedBy: {
      name: 'Rameshwar Mahto',
      phone: '+91 94311 88204',
      role: 'CITIZEN'
    },
    submittedAt: '2026-08-20T10:14:00.000Z',
    location: {
      district: 'Garhwa',
      block: 'Meral',
      panchayat: 'Bhoura',
      village: 'Bhoura Tola 2',
      coordinates: { lat: 24.162, lng: 83.824 },
      addressText: 'Near Primary School, Bhoura, Meral Block, Garhwa'
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=800&q=80',
        tags: ['broken handpump', 'red rust sediment', 'rural Garhwa'],
        caption: 'Rusty sediment from Meral borewell'
      }
    ],
    aiOutput: {
      domain: 'water_resources',
      confidence: 0.96,
      urgencyScore: 89,
      solvabilityScore: 84,
      fundabilityScore: 78,
      compositeScore: 86,
      clusterGroupId: 'cluster-garhwa-water',
      isDuplicate: false,
      tags: ['fluoride', 'iron sediment', 'drinking water', 'deep borewell', 'Garhwa', 'public health'],
      autoTitle: 'Water Contamination & Fluorosis in Bhoura, Meral (Garhwa)',
      severityReason: 'High toxicity risk: over 2,400 school children and elders affected by fluoride and iron precipitate'
    },
    status: 'assigned',
    priority: 'high',
    assignedUniversity: {
      id: 'uni-nit-jsr',
      name: 'NIT Jamshedpur',
      department: 'Civil & Environmental Engineering',
      leadFaculty: 'Dr. Alok Kumar'
    },
    assignedAt: '2026-08-22T14:30:00.000Z',
    projectId: 'proj-garhwa-filter',
    industryPartners: [
      {
        id: 'ind-tata-steel',
        name: 'Tata Steel CSR Foundation',
        type: 'csr_fund',
        amountInr: 750000
      }
    ],
    fundingAmount: 750000,
    fundingCurrency: 'INR'
  },
  {
    id: 'prob-gumla-02',
    problemId: 'JH-2026-00048',
    title: 'Solar Cold Room Failure Causing 40% Tomato & Green Chili Spoilage in Bishunpur',
    description: 'Tomato crop harvest peak par hai par local mandi me ₹3/kg bik raha hai. Cold storage na hone se 40% fasal sad jati hai.',
    originalLanguage: 'hi',
    translatedDescription: 'Peak tomato and chili harvest in Bishunpur mandis spoiling rapidly due to non-functional zero-energy cool chambers.',
    submittedBy: {
      name: 'Sombari Devi',
      phone: '+91 88771 90211',
      role: 'CITIZEN'
    },
    submittedAt: '2026-08-21T09:40:00.000Z',
    location: {
      district: 'Gumla',
      block: 'Bishunpur',
      panchayat: 'Bishunpur Khas',
      coordinates: { lat: 23.045, lng: 84.542 },
      addressText: 'Kisan Mandi Yard, Bishunpur, Gumla'
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        tags: ['tomatoes', 'post-harvest loss', 'Gumla farming'],
        caption: 'Spoiled produce at local collection center'
      }
    ],
    aiOutput: {
      domain: 'agriculture',
      confidence: 0.93,
      urgencyScore: 82,
      solvabilityScore: 78,
      fundabilityScore: 85,
      compositeScore: 81,
      clusterGroupId: 'cluster-gumla-storage',
      isDuplicate: false,
      tags: ['cold storage', 'tomato spoilage', 'post-harvest', 'Gumla', 'tribal farmers'],
      autoTitle: 'Post-Harvest Crop Storage Loss in Bishunpur, Gumla'
    },
    status: 'in_progress',
    priority: 'high',
    assignedUniversity: {
      id: 'uni-bau-ranchi',
      name: 'Birsa Agricultural University (BAU)',
      department: 'Agronomy & Soil Chemistry',
      leadFaculty: 'Dr. Rameshwar Oraon'
    },
    assignedAt: '2026-08-23T11:00:00.000Z',
    projectId: 'proj-gumla-storage',
    industryPartners: [
      {
        id: 'ind-jindal',
        name: 'Jindal Steel & Power Foundation (JSP)',
        type: 'co_build',
        amountInr: 520000
      }
    ],
    fundingAmount: 520000
  },
  {
    id: 'prob-dhanbad-03',
    problemId: 'JH-2026-00049',
    title: 'Severe Fly Ash Dust Inhalation Around Abandoned Open-Cast Pits in Jharia',
    description: 'Coal transportation trucks and dry fly ash winds from abandoned quarry are creating severe respiratory issues for 12,000 residents in Jharia.',
    originalLanguage: 'en',
    submittedBy: {
      name: 'Dr. Vikash Sengupta',
      phone: '+91 97714 55102',
      role: 'CITIZEN'
    },
    submittedAt: '2026-08-22T08:15:00.000Z',
    location: {
      district: 'Dhanbad',
      block: 'Jharia',
      panchayat: 'Kusunda',
      coordinates: { lat: 23.754, lng: 86.418 },
      addressText: 'Kusunda Colony, near Pit 4, Jharia, Dhanbad'
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
        tags: ['coal dust', 'air pollution', 'Jharia mine'],
        caption: 'Visible particulate plume over residential area'
      }
    ],
    aiOutput: {
      domain: 'environment',
      confidence: 0.95,
      urgencyScore: 91,
      solvabilityScore: 74,
      fundabilityScore: 90,
      compositeScore: 87,
      clusterGroupId: 'cluster-dhanbad-flyash',
      tags: ['air quality', 'fly ash', 'respiratory health', 'Jharia coalfield'],
      autoTitle: 'Fly Ash Suppression & Mine Void Dust Control in Jharia'
    },
    status: 'assigned',
    priority: 'critical',
    assignedUniversity: {
      id: 'uni-iit-dhanbad',
      name: 'IIT (ISM) Dhanbad',
      department: 'Environmental Science & Engg',
      leadFaculty: 'Dr. B. K. Singh'
    },
    assignedAt: '2026-08-24T09:00:00.000Z',
    projectId: 'proj-dhanbad-dust',
    industryPartners: [
      {
        id: 'ind-ccl',
        name: 'Central Coalfields Limited (CCL) CSR',
        type: 'csr_fund',
        amountInr: 1200000
      }
    ],
    fundingAmount: 1200000
  },
  {
    id: 'prob-deoghar-04',
    problemId: 'JH-2026-00050',
    title: 'Lack of Cold-Chain Equipment for Primary Health Center Vaccine Storage in Devipur',
    description: 'Frequent grid power outages lasting 18 hours shut down refrigeration units at Devipur PHC, causing vaccine wastage.',
    originalLanguage: 'en',
    submittedBy: {
      name: 'Kavita Kumari (ANM)',
      phone: '+91 93041 33290',
      role: 'CITIZEN'
    },
    submittedAt: '2026-08-23T14:10:00.000Z',
    location: {
      district: 'Deoghar',
      block: 'Devipur',
      panchayat: 'Devipur Khas',
      coordinates: { lat: 24.482, lng: 86.698 },
      addressText: 'Primary Health Centre, Devipur Block, Deoghar'
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        tags: ['PHC medical', 'vaccine cooler', 'Deoghar health'],
        caption: 'PHC Cold storage unit with temperature alarm'
      }
    ],
    aiOutput: {
      domain: 'healthcare',
      confidence: 0.94,
      urgencyScore: 84,
      solvabilityScore: 88,
      fundabilityScore: 70,
      compositeScore: 83,
      tags: ['cold-chain', 'vaccines', 'solar refrigeration', 'maternal-child health', 'Deoghar'],
      autoTitle: 'Off-Grid Solar Cold-Chain for PHC Devipur (Deoghar)'
    },
    status: 'assigned',
    priority: 'high',
    assignedUniversity: {
      id: 'uni-aiims-deoghar',
      name: 'AIIMS Deoghar',
      department: 'Community Medicine & Public Health',
      leadFaculty: 'Dr. Vandana Tirkey'
    },
    assignedAt: '2026-08-24T16:00:00.000Z'
  },
  {
    id: 'prob-khunti-05',
    problemId: 'JH-2026-00051',
    title: 'Lac Parasitoid Beetle Outbreak Causing 60% Crop Drop in Murhu Forests',
    description: 'Rangeeni lac crop par kida lag gaya hai. Kusum aur Ber pedon par paude sookh rahe hain. 400 tribal parivar ki aamdani prabhavit hai.',
    originalLanguage: 'hi',
    submittedBy: {
      name: 'Mangal Munda',
      phone: '+91 91223 44091',
      role: 'CITIZEN'
    },
    submittedAt: '2026-08-24T12:00:00.000Z',
    location: {
      district: 'Khunti',
      block: 'Murhu',
      panchayat: 'Gelta',
      coordinates: { lat: 23.072, lng: 85.281 },
      addressText: 'Gelta Van Samiti, Murhu Block, Khunti'
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
        tags: ['lac cultivation', 'forest trees', 'tribal economy'],
        caption: 'Affected host trees in Murhu forest block'
      }
    ],
    aiOutput: {
      domain: 'rural_livelihood',
      confidence: 0.91,
      urgencyScore: 76,
      solvabilityScore: 82,
      fundabilityScore: 68,
      compositeScore: 77,
      tags: ['lac cultivation', 'pest control', 'tribal livelihood', 'bio-pesticide', 'Khunti'],
      autoTitle: 'Biological Pest Management for Lac Crops in Murhu (Khunti)'
    },
    status: 'under_review',
    priority: 'medium'
  }
];

export const INITIAL_CLUSTERS: ProblemCluster[] = [
  {
    id: 'cluster-garhwa-water',
    domain: 'water_resources',
    district: 'Garhwa',
    block: 'Meral & Ranka',
    clusterLabel: 'Broken hand pumps & Fluoride Contamination — Garhwa block',
    problemCount: 47,
    problemIds: ['prob-garhwa-01'],
    compositeUrgencyScore: 94,
    createdAt: '2026-08-18T00:00:00.000Z',
    masterProblemId: 'prob-garhwa-01',
    status: 'assigned',
    assignedUniversityName: 'NIT Jamshedpur (Civil & Env)',
    affectedPopulationEstimate: 18400
  },
  {
    id: 'cluster-gumla-storage',
    domain: 'agriculture',
    district: 'Gumla',
    block: 'Bishunpur',
    clusterLabel: 'Perishable Produce Spoilage & Cold-Storage Deficit — Gumla Kisan Mandis',
    problemCount: 32,
    problemIds: ['prob-gumla-02'],
    compositeUrgencyScore: 84,
    createdAt: '2026-08-19T00:00:00.000Z',
    masterProblemId: 'prob-gumla-02',
    status: 'in_progress',
    assignedUniversityName: 'Birsa Agricultural University (BAU)',
    affectedPopulationEstimate: 9200
  },
  {
    id: 'cluster-dhanbad-flyash',
    domain: 'environment',
    district: 'Dhanbad',
    block: 'Jharia & Govindpur',
    clusterLabel: 'Coal Mine Fly Ash & PM2.5 Dust Mitigation — Dhanbad Mining Belt',
    problemCount: 29,
    problemIds: ['prob-dhanbad-03'],
    compositeUrgencyScore: 91,
    createdAt: '2026-08-20T00:00:00.000Z',
    masterProblemId: 'prob-dhanbad-03',
    status: 'assigned',
    assignedUniversityName: 'IIT (ISM) Dhanbad',
    affectedPopulationEstimate: 42000
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-garhwa-filter',
    problemId: 'prob-garhwa-01',
    problemRef: INITIAL_PROBLEMS[0],
    universityId: 'uni-nit-jsr',
    universityName: 'NIT Jamshedpur',
    title: 'Low-Cost Activated Alumina & Clay Nano-Filtration Unit for Rural Fluoride Abatement',
    status: 'active',
    leadFaculty: {
      id: 'fac-1',
      name: 'Dr. Alok Kumar',
      department: 'Civil & Environmental Engineering'
    },
    team: [
      { id: 'tm-1', name: 'Abhaya Saran', role: 'student_lead', email: 'abhayasaran2005@gmail.com', department: 'Civil Engg', abcCreditsEarned: 4 },
      { id: 'tm-2', name: 'Priya Soren', role: 'researcher', email: 'priya.s@nitjsr.ac.in', department: 'Environmental Engg', abcCreditsEarned: 3 },
      { id: 'tm-3', name: 'Rahul Murmu', role: 'field_tester', email: 'rahul.m@nitjsr.ac.in', department: 'Mechanical Engg', abcCreditsEarned: 3 }
    ],
    startDate: '2026-08-23',
    expectedEndDate: '2026-10-15',
    solutionSummary: 'Deploying locally-sourced activated alumina cartridge with gravity flow filter vessel requiring zero electric grid power, removing 98.2% fluoride and 99% iron precipitate.',
    deploymentNotes: 'Pilot 1 to be installed in Bhoura Tola primary school campus serving 450 students daily.',
    milestones: [
      { id: 'ms-1', title: 'Groundwater Chemical Assay & Spatial Mapping', description: 'Collected 28 samples from Meral and Ranka blocks; mapped arsenic, fluoride and iron contours.', dueDate: '2026-08-28', status: 'completed', completedAt: '2026-08-28T16:00:00.000Z' },
      { id: 'ms-2', title: 'Filter Media Cartridge Prototyping & Flow Test', description: 'Fabricated 50L/hour gravity feed unit using terracotta clay & alumina matrix.', dueDate: '2026-09-10', status: 'in_progress' },
      { id: 'ms-3', title: 'Field Pilot Installation & Panchayat Handover', description: 'Install community filtration station at Bhoura Primary School and train 4 Jal Sahiya workers.', dueDate: '2026-09-30', status: 'pending' },
      { id: 'ms-4', title: 'Water Quality Certification & Impact Passport Verification', description: 'Final lab water safety test report and student Academic Bank of Credits endorsement.', dueDate: '2026-10-15', status: 'pending' }
    ],
    industryPartners: [
      { id: 'ind-tata-steel', name: 'Tata Steel CSR Foundation', type: 'csr_fund', amountInr: 750000 }
    ],
    documents: [
      { name: 'Meral_Water_Assay_Report_v1.pdf', url: '#', date: '2026-08-28' },
      { name: 'Panchayat_NOC_Bhoura.pdf', url: '#', date: '2026-08-25' }
    ],
    createdAt: '2026-08-22T14:30:00.000Z',
    updatedAt: '2026-08-28T16:00:00.000Z'
  }
];

export const INITIAL_BOUNTIES: IndustryBounty[] = [
  {
    id: 'bounty-tata-01',
    industryId: 'ind-tata-steel',
    industryName: 'Tata Steel CSR Foundation',
    problemId: 'prob-garhwa-01',
    problemTitle: 'Fluoride & Iron Contamination Filter in Garhwa Villages',
    domain: 'water_resources',
    district: 'Garhwa',
    type: 'csr_fund',
    amountInr: 750000,
    status: 'accepted',
    description: 'Co-funding student hardware pilot for 14 village handpump retrofits under Schedule VII Water Conservation CSR pool.',
    createdAt: '2026-08-23T10:00:00.000Z',
    targetDpeSchedule: 'Schedule VII (i) Eradicating hunger, poverty and malnutrition, promoting health care and sanitation'
  },
  {
    id: 'bounty-ccl-02',
    industryId: 'ind-ccl',
    industryName: 'Central Coalfields Limited (CCL) CSR',
    problemId: 'prob-dhanbad-03',
    problemTitle: 'Fly Ash Suppression & PM2.5 Void Dust Control in Jharia',
    domain: 'environment',
    district: 'Dhanbad',
    type: 'csr_fund',
    amountInr: 1200000,
    status: 'accepted',
    description: 'Sponsorship of misting drone prototypes and biological crust hydroseeding to reduce airborne dust in Kusunda mining belt.',
    createdAt: '2026-08-24T11:30:00.000Z',
    targetDpeSchedule: 'Schedule VII (iv) Ensuring environmental sustainability, ecological balance and conservation of natural resources'
  },
  {
    id: 'bounty-jindal-03',
    industryId: 'ind-jindal',
    industryName: 'Jindal Steel & Power Foundation (JSP)',
    problemId: 'prob-gumla-02',
    problemTitle: 'Zero-Electricity Evaporative Cool Chambers for Gumla Farmers',
    domain: 'agriculture',
    district: 'Gumla',
    type: 'co_build',
    amountInr: 520000,
    status: 'accepted',
    description: 'Providing stainless steel refrigeration coils and insulation panels for solar micro-storage chambers in Bishunpur mandis.',
    createdAt: '2026-08-24T15:00:00.000Z',
    targetDpeSchedule: 'Schedule VII (ii) Promoting education and vocational skills enhancement'
  }
];

export const INITIAL_PASSPORTS: ImpactPassportEntry[] = [
  {
    id: 'pass-01',
    studentUserId: 'usr-student-01',
    studentName: 'Abhaya Saran',
    universityName: 'NIT Jamshedpur',
    projectId: 'proj-garhwa-filter',
    problemId: 'JH-2026-00047',
    problemTitle: 'Fluoride & Iron Filtration System for 14 Garhwa Hamlets',
    domain: 'water_resources',
    role: 'Student Team Lead & Hydro-Chemical Modeling',
    outcomeVerified: true,
    outcomeSummary: 'Designed a zero-electricity activated alumina filter cartridge that treats 50L/hr groundwater with 98% fluoride removal, benefiting 2,400 village residents.',
    facultyEndorsement: {
      facultyName: 'Dr. Alok Kumar',
      designation: 'Associate Professor, Civil & Environmental Engineering',
      verifiedAt: '2026-08-28',
      note: 'Exceptional civic engineering rigor. Abhaya led the field sample collection and successfully fabricated the pilot media vessel.'
    },
    abcCredits: 4,
    createdAt: '2026-08-28T16:00:00.000Z'
  },
  {
    id: 'pass-02',
    studentUserId: 'usr-student-01',
    studentName: 'Abhaya Saran',
    universityName: 'NIT Jamshedpur',
    projectId: 'proj-past-02',
    problemId: 'JH-2025-00189',
    problemTitle: 'Smart IoT Moisture Sensor Network for Tribal Upland Paddy in Simdega',
    domain: 'agriculture',
    role: 'IoT Firmware & Solar Power Specialist',
    outcomeVerified: true,
    outcomeSummary: 'Deployed 12 low-cost soil moisture probes with LoRa mesh connectivity, enabling 230 farmers to optimize check-dam irrigation cycles.',
    facultyEndorsement: {
      facultyName: 'Prof. Sunita Murmu',
      designation: 'Professor, Environmental Engineering',
      verifiedAt: '2025-11-14',
      note: 'Verified field implementation and community training.'
    },
    abcCredits: 3,
    createdAt: '2025-11-15T10:00:00.000Z'
  }
];

export const JHARKHAND_UNIVERSITIES = PRELOADED_UNIVERSITIES;

