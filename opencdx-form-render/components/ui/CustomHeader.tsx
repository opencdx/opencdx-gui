import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  imageSource?: ImageSourcePropType;
  onPress: () => void;
}

interface CustomHeaderProps {
  title: string;
  leftButton?: ButtonProps;
  rightButton?: ButtonProps;
  titleStyle?: StyleProp<TextStyle>; // Add titleStyle prop
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftButton,
  rightButton,
  titleStyle,
}) => {
  return (
    <View className="flex-row items-center p-2">
      {leftButton && (
        <TouchableOpacity onPress={leftButton.onPress} className="mr-8">
          {leftButton.imageSource ? (
            <Image source={leftButton.imageSource} style={{ width: 34, height: 34 }} />
          ) : (
            <Text className="text-blue-500">{leftButton.title}</Text>
          )}
        </TouchableOpacity>
      )}
      <View className="flex-1 items-center">
        <Text className="text-center" style={titleStyle}>{title}</Text>
      </View>
      {rightButton && (
        <TouchableOpacity onPress={rightButton.onPress} className="ml-8">
          {rightButton.imageSource ? (
            <Image source={rightButton.imageSource} style={{ width: 30, height: 30 }} />
          ) : (
            <Text className="text-blue-500">{rightButton.title}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;
