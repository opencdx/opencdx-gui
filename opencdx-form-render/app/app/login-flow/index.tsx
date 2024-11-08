import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import SafeHealthBranding from './SafeHealthBranding';
import LoginForm from './LoginForm';

const BRANDING_DISPLAY_DURATION = 2000;

const Dashboard: React.FC = () => {
  const [showBranding, setShowBranding] = useState<boolean>(true);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Login Flow';
    }

    const timer = setTimeout(() => {
      setShowBranding(false);
    }, BRANDING_DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex flex-1">
      {showBranding ? <SafeHealthBranding /> : <LoginForm />}
    </View>
  );
};

export default Dashboard; 