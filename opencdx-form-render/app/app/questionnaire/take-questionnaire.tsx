import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetQuestionnaire } from '~/lib/iam-hooks';
import { CloseIcon } from '@gluestack-ui/themed';
import { Button } from '~/components/ui/button';
import { Input } from '../../../components/ui/input';
import { RadioInput }  from '../../../components/ui/radioInput';
import  CheckboxInput  from '../../../components/ui/checkboxInput'
import { ProgressBar } from 'react-native-paper';
import ModalComponent from '../../../components/ui/modal';

const useGetQuestionnaireForm = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (answer.length > 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
      }));
    } else {
      // Optionally remove answer if the input is cleared (length = 0)
      setAnswers((prevAnswers) => {
        const { [questionId]: _, ...rest } = prevAnswers;
        return rest;
      });
    }
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
  const totalQuestions = data?.data?.item?.length || 0; // Total questions from the API
  const answeredQuestions = Object.keys(answers).length; // Questions answered so far
  const [viewedQuestions, setViewedQuestions] = useState<Set<number>>(new Set()); // Track viewed questions
  const progress = totalQuestions > 0 ? viewedQuestions.size / totalQuestions : 0; // Use viewedQuestions for progress
  const [showAlert, setShowAlert] = useState(false);
  // Check if the current question is required
  const isCurrentQuestionRequired = data?.data?.item?.[currentQuestionIndex]?.required ?? true;



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
    // Add the current question to viewedQuestions if it’s not already there
    setViewedQuestions((prev) => new Set(prev).add(currentQuestionIndex));

    // Move to the next question if there are more
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
  
            <View className="w-full gap-4 sm:gap-6 items-center bg-grey-400 p-4 rounded-lg max-w-[800px] mx-auto">
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
  
              {data?.data?.item?.[currentQuestionIndex]?.type === 'choice' && (
                <RadioInput
                  name={`question-${currentQuestionIndex}`}
                  label=""
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
  
              {(data?.data?.item?.[currentQuestionIndex]?.type === 'text' || 
                data?.data?.item?.[currentQuestionIndex]?.type === 'string') && (
                <Input
                  label="Type your answer here"
                  value={answers[currentQuestionIndex.toString()] || ''}
                  onChangeText={(text) => handleAnswerChange(currentQuestionIndex.toString(), text)}
                />
              )}

              {data?.data?.item?.[currentQuestionIndex]?.type === 'boolean' && (
                <RadioInput
                  name={`boolean-question-${currentQuestionIndex}`}
                  label={data?.data?.item?.[currentQuestionIndex]?.text || ''}
                  options={[
                    { label: 'Yes', value: 'true' },
                    { label: 'No', value: 'false' },
                  ]}
                  value={(answers[currentQuestionIndex.toString()] ?? data?.data?.item?.[currentQuestionIndex]?.initial?.[0]?.valueBoolean)?.toString()}
                  onValueChange={(value: string) => handleAnswerChange(currentQuestionIndex.toString(), (value === 'true').toString())}
                />
              )}

              {data?.data?.item?.[currentQuestionIndex]?.type === 'open-choice' && (
                  <CheckboxInput
                    name={`open-choice-question-${currentQuestionIndex}`}
                    label=""
                    options={
                      data?.data?.item?.[currentQuestionIndex]?.answerOption?.map((option) => ({
                        label: option.valueCoding?.display || '',
                        value: option.valueCoding?.display || '',
                      })) || []
                    }
                    selectedValues={answers[currentQuestionIndex.toString()]?.split(',') || []}
                    onValueChange={(value: string) => {
                      // Toggle selection
                      const selectedValues = answers[currentQuestionIndex.toString()]?.split(',') || [];
                      const updatedValues = selectedValues.includes(value)
                        ? selectedValues.filter((item) => item !== value) // Remove if already selected
                        : [...selectedValues, value]; // Add if not selected
                      handleAnswerChange(currentQuestionIndex.toString(), updatedValues.join(',')); // Join as comma-separated string
                    }}
                    />
                )}

  
              {isWeb && (
                <View className="w-full max-w-[800px] mx-auto mt-8">
                  <Button 
                  onPress={handleContinue} 
                  disabled={isCurrentQuestionRequired && !answers[currentQuestionIndex.toString()]} // Disable only if required and no answer
                  className="w-full"
                  >
                    <Text className="text-white text-xl font-bold">Continue</Text>
                  </Button>
              </View>
              )}
            </View>
          </React.Fragment>
        )}
      </View>
    </ScrollView>
  );
  
  return (
    <SafeAreaView style={{ paddingTop }} className={`flex-1 bg-white`}>
      <View className="flex flex-row items-center p-5 mt-5">
        <Text className="flex-1 text-center text-xl text-slate-400">
          Take a Specific Questionnaire
        </Text>
        <Pressable onPress={() => setShowAlert(true)}>
          <CloseIcon style={{ color: '#006FEE' }} />
        </Pressable>
      </View>

      {/* Progress Bar */}
      <View style={{ width: '100%', alignSelf: 'center', marginVertical: 5, marginBottom: 40}}>
        <ProgressBar progress={progress} color="#006FEE" />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
      >
        {content}
        
        {!isWeb && (
          <View className="w-full px-4 pb-4" style={{ marginTop: 'auto' }}>
            <Button 
                  onPress={handleContinue} 
                  disabled={isCurrentQuestionRequired && !answers[currentQuestionIndex.toString()]} // Disable only if required and no answer
                  className="w-full"
            >
              <Text className="text-white text-xl font-bold">Continue</Text>
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Modal Component */}
      <ModalComponent
        visible={showAlert}
        onClose={() => setShowAlert(false)}
        title="Alert!"
        content="If you will close this questionnaire you will need to start over again. Would you like to continue?"
        buttonOneText="Cancel"
        buttonTwoText="Continue"
        onButtonOnePress={() => setShowAlert(false)}
        onButtonTwoPress={() => {
          setShowAlert(false);
          navigation.navigate('app/questionnaire/list' as never);
        }}
      />

    </SafeAreaView>
  );
};

export default React.memo(TakeQuestionnaire);
