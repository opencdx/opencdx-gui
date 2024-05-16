import React from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import {
    Button, Text,
    ButtonText
} from '@gluestack-ui/themed';

const StartVirtualConsult = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text
                    style={styles.input}
                    variant='titleMedium'
                    width='100%'
                >
                    The following clinical questionnaire is based on CDC guidelines and will help us determine the best course of action with testing.
                </Text>
            </View>
            <View style={styles.footer}>
                <Button mode="contained-tonal" width='100%' title="Sign In" style={styles.button} onPress={() => navigation.navigate('CheckVirtualConsult')}>

                    <ButtonText style={styles.buttonText}> Take Question</ButtonText>

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
    signup: {
        textAlign: 'right',
        flexDirection: "row",
        justifyContent: "center",
        color: 'navy',
        paddingBottom: 24,
        fontWeight: 'bold',
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

export default StartVirtualConsult;
