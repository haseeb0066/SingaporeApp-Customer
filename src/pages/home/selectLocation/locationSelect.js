import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import SafeWrapper from '../../../shared/components/safeWrapper';
import Micon from 'react-native-vector-icons/MaterialIcons';
import BtnWrapper from '../../../shared/components/btnWrapper';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import AddressThumbnil from './components/addressThumbnil';
import * as Work from '../../../shared/exporter';
import imageAssets from '../../../assets/imageAssets';
import AddAddress from '../../../shared/components/addAddress';
import Aicon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/auth.action';
import Loader from '../../../shared/components/Loader';
import AddNewAddress from './components/addNewAddress';
import SearchLocation from './components/searchLocation';
import Geolocation from 'react-native-geolocation-service';
import * as authJobs from '../../../store/actions/auth.action';
import { isEmptyArray } from 'formik';
const {
  WP,
  THEME: { colors },
} = Work;

const LocationSelect = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state?.auth?.userLoader);
  const [loaderForCurrentLocation, setLoaderForCurrentLocation] = useState(
    false,
  );
  const addresses = useSelector((state) => state?.auth?.userAddress);
  useEffect(() => {
    dispatch(Jobs.getAddress());
  }, []);

  const _reverseGeocode = async (lat, lng) => {
    try {
      const checkInternet = await Work.checkInternetConnection();
      if (checkInternet) {
        setLoaderForCurrentLocation(true);

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
            let searchCheck = true;
            let addressToSend = {
              is_default: 0,
              lat,
              lng,
              address,
              title: 'Home',
              floor_or_unit: '',
              note_for_rider: '',
            };

            let findAdd = addresses.find((data) => data.address === address);

            // if (findAdd === undefined) {
            dispatch(
              authJobs.setSearchingArea(
                {
                  latitude: lat,
                  longitude: lng,
                  address,
                },
                searchCheck,
                addressToSend,
                navigation,
              ),
            );

            // }
            //   else {
            //     console.log("Else Case ,,." + findAdd.id);
            //   }
            setLoaderForCurrentLocation(false);
          });
      } else {
        Work.showToast(Work.INTERNET_CONNECTION_ERROR);
      }
    } catch (error) {
      setLoaderForCurrentLocation(false);
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }
  };

  const currentLocation = async () => {
    try {
      Geolocation.getCurrentPosition((info) => {
        _reverseGeocode(info.coords.latitude, info.coords.longitude);
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeWrapper>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Loader visible={loader} />
          <Loader visible={loaderForCurrentLocation} />
          <BottomShadow style={{ width: '100%' }}>
            <View style={{ paddingVertical: WP('5') }}>
              <BtnWrapper onPress={() => navigation.goBack()}>
                <Image
                  style={{
                    marginLeft: WP('5'),
                    width: WP('5.5'),
                    height: WP('5.5'),
                  }}
                  source={imageAssets.backArrow}
                  resizeMode="contain"
                />
              </BtnWrapper>
            </View>
          </BottomShadow>
          <BottomShadow style={{ width: '100%' }}>
            <BtnWrapper onPress={currentLocation}>
              <View style={{ paddingVertical: WP('5') }}>
                <View
                  style={[
                    styles.selectAddressWrapper,
                    { marginTop: WP('0'), justifyContent: 'space-between' },
                  ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      style={{
                        width: WP('5.5'),
                        height: WP('5.5'),
                      }}
                      source={imageAssets.addressmark}
                      resizeMode="contain"
                    />
                    <Text style={styles.currLoc}>Use my current location</Text>
                  </View>
                  <Image
                    style={{
                      marginRight: WP('3'),
                      width: WP('5.5'),
                      height: WP('5.5'),
                    }}
                    source={imageAssets.addressbookMark}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </BtnWrapper>

            <View>
              <View style={styles.selectAddressWrapper}>
                <View style={{ opacity: 0 }}>
                  <Micon name="location-on" size={WP('6')} color={'red'} />
                </View>
                <SearchLocation />
              </View>
            </View>


          </BottomShadow>
          <View style={[styles.selectAddressWrapper, styles.savedPlaces]}>
            <Text
              style={[
                styles.currLoc,
                { fontSize: WP('4.4'), marginStart: WP('3'), color: 'black' },
              ]}>
              Saved Places
            </Text>
            {/* <BtnWrapper>
              <Text style={styles.viewAll}>View All</Text>
            </BtnWrapper> */}
          </View>
          <FlatList
            data={addresses}
            renderItem={({ item, index }) => (
              <AddressThumbnil item={item} index={index} addId={item.id} />
            )}
          />
          <AddNewAddress />
          <View style={[styles.selectAddressWrapper, { marginTop: WP('5') }]}>
            <Image
              style={{
                marginRight: WP('3'),
                width: WP('7'),
                height: WP('7'),
              }}
              source={imageAssets.addressDarkMark}
              resizeMode="contain"
            />
            <View style={{ width: '85%' }}>
              <Text
                style={[
                  styles.currLoc,
                  {
                    color: colors.grey,
                    paddingTop: WP('3'),
                    marginStart: WP('0'),
                    fontSize: WP('4.8'),
                  },
                ]}>{`Can't find what you are looking for ? Add the missing places.`}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeWrapper>
  );
};

export default React.memo(LocationSelect);

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
  },
  selectedAddress: {
    color: Work.THEME.colors.black,
    fontSize: WP('5'),
    marginStart: WP('3'),
  },
  currLoc: {
    fontSize: WP('4.5'),
    marginStart: WP('2'),
    color: Work.THEME.colors.black,
  },
  viewAll: {
    color: '#00AEEF',
    fontSize: WP('4'),
    marginEnd: WP('4'),
  },
  selectAddressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: WP('4'),
  },
  savedPlaces: {
    justifyContent: 'space-between',
    marginTop: WP('0'),
    borderWidth: 1,
    borderColor: Work.THEME.colors.grey,
    backgroundColor: '#E6E7E9',
    paddingVertical: WP('5'),
    marginStart: WP('0'),
    marginTop: WP('1'),
  },
});
