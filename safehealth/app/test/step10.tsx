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
          title: 'Rotate and Squeeze'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
      <ThemedText type="title">Rotate and Squeeze</ThemedText>
        <Image size='2xl' source={{ uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/LabTestOrderable/CollectionInstruction/Image/c6ac646a758d4ed980348457daf84f48-638043969012659546.png' }} alt='Wash Your Hands' />
        <ThemedText>Rotate swab 5 times while squeezing tube to ensure test is accurate.</ThemedText>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../test/step11")}>
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
