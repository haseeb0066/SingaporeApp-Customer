import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SafeWrapper from '../../../shared/components/safeWrapper';
import { THEME, WP } from '../../../shared/exporter';
import RestaurantCard from './components/restaurantCard';
import BottomShadow from '../../../shared/components/SingleSidedShadowBox';
import Loader from '../../../shared/components/Loader';
import * as Work from '../../../shared/exporter';
import Geolocation from 'react-native-geolocation-service';
import Axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const categoryShops = ({ navigation, route }) => {
  const [loader, setloader] = useState(false);
  const [show, setShow] = useState(false);
  const [catRestaurnats, setCatRestaurnats] = useState([]);

  const requestLocationPermission = async () => {
    try {
      const checkInernet = await Work.checkInternetConnection();
      if (checkInernet) {
        setloader(true);
        Geolocation.getCurrentPosition(async (info) => {
          const response = await Axios.post('/get_stalls_by_cat', {
            lat: info.coords.latitude,
            lng: info.coords.longitude,
            cat_id: route.params.category.id,
            // cat_id: 10
          });
          if (response?.data.status == 'success') {
            setCatRestaurnats(response?.data.successData.stalls);
            setloader(false);
            setShow(true);
          } else if (response?.data.status == 'error') {
            Work.showToast(Work.GENERAL_ERROR_MSG);
          }
        });
      } else {
        setloader(false);
        Work.showToast(Work.INTERNET_CONNECTION_ERROR);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <SafeWrapper style={styles.container}>
      <Loader visible={loader} />
      <BottomShadow style={{ height: '15%' }}>
        <View style={styles.title}>
          <Text style={styles.titleTxt}>{route.params.category.title}</Text>
        </View>
      </BottomShadow>
      <View style={styles.innerContainer}>
        {catRestaurnats.length > 0
          ? show && (
            <FlatList
              data={catRestaurnats}
              contentContainerStyle={{ marginVertical: WP('1') }}
              //   columnWrapperStyle={{justifyContent: 'space-between'}}
              //   numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => (
                <RestaurantCard navigation={navigation} stall={item} />
              )}
              keyExtractor={(key) => key + ' '}
            />
          )
          : show && (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.titleTxtNo}>
                No Stalls Found For Category
              </Text>
            </View>
          )}
      </View>
    </SafeWrapper>
  );
};

export default categoryShops;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: WP('35'),
  },
  title: {
    // alignSelf: 'center',
    // height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: WP('3'),
  },
  titleTxt: {
    fontSize: moderateScale(30),
    color: THEME.colors.black,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  titleTxtNo: {
    fontSize: scale(20),
    color: THEME.colors.primary,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

// import React, { useEffect, useState } from 'react'
// import { StyleSheet, Text, View, FlatList } from 'react-native'
// import SafeWrapper from '../../../shared/components/safeWrapper';
// import { THEME, WP } from '../../../shared/exporter';
// import RestaurantCard from './components/restaurantCard';
// import BottomShadow from '../../../shared/components/SingleSidedShadowBox'
// import Loader from '../../../shared/components/Loader'
// import * as Work from '../../../shared/exporter';
// import Geolocation from '@react-native-community/geolocation';
// import Axios from 'axios';

// const categoryShops = ({ navigation, route }) => {
//     const [loader, setloader] = useState(false)
//     const [catRestaurnats, setCatRestaurnats] = useState([])

//     const requestLocationPermission = async () => {
//         try {
//             const checkInernet = await Work.checkInternetConnection();
//             if (checkInernet) {
//                 setloader(true)
//                 Geolocation.getCurrentPosition(async (info) => {
//                     const response = await Axios.post('/get_restuarnt_by_cat', {
//                         lat: info.coords.latitude,
//                         lng: info.coords.longitude,
//                         cat_id: route.params.category.id
//                     })
//                     if (response?.data.status == 'success') {
//                         setCatRestaurnats(response?.data.successData.resturants)
//                         setloader(false)
//                     } else if (response?.data.status == 'error') {

//                     }
//                 });
//             } else {
//                 setloader(false)
//                 Work.showToast(Work.INTERNET_CONNECTION_ERROR)
//             }

//         } catch (err) {
//             console.warn(err);
//         }
//     };

//     useEffect(() => {
//         requestLocationPermission();
//     }, [])

//     return (
//         <SafeWrapper style={styles.container}>
//             <Loader visible={loader} />
//             <BottomShadow style={{ height: '15%' }} >
//                 <View style={styles.title}><Text style={styles.titleTxt}>{route.params.category.title.length > 15 ? route.params.category.title.substring(0, 10) + '...' : route.params.category.title}</Text></View>
//             </BottomShadow>
//             <View style={styles.innerContainer}>
//                 <FlatList
//                     data={catRestaurnats}
//                     contentContainerStyle={{ marginVertical: WP('1'), }}
//                     columnWrapperStyle={{ justifyContent: 'space-between' }}
//                     numColumns={2}
//                     renderItem={(item) => <RestaurantCard navigation={navigation} restaurant={item} />}
//                     keyExtractor={(key) => key + ' '}
//                     showsVerticalScrollIndicator={false}
//                 />
//             </View>
//         </SafeWrapper>
//     )
// }

// export default categoryShops

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white'
//     },
//     innerContainer: {
//         width: '90%',
//         alignSelf: 'center'
//     },
//     title: {
//         alignSelf: 'center',
//         // height: '10%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: WP('3')
//     },
//     titleTxt: {
//         fontSize: WP('9.5'),
//         color: THEME.colors.black,
//         fontWeight: 'bold'
//     }
// })
