import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Header from '../../../shared/components/header';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import {Input} from 'react-native-elements';
import BtnWrapper from '../../../shared/components/btnWrapper';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import * as Jobs from '../../../store/actions/auth.action';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../shared/components/Loader';

const {WP} = Work;
const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state?.auth.userLoader);
  const user = useSelector((state) => state?.auth.user);
  const store = useSelector((state) => state?.auth);
  let email = route.params.email;

  const login = async ({email, password}) => {
    dispatch(
      Jobs.login(
        {
          email,
          password,
          type: 'Customer',
        },
        navigation,
      ),
    );
  };

 

  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
        <Loader visible={loader} />
        <Header
          onPressBack={() => navigation.goBack()}
          onPressNext={() => navigation.navigate('phoneverification')}
          show={true}
        />
        <Image
          style={styles.img}
          source={require('../../../assets/img/signup.png')}
        />
        <Text style={styles.started}>Login!</Text>
        <Text style={[styles.started, {fontSize: WP('5')}]}>
          Great you are already registered!
        </Text>
        <Formik
          initialValues={{email: email, password: ''}}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid Email').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={(values) => {
            login(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            touched,
            errors,
          }) => (
            <View>
              <View style={{paddingTop: WP('8')}}>
                <Input
                  onChangeText={handleChange('email')}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                  inputStyle={styles.inputStyle}
                  value={values.email}
                  placeholder="Email"
                  errorMessage={
                    errors.email && touched.email ? errors.email : null
                  }
                  rightIcon={
                    <BtnWrapper onPress={() => setFieldValue('email', '')}>
                      <Image
                        style={{
                          resizeMode: 'contain',
                          width: WP('6'),
                          height: WP('6'),
                        }}
                        source={require('../../../assets/img/cross.png')}
                      />
                    </BtnWrapper>
                  }
                />
              </View>
              <View style={{paddingTop: WP('6')}}>
                <Input
                  onChangeText={handleChange('password')}
                  containerStyle={styles.inputContainer}
                  secureTextEntry
                  inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                  inputStyle={styles.inputStyle}
                  value={values.password}
                  placeholder="Password"
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
              </View>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <BtnWrapper
                  onPress={() =>
                    navigation.navigate('phoneverification', {
                      forgot: true,
                      user: user,
                    })
                  }>
                  <Text style={styles.forgetpasstxt}>Forgot Password?</Text>
                </BtnWrapper>
              </View>
              <BtnWrapper onPress={handleSubmit
               
               }>
                <View style={styles.btn}>
                  <Text style={styles.forgotPassTxt}>Login</Text>
                </View>
              </BtnWrapper>
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
  forgetpasstxt: {
    textAlign: 'right',
    // color: '#4BC5F3',
    color: Work.THEME.colors.primary,
    fontSize: WP('4'),
    paddingRight: WP('1'),
    marginTop: WP('1.5'),
  },
});
