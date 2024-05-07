import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import {
    Checkbox,
    CheckboxGroup,
    CheckboxIndicator,
    CheckboxIcon,
    CheckboxLabel,
    VStack,
    ButtonText,
    Button,
    Text,
} from '@gluestack-ui/themed';// import Checkbox from "react-native-bouncy-checkbox";



const CheckVirtualConsult = ({ navigation }) => {

    const [values, setValues] = useState([])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.input} variant='titleMedium'>
                    Which of the following Covid-19 symptoms do you currently have
                </Text>
                <View style={styles.containerCheck}>
                    <CheckboxGroup
                        value={values}
                        onChange={(keys) => {
                            setValues(keys)
                        }}
                    >
                        <VStack space="lg" w="$40">
                            <Checkbox value="Sore Throat">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Sore Throat</CheckboxLabel>

                            </Checkbox>
                            <Checkbox value="Cough" >
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Cough</CheckboxLabel>

                            </Checkbox>
                            <Checkbox value="Fever">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Fever</CheckboxLabel>

                            </Checkbox>
                            <Checkbox value="Shortness of Breath">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Shortness of Breath</CheckboxLabel>

                            </Checkbox> <Checkbox value="Loss of Taste or Smell">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Loss of Taste or Smell</CheckboxLabel>

                            </Checkbox> <Checkbox value="Muscle Aches">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Muscle Aches</CheckboxLabel>

                            </Checkbox>
                            <Checkbox value="Headache">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Headache</CheckboxLabel>

                            </Checkbox>

                            <Checkbox value="Chills">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Chills</CheckboxLabel>

                            </Checkbox>
                            <Checkbox value="Fatigue">
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon />
                                </CheckboxIndicator>
                                <CheckboxLabel>Fatigue</CheckboxLabel>

                            </Checkbox>
                        </VStack>
                    </CheckboxGroup>
                </View>
            </View>

            <View style={styles.footer}>

                <Button mode="contained-tonal" width='100%' title="Sign In" style={styles.button} onPress={() => {
                    values.length > 0 ? navigation.navigate('SlideVirtualConsult') : alert('Please select at least one symptom')
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
        justifyContent: 'center',
        alignItems: 'center',

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
            }
        })
    },

});

export default CheckVirtualConsult;