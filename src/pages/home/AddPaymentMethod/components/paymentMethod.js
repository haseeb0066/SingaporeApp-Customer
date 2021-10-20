import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CheckBox } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import * as Work from '../../../../shared/exporter'
const PaymentMethod = ({ title }) => {
    return (
        <View style={styles.container}>
            <CheckBox
                containerStyle={{ padding: 0, }}
                size={scale(20)}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={true}
                // onPress={onPress}
                checkedColor={Work.THEME.colors.primary}
            />
            <Text>{title}</Text>
        </View>
    )
}

export default React.memo(PaymentMethod);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(35),
        width: '90%',
        alignSelf: 'center'
    }
})
