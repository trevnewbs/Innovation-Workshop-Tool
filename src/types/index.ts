export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  facilitator: string;
  participants: Participant[];
  ideas: Idea[];
  status: 'draft' | 'in-progress' | 'completed';
  surveys: Survey[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  votes: number;
  comments: Comment[];
  tags: string[];
  status: 'new' | 'under-review' | 'approved' | 'rejected';
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  status: 'draft' | 'active' | 'closed';
  createdAt: string;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'rating' | 'text' | 'multipleChoice';
  options?: string[];
  required: boolean;
}

export interface SurveyResponse {
  id: string;
  participantId: string;
  answers: {
    questionId: string;
    value: string | number;
  }[];
  submittedAt: string;
}