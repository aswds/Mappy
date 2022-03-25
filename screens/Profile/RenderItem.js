import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { useNavigation, useTheme } from "@react-navigation/native";
import firebase from "firebase";
function RenderItem(props) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const currentUserUID = firebase.auth().currentUser.uid;
  const { item } = props;
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.5}
      onPress={() => {
        navigation.push("UserPageProfile", {
          uid: item.id,
        });
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
const makeStyles = (colors: any) =>
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
