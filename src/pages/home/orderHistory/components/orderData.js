import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {THEME, WP} from '../../../../shared/exporter';
import {scale} from 'react-native-size-matters';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Jobs from '../../../../store/actions/cart.action';

const orderData = ({item}) => {
  const navigation = useNavigation();
  const store = useSelector((state) => state?.cart);
  const dispatch = useDispatch();

  const addItem = () => {
    item.item.items.map((data) => {
      const CartItem = {
        item_id: data.dish_id,
        size_id: data.size_id,
        size_index: data.size_id,
        add_ons: data.add_ons,
        quantity: data.quantity,
        name: data.dish.title,
        totalPrice: data.price,
        singleDishPrice: data.dish.price,
        comment: data?.comment != ' ' ? data.comment : 'no intructions',
        completeDish: data,
      };
      dispatch(Jobs.addItemToCart(CartItem));
      navigation.navigate('ordersummary');
    });
  };

  let dishes = item.item.items.slice(0, 3);
  useEffect(() => {
    console.log('item', item.item.status);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{flex: 0.73}}>
        {/* <Text style={styles.dishName}>{item.item.dishName}</Text> */}
        <Text style={[styles.dishOrderData, {fontWeight: '700'}]}>
          Delivered by {item?.item?.stall?.name}
        </Text>
        <Text style={styles.dishOrderData}>
          {moment(item.item.updated_at).format('MM-DD-YYYY')}
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: WP('60')}}>
          {dishes.map((item) => (
            <Text style={styles.dishOrderData}>
              {item.quantity}x {item.dish?.title}
            </Text>
          ))}
        </View>
        <Text style={styles.dishOrderData}>Status</Text>
      </View>
      <View style={{flex: 0.27}}>
        <Text style={styles.price}>$ {item.item.total_amount}</Text>
        <BtnWrapper onPress={addItem}>
          <View style={styles.reorder}>
            <Text style={styles.reorderTxt}>REORDER</Text>
          </View>
        </BtnWrapper>
        <View style={{top: scale(4.5)}}>
          {item.item.status == 'waiting_for_approvel' ? (
            <Text style={[styles.status, {textTransform: 'capitalize'}]}>
              Waiting for Approval
            </Text>
          ) : item.item.status !== 'delivered' &&
            item.item.status !== 'cancelled' ? (
            <BtnWrapper
              onPress={() =>
                navigation.navigate('trackorder', {order_id: item.item.id})
              }>
              <View
                style={[styles.reorder, {backgroundColor: THEME.colors.white}]}>
                <Text
                  style={[styles.reorderTxt, {color: THEME.colors.primary}]}>
                  Track Order
                </Text>
              </View>
            </BtnWrapper>
          ) : (
            <Text style={[styles.status, {textTransform: 'capitalize'}]}>
              {item.item.status}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(orderData);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: WP('2.5'),
    flex: 1,
  },
  reorder: {
    marginTop: WP('0.8'),
    padding: 2,
    borderRadius: 5,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
  },
  reorderTxt: {
    padding: 1,
    paddingVertical: 0,
    fontSize: WP('3.8'),
    color: THEME.colors.white,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: WP('3.8'),
  },
  dishOrderData: {
    fontSize: WP('3.7'),
  },
  price: {
    textAlign: 'right',
    fontSize: WP('3.8'),
    fontWeight: 'bold',
  },
  status: {
    textAlign: 'right',
    fontSize: WP('3.8'),
    fontWeight: 'bold',
  },
});
