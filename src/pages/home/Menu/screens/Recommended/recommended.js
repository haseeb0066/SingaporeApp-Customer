import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import NewMenuItems from '../components/newMenuItems';

const Recommended = () => {
    const temp = ['1A Heritage', 'Moo Moo Yougart', 'Shen Chang'];
  const items = [
    {
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=0.856xw:0.571xh;0.0224xw,0.296xh&resize=640:*',
      name: 'Plain Curry Chicken',
      price: '$ 20',
    },
    {
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=0.856xw:0.571xh;0.0224xw,0.296xh&resize=640:*',
      name: 'Plain Curry Chicken',
      price: '$ 20',
    },
    {
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=0.856xw:0.571xh;0.0224xw,0.296xh&resize=640:*',
      name: 'Plain Curry Chicken',
      price: '$ 20',
    },
  ];
  return (
    <View style={{backgroundColor: 'white',}}>
      <FlatList
        data={temp}
        renderItem={({item, index}) => (
          <NewMenuItems items={items} />
        )}
        keyExtractor={(key) => key.toString() + ' '}
      />
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({});
