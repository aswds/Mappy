import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../../Theme/ThemeProvider";
export const Field = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors, theme);

  return (
    <View style={{ ...styles.inputField, flexDirection: "column" }}>
      <View style={{}}>
        <Text style={styles.subTitle}>{props.text}</Text>
      </View>
      <View style={styles.textInputContainer}>
        {props.icon}
        {props.children}
      </View>
    </View>
  );
};

const makeStyles = (colors: any, theme: any) => {
  return StyleSheet.create({
    subTitle: {
      fontFamily: "WorkSans-Bold",
      fontSize: 17,
      color: colors.text,
    },
    userInputContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    inputField: {
      flexDirection: "column",
      height: 70,
      marginBottom: 20,
      width: "100%",
      borderColor: theme.dark ? "#a3a3a3" : colors.border,
    },
    textInputContainer: {
      flexDirection: "row",
      width: "100%",
      borderBottomWidth: 2,
      borderColor: colors.border,
      marginVertical: 10,
    },
  });
};
