'use client';

import React, { useEffect, useState } from 'react';
import { Manufacturer } from '@/api/logistics';
import { Card, Button } from 'ui-library';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import DescriptionIcon from '@mui/icons-material/Description';
import FactoryIcon from '@mui/icons-material/Factory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ScienceIcon from '@mui/icons-material/Science';
import EditIcon from '@mui/icons-material/Edit';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useRouter } from 'next/navigation';
import { useGetManufacturerList } from '../../hooks/iam-hooks';
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
        <EditIcon fontSize="small" />
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

const FlowPage: React.FC = () => {
  const router = useRouter();
    const { data: manufacturersListData, isError: isErrorList, mutate: mutateManufacturersList } = useGetManufacturerList();
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    mutateManufacturersList({pagination: {pageNumber: 0, pageSize: 100, sortAscending: true}}, {onSuccess: (data) => {
      setManufacturers(data?.data?.manufacturers || []);
    }});
  }, [mutateManufacturersList, isErrorList]);
  const cardData = [
    { icon: <AdminPanelSettingsIcon fontSize="large" />, title: 'Admin', value: '5' , ref: 'admin'},
    { icon: <PublicIcon fontSize="large" />, title: 'Country', value: '25' , ref: 'country'},
    { icon: <DescriptionIcon fontSize="large" />, title: 'Template', value: '10' , ref: 'template'},
    { icon: <FactoryIcon fontSize="large" />, title: 'Manufacturers', value: manufacturers?.length?.toString() ?? '0', ref: 'manufacturers'},
    { icon: <StorefrontIcon fontSize="large" />, title: 'Vendors', value: '100' , ref: 'vendors'},
    { icon: <SmartphoneIcon fontSize="large" />, title: 'Devices', value: '1000' , ref: 'devices'},
    { icon: <ScienceIcon fontSize="large" />, title: 'Tests', value: '200' , ref: 'tests'},
    { icon: <WorkspacesIcon fontSize="large" />, title: 'Organization & Workspace', value: '200', ref: 'organization' },
  ];

  const handleViewDetails = (ref: string) => {
    if (ref === 'organization') {
      router.push('/tables');
    } 
    else if (ref === 'manufacturers') {
      router.push('/manufacturers');
    }
    else {
      console.log(`View details for ${ref}`);
    }
  };

  const handleEdit = (ref: string) => {
    if (ref === 'organization') {
      router.push('/tables');
    } 
    else if (ref === 'manufacturers') {
      router.push('/manufacturers');
    }
    else {
      console.log(`Edit ${ref}`);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-300 text-white p-4 rounded-lg mb-4 flex items-center">
        <img src="/images/person.png" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h1 className="text-2xl font-bold">Flow</h1>
          <p>Flow is a collection of data that is used to create a user journey.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardData.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            onViewDetails={() => handleViewDetails(card.ref)}
            onEdit={() => handleEdit(card.ref)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowPage;