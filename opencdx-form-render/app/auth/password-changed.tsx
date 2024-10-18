import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '../../components/ui/image'
import { Button } from '../../components/ui/button'

const PasswordChanged: React.FC = () => {
    const navigation = useNavigation();

    const handleProceedToLogin = () => {
        navigation.navigate('auth/login' as never);
    };

    useEffect(() => {
       if (Platform.OS === 'web') {
            document.title = 'Password Changed';
        }
    }, []);

    const renderContent = () => (
        <View className="flex flex-col items-center justify-center min-h-screen">
            <View className="bg-white p-8 text-center items-center">
                <View className="mb-6 flex justify-center items-center">
                    <Image
                        source={require('../../assets/reset_pass_success.png')}
                        alt="Success logo"
                    />
                </View>
                <Text className="text-xl font-medium mb-2">Password Changed</Text>
                <Text className="text-gray-600 text-sm mb-6">Your password has been changed successfully.</Text>
            </View>

            {Platform.OS === 'ios' || Platform.OS === 'android' ? (
                <View style={{ position: 'absolute', bottom: 20, width: '100%', paddingHorizontal: 20 }}>
                    <Button onPress={handleProceedToLogin}>
                        Proceed to Login
                    </Button>
                </View>
            ) : (
                <Button onPress={handleProceedToLogin}>
                    Proceed to Login
                </Button>
            )}
        </View>
    );

    return (
        Platform.OS === 'web' ? (
            <main aria-label="main-layout password-changed" className="flex items-center justify-center min-h-screen">
                {renderContent()}
            </main>
        ) : (
            <View aria-label="main-layout password-changed" className="flex items-center justify-center min-h-screen relative">
                {renderContent()}
            </View>
        )
    );
};

export default PasswordChanged;
