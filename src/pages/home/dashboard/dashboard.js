import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  Easing,
  FlatList,
  TextInput,
  Platform,
  PermissionsAndroid,
  Pressable,
  TouchableOpacity,
  Modal
} from 'react-native';

// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import BtnWrapper from '../../../shared/components/btnWrapper';
import ExploreCategories from './components/ExploreCategories';
import RestuarentOutlets from './components/restuarentOutlets';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import imageAssets from '../../../assets/imageAssets';
import ButtomShadow from '../../../shared/components/SingleSidedShadowBox';
import Feather from 'react-native-vector-icons/Feather';
import * as Jobs from '../../../store/actions/dashboard.action';
import * as authJobs from '../../../store/actions/auth.action';
import Loader from '../../../shared/components/Loader';
// import Entypo from 'react-native-vector-icons/Entypo';
import Entypo from 'react-native-vector-icons/Entypo';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LocationEnabler from 'react-native-location-enabler';
import OneSignal from 'react-native-onesignal';

import {
  checkInternetConnection,
  GENERAL_ERROR_MSG,
  HP,
  INTERNET_CONNECTION_ERROR,
  showToast,
  THEME,
} from '../../../shared/exporter';
import { NetInfoCellularGeneration } from '@react-native-community/netinfo';
const { WP } = Work;
const {
  useLocationSettings,
  PRIORITIES: { HIGH_ACCURACY },
} = LocationEnabler;

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state?.dashboard?.homeData);
  const loader = useSelector((state) => state?.dashboard?.homeDataLoader);
  const cart = useSelector((state) => state?.cart);
  const auth = useSelector((state) => state?.auth);
  const orderId = useSelector((state) => state?.cart?.onGoingOrderID);
  const cuisine = ['Chicken', 'Beef', 'Mutton', 'Fish', 'Sea Food'];
  const [searchinput, setSearchInput] = useState('');
  const animatedView = useRef(new Animated.Value(50));
  const addID = useSelector((state) => state?.auth?.addID);
  const address = useSelector((state) => state?.auth?.add);
  // new add //
  const user = useSelector((state) => state?.auth?.user);
  const [modalVisible, setModalVisible] = useState(false);


  //console.log(loader ,'---  homeDataLoader ----');
  //console.log(dashboardData,'---  dashboard data ----');
  //console.log(addID ,'---  addID ----');
//console.log(Work.GENERAL_ERROR_MSG, ' ...... error show');

  const [enabled, requestResolution] = useLocationSettings({
    priority: HIGH_ACCURACY, // optional: default BALANCED_POWER_ACCURACY
    alwaysShow: true, // optional: default false
    needBle: true, // optional: default false
  });

  const onStartAnimating = () => {
    Animated.timing(animatedView.current, {
      toValue: 200,
      easing: Easing.ease,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const _reverseGeocode = async (lat, lng) => {
    const checkConnection = await checkInternetConnection();

    if (checkConnection) {
      try {
        await fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          lat +
          ',' +
          lng +
          `&key=${Work.mapAPIKey}`,
        )
          .then((res) => res.json())
          .then((res) => {
            let address = res.results[0].formatted_address.replace(/"/g, ' ');
            let searchCheck = false;

            dispatch(
              authJobs.setSearchingArea(
                {
                  latitude: lat,
                  longitude: lng,
                  address,
                },
                searchCheck,
              ),
            );
          });
      } catch (error) {
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else {
      setVisible(false);
      showToast(Work.INTERNET_CONNECTION_ERROR);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Buey Tahan',
          message: 'Buey Tahan access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((info) => {
          if (auth?.searchedArea) {
            dispatch(
              Jobs.getHomeData({
                lat: auth?.searchingArea?.latitude,
                lng: auth?.searchingArea?.longitude,
                user: user
                // lat: 1.3991,
                // lng: 103.8899
              }),
            );
          } else {
            // _reverseGeocode(info.coords.latitude, info.coords.longitude);
            dispatch(
              Jobs.getHomeData({
                lat: info.coords.latitude,
                lng: info.coords.longitude,
                user: user
                 //lat: 1.3991,
                  //lng: 103.8899
              }),
            );
          }
        });
      } else {
        // alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getFiltered = async (lat, lng,) => {
    try {
      dispatch(
        Jobs.getHomeData({
          lat: lat,
          lng: lng,
        // add new//
          user: user
        }),
      );
    } catch (err) {
      console.warn(err);
    }
  }

  const getStallDetails = async (lat, lng,) => {
    try {
      dispatch(
        Jobs.getCurrentLatLng({
          lat: lat,
          lng: lng
        }),
      );
    } catch (err) {
      console.warn(err);
    }
  }

  const getAddress = async (id) => {
    if (id === null) {
      return;
    }
    try {
      const checkInternet = await Work.checkInternetConnection();
      if (checkInternet) {
        // setloader(true);
        const response = await axios.get('/get_address');
        console.log(response?.data?.successData?.address,'------ user address .....');
        const add = response?.data?.successData?.address.find(
          (ele) => ele.id === id,
        );
        // const lat = response?.data?.successData?.lat.find((ele) => ele.id === id);
        if (response?.data.status == 'success') {
          getFiltered(add.lat, add.lng,);
          getStallDetails(add.lat, add.lng);
          dispatch(
            authJobs.saveAdd(add.address),
          );
          // setloader(false);
        } else {
          if(user)
          {
            Work.showToast(Work.GENERAL_ERROR_MSG);
          }
          else
          {
            //getFiltered(, ,);
            //getStallDetails(add.lat, add.lng);
            //dispatch(
              //authJobs.saveAdd(add.address),
            //);
          }
          // setloader(false);
          //Work.showToast(Work.GENERAL_ERROR_MSG);
        }
      } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    } catch (error) {
      // setloader(false);
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }

  };


  const onEmpty = () => {
    Animated.timing(animatedView.current, {
      toValue: 50,
      easing: Easing.ease,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.init('a58125fa-a1b7-4846-94ff-4db756964851', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  const onOpened = (openResult) => {
    // delete openResult.notification.payload.launchURL;
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    if (orderId !== null) {
      console.log('Inner');
      navigation.navigate('trackorder');
    }
  };

  const onIds = (device) => {
    console.log('Device info: ', device);
  };

  function myiOSPromptCallback(permission) {
    // do something with permission value
  }

  useEffect(() => {
    enabled ? requestLocationPermission() : requestResolution();
  }, [enabled, auth?.searchedArea]);

  useEffect(() => {
    if (searchinput.length == 0) onEmpty();
    else onStartAnimating();
  }, [searchinput]);

  useEffect(() => {
    getAddress(addID);
  }, [addID])

  const checkFunction = () =>{
    if(!user)
    {
      setModalVisible(true);
      // Work.showToast("Please Signup For Add Address");
    }
    else
    {
      navigation.navigate('selectlocation')
    }

  }

  const checkFun = () =>{
    if(!user)
    {
      setModalVisible(true);
      // Work.showToast("Please Signup For Add Address");
    }
    else
    {
      navigation.navigate('selectlocation')
    }

  }


  return (
    <SafeWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Loader visible={loader} />
        <ButtomShadow style={{ width: '95%', alignSelf: 'center' }}>
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={[styles.currLoc, { color: Work.THEME.colors.black }]}>
                  Deliver To:
                </Text>
                <BtnWrapper
                  onPress={()=> {checkFunction()} }>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.currLoc}>
                      {addID !== null && address !== null
                        ? address.substring(0, 12) + '...'
                        : 'Current Location'}
                    </Text>
                  </View>
                </BtnWrapper>
              </View>
              <BtnWrapper onPress={() =>{checkFun()}}>
                <Image
                  style={{
                    width: WP('5.5'),
                    height: WP('5.5'),
                    marginLeft: 10,
                  }}
                  source={imageAssets.arrowDown}
                  resizeMode="contain"
                />
              </BtnWrapper>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ordersummary')}>
                    <View style={{ height: WP('7') }}>
                      <View style={[styles.profileIcon, { marginLeft: WP('3') }]}>
                        <Entypo
                          name="shopping-cart"
                          size={scale(13)}
                          color={Work.THEME.colors.white}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {cart.cartItems.length || cart.comboItems.length ? (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeTxt}>
                        {cart.cartItems.length + cart.comboItems.length}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
              {/*  hide peofile option  */}
              { user &&
              <BtnWrapper onPress={() => navigation.navigate('barMenu')}>
                <View style={[styles.profileIcon, { marginLeft: WP('3') }]}>
                  <Entypo
                    name="menu"
                    size={scale(14)}
                    color={Work.THEME.colors.white}
                  />
                </View>
              </BtnWrapper>
              }
              {/*  hide peofile option  */}

            </View>
          </View>
        </ButtomShadow>
        <ButtomShadow style={{ width: '95%', alignSelf: 'center' }}>
          <View style={styles.inputContainer}>
            {/* <Animated.View style={{ height: animatedView.current }}> */}
            <View style={{ height: scale(45), justifyContent: 'center' }}>
              <View style={[styles.txtInputWrapper]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather
                    name="search"
                    size={WP('6.5')}
                    color={Work.THEME.colors.primary}
                  />
                  <Pressable
                    onPress={() => navigation.navigate('searchScreen')}>
                    <Text
                      style={[
                        { marginTop: Platform.OS == 'ios' ? WP('5') : null },
                        { color: Work.THEME.colors.text, marginLeft: scale(10) },
                      ]}>
                      What are you craving for
                    </Text>
                  </Pressable>
                  {/* <TextInput
                    style={[
                      { marginTop: Platform.OS == 'ios' ? WP('5') : null },
                      { color: Work.THEME.colors.text },
                    ]}
                    placeholder="What are you craving for?"
                    placeholderTextColor={Work.THEME.colors.text}
                    onChangeText={(t) => setSearchInput(t)}
                  /> */}
                </View>
                <BtnWrapper onPress={() => navigation.navigate('searchfilter')}>
                  <Image
                    source={require('../../../assets/img/setting.png')}
                    style={[styles.icons, { marginEnd: WP('4') }]}
                  />
                </BtnWrapper>
              </View>
              {/* <View>
                <Text style={styles.allCuisine}>All Cusines</Text>
                <FlatList
                  columnWrapperStyle={{ justifyContent: 'space-around' }}
                  data={cuisine}
                  numColumns={4}
                  renderItem={({ index, item }) => (
                    <View style={styles.searchConatiner}>
                      <Text style={styles.search}>{item}</Text>
                    </View>
                  )}
                  keyExtractor={(key) => key}
                />
              </View> */}
              {/* </Animated.View> */}
            </View>
          </View>
        </ButtomShadow>
        <Image
          style={{ justifyContent:'center' ,alignItems: 'center'  ,flex: 1, height:330, width:'100%', borderRadius:10 }}
          source={imageAssets.mainBanner}
          resizeMode="contain"
        />
        <ButtomShadow style={{ width: '100%', marginTop: WP('2') }}>
          <ExploreCategories
            name="Explore Categories"
            cats={dashboardData?.successData?.cats}
            //cats={dashboardData?.data?.cats}
            navigation={navigation}
            imgUri="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </ButtomShadow>
        <ButtomShadow style={{ width: '100%', marginTop: WP('2') }}>
          <RestuarentOutlets
            name="Top Coffee Shops"
            outlets={dashboardData?.successData?.feature_resturants}
            navigation={navigation}
            onPress={() => navigation.navigate('restaurantStall')}
            imgUri="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </ButtomShadow>
        <ButtomShadow style={{ width: '100%', marginTop: WP('2') }}>
          <RestuarentOutlets
            name="Coffee Shops Near You"
            outlets={dashboardData?.successData?.pop_resturants}
            navigation={navigation}
            onPress={() => navigation.navigate('restaurantStall')}
            imgUri="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </ButtomShadow>
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
                        Please create an account to add your address.
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

      </ScrollView>
    </SafeWrapper>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  currLoc: {
    fontSize: scale(12),
    fontWeight: 'bold',
    color: Work.THEME.colors.primary,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: WP('3'),
    width: '95%',
    alignSelf: 'center',
    paddingVertical: WP('3'),
    paddingHorizontal: WP('2'),
  },
  icons: {
    width: WP('6'),
    height: WP('6'),
    resizeMode: 'contain',
    marginRight: WP('1'),
  },
  inputContainer: {},

  heading: {
    fontSize: WP('6'),
    fontWeight: 'bold',
    padding: WP('4'),
  },
  bannerImg: {
    width: WP('90'),
    height: WP('50'),
    alignSelf: 'center',
    marginTop: WP('5'),
    marginHorizontal: WP('5'),
  },
  txtInputWrapper: {
    //borderWidth:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP('2'),
    width: '100%',
    justifyContent: 'space-between',
  },
  allCuisine: {
    fontWeight: 'bold',
    fontSize: WP('4'),
    marginStart: WP('4'),
    marginTop: WP('4'),
  },
  search: {
    fontSize: WP('4.4'),
    padding: WP('1'),
    paddingHorizontal: WP('2'),
  },
  searchConatiner: {
    marginTop: WP('3'),
    backgroundColor: Work.THEME.colors.lightGrey,
    borderRadius: 100,
  },
  profileIcon: {
    backgroundColor: Work.THEME.colors.primary,
    borderRadius: 2,
    width: WP('5.5'),
    height: WP('5.5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: WP('3.5'),
    right: WP('-1'),
    width: WP('4'),
    height: WP('4'),
    borderRadius: WP('1.8'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeTxt: {
    color: Work.THEME.colors.white,
    fontSize: WP('3'),
  },
});
