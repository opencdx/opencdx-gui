'use client';

import React, { Suspense, useEffect, useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from 'next/navigation';
import { useGetManufacturerList, useFetchEventTemplates } from '@/hooks/manufacturers-hooks';
import { Manufacturer } from '@/api/logistics/model/manufacturer';
const InfoCard = React.lazy(() => import('@/components/flow/InfoCard'));

const FlowPage: React.FC = () => {
  const router = useRouter();
  const { data: manufacturersList=[] , mutate: mutateManufacturersList } = useGetManufacturerList();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const { data: eventTemplates = [] } = useFetchEventTemplates();

 
  useEffect(() => {
    mutateManufacturersList({pagination: {pageNumber: 0, pageSize: 100, sortAscending: true}}, {onSuccess: (data) => {
      setManufacturers(data.data.manufacturers ?? []);
    }});
  }, []);

  const cardData = [
    { icon: <DescriptionIcon fontSize="large" />, title: 'Messages', value: eventTemplates.length.toString(), ref: 'message', url: '/pages/communication/message' },
  ];

  return (
    <div className="p-4 w-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-300 text-white p-4 rounded-lg mb-4 flex items-center">
        <img src="/images/person.png" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
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
