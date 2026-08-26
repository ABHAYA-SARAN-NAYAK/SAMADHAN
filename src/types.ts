export type UserRole = 'CITIZEN' | 'UNIVERSITY' | 'INDUSTRY' | 'GOVT_ADMIN';

export type ProblemDomain =
  | 'water_resources'
  | 'agriculture'
  | 'healthcare'
  | 'education'
  | 'sanitation'
  | 'environment'
  | 'energy'
  | 'urban_infra'
  | 'rural_livelihood'
  | 'governance';

export type ProblemStatus =
  | 'submitted'
  | 'under_review'
  | 'assigned'
  | 'in_progress'
  | 'deployed'
  | 'resolved'
  | 'rejected';

export type ProblemPriority = 'low' | 'medium' | 'high' | 'critical';

export interface LocationInfo {
  district: string;
  block: string;
  panchayat: string;
  village?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  addressText?: string;
}

export interface MediaItem {
  type: 'image' | 'video' | 'audio';
  url: string;
  tags?: string[];
  caption?: string;
}

export interface AiOutput {
  domain: ProblemDomain;
  confidence: number; // 0 - 1
  urgencyScore: number; // 0 - 100
  solvabilityScore: number; // 0 - 100
  fundabilityScore: number; // 0 - 100
  compositeScore: number; // 0 - 100
  clusterGroupId?: string | null;
  isDuplicate?: boolean;
  duplicateOf?: string | null;
  tags: string[];
  autoTitle?: string;
  translatedDescription?: string;
  detectedLanguage?: string;
  severityReason?: string;
}

export interface Problem {
  id: string;
  problemId: string; // e.g. JH-2026-00047
  title: string;
  description: string;
  voiceTranscript?: string;
  originalLanguage?: string;
  translatedDescription?: string;
  submittedBy: {
    name: string;
    phone?: string;
    role: UserRole;
  };
  submittedAt: string;
  location: LocationInfo;
  media: MediaItem[];
  aiOutput: AiOutput;
  status: ProblemStatus;
  priority: ProblemPriority;
  assignedUniversity?: {
    id: string;
    name: string;
    department?: string;
    leadFaculty?: string;
  } | null;
  assignedAt?: string | null;
  projectId?: string | null;
  industryPartners?: Array<{
    id: string;
    name: string;
    type: 'csr_fund' | 'mentorship' | 'co_build' | 'tech_transfer';
    amountInr?: number;
  }>;
  fundingAmount?: number;
  fundingCurrency?: string;
  citizenRating?: number | null; // 1 - 5
  citizenFeedback?: string | null;
  resolvedAt?: string | null;
  verifiedByLocalBody?: boolean;
  adminNotes?: string;
}

export interface ProblemCluster {
  id: string;
  domain: ProblemDomain;
  district: string;
  block?: string;
  clusterLabel: string;
  problemCount: number;
  problemIds: string[];
  compositeUrgencyScore: number;
  createdAt: string;
  masterProblemId: string;
  status: 'unassigned' | 'assigned' | 'in_progress' | 'resolved';
  assignedUniversityName?: string;
  affectedPopulationEstimate: number;
}

export interface UniversityDepartment {
  name: string;
  domains: ProblemDomain[];
  facultyCount: number;
}

export interface University {
  id: string;
  name: string;
  shortCode: string;
  city: string;
  state: string;
  emailDomain: string;
  departments: UniversityDepartment[];
  expertise: ProblemDomain[];
  facultyProfiles: Array<{
    id: string;
    name: string;
    department: string;
    specialization: string;
  }>;
  incubationCell: boolean;
  activeProjectCount: number;
  totalProjectsCompleted: number;
  successRate: number; // 0 - 1
  avgResolutionDays: number;
  verified: boolean;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedAt?: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  completed?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedAt?: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  completed?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  university: string;
  department: string;
  abcAccountId: string;
  totalCreditsEarned: number;
  verifiedProjects: Array<{
    projectId: string;
    projectTitle: string;
    domain: ProblemDomain;
    role: string;
    location: string;
    beneficiariesCount: number;
    creditsAwarded: number;
    facultyEndorser: string;
    citizenRating: number;
    completionDate: string;
    verificationHash: string;
  }>;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'faculty_lead' | 'student_lead' | 'researcher' | 'field_tester';
  email: string;
  department: string;
  abcCreditsEarned?: number;
}

export interface Project {
  id: string;
  problemId: string;
  problemRef: Problem;
  universityId: string;
  universityName: string;
  title: string;
  status: 'proposed' | 'approved' | 'active' | 'testing' | 'deployed' | 'completed' | 'abandoned';
  leadFaculty: {
    id: string;
    name: string;
    department: string;
  };
  team: TeamMember[];
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string | null;
  solutionSummary?: string;
  deploymentNotes?: string;
  milestones: Milestone[];
  industryPartners: Array<{
    id: string;
    name: string;
    type: string;
    amountInr: number;
  }>;
  documents?: Array<{
    name: string;
    url: string;
    date: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface IndustryBounty {
  id: string;
  industryId: string;
  industryName: string;
  problemId: string;
  problemTitle: string;
  domain: ProblemDomain;
  district: string;
  type: 'csr_fund' | 'mentorship' | 'co_build' | 'tech_transfer';
  amountInr: number;
  status: 'offered' | 'accepted' | 'active' | 'completed';
  description: string;
  createdAt: string;
  targetDpeSchedule?: string;
}

export interface ImpactPassportEntry {
  id: string;
  studentUserId: string;
  studentName: string;
  universityName: string;
  projectId: string;
  problemId: string;
  problemTitle: string;
  domain: ProblemDomain;
  role: string;
  outcomeVerified: boolean;
  outcomeSummary: string;
  facultyEndorsement?: {
    facultyName: string;
    designation: string;
    verifiedAt: string;
    note: string;
  };
  abcCredits: number;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId?: string;
  roleTarget?: UserRole | 'ALL';
  type: 'sms' | 'push' | 'system';
  title: string;
  body: string;
  link?: string;
  timestamp: string;
  read: boolean;
  meta?: {
    problemId?: string;
    phone?: string;
    language?: string;
  };
}

export interface DomainMeta {
  key: ProblemDomain;
  name: string;
  hindiName: string;
  icon: string;
  color: string;
  badgeClass: string;
  jharkhandStat: string;
  sampleProblems: string[];
}
