import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';

const {
  WP,
  THEME: {colors},
} = Work;
const TopPicksCard = ({img, price, onPress, name}) => {
  return (
    <View>
      <Image style={styles.img} source={{uri: img}} />
      <Text style={{fontSize: WP('4')}}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

export default TopPicksCard;

const styles = StyleSheet.create({
  img: {
    width: WP('45'),
    height: WP('45'),
  },
  price: {
    fontWeight: 'bold',
    color: colors.black,
    marginTop:WP('4')
  },
});
