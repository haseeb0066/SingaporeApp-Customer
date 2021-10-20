import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, BackHandler } from 'react-native';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import { DotIndicator } from 'react-native-indicators';
import TextTicker from 'react-native-text-ticker';
import imageAssets from '../../../assets/imageAssets';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/cart.action';
import axios from 'axios';
const { WP } = Work;
const FindingRider = ({ navigation, route }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const socket = io('https://buey.shifuge.com:5004');

  // const cancelOrder = async (order_id) => {
  //   const checkInternet = await Work.checkInternetConnection();
  //   try {
  //     if (checkInternet) {
  //       const response = await axios.post('/cancel_order_notification', {
  //         order_id,
  //       });

  //       console.log(response?.data);
  //     } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  //   } catch (error) {
  //     Work.showToast(Work.GENERAL_ERROR_MSG);
  //   }
  // };

  // const resend = async () => {
  //   setShow(true);
  //   const checkInternet = await Work.checkInternetConnection();
  //   try {
  //     if (checkInternet) {
  //       const response = await axios.post('/order_resend_notification', {
  //         order_id: route?.params?.order_ID,
  //       });

  //       console.log(response?.data);
  //       if (response?.data?.status === 'error') {
  //         setNoRider(false);
  //         Work.showToast('Currently No Rider Available!!!');
  //         cancelOrder(route?.params?.order_ID);
  //       } else {
  //         setTimeout(() => {
  //           setShow(false);
  //         }, 15000);
  //       }
  //     } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  //   } catch (error) {
  //     Work.showToast(Work.GENERAL_ERROR_MSG);
  //   }
  // };
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // socket.on('order_cancel', (data) => {
    //   console.log('Socket Cancelled Order Data  --->>' + data);

    //   if (data.data.order_id === route?.params?.order_ID) {
    //     navigation.navigate('trackorder', {
    //       order_ID: route.params.order_ID,
    //       cancel: true,
    //     });
    //   }
    // });

    socket.on('cancel_order', function (data) {
      console.log('Socket Cancelled Order Data  --->>' + data);

      if (data.data.order_id === route?.params?.order_ID) {
        navigation.navigate('trackorder', {
          order_ID: route.params.order_ID,
          cancel: true,
        });
      }
    });

    socket.on('stall_order_accepted', (data) => {
      console.log('Socket Accepted Order Data -->>' + data);

      if (data.data.order_id === route?.params?.order_ID) {
        dispatch(Jobs.orderGoing(route.params.order_ID));
        navigation.navigate('trackorder', {
          order_ID: route.params.order_ID,
        });
      }
    });

    return () => backHandler.remove();
  }, []);


  return (
    <SafeWrapper style={styles.container}>
      <View style={styles.tyContainer}>
        <TextTicker
          style={styles.tyTxt}
          duration={3000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}>
          Waiting for Your Order Approval ... {'   '} Waiting for Your Order Approval
          ...
        </TextTicker>
      </View>

      <Image
        source={require('../../../assets/img/logo.png')}
        style={styles.img}
      />
      <DotIndicator color="white" />
    </SafeWrapper>
  );
};

export default FindingRider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Work.THEME.colors.primary,
  },
  tyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: WP('2'),
  },
  icon: {
    width: WP('7'),
    height: WP('6'),
    resizeMode: 'contain',
    margin: WP('4'),
  },
  tyTxt: {
    fontSize: WP('6'),
    fontWeight: 'bold',
    color: Work.THEME.colors.darkGreen,
    padding: WP('3'),
    paddingHorizontal: WP('5'),
    paddingVertical: WP('3'),
  },
  orderPlace: {
    fontSize: WP('7'),
    fontWeight: 'bold',
    color: Work.THEME.colors.darkGreen,
    textAlign: 'center',
  },
  img: {
    width: WP('50'),
    height: WP('50'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: WP('15'),
  },
  track: {
    fontSize: WP('4.7'),
    color: Work.THEME.colors.darkGreen,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingBottom: WP('15'),
  },
});
