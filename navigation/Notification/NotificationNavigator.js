import HomeScreen from "../../screens/Home/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DirectMessages from "../../screens/Chat/DirectMessages";
import NotificationScreen from "../../screens/Chat/NotificationScreen";
import ChatButton from "../../components/notificationNav/headerRightChat";
import BackButton from "../../components/appNavigatorComponents/BackButton";
import { useNavigation, useTheme } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
export const NotificationNavigator = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={NotificationScreen}
        name="NotificationScreen"
        options={{
          headerShown: true,
          headerRight: () => {
            return <ChatButton />;
          },
          headerStyle: { backgroundColor: colors.background },
          title: "Notifications",
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 18 },
        }}
      />
    </Stack.Navigator>
  );
};
