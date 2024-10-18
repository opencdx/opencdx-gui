import { Card, Button } from "@nextui-org/react";
import React, { Suspense } from 'react';

// Lazy load the EditIcon
const LazyEditIcon = React.lazy(() => import('@mui/icons-material/Edit'));

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    onViewDetails: () => void;
    onEdit: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, onViewDetails, onEdit }) => {
    return (
      <Card className="w-full h-48 flex flex-col items-center justify-between p-4 relative">
        <button onClick={onEdit} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyEditIcon fontSize="small" />
          </Suspense>
        </button>
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-sm text-gray-600 mb-1">{title}</div>
        <div className="text-lg font-semibold mb-4">{value}</div>
        <Button variant="shadow" onClick={onViewDetails} className="text-blue-500 hover:text-blue-700">
          View Details
        </Button>
      </Card>
    );
};

export default InfoCard;
