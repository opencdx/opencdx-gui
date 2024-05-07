import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import {
    ButtonText,
    Button,
    Text,
} from '@gluestack-ui/themed';
import Slider from '@react-native-community/slider';


const SlideVirtualConsult = ({ navigation }) => {
    const [temperature, setTemperature] = useState(36);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title} variant='titleMedium'>
                    Please enter your current body temperature</Text>
                <Text style={styles.valueText} variant='titleMedium'>{temperature}</Text>
                <View style={styles.containerCheck}>
                    <Text style={styles.input} variant='titleMedium'>36</Text>
                    <Slider
                        style={{ width: 390, height: 40 }}
                        minimumValue={36}
                        maximumValue={50}
                        minimumTrackTintColor="red"
                        maximumTrackTintColor="#000000"
                        onValueChange={(value) => setTemperature(Math.round(value * 100) / 100)}
                    />
                    <Text style={styles.input} variant='titleMedium'>50</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Button mode="contained-tonal" width='100%' title="Sign In" style={styles.button} onPress={() => navigation.navigate('DoctorVirtualConsult')}>

                    <ButtonText style={styles.buttonText}>Continue</ButtonText>

                </Button>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowColor: '#000',
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                maxWidth: 500,
                margin: 'auto',
                justifyContent: 'center',
            },
            default: {
                justifyContent: 'space-between',
            },
        }),
    },
    body: {
        ...Platform.select({
            web: {
                padding: 24,
            },
            default: {
                flex: 1,
                justifyContent: 'center',
                padding: 24,
            },
        }),
    },
    input: {
        textAlign: 'center',
        alignContent: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: 8,
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
    },
    valueText: {
        textAlign: 'center',
        marginBottom: 24,
    },
    containerCheck: {
        textAlign: 'center',
        alignContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
    footer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingTop: 24,
    },
    button: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 68,
        ...Platform.select({
            web: {
                width: '90%',
            },
            default: {
                width: '90%',
            },
        }),
    },

});

export default SlideVirtualConsult;