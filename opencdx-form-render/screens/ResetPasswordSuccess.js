import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Button, Image, ButtonText } from '@gluestack-ui/themed';

const ResetPasswordSuccess = ({ navigation }) => {

  // Determine if the device is mobile
  const [isMobile, setIsMobile] = useState(Dimensions.get('window').width <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(Dimensions.get('window').width <= 768);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => subscription?.remove();
  }, []);

  const handleSubmit = () => {
    navigation.navigate('Login'); // Ensure 'Login' is correctly defined in your navigation stack
  };

  return (
    <View style={[styles.container, isMobile ? styles.mobileContainer : styles.desktopContainer]}>
      <View
        style={[styles.card, isMobile && styles.mobileCard]}
      >
        <View style={[styles.cardBody]}>
          <View style={styles.iconContainer}>
            <Image
              size="md"
              alt="Success logo"
              style={styles.icon}
              source={require('../assets/reset_pass_success.svg')} // Update with the path to your logo image
            />
            <Text style={styles.title}>
              {"Password Changed"}
            </Text>
            <Text style={styles.description}>
              {"Your password has been changed successfully."}
            </Text>
          </View>
        </View>
        <View style={styles.mainContent}></View>
        <View style={styles.footer}>
          <Button
            color='primary'
            onPress={handleSubmit}
            aria-label={"Proceed to Login"}
            style={styles.button}
          >
            <ButtonText>{"Proceed to Login"}</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mobileContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  desktopContainer: {
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    padding: 16,
  },
  mobileCard: {
    height: '100%',
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  button: {
    width: '100%',
    marginBottom: 24,
  },
  mainContent: {
    flex: 1, // This will take up the remaining height of the container
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResetPasswordSuccess;
