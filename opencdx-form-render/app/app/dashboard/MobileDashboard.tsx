import React from 'react';
import { View, Text, Image, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestionnaireCard from './QuestionnaireCard';
import HistoryCard from './HistoryCard';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '~/components/ui/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
const MobileDashboard = () => {
  const navigation = useNavigation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (<SafeAreaView>
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={{ width: '100%', height: '100%' }} // Expands background image
      resizeMode="cover" // Ensures image covers the entire screen
    >
      <CustomHeader title={currentDate} rightButton={{
        imageSource: require('../../../assets/logout_mobile.png'),
        onPress: () => {
          navigation.navigate("app/auth/login" as never)
        },
      }}
        leftButton={{
          imageSource: require('../../../assets/profile.png'),
          onPress: () => {
            navigation.navigate("app/profile/mobileView" as never)
          },
        }}
        titleStyle={{ fontSize: 12, color: 'lightblue', fontWeight: 'bold' }}
      />
      <ScrollView className="flex flex-col h-screen mb-20">
        <View className="flex p-6">
          <View className='items-center p-4'>
            <Image source={require('../../../assets/opencdx.png')} />
            <Text className="text-gray-400 text-l font-medium mt-6">Welcome to your dashboard John.</Text>
            <Text className="text-gray-400 text-l font-medium mb-4"> Let's see what is available for you today! </Text>
          </View>
          <View className={`flex flex-col gap-2`}>
            {/* Column 1: Take Specific Questionnaire */}
            <View className="bg-black rounded-xl p-4 flex-1">
              <Text className="text-white text-xl font-bold mb-2">Take a Test</Text>
              <Text className="text-gray-400">If you don't already have a test kit, you can order one and have it shipped to you.</Text>
              <Button onPress={() => {
                navigation.navigate('app/test-scan/ScanTestScreen' as never);
              }} className="w-full">
                <Text className="text-white text-xl font-bold mb-2">Take a Test</Text>
              </Button>
            </View>
            <View className="bg-black rounded-xl p-4">
              <View className="flex flex-row items-center">
                <View className=" p-2 rounded-lg mr-4">
                  <Image source={require('../../../assets/passport.png')} className="w-6 h-6" />
                </View>
                <View>
                  <Text className="text-white text-xl font-bold">My Passport</Text>
                  <Text className="text-gray-400">View details and scan QR code.</Text>
                </View>
              </View>
            </View>
            <QuestionnaireCard isMobile={true} />
            <View className="bg-black rounded-xl p-4 flex-1">
              <Text className="text-white text-xl font-bold mb-2">Not Feeling Well</Text>
              <Text className="text-gray-400">Share details about your symptoms to see if you qualify for FDA approved antiviral treatment.</Text>
            </View>
            <HistoryCard isMobile={true} />
          </View>
          <View className='items-center'>
            <Image source={require('../../../assets/footer.png')} className="mt-10 mb-6" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  </SafeAreaView>
  );
}

export default MobileDashboard;
