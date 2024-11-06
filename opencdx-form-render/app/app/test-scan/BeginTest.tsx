import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BeginTestScreen = () => {
    const navigation = useNavigation();

    const scanTest = () => {
        navigation.navigate('app/test-scan/ScanTestScreen' as never);
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Begin a Test</Text>
        
        <Text style={styles.subtitle}>
          Based on your responses, it is recommended that you take a COVID-19 test. 
          Do not take a test until prompted to do so.
        </Text>

        <Text style={styles.disclaimer}>
          Please note, you must use a test provided to you from this benefit. 
          Click below if you need to order a test, or to confirm that your test is supported.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={scanTest}
          >
            <Text style={styles.continueText}>Take a Test</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.continueButton, styles.continueButtonDisabled]}
            onPress={() => {}}
          >
            <Text style={styles.continueText}>Order a Test Kit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
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
    lineHeight: 24,
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  continueButton: {
    backgroundColor: '#C026D3',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonDisabled: {
    backgroundColor: '#E291B7',
    opacity: 0.5,
  },
});

export default BeginTestScreen;
