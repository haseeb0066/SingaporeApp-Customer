import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from './btnWrapper';
import {useNavigation} from '@react-navigation/native';

const {
  WP,
  THEME: {colors},
} = Work;

const NewMenuItems = ({header, items}) => {
  return (
    <View>
      <Text style={styles.header}>{header}</Text>
      <FlatList
        data={items}
        renderItem={({index, item}) => <ItemCard {...item} />}
        key={(key) => key.name}
      />
    </View>
  );
};

const ItemCard = ({name, price, img, onPress}) => {
  const navigation = useNavigation();
  return (
    <BtnWrapper onPress={() => navigation.navigate('restaurantdetail')}>
      <View style={styles.itemCardContainer}>
        <Image style={styles.img} source={{uri: img}} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </BtnWrapper>
  );
};

export default React.memo(NewMenuItems);

const styles = StyleSheet.create({
  header: {
    fontSize: WP('5'),
    fontWeight: 'bold',
    padding: WP('4'),
  },
  img: {
    width: WP('30'),
    height: WP('30'),
    borderRadius: 4,
    marginStart: WP('4'),
  },
  itemCardContainer: {
    flexDirection: 'row',
    marginTop: WP('4'),
  },
  name: {
    marginStart: WP('2'),
    fontSize: WP('3.9'),
  },
  price: {
    marginStart: WP('20'),
    fontWeight: 'bold',
  },
});
