import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image, Card, Input, InputField, ButtonText } from '@gluestack-ui/themed';


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
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.description}>
                Please enter the email address associated with your account.
            </Text>
            <Input
                style={styles.inputRequired}
                variant="outlined"
                size="md"
            >
                <InputField placeholder="Email Address*" onChangeText={setUsername} />
            </Input>
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
});

export default ForgotPassword;
