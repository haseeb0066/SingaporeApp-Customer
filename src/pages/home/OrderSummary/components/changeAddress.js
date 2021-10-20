import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import imageAssets from '../../../../assets/imageAssets';
import { THEME, WP } from '../../../../shared/exporter';
import BottomShadow from '../../../../shared/components/SingleSidedShadowBox';
import Address from '../../../../shared/components/addAddress';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const changeAddress = ({ deliveryAddress }) => {
  const navigation = useNavigation();
  return (
    <BottomShadow style={styles.address}>
      <BtnWrapper onPress={() => navigation.navigate('selectlocation')}>
        <View style={{ paddingVertical: WP('2') }}>
          <Address
            hide={true}
            image={
              <Image
                style={{
                  marginRight: WP('3'),
                  width: WP('8'),
                  height: WP('8'),
                }}
                source={
                  deliveryAddress?.title == 'home'
                    ? imageAssets.addressHome
                    : deliveryAddress?.title == 'work'
                      ? imageAssets.work
                      : imageAssets.addressbookMarkdark
                }
                resizeMode="contain"
              />
            }
            header={deliveryAddress?.title}
            desc={deliveryAddress?.address}
            rightImage={
              <Image
                style={{
                  marginRight: WP('2'),
                  width: WP('5'),
                  height: WP('5'),
                }}
                source={imageAssets.rightArrow}
                resizeMode="contain"
              />
            }
          />
        </View>
      </BtnWrapper>
    </BottomShadow>
  );
};

export default React.memo(changeAddress);

const styles = StyleSheet.create({});
