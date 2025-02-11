import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface AnswerOption {
  label: string;
  value: string;
}

interface CheckboxInputProps {
  label?: string;
  options: Array<{ label: string; value: string }>;
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
  required?: boolean; // Add required prop
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  options,
  selectedValues,
  onValueChange,
  required = false, // Default to false if not provided
}) => {
  return (
    <View className="p-4 w-full max-w-[800px] mx-auto items-start">
      {label && <Text className="text-lg mb-4">{label}</Text>}
      {options.map((option, index) => (
        <View key={index} className="w-full max-w-[800px] mx-auto">
          {/* Top separator line for all options */}
          <View className="h-px bg-gray-300 w-full" />
          <View className="flex-row items-center py-4 w-full">
            <Checkbox
              status={selectedValues.includes(option.value) ? 'checked' : 'unchecked'}
              onPress={() => {
                const newValues = selectedValues.includes(option.value)
                  ? selectedValues.filter(v => v !== option.value)
                  : [...selectedValues, option.value];
                onValueChange(newValues);
              }}
              color="#0066cc" // Primary color for selected checkbox
              uncheckedColor="#E4E4E7"
            />
            <Text className="text-base font-normal ml-2">{option.label}</Text>
          </View>
          {/* Bottom separator line for just last option */}
          {index === options.length - 1 && <View className="h-px bg-gray-300 w-full" />}
        </View>
      ))}
    </View>
  );
};
