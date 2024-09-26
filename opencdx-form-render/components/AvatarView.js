import React from 'react';
import {VStack, HStack, Avatar, AvatarFallbackText, AvatarImage, Text   } from '@gluestack-ui/themed';
import {StyleSheet, Platform} from 'react-native';

const AvatarView = (
    { 
        name,
        imageURI,
    }
) => {
    return Platform.OS === "web" ? (
        <VStack space="md">
        <HStack style={styles.container} space="sm">
        <Avatar >
            <AvatarFallbackText>{name}</AvatarFallbackText>
            <AvatarImage
            source={{
                uri: imageURI,
            }}
            />
        </Avatar>
        <Text size="sm" >{name}</Text>
        </HStack>
        </VStack>
    ) : (
        <Avatar >
            <AvatarFallbackText>{name}</AvatarFallbackText>
            <AvatarImage
            source={{
                uri: imageURI,
            }}
            />
        </Avatar>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Align items vertically
      alignItems: 'center',     // Align items horizontally (optional)
      marginHorizontal: 10,
    },
  });
export default AvatarView;