import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Line from '../../../../shared/components/Line';

import * as Work from '../../../../shared/exporter';

const {
  WP,
  THEME: { colors },
} = Work;
const Sizes = ({ dishSizes, sizeSelected, setSizeSelected }) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{ marginTop: WP('2') }}
        data={dishSizes}
        renderItem={(item) => {
          return (
            item.item.is_active ?
              <View style={{ width: '100%', marginTop: WP('2') }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: WP('2'),
                    marginBottom: WP('1'),
                  }}>
                  <CheckBox
                    containerStyle={{ padding: 0, flex: 0.4 }}
                    size={WP('6')}
                    checked={sizeSelected == item.index ? true : false}
                    onPress={() => setSizeSelected(item.index)}
                    checkedColor={Work.THEME.colors.primary}
                  />
                  <Text style={{ flex: 2 }}>{item.item.size}</Text>
                  <Text style={{ flex: 1, textAlign: 'right' }}>
                    {item.item.prize ? '$ ' + (item.item.prize).toFixed(2) : ''}
                  </Text>
                </View>
                <Line />
              </View> : null
          );
        }}
      />
    </View>
  );
};

export default React.memo(Sizes);

const styles = StyleSheet.create({});
