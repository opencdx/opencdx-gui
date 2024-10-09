import React from 'react';
import { View, Text } from 'react-native';
import { Image } from '@gluestack-ui/themed';



interface ValidationRowProps {
  isValid: boolean;
  label: string;
  className?: string;
}

const ValidationRow: React.FC<ValidationRowProps> = ({ isValid, label, className }) => (
  <View className={`flex-row items-start ${className}`}>
    <View className="w-4.5 h-4.5 mr-2 justify-center items-center">
      <Image
        source={isValid ? require('../../assets/tick.svg') : require('../../assets/cross.svg')}
        className="w-4.5 h-4.5"
        alt={isValid ? 'Valid' : 'Invalid'}
      />
    </View>
    <Text className="text-gray-400 text-xs leading-4.5">{label}</Text>
  </View>
);

export default ValidationRow;
