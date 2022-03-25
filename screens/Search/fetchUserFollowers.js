import firebase from "firebase";

export const fetchUserFollowers = (username, userUID) =>
  new Promise((resolve, reject) => {
    if (username === null || username === "") {
      firebase
        .firestore()
        .collection("Followers")
        .doc(userUID)
        .collection("userFollowers")
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
        .collection("Followers")
        .doc(userUID)
        .collection("userFollowers")
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
