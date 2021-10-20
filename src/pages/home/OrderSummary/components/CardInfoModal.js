import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Input } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import ImagePicker from 'react-native-image-crop-picker';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { THEME } from '../../../../shared/exporter';
import * as Work from '../../../../shared/exporter';
import imageAssets from '../../../../assets/imageAssets';
import Loader from '../../../../shared/components/Loader';
import axios from 'axios';

const CardInfoModal = ({
  visible,
  setSelectImage,
  setPaymentScreenShotUrl,
  setPaymentScreenShotType,
  navigation,
}) => {
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);

  const selectImage = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setPaymentScreenShotUrl(image.path);
        setPaymentScreenShotType(image.mime);
        setSelectImage(false);
      });
    } catch (error) {
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }
  };

  const getQRImg = async () => {
    try {
      const checkInternet = await Work.checkInternetConnection();
      if (checkInternet) {
        setLoader(true);
        const response = await axios.get('getQRCode');
        if (response?.status == 200) {
          setImage(response?.data?.successData?.qrcode?.screen_shot);
          setLoader(false);
        } else {
          setLoader(false);
          Work.showToast(Work.GENERAL_ERROR_MSG);
        }
      } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    } catch (error) {
      setLoader(false);
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }
  };

  useEffect(() => {
    getQRImg();
    return () => { };
  }, []);
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => setSelectImage(false)}>
      <Loader visible={loader} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.heading}>Upload Payment Screenshot</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectImage(false);
                navigation.navigate('imageViewer', {
                  img: image,
                });
              }}>
              <Image
                source={{ uri: image }}
                style={{
                  width: scale(200),
                  height: scale(160),
                  marginBottom: scale(25),
                }}
              />
            </TouchableOpacity>
            <Text style={styles.uenTxt}>UEN: 201622529K</Text>
            <Text style={styles.uenTxt}>Shi Fu Ge Pte Ltd</Text>

            <BtnWrapper onPress={selectImage}>
              <View style={styles.doneBtn}>
                <Text style={styles.doneBtnTxt}>Upload</Text>
              </View>
            </BtnWrapper>
          </View>
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
    height: '50%',
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
    marginVertical: scale(12),
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
    width: '90%',
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
    fontWeight: 'bold',
  },
  uenTxt: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    height: scale(40),
  },
  inputStyle: {
    fontSize: scale(15),
    color: Work.THEME.colors.text,
  },
});
