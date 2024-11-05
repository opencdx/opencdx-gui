import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, TextInput, KeyboardAvoidingView, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetQuestionnaire } from '~/lib/iam-hooks';

const paddingTop = Platform.OS === 'android' ? Math.ceil(StatusBar.currentHeight || 0) : 0;

const TakeQuestionnaire: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { mutate: getQuestionnaire, data } = useGetQuestionnaire();
  const [isWeb, setIsWeb] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        await getQuestionnaire(id);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionnaire();

    if (Platform.OS === 'web') {
      document.title = 'Questionnaires';
      setIsWeb(true);
    }
  }, [getQuestionnaire, isWeb]);



  const content = (
    <>
      <View className="w-full max-w-[800px] flex flex-col justify-center items-center gap-4">
        <Text className="font-inter font-medium text-left w-full text-3xl mb-2">
          Question 1 {data?.data.title}
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ paddingTop }} className={`flex-1 bg-white`}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts based on platform
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })} // Offset for smooth scrolling
      >
        <ScrollView>

          {isWeb ? (
            <main aria-label="main-layout questionnaire-list">
              {content}
            </main>
          ) : (
            content
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(TakeQuestionnaire);
