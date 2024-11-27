import React, { useState } from 'react';
import { Card, Row, Col, Typography, Statistic, List, Tag, Timeline, Progress, Space, Select, DatePicker, Modal, Rate, Button, Input, Divider } from 'antd';
import { CheckCircleOutlined, SearchOutlined, BulbOutlined, ProjectOutlined, ArrowRightOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(quarterOfYear);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type DateRange = [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;

interface ProblemNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

interface Problem {
  id: string;
  description: string;
  acuity: number;
  strategicImportance: number;
  submittedBy: string;
  isFocalArea: boolean;
  workshopId: string;
  workshop: string;
  notes: ProblemNote[];
  progress: number;
}

interface Project {
  id: string;
  title: string;
  status: string;
  progress: number;
  nextMilestone: {
    title: string;
    dueDate: string;
  };
  stakeholders: {
    id: string;
    name: string;
    role: string;
  }[];
}

// Predefined date ranges
const dateRanges = {
  thisQuarter: [dayjs().startOf('quarter'), dayjs().endOf('quarter')],
  lastQuarter: [dayjs().subtract(1, 'quarter').startOf('quarter'), dayjs().subtract(1, 'quarter').endOf('quarter')],
  ytd: [dayjs().startOf('year'), dayjs()],
  lastYear: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')],
};

// Mock data for dashboard with date-based metrics
const getDashboardData = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => ({
  stats: {
    completedWorkshops: 8,
    problemsIdentified: 15,
    focalAreasIdentified: 6,
    projectsCreated: 4,
  },
  upcomingWorkshops: [
    {
      id: '1',
      title: 'Q1 Product Innovation Workshop',
      date: '2024-01-15',
      participants: 8,
      status: 'TODO',
    },
    {
      id: '2',
      title: 'UX Research Planning Workshop',
      date: '2024-02-01',
      participants: 6,
      status: 'TODO',
    },
  ],
  recentFocalAreas: [
    {
      id: '1',
      description: 'Mobile app performance issues',
      workshop: 'Q4 Technical Review',
      workshopId: 'w1',
      acuity: 8,
      strategicImportance: 3,
      progress: 35,
      submittedBy: 'Sarah Chen',
      isFocalArea: true,
      notes: [
        {
          id: '1',
          content: 'Users reporting slow load times on the dashboard',
          createdAt: '2024-01-15T10:00:00Z',
          createdBy: 'Sarah Chen'
        },
        {
          id: '2',
          content: 'Memory usage spikes during image uploads',
          createdAt: '2024-01-15T11:30:00Z',
          createdBy: 'Mike Johnson'
        }
      ]
    },
    {
      id: '2',
      description: 'Customer onboarding friction',
      workshop: 'Customer Experience Workshop',
      workshopId: 'w2',
      acuity: 7,
      strategicImportance: 2,
      progress: 60,
      submittedBy: 'Mike Johnson',
      isFocalArea: true,
      notes: [
        {
          id: '3',
          content: 'New users getting stuck on email verification step',
          createdAt: '2024-01-15T09:15:00Z',
          createdBy: 'Mike Johnson'
        }
      ]
    },
    {
      id: '3',
      description: 'API Documentation Gaps',
      workshop: 'Developer Experience Workshop',
      workshopId: 'w3',
      acuity: 8,
      strategicImportance: 4,
      progress: 15,
      submittedBy: 'Alex Kim',
      isFocalArea: true,
      notes: []
    },
  ],
  activeProjects: [
    {
      id: 'p1',
      title: 'Mobile App Performance Optimization',
      status: 'discovery',
      progress: 25,
      nextMilestone: {
        title: 'Complete Performance Audit',
        dueDate: '2024-02-01'
      },
      stakeholders: [
        { id: 's1', name: 'Sarah Chen', role: 'Technical Lead' },
        { id: 's2', name: 'Mike Johnson', role: 'Product Owner' }
      ]
    },
    {
      id: 'p2',
      title: 'Customer Onboarding Redesign',
      status: 'development',
      progress: 60,
      nextMilestone: {
        title: 'User Testing',
        dueDate: '2024-02-15'
      },
      stakeholders: [
        { id: 's3', name: 'Alex Kim', role: 'UX Designer' },
        { id: 's4', name: 'Lisa Wong', role: 'Product Manager' }
      ]
    }
  ],
  workshopTimeline: [
    {
      date: '2024-01-10',
      title: 'Workshop Created',
      description: 'Q1 Product Innovation Workshop scheduled',
      type: 'success',
    },
    {
      date: '2024-01-08',
      title: 'Workshop Completed',
      description: 'Q4 Technical Review - 5 focal areas identified',
      type: 'success',
    },
    {
      date: '2024-01-05',
      title: 'New Focal Area Added',
      description: 'Mobile app performance issues identified as critical',
      type: 'warning',
    },
    {
      date: '2024-01-03',
      title: 'Workshop Completed',
      description: 'Customer Experience Workshop - 3 focal areas identified',
      type: 'success',
    },
  ],
});

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange>(dateRanges.thisQuarter);
  const [dashboardData, setDashboardData] = useState(getDashboardData(dateRanges.thisQuarter[0], dateRanges.thisQuarter[1]));
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    if (range && range[0] && range[1]) {
      setDashboardData(getDashboardData(range[0], range[1]));
    }
  };

  const handlePresetChange = (value: string) => {
    const range = dateRanges[value as keyof typeof dateRanges];
    setDateRange(range);
    setDashboardData(getDashboardData(range[0], range[1]));
  };

  const handleProblemClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setIsModalVisible(true);
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedProblem) return;

    const newNoteObj: ProblemNote = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User', // This would come from auth context in real app
    };

    // In a real app, this would be handled by your state management solution
    selectedProblem.notes.push(newNoteObj);
    setNewNote('');
  };

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Date Range Filter */}
        <Card>
          <Space direction="horizontal" size="middle">
            <Text strong>Filter by Date Range:</Text>
            <Select
              defaultValue="thisQuarter"
              style={{ width: 200 }}
              onChange={handlePresetChange}
              options={[
                { label: 'This Quarter', value: 'thisQuarter' },
                { label: 'Last Quarter', value: 'lastQuarter' },
                { label: 'Year to Date', value: 'ytd' },
                { label: 'Last Year', value: 'lastYear' },
              ]}
            />
            <Text>or</Text>
            <RangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              allowClear={false}
            />
          </Space>
        </Card>

        {/* Overview Statistics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Completed Workshops"
                value={dashboardData.stats.completedWorkshops}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Opportunities Identified"
                value={dashboardData.stats.problemsIdentified}
                prefix={<SearchOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Focal Areas Identified"
                value={dashboardData.stats.focalAreasIdentified}
                prefix={<BulbOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Projects Created"
                value={dashboardData.stats.projectsCreated}
                prefix={<ProjectOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row gutter={[16, 16]}>
          {/* Left Column */}
          <Col xs={24} md={16}>
            {/* Active Projects */}
            <Card 
              title={
                <Space>
                  <ProjectOutlined />
                  <span>Active Projects</span>
                </Space>
              }
              className="mb-4"
            >
              <List
                dataSource={dashboardData.activeProjects}
                renderItem={(project) => (
                  <List.Item
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <List.Item.Meta
                      avatar={<ProjectOutlined style={{ fontSize: '24px' }} />}
                      title={
                        <Space>
                          <Text strong>{project.title}</Text>
                          <Tag color={project.status === 'discovery' ? 'blue' : 'orange'}>
                            {project.status === 'discovery' ? 'Discovery Phase' : 'In Development'}
                          </Tag>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" style={{ width: '100%' }} size="small">
                          <Progress percent={project.progress} size="small" />
                          <Space split={<Divider type="vertical" />}>
                            <Space>
                              <CalendarOutlined />
                              <Text type="secondary">
                                Next: {project.nextMilestone.title} (Due: {new Date(project.nextMilestone.dueDate).toLocaleDateString()})
                              </Text>
                            </Space>
                            <Space>
                              <TeamOutlined />
                              <Text type="secondary">
                                {project.stakeholders.map(s => s.name).join(', ')}
                              </Text>
                            </Space>
                          </Space>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Recent Focal Areas */}
            <Card title="Recent Focal Areas" className="mb-4">
              <List
                dataSource={dashboardData.recentFocalAreas}
                renderItem={(area) => (
                  <List.Item
                    actions={[
                      <Button
                        key="view"
                        type="link"
                        onClick={() => handleProblemClick(area)}
                      >
                        View Details
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={area.description}
                      description={
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Text>Workshop: {area.workshop}</Text>
                          <Text>Acuity: {area.acuity}/10</Text>
                          <Progress percent={area.progress} size="small" />
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Right Column */}
          <Col xs={24} md={8}>
            {/* Upcoming Workshops */}
            <Card 
              title={
                <Space>
                  <TeamOutlined />
                  <span>Upcoming Workshops</span>
                </Space>
              }
              className="mb-4"
              extra={
                <Button type="link" onClick={() => navigate('/workshops')}>
                  View All
                </Button>
              }
            >
              <List
                dataSource={dashboardData.upcomingWorkshops || []}
                renderItem={(workshop) => (
                  <List.Item
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/workshops/${workshop.id}`)}
                  >
                    <List.Item.Meta
                      avatar={<TeamOutlined />}
                      title={workshop.title}
                      description={
                        <Text type="secondary">
                          {new Date(workshop.date).toLocaleDateString()}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Activity Timeline */}
            <Card title="Recent Activity">
              <Timeline
                items={dashboardData.workshopTimeline?.map(item => ({
                  color: item.type === 'success' ? 'green' : 'blue',
                  children: (
                    <div>
                      <Text strong>{item.title}</Text>
                      <br />
                      <Text>{item.description}</Text>
                      <br />
                      <Text type="secondary">{item.date}</Text>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>
        </Row>

        {/* Problem Detail Modal */}
        <Modal
          title={selectedProblem?.description}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={700}
        >
          {selectedProblem && (
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Card size="small">
                <Space direction="vertical">
                  <Space>
                    <Text strong>Acuity:</Text>
                    <Rate disabled defaultValue={Math.round(selectedProblem.acuity / 2)} count={5} />
                  </Space>
                  <Space>
                    <Text strong>Strategic Importance:</Text>
                    <Rate disabled defaultValue={Math.round(selectedProblem.strategicImportance / 2)} count={5} />
                  </Space>
                  <Text><strong>Submitted by:</strong> {selectedProblem.submittedBy}</Text>
                  <Space>
                    <Text><strong>Workshop:</strong> {selectedProblem.workshop}</Text>
                    <Button 
                      type="link" 
                      icon={<ArrowRightOutlined />}
                      onClick={() => {
                        setIsModalVisible(false);
                        navigate(`/workshops/${selectedProblem.workshopId}`);
                      }}
                    >
                      Go to Workshop
                    </Button>
                  </Space>
                  <Progress percent={selectedProblem.progress} size="small" />
                  <Button
                    type="primary"
                    icon={<ProjectOutlined />}
                    onClick={() => {
                      // In a real app, this would create a new project in the backend
                      // For now, we'll just navigate to the projects page
                      setIsModalVisible(false);
                      navigate('/projects');
                    }}
                  >
                    Create Project from This Problem
                  </Button>
                </Space>
              </Card>

              <div>
                <Title level={4}>Notes</Title>
                <List
                  itemLayout="vertical"
                  dataSource={selectedProblem.notes}
                  renderItem={(note: ProblemNote) => (
                    <List.Item>
                      <Text>{note.content}</Text>
                      <div className="mt-2">
                        <Text type="secondary">
                          Added by {note.createdBy} on {new Date(note.createdAt).toLocaleDateString()}
                        </Text>
                      </div>
                    </List.Item>
                  )}
                />
              </div>

              <div>
                <Title level={4}>Add Note</Title>
                <Space.Compact style={{ width: '100%' }}>
                  <TextArea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note..."
                    rows={3}
                  />
                </Space.Compact>
                <Button
                  type="primary"
                  onClick={handleAddNote}
                  className="mt-2"
                  disabled={!newNote.trim()}
                >
                  Add Note
                </Button>
              </div>
            </Space>
          )}
        </Modal>
      </Space>
    </div>
  );
};