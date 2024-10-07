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

export default function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'COVID and Flu'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
      <ThemedText type="title">COVID and Flu</ThemedText>
        <Image size='2xl' source={{ uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/temp/c48e1fdba71e43d1911b5854677a5d48_638587457553789574.jpg' }} alt='Wash Your Hands' />
        <ThemedText>People with the influenza or COVID-19 can get antiviral medicines, which can lower your risk of getting sicker.</ThemedText>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../consult/step2")}>
          <ButtonText>Begin Consultation</ButtonText>
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
