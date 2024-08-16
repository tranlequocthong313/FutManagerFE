import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function AvatarTitle() {
  return (
    <Image
      source={{
        uri: "https://res.cloudinary.com/diojasks1/image/upload/v1723804774/r04iqcz0m6lpmqlj7pp0.png",
      }}
      style={styles.avatar}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginTop: 50,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#fff",
  },
});
