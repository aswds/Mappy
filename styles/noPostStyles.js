import React from "react";
import { StyleSheet, Dimensions } from "react-native";
export const noPostStyles = StyleSheet.create({
  noPostText: {
    margin: 20,
    fontFamily: "Lato-Regular",
    fontSize: 20,
    textTransform: "uppercase",
  },
  noPostContainer: {
    height: Dimensions.get("window").height / 2.3,
    alignItems: "center",
    justifyContent: "center",
  },
});
