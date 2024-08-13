import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default CustomInput;