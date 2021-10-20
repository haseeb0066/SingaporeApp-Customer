import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import * as Work from '../../../../../shared/exporter';
import { useNavigation } from '@react-navigation/native';
import CombMenuCard from '../../../restaurantStall/components/combMenuCard';

const {
  WP,
  THEME: { colors },
} = Work;

const ComboMenu = ({ items, restID }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ index, item }) => {
        { console.log("Item for flat list --->>> ", item); }
        return (
          <CombMenuCard
            image={item.image}
            price={item.price}
            dish={item.deal_items}
            key={item}
            comboName={item.name}
            restaurantID={restID}
            comboDealID={item.id}
            comboStall={item.stall_id}
          />
        )
      }}
      key={(key) => key.name}
    />
  );
};

export default ComboMenu;
