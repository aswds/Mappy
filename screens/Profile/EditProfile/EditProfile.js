import { Entypo, Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WhiteButton from "../../../components/headerComponents/whiteButton";
import LottieAnimation from "../../../components/lottieAnimation";
import updateProfile from "../../../components/ProfileFunc/updateProfile";
import { uploadImage } from "../../../components/ProfileFunc/uploadImage";
import { fetchUser } from "../../../redux/actions";
import { ModalPhoto } from "./Modal";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { TextInput as CustomTextInput } from "react-native-paper";
import { freeUsername } from "./freeUsername";
import { useTheme } from "../../../Theme/ThemeProvider";
import { Field } from "./components/Field";
import { Buttons } from "./components/Buttons";
const EditProfile = (props) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const colors = theme.colors;
  const route = useRoute();
  const [valid, setValid] = useState({
    validUsername: true,
    validPassword: true,
    validEmail: true,
  });
  useEffect(async () => {
    await props.fetchUser();
    Image.prefetch(route.params?.profileImage);
  }, []);

  if (props.currentUser == undefined) {
    return (
      <View style={{ flex: 1 }}>
        <LottieAnimation />
      </View>
    );
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const hideModal = () => {
    setShowModal(!showModal);
  };
  const showModalHandle = () => {
    setShowModal(true);
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const checkOnChange = (phoneNumber, country, city, username, imageUri) => {
    if (
      phoneNumber == phoneNumber &&
      country == country &&
      city == city &&
      username == username &&
      imageUri == profileImage
    ) {
      navigation.goBack();
    } else {
      uploadImage(image), updateProfile(phoneNumber, country, city, username);
    }
  };
  const imagePropHandler = (imageProp) => {
    setImage(imageProp);
  };
  const iconColorAndUserInput = colors.text;
  const placeholderColor = "#616161";
  const profileImage = route.params?.profileImage;

  const [gmail, setGamil] = useState(props.currentUser.email);
  const [username, setUsername] = useState(props.currentUser.username);
  const [country, setCountry] = useState(props.currentUser.country);
  const [city, setCity] = useState(props.currentUser.city);
  const [phoneNumber, setPhoneNumber] = useState(props.currentUser.phoneNumber);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(profileImage);
  const [name, setName] = useState(props.currentUser.name);
  const [secondName, setSecondName] = useState();
  const styles = makeStyles(colors, theme);
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <ScrollView
          style={{
            backgroundColor: colors.background,
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "android" ? 50 : 0,
          }}
          showsVerticalScrollIndicator={false}
        >
          <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View
              style={{
                width: "100%",
                height: Dimensions.get("window").height / 3.5,
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: insets.top,
                  ...styles.pictureContainer,
                  alignSelf: "flex-start",
                }}
                onPress={() => {
                  showModalHandle();
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Image
                    source={
                      route.params?.profileImage
                        ? { uri: route.params?.profileImage }
                        : require("../../../src/image/logoAuth.png")
                    }
                    style={styles.imageStyle}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    bottom: 0,
                    right: 20,
                    height: 35,
                    aspectRatio: 1 / 1,
                    backgroundColor: colors.text,
                  }}
                >
                  <MaterialIcons
                    name="edit"
                    size={24}
                    color={colors.background}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Public Information</Text>
              </View>
              <Field text={"Username"} colors={colors} theme={theme}>
                <View style={styles.userInputIcon}>
                  <Feather
                    name="user"
                    size={24}
                    color={iconColorAndUserInput}
                  />
                </View>
                <TextInput
                  placeholder="Username"
                  style={styles.textInputStyle}
                  placeholderTextColor={placeholderColor}
                  onChangeText={(text) => {
                    freeUsername(text.toLowerCase().trim()).then(
                      (_isAvailable) =>
                        setValid({ ...valid, validUsername: _isAvailable })
                    );
                    setUsername(text);
                  }}
                  defaultValue={username}
                />
              </Field>

              <Field text="Name">
                <TextInput
                  placeholder="Name"
                  style={styles.textInputStyle}
                  placeholderTextColor={placeholderColor}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  defaultValue={name}
                />
              </Field>

              <Field text={"Surname"}>
                <TextInput
                  placeholder="Surname"
                  style={styles.textInputStyle}
                  placeholderTextColor={placeholderColor}
                  onChangeText={(text) => {
                    setSecondName(text);
                  }}
                  defaultValue={secondName}
                />
              </Field>
            </View>

            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Private Information</Text>
              </View>
              <Field text="Phone number">
                <View style={styles.userInputIcon}>
                  <Entypo
                    name="phone"
                    size={24}
                    color={iconColorAndUserInput}
                  />
                </View>
                <TextInput
                  keyboardType="phone-pad"
                  placeholder="Phone number"
                  placeholderTextColor={placeholderColor}
                  style={styles.textInputStyle}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                  }}
                  defaultValue={phoneNumber}
                />
              </Field>
              <Field text={"E-Mail"}>
                <View style={styles.userInputIcon}>
                  <MaterialIcons
                    name="alternate-email"
                    size={24}
                    color={iconColorAndUserInput}
                  />
                </View>
                <TextInput
                  placeholder="Gmail"
                  placeholderTextColor={placeholderColor}
                  style={styles.textInputStyle}
                  onChangeText={(text) => {
                    setGamil(text);
                  }}
                  defaultValue={gmail}
                />
              </Field>
              <Field text="Country">
                <View style={styles.userInputIcon}>
                  <Fontisto
                    name="world-o"
                    size={24}
                    color={iconColorAndUserInput}
                  />
                </View>
                <TextInput
                  placeholder="Country"
                  placeholderTextColor={placeholderColor}
                  style={styles.textInputStyle}
                  onChangeText={(text) => {
                    setCountry(text);
                  }}
                  defaultValue={country}
                />
              </Field>
              <Field text="City">
                <View style={styles.userInputIcon}>
                  <Entypo
                    name="location-pin"
                    size={24}
                    color={iconColorAndUserInput}
                  />
                </View>
                <TextInput
                  placeholder="City"
                  placeholderTextColor={placeholderColor}
                  style={styles.textInputStyle}
                  onChangeText={(text) => {
                    setCity(text);
                  }}
                  defaultValue={city}
                />
              </Field>
            </View>
            <View style={styles.buttonsContainer}>
              <View>
                <Buttons
                  text={"Cancle"}
                  textStyle={styles.textStyle}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
              <View>
                <Buttons
                  text={"Save"}
                  textStyle={styles.textStyle}
                  onPress={() => {
                    checkOnChange(phoneNumber, country, city, username, image);
                    navigation.navigate("ProfileScreen", {
                      imageURI: image,
                    });
                  }}
                />
              </View>
            </View>
            <ModalPhoto
              hideModal={hideModal}
              showModal={showModal}
              imageHandler={imagePropHandler}
              routeName={route.name}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textStyle: {
      fontFamily: "WorkSans-Bold",
      color: colors.text,
      fontSize: 20,
      shadowColor: colors.text,
      shadowOpacity: 0.6,
      shadowRadius: 2,
      shadowOffset: { height: 0, width: 0 },
    },
    titleContainer: {
      marginVertical: 10,
    },
    subTitle: {
      fontFamily: "WorkSans-Bold",
      fontSize: 20,
      color: colors.text,
    },
    title: {
      color: colors.text,
      fontFamily: "WorkSans-Bold",
      fontSize: 24,
      marginBottom: "5%",
    },
    textInputContainer: {
      flexDirection: "row",
      borderRadius: 10,
      width: "90%",
      borderBottomWidth: 2,
    },
    safeAreaViewContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    imageStyle: {
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: 100,
    },
    userInput: {
      margin: 30,
      flex: 1,
      alignItems: "center",
    },

    userInputIcon: {
      justifyContent: "center",
      alignItems: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },

    pictureContainer: {
      height: Dimensions.get("screen").height >= 800 ? 150 : 130,
      width: Dimensions.get("screen").height >= 800 ? 150 : 130,
      overflow: "hidden",
      borderColor: colors.border,
      margin: 10,
    },
    // usernameField: {
    //   flexDirection: "row",
    //   backgroundColor: "rgba(100,100,100,0.5)",
    //   borderRadius: 15,
    //   marginTop: "1%",
    //   width: "60%",
    //   alignSelf: "center",
    //   borderColor: theme.dark ? "#a3a3a3" : colors.border,
    // },
    inputField: {
      flexDirection: "column",
      height: 50,
      width: "100%",
      borderColor: theme.dark ? "#a3a3a3" : colors.border,
      marginTop: 20,
    },

    containerSafeArea: {
      flex: 1,
      backgroundColor: "black",
    },
    modalView: {
      top: 10,
      flexDirection: "row",
      alignItems: "flex-start",
      width: Platform.OS === "ios" ? "98%" : "100%",
      height: Dimensions.get("window").height >= 800 ? "30%" : "40%",
      backgroundColor: "black",
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textInputStyle: {
      width: "80%",
      height: "100%",
      padding: 10,
      borderRadius: 10,
      color: colors.text,
    },
    buttonsContainer: {
      width: "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "space-around",

      flexDirection: "row",
      marginVertical: 20,
      shadowRadius: 5,
    },
    modalButtonsStyle: {
      height: 130,
      width: 130,
      borderRadius: 20,
      padding: 10,
      borderWidth: 6,
      borderColor: theme.dark ? "white" : colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
  });
const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, mapDispatchProps)(EditProfile);
