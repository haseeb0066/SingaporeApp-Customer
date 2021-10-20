import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BtnWrapper from '../../../../shared/components/btnWrapper'
import BottomShadow from '../../../../shared/components/SingleSidedShadowBox';
import * as Work from '../../../../shared/exporter';
import { useNavigation } from '@react-navigation/native'

const Item = ({ title, navigateTo }) => {
    const navigation = useNavigation();
    return (
        <BottomShadow>
            <BtnWrapper onPress={()=>navigation.navigate(navigateTo)}>
                <View style={styles.listItem}>
                    <Text style={styles.itemTxt}>{title}</Text>
                </View>
            </BtnWrapper>
        </BottomShadow>
    )
}

export default React.memo(Item)

const styles = StyleSheet.create({

    listItem: {
        height: Work.WP('12'),
        justifyContent: 'center',
        marginBottom: Work.WP('2')
    },
    itemTxt: {
        marginLeft: Work.WP('8'),
        color: Work.THEME.colors.black
    }
})
