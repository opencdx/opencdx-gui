import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native';



interface ValidationRowProps {
  isValid: boolean;
  label: string;
  className?: string;
}

const ValidationRow: React.FC<ValidationRowProps> = ({ isValid, label, className }) => (
  <View className={`flex-row items-start ${className}`}>
    <View className="w-4 h-4 mr-2 justify-center items-center">
      <Image
        source={isValid ? require('../../assets/tick.png') : require('../../assets/cross.png')}
        className="w-6 h-6"
        alt={isValid ? 'Valid' : 'Invalid'}
      />
    </View>
    <Text className="text-gray-400 text-xs leading-4 pl-1">{label}</Text>
  </View>
);

export default ValidationRow;
