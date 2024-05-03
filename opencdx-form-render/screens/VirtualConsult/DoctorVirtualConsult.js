import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Checkbox from "react-native-bouncy-checkbox";

const DoctorVirtualConsult = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);
    const [isChecked1, setChecked1] = useState(false);
  

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.input} variant='titleMedium'>
                    Do you have doctor's Precription ?
                </Text>
                <View style={styles.containerCheck}>
                    <View style={styles.section}>
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                        <Text style={styles.paragraph}>Yes</Text>
                    </View>
                    <View style={styles.section}>
                        <Checkbox style={styles.checkbox} value={isChecked1} onValueChange={setChecked1} />
                        <Text style={styles.paragraph}>No</Text>
                    </View>
                    
                </View>
            </View>
            <View style={styles.footer}>
                <Button title="Sign In" mode="contained-tonal"
                    style={styles.button} onPress={() => navigation.navigate('HowSlideVirtualConsult')}>
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
    },
    containerCheck: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
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

export default DoctorVirtualConsult;