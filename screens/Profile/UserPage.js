import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import RenderPosts from "./RenderPost";
import { fetchUser, fetchUserFollowing } from "../../redux/actions";
import { useTheme } from "../../Theme/ThemeProvider";
import { About } from "./ProfileTabScreens/About";
import UserHeader from "./UserHeader";
import { fetchUserPosts } from "../Search/FetchUserFuncs/fetchUserPosts";
import { fetchUserPage } from "../Search/FetchUserFuncs/fetchUserPage";
import { fetchUserPageFollowers } from "../Search/FetchUserFuncs/fetchUserPageFollowers";
import { fetchUserPageFollowing } from "../Search/FetchUserFuncs/fetchUserPageFollowing";
const UserPage = (props) => {
  const [userPosts, setUserPosts] = useState();
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = theme.colors;
  const userUID = route.params?.uid;
  useEffect(() => {
    fetchUserPosts(userUID).then((_posts) => setUserPosts(_posts));
  }, []);
  const renderPosts = ({ item }) => {
    return <RenderPosts item={item} />;
  };
  const styles = makeStyles(colors, theme);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1500);
  };
  return (
    <Tabs.Container
      HeaderComponent={UserHeader}
      headerContainerStyle={{}}
      TabBarComponent={(props) => (
        <MaterialTabBar
          {...props}
          style={{
            backgroundColor: colors.background,
            paddingTop: insets.top,
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
      {console.log("d")}
      <Tabs.Tab name="Posts">
        <Tabs.FlatList
          style={styles.tabFlatList}
          data={userPosts}
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
        <Tabs.ScrollView
          style={{ flex: 1, backgroundColor: colors.background }}
        >
          <About />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    containerSafeArea: {
      flex: 1,
    },
    tabFlatList: {
      flex: 1,
      backgroundColor: colors.background,
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
