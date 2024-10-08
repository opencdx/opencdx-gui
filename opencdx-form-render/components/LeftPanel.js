import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button, Image, HStack } from '@gluestack-ui/themed';
const { width, height } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LeftPanel = ({onSelect}) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState('0');
  const DATA = [{
    id: '0',
    title: 'Dashboard',
    icon: require("../assets/space_dashboard.png"),
    screen: 'Dashboard',
  }, {
    id: '1',
    title: 'Profile',
    icon: require("../assets/person.png"),
    screen: 'Profile',
  }, {
    id: '2',
    title: 'Logout',
    icon: require("../assets/logout_web.png"),
    screen: 'Login',
  }];
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? 'rgba(0, 109, 233, 0.5)' : 'transparent';

    return (
      <TouchableOpacity onPress={
        () => {
          setSelectedId(item.id);
          onSelect(navigation, item);
        }
        } 
        style={[styles.item, { backgroundColor }]}>
        <HStack>
          <Image
            size="sm"
            resizeMode="contain"
            alt={item.title}
            style={styles.icon}
            source={item.icon}
          />
          <Text style={styles.title}>{item.title}</Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
          colors={['rgba(0, 24, 49, 1.0)', 'rgba(0, 24, 49, 1.0)', 'rgba(0, 24, 49, 1.0)', 'rgba(0, 109, 233, 1.0)']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          >
    <View style={styles.container}>
      
      <Image
          size="lg"
          resizeMode="contain"
          alt="OpenCDX logo"
          style={styles.image}
          source={require('../assets/logo-long.png')}
      />
    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.15,
    height: height,
    justifyContent: 'center',
  },
  list: {
    padding: 10,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'medium',
  },
  image: {
    justifyContent: 'center',
    width: 150,
    marginLeft: 20,
    marginVertical: 10,
},
icon: {
  marginRight: 5,
  justifyContent: 'left',
  width: 16,
  height: 16,
},
});

export default LeftPanel;
