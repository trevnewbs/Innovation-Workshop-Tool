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
  {
    id: '1',
    description: 'Limited data integration capabilities with legacy systems',
    acuity: 8,
    strategicImportance: 9,
    submittedBy: 'John Smith - Enterprise Solutions',
    notes: ['Critical for enterprise clients', 'Affects 60% of current customers'],
    isFocalArea: true,
  },
  {
    id: '2',
    description: 'Poor mobile user experience in field operations',
    acuity: 7,
    strategicImportance: 6,
    submittedBy: 'Sarah Johnson - Field Operations',
    notes: ['Increasing number of mobile users', 'Competition has better mobile support'],
    isFocalArea: false,
  },
  {
    id: '3',
    description: 'Lack of real-time analytics for decision making',
    acuity: 9,
    strategicImportance: 8,
    submittedBy: 'Mike Brown - Analytics Team',
    notes: ['Could provide competitive advantage', 'High demand from executive users'],
    isFocalArea: false,
  },
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
