import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../../shared/components/header';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import { Input } from 'react-native-elements';
import BtnWrapper from '../../../shared/components/btnWrapper';
import Loader from '../../../shared/components/Loader';
import axios from 'axios';
const { WP } = Work;
const NewPassword = ({ navigation, route }) => {
  const [loader, setloader] = useState(false);

  const handleSubmit = async (values) => {
    const checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      try {
        setloader(true);
        console.log('IDHR', route.params.user_id);
        console.log("Password Value is Here >>>>>> ? " + values.password);
        const response = await axios.post(`/update_password`, {
          password: values.password,
          user_id: route.params.user_id,
        });

        console.log('resPhone', response?.data);
        if (response?.data.status == 'success') {
          setloader(false);
          Work.showToast(response.data.successMessage);

          setTimeout(() => {
            navigation.navigate('onlyLogin');
          }, 2000);
        }
      } catch (error) {
        setloader('false');
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };

  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
        <Loader visible={loader} />
        <Header
          onPressBack={() => navigation.navigate('onlyLogin')}
          show={true}
        />

        <Text style={styles.contact}>Enter your new password</Text>

        <Formik
          initialValues={{ password: '', confirmPass: '' }}
          validationSchema={Yup.object({
            password: Yup.string().required('Password is required'),
            confirmPass: Yup.string().oneOf(
              [Yup.ref('password'), null],
              'Passwords must match',
            ),
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
              <Input
                onChangeText={handleChange('password')}
                containerStyle={styles.inputContainer}
                secureTextEntry
                inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
                inputStyle={styles.inputStyle}
                value={values.password}
                placeholder="New Password"
                errorMessage={
                  errors.password && touched.password ? errors.password : null
                }
                rightIcon={
                  <Image
                    style={{
                      resizeMode: 'contain',
                      width: WP('6'),
                      height: WP('6'),
                    }}
                    source={require('../../../assets/img/lock.png')}
                  />
                }
              />
              <Input
                onChangeText={handleChange('confirmPass')}
                containerStyle={styles.inputContainer}
                secureTextEntry
                inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
                inputStyle={styles.inputStyle}
                value={values.confirmPass}
                placeholder="Confirm Password"
                errorMessage={
                  errors.confirmPass && touched.confirmPass
                    ? errors.confirmPass
                    : null
                }
                rightIcon={
                  <Image
                    style={{
                      resizeMode: 'contain',
                      width: WP('6'),
                      height: WP('6'),
                    }}
                    source={require('../../../assets/img/lock.png')}
                  />
                }
              />
              <BtnWrapper onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.forgotPassTxt}>Confirm</Text>
                </View>
              </BtnWrapper>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default React.memo(NewPassword);

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
    textAlign: 'center',
    marginVertical: WP('10'),
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
    width: WP('90'),
    height: 45,
    alignSelf: 'center',
    marginVertical: WP('4'),
  },
  inputStyle: {
    padding: WP('2'),
    fontSize: WP('4.2'),
    color: Work.THEME.colors.text,
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
