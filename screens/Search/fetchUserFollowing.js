import firebase from "firebase";

export const fetchUserFollowing = (username, userUID) =>
  new Promise((resolve, reject) => {
    if (username === null || username === "") {
      firebase
        .firestore()
        .collection("Following")
        .doc(userUID)
        .collection("userFollowing")
        .get()
        .then((snapshot) => {
          let usersSnap = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          resolve(usersSnap);
        });
    } else {
      firebase
        .firestore()
        .collection("Following")
        .doc(userUID)
        .collection("userFollowing")
        .where("searchUsername", ">=", username.toLowerCase())
        .where("searchUsername", "<=", username.toLowerCase())
        .get()
        .then((snapshot) => {
          let usersSnap = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          resolve(usersSnap);
        })

        .catch(() => reject());
    }
  });
