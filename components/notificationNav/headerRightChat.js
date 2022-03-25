import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { actuatedNormalize } from "../actuaterNormalize";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ChatButton = ({ containerStyle, size, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatStack");
      }}
      style={[styles.buttonContainer, containerStyle]}
    >
      <Entypo name="paper-plane" size={size ? size : 30} color="white" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: actuatedNormalize(10),
  },
});

export default ChatButton;
