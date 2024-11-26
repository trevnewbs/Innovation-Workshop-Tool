import { Line } from '@ant-design/plots';

interface SurveyChartProps {
  data: {
    value: number;
    date: string;
  }[];
}

export function SurveyChart({ data }: SurveyChartProps) {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    yAxis: {
      min: 0,
      max: 5,
    },
  };

  return <Line {...config} />;
}