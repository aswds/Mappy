import firebase from "firebase";
import { Alert } from "react-native";

require("firebase/firestore");
export const uploadImage = async (uri) => {
  const user = firebase.auth().currentUser.uid;
  const responce = await fetch(uri);
  const blob = await responce.blob();

  const task = firebase
    .storage()
    .ref()
    .child("profileImage/" + user)
    .put(blob);

  const taskProgress = (snapshot) => {
    console.log("Transferred:" + snapshot.bytesTransferred);
  };
  const taskComplete = () => {
    task.snapshot.ref.getDownloadURL().then((snapshot) => {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ userImage: snapshot });
      firebase.auth().currentUser.updateProfile({ photoURL: snapshot });
    });
  };
  const taskError = (snapshot) => {
    console.log(snapshot);
  };
  task.on("state_changed", taskProgress, taskError, taskComplete);
};
