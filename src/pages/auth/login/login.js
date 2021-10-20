import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Header from '../../../shared/components/header';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import {Input} from 'react-native-elements';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Loader from '../../../shared/components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import * as Jobs from '../../../store/actions/auth.action';
import BtnWrapper from '../../../shared/components/btnWrapper';
const {WP} = Work;

const Login = ({navigation, route}) => {
  const dispatch = useDispatch();

  let email = route.params.email;
  const loader = useSelector((state) => state?.auth?.userLoader);

  const signup = async ({email, firstName, lastName, password, route}) => {
    dispatch(
      Jobs.signUp(
        {
          first_name: firstName,
          last_name: lastName,
          role: 'Customer',
          email,
          password,
          type: 'Customer',
        },
        navigation,
      ),
    );
    // navigation.navigate('phoneverification');
  };

  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
        <Loader visible={loader} />
        <Formik
          initialValues={{
            email: email,
            firstName: '',
            lastName: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid Email').required('Required'),
            firstName: Yup.string()
              .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
              .required('Required'),
            lastName: Yup.string()
              .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
              .required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={(values) => {
            signup(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View>
              <Header
                onPressBack={() => navigation.goBack()}
                // onPressNext={handleSubmit}
                onPressNext={() => console.log('next press')}
                show={true}
              />
              <Image
                style={styles.img}
                source={require('../../../assets/img/signup.png')}
              />
              <Text style={styles.started}>Let's get you started!</Text>
              <Text style={styles.firstCreate}>
                First, create your Buey Tahan account
              </Text>

              <View>
                <View style={{paddingTop: WP('8')}}>
                  <Input
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                    inputStyle={styles.inputStyle}
                    value={values.email}
                    placeholder="Email"
                    errorMessage={
                      errors.email && touched.email ? errors.email : null
                    }
                    onChangeText={handleChange('email')}
                    errorStyle={styles.errorStyle}
                    rightIcon={
                      <Image
                        style={{
                          resizeMode: 'contain',
                          width: WP('6'),
                          height: WP('6'),
                        }}
                        source={require('../../../assets/img/cross.png')}
                      />
                    }
                  />
                </View>
                <View style={styles.nameField}>
                  <Input
                    containerStyle={[styles.inputContainer, {width: '45%'}]}
                    inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                    inputStyle={styles.inputStyle}
                    placeholder="First Name"
                    value={values.firstName}
                    errorMessage={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : null
                    }
                    onChangeText={handleChange('firstName')}
                    errorStyle={styles.errorStyle}
                  />
                  <Input
                    containerStyle={[styles.inputContainer, {width: '45%'}]}
                    inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                    inputStyle={styles.inputStyle}
                    placeholder="Last Name"
                    value={values.lastName}
                    errorMessage={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : null
                    }
                    onChangeText={handleChange('lastName')}
                    errorStyle={styles.errorStyle}
                  />
                </View>
                <View style={{paddingTop: WP('6')}}>
                  <Input
                    containerStyle={styles.inputContainer}
                    secureTextEntry
                    inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                    inputStyle={styles.inputStyle}
                    placeholder="Password"
                    value={values.password}
                    errorMessage={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                    errorStyle={styles.errorStyle}
                    onChangeText={handleChange('password')}
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
                </View>
                <View style={{paddingTop: WP('0.1')}}>
                  <BtnWrapper onPress={handleSubmit}>
                    <View style={styles.btn}>
                      <Text style={styles.forgotPassTxt}>Sign Up</Text>
                    </View>
                  </BtnWrapper>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
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
