import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import BottomShadow from '../../../../shared/components/SingleSidedShadowBox';
import * as Work from '../../../../shared/exporter';
import Line from '../../../../shared/components/Line';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import CardInfoModal from './CardInfoModal';

const paymentMethod = ({
  setPaymentScreenShotUrl,
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setPaymentScreenShotType
}) => {
  const [selectImage, setSelectImage] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CardInfoModal
        visible={selectImage}
        setSelectImage={setSelectImage}
        setPaymentScreenShotUrl={setPaymentScreenShotUrl}
        setPaymentScreenShotType={setPaymentScreenShotType}
        navigation={navigation}
      />
      <BottomShadow>
        <>
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.heading}>Payment Methods</Text>
              <FlatList
                data={paymentMethods}
                renderItem={(item) => (
                  <DeliveryMethodItem
                    item={item}
                    title={item.item.title}
                    setSelectImage={setSelectImage}
                    paymentMethods={paymentMethods}
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            {/* <BtnWrapper onPress={() => navigation.navigate('paymentMethod')}>
                            <View style={{ width: '50%', marginBottom: scale(5) }}>
                                <Text style={[styles.heading, { fontSize: scale(15), marginBottom: scale(5) }]}>+ Payment Methods</Text>
                            </View>
                        </BtnWrapper> */}
          </View>
        </>
      </BottomShadow>
    </View>
  );
};

export default React.memo(paymentMethod);

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    //borderWidth:2
  },
  innerContainer: {
    height: '100%',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#21A9E8',
  },
});

const DeliveryMethodItem = ({
  item,
  title,
  setSelectImage,
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
  const [selected, setSelected] = useState(false);

  const onPress = () => {
    item.item.name == 'paynow' && setSelectImage(true);
    setSelectedPaymentMethod(item.item);
  };

  useEffect(() => {
    if (item.item.id == selectedPaymentMethod.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedPaymentMethod]);

  return (
    <>
      <View
        style={{flexDirection: 'row', alignItems: 'center', height: scale(35)}}>
        <CheckBox
          containerStyle={{padding: 0}}
          size={scale(20)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={selected}
          onPress={onPress}
          checkedColor={Work.THEME.colors.primary}
        />
        <Text>{title}</Text>
      </View>
      <View style={{width: '100%'}}>
        <View style={{width: '90%', alignSelf: 'flex-end'}}>
          <Line />
        </View>
      </View>
    </>
  );
};
