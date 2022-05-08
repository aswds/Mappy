import firebase from "firebase";
export function fetchUserPageFollowing(userUID) {
  return new Promise((resolve, reject) =>
    firebase
      .firestore()
      .collection("Following")
      .doc(userUID)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let userFollowing = snapshot.docs.map((doc) => {
          let id = doc.id;
        });
        resolve(userFollowing);
      })
  );
}
