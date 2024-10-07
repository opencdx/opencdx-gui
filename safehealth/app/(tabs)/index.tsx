import { StyleSheet, Platform, SafeAreaView, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <Image
            source={{ uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/temp/cf95faf898024ae48be2aa1704bd282d_638599452139833524.png' }}
            alt='SafeHealth' />
            <ThemedText type='title'>Safe Health</ThemedText>
        </ThemedView>
        <Center>
          <ThemedView style={styles.card}>
            <Center>
              <Image
                size='2xl'
                source={{
                  uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/temp/dde54de66013472d83a314c9f6c2f720_638587481952201131.png'
                }}
                alt='Get Care Now' />
            </Center>
            <ThemedText type="subtitle">Get Care Now</ThemedText>
            <ThemedText>Home testing available, speak with a licensed clinician to see if you’re eligible for treatment.</ThemedText>
            <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../consult/step1")}>
              <ButtonText>Begin Consultation</ButtonText>
            </Button>
          </ThemedView>
          <ThemedView style={styles.card}>
            <Center>
              <Image
                size='2xl'
                source={{
                  uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/temp/14bfb20002f74a89b50a3448f1ab4ead_638587482050780891.png'
                }}
                alt='Order a Test' />
            </Center>
            <ThemedText type="subtitle">Order a Test</ThemedText>
            <ThemedText>If you need a test kit order one today and get it delivered to your door.</ThemedText>
            <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../order/step1")}>
              <ButtonText>View Shop</ButtonText>
            </Button>
          </ThemedView>
          <ThemedView style={styles.card}>
            <Center>
              <Image
                size='2xl'
                source={{
                  uri: 'https://safe-content-cache-us-west-2-development2-speed.s3.us-west-2.amazonaws.com/temp/0997acb7dc8b49cc93ecdcf5c033b053_638587481253288161.png'
                }}
                alt='Take a Test' />
            </Center>
            <ThemedText type="subtitle">Take a Test</ThemedText>
            <ThemedText>Click here to take a test and get your results today.</ThemedText>
            <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../test/step1")}>
              <ButtonText>Go to Test</ButtonText>
            </Button>
          </ThemedView>
        </Center>
      </ScrollView>
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
    width: 'auto'
  },
  card: {
    gap: 8,
    marginBottom: 8,
    padding: 10,
    width: 275
  },
});
