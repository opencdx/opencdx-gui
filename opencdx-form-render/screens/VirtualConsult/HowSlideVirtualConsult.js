import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const HowSlideVirtualConsult = ({ navigation }) => {
   
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.input} variant='titleMedium'>
                    How many days have you experienced these symptoms                 </Text>
                <View style={styles.containerCheck}>
                    <Text style={styles.input} variant='titleMedium'>
                        0                 </Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="red"
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={styles.input} variant='titleMedium'>
                        30                 </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Button title="Sign In" mode="contained-tonal"
                    style={styles.button} onPress={() => navigation.navigate('ProlongedVirtualConsult')}>
                    Continue
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
        alignContent:'center',
        display: 'flex',
        alignItems: 'center',
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

export default HowSlideVirtualConsult;