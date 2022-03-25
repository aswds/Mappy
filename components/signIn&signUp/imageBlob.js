import firebase from "firebase";
import { Alert } from "react-native";

require("firebase/firestore");
export const imageBlob = async (uri) => {
  const responce = await fetch(uri);
  const blob = await responce.blob();
  console.log(blob.text);
};
export const uploadingRegisterImage = async (blob) => {
  const userUID = firebase.auth().currentUser.uid;
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
    });
  };
  const taskError = (snapshot) => {
    console.log(snapshot);
  };
  task.on("state_changed", taskProgress, taskError, taskComplete);
};
