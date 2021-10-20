import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import * as Work from '../../../../../shared/exporter';
import BtnWrapper from '../../../../../shared/components/btnWrapper';
const {WP} = Work;

const MenuList = ({onPress, name}) => {
  return (
    <BtnWrapper onPress={onPress}>
      <View style={[styles.itemwhite]}>
        <Text style={[styles.itemtext]}>{name}</Text>
      </View>
    </BtnWrapper>
  );
};
export default React.memo(MenuList);
const styles = StyleSheet.create({
  itemwhite: {
    elevation: 6,
    marginTop: WP('8'),
    backgroundColor: Work.THEME.colors.white,
    padding: WP('5'),
    width: WP('100'),
    marginBottom: WP('2'),
  },
  itemtext: {
    fontSize: WP('4'),
    textAlign: 'justify',
    fontWeight: 'bold',
    color: Work.THEME.colors.grey,
  },
});
