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
          title: 'Remove the Swab'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
      <ThemedText type="title">Remove the Swab</ThemedText>
        <Image size='2xl' source={{ uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/LabTestOrderable/CollectionInstruction/Image/82cd351d4a824d3cae096d1d0b7e4fee-638043969013944109.png' }} alt='Wash Your Hands' />
        <ThemedText>Remove swab while squeezing side of tube to extract liquid from swab.</ThemedText>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../test/step12")}>
          <ButtonText>Continue</ButtonText>
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
