import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image, Card, Input, HStack, ButtonText } from '@gluestack-ui/themed';
import { TextInput } from 'react-native-paper';

const ForgotPassword = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const isDisabled = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !username || !emailRegex.test(username);
  };

  const handleSubmit = async () => {
    AsyncStorage.setItem('username', username);
    navigation.navigate('ResetPassword');
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <HStack>
        <Image source={require('../assets/back.png')} style={styles.backIcon} alt="back" />
        <Text style={styles.backText}>Back</Text>
        </HStack>
      </Pressable>
    <SafeAreaView style={styles.container}>
        
        <View style={styles.body} tabIndex={0} accessibilityLabel = {"Forgot Password" + "Please enter the email address associated with your account."} >
            <Image
                    size="md"
                    resizeMode="contain"
                    alt="OpenCDX logo"
                    style={styles.image}
                    source={require('../assets/opencdx.png')}
                />
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.description}>
                Please enter the email address associated with your account.
            </Text>
            <TextInput 
                    label="Email Address*" 
                    accessibilityLabel = "Email Address" // Label for screen readers
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
        </View>
        <View style={styles.footer}>
                <Button 
                title="Continue" 
                onPress={() => {
                    handleSubmit();
                }} 
                style={styles.button}
                isDisabled={isDisabled()}
                >
                    <ButtonText style={styles.buttonText}>Continue</ButtonText>
                </Button>
        </View>
    </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
    },
    container: {
        position: 'relative',
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
    ...Platform.select({
        web: {
            position: 'absolute', // Absolute positioning
            top: 16, // Distance from the top edge
            left: 16, // Distance from the left edge
            flexDirection: 'row', // Align icon and text horizontally
            alignItems: 'center', // Center items vertically
            zIndex: 10, // Ensure it is above other elements
        },
        default: {
            justifyContent: 'top',
            paddingHorizontal: 14,
        }
    })
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

export default ForgotPassword;
