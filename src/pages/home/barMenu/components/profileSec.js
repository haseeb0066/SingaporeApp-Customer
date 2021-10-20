import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Work from '../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import BtnWrapper from '../../../../shared/components/btnWrapper';

const profileSec = () => {
  const navigation = useNavigation();
  const store = useSelector((state) => state?.auth);
  useEffect(() => {
    console.log('user', store.user);
  }, []);
  return (
    <View style={styles.profile}>
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
          {store?.user?.successData?.user?.first_name}{' '}
          {store?.user?.successData?.user?.last_name}
        </Text>
        <BtnWrapper onPress={() => navigation.navigate('myprofile')}>
          <View style={styles.editProfileBtn}>
            <Text style={{color: Work.THEME.colors.text}}>Edit Profile</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={Work.WP('3.6')}
              color={Work.THEME.colors.text}
            />
          </View>
        </BtnWrapper>
      </View>
    </View>
  );
};

export default React.memo(profileSec);

const styles = StyleSheet.create({
  profile: {
    alignSelf: 'center',
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Work.WP('2.5'),
    marginBottom: Work.WP('9'),
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
    marginRight: Work.WP('4.5'),
  },
  name: {
    fontSize: Work.WP('7'),
    fontWeight: 'bold',
    color: 'black',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
