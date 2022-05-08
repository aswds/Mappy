import React, { useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import { useTheme } from "../../Theme/ThemeProvider";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/actuaterNormalize";
export const RenderPosts = ({ item }) => {
  const [captionHeight, setCaptionHeight] = useState("30%");
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors);
  const convertTimestamp = (timestamp) => {
    if (timestamp) {
      const date = timestamp.toDate().toLocaleTimeString("default", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
      return date;
    }
  };
  const iconSize = 25;
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => console.log("Opened")}
      style={[
        styles.post,
        {
          marginTop: 0,
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title ? item.title : "Untitled"}</Text>
        <Text style={styles.dateText}>{convertTimestamp(item.creation)}</Text>
      </View>
      <View style={styles.postContent}>
        <View style={styles.imagesContainer}>
          <Image
            style={styles.postImageSmall}
            source={{
              uri: `${item.downloadURLs[2]}`,
            }}
          />
          <Image
            style={{ ...styles.postImageSmall, ...styles.postImageMedium }}
            source={{
              uri: `${item.downloadURLs[1]}`,
            }}
          />
          <Image
            style={{
              ...styles.postImageSmall,
              ...styles.postImageBig,
            }}
            source={{
              uri: `${item.downloadURLs[0]}`,
            }}
          />
        </View>
        <View style={styles.openPhotosButton}>
          <TouchableOpacity style={styles.arrowButton}>
            <AntDesign name="arrowright" size={40} color="#575757" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText} numberOfLines={1}>
          New York, Backer street fd Dfd
        </Text>
        <TouchableOpacity>
          <Text style={styles.clickLocation}>Click to see</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          width: "50%",
          maxWidth: "99%",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: "lightgrey",
            fontFamily: "WorkSans-Regular",
          }}
        >
          {item.caption}
        </Text>
      </TouchableOpacity>
      <View style={styles.postActions}>
        <View style={styles.postActionsView}>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={[styles.postActionIcon]}>
              <Ionicons name="heart-outline" size={30} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postActionIcon}>
              <Ionicons
                name="chatbubble-outline"
                size={iconSize}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity style={[styles.postActionIcon]}>
              {/* <FontAwesome
                name="share-square-o"
                size={24}
                color={colors.text}
              /> */}
              <Ionicons
                name="share-social-sharp"
                size={iconSize}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const makeStyles = (colors) =>
  StyleSheet.create({
    post: {
      flex: 1,
      alignItems: "flex-start",
      marginHorizontal: 20,
    },
    locationContainer: {
      marginVertical: 15,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    locationText: {
      fontSize: 15,
      color: "#9D9D9D",
      fontFamily: "WorkSans-Bold",
      maxWidth: "70%",
      alignItems: "flex-start",
    },
    clickLocation: {
      color: "#117EFF",
      fontFamily: "WorkSans-Bold",
      fontSize: 13,
    },
    openPhotosButton: {
      position: "absolute",
      top: 0,
      right: 5,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    arrowButton: {
      backgroundColor: "#C4C4C4",
      height: 70,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      top: 0,
    },
    imagesContainer: {
      height: "100%",
      justifyContent: "center",
      shadowOpacity: 1,
      shadowColor: "black",
      shadowRadius: 10,
      shadowOffset: { width: 2, height: 5 },
    },
    dateText: {
      color: "#9D9D9D",
      fontSize: 13,
      fontFamily: "WorkSans-Bold",
      minWidth: "30%",
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: "10%",
      width: "100%",
    },

    title: {
      color: colors.text,
      fontFamily: "WorkSans-Bold",
      fontSize: 20,
      maxWidth: "60%",
    },
    postImageSmall: {
      borderColor: colors.text,
      borderWidth: 1,
      borderRadius: 10,
      aspectRatio: 1 / 1,
      height: 140,
      aspectRatio: 1,
      position: "absolute",
      left: 5,
      shadowOpacity: 1,
      shadowColor: "black",
      shadowRadius: 10,
      shadowOffset: { width: 2, height: 5 },
    },

    postImageMedium: {
      height: 155,
      aspectRatio: 1,
      position: "absolute",
      left: 30,
    },
    postImageBig: {
      height: 170,
      aspectRatio: 1,
      position: "absolute",
      left: 60,
    },
    actionContainer: {
      flexDirection: "row",
      width: "30%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    postActions: {
      alignSelf: "center",
      width: "100%",
      alignItems: "center",
      backgroundColor: "white",
    },
    postActionsView: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingVertical: "1%",
      width: "100%",
    },
    postContent: {
      height: actuatedNormalize(190),
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    postActionIcon: {
      height: actuatedNormalize(40),
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
  });
export default RenderPosts;
