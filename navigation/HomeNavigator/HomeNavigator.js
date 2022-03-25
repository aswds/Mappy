import HomeScreen from "../../screens/Home/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useTheme } from "@react-navigation/native";
import { actuatedNormalize } from "../../components/actuaterNormalize";
const HomeStack = createNativeStackNavigator();

export const HomeNavigator = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={HomeScreen}
        name="Home"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.dark ? "black" : colors.primary,
          },
          headerTintColor: "white",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
                style={{
                  justifyContent: "center",
                  height: "100%",
                  marginRight: actuatedNormalize(10),
                }}
              >
                <Ionicons name="menu-outline" size={30} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};
