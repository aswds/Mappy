import { UserTopTabFollow } from "../UserTopTabFollow/UserTopTabFollow";
import UserPage from "../../screens/Search/UserPage";
import SearchScreen from "../../screens/Search/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../Theme/ThemeProvider";
const SearchNav = createNativeStackNavigator();
export const SearchNavigator = () => {
  const route = useRoute();
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();

  return (
    <SearchNav.Navigator screenOptions={{ headerShown: false }}>
      <SearchNav.Group>
        <SearchNav.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{}}
        />
        <SearchNav.Screen
          name="UserPageSearch"
          component={UserPage}
          options={{
            headerShown: false,
          }}
        />
        <SearchNav.Screen
          name="UserTopTab"
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
        />
      </SearchNav.Group>
    </SearchNav.Navigator>
  );
};
