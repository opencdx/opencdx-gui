import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidationRow from '../../components/ui/validate';
import Loader from '../../components/ui/loading';
import ModalComponent from '../../components/ui/modal';
import { Toast, ToastDescription, useToast } from '@gluestack-ui/themed';
import { useResetPassword } from '../../lib/iam-hooks';
import { Platform } from 'react-native';

const useChangePasswordForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState<string | null>(null);

    const validatePasswordMatch = useCallback((pass: string, confirmPass: string) => {
        setPasswordMismatchError(pass !== confirmPass ? "New password and confirm password do not match" : null);
    }, []);

    const passwordValidations = [
        { isValid: formData.newPassword.length >= 8, label: "At least 8 characters" },
        { isValid: /[A-Z]/.test(formData.newPassword), label: "1 Uppercase letter" },
        { isValid: /[a-z]/.test(formData.newPassword), label: "1 Lowercase letter" },
        { isValid: /[0-9]/.test(formData.newPassword), label: "1 Number" },
        { isValid: /[^A-Za-z0-9]/.test(formData.newPassword), label: "1 Special character" },
    ];

    const isDisabled = useMemo(() =>
        !formData.username || !formData.newPassword || !formData.confirmPassword ||
        passwordValidations.some(validation => !validation.isValid) ||
        passwordMismatchError !== null,
        [formData, passwordValidations, passwordMismatchError]
    );

    const updateFormField = useCallback((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'newPassword' || field === 'confirmPassword') {
            validatePasswordMatch(field === 'newPassword' ? value : formData.newPassword, field === 'confirmPassword' ? value : formData.confirmPassword);
        }
    }, [formData.newPassword, formData.confirmPassword, validatePasswordMatch]);

    const togglePasswordVisibility = useCallback((field: 'newPassword' | 'confirmPassword') => {
        if (field === 'newPassword') setShowNewPassword(prev => !prev);
        else setShowConfirmPassword(prev => !prev);
    }, []);

    return {
        formData,
        updateFormField,
        showNewPassword,
        showConfirmPassword,
        isDisabled,
        togglePasswordVisibility,
        passwordValidations,
        passwordMismatchError
    };
};

const ChangePassword = () => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 768 || Platform.OS === 'ios' || Platform.OS === 'android';
    const navigation = useNavigation();
    const toast = useToast();
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {
        formData,
        updateFormField,
        showNewPassword,
        showConfirmPassword,
        isDisabled,
        togglePasswordVisibility,
        passwordValidations,
        passwordMismatchError
    } = useChangePasswordForm();

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('username');
                if (storedEmail !== null) {
                    updateFormField('username', storedEmail);
                }
            } catch (error) {
                console.error('Error fetching email:', error);
            }
        };

        fetchEmail();
    }, []);

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.title = 'Change Password';
        }
    }, []);

    const showToaster = (message: string, type: 'success' | 'error') => {
        toast.show({
            placement: "top right",
            render: ({ id }) => (
                <Toast nativeID={`toast-${id}`} action={type} variant='accent'>
                    <ToastDescription>{message}</ToastDescription>
                </Toast>
            ),
        });
    };

    const onSuccess = useCallback(() => {
        showToaster('Password reset successfully.', 'success');
        setTimeout(() => {
            navigation.navigate('auth/password-changed' as never);
        }, 1000);
    }, [navigation]);

    const onError = useCallback((error: any) => {
        // const errorMessage = error.response?.data?.cause?.localizedMessage || 'An error occurred';
        showToaster('User does not exist.', 'error');
    }, []);

    const { resetPassword, loading } = useResetPassword(onSuccess, onError);

    const handleChangePassword = useCallback(async () => {
        setIsLoading(true);
        await resetPassword({ username: formData.username, newPassword: formData.newPassword });
        setIsLoading(false);
    }, [formData, resetPassword]);

    const renderPasswordInput = (field: 'newPassword' | 'confirmPassword', label: string) => (
        <Input
            label={label}
            value={formData[field]}
            onChangeText={(value) => updateFormField(field, value)}
            secureTextEntry={field === 'newPassword' ? !showNewPassword : !showConfirmPassword}
            rightIcon={
                <Pressable
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onPress={() => togglePasswordVisibility(field)}
                    role="button"
                    aria-label={`Toggle ${field} visibility`}
                >
                    <Image 
                        source={field === 'newPassword' ? (showNewPassword ? require('../../assets/eye.png') : require('../../assets/cross_eye.png')) 
                                                        : (showConfirmPassword ? require('../../assets/eye.png') : require('../../assets/cross_eye.png'))}
                        alt={field === 'newPassword' ? (showNewPassword ? "Hide new password" : "Show new password") 
                                                     : (showConfirmPassword ? "Hide confirm password" : "Show confirm password")}
                        className="w-6 h-6"
                    />
                </Pressable>
            }
        />
    );

    const renderBackButton = () => (
        <Pressable onPress={() => navigation.navigate('auth/login' as never)} className="self-start mb-4">
            <View className="flex-row items-center md:p-4">
                <Image source={require('../../assets/back.png')} alt="Back" className="w-4 h-4" />
                <Text className={`ml-2 text-base text-blue-500`}>Back</Text>
            </View>
        </Pressable>
    );

    const renderContent = () => (
        <View className="w-full items-center">
            <Image source={require('../../assets/opencdx.png')} alt="OpenCDx logo" className="mb-8" />
            <View className='flex flex-col items-left w-full gap-2'>
                <Text className="font-inter font-medium text-left text-2xl">Change Password</Text>
                <Text className="font-inter text-base text-left text-gray-600">Please change your password below.</Text>
            </View>
            <View className='w-full mt-4 gap-4 md:gap-6'>
                <Input
                    label="Email Address*"
                    value={formData.username}
                    onChangeText={(value) => updateFormField('username', value)}
                    keyboardType="email-address"
                />
                
                    {renderPasswordInput('newPassword', 'New Password*')}
                    {renderPasswordInput('confirmPassword', 'Confirm New Password*')}
                {passwordMismatchError && (
                    <Text className="text-xs text-red-500">{passwordMismatchError}</Text>
                )}
                <View className={`flex flex-row flex-wrap gap-2`}>
                    {passwordValidations.map((validation, index) => (
                        <ValidationRow
                            key={index}
                            isValid={validation.isValid}
                            label={validation.label}
                            className={`flex-[0_0_calc(33.333%-8px)]`}   
                        />
                    ))}
                </View>
            </View>
            <View className={`w-full mt-8`}>
                <Button
                    onPress={() => setShowAlert(true)}
                    disabled={isDisabled}
                    loading={isLoading}
                    className="w-full"
                >
                    Confirm Password Reset
                </Button>
            </View>
        </View>
    );

    const renderWebContent = () => (
        <main aria-label="main-layout change-password">
            {renderBackButton()}
            <View className='bg-white flex flex-1 justify-center items-center mt-12'>
                <View className={`w-full flex flex-col justify-center items-center gap-6 max-w-[500px]`}>
                    {renderContent()}
                </View>
            </View>
        </main>
    );

    const renderMobileContent = () => (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View aria-label="main-layout change-password" className="flex items-center justify-between min-h-screen bg-white w-full mx-auto p-4">
                <View className={'w-full flex flex-col justify-between items-center gap-6 px-4'}>
                    {renderBackButton()}
                    <View className='w-full flex flex-col justify-between mt-12'>
                        {renderContent()}
                    </View>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {!isMobile ? renderWebContent() : renderMobileContent()}
            <Loader isVisible={isLoading || loading} />
            <ModalComponent
                visible={showAlert}
                onClose={() => setShowAlert(false)}
                title="Production Note"
                content="In a production environment, you would receive an email for this step."
                buttonOneText="Cancel"
                buttonTwoText="Continue"
                onButtonOnePress={() => setShowAlert(false)}
                onButtonTwoPress={() => {
                    setShowAlert(false);
                    handleChangePassword();
                }}
            />
        </SafeAreaView>
    );
};

export default React.memo(ChangePassword);