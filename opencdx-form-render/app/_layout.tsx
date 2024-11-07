import '../global.css';
import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { useEffect } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { UserFlowProvider } from './app/context/UserFlowContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const queryClient = new QueryClient();
  useEffect(() => {

    if (Platform.OS === 'web') {
      document.title = 'OpenCDx Form Render';
    }
  }, []);
  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />


      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <UserFlowProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack >
                <Stack.Screen name="index"

                  options={{
                    headerShown: false,
                    title: 'Home',
                    contentStyle: { backgroundColor: 'white' },
                  }} />
                <Stack.Screen name="app/auth/login" options={{
                  headerShown: false,
                  title: 'Login',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/auth/signup" options={{
                  headerShown: false,
                  title: 'Signup',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/auth/forgot-password" options={{
                  headerShown: false,
                  title: 'Forgot Password',
                  contentStyle: { backgroundColor: 'white' },
                }} />

               
                <Stack.Screen name="app/auth/change-password" options={{
                  headerShown: false,
                  title: 'Change Password',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/auth/password-changed" options={{
                  headerShown: false,
                  title: 'Password Changed',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/dashboard/index" options={{
                  headerShown: false,
                  title: 'Dashboard',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/questionnaire/list" options={{
                  headerShown: false,
                  title: 'Questionnaire',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/questionnaire/take-questionnaire" options={{
                  headerShown: false,
                  title: 'Questionnaire',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/profile/index" options={{
                  headerShown: false,
                  title: 'Profile',
                  contentStyle: { backgroundColor: 'white' },
                }} />

                {/* Login Flow */}
                <Stack.Screen name="app/login-flow/index" options={{
                  headerShown: false,
                  title: 'Login Flow',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/AccessCodeEntry" options={{
                  headerShown: false,
                  title: 'Access Code Entry',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/SignUp" options={{
                  headerShown: false,
                  title: 'Sign Up',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/Password" options={{
                  headerShown: false,
                  title: 'Password',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/Phone" options={{
                  headerShown: false,
                  title: 'Phone',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/Verification" options={{
                headerShown: false,
                title: 'Verification',
                contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/AccountInformation" options={{
                  headerShown: false,
                  title: 'Account Information',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/ShippingAddress" options={{
                  headerShown: false,
                  title: 'Shipping Address',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/WelcomeScreen" options={{
                  headerShown: false,
                  title: 'Welcome',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/WelcomeScreen-Custom-Internal" options={{
                  headerShown: false,
                  title: 'Welcome',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/login-flow/WelcomeScreen-Custom-External" options={{
                  headerShown: false,
                  title: 'Welcome',
                  contentStyle: { backgroundColor: 'white' },
                }} />

                {/* Test Scan */}
                <Stack.Screen name="app/test-scan/index" options={{
                  headerShown: false,
                  title: 'Test Scan',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/test-scan/ScanTestScreen" options={{
                  headerShown: false,
                  title: 'Scan Test',
                  contentStyle: { backgroundColor: 'white' },
                }} />
                <Stack.Screen name="app/test-scan/ScanCode" options={{
                  headerShown: false,
                  title: 'Scan Code',
                  contentStyle: { backgroundColor: 'white' },
                }} />
              </Stack>
            </NavThemeProvider>
          </UserFlowProvider>
        </QueryClientProvider>
        </GluestackUIProvider>

      </GestureHandlerRootView>
    </>
  );
}
