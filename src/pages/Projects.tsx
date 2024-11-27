import React from 'react';
import { Card, Row, Col, Typography, List, Tag, Space, Progress, Button, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ProjectOutlined, TeamOutlined, CalendarOutlined, LinkOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface ProjectStakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'discovery' | 'development' | 'live' | 'completed';
  progress: number;
  startDate: string;
  originalProblem: {
    id: string;
    description: string;
    workshopId: string;
    workshop: string;
  };
  stakeholders: ProjectStakeholder[];
  nextMilestone?: {
    title: string;
    dueDate: string;
  };
}

// Mock data - in real app this would come from your backend
const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Mobile App Performance Optimization',
    description: 'Developing a suite of performance optimization tools and best practices for mobile applications.',
    status: 'discovery',
    progress: 25,
    startDate: '2024-01-15',
    originalProblem: {
      id: '1',
      description: 'Mobile app performance issues',
      workshopId: 'w1',
      workshop: 'Q4 Technical Review'
    },
    stakeholders: [
      {
        id: 's1',
        name: 'Sarah Chen',
        role: 'Technical Lead',
        company: 'TechCorp',
      },
      {
        id: 's2',
        name: 'Mike Johnson',
        role: 'Product Owner',
        company: 'TechCorp',
      }
    ],
    nextMilestone: {
      title: 'Complete Performance Audit',
      dueDate: '2024-02-01'
    }
  }
];

const getStatusColor = (status: Project['status']) => {
  const colors = {
    discovery: 'blue',
    development: 'orange',
    live: 'green',
    completed: 'purple'
  };
  return colors[status];
};

const getStatusText = (status: Project['status']) => {
  const text = {
    discovery: 'Discovery Phase',
    development: 'In Development',
    live: 'Live',
    completed: 'Completed'
  };
  return text[status];
};

export const Projects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card>
              <List
                dataSource={mockProjects}
                renderItem={(project) => (
                  <List.Item
                    key={project.id}
                    actions={[
                      <Button 
                        type="primary"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        View Details
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<ProjectOutlined style={{ fontSize: '24px' }} />}
                      title={
                        <Space>
                          <Text strong>{project.title}</Text>
                          <Tag color={getStatusColor(project.status)}>
                            {getStatusText(project.status)}
                          </Tag>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Paragraph>{project.description}</Paragraph>
                          <Space split={<Paragraph type="secondary"> | </Paragraph>}>
                            <Space>
                              <CalendarOutlined />
                              <Text type="secondary">Started {new Date(project.startDate).toLocaleDateString()}</Text>
                            </Space>
                            <Space>
                              <LinkOutlined />
                              <Button 
                                type="link" 
                                onClick={() => navigate(`/workshops/${project.originalProblem.workshopId}`)}
                                style={{ padding: 0 }}
                              >
                                From {project.originalProblem.workshop}
                              </Button>
                            </Space>
                          </Space>
                          <Progress percent={project.progress} />
                          <Space direction="vertical">
                            <Space>
                              <TeamOutlined />
                              <Text strong>Key Stakeholders:</Text>
                            </Space>
                            <Avatar.Group>
                              {project.stakeholders.map(stakeholder => (
                                <Avatar 
                                  key={stakeholder.id}
                                  title={`${stakeholder.name} (${stakeholder.role}, ${stakeholder.company})`}
                                >
                                  {stakeholder.name[0]}
                                </Avatar>
                              ))}
                            </Avatar.Group>
                          </Space>
                          {project.nextMilestone && (
                            <Space>
                              <CalendarOutlined />
                              <Text type="secondary">
                                Next Milestone: {project.nextMilestone.title} (Due: {new Date(project.nextMilestone.dueDate).toLocaleDateString()})
                              </Text>
                            </Space>
                          )}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
