import React from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

const Loader = ({visible, closeLoader}) => {
  return (
    <Modal 
    visible={visible} 
    transparent={true} 
    onRequestClose={closeLoader}
    >
      <View style={styles.container}>
        <SkypeIndicator color="white" />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: '100%'
  },
});
