import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Keyboard} from 'react-native';
import Header from '../../../shared/components/header';
import AsyncStorage from '@react-native-community/async-storage';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import axios from 'axios';
import * as jobs from '../../../store/actions/auth.action';
import Loader from '../../../shared/components/Loader';
import BtnWrapper from '../../../shared/components/btnWrapper';

import {useDispatch, useSelector} from 'react-redux';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const {WP} = Work;
const Codeverification = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [loader, setloader] = useState(false);
  const [verificationCode, setVerificationCode] = React.useState();
  const input = useRef();

  const handleCode = async () => {
    setloader(true);
    const value = await AsyncStorage.getItem('verificationCode');
    if (verificationCode == value) {
      const checkInernet = await Work.checkInternetConnection();
      if (checkInernet) {
        if (route.params.forgot) {
          navigation.navigate('NewPassword', {user_id: route.params.user});

          setloader(false);
        } else {
          try {
            const response = await axios.get(
              `/verify_account/${route.params.user.id}`,
            );
            console.log(response.data);
            if (response?.data.status == 'success') {
              dispatch(jobs.saveUser(response.data));

              setloader(false);
            } else {
              Work.showToast(Work.GENERAL_ERROR_MSG);
              setloader(false);
            }
          } catch (error) {}
        }
      } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    } else {
      setloader(false);
      Work.showToast('Code mismatch');
    }
  };

  return (
    <SafeWrapper>
      <Loader visible={loader} />
      <Header
        onPressBack={() => navigation.goBack()}
        onPressNext={() => navigation.navigate('dashboard')}
        show={true}
      />
      <Image
        style={styles.img}
        source={require('../../../assets/img/verifyphone.png')}
      />
      <Text style={styles.contact}>Verify your mobile number</Text>
      <Text style={styles.checkacc}>
        Enter 4-digit code sent to your number
      </Text>
      <Text style={[styles.checkacc, {paddingTop: 0}]}>
        {route.params.number}
      </Text>
      <View style={{marginVertical: WP('10'), alignItems: 'center'}}>
        <SmoothPinCodeInput
          cellStyle={{
            height: WP('14.5'),
            width: WP('15'),
            // borderRadius: 5,
            borderColor: Work.THEME.colors.primary,
            // borderColor: '#ddd',
            borderWidth: 1,
            // shadowColor: '#000000',
            // shadowOffset: { width: 0, height: 3 },
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 5,
            // shadowRadius: 2,
            backgroundColor: '#FFFFFF',
          }}
          // codeLength={2}
          textStyle={styles.textBold}
          cellSpacing={WP('2')}
          value={verificationCode}
          placeHolder="_"
          onTextChange={(code) => {
            setVerificationCode(code);
          }}
          onFulfill={() => {
            Keyboard.dismiss();
          }}
          onBackspace={() => {
            console.log('No More Backspace');
          }}
        />
      </View>
      {/* <Text
        style={[styles.checkacc, {fontSize: WP('4.5'), fontWeight: 'bold'}]}>
        Send it again
      </Text> */}
      <BtnWrapper onPress={handleCode}>
        <View style={styles.btn}>
          <Text style={styles.forgotPassTxt}>Verify</Text>
        </View>
      </BtnWrapper>
    </SafeWrapper>
  );
};

export default Codeverification;

const styles = StyleSheet.create({
  img: {
    width: WP('25'),
    height: WP('25'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: WP('4'),
  },
  contact: {
    fontSize: WP('6'),
    fontWeight: 'bold',
    paddingStart: WP('4'),
    paddingTop: WP('3'),
  },
  checkacc: {
    color: Work.THEME.colors.text,
    paddingStart: WP('4.5'),
    paddingTop: WP('5'),
    fontSize: WP('4'),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Work.THEME.colors.primary,
    width: 50,
    height: 45,
    marginHorizontal: WP('1'),
  },
  inputStyle: {
    padding: WP('2'),
    fontSize: WP('4.2'),
    color: Work.THEME.colors.text,
  },
  btn: {
    width: '90%',
    alignSelf: 'center',
    marginTop: WP('7'),
    padding: WP('3'),
    fontSize: WP('4.2'),
    backgroundColor: Work.THEME.colors.primary,
    borderColor: Work.THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: WP('5.5'),
  },
});
