import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { actuatedNormalize } from "../actuaterNormalize";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../Theme/ThemeProvider";
export const CenterHeaderComponent = (props) => {
  const title = getHeaderTitle(props.options, props.route.name);
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  const styles = makeStyles(colors, theme);
  const route = useRoute();
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ marginRight: 10 }}>
        <Image
          source={require("../../src/image/logoAuth.png")}
          style={{
            height: actuatedNormalize(40),
            width: actuatedNormalize(40),
            borderRadius: 100,
            backgroundColor: colors.text,
          }}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: theme.dark ? colors.background : colors.primary,
            right: "-3%",
            bottom: "0%",
            borderRadius: 100,
            height: "30%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="circle" size={10} color="lightgreen" />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{route.params?.userName}</Text>

        <Text style={styles.userStatus}>Online now</Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
      width: "100%",
      height: "100%",
    },

    textStyle: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    textContainer: {
      marginTop: 5,
    },
    userStatus: {
      fontSize: 12,
      color: "lightgreen",
    },
  });
