import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Space, Tag, Button, Progress, Timeline, Avatar, Tabs, List } from 'antd';
import { ProjectOutlined, TeamOutlined, CalendarOutlined, LinkOutlined, FileTextOutlined, CommentOutlined } from '@ant-design/icons';
import type { Project } from './Projects';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data - in real app this would come from your backend
const mockProject: Project = {
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
};

const mockTimeline = [
  {
    date: '2024-01-15',
    title: 'Project Initiated',
    description: 'Project created from Q4 Technical Review workshop findings'
  },
  {
    date: '2024-01-20',
    title: 'Discovery Phase Started',
    description: 'Began detailed analysis of performance bottlenecks'
  },
  {
    date: '2024-01-25',
    title: 'Stakeholder Meeting',
    description: 'Aligned on project goals and success metrics'
  }
];

const mockDocuments = [
  {
    id: 'd1',
    title: 'Project Charter',
    type: 'PDF',
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2024-01-15'
  },
  {
    id: 'd2',
    title: 'Performance Metrics Baseline',
    type: 'Excel',
    uploadedBy: 'Mike Johnson',
    uploadedAt: '2024-01-20'
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

export const ProjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch the project data based on the id
  const project = mockProject;

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header */}
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
              <Space>
                <ProjectOutlined style={{ fontSize: '24px' }} />
                <Title level={4} style={{ margin: 0 }}>{project.title}</Title>
                <Tag color={getStatusColor(project.status)}>
                  {getStatusText(project.status)}
                </Tag>
              </Space>
              <Button 
                type="link"
                icon={<LinkOutlined />}
                onClick={() => navigate(`/workshops/${project.originalProblem.workshopId}`)}
              >
                View Original Workshop
              </Button>
            </Space>
            <Paragraph>{project.description}</Paragraph>
            <Progress percent={project.progress} />
          </Space>
        </Card>

        {/* Main Content */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card>
              <Tabs defaultActiveKey="timeline">
                <TabPane tab="Timeline" key="timeline">
                  <Timeline
                    items={mockTimeline.map(item => ({
                      children: (
                        <div>
                          <Text strong>{item.title}</Text>
                          <br />
                          <Text>{item.description}</Text>
                          <br />
                          <Text type="secondary">{new Date(item.date).toLocaleDateString()}</Text>
                        </div>
                      )
                    }))}
                  />
                </TabPane>
                <TabPane tab="Documents" key="documents">
                  <List
                    dataSource={mockDocuments}
                    renderItem={doc => (
                      <List.Item
                        actions={[
                          <Button type="link">Download</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<FileTextOutlined />}
                          title={doc.title}
                          description={`Uploaded by ${doc.uploadedBy} on ${new Date(doc.uploadedAt).toLocaleDateString()}`}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="Discussion" key="discussion">
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <CommentOutlined style={{ fontSize: '24px', marginBottom: '16px' }} />
                    <Paragraph>Discussion feature coming soon!</Paragraph>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {/* Key Details */}
              <Card title="Key Details" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text type="secondary">Start Date</Text>
                    <br />
                    <Text>{new Date(project.startDate).toLocaleDateString()}</Text>
                  </div>
                  {project.nextMilestone && (
                    <div>
                      <Text type="secondary">Next Milestone</Text>
                      <br />
                      <Text>{project.nextMilestone.title}</Text>
                      <br />
                      <Text type="secondary">Due: {new Date(project.nextMilestone.dueDate).toLocaleDateString()}</Text>
                    </div>
                  )}
                </Space>
              </Card>

              {/* Stakeholders */}
              <Card title="Stakeholders" size="small">
                <List
                  dataSource={project.stakeholders}
                  renderItem={stakeholder => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar>
                            {stakeholder.name[0]}
                          </Avatar>
                        }
                        title={stakeholder.name}
                        description={`${stakeholder.role}, ${stakeholder.company}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>

              {/* Original Problem */}
              <Card title="Original Problem" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Paragraph>{project.originalProblem.description}</Paragraph>
                  <Button 
                    type="link" 
                    icon={<LinkOutlined />}
                    onClick={() => navigate(`/workshops/${project.originalProblem.workshopId}`)}
                    style={{ padding: 0 }}
                  >
                    View in {project.originalProblem.workshop}
                  </Button>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
};
