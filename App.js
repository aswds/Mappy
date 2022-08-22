import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import LottieAnimation from "./components/lottieAnimation";
import { connect, Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store/store";
import { AppNavigator } from "./navigation/AppNavigator";
import { LoginAndRegister } from "./navigation/LoginAndRegisterNavigator";
import firebaseConfig from "./firebase";
import firebase from "firebase";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import LottieAnimationLogin from "./components/lottieAnimationLogin";
import { theme as DefaultTheme } from "./components/theme";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeProvider from "./Theme/ThemeProvider";
import ThemeWrapper from "./Theme/ThemeWraper";
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export default function App(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setloggedIn(false);
        setLoaded(true);
      } else {
        setLoaded(true);
        setloggedIn(true);
      }
    });
  }, []);

  const [isLoaded] = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "WorkSans-Bold": require("./assets/fonts/WorkSans/WorkSans-Bold.ttf"),
    "WorkSans-Regular": require("./assets/fonts/WorkSans/WorkSans-Regular.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito/static/Nunito-Bold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito/static/Nunito-Regular.ttf"),
  });

  if (!isLoaded && !themeLoaded) {
    return <AppLoading />;
  }

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieAnimation />
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <LoginAndRegister />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <StatusBar barStyle={!theme.dark ? "light-content" : "dark-content"} />
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
