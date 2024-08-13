import React from "react";
import { View, Text, StyleSheet } from "react-native";

function HomeScreen() {
  return (
    <View style={styles}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2ecc71",
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
});

export default HomeScreen;
