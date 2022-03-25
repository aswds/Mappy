import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const LottieAnimationLogin = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={{ height: "100%", width: "100%" }}
        source={require("../src/image/lottieAnimations/9304-loading.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LottieAnimationLogin;
