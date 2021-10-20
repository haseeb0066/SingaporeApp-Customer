import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { THEME, WP } from '../../../../shared/exporter';
import Entypo from 'react-native-vector-icons/Entypo';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const restaurantCard = ({ navigation, stall }) => {
  return (
    <View style={styles.container}>
      <BtnWrapper
        onPress={(_) => navigation.navigate('menupage', { item: stall.item })}>
        <View style={{ width: '100%' }}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{ uri: stall?.item?.cover_image }}
          />
          <View style={styles.nameRating}>
            <Text style={styles.nameRatingTxt}>{stall.item.name}</Text>
            <Text style={{ fontSize: scale(12), color: 'grey' }}>
              {stall.item.name.tags > 20
                ? stall.item.tags.substring(0, 13) + '...'
                : stall.item.tags}
            </Text>
            {/* <Text style={{fontSize: scale(12)}}><Entypo name="star" color={THEME.colors.primary} size={scale(14)} />5</Text> */}
          </View>
        </View>
      </BtnWrapper>
    </View>
  );
};

export default React.memo(restaurantCard);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    borderRadius: scale(6),
    height: scale(100),
  },
  nameRating: {
    // flexDirection: 'row',
    width: WP('80'),
    justifyContent: 'space-between',
    marginVertical: WP('1'),
  },
  nameRatingTxt: {
    fontSize: scale(17),
    color: 'black',
    textTransform: 'capitalize',
  },
});

// import React from 'react'
// import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
// import { THEME, WP } from '../../../../shared/exporter'
// import Entypo from 'react-native-vector-icons/Entypo';
// import BtnWrapper from '../../../../shared/components/btnWrapper';

// const restaurantCard = ({ navigation, restaurant }) => {
//     return (
//         <View style={styles.container}>
//             <BtnWrapper onPress={_ => navigation.navigate('restaurantStall', { item: restaurant.item })}>
//                 <View>
//                     <Image
//                         style={styles.img}
//                         resizeMode='cover'
//                         source={{ uri: restaurant?.item?.cover_image }}
//                     />
//                     <View style={styles.nameRating}>
//                         <Text>{restaurant.item.name.length > 16 ? restaurant.item.name.substring(0, 13) + '...' : restaurant.item.name}</Text>
//                         <Text><Entypo name="star" color={THEME.colors.primary} size={WP('5')} />5</Text>
//                     </View>
//                 </View>
//             </BtnWrapper>
//         </View>
//     )
// }

// export default React.memo(restaurantCard)

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: WP('2'),
//     },
//     img: {
//         width: WP('40'),
//         height: WP('40')
//     },
//     nameRating: {
//         flexDirection: 'row',
//         width: WP('40'),
//         justifyContent: 'space-between',
//         marginVertical: WP('1')
//     }
// })
