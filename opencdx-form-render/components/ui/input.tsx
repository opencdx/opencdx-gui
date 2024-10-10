import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password';
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ label, value, onChangeText, secureTextEntry = false, rightIcon, keyboardType, className }) => {
  return (
    <View className={`w-full bg-white border-2 border-[#e4e4e7] rounded-lg overflow-hidden ${className}`}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className="w-full bg-white border-none px-2.5 py-0 overflow-hidden"
        mode='flat'
        textColor='black'
        aria-label={label}
        underlineStyle={{backgroundColor: 'none'}}
        contentStyle={{ backgroundColor: 'bg-white' }}
        style={{ backgroundColor: 'bg-white' }}
        theme={{
          colors: {
            primary: 'black',
            placeholder: 'black',
          }
        }}
      />
      {rightIcon}
    </View>
  );
};
