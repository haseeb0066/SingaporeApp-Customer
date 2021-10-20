import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ChangeAddress from './components/changeAddress';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PaymentMethod from './components/paymentMethod';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import SafeWrapper from '../../../shared/components/safeWrapper';
import BtnWrapper from '../../../shared/components/btnWrapper';
import imageAssets from '../../../assets/imageAssets';
import OrderItem from './components/OrderItem';
import ComboItem from './components/ComboItem';
import { THEME, WP, HP } from '../../../shared/exporter';
import Loader from '../../../shared/components/Loader';
import * as Work from '../../../shared/exporter';
import * as Jobs from '../../../store/actions/cart.action';
import io from 'socket.io-client';
import { InteractionManager } from 'react-native';
import { log } from 'react-native-reanimated';

const OrderSummary = ({ navigation, route }) => {
  const socket = io('https://buey.shifuge.com:5004');
  const [totalAmount, setTotalAmount] = useState(0);
  const [delFee, setDelFee] = useState(0);
  const [paymentScreenShotUrl, setPaymentScreenShotUrl] = useState(null);
  const [paymentScreenShotType, setPaymentScreenShotType] = useState(null);
  const paymentMethods = useState([
    { id: 1, title: 'Cash on delivery', name: 'cod' },
    { id: 2, title: 'Paynow', name: 'paynow' },
  ])[0];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    id: 1,
    title: 'Cash on delivery',
    name: 'cod',
  });
  const [loader, setLoader] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [stallName, setStallName] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.cart);
  const isFocused = useIsFocused();
  const userAddress = useSelector((state) => state?.auth?.userAddress);
  const addID = useSelector((state) => state?.auth?.addID);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const user = useSelector((state) => state?.auth?.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [Promocode, setPromocode] = useState();
  const [ProVisible, setProVisible] = useState(false);
  const [keyboard, setKeyboard] = useState();
  const [couponNumber, setCouponNumber] = useState();
  const [working, setWorking] = useState(false);
  const cart = useSelector((state) => state?.cart);
  const cartItems = useSelector((state) => state?.cart.cartItems);
  const dataComboItems = useSelector((state) => state?.cart.comboItems);
  //console.log('data.comboItems ..........', dataComboItems );
  // const [counter, setCounter] = useState();

// ============ current date =============================


    //const monthh = ("0" + (new Date().getMonth() + 1)).slice(-2); //Current Month
    //const yearr = new Date().getFullYear(); //Current Year

    //setCurrentDate(datee + "-" + monthh + "-" + yearr);
 console.log(cartItems, ' .......... cart items  redux ');
var ComboDATA= data?.comboItems;
var ActualTotal ;
var percentageDishes = 0;
const [discountTotal, setdiscountTotal] = useState(0);
const [actualTotal, setActualTotal] = useState(0);


  const setTotalPrice = () => {
    let price = 0;
    console.log(data?.cartItems);
    data?.cartItems.forEach((element) => {
      price += element.totalPrice;
    });
    data?.comboItems.forEach((element) => {
      price += element.totalPrice;
    });
    setActualTotal(price)
    setTotalAmount(price);
  };

  //ActualTotal= totalAmount;

  const placeOrder = async () => {

    if(user)
    {

      if (
        deliveryAddress !== undefined &&
        (data?.cartItems.length > 0 || data?.comboItems.length > 0)
      ) {
        try {
          const checkInernet = await Work.checkInternetConnection();
          if (checkInernet) {
            setLoader(true);

            console.log('idhr', totalAmount);
            var dataVal = new FormData();
            const cartItemIds = [];
            const comboItemIds = [];

            if (paymentScreenShotUrl != undefined) {
              dataVal.append('file', {
                uri: paymentScreenShotUrl,
                name: 'chat.jpg',
                type: paymentScreenShotType,
              });
            } else {
              dataVal.append('file', null);
            }
            const cartItems = data?.cartItems.map((item) => {
              cartItemIds.push(item.item_id);
              console.log(item, '---------- items deals ---------');
              return {
                item_id: item.item_id,
                deal_id: '',
                size_id: item.size_id,
                add_ons: item.add_ons,
                comment: item.comment,
                quantity: item.quantity,
              };
            });
            const comboItems = data?.comboItems.map((item) => {
              comboItemIds.push(item.combo_id);
              console.log(item, '---------- combo deals ---------');
              return {
                item_id: '',
                deal_id: item.combo_id,
                size_id: '',
                add_ons: '',
                comment: '',
                quantity: item.quantity,
              };
            });
            var ids = cartItemIds.join(',');
            var comboids = comboItemIds.join(',');
            var combineItems = cartItems.concat(comboItems);

            if( working== true )
            {
            dataVal.append('coupon_number', couponNumber);

            }

            dataVal.append('ids', ids);
            dataVal.append('deal_ids', comboids);
            dataVal.append('items', JSON.stringify(combineItems));
            dataVal.append(
              'address_id',
              deliveryAddress?.id ? deliveryAddress?.id : 1,
            );
            dataVal.append('stripeToken', '1212121212121212');
            dataVal.append('total_amount', totalAmount);
            dataVal.append('comments', 'No Comments');
            dataVal.append(
              'payment_type',
              selectedPaymentMethod.name == 'cod' ? 'cash' : 'card',
            );
            console.log('Order SUMMARY', dataVal);

            const response = await axios.post('/order', dataVal);
            console.log('Order Response', response?.data);
            if (response?.data?.status == 'success') {
              setLoader(false);
              dispatch(Jobs.clearCart());
              dispatch(Jobs.singleCoffeShop({}));

              response?.data?.successData?.stall_ids.map((data) => {
                socket.emit('create_order', {
                  order_id: response?.data?.successData?.order_id,
                  stall_id: data,
                });
              });

              navigation.navigate('findingRider', {
                order_ID: response?.data?.successData?.order_id,
                stall_ID: response?.data?.successData?.stall_ids,
              });
            } else {
              Work.showToast(response?.data?.errorMessage);
              setLoader(false);
            }
          } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
        }
        catch (error) {
          Work.showToast(Work.GENERAL_ERROR_MSG);
          console.log(error.response.data);
          setLoader(false);
        }
      } else {
        if (!deliveryAddress) {
          Work.showToast('Please add Address');
        } else {
          Work.showToast('Please add Item for Order');
        }
      }
    }
    else
    {
      //alert('Please Signup for place an order.')
      setModalVisible(true);
    }

  };

  const getAddress = async (id) => {
    console.log(id,' ........ summery data id ...... ');
    if (id !== null) {


       if(user)
       {
        try {
          const checkInternet = await Work.checkInternetConnection();
          if (checkInternet) {
            setLoader(true);
            const response = await axios.get('get_address');
            const add = response?.data?.successData?.address.find(
              (ele) => ele.id === id,
            );

            if (response?.data.status == 'success') {
              setDeliveryAddress(add);
              setLoader(false);
            } else {
              setLoader(false);
              Work.showToast(Work.GENERAL_ERROR_MSG);
            }
          } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
        } catch (error) {
          setLoader(false);
          Work.showToast(Work.GENERAL_ERROR_MSG);
        }
       }
       else
       {

       }


    }
  };

  const getRestaurant = async () => {
    if (Object.keys(data.coffeShop).length) {
      try {
        const checkInternet = await Work.checkInternetConnection();
        if (checkInternet) {
          setLoader(true);

          const response = await axios.get(
            `/resturant_detail/${data.coffeShop.id}`,
          );
          console.log(response?.data);
          setDelFee(
            response?.data?.successData?.resturant_detail?.delivery_fee,
          );
          let stall = [];
          response?.data?.successData?.resturant_detail?.stalls.map((data) =>
            stall.push({ name: data.name, id: data.id }),
          );

          let uniqueChars = [];

          data?.comboItems.length > 0 &&
            data?.comboItems.forEach((c) => {
              if (
                !uniqueChars.includes(
                  stall.find((i) => i.id === c.comboStall_id),
                )
              ) {
                uniqueChars.push(stall.find((i) => i.id === c.comboStall_id));
              }
            });
          data?.cartItems.forEach((c) => {
            if (
              !uniqueChars.includes(
                stall.find((i) => i.id === c.completeDish.stall_id),
              )
            ) {
              uniqueChars.push(
                stall.find((i) => i.id === c.completeDish.stall_id),
              );
            }
          });
          //console.log('name-------',uniqueChars);
          console.log('Combossss----', data.comboItems);
          //console.log('Deals---', data.cartItems);

          setStallName(uniqueChars);

          if (response?.data.status == 'success') {
            setRestaurant(response?.data?.successData?.resturant_detail);
            setLoader(false);
          } else {
            setLoader(false);
            Work.showToast(Work.GENERAL_ERROR_MSG);
          }
        } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
      } catch (error) {
        setLoader(false);
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    }
  };

  useEffect(() => {
    setLoader(false);
    // console.log('her', route?.params?.index);
    // getAddress(route?.params?.index);
    setTotalPrice();
    getRestaurant();
  }, []);

  useEffect(() => {
    setTotalPrice();
  }, [data]);
  useEffect(() => {
    if (isFocused) {
      getAddress(addID);
    }
  }, [isFocused]);

// --------------------------- promocode fuction ----------------------------------------------------
// const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

const createTwoButtonAlert = () =>
{
  Alert.alert(
    "Please Make Sure !",
    "Once Coupon code used you will use it again after placing order ",
    [
      {
        text: "Cancel",
        onPress: () => { setProVisible(!ProVisible)  } ,
        style: "cancel"
      },
      { text: "OK", onPress: () => {PromocodeFuction() } }
    ]
  );

}





const PromocodeFuction = async () => {

  setLoader(true);
setProVisible(!ProVisible);
  try {
    const checkInternet = await Work.checkInternetConnection();
    if (checkInternet) {

      //console.log('try if true before api call');

      const coupon_number= Promocode;
      //console.log(coupon_number);
      const response = await axios.post('/apply-coupon', {coupon_number});




        if(response?.data?.status == 'success')
        {

          setCouponNumber(response?.data?.successData?.coupon_number);
          //----  Over all
          if(response?.data?.successMessage == 1)
          {
            console.log(response?.data?.successMessage, 'combo coupon Type !!!! ' );

            console.log(response?.data,'........ combo  Promo API data');
            const date = response?.data?.successData?.expiry_date.toString().split(" ", 1);
            const Type = response?.data?.successData?.discount_type;
            console.log(date[0],'.......');
            var dateString = new Date()
                        .toISOString()
                        .split("T")[0];
            console.log(dateString, '... ');
           if(date >= dateString)
           {

            console.log('date true' );
             if(data?.comboItems > 0)
             {
                console.log('combo true' );
                var i =0;
                console.log(data?.comboItems[i].comboStall_id, '  ..........comboStall_id');
              if(response?.data?.successData?.stall_id == data?.comboItems[i].comboStall_id)
              {
                console.log(data?.comboItems[i].combo_id, ' combo_id.....');
                console.log(response?.data?.successData?.stall_id, '  coupon stall_id.....');

                if(Type == 1)
                {

                  // for( var i = 0; i < cartItems.length; i++)
                  // {
                  //               console.log(cartItems[i].totalPrice , ' cart price  ');
                  //               percentageDishes =  cartItems[i].totalPrice/ 100 * 10 ;
                  //               console.log(percentageDishes ,'...dish base percentageDishes ...');
                  //               cartItems[i].totalPrice  = cartItems[i].totalPrice - percentageDishes ;
                  //               console.log(cartItems[i].totalPrice ,'...dish  base  percentageDishes ...');
                  //               //cartItems[i].totalPrice = percentageDishes;
                  // }
                 console.log('coupon valid');
                 var percentage = response?.data?.successData?.percentage;
                 console.log(percentage,' % ');
                 setActualTotal(totalAmount);
                 var newNum =  totalAmount/ 100 * percentage;
                 setdiscountTotal(newNum);
                 console.log(newNum,' % over all combo');
                 newNum = totalAmount - newNum ;
                 console.log(newNum,' % over all combo');
                 setTotalAmount(newNum);
                 setTotalPrice();
                 setLoader(false);
                setWorking(true)

                }
                else
                {
                  console.log(' dish base coupon ');
                }


              }
              else
              {
                Work.showToast('Coupon is not apply on this stall');
              }





             }
             else
             {
              console.log('dish true' );
              var i = 0;
              console.log(response?.data?.successData?.stall_id,'....get id from api ');
              console.log(cartItems[i].completeDish.stall_id,'.... cart item id ');
              if(response?.data?.successData?.stall_id == cartItems[i].completeDish.stall_id )
              {
                // console.log(cartItems[i].completeDish.stall_id, ' cart id .....');
                // console.log(response?.data?.successData?.stall_id, '  coupon id.....');
               if(Type == 1)
               {
                // for( var i = 0; i < cartItems.length; i++)
                // {
                //               console.log(cartItems[i].totalPrice , ' cart price  ');
                //               var percentageDishes =  cartItems[i].totalPrice/ 100 * 10 ;
                //               console.log(percentageDishes ,'...dish base percentageDishes ...');
                //               cartItems[i].totalPrice  = cartItems[i].totalPrice - percentageDishes ;
                //               console.log(cartItems[i].totalPrice ,'...dish  base  percentageDishes ...');
                //               //cartItems[i].totalPrice = percentageDishes;
                // }
                setTotalPrice();
                console.log('coupon valid');
                var percentage = response?.data?.successData?.percentage;

                console.log(percentage,' % ');
                setActualTotal(totalAmount);
                var newNum =  totalAmount/ 100 * percentage;
                setdiscountTotal(newNum);
                console.log(newNum,' % over all ');
                newNum = totalAmount - newNum ;
                console.log(newNum,' % over all ');
                setTotalAmount(newNum);
                //counter(false)
                setLoader(false);
                 setWorking(true)
               }
               else
               {
                 console.log(' dish base coupon ');
               }

              }
              else
              {
                Work.showToast('Coupon is not apply on this stall');
              }
             }

           }
           else
           {
            //console.log('coupon Invalid');
            Work.showToast('Coupon Code is Expired !!!');
           }

          }
          ////----  dish base
          else
          {
            console.log(response?.data?.successMessage, ' dish coupon Type !!!! ' );
            console.log(response?.data.successData,'........ dish  Promo API data');

            var dateString = new Date()
                        .toISOString()
                        .split("T")[0];
            console.log(dateString, '... ');
            response?.data?.successData?.map((element) => {
              var datt;

                datt=element.expiry_date.toString().split(" ", 1);
                console.log(datt[0]);
                if(datt >= dateString)
                {
                  //=== combo item  apple dish base coupon
                  if(data?.comboItems.length > 0)
                  {
                     console.log('combo true' );
                     if(cartItems.length > 0)
                    {

                      setActualTotal(totalAmount);
                      console.log('lenght more then 1');
                      for( var i = 0; i < cartItems.length; i++)
                      { console.log('combo dish running');
                      console.log(data?.comboItems[i]?.comboStall_id, ' ...... combo stall_id');
                      console.log(cartItems[i].completeDish.stall_id,' ...... ');
                          if(cartItems[i].completeDish.stall_id == data?.comboItems[i]?.comboStall_id)
                          {
                            console.log('combo dish stall_id true !');
                            if(data?.comboItems[i].combo_id == element.dish_id)
                            {
                              let price = 0;
                      var percent = 0;

                              console.log('combo dish dish_id true !');
                              data?.comboItems[i]?.totalPrice;
                              console.log( data?.comboItems[i]?.totalPrice , 'combo dish cart price  ');
                              // percent += data?.comboItems[i]?.totalPrice / 100 * element.percentage;
                              // console.log(percent,'------ percent -------');

                              // setActualTotal(percent);
                              var percentageDishes =  data?.comboItems[i]?.totalPrice / 100 * element.percentage ;

                              percent = percent + percentageDishes;
                              console.log(percent,'------ percent -------');
                              // setActualTotal(percent);
                              setdiscountTotal(percent);
                              console.log(percentageDishes ,'...combo dish percentageDishes ...');
                              percentageDishes = data?.comboItems[i]?.totalPrice  - percentageDishes ;
                              console.log(percentageDishes ,'...combo dish percentageDishes ...');
                              //ComboDATA?.totalPrice  = percentageDishes;
                              //dataComboItems?.totalPrice= percentageDishes;
                              // data?.comboItems.forEach((element) => {
                              //   element.totalPrice = percentageDishes
                              //   price = element.totalPrice
                              // });
                              //setTotalAmount(percentageDishes);
                              setTotalPrice();
                              setWorking(true)

                            }
                            else
                            {
                              console.log('dish_id false !');
                            }
                          }
                          else
                          {
                            Work.showToast('Coupon is not apply on this stall');

                          }
                      }
                    }

                    else
                    {
                      Work.showToast('Card is Empty !');
                    }

                  }
                 // === dish item  apple dish base coupon
                  else
                  {

                    var percent;
                    if(cartItems.length > 0)
                    {
                      setActualTotal(totalAmount);
                      console.log('lenght more then 1');
                      for( var i = 0; i < cartItems.length; i++)
                      { console.log('running');
                          if(cartItems[i].completeDish.stall_id == element.stall_id)
                          {
                            console.log('stall_id true !');
                            if(cartItems[i].item_id == element.dish_id)
                            {
                      var percent= 0;

                              let price = 0;
                              console.log('dish_id true !');
                              cartItems[i].totalPrice ;
                              console.log(cartItems[i].totalPrice , ' cart price  ');
                              // percent += cartItems[i].totalPrice/ 100 * element.percentage;
                              // console.log(percent,'------ percent -------');
                              // setActualTotal(percent);
                              var percentageDishes =  cartItems[i].totalPrice/ 100 * element.percentage ;
                              // percent += percentageDishes;
                              percent = percent + percentageDishes;
                              console.log(percent,'------ percent -------');
                              // setActualTotal(percent);
                              setdiscountTotal(percent);

                              console.log(percentageDishes ,'...dish base percentageDishes ...');
                              cartItems[i].totalPrice  = cartItems[i].totalPrice - percentageDishes ;
                              console.log(cartItems[i].totalPrice ,'...dish  base  percentageDishes ...');
                              cartItems[i].totalPrice = percentageDishes;
                              // data?.cartItems[i].forEach((element) => {
                              //   element.totalPrice = percentageDishes
                              //   price = element.totalPrice
                              // });
                              //setTotalAmount(percentageDishes);
                              setTotalPrice();
                              setLoader(false);
                              setWorking(true)

                            }
                            else
                            {
                              console.log('dish_id false !');
                            }
                          }
                          else
                          {
                            Work.showToast('Coupon is not apply on this stall');

                          }
                      }
                    }
                    else
                    {
                      Work.showToast('Card is Empty !');
                    }

                  }

                }
                else
               {
                console.log('coupon Invalid');
                Work.showToast('Coupon Code is Expired !!!');
                }

            });
            //console.log(date,'.... combo date ....');
            //const Type = response?.data?.successData?.discount_type;

          }

          setLoader(false);
        }
        setLoader(false);


      }
      //---------- successfully data get --------//



    //  ---------  response error
    else{
        console.log('.......internet issue.......')
      //Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    }
  }
  catch (error) {
    setLoader(false);
    console.log(" dont receive response catch working !!!!!!!");
    //Work.showToast(Work.GENERAL_ERROR_MSG);
    console.log(error);
  }


}

// console.log(apiResponse, 'api response');





  return (

    // <KeyboardAvoidingView behavior='position' style={styles.container}>
    <SafeWrapper >
    {/* <KeyboardAvoidingView behavior='padding'> */}
      <Loader visible={loader} />
      <View style={styles.header}>
        <View style={styles.subHeader}>

        { working == false ? (
          <BtnWrapper onPress={() => navigation.goBack()}>
            <Image style={styles.img} source={imageAssets.backArrow} />
          </BtnWrapper>
        ):(
          <View style={{  width:'13%', }}>
           </View>
        )
        }
          <View>
          {}
            <Text style={styles.subHeaderTxt}>
              {restaurant?.name ? restaurant?.name : 'Add Item To Cart'}
            </Text>

            {/* {stallName.length > 0 &&
              stallName.map((data) => (
                <Text style={[styles.subHeaderTxt]}>
                  {data.name}
                </Text>
              ))} */}
          </View>
          <View>
          </View>
        </View>




        <View style={styles.deliverTo}>
          <Text style={styles.deliverToTxt}>Deliver to:</Text>
        </View>

        {deliveryAddress !== undefined && addID !== null ? (
          <ChangeAddress deliveryAddress={deliveryAddress} />
        ) : (
          <BtnWrapper onPress={() => navigation.navigate('selectlocation')}>
            <View style={{ marginLeft: '10%', marginTop: '2%', width: '30%' }}>
              <Text style={[styles.orderSummaryheadingTxt, { color: '#50C7F3' }]}>
                Add Address
              </Text>
            </View>
          </BtnWrapper>
        )}
      </View>
      <View style={restaurant ? styles.orders : styles.orders1}>
        <View style={styles.orderSummaryheading}>
          <Text style={styles.orderSummaryheadingTxt}>Order Summary</Text>
          <BtnWrapper
            onPress={() => {
              restaurant
                ? navigation.navigate('restaurantStall', { item: restaurant })
                : navigation.navigate('dashboard');
            }}>
            <Text style={[styles.orderSummaryheadingTxt, { color: '#50C7F3' }]}>
              Add Items
            </Text>
          </BtnWrapper>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            contentContainerStyle={{
              width: '81%',
              alignSelf: 'center',
              paddingBottom: WP('8'),
            }}
            data={data.comboItems}
            renderItem={(item) => <ComboItem item={item} />}
            keyExtractor={(item) => item.combo_id + Math.random()}
          />
          <FlatList
            contentContainerStyle={{
              width: '81%',
              alignSelf: 'center',
              paddingBottom: WP('8'),
            }}
            data={data.cartItems}
            renderItem={(item) => <OrderItem item={item} />}
            keyExtractor={(item) => item.item_id + Math.random()}
          />
        </ScrollView>
      </View>

{/* ----------------- promo code ------------------- */}
      {/* <View style={styles.promo}>
      <View style={styles.promoTextVeiw}>
  <Text style={styles.promoText}> Add Promocode </Text>
  </View>
              <View
              style={{
                borderWidth: 1,
                //borderColor: "white",
                borderColor: "black",
                borderRadius: 5,
                flexDirection: "row",
                opacity: 0.5,
                height: 35,
                width: "60%",

                // width: "100%",
                alignItems: "center",
                // borderColor: "white",
                // borderWidth: 2,
              }}
            >
              <TextInput
                placeholder="Enter Promo code "
                placeholderTextColor="black"
                keyboardType="numeric"
                value={Promocode}
                onChangeText={(text) => setPromocode(text)}
                style={{
                  width: 100,

                  // borderColor: "white",
                   //borderWidth: 2,
                  // alignItems: "center",
                  color: "black",
                  fontSize: 11,
                  paddingLeft: 5,
                }}
              />
              </View>
      </View> */}

{/* ----------------- promo code ------------------- */}

{user  &&
<View style={styles.promoButtonVeiw}>
      <TouchableOpacity style={{ height: 35,
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    //backgroundColor:THEME.colors.primary,
    backgroundColor: working? '#ababab' : THEME.colors.primary,
    borderRadius:15
     }}
        //onPress={()=>{setProVisible(true)}}
        disabled={working}
        onPress={() => {
          setProVisible(true)
              }}
      >
        <Text style={styles.promoText1}> Add Promocode </Text>
      </TouchableOpacity>
</View>
}

      <View style={styles.paymentStyle}>
        <PaymentMethod
          setPaymentScreenShotUrl={setPaymentScreenShotUrl}
          paymentMethods={paymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          setPaymentScreenShotType={setPaymentScreenShotType}
        />
      </View>


      <View style={styles.placeOrder}>
      <View style={styles.delTotal}>
          <Text style={styles.feeTxt}>Product Total:</Text>
          <Text style={styles.feeTxt}>$ {actualTotal?.toFixed(2)}</Text>
        </View>

        <View style={styles.delTotal}>
          <Text style={styles.feeTxt}>Discount Amount:</Text>
          <Text style={styles.feeTxt}>$ {discountTotal?.toFixed(2)}</Text>
        </View>

        <View style={styles.delTotal}>
          <Text style={styles.feeTxt}>Delivery Charges:</Text>
          <Text style={styles.feeTxt}>$ {delFee.toFixed(2)}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalTxt}>Total:</Text>
          <Text style={styles.totalTxt}>$ {(totalAmount + delFee).toFixed(2)}</Text>
        </View>
        <BtnWrapper onPress={placeOrder}>
          <View style={styles.placeOderBtn}>
            <Text style={styles.placeOderBtnTxt}>Place Order</Text>
          </View>
        </BtnWrapper>
      </View>



            <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        height:'40%',
                        width:'80%',
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      {/* <Icon active name="done-all" color="#0f70b7" size={80} /> */}
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Please create an account to place an order.
                      </Text>

                      <TouchableOpacity
                        style={{
                          //backgroundColor: "#0f70b7",
                          backgroundColor: THEME.colors.primary,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          navigation.navigate("deliveryaddress");
                        }}
                      >
                        <Text style={{ color: THEME.colors.black, fontWeight:'600'}}>Signup</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderColor:THEME.colors.primary,
                          borderWidth: 1,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Text style={{ color:'black' }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>

              {/* -------------- promo Modal  */}

              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={ProVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                       marginBottom: 30,
                    }}
                  >
                    <View
                      style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        height:'30%',
                        width:'80%',
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >

                      <View
              style={{
                borderWidth: 1,
                //borderColor: "white",
                borderColor: "black",
                borderRadius: 5,
                flexDirection: "row",
                opacity: 0.5,
                height: 35,
                width: "90%",
                marginBottom:10,
                //marginTop:10,
                alignItems: "center",

              }}
            >
              <TextInput
                placeholder="Enter Promo code "
                placeholderTextColor="black"
                keyboardType="email-address"
                value={Promocode}
                onChangeText={(text) => setPromocode(text)}
                style={{
                  width: 100,
                  color: "black",
                  fontSize: 11,
                  paddingLeft: 5,
                }}
              />
              </View>


                      <TouchableOpacity
                        style={{
                          backgroundColor: THEME.colors.primary,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          //PromocodeFuction();
                          createTwoButtonAlert();
                        }}
                      >
                        <Text style={{ color: THEME.colors.black, fontWeight:'600'}}>Submit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderColor:THEME.colors.primary,
                          borderWidth: 1,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          setProVisible(!ProVisible);
                        }}
                      >
                        <Text style={{ color:'black' }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
{/* </KeyboardAvoidingView> */}
    </SafeWrapper>
    // </KeyboardAvoidingView>

  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    // flex: 1.3,
  },
  orders: {
    flex: 1.2,
  },
  orders1: {
    flex: 1.6,
  },
  placeOrder: {
    marginTop: WP('1.5'),
  },
  subHeader: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: WP('2'),
    //borderWidth: 1,
  },
  img: {
    width: WP('5.2'),
    height: WP('5.2'),
  },

  subHeaderTxt: {
    textAlign: 'center',
    fontSize: WP('4'),
    color: THEME.colors.black,
    fontWeight: 'bold',
    //borderWidth: 1,
  },
  subHeaderTxtDis: {
    textAlign: 'center',
    fontSize: WP('2.8'),
    color: THEME.colors.grey,
  },
  deliverTo: {
    marginTop: WP('2.5'),
    width: '80%',
    alignSelf: 'center',
  },
  deliverToTxt: {
    fontWeight: 'bold',
    color: THEME.colors.text,
    fontSize: WP('3.7'),
  },
  address: {
    marginTop: WP('2.5'),
    alignSelf: 'center',
    width: '90%',
  },
  orderSummaryheading: {
    marginTop: WP('5'),
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderSummaryheadingTxt: {
    color: THEME.colors.text,
    fontSize: WP('4'),
    fontWeight: '900',
  },
  orderItemheadingTxt: {
    color: THEME.colors.text,
    fontSize: WP('3.5'),
    fontWeight: '900',
    marginBottom: WP('0.5'),
  },
  total: {
    marginTop: WP('1'),
    height: WP('12'),
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delTotal: {
    marginTop: WP('0.3'),
    height: WP('7'),
    width: '79%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalTxt: {
    fontWeight: 'bold',
    fontSize: WP('5'),
    color: THEME.colors.black,
  },
  feeTxt: {
    fontWeight: 'bold',
    fontSize: WP('4.5'),
    color: THEME.colors.black,
  },
  placeOderBtn: {
    width: '90%',
    height: WP('10'),
    alignSelf: 'center',
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: WP('5'),
    borderRadius:15
  },
  placeOderBtnTxt: {
    color: THEME.colors.black,
    fontSize: WP('5'),
    fontWeight: 'bold',
  },
  paymentStyle: {
    flex: 1,
  },
  promo:{

    flexDirection:'row',
    borderWidth:1,
    height: 50,
    //width:'50%',
  },
  promoText:{
    fontWeight: 'bold',
    //borderWidth: 1,
    color:'black',
    fontSize: 17,
  },
  promoTextVeiw:{
    //borderWidth: 1,
    height: 35,
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    backgroundColor:THEME.colors.primary

  },
  promoButtonVeiw:{

    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    //borderWidth:1,
    height: 50,
    width:'100%',
  },
  promoText1:{
    fontWeight: 'bold',
    //borderWidth: 1,
    color:'black',
    fontSize: 17,
  },
  promoTextVeiw1:{
    //borderWidth: 1,
    height: 35,
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    //backgroundColor:THEME.colors.primary,
    //backgroundColor: working? 'gray' : THEME.colors.primary,
    borderRadius:15
  },
});



//--------------------------------------  button state redux used --------------------------------------------






import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ChangeAddress from './components/changeAddress';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PaymentMethod from './components/paymentMethod';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import SafeWrapper from '../../../shared/components/safeWrapper';
import BtnWrapper from '../../../shared/components/btnWrapper';
import imageAssets from '../../../assets/imageAssets';
import OrderItem from './components/OrderItem';
import ComboItem from './components/ComboItem';
import { THEME, WP, HP } from '../../../shared/exporter';
import Loader from '../../../shared/components/Loader';
import * as Work from '../../../shared/exporter';
import * as Jobs from '../../../store/actions/cart.action';
import io from 'socket.io-client';
import { InteractionManager } from 'react-native';
import { log } from 'react-native-reanimated';

const OrderSummary = ({ navigation, route }) => {
  const socket = io('https://buey.shifuge.com:5004');
  const [totalAmount, setTotalAmount] = useState(0);
  const [delFee, setDelFee] = useState(0);
  const [paymentScreenShotUrl, setPaymentScreenShotUrl] = useState(null);
  const [paymentScreenShotType, setPaymentScreenShotType] = useState(null);
  const paymentMethods = useState([
    { id: 1, title: 'Cash on delivery', name: 'cod' },
    { id: 2, title: 'Paynow', name: 'paynow' },
  ])[0];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    id: 1,
    title: 'Cash on delivery',
    name: 'cod',
  });
  const [loader, setLoader] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [stallName, setStallName] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.cart);
  const isFocused = useIsFocused();
  const userAddress = useSelector((state) => state?.auth?.userAddress);
  const addID = useSelector((state) => state?.auth?.addID);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const user = useSelector((state) => state?.auth?.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [Promocode, setPromocode] = useState();
  const [ProVisible, setProVisible] = useState(false);
  const [keyboard, setKeyboard] = useState();
  const [couponNumber, setCouponNumber] = useState();
  const [working, setWorking] = useState(false);
  const cart = useSelector((state) => state?.cart);
  const cartItems = useSelector((state) => state?.cart.cartItems);
  const dataComboItems = useSelector((state) => state?.cart.comboItems);
  const couponState = useSelector((state) => state?.cart);
  console.log(couponState?.CouponBotton,'......... coupon state ..........');

  //console.log('data.comboItems ..........', dataComboItems );
  // const [counter, setCounter] = useState();

// ============ current date =============================


    //const monthh = ("0" + (new Date().getMonth() + 1)).slice(-2); //Current Month
    //const yearr = new Date().getFullYear(); //Current Year

    //setCurrentDate(datee + "-" + monthh + "-" + yearr);
 //console.log(cartItems, ' .......... cart items  redux ');
var ComboDATA= data?.comboItems;
var ActualTotal ;
var percentageDishes = 0;
const [discountTotal, setdiscountTotal] = useState(0);
const [actualTotal, setActualTotal] = useState(0);


  const setTotalPrice = () => {
    let price = 0;
    //console.log(data?.cartItems);
    data?.cartItems.forEach((element) => {
      price += element.totalPrice;
    });
    data?.comboItems.forEach((element) => {
      price += element.totalPrice;
    });
    setActualTotal(price)
    setTotalAmount(price);
  };

  //ActualTotal= totalAmount;

  const placeOrder = async () => {

    if(user)
    {

      if (
        deliveryAddress !== undefined &&
        (data?.cartItems.length > 0 || data?.comboItems.length > 0)
      ) {
        try {
          const checkInernet = await Work.checkInternetConnection();
          if (checkInernet) {
            setLoader(true);

            console.log('idhr', totalAmount);
            var dataVal = new FormData();
            const cartItemIds = [];
            const comboItemIds = [];

            if (paymentScreenShotUrl != undefined) {
              dataVal.append('file', {
                uri: paymentScreenShotUrl,
                name: 'chat.jpg',
                type: paymentScreenShotType,
              });
            } else {
              dataVal.append('file', null);
            }
            const cartItems = data?.cartItems.map((item) => {
              cartItemIds.push(item.item_id);
              console.log(item, '---------- items deals ---------');
              return {
                item_id: item.item_id,
                deal_id: '',
                size_id: item.size_id,
                add_ons: item.add_ons,
                comment: item.comment,
                quantity: item.quantity,
              };
            });
            const comboItems = data?.comboItems.map((item) => {
              comboItemIds.push(item.combo_id);
              console.log(item, '---------- combo deals ---------');
              return {
                item_id: '',
                deal_id: item.combo_id,
                size_id: '',
                add_ons: '',
                comment: '',
                quantity: item.quantity,
              };
            });
            var ids = cartItemIds.join(',');
            var comboids = comboItemIds.join(',');
            var combineItems = cartItems.concat(comboItems);

            if( couponState?.CouponBotton == true )
            {
            dataVal.append('coupon_number', couponNumber);

            }

            dataVal.append('ids', ids);
            dataVal.append('deal_ids', comboids);
            dataVal.append('items', JSON.stringify(combineItems));
            dataVal.append(
              'address_id',
              deliveryAddress?.id ? deliveryAddress?.id : 1,
            );
            dataVal.append('stripeToken', '1212121212121212');
            dataVal.append('total_amount', totalAmount);
            dataVal.append('comments', 'No Comments');
            dataVal.append(
              'payment_type',
              selectedPaymentMethod.name == 'cod' ? 'cash' : 'card',
            );
            console.log('Order SUMMARY', dataVal);

            const response = await axios.post('/order', dataVal);
            console.log('Order Response', response?.data);
            if (response?.data?.status == 'success') {
              setLoader(false);
              dispatch(Jobs.clearCart());
              dispatch(Jobs.singleCoffeShop({}));

              response?.data?.successData?.stall_ids.map((data) => {
                socket.emit('create_order', {
                  order_id: response?.data?.successData?.order_id,
                  stall_id: data,
                });
              });

              navigation.navigate('findingRider', {
                order_ID: response?.data?.successData?.order_id,
                stall_ID: response?.data?.successData?.stall_ids,
              });
            } else {
              Work.showToast(response?.data?.errorMessage);
              setLoader(false);
            }
          } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
        }
        catch (error) {
          Work.showToast(Work.GENERAL_ERROR_MSG);
          console.log(error.response.data);
          setLoader(false);
        }
      } else {
        if (!deliveryAddress) {
          Work.showToast('Please add Address');
        } else {
          Work.showToast('Please add Item for Order');
        }
      }
    }
    else
    {
      //alert('Please Signup for place an order.')
      setModalVisible(true);
    }

  };

  const getAddress = async (id) => {
    console.log(id,' ........ summery data id ...... ');
    if (id !== null) {


       if(user)
       {
        try {
          const checkInternet = await Work.checkInternetConnection();
          if (checkInternet) {
            setLoader(true);
            const response = await axios.get('get_address');
            const add = response?.data?.successData?.address.find(
              (ele) => ele.id === id,
            );

            if (response?.data.status == 'success') {
              setDeliveryAddress(add);
              setLoader(false);
            } else {
              setLoader(false);
              Work.showToast(Work.GENERAL_ERROR_MSG);
            }
          } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
        } catch (error) {
          setLoader(false);
          Work.showToast(Work.GENERAL_ERROR_MSG);
        }
       }
       else
       {

       }


    }
  };

  const getRestaurant = async () => {
    if (Object.keys(data.coffeShop).length) {
      try {
        const checkInternet = await Work.checkInternetConnection();
        if (checkInternet) {
          setLoader(true);

          const response = await axios.get(
            `/resturant_detail/${data.coffeShop.id}`,
          );
          console.log(response?.data);
          setDelFee(
            response?.data?.successData?.resturant_detail?.delivery_fee,
          );
          let stall = [];
          response?.data?.successData?.resturant_detail?.stalls.map((data) =>
            stall.push({ name: data.name, id: data.id }),
          );

          let uniqueChars = [];

          data?.comboItems.length > 0 &&
            data?.comboItems.forEach((c) => {
              if (
                !uniqueChars.includes(
                  stall.find((i) => i.id === c.comboStall_id),
                )
              ) {
                uniqueChars.push(stall.find((i) => i.id === c.comboStall_id));
              }
            });
          data?.cartItems.forEach((c) => {
            if (
              !uniqueChars.includes(
                stall.find((i) => i.id === c.completeDish.stall_id),
              )
            ) {
              uniqueChars.push(
                stall.find((i) => i.id === c.completeDish.stall_id),
              );
            }
          });
          //console.log('name-------',uniqueChars);
          console.log('Combossss----', data.comboItems);
          //console.log('Deals---', data.cartItems);

          setStallName(uniqueChars);

          if (response?.data.status == 'success') {
            setRestaurant(response?.data?.successData?.resturant_detail);
            setLoader(false);
          } else {
            setLoader(false);
            Work.showToast(Work.GENERAL_ERROR_MSG);
          }
        } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
      } catch (error) {
        setLoader(false);
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    }
  };

  useEffect(() => {
    setLoader(false);
    // console.log('her', route?.params?.index);
    // getAddress(route?.params?.index);
    setTotalPrice();
    getRestaurant();
  }, []);

  useEffect(() => {
    setTotalPrice();
  }, [data]);
  useEffect(() => {
    if (isFocused) {
      getAddress(addID);
    }
  }, [isFocused]);

// --------------------------- promocode fuction ----------------------------------------------------
// const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

const createTwoButtonAlert = () =>
{
  Alert.alert(
    "Please Make Sure !",
    "Once Coupon code used you will use it again after placing order ",
    [
      {
        text: "Cancel",
        onPress: () => { setProVisible(!ProVisible)  } ,
        style: "cancel"
      },
      { text: "OK", onPress: () => {PromocodeFuction() } }
    ]
  );

}





const PromocodeFuction = async () => {

  setLoader(true);
setProVisible(!ProVisible);
  try {
    const checkInternet = await Work.checkInternetConnection();
    if (checkInternet) {

      //console.log('try if true before api call');

      const coupon_number= Promocode;
      //console.log(coupon_number);
      const response = await axios.post('/apply-coupon', {coupon_number});




        if(response?.data?.status == 'success')
        {

          setCouponNumber(response?.data?.successData?.coupon_number);
          //----  Over all
          if(response?.data?.successMessage == 1)
          {
            console.log(response?.data?.successMessage, 'combo coupon Type !!!! ' );

            console.log(response?.data,'........ combo  Promo API data');
            const date = response?.data?.successData?.expiry_date.toString().split(" ", 1);
            const Type = response?.data?.successData?.discount_type;
            console.log(date[0],'.......');
            var dateString = new Date()
                        .toISOString()
                        .split("T")[0];
            console.log(dateString, '... ');
           if(date >= dateString)
           {

            console.log('date true' );
             if(data?.comboItems > 0)
             {
                console.log('combo true' );
                var i =0;
                console.log(data?.comboItems[i].comboStall_id, '  ..........comboStall_id');
              if(response?.data?.successData?.stall_id == data?.comboItems[i].comboStall_id)
              {
                console.log(data?.comboItems[i].combo_id, ' combo_id.....');
                console.log(response?.data?.successData?.stall_id, '  coupon stall_id.....');

                if(Type == 1)
                {

                  // for( var i = 0; i < cartItems.length; i++)
                  // {
                  //               console.log(cartItems[i].totalPrice , ' cart price  ');
                  //               percentageDishes =  cartItems[i].totalPrice/ 100 * 10 ;
                  //               console.log(percentageDishes ,'...dish base percentageDishes ...');
                  //               cartItems[i].totalPrice  = cartItems[i].totalPrice - percentageDishes ;
                  //               console.log(cartItems[i].totalPrice ,'...dish  base  percentageDishes ...');
                  //               //cartItems[i].totalPrice = percentageDishes;
                  // }
                 console.log('coupon valid');
                 var percentage = response?.data?.successData?.percentage;
                 console.log(percentage,' % ');
                 setActualTotal(totalAmount);
                 var newNum =  totalAmount/ 100 * percentage;
                 setdiscountTotal(newNum);
                 console.log(newNum,' % over all combo');
                 newNum = totalAmount - newNum ;
                 console.log(newNum,' % over all combo');
                 setTotalAmount(newNum);
                 setTotalPrice();
                 setLoader(false);
                //  setWorking(true)
                 dispatch(Jobs.changeCouponState(true));
                }
                else
                {
                  console.log(' dish base coupon ');
                }


              }
              else
              {
                Work.showToast('Coupon is not apply on this stall');
              }





             }
             else
             {
              console.log('dish true' );
              var i = 0;
              console.log(response?.data?.successData?.stall_id,'....get id from api ');
              console.log(cartItems[i].completeDish.stall_id,'.... cart item id ');
              if(response?.data?.successData?.stall_id == cartItems[i].completeDish.stall_id )
              {
                // console.log(cartItems[i].completeDish.stall_id, ' cart id .....');
                // console.log(response?.data?.successData?.stall_id, '  coupon id.....');
               if(Type == 1)
               {
                // for( var i = 0; i < cartItems.length; i++)
                // {
                //               console.log(cartItems[i].totalPrice , ' cart price  ');
                //               var percentageDishes =  cartItems[i].totalPrice/ 100 * 10 ;
                //               console.log(percentageDishes ,'...dish base percentageDishes ...');
                //               cartItems[i].totalPrice  = cartItems[i].totalPrice - percentageDishes ;
                //               console.log(cartItems[i].totalPrice ,'...dish  base  percentageDishes ...');
                //               //cartItems[i].totalPrice = percentageDishes;
                // }
                setTotalPrice();
                console.log('coupon valid');
                var percentage = response?.data?.successData?.percentage;

                console.log(percentage,' % ');
                setActualTotal(totalAmount);
                var newNum =  totalAmount/ 100 * percentage;
                setdiscountTotal(newNum);
                console.log(newNum,' % over all ');
                newNum = totalAmount - newNum ;
                console.log(newNum,' % over all ');
                setTotalAmount(newNum);
                //counter(false)
                setLoader(false);
                //  setWorking(true)
                dispatch(Jobs.changeCouponState(true));
               }
               else
               {
                 console.log(' dish base coupon ');
               }

              }
              else
              {
                Work.showToast('Coupon is not apply on this stall');
              }
             }

           }
           else
           {
            //console.log('coupon Invalid');
            Work.showToast('Coupon Code is Expired !!!');
           }

          }
          ////----  dish base
          else
          {
            console.log(response?.data?.successMessage, ' dish coupon Type !!!! ' );
            console.log(response?.data.successData,'........ dish  Promo API data');

            var dateString = new Date()
                        .toISOString()
                        .split("T")[0];
            console.log(dateString, '... ');
            response?.data?.successData?.map((element) => {
              var datt;

                datt=element.expiry_date.toString().split(" ", 1);
                console.log(datt[0]);
                if(datt >= dateString)
                {
                  //=== combo item  apple dish base coupon
                  if(data?.comboItems.length > 0)
                  {
                     console.log('combo true' );
                     if(cartItems.length > 0)
                    {

                      setActualTotal(totalAmount);
                      console.log('lenght more then 1');
                      for( var i = 0; i < cartItems.length; i++)
                      { console.log('combo dish running');
                      console.log(data?.comboItems[i]?.comboStall_id, ' ...... combo stall_id');
                      console.log(cartItems[i].completeDish.stall_id,' ...... ');
                          if(cartItems[i].completeDish.stall_id == data?.comboItems[i]?.comboStall_id)
                          {
                            console.log('combo dish stall_id true !');
                            if(data?.comboItems[i].combo_id == element.dish_id)
                            {
                              let price = 0;
                      var percent = 0;

                              console.log('combo dish dish_id true !');
                              data?.comboItems[i]?.totalPrice;
                              console.log( data?.comboItems[i]?.totalPrice , 'combo dish cart price  ');
                              // percent += data?.comboItems[i]?.totalPrice / 100 * element.percentage;
                              // console.log(percent,'------ percent -------');

                              // setActualTotal(percent);
                              var percentageDishes =  data?.comboItems[i]?.totalPrice / 100 * element.percentage ;

                              percent = percent + percentageDishes;
                              console.log(percent,'------ percent -------');
                              // setActualTotal(percent);
                              setdiscountTotal(percent);
                              console.log(percentageDishes ,'...combo dish percentageDishes ...');
                              percentageDishes = data?.comboItems[i]?.totalPrice  - percentageDishes ;
                              console.log(percentageDishes ,'...combo dish percentageDishes ...');
                              //ComboDATA?.totalPrice  = percentageDishes;
                              //dataComboItems?.totalPrice= percentageDishes;
                              // data?.comboItems.forEach((element) => {
                              //   element.totalPrice = percentageDishes
                              //   price = element.totalPrice
                              // });
                              //setTotalAmount(percentageDishes);
                              setTotalPrice();
                              //setWorking(true)
                              dispatch(Jobs.changeCouponState(true));

                            }
                            else
                            {
                              console.log('dish_id false !');
                            }
                          }
                          else
                          {
                            Work.showToast('Coupon is not apply on this stall');

                          }
                      }
                    }

                    else
                    {
                      Work.showToast('Card is Empty !');
                    }

                  }
                 // === dish item  apple dish base coupon
                  else
                  {

                    var percent;
                    if(cartItems.length > 0)
                    {
                      setActualTotal(totalAmount);
                      console.log('lenght more then 1');
                      for( var i = 0; i < cartItems.length; i++)
                      { console.log('running');
                          if(cartItems[i].completeDish.stall_id == element.stall_id)
                          {
                            console.log('stall_id true !');
                            if(cartItems[i].item_id == element.dish_id)
                            {
                      var percent= 0;

                              let price = 0;
                              console.log('dish_id true !');
                              cartItems[i].totalPrice ;
                              console.log(cartItems[i].totalPrice , ' cart price  ');
                              // percent += cartItems[i].totalPrice/ 100 * element.percentage;
                              // console.log(percent,'------ percent -------');
                              // setActualTotal(percent);
                              var percentageDishes =  cartItems[i].totalPrice/ 100 * element.percentage ;
                              // percent += percentageDishes;
                              percent = percent + percentageDishes;
                              console.log(percent,'------ percent -------');
                              // setActualTotal(percent);
                              setdiscountTotal(percent);

                              console.log(percentageDishes ,'...dish base percentageDishes ...');
                              cartItems[i].totalPrice  = cartItems[i].totalPrice - percentageDishes ;
                              console.log(cartItems[i].totalPrice ,'...dish  base  percentageDishes ...');
                              cartItems[i].totalPrice = percentageDishes;
                              // data?.cartItems[i].forEach((element) => {
                              //   element.totalPrice = percentageDishes
                              //   price = element.totalPrice
                              // });
                              //setTotalAmount(percentageDishes);
                              setTotalPrice();
                              setLoader(false);
                              // setWorking(true)
                              dispatch(Jobs.changeCouponState(true));
                            }
                            else
                            {
                              console.log('dish_id false !');
                            }
                          }
                          else
                          {
                            Work.showToast('Coupon is not apply on this stall');

                          }
                      }
                    }
                    else
                    {
                      Work.showToast('Card is Empty !');
                    }

                  }

                }
                else
               {
                console.log('coupon Invalid');
                Work.showToast('Coupon Code is Expired !!!');
                }

            });
            //console.log(date,'.... combo date ....');
            //const Type = response?.data?.successData?.discount_type;

          }

          setLoader(false);
        }
        setLoader(false);


      }
      //---------- successfully data get --------//



    //  ---------  response error
    else{
        console.log('.......internet issue.......')
      //Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    }
  }
  catch (error) {
    setLoader(false);
    console.log(" dont receive response catch working !!!!!!!");
    //Work.showToast(Work.GENERAL_ERROR_MSG);
    console.log(error);
  }


}

// console.log(apiResponse, 'api response');





  return (

    // <KeyboardAvoidingView behavior='position' style={styles.container}>
    <SafeWrapper >
    {/* <KeyboardAvoidingView behavior='padding'> */}
      <Loader visible={loader} />
      <View style={styles.header}>
        <View style={styles.subHeader}>

        { couponState?.CouponBotton == false ? (
          <BtnWrapper onPress={() => navigation.goBack()}>
            <Image style={styles.img} source={imageAssets.backArrow} />
          </BtnWrapper>
        ):(
          <View style={{  width:'13%', }}>
           </View>
        )
        }
          <View>
          {}
            <Text style={styles.subHeaderTxt}>
              {restaurant?.name ? restaurant?.name : 'Add Item To Cart'}
            </Text>

            {/* {stallName.length > 0 &&
              stallName.map((data) => (
                <Text style={[styles.subHeaderTxt]}>
                  {data.name}
                </Text>
              ))} */}
          </View>
          <View>
          </View>
        </View>




        <View style={styles.deliverTo}>
          <Text style={styles.deliverToTxt}>Deliver to:</Text>
        </View>

        {deliveryAddress !== undefined && addID !== null ? (
          <ChangeAddress deliveryAddress={deliveryAddress} />
        ) : (
          <BtnWrapper onPress={() => navigation.navigate('selectlocation')}>
            <View style={{ marginLeft: '10%', marginTop: '2%', width: '30%' }}>
              <Text style={[styles.orderSummaryheadingTxt, { color: '#50C7F3' }]}>
                Add Address
              </Text>
            </View>
          </BtnWrapper>
        )}
      </View>
      <View style={restaurant ? styles.orders : styles.orders1}>
        <View style={styles.orderSummaryheading}>
          <Text style={styles.orderSummaryheadingTxt}>Order Summary</Text>
          <BtnWrapper
            onPress={() => {
              restaurant
                ? navigation.navigate('restaurantStall', { item: restaurant })
                : navigation.navigate('dashboard');
            }}>
            <Text style={[styles.orderSummaryheadingTxt, { color: '#50C7F3' }]}>
              Add Items
            </Text>
          </BtnWrapper>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            contentContainerStyle={{
              width: '81%',
              alignSelf: 'center',
              paddingBottom: WP('8'),
            }}
            data={data.comboItems}
            renderItem={(item) => <ComboItem item={item} />}
            keyExtractor={(item) => item.combo_id + Math.random()}
          />
          <FlatList
            contentContainerStyle={{
              width: '81%',
              alignSelf: 'center',
              paddingBottom: WP('8'),
            }}
            data={data.cartItems}
            renderItem={(item) => <OrderItem item={item} />}
            keyExtractor={(item) => item.item_id + Math.random()}
          />
        </ScrollView>
      </View>

{/* ----------------- promo code ------------------- */}
      {/* <View style={styles.promo}>
      <View style={styles.promoTextVeiw}>
  <Text style={styles.promoText}> Add Promocode </Text>
  </View>
              <View
              style={{
                borderWidth: 1,
                //borderColor: "white",
                borderColor: "black",
                borderRadius: 5,
                flexDirection: "row",
                opacity: 0.5,
                height: 35,
                width: "60%",

                // width: "100%",
                alignItems: "center",
                // borderColor: "white",
                // borderWidth: 2,
              }}
            >
              <TextInput
                placeholder="Enter Promo code "
                placeholderTextColor="black"
                keyboardType="numeric"
                value={Promocode}
                onChangeText={(text) => setPromocode(text)}
                style={{
                  width: 100,

                  // borderColor: "white",
                   //borderWidth: 2,
                  // alignItems: "center",
                  color: "black",
                  fontSize: 11,
                  paddingLeft: 5,
                }}
              />
              </View>
      </View> */}

{/* ----------------- promo code ------------------- */}

{user  &&
<View style={styles.promoButtonVeiw}>
      <TouchableOpacity style={{ height: 35,
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    //backgroundColor:THEME.colors.primary,
    backgroundColor: couponState?.CouponBotton ? '#ababab' : THEME.colors.primary,
    borderRadius:15
     }}
        //onPress={()=>{setProVisible(true)}}
        disabled={couponState?.CouponBotton}
        onPress={() => {
          setProVisible(true)
              }}
      >
        <Text style={styles.promoText1}> Add Promocode </Text>
      </TouchableOpacity>
</View>
}

      <View style={styles.paymentStyle}>
        <PaymentMethod
          setPaymentScreenShotUrl={setPaymentScreenShotUrl}
          paymentMethods={paymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          setPaymentScreenShotType={setPaymentScreenShotType}
        />
      </View>


      <View style={styles.placeOrder}>
      <View style={styles.delTotal}>
          <Text style={styles.feeTxt}>Product Total:</Text>
          <Text style={styles.feeTxt}>$ {actualTotal?.toFixed(2)}</Text>
        </View>

        <View style={styles.delTotal}>
          <Text style={styles.feeTxt}>Discount Amount:</Text>
          <Text style={styles.feeTxt}>$ {discountTotal?.toFixed(2)}</Text>
        </View>

        <View style={styles.delTotal}>
          <Text style={styles.feeTxt}>Delivery Charges:</Text>
          <Text style={styles.feeTxt}>$ {delFee.toFixed(2)}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalTxt}>Total:</Text>
          <Text style={styles.totalTxt}>$ {(totalAmount + delFee).toFixed(2)}</Text>
        </View>
        <BtnWrapper onPress={placeOrder}>
          <View style={styles.placeOderBtn}>
            <Text style={styles.placeOderBtnTxt}>Place Order</Text>
          </View>
        </BtnWrapper>
      </View>



            <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        height:'40%',
                        width:'80%',
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      {/* <Icon active name="done-all" color="#0f70b7" size={80} /> */}
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Please create an account to place an order.
                      </Text>

                      <TouchableOpacity
                        style={{
                          //backgroundColor: "#0f70b7",
                          backgroundColor: THEME.colors.primary,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          navigation.navigate("deliveryaddress");
                        }}
                      >
                        <Text style={{ color: THEME.colors.black, fontWeight:'600'}}>Signup</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderColor:THEME.colors.primary,
                          borderWidth: 1,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Text style={{ color:'black' }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>

              {/* -------------- promo Modal  */}

              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={ProVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                       marginBottom: 30,
                    }}
                  >
                    <View
                      style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        height:'30%',
                        width:'80%',
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >

                      <View
              style={{
                borderWidth: 1,
                //borderColor: "white",
                borderColor: "black",
                borderRadius: 5,
                flexDirection: "row",
                opacity: 0.5,
                height: 35,
                width: "90%",
                marginBottom:10,
                //marginTop:10,
                alignItems: "center",

              }}
            >
              <TextInput
                placeholder="Enter Promo code "
                placeholderTextColor="black"
                keyboardType="email-address"
                value={Promocode}
                onChangeText={(text) => setPromocode(text)}
                style={{
                  width: 100,
                  color: "black",
                  fontSize: 11,
                  paddingLeft: 5,
                }}
              />
              </View>


                      <TouchableOpacity
                        style={{
                          backgroundColor: THEME.colors.primary,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          //PromocodeFuction();
                          createTwoButtonAlert();
                        }}
                      >
                        <Text style={{ color: THEME.colors.black, fontWeight:'600'}}>Submit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderColor:THEME.colors.primary,
                          borderWidth: 1,
                          marginTop: 10,
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => {
                          setProVisible(!ProVisible);
                        }}
                      >
                        <Text style={{ color:'black' }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
{/* </KeyboardAvoidingView> */}
    </SafeWrapper>
    // </KeyboardAvoidingView>

  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    // flex: 1.3,
  },
  orders: {
    flex: 1.2,
  },
  orders1: {
    flex: 1.6,
  },
  placeOrder: {
    marginTop: WP('1.5'),
  },
  subHeader: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: WP('2'),
    //borderWidth: 1,
  },
  img: {
    width: WP('5.2'),
    height: WP('5.2'),
  },

  subHeaderTxt: {
    textAlign: 'center',
    fontSize: WP('4'),
    color: THEME.colors.black,
    fontWeight: 'bold',
    //borderWidth: 1,
  },
  subHeaderTxtDis: {
    textAlign: 'center',
    fontSize: WP('2.8'),
    color: THEME.colors.grey,
  },
  deliverTo: {
    marginTop: WP('2.5'),
    width: '80%',
    alignSelf: 'center',
  },
  deliverToTxt: {
    fontWeight: 'bold',
    color: THEME.colors.text,
    fontSize: WP('3.7'),
  },
  address: {
    marginTop: WP('2.5'),
    alignSelf: 'center',
    width: '90%',
  },
  orderSummaryheading: {
    marginTop: WP('5'),
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderSummaryheadingTxt: {
    color: THEME.colors.text,
    fontSize: WP('4'),
    fontWeight: '900',
  },
  orderItemheadingTxt: {
    color: THEME.colors.text,
    fontSize: WP('3.5'),
    fontWeight: '900',
    marginBottom: WP('0.5'),
  },
  total: {
    marginTop: WP('1'),
    height: WP('12'),
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delTotal: {
    marginTop: WP('0.3'),
    height: WP('7'),
    width: '79%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalTxt: {
    fontWeight: 'bold',
    fontSize: WP('5'),
    color: THEME.colors.black,
  },
  feeTxt: {
    fontWeight: 'bold',
    fontSize: WP('4.5'),
    color: THEME.colors.black,
  },
  placeOderBtn: {
    width: '90%',
    height: WP('10'),
    alignSelf: 'center',
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: WP('5'),
    borderRadius:15
  },
  placeOderBtnTxt: {
    color: THEME.colors.black,
    fontSize: WP('5'),
    fontWeight: 'bold',
  },
  paymentStyle: {
    flex: 1,
  },
  promo:{

    flexDirection:'row',
    borderWidth:1,
    height: 50,
    //width:'50%',
  },
  promoText:{
    fontWeight: 'bold',
    //borderWidth: 1,
    color:'black',
    fontSize: 17,
  },
  promoTextVeiw:{
    //borderWidth: 1,
    height: 35,
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    backgroundColor:THEME.colors.primary

  },
  promoButtonVeiw:{

    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    //borderWidth:1,
    height: 50,
    width:'100%',
  },
  promoText1:{
    fontWeight: 'bold',
    //borderWidth: 1,
    color:'black',
    fontSize: 17,
  },
  promoTextVeiw1:{
    //borderWidth: 1,
    height: 35,
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    //backgroundColor:THEME.colors.primary,
    //backgroundColor: working? 'gray' : THEME.colors.primary,
    borderRadius:15
  },
});

