import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface AnswerOption {
  id: number;
  label: string;
  value: string;
}

interface ControlledInputProps {
  name: string;
  label?: string;
  defaultValue?: string[];
  options: AnswerOption[];
  onChange: (value: string[]) => void;
}

const ControlledInput: React.FC<ControlledInputProps> = ({ name, label, defaultValue = [], options, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);

  const handleCheckboxToggle = (value: string) => {
    const newValue = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    setSelectedValues(newValue);
    onChange(newValue);
  };

  return (
    <View style={{ padding: 16 }}>
      {label && <Text style={{ fontSize: 18, marginBottom: 8 }}>{label}</Text>}
      <View>
        {options.map((option) => (
          <View key={option.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
            <Checkbox
              status={selectedValues.includes(option.value) ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxToggle(option.value)}
              color="#0066cc" // Primary color for selected checkbox
            />
            <Text style={{ fontSize: 16 }}>{option.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

interface CheckboxInputProps {
  name: string;
  label?: string;
  defaultValue?: string[];
  options: AnswerOption[];
  onChange: (value: string[]) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ name, label, defaultValue, options, onChange }) => {
  return (
    <ControlledInput
      name={name}
      label={label}
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
    />
  );
};
