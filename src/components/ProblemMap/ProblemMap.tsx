import React from 'react';
import { Card, Typography } from 'antd';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label, ResponsiveContainer } from 'recharts';
import { useResizeObserver } from '../../hooks/useResizeObserver';

const { Text } = Typography;

// Color constants
const COLORS = {
  FOCAL: '#10B981', // Green color for focal areas
  NON_FOCAL: '#6B7280', // Gray color for non-focal areas
  FOCAL_STROKE: '#047857', // Darker green for focal area stroke
  NON_FOCAL_STROKE: '#4B5563', // Darker gray for non-focal stroke
} as const;

interface Problem {
  id: string;
  description: string;
  acuity: number;
  strategicImportance: number;
  submittedBy: string;
  isFocalArea?: boolean;
}

interface DataPoint {
  x: number;
  y: number;
  name: string;
  problem: Problem;
}

interface ProblemMapProps {
  problems: Problem[];
  minHeight?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
}

export const ProblemMap: React.FC<ProblemMapProps> = ({
  problems,
  minHeight = 500,
}) => {
  const [containerRef] = useResizeObserver<HTMLDivElement>();
  const chartMargin = { top: 20, right: 20, bottom: 60, left: 60 };
  const midPoint = 5; // Since our scales are 1-10

  // Transform problems for the scatter plot
  const data: DataPoint[] = problems.map(problem => ({
    x: problem.strategicImportance,
    y: problem.acuity,
    name: problem.description,
    problem
  }));

  // Custom tooltip to show problem details
  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { problem } = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <Text strong className="block mb-2">Problem Details</Text>
          <Text className="block">Description: {problem.description}</Text>
          <Text className="block">Acuity: {problem.acuity}/10</Text>
          <Text className="block">Strategic Importance: {problem.strategicImportance}/10</Text>
          <Text className="block">Submitted by: {problem.submittedBy}</Text>
          {problem.isFocalArea && (
            <div className="mt-2 text-emerald-600 font-semibold">
              Focal Area
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <Text className="block mb-4 text-gray-600">
        This map visualizes problems based on their acuity (severity) and strategic importance.
        Problems in green represent focal areas that need immediate attention.
      </Text>
      
      <div ref={containerRef} style={{ width: '100%', minHeight }}>
        <ResponsiveContainer width="100%" height={minHeight}>
          <ScatterChart margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Strategic Importance"
              domain={[0, 10]}
              label={{ value: 'Strategic Importance', position: 'bottom' }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Acuity"
              domain={[0, 10]}
              label={{ value: 'Acuity', angle: -90, position: 'left' }}
            />
            
            {/* Quadrant reference lines */}
            <ReferenceLine x={midPoint} stroke="#666" strokeDasharray="3 3">
              <Label value="Strategic Importance Threshold" position="top" />
            </ReferenceLine>
            <ReferenceLine y={midPoint} stroke="#666" strokeDasharray="3 3">
              <Label value="Acuity Threshold" position="right" />
            </ReferenceLine>

            <Tooltip content={<CustomTooltip />} />
            
            {/* Non-focal areas */}
            <Scatter
              name="Non-Focal Problems"
              data={data.filter(d => !d.problem.isFocalArea)}
              fill={COLORS.NON_FOCAL}
              fillOpacity={0.6}
              stroke={COLORS.NON_FOCAL_STROKE}
              strokeWidth={1}
            />

            {/* Focal areas */}
            <Scatter
              name="Focal Problems"
              data={data.filter(d => d.problem.isFocalArea)}
              fill={COLORS.FOCAL}
              fillOpacity={0.7}
              stroke={COLORS.FOCAL_STROKE}
              strokeWidth={2}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <Text type="secondary">
          Hover over points to see problem details. Green points in the top-left quadrant
          represent focal areas that need immediate attention despite lower strategic importance.
        </Text>
      </div>
    </Card>
  );
};
