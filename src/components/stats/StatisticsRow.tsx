import { Row, Col } from 'antd';
import { BulbOutlined, TeamOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { StatisticCard } from './StatisticCard';

export function StatisticsRow() {
  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col span={8}>
        <StatisticCard 
          title="Total Workshops"
          value={12}
          prefix={<BulbOutlined />}
        />
      </Col>
      <Col span={8}>
        <StatisticCard 
          title="Total Participants"
          value={48}
          prefix={<TeamOutlined />}
        />
      </Col>
      <Col span={8}>
        <StatisticCard 
          title="Ideas Generated"
          value={156}
          prefix={<CheckCircleOutlined />}
        />
      </Col>
    </Row>
  );
}