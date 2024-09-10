import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image, InputSlot, Input, InputField, ButtonText, useToast, Toast, HStack, ToastDescription, set } from '@gluestack-ui/themed';
import AlertView from '../components/AlertView';
import ValidationRow from '../components/ValidationRow';
import { useResetPassword } from '../utils/axios/iam-hooks';
import Loader from '../components/Loader';

const ResetPassword = ({ navigation }) => {
    const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordMatched, setConfirmPasswordMatched] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    number: false
  });
  const validatePassword = (pass) => {
    setValidation({
      length: pass.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass)
    });
  };
  useEffect(() => {
    const fetchUsername = async () => {
        try {
          const storedUsername = await AsyncStorage.getItem('username');
          if (storedUsername !== null) {
            setUsername(storedUsername);
          } else {
            setUsername('');
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      };
  
      fetchUsername();
    }, []);

  const isDisabled = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !username || !emailRegex.test(username) || !password || !confirmPassword || !confirmPasswordMatched || !validation.length || !validation.specialChar || !validation.uppercase || !validation.lowercase || !validation.number;
  };

  const handleIsVisible = () => {
    setIsVisible(!isVisible);
    };

    const handleIsConfirmVisible = () => {
        setIsConfirmVisible(!isConfirmVisible);
    };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    validatePassword(newPassword);
    if (confirmPassword) {
        setConfirmPasswordMatched(newPassword === confirmPassword);
      } else {
        setConfirmPasswordMatched(true);
      }
  };

  const handleConfirmPasswordChange = (newPassword) => {
    setConfirmPassword(newPassword);
    setConfirmPasswordMatched(newPassword === password);
  };
  const handleSuccess = (data) => {
    setIsLoading(false); 
    navigation.navigate('ResetPasswordSuccess');
};

const handleError = (error) => {
    setIsLoading(false); 
    const errorData = error.response?.data;
    showToaster(errorData.cause.localizedMessage);
};
  const { resetPassword, loading, error } = useResetPassword(handleSuccess, handleError);
  const handleSubmit = async () => {
    setIsLoading(true);
    resetPassword({ username, newPassword: password, newPasswordConfirmation: password});
  };

  const showToaster = (message) => {
    toast.show({
        placement: "top right",
        duration: "2000",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} bg='$red500'>
              <ToastDescription color='$white'>
                  {message}
                </ToastDescription>
            </Toast>
          )
        },
    })
}

  return (
    <SafeAreaView style={styles.parentContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.svg')} style={styles.backIcon} alt="back" />
        <Text style={styles.backText}>Back</Text>
      </Pressable>
    <SafeAreaView style={styles.container}>
        <View style={styles.body}>
            <Image
                    size="md"
                    resizeMode="contain"
                    alt="OpenCDX logo"
                    style={styles.image}
                    source={require('../assets/opencdx.png')}
                />
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.description}>
                Please change your password below.
            </Text>
            <Input
                style={styles.inputRequired}
                variant="outlined"
                size="md"
                isReadOnly={true}
            >
                <InputField placeholder="Email Address*" defaultValue={username} onChangeText={setUsername} />
            </Input>
            <Input
                    style={styles.inputRequired}
                    variant="outlined"
                    size="md"
                >
                    <InputField 
                    type={isVisible ? "text" : "password"} 
                    placeholder="Password*" 
                    defaultValue={password}
                    onChangeText={handlePasswordChange} 
                    />
                    
                    <InputSlot pr="$3" onPress={handleIsVisible}>
                    <Image 
                    source={ isVisible ? require('../assets/eye.svg') : require('../assets/cross_eye.svg') } 
                    style={{ width: 20, height: 20 }} 
                    alt="show password"
                    />
                    </InputSlot>
                </Input>
                <Input
                    style={styles.inputRequired}
                    variant="outlined"
                    size="md"
                >
                    <InputField 
                    type={isConfirmVisible ? "text" : "password"} 
                    placeholder="Confirm Password*" 
                    defaultValue={confirmPassword}  
                    onChangeText={handleConfirmPasswordChange} 
                    />
                    
                    <InputSlot pr="$3" onPress={handleIsConfirmVisible}>
                    <Image 
                    source={ isConfirmVisible ? require('../assets/eye.svg') : require('../assets/cross_eye.svg') } 
                    style={{ width: 20, height: 20 }} 
                    alt="show password"
                    />
                    </InputSlot>
                </Input>
                {!confirmPasswordMatched && (
                    <Text style={styles.errorDescription}>
                    New password and confirm password do not match
                    </Text>
                )}
            <View style={styles.validationContainer}>
                <View style={styles.item}>
                    <ValidationRow
                        isValid={validation.length}
                        label="At least 8 characters"
                    />
                </View>
                <View style={styles.item}>
                    <ValidationRow
                        isValid={validation.specialChar}
                        label="1 Special character"
                    />
                </View>
                <View style={styles.item}>
                    <ValidationRow
                        isValid={validation.number}
                        label="1 Number"
                    />
                </View>
                <View style={styles.item}>
                    <ValidationRow
                        isValid={validation.lowercase}
                        label="1 Lowercase letter"
                    />
                </View>
                <View style={styles.item}>
                    <ValidationRow
                        isValid={validation.uppercase}
                        label="1 Uppercase letter"
                    />
                </View>
            </View>
        </View>
        
        <View style={styles.footer}>
                <Button 
                title="Continue" 
                onPress={() => {
                    setShowAlert(true);
                }} 
                style={styles.button}
                isDisabled={isDisabled()}
                >
                    <ButtonText style={styles.buttonText}>Continue</ButtonText>
                </Button>
        </View>
        <AlertView
        visible={showAlert}
        onClose={() => setShowAlert(false)}
        title="Production Note"
        content="In a production environment, you would receive an email for this step."
        buttonOneText="Cancel"
        buttonTwoText="Continue"
        onButtonOnePress={() => setShowAlert(false)}
        onButtonTwoPress={() => {
          // Add any additional actions for the "Explore" button
          setShowAlert(false);
          handleSubmit();
        }}
      />
      <Loader isVisible={isLoading} />
    </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
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
    borderRadius: 4,
    paddingTop: 0,
},
});

export default ResetPassword;
