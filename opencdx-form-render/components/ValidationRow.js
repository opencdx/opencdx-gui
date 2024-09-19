// ValidationRow.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Image
} from '@gluestack-ui/themed';

const ValidationRow = ({ isValid, label }) => (
    <View style={styles.rowContainer}>
    <View style={styles.iconContainer}>
    <Image
          source={isValid ? require('../assets/tick.svg') : require('../assets/cross.svg') } // Replace with the path to your check icon
          style={styles.icon}
          alt={isValid ? 'Valid' : 'Invalid'}
        />
    </View>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 4,
    },
    iconContainer: {
      width: 18,
      height: 18,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 18,
      height: 18,
    },
    label: {
      color: '#6B7280', // Tailwind gray-400 color
      fontSize: 12, // Equivalent to 0.65rem
      lineHeight: 18,
    },
  });
  
  export default ValidationRow;