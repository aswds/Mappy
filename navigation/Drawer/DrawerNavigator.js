import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import {
  createAppContainer,
  createNavigationContainer,
} from "react-navigation";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import {
  Entypo,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomDrawerItems from "../../components/customDrawer";
import { BottomAppNavigator } from "../BotomAppNavigator/BotomAppNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TicketStack } from "../TicketNavigator/TicketsStack";
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import Settings from "../../screens/settings/Settings";
import { useTheme } from "../../Theme/ThemeProvider";
const bottomIconSize = 8;
const DrawerNav = createDrawerNavigator();

export const DrawerNavigator = (props) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme.colors;
  return (
    <DrawerNav.Navigator
      screenOptions={{
        drawerActiveTintColor: colors.text,
        drawerInactiveTintColor: "grey",
      }}
      drawerContent={(props) => <CustomDrawerItems {...props} />}
    >
      <DrawerNav.Screen
        component={BottomAppNavigator}
        name="HomeDrawer"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);

          return {
            swipeEnabled:
              routeName !== "NotificationBottom" &&
              routeName !== "Search" &&
              routeName !== "Map" &&
              routeName !== "ChatStack" &&
              routeName !== "ProfileBottom",
            gestureEnabled: true,
            headerShown: false,
            title: "Home",
            drawerIcon: (tabInfo) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    height: 35,
                    justifyContent: "center",
                    width: 50,
                  }}
                >
                  <View style={styles.drawerLeftIcon}>
                    {tabInfo.focused ? (
                      <View
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign
                          name="caretright"
                          size={13}
                          color={"#199fe8"}
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="home" size={26} color={tabInfo.color} />
                  </View>
                </View>
              );
            },
          };
        }}
      />

      <DrawerNav.Screen
        component={TicketStack}
        name="Tickets"
        options={{
          drawerIcon: (tabInfo) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  height: 35,
                  justifyContent: "center",
                  width: 50,
                }}
              >
                <View style={styles.drawerLeftIcon}>
                  {tabInfo.focused ? (
                    <View
                      style={{
                        justifyContent: "center",
                        marginBottom: 5,
                      }}
                    >
                      <AntDesign
                        name="caretright"
                        size={13}
                        color={"#199fe8"}
                      />
                    </View>
                  ) : null}
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Entypo name="ticket" size={26} color={tabInfo.color} />
                </View>
              </View>
            );
          },
        }}
      />
      <DrawerNav.Screen
        component={Settings}
        name="Settings"
        options={{
          drawerIcon: (tabInfo) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  height: 35,
                  justifyContent: "center",
                  width: 50,
                }}
              >
                <View style={styles.drawerLeftIcon}>
                  {tabInfo.focused ? (
                    <View
                      style={{
                        justifyContent: "center",
                        marginBottom: 5,
                      }}
                    >
                      <AntDesign
                        name="caretright"
                        size={13}
                        color={"#199fe8"}
                      />
                    </View>
                  ) : null}
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Ionicons
                    name="settings-outline"
                    size={26}
                    color={tabInfo.color}
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <DrawerNav.Screen
        component={Settings}
        name="Support"
        options={{
          drawerIcon: (tabInfo) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  height: 35,
                  justifyContent: "center",
                  width: 50,
                }}
              >
                <View style={styles.drawerLeftIcon}>
                  {tabInfo.focused ? (
                    <View
                      style={{
                        justifyContent: "center",
                        marginBottom: 5,
                      }}
                    >
                      <AntDesign
                        name="caretright"
                        size={13}
                        color={"#199fe8"}
                      />
                    </View>
                  ) : null}
                </View>
                <View style={{ marginLeft: 10 }}>
                  <MaterialCommunityIcons
                    name="face-agent"
                    size={26}
                    color={tabInfo.color}
                  />
                </View>
              </View>
            );
          },
        }}
      />
    </DrawerNav.Navigator>
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
