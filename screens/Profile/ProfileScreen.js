import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  RefreshControl,
  Modal,
  Keyboard,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  VirtualizedList,
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
  FontAwesome5,
} from "@expo/vector-icons";
import WhiteButton from "../../components/headerComponents/whiteButton";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import * as Haptics from "expo-haptics";
import * as Progress from "react-native-progress";
import firebase from "firebase";
import { Asset } from "expo-asset";
import { SliderBox } from "react-native-image-slider-box";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { useNavigation, useRoute } from "@react-navigation/native";
import { noPostStyles } from "../../styles/noPostStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../Theme/ThemeProvider";
import { RenderPosts } from "../../components/ProfileFunc/RenderPost";
import { ProfileTab } from "../../components/ProfileFunc/ProfileTabs";
import { About } from "./ProfileTabScreens/About";
const ProfileScreen = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const { postIsUploading, posts } = props;
  const [locationPost, setLocationPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState(props.currentUser.userImage);
  const [isLoading, setIsLoading] = useState();
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const styles = makeStyles(colors, theme);
  const userLoading = useSelector((state) => {
    return state.userState.loading;
  });
  if (props.currentUser == undefined || posts == undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  useEffect(() => {
    if (route.params?.imageURI) {
      setImage(cameraImage);
    }
  }, [route.params]);
  useEffect(() => {
    props.fetchUser();
    props.fetchUserPosts();
    props.fetchUserFollowing();
    props.fetchUserFollowers();
  }, [refresh, postIsUploading]);
  const renderPost = (item) => {
    return (
      <TouchableOpacity style={styles.sliderBoxContainer} key={item.id}>
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
      </TouchableOpacity>
    );
  };

  const RenderTab = () => {
    if (index == 0) {
      return posts.length > 0 ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {posts.map((item) => {
            return <RenderPosts item={item} key={item.id} />;
          })}
        </View>
      ) : (
        <View style={noPostStyles.noPostContainer}>
          <MaterialCommunityIcons name="post" size={150} color={colors.text} />
          <Text style={[noPostStyles.noPostText, { color: colors.text }]}>
            no posts yet
          </Text>
        </View>
      );
    } else if (index == 1) {
      return (
        <View>
          <Text style={{ color: "white" }}>I have Visited 5 countries</Text>
        </View>
      );
    } else if (index == 2) {
      return <About />;
    }
  };
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const cameraImage = route.params?.imageURI ? route.params.imageURI : null;
  const insets = useSafeAreaInsets();
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            style={{ ...styles.refreshControl }}
            tintColor={theme.dark ? "white" : "black"}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...styles.profileInfoContainer,
              marginTop: insets.top,
            }}
          >
            <View
              style={{
                marginTop: "10%",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: "5%",
              }}
            >
              <View style={styles.imageContainer}>
                {!props.currentUser.userImage || cameraImage ? (
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
                    defaultSource={{ uri: props.currentUser.userImage }}
                    style={styles.image}
                  />
                )}
              </View>

              <View style={{ justifyContent: "center", paddingLeft: 15 }}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>
                    `{props.currentUser.username}
                  </Text>
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
                  <Text style={styles.email}>{props.currentUser.email}</Text>
                </View>
                <View>
                  <Text style={{ fontFamily: "Lato-Regular", color: "grey" }}>
                    Have visited 6 countries
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: 20 }}>
              <Text style={{ color: colors.text }}>
                Nigga Nigga Nigga Nigga Nigga Nigga Nigga Nigga Nigga
              </Text>
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
                    username: props.currentUser.username,
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
                    username: props.currentUser.username,
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
                icon={
                  <View style={{}}>
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
          <View style={styles.profileTabsContainer}>
            <ProfileTab
              containerStyle={{
                ...styles.profileTab,
                borderBottomWidth: index == 0 ? 3 : 0,
              }}
              text={"Posts"}
              onPress={() => {
                setIndex(0);
              }}
              textStyle={{
                ...styles.tabTextStyle,
                fontFamily: index == 0 ? "WorkSans-Bold" : "WorkSans-Regular",
              }}
            />
            <ProfileTab
              containerStyle={{
                ...styles.profileTab,
                borderBottomWidth: index == 1 ? 3 : 0,
              }}
              text={"Flights"}
              onPress={() => {
                setIndex(1);
              }}
              textStyle={{
                ...styles.tabTextStyle,
                fontFamily: index == 1 ? "WorkSans-Bold" : "WorkSans-Regular",
              }}
            />
            <ProfileTab
              containerStyle={{
                ...styles.profileTab,
                borderBottomWidth: index == 2 ? 3 : 0,
              }}
              text={"About"}
              onPress={() => {
                setIndex(2);
              }}
              textStyle={{
                ...styles.tabTextStyle,
                fontFamily: index == 2 ? "WorkSans-Bold" : "WorkSans-Regular",
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <RenderTab />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addingPost}
        onPress={() => {
          navigation.push("PostCreatingNavigator", {
            screen: "PostCreatingScreen",
          });
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <AntDesign name="plus" size={actuatedNormalize(45)} color={"black"} />
      </TouchableOpacity>
      {postIsUploading ? (
        <Progress.Bar
          style={{ position: "absolute", bottom: 0 }}
          indeterminate
          width={Dimensions.get("window").width}
          color={colors.text}
          borderWidth={0}
          borderRadius={0}
          height={2}
        />
      ) : null}
    </>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    aboutMe: {},

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
    addingPost: {
      position: "absolute",
      height: actuatedNormalize(50),
      width: actuatedNormalize(50),
      justifyContent: "center",
      alignItems: "center",
      bottom: 20,
      right: 20,
      backgroundColor: theme.dark ? "rgba(180,180,180,0.7)" : "lightgrey",
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      borderRadius: 30,
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
      alignItems: "center",
      width: "100%",
    },
    whiteButton: {
      width: "50%",
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
