import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  CheckboxLabel,
  CheckboxGroup,
  VStack,
} from '@gluestack-ui/themed';
import { useController, useFormContext } from 'react-hook-form';


const ControlledInput = (props) => {
  const [values, setValues] = useState()

  const {
    name,
    label,
    defaultValue,
    ...inputProps
  } = props;

  const { field } = useController({ name, defaultValue });


  return (
    <View style={styles.container}>
      <View>
        <CheckboxGroup
        value={values}
        onChange={(keys) => {
          setValues(keys)
          props.onCheckboxChange(keys); // Call parent's callback
        }}
        >
          <VStack space="2xl">
            {props.answerOption.map((option) => {
              return (
                <Checkbox value={option.valueCoding.display}>
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{option.valueCoding.display}</CheckboxLabel>
                </Checkbox>
              )
            })}
          </VStack>
       </CheckboxGroup>
      </View>
    </View>
  );
}

export const CheckboxComp = (props) => {
  const {
    name,
    rules,
    label,
    defaultValue,
    setFormError,
    ...inputProps
  } = props;

  const formContext = useFormContext();

  // Placeholder until input name is initialized
  if (!formContext || !name) {
    const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
    console.error(msg)
    setFormError(true)
    return null
  }

  return <ControlledInput {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    justifyContent: 'center',
  },
  margin: {
    margin: 5,
  },
  
  
});