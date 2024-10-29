import React from 'react';
import { View, Text, Image, ScrollView ,ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestionnaireCard from './QuestionnaireCard';
import HistoryCard from './HistoryCard';
import { LinearGradient } from 'expo-linear-gradient';

const MobileDashboard = () => (
  <SafeAreaView>
    <ImageBackground source={require('../../../assets/background.png')} className="h-screen w-full"> 
      <ScrollView className="flex flex-col h-screen">
        <View className="flex bg-[#F8F9FB] p-6">
          <View className={`flex flex-col gap-2`}>
            {/* Column 1: Take Specific Questionnaire */}
            <View className="bg-black rounded-xl p-4 flex-1">
              <Text className="text-white text-xl font-bold mb-2">Take a Test</Text>
              <Text className="text-gray-400">If you don't already have a test kit, you can order one and have it shipped to you.</Text>
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
        </View>
      </ScrollView>
    </ImageBackground>
  </SafeAreaView>
);

export default MobileDashboard;
