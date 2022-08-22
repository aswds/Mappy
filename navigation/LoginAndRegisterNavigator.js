import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { theme } from "../components/theme";
import { AvatarChoose } from "../screens/Loging&Register/AvatarChoose";
import LoginScreen from "../screens/Loging&Register/Login/Login";
import { NameModal } from "../screens/Loging&Register/NameModal";
import { PasswordRules } from "../screens/Loging&Register/PasswordRules";
import RegisterScreen from "../screens/Loging&Register/Register";
import CameraScreen from "../screens/Profile/EditProfile/camera";
import DataRecovery from "../screens/recovery/Data";
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
