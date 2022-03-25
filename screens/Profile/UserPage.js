import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
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
  StatusBar,
  Alert,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserFollowing } from "../../redux/actions";
import CustomTopNavigator from "../../components/CustomTopNavigator";
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
import { onFollow, onUnFollow } from "../../components/follow";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
const UserPage = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { posts } = props;
  const { colors } = useTheme();
  const theme = useTheme();
  const styles = makeStyles(colors, theme);
  const [locationPost, setLocationPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currentUserUID = firebase.auth().currentUser.uid;
  const userUID = route.params?.uid;

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1500);
  };
  useEffect(() => {
    props.fetchUserFollowing();
    fetchUser();
    fetchUserPosts();
    fetchUserPageFollowers();
    fetchUserPageFollowing();
  }, [route.params]);

  if (
    user == undefined ||
    user === null ||
    userPosts === undefined ||
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
        let userFollowing = snapshot.docs.map((doc) => {
          let id = doc.id;
        });
        setFollowing(userFollowing);
      });
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
  function fetchUserPosts() {
    firebase
      .firestore()
      .collection("posts")
      .doc(userUID)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return { id, ...data };
        });
        if (posts.length === 0) {
          setUserPosts(null);
        } else {
          setUserPosts(posts);
        }
      })
      .catch((e) => Alert.alert(e));
  }

  const renderPosts = (item) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width / 3,
          justifyContent: "center",
          aspectRatio: 1 / 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        key={item.id}
      >
        <SliderBox
          sliderBoxHeight={Dimensions.get("window").width / 3}
          imageLoadingColor={"#fff"}
          paginationBoxStyle={{
            position: "absolute",
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
          dotColor="#fff"
          inactiveDotColor="#333333"
          dotStyle={{
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
          }}
          images={item.downloadURLs}
          ImageComponentStyle={{
            width: Dimensions.get("window").width / 3,
          }}
          parentWidth={Dimensions.get("window").width / 3}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          width: actuatedNormalize(60),
          position: "absolute",
          top:
            Platform.OS === "ios"
              ? actuatedNormalize(50)
              : actuatedNormalize(10),
          left: actuatedNormalize(10),
          zIndex: 1,
        }}
      >
        <Ionicons
          name="chevron-back-sharp"
          size={34}
          color={theme.dark ? "white" : "black"}
        />
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            style={{ justifyContent: "center", alignItems: "center" }}
            tintColor={"white"}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingTop: "15%",
            height: actuatedNormalize(420),
          }}
        >
          <View
            style={{
              height: actuatedNormalize(120),
              width: actuatedNormalize(120),
              borderRadius: 100,
              marginTop: "5%",
              overflow: "hidden",
              borderColor: "white",
              borderWidth: 2,
              alignSelf: "center",
            }}
          >
            {user.userImage ? (
              <CachedImage
                uri={user.userImage}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                key={image}
              />
            ) : (
              <Image
                source={require("../../src/image/logoAuth.png")}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
          <View
            style={{
              marginTop: actuatedNormalize(15),
              marginBottom: actuatedNormalize(10),
              width: Dimensions.get("window").width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.username}>`{user.username}</Text>
          </View>
          <View
            style={{
              marginBottom: 20,
              width: Dimensions.get("window").width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.email}>{user.email}</Text>
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
                navigation.push("UserTopTabProfile", {
                  username: user.username,
                  userUID: userUID,
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
                navigation.push("UserTopTabProfile", {
                  username: user.username,
                  userUID: userUID,
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
              height: actuatedNormalize(80),
            }}
          >
            {props.following.indexOf(userUID) > -1 ? (
              <WhiteButton
                style={{ flex: 1, borderColor: "white" }}
                buttonStyle={{
                  ...styles.buttonStyle,
                  borderColor: "grey",
                  backgroundColor: colors.background,
                }}
                textStyle={{ color: "grey", fontFamily: "Lato-Bold" }}
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
                textStyle={{ color: "black", fontFamily: "Lato-Bold" }}
                text={"Follow"}
                onPress={() => {
                  followers.length += 1;
                  setIsFollowing(!isFollowing);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  onFollow(userUID);
                }}
              />
            )}
            <WhiteButton
              style={{
                borderColor: "white",
                flex: 1,
              }}
              buttonStyle={styles.buttonStyle}
              textStyle={{ color: "white", fontFamily: "Lato-Bold" }}
              text={"Message"}
            />
          </View>
        </View>

        {userPosts ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {userPosts.map((item) => renderPosts(item))}
          </View>
        ) : (
          <View
            style={{
              height: Dimensions.get("window").height / 2.3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="post"
              size={150}
              color={theme.dark ? "white" : "black"}
            />
            <Text
              style={{
                margin: 20,
                color: theme.dark ? "white" : "black",
                fontFamily: "Lato-Regular",
                fontSize: 20,
                textTransform: "uppercase",
              }}
            >
              no posts yet
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    containerSafeArea: {
      flex: 1,
    },
    buttonStyle: {
      backgroundColor: "black",
      borderColor: "white",
    },
    username: {
      color: colors.text,
      fontSize: 20,
    },
    email: {
      fontFamily: "Lato-Regular",
      fontSize: 15,
      fontWeight: "400",
      color: "grey",
    },

    textStyle: {
      color: colors.text,
    },
    folowText: {
      color: theme.dark ? "grey" : "black",
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
      marginVertical: actuatedNormalize(15),
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

export default connect(mapStateToProps, mapDispatchProps)(UserPage);
