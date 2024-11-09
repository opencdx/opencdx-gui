'use client';

import React, { Suspense } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
// Lazy load InfoCard
const InfoCard = React.lazy(() => import('@/components/flow/InfoCard'));

const FlowPage: React.FC = () => {
  const router = useRouter();
  const [helpOpen, setHelpOpen] = React.useState(false);
  const [helpContent, setHelpContent] = React.useState<{ title: string; content: React.ReactNode }>({ 
    title: '', 
    content: null 
  });

  const helpContentData = {
    system: {
      title: 'System Toggles',
      content: (
        <div className="space-y-4">
          <p>System toggles control application-wide behaviors and configurations. These affect the entire platform and are typically used for:</p>
          <ul className="list-disc pl-6">
            <li>Maintenance mode activation</li>
            <li>Debug/logging levels</li>
            <li>Performance monitoring</li>
            <li>Database failover settings</li>
            <li>Cache configuration</li>
          </ul>
          <p className="text-sm text-gray-600">Note: Changes to system toggles may affect all users and should be managed carefully.</p>
        </div>
      )
    },
    feature: {
      title: 'Feature Toggles',
      content: (
        <div className="space-y-4">
          <p>Feature toggles manage specific functionality within the application. They are commonly used for:</p>
          <ul className="list-disc pl-6">
            <li>A/B testing new features</li>
            <li>Gradual feature rollouts</li>
            <li>Beta feature management</li>
            <li>Experimental features</li>
          </ul>
          <p className="text-sm text-gray-600">These toggles allow for fine-grained control over individual features.</p>
        </div>
      )
    },
    client: {
      title: 'Client Features',
      content: (
        <div className="space-y-4">
          <p>Client features control access based on specific client agreements and subscriptions. Use these to:</p>
          <ul className="list-disc pl-6">
            <li>Enable/disable features per client</li>
            <li>Manage subscription-based access</li>
            <li>Control client-specific customizations</li>
          </ul>
          <p className="text-sm text-gray-600">Changes here will only affect specific clients based on their agreements.</p>
        </div>
      )
    }
  };

  const showHelp = (type: 'system' | 'feature' | 'client') => {
    setHelpContent(helpContentData[type]);
    setHelpOpen(true);
  };

  const systemCardData = [
    { 
      icon: <SettingsSystemDaydreamIcon fontSize="large" />, 
      title: 'System Toggles', 
      description: 'Control system-wide behaviors like maintenance mode, logging, monitoring',
      value: '5', // Replace with actual count
      ref: 'system-wide', 
      url: '/toggle/system/global' 
    },
  ];

  const featureCardData = [
    { 
      icon: <ToggleOnIcon fontSize="large" />, 
      title: 'Feature Toggles', 
      description: 'Manage specific features, beta rollouts, and A/B tests',
      value: '12', // Replace with actual count
      ref: 'feature-toggles', 
      url: '/toggle/features' 
    },
  ];

  const clientCardData = [
    { 
      icon: <BusinessIcon fontSize="large" />, 
      title: 'Client Features', 
      description: 'Control feature access based on client agreements',
      value: '8', // Replace with actual count
      ref: 'client-features', 
      url: '/toggle/client/features' 
    },
  ];

  return (
    <div className="p-4 w-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-300 text-white p-4 rounded-lg mb-4 flex items-center">
        <ToggleOnIcon className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h1 className="text-2xl font-bold">Feature Toggle Management</h1>
          <p>Manage system and client-specific feature toggles</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">System Configuration</h2>
          <button
            onClick={() => showHelp('system')}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Help for system toggles"
          >
            <HelpOutlineIcon className="text-gray-600" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">Control application-wide settings and behaviors</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            {systemCardData.map((card, index) => (
              <InfoCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                value={card.value}
                onViewDetails={() => router.push(card.url)}
                onEdit={() => router.push(card.url)}
              />
            ))}
          </Suspense>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Feature Management</h2>
          <button
            onClick={() => showHelp('feature')}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Help for feature toggles"
          >
            <HelpOutlineIcon className="text-gray-600" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">Control specific features and functionality</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            {featureCardData.map((card, index) => (
              <InfoCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                value={card.value}
                onViewDetails={() => router.push(card.url)}
                onEdit={() => router.push(card.url)}
              />
            ))}
          </Suspense>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Client Management</h2>
          <button
            onClick={() => showHelp('client')}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Help for client features"
          >
            <HelpOutlineIcon className="text-gray-600" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">Manage feature access per client agreement</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            {clientCardData.map((card, index) => (
              <InfoCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                value={card.value}
                onViewDetails={() => router.push(card.url)}
                onEdit={() => router.push(card.url)}
              />
            ))}
          </Suspense>
        </div>
      </div>

      <Dialog 
        open={helpOpen} 
        onClose={() => setHelpOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{helpContent.title}</DialogTitle>
        <DialogContent>
          {helpContent.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FlowPage;
