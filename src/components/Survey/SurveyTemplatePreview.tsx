import React from 'react';
import { Card, Typography, Divider, Form, Input, InputNumber, Space } from 'antd';
import { SurveyTemplate } from '../../models/surveyTemplate';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface SurveyTemplatePreviewProps {
  template: SurveyTemplate;
  readOnly?: boolean;
}

export const SurveyTemplatePreview: React.FC<SurveyTemplatePreviewProps> = ({
  template,
  readOnly = true,
}) => {
  const problems = Array(template.sections.problemIdentification.maxProblems).fill(null);

  return (
    <div className="space-y-6">
      <div>
        <Title level={3}>{template.title}</Title>
        <Text>{template.description}</Text>
        <Divider />
        <Text type="secondary" className="block mb-6">
          {template.instructions}
        </Text>
      </div>

      <div className="space-y-6">
        {problems.map((_, index) => (
          <Card 
            key={index}
            title={`Problem ${index + 1}`}
            className="shadow-sm"
          >
            {/* Problem Description */}
            <div className="mb-6">
              <Title level={5}>Description</Title>
              <Text type="secondary" className="block mb-2">
                Please provide a detailed description of the problem.
              </Text>
              <Form.Item
                required
                className="mb-6"
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the problem in detail..."
                  disabled={readOnly}
                />
              </Form.Item>
            </div>

            {/* Problem Ratings */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Title level={5}>Problem Evaluation</Title>
              <Text type="secondary" className="block mb-4">
                Please rate this problem on the following dimensions:
              </Text>

              {/* Acuity Rating */}
              <div className="mb-6">
                <Form.Item
                  label={template.sections.problemRating.acuityScale.label}
                  required
                >
                  <Space direction="vertical" className="w-full">
                    <div className="flex items-center gap-2">
                      <InputNumber
                        min={template.sections.problemRating.acuityScale.min}
                        max={template.sections.problemRating.acuityScale.max}
                        disabled={readOnly}
                        className="w-32"
                      />
                      <Text type="secondary" className="text-sm">
                        (Scale: {template.sections.problemRating.acuityScale.min}-{template.sections.problemRating.acuityScale.max})
                      </Text>
                    </div>
                    <TextArea
                      placeholder="Explain why you gave this acuity rating..."
                      disabled={readOnly}
                      rows={2}
                    />
                  </Space>
                </Form.Item>
              </div>

              {/* Strategic Importance Rating */}
              <Form.Item
                label={template.sections.problemRating.strategicImportanceScale.label}
                required
              >
                <Space direction="vertical" className="w-full">
                  <div className="flex items-center gap-2">
                    <InputNumber
                      min={template.sections.problemRating.strategicImportanceScale.min}
                      max={template.sections.problemRating.strategicImportanceScale.max}
                      disabled={readOnly}
                      className="w-32"
                    />
                    <Text type="secondary" className="text-sm">
                      (Scale: {template.sections.problemRating.strategicImportanceScale.min}-{template.sections.problemRating.strategicImportanceScale.max})
                    </Text>
                  </div>
                  <TextArea
                    placeholder="Explain why you gave this strategic importance rating..."
                    disabled={readOnly}
                    rows={2}
                  />
                </Space>
              </Form.Item>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
