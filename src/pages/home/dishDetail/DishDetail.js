import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SafeWrapper from '../../../shared/components/safeWrapper';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SecondHeader from '../../../shared/components/secondheader';
import imageAssets from '../../../assets/imageAssets';
import * as Work from '../../../shared/exporter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import ComboCard from '../restaurantStall/components/comboCard';
import Sizes from './components/addOns';
import AddOns from './components/ad_on';
import Loader from '../../../shared/components/Loader';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/cart.action';
import { scale } from 'react-native-size-matters';

const {
  WP,
  THEME: { colors },
} = Work;

const DishDetail = ({ navigation, route }) => {
  const store = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const [dishInCart, setDishInCart] = useState(false);
  const [dish, setDish] = useState('');
  const [sizeSelected, setSizeSelected] = useState(0);
  const [loader, setloader] = useState(false);
  const [dishQuantity, setDishQuantity] = useState(1);
  const [addons, setAddons] = useState([]);
  const [singleDishPrice, setSingleDishPrice] = useState(0);
  const [dishTotalPrice, setDishTotalPrice] = useState(0);
  const [comment, setComment] = useState('');
  const [comboStalls, setComboStalls] = useState();
  const user = useSelector((state) => state?.auth?.user);

  console.log(route.params.dish.id,'-------- ID ------');

  const getDishDetail = () => {
    if (store.cartItems.length) {
      checkItemInCart();
    } else {
      fetchDishDetail();
    }
  };

  // const fetchDishDetail = async () => {
  //   try {
  //     const checkInternet = await Work.checkInternetConnection();
  //     if (checkInternet) {
  //       setloader(true);

  //       const response = await Axios.get(
  //         `product_detail/${route.params.dish.id}`,
  //       );

  //       if (response?.data.status == 'success') {
  //         setloader(false);
  //         setDish(response?.data?.successData?.product);
  //         setComboStalls(response?.data?.successData?.deals);
  //         setDishInCart(false);
  //         setComment('');
  //         setDishTotalPrice(0);
  //         setAddons([]);
  //         setDishQuantity(1);
  //         response?.data?.successData?.product?.dish_sizes?.length
  //           ? setSizeSelected(0)
  //           : null;
  //       } else {
  //         setloader(false);
  //         Work.showToast(Work.GENERAL_ERROR_MSG);
  //       }
  //     } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  //   } catch (error) {
  //     setloader(false);
  //     Work.showToast(Work.GENERAL_ERROR_MSG);
  //   }
  // };

// ---------  add  -----------

const fetchDishDetail = async () => {
  try {
    const checkInternet = await Work.checkInternetConnection();
    if (checkInternet) {
      setloader(true);


if(user)
{
  const response = await Axios.get(
    `product_detail/${route.params.dish.id}`,
  );

  if (response?.data.status == 'success') {
    setloader(false);
    setDish(response?.data?.successData?.product);
    setComboStalls(response?.data?.successData?.deals);
    setDishInCart(false);
    setComment('');
    setDishTotalPrice(0);
    setAddons([]);
    setDishQuantity(1);
    response?.data?.successData?.product?.dish_sizes?.length
      ? setSizeSelected(0)
      : null;
  } else {
    setloader(false);
    Work.showToast(Work.GENERAL_ERROR_MSG);
  }
}
else
{
  const response = await Axios.get(
    `https://buey.shifuge.com/api/product_detail_unsession/${route.params.dish.id}`,
  );

  if (response?.data.status == 'success') {
    setloader(false);
    setDish(response?.data?.successData?.product);
    setComboStalls(response?.data?.successData?.deals);
    setDishInCart(false);
    setComment('');
    setDishTotalPrice(0);
    setAddons([]);
    setDishQuantity(1);
    response?.data?.successData?.product?.dish_sizes?.length
      ? setSizeSelected(0)
      : null;
  } else {
    setloader(false);
    Work.showToast(Work.GENERAL_ERROR_MSG);
  }

}

      
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  } catch (error) {
    setloader(false);
    Work.showToast(Work.GENERAL_ERROR_MSG);
  }
};




console.log(dish,'------ dish -------');
console.log(comboStalls,'-------- comboStalls ---------');



  const checkItemInCart = () => {
    const item = store.cartItems.find((element) => {
      return element.item_id == route.params.dish.id;
    });
    item &&
      (() => {
        // setComment(item.comment);
        // setDishTotalPrice(item.totalPrice);
        // setAddons(item.add_ons);
        // setDishQuantity(item.quantity);
        // setSizeSelected(item.size_index);
        setDish(item.completeDish);
        setDishInCart(true);
      })();
    !item && fetchDishDetail();
  };

  const AddtoCart = async () => {
    if (store.cartItems.length > 0) {
      const itemIsHere = store.cartItems.find((element) => {
        return element.item_id == dish?.id;
      });
      console.log('itemIsHere', itemIsHere);
      if (!itemIsHere) {
        addItem();
      } else {
        if (
          _.isEqual(itemIsHere.add_ons.sort(), addons.sort()) &&
          itemIsHere.size_index === sizeSelected
        ) {
          console.log('same added');
          itemIsHere &&
            (() => {
              itemIsHere.quantity == dishQuantity
                ? editCartItem(0)
                : editCartItem(0);
            })();
        } else {
          console.log('new added');
          addItem();
        }
      }
    } else {
      addItem();
    }
  };

  const editCartItem = (addOne) => {
    if (store?.cartItems) {
      const itemIsHere = store.cartItems.find((element, index) => {
        console.log('element', element);
        if (
          _.isEqual(element.add_ons.sort(), addons.sort()) &&
          element.size_index === sizeSelected
        ) {
          const CartItem = {
            index: index,
            item: {
              item_id: dish?.id,
              size_id: dish?.dish_sizes[sizeSelected]?.id
                ? dish?.dish_sizes[sizeSelected].id
                : null,
              size_index: sizeSelected,
              add_ons: addons,
              quantity: element.quantity + dishQuantity + addOne,
              name: dish?.title,
              totalPrice: element.totalPrice + dishTotalPrice,
              singleDishPrice: singleDishPrice,
              comment: comment != null ? comment : 'no intructions',
              completeDish: dish,
            },
          };
          setComment('');
          dispatch(Jobs.editCartItem({ index: index, item: CartItem.item }));
        }
        navigation.navigate('ordersummary');
      });
    }
  };

  const addItem = () => {
    const CartItem = {
      item_id: dish?.id,
      size_id: dish?.dish_sizes[sizeSelected]?.id
        ? dish?.dish_sizes[sizeSelected].id
        : null,
      size_index: sizeSelected,
      add_ons: addons,
      quantity: dishQuantity,
      name: dish?.title,
      totalPrice: dishTotalPrice,
      singleDishPrice: singleDishPrice,
      comment: comment != null ? comment : 'no intructions',
      completeDish: dish,
    };
    if (Object.keys(store?.coffeShop).length) {
      if (store?.coffeShop?.id == dish?.restaurant_id) {
        setComment('');
        dispatch(Jobs.addItemToCart(CartItem));
        navigation.navigate('ordersummary');
      } else {
        Work.showToast('You can not add items from different Coffee Shop.');
      }
    } else {
      dispatch(
        Jobs.singleCoffeShop({
          id: dish?.restaurant_id,
        }),
      );
      setComment('');
      dispatch(Jobs.addItemToCart(CartItem));
      navigation.navigate('ordersummary');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getDishDetail();
    }, [store]),
  );

  useEffect(() => {
    if (dish?.dish_sizes) {
      let totalPrice = 0;
      let singleDishPrice = 0;
      if (dish?.dish_sizes[sizeSelected]?.prize) {
        totalPrice += dish?.dish_sizes[sizeSelected]?.prize;
        singleDishPrice += dish?.dish_sizes[sizeSelected]?.prize;
      }
      if (addons.length && dish?.dish_adons) {
        addons.forEach((element) => {
          dish?.dish_adons.forEach((item) => {
            if (item.id == element) {
              totalPrice += item.prize;
              singleDishPrice += item.prize;
            }
          });
        });
      }
      if (!dish?.dish_sizes.length && dish?.price > 0) {
        totalPrice = dish?.price;
        singleDishPrice = dish?.price;
      }
      if (dishQuantity > 1) {
        totalPrice *= dishQuantity;
      }
      setSingleDishPrice(singleDishPrice);
      setDishTotalPrice(totalPrice);
    }
  }, [addons, dishQuantity, sizeSelected, dish]);

  return (
    <SafeWrapper>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Loader visible={loader} />
        <ImageBackground
          source={{ uri: dish?.image }}
          resizeMode="stretch"
          style={styles.image}>
          <SecondHeader onPressBack={() => navigation.goBack()} />
        </ImageBackground>
        <View style={styles.dishDescription}>
          <View style={styles.NamePrice}>
            <Text style={[styles.namepricetxt, { flex: 2 }]}>
              {dish?.title?.length > 15 ? dish.title : dish?.title}
            </Text>
            <Text style={[styles.namepricetxt, { flex: 1, textAlign: 'right' }]}>
              $ {dish?.price > 0 ? dish?.price.toFixed(2) : 0}
            </Text>
          </View>
          {dish?.description ? (
            <Text>
              {dish?.description.length > 330
                ? dish?.description.substring(0, 320)
                : dish?.description}
            </Text>
          ) : (
            <Text style={styles.destxt}>No description</Text>
          )}
          {dish?.dish_sizes?.length ? (
            <Sizes
              dishSizes={dish?.dish_sizes}
              sizeSelected={sizeSelected}
              setSizeSelected={setSizeSelected}
            />
          ) : null}
          {dish?.dish_adons?.length ? (
            <View>
              <Text style={styles.customiseHeading}>
                Customise Your Selection
              </Text>
              <AddOns
                dishAddons={dish?.dish_adons}
                addons={addons}
                setAddons={setAddons}
              />
            </View>
          ) : null}
        </View>
        {comboStalls?.length > 0 ? (
          <View style={{ marginTop: WP('5') }}>
            <View style={styles.dishDescription}>
              <Text style={styles.boldHeading}>Related Combos</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: WP('5') }}>
              {comboStalls.map((data) => (
                <ComboCard
                  image={data.image}
                  price={data.price}
                  dish={data.deal_items}
                  key={data}
                  comboName={data.name}
                  restaurantID={route.params.dish.restaurant_id}
                  //restaurantID={data.restaurant_id}
                  comboDealID={data.id}
                />
              ))}
            </ScrollView>
          </View>
        ) : null}
        <BottomShadow style={{ width: '100%' }}>
          <View style={styles.specialIns}>
            <View style={styles.specialInsHeading}>
              <Text style={styles.boldHeading}>Special Instruction</Text>
              <Text style={styles.OptionalTxt}>Optional</Text>
            </View>
            <View style={styles.instructionsInput}>
              <TextInput
                value={comment}
                style={{ padding: 0, marginLeft: WP('1') }}
                placeholder="e.g. No Onion please"
                onChangeText={setComment}
              />
            </View>
          </View>
        </BottomShadow>
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
          <BtnWrapper onPress={() => setDishQuantity((prev) => prev + 1)}>
            <FontAwesome5 name="plus" size={WP('5')} color="#0D441E" />
          </BtnWrapper>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <BtnWrapper onPress={AddtoCart}>
            <View style={styles.addToCartBtn}>
              <Text style={[styles.addToCartBtnTxt, { opacity: 0 }]}>
                $ 10.00
              </Text>
              <Text style={styles.addToCartBtnTxt}>
                {!dishInCart ? 'Add To Cart' : 'Add Another'}
              </Text>
              <Text style={styles.addToCartBtnTxt}>$ {dishTotalPrice.toFixed(2)} </Text>
            </View>
          </BtnWrapper>
        </View>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default DishDetail;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: WP('60'),
  },
  dishDescription: {
    width: '80%',
    alignSelf: 'center',
  },
  NamePrice: {
    marginTop: WP('3'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  namepricetxt: {
    color: Work.THEME.colors.black,
    fontWeight: 'bold',
    fontSize: WP('6.5'),
  },
  destxt: {
    marginTop: WP('2'),
    fontSize: WP('3.4'),
  },
  specialIns: {
    width: '80%',
    alignSelf: 'center',
    marginTop: WP('7'),
    marginBottom: WP('3'),
  },
  specialInsHeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldHeading: {
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
    fontSize: WP('6'),
    marginRight: WP('1.3'),
  },
  OptionalTxt: {
    fontSize: WP('3.2'),
  },
  instructionsInput: {
    borderWidth: 2,
    borderColor: Work.THEME.colors.grey,
    height: WP('10'),
    marginTop: WP('2.5'),
    justifyContent: 'center',
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
  disabledAddToCartBtn: {
    width: '90%',
    alignSelf: 'center',
    height: WP('12'),
    marginTop: WP('6'),
    marginBottom: WP('3'),

    backgroundColor: Work.THEME.colors.lightGrey,
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
  customiseHeading: {
    marginVertical: scale(10),
    fontSize: scale(15),
    color: 'black',
  },
});
