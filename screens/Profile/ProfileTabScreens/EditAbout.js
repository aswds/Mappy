import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useTheme } from "../../../Theme/ThemeProvider";

export const EditAbout = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors, theme);
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};
const makeStyles = (colors: any, theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.background,
    },
  });

export default EditAbout;
