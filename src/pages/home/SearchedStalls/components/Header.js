import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import imageAssets from '../../../../assets/imageAssets';
const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <BtnWrapper onPress={() => navigation.goBack()}>
          <Image
            style={{width: scale(18), height: scale(18)}}
            source={imageAssets.backArrow}
          />
        </BtnWrapper>
        <Text style={styles.title}>{title}</Text>
        <Icon />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: scale(70),
    justifyContent: 'center',
  },
  innerContainer: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontSize: scale(18),
    textTransform: 'capitalize'
  }
});

const Icon = () => (
  <View
    style={{
      width: scale(18),
      height: scale(18),
      backgroundColor: '#F7D10F',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        borderRadius: scale(13),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 3,
      }}>
      <AntDesign name="info" size={scale(14)} color="#F7D10F" />
    </View>
  </View>
);
