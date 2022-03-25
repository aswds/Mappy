import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import validator from "validator";
import { useTheme } from "@react-navigation/native";
const Settings = (props) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Settings</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Settings.navigationOptions = () => {
  return {
    headerTintColor: "white",
    headerRight: () => {
      return (
        <View style={{ marginRight: 10 }}>
          <AntDesign name="setting" size={30} color="white" />
        </View>
      );
    },
  };
};

export default Settings;
