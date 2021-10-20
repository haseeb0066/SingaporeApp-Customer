import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { WP } from '../../../../shared/exporter';

const Loader = ({ visible, closeLoader }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={closeLoader}
        >
            <View style={styles.container}>
                <View
                    style={styles.innerContainer}
                >
                    <Text>Add Address</Text>
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        width: '90%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: WP('2'),
        // justifyContent: 'center',
        alignItems: 'center'
    }
});
