import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Image } from '../../../components/ui/image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Conditionally assign padding based on the platform
const paddingTop = Platform.OS === 'android' ? Math.ceil(StatusBar.currentHeight || 0) : 0;


const useForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const isDisabled = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !email || !emailRegex.test(email);
    }, [email]);
    return { email, setEmail, isDisabled };
};

const withLoading = (WrappedComponent: React.ComponentType<any>) => {
    return function WithLoadingComponent(props: any) {
        const [isLoading, setIsLoading] = useState(false);
        return <WrappedComponent {...props} isLoading={isLoading} setIsLoading={setIsLoading} />;
    };
};

const ForgotPassword = ({ isLoading, setIsLoading }: { isLoading: boolean, setIsLoading: (isLoading: boolean) => void }) => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 768 || Platform.OS === 'ios' || Platform.OS === 'android';
    const navigation = useNavigation();
    const { email, setEmail, isDisabled } = useForgotPasswordForm();

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.title = 'Forgot Password';
        }
    }, []);

    const handleForgotPassword = useCallback(async () => {
        AsyncStorage.setItem('username', email);
        navigation.navigate('form-render/auth/change-password' as never);
    }, [email, navigation]);

    const handleBack = useCallback(() => {
        navigation.navigate('form-render/auth/login' as never);
    }, [navigation]);

    const renderBackButton = () => (
        <Pressable onPress={handleBack} className="self-start mb-4">
            <View className="flex-row items-center md:p-4">
                <Image source={require('../../../assets/back.png')} alt="Back" className="w-4 h-4" />
                <Text className={`ml-2 text-base text-blue-500`}>Back</Text>
            </View>
        </Pressable>
    );

    const renderFooter = () => (
        <View className={`w-full mt-12`}>
            <Button
                onPress={handleForgotPassword}
                disabled={isDisabled}
                loading={isLoading}
                className="w-full"
            >
                Continue
            </Button>
        </View>
    )

    const renderContent = () => (
        <View className="w-full items-center">
            <Image
                source={require('../../../assets/login-logo.png')}
                alt="OpenCDx logo"
                className="mb-8"
            />
            <View className='flex flex-col items-left w-full gap-2'>
                <Text className="font-inter font-medium text-left text-2xl">
                    Forgot Password
                </Text>
                <Text className="font-inter text-base text-left text-gray-600">
                    Please enter the email address associated with your account.
                </Text>
            </View>
            <View className='w-full mt-4'>
                <Input
                    label="Email Address*"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full text-base"
                    keyboardType="email-address"
                />
            </View>
            
        </View>
    );

    const renderWebContent = () => (
        <main aria-label="main-layout forgot-password">
            {renderBackButton()}
            <View className='bg-white flex flex-1 justify-center items-center mt-12'>
                <View className={`w-full flex flex-col justify-center items-center gap-6 max-w-[500px]`}>
                    {renderContent()}
                </View>
                <View className={`w-full max-w-[500px]`}>
                {renderFooter()}
                </View>
            </View>
        </main>
    );

    const renderMobileContent = () => (
        <View aria-label="main-layout forgot-password" className={`flex flex-1 justify-between  items-center bg-white max-w-[500px] w-full mx-auto gap-6 px-4`}>
             <View className={'w-full flex gap-6 px-4'}>
                {renderBackButton()}
             </View>
            <View className={'w-full flex gap-6 px-4'}>
                {renderContent()}
            </View>
            <View style={{ marginBottom: 25}} className={'w-full flex gap-6 px-4'}>
                {renderFooter()}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ paddingTop }} className={`flex-1 bg-white`}>
            {!isMobile ? renderWebContent() : renderMobileContent()}
        </SafeAreaView>
    );
};

export default React.memo(withLoading(ForgotPassword));