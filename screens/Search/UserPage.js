import {
  Dimensions,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { fetchUser, fetchUserFollowing } from "../../redux/actions";
import { useTheme } from "../../Theme/ThemeProvider";
import UserPageListHeader from "./UserPageListHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RenderPosts from "../Profile/Render_Post_Item/RenderPost";
import { fetchUserPosts } from "./FetchUserFuncs/fetchUserPosts";
import { UserAbout } from "./UserAbout";
const UserPage = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  const route = useRoute();

  const userUID = route.params?.uid;
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
  const insets = useSafeAreaInsets();
  const currentUserUID = firebase.auth().currentUser.uid;
  // return user page
  const styles = makeStyles(colors, theme);
  useEffect(() => {
    fetchUserPosts(userUID).then((posts) => setUserPosts(posts));
  }, []);

  const renderPosts = ({ item }) => {
    return <RenderPosts item={item} />;
  };
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1500);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs.Container
        HeaderComponent={UserPageListHeader}
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
            data={userPosts}
            initialNumToRender={5}
            removeClippedSubviews
            legacyImplementation
            keyExtractor={(item) => item.id}
            renderItem={renderPosts}
          />
        </Tabs.Tab>
        <Tabs.Tab name="About">
          <Tabs.ScrollView style={styles.tabScrollView}>
            <UserAbout />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    tabFlatList: {
      flex: 1,
      backgroundColor: colors.background,
    },
    containerSafeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    buttonStyle: {
      backgroundColor: colors.tabColor,
      borderColor: colors.border,
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

export default connect(mapStateToProps, mapDispatchProps)(UserPage);
