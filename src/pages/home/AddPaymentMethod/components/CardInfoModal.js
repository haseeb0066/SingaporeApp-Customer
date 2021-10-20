import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { FastField, Formik } from 'formik';
import * as Yup from 'yup';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { THEME } from '../../../../shared/exporter';
import * as Work from '../../../../shared/exporter';

const CardInfoModal = ({ visible, closeModal }) => {

    const AddCardForPayments = () => {
        closeModal();
    }



    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={closeModal}
        >
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Formik
                        initialValues={{ cardNumber: '', cvc: null, zipCode: null, expireMonth: null, expireYear: null }}
                        validationSchema={Yup.object({
                            cardNumber: Yup.string()
                                // .test('test-number', // this is used internally by yup
                                //     'Credit Card number is invalid', //validation message
                                //     value => valid.number(value).isValid) // return true false based on validation
                                .required("*Required"),
                            cvc: Yup.number().required('required').min(3),
                            zipCode: Yup.number().required('*Required'),
                            expireMonth: Yup.date().required('*Required'),
                            // expireYear: Yup.required('required'),
                        })}
                        onSubmit={(values) => {
                            // console.log(values);
                            // submit(values);
                        }}>
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            touched,
                            errors,
                        }) => (
                            <View style={styles.innerContainer}>
                                <Text style={styles.heading}>Add a Credit or Debit Card</Text>
                                <View style={styles.cardNumber}>
                                    <Input
                                        value={values.cardNumber}
                                        containerStyle={styles.inputContainer}
                                        inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
                                        inputStyle={styles.inputStyle}
                                        errorMessage={
                                            errors.cardNumber && touched.cardNumber ? errors.cardNumber : null
                                        }
                                        errorStyle={{ margin: scale(-5)}}
                                        placeholder='Card Number'
                                        style={{ padding: 0 }}
                                    />
                                </View>
                                <View style={styles.numInputWrapper}>
                                    <View style={styles.numInput}>
                                        <Input
                                            value={values.cvc}
                                            containerStyle={styles.inputContainer}
                                            inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
                                            inputStyle={styles.inputStyle}
                                            errorMessage={
                                                errors.cardNumber && touched.cardNumber ? errors.cardNumber : null
                                            }
                                            errorStyle={{ margin: scale(-5)}}
                                            placeholder='CVC'
                                            style={{ padding: 0 }}
                                        />
                                    </View>
                                    <View style={styles.numInput}>
                                        <Input
                                            value={values.zipCode}
                                            containerStyle={styles.inputContainer}
                                            inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
                                            inputStyle={styles.inputStyle}
                                            errorMessage={
                                                errors.cardNumber && touched.cardNumber ? errors.cardNumber : null
                                            }
                                            errorStyle={{ margin: scale(-5)}}
                                            placeholder='Zip Code'
                                            style={{ padding: 0 }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.numInputWrapper}>
                                    <View style={styles.numInput}>
                                        <Input
                                            value={values.expireMonth}
                                            containerStyle={styles.inputContainer}
                                            inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
                                            inputStyle={styles.inputStyle}
                                            errorMessage={
                                                errors.cardNumber && touched.cardNumber ? errors.cardNumber : null
                                            }
                                            errorStyle={{ margin: scale(-5)}}
                                            placeholder='Expire Date'
                                            style={{ padding: 0 }}
                                        />
                                    </View>
                                    {/* <View style={styles.numInput}>
                                        <Input
                                            value={values.expireYear}
                                            containerStyle={styles.inputContainer}
                                            inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
                                            inputStyle={styles.inputStyle}
                                            placeholder='Expire Year'
                                            style={{ padding: 0 }}
                                        />
                                    </View> */}
                                </View>
                                <BtnWrapper onPress={handleSubmit}>
                                    <View style={styles.doneBtn}>
                                        <Text style={styles.doneBtnTxt}>Done</Text>
                                    </View>
                                </BtnWrapper>
                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
};

export default CardInfoModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '100%',
        justifyContent: 'flex-end',
    },
    innerContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    heading: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#69CFF5',
        marginVertical: scale(12)
    },
    cardNumber: {
        width: '90%',
        height: scale(40),
        justifyContent: 'center',
        padding: scale(4),
        borderWidth: 1,
        borderColor: '#BCBDC0',
        marginVertical: scale(5),
    },
    numInputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    numInput: {
        width: '48%',
        height: scale(40),
        justifyContent: 'center',
        padding: scale(4),
        borderWidth: 1,
        borderColor: '#BCBDC0',
        marginVertical: scale(10),
    },
    doneBtn: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(40),
        backgroundColor: THEME.colors.primary,
        marginBottom: scale(10),
        marginTop: scale(5),
    },
    doneBtnTxt: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    inputContainer: {
        height: scale(40),
    },
    inputStyle: {
        fontSize: scale(15),
        color: Work.THEME.colors.text,
    },
});
