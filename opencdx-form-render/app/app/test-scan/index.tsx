import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useUserFlow } from '../context/UserFlowContext';
import BeginTest from './BeginTest';

const Dashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768 || Platform.OS=='ios' || Platform.OS=='android';
  const [showBranding, setShowBranding] = useState(true);
  const { accountInformationRequired, shippingAddressRequired } = useUserFlow();

  const links = [
    { label: 'Dashboard', href: 'app/dashboard', icon: <MaterialCommunityIcons name="view-dashboard" size={20} className="text-white" /> },
    { label: 'My Profile', href: 'app/profile/', icon: <MaterialCommunityIcons name="account" size={20} className="text-white" /> },
    { label: 'Logout', href: 'app/auth/login', icon: <MaterialCommunityIcons name="logout" size={20} className="text-white" /> },
  ];

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Test Flow';
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
        <BeginTest />
    </View>
  );
};

export default Dashboard; 