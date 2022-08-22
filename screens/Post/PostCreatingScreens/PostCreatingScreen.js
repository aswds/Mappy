import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch } from "react-redux";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import { mapDarkStyle } from "../../../components/mapDarkStyle";
import { RatingButton } from "../../../components/Post/RatingButtonPostCreating";
import { uploadMultMedia } from "../../../components/uploadMultMedia";
import { postUploadingEnd, postUploadingStart } from "../../../redux/actions";
import { useTheme } from "../../../Theme/ThemeProvider";

const PostCreatingScreen = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const keyboardVerticalOffset = useHeaderHeight();
  const navigation = useNavigation();
  const textInputRef = useRef();
  const route = useRoute();
  const dispatch = useDispatch();
  const [rateCaption, setRateCaption] = useState("");
  const [rate, setRate] = useState();

  const [inputHeight, setInputHeight] = useState(40);
  const styles = makeStyles(colors, theme, inputHeight);
  useEffect(() => {
    if (route.params?.photos) {
      setMedia(route.params?.photos);
      delete route.params?.photos;
    }
  }, [route.params?.photos]);

  const locationData = route.params?.location;
  const rateBackground = "rgba(219,219,219,0.6)";
  const iconColor = theme.dark ? colors.background : "black";
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
                  height: actuatedNormalize(150),
                  width: actuatedNormalize(150),
                }}
                onPress={() => {
                  props.navigation.navigate("ChosingLocationScreen");
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(219,219,219,0.33)",
                    borderRadius: 10,
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

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Rate your trip</Text>
      </View>
      <View style={styles.scrollViewContainer}>
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
          <RatingButton
            backgroundColor={rate === 5 ? "#57e32c" : rateBackground}
            onPress={() => setRate(5)}
            icon={
              <MaterialCommunityIcons
                name="emoticon-excited-outline"
                size={35}
                color={iconColor}
              />
            }
          />
          <RatingButton
            backgroundColor={rate === 4 ? "#b7dd29" : rateBackground}
            onPress={() => setRate(4)}
            icon={
              <MaterialCommunityIcons
                name="emoticon-happy-outline"
                size={35}
                color={iconColor}
              />
            }
          />
          <RatingButton
            backgroundColor={rate === 3 ? "#ffe234" : rateBackground}
            onPress={() => setRate(3)}
            icon={
              <MaterialCommunityIcons
                name="emoticon-neutral-outline"
                size={35}
                color={iconColor}
              />
            }
          />
          <RatingButton
            backgroundColor={rate === 2 ? "#ffa534" : rateBackground}
            onPress={() => setRate(2)}
            icon={
              <MaterialCommunityIcons
                name="emoticon-confused-outline"
                size={35}
                color={iconColor}
              />
            }
          />
          <RatingButton
            backgroundColor={rate === 1 ? "#ff4545" : rateBackground}
            onPress={() => setRate(1)}
            icon={
              <MaterialCommunityIcons
                name="emoticon-sad-outline"
                size={35}
                color={iconColor}
              />
            }
          />
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 2 }}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.titleContainer}>
          <View style={{ paddingTop: 10 }}>
            <Text style={styles.title}>Tello about</Text>
          </View>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: theme.dark ? "#E3E3E3" : "black",
              borderBottomWidth: 2,
              maxHeight: "60%",
            }}
          >
            <TextInput
              // onFocus={() => setInputHeight(45)}
              // onEndEditing={() => setInputHeight(null)}
              onChangeText={setRateCaption}
              placeholder="Write here"
              placeholderTextColor={"#7E7E7E"}
              style={styles.textInputStyle}
              multiline
              value={rateCaption}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView
        style={{
          alignItems: "flex-end",
          position: "absolute",
          bottom: 5,
          right: 0,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() => {
            navigation.navigate("Description", {
              rate,
              rateCaption,
              locationData,
            });
          }}
        >
          <Text style={styles.nextButtonText}>
            {(locationData && rate) ||
            (locationData && rateCaption) ||
            (rate && rateCaption)
              ? "Next"
              : "Skip"}
          </Text>
          <FontAwesome5 name="arrow-right" size={30} color={colors.text} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
const makeStyles = (colors: any, theme, inputHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    textInputStyle: {
      padding: 5,
      color: colors.text,
      height: inputHeight,
    },
    titleContainer: {
      marginHorizontal: 20,
    },

    title: {
      color: colors.text,
      fontFamily: "WorkSans-Bold",
      fontSize: 20,
    },
    iconContainer: {
      height: actuatedNormalize(160),
      width: actuatedNormalize(160),
      backgroundColor: "rgba(219,219,219,0.6)",
      borderRadius: 10,
      shadowOpacity: 0.4,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      justifyContent: "center",
      alignItems: "center",
    },
    scrollViewContainer: {
      height: 100,
      width: Dimensions.get("window").width,
      borderColor: theme.dark ? "grey" : "black",
      backgroundColor: colors.background,
    },
    nextButtonContainer: {
      width: "50%",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    nextButtonText: {
      fontFamily: "WorkSans-Bold",
      color: colors.text,
    },
  });
export default PostCreatingScreen;
