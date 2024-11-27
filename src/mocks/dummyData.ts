export interface Problem {
  id: string;
  description: string;
  acuity: number;
  strategicImportance: number;
  submittedBy: string;
  notes: string[];
  isFocalArea: boolean;
}

export type WorkshopStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETE';

export interface Workshop {
  id: string;
  title: string;
  date: string;
  status: WorkshopStatus;
  selectedProblem?: Problem;
  participants: Array<{
    name: string;
    email: string;
    hasSubmittedSurvey: boolean;
  }>;
  surveyScheduledDate?: string;
}

export const mockProblems: Problem[] = [
  // Top Right Quadrant (High Acuity, High Strategic Importance)
  {
    id: '1',
    description: 'Critical security vulnerabilities in cloud infrastructure',
    acuity: 9,
    strategicImportance: 9,
    submittedBy: 'Alice Chen - Security Team',
    notes: ['Multiple potential entry points identified', 'Affects core infrastructure'],
    isFocalArea: false,
  },
  {
    id: '2',
    description: 'Legacy system performance degradation',
    acuity: 8,
    strategicImportance: 8,
    submittedBy: 'John Smith - Enterprise Solutions',
    notes: ['Affecting response times', 'Customer complaints increasing'],
    isFocalArea: false,
  },
  
  // Top Left Quadrant (High Acuity, Low Strategic Importance)
  {
    id: '3',
    description: 'Office printer network connectivity issues',
    acuity: 8,
    strategicImportance: 3,
    submittedBy: 'Sarah Johnson - Office Management',
    notes: ['Frequent disconnections', 'Affects daily operations'],
    isFocalArea: true,
  },
  {
    id: '4',
    description: 'Developer environment setup complexity',
    acuity: 7,
    strategicImportance: 4,
    submittedBy: 'Mike Brown - Development Team',
    notes: ['New hire onboarding delays', 'Inconsistent environments'],
    isFocalArea: true,
  },

  // Bottom Right Quadrant (Low Acuity, High Strategic Importance)
  {
    id: '5',
    description: 'AI/ML integration opportunities',
    acuity: 4,
    strategicImportance: 9,
    submittedBy: 'Emily Wong - Innovation Team',
    notes: ['Competitive advantage potential', 'Long-term strategic value'],
    isFocalArea: false,
  },
  {
    id: '6',
    description: 'Cloud cost optimization',
    acuity: 3,
    strategicImportance: 7,
    submittedBy: 'David Miller - Cloud Operations',
    notes: ['Gradual cost increase', 'Optimization opportunities identified'],
    isFocalArea: false,
  },

  // Bottom Left Quadrant (Low Acuity, Low Strategic Importance)
  {
    id: '7',
    description: 'Internal documentation updates needed',
    acuity: 3,
    strategicImportance: 2,
    submittedBy: 'Lisa Park - Technical Writing',
    notes: ['Some outdated sections', 'Minor inconsistencies'],
    isFocalArea: false,
  },
  {
    id: '8',
    description: 'Meeting room booking system upgrade',
    acuity: 2,
    strategicImportance: 3,
    submittedBy: 'Tom Wilson - Facilities',
    notes: ['Current system functional but dated', 'Nice-to-have improvements'],
    isFocalArea: false,
  },

  // Additional problems spread across quadrants
  {
    id: '9',
    description: 'Local development environment issues',
    acuity: 8,
    strategicImportance: 2,
    submittedBy: 'Rachel Green - Development Team',
    notes: ['Significant developer time waste', 'Affects team productivity'],
    isFocalArea: true,
  },
  {
    id: '10',
    description: 'Internal tool performance issues',
    acuity: 7,
    strategicImportance: 3,
    submittedBy: 'James Wilson - Internal Tools',
    notes: ['Slowing down daily operations', 'Multiple team complaints'],
    isFocalArea: true,
  }
];

export const mockWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'Enterprise Solutions Workshop',
    date: '2024-04-15',
    status: 'TODO',
    selectedProblem: mockProblems[0],
    participants: [
      { name: 'John Smith', email: 'john@example.com', hasSubmittedSurvey: true },
      { name: 'Sarah Johnson', email: 'sarah@example.com', hasSubmittedSurvey: false },
    ],
    surveyScheduledDate: '2024-04-01',
  },
  {
    id: '2',
    title: 'Mobile UX Workshop',
    date: '2024-03-20',
    status: 'IN_PROGRESS',
    selectedProblem: mockProblems[1],
    participants: [
      { name: 'Mike Brown', email: 'mike@example.com', hasSubmittedSurvey: true },
      { name: 'Lisa Davis', email: 'lisa@example.com', hasSubmittedSurvey: true },
    ],
  },
  {
    id: '3',
    title: 'Analytics Innovation Workshop',
    date: '2024-02-28',
    status: 'COMPLETE',
    selectedProblem: mockProblems[2],
    participants: [
      { name: 'Tom Wilson', email: 'tom@example.com', hasSubmittedSurvey: true },
      { name: 'Emma Clark', email: 'emma@example.com', hasSubmittedSurvey: true },
    ],
  },
];
