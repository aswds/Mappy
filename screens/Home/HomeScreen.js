import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Hello</Text>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = (props) => {
  return {
    headerTintColor: "white",

    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        >
          <Entypo name="menu" size={35} color="white" />
        </TouchableOpacity>
      );
    },
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
