import React, { useState, useEffect } from 'react';
import { useWindowDimensions, Platform, Image } from 'react-native';
import MobileDashboard from './MobileDashboard';
import DesktopDashboard from './DesktopDashboard';

const Dashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768 || Platform.OS === 'ios' || Platform.OS === 'android';
  
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const links = [
    { 
      label: 'Dashboard', 
      href: 'app/dashboard', 
      selectedIcon: require('../../../assets/unselected_dashboard.png'),
      unselectedIcon: require('../../../assets/unselected_dashboard.png'),
      onClick: () => setSelectedTab('Dashboard')
    },
    { 
      label: 'My Profile', 
      href: 'app/profile', 
      selectedIcon: require('../../../assets/unselected_dashboard.png'),
      unselectedIcon: require('../../../assets/unselected_dashboard.png'),
      onClick: () => setSelectedTab('My Profile')
    },
    { 
      label: 'Logout', 
      href: 'app/auth/login', 
      selectedIcon: require('../../../assets/logout_web.png'),
      unselectedIcon: require('../../../assets/logout_web.png'),
      onClick: () => setSelectedTab('Logout')
    },
  ];
  

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Dashboard';
    }
  }, []);

  return (
    !isMobile 
      ? <main aria-label="main-layout dashboard">
          <DesktopDashboard links={links} selectedTab={selectedTab} />
        </main> 
      : <MobileDashboard />
  );
};

export default Dashboard;
