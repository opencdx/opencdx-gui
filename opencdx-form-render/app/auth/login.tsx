import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, Platform, useWindowDimensions } from 'react-native';
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
  const { width } = useWindowDimensions();
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
    <View className="flex flex-1 justify-center items-center bg-white max-w-[500px] w-full mx-auto p-4 sm:p-0 gap-12">
      <Image
        source={require('../../assets/login-logo.png')}
        alt="OpenCDx logo"
      />

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
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
    </ScrollView>
  );
};

export default React.memo(Login);
