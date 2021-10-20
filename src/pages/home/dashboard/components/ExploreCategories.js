import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import * as Work from '../../../../shared/exporter';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const {
  WP,
  THEME: { colors },
} = Work;
const RestuarentOutlets = ({ name, imgUri, cats, navigation }) => {
  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.restaurantName}>{name}</Text>
        </View>
        <View>
          <BtnWrapper onPress={() => { navigation.navigate('viewAllCats') }}>
            <Text style={styles.viewAllbtn}>View All</Text>
          </BtnWrapper>
        </View>
      </View>

      <FlatList
        style={{ marginBottom: WP('2') }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={cats}
        renderItem={({ item, index }) => (
          <BtnWrapper
            onPress={() =>
              navigation.navigate('categoryShops', { category: item })
            }>
            <View style={{ alignItems: 'center' }}>
              <Image
                style={styles.logo}
                source={{
                  uri: item?.cover_image ? item?.cover_image : imgUri,
                }}
              // resizeMode='contain'
              />
              <Text style={{ paddingTop: WP('0.8') }}>
                {/* {item?.title} */}
                {item?.title?.length > 12
                  ? item?.title.substring(0, 12)
                  : item?.title}
              </Text>
            </View>
          </BtnWrapper>
        )}
        keyExtractor={(item, key) => item.id}
      />
    </View >
  );
};

export default React.memo(RestuarentOutlets);

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
  },
  restaurantName: {
    fontSize: scale(15),
    color: colors.darkGreen,
    paddingLeft: WP('4'),
    paddingTop: WP('1'),
    paddingBottom: WP('2'),
  },
  viewAllbtn: {
    fontSize: scale(15),
    color: colors.darkGreen,
    paddingTop: WP('1'),
    paddingRight: WP('4'),
    paddingBottom: WP('2'),
  },
  logo: {
    width: WP('22'),
    height: WP('22'),
    marginHorizontal: WP('3'),
    borderRadius: WP('1'),
  },
});
