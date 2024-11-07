import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

interface ScreenWrapperProps {
  children: ReactNode;
  contentContainerClassName?: string;
}

const styles = {
  safeArea: "flex-1 bg-white",
  scrollView: "flex-1",
  contentContainer: "items-center",
  innerWrapper: "flex-1 p-4 w-full max-w-[500px]"
};

const ScreenWrapper = ({ children, contentContainerClassName = "" }: ScreenWrapperProps) => {
  return (
    <SafeAreaView className={styles.safeArea}>
      <ScrollView 
        className={styles.scrollView}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View className={`${styles.innerWrapper} ${contentContainerClassName}`}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;