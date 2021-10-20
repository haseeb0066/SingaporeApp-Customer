import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SafeWrapper from '../../../shared/components/safeWrapper';
import StoreDetailHeader from '../../../shared/components/storeDetailHeader';
import * as Work from '../../../shared/exporter';
import ToptabNavigator from '../../../shared/toptabNavigator/toptabNavigator';

const {
  WP,
  THEME: {colors},
} = Work;

const RestaurantDetail = ({navigation}) => {
  return (
    <SafeWrapper>
      <StoreDetailHeader onPressBack={() => navigation.goBack()} />
      <View style={{marginTop: WP('5')}}>
        <Text style={styles.resName}>The Singapore Restaurant</Text>
        <Text style={styles.stall}>MALAY FOOD STALL</Text>
      </View>
      <Image
        style={styles.img}
        source={{
          uri:
            'https://i.pinimg.com/736x/be/4c/85/be4c855d85676a8b7825782f12f6709c.jpg',
        }}
      />
      <View style={{flex: 1}}>
        <ToptabNavigator />
      </View>
    </SafeWrapper>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  resName: {
    color: colors.darkGreen,
    fontSize: WP('8'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stall: {
    color: colors.black,
    fontSize: WP('4.5'),
    fontWeight: 'bold',
    textAlign: 'center',
    padding: WP('2'),
  },
  img: {
    width: '100%',
    height: WP('35'),
  },
});
