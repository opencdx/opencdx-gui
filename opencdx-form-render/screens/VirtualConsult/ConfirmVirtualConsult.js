import React from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import {
    ButtonText,
    Button,
    Text
} from '@gluestack-ui/themed';//
const ConfirmVirtualConsult = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.input} variant='titleMedium'>
                    Based on your response, we recommended taking a COVID-19 test
                </Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.center}></View>

                <Button mode="contained-tonal" width='100%' title="Sign In" style={styles.button} onPress={() => {
                    navigation.navigate('GetTested')
                }}>
                    <ButtonText style={styles.buttonText}> Continue</ButtonText>
                </Button>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowColor: "#000",
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                maxWidth: 500,
                margin: 'auto',
                justifyContent: 'center',
            },
            default: {
                justifyContent: 'space-between',
            }
        })
    },
    input: {
        textAlign: 'center',
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
            }
        })
    },
    buttonText: {
        color: 'white',
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
            }
        })
    },
    footer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingTop: 24,
    },
});

export default ConfirmVirtualConsult;