import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, TextInput, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetQuestionnaire } from '~/lib/iam-hooks';
import { CloseIcon } from '@gluestack-ui/themed';
import { Button } from '~/components/ui/button';

const paddingTop = Platform.OS === 'android' ? Math.ceil(StatusBar.currentHeight || 0) : 0;

const TakeQuestionnaire: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { mutate: getQuestionnaire, data } = useGetQuestionnaire();
  const [isWeb, setIsWeb] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        await getQuestionnaire(id);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionnaire();

    if (Platform.OS === 'web') {
      document.title = 'Questionnaires';
      setIsWeb(true);
    }
  }, [getQuestionnaire, isWeb]);

  const handleContinue = () => {
    if (currentQuestionIndex < (data?.data?.item?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const content = (
    <>
      <View className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-4">
        {data?.data?.item && data.data.item.length > 0 && (
          <React.Fragment key={`question-${currentQuestionIndex}`}>
            <Text className="font-inter font-light text-slate-400 text-left w-full text-2xl pl-4 pt-4">
              Question {currentQuestionIndex + 1}
            </Text>
            <Text className="font-inter font-medium text-left w-full text-3xl pl-4">
              {data.data.item[currentQuestionIndex].text}
            </Text>
          </React.Fragment>
        )}
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ paddingTop }} className={`flex-1 bg-white`}>
      <View className="flex flex-row items-center p-5">
        <Text className="flex-1 text-center text-xl text-slate-400">
          Take a Specific Questionnaire
        </Text>
        <Pressable onPress={() => navigation.navigate('app/questionnaire/list' as never)}>
          <CloseIcon style={{ color: '#006FEE' }} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {content}
          {isWeb ? (
            <View className="w-full max-w-[800px] mx-auto px-4 py-4">
              <Button onPress={handleContinue} className="w-full">
                <Text className="text-white text-xl font-bold mb-2">Continue</Text>
              </Button>
            </View>
          ) : (
            <View className="w-full px-4 pb-4" style={{ marginTop: 'auto' }}>
              <Button onPress={handleContinue} className="w-full">
                <Text className="text-white text-xl font-bold mb-2">Continue</Text>
              </Button>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(TakeQuestionnaire);
