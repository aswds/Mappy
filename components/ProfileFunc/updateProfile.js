import firebase from "firebase";
import { Alert } from "react-native";
const updateProfile = (phoneNumber, country, city, username) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      city: city,
      country: country,
      username: username,
      searchUsername: username.toLowerCase(),
      phoneNumber: phoneNumber,
    })
    .then();
};
export default updateProfile;
