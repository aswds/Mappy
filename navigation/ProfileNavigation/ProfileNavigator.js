import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FollowHeader from "../../components/appNavigatorComponents/FollowHeader";
import MapScreen from "../../screens/Map/MapScreen";
import ImageBrowserScreen from "../../screens/Post/ImageBrowserScreen";
import CameraScreen from "../../screens/Profile/EditProfile/camera";
import ProfileScreen from "../../screens/Profile/ProfileScreen/ProfileScreen";
import UserPage from "../../screens/Profile/UserPage";
import Settings from "../../screens/settings/Settings";
import { useTheme } from "../../Theme/ThemeProvider";
import { UserTopTabFollow } from "../UserTopTabFollow/UserTopTabFollow";
import { FollowTopTab } from "./FollowTopTab";
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
      <ProfileNav.Screen
        name="ImageBrowserScreen"
        component={ImageBrowserScreen}
      />
      <ProfileNav.Screen component={Settings} name="Settings" />

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
