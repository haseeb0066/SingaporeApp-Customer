import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from './btnWrapper';
const {WP} = Work;
const CartButton = ({onPress, name, price}) => {
  return (
    <BtnWrapper onPress={onPress}>
      <View style={[styles.buttonView]}>
        <View style={[styles.itemwhite]}>
          <View style={[styles.textalignleft]}>
            <Image
              style={styles.back}
              source={require('../../assets/img/27.png')}
            />
          </View>
          <Text style={[styles.textaligncenter]}>{name}</Text>
          <Text style={[styles.textalignright]}>{price}</Text>
        </View>
      </View>
    </BtnWrapper>
  );
};
export default CartButton;
const styles = StyleSheet.create({
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: WP('8'),
    marginBottom: WP('8'),
  },
  back: {
    resizeMode: 'contain',
    width: WP('6'),
    height: WP('8'),
  },
  itemwhite: {
    backgroundColor: Work.THEME.colors.primary,
    paddingBottom: WP('1'),
    paddingTop: WP('1'),
    paddingLeft: WP('3'),
    paddingRight: WP('3'),
    width: WP('85'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textalignleft: {
    color: Work.THEME.colors.black,
    fontSize: WP('4'),
  },
  textaligncenter: {
    color: Work.THEME.colors.black,
    fontSize: WP('3.7'),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textalignright: {
    color: Work.THEME.colors.black,
    fontSize: WP('3.7'),
    fontWeight: 'bold',
  },
});
