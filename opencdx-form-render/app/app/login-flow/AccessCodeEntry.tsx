import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AccessCodeEntry = ({ onSubmit, onBack }: { onSubmit: (accessCode: string) => void, onBack: () => void }) => {
  const [accessCode, setAccessCode] = useState('');
  const navigation = useNavigation();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Todo: Ravi - Add code here
    navigation.navigate('app/login-flow/SignUp' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter access code</Text>
        <Text style={styles.subtitle}>
          Please enter the access code provided by your company.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Access Code*"
          value={accessCode}
          onChangeText={setAccessCode}
          placeholderTextColor="#666"
        />

        <TouchableOpacity 
          style={[
            styles.submitButton,
            !accessCode && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!accessCode}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#C026D3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButtonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
});

export default AccessCodeEntry; 