import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from './btnWrapper';

const {WP} = Work;
const StoreDetailHeader = ({onPressBack, onPressInfo, onPressShare}) => {
  return (
    <View style={styles.container}>
      <BtnWrapper onPress={onPressBack}>
        <Image
          style={styles.icons}
          source={require('../../assets/img/21.png')}
        />
      </BtnWrapper>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BtnWrapper>
          <Image
            style={[styles.icons, {marginRight: WP('2')}]}
            source={require('../../assets/img/22.png')}
          />
        </BtnWrapper>
        <BtnWrapper>
          <Image
            style={styles.icons}
            source={require('../../assets/img/23.png')}
          />
        </BtnWrapper>
      </View>
    </View>
  );
};

export default StoreDetailHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: WP('3.5'),
  },
  icons: {width: WP('8'), height: WP('8'), resizeMode: 'contain'},
});
