import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Work from '../../../../shared/exporter';
import CountryPicker from 'react-native-country-picker-modal';

import * as jobs from '../../../../store/actions/auth.action';
import * as Yup from 'yup';
import {Input} from 'react-native-elements';
import {FastField, Formik} from 'formik';

import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import MiIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BtnWrapper from '../../../../shared/components/btnWrapper';

const {WP} = Work;
const InputSec = ({
  firstName,
  lastName,
  email,
  mobile,
  userId,
  load,
  navigation,
}) => {
  const dispatch = useDispatch();
  const updateProfile = async ({
    first_Name,
    last_Name,
    email,
    number,
    password,
  }) => {
    const checkInternet = await Work.checkInternetConnection();
    if (checkInternet) {
      try {
        load(true);

        const data = {
          first_name: first_Name,
          last_name: last_Name,
          email,
          phone: '+' + number,
          password,
        };

        const response = await axios.post(`/update_customer/${userId}`, data);
        console.log('Updated', response.data);
        if (response.data.status == 'success') {
          console.log(response.data);
          dispatch(jobs.saveUser(response.data));
          Work.showToast(response.data.successMessage);
          navigation.goBack();
          load(false);
        } else {
          Work.showToast(response.data.errorMessage);
          load(false);
        }
      } catch (error) {
        load(false);
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };
  useEffect(() => {
    console.log('Eidt', mobile);
  }, []);
  return (
    <Formik
      initialValues={{
        first_Name: firstName,
        last_Name: lastName,
        email: email,
        number: mobile,
        password: '',
        confirmPass: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid Email').required('Required'),
        first_Name: Yup.string()
          .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
          .required('Required'),
        last_Name: Yup.string()
          .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
          .required('Required'),
        password: Yup.string().required('Password is required'),
        confirmPass: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Passwords must match',
        ),
        number: Yup.number()
          .required('A phone number is required')
          .typeError("That doesn't look like a phone number")
          .integer("A phone number can't include a decimal point")
          .test('len', 'Number must be atleast 6', (val) => {
            if (val) return val.toString().length > 5;
          }),
      })}
      onSubmit={(values) => {
        updateProfile(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View>
          <View style={{marginTop: WP('25')}}>
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
              inputStyle={styles.inputStyle}
              value={values.email}
              placeholder="Email"
              errorMessage={errors.email && touched.email ? errors.email : null}
              onChangeText={handleChange('email')}
              errorStyle={styles.errorStyle}
            />
          </View>
          <View style={styles.nameField}>
            <Input
              containerStyle={[styles.inputContainer, {width: '45%'}]}
              inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
              inputStyle={styles.inputStyle}
              placeholder="First Name"
              value={values.first_Name}
              errorMessage={
                errors.first_Name && touched.first_Name
                  ? errors.first_Name
                  : null
              }
              onChangeText={handleChange('first_Name')}
              errorStyle={styles.errorStyle}
            />
            <Input
              containerStyle={[styles.inputContainer, {width: '45%'}]}
              inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
              inputStyle={styles.inputStyle}
              placeholder="Last Name"
              value={values.last_Name}
              errorMessage={
                errors.last_Name && touched.last_Name ? errors.last_Name : null
              }
              onChangeText={handleChange('last_Name')}
              errorStyle={styles.errorStyle}
            />
          </View>
          <View style={{paddingTop: WP('6')}}>
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
              inputStyle={styles.inputStyle}
              placeholder="Mobile Number"
              value={'' + values.number}
              errorMessage={
                errors.number && touched.number ? errors.number : null
              }
              errorStyle={styles.errorStyle}
              onChangeText={handleChange('number')}
              leftIcon={
                <MiIcons
                  name="plus"
                  color={Work.THEME.colors.primary}
                  size={WP('6')}
                />
              }
            />

            <View style={{paddingTop: WP('6')}}>
              <Input
                onChangeText={handleChange('password')}
                containerStyle={styles.inputContainer}
                secureTextEntry
                inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
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
                    source={require('../../../../assets/img/lock.png')}
                  />
                }
              />
            </View>

            <View style={{paddingTop: WP('6')}}>
              <Input
                onChangeText={handleChange('confirmPass')}
                containerStyle={styles.inputContainer}
                secureTextEntry
                inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
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
                    source={require('../../../../assets/img/lock.png')}
                  />
                }
              />
            </View>
          </View>
          <View style={{paddingTop: WP('0.1')}}>
            <BtnWrapper onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.forgotPassTxt}>Update</Text>
              </View>
            </BtnWrapper>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default React.memo(InputSec);

const styles = StyleSheet.create({
  inputSec: {
    alignSelf: 'center',
    width: '95%',
    marginTop: Work.WP('20'),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Work.THEME.colors.primary,
    width: WP('90'),
    height: 45,
    alignSelf: 'center',
  },
  inputStyle: {
    padding: WP('2'),
    fontSize: WP('4.2'),
    color: Work.THEME.colors.text,
  },
  inputBackground: {
    backgroundColor: '#E6E7E9',
    marginVertical: 2,
    borderColor: Work.THEME.colors.text,
    borderWidth: Work.WP('0.2'),
  },
  numContainer: {
    flexDirection: 'row',
    marginVertical: Work.WP('0.7'),
  },
  codeInput: {
    flex: 1.4,
    marginRight: Work.WP('1'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Work.THEME.colors.primary,
    width: WP('60'),
    height: 45,
    alignSelf: 'center',
  },
  submitBtn: {
    marginTop: WP('7'),
    borderWidth: 0,
    backgroundColor: Work.THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WP('90'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingTop: WP('6'),
  },
  img: {
    width: WP('30'),
    height: WP('30'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: WP('4'),
  },
  started: {
    fontSize: WP('6'),
    fontWeight: 'bold',
    paddingStart: WP('4'),
    paddingTop: WP('3'),
  },
  firstCreate: {
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
  },
  inputStyle: {
    padding: WP('2'),
    fontSize: WP('4.2'),
    color: Work.THEME.colors.text,
  },
  nameField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WP('90'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingTop: WP('6'),
  },
  errorStyle: {
    margin: -2,
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
