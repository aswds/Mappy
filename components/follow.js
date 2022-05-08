import firebase from "firebase";

export const getUserInfo = (userUID) =>
  new Promise((resolve, reject) => {
    const data = firebase
      .firestore()
      .collection("users")
      .doc(userUID)
      .get()
      .then((doc) => {
        doc.exists && doc.data();
      });
    resolve(data);
  });

export async function onFollow(userUID) {
  await Promise.all([userFollowingAdd(userUID), userFollowersAdd(userUID)]);
}
export async function onUnFollow(userUID) {
  await Promise.all([
    userFollowingDeleting(userUID),
    userFollowersDeleting(userUID),
  ]);
}
const userFollowingDeleting = (userUID) => {
  firebase
    .firestore()
    .collection("Following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(userUID)
    .delete();
};
const userFollowersDeleting = (userUID) => {
  firebase
    .firestore()
    .collection("Followers")
    .doc(userUID)
    .collection("userFollowers")
    .doc(firebase.auth().currentUser.uid)
    .delete();
};
const userFollowersAdd = (userUID) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      firebase
        .firestore()
        .collection("Followers")
        .doc(userUID)
        .collection("userFollowers")
        .doc(firebase.auth().currentUser.uid)
        .set(snapshot.data());
    });
};
const userFollowingAdd = (userUID) => {
  firebase
    .firestore()
    .collection("users")
    .doc(userUID)
    .get()
    .then((snapshot) => {
      firebase
        .firestore()
        .collection("Following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(userUID)
        .set(snapshot.data());
    });
};
