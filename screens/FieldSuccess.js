import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng FontAwesome

const FieldSuccess = () => {
  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={100} color="#fff" />
      <Text style={styles.label}>Đặt sân thành công</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C673',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
});

export default FieldSuccess;
