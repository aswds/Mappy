import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import React, { useState } from "react";
import {
  Alert,
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
import * as Animatable from "react-native-animatable";
import validator from "validator";
import StyledButton from "../../components/button";
import Line from "../../components/signIn&signUp/line";
import signUp from "../../components/signIn&signUp/signUp";
import { style } from "./style";
const RegisterScreen = (props) => {
  const [username, setUsername] = useState("");
  const [valid, setValid] = useState({
    validUsername: true,
    validPassword: true,
    validEmail: true,
  });

  const [userPassword, setUserPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params?.name;
  const image = route.params?.image;
  const similarUsers = (username) => {
    if (username.length >= 2) {
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
        .catch((e) => Alert.alert("Something went wrong..."));
    } else {
      setValid({ ...valid, validUsername: false });
      setUsernameError("Username is too short ");
    }
  };
  const emailValidator = (email) => {
    if (validator.isEmail(email)) {
      setValid({ ...valid, validEmail: true });
    } else {
      setValid({ ...valid, validEmail: false });
      setEmailError("Not an email!");
    }
  };
  const similarEmail = (email) => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", userEmail)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setValid({ ...valid, validEmail: true });
        } else {
          setValid({ ...valid, validEmail: false });
          setEmailError("This email is already in use!");
        }
      })
      .catch((e) => Alert.alert("Something went wrong..."));
  };

  const checkPassword = (password) => {
    if (validator.isStrongPassword(password)) {
      setValid({ ...valid, validPassword: true });
    } else {
      setValid({ ...valid, validPassword: false });
      setPasswordError("Check password rules ");
    }
  };
  const loader = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
    clearTimeout();
  };

  const signUpHandle = () => {
    if (
      valid.validUsername &&
      username &&
      valid.validEmail &&
      userEmail &&
      valid.validPassword &&
      userPassword
    ) {
      signUp(userEmail, userPassword, username, name, image);
    } else {
      Alert.alert("You can't register");
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#333333", "#000"]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={styles.container}
          style={{ flex: 1 }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../../src/image/logoAuth.png")}
              style={styles.image}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingViewStyle}
          >
            <View style={styles.registerContainer}>
              <View style={styles.innerText}>
                {/* Input Fields */}
                {/* USERNAME */}
                <View
                  style={{
                    ...styles.userInput,
                    marginTop: 0,
                    borderWidth: valid.validUsername ? 0 : 2,
                    borderColor: "red",
                  }}
                >
                  <View style={{ marginRight: 10, marginBottom: 1 }}>
                    <AntDesign
                      name="user"
                      size={Dimensions.get("window").height >= 800 ? 24 : 20}
                      color="black"
                    />
                  </View>
                  <Line />
                  <TextInput
                    style={{
                      ...styles.inputField,
                    }}
                    placeholder="Username"
                    placeholderTextColor={style.color}
                    onChangeText={(text) => {
                      setUsername(text);
                      similarUsers(text);
                    }}
                    defaultValue={username}
                  />
                </View>
                {valid.validUsername ? null : (
                  <Animatable.View
                    animation="fadeInLeft"
                    duration={500}
                    style={styles.animationStyle}
                  >
                    <Text style={styles.errorMsg}>{usernameError}</Text>
                  </Animatable.View>
                )}
                {/* USERNAMEend */}
                {/* EMAIL */}
                <View
                  style={{
                    ...styles.userInput,
                    marginTop: valid.validUsername ? 20 : 0,
                    borderWidth: valid.validEmail ? 0 : 2,
                    borderColor: "red",
                  }}
                >
                  <View style={{ marginRight: 10, marginBottom: 1 }}>
                    <MaterialIcons
                      name="alternate-email"
                      size={Dimensions.get("window").height >= 800 ? 24 : 20}
                      color="black"
                    />
                  </View>
                  <Line />
                  <TextInput
                    style={{
                      ...styles.inputField,
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor={style.color}
                    onEndEditing={() => {
                      similarEmail(userEmail);
                    }}
                    onChangeText={(text) => {
                      setUserEmail(text);
                      setValid({ ...valid, validEmail: true });
                    }}
                    value={userEmail}
                  />
                </View>
                {valid.validEmail ? null : (
                  <Animatable.View
                    animation="fadeInLeft"
                    duration={500}
                    style={styles.animationStyle}
                  >
                    <Text style={styles.errorMsg}>{emailError}</Text>
                  </Animatable.View>
                )}
                {/* EMAILend */}

                {/* Password */}
                <View
                  style={{
                    ...styles.userInput,
                    marginTop: valid.validEmail ? 20 : 0,
                    borderWidth: valid.validPassword ? 0 : 2,
                    borderColor: "red",
                  }}
                >
                  {/* Changing Icons */}
                  <View style={{ marginRight: 10 }}>
                    {showPassword ? (
                      <Feather
                        name="eye-off"
                        size={Dimensions.get("window").height >= 800 ? 24 : 20}
                        color="black"
                        onPress={() => setShowPassword(false)}
                      />
                    ) : (
                      <Feather
                        name="eye"
                        size={Dimensions.get("window").height >= 800 ? 24 : 20}
                        color="black"
                        onPress={() => setShowPassword(true)}
                      />
                    )}
                  </View>
                  {/* Changing Icons */}
                  <Line />
                  <TextInput
                    style={styles.inputField}
                    secureTextEntry={showPassword}
                    placeholder="Password"
                    placeholderTextColor={style.color}
                    onChangeText={(text) => {
                      setUserPassword(text), checkPassword(text);
                    }}
                    value={userPassword}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    borderRadius: 20,
                    alignSelf: "center",
                  }}
                >
                  {valid.validPassword ? null : (
                    <Animatable.View
                      animation="fadeInLeft"
                      duration={500}
                      style={styles.animationStyle}
                    >
                      <Text
                        style={{ color: "lightgrey" }}
                        onPress={() => {
                          navigation.navigate("PasswordRules");
                        }}
                      >
                        {passwordError} here 👀
                      </Text>
                    </Animatable.View>
                  )}
                  {/* PasswordEnd */}
                  {/* CONFRIMPASS */}
                  <View
                    style={{
                      ...styles.userInput,
                      marginTop: valid.validPassword ? 20 : 0,
                      borderWidth: valid.validPassword ? 0 : 2,
                      borderColor: "red",
                    }}
                  >
                    <View style={{ marginRight: 10 }}>
                      <MaterialCommunityIcons
                        name="lock-check"
                        size={Dimensions.get("window").height >= 800 ? 24 : 20}
                        color="black"
                      />
                    </View>
                    {/* Changing Icons */}
                    <Line />
                    <TextInput
                      style={styles.inputField}
                      autoCapitalize="none"
                      secureTextEntry={showPassword}
                      placeholder="Confirm your password"
                      placeholderTextColor={style.color}
                      onChangeText={(text) => setConfirmPass(text)}
                      defaultValue={confirmPass}
                    />
                    {/* CONFRIMPASSend */}
                    {/* Input Fields End */}
                  </View>
                </View>
              </View>
            </View>

            <StyledButton
              textStyle={{ fontWeight: "500" }}
              style={styles.styledButton}
              onPress={() => {
                signUpHandle();
              }}
            >
              Sign Up
            </StyledButton>

            <View style={styles.textTerms}>
              <Text style={styles.textTermsStyle}>
                By registering, you confirm that you accept our
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Nahui poshel", "Daun ebaniu zascamlen mamont", [
                    "Ok",
                  ]);
                }}
              >
                <Text
                  style={{
                    ...styles.textTermsStyle,
                    color: "cornflowerblue",
                  }}
                >
                  Terms of service
                </Text>
              </TouchableOpacity>
              <Text style={styles.textTermsStyle}> and </Text>
              <Text style={styles.textTermsStyle}>Private Policy</Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    color: "red",
  },
  registerContainer: {
    marginTop: "5%",
    height: Dimensions.get("window").height / 2.2,
    width: Dimensions.get("window").width / 1.3,
    justifyContent: "center",
  },

  textContainer: {
    justifyContent: "center",
    paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  },

  innerText: {
    alignItems: "center",
  },
  textTerms: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textTermsStyle: {
    fontFamily: "Lato-Regular",
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width / 1.4,
    height: Dimensions.get("window").height / 13,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 20,
    paddingLeft: 10,
  },
  inputField: {
    width: Dimensions.get("window").width / 2.1,
    height: Dimensions.get("window").height / 13,
    justifyContent: "center",
    borderRadius: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    marginTop: 20,
    height: 80,
    width: 75,
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 0 },
  },
  keyboardAvoidingViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  animationStyle: {
    width: Dimensions.get("window").width / 1.5,
    justifyContent: "center",
    height: 30,
  },
  styledButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 13,
    height: Dimensions.get("window").height / 12,
    width: Dimensions.get("window").width / 1.4,
    alignSelf: "center",
  },
});

export default RegisterScreen;
