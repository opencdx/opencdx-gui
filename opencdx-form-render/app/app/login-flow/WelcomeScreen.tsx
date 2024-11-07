import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

const styles = {
  logo: "w-20 h-20 bg-fuchsia-600 rounded-full mb-8",
  greeting: "text-2xl text-fuchsia-600 mb-2",
  welcome: "text-2xl text-fuchsia-600 mb-5 text-center",
  description: "text-center text-gray-600 mb-10",
  primaryButton: "bg-fuchsia-600 py-4 px-8 rounded-full w-full items-center mb-5",
  primaryButtonText: "text-white text-base font-medium",
  secondaryButtonText: "text-fuchsia-600 text-base"
};

const WelcomeScreen = ({ firstName }: { firstName: string }) => {
  return (
    <ScreenWrapper contentContainerClassName="items-center">
      <View className={styles.logo} />
      <Text className={styles.greeting}>Hi {firstName},</Text>
      <Text className={styles.welcome}>Welcome to Safe Health Development2</Text>
      <Text className={styles.description}>
        In the interest of safety we ask that you take this virtual consult and get tested for COVID-19. Additional instructions will follow.
      </Text>
      <TouchableOpacity className={styles.primaryButton}>
        <Text className={styles.primaryButtonText}>Get Care Now</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className={styles.secondaryButtonText}>I'll do it later</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
