import React from 'react';
import { Card, Row, Col, Button, Tag, Space } from 'antd';
import { PlusOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockWorkshops } from '../mocks/dummyData';
import dayjs from 'dayjs';

const statusColors = {
  TODO: 'blue',
  IN_PROGRESS: 'orange',
  COMPLETE: 'green',
};

export function Workshops() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || 'default';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workshops</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/workshops/new')}
        >
          Create Workshop
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {mockWorkshops.map(workshop => (
          <Col key={workshop.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              onClick={() => navigate(`/workshops/${workshop.id}`)}
              className="h-full"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold m-0">{workshop.title}</h3>
                  <Tag color={getStatusColor(workshop.status)}>{workshop.status}</Tag>
                </div>

                <Space direction="vertical" className="mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarOutlined />
                    <span>{dayjs(workshop.date).format('MMMM D, YYYY')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TeamOutlined />
                    <span>{workshop.participants.length} Participants</span>
                  </div>
                </Space>

                {workshop.selectedProblem && (
                  <div className="mt-auto">
                    <div className="text-sm text-gray-500">Selected Problem Area:</div>
                    <div className="text-sm">{workshop.selectedProblem.description}</div>
                  </div>
                )}

                {workshop.surveyScheduledDate && (
                  <div className="mt-2 text-sm text-gray-500">
                    Surveys scheduled for: {dayjs(workshop.surveyScheduledDate).format('MMMM D, YYYY')}
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
