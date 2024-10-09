import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from '../../components/ui/image'
import { Button } from '../../components/ui/button'
const PasswordChanged: React.FC = () => {
    const navigation = useNavigation();

  const handleProceedToLogin = () => {
    navigation.navigate('auth/login' as never); // Adjust this path as needed
  };
  useEffect(() => {
    document.title = 'Password Changed';
}, []);

  return (
    <main aria-label="main-layout password-changed">
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8  text-center">
        <div className="mb-6 flex justify-center">
          <Image
            source={require('../../assets/reset_pass_success.svg')}
            alt="Success logo"
            
          />
        </div>
        <h1 className="text-xl font-medium mb-2">Password Changed</h1>
        <p className="text-gray-600 text-sm mb-6">Your password has been changed successfully.</p>
        <Button
          onPress={handleProceedToLogin}
        >
          Proceed to Login
        </Button>
       
      </div>
    </div>
    </main>
  );
};

export default PasswordChanged;
