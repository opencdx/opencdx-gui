import React, { input, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image, InputSlot, Input, InputField, ButtonText, useToast, Toast, HStack, ToastDescription, set } from '@gluestack-ui/themed';
import AlertView from '../components/AlertView';
import ValidationRow from '../components/ValidationRow';
import { useResetPassword } from '../utils/axios/iam-hooks';
import Loader from '../components/Loader';
import { DatePickerModal } from 'react-native-paper-dates';
const EditProfile = ({ navigation }) => {
    const [bio, setBio] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState();
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const onDismissSingle = React.useCallback(() => {
        setShow(false);
      }, [setShow]);
    
      const onConfirmSingle = React.useCallback(
        (params) => {
            setShow(false);
            setDob(params.date);
        },
        [setShow, setDob]
      );
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShow(false);
        setDob(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
    <SafeAreaView style={styles.parentContainer}>
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Image
                    size="md"
                    resizeMode="contain"
                    alt="OpenCDX logo"
                    style={styles.image}
                    source={require('../assets/opencdx.png')}
                />
                <Text style={styles.title}>My Profile</Text>
                    <Input
                        style={styles.plainInput}
                        variant="underlined"
                        size="sm"
                    >
                        <InputField placeholder='This information is used for...' defaultValue={bio} onChangeText={setBio} />
                    </Input>
                    <Input
                        style={styles.inputRequired}
                        variant="underlined"
                        size="md"
                    >
                        <InputField placeholder='First Name*' defaultValue={firstName} onChangeText={setFirstName} />
                    </Input>
                    <Input
                        style={styles.inputRequired}
                        variant="underlined"
                        size="md"
                    >
                        <InputField placeholder='Last Name*' defaultValue={lastName} onChangeText={setLastName} />
                    </Input>
                    <Input
                        style={styles.inputRequired}
                        variant="underlined"
                        size="md"
                    >
                        <InputField placeholder='Email Address*' defaultValue={email} onChangeText={setEmail} />
                    </Input>
                    <Input
                        style={styles.inputRequired}
                        variant="underlined"
                        size="md"
                    >
                        <InputField placeholder='Phone Number' defaultValue={phone} onChangeText={setPhone} />
                    </Input>
                    <Input
                        style={styles.inputRequired}
                        variant="underlined"
                        size="md"
                    >
                        <InputField placeholder='Date of Birth' defaultValue={dob} onChangeText={setDob} onFocus={showDatePicker} />
                    </Input>
                <Button style={styles.footer}>
                    <ButtonText>Save</ButtonText>
                </Button>
                <DatePickerModal
                    mode="single"
                    closeIcon='close'
                    calendarIcon='calendar'
                    presentationStyle="pageSheet"
                    visible={show}
                    onDismiss={onDismissSingle}
                    date={dob}
                    onConfirm={onConfirmSingle}
                />
            </View>
        </SafeAreaView>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
    },
    centerText: {
        marginRight: 5,
    },
    inputRequired: {
        height: 50,
        marginBottom: 14,
        after: {
            content: '*',
            color: 'red',
        },
    },
    plainInput: {
        height: 25,
        marginBottom: 15,
        borderBottomWidth: 0,
    },
    button: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        ...Platform.select({
            web: {
                width: '90%',
            },
            default: {
                width: '90%',
            }
        })
    },
    image: {
        marginBottom: 48,
        justifyContent: 'center',
        width: 500,
    },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'medium',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 20,
  },
  errorDescription: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
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
backButton: {
    position: 'absolute', // Absolute positioning
    top: 16, // Distance from the top edge
    left: 16, // Distance from the left edge
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    zIndex: 10, // Ensure it is above other elements
  },
  backIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    color: '#006FEE', // Color of the back text
  },
validationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  item: {
    flexBasis: '33%', // Adjust percentage to fit 3 items in a row
    marginBottom: 0, // Space between rows
  },
  footer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 25,
},
});
export default EditProfile;