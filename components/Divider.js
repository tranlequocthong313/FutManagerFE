import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const Divider = () => {
  return (
    <View style={styles.divider} />
  )
};

const styles = StyleSheet.create({

  divider: {
    borderBottomColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});

export default Divider;