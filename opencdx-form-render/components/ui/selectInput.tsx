// selectInput.tsx
import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectInput as SelectUIInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";

import { Text, View } from 'react-native';

interface SelectInputProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, value, onValueChange, required = false }) => {
  return (
    <View className="p-4 w-full">
      <View className="flex-row items-center mb-4">
        {label && <Text className="text-lg">{label}</Text>}
      </View>

      <Select
        selectedValue={value}
        onValueChange={onValueChange}
        className="w-full"
      >
        
        <SelectTrigger className="flex flex-row justify-between items-center w-full p-3 border border-gray-300 rounded-md">
          <Text className={`pl-2 text-gray-500 ${value ? "text-gray-700" : ""}`}>
            {value || "Select option"}
          </Text>
          <SelectIcon className="text-gray-500" style={{ fontSize: 20 }} />
        </SelectTrigger>

        {/* Use SelectPortal for dropdown content */}
        <SelectPortal>
          {/* Adjusted SelectBackdrop to align under SelectTrigger */}
          <SelectBackdrop className="absolute inset-0 bg-black opacity-50 z-10" />
          <SelectContent className="w-full max-w-[500px] bg-white border border-gray-300 rounded-md shadow-lg mt-2 z-20">
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator className="bg-gray-300 h-1 w-10 rounded-full mt-2 mx-auto" />
            </SelectDragIndicatorWrapper>
            {options.map((option) => (
              <SelectItem
                label={option.label}
                value={option.value}
                key={option.value}
                className="text-base text-gray-700 p-2 hover:bg-gray-100"
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
};

export default SelectInput;

