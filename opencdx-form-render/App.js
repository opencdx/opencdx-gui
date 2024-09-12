import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native'; // Added import statement for StyleSheet module
import LoginScreen from './screens/LoginScreen';
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import ResetPasswordSuccess from './screens/ResetPasswordSuccess';
import User from './screens/User/User';
import ListQuestion from './screens/User/ListQuestion';
import ListScreen from './screens/ListScreen';
import SuccessScreen from './screens/SuccessScreen';
import TestListScreen from './screens/TakeTest/Flow/TestListScreen';
import OrderPlacedScreen from './screens/TakeTest/Flow/OrderPlacedScreen';
import TestDetailsScreen from './screens/TakeTest/Flow/TestDetailsScreen';
import CartScreen from './screens/TakeTest/Flow/CartScreen';
import PaymentMethodScreen from './screens/TakeTest/Flow/PaymentMethodScreen';
import InsuranceScreen from './screens/TakeTest/Flow/InsuranceScreen';
import AddressSection from './screens/TakeTest/Flow/AddressScreen';

import { GluestackUIProvider} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import StartVirtualConsult from './screens/VirtualConsult/StartVirtualConsult';
import CheckVirtualConsult from './screens/VirtualConsult/CheckVirtualConsult';
import ConfirmVirtualConsult from './screens/VirtualConsult/ConfirmVirtualConsult';
import PriorVirtualConsult from './screens/VirtualConsult/PriorVirtualConsult';
import DoctorVirtualConsult from './screens/VirtualConsult/DoctorVirtualConsult';
import HowSlideVirtualConsult from './screens/VirtualConsult/HowSlideVirtualConsult';
import ProlongedVirtualConsult from './screens/VirtualConsult/ProlongedVirtualConsult';

import Scan from './screens/Scan';


import SlideVirtualConsult from './screens/VirtualConsult/SlideVirtualConsult';
import GetTested from './screens/TakeTest/GetTested';
import ScheduleAppointment from './screens/TakeTest/ScheduleAppoinment';
import TestKit from './screens/TakeTest/TestKit';
import TestHistory from './screens/TestHistory/TestHistory';
import VaccineHistory from './screens/VaccineHistory/VaccineHistory';
import TestRecord from './screens/VaccineHistory/TestRecord';
import CameraScreen from './screens/CameraScreen';
import UploadScreen from './screens/UploadScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import {View, Image, Pressable} from 'react-native';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogout = async (navigation) => {
    try {
      // Clear JWT token or other authentication data
      await AsyncStorage.removeItem('jwtToken');
      // Navigate to the login screen or any other screen
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Logout failed', 'Unable to log out. Please try again.');
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          // Token exists, user is authenticated
          setIsAuthenticated(true);
        } else {
          // No token found, user is not authenticated
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to fetch token from AsyncStorage:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader isVisible={true} />
      </View>
    );
  }
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator initialRouteName={isAuthenticated ? "List" : "Login"}>
          <Stack.Screen name="Login" component={LoginScreen} 
            options={{
              headerShown: false,  
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
          />
          <Stack.Screen name="Signup" component={Signup} 
            options={{
              headerShown: false,  
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} 
            options={{
              headerShown: false,  
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} 
            options={{
              headerShown: false,  
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
          />
          <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccess} 
            options={{
              headerShown: false,  
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
          />
          <Stack.Screen name="List" component={ListScreen} 
            options={({ navigation }) => ({
              headerShown: true,
              headerRight: () => (
                <Pressable onPress={() => handleLogout(navigation)}>
                  <Image
                    source={require('./assets/logout.svg')}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                  />
                </Pressable>),
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            })}
          />
          <Stack.Screen name="User" component={User}
            options={{
              title: 'Home',
              cardStyle: {
                backgroundColor: '#FFFFFF'
              }
            }}
          />
          <Stack.Screen name="ListQuestion" component={ListQuestion}
            options={{
              title: 'List Questionnaire',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
           />
           <Stack.Screen name="Success" component={SuccessScreen}
            options={{
              headerTitle: 'Back',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
             <Stack.Screen name="TestList" component={TestListScreen}
            options={{
              headerTitle: 'Home',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
          <Stack.Screen name="Camera" component={CameraScreen}
            options={{
              headerTitle: 'Back',
              cardStyle: {
                backgroundColor: '#FFFFFF'
              }
            }}
          />
          <Stack.Screen name="UploadScreen" component={UploadScreen}
            options={{
              headerTitle: 'Home',
              cardStyle: {
                backgroundColor: '#FFFFFF'
              }
            }}
          />
          
            <Stack.Screen name="TestDetails" component={TestDetailsScreen}
            options={{
              headerTitle: 'Home',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
            <Stack.Screen name="Cart" component={CartScreen}
            options={{
              headerTitle: 'Back',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen}
            options={{
              headerTitle: 'Back',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen}
            options={{
              headerTitle: 'Back',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
            <Stack.Screen name="Insurance" component={InsuranceScreen}
            options={{
              headerTitle: 'Back',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
            <Stack.Screen name="Address" component={AddressSection}
            options={{
              headerTitle: 'Back',
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            />
          <Stack.Screen name="StartVirtualConsult" component={StartVirtualConsult}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Home',
            }}
            />
          <Stack.Screen name="CheckVirtualConsult" component={CheckVirtualConsult}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Back',
            }}
            />
          <Stack.Screen name="DoctorVirtualConsult" component={DoctorVirtualConsult}
            options={{
              cardStyle: {
                backgroundColor: '#FFFFFF'
              },
              headerTitle: 'Back',
            }}
          />
          <Stack.Screen name="HowSlideVirtualConsult" component={HowSlideVirtualConsult}
            options={{
              cardStyle: {
                backgroundColor: '#FFFFFF'
              },
              headerTitle: 'Back',
            }}
          />
          <Stack.Screen name="ProlongedVirtualConsult" component={ProlongedVirtualConsult}
            options={{
              cardStyle: {
                backgroundColor: '#FFFFFF'
              },
              headerTitle: 'Back',
            }}
          />
          
          <Stack.Screen name="ConfirmVirtualConsult" component={ConfirmVirtualConsult}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Back',
            }}
            />
          <Stack.Screen name="PriorVirtualConsult" component={PriorVirtualConsult}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Back',
            }}
            />

          <Stack.Screen name="SlideVirtualConsult" component={SlideVirtualConsult}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Back',
            }}
            />
          <Stack.Screen name="GetTested" component={GetTested}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Home',
            }}
            />
          <Stack.Screen name="Scan" component={Scan}
            options={{
              cardStyle: {
                backgroundColor: '#FFFFFF'
              },
              headerTitle: 'Home',
            }}
          />
          <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointment}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Home',
            }}
            />
          <Stack.Screen name="TestKit" component={TestKit}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Home',
            }}
            />
          <Stack.Screen name="TestHistory" component={TestHistory}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Home',
            }}
            />
            <Stack.Screen name="TestRecord" component={TestRecord}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Home',
            }}
            />
          <Stack.Screen name="VaccineHistory" component={VaccineHistory}
            options={{
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerTitle: 'Home',
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;