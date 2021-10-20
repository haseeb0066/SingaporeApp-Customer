import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SafeWrapper from '../../../shared/components/safeWrapper';
import Header from './components/Header';
import StallItem from './components/StallItem';
import * as Work from '../../../shared/exporter';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Axios from 'axios';
const {
  WP,
  THEME: { colors },
} = Work;

const SearchedStallsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [stalls, setStalls] = useState([]);
  const [show, setShow] = useState(false);
  const state = useSelector((state) => state?.auth);
  const latlng = useSelector((state) => state?.dashboard?.latlngData);
  const lat = useSelector((state) => state?.dashboard?.latlngData.lat);
  const lng = useSelector((state) => state?.dashboard?.latlngData.lng);
  const user = useSelector((state) => state?.auth?.user);


  console.log(lat,'........  Location');
  console.log(lng,'........  Location');


  const apiCall = async (data) => {
   // const search= route?.params?.keyword;
    console.log("api call data   " , route?.params?.keyword)
    console.log(data,"........data")
    const checkInternet = await Work.checkInternetConnection();

    try {
      if (checkInternet) {

        //const response = await Axios.post('/search', data.search, lat, lng);

        if(!user) {

          const response = await Axios.post('https://buey.shifuge.com/api/search', data);
        if (response?.status == '200')
         {
          setShow(true);
          console.log(response.data,'----- visiter search -----');
          setStalls(response?.data?.successData?.stalls);

        }
        else Work.showToast(Work.GENERAL_ERROR_MSG);

      }
        else {
          const response = await Axios.post('/searchv1', data);
          if (response?.status == '200')
           {
            setShow(true);
            console.log(response.data,'----- user search  -----');
            setStalls(response?.data?.successData?.stalls);

          }
          else Work.showToast(Work.GENERAL_ERROR_MSG);
        }



      } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    } catch (error) {
      console.log(error)
      console.log("Error is Here");
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }
  }
  console.log('search stall responce',stalls);

  const getStalls = async () => {
    if (state?.searchingArea?.latitude !== undefined && state?.searchingArea?.longitude !== undefined) {
      let data = {
        lat: state?.searchingArea?.latitude,
        lng: state?.searchingArea?.longitude,
        //lng:103.7462496,
        //lat:1.3740209,
        search: route?.params?.keyword,
      };
      apiCall(data);
    } else if (latlng.lat !== undefined && latlng.lng !== undefined) {
      let data = {
        lat: latlng.lat,
        lng: latlng.lng,
        //lng:103.7462496,
        //lat:1.3740209,
        search: route?.params?.keyword,
      };
      apiCall(data);
    }
    else {

      if(!user)
      {
        let data = {

          lng:103.7462496,
          lat:1.3740209,
          search: route?.params?.keyword,
        };
        apiCall(data);
      }
      // else
      // {
      // Work.showToast("Please Select Your Delivery Address")
      // }

      //Work.showToast("Please Select Your Delivery Address")

    }
  };

  useEffect(() => {
    getStalls();
  }, []);

  return (
    <SafeWrapper>
      <Header title={route?.params?.keyword} />

      <View style={styles.container}>
        {stalls
          ? show && (
            <FlatList
              data={stalls}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => <StallItem item={item} />}
              keyExtractor={(item) => item.id}
            />
          )
          : show && (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.titleTxtNo}>No Item Found</Text>
            </View>
          )}
      </View>
    </SafeWrapper>
  );
};

export default SearchedStallsScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
    paddingBottom: WP('30'),
  },
  titleTxtNo: {
    fontSize: scale(20),
    color: colors.primary,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
