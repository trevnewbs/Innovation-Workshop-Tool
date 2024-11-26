import { Form, Input, Select, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { SurveyQuestion } from '../../types';

interface SurveyFormProps {
  onSubmit: (values: {
    title: string;
    description: string;
    questions: SurveyQuestion[];
  }) => void;
}

export function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{ questions: [{ type: 'rating', required: true }] }}
    >
      <Form.Item
        name="title"
        label="Survey Title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input placeholder="Enter survey title" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea placeholder="Enter survey description" />
      </Form.Item>

      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'text']}
                  rules={[{ required: true, message: 'Question text is required' }]}
                >
                  <Input placeholder="Question text" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'type']}
                  rules={[{ required: true }]}
                >
                  <Select style={{ width: 130 }}>
                    <Select.Option value="rating">Rating</Select.Option>
                    <Select.Option value="text">Text</Select.Option>
                    <Select.Option value="multipleChoice">Multiple Choice</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'required']}
                  valuePropName="checked"
                >
                  <Select style={{ width: 100 }}>
                    <Select.Option value={true}>Required</Select.Option>
                    <Select.Option value={false}>Optional</Select.Option>
                  </Select>
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Question
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Survey
        </Button>
      </Form.Item>
    </Form>
  );
}