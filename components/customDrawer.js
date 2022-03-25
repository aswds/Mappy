import firebase from "firebase";

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { Drawer } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as Haptics from "expo-haptics";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import { connect, useSelector } from "react-redux";
import { actuatedNormalize } from "./actuaterNormalize";
import { DarkTheme, DefaultTheme, useTheme } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import { useDispatch } from "react-redux";
import { switchTheme } from "../redux/actions";
import { theme as AppTheme } from "./theme";

const CustomDrawerItems = (props) => {
  const themeIsDark = useSelector((state) => state.themeState.theme.dark);
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(themeIsDark);
  const toggleSwitch = () => {
    setIsDark((isDark) => !isDark);
    if (isDark) {
      dispatch(switchTheme(AppTheme));
    } else {
      dispatch(switchTheme(DarkTheme));
    }
  };
  const { colors } = useTheme();
  const theme = useTheme();
  useEffect(() => {
    props.fetchUser();
  }, [props.navigation]);

  if (props.currentUser == undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="small" />
      </View>
    );
  }
  const image = props.currentUser.userImage;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <DrawerContentScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              marginBottom:
                Dimensions.get("window").height >= 800
                  ? 0
                  : actuatedNormalize(20),
              alignItems: "flex-start",
              marginLeft: "10%",
            }}
          >
            <View
              style={{
                height: actuatedNormalize(70),
                width: actuatedNormalize(70),
                borderRadius: 100,
                overflow: "hidden",
                borderWidth: 2,
                backgroundColor: "black",
              }}
            >
              <Image
                source={
                  image ? { uri: image } : require("../src/image/logoAuth.png")
                }
                style={{ height: "100%", width: "100%" }}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: "10%",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "700", color: colors.text }}
              >
                `{props.currentUser.username}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <DrawerItemList {...props} />
          </View>
          <View style={styles.preferenceContainer}>
            <View style={{ height: "50%", padding: 10 }}>
              <Text style={{ fontFamily: "Poppins-Bold", color: "grey" }}>
                Preferences
              </Text>
            </View>
            <View style={{ height: "50%" }}>
              <View style={styles.switchContainer}>
                <Text
                  style={{ fontFamily: "Poppins-Regular", color: colors.text }}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    toggleSwitch();
                  }}
                >
                  Dark theme
                </Text>
                <Switch
                  trackColor={{ false: "#b0b0b0", true: "#3b3b3b" }}
                  thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isDark}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.drawerBottom}>
        <DrawerItem
          icon={() => {
            return <Entypo name="log-out" size={24} color={colors.text} />;
          }}
          label="Sign Out"
          labelStyle={{ color: colors.text }}
          onPress={() => {
            Alert.alert(
              "Logout?",
              "",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    firebase.auth().signOut();
                  },
                  style: "defalut",
                },
                {
                  text: "No",
                  style: "default",
                },
              ],
              {}
            );
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    height: Dimensions.get("window").width / 4.5,
  },
  label: {
    margin: 16,
    fontWeight: "bold",
    color: "white",
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 40,
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  drawerBottom: {
    marginBottom: 15,
  },
  preferenceContainer: {
    height: Platform.OS === "ios" ? "30%" : Dimensions.get("window").height / 5,
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "lightgrey",
    justifyContent: "center",
  },
  preferencesText: {
    fontFamily: "WorkSans-Regular",
    color: "grey",
    fontSize: 12,
  },
});
const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, mapDispatchProps)(CustomDrawerItems);
