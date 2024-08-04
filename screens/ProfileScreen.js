import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the local avatar image;

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={} style={styles.avatar} /> */}
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
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="question-circle" size={20} color="#fff" />
          <Text style={styles.menuText}>Trợ giúp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="info-circle" size={20} color="#fff" />
          <Text style={styles.menuText}>Giới thiệu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="sign-out" size={20} color="red" />
          <Text style={[styles.menuText, { color: 'red' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.chatboxIcon}>
        <Icon name="comments" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ecc71',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  chatboxIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default ProfileScreen;