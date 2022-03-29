import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Button,
  Animated,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation, useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import vacationAnimation from "../../src/image/lottieAnimations/vacation.json";
import partyAnimation from "../../src/image/lottieAnimations/friends.json";
import bookingAnimation from "../../src/image/lottieAnimations/68973-calendar.json";
const slides = [
  {
    key: 1,
    title: "Welcome to Mappy!",
    text: "Seems it's your first launch",
    image: require("../../src/image/green-logo1.png"),
  },
  {
    key: 2,
    title: "Plan your travel",
    lottieAnimation: bookingAnimation,
    text: "We'll remind you about your plans",
    // image: require("../../src/image/green-logo1.png"),
  },
  {
    key: 3,
    title: "Find tickets for a whole party",
    lottieAnimation: partyAnimation,
    text: "Invite your friends and travel together",
    // image: require("../../src/image/green-logo1.png"),
  },
  {
    key: 4,
    title: "Share your vacations",
    lottieAnimation: vacationAnimation,
    text: "Enjoy holidays and share your expirience with new users",
    // image: require("../../src/image/green-logo1.png"),
  },
];

export default function IntroSlider(props) {
  const { colors } = useTheme();
  const { onDone } = props;
  const theme = useTheme();
  const styles = makeStyles(colors, theme);
  const navigation = useNavigation();

  _renderItem = ({ item }) => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
        <View style={styles.slide}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {item.key > 1 && (
            <LottieView
              source={item.lottieAnimation}
              autoPlay={true}
              loop={true}
              speed={0.7}
              key={item.key}
            />
          )}
          <Image source={item.image} style={styles.image} />

          <Text style={styles.text}>{item.text}</Text>
        </View>
      </SafeAreaView>
    );
  };
  _onDone = () => {
    navigation.navigate("Home", { screen: "Home" });
  };
  {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={onDone}
        activeDotStyle={{
          backgroundColor: colors.primary,
          width: 40,
          zIndex: 1,
        }}
        dotStyle={{
          width: 40,
          backgroundColor: "lightgrey",
        }}
        style={{ backgroundColor: colors.background }}
      />
    );
  }
}
const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    text: {
      fontSize: 18,
      fontFamily: "WorkSans-Regular",
      textAlign: "center",
      maxWidth: "80%",
    },
    titleContainer: {},

    image: {
      height: 100,
      width: 100,
      position: "absolute",
      zIndex: -1,
      bottom: 30,
    },
    titleContainer: {
      marginBottom: "40%",
      flexWrap: "nowrap",
      maxWidth: "90%",
    },
    title: {
      fontSize: 28,
      fontFamily: "WorkSans-Bold",
      color: "rgb(10, 132, 255)",
      textAlign: "center",
    },

    slide: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });
