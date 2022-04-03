import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { getHeaderTitle, HeaderBackButton } from "@react-navigation/elements";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { CenterHeaderComponent } from "./CenterHeaderComp";
import { actuatedNormalize } from "../actuaterNormalize";
import { RightComponent } from "./RightComponent";
import { useTheme } from "../../Theme/ThemeProvider";
export const ChatHeader = (props) => {
  const title = getHeaderTitle(props.options, props.route.name);
  const { theme } = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  return (
    // <View
    //   style={{
    //     backgroundColor: "black",
    //     flexDirection: "row",
    //     alignItems: "flex-end",
    //     height: 100,
    //   }}
    // >
    //   <HeaderBackButton
    //     labelVisible={false}
    //     tintColor="white"
    //     onPress={() => {
    //       navigation.goBack();
    //     }}
    //     style={{
    //       justifyContent: "center",
    //     }}
    //   />
    //   <TouchableOpacity
    //     style={{ flexDirection: "column", alignSelf: "center" }}
    //   >
    //     <CenterHeaderComponent {...props} />
    //   </TouchableOpacity>
    //   <TouchableOpacity style={{ flexDirection: "column" }}></TouchableOpacity>
    // </View>
    <Header
      containerStyle={{
        backgroundColor: theme.dark ? "black" : colors.primary,
      }}
      centerContainerStyle={{ marginRight: "30%" }}
      leftComponent={
        <HeaderBackButton
          labelVisible={false}
          tintColor="white"
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            justifyContent: "center",
          }}
        />
      }
      centerComponent={<CenterHeaderComponent {...props} />}
      rightComponent={<RightComponent {...props} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
