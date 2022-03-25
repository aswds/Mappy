import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const LottieAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../src/image/lottieAnimations/9304-loading.json")}
        style={{ flex: 1 }}
        autoPlay
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default LottieAnimation;
