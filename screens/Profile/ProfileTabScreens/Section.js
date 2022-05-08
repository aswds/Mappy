import React from "react";
import firebase from "firebase";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../Theme/ThemeProvider";
export const Section = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeSyles(colors, theme);
  return (
    <TouchableOpacity
      style={styles.section}
      activeOpacity={0.8}
      onPress={props.onPress}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            marginTop: 0,
            fontFamily: "WorkSans-Bold",
            color: colors.text,
            marginBottom: 10,
            fontSize: 20,
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontFamily: "WorkSans-Regular",
            paddingHorizontal: "1%",
            fontSize: 15,
          }}
        >
          Tap to edit
        </Text>
      </View>
      <View>{props.children}</View>
    </TouchableOpacity>
  );
};
const makeSyles = (colors: any, theme) =>
  StyleSheet.create({
    container: { flex: 1, alignItems: "center" },
    section: {
      width: "90%",
      marginVertical: "5%",
      borderRadius: 15,
      shadowOpacity: 0.4,
      shadowColor: theme.dark ? "white" : "black",
      backgroundColor: colors.background,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: "5%",
    },
  });
