import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetQuestionnaire, useSubmitUserQuestionnaire } from '~/lib/iam-hooks';
import { CloseIcon } from '@gluestack-ui/themed';
import { Button } from '~/components/ui/button';
import { Input } from '../../../components/ui/input';
import { RadioInput }  from '../../../components/ui/radioInput';
import  SelectInput from '../../../components/ui/selectInput'
import { ProgressBar } from 'react-native-paper';
import ModalComponent from '../../../components/ui/modal';
import { useShowToast } from '~/lib/toast';
import useUserStore from '~/app/data_store/user_store';

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
  const [viewedQuestions, setViewedQuestions] = useState<Set<number>>(new Set()); // Track viewed questions
  const progress = totalQuestions > 0 ? viewedQuestions.size / totalQuestions : 0; // Use viewedQuestions for progress
  const [showAlert, setShowAlert] = useState(false);
  const showToast = useShowToast();
  // Check if the current question is required
  const isCurrentQuestionRequired = data?.data?.item?.[currentQuestionIndex]?.required ?? true;
  const questionLinkId = data?.data?.item?.[currentQuestionIndex]?.linkId;
  const { userProfile } = useUserStore();


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

  const showToaster = (message: string, type: 'success' | 'error') => {
    showToast({ message, type });
  };

  // Initialize useSubmitUserQuestionnaire
  const { mutate: submitQuestionnaire} = useSubmitUserQuestionnaire(
    (response) => {
      
       console.log('Questionnaire submitted successfully:', response);
       
       // Navigate to the questionnaire-success screen
        navigation.navigate('app/questionnaire/questionnaire-success' as never);
    },
    (error) => {
       showToaster('Failed to submit questionnaire.', 'error');
    }
  );


  const handleContinue = () => {

    if (currentQuestionIndex < totalQuestions - 1) 
    {
      setViewedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
      if (currentQuestionIndex < (data?.data?.item?.length || 0) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } 
    else 
    {
        setViewedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
        onSubmit();
    }
  };

    const onSubmit = () => {
      const questionnaireData = JSON.parse(JSON.stringify(data?.data || {}));
      const patientId = userProfile?.id;
    
      const populateAnswers = (items: Array<{ linkId: string; type: string; answer?: any; [key: string]: any }>) => {
        return items.map((question) => {
          const questionLinkId = question.linkId;
    
          // Check if the question has an answer in the `answers` state
          if (answers[questionLinkId] !== undefined) {
            // Set the answer based on question type
            switch (question.type) {
              case 'integer':
              case 'decimal':
                question.answer = [{ valueInteger: parseInt(answers[questionLinkId], 10) }];
                break;
              case 'boolean':
                question.answer = [{ valueBoolean: answers[questionLinkId] === 'true' }];
                break;
              case 'text':
              case 'string':
              case 'choice':
              case 'open-choice':
                question.answer = [{ valueString: answers[questionLinkId] }];
                break;
              default:
                question.answer = [{ value: answers[questionLinkId] }]; 
            }
          } else {
            // If no answer, default to an empty array
            question.answer = [];
          }
    
          if (question.item && question.item.length > 0) {
            question.item = populateAnswers(question.item);
          }
    
          return question;
        });
      };
    
      // Populate answers in the questionnaire items
      const populatedItems = populateAnswers(questionnaireData.item);
    
      // Prepare final request payload
      const requestBody = {
        userQuestionnaireData: {
          patientId: patientId,
          questionnaireData: [
            {
              item: populatedItems,
            },
          ],
        },
      };
    
      submitQuestionnaire(requestBody);
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
                value={questionLinkId && answers[questionLinkId] ? answers[questionLinkId] : ''} // Check if questionLinkId is defined
                keyboardType={data?.data?.item?.[currentQuestionIndex]?.type === 'integer' ? 'number-pad' : 'decimal-pad'}
                onChangeText={(text) => {
                  const filteredText = data?.data?.item?.[currentQuestionIndex]?.type === 'integer'
                    ? text.replace(/[^0-9]/g, '')
                    : text.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
              
                  if (questionLinkId) {
                    handleAnswerChange(questionLinkId, filteredText); // Pass linkId if it's defined
                  }
                }}
              />
              )}
  
                {(data?.data?.item?.[currentQuestionIndex]?.type === 'choice' || 
                data?.data?.item?.[currentQuestionIndex]?.type === 'open-choice') && (
                
                // Check for "Drop down" display in extensions
                data?.data?.item?.[currentQuestionIndex]?.extension?.some(
                  (ext) => ext.valueCodeableConcept?.coding?.some((coding) => coding.display === "Drop down")
                ) ? (
                  // Render SelectInput for dropdown display
                  <SelectInput
                    label=""
                    options={
                      data?.data?.item?.[currentQuestionIndex]?.answerOption?.map((option) => ({
                        label: option.valueCoding?.display || '',
                        value: option.valueCoding?.code || option.valueCoding?.display || '',
                      })) || []
                    }
                     value={questionLinkId && answers[questionLinkId] ? answers[questionLinkId] : ''}
                     onValueChange={(value: string) => { if (questionLinkId) handleAnswerChange(questionLinkId, value);
                     }}
                  />
                ) : (
                  // Render RadioInput for non-dropdown choice
                  <RadioInput
                    name={`question-${currentQuestionIndex}`}
                    label=""
                    options={
                      data?.data?.item?.[currentQuestionIndex]?.answerOption?.map((option) => ({
                        label: option.valueCoding?.display || '',
                        value: option.valueCoding?.display || '',
                      })) || []
                    }
                    value={questionLinkId && answers[questionLinkId] ? answers[questionLinkId] : ''}
                    onValueChange={(value: string) => {
                      if (questionLinkId) handleAnswerChange(questionLinkId, value);
                    }}
                    required={isCurrentQuestionRequired}
                  />
                )
              )}

  
              {(data?.data?.item?.[currentQuestionIndex]?.type === 'text' || 
                data?.data?.item?.[currentQuestionIndex]?.type === 'string') && (
                <Input
                  label="Type your answer here"
                  value={questionLinkId && answers[questionLinkId] ? answers[questionLinkId] : ''}
                  onChangeText={(text) => {
                    if (questionLinkId) handleAnswerChange(questionLinkId, text);
               }}
                />
              )}

              {data?.data?.item?.[currentQuestionIndex]?.type === 'boolean' && (
                <RadioInput
                  name={`boolean-question-${currentQuestionIndex}`}
                  label=""
                  options={[
                    { label: 'Yes', value: 'true' },
                    { label: 'No', value: 'false' },
                  ]}
                  value={
                    (questionLinkId && answers[questionLinkId] !== undefined)
                      ? answers[questionLinkId].toString() 
                      : (data?.data?.item?.[currentQuestionIndex]?.initial?.[0]?.valueBoolean?.toString() || '')
                  }
                  onValueChange={(value: string) => {
                    if (questionLinkId) handleAnswerChange(questionLinkId, (value === 'true').toString());
                  }}
                  required={isCurrentQuestionRequired} // Indicates that this question is required
                />
              )}
  
              {isWeb && (
                <View className="w-full max-w-[800px] mx-auto mt-8">
                  <Button 
                  onPress={handleContinue} 
                  disabled={isCurrentQuestionRequired && (!questionLinkId || !answers[questionLinkId])} // Disable only if required and no answer for questionLinkId
                  className="w-full"
                  >
                     <Text className="text-white text-xl font-bold">{currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Continue'}</Text>
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
                  disabled={isCurrentQuestionRequired && (!questionLinkId || !answers[questionLinkId])} // Disable only if required and no answer for questionLinkId
                  className="w-full"
            >
             <Text className="text-white text-xl font-bold">{currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Continue'}</Text>
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Modal Component */}
      <ModalComponent
        visible={showAlert}
        onClose={() => setShowAlert(false)}
        title="Unsaved Questionnaire"
        content="Do you want to leave? If you leave your questionnaire responses will not be saved."
        buttonOneText="Return"
        buttonTwoText="Leave"
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
