import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation, useTheme } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
const slides = [
  {
    key: 1,
    title: "Welcome to Mappy!",
    text: "Plan your travel",
    lottieAnimation: require("../../src/image/lottieAnimations/68973-calendar.json"),
    image: require("../../src/image/green-logo1.png"),
  },
  {
    key: 2,
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../../src/image/green-logo1.png"),
  },
  {
    key: 3,
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../../src/image/green-logo1.png"),
  },
  {
    key: 4,
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../../src/image/green-logo1.png"),
  },
];

export default function IntroSlider() {
  const { colors } = useTheme();
  const theme = useTheme();
  const styles = makeStyles(colors, theme);

  const navigation = useNavigation();

  _renderItem = ({ item }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
        <View style={styles.slide}>
          <View style={{ marginBottom: "30%" }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <AnimatedLottieView source={item.lottieAnimation} autoPlay={true} />
          <Image source={item.image} style={styles.image} />

          <Text style={styles.text}>{item.text}</Text>
        </View>
      </SafeAreaView>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
  };
  {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        activeDotStyle={{
          backgroundColor: colors.primary,
          width: 40,
          zIndex: 1,
        }}
        dotStyle={{
          width: 40,
          backgroundColor: "lightgrey",
        }}
        nextLabel={"Next"}
        style={{ backgroundColor: colors.background }}
      />
    );
  }
}
const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    text: {
      fontSize: 17,
      fontFamily: "WorkSans-Regular",
      textAlign: "center",
    },
    titleContainer: {},

    image: {
      height: 100,
      width: 100,
      position: "absolute",
      zIndex: -1,
      bottom: 30,
    },
    title: {
      fontSize: 28,
      fontFamily: "WorkSans-Bold",
      color: "rgb(10, 132, 255)",
    },

    slide: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });
