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
import { Title } from "react-native-paper";
export const About = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeSyles(colors, theme);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Title style={{ fontFamily: "WorkSans-Bold", color: colors.text }}>
          About me
        </Title>
        <Text
          style={{
            color: colors.text,
            fontFamily: "WorkSans-Regular",
            fontSize: 15,
          }}
        >
          i'm young app developer whos using react native to become his dream
          come true
        </Text>
      </View>
      <View style={styles.section}>
        <Title
          style={{
            fontFamily: "WorkSans-Bold",
            color: colors.text,
          }}
        >
          Hobbies
        </Title>

        <Text
          style={{
            color: colors.text,
            fontFamily: "WorkSans-Regular",
            fontSize: 15,
            paddingBottom: 10,
          }}
        >
          i'm young app developer whos using react native to become his dream
          come true
        </Text>
      </View>
    </View>
  );
};
const makeSyles = (colors: any, theme) =>
  StyleSheet.create({
    container: { flex: 1, alignItems: "center" },
    section: {
      width: "90%",
      marginVertical: "5%",
      borderRadius: 10,
      shadowOpacity: 0.4,
      shadowColor: theme.dark ? "white" : "black",
      backgroundColor: colors.background,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 5,
      padding: 15,
    },
  });
