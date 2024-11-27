import React, { useState } from 'react';
import { Form, Input, Button, Card, Space, Select, Checkbox, message, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { createRequiredRule, createLengthRule } from '../utils/formValidation';

const { TextArea } = Input;

const questionTypes = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Scale', value: 'scale' },
] as const;

type QuestionType = typeof questionTypes[number]['value'];

interface SurveyQuestion {
  question: string;
  type: QuestionType;
  required: boolean;
  minValue?: number;
  maxValue?: number;
  options?: string[];
}

interface SurveyFormValues {
  title: string;
  description: string;
  questions: SurveyQuestion[];
}

const validateScaleQuestion = (question: SurveyQuestion): void => {
  if (question.type === 'scale') {
    const min = question.minValue ?? 0;
    const max = question.maxValue ?? 10;
    
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('Scale questions must have numeric min and max values');
    }
    
    if (min >= max) {
      throw new Error('Minimum value must be less than maximum value');
    }
    
    if (min < 0 || max > 10) {
      throw new Error('Scale values must be between 0 and 10');
    }
  }
};

export function CreateSurvey() {
  const [form] = Form.useForm<SurveyFormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SurveyFormValues) => {
    try {
      setLoading(true);
      // Validate question configuration
      values.questions.forEach((question, index) => {
        try {
          validateScaleQuestion(question);
        } catch (error) {
          throw new Error(`Question ${index + 1}: ${error instanceof Error ? error.message : 'Invalid scale configuration'}`);
        }
      });

      console.log('Survey created:', values);
      // This would normally send data to an API
      message.success('Survey created successfully!');
      form.resetFields();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to create survey');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionTypeChange = (type: QuestionType, fieldName: number) => {
    const questions = form.getFieldValue('questions');
    const updatedQuestions = [...questions];
    updatedQuestions[fieldName] = {
      ...updatedQuestions[fieldName],
      type,
      minValue: type === 'scale' ? 1 : undefined,
      maxValue: type === 'scale' ? 10 : undefined,
    };
    form.setFieldsValue({ questions: updatedQuestions });
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
          initialValues={{
            questions: [{
              type: 'text' as QuestionType,
              required: true,
              minValue: undefined,
              maxValue: undefined,
            }]
          }}
        >
          <Form.Item
            name="title"
            label="Survey Title"
            rules={[
              createRequiredRule('Please enter a survey title'),
              createLengthRule(5, 100),
            ]}
          >
            <Input placeholder="Enter survey title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Survey Description"
            rules={[
              createRequiredRule('Please enter a survey description'),
              createLengthRule(10, 500),
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter survey description"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.List
            name="questions"
            rules={[
              {
                validator: async (_, questions) => {
                  if (!questions || questions.length < 1) {
                    return Promise.reject(new Error('At least one question is required'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="mb-4"
                    size="small"
                    title={`Question ${name + 1}`}
                    extra={
                      fields.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      )
                    }
                  >
                    <Space direction="vertical" className="w-full">
                      <Form.Item
                        {...restField}
                        name={[name, 'question']}
                        rules={[
                          createRequiredRule('Question text is required'),
                          createLengthRule(5, 200),
                        ]}
                      >
                        <TextArea
                          placeholder="Enter your question"
                          showCount
                          maxLength={200}
                          rows={2}
                        />
                      </Form.Item>
                      
                      <Space>
                        <Form.Item
                          {...restField}
                          name={[name, 'type']}
                          rules={[createRequiredRule('Question type is required')]}
                        >
                          <Select<QuestionType>
                            style={{ width: 120 }}
                            options={questionTypes}
                            placeholder="Select type"
                            onChange={(value) => handleQuestionTypeChange(value, name)}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'required']}
                          valuePropName="checked"
                        >
                          <Checkbox>Required</Checkbox>
                        </Form.Item>
                      </Space>

                      {form.getFieldValue(['questions', name, 'type']) === 'scale' && (
                        <Space>
                          <Form.Item
                            {...restField}
                            name={[name, 'minValue']}
                            label="Min Value"
                            rules={[createRequiredRule('Min value is required')]}
                          >
                            <InputNumber min={0} max={9} style={{ width: 100 }} />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'maxValue']}
                            label="Max Value"
                            rules={[createRequiredRule('Max value is required')]}
                          >
                            <InputNumber min={1} max={10} style={{ width: 100 }} />
                          </Form.Item>
                        </Space>
                      )}
                    </Space>
                  </Card>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Survey
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
