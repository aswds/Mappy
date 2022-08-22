import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
const Line = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    borderLeftWidth: 1,
    height: Dimensions.get("window").height >= 800 ? 30 : 20,
    padding: 5,
  },
});

export default Line;
