import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const BtnWrapper = ({children, onPress, show = false}) => {
  return Platform.OS == 'android' ? (
    <TouchableNativeFeedback onPress={onPress} disabled={show}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  );
};

export default BtnWrapper;
