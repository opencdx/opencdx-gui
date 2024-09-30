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
        <Avatar style={styles.container} >
            <AvatarFallbackText style={styles.text}>{name}</AvatarFallbackText>
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
        ...Platform.select({
            web: {
                flex: 1,
                justifyContent: 'center', // Align items vertically
                alignItems: 'center',     // Align items horizontally (optional)
                marginHorizontal: 10,
            },
            default: {
                justifyContent: 'space-between',
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
            }
        })
      
    },
    text: {
        ...Platform.select({
            web: {
                flex: 1,
                justifyContent: 'center', // Align items vertically
                alignItems: 'center', 
                fontSize: 16
            },
            default: {
                justifyContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14
            }
        })
    }
  });
export default AvatarView;