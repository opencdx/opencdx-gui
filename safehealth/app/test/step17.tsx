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
          title: 'Scan Test Results'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
        <ThemedText type="title">Scan Test Results</ThemedText>
        <Image size='2xl' source={{ uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/LabTestOrderable/CollectionInstruction/Image/774beb8afe374e289f8b166f8affbafd-638043972283696487.png' }} alt='Wash Your Hands' />
        <ThemedText>On a flat surface, scan test cassette. NOTE: Scan within 15 minutes to avoid false negative or false positive results.</ThemedText>
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
