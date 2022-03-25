import React from "react";
import DataRecovery from "../screens/recovery/Data";
import LoginScreen from "../screens/Loging&Register/Login";
import RegisterScreen from "../screens/Loging&Register/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DarkTheme,
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { NameModal } from "../screens/Loging&Register/NameModal";
import { theme } from "../components/theme";
import { AvatarChoose } from "../screens/Loging&Register/AvatarChoose";
import CameraScreen from "../screens/Profile/camera";
import { PasswordRules } from "../screens/Loging&Register/PasswordRules";
import BackButton from "../components/appNavigatorComponents/BackButton";
const Stack = createNativeStackNavigator();

export const LoginAndRegister = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigationContainerRef();
  return (
    <NavigationContainer theme={theme} ref={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={LoginScreen} name="LoginScreen" />
        <Stack.Screen component={DataRecovery} name="DataRecovery" />
        <Stack.Group>
          <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
          <Stack.Screen component={NameModal} name="NameInfo" />
          <Stack.Screen component={AvatarChoose} name="Avatar" />
          <Stack.Screen component={CameraScreen} name="CameraStack" />
          <Stack.Screen
            component={PasswordRules}
            name="PasswordRules"
            options={{
              headerShown: true,
              headerTitle: "Check this carefully 🧐",
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: colors.primary,
              },
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
