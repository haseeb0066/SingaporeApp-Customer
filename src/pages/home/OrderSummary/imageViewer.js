import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import SafeWrapper from '../../../shared/components/safeWrapper';
import ImageZoom from 'react-native-image-pan-zoom';
import Micon from 'react-native-vector-icons/MaterialIcons';
import BtnWrapper from '../../../shared/components/btnWrapper';
import {FlatList} from 'react-native';

import {THEME, WP} from '../../../shared/exporter';

const imageViewer = ({navigation, route}) => {
  return (
    <SafeWrapper style={{backgroundColor: THEME.colors.black}}>
      <View>
        <BtnWrapper onPress={() => navigation.goBack()}>
          <Micon
            name="arrow-back"
            color={THEME.colors.white}
            size={WP('6')}
            style={{padding: WP('5')}}
          />
        </BtnWrapper>
      </View>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height - 150}
        imageWidth={'100%'}
        imageHeight={'100%'}>
        <Image
          style={{width: WP('100'), height: '100%'}}
          source={{
            uri: route?.params?.img,
          }}
          resizeMode="contain"
        />
      </ImageZoom>
    </SafeWrapper>
  );
};

export default imageViewer;

const styles = StyleSheet.create({});
