import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import * as Work from '../../../../shared/exporter';
const SaveBtn = ({ onPress, text = 'Save & Continue' }) => {
  return (
    <BtnWrapper onPress={onPress}>
      <View style={styles.saveBtn}>
        <Text style={styles.saveBtnTxt}>{text}</Text>
      </View>
    </BtnWrapper>
  );
};

export default React.memo(SaveBtn);

const styles = StyleSheet.create({
  saveBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Work.THEME.colors.primary,
    height: Work.WP('12'),
    marginBottom: Work.WP('2'),
  },
  saveBtnTxt: {
    color: Work.THEME.colors.black,
    fontWeight: 'bold',
    fontSize: Work.WP('6'),
  },
});
