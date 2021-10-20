import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

import imageAssets from '../../../../assets/imageAssets';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import * as Work from '../../../../shared/exporter';
import { useNavigation } from '@react-navigation/native'
const BackButton = () => {
    const navigation = useNavigation();
    return (
        <View style={{ position: 'absolute', top: Work.WP('4'), left: Work.WP('8') }}>
            <BtnWrapper onPress={() => navigation.goBack()}>
                <Image
                    source={imageAssets.backArrow}
                    resizeMode='contain'
                    style={{ width: Work.WP('5.8'), height: Work.WP('5.8') }}
                />
            </BtnWrapper>
        </View>
    )
}

export default React.memo(BackButton)

const styles = StyleSheet.create({})
