import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import EditProfile from './mobileView';
import ProfileView from './view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Platform } from 'react-native';
const Profile = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768 || Platform.OS=='ios' || Platform.OS=='android';

  const links = [
    { label: 'Dashboard', href: 'form-render/dashboard', icon: <MaterialCommunityIcons name="view-dashboard" size={20} className="text-white"   /> },
    { label: 'My Profile', href: 'form-render/profile', icon: <MaterialCommunityIcons name="account" size={20} className="text-white"  /> },
    { label: 'Logout', href: 'form-render/auth/login', icon: <MaterialCommunityIcons name="logout" size={20} className="text-white"  /> },
  ];

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Profile';
    }
  }, []);
  return (
    
    !isMobile ? <main aria-label="main-layout profile" > <ProfileView links={links} /> </main> : <EditProfile />
  
  );
};

export default Profile;