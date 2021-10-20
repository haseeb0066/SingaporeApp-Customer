import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BtnWrapper from './btnWrapper';
import * as Work from '../exporter';
import { useSelector } from 'react-redux';
import { THEME } from '../themes/colors';

const {
  WP,
  THEME: { colors },
} = Work;
const cartBtn = ({ navigation }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const cartData = useSelector((state) => state?.cart?.cartItems);
  const comboData = useSelector((state) => state?.cart?.comboItems);
console.log('combo data------>'+ comboData);

  useEffect(() => {
    let price = 0;
    cartData.forEach((element) => {
      price += element.totalPrice;
    });
    comboData.forEach((element) => {
      price += element.totalPrice;
    });
    setTotalAmount(price);
  }, [cartData]);
  return (
    <>
      {cartData?.length || comboData?.length ? (
        <BtnWrapper onPress={() => navigation.navigate('ordersummary')}>
          <View style={styles.cartBtn}>
            <Text style={[styles.cartBtnText, { padding: 5 }]}>View Cart</Text>
            <Text style={styles.cartBtnText}>
              {cartData.length + comboData?.length} Item
            </Text>
            <Text style={styles.cartBtnText}>$ {totalAmount.toFixed(2)}</Text>
          </View>
        </BtnWrapper>
      ) : null}
    </>
  );
};

export default React.memo(cartBtn);

const styles = StyleSheet.create({
  cartBtn: {
    position: 'absolute',
    bottom: 14,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    height: WP('11'),
    backgroundColor: Work.THEME.colors.primary,

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP('4'),
  },
  cartBtnText: {
    color: THEME.colors.black,
    fontWeight: 'bold',
    fontSize: WP('4'),
  },
});
