import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Work from '../../shared/exporter';
import { THEME } from '../themes/colors';
import { WP } from '../themes/responsive';
import BtnWrapper from './btnWrapper';

const secHeader = ({ backIcon, rightIcon, title, onBackPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <BtnWrapper onPress={onBackPress ? onBackPress : () => console.log('go back')}>
          {backIcon}
        </BtnWrapper>
        <Text style={styles.title}>{title}</Text>
        {rightIcon}
      </View>
    </View>
  );
};

export default secHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Work.THEME.colors.primary,
    height: Work.WP('15'),
    justifyContent: 'center'
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: WP('6'),
    color: THEME.colors.text,
    fontWeight: 'bold'
  }
});
