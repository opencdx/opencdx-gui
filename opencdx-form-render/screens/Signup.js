import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import {
    Button, Input, ButtonText, Image, InputField, Text,
    InputSlot,
    useToast, Toast, HStack, ToastDescription
} from '@gluestack-ui/themed';
import { TextInput } from 'react-native-paper';
import AlertView from '../components/AlertView';
import ValidationRow from '../components/ValidationRow';
import { useSignUp } from '../utils/axios/iam-hooks';
import Loader from '../components/Loader';
import eyeIcon from '../assets/eye.svg';
import crossEyeIcon from '../assets/cross_eye.svg';

const SignUp = ({ navigation }) => {
const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
  

  const handleState = () => setIsVisible(!isVisible);
  const handleConfirmPasswordState = () => setIsConfirmVisible(!isConfirmVisible);

  const validatePassword = (pass) => {
    setValidation({
      length: pass.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass)
    });
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    validatePassword(newPassword);
    setConfirmPasswordMatched(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (newPassword) => {
    setConfirmPassword(newPassword);
    setConfirmPasswordMatched(newPassword === password);
  };

  const handleSuccess = (data) => {
    setIsLoading(false); 
    navigation.navigate('Login');
};

const handleError = (error) => {
    setIsLoading(false); 
    const errorData = error.response?.data;
    showToaster(errorData.cause.localizedMessage);
};

const { signup, loading, error } = useSignUp(handleSuccess, handleError);

  const handleSubmit = () => {
    setIsLoading(true);
    signup({
      type: "IAM_USER_TYPE_REGULAR",
      username,
      password,
      firstName,
      lastName,
    });
  };

  const isDisabled = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !username || !emailRegex.test(username) ||  !password || !confirmPasswordMatched || !firstName || !lastName || !validation.length || !validation.specialChar || !validation.uppercase || !validation.lowercase || !validation.number;
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
     <main> <View style={styles.body}  tabIndex={0}  accessibilityLabel={"Sign Up Form"}>
            <Image
                size="md"
                resizeMode="contain"
                alt="OpenCDX logo"
                style={styles.image}
                source={require('../assets/opencdx.png')}
            />
            <HStack
                space="md"
            >
              <View style={styles.inputLeft} width="50%"> 
                <TextInput 
                    label="First Name*" 
                    accessibilityLabel = "First Name" // Label for screen readers
                    defaultValue={firstName}
                    onChangeText={setFirstName}
                    style={styles.textInput}
                    textColor= "grey"
                    underlineColor= "transparent"
                    underlineStyle={{backgroundColor: 'none'}}
                    theme= {{
                        colors: {
                            primary: 'black',       // Changes the label and underline color when focused
                            placeholder: 'black',   // Changes the color of the placeholder/label when not focused
                             }
                    }}
                />
                </View>
                <View style={styles.inputRight} width="50%">
                <TextInput 
                    label="Last Name*" 
                    accessibilityLabel = "Last Name" // Label for screen readers
                    defaultValue={lastName}
                    onChangeText={setLastName}
                    style={styles.textInput}
                    textColor= "grey"
                    underlineColor= "transparent"
                    underlineStyle={{backgroundColor: 'none'}}
                    theme= {{
                        colors: {
                            primary: 'black',       // Changes the label and underline color when focused
                            placeholder: 'black',   // Changes the color of the placeholder/label when not focused
                             }
                    }}
                />
                </View>
            </HStack>
                <TextInput 
                    label="Email Address*" 
                    accessibilityLabel = "Email Address" // Label for screen readers
                    defaultValue={username}
                    onChangeText={setUsername}
                    style={styles.textInput}
                    textColor= "grey"
                    underlineColor= "transparent"
                    underlineStyle={{backgroundColor: 'none'}}
                    theme= {{
                        colors: {
                            primary: 'black',       // Changes the label and underline color when focused
                            placeholder: 'black',   // Changes the color of the placeholder/label when not focused
                             }
                    }}
                />
                <View style={{ position: 'relative', width: '100%' }}>
                  <TextInput 
                      secureTextEntry={!isVisible}  // Toggle between showing/hiding password
                      accessibilityLabel="Password"
                      label="Password*" 
                      defaultValue={password}
                      onChangeText={handlePasswordChange} 
                      style={[styles.textInput, { paddingRight: 40 }]}  // Give padding to the right to avoid overlap with the icon
                      textColor="grey"
                      underlineStyle={{backgroundColor: 'none'}}
                      theme={{
                      colors: {
                          primary: 'black',
                          placeholder: 'black',
                      }
                      }}
                  />
                  <TouchableOpacity 
                      onPress={handleState} 
                      style={{
                      position: 'absolute', 
                      right: 15, // Position the icon 10px from the right
                      top: '40%',  // Center the icon vertically
                      transform: [{ translateY: -12 }]  // Adjust based on icon height
                      }}
                      accessibilityLabel={isVisible ? "Hide password" : "Show password"}
                  >
                      <Image 
                      source={isVisible ? eyeIcon : crossEyeIcon} 
                      style={{ width: 24, height: 24 }} 
                      alt={isVisible ? "Hide password icon" : "Show password icon"} 
                      />
                  </TouchableOpacity>
                </View>
                <View style={{ position: 'relative', width: '100%' }}>
                  <TextInput 
                      secureTextEntry={!isConfirmVisible}  // Toggle between showing/hiding password
                      accessibilityLabel="Confirm Password"
                      label="Confirm Password*" 
                      defaultValue={confirmPassword}
                      onChangeText={handleConfirmPasswordChange} 
                      style={[styles.textInput, { paddingRight: 40 }]}  // Give padding to the right to avoid overlap with the icon
                      textColor="grey"
                      underlineStyle={{backgroundColor: 'none'}}
                      theme={{
                      colors: {
                          primary: 'black',
                          placeholder: 'black',
                      }
                      }}
                  />
                  <TouchableOpacity 
                      onPress={handleConfirmPasswordState} 
                      style={{
                      position: 'absolute', 
                      right: 15, // Position the icon 10px from the right
                      top: '40%',  // Center the icon vertically
                      transform: [{ translateY: -12 }]  // Adjust based on icon height
                      }}
                      accessibilityLabel={isConfirmVisible ? "Hide password" : "Show password"}
                  >
                      <Image 
                      source={isConfirmVisible ? eyeIcon : crossEyeIcon} 
                      style={{ width: 24, height: 24 }} 
                      alt={isConfirmVisible ? "Hide password icon" : "Show password icon"} 
                      />
                  </TouchableOpacity>
                </View>
                {!confirmPasswordMatched && (
                    <Text style={styles.errorDescription}>
                    New password and confirm password do not match
                    </Text>
                )}

        <View style={styles.validationContainer}  tabIndex={0}  accessibilityLabel={"Password Criteria" + "At least 8 characters" + "1 Special character" + "1 Number" + "1 Lowercase letter" + "1 Uppercase letter"}>
            <View style={styles.item} >
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
      </View> </main>
      <View 
        style={styles.footer}
        >
            <Button 
                title="Sign Up" 
                onPress={() => {
                    setShowAlert(true);
                }} 
                style={styles.button}
                isDisabled={isDisabled()}
            >
                    <ButtonText style={styles.buttonText}>Sign Up</ButtonText>
            </Button>
            <View style={styles.center}>
                <Text style={styles.centerText}>Already have an account?</Text>
                    <Button
                        size="md"
                        variant="link"
                        action="primary"
                        isDisabled={isLoading}
                        isFocusVisible={false}
                        style={styles.signin}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <ButtonText>Login</ButtonText>
                    </Button>
                </View>
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
  );
}

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
center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
},
centerText: {
    marginRight: 5,
},
image: {
    marginBottom: 48,
    justifyContent: 'center',
    width: 500,
},
inputRequired: {
    marginBottom: 14,
    height: 50,
    after: {
        content: '*',
        color: 'red',
    },
},
  form: {
    width: '100%',
    maxWidth: 500,
  },
  cardHeader: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
  },
  cardBody: {
    padding: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  HStack: {
    marginLeft: 14,
  },
  inputLeft: {
    justifyContent: 'start',
    flex: 1,
  },
  inputRight: {
    justifyContent: 'end',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  validationText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    width: '100%',
  },
  link: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 16,
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
errorDescription: {
  fontSize: 12,
  color: 'red',
  marginBottom: 5,
},
  signin: {
    textAlign: 'right',
    flexDirection: "row",
    justifyContent: "center",
    color: '#0066FF',
    fontWeight: 500,
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
textInput: {
  mode:'flat',
  backgroundColor: '#ffffff', // White background
  marginBottom: 16,
  borderColor: '#e4e4e7', // Border color
  borderWidth: 2, // Border width 
  paddingHorizontal: 10, // Horizontal padding
  paddingVertical: 0, // No vertical padding
  borderTopLeftRadius: 8, // Top-left corner radius
  borderTopRightRadius: 8, // Top-right corner radius
  borderBottomLeftRadius: 8, // Bottom-left corner radius
  borderBottomRightRadius: 8, // Bottom-right corner radius
  overflow: 'hidden', // Ensures the content doesn't overflow the rounded corners
},
});
export default SignUp;