import React from 'react';
import { View, Text } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { RadioButton } from 'react-native-paper';

interface AnswerOption {
  id: number;
  label: string;
  value: string;
}

const answerOption: AnswerOption[] = [
  { id: 1, label: 'Yes', value: 'yes' },
  { id: 2, label: 'No', value: 'no' },
  { id: 3, label: 'Not Answered', value: 'not answered' },
];

interface ControlledInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  [key: string]: any; // for additional props
}

const ControlledInput: React.FC<ControlledInputProps> = (props) => {
  const formContext = useFormContext();
  const { formState } = formContext || {};
  const { name, label, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, defaultValue });
  const hasError = Boolean(formState?.errors?.[name]);

  return (
    <View style={{ padding: 16 }}>
      {label && <Text style={{ fontSize: 18, marginBottom: 8 }}>{label}</Text>}
      <RadioButton.Group
        onValueChange={field.onChange}
        value={field.value}
      >
        {answerOption.map((option) => (
          <View key={option.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
            <RadioButton value={option.value} />
            <Text style={{ fontSize: 16 }}>{option.label}</Text>
          </View>
        ))}
      </RadioButton.Group>
      {hasError && <Text style={{ color: 'red', marginTop: 8 }}>This field is required</Text>}
    </View>
  );
};

interface RadioInputProps {
  name: string;
  rules?: object;
  label?: string;
  defaultValue?: string;
  setFormError?: (value: boolean) => void;
  [key: string]: any; // for additional props
}

export const RadioInput: React.FC<RadioInputProps> = (props) => {
  const { name, rules, label, defaultValue, setFormError, ...inputProps } = props;

  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? 'RadioInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    if (setFormError) setFormError(true);
    return null;
  }

  return <ControlledInput {...props} />;
};
