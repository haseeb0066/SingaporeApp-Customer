import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as Work from '../../../shared/exporter';
import BtnWrapper from '../../../shared/components/btnWrapper';
import {Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const {WP} = Work;

const CardView = ({onPress, name}) => {
  return (
    <View style={[styles.contaier]}>
      <View style={[styles.cardview]}>
        <View style={styles.viewSetsmall}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View>
              <Text style={[styles.cardtext, {paddingTop: WP('4')}]}>
                Loh Hon Chal
              </Text>
              <Text style={[styles.cardtextsmall]}>
                (Braised Mixed Vegetables)
              </Text>
            </View>
            <Image
              style={styles.dishimage}
              source={require('../../../assets/img/100.jpeg')}
            />
          </View>
          <Text style={[styles.cardtext, {fontWeight: 'bold'}]}>$ 06.00</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Entypo name="plus" size={25} color={Work.THEME.colors.primary} />
            <Text style={[styles.addbutton]}>Add</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CardView;
const styles = StyleSheet.create({
  contaier: {
    paddingRight: WP('4'),
    paddingLeft: WP('4'),
  },
  dishimage: {
    resizeMode: 'contain',
    width: WP('18'),
    height: WP('19'),
  },
  itemtext: {
    fontSize: WP('4'),
    marginTop: WP('6'),
    marginBottom: WP('6'),
    textAlign: 'justify',
    fontWeight: 'bold',
    color: Work.THEME.colors.grey,
  },
  cardview: {
    elevation: 10,
    backgroundColor: Work.THEME.colors.white,
    borderRadius: WP('2'),
    paddingBottom: WP('4'),
    marginBottom: WP('2'),
    width: WP('70'),
    marginTop: WP('2'),
  },
  cardtext: {
    fontSize: WP('4'),
    textAlign: 'justify',
    color: Work.THEME.colors.text,
  },
  viewSetsmall: {
    paddingRight: WP('2'),
    paddingLeft: WP('2'),
  },
  cardtextsmall: {
    fontSize: WP('3'),
    textAlign: 'justify',
    color: Work.THEME.colors.grey,
  },
  addbutton: {
    fontWeight: 'bold',
    fontSize: WP('5'),
    color: Work.THEME.colors.primary,
  },
});
