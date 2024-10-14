import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { Questionnaire } from '../../api/questionnaire/model/questionnaire';

import { Image } from '../../components/ui/image'

import { useGetQuestionnaireList } from '../../lib/iam-hooks';
import { useNavigation } from 'expo-router';
import Loading from '../../components/ui/loading';

const QuestionnaireList: React.FC = () => {
  const { mutate: getQuestionnaireDataList, data } = useGetQuestionnaireList();

  const navigation = useNavigation();
  const [isWeb, setIsWeb] = useState(Platform.OS === 'web');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        await getQuestionnaireDataList({
          pagination: { pageSize: 300, sortAscending: true },
          updateAnswers: true,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionnaires();

    if (isWeb) {
      document.title = 'Questionnaires';
    }
  }, [getQuestionnaireDataList, isWeb]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleQuestionnaireSelect = useCallback(() => {
    navigation.navigate('questionnaire/take-questionnaire' as never);
  }, [navigation]);

  const content = (
    <>
      <Pressable
        className="self-start rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-row items-center p-2"
        onPress={handleBack}
        role="link"
        aria-label="Back"
      >
        <Image
          source={require('../../assets/back.png')}
          alt="Select Questionnaire"
        />
        <Text className="font-inter text-base font-normal text-blue-600 pl-1 flex flex-row items-center gap-2">
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
          {data?.data?.questionnaires?.map((item: Questionnaire, index: number) => (
              <Pressable
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onPress={() => handleQuestionnaireSelect()}
              >
                <View className="flex flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="font-inter text-xl font-medium mb-2">{item.title}</Text>
                    <Text className="font-inter text-gray-600">{item.description}</Text>
                  </View>
                  <Image
                    source={require('../../assets/arrow-right.png')}
                    alt="Select Questionnaire"
                  />
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
          {isLoading?<Loading isVisible={isLoading} />:content}
        </main>
      ) : (
        isLoading?<Loading isVisible={isLoading}/>:content
      )}
    </ScrollView>
  );
};

export default React.memo(QuestionnaireList);
