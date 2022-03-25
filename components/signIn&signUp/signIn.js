import firebase from "firebase";
import { Alert } from "react-native";
const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      console.log("Logged in with:" + user.email);
    })
    .catch((error) => {
      error.message.replace("[Error]", "");
      Alert.alert(
        "Check your email/password",
        "Check if you entered data correctly!",
        [],
        {
          AlertType: "login-password",
          cancelable: true,
        }
      );
    });
};

export default signIn;
