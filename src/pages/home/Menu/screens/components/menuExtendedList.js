import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeWrapper from '../../../../../shared/components/safeWrapper';
import * as Work from '../../../../../shared/exporter';
import Micon from 'react-native-vector-icons/MaterialIcons';
import MCicon from 'react-native-vector-icons/MaterialCommunityIcons';
import BtnWrapper from '../../../../../shared/components/btnWrapper';
import MenuItemActive from '../../../../../shared/components/menuItemActive';
import { FlatList } from 'react-native';
import NewMenuItems from '../../../../../shared/components/newMenuItems';

const {
  WP,
  THEME: { colors },
} = Work;
const MenuExtendedList = ({ navigation }) => {
  const temp = ['1A Heritage', 'Moo Moo Yougart', 'Shen Chang'];
  const [active, setActive] = useState(temp[0]);
  const items = [
    {
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=0.856xw:0.571xh;0.0224xw,0.296xh&resize=640:*',
      name: 'Plain Curry Chicken',
      price: 20,
    },
    {
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=0.856xw:0.571xh;0.0224xw,0.296xh&resize=640:*',
      name: 'Plain Curry Chicken',
      price: 20,
    },
    {
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=0.856xw:0.571xh;0.0224xw,0.296xh&resize=640:*',
      name: 'Plain Curry Chicken',
      price: 20,
    },
  ];

  return (
    <SafeWrapper>
      <View>
        <FlatList
          style={{ alignSelf: 'center', }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={temp}
          renderItem={({ index, item }) => (
            <MenuItemActive
              isActive={item == active}
              title={item}
              onPress={() => setActive(item)}
            />
          )}
          keyExtractor={(key) => key.toString()}
        />
      </View>
      <FlatList
        data={temp}
        renderItem={({ item, index }) => (
          <NewMenuItems header={item} items={items} />
        )}
        keyExtractor={(key) => key.toString() + ' '}
      />
    </SafeWrapper>
  );
};

export default React.memo(MenuExtendedList);

const styles = StyleSheet.create({
  name: {
    color: colors.black,
    fontSize: WP('4'),
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginEnd: WP('2'),
  },
});
