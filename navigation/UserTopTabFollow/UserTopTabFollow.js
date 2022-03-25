import UserFollowers from "../../screens/Search/UserFollowers";
import UserFollowing from "../../screens/Search/UserFollowing";
import FollowUserPageHeader from "../../components/userPageHeader/HeaderTitle";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const UserTopTabFollowNav = createMaterialTopTabNavigator();
export const UserTopTabFollow = (props) => {
  const route = useRoute();
  const theme = useTheme();
  const { colors } = useTheme();
  return (
    <UserTopTabFollowNav.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#aaaf",
        tabBarStyle: { backgroundColor: theme.dark ? "black" : colors.primary },
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
      initialRouteName={route.params?.initialScreen}
    >
      <UserTopTabFollowNav.Group>
        <UserTopTabFollowNav.Screen
          name="UserFollowers"
          options={{ tabBarLabel: "Followers" }}
          initialParams={{
            userUID: route.params?.userUID,
            routeName: route.params?.routeName,
          }}
        >
          {(props) => <UserFollowers {...props} />}
        </UserTopTabFollowNav.Screen>
        <UserTopTabFollowNav.Screen
          name="UserFollowing"
          options={{ tabBarLabel: "Following" }}
          initialParams={{
            userUID: route.params?.userUID,
            routeName: route.params?.routeName,
          }}
        >
          {(props) => <UserFollowing {...props} />}
        </UserTopTabFollowNav.Screen>
      </UserTopTabFollowNav.Group>
    </UserTopTabFollowNav.Navigator>
  );
};
