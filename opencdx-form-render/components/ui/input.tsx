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
  variant?: 'default' | 'underline' | 'plain';
  isDisbaled?: boolean;
  editable?:boolean;
}

export const Input: React.FC<InputProps> = ({ label, value, onChangeText, secureTextEntry = false, rightIcon, keyboardType, className, variant = 'default', isDisbaled = false, editable = true }) => {
  return (
    <View className={`w-full bg-white ${variant === 'plain' ? '' : 'bg-white border-2 border-[#e4e4e7] rounded-lg'} ${className}`}>
      <TextInput
        label={label}
        value={value}
        disabled={isDisbaled}
        editable={editable}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className={`w-full bg-white ${variant === 'underline' || variant === 'plain' ? 'ml--10 overflow-hidden' : 'border-none px-2.5 py-0 overflow-hidden'}`}
        mode='flat'
        textColor='black'
        aria-label={label}
        underlineStyle={variant === 'underline' ? { marginLeft: 10, backgroundColor: '#e4e4e7', height: 3} : { backgroundColor: 'none'}} 
        contentStyle={{ backgroundColor: 'bg-white' }}
        style={{ 
          backgroundColor: 'bg-white'
        }}
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
