import React from 'react';
import { View, Text, Image } from 'react-native';
import { SidebarLink } from '../../components/ui/sidenav';
import QuestionnaireCard from './QuestionnaireCard';

const DesktopDashboard = ({ links }: { links: any }) => (
  <View className="flex flex-row h-screen">
    <View className="bg-[#020B2D] bg-gradient-to-b from-[#020B2D] from-70% via-[#0A2A88] to-[#0D47E9] w-64 p-4">
      <Image
        source={require('../../assets/long.png')}
        className="w-32 h-8 mb-8"
      />
      {links.map((link: any) => (
        <SidebarLink key={link.href} link={link} />
      ))}
    </View>

    {/* Main Content */}
    <View className="flex-1 bg-[#020B2D] overflow-y-auto">
      {/* Header */}
      <View className="flex flex-row justify-end items-center bg-white p-4  rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <View className="flex flex-row items-center">
          <View className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <Text className="text-white">JG</Text>
          </View>
          <Text className="text-gray-800">John</Text>
        </View>
      </View>

      <View className="flex bg-[#F8F9FB] flex-row justify-between items-center  p-6">
        <View>
          <Text className="text-xl font-bold text-gray-800">Welcome to your dashboard John.</Text>
          <Text className="text-gray-600">Let's see what is available for you today!</Text>
        </View>
        <Text className="text-gray-500">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Text>
      </View>

      <View className="flex  bg-[#F8F9FB] flex-row flex-wrap gap-6 p-6">
        {/* Column 1: Take Specific Questionnaire */}
        <QuestionnaireCard isMobile={false} />

        {/* Column 2: My History, Take a Test, Not Feeling Well, My Passport */}
        <View className="flex-1 space-y-6">
          {/* My History */}
          <View className="bg-black rounded-xl p-4">
            <Text className="text-white text-xl font-bold mb-4">My History</Text>
            <View className="grid grid-cols-4 gap-2">
              {[
                { label: 'Test History', image: require('../../assets/testhistory.png') },
                { label: 'Vaccine History', image: require('../../assets/vaccine.png') },
                { label: 'Lorem Ipsum', image: require('../../assets/product1.png') },
                { label: 'Lorem Ipsum', image: require('../../assets/product2.png') },
              ].map((item, index) => (
                <View key={index} className="aspect-square bg-gray-800 rounded-lg ">
                  <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 ">
                    <Image source={item.image} className="w-full h-full object-cover" />
                    <Text className="text-white text-xs ">{item.label}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Take a Test and Not Feeling Well in a single row */}
          <View className="flex flex-row space-x-6">
            {/* Take a Test */}
            <View className="bg-black rounded-xl p-4 flex-1">
              <Text className="text-white text-xl font-bold mb-2">Take a Test</Text>
              <Text className="text-gray-400">If you don't already have a test kit, you can order one and have it shipped to you.</Text>
            </View>

            {/* Not Feeling Well */}
            <View className="bg-black rounded-xl p-4 flex-1">
              <Text className="text-white text-xl font-bold mb-2">Not Feeling Well</Text>
              <Text className="text-gray-400">Share details about your symptoms to see if you qualify for FDA approved antiviral treatment.</Text>
            </View>
          </View>

          {/* My Passport */}
          <View className="bg-black rounded-xl p-4">
            <View className="flex flex-row items-center">
              <View className=" p-2 rounded-lg mr-4">
                <Image source={require('../../assets/passport.png')} className="w-6 h-6" />
              </View>
              <View>
                <Text className="text-white text-xl font-bold">My Passport</Text>
                <Text className="text-gray-400">View details and scan QR code.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default DesktopDashboard;
