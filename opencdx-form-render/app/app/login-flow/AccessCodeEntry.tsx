import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../constants/styles';

const styles = {
  content: "flex-1 w-full justify-center items-center",
  backButton: "mb-5",
  input: `${commonStyles.input} mb-4`,
  submitButton: `${commonStyles.button.primary} mt-auto mb-8`,
  submitButtonDisabled: commonStyles.button.disabled,
  submitButtonText: commonStyles.buttonText.primary,
};

const AccessCodeEntry = ({ onSubmit, onBack }: { onSubmit: (accessCode: string) => void, onBack: () => void }) => {
  const [accessCode, setAccessCode] = useState('');
  const navigation = useNavigation();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigation.navigate('app/login-flow/SignUp' as never);
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity 
        className={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <View className={styles.content}>
        <Text className={commonStyles.text.title} style={{ textAlign: 'center' }}>
          Enter access code
        </Text>
        <Text className={commonStyles.text.subtitle} style={{ textAlign: 'center' }}>
          Please enter the access code provided by your company.
        </Text>

        <TextInput
          className={styles.input}
          placeholder="Access Code*"
          value={accessCode}
          onChangeText={setAccessCode}
          placeholderTextColor="#666"
        />

        <View style={{ flex: 1 }} />

        <TouchableOpacity 
          className={`${styles.submitButton} ${!accessCode && styles.submitButtonDisabled}`}
          onPress={handleSubmit}
          disabled={!accessCode}
        >
          <Text className={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default AccessCodeEntry; 