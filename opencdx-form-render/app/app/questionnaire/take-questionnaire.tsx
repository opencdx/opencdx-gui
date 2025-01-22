import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetQuestionnaire, useSubmitUserQuestionnaire } from '~/lib/iam-hooks';
import { CloseIcon } from '@gluestack-ui/themed';
import { Button } from '~/components/ui/button';
import { Input } from '../../../components/ui/input';
import { RadioInput } from '../../../components/ui/radioInput';
import SelectInput from '../../../components/ui/selectInput'
import { ProgressBar } from 'react-native-paper';
import ModalComponent from '../../../components/ui/modal';
import { useShowToast } from '~/lib/toast';
import useUserStore from '~/app/data_store/user_store';
import { AnfOperatorType, AnfStatementType, QuestionnaireItem } from '~/api/questionnaire';

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
  const { mutate: submitQuestionnaire } = useSubmitUserQuestionnaire(
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

    if (currentQuestionIndex < totalQuestions - 1) {
      setViewedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
      if (currentQuestionIndex < (data?.data?.item?.length || 0) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
    else {
      setViewedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
      onSubmit();
    }
  };

  const onSubmit = () => {
    const questionnaireData = JSON.parse(JSON.stringify(data?.data || {}));
    const patientId = userProfile?.id;

    const processQuestionnaireItems = (items: Array<QuestionnaireItem>) => {
      let itemsJSON = JSON.stringify(items);
      Object.keys(answers).forEach((key) => {
        const replacePattern = new RegExp(`{{REPLACE_${key}}}`, 'g');
        itemsJSON = itemsJSON.replace(replacePattern, answers[key]);
      });

      items = JSON.parse(itemsJSON);

      let updatedItems = items.map((item) => {
        const questionLinkId = item.linkId;

        // Populate answers
        if (questionLinkId && answers[questionLinkId] !== undefined) {
          switch (item.type) {
            case 'integer':
            case 'decimal':
            case 'number':
              item.answer = [{ valueInteger: parseInt(answers[questionLinkId], 10) }];
              break;
            case 'boolean':
              item.answer = [{ valueBoolean: answers[questionLinkId] === 'true' }];
              break;
            case 'text':
            case 'string':
            case 'choice':
            case 'open-choice':
            default:
              item.answer = [{ valueString: answers[questionLinkId] }];
              break;
          }
        } else {
          item.answer = [];
        }
        return item;
      });

      // Check ANF operator type and only keep first matching answer
      updatedItems.forEach((item) => {
        if (item.anfStatementConnector) {
          item.anfStatementConnector.forEach((connector) => {
            type OperatorFunctions = Record<AnfOperatorType, (a: number, b: number) => boolean>;
            const operatorFunctions: OperatorFunctions = {
              [AnfOperatorType.AnfOperatorTypeEqual]: (a: number, b: number) => a === b,
              [AnfOperatorType.AnfOperatorTypeNotEqual]: (a: number, b: number) => a !== b,
              [AnfOperatorType.AnfOperatorTypeGreaterThan]: (a: number, b: number) => a > b,
              [AnfOperatorType.AnfOperatorTypeGreaterThanOrEqual]: (a: number, b: number) => a >= b,
              [AnfOperatorType.AnfOperatorTypeLessThan]: (a: number, b: number) => a < b,
              [AnfOperatorType.AnfOperatorTypeLessThanOrEqual]: (a: number, b: number) => a <= b,
              [AnfOperatorType.AnfOperatorTypeUnspecified]: () => true,
              [AnfOperatorType.AnfOperatorTypeContains]: () => true,
              [AnfOperatorType.AnfOperatorTypeNotContains]: () => true,
              [AnfOperatorType.AnfOperatorTypeIn]: () => true,
              [AnfOperatorType.AnfOperatorTypeNotIn]: () => true,
              [AnfOperatorType.Unrecognized]: () => true
            };

            if (item.linkId) {
              if (connector.anfOperatorType === AnfOperatorType.AnfOperatorTypeEqual) {
                const answerValue = answers[item.linkId];
                if (answerValue === connector.operatorValue) {
                  item.anfStatementConnector = [connector];
                }
              } else if (connector.anfOperatorType === AnfOperatorType.AnfOperatorTypeNotEqual) {
                const answerValue = answers[item.linkId];
                if (answerValue !== connector.operatorValue) {
                  item.anfStatementConnector = [connector];
                }
              } else if (connector.anfOperatorType === AnfOperatorType.AnfOperatorTypeContains) {
                const answerValue = answers[item.linkId];
                if (answerValue && connector.operatorValue && answerValue.includes(connector.operatorValue)) {
                  item.anfStatementConnector = [connector];
                }
              } else if (connector.anfOperatorType === AnfOperatorType.AnfOperatorTypeNotContains) {
                const answerValue = answers[item.linkId];
                if (answerValue && connector.operatorValue && !answerValue.includes(connector.operatorValue)) {
                  item.anfStatementConnector = [connector];
                }
              } else {
                const answerValue = Number(answers[item.linkId]);
                const operatorValue = Number(connector.operatorValue);

                if (!isNaN(answerValue) && !isNaN(operatorValue) && connector.anfOperatorType) {
                  const operatorFunction = operatorFunctions[connector.anfOperatorType];
                  if (operatorFunction && operatorFunction(answerValue, operatorValue)) {
                    item.anfStatementConnector = [connector];
                  }
                }
              }
            }
          });
        }
      });

      // Remove contributing statements and store them
      const contributingStatements = new Map<string, string>();
      updatedItems = updatedItems.map((item) => {
        if (item.anfStatementConnector) {
          item.anfStatementConnector = item.anfStatementConnector.filter((connector) => {
            if (connector.anfStatementType === AnfStatementType.AnfStatementTypeContributing) {
              const mainStatement = connector.mainStatement;
              const topic = connector.anfStatement?.topic?.expression;

              if (mainStatement && topic) {
                contributingStatements.set(mainStatement, topic);
              }

              return false; // Remove the contributing statement
            } else {
              return true;
            }
          });
        }

        return item;
      });

      // Add contributing topics
      updatedItems = updatedItems.map((item) => {
        if (item.linkId && contributingStatements.has(item.linkId)) {
          const topic = contributingStatements.get(item.linkId);
          if (item.anfStatementConnector?.[0] && topic) {
            item.anfStatementConnector[0].anfStatement = {
              ...item.anfStatementConnector[0].anfStatement,
              topic: {
                ...item.anfStatementConnector[0].anfStatement?.topic,
                expression: `${item.anfStatementConnector[0].anfStatement?.topic?.expression || ''}${topic}`
              }
            };
          }
        }

        return item;
      });

      // Update upper and lower bounds
      updatedItems = updatedItems.map((item) => {
        if (item.anfStatementConnector) {
          item.anfStatementConnector.forEach((connector) => {
            if (connector.anfStatement?.performanceCircumstance?.result?.upperBoundConfig) {
              if (!isNaN(Number(connector.anfStatement.performanceCircumstance.result.upperBoundConfig))) {
                connector.anfStatement.performanceCircumstance.result.upperBound = parseFloat(connector.anfStatement.performanceCircumstance.result.upperBoundConfig);
              }
            }
            if (connector.anfStatement?.performanceCircumstance?.result?.lowerBoundConfig) {
              if (!isNaN(Number(connector.anfStatement.performanceCircumstance.result.lowerBoundConfig))) {
                connector.anfStatement.performanceCircumstance.result.lowerBound = parseFloat(connector.anfStatement.performanceCircumstance.result.lowerBoundConfig);
              }
            }
          });
        }

        return item;
      });

      return updatedItems;
    };

    // Process questionnaire items
    const processedItems = processQuestionnaireItems(questionnaireData.item);

    // Prepare final request payload
    const requestBody = {
      userQuestionnaireData: {
        patientId: patientId,
        questionnaireData: [
          {
            item: processedItems,
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
                      onValueChange={(value: string) => {
                        if (questionLinkId) handleAnswerChange(questionLinkId, value);
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

              {data?.data?.item?.[currentQuestionIndex]?.type === 'number' && (
                <Input
                  label="Type your answer here"
                  value={questionLinkId && answers[questionLinkId] ? answers[questionLinkId] : ''}
                  onChangeText={(text) => {
                    if (questionLinkId) handleAnswerChange(questionLinkId, text);
                  }}
                />
              )}

              {data?.data?.item?.[currentQuestionIndex]?.type === 'datetime' && (
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
      <View style={{ width: '100%', alignSelf: 'center', marginVertical: 5, marginBottom: 40 }}>
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
