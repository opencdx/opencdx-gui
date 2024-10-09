import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidationRow from '../../components/ui/validate';
import Loader from '../../components/ui/loading';
import ModalComponent from '../../components/ui/modal';
import { Toast, ToastDescription } from '@gluestack-ui/themed';
import { useResetPassword } from '../../lib/iam-hooks'
import { useToast } from '@gluestack-ui/themed';
import { Platform } from 'react-native';
// Custom hook for form handling
const useChangePasswordForm = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  

   
        

    const isDisabled = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRequirements = [
            newPassword.length >= 8,
            /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            /\d/.test(newPassword),
            /[a-z]/.test(newPassword),
            /[A-Z]/.test(newPassword)
        ];
        return !username || !emailRegex.test(username) || !newPassword || newPassword !== confirmPassword || !passwordRequirements.every(Boolean) ;
    }, [username, newPassword, confirmPassword]);

    const toggleShowNewPassword = useCallback(() => setShowNewPassword(prev => !prev), []);
    const toggleShowConfirmPassword = useCallback(() => setShowConfirmPassword(prev => !prev), []);

    return {
        username, setUsername,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        showNewPassword, showConfirmPassword,
        toggleShowNewPassword, toggleShowConfirmPassword,
        isDisabled,
       
    };
};

// HOC for loading state
const withLoading = (WrappedComponent: React.ComponentType<any>) => {
    return function WithLoadingComponent(props: any) {
        const [isLoading, setIsLoading] = useState(false);
        return <WrappedComponent {...props} isLoading={isLoading} setIsLoading={setIsLoading} />;
    };
};

const ChangePassword = ({ isLoading, setIsLoading }: { isLoading: boolean, setIsLoading: (isLoading: boolean) => void }) => {
    const navigation = useNavigation();
    const toast = useToast();
    const [showAlert, setShowAlert] = useState(false);
    const {
        username, setUsername,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        showNewPassword, showConfirmPassword,
        toggleShowNewPassword, toggleShowConfirmPassword,
        isDisabled,
        
    } = useChangePasswordForm();
    useEffect(() => {
        const fetchEmail = async () => {
            try {
              const storedEmail = await AsyncStorage.getItem('username');
              if (storedEmail !== null) {
                setUsername(storedEmail);
              } else {
                setUsername('');
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
    const [passwordMismatchError, setPasswordMismatchError] = useState<string | null>(null);

   const validatePasswordMatch = useCallback((pass: string, confirmPass: string) => {
    setPasswordMismatchError(pass !== confirmPass ? "New password and confirm password do not match" : null);
}, []);
   
    const onSuccess = (data: any) => {
        debugger;
        setIsLoading(false); 
        navigation.navigate('auth/password-changed' as never);
    };
    
    const onError = (error: any) => {
        setIsLoading(false); 
        // navigation.navigate('auth/password-changed' as never);

        // const errorData = error.response?.data;
        // showToaster('User does not exist.')

        
    };
      const { resetPassword, loading, error } = useResetPassword(onSuccess, onError);
      const handleChangePassword = async () => {
        setIsLoading(true);
        navigation.navigate('auth/password-changed' as never);
        resetPassword({ username, newPassword});
      };
      

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
      if (error) {
        showToaster(error ?? 'An error occurred');
      }
    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const renderContent = () => (
        <View className="justify-center items-center px-4 sm:pt-12">
            <View className="w-full max-w-[500px] flex flex-col justify-center items-center gap-4">
                <View className="items-center justify-center space-y-4">
                    <Image
                        source={require('../../assets/opencdx.png')}
                        
                        ariaLabel="OpenCDx logo"
                        alt="OpenCDx logo"
                    />

                    <Text className="font-inter font-medium text-left w-full text-xl">
                        Change Password
                    </Text>

                    <Text className="font-inter text-lg text-left text-gray-600 w-full">
                        Please change your password below.
                    </Text>

                    <Input
                        label="Email Address*"
                        value={username}
                        onChangeText={setUsername}
                        className="w-full text-sm"
                        keyboardType="email-address"
                    />

                    <Input
                        label="New Password*"
                        value={newPassword}
                        onChangeText={(text) => {
                            setNewPassword(text);
                            validatePasswordMatch(text, confirmPassword);
                        }}
                        secureTextEntry={!showNewPassword}
                        rightIcon={
                            <Pressable
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onPress={toggleShowNewPassword}
                                role="button"
                                aria-label="Toggle new password visibility"
                            >
                                {showNewPassword ? <EyeIcon className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Hide new password" color='#a79f9f' size={23} /> : <EyeOffIcon className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Show new password" color='#a79f9f' size={23} />}
                            </Pressable>
                        }
                    />

                    <Input
                        label="Confirm New Password*"
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            validatePasswordMatch(newPassword, text);
                        }}
                        secureTextEntry={!showConfirmPassword}
                        rightIcon={
                            <Pressable
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onPress={toggleShowConfirmPassword}
                                role="button"
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirmPassword ? <EyeIcon className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Hide confirm password" color='#a79f9f' size={23} /> : <EyeOffIcon className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Show confirm password" color='#a79f9f' size={23} />}
                            </Pressable>
                            
                        }
                        
                    />
                    {passwordMismatchError && (
                        <Text className="text-xs text-left text-red-500">{passwordMismatchError}</Text>
                    )}

                    <View className="w-full">
                        <View className="flex flex-row flex-wrap">
                            <ValidationRow
                            isValid={newPassword.length >= 8}
                            label="At least 8 characters"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[A-Z]/.test(newPassword)}
                            label="1 Uppercase letter"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[a-z]/.test(newPassword)}
                            label="1 Lowercase letter"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[0-9]/.test(newPassword)}
                            label="1 Number"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                        <ValidationRow
                            isValid={/[^A-Za-z0-9]/.test(newPassword)}
                            label="1 Special character"
                            className="flex-[0_0_calc(33.333%-8px)]"
                        />
                    </View>
                </View>

                    <View className="w-full py-4">
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
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {Platform.OS === 'web' ? (
                <main aria-label="main-layout change-password" className="flex items-center justify-center min-h-screen">
                    {renderContent()}
                </main>
            ) : (
                <View aria-label="main-layout change-password" className="flex items-center justify-center min-h-screen">
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
                    handleChangePassword();
                }}
            />
        </ScrollView>
    );
};

// Apply HOC and React.memo
export default React.memo(withLoading(ChangePassword));