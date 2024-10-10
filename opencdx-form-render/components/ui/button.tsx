import React from 'react';
import { Pressable, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({ onPress, disabled = false, loading = false, children, className = '' }) => {
  return (
    <Pressable
      className={`w-full p-3 rounded-md ${disabled ? 'bg-[#D4D8D8]' : 'bg-blue-600'} ${className}`}
      onPress={onPress}
      disabled={disabled}
      role="button"
    >
      <Text className={`${disabled ? 'text-black' : 'text-white'} text-center`}>
        {loading ? 'Loading...' : children}
      </Text>
    </Pressable>
  );
};
