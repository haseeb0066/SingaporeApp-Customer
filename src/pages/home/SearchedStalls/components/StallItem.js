import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import BtnWrapper from '../../../../shared/components/btnWrapper';

const StallItem = ({item}) => {
  const navigation = useNavigation();
  console.log(item,'------- item -------');
  return (
    <View style={styles.container}>
      <BtnWrapper
        onPress={() =>
          navigation.navigate('menupage', {item: item?.item})
        }>
        <View>
          <Image
            style={styles.img}
            source={{
              //uri: item?.item?.cover_image,
              uri: item?.item?.restaurant?.cover_image,
            }}
          />
          <Text style={styles.h1}>{item?.item?.name}</Text>
          <Text style={styles.h2}>
            {item?.item?.tags?.length > 20
              ? item.item.tags.substring(0, 18) + '...'
              : item?.item?.tags}
          </Text>
        </View>
      </BtnWrapper>
    </View>
  );
};

export default StallItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(15),
  },
  img: {
    height: scale(100),
    width: '100%',
    borderRadius: scale(5),
  },
  // img: {
  //   height: 150,
  //   width: '80%',
  //   borderRadius: 25,
  // },

  h1: {
    color: 'black',
    fontSize: scale(19),
    marginTop: scale(5),
  },
  h2: {},
});
