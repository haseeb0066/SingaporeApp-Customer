import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../../shared/components/header';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import {Input} from 'react-native-elements';
import BtnWrapper from '../../../shared/components/btnWrapper';
import Loader from '../../../shared/components/Loader';
import axios from 'axios';
import CountryPicker from 'react-native-country-picker-modal';
const {WP} = Work;
const Phoneverification = ({navigation, route}) => {
  const [loader, setloader] = useState(false);
  const [countryCode, setCountryCode] = useState('SG');
  const [countCode, setCountCode] = useState('65');

  const handleSubmit = async (values) => {
    if (values.phone.length < 6 || values.phone.length > 14) {
      Work.showToast('Number must contain 10 digits');
    } else {
      const checkInernet = await Work.checkInternetConnection();
      if (checkInernet) {
        try {
          setloader(true);
          var val = Math.floor(1000 + Math.random() * 9000);
          await AsyncStorage.setItem('verificationCode', val.toString());

          const response = route.params.forgot
            ? await axios.post(`/forget_password_sms`, {
                phone: '+' + countCode + Number(values.phone),
                code: val,
              })
            : await axios.post(`/sendsms`, {
                phone: '+' + countCode + Number(values.phone),
                code: val,
                user_id: route.params.user.id,
              });

          console.log('resPhone', response?.data);
          console.log('resPhone', val);

          if (response?.data.status == 'success') {
            setloader(false);
            Work.showToast(response.data.successMessage);
            if (route.params.forgot) {
              navigation.navigate('codeverification', {
                user: response?.data?.successData?.user_id,
                userSignUp: route.params.userInfo,
                number: '+' + countCode + Number(values.phone),
                forgot: route.params.forgot,
              });
            } else {
              navigation.navigate('codeverification', {
                user: route.params.user,
                userSignUp: route.params.userInfo,
                number: '+' + countCode + Number(values.phone),
              });
            }
          } else if (response?.data?.status == 'error') {
            setloader('false');
            Work.showToast(response?.data?.errorMessage);
          } else {
            setloader('false');
            Work.showToast('Incorrect number');
          }
        } catch (error) {
          setloader('false');
          Work.showToast(Work.GENERAL_ERROR_MSG);
        }
      } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    }
  };

  const onSelect = (country) => {
    setCountCode(country.callingCode[0]);
    setCountryCode(country.cca2);
  };
  useEffect(() => {
    console.log(route.params.user);
  }, []);
  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
        <Loader visible={loader} />
        <Header
          onPressBack={() => navigation.goBack()}
          //   onPressNext={() => navigation.navigate('codeverification')}
          show={true}
        />
        <Image
          style={styles.img}
          source={require('../../../assets/img/verifyphone.png')}
        />

        <Text style={styles.contact}>What's your mobile number...</Text>
        {route.params.forgot ? (
          <Text style={styles.checkacc}>
            Enter the mobile number associated with your account
          </Text>
        ) : (
          <Text style={styles.checkacc}>
            We need this to verify and secure your account
          </Text>
        )}

        <Formik
          initialValues={{phone: ''}}
          validationSchema={Yup.object({
            phone: Yup.number()
              .required('A phone number is required')
              .typeError("That doesn't look like a phone number")
              .integer("A phone number can't include a decimal point")
              .test('len', 'Number must be atleast 6', (val) => {
                if (val) return val.toString().length > 5;
              }),
          })}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <View style={styles.subContainer}>
                <View style={styles.flagContainer}>
                  {/* <Image
                    style={styles.flagIcon}
                    source={require('../../../assets/img/flag.png')}
                  /> */}
                  <View style={styles.countryPickerContainer}>
                    <CountryPicker
                      containerButtonStyle={{}}
                      style={{fontSize: 1}}
                      withCallingCodeButton
                      withCallingCode
                      withFlag
                      withFlagButton
                      withEmoji
                      withFilter
                      withCallingCode
                      countryCode={countryCode}
                      onSelect={onSelect}
                    />
                  </View>
                  <Text style={{paddingRight: WP('2')}}></Text>
                </View>
                <Input
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  errorMessage={
                    errors.phone && touched.phone ? errors.phone : null
                  }
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                  inputStyle={styles.inputStyle}
                  placeholder="Mobile Number"
                  keyboardType="number-pad"
                />
              </View>
              <BtnWrapper onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.forgotPassTxt}>Verify</Text>
                </View>
              </BtnWrapper>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default React.memo(Phoneverification);

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
    width: '74%',
    height: 45,
    alignSelf: 'center',
  },
  inputStyle: {
    padding: WP('2'),
    fontSize: WP('4.7'),
    color: Work.THEME.colors.black,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Work.THEME.colors.primary,
    marginEnd: WP('2'),
  },
  flagIcon: {
    width: WP('10'),
    height: WP('10'),
    resizeMode: 'contain',
    marginStart: WP('1'),
  },
  subContainer: {
    paddingTop: WP('8'),
    flexDirection: 'row',
    // width: WP('90'),
    width: '90%',
    alignSelf: 'center',
  },
  btn: {
    width: WP('92'),
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
  countryPickerContainer: {
    alignSelf: 'center',
  },
});
