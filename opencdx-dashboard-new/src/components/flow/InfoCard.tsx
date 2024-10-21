import { Card, Button, Divider, CardHeader } from "@nextui-org/react";
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
      <Card className="w-full h-48 flex flex-col items-center justify-between relative">
        <div className="flex flex-row items-center justify-end w-full">
                 <div className="text-4xl mb-2 mr-12 align-middle justify-center ">{icon}</div>
        <Button isIconOnly variant='light' color='primary' onClick={onEdit}>

          <Suspense fallback={<div>Loading...</div>}>
            <LazyEditIcon fontSize="small" />
            
            </Suspense>
          </Button>
        </div>

        <div className="text-sm text-gray-600 mb-1">{title}</div>
        <div className="text-lg font-semibold mb-4">{value}</div>
        <div onClick={onViewDetails} className="text-white  p-4 align-middle text-center w-full bg-blue-500 hover:text-blue-700">
          View Details
        </div>
      </Card>
    );
};

export default InfoCard;
