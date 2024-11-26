import { Card, Row, Col } from 'antd';
import { Survey } from '../../types';
import { SurveyChart } from './SurveyChart';

interface SurveyResultsProps {
  survey: Survey;
}

export function SurveyResults({ survey }: SurveyResultsProps) {
  const calculateAverageRating = (questionId: string) => {
    const ratings = survey.responses
      .map(response => 
        response.answers.find(a => a.questionId === questionId)?.value
      )
      .filter((value): value is number => typeof value === 'number');
    
    return ratings.length > 0 
      ? ratings.reduce((sum, val) => sum + val, 0) / ratings.length
      : 0;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{survey.title} Results</h2>
      <p className="text-gray-600 mb-6">{survey.description}</p>

      <Row gutter={[16, 16]}>
        {survey.questions.map(question => (
          <Col key={question.id} span={24}>
            <Card title={question.text}>
              {question.type === 'rating' ? (
                <SurveyChart
                  data={survey.responses.map(response => ({
                    value: response.answers.find(a => a.questionId === question.id)?.value as number,
                    date: response.submittedAt
                  }))}
                />
              ) : (
                <div>
                  {survey.responses.map(response => {
                    const answer = response.answers.find(a => a.questionId === question.id);
                    return answer ? (
                      <div key={response.id} className="mb-2 p-2 bg-gray-50 rounded">
                        {answer.value}
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}