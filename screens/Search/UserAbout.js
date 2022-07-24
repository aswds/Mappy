import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { useTheme } from "../../Theme/ThemeProvider";
import firebase from "firebase";

export const UserAbout = (props) => {
  const getUserAbout = (userUID) => {
    firebase
      .firestore()
      .collection("About")
      .doc(userUID)
      .get()
      .then((data) => {
        setUserAbout(data);
      })
      .catch((error) => Alert.alert(error));
  };
  const [userAbout, setUserAbout] = useState();
  useEffect(() => {
    getUserAbout();
  }, []);
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors, theme);
  return <View style={styles.container}></View>;
};
const makeStyles = (colors: any, theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.background,
    },
  });

export default UserAbout;
