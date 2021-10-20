import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Micon from 'react-native-vector-icons/MaterialIcons';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { SliderBox } from 'react-native-image-slider-box';
import { ScrollView } from 'react-native';
import { THEME, WP } from '../../../../shared/exporter';
import Modal from 'react-native-modal';
import * as Work from '../../../../shared/exporter';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Jobs from '../../../../store/actions/cart.action';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const comboDetail = ({
  isVisible,
  setVisible,
  comboTitle,
  comboPrice,
  img,
  dish,
  comboID,
  dishInCart,
  comboStallID,
  //restID,

}) => {
  const [dishTotalPrice, setDishTotalPrice] = useState(comboPrice);
  const [dishQuantity, setDishQuantity] = useState(1);

  const store = useSelector((state) => state?.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AddtoCart = async () => {
    setVisible(false);
    addItem();
  };

  // console.log("Image is ---->>> " + img);
  // console.log("comboTitle ---->>> " + comboTitle);
  // console.log("comboPrice ---->>> " + comboPrice);
  // console.log("dish ---->>> " + dish);
  // console.log("comboID ---->>> " + comboID);
  // console.log("dishInCart ---->>> " + dishInCart);
  // console.log("comboStallID ---->>> " + comboStallID);




  const addItem = () => {
    const ComboItem = {
      combo_id: comboID,
      quantity: dishQuantity,
      name: comboTitle,
      detail: img,
      totalPrice: parseInt(dishTotalPrice),
      singleDishPrice: parseInt(comboPrice),
      comboStall_id: comboStallID,
      //restID: restID
      
    };

    dispatch(Jobs.addComboToCart(ComboItem));
    navigation.navigate('ordersummary');
  };

  useEffect(() => {
    let totalPrice = 0;
    if (dishTotalPrice !== undefined) {
      totalPrice = comboPrice;
    }
    if (dishQuantity > 1) {
      totalPrice *= dishQuantity;
    }
    setDishTotalPrice(totalPrice);
  }, [dishQuantity, dishInCart]);
  return (
    <Modal isVisible={isVisible}>
      <View
        style={{
          flex: 0.9,
          backgroundColor: THEME.colors.white,
          borderWidth: 1.5,
          borderRadius: 10,
          borderColor: THEME.colors.primary,
        }}>
        <View
          style={{
            backgroundColor: THEME.colors.primary,
            width: WP('6'),
            height: WP('6'),
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            margin: WP('1'),
          }}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Micon name="close" size={WP('5.5')} color={THEME.colors.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: WP('3.5'),
          }}>
          <Text style={styles.label}>{comboTitle}</Text>
          <Text style={styles.label}>$ {parseInt(comboPrice).toFixed(2)}</Text>
        </View>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: 'center' }}>
          {/* <Image style={styles.img} source={require('../../../../assets/img/01.png')} /> */}
          <Image style={styles.img} source={{ uri: img }} />
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          {dish.map((data) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <Text style={[styles.quant,]}>1x</Text>
              <Text style={[styles.title,]}>{data.dish.title}</Text>
              <Text style={[styles.price]}>$ {parseInt(data.dish.price).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.quantity}>
            <BtnWrapper
              onPress={() => {
                if (dishQuantity > 1) {
                  setDishQuantity((prev) => prev - 1);
                }
              }}>
              <FontAwesome5 name="minus" size={WP('5')} color="#0D441E" />
            </BtnWrapper>
            <Text style={styles.quantityNum}>{dishQuantity}</Text>
            <BtnWrapper
              onPress={() => {
                setDishQuantity((prev) => prev + 1);
              }}>
              <FontAwesome5 name="plus" size={WP('5')} color="#0D441E" />
            </BtnWrapper>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <BtnWrapper
             onPress={AddtoCart}
             >
              <View style={styles.addToCartBtn}>
                <Text style={[styles.addToCartBtnTxt, { opacity: 0 }]}>
                  $ 10.00
                </Text>
                <Text style={styles.addToCartBtnTxt}>
                  {!dishInCart ? 'Add To Cart' : 'Add Another'}
                </Text>
                <Text style={styles.addToCartBtnTxt}>$ {parseInt(dishTotalPrice).toFixed(2)}</Text>
              </View>
            </BtnWrapper>
          </View>
        </ScrollView>
      </View>
    </Modal >
  );
};

export default React.memo(comboDetail);

const styles = StyleSheet.create({
  label: {
    fontSize: WP('5.2'),
    fontWeight: 'bold',
    color: THEME.colors.black,
  },
  title: {
    flex: 0.8,
    fontSize: WP('4.5'),
    fontWeight: '700',
    color: THEME.colors.grey,
    marginHorizontal: WP('3.5'),
  },
  quant: {
    flex: 0.15,
    fontSize: WP('4.5'),
    fontWeight: '700',
    color: THEME.colors.primary,
    marginHorizontal: WP('3.5'),
  },
  price: {
    fontSize: WP('4.5'),
    fontWeight: '600',
    color: THEME.colors.grey,
    marginHorizontal: WP('3.5'),
  },
  des: {
    fontSize: WP('3'),
    color: THEME.colors.grey,
  },
  img: {
    width: WP('38'),
    height: WP('35'),
    marginHorizontal: WP('1'),
  },
  quantity: {
    marginTop: WP('7'),
    width: '40%',
    height: WP('10'),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  quantityImage: {
    width: WP('5'),
    height: WP('5'),
  },
  quantityNum: {
    fontSize: WP('7'),
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
  },
  addToCartBtn: {
    width: '90%',
    alignSelf: 'center',
    height: WP('12'),
    marginTop: WP('6'),
    marginBottom: WP('3'),

    backgroundColor: Work.THEME.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP('2'),
  },
  addToCartBtnTxt: {
    fontWeight: 'bold',
    fontSize: WP('5'),
    color: Work.THEME.colors.black,
  },
});
