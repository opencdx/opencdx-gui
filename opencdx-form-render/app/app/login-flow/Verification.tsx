import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserFlow } from '../context/UserFlowContext';
import { commonStyles } from '../../constants/styles';
import ScreenWrapper from '~/app/components/ScreenWrapper';

const styles = {
  container: "flex-1 p-5 bg-white",
  backButton: "mb-5",
  codeContainer: "flex-row justify-between mb-4",
  inputFocused: "border-pink-500",
};

export default function Verification() {
  const route = useRoute();
  const { phoneNumber } = route.params as { phoneNumber: string };
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRefs = Array(6).fill(0).map(() => React.useRef<TextInput>(null));

  const { accountInformationRequired, shippingAddressRequired } = useUserFlow();

  const handleContinue = () => {
    if (verificationCode.length === 6) {
      if (accountInformationRequired) {
        navigation.navigate('app/login-flow/AccountInformation');
      } else if (shippingAddressRequired) {
        navigation.navigate('app/login-flow/ShippingAddress');
      } else {
        navigation.navigate('app/login-flow/WelcomeScreen');
      }
    }
  };

  const handleResendCode = () => {
    // Todo : Ravi - Add code here
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = verificationCode.split('');
    newCode[index] = text.replace(/[^0-9]/g, '');
    setVerificationCode(newCode.join(''));
    
    if (text.length === 1 && index < 6) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity className={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <Text className={commonStyles.text.title}>Verify Phone Number</Text>
      <Text className={commonStyles.text.subtitle}>
        We've sent a code to {phoneNumber}. The code expires shortly, so please enter it as soon as possible.
      </Text>

      <View className={styles.codeContainer}>
        {[0, 1, 2, 3, 4, 5].map((item, i) => (
          <TextInput
            ref={inputRefs[i]}
            className={[
              commonStyles.input,
              focusedIndex === i && styles.inputFocused
            ].join(' ')}
            keyboardType="number-pad"
            maxLength={1}
            value={verificationCode[i] || ''}
            onChangeText={(text) => handleCodeChange(text, i)}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(-1)}
            editable={true}
            selectTextOnFocus={true}
            caretHidden={false}
          />
        ))}
      </View>

      <TouchableOpacity 
        className={[
          commonStyles.button.primary,
          verificationCode.length < 6 && commonStyles.button.disabled
        ].join(' ')}
        onPress={handleContinue}
        disabled={verificationCode.length < 6}
      >
        <Text className={commonStyles.buttonText.primary}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className={commonStyles.button.secondary}
        onPress={handleResendCode}
      >
        <Text className={commonStyles.buttonText.secondary}>Resend Code</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
