import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import SafeWrapper from '../../../shared/components/safeWrapper';

import * as Work from '../../../shared/exporter';
import BtnWrapper from '../../../shared/components/btnWrapper';
import { Input } from 'react-native-elements';
import Line from '../../../shared/components/Line';
import SocialBtns from '../../../shared/components/socialBtns';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import * as Jobs from '../../../store/actions/auth.action';
import Loader from '../../../shared/components/Loader';

GoogleSignin.configure({
  // webClientId:
  //   '81181459861-enum28707b82csl18qp40u0064m6s6bs.apps.googleusercontent.com',
  // "client_type": 3,
  androidClientId: '63627925348-7sh7erulrmr47d9r5tu3o5j7u307bln2.apps.googleusercontent.com',
  // offlineAccess: true,
});

const {
  WP,
  HP,
  THEME: { colors },
} = Work;
const Deliveryaddress = ({ navigation }) => {
  const loader = useSelector((state) => state?.auth.userLoader);
  const dispatch = useDispatch();

  const signIn = async () => {
    const checkConnection = await Work.checkInternetConnection();
    if (checkConnection) {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo?.user) {
          const userData = {
            first_name: userInfo.user.givenName,
            last_name: userInfo.user.familyName,
            role: 'Customer',
            fb_id: '',
            phone: '',
            email: userInfo.user.email,
            google_id: userInfo.user.id,
            apple_id: '',
          };
          dispatch(Jobs.socialLogin(userData, navigation));
        }
        await GoogleSignin.signOut();
      } catch (error) {
        console.log('error', error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('user cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('operation (e.g. sign in) is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('play services not available or outdated');
        } else {
          // some other error happened
        }
      }
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };

  useEffect(() => {
    // Jobs.saveUser(null)
  }, []);

  return (
    <SafeWrapper style={{ flex: 1, borderWidth: 0 }}>
      <Loader visible={loader} />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={{ flex: 0.5, marginBottom: WP('2'), marginTop: WP('7') }}>
          <Text
            style={{
              width: '80%',
              alignSelf: 'center',
              textAlign: 'center',
              marginVertical: WP('5'),
              marginBottom: WP('2'),
              color: Work.THEME.colors.black,
              fontSize: WP('9'),
            }}>
            WELCOME
          </Text>
          <Image
            style={styles.logo}
            source={require('../../../assets/img/logo.png')}
          />
        </View>
        <View style={{ flex: 1.2 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.signUplogin}>Sign up or Login</Text>
            <SocialBtns onPressGoogle={signIn} />
            <View style={styles.OrDivider}>
              <View style={{ width: '45%' }}>
                <Line />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: WP('3'),
                  fontWeight: 'bold',
                }}>
                or
              </Text>
              <View style={{ width: '45%' }}>
                <Line />
              </View>
            </View>
            <BtnWrapper onPress={() => navigation.navigate('email')}>
              <View
                style={{
                  alignSelf: 'center',
                  width: '85%',
                  borderColor: Work.THEME.colors.grey,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.continueWithEmail}>
                  Continue with Email
                </Text>
              </View>
            </BtnWrapper>

{/* ------------------------ NEW ADDITION --------------- */}
<View style={styles.OrDivider}>
              <View style={{ width: '45%' }}>
                <Line />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: WP('3'),
                  fontWeight: 'bold',
                }}>
                or
              </Text>
              <View style={{ width: '45%' }}>
                <Line />
              </View>
            </View>



          <BtnWrapper
            onPress={() => navigation.navigate('dashboard')}
            
            >
              <View
                style={{
                  alignSelf: 'center',
                  width: '85%',
                  borderColor: Work.THEME.colors.grey,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.continueWithEmail}>
                  Explore App
                </Text>
              </View>
            </BtnWrapper>
{/* ------------------------ NEW ADDITION --------------- */}

          </View>
          <View style={styles.privacyPolicy}>
            <Text style={styles.privacyPolicyTxt}>
              By continue you agree to{' '}
            </Text>
            <BtnWrapper>
              <Text style={[styles.privacyPolicyTxt, { color: '#4BC5F3' }]}>
                {'T&C '}
              </Text>
            </BtnWrapper>
            <Text style={styles.privacyPolicyTxt}>{'& '}</Text>
            <BtnWrapper>
              <Text style={[styles.privacyPolicyTxt, { color: '#4BC5F3' }]}>
                {'Privacy Policy'}
              </Text>
            </BtnWrapper>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default Deliveryaddress;

const styles = StyleSheet.create({
  logo: {
    width: WP('40'),
    height: WP('40'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: WP('4'),
  },
  txt: {
    fontWeight: 'bold',
    color: colors.darkGreen,
    fontSize: WP('4'),
    textAlign: 'center',
    marginTop: WP('4'),
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: colors.grey,
    height: 45,
    width: '85%',
    alignSelf: 'center',
    marginTop: WP('3'),
  },
  signUplogin: {
    fontSize: WP('7.5'),
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
    textAlign: 'center',
    padding: WP('4'),
  },
  continueWithEmail: {
    textAlign: 'center',
    fontSize: WP('4.5'),
    fontWeight: 'bold',
    textDecorationLine: 'none',
    color: colors.grey,
    paddingVertical: WP('2.5'),
  },
  navigation: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: WP('6.5'),
    height: HP('4'),
  },
  navigationIcons: {
    width: WP('6'),
    height: WP('6'),
  },
  navigationTxt: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  addressInput: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '85%',
    borderColor: Work.THEME.colors.grey,
    borderWidth: 2,
    paddingVertical: WP('2.5'),
    marginTop: WP('2.5'),
  },
  addressInputIcon: {
    flexDirection: 'row',
    height: WP('7'),
    alignItems: 'center',
  },
  addressInputIconImage: {
    width: WP('5'),
    height: WP('5'),
  },
  OrDivider: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  privacyPolicy: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: WP('3.5'),
    marginBottom: WP('2'),
  },
  privacyPolicyTxt: {
    textAlign: 'center',
    fontSize: WP('3.5'),
  },
});
