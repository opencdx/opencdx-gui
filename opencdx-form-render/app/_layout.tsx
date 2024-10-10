import '../global.css';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { useEffect } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const navigation = useNavigation();
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

          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            <Stack >
              <Stack.Screen name="index"

                options={{
                  headerShown: false,
                  title: 'Home',
                  contentStyle: { backgroundColor: 'white' },
                }} />
              <Stack.Screen name="auth/login" options={{
                headerShown: false,
                title: 'Login',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="auth/signup" options={{
                headerShown: false,
                title: 'Signup',
                contentStyle: { backgroundColor: 'white' },
              }} />

              <Stack.Screen name="auth/forgot-password" options={{
                headerShown: true,
                headerStyle: { backgroundColor: 'white', }, // Added borderBottomWidth: 0
                headerTitleStyle: { color: 'black' },
                headerTintColor: 'black',
                headerShadowVisible: false,
                headerTransparent: true,
                headerTitle: () => null,
                headerLeft: () => (
                  <View className='flex flex-row items-center gap-2 pl-4' >
                    <Pressable
                      className='flex flex-row items-center gap-2 text-blue-600'
                      role='button'
                      onPress={() =>
                        navigation.navigate('auth/login' as never)

                      }>
                      <MaterialCommunityIcons name="arrow-left" size={16} color='blue' />
                      <Text className='text-blue-600'>Back</Text>
                    </Pressable>
                  </View>
                ),
              }} />
              <Stack.Screen name="auth/change-password" options={{
                headerShown: true,
                headerStyle: { backgroundColor: 'white', }, // Added borderBottomWidth: 0
                headerTitleStyle: { color: 'black' },
                headerTintColor: 'black',
                headerShadowVisible: false,
                headerTransparent: true,
                headerTitle: () => null,
                headerLeft: () => (
                  <View className='flex flex-row items-center gap-2 pl-4' role='button'>
                    <Pressable
                      className='flex flex-row items-center gap-2 text-blue-600'
                      role='button'
                      onPress={() =>
                        navigation.navigate('auth/forgot-password' as never)

                      }>
                      <MaterialCommunityIcons name="arrow-left" size={16} color='blue' />
                      <Text className='text-blue-600'>Back</Text>
                    </Pressable>
                  </View>
                ),
              }} />
              <Stack.Screen name="auth/password-changed" options={{
                headerShown: false,
                title: 'Password Changed',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="dashboard/index" options={{
                headerShown: false,
                title: 'Dashboard',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="questionnaire/list" options={{
                headerShown: false,
                title: 'Questionnaire',
                contentStyle: { backgroundColor: 'white' },
              }} />
              <Stack.Screen name="profile/view" options={{
                headerShown: false,
                title: 'Profile',
                contentStyle: { backgroundColor: 'white' },
              }} />
            </Stack>
          </NavThemeProvider>
        </GluestackUIProvider>

      </GestureHandlerRootView>

      {/* </ExampleProvider> */}
    </>
  );
}
