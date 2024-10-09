import React from 'react';
import { useWindowDimensions } from 'react-native';
import MobileDashboard from './MobileDashboard';
import DesktopDashboard from './DesktopDashboard';
import { LayoutGrid, LogOut, User } from 'lucide-react-native';

const Dashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  const links = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutGrid size={20} className="text-white" aria-label='dashboard' /> },
    { label: 'My Profile', href: '/profile', icon: <User size={20} className="text-white" aria-label='profile' /> },
    { label: 'Logout', href: '/logout', icon: <LogOut size={20} className="text-white" aria-label='logout' /> },
  ];

  return (
    <main aria-label="main-layout dashboard" >
      {isMobile ? <MobileDashboard /> : <DesktopDashboard links={links} />}
    </main>
  );
};

export default Dashboard;