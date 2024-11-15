import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import EditProfile from './mobileView';
import ProfileView from './view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Platform } from 'react-native';
const Profile = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768 || Platform.OS=='ios' || Platform.OS=='android';

  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const links = [
    { 
      label: 'Dashboard', 
      href: 'app/dashboard', 
      selectedIcon: require('../../../assets/selected_dashboard.png'),
      unselectedIcon: require('../../../assets/unselected_dashboard.png'),
      onClick: () => setSelectedTab('Dashboard')
    },
    { 
      label: 'My Profile', 
      href: 'app/profile', 
      selectedIcon: require('../../../assets/person_selected.png'),
      unselectedIcon: require('../../../assets/person.png'),
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
      document.title = 'Profile';
    }
  }, []);
  return (
    
    !isMobile ? <main aria-label="main-layout profile" > <ProfileView links={links} selectedTab={selectedTab}/> </main> : <EditProfile />
  
  );
};

export default Profile;