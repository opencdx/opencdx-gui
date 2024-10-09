import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import { ArrowLeftIcon } from 'lucide-react-native';
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

    const handleBackToLogin = useCallback(() => {
        navigation.navigate('index' as never);
    }, [navigation]);

    const renderContent = () => (
        <ScrollView>
            <Pressable
                className="self-start rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onPress={handleBackToLogin}
                role="link"
                aria-label="Back to Login"
            >
                <Text className="font-inter text-base font-normal text-blue-600 p-4 flex flex-row items-center gap-2">
                    <ArrowLeftIcon size={16} aria-label="Back to Login" />
                    Back
                </Text>
            </Pressable>
            <View className="justify-center items-center px-4 sm:pt-12">
                <View className="w-full max-w-[500px] flex flex-col justify-center items-center gap-4">
                    <View className="items-center justify-center space-y-4">
                        <Image
                            source={require('../../assets/opencdx.png')}
                            ariaLabel="OpenCDx logo"
                            alt="OpenCDx logo"
                        />

                        <Text className="font-inter  font-medium text-left  w-full text-xl">
                            Forgot Password
                        </Text>

                        <Text className="font-inter text-lg text-left text-gray-600 w-full">
                            Please enter the email address associated with your account.
                        </Text>

                        <Input
                            label="Email Address*"
                            value={email}
                            onChangeText={setEmail}
                            className="w-full text-sm"
                            keyboardType="email-address"
                        />

                        <View className="w-full py-4">
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
                <main aria-label="main-layout forgot-password" className="flex items-center justify-center min-h-screen">
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
