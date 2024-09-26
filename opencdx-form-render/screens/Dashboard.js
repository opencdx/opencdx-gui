import React, { useState } from 'react';
import { View, StyleSheet, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../utils/axios/iam-hooks';
import {
    Button, Input, ButtonText, Image, InputField, Text,
    InputSlot,
    useToast, Toast, ToastDescription,
    Icon,
    Link,
    LinkText,
    Card,
    Heading,
    VStack,
    HStack,
    ScrollView,
} from '@gluestack-ui/themed';
import Loader from '../components/Loader';
import AvatarView from '../components/AvatarView';
import { useLayoutEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
const Dashboard = ({ navigation }) => {
    const MainContent = () =>
        (<View style={Platform.OS === 'web' ? styles.view_style : styles.body}>
                {
                    Platform.OS === 'web' ? (
                    <VStack>
                        <Text style={styles.title}>Welcome to your dashboard John.</Text>
                        <Text style={styles.description}>Let's see what is available for you today!</Text>
                    </VStack>
                    ) : (
                    <VStack>
                        <Image
                            size="md"
                            resizeMode="contain"
                            alt="OpenCDX logo"
                            style={styles.image}
                            source={require('../assets/opencdx.png')}
                        />
                        <Text style={styles.title}>Welcome to your dashboard John.</Text>
                        <Text style={styles.description}>Let's see what is available for you today!</Text>
                    </VStack> 
                    )
                }
                <Card borderRadius="20px" maxWidth={400} p="0px" backgroundColor='black'>
                    <Image
                        w={400}
                        h={400}
                        borderTopLeftRadius="20px"
                        borderTopRightRadius="20px"
                        source={{
                        uri: require("../assets/get_care_now.png"),
                        }}
                    />
                    <VStack p="$4">
                    <Heading size="md" fontFamily="$heading" color='white'>
                    Take Specific Questionnaire
                    </Heading>
                    <Text
                        fontSize="$sm"
                        fontStyle="normal"
                        fontFamily="$heading"
                        fontWeight="$normal"
                        lineHeight="$sm"
                        mb="$2"
                        sx={{
                        color: "white",
                        }}
                    >
                        Lorem insum dolor sit amet. consectetur adiniscina alit sed do sinsmod temnor incididunt ut labore at
                    </Text>
                    <Button style={styles.button} onPress={() => navigation.navigate('User',{title:'Questionnaires List'})} >
                        <ButtonText>Take Questionnaire</ButtonText>
                    </Button>
                    </VStack>
                </Card>
                {
                    Platform.OS !== 'web' && (
                    <VStack style={styles.copyright}>
                        <Image
                            size="md"
                            resizeMode="contain"
                            alt="OpenCDX logo"
                            style={styles.image}
                            source={require('../assets/Tenant.png')}
                        />
                        <Text style={styles.copyright}>© 2024 Your Company Name. All rights reserved.</Text>
                    </VStack> 
                    )
                }
            </View>)

    return (
                    Platform.OS !== 'web' ? (
                        <SafeAreaView style={styles.container}>
                             <LinearGradient
                            colors={['rgba(255, 255, 255, 1.0)','rgba(255, 255, 255, 1.0)','rgba(0, 24, 49, 1.0)', 'rgba(0, 24, 49, 1.0)', 'rgba(0, 109, 233, 1.0)']}
                            style={styles.container}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}>
                        <ScrollView contentContainerStyle={styles.body}>
                                <MainContent/>
                            </ScrollView>
                            </LinearGradient>
                            </SafeAreaView>
                    ) : (
                        <SafeAreaView style={styles.container}>
                        <ScrollView contentContainerStyle={styles.body}>
                        <MainContent/>
                        </ScrollView>
                        </SafeAreaView>
                    )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowColor: "#000",
        backgroundColor: '#F4F9FFFF',
        ...Platform.select({
            web: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            default: {
                justifyContent: 'space-between',
            }
        })
    },
    title: {
        w: '100%',
       
        
        ...Platform.select({
            web: {
                justifyContent: 'start',
                color: 'black',
                marginBottom: 8,
                fontSize: 20,
                fontWeight: 'bold',
            },
            default: {
                fontSize: 16,
                fontWeight: 'bold',
                justifyContent: 'center',
                color: 'white',
                marginBottom: 4,
            }
        })
      },
      description: {
        w: '100%',
        justifyContent: 'start',
        fontSize: 14,
        color: 'black',
        marginBottom: 20,
      },
      copyright: {
        w: '100%',
        justifyContent: 'center',
        fontSize: 12,
        color: 'grey',
        marginBottom: 30,
        alignItems: 'center',
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
        marginTop: 10,
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 8,
        ...Platform.select({
            web: {
                width: '100%',
            },
            default: {
                width: '90%',
            }
        })
    },
    image: {
        width: '100%', // Fixed width
        aspectRatio: 1 / 1, // Aspect ratio of width to height
        resizeMode: 'cover', // Ensures image covers the view
        marginVertical: 20
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
                maxWidth: 500,
                padding: 24,
                justifyContent: 'center',
                alignItems: 'center',
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
    view_style: {
        display: 'flex',
    }
});
export default Dashboard;