// FloatingChatBubble.js
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { FontAwesome as FontAwesomeIcon } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const FloatingChatBubble = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Animated.View style={styles.bubble}>
      <TouchableOpacity
        style={styles.bubbleContent}
        onPress={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon name="comments" size={28} color="#fff" />
      </TouchableOpacity>
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Fontisto name="messenger" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Fontisto name="whatsapp" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#05834E",
    borderRadius: 50,
    padding: 18,
    elevation: 5,
  },
  bubbleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: "#D9D9D9", // Nền của menu
    borderRadius: 40,
    padding: 6,
    position: "absolute",
    bottom: 78,
    right: 2,
    width: 60, // Điều chỉnh chiều rộng của menu nếu cần
    flexDirection: "column", // Đổi menu thành chiều dọc
    alignItems: "center", // Căn giữa các icon trong menu
  },
  menuItem: {
    borderRadius: 30,
    padding: 10,
    marginBottom: 10, // Khoảng cách giữa các icon
  },
});

export default FloatingChatBubble;
