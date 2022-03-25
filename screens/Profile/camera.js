import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import StyledButton from "../../components/button";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { uploadImage } from "../../components/ProfileFunc/uploadImage";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { PreviewCamera } from "./PreviewCamera";
import { useRoute } from "@react-navigation/native";
let camera: Camera;
const CameraScreen = (props) => {
  const [autofocus, setAutofocus] = useState(Camera.Constants.AutoFocus.on);
  const [intensity, setIntensity] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashType, setFlashType] = useState(Camera.Constants.FlashMode.off);
  const route = useRoute();
  function __retakePicture() {
    setImage(null);
  }
  const blurBackground = () => {
    setIntensity(85);
    setTimeout(() => setIntensity(0), 500);
  };
  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();

      if (type == Camera.Constants.Type.front) {
        photo = await manipulateAsync(
          photo.localUri || photo.uri,
          [{ rotate: 180 }, { flip: FlipType.Vertical }],
          { compress: 1, format: SaveFormat.PNG }
        );
        setImage(photo.uri);
      } else {
        setImage(photo.uri);
      }
    } else {
      Alert.alert("No camera found");
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StyledButton onPress={Camera.requestCameraPermissionsAsync()} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        {image ? (
          <PreviewCamera
            photo={image}
            retakePicture={__retakePicture}
            routeName={route.params.routeName}
          />
        ) : (
          <Camera
            flashMode={flashType}
            ref={(ref) => {
              camera = ref;
            }}
            style={styles.camera}
            type={type}
            ratio={"1:1"}
            autoFocus={autofocus}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
            }}
          >
            <BlurView intensity={intensity} style={{ flex: 1 }} tint={"dark"}>
              <TapGestureHandler
                onActivated={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                  blurBackground();
                }}
                numberOfTaps={2}
              >
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <View
                    style={{
                      width: "100%",
                      height: 100,
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setFlashType(
                          flashType === Camera.Constants.FlashMode.off
                            ? Camera.Constants.FlashMode.on
                            : Camera.Constants.FlashMode.off
                        );
                      }}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowOpacity: 0.4,
                        shadowOffset: {
                          height: 0,
                          width: 0,
                        },
                        shadowRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Ionicons
                        name={
                          flashType === Camera.Constants.FlashMode.off
                            ? "flash-off"
                            : "flash"
                        }
                        size={40}
                        color="white"
                      />
                    </TouchableOpacity>

                    <View style={{ width: 100, alignItems: "center" }}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                          backgroundColor: "rgba(52, 52, 52, 0.8)",
                          borderRadius: 20,
                          width: 70,
                          alignItems: "center",
                          shadowOpacity: 0.4,
                          shadowOffset: {
                            height: 0,
                            width: 0,
                          },
                          shadowRadius: 2,
                        }}
                        onPress={() => {
                          takePicture();
                        }}
                      >
                        <FontAwesome
                          name="dot-circle-o"
                          size={70}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowOpacity: 0.4,
                        shadowOffset: {
                          height: 0,
                          width: 0,
                        },
                        shadowRadius: 2,
                      }}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}
                    >
                      <Ionicons name="sync" size={50} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TapGestureHandler>
            </BlurView>
          </Camera>
        )}
      </SafeAreaView>
    </View>
  );
};
CameraScreen.navigationOptions = {
  headerTransparent: true,
  title: "",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
});
export default CameraScreen;
