import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme, useNavigation } from "@react-navigation/native";
import { actuatedNormalize } from "../actuaterNormalize";
export const RightComponent = (props) => {
  const { colors } = useTheme();
  const theme = useTheme();
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
