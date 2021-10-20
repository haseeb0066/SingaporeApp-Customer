import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import imageAssets from '../../../assets/imageAssets';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SafeWrapper from '../../../shared/components/safeWrapper';
import Loader from '../../../shared/components/Loader';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import InputSec from './components/InputSec';
import * as Work from '../../../shared/exporter';
import SocialLinkedAccounts from './components/socialLinkedAccounts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {verticalScale, scale} from 'react-native-size-matters';

const EditProfile = ({navigation}) => {
  const store = useSelector((state) => state?.auth);
  const [loader, setLoader] = useState(false);

  const {
    first_name,
    last_name,
    email,
    phone,
    id,
  } = store?.user?.successData?.user;

  useEffect(() => {
    console.log('Edit', store?.user);
  }, []);
  return (
    <SafeWrapper>
      <Loader visible={loader} />
      <KeyboardAwareScrollView>
        <BottomShadow style={{width: '95%', alignSelf: 'center'}}>
          <View style={styles.header}>
            <BtnWrapper onPress={() => navigation.goBack()}>
              <Image
                source={imageAssets.backArrow}
                resizeMode="contain"
                style={styles.backArrow}
              />
            </BtnWrapper>
          </View>
        </BottomShadow>
        <View style={{marginBottom: verticalScale(5)}}>
          <Image
            source={imageAssets.profileBackground}
            resizeMode="cover"
            style={{}}
          />
          <View style={styles.profileSec}>
            <View style={styles.profileImg}>
              <View style={{marginBottom: Work.WP('-2')}}>
                <Ionicons
                  name="person"
                  size={Work.WP('18')}
                  color={Work.THEME.colors.primary}
                />
              </View>
            </View>
            <View>
              <Text style={styles.name}>
                {first_name.toUpperCase() + ' ' + last_name.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <InputSec
          userId={id}
          firstName={first_name.toUpperCase()}
          lastName={last_name.toUpperCase()}
          email={email}
          mobile={phone}
          load={(text) => setLoader(text)}
          navigation={navigation}
        />
        {/* <BottomShadow
          style={{width: '95%', alignSelf: 'center', marginTop: Work.WP('2')}}>
          <View style={{marginLeft: '5%'}}>
            <View style={styles.profilesTxtView}>
              <Text style={styles.profilesTxt}>Profiles</Text>
            </View>
            <View style={styles.addBusiness}>
              <Text style={styles.addBusinessTxt}>Add a Business Profile</Text>
              <Text>Better manage your ride expenses</Text>
            </View>
          </View>
        </BottomShadow> */}
        {/* <SocialLinkedAccounts /> */}
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  header: {
    height: Work.HP('8'),
    justifyContent: 'center',
  },
  backArrow: {
    width: Work.WP('5'),
    height: Work.WP('5'),
    marginLeft: Work.WP('5'),
  },
  profileImg: {
    width: Work.WP('20'),
    height: Work.WP('20'),
    borderRadius: Work.WP('10'),
    borderWidth: Work.WP('0.5'),
    borderColor: Work.THEME.colors.text,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Work.THEME.colors.white,
  },
  profileSec: {
    position: 'absolute',
    alignSelf: 'center',
    top: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
    fontSize: scale(23),
    marginTop: 5,
  },
  profilesTxtView: {
    marginBottom: Work.WP('5'),
  },
  profilesTxt: {
    fontWeight: 'bold',
    fontSize: Work.WP('7'),
    color: 'black',
  },
  addBusiness: {
    marginBottom: Work.WP('4'),
  },
  addBusinessTxt: {
    fontSize: Work.WP('6'),
    color: '#00AEEF',
  },
});
