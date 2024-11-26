export interface ProblemInput {
  description: string;
  acuity: number;
  acuityExplanation: string;
  strategicImportance: number;
  strategicImportanceExplanation: string;
}

export interface SurveyTemplate {
  id: string;
  title: string;
  description: string;
  instructions: string;
  sections: {
    problemIdentification: {
      title: string;
      description: string;
      maxProblems: number;
    };
    problemRating: {
      title: string;
      description: string;
      acuityScale: {
        min: number;
        max: number;
        label: string;
      };
      strategicImportanceScale: {
        min: number;
        max: number;
        label: string;
      };
    };
  };
}

export const defaultSurveyTemplate: SurveyTemplate = {
  id: 'default',
  title: 'Market Problems Survey',
  description: 'Help us identify and evaluate key problems in your market',
  instructions: 'Please identify up to three significant problems in your market and rate their importance.',
  sections: {
    problemIdentification: {
      title: 'Problem Identification',
      description: 'What are the most significant problems you observe in your market? Please provide detailed descriptions.',
      maxProblems: 3,
    },
    problemRating: {
      title: 'Problem Evaluation',
      description: 'Please rate each identified problem on two dimensions and provide explanations for your ratings.',
      acuityScale: {
        min: 1,
        max: 10,
        label: 'Acuity (Severity)',
      },
      strategicImportanceScale: {
        min: 1,
        max: 10,
        label: 'Strategic Importance',
      },
    },
  },
};
