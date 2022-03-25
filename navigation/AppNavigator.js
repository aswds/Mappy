import { useEffect, useState } from "react";

import { View, StyleSheet, Platform, ActivityIndicator } from "react-native";
import {
  Feather,
  Entypo,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DirectMessages from "../screens/Chat/DirectMessages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../components/appNavigatorComponents/BackButton";
import { DrawerNavigator } from "./Drawer/DrawerNavigator";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import PostCreatingScreen from "../screens/Post/PostCreatingScreen";
import { PostCreatingNavigator } from "./ProfileNavigation/PostCreatingNavigator";
import CameraScreen from "../screens/Profile/camera";
import { useSelector } from "react-redux";
import { FollowTopTab } from "./ProfileNavigation/FollowTopTab";
import FollowHeader from "../components/appNavigatorComponents/FollowHeader";
import { ChatNavigator } from "./Chat/ChatNavigator";
import Chat from "../screens/Chat/Chat";
import { ChatHeader } from "../components/Chat/ChatHeader";
import IntroSlider from "./introNav/IntroSlider";
import AsyncStorage from "@react-native-async-storage/async-storage";
const bottomIconSize = 8;
const Stack = createNativeStackNavigator();
export const AppNavigator = (props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigationContainerRef();
  const theme = useSelector((state) => state.themeState.theme);
  const [firstLaunch, setFirstLaunch] = useState();
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", JSON.stringify(true));
        setFirstLaunch(true);
      } else {
        AsyncStorage.setItem("alreadyLaunced", JSON.stringify(false));
        setFirstLaunch(false);
      }
      AsyncStorage.clear();
    }, []);
  });

  if (firstLaunch) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={IntroSlider}
            name="IntroSlider"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer theme={theme} ref={navigation}>
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
        <Stack.Screen component={CameraScreen} name="CameraStack" />
      </Stack.Navigator>
    </NavigationContainer>
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
