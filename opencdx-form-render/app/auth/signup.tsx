import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useToast, Toast, ToastDescription, EyeIcon } from '@gluestack-ui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSignUp } from '../../lib/iam-hooks';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import ValidationRow from '../../components/ui/validate';
import ModalComponent from '../../components/ui/modal';
import Loader from '../../components/ui/loading';
import { Platform } from 'react-native';
// Custom hook for form handling
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
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [passwordMismatchError, setPasswordMismatchError] = useState<string | null>(null);




    const validatePasswordMatch = useCallback((pass: string, confirmPass: string) => {
        setPasswordMismatchError(pass !== confirmPass ? "New password and confirm password do not match" : null);
    }, []);

    const isDisabled = useMemo(() =>
        Object.values(formData).some(value => !value) ||
        passwordErrors.length > 0 ||
        passwordMismatchError !== null,
        [formData, passwordErrors, passwordMismatchError]
    );

    const updateFormField = useCallback((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'password') {
            validatePasswordMatch(value, formData.confirmPassword);
        } else if (field === 'confirmPassword') {
            validatePasswordMatch(formData.password, value);
        }
    }, [formData.confirmPassword, validatePasswordMatch]);

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
        passwordErrors,
        passwordMismatchError
    };
};

const Signup = () => {
    const navigation = useNavigation();
    const {
        formData,
        updateFormField,
        showPassword,
        showConfirmPassword,
        isDisabled,
        togglePasswordVisibility,
        passwordErrors,
        passwordMismatchError
    } = useSignupForm();

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.title = 'Sign Up';
        }
    }, []);
    const onSuccess = (data: any) => {
        console.log("onSuccess", data);
        setIsLoading(false);
        navigation.navigate('auth/login' as never);
    };
    const toast = useToast();

    const showToaster = (message: any) => {
        toast.show({
            placement: "top right",
            duration: 2000,
            render: ({ id }) => {
                const toastId = "toast-" + id
                return (
                    <Toast nativeID={toastId} className='bg-red-500'>
                        <ToastDescription color='$white'>
                            {message}
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }
    const onError = (error: any) => {
        setIsLoading(false);
        const errorData = error.response?.data;
        showToaster(errorData.cause.localizedMessage);
    };
    const { signup, loading, error } = useSignUp(onSuccess, onError);
    
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

    const renderContent = () => (
        <View
            id="main-content"
            className="flex flex-1 justify-center items-center bg-white max-w-[500px] w-full mx-auto p-4 sm:p-0"
        >
            <View className="w-full gap-8 items-center">
                <Image
                    source={require('../../assets/opencdx.png')}
                    
                    ariaLabel="OpenCDx logo"
                    alt="OpenCDx logo"
                />

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
                    <Input
                        label="Password*"
                        value={formData.password}
                        onChangeText={(value) => updateFormField('password', value)}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <Pressable
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onPress={() => togglePasswordVisibility('password')}
                                role="button"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <MaterialCommunityIcons name="eye" className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Show password" color='#a79f9f' size={23} /> : <MaterialCommunityIcons name="eye-off" className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Hide password" color='#a79f9f' size={23} />}
                            </Pressable>
                        }
                    />
                    <Input
                        label="Confirm Password*"
                        value={formData.confirmPassword}
                        onChangeText={(value) => updateFormField('confirmPassword', value)}
                        secureTextEntry={!showConfirmPassword}
                        rightIcon={
                            <Pressable
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onPress={() => togglePasswordVisibility('confirmPassword')}
                                role="button"
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirmPassword ? <MaterialCommunityIcons name="eye" className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Show confirm password" color='#a79f9f' size={23} /> : <MaterialCommunityIcons name="eye-off" className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Hide confirm password" color='#a79f9f' size={23} />}
                            </Pressable>
                        }
                    />
                    {passwordMismatchError && (
                        <Text className="text-xs text-red-500">{passwordMismatchError}</Text>
                    )}
                </View>

                <View className="w-full">
                    <View className="flex flex-row flex-wrap">
                        <ValidationRow
                            isValid={formData.password.length >= 8}
                            label="At least 8 characters"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[A-Z]/.test(formData.password)}
                            label="1 Uppercase letter"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[a-z]/.test(formData.password)}
                            label="1 Lowercase letter"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[0-9]/.test(formData.password)}
                            label="1 Number"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[^A-Za-z0-9]/.test(formData.password)}
                            label="1 Special character"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                    </View>

                </View>

                <Button
                    onPress={() => {
                        setShowAlert(true);
                    }}
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
                        <Text className="text-blue-600">Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {Platform.OS === 'web' ? (
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
                onClose={() => {
                    setShowAlert(false);
                }}
                title="Production Note"
                content="In a production environment, you would receive an email for this step."
                buttonOneText="Cancel"
                buttonTwoText="Continue"
                onButtonOnePress={() => {
                    setShowAlert(false);
                }}
                onButtonTwoPress={() => {
                    setShowAlert(false);
                    handleSignup();
                }}
            />
        </ScrollView>
    );
};

export default React.memo(Signup);