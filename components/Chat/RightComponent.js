import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { actuatedNormalize } from "../actuaterNormalize";
import { useTheme } from "../../Theme/ThemeProvider";
export const RightComponent = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="call-outline" size={25} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="md-videocam-outline" size={27} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: actuatedNormalize(100),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
});
