import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions, Platform } from 'react-native';
import { useToast, Toast, ToastDescription } from '@gluestack-ui/themed';
import { useSignUp } from '../../lib/iam-hooks';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import ValidationRow from '../../components/ui/validate';
import ModalComponent from '../../components/ui/modal';
import Loader from '../../components/ui/loading';

const useSignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState<string | null>(null);

    const validatePasswordMatch = useCallback((pass: string, confirmPass: string) => {
        setPasswordMismatchError(pass !== confirmPass ? "New password and confirm password do not match" : null);
    }, []);

    const passwordValidations = [
        { isValid: formData.password.length >= 8, label: "At least 8 characters" },
        { isValid: /[A-Z]/.test(formData.password), label: "1 Uppercase letter" },
        { isValid: /[a-z]/.test(formData.password), label: "1 Lowercase letter" },
        { isValid: /[0-9]/.test(formData.password), label: "1 Number" },
        { isValid: /[^A-Za-z0-9]/.test(formData.password), label: "1 Special character" },
    ];

    const isDisabled = useMemo(() =>
        Object.values(formData).some(value => !value) ||
        passwordValidations.some(validation => !validation.isValid) ||
        passwordMismatchError !== null,
        [formData, passwordValidations, passwordMismatchError]
    );

    const updateFormField = useCallback((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'password' || field === 'confirmPassword') {
            validatePasswordMatch(field === 'password' ? value : formData.password, field === 'confirmPassword' ? value : formData.confirmPassword);
        }
    }, [formData.password, formData.confirmPassword, validatePasswordMatch]);

    const togglePasswordVisibility = useCallback((field: 'password' | 'confirmPassword') => {
        if (field === 'password') setShowPassword(prev => !prev);
        else setShowConfirmPassword(prev => !prev);
    }, []);

    return {
        formData,
        updateFormField,
        showPassword,
        showConfirmPassword,
        isDisabled,
        togglePasswordVisibility,
        passwordValidations,
        passwordMismatchError
    };
};

const Signup = () => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 768 || Platform.OS === 'ios' || Platform.OS === 'android';
    const navigation = useNavigation();
    const {
        formData,
        updateFormField,
        showPassword,
        showConfirmPassword,
        isDisabled,
        togglePasswordVisibility,
        passwordValidations,
        passwordMismatchError
    } = useSignupForm();

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.title = 'Sign Up';
        }
    }, []);

    const showToaster = (message: string) => {
        toast.show({
            placement: "top right",
            render: ({ id }) => (
                <Toast nativeID={`toast-${id}`} action='error' variant='accent'>
                    <ToastDescription>{message}</ToastDescription>
                </Toast>
            ),
        });
    };

    const onSuccess = useCallback(() => {
        setIsLoading(false);
        navigation.navigate('auth/login' as never);
    }, [navigation]);

    const onError = useCallback((error: any) => {
        setIsLoading(false);
        const errorMessage = error.response?.data?.cause?.localizedMessage || 'An error occurred';
        showToaster(errorMessage);
    }, []);

    const { signup } = useSignUp(onSuccess, onError);

    const handleSignup = useCallback(async () => {
        try {
            setIsLoading(true);
            await signup({
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
                username: formData.username,
                type: "IAM_USER_TYPE_REGULAR"
            });
        } catch (error) {
            // Error handling is done in the error callback of useSignUp
        } finally {
            setIsLoading(false);
        }
    }, [formData, signup]);

    const renderPasswordInput = (field: 'password' | 'confirmPassword', label: string) => (
        <Input
            label={label}
            value={formData[field]}
            onChangeText={(value) => updateFormField(field, value)}
            secureTextEntry={field === 'password' ? !showPassword : !showConfirmPassword}
            rightIcon={
                <Pressable
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onPress={() => togglePasswordVisibility(field)}
                    role="button"
                    aria-label={`Toggle ${field} visibility`}
                >
                    <Image 
                        source={field === 'password' ? (showPassword ? require('../../assets/eye.png') : require('../../assets/cross_eye.png')) 
                                                     : (showConfirmPassword ? require('../../assets/eye.png') : require('../../assets/cross_eye.png'))}
                        alt={field === 'password' ? (showPassword ? "Hide password" : "Show password") 
                                                  : (showConfirmPassword ? "Hide confirm password" : "Show confirm password")}
                        className="w-6 h-6"
                    />
                </Pressable>
            }
        />
    );

    const renderContent = () => (
        <View className="flex flex-1 justify-center items-center bg-white max-w-[500px] w-full mx-auto p-4 sm:p-0">
            <View className="w-full gap-8 items-center">
                <Image source={require('../../assets/opencdx.png')} alt="OpenCDx logo" />

                <View className="w-full gap-4">
                    <View className="flex flex-row gap-4 w-full">
                        <Input
                            label="First Name*"
                            value={formData.firstName}
                            onChangeText={(value) => updateFormField('firstName', value)}
                            className="flex-1"
                        />
                        <Input
                            label="Last Name*"
                            value={formData.lastName}
                            onChangeText={(value) => updateFormField('lastName', value)}
                            className="flex-1"
                        />
                    </View>
                    <Input
                        label="Email Address*"
                        value={formData.username}
                        onChangeText={(value) => updateFormField('username', value)}
                    />
                    {renderPasswordInput('password', 'Password*')}
                    {renderPasswordInput('confirmPassword', 'Confirm Password*')}
                    {passwordMismatchError && (
                        <Text className="text-xs text-red-500">{passwordMismatchError}</Text>
                    )}
                </View>

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

                <Button
                    onPress={() => setShowAlert(true)}
                    disabled={isDisabled}
                    loading={isLoading}
                    className="w-full"
                >
                    Sign Up
                </Button>

                <View className="flex-row items-center space-x-1">
                    <Text className="font-inter text-base font-normal leading-7 text-right text-black">
                        Already have an account?
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('auth/login' as never)}
                        role="link"
                        aria-label="Login"
                    >
                        <Text className="text-blue-600 pl-1">Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {!isMobile ? (
                <main aria-label="main-layout-signup" className="flex items-center justify-center min-h-screen">
                    {renderContent()}
                </main>
            ) : (
                <View aria-label="main-layout-signup" className="flex items-center justify-center min-h-screen">
                    {renderContent()}
                </View>
            )}
            <Loader isVisible={isLoading} />
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
                    handleSignup();
                }}
            />
        </ScrollView>
    );
};

export default React.memo(Signup);