import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import * as Work from '../../../../shared/exporter';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import Entypo from 'react-native-vector-icons/Entypo';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const {
  WP,
  THEME: { colors },
} = Work;
const RestuarentOutlets = ({ name, outlets, onPress, imgUri, navigation }) => {
  return (
    <View style={styles.container}>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.restaurantName}>{name}</Text>
        </View>
        <View>
          <BtnWrapper onPress={() => { navigation.navigate('viewCoffeeShops', { data: outlets }) }}>
            <Text style={styles.viewAllbtn}>View All</Text>
          </BtnWrapper>
        </View>
      </View>

      <FlatList
        style={{ marginBottom: WP('5') }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={outlets}
        renderItem={({ item, index }) => (
          <RenderItem item={item} imgUri={imgUri} navigation={navigation} />
        )}
        keyExtractor={(item, key) => item.id}
      />
    </View>
  );
};

export default React.memo(RestuarentOutlets);

const RenderItem = ({ item, imgUri, navigation }) => {
  return (
    <BtnWrapper onPress={() => navigation.navigate('restaurantStall', { item: item })}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={{
            uri: item?.cover_image ? item?.cover_image : imgUri,
          }}
        // resizeMode='contain'
        />
        <View
          style={{
            width: WP('35.3'),
            // flexDirection: 'row',
            // justifyContent: 'space-between',
          }}>
          <Text
            style={{
              paddingTop: WP('0.8'),
              color: Work.THEME.colors.black,
              fontWeight: 'bold',
              fontSize: scale(11)
            }}>
            {/* {item.name?.length > 18
              ? item.name.substring(0, 18) + '...'
              : item.name} */}
            {item.name}
          </Text>
          {/* <Text style={{ paddingTop: WP('0.8'), fontSize: scale(11) }}>
            {item.id}
            <Entypo
              name="star"
              size={scale(12)}
              color={Work.THEME.colors.primary}
            />
          </Text> */}
        </View>
      </View>
    </BtnWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
  },
  restaurantName: {
    fontSize: scale(16),
    color: colors.darkGreen,
    paddingLeft: WP('4'),
    paddingTop: WP('1'),
    paddingBottom: WP('2'),
  },
  logo: {
    width: WP('36'),
    height: WP('25'),
    marginHorizontal: WP('3'),
    borderRadius: WP('2'),
  },
  viewAllbtn: {
    fontSize: scale(15),
    color: colors.darkGreen,
    paddingTop: WP('1'),
    paddingRight: WP('4'),
    paddingBottom: WP('2'),
  },
});
