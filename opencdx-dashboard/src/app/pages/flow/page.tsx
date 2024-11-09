'use client';

import React, { Suspense, useEffect, useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import FactoryIcon from '@mui/icons-material/Factory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ScienceIcon from '@mui/icons-material/Science';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useRouter } from 'next/navigation';
import { useGetManufacturerList, useFetchCountries, useFetchVendors, useFetchOrganizations, useFetchDevices, useFetchTests, useFetchEmailTemplates, useFetchUsers, useFetchEventTemplates, useFetchSMSTemplates, useFetchMessageTemplates } from '@/hooks/manufacturers-hooks';
import { Manufacturer } from '@/api/logistics/model/manufacturer';
import { Person } from '@mui/icons-material';
// Lazy load InfoCard
const InfoCard = React.lazy(() => import('@/components/flow/InfoCard'));

const FlowPage: React.FC = () => {
  const router = useRouter();
  const { data: manufacturersList=[] , mutate: mutateManufacturersList } = useGetManufacturerList();
  const { data: countries = [] } = useFetchCountries();
  const { data: vendors = [] } = useFetchVendors();
  const { data: organizations = [] } = useFetchOrganizations();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const { data: devices = [] } = useFetchDevices();
  const { data: tests=[]} = useFetchTests()
  const { data: adminUsers = [] } = useFetchUsers();

 
  
  useEffect(() => {
    mutateManufacturersList({pagination: {pageNumber: 0, pageSize: 100, sortAscending: true}}, {onSuccess: (data) => {
      setManufacturers(data.data.manufacturers ?? []);
    }});
  }, []);

  const cardData = [
    { icon: <FactoryIcon fontSize="large" />, title: 'Manufacturers', value: manufacturers.length.toString() ?? '0', ref: 'manufacturers', url: '/pages/flow/manufacturers' },
    { icon: <PublicIcon fontSize="large" />, title: 'Country', value: countries.length.toString(), ref: 'country', url: '/pages/flow/country' },
    { icon: <StorefrontIcon fontSize="large" />, title: 'Vendors', value: vendors.length.toString(), ref: 'vendors', url: '/pages/flow/vendors' },
    { icon: <WorkspacesIcon fontSize="large" />, title: 'Organization', value: organizations.length.toString(), ref: 'organizations', url: '/pages/flow/organizations' },
    { icon: <WorkspacesIcon fontSize="large" />, title: 'Workspace', value: organizations.length.toString(), ref: 'workspaces', url: '/pages/flow/workspaces' },
    { icon: <SmartphoneIcon fontSize="large" />, title: 'Devices', value: devices.length.toString(), ref: 'devices', url: '/pages/flow/devices' },
    { icon: <ScienceIcon fontSize="large" />, title: 'Tests', value: tests.length.toString(), ref: 'tests', url: '/pages/flow/tests' },
    { icon: <AdminPanelSettingsIcon fontSize="large" />, title: 'Admin', value: adminUsers.length.toString(), ref: 'admin', url: '/pages/flow/admin' },

  ];


  return (
    <div className="p-4 w-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-300 text-white p-4 rounded-lg mb-4 flex items-center">
        <Person className="w-12 h-12 rounded-full mr-4" /> 
        <div>
          <h1 className="text-2xl font-bold">Flow</h1>
          <p>Flow is a collection of data that is used to create a user journey.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              onViewDetails={() => router.push(card.url)}
              onEdit={() => router.push(card.url)}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default FlowPage;
