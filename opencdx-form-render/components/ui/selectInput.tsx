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
    <View className=" w-full">
      <View className="flex-row items-center mb-4">
        {label && <Text className="text-lg">{label}</Text>}
      </View>

      <Select
        selectedValue={value}
        onValueChange={onValueChange}
        className="w-full min-h-[98px] "
      >
        
        <SelectTrigger variant="outline" size="xl">
          <Text className="pl-3 text-gray-600">
            {value || "Select option"}
          </Text>
          <SelectIcon className="text-gray-500" style={{ fontSize: 20, width: 24, height: 24 }} />
        </SelectTrigger>

        {/* Use SelectPortal for dropdown content */}
        <SelectPortal className=" bg-white opacity-50 ">
          {/* Adjusted SelectBackdrop to align under SelectTrigger */}
          <SelectBackdrop className=" bg-white opacity-50 " />
          <SelectContent className="w-full max-w-[500px] bg-white border border-gray-400 rounded-md shadow-lg">
            {options.map((option) => (
              <SelectItem
                label={option.label}
                value={option.value}
                key={option.value}
                className="text-base font-bold text-gray-700 p-8"
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
};

export default SelectInput;

