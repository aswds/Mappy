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
import { theme } from "./components/theme";
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export default function App(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
  });

  if (!isLoaded) {
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
    <View style={styles.container}>
      <Provider store={store}>
        <StatusBar barStyle={"auto"} />
        <AppNavigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
