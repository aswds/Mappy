import React, { useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { PinchGestureHandler } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

const Swiper = ({ images }) => {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
      setPage(slide);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={{ width, height: "100%" }}
        onScroll={change}
        scrollEventThrottle={16}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((item, index) => (
          <View style={styles.imageContainer} key={index}>
            <Animated.Image source={{ uri: item }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.circleContainer}>
        {images.map((i, k) => (
          <View style={styles.circleStyle} key={k}>
            <FontAwesome
              name="circle"
              size={active == k ? 8 : 7}
              color={active == k ? "#0362fc" : "#414345"}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circleStyle: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width,
    height: "100%",
    backgroundColor: "lightgrey",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});
export default Swiper;
