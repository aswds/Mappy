import firebase from "firebase";
import { Alert } from "react-native";
import { View } from "react-native";
import { ProgressBar } from "react-native-paper";
const addingPost = (downloadURLs, location, caption) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .add({
      downloadURLs,
      location: location ? location : null,
      caption,
      creation: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((info) => {
      console.log(info);
    })
    .catch((e) => {
      console.log(e);
    });
};
export default addingPost;