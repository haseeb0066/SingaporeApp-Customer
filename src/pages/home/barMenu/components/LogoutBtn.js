import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import {THEME, WP} from '../../../../shared/exporter';
import {saveUser} from '../../../../store/actions/auth.action';
import * as Jobs from '../../../../store/actions/cart.action';
import {useDispatch} from 'react-redux';

const LogoutBtn = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Jobs.clearCart());

    dispatch(Jobs.singleCoffeShop({}));
    dispatch(saveUser(null));
    //navigation.navigate('deliveryaddress');
    navigation.navigate("deliveryaddress");
  };
  return (
    <BtnWrapper onPress={()=>{
logout();

    }}>
      <View style={styles.logout}>
        <Text style={styles.Txt}>LogOut</Text>
      </View>
    </BtnWrapper>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
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
