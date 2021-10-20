import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from '../components/btnWrapper';

const {WP} = Work;
const Header = ({onPressBack, onPressNext, show}) => {
  return (
    <View style={styles.container}>
      <BtnWrapper onPress={onPressBack}>
        <Image
          style={styles.back}
          source={require('../../assets/img/backarrow.png')}
        />
      </BtnWrapper>
      {!show ? (
        <BtnWrapper onPress={onPressNext}>
          <View>
            <Text style={styles.next}>Next</Text>
          </View>
        </BtnWrapper>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: WP('3'),
  },
  back: {
    resizeMode: 'contain',
    width: WP('8'),
    height: WP('8'),
    marginStart: WP('4'),
  },
  next: {
    color: Work.THEME.colors.primary,
    fontWeight: 'bold',
    fontSize: WP('4.5'),
    paddingEnd: WP('4'),
  },
});
