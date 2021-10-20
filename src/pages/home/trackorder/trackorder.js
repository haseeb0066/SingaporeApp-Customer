import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Dimensions,
} from 'react-native';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import BtnWrapper from '../../../shared/components/btnWrapper';
import imageAssets from '../../../assets/imageAssets';
import {useSelector, useDispatch} from 'react-redux';
import RNRestart from 'react-native-restart';
import {
  checkInternetConnection,
  GENERAL_ERROR_MSG,
  INTERNET_CONNECTION_ERROR,
  showToast,
  THEME,
} from '../../../shared/exporter';
import Loader from '../../../shared/components/Loader';
import io from 'socket.io-client';
import Axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import * as Jobs from '../../../store/actions/cart.action';

const {WP, HP} = Work;

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Trackorder = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const mapRef = useRef();
  const markerRef = useRef();
  const [coord, setCoord] = useState({
    curLoc: {
      latitude: 1.3521,
      longitude: 103.8198,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 1.3521,
      longitude: 103.8198,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  });
  const {curLoc, destinationCords, isLoading, coordinate} = coord;
  const [showBack, setBack] = useState(false);
  const [lat, setLat] = useState(1.3521);
  const [long, setLong] = useState(103.8198);
  const [status, setStatus] = useState(null);
  const [payType, setPayType] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const socket = io('https://buey.shifuge.com:5004');

  const orderId = useSelector((state) => state?.cart?.onGoingOrderID);
  const user = useSelector((state) => state?.auth?.user);

  const getOrderTrack = async () => {
    setVisible(true);
    const checkConnection = await checkInternetConnection();
    if (checkConnection) {
      try {
        console.log('Order Id is Here  -->>' + route?.params?.order_id);
        const response =
          route?.params?.order_id !== undefined
            ? await Axios.get(
                `/user_order_detail/${route?.params?.order_id}`,
                {},
              )
            : await Axios.get(`/user_order_detail/${orderId}`, {});

        if (response?.data?.status == 'success') {
          setPayType(response?.data?.successData?.order?.payment_type);
          setStatus(response?.data?.successData?.order?.status);
          console.log(
            'Status of Order ------>>>>>> ' +
              response?.data?.successData?.order?.status,
          );
          setVisible(false);
        } else {
          setVisible(false);
          showToast(GENERAL_ERROR_MSG);
        }
      } catch (error) {
        setVisible(false);
        showToast(GENERAL_ERROR_MSG);
      }
    } else {
      setVisible(false);
      showToast(INTERNET_CONNECTION_ERROR);
    }
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  useEffect(() => {
    console.log('First Effect Runs Here on the Status --> ' + status);
    const backAction = () => {
      navigation.navigate('dashboard');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    getOrderTrack();

    if (status === 'delivered') {
      console.log('The Deliverd Check is True Here -->>' + status);
      dispatch(Jobs.orderGoing(null));
      setBack(true);
    }
    return () => backHandler.remove();
  }, [status, isFocused]);




  useEffect(() => {
    console.log('Second Effect Runs Here --> ' + status);
    const ordStatus = (msg) => {
      if (msg.data.order_id === orderId) {
        setStatus(msg.data.status);
      }
    };
    const ordStatusChange = (msg) => {
      console.log(msg);
      // if (
      //   msg.data.order_id === orderId &&
      //   msg.data.user_id === user?.successData?.user?.id
      // ) {
      //   if (msg.data.status === 'delivered') {
      //     console.log("The Deliverd Check is True Here -->>" + msg.data.status);
      //     dispatch(Jobs.orderGoing(null));
      //     setBack(true);
      //   } else {
      setStatus(msg.data.status);
    };
    const trackRider = (data) => {
      animate(data?.data?.lat, data?.data?.long);
      setCoord({
        ...coord,
        curLoc: {latitude: data?.data?.lat, longitude: data?.data?.long},
        coordinate: new AnimatedRegion({
          latitude: data?.data?.lat,
          longitude: data?.data?.long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
      setLat(data?.data?.lat);
      setLong(data?.data?.long);
      console.log('Location Tracking', data.data);
    };

    socket.on('track_location', trackRider);
    //socket.on('estimated_time',)

    // ----------------------  estimated time ------------------------


    const EstimatedTime = (time) => {
      console.log(time?.data?.estimate_time,' ..... estimated time ..... ');
        setEstimatedTime(time);
    };
    socket.on('estimating_time', EstimatedTime);
    // ----------------------  estimated time ------------------------


    socket.on('status_change', ordStatus);
    socket.on('rider_status_change', ordStatusChange);

    return () => {
      socket.off('status_change', ordStatus);
      socket.off('rider_status_change', ordStatusChange);
      socket.off('track_location', trackRider);
      //socket.off('estimating_time', EstimatedTime);
    };
  }, [status, isFocused]);

  console.log(estimatedTime,'------ socket receive time ------');

  return (
    <SafeWrapper>
      <View style={styles.headContainer}>
        <Loader visible={visible} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {(showBack || route.params.cancel) && (
            <BtnWrapper onPress={() => navigation.navigate('dashboard')}>
              <Image
                style={styles.icon}
                source={imageAssets.backwhite}
              />
            </BtnWrapper>
          )}
          <BtnWrapper onPress={() => console.log('')}>
            <Image style={styles.icon} source={imageAssets.headerRightIcon} />
          </BtnWrapper>
        </View>

        <Text style={styles.orderT}>ORDER TRACKING</Text>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker.Animated ref={markerRef} coordinate={coordinate}>
          <Image
            source={require('../../../assets/img/06.png')}
            style={{height: 22, width: 22}}
          />
        </Marker.Animated>
      </MapView>
      <View style={[styles.headContainer, {flex: 1}]}>
        {/* <View style={styles.estimateContainer}>
          <Text style={styles.estimateTxt}>Estimated Time 26 min</Text>
        </View> */}
        <View style={styles.msgContainer}>
          <View>
            {status == 'waiting_for_approvel' && payType == 'card' ? (
              <Text
                style={{
                  padding: WP('2'),
                  fontSize: WP('4'),
                  fontWeight: 'bold',
                  color: Work.THEME.colors.black,
                }}>
                Your Payment is Waiting for Approval
              </Text>
            ) : status === 'on_way_to_stall' ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Rider is on way to Restaurant
                </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Processing.jpg')}
                />
              </View>
            ) : status === 'at_stall' ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Rider has arrived at Restaurant
                </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Processing.jpg')}
                />
              </View>
            ) : status === 'confirm_order' ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Driver has picked up your order.
                </Text>
                <Text> Estimated Time: {estimatedTime?.data?.estimate_time} </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Confirmed.jpg')}
                />
              </View>
            ) : status === 'on_way' ? (
              <View style={{alignItems: 'center'}}>

                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Driver is on the way.
                </Text>
                <Text> Estimated Time: {estimatedTime?.data?.estimate_time} </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Delivering.jpg')}
                />
              </View>
            ) : status === 'ready_to_pick' ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Your order is ready for delivery.
                </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Ready_to_deliver.jpg')}
                />
              </View>
            ) : status === 'processing' ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Your order is confirmed. The restaurant will
                  start preparing your order shortly.
                </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Processing.jpg')}
                />
              </View>
            ) : status === 'cancelled' || route.params.cancel === true ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Your order has been cancelled. Kindly contact
                  our support team if you have any enquiries.
                </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Processing.jpg')}
                />
              </View>
            ) : status === 'cooking' ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: The restaurant is preparing your order.
                </Text>
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Preparing.jpg')}
                />
              </View>
            ) : status === 'delivered' ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                    borderWidth: 5,
                  }}>
                  Order Status: Your order has been delivered successfully! Bon
                  appétit!
                </Text>
                {/* <Text> Estimated Time: {estimatedTime} </Text> */}
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Delivered.jpg')}
                />
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    padding: WP('2'),
                    fontSize: WP('4'),
                    fontWeight: 'bold',
                    color: Work.THEME.colors.black,
                  }}>
                  Order Status: Your order has been delivered successfully! Bon
                  appétit!
                </Text>
                {/* <Text> Estimated Time: {estimatedTime} </Text> */}
                <Image
                  style={styles.iconImg}
                  source={require('../../../assets/img/Delivered.jpg')}
                />
              </View>
            )}

            {/* <Text
              style={{
                paddingStart: WP('2'),
                fontSize: WP('3'),
                color: Work.THEME.colors.black,
              }}>
              Rider will picked it up once ready.
            </Text> */}
          </View>
          {/* <Text
            style={{
              paddingStart: WP('2'),
              fontSize: WP('3'),
              color: Work.THEME.colors.black,
            }}>
            Thanks for your patience
          </Text> */}
        </View>
      </View>
    </SafeWrapper>
  );
};

export default React.memo(Trackorder);

const styles = StyleSheet.create({
  map: {
    width: WP('100'),
    height: HP('55'),
    alignSelf: 'center',
  },
  icon: {
    width: WP('7'),
    height: WP('6'),
    resizeMode: 'contain',
    margin: WP('2'),
  },
  iconImg: {
    width: WP('20'),
    height: WP('20'),
    resizeMode: 'contain',
    margin: WP('4'),
  },
  headContainer: {
    backgroundColor: Work.THEME.colors.primary,
  },
  orderT: {
    fontSize: WP('6'),
    color: Work.THEME.colors.darkGreen,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: WP('5'),
  },
  estimateContainer: {
    borderWidth: 2,
    borderColor: Work.THEME.colors.white,
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: WP('3'),
  },
  estimateTxt: {
    fontSize: WP('3.7'),
    fontWeight: 'bold',
    color: Work.THEME.colors.white,
    padding: WP('1'),
    paddingHorizontal: WP('3'),
  },
  msgContainer: {
    backgroundColor: Work.THEME.colors.white,
    width: '80%',
    alignSelf: 'center',
    height: HP('25'),
    marginTop: WP('3'),
    justifyContent: 'space-between',
    paddingBottom: WP('2'),
  },
});
