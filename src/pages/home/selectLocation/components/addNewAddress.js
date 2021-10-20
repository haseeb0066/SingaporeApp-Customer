import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import AddAddress from '../../../../shared/components/addAddress';
import * as Work from '../../../../shared/exporter';
import imageAssets from '../../../../assets/imageAssets';
import BottomShadow from '../../../../shared/components/SingleSidedShadowBox';
import { useNavigation } from '@react-navigation/native'
import BtnWrapper from '../../../../shared/components/btnWrapper';
const {
    WP,
    THEME: { colors },
} = Work;

const addNewAddress = () => {
    const navigation = useNavigation();
    return (
        <BottomShadow style={{ width: '100%', marginTop: WP('1') }}>
            <BtnWrapper onPress={() => navigation.navigate('AddAddress')}>
                <View style={{ paddingVertical: WP('3.5') }}>
                    <View style={[styles.selectAddressWrapper, { marginTop: WP('5') }]}>
                        <Image
                            style={{
                                marginRight: WP('3'),
                                width: WP('6'),
                                height: WP('6'),
                            }}
                            source={imageAssets.addressPlus}
                            resizeMode="contain"
                        />
                        <Text
                            style={[
                                styles.currLoc,
                                { color: colors.black, marginStart: WP('0') },
                            ]}>
                            Add new
              </Text>
                    </View>
                </View>
            </BtnWrapper>
        </BottomShadow>
    )
}

export default addNewAddress

const styles = StyleSheet.create({
    selectAddressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: WP('4'),
    },
})
