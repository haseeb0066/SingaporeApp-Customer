import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import BottomShadow from '../../../../shared/components/SingleSidedShadowBox';
import { THEME, WP } from '../../../../shared/exporter';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const stallName = ({ navigation, item, restaurantID }) => {
  const [color, setcolor] = useState('white');
  const navigate = () => {
    setcolor(THEME.colors.primary);
    setcolor('white');
    console.log('StallrestaurantID', restaurantID);
    navigation.navigate('menupage', { item: item.item, restauID: restaurantID });
  };
  return (
    <BottomShadow style={styles.container}>
      <Pressable
        onPress={navigate}
        style={[styles.innerContainer, { backgroundColor: color }]}>
        <Text style={styles.stallName}>{item.item.name}</Text>
      </Pressable>
    </BottomShadow>
  );
};

export default stallName;

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    paddingVertical: moderateVerticalScale(14),
    backgroundColor: THEME.colors.primary,
  },
  stallName: {
    fontWeight: 'bold',
    fontSize: scale(15),
    marginLeft: WP('7'),
  },
});
