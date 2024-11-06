import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScanTestScreen = () => {
    const navigation = useNavigation();

    const scanTest = () => {
        navigation.navigate('app/test-scan/ScanCode' as never);
    };

    const contactSupport = () => {
        // TODO: Implement contact support functionality
        console.log('Contact support pressed');
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scan Test</Text>
        
        <Text style={styles.instructions}>
          Remove test device from white pouch, and hold your camera over the QR code.
        </Text>

        <Text style={styles.warning}>
          NOTE: Do not open the kit contents until ready for use. If the test cassette is open
          for an hour or longer, invalid test results may occur.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.supportButton]}
            onPress={contactSupport}
          >
            <Text style={[styles.buttonText, styles.supportButtonText]}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.scanButton]}
            onPress={scanTest}
          >
            <Text style={[styles.buttonText, styles.scanButtonText]}>Scan Code</Text>
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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 24,
    lineHeight: 24,
  },
  warning: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 22,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  supportButton: {
    backgroundColor: 'white',
  },
  supportButtonText: {
    color: '#C026D3',
  },
  scanButton: {
    backgroundColor: '#F3E8FF',
  },
  scanButtonText: {
    color: '#C026D3',
  },
});

export default ScanTestScreen;
