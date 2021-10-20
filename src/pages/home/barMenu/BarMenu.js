import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import imageAssets from '../../../assets/imageAssets';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SafeWrapper from '../../../shared/components/safeWrapper';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import * as Work from '../../../shared/exporter';
import Profile from './components/profileSec';
import MenuItem from './components/listItem';
import LogOutButton from './components/LogoutBtn';
import * as Jobs from '../../../store/actions/cart.action';
import {useDispatch} from 'react-redux';
import {THEME, WP} from '../../../shared/exporter';
import {saveUser} from '../../../store/actions/auth.action';

const BarMenu = ({ navigation }) => {


  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Jobs.clearCart());

    dispatch(Jobs.singleCoffeShop({}));
    dispatch(saveUser(null));
    navigation.navigate('deliveryaddress');
    //navigation.navigate('deliveryaddress');
  };



  return (
    <SafeWrapper>
      <View style={styles.container}>
        <View>
          <BottomShadow>
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
          <Profile />
          <MenuItem title={'Order History'} navigateTo="orderHistory" />
          <MenuItem title={'Saved Places'} navigateTo="selectlocation" />
          {/* <MenuItem title={'Saved Cards'} navigateTo="orderHistory" /> */}
        </View>
        {/* <LogOutButton /> */}
        <BtnWrapper onPress={()=>{
                      logout();

        }}>
      <View style={styles.logout}>
        <Text style={styles.Txt}>LogOut</Text>
      </View>
    </BtnWrapper>
      </View>
    </SafeWrapper>
  );
};

export default React.memo(BarMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'space-between',
  },
  header: {
    height: Work.HP('8'),
    justifyContent: 'center',
  },
  backArrow: {
    width: Work.WP('5'),
    height: Work.WP('5'),
    marginLeft: Work.WP('5'),
  },
  logout: {
    height: WP('12'),
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Txt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: WP('6'),
  },
});
