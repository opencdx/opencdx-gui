import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
// Custom hook for form handling
const useForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    
    const isDisabled = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !email || !emailRegex.test(email);
    }, [email]);

    return { email, setEmail, isDisabled };
};

// HOC for loading state
const withLoading = (WrappedComponent: React.ComponentType<any>) => {
    return function WithLoadingComponent(props: any) {
        const [isLoading, setIsLoading] = useState(false);
        return <WrappedComponent {...props} isLoading={isLoading} setIsLoading={setIsLoading} />;
    };
};

const ForgotPassword = ({ isLoading, setIsLoading }: { isLoading: boolean, setIsLoading: (isLoading: boolean) => void }) => {
    const navigation = useNavigation();
    const { email, setEmail, isDisabled } = useForgotPasswordForm();

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.title = 'Forgot Password';
        }
    }, []);

    const handleForgotPassword = useCallback(async () => {
        AsyncStorage.setItem('username', email);
        navigation.navigate('auth/change-password' as never,);
    }, [email]);

   
    const renderContent = () => (
        <ScrollView>
           
            <View className="justify-center items-center px-4 sm:px-0">
                <View className="w-full max-w-[500px] flex flex-col justify-center items-center gap-6">
                    <View className="items-center justify-center space-y-4">
                        <Image
                            source={require('../../assets/opencdx.png')}
                            alt="OpenCDx logo"
                        />
                        <View className='flex flex-col items-center gap-2'> 
                        <Text className="font-inter  font-medium text-left  w-full text-xl">
                            Forgot Password
                        </Text>

                        <Text className="font-inter text-lg text-left text-gray-600 w-full">
                            Please enter the email address associated with your account.
                        </Text>
                        </View>
                        <View className='w-full py-4'>  
                        <Input
                            label="Email Address*"
                            value={email}
                            onChangeText={setEmail}
                            className="w-full text-sm "
                            keyboardType="email-address"
                        />
                        </View>
                        <View className="w-full py-4 ">
                            <Button
                                onPress={handleForgotPassword}
                                disabled={isDisabled}
                                loading={isLoading}
                                className="w-full"
                            >
                                Continue
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <>
            {Platform.OS === 'web' ? (
                <main aria-label="main-layout forgot-password" className='bg-white flex flex-1 justify-center items-center'>
                    {renderContent()}
                </main>
            ) : (
                <View aria-label="main-layout forgot-password" className="flex items-center justify-center min-h-screen">
                    {renderContent()}
                </View>
            )}
        </>
    );
};

// Apply HOC and React.memo
export default React.memo(withLoading(ForgotPassword));
