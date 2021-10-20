import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialTabs from 'react-native-material-tabs';
import * as Work from '../../../shared/exporter';
import RecommendedFood from './screens/Recommended/recommended';
import DeliciousFood from './screens/Delicious/delicious';
import NewFood from './screens/NewFood/newFood';
import BtnWrapper from '../../../shared/components/btnWrapper';
import Dishes from './screens/components/newMenuItems';
import ComboMenu from './screens/components/comboMenu';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import ComboCard from '../restaurantStall/components/comboCard';

const Tab = createMaterialTopTabNavigator();
const { WP } = Work;
const ToptabNavigator = ({ cats, comb, comboDetail, restID }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [lastTab, setLastTab] = useState();

  const mainCat = useMemo(() => {
    const data = cats.map((item) => item?.title);
    comb && data.push('Deals');
    setLastTab(data.length);
    return data;
  }, [cats, comb]);
  return (
    <>
      {/* <FlatList
        // contentContainerStyle={{ flex: 1, width: '100%' }}
        style={{flex: 1}}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        // pagingEnabled
        renderItem={(item) =>
          <BtnWrapper onPress={() => {
            setCat(item.item);
          }}>
            <View style={[{ paddingHorizontal: WP('15'), height: 30 }, cat == item.item ? { borderBottomColor: 'green', borderBottomWidth: 4 } : null]}>
              <Text>{item.item}</Text>
            </View>
          </BtnWrapper>
        }
      /> */}
      {mainCat.length ? (
        <View>
          <MaterialTabs
            items={mainCat}
            selectedIndex={selectedTab}
            onChange={(index) => {
              setSelectedTab(index);
            }}
            barColor="white"
            indicatorColor="green"
            activeTextColor="black"
            inactiveTextColor="black"
            scrollable={cats?.length > 2 ? true : false}
            textStyle={{ marginBottom: moderateScale(-1), fontSize: WP('3.4') }}
          />
          {lastTab - 1 != selectedTab && (
            <Dishes items={cats[selectedTab]?.itmes} restID={restID} />
          )}
          {comboDetail !== undefined && lastTab - 1 == selectedTab && comb && (
            <ComboMenu items={comboDetail} restID={restID} />
          )}
          {comboDetail == undefined && lastTab - 1 == selectedTab && !comb && (
            <Dishes items={cats[selectedTab]?.itmes} restID={restID} />
          )}
        </View>
      ) : null}
    </>
  );
  // return (
  // < Tab.Navigator
  //     tabBarOptions={{
  //       labelStyle: {
  //         color: Work.THEME.colors.text,
  //         fontWeight: 'bold',
  //         fontSize: WP('3'),
  //         textTransform: 'none'
  //       },
  //       indicatorStyle: {
  //         backgroundColor: Work.THEME.colors.darkGreen,
  //         height: 3,
  //       },
  //     }}

  //   >
  //     <Tab.Screen
  //       name="Recommended for you"
  //       component={NewFood}
  //       listeners={{
  //         tabPress: e => {
  //           // Prevent default action
  //           console.log('event called')
  //           // e.preventDefault();
  //         },
  //       }}
  //     />
  //     <Tab.Screen
  //       name="Delicious Meal"
  //       component={NewFood}
  //       listeners={{
  //         tabPress: e => {
  //           // Prevent default action
  //           console.log('event called')
  //           // e.preventDefault();
  //         },
  //       }}
  //     />
  //     <Tab.Screen
  //       name="The ABC Food"
  //       component={NewFood}
  //       listeners={{
  //         tabPress: e => {
  //           // Prevent default action
  //           console.log('event called')
  //           // e.preventDefault();
  //         },
  //       }}
  //     />
  //   </Tab.Navigator>
  // );
};

export default React.memo(ToptabNavigator);

const styles = StyleSheet.create({});
