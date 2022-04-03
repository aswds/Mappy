import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { useTheme } from "../../Theme/ThemeProvider";
export const MessageCard = ({ item }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors, theme);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chat", { userName: item.userName });
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            height: actuatedNormalize(55),
            aspectRatio: 1,
            marginRight: "4%",
          }}
        >
          <Image
            source={require("../../src/image/logoAuth.png")}
            style={styles.image}
          />

          <View
            style={{
              position: "absolute",
              bottom: "1%",
              right: "-1%",
              backgroundColor: colors.background,
              borderRadius: 100,
              height: "25%",
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="circle" size={10} color="lightgreen" />
          </View>
        </View>
        <View>
          <View style={styles.textContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textStyle}>{item.userName}</Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#AFAFAF",
                  fontFamily: "Roboto-Bold",
                  fontSize: 13,
                }}
              >
                {item.messageTime}
              </Text>
            </View>
          </View>
          <View style={styles.previousMessageContainer}>
            <View style={{ width: "80%" }}>
              <Text style={styles.previousMessageTextStyle} numberOfLines={1}>
                {item.messageText}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get("window").width,
      alignItems: "flex-start",
      flexDirection: "row",
      marginVertical: "6%",
      marginHorizontal: 10,
    },
    textStyle: {
      fontFamily: "Lato-Bold",
      fontSize: 13,
      marginTop: "5%",
      color: theme.dark ? "white" : colors.text,
    },
    textContainer: {
      width: Dimensions.get("window").width / 1.3,
      paddingBottom: "1%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    previousMessageContainer: {
      flex: 1,
      maxWidth: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "nowrap",
    },
    previousMessageTextStyle: {
      fontFamily: "WorkSans-Regular",
      width: "85%",
      color: theme.dark ? colors.text : "#505050",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 100,
      backgroundColor: colors.text,
    },
  });
