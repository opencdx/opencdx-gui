import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native'; // Added import statement for StyleSheet module
import LoginScreen from './screens/LoginScreen';
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import ResetPasswordSuccess from './screens/ResetPasswordSuccess';
import Dashboard from './screens/Dashboard';
import EditProfile from './screens/EditProfile';
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
import {View, Pressable} from 'react-native';
import { Image, HStack } from '@gluestack-ui/themed'
import LeftPanel from './components/LeftPanel';
import AvatarView from './components/AvatarView';
// Define Stack Navigators
const { width } = Dimensions.get('window');
// Define a threshold for mobile width (you can adjust this value as needed)
const MOBILE_WIDTH_THRESHOLD = 768; 
const App = () => {
  const isMobile = width <= MOBILE_WIDTH_THRESHOLD;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogout = async (navigation) => {
    try {
      // Clear JWT token or other authentication data
      await AsyncStorage.removeItem('jwtToken');
      // Navigate to the login screen or any other screen
      setIsAuthenticated(false);
    } catch (error) {
      Alert.alert('Logout failed', 'Unable to log out. Please try again.');
    }
  };
  const handleLogin = async (token) => {
    try {
      setIsAuthenticated(true); // Update state on successful login
    } catch (error) {
      Alert.alert('Login failed', 'Unable to log in. Please try again.');
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
  const LeftPanelView = () => (
    <LeftPanel onSelect={(navigation, item) =>{
      navigation.navigate(item.screen);
      if (item.screen === 'Login') {
        handleLogout(navigation);
      }
    }} 
    />
  );
const headerRight = (navigation) => 
                      !isMobile ? (
                      <AvatarView
                      name="John Doe"
                      imageURI="./assets/account_circle_myprofile.png"
                  />
                  ) : (
                      <TouchableOpacity onPress={
                          () => {
                            handleLogout(navigation)
                          }
                          }>
                          <Image
                              size="sm"
                              resizeMode="contain"
                              alt={"logout"}
                              style={styles.icon}
                              source={require('./assets/logout_mobile.png')}
                            />
                        </TouchableOpacity>
                  )

const headerLeft = (navigation) => !isMobile ? null : (
                                <TouchableOpacity onPress={
                                  () => {
                                    navigation.navigate("Profile")
                                  }
                                  }>
                                    <AvatarView
                                    name="John Doe"
                                    style={styles.icon}
                                    imageURI="./assets/account_circle_myprofile.png"
                                  />
                                  </TouchableOpacity>)

const MainNavigator = ({ navigation }) => (
  <Stack.Navigator initialRouteName={isAuthenticated ? "Dashboard" : "Login"}>
          <Stack.Screen name="Login"
            options={{
              headerShown: false,
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
            >
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={Signup} 
            options={({ navigation }) => ({
              headerShown: false,  
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            })}
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
          <Stack.Screen name="Dashboard" component={Dashboard}
            options={({ navigation }) => ({
              headerShown: true,
              cardStyle:{
                backgroundColor:'#FFFFFF'
              },
              headerRight: () => headerRight(navigation),
              headerLeft: () => headerLeft(navigation)
            })}
          />
          <Stack.Screen name="Profile" component={EditProfile}
            options={ () => {
              if(isMobile) {
                return {
                  headerShown: true,
                  cardStyle:{
                    backgroundColor:'#FFFFFF'
                  },
                }
            } else {
              return {
                headerShown: true,
                cardStyle:{
                  backgroundColor:'#FFFFFF'
                },
                headerLeft: null
              }
              }
            }
            }
          />
          <Stack.Screen name="List" component={ListScreen} 
            options={{
              headerShown: false,
              cardStyle:{
                backgroundColor:'#FFFFFF'
              }
            }}
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
);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader isVisible={true} />
      </View>
    );
  }
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer styles={styles.mainContent}>
        { Platform.OS === 'web' && isAuthenticated ? (
          <HStack>
            <LeftPanelView width="30%" />
            <MainNavigator/>
          </HStack>
          ): (
            <MainNavigator/>
          )
        }
      </NavigationContainer>
      </GluestackUIProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  mainContent: {
    backgroundColor: '#f0d0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    ...Platform.select({
      web: {
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
      },
      default: {
          justifyContent: 'space-between',
          width: 30,
          height: 30,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10
      }
  })
}
});

export default App;