import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserFlow } from '../context/UserFlowContext';

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Phone Number</Text>
      <Text style={styles.subtitle}>
        We've sent a code to {phoneNumber}. The code expires shortly, so please enter it as soon as possible.
      </Text>

      <View style={styles.codeContainer}>
        {[0, 1, 2, 3, 4, 5].map((item, i) => (
          <TextInput
            ref={inputRefs[i]}
            style={[
              styles.codeInput,
              focusedIndex === i && styles.codeInputFocused
            ]}
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
        style={[
          styles.continueButton,
          verificationCode.length < 6 && styles.continueButtonDisabled
        ]}
        onPress={handleContinue}
        disabled={verificationCode.length < 6}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.resendButton}
        onPress={handleResendCode}
      >
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  codeInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    padding: 0,
  },
  codeInputFocused: {
    borderColor: '#E291B7',
    borderWidth: 2,
  },
  codeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  codeSeparator: {
    fontSize: 20,
    marginHorizontal: 4,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#C026D3',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
  },
  resendText: {
    color: '#C026D3',
    fontSize: 16,
  },
});
