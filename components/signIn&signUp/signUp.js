import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import { Alert } from "react-native";
import { uploadImage } from "../ProfileFunc/uploadImage";
// add updateProfile after reg new user (in AvatarChoose)
const signUp = (email, password, username, name, image) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          email: email,
          verifiedEmail: false,
          username: username,
          searchUsername: username.toLowerCase(),
          name: name,
          country: "",
          city: "",
          phoneNumber: "",
          userImage: "",
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          userUID: firebase.auth().currentUser.uid,
          newUser: true,
        })
        .then(() => {
          uploadImage(image);
        });
    })

    .catch((error) => {
      error.message.replace('[Error], "" ');
      return error.message;
    });
};
export default signUp;
