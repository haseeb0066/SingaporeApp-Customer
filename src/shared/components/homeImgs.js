import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';

const {WP} = Work;
const HomeImgs = ({img}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{uri: img}} />
    </View>
  );
};

export default HomeImgs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Work.THEME.colors.primary,
    width: WP('40'),
    height: WP('50'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: WP('2'),
  },
  img: {
    width: WP('34'),
    height: WP('34'),
    resizeMode: 'contain',
    borderRadius: 100,
  },
});
