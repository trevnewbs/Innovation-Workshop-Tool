import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Steps, 
  DatePicker, 
  Space, 
  Card,
  Typography,
  Radio,
  Alert,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SurveyTemplatePreview } from '../components/Survey/SurveyTemplatePreview';
import { defaultSurveyTemplate } from '../models/surveyTemplate';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export function CreateWorkshop() {
  const [current, setCurrent] = useState(0);
  const [workshopForm] = Form.useForm();
  const [surveyForm] = Form.useForm();
  const [participantsForm] = Form.useForm();
  const [scheduleForm] = Form.useForm();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Workshop Details',
      content: (
        <Card>
          <Form
            form={workshopForm}
            layout="vertical"
            onFinish={() => setCurrent(1)}
          >
            <Form.Item
              name="title"
              label="Workshop Title"
              rules={[{ required: true, message: 'Please enter a workshop title' }]}
            >
              <Input placeholder="Enter workshop title" />
            </Form.Item>

            <Form.Item
              name="date"
              label="Workshop Date"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      title: 'Survey Template',
      content: (
        <Card>
          <Alert
            message="Survey Template Review"
            description="This is the default survey template that will be sent to participants. You can review it below."
            type="info"
            showIcon
            className="mb-6"
          />
          
          <SurveyTemplatePreview template={defaultSurveyTemplate} />

          <div className="mt-6">
            <Space>
              <Button onClick={() => setCurrent(0)}>Previous</Button>
              <Button type="primary" onClick={() => setCurrent(2)}>
                Next
              </Button>
            </Space>
          </div>
        </Card>
      ),
    },
    {
      title: 'Participants',
      content: (
        <Card>
          <Form
            form={participantsForm}
            layout="vertical"
            onFinish={() => setCurrent(3)}
          >
            <Form.List
              name="participants"
              initialValue={[{}]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: 'Name is required' }]}
                      >
                        <Input placeholder="Participant Name" style={{ width: 200 }} />
                      </Form.Item>
                      
                      <Form.Item
                        {...restField}
                        name={[name, 'email']}
                        rules={[
                          { required: true, message: 'Email is required' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input placeholder="Email" style={{ width: 200 }} />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Participant
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Space>
                <Button onClick={() => setCurrent(1)}>Previous</Button>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      title: 'Schedule Survey',
      content: (
        <Card>
          <Form
            form={scheduleForm}
            layout="vertical"
            onFinish={() => {
              // Here we would normally save all the form data and create the workshop
              console.log({
                workshop: workshopForm.getFieldsValue(),
                survey: defaultSurveyTemplate,
                participants: participantsForm.getFieldsValue(),
                schedule: scheduleForm.getFieldsValue(),
              });
              navigate('/workshops');
            }}
          >
            <Form.Item
              name="sendType"
              label="When would you like to send the surveys?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="now">Send Now</Radio>
                  <Radio value="schedule">Schedule for Later</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.sendType !== currentValues.sendType}
            >
              {({ getFieldValue }) =>
                getFieldValue('sendType') === 'schedule' ? (
                  <Form.Item
                    name="scheduledDate"
                    label="Schedule Date"
                    rules={[{ required: true, message: 'Please select a date' }]}
                  >
                    <DatePicker
                      className="w-full"
                      showTime
                      format="YYYY-MM-DD HH:mm"
                    />
                  </Form.Item>
                ) : null
              }
            </Form.Item>

            <Form.Item>
              <Space>
                <Button onClick={() => setCurrent(2)}>Previous</Button>
                <Button type="primary" htmlType="submit">
                  Create Workshop
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Create New Workshop</Title>
      
      <Steps
        current={current}
        items={steps.map(item => ({ title: item.title }))}
        className="mb-8"
      />
      
      <div>{steps[current].content}</div>
    </div>
  );
}
