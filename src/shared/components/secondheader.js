import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from '../components/btnWrapper';
import Micon from 'react-native-vector-icons/MaterialIcons';
import Mcicons from 'react-native-vector-icons/MaterialCommunityIcons';

import imageAssets from '../../assets/imageAssets';

const {
  WP,
  THEME: {colors},
} = Work;
const SecondHeader = ({
  onPressBack,
  onPressSearch,
  onPressHeart,
  onPressGroup,
}) => {
  return (
    <View
      style={[
        styles.container,
        {justifyContent: 'space-between', marginTop: WP('3')},
      ]}>
      <BtnWrapper onPress={onPressBack}>
        <View style={[styles.iconContainer, {marginStart: WP('6'), marginTop: WP('3')}]}>
          <Image
            style={{width: WP('6'), height: WP('6')}}
            source={imageAssets.backArrow}
            resizeMode="contain"
          />
        </View>
      </BtnWrapper>
    </View>
  );
};

export default SecondHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
  },
});
