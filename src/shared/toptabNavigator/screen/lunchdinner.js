import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import CartButton from '../../components/cartbutton';
import Menuitem from '../../components/menuitem';
import SafeWrapper from '../../components/safeWrapper';
import * as Work from '../../exporter';
import {useNavigation} from '@react-navigation/native';

const {WP} = Work;
const Lunchdinner = () => {
  const {navigate} = useNavigation();
  const test = [1, 2, 3];
  return (
    <SafeWrapper>
      <Text style={styles.title}>LUNCH & DINNER</Text>
      <FlatList
        data={test}
        renderItem={({item}) => (
          <Menuitem
            name="Nasi lemak"
            desc="coconut flavored rice, with boiled egg, fried peanuts, anchovies and a spicy shrimp"
            img="https://ucarecdn.com/0d5c71f5-ef1c-483d-a136-7e2bfb2d081c/-/scale_crop/800x600/center/9a00132b5492c90ba84dd4c22e588ec4.jpg"
            price="10.00"
          />
        )}
      />

      <CartButton
        name="VIEW YOUR CART"
        price="$ 16.00"
        onPress={() => navigate('cartpage')}
      />
    </SafeWrapper>
  );
};

export default Lunchdinner;

const styles = StyleSheet.create({
  title: {
    fontSize: WP('5'),
    fontWeight: 'bold',
    color: Work.THEME.colors.text,
    padding: WP('3'),
  },
});
