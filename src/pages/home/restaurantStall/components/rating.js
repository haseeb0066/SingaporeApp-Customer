import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { THEME } from '../../../../shared/exporter';

const rating = ({rating, orders}) => {
  return (
    <View style={styles.rating}>
      <Text style={styles.ratingTxt}>
        <Entypo name="star" size={scale(18)} color="white" />
        <Entypo name="star" size={scale(18)} color="white" />
        <Entypo name="star" size={scale(18)} color="white" />
        <Entypo name="star" size={scale(18)} color="white" />
        <Entypo name="star" size={scale(18)} color="white" /> {rating} ({orders})
      </Text>
    </View>
  );
};

export default rating;

const styles = StyleSheet.create({
  rating: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(10),
  },
  ratingTxt: {
    color: THEME.colors.white,
    fontWeight: 'bold',
    fontSize: scale(15),
  },
});
