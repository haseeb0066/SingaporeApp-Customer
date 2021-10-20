import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Alert, View } from 'react-native';
import AddAddress from '../../../../shared/components/addAddress';
import * as Work from '../../../../shared/exporter';
import imageAssets from '../../../../assets/imageAssets';
import BottomShadow from '../../../../shared/components/SingleSidedShadowBox';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../../store/actions/auth.action';
import * as cartJobs from '../../../../store/actions/cart.action';
const {
  WP,
  THEME: { colors },
} = Work;
import {
  checkInternetConnection,
  GENERAL_ERROR_MSG,
  INTERNET_CONNECTION_ERROR,
  showToast,
} from '../../../../shared/exporter';
import Axios from 'axios';
import { set } from 'lodash';

const AddressThumbnil = ({ item, index, addId, }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addresses = useSelector((state) => state?.auth?.userAddress);
  const selectedID = useSelector((state) => state?.auth?.addID);
  const address = useSelector((state) => state?.auth?.add);
  const deleteAddress = async () => {
    const checkConnection = await checkInternetConnection();
    if (checkConnection) {
      try {
        const response = await Axios.get(`/delete_address/${addId}`, {});
        if (response?.data?.status == 'success') {
          if (Object.entries(addresses).length == 1) {
            dispatch(Jobs.getAddress());
            dispatch(Jobs.resetState());
          } else if (addId !== selectedID) {
            dispatch(Jobs.getAddress());
          } else {
            dispatch(Jobs.resetState());
            dispatch(Jobs.delAdd());
            dispatch(Jobs.getAddress());
          }
        } else {
          showToast(GENERAL_ERROR_MSG);
        }
      } catch (error) {
        showToast(GENERAL_ERROR_MSG);
      }
    } else {
      showToast(INTERNET_CONNECTION_ERROR);
    }
  };
  const selectDefaultAddress = () => {
    if (selectedID === null) {
      dispatch(cartJobs.clearCart());
      dispatch(Jobs.saveAddID(addId));
      navigation.navigate('dashboard');
      return;
    }
    if (addId === selectedID) {
      navigation.navigate('dashboard');
      return;
    }
    Alert.alert(
      "Alert",
      "This location is not in our region. Your cart will be refreshed.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            dispatch(cartJobs.clearCart());
            dispatch(Jobs.saveAddID(addId));
            navigation.navigate('dashboard');
          }
        }
      ]
    );
  };

  return (
    <BottomShadow style={{ width: '100%', marginTop: WP('1.5') }}>
      <BtnWrapper onPress={selectDefaultAddress}>
        <View style={{ paddingVertical: WP('3') }}>
          <AddAddress
            onDeletePress={deleteAddress}
            image={
              <Image
                style={{
                  marginRight: WP('3'),
                  width: WP('8'),
                  height: WP('8'),
                }}
                source={
                  item.title == 'home'
                    ? imageAssets.addressHome
                    : item.title == 'work'
                      ? imageAssets.work
                      : imageAssets.addressbookMarkdark
                }
                resizeMode="contain"
              />
            }
            header={item.title}
            desc={item.address}
            rightImage={
              <BtnWrapper
                onPress={() =>
                  navigation.navigate('AddAddress', { id: addId, addInfo: item })
                }>
                <Image
                  style={{
                    marginRight: WP('2'),
                    width: WP('5'),
                    height: WP('5'),
                  }}
                  source={imageAssets.addressPen}
                  resizeMode="contain"
                />
              </BtnWrapper>
            }
          />
        </View>
      </BtnWrapper>
    </BottomShadow >
  );
};

export default React.memo(AddressThumbnil);

const styles = StyleSheet.create({
  item: {
    paddingVertical: WP('3'),
  },
});
