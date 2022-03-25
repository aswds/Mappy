import firebase from "firebase";

export const fetchUsers = (username) =>
  new Promise((resolve, reject) => {
    if (username === null || username === "") {
      firebase
        .firestore()
        .collection("users")
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
        .collection("users")
        .where("searchUsername", ">=", username.toLowerCase())
        .where("searchUsername", "<=", username.toLowerCase() + "\uf8ff")
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
