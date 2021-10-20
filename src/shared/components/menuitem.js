import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import SafeWrapper from './safeWrapper';

const {WP} = Work;
const Menuitem = ({name, desc, img, price}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '70%'}}>
          <Text style={styles.desc}>{desc}</Text>
          <Text
            style={[styles.name, {fontSize: WP('3.8'), paddingTop: WP('2')}]}>
            $ {price}
          </Text>
        </View>
        <Image
          style={styles.img}
          source={{
            uri: img,
          }}
        />
      </View>
      <View style={styles.separator}></View>
    </View>
  );
};

export default Menuitem;

const styles = StyleSheet.create({
  img: {
    width: WP('27'),
    height: WP('20'),
  },
  desc: {
    color: Work.THEME.colors.text,
    paddingEnd: WP('0.4'),
  },
  name: {
    fontSize: WP('4.5'),
    fontWeight: 'bold',
    color: Work.THEME.colors.text,
  },
  container: {
    width: '93%',
    alignSelf: 'center',
  },
  separator: {
    borderWidth: 1.3,
    borderColor: Work.THEME.colors.text,
    marginVertical: WP('4'),
  },
});
