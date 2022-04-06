import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const ProfileTab = ({ text, textStyle, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{ ...containerStyle }}
      onPress={onPress}
      activeOpacity={0.2}
    >
      <Text style={{ ...textStyle }}>{text}</Text>
    </TouchableOpacity>
  );
};
