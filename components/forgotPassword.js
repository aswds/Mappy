import firebase from "firebase";
import { Alert } from "react-native";

const forgotPassword = (Email, props) => {
  firebase
    .auth()
    .sendPasswordResetEmail(Email)
    .then(function (user) {
      Alert.alert("Check your e-mail.", "Good.");
    })
    .catch(function (e) {
      Alert.alert(
        "Inncorect e-mail!",
        "Please check if you pass email correctly."
      );
    });
};

export default forgotPassword;
