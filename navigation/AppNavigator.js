import { useState } from "react";

import { useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import FollowHeader from "../components/appNavigatorComponents/FollowHeader";
import { ChatHeader } from "../components/Chat/ChatHeader";
import Chat from "../screens/Chat/Chat";
import CameraScreen from "../screens/Profile/EditProfile/camera";
import EditProfile from "../screens/Profile/EditProfile/EditProfile";
import EditAbout from "../screens/Profile/ProfileTabScreens/EditAbout";
import { useTheme } from "../Theme/ThemeProvider";
import { ChatNavigator } from "./Chat/ChatNavigator";
import { DrawerNavigator } from "./Drawer/DrawerNavigator";
import { FollowTopTab } from "./ProfileNavigation/FollowTopTab";
import { PostCreatingNavigator } from "./ProfileNavigation/PostCreatingNavigator";
const bottomIconSize = 8;
const Stack = createNativeStackNavigator();
export const AppNavigator = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [isDark, setIsDark] = useState();
  const styles = makeStyles(colors);
  const navigation = useNavigationContainerRef();
  const userState = useSelector((state) => state.userState.currentUser);
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen component={DrawerNavigator} name="Home" />
        <Stack.Screen
          component={ChatNavigator}
          name="ChatStack"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.dark ? "black" : colors.primary,
            },
            title: "Messages",
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 18 },
          }}
        />
        <Stack.Screen
          component={Chat}
          name="Chat"
          options={({ route }) => ({
            header: (props) => <ChatHeader {...props} />,
            headerShown: true,
          })}
        />
        <Stack.Screen
          component={PostCreatingNavigator}
          name="PostCreatingNavigator"
        />
        <Stack.Screen
          component={FollowTopTab}
          name="ProfileFollow"
          options={{
            headerShown: true,
            headerTitle: () => {
              return <FollowHeader />;
            },

            headerTintColor: "white",
            headerStyle: {
              backgroundColor: theme.dark ? "black" : colors.primary,
            },
          }}
        />
        <Stack.Screen component={EditProfile} name="EditProfile" />
        <Stack.Screen
          name="EditAbout"
          component={EditAbout}
          options={{ headerShown: false }}
        />
        <Stack.Screen component={CameraScreen} name="CameraStack" />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
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
