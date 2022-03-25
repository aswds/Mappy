import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { actuatedNormalize } from "../actuaterNormalize";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
const BackButton = ({ containerStyle, size, onPress, color }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, containerStyle]}
    >
      <Ionicons
        name="chevron-back-sharp"
        size={size ? size : 34}
        color={"white"}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: actuatedNormalize(10),
  },
});

export default BackButton;
