import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, KeyboardAvoidingView, StatusBar, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { CheckboxInput } from '../../../components/ui/checkboxInput';

const useGetQuestionnaireForm = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    if (Array.isArray(answer) ? answer.length > 0 : answer.length > 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
      }));
    } else {
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
        const nextQuestion = data?.data?.item?.[currentQuestionIndex + 1];
        if (nextQuestion && 
            (nextQuestion?.enableWhen?.length ?? 0) > 0 && 
            nextQuestion.enableWhen?.some(condition => condition.question)) {
          // Check if any enableWhen criteria is met to display the question
          const shouldDisplay = nextQuestion.enableWhen?.some(condition => {
            if (!condition.question) return false;
            const conditionAnswer = answers[condition.question];
            if (!conditionAnswer) return false;

            switch(condition.operator) {
              case '=':
                return Array.isArray(conditionAnswer) 
                  ? conditionAnswer.includes(condition.answerCoding?.display || '')
                  : conditionAnswer === condition.answerCoding?.display;
              case '!=':
                return Array.isArray(conditionAnswer)
                  ? !conditionAnswer.includes(condition.answerCoding?.display || '')
                  : conditionAnswer !== condition.answerCoding?.display;
              default:
                return false;
            }
          });

          if (shouldDisplay) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            // Find next question to display
            let nextIndex = currentQuestionIndex + 2;
            while (nextIndex < totalQuestions) {
              const questionToCheck = data?.data?.item?.[nextIndex];
              if (!questionToCheck?.enableWhen?.length) {
                // Found a question without conditions
                setCurrentQuestionIndex(nextIndex);
                break;
              }
              // Check if this question should be displayed
              const shouldShowQuestion = questionToCheck.enableWhen?.some(condition => {
                if (!condition.question) return false;
                const answer = answers[condition.question];
                if (!answer) return false;
                return condition.operator === '=' ? 
                  answer === condition.answerCoding?.display :
                  answer !== condition.answerCoding?.display;
              });
              if (shouldShowQuestion) {
                setCurrentQuestionIndex(nextIndex);
                break;
              }
              nextIndex++;
            }
            // If no other questions to be displayed, submit questionnaire
            if (nextIndex >= totalQuestions) {
              onSubmit();
            }
          }
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }
    } else {
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
        const answerValue = Array.isArray(answers[key]) ? answers[key].join(',') : answers[key];
        itemsJSON = itemsJSON.replace(replacePattern, answerValue as string);
      });

      items = JSON.parse(itemsJSON);

      let updatedItems = items.map((item) => {
        const questionLinkId = item.linkId;

        // Populate answers
        if (questionLinkId && answers[questionLinkId] !== undefined) {
          switch (item.type) {
            case 'open-choice':
              // Handle array of answers for open-choice
              const answerArray = Array.isArray(answers[questionLinkId]) 
                ? answers[questionLinkId] as string[]
                : [answers[questionLinkId] as string];
              item.answer = answerArray.map(ans => ({ valueString: ans }));
              break;
            case 'integer':
            case 'decimal':
            case 'number':
              item.answer = [{ valueInteger: parseInt(answers[questionLinkId] as string, 10) }];
              break;
            case 'boolean':
              item.answer = [{ valueBoolean: answers[questionLinkId] === 'true' }];
              break;
            case 'text':
            case 'string':
            case 'choice':
            default:
              item.answer = [{ valueString: answers[questionLinkId] as string }];
              break;
          }
        } else {
          item.answer = [];
        }
        return item;
      });

      // Check ANF operator type and remove non-matching answers
      updatedItems.forEach((item) => {
        if (item.anfStatementConnector) {
          item.anfStatementConnector = item.anfStatementConnector.filter((connector) => {
            // Keep statements with empty/blank operatorValue
            if (!connector.operatorValue || connector.operatorValue === '') {
              return true;
            }

            if (!item.linkId) return false;
            
            const answerValue = answers[item.linkId];
            if (!answerValue) return false;

            const answerValues = Array.isArray(answerValue) ? answerValue : [answerValue];

            switch (connector.anfOperatorType) {
              case AnfOperatorType.AnfOperatorTypeEqual:
                return answerValues.some(value => value === connector.operatorValue);

              case AnfOperatorType.AnfOperatorTypeNotEqual:
                return answerValues.some(value => value !== connector.operatorValue);

              case AnfOperatorType.AnfOperatorTypeContains:
                return answerValues.some(value => 
                  value && connector.operatorValue && value.includes(connector.operatorValue)
                );

              case AnfOperatorType.AnfOperatorTypeNotContains:
                return answerValues.some(value => 
                  value && connector.operatorValue && !value.includes(connector.operatorValue)
                );

              case AnfOperatorType.AnfOperatorTypeGreaterThan:
              case AnfOperatorType.AnfOperatorTypeGreaterThanOrEqual:
              case AnfOperatorType.AnfOperatorTypeLessThan:
              case AnfOperatorType.AnfOperatorTypeLessThanOrEqual:
                const operatorValue = Number(connector.operatorValue);
                if (isNaN(operatorValue)) return false;

                return answerValues.some(value => {
                  const numValue = Number(value);
                  if (isNaN(numValue)) return false;

                  switch (connector.anfOperatorType) {
                    case AnfOperatorType.AnfOperatorTypeGreaterThan:
                      return numValue > operatorValue;
                    case AnfOperatorType.AnfOperatorTypeGreaterThanOrEqual:
                      return numValue >= operatorValue;
                    case AnfOperatorType.AnfOperatorTypeLessThan:
                      return numValue < operatorValue;
                    case AnfOperatorType.AnfOperatorTypeLessThanOrEqual:
                      return numValue <= operatorValue;
                    default:
                      return false;
                  }
                });

              // For other operator types, keep them
              case AnfOperatorType.AnfOperatorTypeUnspecified:
              case AnfOperatorType.AnfOperatorTypeIn:
              case AnfOperatorType.AnfOperatorTypeNotIn:
              case AnfOperatorType.Unrecognized:
                return true;

              default:
                return false;
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
                  value={questionLinkId && answers[questionLinkId] 
                    ? (Array.isArray(answers[questionLinkId]) 
                        ? answers[questionLinkId].join(', ') 
                        : answers[questionLinkId] as string)
                    : ''}
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
                  data?.data?.item?.[currentQuestionIndex]?.type === 'open-choice' ? (
                    // Render CheckboxInput for open-choice
                    <CheckboxInput
                      label=""
                      options={
                        data?.data?.item?.[currentQuestionIndex]?.answerOption?.map((option) => ({
                          label: option.valueCoding?.display || '',
                          value: option.valueCoding?.code || option.valueCoding?.display || '',
                        })) || []
                      }
                      selectedValues={
                        questionLinkId && Array.isArray(answers[questionLinkId]) 
                          ? answers[questionLinkId] as string[]
                          : []
                      }
                      onValueChange={(values: string[]) => {
                        if (questionLinkId) handleAnswerChange(questionLinkId, values);
                      }}
                      required={isCurrentQuestionRequired}
                    />
                  ) : (
                    // Check for "Drop down" display in extensions
                    data?.data?.item?.[currentQuestionIndex]?.extension?.some(
                      (ext) => ext.valueCodeableConcept?.coding?.some((coding) => coding.code === "drop-down")
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
                        value={questionLinkId && !Array.isArray(answers[questionLinkId]) ? answers[questionLinkId] as string : ''}
                        onValueChange={(value: string) => {
                          if (questionLinkId) handleAnswerChange(questionLinkId, value);
                        }}
                      />
                    ) : (
                      // Render RadioInput for regular choice
                      <RadioInput
                        name={`question-${currentQuestionIndex}`}
                        label=""
                        options={
                          data?.data?.item?.[currentQuestionIndex]?.answerOption?.map((option) => ({
                            label: option.valueCoding?.display || '',
                            value: option.valueCoding?.code || option.valueCoding?.display || '',
                          })) || []
                        }
                        value={questionLinkId && !Array.isArray(answers[questionLinkId]) ? answers[questionLinkId] as string : ''}
                        onValueChange={(value: string) => {
                          if (questionLinkId) handleAnswerChange(questionLinkId, value);
                        }}
                        required={isCurrentQuestionRequired}
                      />
                    )
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
                <View className="w-full">
                  {Platform.OS === 'web' ? (
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={questionLinkId && answers[questionLinkId] ? answers[questionLinkId] : ''}
                      onChange={(e) => {
                        if (questionLinkId) handleAnswerChange(questionLinkId, e.target.value);
                      }}
                    />
                  ) : (
                    <>
                      <TouchableOpacity 
                        onPress={() => {
                          setSelectedDate(
                            questionLinkId && answers[questionLinkId] 
                              ? new Date(answers[questionLinkId]) 
                              : new Date()
                          );
                          setShowDatePicker(true);
                        }}
                        activeOpacity={0.7}
                        style={{ width: '100%', backgroundColor: 'white' }}
                      >
                        <View pointerEvents="none">
                          <Input
                            label="Select date"
                            value={questionLinkId && answers[questionLinkId] ? answers[questionLinkId] : ''}
                            isEditable={false}
                            onChangeText={() => {}}
                          />
                        </View>
                      </TouchableOpacity>
                      
                      {Platform.OS === 'ios' ? (
                        <Modal
                          transparent={true}
                          visible={showDatePicker}
                          animationType="slide"
                          onRequestClose={() => setShowDatePicker(false)}
                        >
                          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                              <View style={{ backgroundColor: 'white', padding: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                  <Button onPress={() => {
                                    if (questionLinkId) {
                                      const formattedDate = format(
                                        selectedDate || new Date(), 
                                        'MM-dd-yyyy'
                                      );
                                      handleAnswerChange(questionLinkId, formattedDate);
                                    }
                                    setShowDatePicker(false);
                                  }}>
                                    <Text>Done</Text>
                                  </Button>
                                </View>
                                <DateTimePicker
                                  value={selectedDate || new Date()}
                                  mode="date"
                                  display="spinner"
                                  onChange={(event, date) => {
                                    if (date) setSelectedDate(date);
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </Modal>
                      ) : (
                        showDatePicker && (
                          <DateTimePicker
                            value={selectedDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                              setShowDatePicker(false);
                              if (date && questionLinkId && event.type === 'set') {
                                const formattedDate = format(date, 'MM-dd-yyyy');
                                handleAnswerChange(questionLinkId, formattedDate);
                              }
                            }}
                          />
                        )
                      )}
                    </>
                  )}
                </View>
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
