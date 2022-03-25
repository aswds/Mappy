import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export const ChangeTheme = ({ onPress, style, iconStyle, dark }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, ...style }}
    >
      <Text style={{ ...styles.iconStyle, ...iconStyle }}>
        {dark ? (
          "🌑"
        ) : (
          <Ionicons name="sunny-outline" size={24} color="black" />
        )}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    height: 50,
    width: 50,
  },
  iconStyle: {
    fontSize: 30,
  },
});
