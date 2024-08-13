import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext, UserDispatchContext } from "../contexts/UserContext";
import { USER_ACTION_TYPE } from "../reducers/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../configs/constants";

// Import the local avatar image and background image
const backgroundImage = { uri: "https://placekitten.com/600/300" }; // Replace with your background image source

const AccountScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const logout = async () => {
    // TOOD: delete FCM token
    dispatch({
      type: USER_ACTION_TYPE.LOGOUT,
    });
    navigation.navigate("Login");
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
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
    marginLeft: 15,
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
