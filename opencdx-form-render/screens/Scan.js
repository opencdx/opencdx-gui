import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import React, { useRef } from 'react';
import { Button, Text, Surface } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import AnimatedCard from '../components/AnimatedCard';




const Scan = ({ navigation }) => {
    const [image, setImage] = useState(null);

    

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

 


    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={styles.body}
                contentContainerStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                }}>

                <AnimatedCard navigation={navigation} link='Camera' src={require('../assets/scan.json')} title='Scan QR Code'  />
                <Text variant='titleMedium' style={styles.text} onPress={pickImage}>
                    Or          </Text>
                    
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <AnimatedCard navigation={navigation} link='UploadScreen' src={require('../assets/upload.json')} title='Upload Image' />

            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowColor: "#000",
        margin: 'auto',
        ...(Platform.select({
            web: {
                maxWidth: 350,
            },
            default: {
                margin: 20,
               
            },
        })),
    },
text:{
display:'flex',
textAlign:'center',
alignItems:'center',
alignContent:'center',

},
    surface: {
        margin: 10,
        elevation: 2,
        alignItems: 'center',
        padding: 10,
    },
    animation: {
        ...Platform.select({
            web: {
                width: 250,
                height: 250

            },
            default: {
                width: 100,
                height: 100,
            }
        })
    },
    buttonContainer: {
        paddingTop: 20,
    },
});

export default Scan;
