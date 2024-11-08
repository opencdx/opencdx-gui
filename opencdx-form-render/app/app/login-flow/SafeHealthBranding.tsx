import React from 'react';
import { View, Image } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

const styles = {
  container: "flex-1 justify-between flex-col items-center py-10 px-5",
  logoContainer: "items-center",
  mainLogo: "w-[400px] h-[100px]",
  footer: "items-center mb-5",
  footerLogo: "w-[400px] h-[100px]",
};

const SafeHealthBranding = () => {
  return (
    <ScreenWrapper>
      <View className={styles.container}>
        {/* Main Logo */}
        <View className={styles.logoContainer}>
          <Image 
            source={require('../../../assets/safe-health.png')} 
            className={styles.mainLogo}
            resizeMode="contain"
          />
        </View>
        
        {/* Footer */}
        <View className={styles.footer}>
          <Image 
            source={require('../../../assets/safe-health-poweredby-gray.png')} 
            className={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SafeHealthBranding;