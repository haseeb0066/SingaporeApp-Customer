import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import {useNavigation} from '@react-navigation/native';
const Header = ({makeAPICall, searchKeyword}) => {
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation();
  const searchIt = () => {
    if (keyword.length) {
      navigation.navigate('searchsStallsScreen', {
        keyword: keyword,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <BtnWrapper onPress={() => navigation.goBack()}>
          <View style={{marginRight: scale(10)}}>
            <Ionicons name="arrow-back-sharp" size={scale(25)} color="black" />
          </View>
        </BtnWrapper>
        <View style={styles.textInput}>
          <TextInput
            style={[styles.input, {fontSize: scale(12)}]}
            onChangeText={(txt) => {
              makeAPICall(txt);
              setKeyword(txt);
            }}
            onSubmitEditing={searchIt}
            placeholder="Search for restuarants, coffe shops and dishes"
          />
        </View>
        <BtnWrapper onPress={searchIt}>
          <View style={{marginRight: scale(5), marginLeft: scale(5)}}>
            <Ionicons name="search" size={scale(25)} color="black" />
          </View>
        </BtnWrapper>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  innerContainer: {
    marginHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    borderRadius: scale(5),
  },
  input: {
    height: scale(35),
    padding: 0,
    margin: 0,
    marginLeft: scale(5),
  },
});
