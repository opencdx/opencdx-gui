import '../global.css';
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

          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            <Stack >
              <Stack.Screen name="index"

                options={{
                  headerShown: false,
                  title: 'Home',
                  contentStyle: { backgroundColor: 'white' },
                }} />
              <Stack.Screen name="form-render/auth/login" options={{
                headerShown: false,
                title: 'Login',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="form-render/auth/signup" options={{
                headerShown: false,
                title: 'Signup',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="form-render/auth/forgot-password" options={{
                headerShown: false,
                title: 'Forgot Password',
                contentStyle: { backgroundColor: 'white' },
              }} />

             
              <Stack.Screen name="form-render/auth/change-password" options={{
                headerShown: false,
                title: 'Change Password',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="form-render/auth/password-changed" options={{
                headerShown: false,
                title: 'Password Changed',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="form-render/dashboard/index" options={{
                headerShown: false,
                title: 'Dashboard',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="form-render/questionnaire/list" options={{
                headerShown: false,
                title: 'Questionnaire',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="form-render/questionnaire/take-questionnaire" options={{
                headerShown: false,
                title: 'Questionnaire',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="form-render/profile/view" options={{
                headerShown: false,
                title: 'Profile',
                contentStyle: { backgroundColor: 'white' },
              }} />
            </Stack>
          </NavThemeProvider>
        </QueryClientProvider>
        </GluestackUIProvider>

      </GestureHandlerRootView>

      {/* </ExampleProvider> */}
    </>
  );
}
