import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import WhiteButton from "../../../components/headerComponents/whiteButton";
import {
  fetchUser,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserPosts,
} from "../../../redux/actions";
import { useTheme } from "../../../Theme/ThemeProvider";
const ProfileScreen = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const { postIsUploading, posts } = props;
  const [locationPost, setLocationPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState();
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const styles = makeStyles(colors, theme);
  const userLoading = useSelector((state) => {
    return state.userState.loading;
  });
  useEffect(() => {
    props.fetchUser();
    props.fetchUserPosts();
    props.fetchUserFollowing();
    props.fetchUserFollowers();
  }, [refresh, postIsUploading]);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const cameraImage = route.params?.imageURI ? route.params.imageURI : null;
  const insets = useSafeAreaInsets();
  if (props.currentUser == undefined || posts == undefined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"small"} color={colors.text} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          ...styles.profileInfoContainer,
        }}
        pointerEvents="box-none"
      >
        <View style={styles.aboutMe} pointerEvents="none">
          <View style={styles.imageContainer}>
            {!props.currentUser.userImage || cameraImage ? (
              <Image
                source={
                  cameraImage
                    ? { uri: cameraImage }
                    : require("../../../src/image/logoAuth.png")
                }
                style={styles.image}
              />
            ) : (
              <CachedImage
                uri={props.currentUser.userImage}
                defaultSource={{ uri: props.currentUser.userImage }}
                style={styles.image}
              />
            )}
          </View>

          <View
            style={{ justifyContent: "center", paddingLeft: 15 }}
            pointerEvents="none"
          >
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>`{props.currentUser.username}</Text>
              {/* <TouchableOpacity
                  style={styles.settingButton}
                  onPress={() => {
                    navigation.push("Settings");
                  }}
                >
                  <AntDesign name="setting" size={30} color={colors.text} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.email}>{props.currentUser.name.trim()}</Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Lato-Regular", color: "grey" }}>
                Have visited 6 countries
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ marginHorizontal: "5%", marginVertical: 20 }}
          pointerEvents="none"
        >
          <Text style={{ color: colors.text }}>
            {props.currentUser.caption}
          </Text>
        </View>
        <View style={styles.followContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.push("Follow", {
                username: props.currentUser.username,
                initialScreen: "Followers",
              });
            }}
          >
            <Text style={styles.folowNumber}>{props.followers.length}</Text>
            <Text style={styles.folowText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("Follow", {
                username: props.currentUser.username,
                initialScreen: "Following",
              });
            }}
          >
            <Text style={styles.folowNumber}>
              {props.following.length ? props.following.length : 0}
            </Text>
            <Text style={styles.folowText}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.whiteButtonsContainer}>
          <WhiteButton
            style={styles.whiteButton}
            text="Edit profile"
            onPress={() => {
              navigation.push("EditProfile", {
                profileImage: props.currentUser.userImage,
              });
            }}
            icon={
              <View>
                <MaterialCommunityIcons
                  name="account-edit"
                  size={20}
                  color={colors.text}
                />
              </View>
            }
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
        </View>
      </View>
    </View>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    aboutMe: {
      marginTop: "10%",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: "5%",
    },

    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    settingButton: {
      position: "absolute",
      top: Platform.OS === "android" ? 30 : "10%",
      right: 20,
    },
    profileTab: {
      flex: 1,
      alignItems: "center",
      height: "100%",
      justifyContent: "center",
      borderBottomColor: colors.border,
    },
    profileTabsContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderColor: colors.border,
      minHeight: actuatedNormalize(50),
      height: "5%",
    },
    tabTextStyle: {
      color: colors.text,

      fontSize: 15,
    },

    usernameContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },

    username: {
      color: colors.text,
      flexWrap: "wrap",
      fontSize: 20,
      fontFamily: "Lato-Bold",
    },
    emailContainer: {
      marginBottom: 15,
      width: Dimensions.get("window").width / 2,
      justifyContent: "center",
    },
    email: {
      fontFamily: "Lato-Regular",
      fontSize: 15,
      fontWeight: "400",
      color: theme.dark ? "grey" : colors.tabColor,
    },
    whiteButtonsContainer: {
      alignSelf: "center",
      alignItems: "center",
      width: "50%",
      height: "20%",
      marginBottom: "5%",
      justifyContent: "center",
    },
    whiteButton: {
      width: "100%",
    },
    textStyle: {
      color: colors.text,
      fontFamily: "WorkSans-Bold",
      marginHorizontal: 10,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      height: actuatedNormalize(120),
      width: actuatedNormalize(120),
      backgroundColor: "white",
      borderRadius: 100,
      overflow: "hidden",
      borderColor: theme.dark ? "white" : "black",
      borderWidth: 2,
    },
    profileInfoContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    dotStyle: {
      width: 7,
      height: 7,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: theme.dark
        ? "rgba(128, 128, 128, 0.92)"
        : colors.primary,
      shadowOpacity: 0.4,
      shadowOffset: {
        height: 2,
        width: 0,
      },
    },
    sliderBoxContainer: {
      width: Dimensions.get("window").width / 3,
      justifyContent: "center",
      aspectRatio: 1 / 1,
      justifyContent: "center",
      alignItems: "center",
    },
    pagginationBoxStyle: {
      position: "absolute",
      padding: 0,
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
    },
    refreshControl: {
      justifyContent: "center",
      alignItems: "center",
    },
    postContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    folowText: {
      color: theme.dark ? "grey" : "black",
      fontFamily: "WorkSans-Regular",
    },
    folowNumber: {
      color: colors.text,
      fontWeight: "bold",
    },
    followContainer: {
      width: "100%",
      height: "10%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginVertical: actuatedNormalize(10),
    },
    noPostContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    noPostText: {
      margin: 20,
      color: colors.text,
      fontFamily: "Lato-Regular",
      fontSize: 20,
      textTransform: "uppercase",
    },
    buttonStyle: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: theme.dark ? "white" : "black",
      flexDirection: "row",
    },
  });
const mapDispatchProps = (dispatch) => {
  return bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing, fetchUserFollowers },
    dispatch
  );
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,

  posts: store.userState.posts,
  postIsUploading: store.postIsUploading.isLoading,
  following: store.userState.following,
  followers: store.userState.followers,
});

export default connect(mapStateToProps, mapDispatchProps)(ProfileScreen);
