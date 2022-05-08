import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import CameraScreen from "../../screens/Profile/EditProfile/camera";
import EditProfile from "../../screens/Profile/EditProfile/EditProfile";
import ImageBrowserScreen from "../../screens/Post/ImageBrowserScreen";
import Settings from "../../screens/settings/Settings";
import { PostCreatingNavigator } from "./PostCreatingNavigator";
import { FollowTopTab } from "./FollowTopTab";
import FollowHeader from "../../components/appNavigatorComponents/FollowHeader";
import { useNavigation } from "@react-navigation/native";
import UserPage from "../../screens/Profile/UserPage";
import { UserTopTabFollow } from "../UserTopTabFollow/UserTopTabFollow";
import { Platform, View, Image } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "../../Theme/ThemeProvider";
import EditAbout from "../../screens/Profile/ProfileTabScreens/EditAbout";
const ProfileNav = createNativeStackNavigator();
export const ProfileNavigator = (props) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme.colors;
  return (
    <ProfileNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <ProfileNav.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileNav.Screen component={UserPage} name="UserPageProfile" />

      <ProfileNav.Screen
        name="UserTopTabProfile"
        component={UserTopTabFollow}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.username,
          headerStyle: {
            backgroundColor: theme.dark ? "black" : colors.primary,
          },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        })}
        initialParams={({ route }) => {
          routeName: route.params?.routeName;
        }}
      />
      <ProfileNav.Screen component={CameraScreen} name="Camera" />

      <ProfileNav.Screen component={Settings} name="Settings" />
      <ProfileNav.Screen
        name="ImageBrowserScreen"
        component={ImageBrowserScreen}
      />

      <ProfileNav.Screen
        component={FollowTopTab}
        name="Follow"
        options={{
          headerShown: true,
          headerTitle: () => {
            return <FollowHeader />;
          },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: theme.dark ? "black" : colors.primary,
          },
          headerTintColor: "white",
        }}
      />
    </ProfileNav.Navigator>
  );
};
