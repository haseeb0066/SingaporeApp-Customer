import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from './btnWrapper';

const {WP} = Work;
const FeaturedRestaurant = ({img, desc, minOrder, name, onPress}) => {
  return (
    <BtnWrapper onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={{
            width: WP('54'),
            alignSelf: 'center',
            height: WP('30'),
          }}
          source={{uri: img}}
        />

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={{paddingStart: WP('2')}}>
          <Text
            style={[
              styles.desc,
              {fontWeight: 'bold', color: Work.THEME.colors.black},
            ]}>
            $ 10.00
          </Text>
          <Text style={styles.desc}> minimum order</Text>
        </Text>
        <Text style={{paddingStart: WP('2'), paddingBottom: WP('6')}}>
          <Text
            style={[
              styles.desc,
              {fontWeight: 'bold', color: Work.THEME.colors.black},
            ]}>
            $ 04.00
          </Text>
          <Text style={styles.desc}> delivery fee</Text>
        </Text>
      </View>
    </BtnWrapper>
  );
};

export default FeaturedRestaurant;

const styles = StyleSheet.create({
  container: {
    width: WP('56'),
    flex: 1,
    borderWidth: 0,
    elevation: 4,
    shadowColor: Work.THEME.colors.grey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 0.5,
    marginHorizontal: WP('2'),
    marginBottom: WP('1'),
  },
  name: {
    fontSize: WP('4.2'),
    fontWeight: 'bold',
    color: Work.THEME.colors.darkGreen,
    padding: WP('1'),
    paddingStart: WP('2'),
  },
  desc: {
    fontSize: WP(3.5),
    color: Work.THEME.colors.text,
    padding: WP('2'),
  },
});
