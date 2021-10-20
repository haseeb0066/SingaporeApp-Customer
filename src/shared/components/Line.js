import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Work from '../../shared/exporter';

const Line = () => {
  return <View style={styles.line} />;
};

export default Line;

const styles = StyleSheet.create({
    line: {
        width: '100%',
        borderBottomWidth: 2,
        // borderColor: Work.THEME.colors.grey
        borderColor: 'lightgrey'
    }
});
