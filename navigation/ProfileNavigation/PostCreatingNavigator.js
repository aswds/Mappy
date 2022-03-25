import ChosingLocationScreen from "../../screens/Post/ChosingLocationScreen";
import PostCreatingScreen from "../../screens/Post/PostCreatingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../../components/appNavigatorComponents/BackButton";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import ImageBrowserScreen from "../../screens/Post/ImageBrowserScreen";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
const MyPostStack = createNativeStackNavigator();
export const PostCreatingNavigator = (props) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <MyPostStack.Navigator screenOptions={{ headerShown: false }}>
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
