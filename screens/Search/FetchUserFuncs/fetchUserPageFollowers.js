import firebase from "firebase";
export function fetchUserPageFollowers(userUID) {
  return new Promise((resolve, reject) =>
    firebase
      .firestore()
      .collection("Followers")
      .doc(userUID)
      .collection("userFollowers")
      .onSnapshot((snapshot) => {
        let userFollowers = snapshot.docs.map((doc) => {
          let id = doc.id;
        });
        resolve(userFollowers);
      })
  );
}
