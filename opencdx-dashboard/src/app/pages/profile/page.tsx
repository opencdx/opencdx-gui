'use client';

import React, { Suspense, useState } from 'react';
import {Login, Password, Restore, Lock} from '@mui/icons-material';
import {Button} from 'ui-library';
import { ArrowLeft } from 'lucide-react';
import { Person } from '@mui/icons-material';
import SignUp from './signup';
import ForgotPassword from './forgot_password';
import ResetPassword from './reset_password';
import PasswordChange from './password_change';
const InfoCard = React.lazy(() => import('@/components/flow/InfoCard'));

const FlowPage: React.FC = () => {
  
  const [activeComponent, setActiveComponent] = useState<React.ReactNode | null>(null);
  const cardData = [
    { icon: <Login fontSize="large" />, title: 'Sign Up', value: '1', ref: 'message', component: <SignUp /> },
    { icon: <Lock fontSize="large" />, title: 'Forgot Password', value: '1', ref: 'message', component: <ForgotPassword /> },
    { icon: <Restore fontSize="large" />, title: 'Reset Password', value: '1', ref: 'message', component: <ResetPassword /> },
    { icon: <Password fontSize="large" />, title: 'Password Change', value: '1', ref: 'message', component: <PasswordChange /> },
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

      {activeComponent === null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            {cardData.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              onViewDetails={() => setActiveComponent(card.component)}
              onEdit={() => setActiveComponent(card.component)}
            />
          ))}
          </Suspense>
        </div>
      )}
      {activeComponent && (
        <div className="w-full h-screen flex flex-col p-4">
        <div className='flex flex-start'>
          <Button 
            onClick={() => setActiveComponent(null)}
            variant='bordered'
            color='primary'
            startContent={<ArrowLeft />}
          >Back</Button>
        </div>
  
          {activeComponent}
        </div>
      )}
    </div>
  );
};

export default FlowPage;
