import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import MobileDashboard from './MobileDashboard';
import DesktopDashboard from './DesktopDashboard';
import { LayoutGrid, LogOut, User } from 'lucide-react-native';
import { Platform } from 'react-native';
const Dashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  const links = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutGrid size={20} className="text-white" aria-label='dashboard' /> },
    { label: 'My Profile', href: '/profile', icon: <User size={20} className="text-white" aria-label='profile' /> },
    { label: 'Logout', href: '/logout', icon: <LogOut size={20} className="text-white" aria-label='logout' /> },
  ];

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Dashboard';
    }
  }, []);
  return (
    
    Platform.OS=='web' || !isMobile ? <main aria-label="main-layout dashboard" > <DesktopDashboard links={links} /> </main> : <MobileDashboard />
  
  );
};

export default Dashboard;