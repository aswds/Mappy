import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  RefreshControl,
  Modal,
  Keyboard,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  fetchUserFollowers,
} from "../../redux/actions";
import LottieAnimation from "../../components/lottieAnimation";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import WhiteButton from "../../components/headerComponents/whiteButton";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import * as Haptics from "expo-haptics";
import * as Progress from "react-native-progress";
import firebase from "firebase";
import { Asset } from "expo-asset";
import { SliderBox } from "react-native-image-slider-box";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { Skeleton } from "moti/skeleton";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
const ProfileScreen = (props) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const { postIsUploading, posts } = props;
  const [locationPost, setLocationPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState(props.currentUser.userImage);
  const [isLoading, setIsLoading] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = makeStyles(colors, theme);
  const renderPost = (item) => {
    return (
      <View style={styles.sliderBoxContainer} key={item.id}>
        <SliderBox
          sliderBoxHeight={Dimensions.get("window").width / 3}
          imageLoadingColor={colors.text}
          paginationBoxStyle={styles.pagginationBoxStyle}
          dotColor={colors.text}
          inactiveDotColor="#333333"
          dotStyle={styles.dotStyle}
          images={item.downloadURLs}
          ImageComponentStyle={{
            width: Dimensions.get("window").width / 3,
          }}
          parentWidth={Dimensions.get("window").width / 3}
        />
      </View>
    );
  };

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1500);
  };

  useEffect(() => {
    props.fetchUser();
    props.fetchUserPosts();
    props.fetchUserFollowing();
    props.fetchUserFollowers();
    navigation.addListener("Focus", () => {
      setLoading(!loading);
    });
  }, [loading, refresh]);

  useEffect(() => {
    if (route.params?.imageURI) {
      setImage(cameraImage);
    } else if (gettingImage) {
      setImage(gettingImage);
    }
  }, [route.params]);
  useEffect(() => {
    setImage(props.currentUser.userImage);
  }, [props.currentUser.userImage]);
  if (
    props.currentUser === undefined ||
    props.currentUser.userImage === null ||
    props.following === undefined
  ) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ActivityIndicator size={"small"} color={colors.text} />
      </View>
    );
  }

  const cameraImage = route.params?.imageURI ? route.params.imageURI : null;
  const gettingImage = props.currentUser.userImage;
  const username = props.currentUser.username;
  const email = props.currentUser.email;
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            style={styles.refreshControl}
            tintColor={"white"}
          />
        }
        contentContainerStyle={{ height: Dimensions.get("window").height }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileInfoContainer}>
          <View style={styles.imageContainer}>
            <Skeleton show={false}>
              {!image || cameraImage ? (
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
                  defaultSource={{ uri: image }}
                  style={styles.image}
                />
              )}
            </Skeleton>
          </View>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>`{username}</Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{email}</Text>
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.push("Follow", {
                  username: username,
                  initialScreen: "Followers",
                });
              }}
            >
              <Text style={styles.folowText}>Followers</Text>

              <Text style={styles.folowNumber}>{props.followers.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Follow", {
                  username: username,
                  initialScreen: "Following",
                });
              }}
            >
              <Text style={styles.folowText}>Following</Text>

              <Text style={styles.folowNumber}>
                {props.following.length ? props.following.length : 0}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.whiteButtonsContainer}>
            <WhiteButton
              style={styles.whiteButton}
              text="Edit profile"
              onPress={() => {
                navigation.push("EditProfile", { profileImage: image });
              }}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
            />
          </View>
        </View>
        <View style={{ height: "100%" }}>
          {posts.length > 0 ? (
            <View style={styles.postContainer}>
              {posts.map((item) => renderPost(item))}
            </View>
          ) : (
            <View style={styles.noPostContainer}>
              <MaterialCommunityIcons
                name="post"
                size={170}
                color={theme.dark ? "white" : "black"}
              />
              <Text style={styles.noPostText}>no posts yet</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.settingButton}
        onPress={() => {
          navigation.push("Settings");
        }}
      >
        <AntDesign name="setting" size={35} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addingPost}
        onPress={() => {
          navigation.push("PostCreatingNavigator", {
            screen: "PostCreatingScreen",
          });
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <AntDesign name="plus" size={actuatedNormalize(45)} color="black" />
      </TouchableOpacity>
      {postIsUploading ? (
        <Progress.Bar
          indeterminate
          width={Dimensions.get("window").width}
          color={colors.text}
          borderWidth={0}
          borderRadius={0}
          height={2}
        />
      ) : null}
    </SafeAreaView>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    containerSafeArea: {
      flex: 1,
    },
    settingButton: {
      position: "absolute",
      top: Platform.OS === "android" ? 30 : "10%",
      right: 20,
    },
    addingPost: {
      position: "absolute",
      height: actuatedNormalize(50),
      width: actuatedNormalize(50),
      justifyContent: "center",
      alignItems: "center",
      bottom: 20,
      right: 20,
      backgroundColor: "rgba(180,180,180,0.7)",
      shadowOpacity: 1,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      borderRadius: 30,
    },
    usernameContainer: {
      marginTop: actuatedNormalize(15),
      marginBottom: actuatedNormalize(10),
      width: Dimensions.get("window").width,
      alignItems: "center",
      justifyContent: "center",
    },
    username: {
      color: colors.text,
      fontSize: 20,
    },
    emailContainer: {
      marginBottom: 15,
      width: Dimensions.get("window").width,
      alignItems: "center",
      justifyContent: "center",
    },
    email: {
      fontFamily: "Lato-Regular",
      fontSize: 15,
      fontWeight: "400",
      color: theme.dark ? "grey" : colors.tabColor,
    },
    whiteButtonsContainer: {
      alignItems: "center",
      width: "100%",
      marginBottom: 30,
    },
    whiteButton: {
      width: "50%",
    },
    textStyle: {
      color: colors.text,
      fontFamily: "Lato-Bold",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      height: actuatedNormalize(120),
      width: actuatedNormalize(120),
      borderRadius: 100,
      marginTop: "20%",
      overflow: "hidden",
      borderColor: theme.dark ? "white" : "black",
      borderWidth: 2,
    },
    profileInfoContainer: {
      width: "100%",
      alignItems: "center",
    },
    dotStyle: {
      width: 7,
      height: 7,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: "rgba(128, 128, 128, 0.92)",
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
      fontFamily: "Lato-Regular",
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
      backgroundColor: colors.background,
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
