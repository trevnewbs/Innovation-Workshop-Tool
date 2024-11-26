import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tabs } from 'antd';
import { SurveyForm } from '../components/surveys/SurveyForm';
import { SurveyResults } from '../components/surveys/SurveyResults';
import { Workshop } from '../types';

// Dummy data for demonstration
const dummyWorkshop: Workshop = {
  id: '1',
  title: 'Innovation Workshop 2024',
  description: 'Annual innovation workshop',
  date: '2024-03-15',
  facilitator: 'John Doe',
  participants: [],
  ideas: [],
  status: 'in-progress',
  surveys: [
    {
      id: '1',
      title: 'Post-Workshop Feedback',
      description: 'Please provide your feedback about the workshop',
      questions: [
        {
          id: '1',
          text: 'How would you rate the overall workshop?',
          type: 'rating',
          required: true
        },
        {
          id: '2',
          text: 'What did you learn from this workshop?',
          type: 'text',
          required: true
        }
      ],
      responses: [
        {
          id: '1',
          participantId: '1',
          answers: [
            { questionId: '1', value: 4 },
            { questionId: '2', value: 'Learned about innovation techniques' }
          ],
          submittedAt: '2024-03-15T10:00:00Z'
        }
      ],
      status: 'active',
      createdAt: '2024-03-15T08:00:00Z'
    }
  ]
};

export function WorkshopDetails() {
  const { id } = useParams<{ id: string }>();
  const [workshop, setWorkshop] = useState<Workshop>(dummyWorkshop);
  const [activeTab, setActiveTab] = useState('1');

  const handleCreateSurvey = (values: any) => {
    const newSurvey = {
      id: String(workshop.surveys.length + 1),
      ...values,
      status: 'active',
      responses: [],
      createdAt: new Date().toISOString()
    };

    setWorkshop(prev => ({
      ...prev,
      surveys: [...prev.surveys, newSurvey]
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{workshop.title}</h1>
        <Button type="primary" onClick={() => setActiveTab('2')}>
          Create Survey
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Survey Results" key="1">
          {workshop.surveys.map(survey => (
            <SurveyResults key={survey.id} survey={survey} />
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Create Survey" key="2">
          <SurveyForm onSubmit={handleCreateSurvey} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}