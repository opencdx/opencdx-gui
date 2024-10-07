import { SafeAreaView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { router, Stack } from 'expo-router';
import { useState } from 'react';

export default function SettingScreen() {

  const [values, setValues] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Symptoms'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
        <ThemedText type="title">Which of these symptoms or conditions do you have?</ThemedText>
        <CheckboxGroup
          value={values}
          onChange={(keys) => {
            setValues(keys)
          }}
        >
          <VStack space="xl" style={styles.question}>
            <Checkbox value="pain">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Severe pain</CheckboxLabel>
            </Checkbox>
            <Checkbox value="vomitting">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Persistent vomiting</CheckboxLabel>
            </Checkbox>
            <Checkbox value="dizziness">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Dizziness or loss of consciousness</CheckboxLabel>
            </Checkbox>
            <Checkbox value="confusion">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Confusion</CheckboxLabel>
            </Checkbox>
            <Checkbox value="temp">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Temperature greater than 103 °F or 39.4 °C</CheckboxLabel>
            </Checkbox>
            <Checkbox value="breathing">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Moderate to sever difficulty breathing</CheckboxLabel>
            </Checkbox>
            <Checkbox value="oxygen">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Oxygen saturation level less than 95%</CheckboxLabel>
            </Checkbox>
            <Checkbox value="chest">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Chest pain</CheckboxLabel>
            </Checkbox>
            <Checkbox value="none">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>None of the above</CheckboxLabel>
            </Checkbox>
          </VStack>
        </CheckboxGroup>
        <Button size="md" variant="solid" action="primary" onPress={() => router.navigate("../consult/step3")}>
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
  question: {
    padding: 10
  }
});
