import firebase from "firebase";
import { Alert } from "react-native";
import { trimFunction } from "./trimFunc";
const updateProfile = (phoneNumber, country, city, username, name, surname) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      city: city,
      country: country,
      username: username,
      searchUsername: username.toLowerCase(),
      phoneNumber: trimFunction(phoneNumber),
      name: trimFunction(name),
      surname: trimFunction(surname),
    })
    .then((val) => {
      console.log(val);
    });
};
export default updateProfile;
