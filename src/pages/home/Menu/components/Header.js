import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../shared/components/btnWrapper';
import * as Work from '../../../../shared/exporter';

import imageAssets from '../../../../assets/imageAssets';
import SecondHeader from '../../../../shared/components/secondheader';

const {
  WP,
  THEME: { colors },
} = Work;
const Header = ({ navigation, stallDetail, stall }) => {
  return (
    <View style={{ flex: 0.6 }}>
      <ImageBackground
        source={{ uri: stallDetail.cover_image }}
        style={styles.image}>
        <SecondHeader onPressBack={() => navigation.goBack()} />
      </ImageBackground>
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <Text style={styles.restuarantName}>{stallDetail.name}</Text>
        {/* <Text style={{ paddingStart: WP('3') }}>{stall?.stall?.tags}</Text> */}
        {/* <View style={[styles.row, { marginTop: WP('1') }]}>
          {stall?.stall?.distance && (
            <View style={styles.row}>
              <Image
                style={{ width: WP('4'), height: WP('3') }}
                source={imageAssets.locationMark}
                resizeMode="contain"
              />
              <Text style={styles.smTxt}>
                {Math.round(stall?.stall?.distance * 1.609344)} km
              </Text>
            </View>
          )}

          <View style={styles.row}>
            <Image
              style={{ width: WP('4'), height: WP('5') }}
              source={imageAssets.bike}
              resizeMode="contain"
            />
            <Text style={styles.smTxt}>$ 8.80</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: WP('60'),
  },
  restuarantName: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.black,
    marginStart: WP('3'),
  },
  topPickTxt: {
    fontSize: scale(17),
    fontWeight: 'bold',
    paddingStart: WP('3'),
    paddingTop: WP('4'),
    marginBottom: WP('4'),
  },
  smTxt: {
    fontSize: scale(10),
    marginLeft: WP('1'),
    color: colors.grey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: WP('1'),
  },
});
