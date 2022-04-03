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
  TouchableWithoutFeedback,
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
import { DarkTheme } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import { useDispatch } from "react-redux";
import { switchTheme } from "../redux/actions";
import { theme as AppTheme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../Theme/ThemeProvider";
const CustomDrawerItems = (props) => {
  const { theme, updateTheme } = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(theme.dark);
  const toggleSwitch = async () => {
    if (isDark) {
      await updateTheme(AppTheme);
    } else {
      await updateTheme(DarkTheme);
    }
    setIsDark((isDark) => !isDark);
  };
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
              marginVertical: "10%",
              alignItems: "flex-start",
              marginLeft: "10%",
              flexDirection: "row",
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
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.text,
                  marginHorizontal: "5%",
                }}
              >
                `{props.currentUser.username}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.drawerListItems}>
            <DrawerItemList {...props} />
          </View>
          <View style={styles.preferenceContainer}>
            <View style={{ height: "50%", padding: 10 }}>
              <Text style={{ fontFamily: "Poppins-Bold", color: "grey" }}>
                Preferences
              </Text>
            </View>
            <View style={{ height: "50%" }}>
              <TouchableOpacity
                style={styles.switchContainer}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  toggleSwitch();
                }}
              >
                <Text
                  style={{ fontFamily: "Poppins-Regular", color: colors.text }}
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
              </TouchableOpacity>
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
  drawerListItems: {
    borderColor: "lightgrey",
    borderTopWidth: 2,
    paddingVertical: "5%",
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
