import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import * as Work from '../exporter';

const SafeWrapper = ({children, style}) => {
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Work.THEME.colors.primary,
        }}></SafeAreaView>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </>
  );
};

export default SafeWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Work.THEME.colors.white,
    position: 'relative',
  },
});
