import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Followers from "../../screens/Profile/Followers";
import Following from "../../screens/Profile/Following";
const ProfileTab = createMaterialTopTabNavigator();
import { useRoute, useTheme } from "@react-navigation/native";
export const ProfileTabNav = (props) => {
  const route = useRoute();
  const theme = useTheme();
  const { colors } = useTheme();
  return (
    <ProfileTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#aaaf",
        tabBarStyle: { backgroundColor: theme.dark ? "black" : colors.primary },
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
      initialRouteName={route.params?.initialScreen}
    >
      <ProfileTab.Screen
        component={Followers}
        name="Followers"
        options={{
          tabBarLabel: "Followers",
        }}
      />
      <ProfileTab.Screen component={Following} name="Following" />
    </ProfileTab.Navigator>
  );
};
