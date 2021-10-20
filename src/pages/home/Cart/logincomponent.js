import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {color} from 'react-native-reanimated';
import * as Work from '../../../shared/exporter';
import BtnWrapper from '../../../shared/components/btnWrapper';
import {Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const {WP} = Work;

const LoginComponent = ({onPress, name}) => {
  return (
    <View style={[styles.contaier]}>
      <Text style={[styles.itemtext]}>Sign up or log in</Text>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <BtnWrapper>
          <View style={[styles.facebook]}>
            <Entypo
              style={styles.alignvertical}
              name="facebook"
              size={WP('8')}
              color={Work.THEME.colors.white}
            />
            <Text style={[styles.itemtextfacebook]}>
              Continue with Facebook
            </Text>
          </View>
        </BtnWrapper>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: WP('6'),
          }}>
          <View style={[styles.borderset]} />
          <View>
            <Text style={[styles.ortext]}>or</Text>
          </View>
          <View style={[styles.borderset]} />
        </View>
        <BtnWrapper>
          <View style={[styles.emailbtn]}>
            <Text style={[styles.emailbtntext]}>Continue with Email</Text>
          </View>
        </BtnWrapper>
        <View>
          <Text style={[styles.textsignin]}>
            By signing up you agree to our{' '}
            <Text style={[styles.textbold]}>Terms & Conditions</Text> and{' '}
            <Text style={[styles.textbold]}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
export default LoginComponent;
const styles = StyleSheet.create({
  itemtextfacebook: {
    fontSize: WP('5'),
    color: Work.THEME.colors.white,
    fontWeight: 'bold',
    marginLeft: WP('3'),
  },
  facebook: {
    marginBottom: WP('6'),
    backgroundColor: '#395693',
    paddingBottom: WP('2'),
    paddingTop: WP('2'),
    paddingLeft: WP('3'),
    paddingRight: WP('3'),
    width: WP('85'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contaier: {
    paddingRight: WP('4'),
    paddingLeft: WP('4'),
    backgroundColor: Work.THEME.colors.white,
    elevation: 20,
    borderRadius: WP('2'),
  },

  itemtext: {
    fontSize: WP('8'),
    marginTop: WP('6'),
    marginBottom: WP('6'),
    textAlign: 'justify',
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
  },
  ortext: {
    width: WP('15'),
    textAlign: 'center',
    fontSize: WP('4'),
    color: Work.THEME.colors.grey,
    fontWeight: 'bold',
  },
  borderset: {
    width: '38%',
    height: 1,
    borderBottomColor: Work.THEME.colors.grey,
    borderBottomWidth: 2,
  },
  emailbtntext: {
    textTransform: 'uppercase',
    fontSize: WP('5'),
    color: Work.THEME.colors.primary,
    fontWeight: 'bold',
    marginLeft: WP('3'),
  },
  emailbtn: {
    marginBottom: WP('6'),
    backgroundColor: Work.THEME.colors.white,
    borderColor: Work.THEME.colors.primary,
    borderWidth: 2,
    paddingBottom: WP('2'),
    paddingTop: WP('2'),
    paddingLeft: WP('3'),
    paddingRight: WP('3'),
    width: WP('85'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textsignin: {
    fontSize: WP('2.5'),
    marginBottom: WP('6'),
    color: Work.THEME.colors.grey,
  },
  textbold: {
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
  },
});
