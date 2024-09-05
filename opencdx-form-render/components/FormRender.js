import React, { useState, useEffect } from "react";
import { FormInput } from "./FormInput";
import { RadioInput } from "./RadioInput";
import { Text, View, StyleSheet, Platform, SafeAreaView } from "react-native";
import {
  Button,
  ButtonText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
} from "@gluestack-ui/themed";
import { useForm, FormProvider } from "react-hook-form";
import { Endpoints } from "../utils/axios/apiEndpoints";
import { CheckboxComp } from "./CheckboxComp";
import { SelectInputComp } from "./SelectInputComp";

export default function App({ questionnaire, navigation }) {
  const { ...methods } = useForm({ mode: "onChange" });
  const [question, setQuestion] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(1);
  useEffect(() => {
    const question = questionnaire?.item[0]?.answerOption?.map((item) => {
      return item.valueCoding.display;
    });
    setQuestion(question);
    questionnaire?.item[0]?.type === "open-choice" && setDefaultIndex(0);
  }, [questionnaire]);

  const onSubmit = (data) => {
    questionnaire.item.forEach((field, index) => {
      if (field.item) {
        field.item?.forEach((connector) => {
          if (connector && connector.anfStatementConnector) {
            connector.anfStatementConnector.forEach((anfStatement) => {
              if (anfStatement.performanceCircumstance?.result?.resolution) {
                anfStatement.performanceCircumstance.result.resolution =
                  data[field.linkId];
              }
            });
          }
        });
      }

      field.answer = [];

      switch (field.type) {
        case "integer":
          field.answer.push({ valueInteger: data[field.linkId] });
          break;
        case "boolean":
          field.answer.push({ valueBoolean: data[field.linkId] === "yes" });
          break;
        default:
          field.answer.push({ valueString: data[field.linkId] });
          break;
      }

      if (field.anfStatementConnector && field.answer.length > 0 && field.answerOption) {
        var answerIndex;
        switch (field.type) {
          case "integer":
            answerIndex = field.answerOption.findIndex(option => option.valueCoding.display === field.answer[0].valueInteger);
            break;
          case "boolean":
            answerIndex = field.answerOption.findIndex(option => option.valueCoding.display === field.answer[0].valueBoolean);
            break;
          default:
            answerIndex = field.answerOption.findIndex(option => option.valueCoding.display === field.answer[0].valueString);
            break;
        }
        if (answerIndex >= 0) {
          // Remove debugger statement
          field.anfStatementConnector.forEach(anf => {
            if (anf.operatorValue) {
              if (parseInt(anf.operatorValue) === answerIndex) {
                field.anfStatementConnector = [anf];
                return; // Exit the loop once we've found the matching anf
              }
            }
          });
        }
      }

      if (field.anfStatementConnector && field.anfStatementConnector.length > 0) {
        field.anfStatementConnector.forEach((currentStatment, index) => {
          if (!isNaN(parseFloat(currentStatment.anfStatement.time?.lowerBoundConfig))) {
            field.anfStatementConnector[index].anfStatement.time.lowerBound = parseFloat(currentStatment.anfStatement.time.lowerBoundConfig);
          } else if (currentStatment.anfStatement.time?.lowerBoundConfig) {
            field.anfStatementConnector[index].anfStatement.time.lowerBound = data[currentStatment.anfStatement.time?.lowerBoundConfig.match(/\d+/)[0]];
          }
          if (!isNaN(parseFloat(currentStatment.anfStatement.time?.upperBoundConfig.par))) {
            field.anfStatementConnector[index].anfStatement.time.upperBound = parseFloat(currentStatment.anfStatement.time.upperBoundConfig);
          } else if (currentStatment.anfStatement.time?.upperBoundConfig){
            field.anfStatementConnector[index].anfStatement.time.upperBound = data[currentStatment.anfStatement.time?.upperBoundConfig.match(/\d+/)[0]];
          }

          if (!isNaN(parseFloat(currentStatment.anfStatement.performanceCircumstance?.timing?.lowerBoundConfig))) {
            field.anfStatementConnector[index].anfStatement.time.lowerBound = parseFloat(currentStatment.anfStatement.time.lowerBoundConfig);
          } else if (currentStatment.anfStatement.performanceCircumstance?.timing?.lowerBoundConfig){
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.timing.lowerBound = data[currentStatment.anfStatement.performanceCircumstance?.timing?.lowerBoundConfig.match(/\d+/)[0]];
          }
          if (!isNaN(parseFloat(currentStatment.anfStatement.performanceCircumstance?.timing?.upperBoundConfig.par))) {
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.timing.upperBound = parseFloat(currentStatment.anfStatement.timing.upperBoundConfig);
          } else if (currentStatment.anfStatement.performanceCircumstance?.timing?.upperBoundConfig) {
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.timing.upperBound = data[currentStatment.anfStatement.performanceCircumstance?.timing?.upperBoundConfig.match(/\d+/)[0]];
          }

          if (!isNaN(parseFloat(currentStatment.anfStatement.performanceCircumstance?.normalRange?.lowerBoundConfig))) {
            field.anfStatementConnector[index].anfStatement.normalRange.lowerBound = parseFloat(currentStatment.anfStatement.normalRange.lowerBoundConfig);
          } else if (currentStatment.anfStatement.performanceCircumstance?.time?.lowerBoundConfig) {
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.normalRange.lowerBound = data[currentStatment.anfStatement.performanceCircumstance?.time?.lowerBoundConfig.match(/\d+/)[0]];
          }
          if (!isNaN(parseFloat(currentStatment.anfStatement.performanceCircumstance?.normalRange?.upperBoundConfig.par))) {
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.normalRange.upperBound = parseFloat(currentStatment.anfStatement.normalRange.upperBoundConfig);
          } else if (currentStatment.anfStatement.performanceCircumstance?.normalRange?.upperBoundConfig) {
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.normalRange.upperBound = data[currentStatment.anfStatement.performanceCircumstance?.normalRange?.upperBoundConfig.match(/\d+/)[0]];
          }

          if (!isNaN(parseFloat(currentStatment.anfStatement.performanceCircumstance?.result?.lowerBoundConfig))) {
            field.anfStatementConnector[index].anfStatement.result.lowerBound = parseFloat(currentStatment.anfStatement.result.lowerBoundConfig);
          } else if (currentStatment.anfStatement.performanceCircumstance?.result?.lowerBoundConfig){
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.result.lowerBound = data[currentStatment.anfStatement.performanceCircumstance?.result?.lowerBoundConfig.match(/\d+/)[0]];
          }
          if (!isNaN(parseFloat(currentStatment.anfStatement.performanceCircumstance?.result?.upperBoundConfig.par))) {
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.result.upperBound = parseFloat(currentStatment.anfStatement.result.upperBoundConfig);
          } else if (currentStatment.anfStatement.performanceCircumstance?.result?.upperBoundConfig){
            field.anfStatementConnector[index].anfStatement.performanceCircumstance.result.upperBound = data[currentStatment.anfStatement.performanceCircumstance?.result?.upperBoundConfig.match(/\d+/)[0]];
          }
        });
      }
    });

    const userQuestionnaireData = {
      userQuestionnaireData: {
        patientId: "66ccdf9968dab114fb704e1b",
        questionnaireData: [questionnaire],
      },
    };

    const handleSave = async () => {
      const data = JSON.stringify(userQuestionnaireData);
      try {
        const response = await Endpoints.submitUserQuestionnaire(data);
        const { success } = response.data;
        if (success) {
          navigation.navigate("Success");
        }
      } catch (error) {
        alert(error);
      }
    };
    handleSave();
  };

  const [formError, setError] = useState(false);
  const compareArrays = (question, selectedValue) => {
    const matchingIndices = question.reduce((acc, element, index) => {
      if (selectedValue.includes(element)) {
        acc.push(index + defaultIndex);
      }
      return acc;
    }, []);
    return matchingIndices;
  };
  return (
    <View style={styles.container}>
      {formError ? (
        <View>
          <Text style={{ color: "red" }}>
            There was a problem with loading the form. Please try again later.
          </Text>
        </View>
      ) : (
        <>
          <FormProvider {...methods}>
            <Text style={styles.heading}>{questionnaire?.title}</Text>
            {questionnaire?.item?.map((field, index) => {
              let inputComponent;
              const matchingIndices = compareArrays(question, selectedValue);
              let show = true;
              if (field?.enableWhen && field?.enableWhen.length > 0) {
                show =
                  field.type !== "open-choice" ||
                  !field.enableWhen ||
                  matchingIndices.includes(index);
              }
              switch (field.type) {
                case "integer":
                  inputComponent = (
                    <>
                      <FormInput
                        key={index}
                        name={field.linkId}
                        label={
                          field.extension.length > 0
                            ? field.extension[0].valueCoding.display
                            : ""
                        }
                        rules={{ required: "This field is required!" }}
                        setFormError={setError}
                        type="number"
                      />
                      <View style={styles.divider} />
                    </>
                  );
                  break;
                case "string":
                  inputComponent = (
                    <>
                      <FormInput
                        key={index}
                        name={field.linkId}
                        label={
                          field.extension.length > 0
                            ? field.extension[0].valueCoding.display
                            : ""
                        }
                        rules={{ required: "This field is required!" }}
                        setFormError={setError}
                        type="text"
                      />
                      <View style={styles.divider} />
                    </>
                  );
                  break;
                case "text":
                  inputComponent = (
                    <>
                      <FormInput
                        key={index}
                        name={field.linkId}
                        label={
                          field.extension.length > 0
                            ? field.extension[0].valueCoding.display
                            : ""
                        }
                        rules={{ required: "This field is required!" }}
                        setFormError={setError}
                        type="text"
                      />
                      <View style={styles.divider} />
                    </>
                  );
                  break;
                case "boolean":
                  inputComponent = (
                    <>
                      <RadioInput
                        key={index}
                        name={field.linkId}
                        label={field.text}
                        rules={{ required: "This field is required!" }}
                        setFormError={setError}
                        type="radio"
                      />
                      <View style={styles.divider} />
                    </>
                  );
                  break;
                case "open-choice":
                  if (!(field?.enableWhen && field.enableWhen.length > 0)) {
                    inputComponent = (
                      <>
                        <CheckboxComp
                          key={index}
                          name={field.linkId}
                          label={field.text}
                          rules={{ required: "This field is required!" }}
                          setFormError={setError}
                          type="select"
                          answerOption={field.answerOption}
                          onCheckboxChange={(selectedValue) =>
                            setSelectedValue(selectedValue)
                          }
                        />
                        <View style={styles.divider} />
                      </>
                    );
                  } else {
                    inputComponent = (
                      <>
                        <CheckboxComp
                          key={index}
                          name={field.linkId}
                          label={field.text}
                          rules={{ required: "This field is required!" }}
                          setFormError={setError}
                          type="select"
                          answerOption={field.answerOption}
                        />
                        <View style={styles.divider} />
                      </>
                    );
                  }
                  break;
                case "choice":
                  inputComponent = (
                    <>
                      <SelectInputComp
                        key={index}
                        show={show}
                        name={field.linkId}
                        label={field.text}
                        rules={{ required: "This field is required!" }}
                        setFormError={setError}
                        type="select"
                        answerOption={field.answerOption}
                        onSelectChange={(selectedValue) =>
                          setSelectedValue(selectedValue)
                        }
                      />
                      <View style={styles.divider} />
                    </>
                  );
                  break;
                default:
                  inputComponent = null;
              }

              return (
                <View key={index}>
                  {show && (
                    <>
                      <FormControlLabel style={styles.question}>
                        <FormControlLabelText>
                          {field.text}
                        </FormControlLabelText>
                      </FormControlLabel>
                      {inputComponent}
                    </>
                  )}
                </View>
              );
            })}
          </FormProvider>
        </>
      )}
      <View style={styles.footer}>
        <Button
          title="Submit"
          onPress={methods.handleSubmit(onSubmit)}
          style={styles.button}
        >
          <ButtonText>Submit</ButtonText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  radio: {},
  footer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingTop: 24,
  },
  button: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 68,
    backgroundColor: "#0066FF",
    ...Platform.select({
      web: {
        width: "90%",
      },
      default: {
        width: "90%",
      },
    }),
  },
  divider: {
    borderBottomColor: "#DBDBDB",
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",

    ...Platform.select({
      web: {
        width: 500,
        margin: "auto",
        justifyContent: "center",
      },
      default: {
        justifyContent: "space-between",
      },
    }),
  },
  question: {
    paddingBottom: 6,
  },
});
