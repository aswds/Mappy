import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import * as Progress from "react-native-progress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import {
  fetchUser,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserPosts,
} from "../../../redux/actions";
import { useTheme } from "../../../Theme/ThemeProvider";
import ProfileListHeader from "./ProfileListHeader";
import { About } from "../ProfileTabScreens/About";
import { RenderPosts } from "../Render_Post_Item/RenderPost";
const ProfileScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const { theme } = useTheme();
  const colors = theme.colors;
  const { postIsUploading, posts } = props;

  const navigation = useNavigation();
  const route = useRoute();
  const styles = makeStyles(colors, theme);
  const userLoading = useSelector((state) => {
    return state.userState.loading;
  });
  const insets = useSafeAreaInsets();
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1500);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs.Container
        HeaderComponent={ProfileListHeader}
        headerContainerStyle={{}}
        TabBarComponent={(props) => (
          <MaterialTabBar
            {...props}
            style={{
              backgroundColor: colors.background,
            }}
            activeColor={colors.text}
            inactiveColor="grey"
            inactiveOpacity={1}
            labelStyle={{
              fontSize: 13,
              fontFamily: "WorkSans-Bold",
            }}
          />
        )}
      >
        <Tabs.Tab name="Posts">
          <Tabs.FlatList
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
                style={{ justifyContent: "center", alignItems: "center" }}
                tintColor={colors.text}
              />
            }
            style={styles.tabFlatList}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <RenderPosts item={item} key={item.id} />;
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab name="About">
          <Tabs.ScrollView style={styles.tabScrollView}>
            <About />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
      <TouchableOpacity
        style={styles.addingPost}
        onPress={() => {
          navigation.navigate("PostCreatingNavigator", {
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
    </SafeAreaView>
  );
};
const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    aboutMe: {},
    addingPost: {
      position: "absolute",
      zIndex: 1,
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
    tabFlatList: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabScrollView: {
      flex: 1,
      backgroundColor: colors.background,
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
