import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const HistoryCard = ({ isMobile }: { isMobile: boolean }) => (
  <View className="bg-black rounded-xl p-4" >
    <Text className="text-white text-xl font-bold mb-4">My History</Text>
    <ScrollView horizontal={ true} className="flex flex-row flex-wrap gap-2">
      {[
        { label: 'Test History', image: require('../../assets/testhistory.png') },
        { label: 'Vaccine History', image: require('../../assets/vaccine.png') },
        { label: 'Lorem Ipsum', image: require('../../assets/product1.png') },
        { label: 'Lorem Ipsum', image: require('../../assets/product2.png') },
      ].map((item, index) => (
        <View key={index} className="w-1/2 aspect-square bg-gray-800 rounded-lg overflow-hidden">
          <Image source={item.image} className="w-full h-full o bject-cover" />
          <Text className="text-white text-xs p-4">{item.label}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

export default HistoryCard;
