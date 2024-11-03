import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ firstName }: { firstName: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/custom-external-logo.png')} 
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.heading}>External Custom Heading (Show Hide)</Text>
      <Text style={styles.subHeading}>External Custom Subheading (Show Hide)</Text>
      
      <Text style={styles.instructions}>
        External Custom Instructions (Show Hide)
      </Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Redirect to External URL (Show Hide)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.laterText}>Cancel (Show Hide)</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#C026D3',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 24,
    color: '#C026D3',
    marginBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#C026D3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    justifyContent: 'center',
  },  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  laterText: {
    color: '#C026D3',
    fontSize: 16,
  },
});

export default WelcomeScreen;
