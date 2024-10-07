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
import { Center } from '@/components/ui/center';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import { useState } from 'react';

export default function SettingScreen() {
  const [value, setValue] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Symptoms'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
        <ThemedText type="title">How many days have you had symptoms?</ThemedText>
        <Center className="w-[300px] h-[150px]">
          <ThemedText type='subtitle' style={{padding: 5}}>{value}</ThemedText>
          <Slider
            defaultValue={0}
            size="md"
            orientation="horizontal"
            isDisabled={false}
            isReversed={false}
            value={value}
            onChange={setValue}
            minValue={0}
            maxValue={30}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Center>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../consult/step4")}>
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
