import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { THEME, WP } from '../../../../shared/exporter';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Jobs from '../../../../store/actions/cart.action';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import TextTicker from 'react-native-text-ticker';

const ComboItem = ({ item }) => {

 // console.log(item,'--------- item in comboitem component ----------');
  const cart = useSelector((state) => state?.cart);
  const [dishInCart, setDishInCart] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const deleteCartItem = () => {
    console.log(item.index);
    dispatch(Jobs.deleteComboItem(item.index));
    if (cart?.cartItems?.length == 1) {
      dispatch(Jobs.singleCoffeShop({}));
    }
  };

  const changeQuantity = (operation) => {
    operation
      ? dispatch(Jobs.changeComboCartItemQuantity(item.index, 'plus'))
      : dispatch(Jobs.changeComboCartItemQuantity(item.index, 'minus'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.quantity}>
        <View style={styles.quantityContent}>
          <Text style={styles.quantityContentTxt}>{item.item.quantity}x</Text>
        </View>
      </View>
      <View style={styles.itemName}>
        {/* <Text
          style={{
            color: THEME.colors.black,
            fontSize: moderateScale(12),
            marginTop: WP('15'),
          }}>
          {item.item.name}
        </Text> */}


    {/*  --------------------  bug code --------------------   */}
        {/* <View
          style={{
            marginVertical: WP('2.5'),
          }}>
          {item.item.detail.map((item) => (
            <Text style={styles.dishOrderData}>1x {item.dish?.title}</Text>
            //<Text style={styles.dishOrderData}>1x {item.item.name}</Text>
          ))}
        </View> */}

    {/*  --------------------  bug code --------------------   */}


      {/*  --------------------  bug fixed --------------------   */}
          <View
          style={{
            marginVertical: WP('.5'),
          }}>

            <Text  style={{
            color: THEME.colors.black,
            fontSize: moderateScale(12),
            marginTop: WP('5'),
            marginBottom: WP('1'),
            fontWeight: 'bold',
          }}>1x {item.item.name}</Text>
        </View>

        {/* <View
          style={{
            marginVertical: WP('2.5'),
          }}>
          {item.item.detail.map((item) => (
            //<Text style={styles.dishOrderData}>1x {item.dish?.title}</Text>
            <Text style={styles.dishOrderData}>1x {item.item.name}</Text>
          ))}
        </View>  */}
      {/*  --------------------  bug fixed --------------------   */}

        <View style={styles.changeQuantity}>
          <BtnWrapper onPress={() => changeQuantity(false)}>
            <View
              style={{
                backgroundColor: THEME.colors.primary,
                padding: WP('0.8'),
                borderRadius: 2,
              }}>
              <FontAwesome5 name="minus" size={WP('3.2')} color="black" />
            </View>
          </BtnWrapper>
          <Text
            style={{
              color: '#000000',
              marginHorizontal: WP('2.5'),
              fontSize: moderateScale(12),
            }}>
            {item.item.quantity}
          </Text>
          <BtnWrapper
            onPress={() => {
              changeQuantity(true);
            }}>
            <View
              style={{
                backgroundColor: THEME.colors.primary,
                padding: WP('0.7'),
                borderRadius: 2,
              }}>
              <FontAwesome5 name="plus" size={WP('3.4')} color="black" />
            </View>
          </BtnWrapper>
        </View>
      </View>
      <View style={styles.price}>
        <Text
          style={{
            textAlign: 'right',
            color: 'black',
            fontWeight: 'bold',
            marginRight: scale(2.4),
          }}>
          $ {item.item.totalPrice.toFixed(2)}
        </Text>
      </View>
      <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginLeft: scale(2),
          }}>
          <BtnWrapper onPress={deleteCartItem}>
            <View style={{ marginLeft: scale(2) }}>
              <AntDesign
                name="delete"
                size={WP('5')}
                color={THEME.colors.black}
              />
            </View>
          </BtnWrapper>
        </View>
      </View>
    </View>
  );
};

export default ComboItem;

const styles = StyleSheet.create({
  container: {
    //borderRadius:10,
    height: verticalScale(80),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth:0.4,
  },
  quantity: {
    flex: 0.7,
    //borderWidth:1,
  },
  quantityContent: {
    width: WP('7.5'),
    height: WP('9'),
    borderRadius: 4,
    backgroundColor: '#E6E7E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContentTxt: {
    color: THEME.colors.black,
    fontSize: moderateScale(12),
  },
  itemName: {
    // flex: 2,
    width:'50%',
    //borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    flex: 0.8,
  },
  changeQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
     marginTop: WP('2'),
     //borderWidth:1,
  },
  dishOrderData: {
    fontSize: WP('3.2'),
  },
});
