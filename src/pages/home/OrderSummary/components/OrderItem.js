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

import { useIsFocused } from '@react-navigation/native';

const OrderItem = ({ item }) => {
  //console.log(item,'--------- item in orderitem component ----------');

  const [totalItems, setTotalItems] = useState(item);
  const [addOns, setAddOns] = useState([]);
  const [dishSize, setDishSize] = useState();
  const isFocused = useIsFocused();
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();

//console.log(cart?.cartItems,' cart items ');

  let uniqueChars = [];
  const navigation = useNavigation();
  const editItem = () => {
    navigation.navigate('dishdetail', {
      dish: {
        id: item.item.item_id,
        edit: true,
        itemDetail: item,
      },
    });
  };
  const addOnsFind = () => {
    item?.item?.add_ons?.length > 0 &&
      item?.item?.add_ons.forEach((c) => {
        if (
          !uniqueChars.includes(
            item?.item?.completeDish?.dish_adons.find((i) => i.id === c),
          )
        ) {
          uniqueChars.push(
            item?.item?.completeDish?.dish_adons.find((i) => i.id === c),
          );
        }
      });

    setAddOns(uniqueChars);

  };
  const sizeFind = () => {
    const size = item?.item?.completeDish?.dish_sizes.find(
      (data) => data.id === item?.item?.size_id,
    );
    if (size !== undefined) {
      setDishSize(size.size);
    }
  };
  useEffect(() => {
    addOnsFind();
    sizeFind();
  }, [isFocused]);

  const deleteCartItem = () => {
    dispatch(Jobs.deleteCartItem(item.index));
    if (cart?.cartItems?.length == 1) {
      dispatch(Jobs.singleCoffeShop({}));
    }
  };

  const changeQuantity = (operation) => {
    operation
      ? dispatch(Jobs.changeCartItemQuantity(item.index, 'plus'))
      : dispatch(Jobs.changeCartItemQuantity(item.index, 'minus'));
  };

  return (
    <View
      style={addOns.length > 0 ? styles.container : styles.containerNoComment}>
      <View style={styles.quantity}>
        <View style={styles.quantityContent}>
          <Text style={styles.quantityContentTxt}>{item.item.quantity}x</Text>
        </View>
      </View>
      <View style={styles.itemName}>
      <View style={{ justifyContent: 'center',height:30, width:'100%',  }}>
        <Text
          style={{
            color: THEME.colors.black,
            fontSize: moderateScale(12),
            //marginTop: WP('10'),
            //marginBottom: WP('1'),
            fontWeight: 'bold',
            width:'100%',
            //borderWidth:2
          }}>
          {item.item.name.length > 18
            ? item.item.name.substring(0, 18) + '...'
            : item.item.name}
        </Text>
        </View>
        {dishSize !== undefined && (
          <Text
            style={{
              color: THEME.colors.black,
              fontSize: moderateScale(12),
              marginVertical: WP('0.1'),
              fontWeight: 'bold',
            }}>
            Size: {dishSize}
          </Text>
        )}
        {addOns.length > 0 && (
          <Text
            style={{
              color: THEME.colors.black,
              fontSize: moderateScale(12),

              fontWeight: 'bold',
            }}>
            AddOns:
          </Text>
        )}

        <View style={{ marginVertical: WP('0.5') }}>
          {addOns.map((data) => (
            <Text
              style={{
                color: THEME.colors.black,
                fontSize: moderateScale(11),
              }}>
              {data.ad_on}
            </Text>
          ))}
        </View>

        {item?.item?.comment?.length ? (
          <Text style={{ fontSize: scale(12), }}>
            {item?.item?.comment?.length > 15
              ? item?.item?.comment.substring(0, 15) + '...'
              : item?.item?.comment}
          </Text>
        ) : null}
        <View style={styles.changeQuantity}>
          <BtnWrapper onPress={() => changeQuantity(false)}>
            <View
              style={{
                backgroundColor: THEME.colors.primary,
                padding: WP('0.7'),
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
          <BtnWrapper onPress={() => changeQuantity(true)}>
            <View
              style={{
                backgroundColor: THEME.colors.primary,
                padding: WP('0.7'),
                borderRadius: 2,
              }}>
              <FontAwesome5 name="plus" size={WP('3.2')} color="black" />
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
          <BtnWrapper onPress={editItem}>
            <Entypo name="edit" size={WP('5')} color={THEME.colors.black} />
          </BtnWrapper>
        </View>
      </View>
    </View>
  );
};

export default React.memo(OrderItem);

const styles = StyleSheet.create({
  container: {
    //borderRadius:10,
   //borderWidth:0.4,
    flex:1,
    height: verticalScale(80),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerNoComment: {
    //borderRadius:10,
    //borderWidth:0.4,
    height: verticalScale(80),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  quantity: {
    flex: 0.7,
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
    // height: 70,
    //borderWidth:1
  },
  price: {
    flex: 0.8,
  },
  changeQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: WP('1'),
  },
});
