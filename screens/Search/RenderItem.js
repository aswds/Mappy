import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "firebase";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { useTheme } from "../../Theme/ThemeProvider";
function RenderItem(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const colors = theme.colors;
  const currentUserUID = firebase.auth().currentUser.uid;
  const routeName = route.params?.routeName;
  const { item } = props;
  const styles = makeStyle(colors);
  return (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.5}
      onPress={() => {
        if (item.id === currentUserUID) {
          navigation.navigate("ProfileBottom", { screen: "ProfileScreen" });
        } else {
          navigation.push(
            route.params?.routeName ? route.params.routeName : "UserPageSearch",
            {
              uid: item.id,
            }
          );
        }
      }}
    >
      {item.userImage ? (
        <CachedImage uri={item.userImage} style={styles.avataStyle} />
      ) : (
        <Image
          source={require("../../src/image/logoAuth.png")}
          style={styles.avataStyle}
        />
      )}
      <View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
}
const makeStyle = (colors: any) =>
  StyleSheet.create({
    username: { color: colors.text, fontFamily: "Poppins-Bold" },
    userContainer: {
      height: actuatedNormalize(100),
      flexDirection: "row",
      alignItems: "center",
    },
    avataStyle: {
      margin: 10,
      height: actuatedNormalize(50),
      width: actuatedNormalize(50),
      borderRadius: 100,
      backgroundColor: "black",
    },
    email: {
      fontFamily: "Lato-Regular",
      color: "grey",
      fontSize: 13,
    },
  });

export default RenderItem;
