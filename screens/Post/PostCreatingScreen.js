import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapDarkStyle } from "../../components/mapDarkStyle";
import addingPost from "../../components/addingPost";
import firebase from "firebase";
import { uploadMultMedia } from "../../components/uploadMultMedia";
import saveMediaToStorage from "../../components/saveMediaToStorage";
import CustomTopNavigator from "../../components/CustomTopNavigator";
import { useDispatch } from "react-redux";
import { postUploadingStart, postUploadingEnd } from "../../redux/actions";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
const keyboardVerticalOffset =
  Platform.OS === "ios" ? actuatedNormalize(20) : 0;
const iconBorderRadius = 10;

const PostCreatingScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const theme = useTheme();
  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState("");
  const styles = makeStyles(colors);
  useEffect(() => {
    if (route.params?.photos) {
      const photosParam = route.params?.photos;
      if (photosParam) {
        setMedia(photosParam);
      }
      delete route.params?.photos;
    }
  }, [route.params]);

  const dispatch = useDispatch();
  const locationData = route.params?.location;

  const renderImage = (item, i) => {
    return (
      <TouchableOpacity
        style={{
          height: 70,
          width: 70,
          margin: 10,
        }}
        key={i + Math.random()}
      >
        <Image
          style={{ height: "100%", width: "100%", borderRadius: 5 }}
          source={{ uri: item.uri }}
          key={i + Math.random() + "image"}
        />
      </TouchableOpacity>
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={async () => {
              if (media) {
                dispatch(postUploadingStart());
                navigation.navigate("ProfileScreen");
                await uploadMultMedia(media, locationData, caption);
                dispatch(postUploadingEnd());
              } else {
                Alert.alert(
                  "No files found...",
                  "Choose some images to countinue."
                );
              }
            }}
            style={{
              width: actuatedNormalize(60),
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Share</Text>
          </TouchableOpacity>
        );
      },
    });
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            flex: 2,
            backgroundColor: colors.background,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!locationData ? (
            <View
              style={{
                height: actuatedNormalize(180),
                width: actuatedNormalize(180),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  height: actuatedNormalize(180),
                  width: actuatedNormalize(180),
                }}
                onPress={() => {
                  props.navigation.navigate("ChosingLocationScreen");
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(219,219,219,0.33)",
                    borderRadius: iconBorderRadius,
                    shadowOpacity: 0.4,
                    shadowOffset: {
                      height: 2,
                      width: 0,
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="location" size={80} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <MapView
              customMapStyle={mapDarkStyle}
              showsUserLocation
              mapType="standard"
              mapPadding={{ bottom: 0 }}
              region={
                locationData
                  ? {
                      longitude: locationData.longitude,
                      latitude: locationData.latitude,
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.08,
                    }
                  : null
              }
              style={{ ...StyleSheet.absoluteFillObject }}
              provider={PROVIDER_GOOGLE}
            >
              <Marker
                key={Math.random()}
                coordinate={
                  locationData
                    ? {
                        longitude: locationData.longitude,
                        latitude: locationData.latitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.1,
                      }
                    : null
                }
              />
            </MapView>
          )}
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 2 }}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={{ flex: 2 }}>
          <View
            style={{
              height: 100,
              width: Dimensions.get("window").width,
              borderColor: theme.dark ? "grey" : "black",
              borderTopWidth: 1,
              backgroundColor: colors.background,
            }}
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              key={Math.random()}
              contentContainerStyle={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
              style={{
                flex: 1,
                backgroundColor: colors.background,
              }}
            >
              <TouchableOpacity
                style={{ ...styles.modalButton, margin: 10 }}
                onPress={() => {
                  props.navigation.navigate("ImagePicker");
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(219,219,219,0.33)",
                    borderRadius: iconBorderRadius,
                    shadowOpacity: 0.4,
                    shadowOffset: {
                      height: 2,
                      width: 0,
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={40}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
              {media && media.map((item, i) => renderImage(item, i))}
            </ScrollView>
          </View>
          <View
            style={{
              flex: 1,
              borderTopWidth: 1,
              borderColor: theme.dark ? "grey" : "black",
              backgroundColor: colors.background,
            }}
          >
            <TextInput
              placeholder="What's on your mind?"
              placeholderTextColor={"grey"}
              multiline
              onChangeText={(text) => {
                setCaption(text);
              }}
              style={{
                textAlignVertical: "top",
                flex: 1,
                color: colors.text,
                padding: 10,
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    modalButton: {
      height: actuatedNormalize(65),
      width: actuatedNormalize(65),
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

export default PostCreatingScreen;
