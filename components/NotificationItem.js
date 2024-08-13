import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow } from "date-fns";

const NotificationItem = ({ notification }) => {
  const timeAgo = formatDistanceToNow(new Date(notification?.created_date), {
    addSuffix: true,
  });

  return (
    <TouchableOpacity
      key={notification?.id}
      style={[styles.container, !notification?.read && styles.active]}
    >
      {notification?.content?.image ? (
        <Image
          source={{ uri: notification?.content?.image }}
          style={styles.image}
        />
      ) : (
        <Image
          source={require("../asset/accountavatar.png")}
          style={styles.image}
        />
      )}
      <View
        style={[styles.textContainer, !notification?.read && styles.activeText]}
      >
        <Text
          style={[styles.message, !notification?.read && styles.activeText]}
        >
          {notification?.message}
        </Text>
        <Text
          style={[styles.date, !notification?.read && styles.activeText]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#fff",
  },
  active: {
    color: "#fff",
    backgroundColor: "rgba(0, 198, 115, 0.78)",
  },
  activeText: {
    color: "#fff",
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
