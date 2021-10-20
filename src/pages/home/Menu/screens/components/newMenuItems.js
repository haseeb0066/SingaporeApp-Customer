import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import * as Work from '../../../../../shared/exporter';
import BtnWrapper from '../../../../../shared/components/btnWrapper';
import { useNavigation } from '@react-navigation/native';

const {
  WP,
  THEME: { colors },
} = Work;

const NewMenuItems = ({ items, restID }) => {
  useEffect(() => {
    // console.log('NewMenuItems', items);
  }, []);
  return (
    <View>
      <FlatList
        contentContainerStyle={{ paddingBottom: WP('50') }}
        data={items}
        renderItem={({ index, item }) => <ItemCard item={item} restID={restID} />}
        key={(key) => key.name}
      />
    </View>
  );
};

const ItemCard = ({ item, restID }) => {
  const navigation = useNavigation();
  return (
    <BtnWrapper
      onPress={() =>
        navigation.navigate('dishdetail', { dish: item, restID: restID })
      }>
      {item?.is_active ? (
        <View style={styles.itemCardContainer}>
          <View style={{ flex: 2 }}>
            <Image style={styles.img} source={{ uri: item.image }} />
          </View>
          <View style={{ flex: 2.7 }}>
            <Text style={styles.name}>{item.title}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
            {item?.status == 'sold_out' && (
              <Text style={styles.soldStatus}>Sold Out</Text>
            )}
          </View>
        </View>
      ) : (
        <View />
      )}
    </BtnWrapper>
  );
};

export default React.memo(NewMenuItems);

const styles = StyleSheet.create({
  img: {
    width: WP('30'),
    height: WP('30'),
  },
  itemCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: WP('4'),
    width: '90%',
    alignSelf: 'center',
  },
  name: {
    marginTop: WP('1'),
    fontSize: WP('3.9'),
    color: Work.THEME.colors.grey,
  },
  price: {
    marginTop: WP('1'),
    color: Work.THEME.colors.black,
    textAlign: 'right',
  },
  soldStatus: {
    marginTop: WP('2'),
    fontSize: WP('3.5'),
    color: Work.THEME.colors.lightGreen,
  },
});
