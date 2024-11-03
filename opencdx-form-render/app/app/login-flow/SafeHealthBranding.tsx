import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SafeHealthBranding = () => {
  return (
    <View style={styles.container}>
      {/* Main Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/safe-health.png')} 
          style={styles.mainLogo}
          resizeMode="contain"
        />
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        {/* <Text style={styles.poweredByText}>Powered by</Text> */}
        <Image 
          source={require('../../../assets/safe-health-poweredby-gray.png')} 
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainLogo: {
    width: 200,
    height: 50,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  poweredByText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  footerLogo: {
    width: 200,
    height: 40,
  },
});

export default SafeHealthBranding;