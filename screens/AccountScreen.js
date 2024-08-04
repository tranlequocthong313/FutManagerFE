import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the local avatar image and background image
const backgroundImage = { uri: 'https://placekitten.com/600/300' }; // Replace with your background image source

const AccountScreen = () => {
  return (
    <View style={styles.container}>
    <View style={styles.headerContent}>
      <Text style={styles.userName}>USER NAME</Text>
    </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="phone" size={20} color="#fff" />
          <Text style={styles.menuText}>Phone number</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="map-marker" size={20} color="#fff" />
          <Text style={styles.menuText}>Địa chỉ</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="line-chart" size={20} color="#fff" />
          <Text style={styles.menuText}>Thống kê doanh thu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="bar-chart" size={20} color="#fff" />
          <Text style={styles.menuText}>Thống kê đánh giá sân</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="pie-chart" size={20} color="#fff" />
          <Text style={styles.menuText}>Thống kê tình trạng sân</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="question-circle" size={20} color="#fff" />
          <Text style={styles.menuText}>Trợ giúp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="info-circle" size={20} color="#fff" />
          <Text style={styles.menuText}>Giới thiệu</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="sign-out" size={20} color="red" />
          <Text style={[styles.menuText, { color: 'red' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ecc71',
  },
  headerBackground: {
    width: '100%',
    height: 200, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40, // To push the content below the status bar
    marginBottom: 10, // To push the content below the status bar
  },
  userName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#fff',
  },
  divider: {
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});

export default AccountScreen;
