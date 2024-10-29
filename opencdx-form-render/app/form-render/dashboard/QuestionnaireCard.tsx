import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from '../../../components/ui/button';
import { useNavigation } from '@react-navigation/native';

const QuestionnaireCard = ({ isMobile }: { isMobile: boolean }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-black rounded-xl overflow-hidden" style={{ width: isMobile ? '100%' : 400 }}>
      <Image
      source={require('../../../assets/getcare.png')}
      style={{ width: isMobile ? '100%' : 400, height: isMobile ? 200 : 400 }}
    />
    <View className="p-4">
      <Text className="text-white text-xl font-bold mb-2">Take Specific Questionnaire</Text>
      <Text className="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</Text>
      <Button onPress={() => {
        navigation.navigate('form-render/questionnaire/list' as never);
      }} className="w-full">
        <Text className="text-white text-xl font-bold mb-2">Take Questionnaire</Text>
      </Button>
    </View>
    </View>
  );
};

export default QuestionnaireCard;
