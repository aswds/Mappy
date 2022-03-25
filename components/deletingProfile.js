import firebase from "firebase";
const deleteProfile = () => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .delete();
  firebase.auth().signOut();
};
export default deleteProfile;
