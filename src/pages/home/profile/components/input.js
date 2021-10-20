import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {THEME, WP} from '../../../../shared/exporter';

const input = ({placeHolder, onChange, password}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={{padding: 0}}
        placeholder={placeHolder}
        placeholderTextColor={THEME.colors.text}
        onChangeText={(t) => onChange(t)}
        secureTextEntry={password ? true : false}
      />
    </View>
  );
};

export default React.memo(input);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: THEME.colors.primary,
    padding: WP('2'),
    marginVertical: WP('1.3'),
  },
});
