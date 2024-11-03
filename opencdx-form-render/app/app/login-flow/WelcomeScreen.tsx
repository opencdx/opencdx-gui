import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WelcomeScreen = ({ firstName }: { firstName: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} />
      
      <Text style={styles.heading}>Hi {firstName},</Text>
      <Text style={styles.subHeading}>Welcome to Safe Health Development2</Text>
      
      <Text style={styles.instructions}>
        In the interest of safety we ask that you take this virtual consult and get tested for COVID-19. Additional instructions will follow.
      </Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Care Now</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.laterText}>I'll do it later</Text>
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
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#C026D3',
    borderRadius: 40,
    marginBottom: 30,
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
