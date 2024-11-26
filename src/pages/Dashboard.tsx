import { Row, Col, Card } from 'antd';
import { WorkshopCard } from '../components/WorkshopCard';
import { StatisticsRow } from '../components/stats/StatisticsRow';
import { ProblemMap } from '../components/ProblemMap/ProblemMap';
import { mockProblems } from '../mocks/dummyData';

export function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Innovation Workshop Dashboard</h1>
      
      <StatisticsRow />

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card title="Problem Map" className="shadow-sm">
            <ProblemMap problems={mockProblems} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <h2 className="text-xl font-semibold mb-4">Recent Problems</h2>
          <Row gutter={[16, 16]}>
            {mockProblems.map(problem => (
              <Col key={problem.id} span={8}>
                <Card 
                  title={problem.description}
                  className="shadow-sm"
                  extra={problem.isFocalArea ? <span className="text-red-500">Focal Area</span> : null}
                >
                  <p><strong>Submitted by:</strong> {problem.submittedBy}</p>
                  <p><strong>Acuity:</strong> {problem.acuity}/10</p>
                  <p><strong>Strategic Importance:</strong> {problem.strategicImportance}/10</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}