import '../global.css';
import 'expo-dev-client';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { useEffect } from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  useEffect(() => {
		document.title = 'OpenCDx Form Render';
	}, []);
  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      

      <GestureHandlerRootView style={{ flex: 1 }}>
      
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack >
                <Stack.Screen name="index" 
                
                 options={{ headerShown: false,
                  title: 'Home',
                  contentStyle: { backgroundColor: 'white' },
                 }}/>
                <Stack.Screen name="auth/login"  options={{
                   headerShown: false,
                   title: 'Login',
                   contentStyle: { backgroundColor: 'white' },
                }}/>
                <Stack.Screen name="auth/signup"  options={{ headerShown: false,
                  title: 'Signup',
                  contentStyle: { backgroundColor: 'white' },
                 }}/>

                <Stack.Screen name="auth/forgot-password"  options={{ headerShown: false,
                  title: 'Forgot Password',
                  contentStyle: { backgroundColor: 'white' },
                 }}/>
                <Stack.Screen name="auth/change-password"  options={{ headerShown: false,
                  title: 'Change Password',
                  contentStyle: { backgroundColor: 'white' },
                 }}/>
                <Stack.Screen name="auth/password-changed"  options={{ headerShown: false,
                  title: 'Password Changed',
                  contentStyle: { backgroundColor: 'white' },
                 }}/>
                <Stack.Screen name="dashboard/index"  options={{ headerShown: false,
                  title: 'Dashboard',
                  contentStyle: { backgroundColor: 'white' },
                 }}/>
                 <Stack.Screen name="questionnaire/list"  options={{ headerShown: false,
                  title: 'Questionnaire',
                  contentStyle: { backgroundColor: 'white' },
                 }}/>
              </Stack>
            </NavThemeProvider>
      
      </GestureHandlerRootView>

      {/* </ExampleProvider> */}
    </>
  );
}
