import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {THEME, WP} from '../../../../shared/exporter';
import BtnWrapper from '../../../../shared/components/btnWrapper';

import {useNavigation} from '@react-navigation/native';

const popularItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <BtnWrapper
      onPress={() =>
        navigation.navigate('searchsStallsScreen', {
          keyword: item?.item?.keyword,
        })
      }>
      <View style={styles.container}>
        <Text style={styles.dishName}>{item.item.keyword}</Text>
      </View>
    </BtnWrapper>
  );
};

export default React.memo(popularItem);

const styles = StyleSheet.create({
  container: {
    marginTop: WP('2'),
    borderWidth: 1,
    padding: WP('1'),
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.white,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    borderRadius: 10,
    opacity: 0.9,
  },
  dishName: {
    color: THEME.colors.white,
    fontSize: WP('4'),
    textAlign: 'center',
  },
});
