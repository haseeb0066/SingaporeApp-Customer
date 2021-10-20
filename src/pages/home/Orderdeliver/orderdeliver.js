import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SafeWrapper from '../../../shared/components/safeWrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Work from '../../../shared/exporter';
const {WP} = Work;
const OrderDeliver = ({navigation, onPressBack}) => {
  return (
    <SafeWrapper>
      <View style={styles.container}>
        <View style={styles.headerright}>
          <BtnWrapper>
            <View
              style={{
                width: WP('6'),
                height: WP('6'),
                borderRadius: WP('0.4'),
                backgroundColor: '#F7D10F',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: WP('3'),
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="info" size={WP('4.5')} color="#F7D10F" />
              </View>
            </View>
            {/* <Image style={styles.img} source={imageAssets.backArrow} /> */}
          </BtnWrapper>
        </View>
        <View>
          <Text style={[styles.headertext]}>Order</Text>
          <Text style={[styles.headertext, {marginTop: 0}]}>Delivered</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            style={[styles.tickcenter]}
            source={require('../../../assets/img/90.png')}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.downlink]}>Enjoy the meal</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Work.THEME.colors.primary,
            width: '100%'
          }}>
          <Image
            style={[styles.logosetup]}
            source={require('../../../assets/img/01.png')}
          />
        </View>
      </View>
    </SafeWrapper>
  );
};
export default OrderDeliver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // marginRight: WP('5'),
    // marginLeft: WP('5'),
  },
  headerright: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    paddingTop: WP('3'),
    marginTop: WP('2'),
    width: '95%'
  },
  backEnd: {
    resizeMode: 'contain',
    width: WP('8'),
    height: WP('8'),
  },
  tickcenter: {
    resizeMode: 'contain',
    width: WP('30'),
    height: WP('30'),
    marginTop: WP('5'),
    marginBottom: WP('15'),
  },
  headertext: {
    alignSelf: 'center',
    marginTop: WP('10'),
    textAlign: 'center',
    fontSize: WP('10'),
    color: Work.THEME.colors.darkGreen,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  downlink: {
    textAlign: 'center',
    fontSize: WP('8'),
    marginBottom: WP('20'),
    color: Work.THEME.colors.primary,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
  logosetup: {
    resizeMode: 'contain',
    width: WP('30'),
    height: WP('30'),
    // marginEnd: WP('4'),
    // marginBottom: WP('7'),
    marginTop: WP('7'),
  },
});
