'use client';

import React, { Suspense } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Person } from '@mui/icons-material';

import { useRouter } from 'next/navigation';
import { useFetchEmailTemplates, useFetchSMSTemplates } from '@/hooks/manufacturers-hooks';
// Lazy load InfoCard
const InfoCard = React.lazy(() => import('@/components/flow/InfoCard'));

const FlowPage: React.FC = () => {
  const router = useRouter();
  const { data: emailTemplates = [] } = useFetchEmailTemplates();
  const { data: smsTemplates = [] } = useFetchSMSTemplates();


  const cardData = [
    { icon: <DescriptionIcon fontSize="large" />, title: 'Email Templates', value: emailTemplates.length.toString(), ref: 'template', url: '/pages/templates/email' },
    { icon: <DescriptionIcon fontSize="large" />, title: 'SMS Templates', value: smsTemplates.length.toString(), ref: 'sms', url: '/pages/templates/sms' },
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
