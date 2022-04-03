import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Button,
  Platform,
  Pressable,
  Touchable,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Alert,
  StatusBar,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo, Feather, Fontisto } from "@expo/vector-icons";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions";
import { bindActionCreators } from "redux";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../components/ProfileFunc/uploadImage";
import WhiteButton from "../../components/headerComponents/whiteButton";
import LottieAnimation from "../../components/lottieAnimation";
import updateProfile from "../../components/ProfileFunc/updateProfile";
import firebase from "firebase";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { ModalPhoto } from "./Modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useHeaderHeight } from "@react-navigation/elements";
const EditProfile = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const theme = useTheme();
  const route = useRoute();
  const [valid, setValid] = useState({
    validUsername: true,
    validPassword: true,
    validEmail: true,
  });
  useEffect(() => {
    props.fetchUser();
  }, []);

  if (props.currentUser == undefined) {
    return (
      <View style={{ flex: 1 }}>
        <LottieAnimation />
      </View>
    );
  }
  const freeUsername = (username) => {
    firebase
      .firestore()
      .collection("users")
      .where("searchUsername", "==", username.toLowerCase())
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setValid({ ...valid, validUsername: true });
        } else {
          setValid({ ...valid, validUsername: false });
          setUsernameError("Username is already taken!");
        }
      })
      .catch((e) => Alert.alert(e));
  };
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
      phoneNumber == phoneNumberDisplyed &&
      country == countryDisplayed &&
      city == cityDisplayed &&
      username == usernameDisplay &&
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
  const usernameDisplay = props.currentUser.username;
  const userName = props.currentUser.name;
  const gmailDisplayed = props.currentUser.email;
  const countryDisplayed = props.currentUser.country;
  const cityDisplayed = props.currentUser.city;
  const phoneNumberDisplyed = props.currentUser.phoneNumber;
  const [gmail, setGamil] = useState(gmailDisplayed);
  const [username, setUsername] = useState(usernameDisplay);
  const [country, setCountry] = useState(countryDisplayed);
  const [city, setCity] = useState(cityDisplayed);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberDisplyed);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(profileImage);
  const [name, setName] = useState(userName);
  const [secondName, setSecondName] = useState();
  const styles = makeStyles(colors, theme);
  const insets = useSafeAreaInsets();
  return (
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
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={
            image ? { uri: image } : require("../../src/image/logoAuth.png")
          }
          imageStyle={{
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
          style={{
            width: "100%",
            height: "30%",
          }}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 200 : 25}
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              paddingVertical: insets.top,
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: insets.top,
                ...styles.pictureContainer,
                alignSelf: "center",
              }}
              onPress={() => {
                showModalHandle();
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "white",
                  }}
                  source={
                    image
                      ? { uri: image }
                      : require("../../src/image/logoAuth.png")
                  }
                />
              </View>
            </TouchableOpacity>
            <View style={{ ...styles.usernameField }}>
              <View style={styles.userInputContainer}>
                <Feather name="user" size={24} color={iconColorAndUserInput} />
              </View>
              <TextInput
                placeholder="Username"
                style={styles.textInputStyle}
                placeholderTextColor={placeholderColor}
                onChangeText={(text) => {
                  freeUsername(text);
                  setUsername(text);
                }}
                defaultValue={username}
              />
            </View>
          </BlurView>
        </ImageBackground>
        <View style={{ ...styles.inputField }}>
          <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
            <Text style={{ color: colors.text }}>Your name: </Text>
          </View>
          <TextInput
            placeholder="Name"
            style={styles.textInputStyle}
            placeholderTextColor={placeholderColor}
            onChangeText={(text) => {
              setName(text);
            }}
            defaultValue={name}
          />
        </View>
        <View style={{ ...styles.inputField }}>
          <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
            <Text style={{ color: colors.text }}>Your second name: </Text>
          </View>
          <TextInput
            placeholder="Second name"
            style={styles.textInputStyle}
            placeholderTextColor={placeholderColor}
            onChangeText={(text) => {
              setSecondName(text);
            }}
            defaultValue={secondName}
          />
        </View>

        <View style={styles.inputField}>
          <View style={styles.userInputContainer}>
            <Entypo name="phone" size={24} color={iconColorAndUserInput} />
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
        </View>
        <View style={styles.inputField}>
          <View style={styles.userInputContainer}>
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
        </View>
        <View style={styles.inputField}>
          <View style={styles.userInputContainer}>
            <Fontisto name="world-o" size={24} color={iconColorAndUserInput} />
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
        </View>
        <View style={styles.inputField}>
          <View style={styles.userInputContainer}>
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
        </View>

        <View style={styles.whiteButtonContainer}>
          <View>
            <WhiteButton
              style={{ width: 80 }}
              onPress={() => {
                navigation.goBack();
              }}
              text="Cancle"
            />
          </View>
          <View>
            <WhiteButton
              style={{ width: 80 }}
              onPress={() => {
                navigation.navigate("ProfileScreen", {
                  imageURI: image,
                });
              }}
              text="Save"
            />
          </View>
        </View>
        <ModalPhoto
          hideModal={hideModal}
          showModal={showModal}
          imageHandler={imagePropHandler}
        />
      </View>
    </ScrollView>
  );
};

const makeStyles = (colors: any, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    safeAreaViewContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },

    userInput: {
      margin: 30,
      flex: 1,
      alignItems: "center",
    },
    inputField: {
      flexDirection: "row",
      height: 50,
      width: "100%",
      borderBottomWidth: 2,
      borderColor: "#a3a3a3",
      margin: 15,
    },
    userInputContainer: {
      justifyContent: "center",
      margin: 10,
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
      borderRadius: 100,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: colors.border,
      margin: 10,
    },
    usernameField: {
      flexDirection: "row",
      backgroundColor: "rgba(100,100,100,0.5)",
      borderRadius: 15,
      marginTop: "1%",
      width: "60%",
      alignSelf: "center",
      borderColor: theme.dark ? "#a3a3a3" : colors.border,
    },
    inputField: {
      flexDirection: "row",
      height: 50,
      width: "100%",
      borderBottomWidth: 2,
      borderColor: theme.dark ? "#a3a3a3" : colors.border,
      marginTop: 40,
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
      height: "100%",
      width: "100%",
      padding: 10,
      color: colors.text,
    },
    whiteButtonContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginVertical: 20,
      backgroundColor: "green",
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
