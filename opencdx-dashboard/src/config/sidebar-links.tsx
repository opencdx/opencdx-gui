import React from 'react';
import { Mail, MailOutlined, SpaceDashboard, SpaceDashboardOutlined, DynamicForm, DynamicFormOutlined , Insights, InsightsOutlined,Chat, ChatOutlined, Extension,ExtensionOutlined, EditAttributes, EditAttributesOutlined,Inventory2, Inventory2Outlined} from '@mui/icons-material';

export const links = [
  {
    label: 'Dashboard',
    href: '/pages/dashboard',
    icon: (
      <SpaceDashboard className="text-white"/>
    ),
    selectedIcon: (
      <SpaceDashboardOutlined className="text-white"/>
    ),
  },
  {
    label: 'User Administration',
    href: '/pages/user-administration',
    icon: (
      <Mail className="text-white"/>
    ),
    selectedIcon: (
      <MailOutlined className="text-white"/>
    ),
  },
  {
    label: 'Classification Engine',
    href: '/pages/classification-engine',
    icon: (
      <Insights className="text-white"/>
    ),
    selectedIcon: (
      <InsightsOutlined className="text-white"/>
    ),
  },
  {
    label: 'Messaging',
    href: '/pages/messaging',
    icon: (
      <Chat className="text-white"/>
    ),
    selectedIcon: (
      <ChatOutlined className="text-white"/>
    ),
  },
  {
    label: 'Forms Builder',
    href: '/pages/form-builder',
    icon: (
      <DynamicForm className="text-white"/>
    ),
    selectedIcon: (
      <DynamicFormOutlined className="text-white"/>
    ),
  },
  {
    label: 'Configuration',
    href: '/pages/configuration',
    icon: (
      <Extension className="text-white"/>
    ),
    selectedIcon: (
      <ExtensionOutlined className="text-white"/>
    ),
  },
  {
    label: 'Toggle Management',
    href: '/pages/toggle-management',
    icon: (
      <EditAttributes className="text-white"/>
    ),
    selectedIcon: (
      <EditAttributesOutlined className="text-white"/>
    ),
  },
  {
    label: 'Test Management',
    href: '/pages/test-management',
    icon: (
      <Inventory2 className="text-white"/>
    ),
    selectedIcon: (
      <Inventory2Outlined className="text-white"/>
    ),
  },
 
];