import firebase from "firebase";
import { Alert } from "react-native";
class Timestamp {}
const addingPost = (
  downloadURLs,
  location,
  title,
  caption,
  rate,
  rateCaption
) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .add({
      downloadURLs,
      location: location ? location : null,
      title,
      caption,
      rate,
      rateCaption,
      creation: firebase.firestore.FieldValue.serverTimestamp(),
    })

    .catch((e) => {
      Alert.alert(e);
    });
};
export default addingPost;
