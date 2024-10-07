import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router, Stack } from 'expo-router';
import { Image } from '@/components/ui/image';
import { Button, ButtonText } from '@/components/ui/button';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@/components/ui/radio';
import { HStack } from '@/components/ui/hstack';
import { CircleIcon } from '@/components/ui/icon';
import { useState } from 'react';

export default function SettingScreen() {

  const [values, setValues] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Exposure'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
        <ThemedText type="title">Begin a Test</ThemedText>
        <ThemedText>Based on your responses, it is recommended that you take a COVID-19 test. Do not take a test until prompted to do so. Please note, you mnust use a test provided to you form this benefit. Click below if you need to order a test, or to confirm that your test is supported.</ThemedText>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../test/step1")}>
          <ButtonText>Take a Test</ButtonText>
        </Button>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../order/step1")}>
          <ButtonText>Order a Test Kit</ButtonText>
        </Button>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../(tabs)")}>
          <ButtonText>Exit</ButtonText>
        </Button>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    maxWidth: 600
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
  },
  card: {
    gap: 8,
    marginBottom: 8,
    padding: 10,
    alignItems: 'center'
  },
});
