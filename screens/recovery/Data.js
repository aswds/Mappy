import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import StyledButton from "../../components/button";
import forgotPassword from "../../components/forgotPassword";
import { KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Line from "../../components/signIn&signUp/line";

const DataRecovery = (props) => {
  const [userEmail, setUserEmail] = useState("");
  return (
    <LinearGradient
      colors={["#737373", "#3b3b3b"]}
      style={{
        flex: 1,
        width: null,
        height: null,
      }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.container}>
            <View style={{}}>
              <Text style={{ fontSize: 20, alignSelf: "center" }}>
                Enter your connected e-mail
              </Text>
            </View>
            <View style={styles.rContainer}>
              <View style={styles.userInput}>
                <View style={{ marginRight: 10, marginBottom: 1 }}>
                  <MaterialIcons
                    name="alternate-email"
                    size={Dimensions.get("window").height >= 800 ? 24 : 20}
                    color="black"
                  />
                </View>
                <Line />
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.inputField}
                  placeholder="Email"
                  onChangeText={(text) => setUserEmail(text)}
                  defaultValue={userEmail}
                />
              </View>
              <View style={styles.shadowButton}>
                <StyledButton
                  style={{
                    ...styles.shadowButton,
                    marginTop: 30,
                    width: "100%",
                    borderRadius: 10,
                    elevation: 5,
                  }}
                  onPress={() => {
                    forgotPassword(userEmail);
                  }}
                >
                  Submit
                </StyledButton>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};
DataRecovery.navigationOptions = () => {
  return {
    headerShown: true,
    headerTransparent: true,
    headerTitle: () => {
      return null;
    },
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  shadowButton: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 7,
      width: 0,
    },
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    width: Dimensions.get("window").width / 2.1,
    height: Dimensions.get("window").height / 13,
    justifyContent: "center",
    borderRadius: 20,
  },
  rContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
  },
  userInput: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: "30%",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 13,
    justifyContent: "flex-start",
    paddingLeft: 10,
    borderRadius: 15,
    alignItems: "center",
  },
});

export default DataRecovery;
