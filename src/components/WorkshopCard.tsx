import { Card, Tag, Button } from 'antd';
import { Workshop } from '../types';
import { Link } from 'react-router-dom';

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{workshop.title}</h3>
            <Tag color={workshop.status === 'completed' ? 'green' : workshop.status === 'in-progress' ? 'blue' : 'orange'}>
              {workshop.status}
            </Tag>
          </div>
          <p className="text-gray-600 mb-2">{workshop.description}</p>
          <div className="text-sm text-gray-500">
            <div>Date: {new Date(workshop.date).toLocaleDateString()}</div>
            <div>Facilitator: {workshop.facilitator}</div>
            <div>Participants: {workshop.participants.length}</div>
          </div>
        </div>
        <div className="mt-auto">
          <Link to={`/workshops/${workshop.id}`}>
            <Button type="primary" block>View Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}