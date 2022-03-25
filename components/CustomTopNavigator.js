import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { actuatedNormalize } from "./actuaterNormalize";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
const CustomTopNavigator = (props) => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: actuatedNormalize(50),
          width: "100%",
          flexDirection: "row",
          backgroundColor: "black",
          justifyContent: "space-between",
          alignItems: "center",
          ...props.style,
        }}
      >
        {props.children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default CustomTopNavigator;
