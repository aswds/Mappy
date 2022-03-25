import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MediaType } from "expo-media-library";
import { Asset } from "expo-media-library";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import CustomTopNavigator from "../../components/CustomTopNavigator";
import { useNavigation } from "@react-navigation/native";
const ForceInset = {
  top: "never",
  bottom: "never",
};
// IOS users , make sure u can use the images uri to upload , if your getting invalid file path or u cant work with asset-library://
// Use = > getImageMetaData: true which will be little slower but give u also the absolute path of the Asset. just console loge the result to see the localUri

// See => https://docs.expo.dev/versions/latest/sdk/media-library/#assetinfo

export default function ImageBrowserScreen(props) {
  const navigation = useNavigation();
  const onSuccess = (data: Asset[]) => {
    navigation.navigate("PostCreatingScreen", { photos: data });
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was an error while loading images.",
        hasErrorWithResizing: "There was an error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: true, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      maxSelection: 5,
      portraitCols: 5,
      landscapeCols: 5,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 200,
      compress: 0.5,
      base64: false,
      saveTo: "jpeg",
    }),
    []
  );

  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    // backgroundColor: "white",
    borderRadius: 5,
    height: actuatedNormalize(30),
    margin: actuatedNormalize(5),
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "Done",
        back: "Back",
        selected: "selected",
      },

      midTextColor: "white",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        navigation.goBack();
      },
      onSuccess: (files: Asset[]) => onSuccess(files),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "black",
      spinnerColor: "white",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "white",
        size: 20,
      },
      selectedIcon: {
        Component: AntDesign,
        iconName: "check",
        color: "white",
        bg: "rgba(0,0,0,0.45)",
        size: 26,
      },
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <View style={styles.container}>
          <AssetsSelector
            Navigator={widgetNavigator}
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Resize={widgetResize}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
