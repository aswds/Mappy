import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import ChatButton from "../../components/notificationNav/headerRightChat";
import NotificationScreen from "../../screens/Chat/NotificationScreen";
import MapScreen from "../../screens/Map/MapScreen";
import { useTheme } from "../../Theme/ThemeProvider";
import { HomeNavigator } from "../HomeNavigator/HomeNavigator";
import { ProfileNavigator } from "../ProfileNavigation/ProfileNavigator";
import { SearchNavigator } from "../SearchNavigator/SearchNavigator";
useTheme;
const bottomIconSize = 8;
const BottomTab = createBottomTabNavigator();
export const BottomAppNavigator = (props) => {
  const { theme } = useTheme();

  const colors = theme.colors;
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.dark ? colors.text : "white",
        tabBarInactiveTintColor: "lightgrey",
        tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.dark ? "black" : colors.primary,
          borderTopWidth: 0,
        },
        headerBackTitleVisible: false,
      }}
    >
      <BottomTab.Screen
        component={HomeNavigator}
        name="HomeBottom"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <View style={styles.icon}>
                <Ionicons
                  name={tabInfo.focused ? "md-home-sharp" : "md-home-outline"}
                  size={26}
                  color={tabInfo.color}
                />
                <View style={styles.lowerIcon}>
                  {tabInfo.focused ? (
                    <AntDesign
                      name="caretup"
                      size={bottomIconSize}
                      color={theme.dark ? "#199fe8" : "deeppink"}
                    />
                  ) : null}
                </View>
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="account-search-outline"
                  size={26}
                  color={tabInfo.color}
                />
                <View style={styles.lowerIcon}>
                  {tabInfo.focused ? (
                    <AntDesign
                      name="caretup"
                      size={bottomIconSize}
                      color={theme.dark ? "#199fe8" : "coral"}
                    />
                  ) : null}
                </View>
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        component={MapScreen}
        name="Map"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <View style={styles.icon}>
                <Ionicons
                  name={tabInfo.focused ? "map" : "map-outline"}
                  size={30}
                  color={tabInfo.color}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        component={NotificationScreen}
        name="NotificationBottom"
        options={{
          headerShown: true,
          headerRight: () => {
            return <ChatButton />;
          },
          headerStyle: {
            backgroundColor: theme.dark ? "black" : colors.primary,
          },
          title: "Notifications",
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 18 },
          tabBarBadge: 1,
          tabBarIcon: (tabInfo) => {
            return (
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name={tabInfo.focused ? "inbox-full" : "inbox-full-outline"}
                  size={26}
                  color={tabInfo.color}
                />
                <View style={styles.lowerIcon}>
                  {tabInfo.focused ? (
                    <AntDesign
                      name="caretup"
                      size={bottomIconSize}
                      color={theme.dark ? "#199fe8" : "red"}
                    />
                  ) : null}
                </View>
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="ProfileBottom"
        component={ProfileNavigator}
        options={{
          headerShown: false,

          tabBarIcon: (tabInfo) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View style={{ justifyContent: "center" }}>
                  <Feather name="user" size={26} color={tabInfo.color} />
                </View>
                <View style={styles.lowerIcon}>
                  {tabInfo.focused ? (
                    <AntDesign
                      name="caretup"
                      size={7}
                      color={theme.dark ? "#199fe8" : "lightcyan"}
                    />
                  ) : null}
                </View>
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerIcon: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
  },
  drawerLeftIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
