import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import BtnWrapper from '../../../../shared/components/btnWrapper';

const searchedItem = ({ item }) => {
  const navigation = useNavigation();
  //console.log('item send to search component........',item);
  return (
    <BtnWrapper
      onPress={() =>
        navigation.navigate('searchsStallsScreen', {
          keyword: item?.item?.keyword,
        })
      }>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.itemIcon}>
            <View>
              <EvilIcons name="search" size={scale(30)} color="grey" />
            </View>
            <Text>{item?.item?.keyword}</Text>
          </View>
          <View >
            <Feather name="arrow-up-left" size={scale(20)} color="grey" />
          </View>
        </View>
      </View>
    </BtnWrapper>
  );
};

export default searchedItem;

const styles = StyleSheet.create({
  container: {
    height: scale(45),
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
