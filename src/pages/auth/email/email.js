import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Keyboard} from 'react-native';
import Header from '../../../shared/components/header';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import {Input} from 'react-native-elements';
import axios from 'axios';
import {FastField, Formik} from 'formik';
import * as Yup from 'yup';

import Loader from '../../../shared/components/Loader';
import BtnWrapper from '../../../shared/components/btnWrapper';

const {WP} = Work;
const Email = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const submit = async ({email}) => {
    console.log(axios.defaults.baseURL);
    Keyboard.dismiss();
    try {
      setLoader(true);
      const response = await axios.post('/check_email', {
        email,
      });
      if (response?.data.status == 'success') {
        navigation.navigate('login', {email});
        setLoader(false);
      } else if (response?.data.status == 'error') {
        setLoader(false);
        navigation.navigate('onlyLogin', {email});
      }
      setLoader(false);
    } catch (errorMessage) {
      console.log('---->', errorMessage);
    }
  };

  return (
    <SafeWrapper>
      <Loader visible={loader} closeLoader={() => setLoader(false)} />
      <Formik
        initialValues={{email: ''}}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid Email').required('Required'),
        })}
        onSubmit={(values) => {
          submit(values);
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
              onPressNext={() => console.log('hi')}
              show={true}
            />
            <Image
              style={styles.img}
              source={require('../../../assets/img/email.png')}
            />
            <Text style={styles.email}>What's your Email?</Text>
            <Text style={styles.checkacc}>
              We'll check if you have an account
            </Text>
            <View style={{paddingTop: WP('8')}}>
              <Input
                containerStyle={styles.inputContainer}
                inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                inputStyle={styles.inputStyle}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                errorMessage={
                  errors.email && touched.email ? errors.email : null
                }
              />
            </View>
            <BtnWrapper onPress={() => handleSubmit()}>
              <View style={[styles.inputContainer, styles.submitBtn]}>
                <Text style={{color: 'black', fontSize: WP('5.5')}}>
                  Submit
                </Text>
              </View>
            </BtnWrapper>
          </View>
        )}
      </Formik>
    </SafeWrapper>
  );
};

export default Email;

const styles = StyleSheet.create({
  img: {
    width: WP('25'),
    height: WP('25'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: WP('4'),
  },
  email: {
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
    width: WP('90'),
    height: 45,
    alignSelf: 'center',
  },
  inputStyle: {
    padding: WP('2'),
    fontSize: WP('4.2'),
    color: Work.THEME.colors.text,
  },
  submitBtn: {
    marginTop: WP('7'),
    borderWidth: 0,
    backgroundColor: Work.THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
