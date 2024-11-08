import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetQuestionnaire } from '~/lib/iam-hooks';
import { CloseIcon } from '@gluestack-ui/themed';
import { Button } from '~/components/ui/button';
import { Input } from '../../../components/ui/input';
import { RadioInput }  from '../../../components/ui/radioInput';

const useGetQuestionnaireForm = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return { answers, handleAnswerChange };
};

const paddingTop = Platform.OS === 'android' ? Math.ceil(StatusBar.currentHeight || 0) : 0;

const TakeQuestionnaire: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { mutate: getQuestionnaire, data } = useGetQuestionnaire();
  const [isWeb, setIsWeb] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { answers, handleAnswerChange } = useGetQuestionnaireForm();

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

    console.log("Current Question Data:", data?.data?.item?.[currentQuestionIndex]);
  }, [getQuestionnaire, isWeb]);

  const handleContinue = () => {
    if (currentQuestionIndex < (data?.data?.item?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const content = (

    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20 }}>
      <View className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-4">
        {data?.data?.item && data.data.item.length > 0 && (
          <React.Fragment key={`question-${currentQuestionIndex}`}>
            <Text className="font-inter font-light text-slate-400 text-left w-full text-2xl pl-4 pt-4">
              Question {currentQuestionIndex + 1}
            </Text>
            <Text className="font-inter font-medium text-left w-full text-3xl pl-4">
              {data?.data?.item?.[currentQuestionIndex]?.text || ''}
            </Text>

            <View className="w-full gap-4 sm:gap-6 items-center bg-grey-400 p-4 rounded-lg">

              {/* Integer or Decimal Input */}
              {(data?.data?.item?.[currentQuestionIndex]?.type === 'integer' || data?.data?.item?.[currentQuestionIndex]?.type === 'decimal') && (
                <Input
                  label={data?.data?.item?.[currentQuestionIndex]?.text || 'Enter Value'}
                  value={answers[currentQuestionIndex.toString()] || ''} 
                  keyboardType={data?.data?.item?.[currentQuestionIndex]?.type === 'integer' ? 'number-pad' : 'decimal-pad'}
                  onChangeText={(text) => {
                    const filteredText = data?.data?.item?.[currentQuestionIndex]?.type === 'integer'
                      ? text.replace(/[^0-9]/g, '')
                      : text.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');

                    handleAnswerChange(currentQuestionIndex.toString(), filteredText);
                  }}
                />
              )}

              {/* Radio Input for Choice Type */}
              {data?.data?.item?.[currentQuestionIndex]?.type === 'choice' && (
                <RadioInput
                  name={`question-${currentQuestionIndex}`}
                  label={''}
                  options={
                    data?.data?.item?.[currentQuestionIndex]?.answerOption?.map((option, index) => ({
                      label: option.valueCoding?.display || '',
                      value: option.valueCoding?.display || '',
                    })) || []
                  }
                  value={answers[currentQuestionIndex.toString()] || ''}
                  onValueChange={(value: string) => handleAnswerChange(currentQuestionIndex.toString(), value)}
                />  
              )}

              {/* Text Input for Text or String Type */}
              {(data?.data?.item?.[currentQuestionIndex]?.type === 'text' || 
                data?.data?.item?.[currentQuestionIndex]?.type === 'string') && (
                <Input
                  label="Type your answer here"
                  value={answers[currentQuestionIndex.toString()] || ''}
                  onChangeText={(text) => handleAnswerChange(currentQuestionIndex.toString(), text)}
                />
              )}

              {isWeb && (
                <Button onPress={handleContinue} className="w-full mt-8">
                    <Text className="text-white text-xl font-bold">Continue</Text>
                 </Button>
              )}
            </View>
          </React.Fragment>
        )}
      </View>
    </ScrollView>
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
        {content}
        
        {!isWeb && (
          <View className="w-full px-4 pb-4" style={{ marginTop: 'auto' }}>
            <Button onPress={handleContinue} className="w-full">
              <Text className="text-white text-xl font-bold">Continue</Text>
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(TakeQuestionnaire);
