import React from 'react';
import { Card, Typography } from 'antd';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ReferenceLine, Label } from 'recharts';

const { Text } = Typography;

interface Problem {
  id: string;
  description: string;
  acuity: number;
  strategicImportance: number;
  submittedBy: string;
  isFocalArea?: boolean;
}

interface ProblemMapProps {
  problems: Problem[];
  width?: number;
  height?: number;
}

export const ProblemMap: React.FC<ProblemMapProps> = ({
  problems,
  width = 800,
  height = 600,
}) => {
  const chartMargin = { top: 20, right: 20, bottom: 60, left: 60 };
  const midPoint = 5; // Since our scales are 1-10

  // Transform problems for the scatter plot
  const data = problems.map(problem => ({
    x: problem.strategicImportance,
    y: problem.acuity,
    z: 1, // Size of the point
    name: problem.description,
    problem
  }));

  // Custom tooltip to show problem details
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const problem = payload[0].payload.problem;
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <Text strong className="block mb-2">Problem Details</Text>
          <Text className="block">Description: {problem.description}</Text>
          <Text className="block">Acuity: {problem.acuity}/10</Text>
          <Text className="block">Strategic Importance: {problem.strategicImportance}/10</Text>
          <Text className="block">Submitted by: {problem.submittedBy}</Text>
          {problem.isFocalArea && (
            <div className="mt-2">
              <Text className="text-red-500">Focal Area</Text>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Quadrant labels
  const QuadrantLabel = ({ x, y, value }: { x: number, y: number, value: string }) => (
    <text
      x={x}
      y={y}
      fill="#666"
      textAnchor="middle"
      fontSize={12}
    >
      {value}
    </text>
  );

  return (
    <Card className="w-full">
      <Text className="block mb-4 text-gray-600">
        This map visualizes problems based on their acuity (severity) and strategic importance.
        Problems in red represent focal areas that need immediate attention.
      </Text>
      
      <div className="relative">
        <ScatterChart
          width={width}
          height={height}
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis
            type="number"
            dataKey="x"
            name="Strategic Importance"
            domain={[0, 10]}
            label={{
              value: 'Strategic Importance',
              position: 'bottom',
              offset: 20
            }}
          />
          
          <YAxis
            type="number"
            dataKey="y"
            name="Acuity"
            domain={[0, 10]}
            label={{
              value: 'Acuity (Severity)',
              angle: -90,
              position: 'left',
              offset: 40
            }}
          />

          {/* Reference lines for quadrants */}
          <ReferenceLine x={midPoint} stroke="#666" strokeDasharray="3 3" />
          <ReferenceLine y={midPoint} stroke="#666" strokeDasharray="3 3" />

          {/* Quadrant labels */}
          <QuadrantLabel
            x={width * 0.25}
            y={height * 0.25}
            value="Operational Focus Area"
          />
          <QuadrantLabel
            x={width * 0.75}
            y={height * 0.25}
            value="Strategic Priorities"
          />
          <QuadrantLabel
            x={width * 0.25}
            y={height * 0.75}
            value="Low Priority"
          />
          <QuadrantLabel
            x={width * 0.75}
            y={height * 0.75}
            value="Strategic Opportunities"
          />

          <Tooltip content={<CustomTooltip />} />
          
          <Scatter
            name="Problems"
            data={data}
            fill={(entry: any) => entry.problem.isFocalArea ? '#ef4444' : '#1890ff'}
          />
          
          <ZAxis type="number" dataKey="z" range={[100, 100]} />
        </ScatterChart>
      </div>

      <div className="mt-4">
        <Text type="secondary">
          Hover over points to see problem details. Problems in the top-left quadrant
          represent operational issues that need immediate attention.
        </Text>
      </div>
    </Card>
  );
};
