import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { USER_ACTION_TYPE } from "../reducers/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  FCM_TOKEN_KEY,
} from "../configs/constants";
import { useUser, useUserDispatch } from "../hooks/useUser";
import { authHTTP, notificationEndpoints } from "../configs/apis";

const AccountScreen = ({ navigation }) => {
  const user = useUser();
  const dispatch = useUserDispatch();

  const logout = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem(FCM_TOKEN_KEY));
      if (storedToken) {
        await (
          await authHTTP()
        ).delete(notificationEndpoints.deleteFcmToken(storedToken?.id), {
          id: storedToken?.id,
        });
        await AsyncStorage.removeItem(FCM_TOKEN_KEY);
      }
    } catch (error) {
      console.error(error);
    }
    dispatch({
      type: USER_ACTION_TYPE.LOGOUT,
    });
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.userName}>{user?.full_name}</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="phone" size={20} color="#fff" />
          <Text style={styles.menuText}>09099943501</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="map-marker" size={20} color="#fff" />
          <Text style={styles.menuText}>Nhơn Đức, Nhà Bè, Hồ Chí Minh</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {;
             navigation.navigate('FieldRevenueStats');
          }}
        >
          <Icon name="line-chart" size={20} color="#fff" />
          <Text style={styles.menuText}>Thống kê doanh thu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="bar-chart" size={20} color="#fff" />
          <Text style={styles.menuText}>Thống kê đánh giá sân</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FieldStatusHistoryStats")}
        >
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

        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Icon name="sign-out" size={20} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2ecc71",
  },
  headerBackground: {
    width: "100%",
    height: 200, // Adjust the height as needed
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40, // To push the content below the status bar
    marginBottom: 10, // To push the content below the status bar
  },
  userName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  menu: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#fff",
  },
  divider: {
    borderBottomColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});

export default AccountScreen;
