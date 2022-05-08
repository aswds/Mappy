import firebase from "firebase";
export const fetchUserPage = (userUID) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userUID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log("OK");
          resolve(snapshot.data());
        } else {
          resolve(alert("User not found"));
        }
      })
      .catch(() => reject());
  });
