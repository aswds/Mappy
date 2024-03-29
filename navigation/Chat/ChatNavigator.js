import HomeScreen from "../../screens/Home/HomeScreen";
import DirectMessages from "../../screens/Chat/DirectMessages";
import BackButton from "../../components/appNavigatorComponents/BackButton";
import { useNavigation } from "@react-navigation/native";
import Chat from "../../screens/Chat/Chat";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupChat from "../../screens/Chat/GroupChat";
const TopTab = createMaterialTopTabNavigator();
import { useTheme } from "../../Theme/ThemeProvider";
export const ChatNavigator = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: theme.dark ? "black" : colors.primary },
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
    >
      <TopTab.Screen
        component={DirectMessages}
        name="DirectMessages"
        options={{ title: "Direct" }}
      />
      <TopTab.Screen
        component={GroupChat}
        name="GroupChat"
        options={{ title: "Groups" }}
      />
    </TopTab.Navigator>
  );
};
