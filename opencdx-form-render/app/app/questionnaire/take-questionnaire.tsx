import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, TextInput, KeyboardAvoidingView } from 'react-native';


const TakeQuestionnaire: React.FC = () => {
  const [isWeb, setIsWeb] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Questionnaires';
      setIsWeb(true);
    }
  }, []);



  const content = (
    <>
      <View className="w-full max-w-[800px] flex flex-col justify-center items-center gap-4">

        <Text className="font-inter font-medium text-left w-full text-3xl mb-2">
          Question 1
        </Text>


      </View>
    </>
  );

  return (
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
  );
};

export default React.memo(TakeQuestionnaire);