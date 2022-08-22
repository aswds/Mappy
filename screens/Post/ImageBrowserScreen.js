import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AssetsSelector } from "expo-images-picker";
import { Asset, MediaType } from "expo-media-library";
import React, { useMemo } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { actuatedNormalize } from "../../components/actuaterNormalize";
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
    const db = data;
    let i = 0;
    db.forEach((item) => {
      i += 1;
      item.id = i;
    });
    navigation.navigate("Description", { photos: db });
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
      maxSelection: 7,
      portraitCols: 5,
      landscapeCols: 5,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 1080,
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
