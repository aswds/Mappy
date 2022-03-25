import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
const RightIcons = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate({ routeName: "ProfileScreen" })
        }
      >
        <View>
          <Feather name="user" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 50,
  },
});

export default RightIcons;
