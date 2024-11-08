import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface AnswerOption {
  label: string;
  value: string;
}

interface RadioInputProps {
  name: string;
  label?: string;
  options: AnswerOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  label,
  options,
  value,
  onValueChange,
}) => {
  return (
    <View style={{ padding: 16, alignItems: 'flex-start', width: '100%' }}>
      {label && <Text style={{ fontSize: 18, marginBottom: 8 }}>{label}</Text>}
      <RadioButton.Group onValueChange={onValueChange} value={value}>
        {options.map((option, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <RadioButton
              value={option.value}
              color="#0066cc" // Primary color for selected radio button
            />
            <Text style={{ fontSize: 14 }}>{option.label}</Text>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};
