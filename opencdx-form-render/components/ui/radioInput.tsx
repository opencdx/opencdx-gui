import React from 'react';
import { View, Text, Platform } from 'react-native';
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
  required?: boolean; // Add required prop
}

export const RadioInput: React.FC<RadioInputProps> = ({
  label,
  options,
  value,
  onValueChange,
  required = false, // Default to false if not provided
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
                    <View className="mr-2">
                        <RadioButton.Android
                            value={option.value}
                            color="#0066cc"
                            uncheckedColor="#E4E4E7"
                        />
                    </View>
                    <Text className="text-base font-normal flex-1">{option.label}</Text>
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
