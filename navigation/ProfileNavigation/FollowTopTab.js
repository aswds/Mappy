import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Followers from "../../screens/Profile/Followers";
import Following from "../../screens/Profile/Following";
const MyFollowTopTab = createMaterialTopTabNavigator();
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../Theme/ThemeProvider";
export const FollowTopTab = (props) => {
  const route = useRoute();
  const { theme } = useTheme();
  const colors = theme.colors;
  return (
    <MyFollowTopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#aaaf",
        tabBarStyle: { backgroundColor: theme.dark ? "black" : colors.primary },
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
      initialRouteName={route.params?.initialScreen}
    >
      <MyFollowTopTab.Screen
        component={Followers}
        name="Followers"
        options={{
          tabBarLabel: "Followers",
        }}
      />
      <MyFollowTopTab.Screen component={Following} name="Following" />
    </MyFollowTopTab.Navigator>
  );
};
