import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router, Stack } from 'expo-router';
import { Image } from '@/components/ui/image';
import { Button, ButtonText } from '@/components/ui/button';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Center } from '@/components/ui/center';

export default function SettingScreen() {
  const [price, setPrice] = useState(45);
  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Order a Test'
        }} />
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.card}>
        <Center>
          <Image
            size='2xl'
            source={require('../../assets/images/test.jpeg')}
            alt='test'
          />
        </Center>
        <ThemedText type='title'>Covid-19 Home Test</ThemedText>
        <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 20 }}>What's Included</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#E5E5E5', marginTop: 10 }}></View>

        <View style={styles.testDescription}>
          <Text style={styles.checklist} > <Feather name="check" size={16} color="green" />  1  Test Cassette</Text>
          <Text style={styles.checklist}> <Feather name="check" size={16} color="green" />  1  Disposable Swab</Text>
          <Text style={styles.checklist}> <Feather name="check" size={16} color="green" />  1  Extraction Buffer Tube</Text>
          <Text style={styles.checklist}> <Feather name="check" size={16} color="green" />  1  Package Insert</Text>
          <Text style={styles.checklist}> <Feather name="check" size={16} color="green" />  Quick Reference Instructions</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

          <View style={styles.countWrapper}>
            <TouchableOpacity onPress={decrementCount} style={styles.countButton}>
              <Text style={styles.countButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity onPress={incrementCount} style={styles.countButton}>
              <Text style={styles.countButtonText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.price}>
              Price: ${price * count}
            </Text>
          </View>
        </View>
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Add to Cart</ButtonText>
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
  },
  testDescription: {
    padding: 5,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  checklist: {
    fontSize: 18,
    color: 'gray',
  },
  countWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  countButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  countButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
