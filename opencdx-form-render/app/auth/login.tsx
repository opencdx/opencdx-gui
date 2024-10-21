import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, Platform, useWindowDimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../lib/iam-hooks';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import { useToast, Toast, ToastDescription } from '@gluestack-ui/themed';
import Loader from '../../components/ui/loading';
import { useShowToast } from '~/lib/toast';

const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = useMemo(() => !username || !password, [username, password]);
  const toggleShowPassword = useCallback(() => setShowPassword(prev => !prev), []);

  return { username, setUsername, password, setPassword, showPassword, isDisabled, toggleShowPassword };
};

const Login = () => {
  const { height, width } = useWindowDimensions();
  const isMobile = width <= 768 || Platform.OS === 'ios' || Platform.OS === 'android';
  const navigation = useNavigation();
  const { username, setUsername, password, setPassword, showPassword, isDisabled, toggleShowPassword } = useLoginForm();
  const showToast = useShowToast();

  const handleLoginSuccess = useCallback((data: { token: string }) => {
    AsyncStorage.setItem('serviceToken', data.token);
    navigation.navigate('dashboard/index' as never);
    showToast({ message: 'Login successful.', type: 'success' });
  }, [navigation, showToast]);

  const handleLoginError = useCallback((err: any) => {
    showToast({ message: 'Invalid Credentials.', type: 'error' });
  }, [showToast]);

  const { login, loading } = useLogin(handleLoginSuccess, handleLoginError);

  const handleLogin = useCallback(() => {
    login({ userName: username, password: password });
  }, [username, password, login]);

  const handleSignup = useCallback(() => {
    navigation.navigate('auth/signup' as never);
  }, [navigation]);

  const renderContent = () => (
    <View className="flex flex-1 justify-between items-center bg-white max-w-[500px] w-full mx-auto p-8 gap-8" style={{ height: height - 40 }}>
      {/* Logo */}

      <Image
        source={require('../../assets/login-logo.png')}
        alt="OpenCDx logo"
        className='mt-10'
      />

      {/* Input Fields */}
      <View className="w-full gap-4 sm:gap-6 items-center">
        <Input
          label="Email Address*"
          value={username}
          onChangeText={setUsername}
        />
        <View className="w-full gap-2">
          <Input
            label="Password*"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={
              <Pressable
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onPress={toggleShowPassword}
                role="button"
                aria-label="Toggle password visibility"
              >
                <Image 
                  source={showPassword ? require('../../assets/eye.png') : require('../../assets/cross_eye.png')} 
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="w-6 h-6"
                />
              </Pressable>
            }
          />
          <Pressable
            className="self-end rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onPress={() => navigation.navigate('auth/forgot-password' as never)}
            role="link"
            aria-label="Forgot Password"
          >
            <Text className="font-inter text-base font-normal leading-7 text-right text-blue-600">
              Forgot Password
            </Text>
          </Pressable>
        </View>
      </View>

      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
                <View className="w-full gap-4 items-center">
                <Button
                  onPress={handleLogin}
                  disabled={isDisabled}
                  loading={loading}
                >
                  Login
                </Button>
        
                <View className="flex-row items-center gap-1 justify-center mt-0">
                  <Text className="font-inter text-base font-normal leading-7 text-black">
                    Don't have an account?
                  </Text>
                  <Pressable
                    onPress={handleSignup}
                    role="link"
                    aria-label="Sign Up"
                  >
                    <Text className="text-blue-600">Sign Up</Text>
                  </Pressable>
                </View>
              </View> 
            ) : 
            
            (
              <View className="w-full gap-4 items-center">
                <Button
                  onPress={handleLogin}
                  disabled={isDisabled}
                  loading={loading}
                >
                  Login
                </Button>
        
                <View className="flex-row items-center gap-2">
                    <Text className="font-inter text-base font-normal leading-7 text-right text-black">
                      Don't have an account?
                    </Text>
                    <Pressable
                      onPress={handleSignup}
                      role="link"
                      aria-label="Sign Up"
                    >
                      <Text className="text-blue-600">Sign Up</Text>
                    </Pressable>
                </View>
            </View>
            )}



     

      
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isMobile ? (
        <main aria-label="main-layout Web" className="flex items-center justify-center min-h-screen">
          {renderContent()}
        </main>
      ) : (
        <View className="flex items-center justify-center min-h-screen bg-white">
          {renderContent()}
        </View>
      )}
      <Loader isVisible={loading} />
    </SafeAreaView>
  );
};

export default React.memo(Login);
