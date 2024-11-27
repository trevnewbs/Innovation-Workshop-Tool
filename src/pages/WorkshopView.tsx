import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, List, Typography, Upload, Input, Button, Avatar, Space, Tabs, Modal, Tag, Rate } from 'antd';
import { UploadOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { ProblemMap } from '../components/ProblemMap/ProblemMap';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface ProblemNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

// Updated mock data to include notes for problems
const mockWorkshopData = {
  id: '1',
  title: 'Q1 Product Innovation Workshop',
  date: '2024-01-15',
  status: 'IN_PROGRESS',
  description: 'Quarterly workshop focused on identifying key product innovation opportunities',
  problems: [
    {
      id: '1',
      description: 'Mobile app performance issues',
      acuity: 8,
      strategicImportance: 3,
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
      acuity: 7,
      strategicImportance: 2,
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
      description: 'API documentation gaps',
      acuity: 6,
      strategicImportance: 4,
      submittedBy: 'Alex Kim',
      isFocalArea: false,
      notes: []
    }
  ],
  participants: [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Product Manager',
      email: 'sarah.chen@example.com',
      avatar: null,
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Senior Developer',
      email: 'mike.j@example.com',
      avatar: null,
    },
    {
      id: '3',
      name: 'Alex Kim',
      role: 'UX Designer',
      email: 'alex.kim@example.com',
      avatar: null,
    },
  ],
  documents: [
    {
      name: 'Workshop Agenda.pdf',
      url: '#',
      uploadedBy: 'Sarah Chen',
      uploadDate: '2024-01-10',
    },
    {
      name: 'Customer Feedback Summary.xlsx',
      url: '#',
      uploadedBy: 'Mike Johnson',
      uploadDate: '2024-01-12',
    },
  ],
  notes: 'Initial workshop notes and key takeaways will be documented here.',
};

export const WorkshopView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState(mockWorkshopData.notes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleNotesEdit = () => {
    setIsEditingNotes(true);
  };

  const handleNotesSave = () => {
    setIsEditingNotes(false);
    // Here you would typically save the notes to your backend
  };

  const handleProblemClick = (problem: any) => {
    setSelectedProblem(problem);
    setIsModalVisible(true);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

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

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Problem Map',
      children: (
        <Card>
          <ProblemMap problems={mockWorkshopData.problems} minHeight={400} />
        </Card>
      ),
    },
    {
      key: '2',
      label: 'Problems List',
      children: (
        <Card>
          <List
            itemLayout="vertical"
            dataSource={mockWorkshopData.problems}
            renderItem={(problem) => (
              <List.Item
                actions={[
                  <Button 
                    key="view" 
                    type="link" 
                    onClick={() => handleProblemClick(problem)}
                    icon={<EditOutlined />}
                  >
                    View Details & Notes
                  </Button>
                ]}
                extra={
                  <Space direction="vertical" align="end">
                    <Tag color={problem.isFocalArea ? 'green' : 'default'}>
                      {problem.isFocalArea ? 'Focal Area' : 'Regular'}
                    </Tag>
                    <Space>
                      <Text>Acuity:</Text>
                      <Rate disabled defaultValue={Math.round(problem.acuity / 2)} count={5} />
                    </Space>
                    <Space>
                      <Text>Strategic Importance:</Text>
                      <Rate disabled defaultValue={Math.round(problem.strategicImportance / 2)} count={5} />
                    </Space>
                  </Space>
                }
              >
                <List.Item.Meta
                  title={problem.description}
                  description={
                    <Space direction="vertical">
                      <Text>Submitted by: {problem.submittedBy}</Text>
                      <Text type="secondary">
                        {problem.notes.length} note{problem.notes.length !== 1 ? 's' : ''}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      ),
    },
    {
      key: '3',
      label: 'Participants',
      children: (
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={mockWorkshopData.participants}
            renderItem={(participant) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={participant.name}
                  description={
                    <Space direction="vertical">
                      <Text>{participant.role}</Text>
                      <Text type="secondary">{participant.email}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      ),
    },
    {
      key: '4',
      label: 'Documents',
      children: (
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Document</Button>
            </Upload>
            <List
              itemLayout="horizontal"
              dataSource={mockWorkshopData.documents}
              renderItem={(doc) => (
                <List.Item
                  actions={[<a key="download" href={doc.url}>Download</a>]}
                >
                  <List.Item.Meta
                    title={doc.name}
                    description={
                      <Space direction="vertical">
                        <Text>Uploaded by: {doc.uploadedBy}</Text>
                        <Text type="secondary">Upload date: {doc.uploadDate}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Space>
        </Card>
      ),
    },
    {
      key: '5',
      label: 'Notes',
      children: (
        <Card>
          {isEditingNotes ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <TextArea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={10}
              />
              <Button type="primary" onClick={handleNotesSave}>
                Save Notes
              </Button>
            </Space>
          ) : (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>{notes}</Text>
              <Button onClick={handleNotesEdit}>Edit Notes</Button>
            </Space>
          )}
        </Card>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Title level={2}>{mockWorkshopData.title}</Title>
          <Space direction="vertical">
            <Text>Date: {mockWorkshopData.date}</Text>
            <Text>Status: {mockWorkshopData.status}</Text>
            <Text>{mockWorkshopData.description}</Text>
          </Space>
        </Card>

        <Tabs defaultActiveKey="1" items={items} />

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
                  {selectedProblem.isFocalArea && (
                    <Tag color="green">Focal Area</Tag>
                  )}
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
