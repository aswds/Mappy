import firebase from "firebase";
import { Alert } from "react-native";
export const freeUsername = (username) => {
  return new Promise((resolve) => {
    firebase
      .firestore()
      .collection("users")
      .where("searchUsername", "==", username.toLowerCase())
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          resolve(true);
        } else {
          resolve(false);
          //   setUsernameError("Username is already taken!");
        }
      })
      .catch((e) => Alert.alert(e));
  });
};
