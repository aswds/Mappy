import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import StyledButton from "../../components/button";
import Line from "../../components/signIn&signUp/line";
import CustomAlert from "./CustomAlert";
import SingInMethods from "./LoginComponents/SignInModal";
import { style } from "./style";
const LoginScreen = (props) => {
  const navigation = useNavigation();

  async function loginWithFacebook() {
    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "381349353861662",
      { permissions: ["public_profile"] }
    );

    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const [email, setEmail] = useState({ isValid: true, errorMsg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({ isValid: true, errorMsg: "" });
  const [errorMsg, setErrorMsg] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [_showModal, setShowModal] = useState(false);
  const [singInModal, setSignInModal] = useState(false);

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((result) => {
        const user = result.user;
        console.log("Logged in with:" + user.email);
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code == "auth/invalid-email") {
          setErrorMsg(
            "The format of your email address is not correct please enter your correct email address to proceed."
          ),
            setEmail(false);
          setShowModal(true);
        } else if (error.code == "auth/wrong-password") {
          setPassword({
            isValid: false,
          }),
            setErrorMsg(
              "Sorry, you entered the wrong password. Check your password again."
            ),
            setShowModal(true);
        } else if (error.code == "auth/user-not-found") {
          setErrorMsg(
            "The email you entered does not belong to the account. Check your username and try again."
          ),
            setEmail(false);
          setShowModal(true);
        }
      });
  };
  const passwordValidator = (password) => {
    if (email.isValid || password.length < 6) {
      console.log("Yee");
    }
  };
  const _hideModal = () => {
    setShowModal(false);
  };
  const _hideSignInModal = () => {
    setSignInModal(false);
  };

  return (
    <LinearGradient
      colors={["#333333", "#000"]}
      style={styles.linearGradientStyle}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={{}}
              source={require("../../src/image/logoAuth.png")}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.loginContainer}>
              <View style={styles.innerText}>
                <Text style={{ ...styles.textStyle, color: "white" }}>
                  Login
                </Text>
                <View
                  style={{
                    ...styles.userInput,
                    borderWidth: email.isValid ? null : 1,
                    borderColor: email.isValid ? "black" : "red",
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <MaterialIcons
                      name="alternate-email"
                      size={Dimensions.get("window").height >= 800 ? 24 : 20}
                      color="black"
                    />
                  </View>
                  <Line />
                  <TextInput
                    keyboardType="email-address"
                    style={styles.inputField}
                    placeholderTextColor={style.color}
                    placeholder="E-mail"
                    onChangeText={(email) => {
                      setUserLogin(email);
                      // setEmail({ ...email, isValid: true });
                    }}
                    defaultValue={userLogin}
                    autoCapitalize="none"
                  />
                </View>
                {/* {email.isValid ? null : (
                  <Animatable.View
                    animation="fadeInLeft"
                    duration={500}
                    style={styles.animationStyle}
                  >
                    <Text style={styles.errorMsg}>{email.errorMsg}</Text>
                  </Animatable.View>
                )} */}
                <View
                  style={{
                    ...styles.userInput,
                    borderWidth: email.isValid ? null : 1,
                    borderColor: password.isValid ? "black" : "red",
                  }}
                >
                  {/* Changing Icons */}
                  <View style={{ marginRight: 10 }}>
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={Dimensions.get("window").height >= 800 ? 24 : 20}
                      color="black"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  </View>
                  {/* Changing Icons */}
                  <Line />
                  <TextInput
                    style={styles.inputField}
                    secureTextEntry={showPassword}
                    placeholder="Password"
                    placeholderTextColor={style.color}
                    onChangeText={(password) => {
                      setUserPassword(password), setPassword(true);
                    }}
                    defaultValue={userPassword}
                  />
                </View>

                <View style={styles.styledButtonContainer}>
                  <StyledButton
                    onPress={() => {
                      signIn(userLogin, userPassword);
                    }}
                    style={{
                      height: actuatedNormalize(45),
                      borderRadius: 5,
                      flex: 5,
                    }}
                  >
                    Sign In
                  </StyledButton>
                  <TouchableOpacity
                    onPress={() => {
                      setSignInModal(true);
                    }}
                    style={{
                      height: actuatedNormalize(45),
                      borderRadius: 5,
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* add sing in methods */}
                    <AntDesign name="up" size={28} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <CustomAlert
              errorMsg={errorMsg}
              hideModal={_hideModal}
              showModal={_showModal}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DataRecovery");
            }}
          >
            <Text style={{ color: "#0e78ea", fontSize: 15 }}>
              Forgot a password ?
            </Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <View style={style.textTerms}>
              <Text style={style.textTermsStyle}>
                Don't have an account yet?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("NameInfo");
                }}
              >
                <Text
                  style={{
                    ...style.textTermsStyle,
                    fontSize: 15,
                    color: "cornflowerblue",
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <SingInMethods hideModal={_hideSignInModal} showModal={singInModal} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  registerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    color: "red",
  },
  loginContainer: {
    width: Dimensions.get("window").width / 1.3,
    marginTop: 20,
    justifyContent: "space-between",
  },

  textContainer: {
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  },
  imageStyle: {
    flex: 1,
    overflow: "hidden",
  },
  innerText: {
    alignItems: "center",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userInput: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 30,
    width: Dimensions.get("window").width / 1.5,
    height:
      Dimensions.get("window").width < 600
        ? Dimensions.get("window").height / 15
        : Dimensions.get("window").height / 12,
    justifyContent: "flex-start",
    paddingLeft: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  inputField: {
    height: Dimensions.get("window").height / 15,
    justifyContent: "center",
    width: Dimensions.get("window").width / 2.2,
  },
  linearGradientStyle: {
    flex: 1,
    width: null,
    height: null,
  },
  imageContainer: {
    height: 105,
    width: 100,
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 0 },
  },
  animationStyle: {
    alignItems: "flex-start",
    width: Dimensions.get("window").width / 1.6,
    height: 20,
    marginVertical: 5,
  },
  styledButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    alignSelf: "center",
    paddingVertical: 30,
    width: Dimensions.get("window").width / 1.5,
  },
  styledButton: {
    height: actuatedNormalize(50),
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});

export default LoginScreen;
