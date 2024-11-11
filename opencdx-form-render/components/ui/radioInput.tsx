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
    <View className="p-4 w-full items-start">
      {label && <Text className="text-lg mb-4">{label}</Text>}
      <View className="w-full">
        <RadioButton.Group onValueChange={onValueChange} value={value}>
            {options.map((option, index) => (
            <View key={index} className="w-full max-w-[800px] mx-auto">
                {/* Top separator line for all option */}
                <View className="h-px bg-gray-300 w-full" />
                <View className="flex-row items-center py-4 w-full">
                <RadioButton
                    value={option.value}
                    color="#0066cc" // Primary color for selected radio button
                    uncheckedColor="#E4E4E7"
                />
                <Text className="text-base font-normal">{option.label}</Text>
                </View>
                {/* Bottom separator line for just last option */}
                {index === options.length - 1 && <View className="h-px bg-gray-300 w-full" />}
            </View>
            ))}
        </RadioButton.Group>
     </View>
    </View>
  );
};
