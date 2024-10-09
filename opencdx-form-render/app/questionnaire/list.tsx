import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface QuestionnaireItem {
  title: string;
  description: string;
  route: string;
}

const questionnaires: QuestionnaireItem[] = [
  {
    title: "Medical History Form",
    description: "Short descriptive text should go here, describing the questionnaire.",
    route: "medical-history",
  },
  {
    title: "Reporting At-home Test Kit results",
    description: "Short descriptive text should go here, describing the questionnaire.",
    route: "at-home-test-kit",
  },
  {
    title: "LIDR",
    description: "Short descriptive text should go here, describing the questionnaire.",
    route: "lidr",
  },
  {
    title: "LIDR E2E",
    description: "Short descriptive text should go here, describing the questionnaire.",
    route: "lidr-e2e",
  },
];

const QuestionnaireList: React.FC = () => {
  const navigation = useNavigation();
  const [isWeb, setIsWeb] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Questionnaires';
      setIsWeb(true);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleQuestionnaireSelect = (route: string) => {
    navigation.navigate(route as never);
  };

  const content = (
    <>
      <Pressable
        className="self-start rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onPress={handleBack}
        role="link"
        aria-label="Back"
      >
        <Text className="font-inter text-base font-normal text-blue-600 p-4 flex flex-row items-center gap-2">
          <MaterialCommunityIcons name="arrow-left" size={16} aria-label="Back" />
          Back
        </Text>
      </Pressable>
      <View className="justify-center items-center px-4 sm:pt-12">
        <View className="w-full max-w-[800px] flex flex-col justify-center items-center gap-4">
          <Text className="font-inter font-medium text-left w-full text-3xl mb-2">
            Questionnaires
          </Text>
          <Text className="font-inter text-lg text-left text-gray-600 w-full mb-6">
            Select one of the options below and begin answering a short series of questions.
          </Text>
          <View className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {questionnaires.map((item, index) => (
              <Pressable
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onPress={() => handleQuestionnaireSelect(item.route)}
              >
                <View className="flex flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="font-inter text-xl font-medium mb-2">{item.title}</Text>
                    <Text className="font-inter text-gray-600">{item.description}</Text>
                  </View>
                  <MaterialCommunityIcons name="arrow-right" size={24} className="text-blue-600" />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView>
      {isWeb ? (
        <main aria-label="main-layout questionnaire-list">
          {content}
        </main>
      ) : (
        content
      )}
    </ScrollView>
  );
};

export default React.memo(QuestionnaireList);
