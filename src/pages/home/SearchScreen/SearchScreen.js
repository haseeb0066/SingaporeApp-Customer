import Axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import SafeWrapper from '../../../shared/components/safeWrapper';
import Header from './components/Header';
import * as Work from '../../../shared/exporter';
import SearchedItem from './components/searchedItem';
const SearchScreen = () => {
  const [search, setSearch] = useState([]);
  const state = useSelector((state) => state?.auth);
  const user = useSelector((state) => state?.auth?.user);

  // const makeAPICall = async (keyword) => {
  //   let data = {
  //     keyword,
  //   };
  //   const checkInternet = await Work.checkInternetConnection();
  //   try {
  //     if (checkInternet) {
  //       const response = await Axios.post('/search/keywords', data);
  //       if (response?.data) {
  //         setSearch(response.data);
  //         console.log(search,'----- search responce ------');
  //         console.log(data,'----- Keyword ------');
  //       }
  //     } else {
  //       Work.showToast(Work.INTERNET_CONNECTION_ERROR)
  //     };
  //   } catch (error) {
  //     Work.showToast(Work.GENERAL_ERROR_MSG);
  //   }
  // };

  const makeAPICall = async (keyword) => {
    let data = {
      keyword,
    };
    const checkInternet = await Work.checkInternetConnection();
    try {
      if (checkInternet) {

        if(user)
        {
          const response = await Axios.post('/search/keywords', data);
          if (response?.data) {
            setSearch(response.data);
            //console.log(search,'----- search responce ------');
            //console.log(data,'----- Keyword ------');
          }
        }
        else
        {
          const response = await Axios.post('https://buey.shifuge.com/api/search/keywords_unsession', data);
          if (response?.data) {
            setSearch(response.data);
            //console.log(search,'----- search responce ------');
            console.log(data,'----- Keyword ------');
            console.log(response.data,'unsessional !!!!');
          }
        }
        


      } else {
        Work.showToast(Work.INTERNET_CONNECTION_ERROR)
      };
    } catch (error) {
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }
  };

  const debouncingInJS = (fn, d) => {
    let timer;
    return function name(params) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(params);
      }, d);
    };
  };

  const betterFunction = debouncingInJS(makeAPICall, 300);

  return (
    <SafeWrapper>
      <Header makeAPICall={betterFunction} />
      <View>
        {search?.length ? (
          <FlatList
            data={search}
            renderItem={(item) => <SearchedItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
    </SafeWrapper>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
