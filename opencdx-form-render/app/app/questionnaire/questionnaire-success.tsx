import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '../../../components/ui/image';
import { Button } from '../../../components/ui/button';

const QuestionnaireSuccess: React.FC = () => {
    const navigation = useNavigation();

    const handleProceedToDashboard = () => {
        navigation.navigate('app/dashboard/index' as never);
    };

    useEffect(() => {
        // Hide the header for this screen
        navigation.setOptions({ headerShown: false });

        if (Platform.OS === 'web') {
            document.title = 'Questionnaire Complete!';
        }
    }, [navigation]);

    const renderContent = () => (
        <View className="flex flex-col items-center justify-center h-screen w-full bg-white">
         <View className="bg-white p-8 text-center items-center">
            <View className="mb-6 flex justify-center items-center">
                <Image
                    source={require('../../../assets/reset_pass_success.png')}
                    alt="Success logo"
                    className="w-24 h-24 mb-4"
                />
            </View> 
                <Text className="text-2xl font-semibold text-gray-800 mb-4">Questionnaire Complete!</Text>
           </View>  
                <Button onPress={handleProceedToDashboard} className="max-w-[600px] mx-auto py-3 text-lg mt-4">
                    Return to Dashboard
                </Button>
            
        </View>
    );

    return Platform.OS === 'web' ? (
        <main
            aria-label="main-layout questionnaire-complete"
            className="flex items-center justify-center h-screen w-full"
        >
            {renderContent()}
        </main>
    ) : (
        <View
            aria-label="main-layout questionnaire-complete"
            className="flex items-center justify-center h-screen w-full"
        >
            {renderContent()}
        </View>
    );
};

export default QuestionnaireSuccess;
