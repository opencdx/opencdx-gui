import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import {
    Checkbox,
    CheckboxIndicator,
    CheckboxIcon,
    CheckboxLabel,
    VStack,
    ButtonText,
    Button,
    Text,
    CheckboxGroup
} from '@gluestack-ui/themed';

const ProlongedVirtualConsult = ({ navigation }) => {
    const [values, setValues] = useState([])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.input} variant='titleMedium'>
                    Have you prolonged, close contact (15 minutes or longer at less than 6 feet) with someone diagonsed positive for COVID-19?
                </Text>
                <View style={styles.containerCheck}>
                    <CheckboxGroup
                        value={values}
                        onChange={(keys) => {
                            setValues(keys)
                        }}
                    >
                        <VStack space="lg" w="$40">
                            <Checkbox value="Yes" >
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Yes</CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="No">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>No</CheckboxLabel>
                            </Checkbox>

                        </VStack>
                    </CheckboxGroup>

                </View>
            </View>
            <View style={styles.footer}>
                <Button mode="contained-tonal" width='100%' title="Sign In" style={styles.button} onPress={() => {
                    values.length > 0 ? navigation.navigate('ConfirmVirtualConsult') : alert('Please select at least one value')
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

export default ProlongedVirtualConsult;