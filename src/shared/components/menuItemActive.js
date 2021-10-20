import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../exporter';
import BtnWrapper from './btnWrapper';

const {
  WP,
  THEME: {colors},
} = Work;
const MenuItemActive = ({isActive, title, onPress}) => {
  return (
    <BtnWrapper onPress={onPress}>
      <View style={styles.container}>
        <Text
          style={[
            styles.txt,
            {
              color: isActive ? colors.lightGreen : colors.black,
              fontWeight: isActive ? 'bold' : 'normal',
            },
          ]}>
          {title}
        </Text>
        {isActive && <View style={styles.horizontal}></View>}
      </View>
    </BtnWrapper>
  );
};

export default MenuItemActive;

const styles = StyleSheet.create({
  txt: {
    fontSize: WP('4'),
    padding: WP('2'),
  },
  horizontal: {
    borderColor: colors.lightGreen,
    borderWidth: 2,
  },
  container: {
    marginHorizontal: WP('2'),
  },
});
