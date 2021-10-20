import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Header from '../../../shared/components/secHeader';
import imageAssets from '../../../assets/imageAssets';
import BtnWrapper from '../../../shared/components/btnWrapper';
import { THEME } from '../../../shared/exporter';
import PaymentMethod from './components/paymentMethod';
import CardInfoModal from './components/CardInfoModal';
import SafeWrapper from '../../../shared/components/safeWrapper';

const AddPaymentMethod = () => {
    const navigation = useNavigation();
    const [addNewPaymentCard, setAddNewPaymentCard] = useState(false);
    return (
        <SafeWrapper >
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
                <CardInfoModal
                    visible={addNewPaymentCard}
                    closeModal={() => setAddNewPaymentCard(false)}
                />
                <Header
                    onBackPress={() => navigation.goBack()}
                    backIcon={
                        <Image
                            source={imageAssets.backwhite}
                            style={styles.img}
                        />
                    }
                    title="Payment Method"
                    rightIcon={
                        <Image
                            source={imageAssets.headerRightIcon}
                            style={styles.img}
                        />
                    }
                />
                <View style={styles.container}>
                    <View>
                        <PaymentMethod title='Cash on delivery' />
                    </View>
                    <BtnWrapper onPress={() => setAddNewPaymentCard(true)}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTxt}>Add</Text>
                        </View>
                    </BtnWrapper>
                </View>
            </KeyboardAwareScrollView>
        </SafeWrapper>
    )
}

export default AddPaymentMethod;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1
    },
    btn: {
        width: '100%',
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.colors.primary
    },
    btnTxt: {
        color: 'black',
        fontSize: scale(20),
        fontWeight: 'bold'
    },
    img: {
        width: scale(22),
        height: scale(22)
    }
})
