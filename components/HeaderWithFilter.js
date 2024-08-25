import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HeaderWithFilter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.filterItem}>
          <View style={[styles.colorBox, { backgroundColor: '#119960' }]} />
          <Text style={styles.labelText}>Sẵn sàng</Text>
        </View>
        <View style={styles.filterItem}>
          <View style={[styles.colorBox, { backgroundColor: '#FD0404' }]} />
          <Text style={styles.labelText}>Đầy</Text>
        </View>
        <View style={styles.filterItem}>
          <View style={[styles.colorBox, { backgroundColor: '#D9D9D9' }]} />
          <Text style={styles.labelText}>Bảo trì</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.filterIcon}>
        <FontAwesome name="filter" size={30} color="#fff"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80, // Tăng chiều cao của header
    backgroundColor: '#00C673',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 30,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 3,
  },
  labelText: {
    color: '#fff',
    fontSize: 14,
  },
  filterIcon: {
    padding: 10,
  },
});

export default HeaderWithFilter;
