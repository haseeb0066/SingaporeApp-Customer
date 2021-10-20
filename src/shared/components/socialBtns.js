import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Work from '../exporter';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';
import BtnWrapper from './btnWrapper';
import { Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '81181459861-enum28707b82csl18qp40u0064m6s6bs.apps.googleusercontent.com',
  offlineAccess: true
});

const {
  WP,
  THEME: { colors },
} = Work;
const SocialBtns = ({ onPressFB, onPressApple, onPressGoogle }) => {


  return (
    <View>
      <BtnWrapper onPress={onPressApple}>
        <View style={[styles.btnContainer, { backgroundColor: '#1D1D20' }]}>
          <View style={styles.btnIconTextRow}>
            <Micon name="apple" color={colors.white} size={WP('7')} />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.txt}>Continue with Apple</Text>
          </View>
        </View>
      </BtnWrapper>
      <BtnWrapper onPress={onPressFB}>
        <View style={[styles.btnContainer, { backgroundColor: '#2E3092' }]}>
          <View style={styles.btnIconTextRow}>
            <Micon name="facebook" color={colors.white} size={WP('7')} />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.txt}>Continue with Facebook</Text>
          </View>
        </View>
      </BtnWrapper>
      <BtnWrapper onPress={onPressGoogle}>
        <View
          style={[
            styles.btnContainer,
            {
              backgroundColor: colors.white,
              borderWidth: 2,
              borderColor: colors.grey,
            },
          ]}>
          <View style={styles.btnIconTextRow}>
            <Image
              style={{ width: WP('7'), height: WP('7') }}
              source={require('../../assets/img/google.png')}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={[styles.txt, { color: colors.black, fontWeight: 'bold' }]}>
              Continue with Google
            </Text>
          </View>
        </View>
      </BtnWrapper>
    </View>
  );
};

export default SocialBtns;

const styles = StyleSheet.create({
  btnContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: WP('2.5'),
  },
  btnIconTextRow: {
    flex: 1,
    alignItems: 'flex-end',
  },
  txt: {
    fontSize: WP('4'),
    fontWeight: 'bold',
    color: colors.white,
    paddingVertical: WP('3'),
    paddingStart: WP('1'),
    marginLeft: 8
  },
});
