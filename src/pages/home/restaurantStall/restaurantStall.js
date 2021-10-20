import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SafeWrapper from '../../../shared/components/safeWrapper';
import {
  checkInternetConnection,
  GENERAL_ERROR_MSG,
  HP,
  INTERNET_CONNECTION_ERROR,
  showToast,
  THEME,
  WP,
} from '../../../shared/exporter';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import imageAssets from '../../../assets/imageAssets';
import StallName from './components/stallName';
import ComboCard from './components/comboCard';
import Axios from 'axios';
import Loader from '../../../shared/components/Loader';
import Rating from './components/rating';
import {useDispatch, useSelector} from 'react-redux';

const restaurantStall = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [dishInCart, setDishInCart] = useState(false);
  const [show, setShow] = useState(false);
  const [stalls, setStalls] = useState([]);
  const [rating, setRating] = useState(0);
  const [restaurantDetail, setRestaurantDetial] = useState(null);
  const restaurantName = route.params.item.name;

  const store = useSelector((state) => state?.cart);

  const checkItemInCart = () => {
    const item = store.comboItems.find((element) => {
      return element.combo_id == route.params.dish.id;
    });
    if (item) {
      setDishInCart(true);
    }
  };

  const getDetail = async () => {
    setVisible(true);
    const checkConnection = await checkInternetConnection();
    if (checkConnection) {
      try {
        const response = await Axios.get(
          `/resturant_detail/${route.params.item.id}`,
          {},
        );
        if (response?.data?.successData) {
          response?.data?.successData?.resturant_detail?.ratings_average
            ? setRating(
                response.data.successData.resturant_detail.ratings_average,
              )
            : setRating(0);
          setRestaurantDetial(response.data.successData.resturant_detail);
          setStalls(response.data.successData.resturant_detail.stalls);
          setVisible(false);
          setShow(true);
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

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <SafeWrapper>
      <View style={styles.contianer}>
        <Loader visible={visible} />
        <BottomShadow style={styles.header}>
          <ImageBackground
            style={styles.img}
            source={{
              uri: restaurantDetail?.cover_image
                ? restaurantDetail?.cover_image
                : 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            }}
            resizeMode="cover">
            <View style={styles.overlay}>
              <View style={styles.headerBtnSec}>
                <BtnWrapper onPress={() => navigation.goBack()}>
                  <Image
                    source={imageAssets.backArrow}
                    style={styles.backBtnIcon}
                  />
                </BtnWrapper>
                <View style={styles.infoIcon}>
                  <View style={styles.infoIconInner}>
                    <AntDesign name="info" size={WP('4.5')} color="#F7D10F" />
                  </View>
                </View>
              </View>
              <View style={styles.restaurantInf}>
                <Text style={styles.resName}>{restaurantName}</Text>
                {/* <View style={styles.deliverySec}>
                  <Text style={styles.deliverySecTxt}> Delivery time</Text>
                </View> */}
              </View>
              {/* <Rating rating={rating} orders={0} /> */}
              {/* <View style={styles.rating}>
                <Text style={styles.ratingTxt}>
                  <Entypo name="star" size={scale(18)} color="white" />
                  <Entypo name="star" size={scale(18)} color="white" />
                  <Entypo name="star" size={scale(18)} color="white" />
                  <Entypo name="star" size={scale(18)} color="white" />
                  <Entypo name="star" size={scale(18)} color="white" /> {rating}{' '}
                  (0)
                </Text>
              </View> */}
            </View>
          </ImageBackground>
        </BottomShadow>

        <View style={{flex: 2.2}}>
          {stalls?.length > 0 ? (
            <>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginVertical: moderateVerticalScale(4),
                }}>
                <Text
                  style={{
                    fontSize: scale(20),
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  Stalls
                </Text>
              </View>
              {show && (
                <FlatList
                  data={stalls}
                  showsVerticalScrollIndicator={false}
                  renderItem={(item) => (
                    <StallName
                      item={item}
                      navigation={navigation}
                      restaurantID={route.params.item.id}
                    />
                  )}
                  keyExtractor={(item) => item.id + ' '}
                />
              )}
            </>
          ) : (
            show && (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.titleTxtNo}>No Stalls Available</Text>
              </View>
            )
          )}
        </View>
      </View>
    </SafeWrapper>
  );
};

export default React.memo(restaurantStall);

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: THEME.colors.white,
    flex: 1,
  },
  overlay: {
    height: moderateVerticalScale(230),
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: 'space-between',
  },
  header: {
    flex: 0.8,
  },
  img: {
    // marginBottom: WP('12'),
    width: '100%',
    height: moderateVerticalScale(200),
    backgroundColor: 'black',
  },
  headerBtnSec: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: WP('3'),
    height: WP('5'),
  },
  backBtnIcon: {
    width: WP('6'),
    height: WP('6'),
  },
  infoIcon: {
    width: WP('6'),
    height: WP('6'),
    borderRadius: WP('0.4'),
    backgroundColor: '#F7D10F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIconInner: {
    borderRadius: WP('3'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantInf: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(100),
  },
  resName: {
    color: THEME.colors.white,
    fontSize: scale(25),
    fontWeight: 'bold',
    marginTop: WP('5'),
    textAlign: 'center',
  },
  deliverySec: {
    borderWidth: WP('0.8'),
    borderRadius: 6,
    borderColor: THEME.colors.white,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliverySecTxt: {
    color: THEME.colors.white,
    fontSize: scale(20),
  },

  stalls: {
    flex: 1,
  },
  titleTxtNo: {
    fontSize: scale(20),
    color: THEME.colors.primary,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
