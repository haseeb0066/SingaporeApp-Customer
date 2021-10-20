import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import Header from '../../../shared/components/secHeader';
import SafeWrapper from '../../../shared/components/safeWrapper';
import {THEME, WP} from '../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import BtnWrapper from '../../../shared/components/btnWrapper';
import imageAssets from '../../../assets/imageAssets';
import OrderData from './components/orderData';
import {useNavigation} from '@react-navigation/native';
import * as Work from '../../../shared/exporter';
import Loader from '../../../shared/components/Loader';
import Axios from 'axios';

const myProfile = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const getOrdersHistory = async () => {
    try {
      const checkInternet = await Work.checkInternetConnection();
      if (checkInternet) {
        setLoader(true);
        const response = await Axios.get('/user_order_history');
        if (response?.data?.status == 'success') {
          setOrders(response?.data?.successData?.orders);
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
  };

  useEffect(() => {
    getOrdersHistory();
  }, []);

  return (
    <SafeWrapper>
      <Loader visible={loader} />
      <Header
        onBackPress={() => navigation.goBack()}
        backIcon={
          <Image
            source={imageAssets.backwhite}
            style={{width: WP('6'), height: WP('6')}}
          />
        }
        title="Order History"
        rightIcon={
          <Image
            source={imageAssets.headerRightIcon}
            style={{width: WP('6'), height: WP('6')}}
          />
        }
      />
      {/* <View style={styles.activeOrdersContainer}>
        <Text style={styles.activeTxt}>Active Orders</Text>
        <Text style={{fontSize: WP('3.5')}}>You have no active order.</Text>
      </View> */}
      <View style={styles.pastOrders}>
        <Text style={styles.activeTxt}>Past Orders</Text>
        {orders.length ? (
          <FlatList
            data={orders}
            keyExtractor={(index, item) => index + '' + item}
            renderItem={(item) => <OrderData item={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
    </SafeWrapper>
  );
};

export default myProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: WP('4'),
  },
  activeOrdersContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: WP('4'),
    justifyContent: 'space-between',
    height: WP('12'),
  },
  activeTxt: {
    color: THEME.colors.text,
    fontWeight: 'bold',
    fontSize: WP('4.5'),
  },
  pastOrders: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: WP('3'),
  },
});
