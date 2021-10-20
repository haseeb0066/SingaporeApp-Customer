import React, {useState} from 'react';
import {StyleSheet, Button, Text, View, Image, FlatList} from 'react-native';
import {color} from 'react-native-reanimated';
import Header from '../../../shared/components/header';
import SafeWrapper from '../../../shared/components/safeWrapper';
import * as Work from '../../../shared/exporter';
import PaymentButton from '../../../shared/components/paymentbutton';
import Aicon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MenuPage from '../Menu/menu';
import CartButton from '../../../shared/components/cartbutton';
import CardView from './cardview';
import {ScrollView} from 'react-native';
import LoginComponent from './logincomponent';
import BtnWrapper from '../../../shared/components/btnWrapper';
const {WP} = Work;
const CartPage = ({navigation}) => {
  const temp = [1, 2, 3, 4];
  const [counter, setCounter] = useState(1);
  return (
    <SafeWrapper>
      <ScrollView>
        {/* <Header
          onPressBack={() => navigation.goBack()}
          onPressNext={() => navigation.navigate('email')}
        /> */}
        <View style={[styles.subContainer, styles.boxshadow]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <BtnWrapper
                onPress={() => {
                  if (counter > 1) setCounter(counter - 1);
                }}>
                <Entypo
                  name="minus"
                  size={25}
                  color={Work.THEME.colors.primary}
                />
              </BtnWrapper>
              <Text style={styles.qty}>{counter}</Text>
              <BtnWrapper onPress={() => setCounter(counter + 1)}>
                <Entypo
                  name="plus"
                  size={25}
                  color={Work.THEME.colors.primary}
                />
              </BtnWrapper>
              <Text style={styles.satayTxt}>Satay</Text>
            </View>
            <Text style={styles.price}>$16.00</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: Work.THEME.colors.text,
              fontSize: WP('4.5'),
              fontWeight: 'bold',
              padding: WP('2'),
            }}>
            Popular with your order
          </Text>
        </View>
        <FlatList
          data={temp}
          renderItem={({item}) => <CardView />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(key) => key + ''}
        />

        <View style={[styles.boxshadow]}>
          <View style={styles.row}>
            <Text style={[styles.txt, {paddingLeft: WP('4')}]}>Subtotal</Text>
            <Text style={[styles.txt, {paddingRight: WP('4')}]}>$16.00</Text>
          </View>
          <View style={styles.subContainertotle}>
            <Text style={styles.textalignleft}>Delivery Fee</Text>
            <Text style={styles.textalignright}>$04.00</Text>
          </View>
        </View>
        <View style={[styles.row, styles.boxshadow]}>
          <Text
            style={[
              styles.txt,
              styles.boldtext,
              {color: 'black', paddingLeft: WP('4')},
            ]}>
            Total
            <Text style={[styles.txt]}> (incl.tax)</Text>
          </Text>
          <Text style={[styles.txt, {paddingEnd: WP('4')}]}>$20.00</Text>
        </View>
        <View style={[styles.subContainer, {marginTop: WP('4')}]}>
          <Text style={styles.textalignleft}>Delivery Address:</Text>
        </View>
        <View style={[styles.subContainertotle, {width: WP('60')}]}>
          <Text style={[styles.textalignleft]}>
            ABC Street, Flat No. xyz Singapore
          </Text>
        </View>
        <View
          style={[
            styles.hrset,
            {
              borderBottomColor: Work.THEME.colors.text,
              borderBottomWidth: 2,
            },
          ]}
        />
        <View style={styles.subContainertotle}>
          <Text style={styles.textalignleft}>Delivery Time</Text>
          <Text style={styles.textalignright}>30 Minutes</Text>
        </View>
        <View
          style={[
            styles.hrsetlow,
            {
              borderBottomColor: Work.THEME.colors.text,
              borderBottomWidth: 2,
            },
          ]}
        />
        <View style={styles.subContainertotle}>
          <Text style={styles.textalignleft}>Payment</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: Work.THEME.colors.text,
                fontSize: WP('4'),
              }}>
              Please select payment method
            </Text>
            <Entypo
              style={styles.alignvertical}
              name="arrow-long-right"
              size={WP('6')}
              color={Work.THEME.colors.primary}
            />
          </View>
        </View>
        <View
          style={[
            styles.hrsetlow,
            {
              borderBottomColor: Work.THEME.colors.text,
              borderBottomWidth: 2,
            },
          ]}
        />

        <CartButton
          onPress={() => navigation.navigate('confirmation')}
          name="Place Your Order"
          price="$ 20.00"
        />
        <LoginComponent />
      </ScrollView>
    </SafeWrapper>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  alignvertical: {
    marginLeft: WP('1'),
  },

  textalignright: {
    color: Work.THEME.colors.text,
    fontSize: WP('4'),
    textAlign: 'right',
  },

  textalignleft: {
    color: Work.THEME.colors.text,
    fontSize: WP('4'),
  },
  boxshadow: {
    elevation: 10,
    backgroundColor: Work.THEME.colors.white,
    paddingTop: WP('4'),
    paddingBottom: WP('4'),
    marginTop: WP('5'),
    marginBottom: WP('2'),
  },
  subContainer: {
    paddingRight: WP('4'),
    paddingLeft: WP('4'),
    flexDirection: 'row',
    width: '100%',
  },
  subContainertotle: {
    paddingTop: WP('4'),
    paddingRight: WP('4'),
    paddingLeft: WP('4'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainerbutton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: WP('8'),
  },
  boldtext: {
    fontWeight: 'bold',
  },
  simpletext: {
    fontWeight: '500',
  },
  textcolor: {
    color: Work.THEME.colors.text,
  },
  hrset: {
    paddingTop: WP('8'),

    flexDirection: 'row',
  },
  hrsetlow: {
    paddingTop: WP('4'),

    flexDirection: 'row',
  },
  qty: {
    fontSize: WP('5'),
    color: Work.THEME.colors.text,
    paddingHorizontal: WP('4.5'),
  },
  satayTxt: {
    fontSize: WP('5'),
    fontWeight: 'bold',
    color: Work.THEME.colors.text,
    paddingLeft: WP('6.5'),
  },
  price: {
    fontSize: WP('4.5'),
    color: Work.THEME.colors.text,
    fontWeight: '900',
  },
  txt: {
    color: Work.THEME.colors.text,
    fontSize: WP('4'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
