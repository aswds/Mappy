import firebase from "firebase";
const profileImage = () => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.data().photoURL == undefined) {
        console.log("wait");
      } else {
        return querySnapshot.data().photoURL;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export default profileImage;
