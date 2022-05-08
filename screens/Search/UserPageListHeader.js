import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { getUserInfo, onFollow, onUnFollow } from "../../components/follow";
import WhiteButton from "../../components/headerComponents/whiteButton";
import { fetchUser, fetchUserFollowing } from "../../redux/actions";
import { noPostStyles } from "../../styles/noPostStyles";
import { useTheme } from "../../Theme/ThemeProvider";
import { RenderPosts } from "../Profile/RenderPost";
import { fetchUserPage } from "./FetchUserFuncs/fetchUserPage";
// import { fetchUserPageFollowers } from "./FetchUserFuncs/fetchUserPageFollowers";
// import { fetchUserPageFollowing } from "./FetchUserFuncs/fetchUserPageFollowing";
import { fetchUserPosts } from "./FetchUserFuncs/fetchUserPosts";
// return user page in fetchuserfunc
const UserPageListHeader = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const navigation = useNavigation();
  const route = useRoute();
  const { posts } = props;
  const userUID = route.params?.uid;

  const [locationPost, setLocationPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [isFollowing, setIsFollowing] = useState(
    props.following.indexOf(userUID) > -1 ? true : false
  );
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currentUserUID = firebase.auth().currentUser.uid;
  const styles = makeStyles(colors, theme);
  useEffect(() => {
    props.fetchUserFollowing();
    fetchUserPage(userUID).then((_info) => setUser(_info));
    fetchUserPageFollowing();
    fetchUserPageFollowers();
    // fetchUserPageFollowers(userUID).then((_followers) =>
    //   setFollowers(_followers)
    // );
    // fetchUserPageFollowing(userUID).then((_following) =>
    //   setFollowing(_following)
    // );
  }, [route.params]);

  useEffect(() => {
    if (props.following.indexOf(userUID) > -1) setIsFollowing(true);
    else {
      setIsFollowing(false);
    }
  }, [isFollowing]);
  if (
    user == undefined ||
    user === null ||
    followers === undefined ||
    following === undefined ||
    props.following === null
  ) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size={"small"} color={colors.text} />
      </View>
    );
  }
  function fetchUser() {
    firebase
      .firestore()
      .collection("users")
      .doc(userUID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          return alert("User not found");
        }
      });
  }
  function fetchUserPageFollowers() {
    firebase
      .firestore()
      .collection("Followers")
      .doc(userUID)
      .collection("userFollowers")
      .onSnapshot((snapshot) => {
        let userFollwers = snapshot.docs.map((doc) => {
          let id = doc.id;
        });
        setFollowers(userFollwers);
      });
  }
  function fetchUserPageFollowing() {
    firebase
      .firestore()
      .collection("Following")
      .doc(userUID)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let userFollwing = snapshot.docs.map((doc) => {
          let id = doc.id;
        });
        setFollowing(userFollwing);
      });
  }
  return (
    <SafeAreaView style={styles.containerSafeArea} pointerEvents="box-none">
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back-sharp" size={34} color={colors.text} />
      </TouchableOpacity>
      <View
        style={styles.container}
        showsVerticalScrollIndicator={false}
        pointerEvents="box-none"
      >
        <View style={styles.profileContainer} pointerEvents="box-none">
          <View style={styles.profileUpperInfo} pointerEvents="none">
            <View style={styles.imageContainer} pointerEvents="box-none">
              {!user.userImage ? (
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require("../../src/image/logoAuth.png")
                  }
                  style={styles.image}
                />
              ) : (
                <CachedImage
                  uri={image}
                  defaultSource={{ uri: user.userImage }}
                  style={styles.image}
                />
              )}
            </View>

            <View
              style={{ justifyContent: "center", paddingLeft: 15 }}
              pointerEvents="none"
            >
              <View style={styles.usernameContainer} pointerEvents="none">
                <Text style={styles.username}>`{user.username}</Text>
                {/* <TouchableOpacity
                  style={styles.settingButton}
                  onPress={() => {
                    navigation.push("Settings");
                  }}
                >
                  <AntDesign name="setting" size={30} color={colors.text} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.emailContainer} pointerEvents="box-none">
                <Text style={styles.email}>USA, Texas</Text>
              </View>
              <View pointerEvents="box-none">
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
              Nigga Nigga Nigga Nigga Nigga Nigga Nigga Nigga Nigga
            </Text>
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.push("UserTopTab", {
                  userUID: userUID,
                  username: user.username,
                  initialScreen: "UserFollowers",
                  routeName: route.name,
                });
              }}
            >
              <Text style={styles.folowText}>Followers</Text>
              <Text style={styles.folowNumber}>{followers.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.push("UserTopTab", {
                  userUID: userUID,
                  username: user.username,
                  initialScreen: "UserFollowing",
                  routeName: route.name,
                });
              }}
            >
              <Text style={styles.folowText}>Following</Text>
              <Text style={styles.folowNumber}>{following.length}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: "center",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              height: "20%",
            }}
          >
            {props.following.indexOf(userUID) > -1 ? (
              <WhiteButton
                style={{ flex: 1 }}
                buttonStyle={{
                  ...styles.buttonStyle,
                  borderColor: "grey",
                  backgroundColor: colors.background,
                }}
                textStyle={{
                  fontFamily: "Lato-Bold",
                  color: "grey",
                }}
                text={"Following"}
                onPress={() => {
                  followers.length -= 1;
                  setIsFollowing(!isFollowing);
                  onUnFollow(userUID);
                }}
              />
            ) : (
              <WhiteButton
                style={{ flex: 1 }}
                buttonStyle={{
                  ...styles.buttonStyle,
                  borderColor: theme.dark ? "white" : colors.border,
                  backgroundColor: "white",
                }}
                textStyle={{
                  color: "black",
                  fontFamily: "Lato-Bold",
                }}
                text={"Follow"}
                onPress={async () => {
                  followers.length += 1;
                  setIsFollowing(!isFollowing);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  onFollow(userUID);
                }}
              />
            )}
            <WhiteButton
              style={{
                borderColor: theme.dark ? "white" : colors.border,
                flex: 1,
              }}
              buttonStyle={styles.buttonStyle}
              textStyle={{ color: "white", fontFamily: "Lato-Bold" }}
              text={"Message"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    containerSafeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: { flex: 1 },
    backButton: {
      width: actuatedNormalize(60),
      position: "absolute",
      top:
        Platform.OS === "ios" ? actuatedNormalize(50) : actuatedNormalize(10),
      left: actuatedNormalize(10),
      zIndex: 1,
    },
    buttonStyle: {
      backgroundColor: colors.tabColor,
      borderColor: colors.border,
    },
    profileContainer: {
      paddingTop: "15%",
      borderBottomWidth: 0,
      height:
        Platform.OS === "android"
          ? Dimensions.get("screen").height / 1.5
          : Dimensions.get("screen").height / 2,
    },
    profileUpperInfo: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: "5%",
    },
    username: {
      color: colors.text,
      fontSize: 20,
    },
    email: {
      fontFamily: "Lato-Regular",
      fontSize: 15,
      fontWeight: "400",
      color: theme.dark ? "grey" : "black",
    },

    textStyle: {
      color: colors.text,
    },
    folowText: {
      color: theme.dark ? "grey" : "black",
    },

    followContainer: {
      width: "100%",
      height: "10%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginVertical: actuatedNormalize(15),
    },
    folowNumber: {
      color: colors.text,
      fontWeight: "bold",
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
    usernameContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: "20%",
      marginBottom: 10,
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
  });

const mapDispatchProps = (dispatch) => {
  return bindActionCreators(
    { fetchUser, fetchUserFollowing, fetchUserFollowing },
    dispatch
  );
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
});

export default connect(mapStateToProps, mapDispatchProps)(UserPageListHeader);
