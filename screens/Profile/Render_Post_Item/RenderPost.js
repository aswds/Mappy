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
  Platform,
} from "react-native";
import { colors } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import { useTheme } from "../../../Theme/ThemeProvider";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import PostModal from "./PostModal";
import { useNavigation } from "@react-navigation/native";
import ShareModal from "./ShareModal";
import moment from "moment";
export const RenderPosts = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState({ height: "30%", width: "50%" });
  const [captionIsOpened, setCaptionIsOpened] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  const convertTimestamp = (timestamp) => {
    if (timestamp) {
      const date = moment(timestamp.toDate()).format("lll");
      return date;
    }
  };
  const data = {
    caption: item.caption,
    title: item.title,
    images: item.downloadURLs,
    time: convertTimestamp(item.creation),
    rate: item.rate,
    rateCaption: item.rateCaption,
    location: item.location,
  };
  const _hideShareModal = () => {
    setShowShareModal(false);
  };

  const _hideModal = () => {
    setShowModal(false);
  };

  const iconSize = 25;
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => setShowModal(true)}
        style={[
          styles.post,
          {
            marginTop: 0,
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.title ? item.title : "Untitled"}
          </Text>
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
          <Text numberOfLines={1} style={styles.textStyle}>
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
              <TouchableOpacity
                style={[styles.postActionIcon]}
                onPress={() => {
                  setShowShareModal(true);
                }}
              >
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
      <ShareModal hideModal={_hideShareModal} showModal={showShareModal} />
      <PostModal hideModal={_hideModal} data={data} showModal={showModal} />
    </>
  );
};
const makeStyles = (colors) =>
  StyleSheet.create({
    post: {
      flex: 1,
      alignItems: "flex-start",
      marginHorizontal: "5%",
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
    textStyle: {
      color: colors.text,
      fontFamily: "WorkSans-Regular",
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
    },
    postActionsView: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingVertical: "2%",
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
    },
  });
export default RenderPosts;
