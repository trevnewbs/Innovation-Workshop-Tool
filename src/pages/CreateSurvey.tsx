import React from 'react';
import { Form, Input, Button, Card, InputNumber, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export function CreateSurvey() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Survey created:', values);
    // This would normally send data to an API
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Survey</h1>
      
      <Card className="shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Survey Title"
            rules={[{ required: true, message: 'Please enter a survey title' }]}
          >
            <Input placeholder="Enter survey title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Survey Description"
            rules={[{ required: true, message: 'Please enter a survey description' }]}
          >
            <TextArea rows={4} placeholder="Enter survey description" />
          </Form.Item>

          <Form.List
            name="questions"
            initialValue={[{}]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'question']}
                      rules={[{ required: true, message: 'Missing question' }]}
                    >
                      <Input placeholder="Enter question" style={{ width: '400px' }} />
                    </Form.Item>
                    
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[{ required: true, message: 'Missing type' }]}
                    >
                      <Input placeholder="Question type" style={{ width: '200px' }} />
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
      </Card>
    </div>
  );
}
