import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from './btnWrapper';

const {
  WP,
  THEME: { colors },
} = Work;
const RestuarentOutlets = ({ name, outlets, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{name}</Text>

      <FlatList
        style={{ marginBottom: WP('5') }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={outlets}
        renderItem={({ item, index }) => (
          <BtnWrapper onPress={onPress}>
            <View style={{ alignItems: 'center' }}>
              <Image
                style={styles.logo}
                source={{
                  uri:
                    'https://thumbs.dreamstime.com/b/healthy-food-background-fruits-vegetables-cereal-nuts-superfood-dietary-balanced-vegetarian-eating-products-kitchen-143677456.jpg',
                }}
              // resizeMode='contain'
              />
              <Text style={{ paddingTop: WP('0.8') }}>{item}</Text>
            </View>
          </BtnWrapper>
        )}
        keyExtractor={(key) => key + ''}
      />
    </View>
  );
};

export default RestuarentOutlets;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
  },
  restaurantName: {
    fontSize: WP('5'),
    color: colors.darkGreen,
    paddingLeft: WP('4'),
    paddingTop: WP('1'),
    paddingBottom: WP('2')
  },
  logo: {
    width: WP('22'),
    height: WP('22'),
    marginHorizontal: WP('3'),
    borderRadius: WP('2'),
  },
});
