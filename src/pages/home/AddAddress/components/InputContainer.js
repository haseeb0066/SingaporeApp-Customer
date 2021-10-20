import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Work from '../../../../shared/exporter'
const InputContainer = (props) => {
    return (
        <View style={styles.floorInput}>
            {props.children}
        </View>
    )
}

export default React.memo(InputContainer)

const styles = StyleSheet.create({
    floorInput: {
        borderWidth: 0.5,
        borderColor: Work.THEME.colors.text,
        marginVertical: Work.WP('2'),
        borderRadius: 4
    }
})
