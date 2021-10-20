import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import TopbarNavigation from './TopbarNavigation';
import Header from './components/Header';
import CartBtn from '../../../shared/components/cartBtn';
import Loader from '../../../shared/components/Loader';

const {
  WP,
  THEME: { colors },
} = Work;
const MenuPage = ({ navigation, route }) => {
  const auth = useSelector((state) => state?.auth?.searchingArea);
  const latlng = useSelector((state) => state?.dashboard?.latlngData);
  const [loader, setLoader] = useState(false);
  const [stallDetail, setStallDetail] = useState(null);
  const [comboStalls, setComboStalls] = useState();
  const [combShow, setCombShow] = useState(false);
  const user = useSelector((state) => state?.auth?.user);


  // const apiCall = async (data) => {
  //   const response = await axios.post(`/stall_detail`, data);
  //   const res = await axios.get(
  //     `/get_stall_deals/${data.id}`,
  //     {},
  //   );
  //   if (response?.data) {
  //     if (response.data.status == 'success') {
  //       setStallDetail(response.data.successData);
  //       if (res?.data?.data.length > 0) {
  //         setCombShow(true);
  //         setComboStalls(res?.data?.data);
  //         console.log("Combo Data >>>>>>>> " + res?.data?.data);
  //       }
  //       setLoader(false);
  //     } else if (response.data.status == 'error') {
  //       Work.showToast(response.data.errorMessage);
  //       setLoader(false);
  //     }
  //     setLoader(false);
  //   } else {
  //     Work.showToast(Work.GENERAL_ERROR_MSG);
  //     setLoader(false);
  //   }
  // }

  const apiCall = async (data) => {

    if(user)
    {
      const response = await axios.post(`/stall_detail`, data);
      const res = await axios.get(`/get_stall_deals/${data.id}`,{},);
      if (response?.data) {
        if (response.data.status == 'success') {
          setStallDetail(response.data.successData);
          if (res?.data?.data.length > 0) {
            setCombShow(true);
            setComboStalls(res?.data?.data);
            console.log("Combo Data >>>>>>>> " + res?.data?.data);
          }
          setLoader(false);
        } else if (response.data.status == 'error') {
          Work.showToast(response.data.errorMessage);
          setLoader(false);
        }
        setLoader(false);
      } else {
        Work.showToast(Work.GENERAL_ERROR_MSG);
        setLoader(false);
      }

    }
    else
    {
      //console.log(data.id,'..... param id .....');

      const response = await axios.post(`https://buey.shifuge.com/api/stall_detail_unsession`, data);
      console.log(data,'..... stall post data .....');
      const res = await axios.get(`https://buey.shifuge.com/api/get_stall_deals_unsession/${data.id}`,{},);
      try{
        if (response?.data) {
          if (response.data.status == 'success') {
            console.log('working');
            setStallDetail(response.data.successData);
            if (res?.data?.data.length > 0) {
              setCombShow(true);
              setComboStalls(res?.data?.data);
              console.log("Combo Data menu...." + res?.data?.data);
            }
            setLoader(false);
          } else if (response.data.status == 'error') {
            Work.showToast(response.data.errorMessage);
            setLoader(false);
          }
          setLoader(false);
        } else {
          Work.showToast(Work.GENERAL_ERROR_MSG);
          setLoader(false);
        }
      }
      catch(error){
        console.log(error.message,'..... error ....');
        throw error;
      }



    }
    
  }



  const getStallDetail = async () => {
    const checkInternet = await Work.checkInternetConnection();
    if (checkInternet) {
      try {
        setLoader(true);
        if (auth.latitude !== undefined && auth.longitude !== undefined) {
          const data = {
            id: route?.params?.item?.id,
            lat: auth.latitude,
            lng: auth.longitude,
          };
          apiCall(data);

        } else if (latlng.lat !== undefined && latlng.lng !== undefined) {
          const data = {
            id: route?.params?.item?.id,
            lat: latlng.lat,
            lng: latlng.lng,
          };
          apiCall(data);
        } else {
          
          setLoader(false);
          if(!user)
          {
          console.log("Inside Else Case");
          const data = {
            id: route?.params?.item?.id,
            //lat: latlng.lat,
            //lng: latlng.lng,
            lat: 1.3521,
            lng: 103.8198,
          };
          apiCall(data);
          }
          else{
          Work.showToast("Please Select Your Delivery Address");
           }
      }
      } catch (error) {
        setLoader(false);
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };

  useEffect(() => {
    getStallDetail();
  }, []);

  return (
    <SafeWrapper style={{ flex: 2 }}>
      <Loader visible={loader} />

      <Header
        navigation={navigation}
        stallDetail={route.params.item}
        stall={stallDetail}
      />

      <View style={{ flex: 1, }}>
        {stallDetail && comboStalls ? (
          <TopbarNavigation
            cats={stallDetail.stall_cats}
            comb={combShow}
            comboDetail={comboStalls}
            restID={route.params.restauID}
          />
        ) : stallDetail ? (
          <TopbarNavigation
            cats={stallDetail.stall_cats}
            comb={combShow}
            restID={route.params.restauID}
          />
        ) : null}
        <CartBtn navigation={navigation} />
      </View>
    </SafeWrapper>
  );
};
export default React.memo(MenuPage);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: WP('60'),
  },
  restuarantName: {
    fontSize: WP('5'),
    fontWeight: 'bold',
    color: colors.black,
    paddingStart: WP('3'),
    paddingTop: WP('2'),
  },
  topPickTxt: {
    fontSize: WP('5'),
    fontWeight: 'bold',
    paddingStart: WP('3'),
    paddingTop: WP('4'),
    marginBottom: WP('4'),
  },
  smTxt: {
    fontSize: WP('3'),
    marginLeft: WP('1'),
    color: colors.grey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: WP('1'),
  },
});
