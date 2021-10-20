import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import * as Work from '../exporter';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imageAssets from '../../assets/imageAssets';
import BtnWrapper from './btnWrapper';
import { THEME } from '../themes/colors';

const {
  WP,
  THEME: { colors },
} = Work;
const AddAddress = ({
  onPressEdit,
  onDeletePress,
  header,
  desc,
  date,
  notes,
  image,
  rightImage,
  hide,
}) => {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: 'space-between', marginHorizontal: WP('2') },
      ]}>
      <View style={[styles.container]}>
        {image}
        <View>
          <Text style={styles.header}>
            {header?.length > 12 ? header.substring(0, 8) + '...' : header}
          </Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {rightImage}
        <View style={{ marginLeft: 5 }}>
          {!hide ? (
            <BtnWrapper onPress={onDeletePress}>
              <AntDesign
                name="delete"
                size={WP('5')}
                color={THEME.colors.black}
              />
            </BtnWrapper>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: WP('4'),
    color: colors.black,
    textTransform: 'capitalize',
  },
  desc: {
    color: colors.grey,
    opacity: 0.8,
    fontSize: WP('3.6'),
    flexWrap: 'wrap',
    width: WP('60'),
  },
  txt: {
    color: colors.black,
    fontSize: WP('3.5'),
  },
});
