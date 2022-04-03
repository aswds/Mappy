import ChosingLocationScreen from "../../screens/Post/ChosingLocationScreen";
import PostCreatingScreen from "../../screens/Post/PostCreatingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../../components/appNavigatorComponents/BackButton";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import ImageBrowserScreen from "../../screens/Post/ImageBrowserScreen";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/elements";
import { useTheme } from "../../Theme/ThemeProvider";
const MyPostStack = createNativeStackNavigator();
export const PostCreatingNavigator = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  return (
    <MyPostStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyPostStack.Screen
        name="PostCreatingScreen"
        component={PostCreatingScreen}
        options={{
          title: "Create a new post",
          headerShown: true,
          headerLeft: () => {
            return (
              <BackButton
                onPress={() => {
                  navigation.pop();
                }}
              />
            );
          },
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: theme.dark ? "black" : colors.primary,
          },
        }}
      />
      <MyPostStack.Screen
        name="ChosingLocationScreen"
        component={ChosingLocationScreen}
      />
      <MyPostStack.Screen name="ImagePicker" component={ImageBrowserScreen} />
    </MyPostStack.Navigator>
  );
};
