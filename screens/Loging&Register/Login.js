import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import React, { useState } from "react";
import {
  Alert,
  Button,
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
import { actuatedNormalize } from "../../components/actuaterNormalize";
import StyledButton from "../../components/button";
import Line from "../../components/signIn&signUp/line";
const LoginScreen = (props) => {
  const navigation = useNavigation();
  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        console.log("Logged in with:" + user.email);
      })
      .catch((error) => {
        setIsValidEmail(false), setIsValidPassword(false);
        error.message.replace("[Error]", "");
        Alert.alert(
          "Check your email/password",
          "Check if you entered everything correctly!",
          [],
          {
            AlertType: "login-password",
            cancelable: true,
          }
        );
      });
  };

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [userPassword, setUserPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const loader = async () => {
    setIsLoading(true);
    const timer = await setTimeout(() => setIsLoading(false), 1000);
    clearTimeout(timer);
  };
  const emailValidator = (email) => {
    if (validator.isEmail(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  const passwordValidator = (password) => {
    if (password.length >= 6) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
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
                    borderWidth: isValidEmail ? null : 2,
                    borderColor: isValidEmail ? "black" : "red",
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
                    placeholder="E-mail"
                    onChangeText={(email) => {
                      setUserLogin(email), setIsValidEmail(true);
                    }}
                    defaultValue={userLogin}
                    autoCapitalize="none"
                  />
                </View>
                {isValidEmail ? null : (
                  <Animatable.View
                    animation="fadeInLeft"
                    duration={500}
                    style={styles.animationStyle}
                  >
                    <Text style={styles.errorMsg}>
                      Enter your email correctly!
                    </Text>
                  </Animatable.View>
                )}
                <View
                  style={{
                    ...styles.userInput,
                    borderWidth: isValidEmail ? null : 2,
                    borderColor: isValidPassword ? "black" : "red",
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
                    onChangeText={(password) => {
                      setUserPassword(password), setIsValidPassword(true);
                    }}
                    defaultValue={userPassword}
                  />
                </View>
                {isValidPassword ? null : (
                  <Animatable.View
                    animation="fadeInLeft"
                    duration={500}
                    style={styles.animationStyle}
                  >
                    <Text style={styles.errorMsg}>
                      Enter your password correctly!
                    </Text>
                  </Animatable.View>
                )}
                <View style={styles.styledButtonContainer}>
                  <StyledButton
                    onPress={() => {
                      loader(),
                        emailValidator(userLogin),
                        passwordValidator(userPassword);
                      signIn(userLogin, userPassword);
                    }}
                    style={{ height: actuatedNormalize(45), borderRadius: 15 }}
                  >
                    Sign In
                  </StyledButton>
                  <StyledButton
                    onPress={() => navigation.navigate("NameInfo")}
                    style={styles.styledButton}
                  >
                    Register
                  </StyledButton>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>

          {Platform.OS == "ios" ? (
            <View style={{ width: "50%" }}>
              <Button
                title="Forgot a password?"
                onPress={() => {
                  navigation.navigate("DataRecovery");
                }}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DataRecovery");
              }}
            >
              <Text style={{ color: "#0e78ea", fontSize: 15 }}>
                Forgot a password ?
              </Text>
            </TouchableOpacity>
          )}
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
  },
  styledButtonContainer: {
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    padding: 30,
  },
  styledButton: {
    height: actuatedNormalize(50),
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});

export default LoginScreen;
