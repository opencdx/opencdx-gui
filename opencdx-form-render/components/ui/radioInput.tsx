import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface AnswerOption {
  label: string;
  value: string;
}

interface RadioInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  options: AnswerOption[];
  onValueChange?: (value: string) => void; // Callback function for parent components to receive value changes
}

const RadioInput: React.FC<RadioInputProps> = ({ name, label, defaultValue, options, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value); // Notify parent component of the value change
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {label && <Text style={{ fontSize: 18, marginBottom: 8 }}>{label}</Text>}
      <RadioButton.Group onValueChange={handleChange} value={selectedValue}>
        {options.map((option, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
            <RadioButton value={option.value} />
            <Text style={{ fontSize: 16 }}>{option.label}</Text>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default RadioInput;
