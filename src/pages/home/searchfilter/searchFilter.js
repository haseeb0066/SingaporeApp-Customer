import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import imageAssets from '../../../assets/imageAssets';
import SafeWrapper from '../../../shared/components/safeWrapper';
import {HP, THEME, WP} from '../../../shared/exporter';
import ButtomShadow from '../../../shared/components/SingleSidedShadowBox';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BtnWrapper from '../../../shared/components/btnWrapper';
import PopularItem from './components/popularItem';
import Feather from 'react-native-vector-icons/Feather';
import * as Work from '../../../shared/exporter';
import Modal from 'react-native-modal';
import {SelectMultipleGroupButton} from 'react-native-selectmultiple-button';
import Axios from 'axios';
import Loader from '../../../shared/components/Loader';

const searchFilter = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [dishNames, setDishNames] = useState();
  const [btnName, setBtnName] = useState();

  const getPopSearch = async () => {
    setVisible(true);
    const checkInternet = await Work.checkInternetConnection();
    try {
      if (checkInternet) {
        const response = await Axios.get('/popular_keywords', {});
        console.log(response?.data);
        if (response?.data) {
          console.log(response.data);
          const btn = response.data.map((data) => {
            return {value: data?.keyword};
          });
          setBtnName(btn);
          setDishNames(response.data);
          setVisible(false);
        }
      } else {
        Work.showToast(Work.INTERNET_CONNECTION_ERROR);
        setVisible(false);
      }
    } catch (error) {
      setVisible(false);
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }
  };
  useEffect(() => {
    getPopSearch();
  }, []);

  return (
    <SafeWrapper style={styles.container}>
      <Loader visible={visible} />
      <Modal
        isVisible={show}
        onBackdropPress={() => setShow(false)}
        swipeDirection="left">
        <View style={styles.mainContainer}>
          <Text style={styles.txtChk}>Choose Item</Text>

          <View style={styles.btnContainer}>
            <FlatList
              contentContainerStyle={{
                marginTop: WP('2'),
                marginHorizontal: WP('5'),
              }}
              data={dishNames}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              keyExtractor={(index, item) => index + ' ' + item}
              renderItem={(item) => (
                <BtnWrapper
                  onPress={() => {
                    setShow(false);
                    navigation.navigate('searchsStallsScreen', {
                      keyword: item?.item?.keyword,
                    });
                  }}>
                  <View style={styles.container1}>
                    <Text style={styles.dishName}>{item.item.keyword}</Text>
                  </View>
                </BtnWrapper>
              )}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <BtnWrapper onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={imageAssets.backArrow}
          />
        </BtnWrapper>
        <BtnWrapper>
          <View
            style={{
              width: WP('6'),
              height: WP('6'),
              borderRadius: WP('0.4'),
              backgroundColor: '#F7D10F',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: WP('3'),
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="info" size={WP('4.5')} color="#F7D10F" />
            </View>
          </View>
          {/* <Image style={styles.img} source={imageAssets.backArrow} /> */}
        </BtnWrapper>
      </View>
      <ButtomShadow>
        <View style={styles.searchFilterContainer}>
          <BtnWrapper>
            <Feather
              name="search"
              size={WP('6.5')}
              color={THEME.colors.primary}
            />
            {/* <Image style={styles.img} source={imageAssets.search} /> */}
          </BtnWrapper>
          <View style={{flex: 5, paddingHorizontal: WP('2')}}>
            <TextInput
              style={{padding: 0}}
              placeholder="What are you craving for ?"
              placeholderTextColor={THEME.colors.text}
              onChangeText={(t) => console.log(t)}
            />
          </View>
          <BtnWrapper onPress={() => setShow(true)}>
            <Image style={styles.img} source={imageAssets.settings} />
          </BtnWrapper>
        </View>
      </ButtomShadow>
      {dishNames !== undefined && (
        <View style={styles.popularSec}>
          <Text style={styles.popularSecTxt}>Popular Searches</Text>
          <FlatList
            contentContainerStyle={{marginTop: WP('2')}}
            data={dishNames}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={(index, item) => index + ' ' + item}
            renderItem={(item) => <PopularItem item={item} />}
          />
        </View>
      )}
    </SafeWrapper>
  );
};

export default searchFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
  },
  container1: {
    marginTop: WP('2'),
    borderWidth: 1,
    padding: WP('1'),
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.white,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    borderRadius: 10,
    opacity: 0.9,
  },
  dishName: {
    color: THEME.colors.white,
    fontSize: WP('4'),
    textAlign: 'center',
  },
  header: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: WP('4.5'),
  },
  img: {
    width: WP('6'),
    height: WP('6'),
  },
  searchFilterContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    height: HP('6.5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtChk: {
    color: THEME.colors.primary,
    fontSize: WP(6),
    marginTop: WP(3),
    textAlign: 'center',
    marginHorizontal: WP('5'),
    fontWeight: 'bold',
  },
  txtChk1: {
    color: THEME.colors.primary,
    fontSize: WP(5),
    textAlign: 'center',
    marginHorizontal: WP('5'),
    fontWeight: 'bold',
  },
  btnContainer: {
    height: HP('35'),
    flexDirection: 'column',
  },
  mainContainer: {
    marginVertical: WP(10),
    paddingBottom: WP('5'),
    paddingTop: WP('2'),
    height: HP('35'),
    borderRadius: WP(1),
    shadowRadius: WP(50),
    backgroundColor: THEME.colors.white,
    marginHorizontal: WP(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  popularSec: {
    marginTop: WP('4'),
    width: '80%',
    alignSelf: 'center',
  },
  popularSecTxt: {
    fontWeight: 'bold',
    color: THEME.colors.black,
    fontSize: WP('5'),
  },
});
