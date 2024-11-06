import React from 'react';
import { View, Pressable } from 'react-native';
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
  isDisabled?: boolean;
  isEditable?:boolean;
  onClick?: ()=>void
}

const inputView: React.FC<InputProps> = ({ label, value, onChangeText, secureTextEntry = false, rightIcon, keyboardType, className, variant = 'default', isDisabled = false, isEditable = true, onClick }) => (<TextInput
  label={label}
  value={value}
  disabled={isDisabled}
  editable={isEditable}
  onChangeText={onChangeText}
  secureTextEntry={secureTextEntry}
  className={`w-full bg-white ${(variant === 'underline' || variant === 'plain') ? 'ml--10 overflow-hidden' : 'border-none px-2.5 py-0 overflow-hidden'}`}
  mode='flat'
  textColor='#4A4A4A'
  aria-label={label}
  underlineStyle={variant === 'underline' ? { marginLeft: 10, backgroundColor: '#e4e4e7', height:1} : { backgroundColor: 'transparent', height:0}} 
  contentStyle={{ backgroundColor: 'bg-white' }}
  onPressOut={onClick}
  style={{ 
    backgroundColor: 'bg-white'
  }}
  theme={{
    colors: {
      primary: 'black',
      placeholder: 'red',
    }
  }}
/>)

export const Input: React.FC<InputProps> = ({ label, value, onChangeText, secureTextEntry = false, rightIcon, keyboardType, className, variant = 'default', isDisabled = false, isEditable = true, onClick }) => {
  return (
    <View className={`w-full bg-white ${variant === 'underline' || variant === 'plain' ? '' : 'border-2 border-[#e4e4e7] rounded-lg overflow-hidden'} ${className}`}>
      { onClick && (
        <Pressable
        className='w-full'
          onPress={onClick}
          accessibilityRole="button"
          accessibilityLabel="Today"
        >
          {inputView({label, value, onChangeText, secureTextEntry, rightIcon, keyboardType, className, variant, isDisabled, isEditable, onClick})}
      </Pressable>
      )
      }
      { onClick == undefined && (<>{inputView({label, value, onChangeText, secureTextEntry, rightIcon, keyboardType, className, variant, isDisabled, isEditable, onClick})}</>)

      }
      
      {rightIcon}
    </View>
  );
};
