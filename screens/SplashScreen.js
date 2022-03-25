import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../src/image/location.json")}
        autoPlay
        loop
        onLayout
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
