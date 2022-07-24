import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import BackButton from "../../components/appNavigatorComponents/BackButton";
import ChosingLocationScreen from "../../screens/Post/ChosingLocationScreen";
import ImageBrowserScreen from "../../screens/Post/ImageBrowserScreen";
import { Description } from "../../screens/Post/PostCreatingScreens/DescriptionScreen";
import PostCreatingScreen from "../../screens/Post/PostCreatingScreens/PostCreatingScreen";
import { useTheme } from "../../Theme/ThemeProvider";
const MyPostStack = createNativeStackNavigator();
export const PostCreatingNavigator = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  const styles = makeStyles(colors, theme);
  const headerOptions = ({ title }) => {
    return {
      headerShown: true,
      title: title,

      headerTintColor: "white",
      headerStyle: { backgroundColor: theme.dark ? "black" : colors.primary },
    };
  };
  return (
    <MyPostStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: styles.headerStyle,
      }}
    >
      <MyPostStack.Screen
        name="PostCreatingScreen"
        component={PostCreatingScreen}
        options={{
          ...headerOptions({ title: "Create new post" }),
          headerLeft: () => {
            return <BackButton onPress={() => navigation.goBack()} />;
          },
        }}
      />
      <MyPostStack.Screen
        name="ChosingLocationScreen"
        component={ChosingLocationScreen}
      />
      <MyPostStack.Screen
        name="Description"
        component={Description}
        options={{
          ...headerOptions({ title: "Description" }),
          headerLeft: () => {
            return (
              <BackButton
                onPress={() => navigation.navigate("PostCreatingScreen")}
              />
            );
          },
        }}
      />
      <MyPostStack.Screen name="ImagePicker" component={ImageBrowserScreen} />
    </MyPostStack.Navigator>
  );
};

const makeStyles = (colors: any, theme: any) =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: theme.dark ? "black" : colors.primary,
    },
  });
