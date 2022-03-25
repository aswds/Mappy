import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const LottieMarkerAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../src/image/marker.json")}
        style={{}}
        autoPlay
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});

export default LottieMarkerAnimation;
