import { Button } from "@react-native-material/core";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const WhiteButton = ({
  text,
  style,
  onPress,
  textStyle,
  buttonStyle,
  icon,
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableOpacity
        style={{ ...styles.button, ...buttonStyle }}
        onPress={onPress}
      >
        <Text style={{ ...styles.textStyle, ...textStyle }}>{text}</Text>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 35, width: 50, margin: 10 },
  textStyle: {
    color: "black",
  },
  button: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WhiteButton;
