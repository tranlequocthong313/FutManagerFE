import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const StatisticsRatingScreen = () => {
  // Khai báo state để quản lý giá trị của Picker
  const [selectedField, setSelectedField] = useState('san1'); // Giá trị mặc định là 'san1'
  const [selectedDate, setSelectedDate] = useState('08/2023'); // Giá trị mặc định là tháng/năm

  // Tạo các tùy chọn cho Picker để chọn ngày
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')); // ['01', '02', ..., '12']
  const years = ['2023', '2024', '2025']; // Thêm các năm tùy chọn

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {/* Dropdown for selecting field */}
        <Picker
          style={styles.picker}
          selectedValue={selectedField}
          onValueChange={(itemValue) => setSelectedField(itemValue)} // Cập nhật giá trị state khi người dùng chọn
        >
          <Picker.Item label="Sân 1" value="san1" />
          <Picker.Item label="Sân 2" value="san2" />
          {/* Thêm các tùy chọn khác nếu cần */}
        </Picker>
        
        {/* Date Picker */}
        <Picker
          style={styles.picker}
          selectedValue={selectedDate}
          onValueChange={(itemValue) => setSelectedDate(itemValue)} // Cập nhật giá trị state khi người dùng chọn
        >
          {months.map((month) =>
            years.map((year) => (
              <Picker.Item label={`${month}/${year}`} value={`${month}/${year}`} key={`${month}/${year}`} />
            ))
          )}
        </Picker>
      </View>

      {/* Rating Section */}
      <ScrollView contentContainerStyle={styles.ratingContainer}>
        <Text style={styles.mainRating}>4.0</Text>
        <Text style={styles.starText}>
          {/* Thêm viền trắng cho các ngôi sao */}
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>☆</Text>
        </Text>
        <Text style={styles.ratingCount}>1,253</Text>

        {/* Breakdown Section */}
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownText}>1,000</Text>
          <Text style={styles.breakdownStars}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
          </Text>
        </View>
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownText}>200</Text>
          <Text style={styles.breakdownStars}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>☆</Text>
          </Text>
        </View>
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownText}>50</Text>
          <Text style={styles.breakdownStars}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>☆</Text>
            <Text style={styles.star}>☆</Text>
          </Text>
        </View>
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownText}>2</Text>
          <Text style={styles.breakdownStars}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>☆</Text>
            <Text style={styles.star}>☆</Text>
            <Text style={styles.star}>☆</Text>
          </Text>
        </View>
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownText}>1</Text>
          <Text style={styles.breakdownStars}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>☆</Text>
            <Text style={styles.star}>☆</Text>
            <Text style={styles.star}>☆</Text>
            <Text style={styles.star}>☆</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ecc71',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ccc',
    paddingVertical: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: '#ccc',
    marginRight: 10,
    fontWeight: 'bold',
  },
  ratingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  mainRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  starText: {
    fontSize: 32,
    marginVertical: 10,
  },
  star: {
    color: '#FFD700', // Màu vàng cho ngôi sao
    textShadowColor: '#FFFFFF', // Màu viền trắng
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  ratingCount: {
    fontSize: 16,
    color: '#000',
  },
  breakdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 5,
  },
  breakdownText: {
    fontSize: 18,
    color: '#000',
  },
  breakdownStars: {
    fontSize: 18,
    flexDirection: 'row',
  },
});

export default StatisticsRatingScreen;
