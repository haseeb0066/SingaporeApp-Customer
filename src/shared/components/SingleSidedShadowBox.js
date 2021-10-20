import React from 'react';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

const SingleSidedShadowBox = ({children, style}) => (
  <View style={[styles.container, style]}>
    <View
      style={{
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 7,
      }}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingBottom: 10,
  },
});

SingleSidedShadowBox.propTypes = {
  children: PropTypes.element,
  style: ViewPropTypes.style,
};

export default SingleSidedShadowBox;
