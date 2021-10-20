import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, BackHandler} from 'react-native';
import BtnWrapper from '../../../shared/components/btnWrapper';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';

const {WP} = Work;
const Confirmation = ({navigation, route}) => {
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('dashboard');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeWrapper style={styles.container}>
      <View style={styles.tyContainer}>
        <Text style={styles.tyTxt}>Thank You</Text>
      </View>
      <View style={{marginTop: WP('14')}}>
        <Text style={styles.orderPlace}>YOUR ORDER</Text>
        <Text style={styles.orderPlace}>HAS BEEN PLACED</Text>
      </View>
      <Image
        source={require('../../../assets/img/logo.png')}
        style={styles.img}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <BtnWrapper
          onPress={() =>
            navigation.navigate('trackorder', {order_ID: route.params.order_ID})
          }>
          <Text style={styles.track}>Track your order</Text>
        </BtnWrapper>
      </View>
    </SafeWrapper>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Work.THEME.colors.primary,
  },
  tyContainer: {
    backgroundColor: Work.THEME.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: WP('10'),
  },
  tyTxt: {
    fontSize: WP('11'),
    fontWeight: 'bold',
    color: Work.THEME.colors.darkGreen,
    padding: WP('3'),
    paddingHorizontal: WP('18'),
    paddingVertical: WP('3'),
  },
  orderPlace: {
    fontSize: WP('7'),
    fontWeight: 'bold',
    color: Work.THEME.colors.darkGreen,
    textAlign: 'center',
  },
  img: {
    width: WP('50'),
    height: WP('50'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: WP('15'),
  },
  track: {
    fontSize: WP('4.7'),
    color: Work.THEME.colors.darkGreen,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingBottom: WP('15'),
  },
});
