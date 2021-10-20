import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as Work from '../exporter';
import Lunchdinner from './screen/lunchdinner';
import Hotdeals from './screen/hotdeals';
import Sides from './screen/sides';
import { THEME } from '../themes/colors';

const Tab = createMaterialTopTabNavigator();
const {WP} = Work;
const ToptabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          color: Work.THEME.colors.text,
          fontWeight: 'bold',
          fontSize: WP('3'),
          // color: THEME.colors.primary
        },
        
        scrollEnabled: true,
        indicatorStyle: {
          backgroundColor: Work.THEME.colors.primary,
          height: 6,
        },
      }}>
      <Tab.Screen name="Limited time hot deals" component={Hotdeals} />
      <Tab.Screen name="Lunch & dinner" component={Lunchdinner} />
      <Tab.Screen name="Sides" component={Sides} />
    </Tab.Navigator>
  );
};

export default ToptabNavigator;
const Compo = () => (
  <View>
    <Text>HI</Text>
  </View>
);

const styles = StyleSheet.create({});
