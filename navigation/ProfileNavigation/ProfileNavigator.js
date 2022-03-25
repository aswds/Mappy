import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import CameraScreen from "../../screens/Profile/camera";
import EditProfile from "../../screens/Profile/EditProfile";
import ImageBrowserScreen from "../../screens/Post/ImageBrowserScreen";
import Settings from "../../screens/settings/Settings";
import { PostCreatingNavigator } from "./PostCreatingNavigator";
import { FollowTopTab } from "./FollowTopTab";
import FollowHeader from "../../components/appNavigatorComponents/FollowHeader";
import { useNavigation } from "@react-navigation/native";
import UserPage from "../../screens/Profile/UserPage";
import { UserTopTabFollow } from "../UserTopTabFollow/UserTopTabFollow";
import { Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
const ProfileNav = createNativeStackNavigator();
export const ProfileNavigator = (props) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { colors } = useTheme();
  return (
    <ProfileNav.Navigator>
      <ProfileNav.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileNav.Screen
        component={UserPage}
        name="UserPageProfile"
        options={{ headerShown: false }}
      />
      <ProfileNav.Screen
        name="UserTopTabProfile"
        component={UserTopTabFollow}
        options={({ route }) => ({
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
      <ProfileNav.Screen
        component={CameraScreen}
        name="Camera"
        options={{ headerShown: false }}
      />
      <ProfileNav.Screen
        component={EditProfile}
        name="EditProfile"
        options={{ headerShown: false }}
      />
      <ProfileNav.Screen component={Settings} name="Settings" />
      <ProfileNav.Screen
        name="ImageBrowserScreen"
        component={ImageBrowserScreen}
        options={{ headerShown: false }}
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
