import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../utils/axios/iam-hooks';
import {
    Button, Input, ButtonText, Image, InputField, Text,
    InputSlot,
    useToast, Toast, ToastDescription
} from '@gluestack-ui/themed';
import { TextInput } from 'react-native-paper';
import Loader from '../components/Loader';

// import { Endpoints } from '../utils/axios/apiEndpoints';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false);

    const handleState = () => {
        setShowPassword(!showPassword);
        
    }
    const handleSetPassword = (value) => {
        setPassword(value);
    }
    const handleSetUsername = (value) => {
        setUsername(value);
    }
    const toast = useToast();
    const toggleRememberMe = (value) => {
        setRememberMe(value);
    };
    const { login, loading, error } = useLogin(
        (data) => {
            setIsLoading(false);
            AsyncStorage.setItem('jwtToken', data.token);
            navigation.navigate('List');
        },
        (err) => {
            const errorData = err.response?.data;
            setIsLoading(false);

            showToaster('Invalid Credentials.')
           
        }
      );

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            // const response = await Endpoints.login({ userName: username, password: password });
            login({ userName: username, password: password });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            showToaster(error);
        }
    };

    const isDisabled = () => {
        return !username || !password || isLoading;
      };

    const showToaster = (message) => {
        toast.show({
            placement: "top right",
            duration: "2000",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} bg='#F31260'>
                  <ToastDescription color='$white'>
                      {message}
                    </ToastDescription>
                </Toast>
              )
            },
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Image
                    size="md"
                    resizeMode="contain"
                    alt="OpenCDX logo"
                    style={styles.image}
                    source={require('../assets/opencdx.png')}
                />
                
                <TextInput 
                    label="Email Address*" 
                    defaultValue={username}
                    onChangeText={handleSetUsername}
                    style={styles.textInput}
                    underlineColor='transparent'
                    theme= {{
                        colors: {
                            primary: 'black',       // Changes the label and underline color when focused
                            placeholder: 'black',   // Changes the color of the placeholder/label when not focused
                             }
                    }}
                />
                <TextInput 
                    secureTextEntry={showPassword}
                    label="Password*" 
                    defaultValue={password}
                    onChangeText={handleSetPassword} 
                    style={styles.textInput}
                    underlineColor='transparent' 
                     right={
                        <TextInput.Icon icon = {showPassword ? require('../assets/cross_eye.svg') : require('../assets/eye.svg')} onPress= {handleState} rippleColor={'transparent'}/>
                     }
                    theme= {{
                      colors: {
                            primary: 'black',       // Changes the label and underline color when focused
                            placeholder: 'black',   // Changes the color of the placeholder/label when not focused
                            }
                    }}
                />
                <Button
                    size="md"
                    variant="link"
                    action="primary"
                    isFocusVisible={false}
                    style={styles.forget}
                    onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <ButtonText>Forgot Password</ButtonText>
                </Button>
            </View>
            <View style={styles.footer}>
                <Button 
                title="Sign In" 
                onPress={() => {
                    handleLogin();
                }} 
                style={styles.button}
                isDisabled={isDisabled()}
                >
                    <ButtonText style={styles.buttonText}>Login</ButtonText>
                </Button>
                <View style={styles.center}>
                    <Text style={styles.centerText}>Don't have an account?</Text>
                    <Button
                    size="md"
                    variant="link"
                    action="primary"
                    isFocusVisible={false}
                    style={styles.signup}
                    onPress={() => navigation.navigate('Signup')}
                    >
                        <ButtonText>Sign Up</ButtonText>
                    </Button>
                </View>
            </View>
            <Loader isVisible={isLoading} />
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
    switchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        flexDirection: 'row',
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
        marginBottom: 14,
        height: 50,
        after: {
            content: '*',
            color: 'red',
        },
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
    forget: {
        alignItems: 'flex-end',
        textAlign: 'right',
        flexDirection: "row",
        justifyContent: "flex-end",
        color: '#0066FF',
        fontWeight: 500,
    },
    signup: {
        textAlign: 'right',
        flexDirection: "row",
        justifyContent: "center",
        color: '#0066FF',
        fontWeight: 500,
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingTop: 14,
    },
    textInput: {
        mode:'flat',
        backgroundColor: '#ffffff', // Make the background transparent
        textColor: '#757575',
        marginBottom: 16,
        borderColor: '#e4e4e7',
        borderWidth: '2px' , 
        borderRadius: 6, 
        paddingHorizontal: 10,        
      },
});

export default LoginScreen;