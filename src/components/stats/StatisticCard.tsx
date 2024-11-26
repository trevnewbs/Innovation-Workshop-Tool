import { Card, Statistic } from 'antd';
import { ReactNode } from 'react';

interface StatisticCardProps {
  title: string;
  value: number;
  prefix: ReactNode;
}

export function StatisticCard({ title, value, prefix }: StatisticCardProps) {
  return (
    <Card>
      <Statistic 
        title={title}
        value={value}
        prefix={prefix}
      />
    </Card>
  );
}