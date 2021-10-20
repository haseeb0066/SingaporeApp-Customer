import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../shared/components/secHeader';
import SafeWrapper from '../../../shared/components/safeWrapper';
import {THEME, WP} from '../../../shared/exporter';
import Input from './components/input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import BtnWrapper from '../../../shared/components/btnWrapper';
import imageAssets from '../../../assets/imageAssets';
import {saveUser} from '../../../store/actions/auth.action';
import * as Jobs from '../../../store/actions/cart.action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const myProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Jobs.clearCart());
    dispatch(saveUser(null));
    //navigation.navigate('Deliveryaddress');
  };
  return (
    <SafeWrapper>
      <KeyboardAwareScrollView>
        <Header
          backIcon={
            <BtnWrapper onPress={() => navigation.goBack()}>
              <Image
                source={imageAssets.backwhite}
                style={{width: WP('6'), height: WP('6')}}
              />
            </BtnWrapper>
          }
          title="My Profile"
          rightIcon={
            <BtnWrapper onPress={logout}>
              {/* <MaterialCommunityIcons
                name="logout"
                size={WP('7')}
                color="white"
              />
              <Image
                source={imageAssets.headerRightIcon}
                style={{width: WP('6'), height: WP('6')}}
              /> */}
            </BtnWrapper>
          }
        />
        <View style={styles.container}>
          <Text style={styles.heading}>Personal Detail</Text>
          <Input placeHolder="Email" onChange={(t) => console.log(t)} />
          <Input placeHolder="First Name" onChange={(t) => console.log(t)} />
          <Input placeHolder="Last Name" onChange={(t) => console.log(t)} />
          <Input placeHolder="Moblie Number" onChange={(t) => console.log(t)} />
          <BtnWrapper>
            <View style={styles.saveBtn}>
              <Text style={styles.saveBtnTxt}>Save</Text>
            </View>
          </BtnWrapper>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>change password</Text>
          <Input
            placeHolder="Current Password"
            onChange={(t) => console.log(t)}
            password={true}
          />
          <Input
            placeHolder="New Password"
            onChange={(t) => console.log(t)}
            password={true}
          />
          <BtnWrapper>
            <View style={styles.saveBtn}>
              <Text style={styles.saveBtnTxt}>Save</Text>
            </View>
          </BtnWrapper>
        </View>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default myProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: WP('4'),
  },
  heading: {
    color: THEME.colors.black,
    fontSize: WP('5'),
    textTransform: 'capitalize',
  },
  saveBtn: {
    width: WP('20'),
    height: WP('10'),
    backgroundColor: THEME.colors.primary,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: WP('3'),
  },
  saveBtnTxt: {
    color: THEME.colors.black,
    fontSize: WP('5'),
  },
});
